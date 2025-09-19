import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import type { RequestRecord } from '@/types/types';

export default function HistoryList({ requests }: { requests: RequestRecord[] }) {
  const t = useTranslations('history');
  if (!requests.length) {
    return (
      <div className="text-center mt-10">
        <p className="mb-4">{t('no-requests')}</p>
        <Link href="/rest-client" className="btn inverted">
          {t('rest')}
        </Link>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <ul className="flex flex-col gap-4">
        {requests.map((req) => (
          <li key={req.id} className="border p-4 rounded hover:bg-gray-700 transition">
            <Link
              href={`/rest-client?method=${req.method}&url=${encodeURIComponent(req.url)}
        &body=${encodeURIComponent(req.body || '')}
        &headers=${encodeURIComponent(JSON.stringify(req.headers))}`}
            >
              <div className="flex justify-between mb-1">
                <span className="font-mono font-semibold">{req.method}</span>
                <time dateTime={req.requestTimestamp}>
                  {new Date(req.requestTimestamp).toLocaleString()}
                </time>
              </div>

              <p className="truncate mb-1">{req.url}</p>

              <p>
                Status: {req.statusCode ?? '—'} | Latency: {req.latency ?? '—'} ms
              </p>
              <p>Request size: {req.requestSize ?? '—'} bytes</p>
              <p>Response size: {req.responseSize ?? '—'} bytes</p>

              {req.errorDetails && <p className="text-red-600">Error: {req.errorDetails}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
