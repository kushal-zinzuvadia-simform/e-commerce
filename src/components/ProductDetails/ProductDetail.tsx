import { useState } from 'react';

import { formatCurrency } from '../../utils/priceUtils';
import type { Product } from '../../types/Product';
import { ImageGallery } from './ImageGallery';
import { ProductMeta } from './ProductMeta';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetail = ({ product, onBack }: ProductDetailProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 text-sm font-medium text-slate-500 transition hover:text-slate-900"
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

            <div className="mt-8">
              <p className="text-3xl font-semibold text-slate-900">
                {formatCurrency(product.price)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
