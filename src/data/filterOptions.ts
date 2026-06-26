import { PriceRange, SortOption } from '../types/Filter';

export const SORT_OPTIONS = [
  { value: SortOption.Relevance, label: 'Relevance' },
  { value: SortOption.PriceAsc, label: 'Price: Low to High' },
  { value: SortOption.PriceDesc, label: 'Price: High to Low' },
  { value: SortOption.Latest, label: 'Latest' },
];

export const PRICE_OPTIONS = [
  { value: PriceRange.Under50, label: 'Under $50' },
  { value: PriceRange.Range50to100, label: '$50 – $100' },
  { value: PriceRange.Range100to200, label: '$100 - $200' },
  { value: PriceRange.Above200, label: 'Above $200' },
];
