'use client';
import { applyVariables } from '@/lib/variables';
import { useRestStore } from '@/store/useRestStore';
import { HeaderRow } from './HeaderRow';
import { useTranslations } from 'next-intl';

export default function HeadersEditor() {
  const t = useTranslations('client');
  const headers = useRestStore((s) => s.headers);
  const setHeaders = useRestStore((s) => s.setHeaders);

  const updateHeader = (idx: number, key: string, value: string) => {
    const next = headers.map((h, i) =>
      i === idx ? { ...h, key: applyVariables(key), value: applyVariables(value) } : h
    );
    setHeaders(next);
  };

  const addHeader = () => setHeaders([...headers, { id: crypto.randomUUID(), key: '', value: '' }]);

  const removeHeader = (idx: number) => setHeaders(headers.filter((_, i) => i !== idx));

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Headers</h3>
        <button type="button" onClick={addHeader} className="btn-icon">
          {t('add')}
        </button>
      </div>

      {headers.map((h, i) => (
        <HeaderRow
          key={h.id}
          id={h.id}
          keyValue={h.key}
          value={h.value}
          onChange={(key, value) => updateHeader(i, key, value)}
          onRemove={() => removeHeader(i)}
        />
      ))}
    </div>
  );
}
