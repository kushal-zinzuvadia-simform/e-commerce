import { useState } from 'react';

import { Header } from '../components/Header/Header';
import { ProductGrid } from '../components/ProductGrid/ProductGrid';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { useProducts } from '../hooks/useProducts';
import { Footer } from '../components/Footer/Footer';
import type { Product } from '../types/Product';
import { ProductDetail } from '../components/ProductDetails/ProductDetail';

export const HomePage = () => {
  const { products } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="mx-auto max-w-7xl px-6 py-10 flex gap-8">
        {!selectedProduct ? (
          <div className="flex gap-8 items-start">
            <Sidebar />

            <div className="flex-1">
              <ProductGrid
                products={products}
                onProductClick={setSelectedProduct}
              />
            </div>
          </div>
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
