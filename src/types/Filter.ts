export const PriceRange = {
  Under50: 'under_50',
  Range50to100: '50_100',
  Range100to200: '100_200',
  Above200: 'above_200',
} as const;

export type PriceRange = (typeof PriceRange)[keyof typeof PriceRange];
export type NullablePriceRange = PriceRange | null;

export const SortOption = {
  Relevance: 'relevance',
  PriceAsc: 'price_asc',
  PriceDesc: 'price_desc',
  Latest: 'latest',
} as const;

export type SortOption = (typeof SortOption)[keyof typeof SortOption];
