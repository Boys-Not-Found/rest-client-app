import { create } from 'zustand';

export type Header = { id: string; key: string; value: string };

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export type RestResponse = {
  status: number | null;
  statusText?: string | null;
  headers?: Record<string, string>;
  data?: JsonValue;
  text?: string | null;
  error?: string | null;
};

type RestState = {
  method: string;
  url: string;
  headers: Header[];
  body: string;
  response?: RestResponse;
  setMethod: (m: string) => void;
  setUrl: (u: string) => void;
  setHeaders: (h: Header[]) => void;
  setBody: (b: string) => void;
  setResponse: (r?: RestResponse) => void;
  setInitial: (opts: { method?: string; endpointUrl?: string; requestBody?: string }) => void;
  reset: () => void;
};

export const useRestStore = create<RestState>((set) => ({
  method: 'GET',
  url: '',
  headers: [],
  body: '',
  response: undefined,
  setMethod: (m) => set({ method: m }),
  setUrl: (u) => set({ url: u }),
  setHeaders: (h) => set({ headers: h }),
  setBody: (b) => set({ body: b }),
  setResponse: (r) => set({ response: r }),
  setInitial: ({ method, endpointUrl, requestBody }) =>
    set({
      method: method ?? 'GET',
      url: endpointUrl ?? '',
      body: requestBody ?? '',
    }),
  reset: () =>
    set({
      method: 'GET',
      url: '',
      headers: [],
      body: '',
      response: undefined,
    }),
}));
