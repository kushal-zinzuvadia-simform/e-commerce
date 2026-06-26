import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-8xl font-extrabold text-slate-200 select-none leading-none">
        404
      </p>

      <h1 className="mt-4 text-2xl font-bold text-slate-900">Page not found</h1>

      <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
        The product you&apos;re looking for doesn&apos;t exist or the URL is
        incorrect.
      </p>

      <Link
        to="/products"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        &larr; Back to products
      </Link>
    </div>
  );
};
