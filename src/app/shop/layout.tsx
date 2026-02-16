import type { Metadata } from 'next';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://joyceartstudio.com';

export const metadata: Metadata = {
  title: 'Shop - Miniatures & Magnets',
  description:
    'Order custom 3D-printed miniature houses, animal magnets, and framed house art by Joyce Rasfeld. Each piece is hand-painted and made to order.',
  keywords: [
    'Custom Miniatures',
    'Hand-painted Magnets',
    '3D Printed Art',
    'Custom House Miniature',
    'Framed House Art',
    'Animal Magnets',
  ],
  alternates: {
    canonical: `${siteUrl}/shop`,
  },
  openGraph: {
    title: 'Shop - Miniatures & Magnets',
    description:
      'Order custom 3D-printed miniature houses, animal magnets, and framed house art by Joyce Rasfeld.',
    url: `${siteUrl}/shop`,
  },
  twitter: {
    title: 'Shop - Miniatures & Magnets',
    description:
      'Order custom 3D-printed miniature houses, animal magnets, and framed house art by Joyce Rasfeld.',
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
