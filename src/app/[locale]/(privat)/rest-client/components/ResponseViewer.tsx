'use client';
import { useRestStore } from '@/store/useRestStore';

export default function ResponseViewer() {
  const resp = useRestStore((s) => s.response);

  if (!resp) return <div className="p-4">No response yet</div>;

  return (
    <div className="mt-6 space-y-2">
      <div className="flex items-center gap-4">
        <div className="font-mono text-sm">Status: {resp.status ?? '—'}</div>
        <div className="text-sm text-gray-500">{resp.statusText}</div>
      </div>

      <pre className="whitespace-pre-wrap bg-gray-950 text-white p-4 rounded text-sm">
        {resp.data ? JSON.stringify(resp.data, null, 2) : (resp.text ?? resp.error)}
      </pre>
    </div>
  );
}
