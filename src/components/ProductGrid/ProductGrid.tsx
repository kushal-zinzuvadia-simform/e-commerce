import { useCallback, useEffect, useRef, useState } from 'react';

import type { Product } from '../../types/Product';
import { ProductCard } from './ProductCard';

const PAGE_SIZE = 12;

interface ProductGridProps {
  products: Array<Product>;
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Reset when product list changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [products]);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, products.length));
  }, [products.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: '200px' } // start loading before 200px
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

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
    <>
      <section
        aria-label="Products list"
        className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8"
      >
        {visibleProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index === 0}
          />
        ))}
      </section>

      {hasMore && (
        <div ref={sentinelRef} className="mt-8 flex justify-center py-4">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-slate-500" />
        </div>
      )}

      {!hasMore && products.length > PAGE_SIZE && (
        <p className="mt-8 text-center text-sm text-slate-400">
          All {products.length} products shown
        </p>
      )}
    </>
  );
};
