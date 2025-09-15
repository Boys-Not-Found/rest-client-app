'use client';

import { useRestClient } from '@/hooks/useRestClient';
import { buildRestRoute } from '@/lib/rest-utils';
import { useRestStore } from '@/store/useRestStore';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

import BodyEditor from './components/BodyEditor';
import EndpointInput from './components/EndpointInput';
import GeneratedCode from './components/GeneratedCode';
import HeadersEditor from './components/HeadersEditor';
import MethodSelector from './components/MethodSelector';

export default function RestClient() {
  const method = useRestStore((s) => s.method);
  const url = useRestStore((s) => s.url);
  const headersArr = useRestStore((s) => s.headers);
  const body = useRestStore((s) => s.body);
  const { response } = useRestStore();

  const { sendRequest, loading } = useRestClient();
  const router = useRouter();

  const params = useParams();
  const locale = typeof params.locale === 'string' ? params.locale : 'en';

  const headersObj = Object.fromEntries(headersArr.map((h) => [h.key, h.value]).filter(([k]) => k));

  const onSend = async () => {
    await sendRequest();

    const path = buildRestRoute({
      locale,
      url,
      body,
      headers: headersObj,
    });

    router.replace(path);
  };

  return (
    <div className="space-y-6 max-w-3xl p-4 mt-4 mx-auto">
      <div className="flex gap-3 items-start">
        <MethodSelector />
        <EndpointInput />
        <button onClick={onSend} disabled={loading} className="btn">
          {loading ? 'Sending…' : 'Send'}
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
