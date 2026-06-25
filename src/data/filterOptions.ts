export const SORT_OPTIONS = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Latest', value: 'latest' },
] as const;

export const PRICE_OPTIONS = [
  { label: 'Under $50', value: 'under_50' },
  { label: '$50 - $100', value: '50_100' },
  { label: '$100 - $200', value: '100_200' },
  { label: 'Above $200', value: 'above_200' },
] as const;
