import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TypeLocale } from '@/types';

type HistoryPageProps = {
  params: Promise<{ locale: TypeLocale }>;
};

export default async function HistoryPage({ params }: HistoryPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');

  return (
    <>
      <h1>{t('hello')} history Page</h1>
    </>
  );
}
