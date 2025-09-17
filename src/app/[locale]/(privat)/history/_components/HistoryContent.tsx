import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TypeLocale } from '@/types';
import HistoryList from './HistoryList';

type RequestRecord = {
  id: string;
  method: string;
  url: string;
  statusCode: number;
  latency: number;
  requestTimestamp: { seconds: number; nanoseconds: number };
};

export default async function HistoryContent({
  requests,
  params,
}: {
  requests: RequestRecord[];
  params: { locale: TypeLocale };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('history');

  if (!requests.length) {
    return <p>{t('no-requests')}</p>;
  }

  return <HistoryList requests={requests} />;
}
