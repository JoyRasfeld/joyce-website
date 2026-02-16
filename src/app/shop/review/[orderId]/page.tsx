'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { OrderSummary } from '@/components/order-summary';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import type { OrderResponse } from '@/types/order';

export default function ReviewOrderPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId as string;

  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [pollCount, setPollCount] = useState(0);

  const fetchOrder = useCallback(async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      if (!res.ok) throw new Error('Failed to fetch order');
      const data: OrderResponse = await res.json();
      setOrder(data);
      return data;
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  // Poll if status is still PENDING_PAYMENT (webhook may not have arrived yet)
  useEffect(() => {
    if (!order || order.status !== 'PENDING_PAYMENT' || pollCount >= 15) return;

    const timer = setTimeout(async () => {
      const updated = await fetchOrder();
      if (updated?.status === 'PENDING_PAYMENT') {
        setPollCount(prev => prev + 1);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [order, pollCount, fetchOrder]);

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      const res = await fetch(`/api/orders/${orderId}`, { method: 'PATCH' });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || 'Failed to confirm order');
        return;
      }

      toast.success('Order confirmed!');
      router.push(`/shop/success/${orderId}`);
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setConfirming(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading order details...</p>
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
            <a href="/shop">Back to Shop</a>
          </Button>
        </div>
      </div>
    );
  }

  if (order.status === 'PENDING_PAYMENT') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <Typography variant="h2" className="mb-4">
            Processing Payment...
          </Typography>
          <Typography variant="p" className="text-muted-foreground">
            We&apos;re confirming your payment. This usually takes a few
            seconds.
          </Typography>
          <div className="mt-6 animate-pulse">
            <div className="h-2 bg-primary/20 rounded-full">
              <div className="h-2 bg-primary rounded-full w-1/2 animate-[pulse_1s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Typography variant="h1" className="mb-2">
          Review Your Order
        </Typography>
        <Typography variant="p" className="text-muted-foreground mb-8">
          Payment received! Please review your order details and confirm.
        </Typography>

        <OrderSummary order={order} />

        {order.status === 'PAID' && (
          <div className="mt-8">
            <Button
              onClick={handleConfirm}
              disabled={confirming}
              className="w-full py-3 px-6 font-semibold"
              size="xl"
            >
              {confirming ? 'Confirming...' : 'Confirm Order'}
            </Button>
          </div>
        )}

        {order.status === 'CONFIRMED' && (
          <div className="mt-8 text-center">
            <Typography variant="p" className="text-muted-foreground">
              This order has already been confirmed.
            </Typography>
            <Button asChild className="mt-4">
              <a href={`/shop/success/${orderId}`}>View Receipt</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
