import { z } from 'zod';

export const orderFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Please enter a valid email address'),
  phone: z.string().optional(),
  notes: z.string().optional(),
  imageUrls: z
    .array(z.url())
    .min(1, 'At least one reference image is required')
    .max(5, 'Maximum 5 images allowed'),
  quantity: z.number().int().positive(),
});

export type OrderFormData = z.infer<typeof orderFormSchema>;

export const createOrderSchema = z.object({
  productSlug: z.enum(['miniature-house', 'animal-magnets', 'framed-house']),
  name: z.string().min(1).max(200),
  email: z.email().max(320),
  phone: z.string().max(30).optional(),
  notes: z.string().max(2000).optional(),
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
  quantity: z.number().int().min(1).max(4).default(1),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export interface OrderResponse {
  id: string;
  productType: string;
  quantity: number;
  name: string;
  email: string;
  phone: string | null;
  notes: string | null;
  imageUrls: string[];
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
