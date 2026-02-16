'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Typography } from '@/components/ui/typography';
import { useCart } from '@/context/cart-context';
import { getProduct, getProductPrice } from '@/lib/products';
import { isShopEnabled } from '@/lib/shop';

const customerFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
});

type CustomerFormData = z.infer<typeof customerFormSchema>;

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse h-96 w-full max-w-3xl bg-muted rounded-lg" />
        </div>
      }
    >
      <CartPageContent />
    </Suspense>
  );
}

function CartPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items, removeItem, updateQuantity, totalPrice, clearCart } =
    useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shopEnabled = isShopEnabled();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerFormSchema),
  });

  useEffect(() => {
    if (!shopEnabled) {
      router.replace('/');
    }
  }, [shopEnabled, router]);

  useEffect(() => {
    if (searchParams.get('cancelled') === 'true') {
      toast.error('Payment was cancelled. You can try again when ready.');
    }
  }, [searchParams]);

  if (!shopEnabled) return null;

  const onSubmit = async (data: CustomerFormData) => {
    if (items.length === 0) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            productSlug: item.productSlug,
            quantity: item.quantity,
            imageUrls: item.imageUrls,
            notes: item.notes || undefined,
          })),
          name: data.name,
          email: data.email,
          phone: data.phone || undefined,
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
      toast.error(
        'Network error. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <Typography variant="h2" className="mb-2">
            Your Cart is Empty
          </Typography>
          <Typography variant="p" className="text-muted-foreground mb-6">
            Browse our custom products and add something special to your
            cart.
          </Typography>
          <Button asChild>
            <Link href="/shop">Browse Shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Typography variant="h1" className="mb-8">
          Your Cart
        </Typography>

        {/* Cart Items */}
        <div className="space-y-4 mb-8">
          {items.map(item => {
            const product = getProduct(item.productSlug);
            if (!product) return null;
            const linePrice = getProductPrice(
              item.productSlug,
              item.quantity
            );

            return (
              <div
                key={item.id}
                className="bg-muted/50 rounded-lg p-3 sm:p-4"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Thumbnail */}
                  {item.imageUrls.length > 0 ? (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 relative rounded overflow-hidden border border-border shrink-0">
                      <Image
                        src={item.imageUrls[0]}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded border border-border bg-muted shrink-0" />
                  )}

                  {/* Name + optional second row for notes/extra images */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base sm:text-lg truncate">
                      {product.name}
                    </h3>
                    {(item.notes || item.imageUrls.length > 1) && (
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        {item.notes && (
                          <p className="text-sm text-muted-foreground truncate max-w-full">
                            {item.notes}
                          </p>
                        )}
                        {item.imageUrls.length > 1 && (
                          <div className="flex gap-1">
                            {item.imageUrls.slice(1, 4).map((url, i) => (
                              <div
                                key={i}
                                className="w-8 h-8 relative rounded overflow-hidden border border-border"
                              >
                                <Image
                                  src={url}
                                  alt=""
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                            {item.imageUrls.length > 4 && (
                              <span className="text-xs text-muted-foreground self-center">
                                +{item.imageUrls.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Quantity */}
                  {product.quantityOptions ? (
                    <QuantitySelector
                      product={product}
                      value={item.quantity}
                      onChange={qty =>
                        updateQuantity(item.id, qty)
                      }
                    />
                  ) : (
                    <QuantityStepper
                      value={item.quantity}
                      min={1}
                      max={4}
                      onChange={qty =>
                        updateQuantity(item.id, qty)
                      }
                      onRemove={() => removeItem(item.id)}
                    />
                  )}

                  <p className="font-bold text-base sm:text-lg w-16 text-right shrink-0">
                    ${(linePrice / 100).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1 shrink-0"
                    aria-label={`Remove ${product.name}`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Total */}
        <div className="flex justify-between items-center p-4 bg-card border rounded-lg mb-8">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-2xl font-bold text-primary">
            ${(totalPrice / 100).toFixed(2)}
          </span>
        </div>

        {/* Customer Info + Checkout */}
        <div className="bg-muted/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">
            Contact Information
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>What happens next?</strong> You&apos;ll be
                redirected to a secure Stripe checkout page to enter your
                shipping address and payment details.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full py-3 px-6 font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Order...' : 'Proceed to Checkout'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function QuantityStepper({
  value,
  min,
  max,
  onChange,
  onRemove,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (qty: number) => void;
  onRemove?: () => void;
}) {
  const atMin = value <= min;
  const showRemove = atMin && onRemove;

  return (
    <div className="inline-flex items-center rounded-md border border-border overflow-hidden shrink-0">
      <button
        type="button"
        onClick={() =>
          showRemove ? onRemove() : onChange(Math.max(min, value - 1))
        }
        className="p-2 text-muted-foreground hover:text-destructive hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
        aria-label={showRemove ? 'Remove item' : 'Decrease quantity'}
      >
        {showRemove ? (
          <Trash2 className="w-4 h-4" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
      </button>
      <span className="min-w-[2rem] text-center text-sm font-medium py-1">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-50 disabled:pointer-events-none transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}

function QuantitySelector({
  product,
  value,
  onChange,
}: {
  product: { quantityOptions?: { quantity: number; price: number; label: string }[] };
  value: number;
  onChange: (qty: number) => void;
}) {
  if (!product.quantityOptions) return null;

  return (
    <div className="flex gap-2">
      {product.quantityOptions.map(option => (
        <button
          key={option.quantity}
          type="button"
          onClick={() => onChange(option.quantity)}
          className={`text-sm px-3 py-1 rounded-md border transition-colors ${
            value === option.quantity
              ? 'border-primary bg-primary/5 font-medium'
              : 'border-border hover:border-primary/50'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
