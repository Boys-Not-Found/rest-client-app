'use client';

import Link from 'next/link';

type RequestRecord = {
  id: string;
  method: string;
  url: string;
  statusCode: number;
  latency: number;
  requestTimestamp: { seconds: number; nanoseconds: number };
};

export default function HistoryList({ requests }: { requests: RequestRecord[] }) {
  if (!requests || requests.length === 0) {
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
              <div className="flex justify-between">
                <span className="font-mono font-semibold">{req.method}</span>
                <span>{new Date(req.requestTimestamp.seconds * 1000).toLocaleString()}</span>
              </div>
              <p className="truncate">{req.url}</p>
              <p>
                Status: {req.statusCode} | Latency: {Math.round(req.latency)} ms
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
