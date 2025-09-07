import Link from 'next/link';

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-peach-floral">
      {/* Header */}
      <section className="bg-white/70 backdrop-blur-sm border-b border-peach">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-2xl font-bold text-earth-brown">
            Joyce Art Studio
          </Link>
        </div>
      </section>

      {/* Success Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Success Message */}
            <h1 className="text-4xl font-bold text-earth-brown mb-4">
              Thank You for Your Order!
            </h1>
            <p className="text-xl text-earth-brown-2 mb-8 max-w-2xl mx-auto">
              Your order has been successfully placed. We&apos;re excited to prepare your artwork 
              and get it shipped to you as soon as possible.
            </p>

            {/* Order Details */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-earth-brown mb-6">Order Confirmation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="text-lg font-semibold text-earth-brown mb-3">Order Information</h3>
                  <div className="space-y-2 text-earth-brown-2">
                    <p><span className="font-medium">Order Number:</span> #ART-{Date.now().toString().slice(-6)}</p>
                    <p><span className="font-medium">Order Date:</span> {new Date().toLocaleDateString()}</p>
                    <p><span className="font-medium">Status:</span> <span className="text-green-600 font-medium">Confirmed</span></p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-earth-brown mb-3">What&apos;s Next?</h3>
                  <div className="space-y-2 text-earth-brown-2">
                    <p>• You&apos;ll receive an email confirmation shortly</p>
                    <p>• We&apos;ll begin processing your order within 24 hours</p>
                    <p>• You&apos;ll receive shipping updates via email</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-earth-brown mb-6">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-earth-brown mb-3">Processing Time</h3>
                  <div className="space-y-2 text-earth-brown-2">
                    <p>• Original artwork: 3-5 business days</p>
                    <p>• 3D printed miniatures: 1-2 business days</p>
                    <p>• Custom commissions: 2-4 weeks</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-earth-brown mb-3">Shipping Details</h3>
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
              <h2 className="text-2xl font-bold text-earth-brown mb-6">Care Instructions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-earth-brown mb-3">For Original Artwork</h3>
                  <ul className="space-y-2 text-earth-brown-2">
                    <li>• Display away from direct sunlight</li>
                    <li>• Maintain consistent room temperature</li>
                    <li>• Dust gently with a soft cloth</li>
                    <li>• Avoid hanging in humid areas</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-earth-brown mb-3">For 3D Printed Miniatures</h3>
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
              <h2 className="text-2xl font-bold text-earth-brown mb-6">Need Help?</h2>
              <p className="text-earth-brown-2 mb-6">
                If you have any questions about your order or need assistance, 
                don&apos;t hesitate to reach out to us.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-peach rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-earth-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-earth-brown mb-1">Email</h3>
                  <p className="text-sm text-earth-brown-2">myminibyjoy@gmail.com</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-peach rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-earth-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-earth-brown mb-1">Phone</h3>
                  <p className="text-sm text-earth-brown-2">(555) 123-4567</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-peach rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-earth-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-earth-brown mb-1">Live Chat</h3>
                  <p className="text-sm text-earth-brown-2">Available 9AM-6PM EST</p>
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

