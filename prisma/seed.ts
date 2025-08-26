import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.artwork.deleteMany();

  // Seed artwork data
  const artworks = [
    {
      title: 'Sunset Over Mountains',
      medium: 'Oil on Canvas',
      dimensions: '24" x 36"',
      price: '$1,200',
      imageUrl:
        'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop',
      category: 'Landscape',
      year: 2024,
      available: true,
    },
    {
      title: 'Abstract Harmony',
      medium: 'Acrylic on Canvas',
      dimensions: '30" x 40"',
      price: '$1,800',
      imageUrl:
        'https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&h=500&fit=crop',
      category: 'Abstract',
      year: 2024,
      available: true,
    },
    {
      title: 'Portrait of Grace',
      medium: 'Charcoal on Paper',
      dimensions: '18" x 24"',
      price: '$800',
      imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
      category: 'Portrait',
      year: 2023,
      available: true,
    },
    {
      title: 'Ocean Waves',
      medium: 'Watercolor on Paper',
      dimensions: '22" x 30"',
      price: '$950',
      imageUrl:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
      category: 'Seascape',
      year: 2024,
      available: true,
    },
    {
      title: 'Urban Night',
      medium: 'Oil on Canvas',
      dimensions: '36" x 48"',
      price: '$2,200',
      imageUrl:
        'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=500&fit=crop',
      category: 'Cityscape',
      year: 2023,
      available: false,
    },
    {
      title: 'Floral Dreams',
      medium: 'Mixed Media',
      dimensions: '20" x 20"',
      price: '$1,100',
      imageUrl:
        'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=500&fit=crop',
      category: 'Still Life',
      year: 2024,
      available: true,
    },
    {
      title: 'Desert Storm',
      medium: 'Acrylic on Canvas',
      dimensions: '40" x 60"',
      price: '$3,500',
      imageUrl:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
      category: 'Landscape',
      year: 2024,
      available: true,
    },
    {
      title: 'Inner Thoughts',
      medium: 'Graphite on Paper',
      dimensions: '16" x 20"',
      price: '$650',
      imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
      category: 'Portrait',
      year: 2023,
      available: true,
    },
  ];

  for (const artwork of artworks) {
    await prisma.artwork.create({
      data: artwork,
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
