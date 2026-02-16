'use client';

import Image from 'next/image';

import { getProduct } from '@/lib/products';
import type { OrderResponse } from '@/types/order';

const PRODUCT_TYPE_TO_SLUG: Record<string, string> = {
  MINIATURE_HOUSE: 'miniature-house',
  ANIMAL_MAGNETS: 'animal-magnets',
  FRAMED_HOUSE: 'framed-house',
};

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  DRAFT: { label: 'Draft', className: 'bg-muted text-muted-foreground' },
  PENDING_PAYMENT: {
    label: 'Pending Payment',
    className: 'bg-yellow-100 text-yellow-800',
  },
  PAID: { label: 'Paid', className: 'bg-blue-100 text-blue-800' },
  CONFIRMED: { label: 'Confirmed', className: 'bg-green-100 text-green-800' },
  CANCELLED: { label: 'Cancelled', className: 'bg-red-100 text-red-800' },
};

interface OrderSummaryProps {
  order: OrderResponse;
}

export function OrderSummary({ order }: OrderSummaryProps) {
  const product = getProduct(PRODUCT_TYPE_TO_SLUG[order.productType] ?? '');
  const status = STATUS_LABELS[order.status] ?? STATUS_LABELS.DRAFT;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Order Details</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      <div className="bg-card border rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Product</p>
            <p className="font-medium">{product?.name ?? order.productType}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Quantity</p>
            <p className="font-medium">{order.quantity}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Amount</p>
            <p className="font-medium text-lg">
              ${(order.amount / 100).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Order ID</p>
            <p className="font-mono text-sm">{order.id}</p>
          </div>
        </div>
      </div>

      <div className="bg-card border rounded-lg p-6 space-y-3">
        <h4 className="font-semibold">Customer Information</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p>{order.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p>{order.email}</p>
          </div>
          {order.phone && (
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p>{order.phone}</p>
            </div>
          )}
        </div>
        {order.notes && (
          <div>
            <p className="text-sm text-muted-foreground">Notes</p>
            <p className="whitespace-pre-wrap">{order.notes}</p>
          </div>
        )}
      </div>

      {order.shippingName && (
        <div className="bg-card border rounded-lg p-6 space-y-3">
          <h4 className="font-semibold">Shipping Address</h4>
          <p>
            {order.shippingName}
            <br />
            {order.shippingAddressLine1}
            {order.shippingAddressLine2 && (
              <>
                <br />
                {order.shippingAddressLine2}
              </>
            )}
            <br />
            {order.shippingCity}, {order.shippingState}{' '}
            {order.shippingPostalCode}
            <br />
            {order.shippingCountry}
          </p>
        </div>
      )}

      {order.imageUrls.length > 0 && (
        <div className="bg-card border rounded-lg p-6 space-y-3">
          <h4 className="font-semibold">Reference Images</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {order.imageUrls.map((url, i) => (
              <div
                key={i}
                className="aspect-square relative rounded-lg overflow-hidden border"
              >
                <Image
                  src={url}
                  alt={`Reference image ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
