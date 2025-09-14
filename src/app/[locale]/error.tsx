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
    <div className="section h-screen flex flex-col justify-center items-center gap-5">
      <h2>{t('default')}</h2>
      <button className="btn inverted" onClick={() => reset()}>
        {t('button')}
      </button>
    </div>
  );
}
