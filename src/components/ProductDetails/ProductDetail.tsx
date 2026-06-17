import type { Product } from '../../types/Product';

type ProductDetailProps = {
  product: Product;
  onBack: () => void;
};

export const ProductDetail = ({ product, onBack }: ProductDetailProps) => {
  return (
    <div>
      {product.title}
      <br />
      <button onClick={onBack}>Close</button>
    </div>
  );
};
