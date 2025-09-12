'use client';

import { X, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useArtwork } from '@/hooks/useArtwork';
import { isShopEnabled } from '@/lib/shop';

const categories = [
  'All',
  'Landscape',
  'Portrait',
  'Abstract',
  'My Mini',
  'Still Life',
];
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' },
  { value: 'newest', label: 'Newest First' },
];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('createdAt');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<Array<{ id: number; quantity: number }>>([]);
  const [showCart, setShowCart] = useState(false);

  // Redirect if shop is disabled
  if (!isShopEnabled()) {
    redirect('/');
  }

  // Fetch artworks from database
  const {
    artworks: products,
    loading,
    error,
  } = useArtwork({
    sortBy: sortBy === 'featured' ? 'createdAt' : sortBy,
    sortOrder: sortBy === 'price-low' ? 'asc' : 'desc',
  });

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('art-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('art-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { id: productId, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => {
    const product = products.find(p => p.id === item.id);
    const price = product ? parseInt(product.price.replace(/[^0-9]/g, '')) : 0;
    return total + price * item.quantity;
  }, 0);

  const filteredProducts = products
    .filter(product => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.medium.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (
            parseInt(a.price.replace(/[^0-9]/g, '')) -
            parseInt(b.price.replace(/[^0-9]/g, ''))
          );
        case 'price-high':
          return (
            parseInt(b.price.replace(/[^0-9]/g, '')) -
            parseInt(a.price.replace(/[^0-9]/g, ''))
          );
        case 'name':
          return a.title.localeCompare(b.title);
        case 'newest':
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        default:
          return 0;
      }
    });

  return (
    <div>
      {/* Header */}
      <section className="bg-white/70 backdrop-blur-sm border-b border-peach">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-earth-brown mb-4">
              Art Shop
            </h1>
            <p className="text-xl text-earth-brown-2 max-w-2xl mx-auto">
              Discover unique original artwork and handcrafted miniatures. Each
              piece is carefully created to bring beauty and inspiration to your
              space.
            </p>
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-earth-brown">
                  Shopping Cart
                </h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-earth-brown-2 hover:text-earth-green"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-earth-brown-2 text-center py-8">
                  Your cart is empty
                </p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => {
                      const product = products.find(p => p.id === item.id);
                      if (!product) return null;

                      return (
                        <div
                          key={item.id}
                          className="flex gap-4 border-b border-peach pb-4"
                        >
                          <div className="w-20 h-20 relative flex-shrink-0">
                            <Image
                              src={product.imageUrl}
                              alt={product.title}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-earth-brown">
                              {product.title}
                            </h3>
                            <p className="text-sm text-earth-brown-2">
                              {product.price}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-6 h-6 bg-peach rounded flex items-center justify-center text-earth-brown hover:bg-peach-light"
                              >
                                -
                              </button>
                              <span className="text-earth-brown">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-6 h-6 bg-peach rounded flex items-center justify-center text-earth-brown hover:bg-peach-light"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-earth-brown-2 hover:text-earth-green"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-peach pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold text-earth-brown">
                        Total:
                      </span>
                      <span className="text-xl font-bold text-earth-brown">
                        ${cartTotal.toLocaleString()}
                      </span>
                    </div>
                    <Link
                      href="/checkout"
                      className="w-full bg-earth-green text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-colors duration-200 text-center block"
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <section className="bg-white/70 backdrop-blur-sm border-b border-peach">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* Search */}
            <div className="w-full lg:w-96">
              <input
                type="text"
                placeholder="Search artwork..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-peach rounded-lg focus:ring-2 focus:ring-earth-green focus:border-transparent bg-white/70"
              />
            </div>

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

            {/* Sort and Cart */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="border border-peach rounded-md px-3 py-2 text-sm text-earth-brown bg-white focus:outline-none focus:ring-2 focus:ring-earth-green focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <Button
                onClick={() => setShowCart(true)}
                className="relative p-3"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-earth-brown-2 text-lg">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 text-lg">
                Error loading products: {error}
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-earth-brown-2 text-lg">
                No products found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <div className="aspect-[4/5] relative">
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                      {!product.available && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                          Sold
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-earth-brown mb-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-earth-brown-2 mb-2">
                      {product.medium} • {product.dimensions}
                    </p>
                    <p className="text-sm text-earth-brown-2 mb-2">
                      {product.category} •{' '}
                      {new Date(product.completedAt).getFullYear()}
                    </p>

                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <span className="text-xl font-bold text-earth-brown">
                          {product.price}
                        </span>
                      </div>
                      <span className="text-sm text-earth-green font-medium">
                        {product.available ? 'Available' : 'Sold'}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button asChild variant="secondary" className="flex-1">
                        <Link href={`/shop/${product.id}`}>View Details</Link>
                      </Button>
                      <Button
                        onClick={() => addToCart(product.id)}
                        disabled={!product.available}
                        className="flex-1"
                      >
                        {product.available ? 'Add to Cart' : 'Sold'}
                      </Button>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-earth-brown mb-4">
              Looking for Something Special?
            </h2>
            <p className="text-lg text-earth-brown-2 mb-8 max-w-2xl mx-auto">
              Joyce accepts commission requests for custom artwork. Let&apos;s
              discuss your vision and create something truly unique for your
              space.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-earth-green text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-colors duration-200"
            >
              Request a Commission
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
