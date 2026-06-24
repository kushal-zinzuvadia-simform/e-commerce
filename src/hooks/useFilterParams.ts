import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export type SortOption = 'relevance' | 'price_asc' | 'price_desc' | 'latest';
export type PriceRange = 'under_50' | '50_100' | '100_200' | 'above_200' | '';

export const useFilterParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get('q') ?? '';
  const sort = (searchParams.get('sort') ?? 'relevance') as SortOption;
  const categoriesRaw = searchParams.get('categories');
  const categories = categoriesRaw
    ? categoriesRaw.split(',').filter(Boolean)
    : [];
  const price = (searchParams.get('price') ?? '') as PriceRange;

  const setQ = useCallback(
    (value: string) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (value) next.set('q', value);
          else next.delete('q');
          return next;
        },
        { replace: true } // so typing doesn't flood history
      );
    },
    [setSearchParams]
  );

  const setSort = useCallback(
    (value: SortOption) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (value && value !== 'relevance') next.set('sort', value);
        else next.delete('sort');
        return next;
      });
    },
    [setSearchParams]
  );

  const setCategories = useCallback(
    (value: string[]) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (value.length > 0) next.set('categories', value.join(','));
        else next.delete('categories');
        return next;
      });
    },
    [setSearchParams]
  );

  const setPrice = useCallback(
    (value: PriceRange) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set('price', value);
        else next.delete('price');
        return next;
      });
    },
    [setSearchParams]
  );

  const clearAll = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return {
    q,
    sort,
    categories,
    price,
    setQ,
    setSort,
    setCategories,
    setPrice,
    clearAll,
  };
};
