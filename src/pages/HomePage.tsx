import { useState } from 'react';

import { Header } from '../components/Header/Header';
import { useProducts } from '../hooks/useProducts';
import { ProductGrid } from '../components/ProductGrid/ProductGrid';

export const HomePage = () => {
  const { products } = useProducts();

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <ProductGrid products={products} />
      </main>
    </div>
  );
};
