import { setRequestLocale } from 'next-intl/server';
import { TypeLocale } from '@/types/types';
import HistoryList from './HistoryList';
import type { RequestRecord } from '@/types/types';

export default async function HistoryContent({
  requests,
  params,
}: {
  requests: RequestRecord[];
  params: { locale: TypeLocale };
}) {
  const { locale } = params;
  setRequestLocale(locale);

  return <HistoryList requests={requests} />;
}
