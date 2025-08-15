'use client';

import { useState } from 'react';
import Image from 'next/image';

// Mock data for gallery artwork
const allArtwork = [
  {
    id: 1,
    title: 'Sunset Over Mountains',
    medium: 'Oil on Canvas',
    dimensions: '24" x 36"',
    price: '$1,200',
    imageUrl:
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop',
    category: 'Landscape',
    year: 2024,
    available: true,
  },
  {
    id: 2,
    title: 'Abstract Harmony',
    medium: 'Acrylic on Canvas',
    dimensions: '30" x 40"',
    price: '$1,800',
    imageUrl:
      'https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&h=500&fit=crop',
    category: 'Abstract',
    year: 2024,
    available: true,
  },
  {
    id: 3,
    title: 'Portrait of Grace',
    medium: 'Charcoal on Paper',
    dimensions: '18" x 24"',
    price: '$800',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    category: 'Portrait',
    year: 2023,
    available: true,
  },
  {
    id: 4,
    title: 'Ocean Waves',
    medium: 'Watercolor on Paper',
    dimensions: '22" x 30"',
    price: '$950',
    imageUrl:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
    category: 'Seascape',
    year: 2024,
    available: true,
  },
  {
    id: 5,
    title: 'Urban Night',
    medium: 'Oil on Canvas',
    dimensions: '36" x 48"',
    price: '$2,200',
    imageUrl:
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=500&fit=crop',
    category: 'Cityscape',
    year: 2023,
    available: false,
  },
  {
    id: 6,
    title: 'Floral Dreams',
    medium: 'Mixed Media',
    dimensions: '20" x 20"',
    price: '$1,100',
    imageUrl:
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=500&fit=crop',
    category: 'Still Life',
    year: 2024,
    available: true,
  },
  {
    id: 7,
    title: 'Desert Storm',
    medium: 'Acrylic on Canvas',
    dimensions: '40" x 60"',
    price: '$3,500',
    imageUrl:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
    category: 'Landscape',
    year: 2024,
    available: true,
  },
  {
    id: 8,
    title: 'Inner Thoughts',
    medium: 'Graphite on Paper',
    dimensions: '16" x 20"',
    price: '$650',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    category: 'Portrait',
    year: 2023,
    available: true,
  },
];

const categories = [
  'All',
  'Landscape',
  'Portrait',
  'Abstract',
  'Seascape',
  'Cityscape',
  'Still Life',
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const filteredArtwork = allArtwork
    .filter(
      (artwork) =>
        selectedCategory === 'All' || artwork.category === selectedCategory
    )
    .sort((a, b) => {
      if (sortBy === 'newest') return b.year - a.year;
      if (sortBy === 'oldest') return a.year - b.year;
      if (sortBy === 'price-low')
        return (
          parseInt(a.price.replace(/[^0-9]/g, '')) -
          parseInt(b.price.replace(/[^0-9]/g, ''))
        );
      if (sortBy === 'price-high')
        return (
          parseInt(b.price.replace(/[^0-9]/g, '')) -
          parseInt(a.price.replace(/[^0-9]/g, ''))
        );
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#F6E4F6]">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Art Gallery
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our collection of original artwork. Each piece is
              carefully crafted to bring beauty and inspiration to your space.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Sorting */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
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
              {filteredArtwork.map((artwork) => (
                <div key={artwork.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 bg-white">
                    <div className="aspect-[4/5] relative">
                      <Image
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {!artwork.available && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                            Sold
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-200">
                        {artwork.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-1">
                        {artwork.medium}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        {artwork.dimensions}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-bold text-gray-900">
                          {artwork.price}
                        </p>
                        <span className="text-sm text-gray-500">
                          {artwork.year}
                        </span>
                      </div>

                      {artwork.available && (
                        <button className="w-full mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200">
                          View Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Interested in a Custom Piece?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Joyce accepts commission requests for custom artwork. Let's
              discuss your vision and create something truly unique for your
              space.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
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
