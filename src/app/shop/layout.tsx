import type { Metadata } from 'next';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://joyceartstudio.com';

export const metadata: Metadata = {
  title: 'Art Shop - Purchase Original Artwork',
  description:
    'Shop original artwork by Joyce Rasfeld. Browse available paintings, drawings, 3D models, 3D printed art, and custom pieces. Each artwork is carefully crafted and ready to bring beauty to your space.',
  keywords: [
    'Art Shop',
    'Buy Art Online',
    'Original Artwork for Sale',
    '3D Models for Sale',
    '3D Printed Art',
    'Buy 3D Art',
    'Art Purchase',
    'Art Gallery Shop',
  ],
  alternates: {
    canonical: `${siteUrl}/shop`,
  },
  openGraph: {
    title: 'Art Shop - Purchase Original Artwork',
    description:
      'Shop original artwork by Joyce Rasfeld. Browse available paintings, drawings, 3D models, 3D printed art, and custom pieces.',
    url: `${siteUrl}/shop`,
  },
  twitter: {
    title: 'Art Shop - Purchase Original Artwork',
    description:
      'Shop original artwork by Joyce Rasfeld. Browse available paintings, drawings, 3D models, 3D printed art, and custom pieces.',
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
