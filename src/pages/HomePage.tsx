import { useState } from 'react';

import { Header } from '../components/Header/Header';
import { ProductGrid } from '../components/ProductGrid/ProductGrid';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { useProducts } from '../hooks/useProducts';

export const HomePage = () => {
  const { products } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="mx-auto max-w-7xl px-6 py-10 flex gap-8">
        <Sidebar />

        <div className="flex-1">
          <ProductGrid products={products} />
        </div>
      </main>
    </div>
  );
};
