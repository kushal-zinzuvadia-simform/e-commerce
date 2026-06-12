import type { Product } from '../../types/Product';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-4 py-24 px-6 text-center animate-fade-in"
        role="status"
      >
        <div aria-hidden="true">
          <img
            src="/icons/search-empty.svg"
            alt=""
            className="w-16 h-16 opacity-30"
          />
        </div>

        <h3 className="text-xl font-semibold text-[#0f172a]">
          No Products Found
        </h3>

        <p className="text-sm text-[#475569] max-w-sm leading-relaxed">
          We couldn't find any products matching your search term. Try adjusting
          your spelling or filters.
        </p>
      </div>
    );
  }

  return (
    <section
      className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6"
      aria-label="Products list"
    ></section>
  );
};
