import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartItem, Size, ProductColor } from '@/types';
import * as api from '@/services/api';

interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  addItem: (productId: string, size: Size, color: ProductColor) => Promise<void>;
  removeItem: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  delivery: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const delivery = 12.00;

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartItems = await api.getCart();
        setItems(cartItems);
      } catch (error) {
        console.error('Failed to load cart:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCart();
  }, []);

  const addItem = useCallback(async (productId: string, size: Size, color: ProductColor) => {
    try {
      const updatedCart = await api.addToCart(productId, size, color);
      setItems(updatedCart);
    } catch (error) {
      console.error('Failed to add item:', error);
      throw error;
    }
  }, []);

  const removeItem = useCallback(async (cartItemId: string) => {
    try {
      const updatedCart = await api.removeFromCart(cartItemId);
      setItems(updatedCart);
    } catch (error) {
      console.error('Failed to remove item:', error);
      throw error;
    }
  }, []);

  const updateQuantity = useCallback(async (cartItemId: string, quantity: number) => {
    try {
      const updatedCart = await api.updateCartItemQuantity(cartItemId, quantity);
      setItems(updatedCart);
    } catch (error) {
      console.error('Failed to update quantity:', error);
      throw error;
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = subtotal + (items.length > 0 ? delivery : 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        delivery,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
