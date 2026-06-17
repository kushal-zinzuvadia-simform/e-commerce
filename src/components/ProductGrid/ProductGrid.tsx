import type { Product } from '../../types/Product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
}

export const ProductGrid = ({ products, onProductClick }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div
        className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center"
        role="status"
      >
        <img
          src="/icons/search-empty.svg"
          alt=""
          className="mb-6 h-14 w-14 opacity-30"
        />

        <h3 className="mb-2 text-xl font-semibold text-slate-900">
          No products found
        </h3>

        <p className="max-w-md text-sm leading-relaxed text-slate-500">
          Try searching with a different keyword or browse all products.
        </p>
      </div>
    );
  }

  return (
    <section
      aria-label="Products list"
      className="
        grid
        grid-cols-[repeat(auto-fill,minmax(280px,1fr))]
        gap-8
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onProductClick?.(product)}
        />
      ))}
    </section>
  );
};
