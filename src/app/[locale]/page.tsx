//import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { TypeLocale } from '@/types';

export default function MainPage({ params }: { params: { locale: TypeLocale } }) {
  const { locale } = params;

  setRequestLocale(locale);

  const t = useTranslations('home');

  return (
    <>
      <h1>{t('hello')} main page</h1>
    </>
  );
}
