import type { Metadata } from 'next';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://joyceartstudio.com';

export const metadata: Metadata = {
  title: 'Art Portfolio - Browse Original Artwork',
  description:
    "Explore Joyce Rasfeld's complete collection of original artwork. Browse paintings, drawings, 3D models, 3D printed art, and mixed media pieces across various categories including landscapes, portraits, abstracts, and more.",
  keywords: [
    'Art Portfolio',
    'Original Artwork Collection',
    'Paintings',
    'Drawings',
    '3D Models',
    '3D Printed Art',
    '3D Art Portfolio',
    'Art Gallery',
    'Joyce Rasfeld Portfolio',
  ],
  alternates: {
    canonical: `${siteUrl}/portfolio`,
  },
  openGraph: {
    title: 'Art Portfolio - Browse Original Artwork',
    description:
      "Explore Joyce Rasfeld's complete collection of original artwork. Browse paintings, drawings, 3D models, 3D printed art, and mixed media pieces across various categories.",
    url: `${siteUrl}/portfolio`,
  },
  twitter: {
    title: 'Art Portfolio - Browse Original Artwork',
    description:
      "Explore Joyce Rasfeld's complete collection of original artwork. Browse paintings, drawings, 3D models, 3D printed art, and mixed media pieces across various categories.",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
