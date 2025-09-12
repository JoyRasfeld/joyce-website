'use client';

import { useEffect, useState } from 'react';
import { useArtwork } from '@/hooks/useArtwork';
import Image from 'next/image';

const categories = [
  'All',
  'My Mini',
  'Landscape',
  'Portrait',
  'Abstract',
  'Mixed Media',
  'Still Life',
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const { artworks } = useArtwork({});
  const [selectedImage, setSelectedImage] = useState<
    (typeof artworks)[0] | null
  >(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const filteredArtwork = artworks
    .filter(
      artwork =>
        selectedCategory === 'All' || artwork.category === selectedCategory
    )
    .sort((a, b) => {
      if (sortBy === 'newest')
        return (
          new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
        );
      if (sortBy === 'oldest')
        return (
          new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime()
        );
      if (sortBy === 'title-a-z') return a.title.localeCompare(b.title);
      if (sortBy === 'title-z-a') return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <div className="min-h-screen bg-peach-floral">
      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 z-10"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative">
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                width={800}
                height={1000}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                onClick={e => e.stopPropagation()}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-lg">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-200 text-sm mb-1">
                  {selectedImage.medium}
                </p>
                <p className="text-gray-200 text-sm mb-2">
                  {selectedImage.dimensions}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-bold text-white">
                    {selectedImage.price}
                  </p>
                  <span className="text-gray-300 text-sm">
                    {new Date(selectedImage.completedAt).getFullYear()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <section className="bg-white/70 backdrop-blur-sm border-b border-peach">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-earth-brown mb-4">
              Art Portfolio
            </h1>
            <p className="text-xl text-earth-brown-2 max-w-2xl mx-auto">
              Explore my collection of original artwork. Each piece is carefully
              crafted to bring joy and emotion to your space.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Sorting */}
      <section className="bg-white/70 backdrop-blur-sm border-b border-peach">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-earth-green text-white'
                      : 'bg-peach text-earth-brown-2 hover:bg-peach-light'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-earth-brown">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="border border-peach rounded-md px-3 py-2 text-sm text-earth-brown bg-white focus:outline-none focus:ring-2 focus:ring-[#3f6f54] focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title-a-z">Title: A to Z</option>
                <option value="title-z-a">Title: Z to A</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArtwork.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No artwork found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredArtwork.map(artwork => (
                <div key={artwork.id} className="group cursor-pointer h-full">
                  <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 bg-white h-full flex flex-col">
                    <div
                      className="aspect-[4/5] relative cursor-pointer"
                      onClick={() => setSelectedImage(artwork)}
                    >
                      <Image
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold text-earth-brown mb-2 group-hover:text-earth-green transition-colors duration-200">
                        {artwork.title}
                      </h3>
                      <p className="text-earth-brown-2 text-sm mb-1">
                        {artwork.medium}
                      </p>
                      <p className="text-earth-brown-2 text-sm mb-2">
                        {artwork.dimensions}
                      </p>
                      <div className="flex justify-end mt-auto">
                        <span className="text-sm text-earth-green">
                          {new Date(artwork.completedAt).getFullYear()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white/70 backdrop-blur-sm border-t border-peach">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-earth-brown mb-4">
              Interested in a Custom Piece?
            </h2>
            <p className="text-lg text-earth-brown-2 mb-8 max-w-2xl mx-auto">
              Joyce accepts commission requests for custom artwork. Let&apos;s
              discuss your vision and create something truly unique for your
              space.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center bg-earth-green text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-colors duration-200"
            >
              Inquire About Commissions
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
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
