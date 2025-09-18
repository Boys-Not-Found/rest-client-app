import Link from 'next/link';

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

export default function HistoryList({ requests }: { requests: RequestRecord[] }) {
  if (!requests.length) {
    return (
      <div className="text-center mt-10">
        <p className="mb-4">You have not executed any requests yet.</p>
        <Link href="/rest-client" className="text-blue-600 underline">
          Go to REST client
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Request History</h1>
      <ul className="space-y-4">
        {requests.map((req) => (
          <li key={req.id} className="border p-4 rounded hover:bg-gray-50 transition">
            <Link
              href={`/rest-client?method=${req.method}&url=${encodeURIComponent(req.url)}`}
              className="block"
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
