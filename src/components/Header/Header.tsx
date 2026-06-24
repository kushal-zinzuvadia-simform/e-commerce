import type { Ref } from 'react';
import { useState } from 'react';
import { SearchBar } from './SearchBar';
import { MockError } from '../MockError/MockError';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onLogoClick: () => void;
  searchRef?: Ref<HTMLInputElement>;
}

export const Header = ({
  searchQuery,
  onSearchChange,
  onLogoClick,
  searchRef,
}: HeaderProps) => {
  const [showError, setShowError] = useState(false);

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
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={onLogoClick}
          aria-label="Go to Homepage"
        >
          <img src="/icons/logo.svg" alt="ShopSphere" className="h-8 w-8" />
          <span className="text-2xl font-extrabold tracking-tight text-[#0f172a]">
            ShopSphere
          </span>
        </div>

        {/* Search */}
        <div className="flex justify-center">
          <div className="w-full max-w-150">
            <SearchBar
              ref={searchRef}
              query={searchQuery}
              onChange={onSearchChange}
            />
          </div>
        </div>

        {/* Cart */}
        <button
          className="flex h-11 w-11 items-center justify-center cursor-pointer"
          aria-label="Cart"
          title="Cart"
          onClick={() => setShowError(true)}
        >
          <img src="/icons/cart.svg" alt="Cart" className="h-8 w-8" />
        </button>
        {showError && <MockError />}
      </div>
    </header>
  );
};
