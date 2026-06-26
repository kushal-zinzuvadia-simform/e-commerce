import { PRICE_OPTIONS, SORT_OPTIONS } from '../../data/filterOptions';
import type { PriceRange, SortOption } from '../../types/Filter';

interface SidebarProps {
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  selectedCategories: Array<string>;
  onCategoryToggle: (name: string) => void;
  price: PriceRange;
  onPriceChange: (value: PriceRange) => void;
  onClearAll: () => void;
  availableCategories: string[];
}

export const Sidebar = ({
  sort,
  onSortChange,
  selectedCategories,
  onCategoryToggle,
  price,
  onPriceChange,
  onClearAll,
  availableCategories,
}: SidebarProps) => {
  const activeCount =
    (sort !== 'relevance' ? 1 : 0) +
    selectedCategories.length +
    (price ? 1 : 0);

  return (
    <aside className="w-64 shrink-0 self-start rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sticky top-[88px] max-h-[calc(100vh-88px-24px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
          {activeCount > 0 && (
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold leading-none tabular-nums text-white">
              {activeCount}
            </span>
          )}
        </div>

        <button
          className="text-xs font-medium cursor-pointer text-slate-400 transition-colors hover:text-slate-600 disabled:opacity-30 disabled:cursor-default"
          onClick={onClearAll}
          disabled={activeCount === 0}
        >
          Clear all
        </button>
      </div>

      <div className="mb-5">
        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
          Sort by
        </h3>

        <div className="space-y-1">
          {SORT_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-50"
            >
              <input
                type="radio"
                name="sort"
                value={option.value}
                checked={sort === option.value}
                onChange={() => onSortChange(option.value)}
                className="h-4 w-4 shrink-0 border-slate-300"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
          Category
        </h3>

        <div className="space-y-1">
          {availableCategories.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-50"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryToggle(category)}
                className="h-4 w-4 shrink-0 rounded border-slate-300"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
          Price
        </h3>

        <div className="space-y-1">
          {PRICE_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-50"
            >
              <input
                type="radio"
                name="price"
                value={option.value}
                checked={price === option.value}
                onChange={() =>
                  onPriceChange(price === option.value ? '' : option.value)
                }
                className="h-4 w-4 shrink-0 border-slate-300"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};
