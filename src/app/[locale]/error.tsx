'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    toast.error(error.message);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button className="btn" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
