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

  it('redirects to / when not authenticated on private route', () => {
    const request = createRequest('http://localhost/en/variables');
    const response = middleware(request) as NextResponse;

    expect(response.headers.get('location')).toContain('/en/');
  });

  it('allows access to unrelated public route', () => {
    const request = createRequest('http://localhost/en/some-public-page');
    const response = middleware(request);

    expect(response).toEqual(NextResponse.next());
  });

  it('redirects authenticated user away from /sign-in', () => {
    const request = createRequest('http://localhost/en/sign-in', 'session=abc');
    const response = middleware(request) as NextResponse;

    expect(response.headers.get('location')).toContain('/en/');
  });

  it('redirects authenticated user away from /sign-up', () => {
    const request = createRequest('http://localhost/en/sign-up', 'session=abc');
    const response = middleware(request) as NextResponse;

    expect(response.headers.get('location')).toContain('/en/');
  });
});
