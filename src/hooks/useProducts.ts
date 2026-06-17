import { useCallback, useEffect, useRef, useState } from 'react';

import { fetchProducts } from '../api/productApi';
import type { Product } from '../types/Product';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMountedRef = useRef(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      if (isMountedRef.current) {
        setProducts(data);
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(
          err instanceof Error ? err.message : 'An unexpected error occurred.'
        );
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    (async () => {
      await load();
    })();

    return () => {
      isMountedRef.current = false;
    };
  }, [load]);

  return { products, loading, error, refetch: load };
};
