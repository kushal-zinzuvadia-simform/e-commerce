import type { Product } from '../types/Product';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const fetchProducts = async (
  signal?: AbortSignal
): Promise<Array<Product>> => {
  const response = await fetch(`${BASE_URL}/products`, { signal });

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

export const fetchProductById = async (
  id: number,
  signal?: AbortSignal
): Promise<Product | null> => {
  const response = await fetch(`${BASE_URL}/products/${id}`, { signal });

  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error(
      `Failed to fetch product: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};
