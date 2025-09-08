'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error');
  useEffect(() => {
    toast.error(error.message);
  }, [error]);

  return (
    <div className="rounded-xl border w-fit m-4 p-4 flex flex-col items-center gap-4">
      <h2>{t('default')}</h2>
      <button className="btn inverted" onClick={() => reset()}>
        {t('button')}
      </button>
    </div>
  );
}
