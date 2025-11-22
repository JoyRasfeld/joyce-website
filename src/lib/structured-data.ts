import type {
  WithContext,
  Person,
  WebSite,
  WebPage,
  CollectionPage,
  ContactPage,
  AboutPage,
  Product,
  BreadcrumbList,
} from 'schema-dts';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://joyceartstudio.com';

/**
 * Safely stringify JSON-LD data with XSS protection
 * Replaces < characters with unicode equivalent to prevent XSS attacks
 */
export function stringifyJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/**
 * Base person schema for Joyce Rasfeld
 */
export const basePersonSchema: WithContext<Person> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: 'Joyce Rasfeld',
  alternateName: 'Joyce',
  url: siteUrl,
  image: `${siteUrl}/images/me.png`,
  description:
    'Professional artist specializing in original artwork, paintings, drawings, 3D models, 3D printing, and custom commissions. B.S. in Studio Art and B.F.A. in Art Education from Miami University.',
  jobTitle: 'Artist',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'West Chester',
    addressRegion: 'OH',
    postalCode: '45241',
    addressCountry: 'US',
  },
  email: 'myminibyjoy@gmail.com',
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Miami University',
    description: 'B.S. in Studio Art and B.F.A. in Art Education',
  },
  knowsAbout: [
    'Art',
    'Painting',
    'Drawing',
    'Art Education',
    'Original Artwork',
    'Custom Commissions',
    'Mixed Media',
    'Landscape Art',
    'Portrait Art',
    'Abstract Art',
    '3D Modeling',
    '3D Printing',
    '3D Design',
    'Digital Sculpting',
    'STL Files',
    '3D Art',
  ],
};

/**
 * Website schema
 */
export const websiteSchema: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: 'Joyce Art Studio - Original Artwork & Commissions',
  description:
    'Discover unique original artwork and commissions by Joyce Rasfeld. Browse our collection of paintings, drawings, 3D models, 3D printed art, and custom pieces.',
  publisher: {
    '@id': `${siteUrl}/#person`,
  },
};

/**
 * WebPage schema
 */
export const webpageSchema: WithContext<WebPage> = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${siteUrl}/#webpage`,
  url: siteUrl,
  name: 'Joyce Art Studio - Original Artwork & Commissions',
  isPartOf: {
    '@id': `${siteUrl}/#website`,
  },
  about: {
    '@id': `${siteUrl}/#person`,
  },
  description:
    'Discover unique original artwork and commissions by Joyce Rasfeld. Browse our collection of paintings, drawings, 3D models, 3D printed art, and custom pieces.',
};

/**
 * Root layout structured data combining all base schemas
 */
export const rootStructuredData = [
  basePersonSchema,
  websiteSchema,
  webpageSchema,
];

/**
 * Portfolio structured data
 */
export function createPortfolioStructuredData(
  artworks: Array<{
    id: number;
    title: string;
    medium: string;
    dimensions: string;
    imageUrl: string;
    category: string;
    completedAt: string;
    price: string;
    available: boolean;
  }>
): WithContext<CollectionPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Joyce Art Studio Portfolio - Original Artwork Collection',
    description:
      'A collection of original artwork by Joyce Rasfeld, including paintings, drawings, 3D models, 3D printed art, and mixed media pieces across various categories.',
    url: `${siteUrl}/portfolio`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: artworks.map((artwork, index) => ({
        '@type': 'Product',
        position: index + 1,
        name: artwork.title,
        description: `${artwork.title} by Joyce Rasfeld. ${artwork.medium} on ${artwork.dimensions}.`,
        image: artwork.imageUrl,
        category: artwork.category,
        offers: {
          '@type': 'Offer',
          price: artwork.price,
          priceCurrency: 'USD',
          availability: artwork.available
            ? 'https://schema.org/InStock'
            : 'https://schema.org/SoldOut',
          url: `${siteUrl}/shop/${artwork.id}`,
        },
        creator: {
          '@id': `${siteUrl}/#person`,
        },
      })),
    },
  };
}

/**
 * About page structured data
 */
export const aboutStructuredData: WithContext<AboutPage> = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Joyce Rasfeld - Artist & Creator',
  description:
    'Learn about Joyce Rasfeld, a professional artist with a B.S. in Studio Art and B.F.A. in Art Education from Miami University. Specializing in paintings, drawings, 3D modeling, and 3D printing. Discover her journey, inspiration, and creative process.',
  url: `${siteUrl}/about`,
  mainEntity: {
    '@id': `${siteUrl}/#person`,
  },
};

/**
 * Contact page structured data
 */
export const contactStructuredData: WithContext<ContactPage> = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Joyce Rasfeld - Commission & Inquiries',
  description:
    'Get in touch with Joyce Rasfeld for artwork inquiries, custom commissions, 3D modeling, 3D printing services, or questions about available pieces. Located in West Chester, OH.',
  url: `${siteUrl}/contact`,
  mainEntity: {
    '@id': `${siteUrl}/#person`,
  },
};

/**
 * Artwork/Product structured data
 */
export function createArtworkStructuredData(artwork: {
  id: number;
  title: string;
  medium: string;
  dimensions: string;
  imageUrl: string;
  category: string;
  completedAt: string;
  price: string;
  available: boolean;
}): WithContext<Product> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: artwork.title,
    description: `${artwork.title} by Joyce Rasfeld. ${artwork.medium} on ${artwork.dimensions}.`,
    image: artwork.imageUrl,
    category: artwork.category,
    brand: {
      '@type': 'Brand',
      name: 'Joyce Art Studio',
    },
    manufacturer: {
      '@id': `${siteUrl}/#person`,
    },
    offers: {
      '@type': 'Offer',
      price: artwork.price,
      priceCurrency: 'USD',
      availability: artwork.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/SoldOut',
      url: `${siteUrl}/shop/${artwork.id}`,
    },
  };
}

/**
 * Breadcrumb structured data
 */
export function createBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
