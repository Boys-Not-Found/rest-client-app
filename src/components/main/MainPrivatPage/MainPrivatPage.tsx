'use client';

import { useUserStore } from '@/store/userStore';
import NavBar from '@/components/NavBar/NavBar';
import { useTranslations } from 'next-intl';

export default function MainPrivatPage() {
  const t = useTranslations('home');
  const user = useUserStore((state) => state.user);

  return (
    <>
      <section className="section h-screen flex flex-col gap-5">
        <NavBar />
        <h1 className="text-2xl font-bold text-center">
          {t('welcome')}
          <span>{user?.displayName || 'user'}</span>
        </h1>
      </section>
    </>
  );
}
