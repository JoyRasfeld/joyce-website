import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Playfair_Display } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Joyce Art Studio - Original Artwork & Commissions',
  description:
    'Discover unique original artwork and commissions by Joyce. Browse our collection of paintings, drawings, and custom pieces.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
