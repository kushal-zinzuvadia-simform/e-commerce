import { useMemo, useRef } from 'react';

import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { ProductGrid } from '../components/ProductGrid/ProductGrid';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import { PageErrorFallback } from '../components/ErrorBoundary/PageErrorFallback';
import { SectionErrorFallback } from '../components/ErrorBoundary/SectionErrorFallback';
import { useProducts } from '../hooks/useProducts';
import { useFilterParams } from '../hooks/useFilterParams';

const ProductsPage = () => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const { products, loading, error, refetch } = useProducts();
  const {
    q,
    sort,
    categories,
    price,
    setQ,
    setSort,
    setCategories,
    setPrice,
    clearAll,
  } = useFilterParams();

  // Derive unique category names
  const availableCategories = useMemo(
    () => [...new Set(products.map((p) => p.category.name))].sort(),
    [products]
  );

  const processedProducts = useMemo(() => {
    let result = [...products];

    const query = q.toLowerCase().trim();
    if (query) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    if (categories.length > 0) {
      result = result.filter((p) => categories.includes(p.category.name));
    }

    if (price) {
      result = result.filter((p) => {
        switch (price) {
          case 'under_50':
            return p.price < 50;
          case '50_100':
            return p.price >= 50 && p.price < 100;
          case '100_200':
            return p.price >= 100 && p.price < 200;
          case 'above_200':
            return p.price >= 200;
          default:
            return true;
        }
      });
    }

    switch (sort) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'latest':
        result.sort((a, b) => {
          const aDate = a.creationAt ? new Date(a.creationAt).getTime() : 0;
          const bDate = b.creationAt ? new Date(b.creationAt).getTime() : 0;
          return bDate - aDate;
        });
        break;
      default:
        break;
    }

    return result;
  }, [products, q, categories, price, sort]);

  const toggleCategory = (name: string) => {
    if (categories.includes(name)) {
      setCategories(categories.filter((c) => c !== name));
    } else {
      setCategories([...categories, name]);
    }
  };

  return (
    <ErrorBoundary
      fallback={({ error, reset }) => (
        <PageErrorFallback error={error} reset={reset} />
      )}
    >
      <div className="min-h-screen bg-[#f8fafc]">
        <Header searchRef={searchRef} searchQuery={q} onSearchChange={setQ} />

        <main className="mx-auto max-w-7xl px-6 py-8 flex items-start gap-8">
          <ErrorBoundary
            fallback={({ error, reset }) => (
              <div className="w-64 shrink-0 h-fit">
                <SectionErrorFallback
                  error={error}
                  reset={reset}
                  label="Filters"
                />
              </div>
            )}
          >
            <Sidebar
              sort={sort}
              onSortChange={setSort}
              selectedCategories={categories}
              onCategoryToggle={toggleCategory}
              price={price}
              onPriceChange={setPrice}
              onClearAll={clearAll}
              availableCategories={availableCategories}
            />
          </ErrorBoundary>

          <div className="flex-1">
            <ErrorBoundary
              fallback={({ error, reset }) => (
                <SectionErrorFallback
                  error={error}
                  reset={reset}
                  label="Product listing"
                />
              )}
            >
              {loading ? (
                <div className="flex items-center justify-center p-20">
                  <p className="text-lg text-slate-600">Loading products...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center gap-4 p-20">
                  <p className="text-red-600">{error}</p>

                  <button
                    onClick={() => refetch()}
                    className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <ProductGrid products={processedProducts} />
              )}
            </ErrorBoundary>
          </div>
        </main>

        <Footer onFocusSearch={() => searchRef.current?.focus()} />
      </div>
    </ErrorBoundary>
  );
};

export default ProductsPage;
