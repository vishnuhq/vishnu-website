'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center text-white">
      <h1 className="text-4xl font-bold sm:text-6xl">Something went wrong</h1>
      <p className="text-lg text-gray-400 sm:text-xl">
        An unexpected error occurred.
      </p>
      <button
        onClick={reset}
        className="rounded-full bg-teal-500 px-6 py-2.5 text-base font-medium text-white transition-colors hover:bg-teal-400 sm:text-lg"
      >
        Try Again
      </button>
    </div>
  );
}
