import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TypeLocale } from '@/types';
import dynamic from 'next/dynamic';
import Loader from '@/components/Loader/Loader';

type PropsHistoryPage = { params: { locale: TypeLocale } };

const HistoryContent = dynamic(() => import('./_components/HistoryContent'), {
  ssr: true,
  loading: () => <Loader />,
});

export default async function HistoryPage({ params }: PropsHistoryPage) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('history');

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/history`, {
    cache: 'no-store',
    credentials: 'include',
  });

  const requests = await res.json();

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">{t('title')}</h2>
      <HistoryContent requests={requests} params={{ locale }} />
    </>
  );
}
