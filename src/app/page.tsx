'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useArtwork } from '@/hooks/useArtwork';
import { isShopEnabled } from '@/lib/shop';

export default function Home() {
  const shopEnabled = isShopEnabled();

  const {
    artworks: featuredArtwork,
    loading,
    error,
  } = useArtwork({
    limit: 3,
    sortBy: 'completedAt',
    sortOrder: 'desc',
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-12">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6b5849] to-[#3f6f54] pb-4">
              Joyce Art Studio
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Experience original artwork that preserves moments, emotions and
            personal stories. Each artwork is crafted crafted with thought and
            heart.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {shopEnabled && (
              <Button asChild size="xl">
                <Link href="/shop">Shop Now</Link>
              </Button>
            )}
            <Button asChild size="xl">
              <Link href="/portfolio">Explore Portfolio</Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link href="/about">Meet the Artist</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Artwork Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Artwork</h2>
            <p className="text-xl max-w-2xl mx-auto">
              A curated selection of recent pieces showcasing diverse styles and
              techniques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Skeleton loading state
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <div className="aspect-[4/5] relative bg-gray-200 animate-pulse">
                      <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-400/80 to-transparent p-6">
                      <div className="h-6 bg-gray-300 rounded mb-2 animate-pulse"></div>
                      <div className="h-4 bg-gray-300 rounded mb-1 animate-pulse"></div>
                      <div className="h-4 bg-gray-300 rounded mb-2 animate-pulse"></div>
                      <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : error ? (
              // Error state
              <div className="col-span-full text-center py-12">
                <p className="text-red-600 mb-4">
                  Error loading featured artwork: {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Try Again
                </button>
              </div>
            ) : (
              // Actual artwork
              featuredArtwork.map(artwork => (
                <div key={artwork.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-[4/5] relative">
                      <Image
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <h3 className="text-white text-xl font-semibold mb-2">
                        {artwork.title}
                      </h3>
                      <p className="text-gray-200 text-sm mb-1">
                        {artwork.medium}
                      </p>
                      <p className="text-gray-200 text-sm mb-2">
                        {artwork.dimensions}
                      </p>
                      <p className="text-white text-lg font-bold">
                        {artwork.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Button variant="link" asChild>
              <Link href="/portfolio">
                View All Artwork
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold mb-6">Meet Joyce</h2>
              <p className="text-lg mb-6">
                Joyce Rasfeld has been passionate about drawing since childhood,
                finding creativity to be her natural language of expression. She
                earned a B.S. in Studio Art and a B.F.A. in Art Education from
                Miami University, where she deepened her love for using art as
                both a way to understand the world and to share her perspective
                with others.
              </p>
              <p className="text-lg mb-8">
                Inspired by the beauty of everyday life, Joyce often draws from
                the colors, shapes, and spatial relationships she observes in
                outdoor scenery. When she isn&apos;t creating, she enjoys time
                at home with her husband, their two young children and a lively
                household of four cats.
              </p>
              <Button variant="link" asChild>
                <Link href="/about">
                  Learn More About Joyce
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="aspect-square bg-card rounded-lg overflow-hidden shadow-xl bg-peach w-80 h-80 mx-auto">
              <Image
                src="/images/me.png"
                alt="Joyce in her studio"
                width={320}
                height={320}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Piece?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Whether you&apos;re looking for a statement piece for your home or a
            unique gift, explore our collection or inquire about custom
            commissions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {shopEnabled && (
              <Button asChild variant="secondary" size="xl">
                <Link href="/shop">Shop Now</Link>
              </Button>
            )}
            <Button asChild variant="secondary" size="xl">
              <Link href="/portfolio">Browse Portfolio</Link>
            </Button>
            <Button asChild variant="outline-white" size="xl">
              <Link href="/contact">Contact Joyce</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
