'use client';
import React from 'react';
import { useRestStore } from '@/store/useRestStore';

export default function GeneratedCode() {
  const { method, url, headers, body } = useRestStore();

  const headerLines = headers
    .filter((h) => h.key)
    .map((h) => `    "${h.key}": "${h.value}"`)
    .join(',\n');

  const options = [
    `method: "${method}"`,
    headerLines && `headers: {\n${headerLines}\n    }`,
    !['GET', 'HEAD'].includes(method) && body ? `body: ${JSON.stringify(body)}` : '',
  ]
    .filter(Boolean)
    .join(',\n  ');

  const code = `fetch("${url}", {\n  ${options}\n})`;

  return (
    <div className="border-t pt-4">
      <h3 className="font-semibold mb-2">Generated fetch() snippet</h3>
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">{code}</pre>
    </div>
  );
}
