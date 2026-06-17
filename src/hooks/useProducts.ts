import { useCallback, useEffect, useState } from 'react';

import { fetchProducts } from '../api/productApi';
import type { Product } from '../types/Product';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();

      setProducts(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while fetching products.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadInitialProducts = async () => {
      try {
        const data = await fetchProducts();
        if (!isMounted) return;

        setProducts(data);
      } catch (err) {
        if (!isMounted) return;
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred while fetching products.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadInitialProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    products,
    loading,
    error,
    refetch,
  };
};
