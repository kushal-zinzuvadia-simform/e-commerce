import type { Product } from '../../types/Product';

export const ProductMeta = ({ product }: { product: Product }) => {
  return (
    <div>
      <span className="text-xs uppercase tracking-[0.12em] text-slate-400">
        {product.category.name}
      </span>

      <h1 className="mt-2 text-2xl font-semibold leading-snug text-slate-900">
        {product.title}
      </h1>
    </div>
  );
};
