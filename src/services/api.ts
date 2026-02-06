import { Product, CartItem, Order, Size, ProductColor } from '@/types';
import { products, defaultAddress } from '@/data/products';

// Simulated session user ID
const SESSION_USER_ID = 'user_001';

// In-memory stores
let cartStore: Map<string, CartItem[]> = new Map();
let ordersStore: Map<string, Order[]> = new Map();

// Initialize cart for session
if (!cartStore.has(SESSION_USER_ID)) {
  cartStore.set(SESSION_USER_ID, []);
}

// GET /api/products
export const getProducts = async (): Promise<Product[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return products;
};

// GET /api/products/:id
export const getProduct = async (id: string): Promise<Product | null> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return products.find(p => p.id === id) || null;
};

// GET /api/cart
export const getCart = async (): Promise<CartItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 50));
  return cartStore.get(SESSION_USER_ID) || [];
};

// POST /api/cart
export const addToCart = async (
  productId: string,
  selectedSize: Size,
  selectedColor: ProductColor,
  quantity: number = 1
): Promise<CartItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const product = products.find(p => p.id === productId);
  if (!product) {
    throw new Error('Product not found');
  }

  const cart = cartStore.get(SESSION_USER_ID) || [];
  
  // Check if item with same product, size, and color exists
  const existingIndex = cart.findIndex(
    item => 
      item.product.id === productId && 
      item.selectedSize === selectedSize &&
      item.selectedColor.id === selectedColor.id
  );

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += quantity;
  } else {
    const newItem: CartItem = {
      id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      product,
      selectedColor,
      selectedSize,
      quantity,
    };
    cart.push(newItem);
  }

  cartStore.set(SESSION_USER_ID, cart);
  return cart;
};

// DELETE /api/cart/:id
export const removeFromCart = async (cartItemId: string): Promise<CartItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 50));
  
  const cart = cartStore.get(SESSION_USER_ID) || [];
  const updatedCart = cart.filter(item => item.id !== cartItemId);
  cartStore.set(SESSION_USER_ID, updatedCart);
  
  return updatedCart;
};

// PUT /api/cart/:id
export const updateCartItemQuantity = async (
  cartItemId: string,
  quantity: number
): Promise<CartItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 50));
  
  const cart = cartStore.get(SESSION_USER_ID) || [];
  const itemIndex = cart.findIndex(item => item.id === cartItemId);
  
  if (itemIndex >= 0) {
    if (quantity <= 0) {
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity = quantity;
    }
  }
  
  cartStore.set(SESSION_USER_ID, cart);
  return cart;
};

// POST /api/orders
export const createOrder = async (): Promise<Order> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const cart = cartStore.get(SESSION_USER_ID) || [];
  
  if (cart.length === 0) {
    throw new Error('Cart is empty');
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const delivery = 12.00;
  
  const order: Order = {
    id: `#${Math.floor(100000 + Math.random() * 900000)}`,
    items: [...cart],
    subtotal,
    delivery,
    total: subtotal + delivery,
    status: 'confirmed',
    createdAt: new Date(),
    address: defaultAddress,
  };

  // Add to orders store
  const userOrders = ordersStore.get(SESSION_USER_ID) || [];
  userOrders.push(order);
  ordersStore.set(SESSION_USER_ID, userOrders);

  // Clear cart
  cartStore.set(SESSION_USER_ID, []);

  return order;
};

// GET /api/orders
export const getOrders = async (): Promise<Order[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return ordersStore.get(SESSION_USER_ID) || [];
};

// Simulate payment
export const processPayment = async (orderId: string): Promise<{ success: boolean; orderId: string }> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Always succeeds in mock
  return { success: true, orderId };
};
