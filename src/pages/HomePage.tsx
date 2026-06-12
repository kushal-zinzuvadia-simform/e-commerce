import { useState } from 'react';

import { Header } from '../components/Header/Header';
import { useProducts } from '../hooks/useProducts';
import { ProductGrid } from '../components/ProductGrid/ProductGrid';

export const HomePage = () => {
  const { products } = useProducts();

  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main role="main">
        <ProductGrid products={products} />
      </main>
    </div>
  );
};
