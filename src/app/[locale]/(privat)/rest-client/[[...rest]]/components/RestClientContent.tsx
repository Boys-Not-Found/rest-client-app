'use client';

import { useRestClient } from '@/hooks/useRestClient';
import { buildRestRoute } from '@/lib/rest-utils';
import { useRestStore } from '@/store/useRestStore';

import BodyEditor from './BodyEditor';
import EndpointInput from './EndpointInput';
import GeneratedCode from './GeneratedCode';
import HeadersEditor from './HeadersEditor';
import MethodSelector from './MethodSelector';
import { useRouter } from '@/i18n/navigation';

export default function RestClientContent() {
  const method = useRestStore((s) => s.method);
  const url = useRestStore((s) => s.url);
  const headersArr = useRestStore((s) => s.headers);
  const body = useRestStore((s) => s.body);
  const { response } = useRestStore();

  const { sendRequest, loading } = useRestClient();
  const router = useRouter();

  const headersObj = Object.fromEntries(headersArr.map((h) => [h.key, h.value]).filter(([k]) => k));

  const onSend = async () => {
    await sendRequest();

    const path = buildRestRoute({
      method,
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
