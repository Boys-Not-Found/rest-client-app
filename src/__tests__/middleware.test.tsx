import { NextResponse } from 'next/server';
import middleware from '../middleware';
import type { NextRequest } from 'next/server';

describe('middleware', () => {
  const createRequest = (url: string, cookie?: string): NextRequest =>
    ({
      headers: {
        get: (name: string) => (name === 'cookie' ? cookie || null : null),
      },
      nextUrl: new URL(url),
      url,
    }) as unknown as NextRequest;

  it('allows access to private route when authenticated', () => {
    const request = createRequest('http://localhost/en/variables', 'session=abc');
    const response = middleware(request);

    expect(response).toEqual(NextResponse.next());
  });

  it('redirects to not-found when not authenticated', () => {
    const request = createRequest('http://localhost/en/variables');
    const response = middleware(request) as NextResponse;

    expect(response.headers.get('x-middleware-rewrite')).toContain('/en/not-found');
  });

  it('allows public route without auth', () => {
    const request = createRequest('http://localhost/en/public');
    const response = middleware(request);

    expect(response).toEqual(NextResponse.next());
  });
});
