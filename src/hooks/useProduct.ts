import { useQuery } from '@tanstack/react-query';

import { fetchProductById } from '../api/productApi';
import type { Product } from '../types/Product';

export const useProduct = (id: number) => {
  return useQuery<Product | null, Error>({
    queryKey: ['product', id],
    queryFn: ({ signal }) => fetchProductById(id, signal),
    enabled: Number.isInteger(id) && id > 0,
  });
};
