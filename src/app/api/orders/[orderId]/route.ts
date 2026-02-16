import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

import { getProduct } from '@/lib/products';
import { confirmOrder, getOrder } from '@/lib/order';
import type { OrderResponse } from '@/types/order';

const PRODUCT_TYPE_TO_SLUG: Record<string, string> = {
  MINIATURE_HOUSE: 'miniature-house',
  ANIMAL_MAGNETS: 'animal-magnets',
  FRAMED_HOUSE: 'framed-house',
};

function sanitizeOrder(
  order: NonNullable<Awaited<ReturnType<typeof getOrder>>>
): OrderResponse {
  return {
    id: order.id,
    productType: order.productType,
    quantity: order.quantity,
    name: order.name,
    email: order.email,
    phone: order.phone,
    notes: order.notes,
    imageUrls: order.imageUrls,
    shippingName: order.shippingName,
    shippingAddressLine1: order.shippingAddressLine1,
    shippingAddressLine2: order.shippingAddressLine2,
    shippingCity: order.shippingCity,
    shippingState: order.shippingState,
    shippingPostalCode: order.shippingPostalCode,
    shippingCountry: order.shippingCountry,
    amount: order.amount,
    status: order.status,
    createdAt: order.createdAt.toISOString(),
  };
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    const order = await getOrder(orderId);

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(sanitizeOrder(order));
  } catch (error) {
    console.error('Get order error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    const order = await confirmOrder(orderId);

    // Send notification email
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const product = getProduct(
          PRODUCT_TYPE_TO_SLUG[order.productType] ?? ''
        );

        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: ['joy.rasfeld@gmail.com'],
          subject: `New Custom Order Confirmed from ${order.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">New Custom Order Confirmed</h2>

              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #555;">Order Details</h3>
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>Product:</strong> ${product?.name ?? order.productType}</p>
                <p><strong>Quantity:</strong> ${order.quantity}</p>
                <p><strong>Amount:</strong> $${(order.amount / 100).toFixed(2)}</p>
              </div>

              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #555;">Customer Information</h3>
                <p><strong>Name:</strong> ${order.name}</p>
                <p><strong>Email:</strong> ${order.email}</p>
                ${order.phone ? `<p><strong>Phone:</strong> ${order.phone}</p>` : ''}
                ${order.notes ? `<p><strong>Notes:</strong> ${order.notes}</p>` : ''}
              </div>

              ${
                order.shippingName
                  ? `
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #555;">Shipping Address</h3>
                <p>${order.shippingName}<br>
                ${order.shippingAddressLine1}${order.shippingAddressLine2 ? `<br>${order.shippingAddressLine2}` : ''}<br>
                ${order.shippingCity}, ${order.shippingState} ${order.shippingPostalCode}<br>
                ${order.shippingCountry}</p>
              </div>
              `
                  : ''
              }

              <div style="background-color: #fff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #555;">Reference Images</h3>
                ${order.imageUrls.map(url => `<img src="${url}" alt="Reference" style="max-width: 200px; height: auto; border-radius: 8px; margin: 4px;" />`).join('')}
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; color: #666; font-size: 14px;">
                <p>This order was confirmed on ${new Date().toLocaleString()}</p>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send notification email:', emailError);
      }
    }

    return NextResponse.json(sanitizeOrder(order));
  } catch (error) {
    console.error('Confirm order error:', error);

    const message =
      error instanceof Error ? error.message : 'Failed to confirm order';
    const status = message === 'Order not found' ? 404 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
