'use client';

import React from 'react';
import { useRestStore } from '@/store/useRestStore';

type Target = {
  label: string;
  language: string;
  variant: string;
};

const TARGETS: Target[] = [
  { label: 'JavaScript (Fetch)', language: 'javascript', variant: 'Fetch' },
  { label: 'JavaScript (XHR)', language: 'javascript', variant: 'XHR' },
  { label: 'cURL', language: 'curl', variant: 'cURL' },
  { label: 'NodeJS', language: 'nodejs', variant: 'Native' },
  { label: 'Python', language: 'python', variant: 'Requests' },
  { label: 'Java', language: 'java', variant: 'OkHttp' },
  { label: 'C#', language: 'csharp', variant: 'HttpClient' },
  { label: 'Go', language: 'go', variant: 'Native' },
];

export default function GeneratedCode() {
  const method = useRestStore((s) => s.method);
  const url = useRestStore((s) => s.url);
  const headers = useRestStore((s) => s.headers);
  const body = useRestStore((s) => s.body);

  const [tab, setTab] = React.useState(0);
  const [code, setCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const target = TARGETS[tab];
  const notEnough = !method || !url;

  const key = React.useMemo(
    () => JSON.stringify({ method, url, headers, body, target }),
    [method, url, headers, body, target]
  );

  const cacheRef = React.useRef(new Map<string, string>());

  const fetchSnippet = React.useCallback(async () => {
    if (notEnough) {
      setError('Provide method and URL');
      setCode('');
      return;
    }
    const cached = cacheRef.current.get(key);
    if (cached) {
      setError(null);
      setCode(cached);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/codegen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: key,
      });

      const ct = res.headers.get('content-type') || '';
      if (!ct.includes('application/json')) {
        const text = await res.text();
        throw new Error(`Not JSON: ${res.status} ${res.statusText}\n${text.slice(0, 200)}...`);
      }

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Generation failed');

      setCode(json.snippet || '');
      cacheRef.current.set(key, json.snippet || '');
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Generation failed');
      }
      setCode('');
    } finally {
      setLoading(false);
    }
  }, [key, notEnough]);

  React.useEffect(() => {
    fetchSnippet();
  }, [fetchSnippet]);

  return (
    <div className="border-t pt-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-semibold">Generated code</h3>
      </div>

      <div className="flex gap-2 mb-3 flex-wrap">
        {TARGETS.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setTab(i)}
            className={`btn py-0.5 px-1 ${i !== tab && 'inverted'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <pre className="p-4 rounded border-1 overflow-auto text-sm min-h-[160px] font-mono not-prose whitespace-pre text-left">
        {notEnough ? (
          'Provide method and URL'
        ) : loading ? (
          'Generating…'
        ) : error ? (
          `Error: ${error}`
        ) : (
          <code className="text-inherit">{code}</code>
        )}
      </pre>
    </div>
  );
}
