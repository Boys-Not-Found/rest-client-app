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
      <body className="section h-screen">
        <h2>Something went wrong!</h2>
        <h2>Error message: {error.message}</h2>
        <button className="btn inverted" onClick={() => reset()}>
          Try again
        </button>
      </body>
    </html>
  );
}
