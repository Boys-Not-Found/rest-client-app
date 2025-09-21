import { cookies } from 'next/headers';
import { vi, Mock } from 'vitest';
import { GET } from './route';

vi.mock('next/headers', () => ({ cookies: vi.fn() }));

describe('GET /api/me', () => {
  it('returns authenticated: false if no cookie', async () => {
    (cookies as unknown as Mock).mockResolvedValue({
      get: () => undefined,
    });

    const res = await GET();
    const data = await res.json();

    expect(data).toEqual({ authenticated: false });
  });

  it('returns authenticated: true if cookie exists', async () => {
    (cookies as unknown as Mock).mockResolvedValue({
      get: () => ({ name: 'session', value: 'abc123' }),
    });

    const res = await GET();
    const data = await res.json();

    expect(data).toEqual({ authenticated: true });
  });
});
