//TODO:
//сюда перенести содержание  page.tsx
//и удалить page.tsx
//потом переименовать lazyPage.tsx в page.tsx
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TypeLocale } from '@/types';

type Request = {
  method: string;
  url: string;
  status: number;
};

export default async function HistoryContent({
  requests,
  params,
}: {
  requests: Request[];
  params: { locale: TypeLocale };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('history');

  if (!requests.length) {
    return <p>{t('no-requests')}</p>;
  }

  return (
    <ul>
      {requests.map((r, i) => (
        <li key={i}>
          <a href={`/rest-client/${r.method}/${btoa(r.url)}`}>
            [{r.method}] {r.url}
          </a>
          <span>{r.status}</span>
        </li>
      ))}
    </ul>
  );
}
