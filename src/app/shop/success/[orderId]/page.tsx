import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ClearCart } from '@/components/clear-cart';
import { OrderSummary } from '@/components/order-summary';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { getOrder, verifyAndMarkPaid } from '@/lib/order';
import type { OrderResponse } from '@/types/order';

export default async function OrderSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { orderId } = await params;
  const { session_id } = await searchParams;

  let order = await getOrder(orderId);
  if (!order) notFound();

  // If not yet PAID and we have a Stripe session ID, verify and mark paid
  if (order.status !== 'PAID' && session_id) {
    try {
      const updated = await verifyAndMarkPaid(orderId, session_id);
      if (updated) order = updated;
    } catch (error) {
      console.error('Failed to verify order:', error);
    }
  }

  if (order.status !== 'PAID') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <Typography variant="h2" className="mb-4">
            Payment Processing
          </Typography>
          <Typography variant="p" className="text-muted-foreground">
            Your payment is still being processed. Please check back in a
            moment or contact us if this persists.
          </Typography>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/contact">Contact Joyce</Link>
            </Button>
            <Button asChild>
              <Link
                href={`/shop/success/${orderId}${session_id ? `?session_id=${session_id}` : ''}`}
              >
                Refresh
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const orderResponse: OrderResponse = {
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

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClearCart />

        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <Typography variant="h1" className="mb-2">
            Order Confirmed!
          </Typography>
          <Typography variant="p" className="text-muted-foreground">
            Thank you for your order. Joyce will begin working on your custom
            piece and reach out if she has any questions.
          </Typography>
        </div>

        <OrderSummary order={orderResponse} />

        <div className="mt-8 text-center space-y-4">
          <Typography variant="small" className="text-muted-foreground block">
            A confirmation has been noted for this order. If you have any
            questions, feel free to reach out.
          </Typography>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/contact">Contact Joyce</Link>
            </Button>
            <Button asChild>
              <Link href="/shop">Place Another Order</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
