'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useArtwork } from '@/hooks/useArtwork';
import { isShopEnabled } from '@/lib/shop';

interface FormData {
  // Shipping Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  // Payment Information
  cardNumber: string;
  cardName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;

  // Billing Information
  billingSameAsShipping: boolean;
  billingFirstName: string;
  billingLastName: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZipCode: string;
  billingCountry: string;
}

export default function Checkout() {
  // Redirect if shop is disabled
  if (!isShopEnabled()) {
    redirect('/');
  }

  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [cart, setCart] = useState<Array<{ id: number; quantity: number }>>([]);

  // Fetch all artworks from database
  const { artworks: products, loading, error } = useArtwork();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    billingSameAsShipping: true,
    billingFirstName: '',
    billingLastName: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    billingCountry: 'United States',
  });

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('art-cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      if (parsedCart.length === 0) {
        router.push('/shop');
      }
    } else {
      router.push('/shop');
    }
  }, [router]);

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return {
      ...item,
      product: product!,
    };
  });

  const subtotal = cartItems.reduce((total, item) => {
    const price = parseInt(item.product.price.replace(/[^0-9]/g, ''));
    return total + price * item.quantity;
  }, 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would process the payment here
    console.log('Order submitted:', { formData, cartItems, total });

    // Clear cart and redirect to success page
    localStorage.removeItem('art-cart');
    router.push('/checkout/success');
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-earth-brown mb-4">
            Loading...
          </h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-earth-brown mb-4">
            Error loading products: {error}
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

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-earth-brown mb-4">
            Your cart is empty
          </h1>
          <Link
            href="/shop"
            className="bg-earth-green text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-white/70 backdrop-blur-sm border-b border-peach">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-earth-brown">
              Joyce Art Studio
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-earth-brown-2">
                Step {currentStep} of 3
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="bg-white/50 border-b border-peach">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center space-x-8">
            <div
              className={`flex items-center space-x-2 ${
                currentStep >= 1 ? 'text-earth-green' : 'text-earth-brown-2'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= 1
                    ? 'bg-earth-green text-white'
                    : 'bg-peach text-earth-brown-2'
                }`}
              >
                1
              </div>
              <span className="hidden sm:block">Shipping</span>
            </div>
            <div
              className={`w-16 h-1 ${
                currentStep >= 2 ? 'bg-earth-green' : 'bg-peach'
              }`}
            ></div>
            <div
              className={`flex items-center space-x-2 ${
                currentStep >= 2 ? 'text-earth-green' : 'text-earth-brown-2'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= 2
                    ? 'bg-earth-green text-white'
                    : 'bg-peach text-earth-brown-2'
                }`}
              >
                2
              </div>
              <span className="hidden sm:block">Payment</span>
            </div>
            <div
              className={`w-16 h-1 ${
                currentStep >= 3 ? 'bg-earth-green' : 'bg-peach'
              }`}
            ></div>
            <div
              className={`flex items-center space-x-2 ${
                currentStep >= 3 ? 'text-earth-green' : 'text-earth-brown-2'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= 3
                    ? 'bg-earth-green text-white'
                    : 'bg-peach text-earth-brown-2'
                }`}
              >
                3
              </div>
              <span className="hidden sm:block">Review</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-earth-brown mb-6">
                    Shipping Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-earth-brown-2 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={e =>
                          handleInputChange('firstName', e.target.value)
                        }
                        className="w-full px-4 py-3 border border-peach rounded-lg focus:ring-2 focus:ring-earth-green focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-earth-brown-2 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={e =>
                          handleInputChange('lastName', e.target.value)
                        }
                        className="w-full px-4 py-3 border border-peach rounded-lg focus:ring-2 focus:ring-earth-green focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-earth-brown-2 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e =>
                          handleInputChange('email', e.target.value)
                        }
                        className="w-full px-4 py-3 border border-peach rounded-lg focus:ring-2 focus:ring-earth-green focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-earth-brown-2 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e =>
                          handleInputChange('phone', e.target.value)
                        }
                        className="w-full px-4 py-3 border border-peach rounded-lg focus:ring-2 focus:ring-earth-green focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-earth-brown-2 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={e =>
                          handleInputChange('address', e.target.value)
                        }
                        className="w-full px-4 py-3 border border-peach rounded-lg focus:ring-2 focus:ring-earth-green focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-earth-brown-2 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={e =>
                          handleInputChange('city', e.target.value)
                        }
                        className="w-full px-4 py-3 border border-peach rounded-lg focus:ring-2 focus:ring-earth-green focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-earth-brown-2 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={e =>
                          handleInputChange('state', e.target.value)
                        }
                        className="w-full px-4 py-3 border border-peach rounded-lg focus:ring-2 focus:ring-earth-green focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-earth-brown-2 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.zipCode}
                        onChange={e =>
                          handleInputChange('zipCode', e.target.value)
                        }
                        className="w-full px-4 py-3 border border-peach rounded-lg focus:ring-2 focus:ring-earth-green focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-earth-brown-2 mb-2">
                        Country *
                      </label>
                      <select
                        required
                        value={formData.country}
                        onChange={e =>
                          handleInputChange('country', e.target.value)
                        }
                        className="w-full px-4 py-3 border border-peach rounded-lg focus:ring-2 focus:ring-earth-green focus:border-transparent"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button type="button" onClick={nextStep}>
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-earth-brown mb-6">
                    Payment Information
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-earth-brown-2 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={e =>
                          handleInputChange('cardNumber', e.target.value)
                        }
                        className="w-full px-4 py-3 border border-peach rounded-lg focus:ring-2 focus:ring-earth-green focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-earth-brown-2 mb-2">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.cardName}
                        onChange={e =>
                          handleInputChange('cardName', e.target.value)
                        }
                        className="w-full px-4 py-3 border border-peach rounded-lg focus:ring-2 focus:ring-earth-green focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-earth-brown-2 mb-2">
                          Month *
                        </label>
                        <select
                          required
                          value={formData.expiryMonth}
                          onChange={e =>
                            handleInputChange('expiryMonth', e.target.value)
                          }
                          className="w-full px-4 py-3 border border-peach rounded-lg focus:ring-2 focus:ring-earth-green focus:border-transparent"
                        >
                          <option value="">MM</option>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            month => (
                              <option
                                key={month}
                                value={month.toString().padStart(2, '0')}
                              >
                                {month.toString().padStart(2, '0')}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-earth-brown-2 mb-2">
                          Year *
                        </label>
                        <select
                          required
                          value={formData.expiryYear}
                          onChange={e =>
                            handleInputChange('expiryYear', e.target.value)
                          }
                          className="w-full px-4 py-3 border border-peach rounded-lg focus:ring-2 focus:ring-earth-green focus:border-transparent"
                        >
                          <option value="">YYYY</option>
                          {Array.from(
                            { length: 10 },
                            (_, i) => new Date().getFullYear() + i
                          ).map(year => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-earth-brown-2 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="123"
                          maxLength={4}
                          value={formData.cvv}
                          onChange={e =>
                            handleInputChange('cvv', e.target.value)
                          }
                          className="w-full px-4 py-3 border border-peach rounded-lg focus:ring-2 focus:ring-earth-green focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between">
                    <Button onClick={prevStep} variant="secondary">
                      Back
                    </Button>
                    <Button onClick={nextStep}>Review Order</Button>
                  </div>
                </div>
              )}

              {/* Step 3: Order Review */}
              {currentStep === 3 && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-earth-brown mb-6">
                    Review Your Order
                  </h2>

                  {/* Shipping Information */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-earth-brown mb-3">
                      Shipping Information
                    </h3>
                    <div className="bg-peach-light p-4 rounded-lg">
                      <p className="text-earth-brown-2">
                        {formData.firstName} {formData.lastName}
                        <br />
                        {formData.address}
                        <br />
                        {formData.city}, {formData.state} {formData.zipCode}
                        <br />
                        {formData.country}
                        <br />
                        {formData.email}
                        <br />
                        {formData.phone}
                      </p>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-earth-brown mb-3">
                      Payment Information
                    </h3>
                    <div className="bg-peach-light p-4 rounded-lg">
                      <p className="text-earth-brown-2">
                        {formData.cardName}
                        <br />
                        **** **** **** {formData.cardNumber.slice(-4)}
                        <br />
                        Expires: {formData.expiryMonth}/{formData.expiryYear}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <Button
                      type="button"
                      onClick={prevStep}
                      variant="secondary"
                      className="px-8 py-3"
                    >
                      Back
                    </Button>
                    <Button type="submit" className="px-8 py-3">
                      Place Order
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-earth-brown mb-4">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 relative flex-shrink-0">
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-earth-brown text-sm">
                        {item.product.title}
                      </h3>
                      <p className="text-sm text-earth-brown-2">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-earth-brown">
                        $
                        {(
                          parseInt(item.product.price.replace(/[^0-9]/g, '')) *
                          item.quantity
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-peach pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-earth-brown-2">Subtotal</span>
                  <span className="text-earth-brown">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-earth-brown-2">Shipping</span>
                  <span className="text-earth-green">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-earth-brown-2">Tax</span>
                  <span className="text-earth-brown">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-peach pt-2">
                  <span className="text-earth-brown">Total</span>
                  <span className="text-earth-brown">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-800">
                    Secure checkout powered by Stripe
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
