'use client';
import { useTranslations } from 'next-intl';

export default function VariablesPage() {
  const t = useTranslations('home');
  console.log('Variables component loaded');

  return (
    <>
      <h1>{t('hello')} Variables Page</h1>
    </>
  );
}
