'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container">
      <section className="section h-screen flex flex-col justify-center items-center gap-5">
        {' '}
        <h2>Page not found</h2>
        <Link href="/" className="btn inverted">
          Go Home Page
        </Link>
      </section>
    </main>
  );
}
