import type { FallbackProps } from './ErrorBoundary';

export const PageErrorFallback = ({ error, reset }: FallbackProps) => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h2 className="mb-2 text-xl font-semibold text-slate-900">
        Something went wrong
      </h2>

      <p className="mb-1 max-w-md text-sm leading-relaxed text-slate-500">
        An unexpected error occurred while loading this page.
      </p>

      <p className="mb-8 max-w-md font-mono text-xs text-red-400">
        {error.message}
      </p>

      <button
        onClick={reset}
        className="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-medium text-white cursor-pointer transition hover:bg-slate-700"
      >
        Try again
      </button>
    </div>
  );
};
