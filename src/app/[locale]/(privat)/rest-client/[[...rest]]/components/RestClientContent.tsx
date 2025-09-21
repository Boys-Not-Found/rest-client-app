'use client';

import { useRestClient } from '@/hooks/useRestClient';
import { buildRestRoute } from '@/lib/rest-utils';
import { useRestStore } from '@/store/useRestStore';

import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import BodyEditor from './BodyEditor';
import EndpointInput from './EndpointInput';
import GeneratedCode from './GeneratedCode';
import HeadersEditor from './HeadersEditor';
import MethodSelector from './MethodSelector';
import { useTranslations } from 'next-intl';

export default function RestClientContent() {
  const t = useTranslations('client');
  const searchParams = useSearchParams();
  const router = useRouter();

  const method = useRestStore((s) => s.method);
  const url = useRestStore((s) => s.url);
  const headersArr = useRestStore((s) => s.headers);
  const body = useRestStore((s) => s.body);
  const { response } = useRestStore();

  const setMethod = useRestStore((s) => s.setMethod);
  const setUrl = useRestStore((s) => s.setUrl);
  const setBody = useRestStore((s) => s.setBody);
  const setHeaders = useRestStore((s) => s.setHeaders);

  const { sendRequest, loading } = useRestClient();

  useEffect(() => {
    const qpMethod = searchParams.get('method');
    const qpUrl = searchParams.get('url');
    const qpBody = searchParams.get('body');
    const qpHeaders = searchParams.get('headers');

    if (qpMethod) setMethod(qpMethod);
    if (qpUrl) setUrl(qpUrl);
    if (qpBody) setBody(qpBody);

    if (qpHeaders) {
      try {
        const parsed: Record<string, string> = JSON.parse(decodeURIComponent(qpHeaders));
        const headersArray = Object.entries(parsed).map(([key, value]) => ({
          id: crypto.randomUUID(),
          key,
          value: String(value),
        }));
        setHeaders(headersArray);
      } catch {
        setHeaders([]);
      }
    }
  }, [searchParams, setMethod, setUrl, setBody, setHeaders]);

  const onSend = async () => {
    const headersObj = Object.fromEntries(
      headersArr.map((h) => [h.key, h.value]).filter(([k]) => k)
    );

    const reqBodyString = body ? JSON.stringify(body) : '';
    const reqHeadersString = headersArr.length ? JSON.stringify(headersObj) : '';
    const requestSize = new TextEncoder().encode(reqBodyString + reqHeadersString).length;

    const startTime = performance.now();

    await sendRequest();
    const latency = performance.now() - startTime;

    const resp = useRestStore.getState().response;
    const respSize = resp?.data ? new TextEncoder().encode(JSON.stringify(resp.data)).length : 0;

    const path = buildRestRoute({
      method,
      url,
      body,
      headers: headersObj,
    });

    router.replace(path);

    if (resp) {
      await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpointUrl: url,
          requestDuration: latency,
          requestMethod: method,
          requestSize,
          requestTimestamp: new Date().toISOString(),
          responseSize: respSize,
          responseStatusCode: resp.status,
          responseStatusText: resp.statusText,
          errorDetails: resp.error,
        }),
      });
    }
  };

  return (
    <div className="space-y-6 max-w-3xl p-4 mt-4 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-orange-500">{t('title')}</h2>
      <div className="flex gap-3 items-start">
        <MethodSelector />
        <EndpointInput />
        <button onClick={onSend} disabled={loading} className="btn">
          {loading ? `${t('sending')}` : `${t('send')}`}
        </button>
      </div>

      <HeadersEditor />

      {method !== 'GET' && method !== 'HEAD' && <BodyEditor />}

      <GeneratedCode />

      {response && (
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Response</h3>
          <pre className="p-4 rounded overflow-auto text-sm text-left">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
