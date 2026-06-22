interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({
  query,
  onChange,
  placeholder = 'Search products by title or description...',
}: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <img
        src="/icons/search.svg"
        alt=""
        aria-hidden="true"
        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 opacity-60"
      />

      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        className="h-12 w-full rounded-xl border border-[#cbd5e1] bg-[#ffffff] pl-12 pr-10 text-sm text-[#0f172a] placeholder:text-[#94a3b8] transition-all duration-200 focus:border-[#4f46e5] focus:bg-[#ffffff] focus:outline-none focus:ring-1 focus:ring-[#4f46e5]/15"
      />

      {query && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
        >
          <img src="/icons/close.svg" alt="" className="h-6 w-6 opacity-70" />
        </button>
      )}
    </div>
  );
};
