'use client';
import { useTranslations } from 'next-intl';

export default function VariablesContent() {
  const t = useTranslations('home');

  return (
    <>
      <h1>{t('hello')} Variables Page</h1>
    </>
  );
}
