import type { ProductType } from '@prisma/client';
import { Resend } from 'resend';

import { getProduct, getProductPrice } from '@/lib/products';
import { getStripe } from '@/lib/stripe';
import type { CreateOrderInput } from '@/types/order';

import { prisma } from './prisma';

const PRODUCT_TYPE_TO_SLUG: Record<string, string> = {
  MINIATURE_HOUSE: 'miniature-house',
  ANIMAL_MAGNETS: 'animal-magnets',
  FRAMED_HOUSE: 'framed-house',
};

const SLUG_TO_PRODUCT_TYPE: Record<string, ProductType> = {
  'miniature-house': 'MINIATURE_HOUSE',
  'animal-magnets': 'ANIMAL_MAGNETS',
  'framed-house': 'FRAMED_HOUSE',
};

export async function createOrder(input: CreateOrderInput) {
  // Calculate prices server-side for each item
  const itemsWithPrices = input.items.map(item => {
    const product = getProduct(item.productSlug);
    if (!product) throw new Error(`Invalid product: ${item.productSlug}`);

    const unitPrice = getProductPrice(item.productSlug, item.quantity);
    if (unitPrice <= 0) throw new Error('Invalid price calculation');

    return {
      productType: SLUG_TO_PRODUCT_TYPE[item.productSlug],
      quantity: item.quantity,
      notes: item.notes ?? null,
      imageUrls: item.imageUrls,
      unitPrice,
    };
  });

  const totalAmount = itemsWithPrices.reduce(
    (sum, item) => sum + item.unitPrice,
    0
  );

  return prisma.order.create({
    data: {
      name: input.name,
      email: input.email,
      phone: input.phone ?? null,
      amount: totalAmount,
      status: 'DRAFT',
      items: {
        create: itemsWithPrices,
      },
    },
    include: { items: true },
  });
}

export async function getOrder(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
}

export async function getOrderBySessionId(sessionId: string) {
  return prisma.order.findUnique({
    where: { stripeCheckoutSessionId: sessionId },
    include: { items: true },
  });
}

export async function markOrderPendingPayment(id: string, sessionId: string) {
  return prisma.order.update({
    where: { id },
    data: {
      stripeCheckoutSessionId: sessionId,
      status: 'PENDING_PAYMENT',
    },
  });
}

export async function markOrderPaid(
  sessionId: string,
  paymentIntentId: string,
  shipping?: {
    name?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  }
) {
  // Idempotency: if already PAID, return the existing order
  const existing = await getOrderBySessionId(sessionId);
  if (existing?.status === 'PAID') return existing;

  return prisma.order.update({
    where: { stripeCheckoutSessionId: sessionId },
    data: {
      stripePaymentIntentId: paymentIntentId,
      status: 'PAID',
      shippingName: shipping?.name ?? null,
      shippingAddressLine1: shipping?.addressLine1 ?? null,
      shippingAddressLine2: shipping?.addressLine2 ?? null,
      shippingCity: shipping?.city ?? null,
      shippingState: shipping?.state ?? null,
      shippingPostalCode: shipping?.postalCode ?? null,
      shippingCountry: shipping?.country ?? null,
    },
    include: { items: true },
  });
}

/**
 * Verifies payment with Stripe and marks the order as PAID if not yet done.
 * Called by the success page on load — fallback if webhook hasn't processed yet.
 */
export async function verifyAndMarkPaid(
  orderId: string,
  stripeSessionId: string
) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });
  if (!order) throw new Error('Order not found');
  if (order.status === 'PAID') return order;

  // Verify payment with Stripe
  const session =
    await getStripe().checkout.sessions.retrieve(stripeSessionId);
  if (session.payment_status !== 'paid') {
    throw new Error('Payment not completed');
  }

  // If webhook hasn't processed yet, apply the same transitions
  if (order.status === 'PENDING_PAYMENT') {
    const paymentIntentId =
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent?.id ?? '';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const shipping = (session as any).shipping_details as
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

    const updated = await markOrderPaid(session.id, paymentIntentId, {
      name: shipping?.name ?? undefined,
      addressLine1: shipping?.address?.line1 ?? undefined,
      addressLine2: shipping?.address?.line2 ?? undefined,
      city: shipping?.address?.city ?? undefined,
      state: shipping?.address?.state ?? undefined,
      postalCode: shipping?.address?.postal_code ?? undefined,
      country: shipping?.address?.country ?? undefined,
    });

    try {
      await sendOrderNotificationEmail(orderId);
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
    }

    return updated;
  }

  return order;
}

export async function cancelOrder(sessionId: string) {
  const order = await prisma.order.findUnique({
    where: { stripeCheckoutSessionId: sessionId },
  });
  if (!order || order.status !== 'PENDING_PAYMENT') return null;

  return prisma.order.update({
    where: { stripeCheckoutSessionId: sessionId },
    data: { status: 'CANCELLED' },
  });
}

export async function sendOrderNotificationEmail(orderId: string) {
  if (!process.env.RESEND_API_KEY) return;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });
  if (!order) return;

  const resend = new Resend(process.env.RESEND_API_KEY);

  const itemsHtml = order.items
    .map(item => {
      const product = getProduct(
        PRODUCT_TYPE_TO_SLUG[item.productType] ?? ''
      );
      return `
        <div style="background-color: #f8f9fa; padding: 16px; border-radius: 8px; margin: 12px 0;">
          <p><strong>Product:</strong> ${product?.name ?? item.productType}</p>
          <p><strong>Quantity:</strong> ${item.quantity}</p>
          <p><strong>Price:</strong> $${(item.unitPrice / 100).toFixed(2)}</p>
          ${item.notes ? `<p><strong>Notes:</strong> ${item.notes}</p>` : ''}
          ${
            item.imageUrls.length > 0
              ? `<div>${item.imageUrls.map(url => `<img src="${url}" alt="Reference" style="max-width: 200px; height: auto; border-radius: 8px; margin: 4px;" />`).join('')}</div>`
              : ''
          }
        </div>
      `;
    })
    .join('');

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: ['joy.rasfeld@gmail.com'],
    subject: `New Custom Order from ${order.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Custom Order</h2>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #555;">Order Summary</h3>
          <p><strong>Order ID:</strong> ${order.id}</p>
          <p><strong>Total:</strong> $${(order.amount / 100).toFixed(2)}</p>
        </div>

        <h3 style="color: #555;">Items</h3>
        ${itemsHtml}

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #555;">Customer Information</h3>
          <p><strong>Name:</strong> ${order.name}</p>
          <p><strong>Email:</strong> ${order.email}</p>
          ${order.phone ? `<p><strong>Phone:</strong> ${order.phone}</p>` : ''}
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

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; color: #666; font-size: 14px;">
          <p>This order was placed on ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `,
  });
}
