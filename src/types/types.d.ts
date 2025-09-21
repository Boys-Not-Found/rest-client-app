export type TypeLocale = 'en' | 'ru';

export type RequestRecord = {
  id: string;
  requestTimestamp: string;
  userId: string;
  requestData: {
    endpointUrl: string | null;
    requestDuration: number | null;
    requestMethod: string | null;
    requestSize: number | null;
    requestTimestamp: number | null;
    responseSize: number | null;
    responseStatusCode: number | null;
    responseStatusText: string | null;
    errorDetails?: string | null;
  };

  // headers?: Record<string, string>;
};
