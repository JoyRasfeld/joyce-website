import type { ProductType } from '@prisma/client';

import { getProduct, getProductPrice } from '@/lib/products';
import type { CreateOrderInput } from '@/types/order';

import { prisma } from './prisma';

const SLUG_TO_PRODUCT_TYPE: Record<string, ProductType> = {
  'miniature-house': 'MINIATURE_HOUSE',
  'animal-magnets': 'ANIMAL_MAGNETS',
  'framed-house': 'FRAMED_HOUSE',
};

export async function createOrder(input: CreateOrderInput) {
  const product = getProduct(input.productSlug);
  if (!product) throw new Error('Invalid product');

  const amount = getProductPrice(input.productSlug, input.quantity);
  if (amount <= 0) throw new Error('Invalid price calculation');

  return prisma.order.create({
    data: {
      productType: SLUG_TO_PRODUCT_TYPE[input.productSlug],
      quantity: input.quantity,
      name: input.name,
      email: input.email,
      phone: input.phone ?? null,
      notes: input.notes ?? null,
      imageUrls: input.imageUrls,
      amount,
      status: 'DRAFT',
    },
  });
}

export async function getOrder(id: string) {
  return prisma.order.findUnique({ where: { id } });
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
  });
}

export async function confirmOrder(id: string) {
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) throw new Error('Order not found');
  if (order.status !== 'PAID') throw new Error('Order is not paid');

  return prisma.order.update({
    where: { id },
    data: { status: 'CONFIRMED' },
  });
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
