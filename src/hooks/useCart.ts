import { useContext } from 'react';

import { CartContext } from '../context/cartContext';
import type { CartContextValue } from '../context/cartContext';

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
};
