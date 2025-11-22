import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://joyceartstudio.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic artwork pages
  let artworkPages: MetadataRoute.Sitemap = [];
  try {
    const artworks = await prisma.artwork.findMany({
      select: {
        id: true,
        updatedAt: true,
        available: true,
      },
    });

    artworkPages = artworks.map(artwork => ({
      url: `${siteUrl}/shop/${artwork.id}`,
      lastModified: artwork.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: artwork.available ? 0.8 : 0.5,
    }));
  } catch (error) {
    console.error('Error fetching artworks for sitemap:', error);
  }

  return [...staticPages, ...artworkPages];
}
