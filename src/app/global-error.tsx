'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="min-h-screen flex flex-col items-center justify-center gap-6 font-sans bg-black text-orange-500">
        <h2>Something went wrong!</h2>
        <h2>Error message: {error.message}</h2>
        <button className="btn inverted" onClick={() => reset()}>
          Try again
        </button>
      </body>
    </html>
  );
}
