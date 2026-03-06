import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center text-white">
      <h1 className="text-6xl font-bold sm:text-8xl">404</h1>
      <p className="text-lg text-gray-400 sm:text-xl">
        This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="rounded-full bg-teal-500 px-6 py-2.5 text-base font-medium text-white transition-colors hover:bg-teal-400 sm:text-lg"
      >
        Go Home
      </Link>
    </div>
  );
}
