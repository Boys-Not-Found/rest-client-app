export type TypeLocale = 'en' | 'ru';

export type RequestRecord = {
  id: string;
  method: string;
  url: string;
  statusCode: number | null;
  latency: number | null;
  requestSize: number | null;
  responseSize: number | null;
  errorDetails: string | null;
  requestTimestamp: string;
};
