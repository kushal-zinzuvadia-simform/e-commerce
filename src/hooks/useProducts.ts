import { useQuery } from '@tanstack/react-query';

import { fetchProducts } from '../api/productApi';
import type { Product } from '../types/Product';

export const useProducts = () => {
  const {
    data: products = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery<Array<Product>, Error>({
    queryKey: ['products'],
    queryFn: ({ signal }) => fetchProducts(signal),
  });

  return {
    products,
    loading,
    error: error ? error.message : null,
    refetch,
  };
};
