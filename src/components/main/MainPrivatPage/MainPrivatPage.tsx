'use client';

import { useAuth } from '@/context/useAuth';
import { useTranslations } from 'next-intl';

export default function MainPrivatPage() {
  const t = useTranslations('home');
  const { user } = useAuth();

  return (
    <>
      <section className="section flex flex-col gap-5">
        <h1 className="text-2xl font-bold text-center text-orange-500">
          {t('welcome')}
          <span>{user?.displayName || 'user'}</span>
        </h1>
      </section>
    </>
  );
}
