import { getTranslations, setRequestLocale } from 'next-intl/server';
import HistoryList from './HistoryList';
import type { TypeLocale } from '@/types';

type Props = { params: Promise<{ locale: TypeLocale }> };

export default async function HistoryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? `http://${process.env.VERCEL_URL ?? 'localhost:3000'}`;

  const res = await fetch(`${baseUrl}/api/history`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return <p>{t('loginRequired')}</p>;
  }

  const requests = await res.json();

  return (
    <>
      <h1>{t('hello')} history Page</h1>
      <HistoryList requests={requests} />
    </>
  );
}
