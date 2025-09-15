'use client';
import React from 'react';
import { useRestStore } from '@/store/useRestStore';

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];

export default function MethodSelector() {
  const method = useRestStore((s) => s.method);
  const setMethod = useRestStore((s) => s.setMethod);

  return (
    <select value={method} onChange={(e) => setMethod(e.target.value)} className="input h-10">
      {METHODS.map((m) => (
        <option key={m} value={m}>
          {m}
        </option>
      ))}
    </select>
  );
}
