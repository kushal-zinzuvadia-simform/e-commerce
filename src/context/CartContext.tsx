import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';

import type { Cart, CartItem } from '../types/Cart';
import type { Product } from '../types/Product';
import { getCurrentUser } from '../utils/auth';
import { loadCart, saveCart } from '../utils/cartStorage';
import { getCleanImageUrl } from '../utils/imageUtils';
import { CartContext } from './cartContext';
import type { CartContextValue } from './cartContext';

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<Cart>(() => {
    const user = getCurrentUser();
    return user ? loadCart(user.email) : [];
  });

  // Persist whenever items change
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      saveCart(user.email, items);
    }
  }, [items]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      const newItem: CartItem = {
        productId: product.id,
        title: product.title,
        price: product.price,
        image: getCleanImageUrl(product.images?.[0]),
        quantity,
      };
      return [...prev, newItem];
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity < 1) return;
      setItems((prev) =>
        prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
      );
    },
    []
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
