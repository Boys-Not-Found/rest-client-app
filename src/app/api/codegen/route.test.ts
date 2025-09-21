import { vi, describe, it, expect } from 'vitest';
import { POST } from './route';
import { NextRequest } from 'next/server';

vi.mock('postman-code-generators', () => ({
  convert: vi.fn((_lang, _variant, _request, _options, cb) => {
    cb(null, 'mock-snippet');
  }),
}));

describe('POST /generate-snippet', () => {
  it('returns 400 if body is invalid JSON', async () => {
    const req = {
      json: vi.fn().mockRejectedValue(new Error('invalid')),
    } as unknown as NextRequest;

    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.error).toBe('Invalid JSON body');
  });

  it('returns 400 if method or url missing', async () => {
    const req = {
      json: vi.fn().mockResolvedValue({ target: { language: 'js', variant: 'fetch' } }),
    } as unknown as NextRequest;

    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.error).toBe('method and url are required');
  });

  it('generates snippet successfully', async () => {
    const req = {
      json: vi.fn().mockResolvedValue({
        method: 'POST',
        url: 'https://example.com',
        body: { foo: 'bar' },
        target: { language: 'js', variant: 'fetch' },
      }),
    } as unknown as NextRequest;

    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.snippet).toBe('mock-snippet');
  });
});
