export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'men' | 'women' | 'kids' | 'other';
  colors: ProductColor[];
  sizes: Size[];
  description?: string;
}

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
}

export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: Size;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  delivery: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: Date;
  address: Address;
}

export interface Address {
  id: string;
  line1: string;
  line2?: string;
  city: string;
  deliveryDays: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export type Category = 'all' | 'men' | 'women' | 'kids' | 'other';
