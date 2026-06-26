import { useEffect, useRef } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { ProductDetail } from '../components/ProductDetails/ProductDetail';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import { PageErrorFallback } from '../components/ErrorBoundary/PageErrorFallback';
import { useProduct } from '../hooks/useProduct';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement | null>(null);

  const numericId = Number(id);
  const isValidId = !!id && Number.isInteger(numericId) && numericId > 0;

  const {
    data: product,
    isLoading: loading,
    error,
    isFetched,
  } = useProduct(numericId);

  useEffect(() => {
    // If query finishes and product is null, or if there's an error fetching
    if (error || (isFetched && product === null)) {
      navigate('/not-found', { replace: true });
    }
  }, [navigate, isFetched, product, error]);

  if (!isValidId) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <ErrorBoundary
      fallback={({ error, reset }) => (
        <PageErrorFallback error={error} reset={reset} />
      )}
    >
      <div className="min-h-screen bg-[#f8fafc]">
        <Header searchRef={searchRef} />

        <main className="mx-auto max-w-7xl px-6 py-10">
          {loading ? (
            <div className="flex items-center justify-center p-20">
              <p className="text-lg text-slate-600">Loading product...</p>
            </div>
          ) : product ? (
            <ProductDetail product={product} />
          ) : null}
        </main>

        <Footer
          onFocusSearch={() => searchRef.current?.focus()}
          showActions={false}
        />
      </div>
    </ErrorBoundary>
  );
};

export default ProductDetailPage;
