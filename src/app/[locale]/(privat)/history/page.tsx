import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TypeLocale } from '@/types/types';
import dynamic from 'next/dynamic';
import Loader from '@/components/Loader/Loader';
import { cookies } from 'next/headers';

type PropsHistoryPage = {
  params: Promise<{ locale: TypeLocale }>;
};

const HistoryContent = dynamic(() => import('./_components/HistoryContent'), {
  ssr: true,
  loading: () => <Loader />,
});

export default async function HistoryPage({ params }: PropsHistoryPage) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('history');
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? `http://${process.env.VERCEL_URL ?? 'localhost:3000'}`;

  const res = await fetch(`${baseUrl}/api/history`, {
    cache: 'no-store',
    headers: { cookie: cookieHeader },
  });
  if (!res.ok) {
    return <p>{t('loginRequired')}</p>;
  }

  const requests = await res.json();

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">{t('title')}</h2>
      <HistoryContent requests={requests} />
    </>
  );
}
