import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TypeLocale } from '@/types';
import HistoryList from './HistoryList';

type RequestRecord = {
  id: string;
  method: string;
  url: string;
  statusCode: number | null;
  latency: number | null;
  requestSize: number | null;
  responseSize: number | null;
  errorDetails: string | null;
  requestTimestamp: string;
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
