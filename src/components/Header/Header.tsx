import type { Ref } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchRef?: Ref<HTMLInputElement>;
}

export const Header = ({
  searchQuery,
  onSearchChange,
  searchRef,
}: HeaderProps) => {
  return (
    <header
      className="sticky top-0 z-10 w-full border-b backdrop-blur-md shadow-sm"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        borderColor: 'rgba(226, 232, 240, 0.8)',
      }}
      role="banner"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-6 px-6 py-4">
        <Link
          to="/products"
          className="flex items-center gap-3"
          aria-label="Go to Homepage"
        >
          <img src="/icons/logo.svg" alt="ShopSphere" className="h-8 w-8" />
          <span className="text-2xl font-extrabold tracking-tight text-[#0f172a]">
            ShopSphere
          </span>
        </Link>

        <div className="flex justify-center">
          <div className="w-full max-w-150">
            <SearchBar
              ref={searchRef}
              query={searchQuery}
              onChange={onSearchChange}
            />
          </div>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center cursor-pointer"
          aria-label="Cart"
          title="Cart"
        >
          <img src="/icons/cart.svg" alt="Cart" className="h-8 w-8" />
        </button>
      </div>
    </header>
  );
};
