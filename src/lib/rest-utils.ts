export const b64Encode = (str: string) =>
  typeof window !== 'undefined'
    ? btoa(encodeURIComponent(str))
    : Buffer.from(str, 'utf8').toString('base64');

export const b64Decode = (b64: string) =>
  typeof window !== 'undefined'
    ? decodeURIComponent(atob(b64))
    : Buffer.from(b64, 'base64').toString('utf8');

export function buildRestRoute({
  locale,
  method,
  url,
  body,
  headers,
}: {
  locale: string;
  method?: string;
  url?: string;
  body?: string;
  headers?: Record<string, string>;
}) {
  const encodedUrl = url ? b64Encode(url) : '';
  const encodedBody = body ? b64Encode(body) : '';

  let path = `/${locale}/rest-client/${method}`;

  if (encodedUrl) path += `/${encodedUrl}`;
  if (encodedBody) path += `/${encodedBody}`;

  if (headers && Object.keys(headers).length) {
    const qs = Object.entries(headers)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');
    path += `?${qs}`;
  }

  return path;
}
