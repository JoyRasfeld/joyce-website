'use client';

import { useArtwork } from '@/hooks/useArtwork';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const {
    artworks: featuredArtwork,
    loading,
    error,
  } = useArtwork({
    limit: 3,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-homepage py-20">
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(255,255,255,0)' }}
        ></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold text-earth-brown mb-6">
            Welcome to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6b5849] to-[#3f6f54] pb-4">
              Joyce Art Studio
            </span>
          </h1>
          <p className="text-lg md:text-xl text-earth-brown-2 mb-8 max-w-2xl mx-auto">
            Experience original artwork that preserves moments, emotions and
            personal stories. Each artwork is crafted crafted with thought and
            heart.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="bg-earth-green text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-colors duration-200"
            >
              Shop Now
            </Link>
            <Link
              href="/portfolio"
              className="border-2 border-earth-green text-earth-green px-8 py-4 rounded-lg text-lg font-semibold hover:bg-earth-green hover:text-white transition-colors duration-200"
            >
              Explore Portfolio
            </Link>
            <Link
              href="/about"
              className="border-2 border-earth-green text-earth-green px-8 py-4 rounded-lg text-lg font-semibold hover:bg-earth-green hover:text-white transition-colors duration-200"
            >
              Meet the Artist
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Artwork Section */}
      <section className="py-20 bg-homepage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-earth-brown mb-4">
              Featured Artwork
            </h2>
            <p className="text-xl text-earth-brown-2 max-w-2xl mx-auto">
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
            <Link
              href="/portfolio"
              className="inline-flex items-center text-earth-green hover:opacity-90 font-semibold text-lg"
            >
              View All Artwork
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-homepage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold text-earth-brown mb-6">
                Meet Joyce
              </h2>
              <p className="text-lg text-earth-brown-2 mb-6">
                Joyce Rasfeld has been passionate about drawing since childhood,
                finding creativity to be her natural language of expression. She
                earned a B.S. in Studio Art and a B.F.A. in Art Education from
                Miami University, where she deepened her love for using art as
                both a way to understand the world and to share her perspective
                with others.
              </p>
              <p className="text-lg text-earth-brown-2 mb-8">
                Inspired by the beauty of everyday life, Joyce often draws from
                the colors, shapes, and spatial relationships she observes in
                outdoor scenery. When she isn't creating, she enjoys time at
                home with her husband, their two young children and a lively
                household of four cats.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-earth-green hover:opacity-90 font-semibold text-lg"
              >
                Learn More About Joyce
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden shadow-xl bg-peach w-80 h-80 mx-auto">
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
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-earth-green">
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
            <Link
              href="/shop"
              className="bg-white text-earth-green px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/90 transition-colors duration-200"
            >
              Shop Now
            </Link>
            <Link
              href="/portfolio"
              className="bg-white text-earth-green px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/90 transition-colors duration-200"
            >
              Browse Portfolio
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-earth-green transition-colors duration-200"
            >
              Contact Joyce
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
