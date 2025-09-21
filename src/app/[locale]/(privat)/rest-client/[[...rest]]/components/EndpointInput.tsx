'use client';
import { applyVariables } from '@/lib/variables';
import { useRestStore } from '@/store/useRestStore';
import { useEffect, useState } from 'react';

export default function EndpointInput() {
  const url = useRestStore((s) => s.url);
  const setUrl = useRestStore((s) => s.setUrl);

  const [input, setInput] = useState(url);

  useEffect(() => {
    setInput(url ?? '');
  }, [url]);
  const handleChange = (value: string) => {
    setInput(value);
    setUrl(applyVariables(value));
  };

  return (
    <input
      value={input}
      onChange={(e) => handleChange(e.target.value)}
      placeholder="https://api.example.com/endpoint"
      className="input h-10"
    />
  );
}
