import type { Product } from '../types/Product';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch products: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('API response is not an array of products');
  }

  return data;
};
