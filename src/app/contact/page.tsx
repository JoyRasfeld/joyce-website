import type { Metadata } from 'next';
import { MapPin, Mail } from 'lucide-react';

import { ContactForm } from '@/components/contact-form';
import { Typography } from '@/components/ui/typography';
import { contactStructuredData, stringifyJsonLd } from '@/lib/structured-data';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://joyceartstudio.com';

export const metadata: Metadata = {
  title: 'Contact Joyce - Commission & Inquiries',
  description:
    'Get in touch with Joyce Rasfeld for artwork inquiries, custom commissions, 3D modeling, 3D printing services, or questions about available pieces. Located in West Chester, OH.',
  keywords: [
    'Contact Joyce Rasfeld',
    'Art Commissions',
    'Custom Artwork',
    'Art Inquiries',
    '3D Modeling Services',
    '3D Printing Services',
    'Custom 3D Models',
    'West Chester Artist',
    'Ohio Artist',
  ],
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: 'Contact Joyce Rasfeld - Commission & Inquiries',
    description:
      'Get in touch with Joyce Rasfeld for artwork inquiries, custom commissions, 3D modeling, 3D printing services, or questions about available pieces. Located in West Chester, OH.',
    url: `${siteUrl}/contact`,
  },
  twitter: {
    title: 'Contact Joyce Rasfeld - Commission & Inquiries',
    description:
      'Get in touch with Joyce Rasfeld for artwork inquiries, custom commissions, 3D modeling, 3D printing services, or questions about available pieces. Located in West Chester, OH.',
  },
};

export default function Contact() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(contactStructuredData),
        }}
      />
      {/* Hero Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Typography variant="h1" className="mb-6">
              Get in Touch
            </Typography>
            <Typography variant="lead" className="max-w-3xl mx-auto">
              Have a question about my artwork? Interested in a commission?
              I&apos;d love to hear from you and discuss how we can work
              together.
            </Typography>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 justify-center">
            {/* Contact Form */}
            <ContactForm />

            {/* Contact Information */}
            <div>
              <Typography variant="h2" className="mb-6">
                Contact Information
              </Typography>

              <div className="space-y-8">
                {/* Studio Address */}
                <div>
                  <Typography variant="h4" className="mb-4">
                    Studio Location
                  </Typography>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-card rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p>
                        Home Studio
                        <br />
                        West Chester, OH 45241
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div>
                  <Typography variant="h4" className="mb-4">
                    Get in Touch
                  </Typography>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-card rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p>myminibyjoy@gmail.com</p>
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
