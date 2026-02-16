export type ProductSlug =
  | 'miniature-house'
  | 'animal-magnets'
  | 'framed-house';

export interface Product {
  slug: ProductSlug;
  name: string;
  description: string;
  basePrice: number; // cents
  imageUrl: string;
  features: string[];
  quantityOptions?: { quantity: number; price: number; label: string }[];
}

export const PRODUCTS: Record<ProductSlug, Product> = {
  'miniature-house': {
    slug: 'miniature-house',
    name: 'Miniature House',
    description:
      'A custom 3D-printed miniature of your home or favorite building, hand-painted with acrylic paint.',
    basePrice: 4500, // $45.00
    imageUrl: '/images/products/miniature-house.jpg',
    features: [
      'Custom 3D-printed from your photo',
      'Hand-painted with acrylic paint',
      'Approximately 3" tall',
      'Perfect for desks or shelves',
    ],
  },
  'animal-magnets': {
    slug: 'animal-magnets',
    name: 'Animal Magnets',
    description:
      'Adorable hand-painted animal magnets, 3D-printed and perfect for your fridge or magnetic board.',
    basePrice: 850, // $8.50
    imageUrl: '/images/products/animal-magnets.jpg',
    features: [
      'Hand-painted with acrylic paint',
      '3D-printed PLA',
      'Strong magnetic backing',
      'Multiple animal designs available',
    ],
    quantityOptions: [
      { quantity: 1, price: 850, label: '1 magnet — $8.50' },
      { quantity: 4, price: 2500, label: '4 magnets — $25.00' },
    ],
  },
  'framed-house': {
    slug: 'framed-house',
    name: 'Framed House',
    description:
      'Your home or special place recreated as a framed 3D miniature artwork, ready to hang or display.',
    basePrice: 6500, // $65.00
    imageUrl: '/images/products/framed-house.jpg',
    features: [
      'Custom 3D-printed from your photo',
      'Hand-painted with acrylic paint',
      'Framed and ready to display',
      'Dimensions: 6" x 4"',
    ],
  },
};

export const ALL_PRODUCTS = Object.values(PRODUCTS);

export function getProduct(slug: string): Product | null {
  return PRODUCTS[slug as ProductSlug] ?? null;
}

export function getProductPrice(slug: string, quantity?: number): number {
  const product = getProduct(slug);
  if (!product) return 0;

  if (product.quantityOptions && quantity) {
    const option = product.quantityOptions.find(o => o.quantity === quantity);
    if (option) return option.price;
  }

  return product.basePrice * (quantity ?? 1);
}
