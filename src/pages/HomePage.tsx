import { useState } from 'react';

import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { ProductDetail } from '../components/ProductDetails/ProductDetail';
import { ProductGrid } from '../components/ProductGrid/ProductGrid';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import { PageErrorFallback } from '../components/ErrorBoundary/PageErrorFallback';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../types/Product';
import { SectionErrorFallback } from '../components/ErrorBoundary/SectionErrorFallback';

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { products, loading, error, refetch } = useProducts();

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateHome = () => {
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <ErrorBoundary
      fallback={(err, reset) => <PageErrorFallback error={err} reset={reset} />}
    >
      <div className="min-h-screen bg-[#f8fafc]">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onLogoClick={navigateHome}
        />

        <main className="mx-auto max-w-7xl px-6 py-10 flex gap-8">
          {!selectedProduct ? (
            <>
              <ErrorBoundary
                fallback={(err, reset) => (
                  <div className="w-72 shrink-0 h-fit">
                    <SectionErrorFallback
                      error={err}
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
                  fallback={(err, reset) => (
                    <SectionErrorFallback
                      error={err}
                      reset={reset}
                      label="Product listing"
                    />
                  )}
                >
                  {loading ? (
                    <div className="flex items-center justify-center p-20">
                      <p className="text-lg text-slate-600">
                        Loading products...
                      </p>
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
                    <ProductGrid
                      products={products}
                      onProductClick={handleProductClick}
                    />
                  )}
                </ErrorBoundary>
              </div>
            </>
          ) : (
            <ErrorBoundary
              fallback={(err, reset) => (
                <PageErrorFallback error={err} reset={reset} />
              )}
            >
              <ProductDetail
                product={selectedProduct}
                onBack={() => {
                  setSelectedProduct(null);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
              />
            </ErrorBoundary>
          )}
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
};
