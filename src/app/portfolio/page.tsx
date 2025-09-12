'use client';

import Image from 'next/image';
import { ArrowRight, X } from 'lucide-react';
import { useState } from 'react';

import { ArtworkCard } from '@/components/artwork-card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useArtwork } from '@/hooks/useArtwork';
import type { Artwork } from '@/types/artwork';

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
  const [selectedImage, setSelectedImage] = useState<Artwork | null>(null);
  const { artworks } = useArtwork({});

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
    <div className="min-h-screen">
      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full h-full flex flex-col">
            {/* Close button - fixed at top right */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-0 right-0 bg-black/50 hover:bg-black/70 text-white hover:text-gray-300 transition-colors duration-200 rounded-full p-2 z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image - fills available space */}
            <div className="flex-1 flex items-center justify-center min-h-0">
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                width={800}
                height={1000}
                className="max-w-full max-h-full object-contain rounded-lg"
                onClick={e => e.stopPropagation()}
              />
            </div>

            {/* Details - fixed at bottom */}
            <div className="mt-4 p-4 rounded-lg flex-shrink-0">
              <h3 className="text-2xl font-bold text-white mb-2">
                {selectedImage.title}
              </h3>
              <p className="text-gray-200 text-sm mb-1">
                {selectedImage.medium}
              </p>
              <p className="text-gray-200 text-sm mb-1">
                {selectedImage.dimensions}
              </p>
              <p className="text-gray-200 text-sm mb-1">
                {new Date(selectedImage.completedAt).toLocaleDateString(
                  'en-US',
                  {
                    month: '2-digit',
                    year: 'numeric',
                  }
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Art Portfolio</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Explore my collection of original artwork. Each piece is carefully
              crafted to bring joy and emotion to your space.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Sorting */}
      <section className="backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={
                    selectedCategory === category ? 'default' : 'secondary'
                  }
                  className="px-4 py-2 rounded-full text-sm font-medium"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Sort by:</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="title-a-z">Title: A to Z</SelectItem>
                  <SelectItem value="title-z-a">Title: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="bg-card py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArtwork.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">
                No artwork found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredArtwork.map(artwork => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  onClick={() => setSelectedImage(artwork)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="backdrop-blur-sm border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold  mb-4">
              Interested in a Custom Piece?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Joyce accepts commission requests for custom artwork. Let&apos;s
              discuss your vision and create something truly unique for your
              space.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-colors duration-200"
            >
              Inquire About Commissions
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
