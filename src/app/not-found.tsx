'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="h-screen flex flex-col gap-4 justify-center items-center bg-black text-orange-500">
      <h2>Page not found</h2>

      <Link href="/" className="btn inverted">
        Go Home Page
      </Link>
    </main>
  );
}
