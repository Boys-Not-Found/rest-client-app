import { vi, Mock } from 'vitest';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import { POST, GET } from './route';

vi.mock('next/headers', () => ({ cookies: vi.fn() }));
vi.mock('@/lib/firebase/admin', () => ({
  adminAuth: { createSessionCookie: vi.fn(), verifySessionCookie: vi.fn() },
}));

describe('Session API', () => {
  const mockCookieSet = vi.fn();
  const mockCookieGet = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (cookies as unknown as Mock).mockResolvedValue({
      get: mockCookieGet,
      set: mockCookieSet,
    });
  });

  describe('POST /api/session', () => {
    it('returns 400 if idToken is missing', async () => {
      const req = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify({}),
      });

      const res = await POST(req);
      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json).toEqual({ error: 'Missing token' });
    });

    it('creates session cookie and sets it', async () => {
      const idToken = 'token123';
      const sessionCookie = 'session_cookie_value';
      (adminAuth.createSessionCookie as unknown as Mock).mockResolvedValue(sessionCookie);

      const req = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify({ idToken }),
      });

      const res = await POST(req);

      expect(adminAuth.createSessionCookie).toHaveBeenCalledWith(
        idToken,
        expect.objectContaining({
          expiresIn: 5 * 24 * 60 * 60 * 1000,
        })
      );

      expect(mockCookieSet).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'session',
          value: sessionCookie,
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
        })
      );

      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json).toEqual({ status: 'success' });
    });
  });

  describe('GET /api/session', () => {
    it('returns null if no session cookie', async () => {
      mockCookieGet.mockReturnValue(undefined);

      const res = await GET();
      const json = await res.json();
      expect(json).toEqual({ user: null });
    });

    it('returns user if session cookie is valid', async () => {
      const sessionCookie = 'session_cookie_value';
      const mockUser = { uid: '123', email: 'test@example.com' };
      mockCookieGet.mockReturnValue({ value: sessionCookie });
      (adminAuth.verifySessionCookie as unknown as Mock).mockResolvedValue(mockUser);

      const res = await GET();
      const json = await res.json();
      expect(adminAuth.verifySessionCookie).toHaveBeenCalledWith(sessionCookie, true);
      expect(json).toEqual({ user: mockUser });
    });

    it('returns null if session cookie is invalid', async () => {
      const sessionCookie = 'bad_cookie';
      mockCookieGet.mockReturnValue({ value: sessionCookie });
      (adminAuth.verifySessionCookie as unknown as Mock).mockRejectedValue(new Error('Invalid'));

      const res = await GET();
      const json = await res.json();
      expect(json).toEqual({ user: null });
    });
  });
});
