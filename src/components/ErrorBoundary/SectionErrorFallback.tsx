import type { FallbackProps } from './ErrorBoundary';

interface SectionErrorFallbackProps extends FallbackProps {
  label?: string;
}

export const SectionErrorFallback = ({
  error,
  reset,
  label = 'This section',
}: SectionErrorFallbackProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
      <p className="text-sm font-medium text-red-600">
        {label} could not be loaded
      </p>

      <p className="font-mono text-xs text-red-400">{error.message}</p>

      <button
        onClick={reset}
        className="mt-1 rounded-lg border border-red-200 bg-white px-4 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
      >
        Retry
      </button>
    </div>
  );
};
