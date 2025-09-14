'use client';
import { useRestStore } from '@/store/useRestStore';

export default function EndpointInput() {
  const url = useRestStore((s) => s.url);
  const setUrl = useRestStore((s) => s.setUrl);

  return (
    <input
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      placeholder="https://api.example.com/endpoint"
      className="flex-1 rounded border px-3 py-2 outline-none focus:ring"
    />
  );
}
