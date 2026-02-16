import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { ProductForm } from '@/components/product-form';
import { Typography } from '@/components/ui/typography';
import { ALL_PRODUCTS, getProduct } from '@/lib/products';

export function generateStaticParams() {
  return ALL_PRODUCTS.map(p => ({ productSlug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;
  const product = getProduct(productSlug);
  if (!product) return {};

  return {
    title: `Order ${product.name} - Joyce Art Studio`,
    description: product.description,
  };
}

export default async function ProductOrderPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;
  const product = getProduct(productSlug);

  if (!product) notFound();

  return (
    <div className="min-h-screen">
      <section className="py-8 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-8">
            <Link
              href="/shop"
              className="text-muted-foreground hover:text-primary"
            >
              Custom Orders
            </Link>
            <span className="text-muted-foreground mx-2">/</span>
            <span>{product.name}</span>
          </nav>

          <Typography variant="h1" className="mb-4">
            {product.name}
          </Typography>
          <Typography variant="p" className="text-muted-foreground mb-2">
            {product.description}
          </Typography>

          <div className="mb-8">
            <p className="text-2xl font-bold text-primary">
              {product.quantityOptions
                ? `From $${(product.quantityOptions[0].price / 100).toFixed(2)}`
                : `$${(product.basePrice / 100).toFixed(2)}`}
            </p>
          </div>

          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-8">
            {product.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>

          <Suspense
            fallback={
              <div className="animate-pulse h-96 bg-muted rounded-lg" />
            }
          >
            <ProductForm productSlug={productSlug} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
