import { useState } from 'react';

import { Header } from '../components/Header/Header';
import { ProductGrid } from '../components/ProductGrid/ProductGrid';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { useProducts } from '../hooks/useProducts';
import { Footer } from '../components/Footer/Footer';
import type { Product } from '../types/Product';
import { ProductDetail } from '../components/ProductDetails/ProductDetail';

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { products, loading, error, refetch } = useProducts();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="mx-auto max-w-7xl px-6 py-10 flex gap-8">
        {!selectedProduct ? (
          <>
            <Sidebar />

            <div className="flex-1">
              {loading ? (
                <div className="flex items-center justify-center p-20">
                  <p className="text-lg text-slate-600">Loading products...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center gap-4 p-20">
                  <p className="text-red-600">{error}</p>

                  <button
                    onClick={refetch}
                    className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <ProductGrid
                  products={products}
                  onProductClick={setSelectedProduct}
                />
              )}
            </div>
          </>
        ) : (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};
