'use client';
import { useRestStore } from '@/store/useRestStore';

export default function BodyEditor() {
  const body = useRestStore((s) => s.body);
  const setBody = useRestStore((s) => s.setBody);

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Body</h3>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Raw request body (JSON, text, etc.)"
        rows={6}
        className="w-full rounded border px-3 py-2 font-mono text-sm"
      />
    </div>
  );
}
