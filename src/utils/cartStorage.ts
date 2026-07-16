import type { Cart } from '../types/Cart';

const CART_KEY_PREFIX = 'cart_';

const cartKey = (userEmail: string): string =>
  `${CART_KEY_PREFIX}${userEmail.toLowerCase()}`;

export const loadCart = (userEmail: string): Cart => {
  const raw = localStorage.getItem(cartKey(userEmail));
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Cart;
  } catch {
    return [];
  }
};

export const saveCart = (userEmail: string, cart: Cart): void => {
  localStorage.setItem(cartKey(userEmail), JSON.stringify(cart));
};
