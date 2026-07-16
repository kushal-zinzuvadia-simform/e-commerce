import type { CartItem as CartItemType } from '../../types/Cart';
import { formatCurrency } from '../../utils/priceUtils';
import { FALLBACK_IMAGE_URL } from '../../utils/imageUtils';
import { useCart } from '../../hooks/useCart';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { removeItem, updateQuantity } = useCart();

  return (
    <li className="flex gap-4 py-4 border-b border-slate-100 last:border-0">
      {/* Thumbnail */}
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          onError={(e) => {
            if (e.target instanceof HTMLImageElement) {
              e.target.src = FALLBACK_IMAGE_URL;
            }
          }}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <p className="text-sm font-medium text-slate-900 line-clamp-2 leading-snug">
          {item.title}
        </p>
        <p className="text-sm font-semibold text-slate-700">
          {formatCurrency(item.price)}
        </p>

        {/* Quantity stepper + remove */}
        <div className="mt-1 flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-slate-200 overflow-hidden">
            <button
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label={`Decrease quantity of ${item.title}`}
              className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              −
            </button>
            <span className="px-3 py-1 text-sm font-semibold text-slate-900 min-w-[2rem] text-center border-x border-slate-200">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              aria-label={`Increase quantity of ${item.title}`}
              className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 transition-colors text-sm font-medium"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeItem(item.productId)}
            aria-label={`Remove ${item.title} from cart`}
            className="text-xs text-slate-400 hover:text-red-500 transition-colors underline-offset-2 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Line total */}
      <div className="shrink-0 text-sm font-semibold text-slate-900 pt-0.5">
        {formatCurrency(item.price * item.quantity)}
      </div>
    </li>
  );
};
