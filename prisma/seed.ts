import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.artwork.deleteMany();

  // Seed artwork data
  const artworks = [
    {
      title: 'Yellow House, Blue Shutters w/Front Porch',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694757/IMG_5178_yrxbxo.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2024-01-15'),
    },
    {
      title: 'Red Brick House w/Blue Shutters',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694757/IMG_5153_gc1v5t.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2024-01-20'),
    },
    {
      title: 'Blue Siding and Brick House, Carport',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694757/IMG_5659_bddwcm.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2024-02-01'),
    },
    {
      title: 'Black House w/Wood Accents',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694757/IMG_5715_qffynm.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2024-02-05'),
    },
    {
      title: 'Gray Lake House w/Wood Detail',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694757/IMG_5825_bojmds.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2024-02-10'),
    },
    {
      title: 'Brick + Yellow House, Dark Green Shutters',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694758/IMG_5921_zq013p.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2024-02-15'),
    },
    {
      title: 'Red Brick + Cream Accent House, Unique Side Window',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694758/IMG_5920_rb9ucv.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2024-02-20'),
    },
    {
      title: 'Long Brick House x4',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694758/IMG_5791_pgs0fj.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2024-03-01'),
    },
    {
      title: 'Long Gray House w/Tan Brick Details',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694757/IMG_5824_nxiimr.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2024-03-05'),
    },
    {
      title: 'Blue + White House',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694758/IMG_6118_ueoqv8.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2024-03-10'),
    },
    {
      title: 'Brick House, Blue Accents + Large Chimney',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694758/IMG_6142_ewsste.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2024-03-15'),
    },
    {
      title: 'Yellow House, Green Swinging Chair',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694758/IMG_7522_qth7is.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2025-01-01'),
    },
    {
      title: 'Gray Lake Front House',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694758/IMG_8293_ncbgzg.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2025-01-05'),
    },
    {
      title: 'Gray Siding House, Green Front Porch',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694758/IMG_6595_vrqpxd.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2025-01-10'),
    },
    {
      title: 'Gray House, Red Shutters',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694768/IMG_8970_ksjlrb.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2025-01-15'),
    },
    {
      title: 'Brick Ranch House w/Shrubbery',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694768/IMG_8964_vazkt2.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2025-01-20'),
    },
    {
      title: 'Yellow Siding + Brick House w/Porch + Double Garage',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694768/IMG_8963_wrnmaq.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2025-01-25'),
    },
    {
      title: 'Church Building',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694767/IMG_8962_aa9bfx.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2025-02-01'),
    },
    {
      title: 'White House, Blue Door',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694768/IMG_9800_upiriq.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2025-02-05'),
    },
    {
      title: 'Split-Level House, Double Garage',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694768/IMG_9815_ds5zso.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2025-02-10'),
    },
    {
      title: 'White House, Spacious Carport',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694768/IMG_9861_hf6aif.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2025-02-15'),
    },
    {
      title: 'Brick House w/Shrubbery',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756695109/IMG_2847_2_goi8un.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2025-02-20'),
    },
    {
      title: 'Modern Blue House',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756695109/IMG_3329_xnr5wq.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2025-02-25'),
    },
    {
      title: 'White House, Front Porch w/Purple Door',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756695109/IMG_3328_vmdvkl.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2025-03-01'),
    },
    {
      title: 'Yellow House, Large Front Porch, Green Shutters',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694757/two-story-family-home.jpg_g8jatg.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2024-12-01'),
    },
    {
      title: 'Light Brick House, Baby Blue Shuttters',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694768/multi-colored-brick-cottage_ffshha.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2024-12-05'),
    },
    {
      title: 'Pink + Blue Victorian House',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694768/pastel-blue-victorian_mrfaeb.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2024-12-10'),
    },
    {
      title: 'Brick House, Large Front Porch + Green Shutters',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694758/IMG_6135_g0ofjr.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2024-12-15'),
    },
    {
      title: 'Cream Siding + Brick House',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694758/IMG_6442_pfw8cj.jpg',
      category: 'My Mini',
      available: false,
      completedAt: new Date('2024-12-20'),
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
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
