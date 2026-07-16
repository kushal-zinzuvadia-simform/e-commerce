import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { formatCurrency } from '../../utils/priceUtils';
import type { Product } from '../../types/Product';
import { ImageGallery } from './ImageGallery';
import { ProductMeta } from './ProductMeta';
import { useCart } from '../../hooks/useCart';

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { addItem } = useCart();

  // Mirror the same stock heuristic used on ProductCard
  const isAvailable = product.id % 7 !== 0;

  const handleAddToCart = () => {
    if (!isAvailable) return;
    addItem(product, quantity);
    toast.success(
      `${quantity > 1 ? `${quantity}× ` : ''}"${product.title}" added to cart`,
      { duration: 2000 }
    );
  };

  const decrementQty = () => setQuantity((q) => Math.max(1, q - 1));
  const incrementQty = () => setQuantity((q) => q + 1);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <button
        onClick={() => navigate('/products')}
        className="mb-6 text-sm font-medium text-slate-500 cursor-pointer transition hover:text-slate-900"
      >
        &larr; Back to products
      </button>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid gap-10 lg:grid-cols-2">
          <ImageGallery
            images={product.images}
            selectedIndex={selectedImage}
            onSelect={setSelectedImage}
          />

          <div className="flex flex-col">
            <ProductMeta product={product} />

            <p className="mt-6 text-slate-600 leading-7">
              {product.description}
            </p>

            <div className="mt-8 space-y-6">
              <p className="text-3xl font-semibold text-slate-900">
                {formatCurrency(product.price)}
              </p>

              {/* Stock badge */}
              <span
                className={`inline-block rounded-full px-3 py-1.5 text-xs font-medium ${
                  isAvailable
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {isAvailable ? 'In stock' : 'Sold out'}
              </span>

              {/* Quantity stepper */}
              {isAvailable && (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-slate-700">
                    Quantity
                  </span>
                  <div className="flex items-center rounded-xl border border-slate-200 overflow-hidden">
                    <button
                      onClick={decrementQty}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                      id="detail-qty-decrement"
                      className="px-4 py-2 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                    >
                      −
                    </button>
                    <span className="px-5 py-2 text-sm font-semibold text-slate-900 border-x border-slate-200 min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQty}
                      aria-label="Increase quantity"
                      id="detail-qty-increment"
                      className="px-4 py-2 text-slate-600 hover:bg-slate-100 transition-colors text-sm font-medium"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Add to Cart CTA */}
              <button
                id={`detail-add-to-cart-${product.id}`}
                onClick={handleAddToCart}
                disabled={!isAvailable}
                aria-label={
                  isAvailable
                    ? `Add ${product.title} to cart`
                    : `${product.title} is sold out`
                }
                className={`w-full rounded-xl py-3.5 text-sm font-semibold transition-all duration-150 ${
                  isAvailable
                    ? 'bg-slate-900 text-white hover:bg-slate-700 active:scale-[0.98]'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isAvailable ? 'Add to Cart' : 'Sold Out'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
