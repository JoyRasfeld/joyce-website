import Image from 'next/image';

// Mock data for featured artwork
const featuredArtwork = [
  {
    id: 1,
    title: 'Sunset Over Mountains',
    medium: 'Oil on Canvas',
    dimensions: '24" x 36"',
    price: '$1,200',
    imageUrl:
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop',
    category: 'Landscape',
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
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-[#F6E4F6] to-[#E8D5E8]">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Welcome to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Joyce Art Studio
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Discover unique original artwork that brings beauty and inspiration
            to your space. Each piece tells a story, captures emotion, and
            transforms your environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/gallery"
              className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
            >
              Explore Gallery
            </a>
            <a
              href="/about"
              className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors duration-200"
            >
              Meet the Artist
            </a>
          </div>
        </div>
      </section>

      {/* Featured Artwork Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Artwork
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A curated selection of recent pieces showcasing diverse styles and
              techniques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtwork.map((artwork) => (
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
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/gallery"
              className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold text-lg"
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
            </a>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-[#F6E4F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Meet Joyce
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                With over 15 years of experience in fine arts, Joyce creates
                pieces that blend traditional techniques with contemporary
                vision. Her work spans from intimate portraits to expansive
                landscapes, each piece infused with emotion and meaning.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Based in the heart of the art community, Joyce draws inspiration
                from nature, human emotion, and the interplay of light and
                shadow. Her studio is a space where creativity flows freely and
                every brushstroke tells a story.
              </p>
              <a
                href="/about"
                className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold text-lg"
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
              </a>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&h=600&fit=crop"
                  alt="Joyce in her studio"
                  width={600}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Piece?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Whether you&apos;re looking for a statement piece for your home or a
            unique gift, explore our collection or inquire about custom
            commissions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/gallery"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Browse Collection
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-200"
            >
              Contact Joyce
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
