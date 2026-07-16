import { createContext } from 'react';

import type { Product } from '../types/Product';
import type { Cart } from '../types/Cart';

export interface CartContextValue {
  items: Cart;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export const CartContext = createContext<CartContextValue | null>(null);
