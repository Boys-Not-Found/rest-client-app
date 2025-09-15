'use client';
import { useRestStore } from '@/store/useRestStore';

export default function HeadersEditor() {
  const headers = useRestStore((s) => s.headers);
  const setHeaders = useRestStore((s) => s.setHeaders);

  const updateHeader = (idx: number, key: string, value: string) => {
    const next = headers.map((h, i) => (i === idx ? { ...h, key, value } : h));
    setHeaders(next);
  };

  const addHeader = () => setHeaders([...headers, { id: crypto.randomUUID(), key: '', value: '' }]);

  const removeHeader = (idx: number) => setHeaders(headers.filter((_, i) => i !== idx));

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Headers</h3>
        <button
          type="button"
          onClick={addHeader}
          className="rounded bg-blue-500 px-2 py-1 text-white text-sm"
        >
          + Add
        </button>
      </div>

      {headers.map((h, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={h.key}
            onChange={(e) => updateHeader(i, e.target.value, h.value)}
            placeholder="Header key"
            className="input"
          />
          <input
            value={h.value}
            onChange={(e) => updateHeader(i, h.key, e.target.value)}
            placeholder="Header value"
            className="input"
          />
          <button
            type="button"
            onClick={() => removeHeader(i)}
            className="rounded bg-red-500 px-2 text-white text-sm"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
