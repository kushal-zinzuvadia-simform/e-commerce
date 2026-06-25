import type { PRICE_OPTIONS, SORT_OPTIONS } from '../data/filterOptions';

export type SortOption = (typeof SORT_OPTIONS)[number]['value'];
export type PriceRange = (typeof PRICE_OPTIONS)[number]['value'] | '';
