import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Check, Mail, MessageCircle, Phone } from 'lucide-react';

import { isShopEnabled } from '@/lib/shop';

export default function CheckoutSuccess() {
  // Redirect if shop is disabled
  if (!isShopEnabled()) {
    redirect('/');
  }
  return (
    <div>
      {/* Header */}
      <section className="bg-white/70 backdrop-blur-sm border-b border-peach">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-2xl font-bold text-earth-brown">
            Joyce Art Studio
          </Link>
        </div>
      </section>

      {/* Success Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="w-12 h-12 text-green-600" />
            </div>

            {/* Success Message */}
            <h1 className="text-4xl font-bold text-earth-brown mb-4">
              Thank You for Your Order!
            </h1>
            <p className="text-xl text-earth-brown-2 mb-8 max-w-2xl mx-auto">
              Your order has been successfully placed. We&apos;re excited to
              prepare your artwork and get it shipped to you as soon as
              possible.
            </p>

            {/* Order Details */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-earth-brown mb-6">
                Order Confirmation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="text-lg font-semibold text-earth-brown mb-3">
                    Order Information
                  </h3>
                  <div className="space-y-2 text-earth-brown-2">
                    <p>
                      <span className="font-medium">Order Number:</span> #ART-
                      {Date.now().toString().slice(-6)}
                    </p>
                    <p>
                      <span className="font-medium">Order Date:</span>{' '}
                      {new Date().toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>{' '}
                      <span className="text-green-600 font-medium">
                        Confirmed
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-earth-brown mb-3">
                    What&apos;s Next?
                  </h3>
                  <div className="space-y-2 text-earth-brown-2">
                    <p>• You&apos;ll receive an email confirmation shortly</p>
                    <p>
                      • We&apos;ll begin processing your order within 24 hours
                    </p>
                    <p>• You&apos;ll receive shipping updates via email</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-earth-brown mb-6">
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-earth-brown mb-3">
                    Processing Time
                  </h3>
                  <div className="space-y-2 text-earth-brown-2">
                    <p>• Original artwork: 3-5 business days</p>
                    <p>• 3D printed miniatures: 1-2 business days</p>
                    <p>• Custom commissions: 2-4 weeks</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-earth-brown mb-3">
                    Shipping Details
                  </h3>
                  <div className="space-y-2 text-earth-brown-2">
                    <p>• Free shipping within the US</p>
                    <p>• Professional packaging included</p>
                    <p>• Tracking number provided</p>
                    <p>• Insurance included</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Care Instructions */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-earth-brown mb-6">
                Care Instructions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-earth-brown mb-3">
                    For Original Artwork
                  </h3>
                  <ul className="space-y-2 text-earth-brown-2">
                    <li>• Display away from direct sunlight</li>
                    <li>• Maintain consistent room temperature</li>
                    <li>• Dust gently with a soft cloth</li>
                    <li>• Avoid hanging in humid areas</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-earth-brown mb-3">
                    For 3D Printed Miniatures
                  </h3>
                  <ul className="space-y-2 text-earth-brown-2">
                    <li>• Display on a stable surface</li>
                    <li>• Keep away from heat sources</li>
                    <li>• Clean with a soft brush</li>
                    <li>• Handle with care</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-earth-brown mb-6">
                Need Help?
              </h2>
              <p className="text-earth-brown-2 mb-6">
                If you have any questions about your order or need assistance,
                don&apos;t hesitate to reach out to us.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-peach rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6 text-earth-green" />
                  </div>
                  <h3 className="font-semibold text-earth-brown mb-1">Email</h3>
                  <p className="text-sm text-earth-brown-2">
                    myminibyjoy@gmail.com
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-peach rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-6 h-6 text-earth-green" />
                  </div>
                  <h3 className="font-semibold text-earth-brown mb-1">Phone</h3>
                  <p className="text-sm text-earth-brown-2">(555) 123-4567</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-peach rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-6 h-6 text-earth-green" />
                  </div>
                  <h3 className="font-semibold text-earth-brown mb-1">
                    Live Chat
                  </h3>
                  <p className="text-sm text-earth-brown-2">
                    Available 9AM-6PM EST
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-earth-green text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-colors duration-200"
              >
                Continue Shopping
              </Link>
              <Link
                href="/contact"
                className="bg-peach text-earth-brown px-8 py-4 rounded-lg text-lg font-semibold hover:bg-peach-light transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
