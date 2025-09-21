import { vi, Mock } from 'vitest';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { POST } from './route';

vi.mock('next/headers', () => ({ cookies: vi.fn() }));
vi.mock('@/lib/firebase/admin', () => ({
  adminAuth: { verifySessionCookie: vi.fn() },
  adminDb: { collection: vi.fn() },
}));

describe('POST /api/requests', () => {
  const mockAdd = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (adminDb.collection as unknown as Mock).mockReturnValue({ add: mockAdd });
  });

  it('returns 401 if no session cookie', async () => {
    (cookies as unknown as Mock).mockResolvedValue({
      get: () => undefined,
    });

    const req = new Request('http://localhost', { method: 'POST' });
    const res = await POST(req);

    expect(res.status).toBe(401);
    const json = await res.json();
    expect(json).toEqual({ error: 'Not authenticated' });
  });

  it('saves request and returns ok if cookie is valid', async () => {
    const mockUid = 'user123';
    const requestData = {
      method: 'GET',
      url: 'https://example.com',
      headers: { 'X-Test': '1' },
      body: '{}',
      response: { status: 200, data: 'ok' },
      requestSize: 50,
      responseSize: 100,
      latency: 123,
    };

    (cookies as unknown as Mock).mockResolvedValue({
      get: () => ({ value: 'session_cookie_value' }),
    });

    (adminAuth.verifySessionCookie as unknown as Mock).mockResolvedValue({ uid: mockUid });

    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });

    const res = await POST(req);

    expect(adminAuth.verifySessionCookie).toHaveBeenCalledWith('session_cookie_value', true);
    expect(mockAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: mockUid,
        method: requestData.method,
        url: requestData.url,
        headers: requestData.headers,
        body: requestData.body,
        responseStatus: 200,
        responseBody: 'ok',
        requestSize: 50,
        responseSize: 100,
        latency: 123,
        error: null,
      })
    );

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({ status: 'ok' });
  });
});
