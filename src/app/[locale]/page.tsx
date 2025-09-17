'use client';

import { useUserStore } from '@/store/useUserStore';
import MainPrivatPage from '@/components/main/MainPrivatPage/MainPrivatPage';
import MainPublicPage from '@/components/main/MainPublicPage/MainPublicPage';
import { useTranslations } from 'next-intl';

export default function MainPage() {
  const user = useUserStore((state) => state.user);
  const t = useTranslations('home');
  return (
    <>
      <main className="container min-h-[85vh] justify-center">
        {user ? (
          <>
            <MainPrivatPage />
          </>
        ) : (
          <MainPublicPage />
        )}
        <article className="section">
          <h2 className="text-2xl font-bold text-center">{t('about')}</h2>
          <p className="mt-4 text-center">{t('description')}</p>
          <p className="mt-4 text-center font-semibold">{t('stack')}</p>
        </article>
      </main>
    </>
  );
}
