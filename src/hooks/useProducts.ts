import { useCallback, useEffect, useState } from 'react';

import { fetchProducts } from '../api/productApi';
import type { Product } from '../types/Product';

export const useProducts = () => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts(signal);
      setProducts(data);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  return { products, loading, error, refetch: load };
};
