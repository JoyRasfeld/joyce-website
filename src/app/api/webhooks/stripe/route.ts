import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';

import {
  cancelOrder,
  getOrderBySessionId,
  markOrderPaid,
  sendOrderNotificationEmail,
} from '@/lib/order';
import { getStripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET is not set');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        // Idempotency: skip if already PAID
        const existing = await getOrderBySessionId(session.id);
        if (existing?.status === 'PAID') break;

        const paymentIntentId =
          typeof session.payment_intent === 'string'
            ? session.payment_intent
            : session.payment_intent?.id ?? '';

        const shipping =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (session as any).shipping_details as
            | {
                name?: string;
                address?: {
                  line1?: string;
                  line2?: string;
                  city?: string;
                  state?: string;
                  postal_code?: string;
                  country?: string;
                };
              }
            | undefined;

        const order = await markOrderPaid(session.id, paymentIntentId, {
          name: shipping?.name ?? undefined,
          addressLine1: shipping?.address?.line1 ?? undefined,
          addressLine2: shipping?.address?.line2 ?? undefined,
          city: shipping?.address?.city ?? undefined,
          state: shipping?.address?.state ?? undefined,
          postalCode: shipping?.address?.postal_code ?? undefined,
          country: shipping?.address?.country ?? undefined,
        });

        try {
          await sendOrderNotificationEmail(order.id);
        } catch (emailError) {
          console.error('Failed to send notification email:', emailError);
        }
        break;
      }
      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        await cancelOrder(session.id);
        break;
      }
    }
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
