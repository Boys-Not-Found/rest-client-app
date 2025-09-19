declare module 'postman-code-generators' {
  import { Request } from 'postman-collection';

  export interface Options {
    indentCount?: number;
    indentType?: 'Space' | 'Tab';
    trimRequestBody?: boolean;
    followRedirect?: boolean;
    [key: string]: unknown;
  }

  export type Callback = (err: Error | null, snippet?: string) => void;

  export function convert(
    language: string,
    variant: string,
    request: Request,
    options: Options,
    cb: Callback
  ): void;
}
