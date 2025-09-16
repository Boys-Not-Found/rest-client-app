import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TypeLocale } from '@/types';
import HistoryList from './HistoryList';

type Props = { params: { locale: TypeLocale } };

export default async function HistoryPage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/history`, {
    cache: 'no-store',
    credentials: 'include',
  });
  if (!res.ok) return <p>{t('loginRequired')}</p>;

  const requests = await res.json();

  return (
    <>
      <h1>{t('hello')} history Page</h1>
      <HistoryList requests={requests} />
    </>
  );
}
