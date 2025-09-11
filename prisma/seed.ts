import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.artwork.deleteMany();

  // Seed artwork data
  const artworks = [
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756695109/IMG_3329_xnr5wq.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756695109/IMG_2847_2_goi8un.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756695109/IMG_3328_vmdvkl.jpg',
      category: 'My Mini',
      year: 2023,
      available: false,
    },
    {
      title: 'Pastel Blue Victorian',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694768/pastel-blue-victorian_mrfaeb.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'Multi-Colored Brick Cottage',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694768/multi-colored-brick-cottage_ffshha.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694768/IMG_9800_upiriq.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694768/IMG_9815_ds5zso.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694768/IMG_9861_hf6aif.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694768/IMG_8970_ksjlrb.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694768/IMG_8964_vazkt2.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694768/IMG_8963_wrnmaq.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694767/IMG_8962_aa9bfx.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694758/IMG_7522_qth7is.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694758/IMG_8293_ncbgzg.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694758/IMG_6595_vrqpxd.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694758/IMG_6442_pfw8cj.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694758/IMG_6142_ewsste.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694758/IMG_6135_g0ofjr.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694758/IMG_5921_zq013p.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694758/IMG_6118_ueoqv8.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694758/IMG_5920_rb9ucv.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694758/IMG_5791_pgs0fj.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694757/IMG_5825_bojmds.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694757/IMG_5824_nxiimr.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694757/IMG_5715_qffynm.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694757/IMG_2847_np9xk0.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694757/IMG_5153_gc1v5t.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694757/IMG_5659_bddwcm.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'My Mini',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694757/IMG_5178_yrxbxo.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
    },
    {
      title: 'Two-Story Family Home',
      medium: 'PLA, Acrylic',
      dimensions: '6" x 4"',
      price: 'N/A',
      imageUrl:
        'https://res.cloudinary.com/dw3nx5fen/image/upload/v1756694757/two-story-family-home.jpg_g8jatg.jpg',
      category: 'My Mini',
      year: 2024,
      available: false,
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
