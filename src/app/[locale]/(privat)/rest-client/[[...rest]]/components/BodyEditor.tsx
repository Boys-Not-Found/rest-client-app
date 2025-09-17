'use client';
import { applyVariables } from '@/lib/variables';
import { useRestStore } from '@/store/useRestStore';
import { useState } from 'react';

export default function BodyEditor() {
  const body = useRestStore((s) => s.body);
  const setBody = useRestStore((s) => s.setBody);

  const [input, setInput] = useState(body);

  const handleChange = (value: string) => {
    setInput(value);
    setBody(applyVariables(value));
  };

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Body</h3>
      <textarea
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Raw request body (JSON, text, etc.)"
        rows={6}
        className="w-full rounded border px-3 py-2 font-mono text-sm"
      />
    </div>
  );
}
