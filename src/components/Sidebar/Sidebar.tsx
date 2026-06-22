export const Sidebar = () => {
  return (
    <aside className="w-72 shrink-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Filters</h2>

        <button className="text-xs font-medium cursor-pointer text-slate-400 transition-colors hover:text-slate-600">
          Clear all
        </button>
      </div>

      <div className="mb-6">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
          Sort by
        </h3>

        <div className="space-y-2">
          {[
            'Relevance',
            'Price: Low to High',
            'Price: High to Low',
            'Latest',
          ].map((option, index) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50"
            >
              <input
                type="radio"
                name="sort"
                defaultChecked={index === 0}
                className="h-4 w-4 border-slate-300"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="mb-6">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
          Category
        </h3>

        <div className="space-y-2">
          {['Electronics', 'Clothing', 'Home', 'Shoes'].map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50"
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
          Price
        </h3>

        <div className="space-y-2">
          {['Under $50', '$50 - $100', '$100 - $200', 'Above $200'].map(
            (range) => (
              <label
                key={range}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50"
              >
                <input
                  type="radio"
                  name="price"
                  className="h-4 w-4 border-slate-300"
                />
                {range}
              </label>
            )
          )}
        </div>
      </div>
    </aside>
  );
};
