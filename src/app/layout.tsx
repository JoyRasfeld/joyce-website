import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Playfair_Display } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { rootStructuredData, stringifyJsonLd } from '@/lib/structured-data';

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin'],
  display: 'swap',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://joyceartstudio.com';

export const metadata: Metadata = {
  title: {
    default: 'Joyce Art Studio - Original Artwork & Commissions',
    template: '%s | Joyce Art Studio',
  },
  description:
    'Discover unique original artwork and commissions by Joyce Rasfeld. Browse our collection of paintings, drawings, 3D models, 3D printed art, and custom pieces. Located in West Chester, OH.',
  keywords: [
    'Joyce Rasfeld',
    'Original Artwork',
    'Art Commissions',
    'Custom Art',
    'Paintings',
    'Drawings',
    '3D Models',
    '3D Modeling',
    '3D Printing',
    '3D Printed Art',
    '3D Design',
    'Digital Sculpting',
    'STL Files',
    '3D Art',
    'Mixed Media Art',
    'Landscape Art',
    'Portrait Art',
    'Abstract Art',
    'Art Studio',
    'West Chester Artist',
    'Ohio Artist',
    'Art for Sale',
    'Art Gallery',
  ],
  authors: [{ name: 'Joyce Rasfeld', url: siteUrl }],
  creator: 'Joyce Rasfeld',
  publisher: 'Joyce Art Studio',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Joyce Art Studio - Original Artwork & Commissions',
    description:
      'Discover unique original artwork and commissions by Joyce Rasfeld. Browse our collection of paintings, drawings, 3D models, 3D printed art, and custom pieces.',
    siteName: 'Joyce Art Studio',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Joyce Art Studio - Original Artwork & Commissions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joyce Art Studio - Original Artwork & Commissions',
    description:
      'Discover unique original artwork and commissions by Joyce Rasfeld. Browse our collection of paintings, drawings, 3D models, 3D printed art, and custom pieces.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: stringifyJsonLd(rootStructuredData),
          }}
        />
      </head>
      <body
        className={`${playfairDisplay.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Toaster position="top-center" />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
