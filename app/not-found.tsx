import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] p-4">
      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">404 - Page Not Found</h2>
      <p className="text-[var(--foreground)] mb-6 text-center">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-[var(--secondary)] text-[var(--secondary-foreground)] rounded-lg hover:bg-[var(--secondary)] transition-colors font-medium"
      >
        Return Home
      </Link>
    </div>
  );
}
