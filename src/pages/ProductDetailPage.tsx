import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchProductById } from '../api/productApi';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { ProductDetail } from '../components/ProductDetails/ProductDetail';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import { PageErrorFallback } from '../components/ErrorBoundary/PageErrorFallback';
import type { Product } from '../types/Product';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const numericId = Number(id);

    if (!id || !Number.isInteger(numericId) || numericId <= 0) {
      navigate('/not-found', { replace: true });
      return;
    }

    setProduct(null);
    setLoading(true);

    const controller = new AbortController();

    const load = async () => {
      try {
        const data = await fetchProductById(numericId, controller.signal);

        if (data === null) {
          navigate('/not-found', { replace: true });
        } else {
          setProduct(data);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        navigate('/not-found', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    load();
    return () => controller.abort();
  }, [id, navigate]);

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

        <Footer onFocusSearch={() => searchRef.current?.focus()} />
      </div>
    </ErrorBoundary>
  );
};
