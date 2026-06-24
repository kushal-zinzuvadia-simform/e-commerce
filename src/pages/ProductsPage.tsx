import { useRef, useState } from 'react';

import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { ProductGrid } from '../components/ProductGrid/ProductGrid';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import { PageErrorFallback } from '../components/ErrorBoundary/PageErrorFallback';
import { SectionErrorFallback } from '../components/ErrorBoundary/SectionErrorFallback';
import { useProducts } from '../hooks/useProducts';

export const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const { products, loading, error, refetch } = useProducts();

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const focusSearch = () => {
    searchRef.current?.focus();
  };

  return (
    <ErrorBoundary
      fallback={({ error, reset }) => (
        <PageErrorFallback error={error} reset={reset} />
      )}
    >
      <div className="min-h-screen bg-[#f8fafc]">
        <Header
          searchRef={searchRef}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="mx-auto max-w-7xl px-6 py-10 flex gap-8">
          <ErrorBoundary
            fallback={({ error, reset }) => (
              <div className="w-72 shrink-0 h-fit">
                <SectionErrorFallback
                  error={error}
                  reset={reset}
                  label="Filters"
                />
              </div>
            )}
          >
            <Sidebar />
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
                <ProductGrid products={filteredProducts} />
              )}
            </ErrorBoundary>
          </div>
        </main>

        <Footer onFocusSearch={focusSearch} />
      </div>
    </ErrorBoundary>
  );
};
