import { NextRequest, NextResponse } from 'next/server';

import { getOrder } from '@/lib/order';
import type { OrderResponse } from '@/types/order';

function sanitizeOrder(
  order: NonNullable<Awaited<ReturnType<typeof getOrder>>>
): OrderResponse {
  return {
    id: order.id,
    name: order.name,
    email: order.email,
    phone: order.phone,
    items: order.items.map(item => ({
      id: item.id,
      productType: item.productType,
      quantity: item.quantity,
      notes: item.notes,
      imageUrls: item.imageUrls,
      unitPrice: item.unitPrice,
    })),
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
