'use client';
import { useTranslations } from 'next-intl';

export default function RestClientContent() {
  const t = useTranslations('home');

  return (
    <>
      <h1>{t('hello')} Rest-client Page</h1>
    </>
  );
}
