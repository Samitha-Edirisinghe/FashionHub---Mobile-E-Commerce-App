import { Product, Address } from '@/types';
import tagerineShirt from '@/assets/products/tagerine-shirt.jpg';
import leatherCoat from '@/assets/products/leather-coat.jpg';
import leatherCoatTan from '@/assets/products/leather-coat-tan.jpg';
import onboardingModel from '@/assets/products/onboarding-model.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Tagerine Shirt',
    price: 240.32,
    image: tagerineShirt,
    category: 'men',
    colors: [
      { id: 'c1', name: 'Yellow', hex: '#F5DEB3' },
      { id: 'c2', name: 'Floral', hex: '#8B4513' },
      { id: 'c3', name: 'Orange', hex: '#FF6B35' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'A premium floral print shirt perfect for casual occasions.',
  },
  {
    id: '2',
    name: 'Leather Coart',
    price: 325.36,
    image: leatherCoat,
    category: 'men',
    colors: [
      { id: 'c1', name: 'Pink', hex: '#E8A0A0' },
      { id: 'c2', name: 'Tan', hex: '#D2691E' },
      { id: 'c3', name: 'Brown', hex: '#8B4513' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Elegant leather coat for sophisticated styling.',
  },
  {
    id: '3',
    name: 'Tagerine Shirt',
    price: 126.47,
    image: tagerineShirt,
    category: 'women',
    colors: [
      { id: 'c1', name: 'Yellow', hex: '#F5DEB3' },
      { id: 'c2', name: 'Green', hex: '#228B22' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Casual floral shirt for everyday wear.',
  },
  {
    id: '4',
    name: 'Leather Coart',
    price: 257.85,
    image: leatherCoatTan,
    category: 'men',
    colors: [
      { id: 'c1', name: 'Tan', hex: '#D2691E' },
      { id: 'c2', name: 'Brown', hex: '#8B4513' },
      { id: 'c3', name: 'Camel', hex: '#C19A6B' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Premium tan leather coat for refined style.',
  },
];

export const defaultAddress: Address = {
  id: 'addr1',
  line1: '25/3 Housing Estate',
  city: 'Sylhet',
  deliveryDays: 7,
};

export const onboardingImage = onboardingModel;
