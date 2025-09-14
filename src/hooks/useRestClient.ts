'use client';
import { useCallback, useState } from 'react';
import { useRestStore, JsonValue, RestResponse } from '@/store/useRestStore';

function isJsonValue(v: unknown): v is JsonValue {
  if (v === null || typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean')
    return true;

  if (Array.isArray(v)) return v.every(isJsonValue);

  if (typeof v === 'object') {
    return Object.values(v as Record<string, unknown>).every(isJsonValue);
  }

  return false;
}

export function useRestClient() {
  const method = useRestStore((s) => s.method);
  const url = useRestStore((s) => s.url);
  const headers = useRestStore((s) => s.headers);
  const body = useRestStore((s) => s.body);
  const setResponse = useRestStore((s) => s.setResponse);

  const [loading, setLoading] = useState(false);

  const sendRequest = useCallback(async () => {
    setLoading(true);
    setResponse(undefined);
    try {
      const headersObj: Record<string, string> = {};
      headers.forEach((h) => {
        if (h.key) headersObj[h.key] = h.value;
      });

      const opts: RequestInit = { method, headers: headersObj };
      if (method !== 'GET' && method !== 'HEAD') {
        opts.body = body || undefined;
      }

      const res = await fetch(url, opts);
      const contentType = res.headers.get('content-type') ?? '';

      let data: JsonValue | undefined;
      let textBody: string | null = null;

      try {
        if (contentType.includes('application/json')) {
          const parsed: unknown = await res.json();
          if (isJsonValue(parsed)) {
            data = parsed;
          } else {
            textBody = JSON.stringify(parsed);
          }
        } else {
          textBody = await res.text();
        }
      } catch {
        textBody = await res.text();
      }

      const response: RestResponse = {
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data,
        text: textBody,
      };
      setResponse(response);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : typeof err === 'string' ? err : 'Unknown error';
      setResponse({ status: null, error: message });
    } finally {
      setLoading(false);
    }
  }, [method, url, headers, body, setResponse]);

  return { sendRequest, loading };
}
