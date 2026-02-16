import { z } from 'zod';

const cartItemSchema = z.object({
  productSlug: z.enum(['miniature-house', 'animal-magnets', 'framed-house']),
  quantity: z.number().int().min(1).max(4).default(1),
  imageUrls: z
    .array(
      z
        .url()
        .refine(
          url => url.startsWith('https://res.cloudinary.com/'),
          'Images must be hosted on Cloudinary'
        )
    )
    .min(1)
    .max(5),
  notes: z.string().max(2000).optional(),
});

export const createOrderSchema = z.object({
  items: z.array(cartItemSchema).min(1).max(10),
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  phone: z.string().max(30).optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type CartItemInput = z.infer<typeof cartItemSchema>;

export interface OrderItemResponse {
  id: string;
  productType: string;
  quantity: number;
  notes: string | null;
  imageUrls: string[];
  unitPrice: number;
}

export interface OrderResponse {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  items: OrderItemResponse[];
  shippingName: string | null;
  shippingAddressLine1: string | null;
  shippingAddressLine2: string | null;
  shippingCity: string | null;
  shippingState: string | null;
  shippingPostalCode: string | null;
  shippingCountry: string | null;
  amount: number;
  status: string;
  createdAt: string;
}
