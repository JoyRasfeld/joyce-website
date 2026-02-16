import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { getProduct, getProductPrice } from '@/lib/products';
import { createOrder, markOrderPendingPayment } from '@/lib/order';
import { getStripe } from '@/lib/stripe';
import { createOrderSchema } from '@/types/order';

const SLUG_TO_PRODUCT_TYPE: Record<string, string> = {
  'miniature-house': 'MINIATURE_HOUSE',
  'animal-magnets': 'ANIMAL_MAGNETS',
  'framed-house': 'FRAMED_HOUSE',
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://joyceartstudio.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createOrderSchema.parse(body);

    // Verify all products exist
    for (const item of validated.items) {
      const product = getProduct(item.productSlug);
      if (!product) {
        return NextResponse.json(
          { error: `Invalid product: ${item.productSlug}` },
          { status: 400 }
        );
      }
    }

    const order = await createOrder(validated);

    // Build Stripe line items — one per cart item
    const lineItems = order.items.map(item => {
      const slug =
        Object.entries(SLUG_TO_PRODUCT_TYPE).find(
          ([, v]) => v === item.productType
        )?.[0] ?? '';
      const product = getProduct(slug);

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product?.name ?? item.productType,
            description:
              item.quantity > 1 ? `Qty: ${item.quantity}` : undefined,
          },
          unit_amount: item.unitPrice,
        },
        quantity: 1,
      };
    });

    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      customer_email: validated.email,
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      metadata: {
        orderId: order.id,
      },
      success_url: `${siteUrl}/shop/success/${order.id}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cart?cancelled=true`,
    });

    await markOrderPendingPayment(order.id, session.id);

    return NextResponse.json({
      checkoutUrl: session.url,
      orderId: order.id,
    });
  } catch (error) {
    console.error('Create order error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
