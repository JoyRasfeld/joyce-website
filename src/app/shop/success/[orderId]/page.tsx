'use client';

import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { OrderSummary } from '@/components/order-summary';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import type { OrderResponse } from '@/types/order';

export default function OrderSuccessPage() {
  const params = useParams();
  const orderId = params.orderId as string;

  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (!res.ok) throw new Error('Failed to fetch order');
        const data = await res.json();
        setOrder(data);
      } catch {
        // Order not found
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="mb-4">
            Order Not Found
          </Typography>
          <Button asChild>
            <Link href="/shop">Back to Shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <OrderSummary order={order} />

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
