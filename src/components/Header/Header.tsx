import type { Ref } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { logout } from '../../utils/auth';
import { SearchBar } from './SearchBar';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  searchRef?: Ref<HTMLInputElement>;
}

export const Header = ({
  searchQuery,
  onSearchChange,
  searchRef,
}: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header
      className="sticky top-0 z-10 w-full border-b backdrop-blur-md shadow-sm"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        borderColor: 'rgba(226, 232, 240, 0.8)',
      }}
      role="banner"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-2.5">
        <Link
          to="/products"
          className="flex items-center gap-2"
          aria-label="Go to Homepage"
        >
          <img src="/icons/logo.svg" alt="ShopSphere" className="h-6 w-6" />
          <span className="text-xl font-extrabold tracking-tight text-[#0f172a]">
            ShopSphere
          </span>
        </Link>

        <div className="flex justify-center">
          {searchQuery !== undefined && onSearchChange && (
            <div className="w-full max-w-150">
              <SearchBar
                ref={searchRef}
                query={searchQuery}
                onChange={onSearchChange}
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3 px-4 py-1.5">
            <Link
              to="/profile"
              className="flex h-8 px-3 items-center justify-center cursor-pointer text-sm text-slate-600 bg-slate-200 rounded-lg hover:bg-slate-300 transition-colors"
              title="Profile"
            >
              My Profile
            </Link>

            <button
              onClick={handleLogout}
              className="flex h-8 px-3 items-center justify-center cursor-pointer text-sm text-slate-600 hover:text-red-600 transition-colors bg-slate-200 rounded-lg"
              title="Logout"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
