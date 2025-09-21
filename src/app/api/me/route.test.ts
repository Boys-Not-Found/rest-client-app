import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import { vi, Mock } from 'vitest';
import { GET } from './route';

vi.mock('next/headers', () => ({ cookies: vi.fn() }));
vi.mock('@/lib/firebase/admin', () => ({
  adminAuth: { verifySessionCookie: vi.fn() },
}));

describe('GET /api/me', () => {
  it('returns null if no cookie', async () => {
    (cookies as unknown as Mock).mockResolvedValue({
      get: () => undefined,
    });

    const res = await GET();
    const data = await res.json();
    expect(data.user).toBeNull();
  });

  it('returns user if cookie is valid', async () => {
    const mockUser = {
      uid: '123',
      aud: 'test-aud',
      auth_time: Date.now() / 1000,
      exp: Date.now() / 1000 + 3600,
      firebase: {},
      iss: 'test-issuer',
      sub: 'test-sub',
      iat: Date.now() / 1000,
    };

    (cookies as unknown as Mock).mockResolvedValue({
      get: () => ({ value: 'token' }),
    });

    (adminAuth.verifySessionCookie as unknown as Mock).mockResolvedValue(mockUser);

    const res = await GET();
    const data = await res.json();
    expect(data.user).toEqual(mockUser);
  });
});
