import { ContactForm } from '@/components/contact-form';

export default function Contact() {
  return (
    <div className="min-h-screen bg-homepage">
      {/* Hero Section */}
      <section className="relative py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-earth-brown mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-earth-brown-2 max-w-3xl mx-auto">
              Have a question about my artwork? Interested in a commission?
              I&apos;d love to hear from you and discuss how we can work
              together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 justify-center">
            {/* Contact Form */}
            <ContactForm />

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-earth-brown mb-6">
                Contact Information
              </h2>

              <div className="space-y-8">
                {/* Studio Address */}
                <div>
                  <h3 className="text-lg font-semibold text-earth-brown mb-4">
                    Studio Location
                  </h3>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-peach rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-earth-green"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-earth-brown-2">
                        Home Studio
                        <br />
                        West Chester, OH 45241
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div>
                  <h3 className="text-lg font-semibold text-earth-brown mb-4">
                    Get in Touch
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-peach rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-earth-green"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-earth-brown-2">
                          myminibyjoy@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
