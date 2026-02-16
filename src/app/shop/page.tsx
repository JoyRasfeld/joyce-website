import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { ALL_PRODUCTS } from '@/lib/products';

export default function Shop() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-12 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Typography variant="h1" className="mb-6">
            Shop
          </Typography>
          <Typography variant="lead" className="max-w-3xl mx-auto">
            Choose from hand-painted miniature houses, adorable animal magnets,
            or framed house artwork. Each piece is custom-made from your photos.
          </Typography>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ALL_PRODUCTS.map(product => (
              <Link
                key={product.slug}
                href={`/shop/${product.slug}`}
                className="group"
              >
                <div className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[4/3] relative bg-muted">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">
                      {product.name}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-primary">
                        {product.quantityOptions
                          ? `From $${(product.quantityOptions[0].price / 100).toFixed(2)}`
                          : `$${(product.basePrice / 100).toFixed(2)}`}
                      </p>
                      <span className="text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Order Now
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              How It Works
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Choose Your Product',
                desc: 'Select from miniature houses, animal magnets, or framed house art',
              },
              {
                step: 2,
                title: 'Upload Your Photos',
                desc: 'Share reference images of what you want recreated',
              },
              {
                step: 3,
                title: 'Secure Checkout',
                desc: 'Enter shipping and payment details via Stripe',
              },
              {
                step: 4,
                title: 'Delivered to You',
                desc: 'Your custom piece is handcrafted and shipped to your door',
              },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  {item.step}
                </div>
                <Typography variant="h4" className="mb-2">
                  {item.title}
                </Typography>
                <Typography variant="small" className="text-muted-foreground">
                  {item.desc}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Typography variant="h2" className="mb-4">
            Have Questions?
          </Typography>
          <Typography variant="p" className="text-muted-foreground mb-8">
            Reach out if you have any questions about custom orders or want to
            discuss a special project.
          </Typography>
          <Button asChild variant="outline" size="xl">
            <Link href="/contact">
              Contact Joyce
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
