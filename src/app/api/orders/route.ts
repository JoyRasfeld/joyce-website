import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { getProduct, getProductPrice } from '@/lib/products';
import { createOrder, markOrderPendingPayment } from '@/lib/order';
import { getStripe } from '@/lib/stripe';
import { createOrderSchema } from '@/types/order';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://joyceartstudio.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createOrderSchema.parse(body);

    const product = getProduct(validated.productSlug);
    if (!product) {
      return NextResponse.json({ error: 'Invalid product' }, { status: 400 });
    }

    const amount = getProductPrice(validated.productSlug, validated.quantity);

    const order = await createOrder(validated);

    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      customer_email: validated.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: `Qty: ${validated.quantity}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      metadata: {
        orderId: order.id,
        productType: order.productType,
      },
      success_url: `${siteUrl}/shop/review/${order.id}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/shop/${validated.productSlug}?cancelled=true`,
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
