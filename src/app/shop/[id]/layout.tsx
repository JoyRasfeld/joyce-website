import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { isShopEnabled } from '@/lib/shop';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://joyceartstudio.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  // If shop is disabled, return noindex metadata
  if (!isShopEnabled()) {
    return {
      title: 'Page Not Found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { id } = await params;
  const artwork = await prisma.artwork.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!artwork) {
    return {
      title: 'Artwork Not Found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = `${artwork.title} by Joyce Rasfeld. ${artwork.medium} on ${artwork.dimensions}. ${artwork.available ? 'Available for purchase' : 'Sold'}.`;

  return {
    title: `${artwork.title} - Original Artwork`,
    description,
    keywords: [
      artwork.title,
      artwork.category,
      artwork.medium,
      'Original Artwork',
      'Joyce Rasfeld',
    ],
    alternates: {
      canonical: `${siteUrl}/shop/${id}`,
    },
    openGraph: {
      title: `${artwork.title} - Original Artwork`,
      description,
      url: `${siteUrl}/shop/${id}`,
      images: [
        {
          url: artwork.imageUrl,
          width: 1200,
          height: 1200,
          alt: artwork.title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${artwork.title} - Original Artwork`,
      description,
      images: [artwork.imageUrl],
    },
  };
}

export default function ShopDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
