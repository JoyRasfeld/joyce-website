'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ImageUpload } from '@/components/image-upload';
import { QuantitySelector } from '@/components/quantity-selector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getProduct } from '@/lib/products';
import type { OrderFormData } from '@/types/order';
import { orderFormSchema } from '@/types/order';

interface OrderFormProps {
  productSlug: string;
}

export function OrderForm({ productSlug }: OrderFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const product = getProduct(productSlug);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      quantity: product?.quantityOptions ? 1 : 1,
      imageUrls: [],
    },
  });

  const imageUrls = watch('imageUrls');
  const quantity = watch('quantity');

  useEffect(() => {
    if (searchParams.get('cancelled') === 'true') {
      toast.error('Payment was cancelled. You can try again when ready.');
    }
  }, [searchParams]);

  if (!product) return null;

  const onSubmit = async (data: OrderFormData) => {
    if (data.imageUrls.length === 0) {
      toast.error('Please upload at least one reference image.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productSlug,
          name: data.name,
          email: data.email,
          phone: data.phone || undefined,
          notes: data.notes || undefined,
          imageUrls: data.imageUrls,
          quantity: data.quantity,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || 'Failed to create order.');
        return;
      }

      if (result.checkoutUrl) {
        router.push(result.checkoutUrl);
      }
    } catch {
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            {...register('name')}
            className={errors.name ? 'border-destructive' : ''}
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            {...register('email')}
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="(555) 123-4567"
          {...register('phone')}
        />
      </div>

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
          <strong>What happens next?</strong> After submitting, you&apos;ll be
          redirected to a secure Stripe checkout page to enter your shipping
          address and payment details.
        </p>
      </div>

      <Button
        type="submit"
        className="w-full py-3 px-6 font-semibold"
        disabled={isSubmitting || imageUrls.length === 0}
      >
        {isSubmitting ? 'Creating Order...' : 'Proceed to Checkout'}
      </Button>
    </form>
  );
}
