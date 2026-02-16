'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { ImageUpload } from '@/components/image-upload';
import { QuantitySelector } from '@/components/quantity-selector';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/context/cart-context';
import { getProduct } from '@/lib/products';
import type { ProductSlug } from '@/lib/products';

const productFormSchema = z.object({
  notes: z.string().optional(),
  imageUrls: z
    .array(z.url())
    .min(1, 'At least one reference image is required')
    .max(5, 'Maximum 5 images allowed'),
  quantity: z.number().int().positive(),
});

type ProductFormData = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  productSlug: string;
}

export function ProductForm({ productSlug }: ProductFormProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const product = getProduct(productSlug);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      quantity: 1,
      imageUrls: [],
    },
  });

  const imageUrls = watch('imageUrls');
  const quantity = watch('quantity');

  if (!product) return null;

  const onSubmit = (data: ProductFormData) => {
    if (data.imageUrls.length === 0) {
      toast.error('Please upload at least one reference image.');
      return;
    }

    setIsSubmitting(true);

    addItem({
      productSlug: productSlug as ProductSlug,
      quantity: data.quantity,
      imageUrls: data.imageUrls,
      notes: data.notes || '',
    });

    toast.success('Added to cart!');
    router.push('/cart');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {product.quantityOptions && (
        <div>
          <Label>Quantity *</Label>
          <div className="mt-2">
            <QuantitySelector
              value={quantity}
              onChange={qty => setValue('quantity', qty)}
            />
          </div>
        </div>
      )}

      <div>
        <Label>Reference Images *</Label>
        <div className="mt-2">
          <ImageUpload
            value={imageUrls}
            onChange={urls =>
              setValue('imageUrls', urls, { shouldValidate: true })
            }
          />
        </div>
        {errors.imageUrls && (
          <p className="text-sm text-destructive mt-1">
            {errors.imageUrls.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="notes">Notes & Special Requests (optional)</Label>
        <Textarea
          id="notes"
          placeholder="Tell us about your photo and any special details you'd like included."
          rows={4}
          {...register('notes')}
        />
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>What happens next?</strong> After adding to your cart, you
          can continue shopping or proceed to checkout where you&apos;ll
          enter your contact info, shipping address, and payment details.
        </p>
      </div>

      <Button
        type="submit"
        className="w-full py-3 px-6 font-semibold"
        disabled={isSubmitting || imageUrls.length === 0}
      >
        {isSubmitting ? 'Adding...' : 'Add to Cart'}
      </Button>
    </form>
  );
}
