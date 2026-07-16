import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { FALLBACK_IMAGE_URL, getCleanImageUrl } from '../../utils/imageUtils';
import { formatCurrency } from '../../utils/priceUtils';
import type { Product } from '../../types/Product';
import { useCart } from '../../hooks/useCart';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard = ({
  product,
  priority = false,
}: ProductCardProps) => {
  const { id, title, description, price, images } = product;
  const { addItem } = useCart();

  const imageUrl = getCleanImageUrl(images?.[0]);

  // Mock stock data - derived from product id until real inventory API is available
  const isAvailable = id % 7 !== 0;
  const stockCount = (id % 5) + 1;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent navigating to detail page
    e.stopPropagation();
    if (!isAvailable) return;
    addItem(product);
    toast.success(`"${title}" added to cart`, { duration: 2000 });
  };

  return (
    <Link
      to={`/products/${id}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-slate-400 hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
      aria-label={`View details for ${title}`}
    >
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={title}
          loading={priority ? undefined : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          onError={(e) => {
            if (e.target instanceof HTMLImageElement) {
              e.target.src = FALLBACK_IMAGE_URL;
            }
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
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-2xl font-semibold tracking-tight text-slate-900">
                {formatCurrency(price)}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">
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

              <button
                id={`add-to-cart-${id}`}
                onClick={handleAddToCart}
                disabled={!isAvailable}
                aria-label={
                  isAvailable ? `Add ${title} to cart` : `${title} is sold out`
                }
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-150 ${
                  isAvailable
                    ? 'bg-slate-900 text-white hover:bg-slate-700 active:scale-95'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isAvailable ? 'Add to Cart' : 'Sold Out'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
