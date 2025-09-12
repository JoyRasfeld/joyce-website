'use client';

import Image from 'next/image';
import Link from 'next/link';
import { redirect, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { isShopEnabled } from '@/lib/shop';
import type { Artwork } from '@/types';

export default function ProductDetail() {
  // Redirect if shop is disabled
  if (!isShopEnabled()) {
    redirect('/');
  }

  const params = useParams();
  const productId = parseInt(params.id as string);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<Array<{ id: number; quantity: number }>>([]);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [product, setProduct] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch product data
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const response = await fetch(`/api/artwork/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

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

  const addToCart = () => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { id: productId, quantity }];
      }
    });
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-peach-floral flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-earth-brown mb-4">
            Loading...
          </h1>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-peach-floral flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-earth-brown mb-4">
            {error || 'Product Not Found'}
          </h1>
          <Link
            href="/shop"
            className="bg-earth-green text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors duration-200"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-peach-floral">
      {/* Header */}
      <section className="bg-white/70 backdrop-blur-sm border-b border-peach">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="text-earth-brown-2 hover:text-earth-green"
            >
              Home
            </Link>
            <span className="text-earth-brown-2">/</span>
            <Link
              href="/shop"
              className="text-earth-brown-2 hover:text-earth-green"
            >
              Shop
            </Link>
            <span className="text-earth-brown-2">/</span>
            <span className="text-earth-brown">{product.title}</span>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-[4/5] relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
                {!product.available && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Sold
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-earth-brown mb-2">
                  {product.title}
                </h1>
                <p className="text-lg text-earth-brown-2 mb-4">
                  {product.medium} • {product.dimensions}
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-earth-brown">
                    {product.price}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-earth-brown-2">
                  <span>{product.category}</span>
                  <span>•</span>
                  <span>{new Date(product.completedAt).getFullYear()}</span>
                  <span>•</span>
                  <span>{product.available ? 'Available' : 'Sold'}</span>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-earth-brown font-semibold">
                    Quantity:
                  </label>
                  <div className="flex items-center border border-peach rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-earth-brown hover:bg-peach-light"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-earth-brown font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-earth-brown hover:bg-peach-light"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={addToCart}
                  disabled={!product.available}
                  className="w-full bg-earth-green text-white py-4 px-6 rounded-lg font-semibold hover:opacity-90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {product.available ? 'Add to Cart' : 'Sold'}
                </button>

                {showAddedMessage && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    Added to cart successfully!
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="border-t border-peach pt-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-earth-brown mb-2">
                    Artwork Details
                  </h3>
                  <p className="text-earth-brown-2 leading-relaxed">
                    This original artwork by Joyce showcases{' '}
                    {product.medium.toLowerCase()} techniques. The piece
                    measures {product.dimensions} and was created in{' '}
                    {new Date(product.completedAt).getFullYear()}.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-earth-brown mb-2">
                      Category
                    </h3>
                    <p className="text-earth-brown-2">{product.category}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-earth-brown mb-2">
                      Availability
                    </h3>
                    <p className="text-earth-brown-2">
                      {product.available ? 'Available for purchase' : 'Sold'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-earth-brown mb-2">
                      Shipping
                    </h3>
                    <p className="text-earth-brown-2">
                      Free shipping within the US
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-earth-brown mb-2">
                      Returns
                    </h3>
                    <p className="text-earth-brown-2">30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-earth-brown mb-8">
            You Might Also Like
          </h2>
          <div className="text-center">
            <p className="text-earth-brown-2">
              More artworks from the same category will be displayed here once
              you have more items in your database.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center mt-4 bg-earth-green text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors duration-200"
            >
              Browse All Artwork
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
