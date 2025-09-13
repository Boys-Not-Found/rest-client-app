'use client';
import { useTranslations } from 'next-intl';

export default function RestClientPage() {
  const t = useTranslations('home');
  console.log('Rest-client component loaded');

  return (
    <>
      <h1>{t('hello')} Rest-client Page</h1>
    </>
  );
}
