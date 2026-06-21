import { FALLBACK_IMAGE_URL, getCleanImageUrl } from '../../utils/imageUtils';
import { formatCurrency } from '../../utils/priceUtils';
import type { Product } from '../../types/Product';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const { id, title, description, price, images } = product;

  const imageUrl = getCleanImageUrl(images?.[0]);

  // Mock stock data - derived from product id until real inventory API is available
  const isAvailable = id % 7 !== 0;
  const stockCount = (id % 5) + 1;

  return (
    <article
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.();
      }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
      role="button"
      tabIndex={0}
      aria-label={`View details for ${title}`}
    >
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE_URL;
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <span className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
          {product.category.name}
        </span>

        <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-slate-900">
          {title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
          {description}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-semibold tracking-tight text-slate-900">
                {formatCurrency(price)}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                isAvailable
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {isAvailable
                ? stockCount === 1
                  ? '1 left'
                  : 'In stock'
                : 'Sold out'}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
