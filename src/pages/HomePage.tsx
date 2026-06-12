import { useState } from 'react';
import { Header } from '../components/Header/Header';

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
    </div>
  );
};
