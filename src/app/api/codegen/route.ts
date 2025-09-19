import { NextRequest, NextResponse } from 'next/server';
import * as codegen from 'postman-code-generators';
import sdk from 'postman-collection';

export const runtime = 'nodejs';

type HeaderKV = { key: string; value: string };

type Target = {
  language: string;
  variant: string;
};

type Payload = {
  method: string;
  url: string;
  headers?: HeaderKV[];
  body?: unknown;
  target: Target;
};

type Codegen = {
  convert: (
    language: string,
    variant: string,
    request: unknown,
    options: unknown,
    cb: (err: Error | null, snippet?: string) => void
  ) => void;
};

const cg = codegen as unknown as Codegen;

const BODY_FORBIDDEN = new Set(['GET', 'HEAD']);

function normalizeBody(method: string, body: unknown): string | undefined {
  if (BODY_FORBIDDEN.has(method.toUpperCase())) return undefined;
  if (body == null || body === '') return undefined;
  if (typeof body === 'string') return body;
  try {
    return JSON.stringify(body, null, 2);
  } catch {
    return String(body);
  }
}

function generateSnippet(
  language: string,
  variant: string,
  request: unknown,
  options: unknown
): Promise<string> {
  return new Promise((resolve, reject) => {
    cg.convert(language, variant, request, options, (err, snippet) => {
      if (err) return reject(err);
      resolve(snippet ?? '');
    });
  });
}

export async function POST(req: NextRequest) {
  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!data?.method || !data?.url) {
    return NextResponse.json({ error: 'method and url are required' }, { status: 400 });
  }
  if (!data?.target?.language || !data?.target?.variant) {
    return NextResponse.json(
      { error: 'target.language and target.variant are required' },
      { status: 400 }
    );
  }

  const raw = normalizeBody(data.method, data.body);
  const body = raw ? new sdk.RequestBody({ mode: 'raw', raw }) : undefined;

  const pmRequest = new sdk.Request({
    method: data.method,
    url: data.url,
    header: (data.headers ?? [])
      .filter((h) => (h.key || '').trim())
      .map((h) => new sdk.Header({ key: h.key, value: String(h.value ?? '') })),
    body,
  });

  const options = {
    indentCount: 2,
    indentType: 'Space',
    trimRequestBody: true,
    followRedirect: true,
  };

  try {
    const snippet = await generateSnippet(
      data.target.language,
      data.target.variant,
      pmRequest,
      options
    );
    return NextResponse.json({ snippet });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Generation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
