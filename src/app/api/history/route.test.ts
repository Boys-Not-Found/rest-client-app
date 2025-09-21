import { GET, POST } from './route';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { Mock } from 'vitest';

vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}));

vi.mock('@/lib/firebase/admin', () => ({
  adminAuth: { verifySessionCookie: vi.fn() },
  adminDb: { collection: vi.fn() },
}));

describe('/api/requests', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('GET', () => {
    it('returns 401 if no cookie', async () => {
      (cookies as unknown as Mock).mockReturnValue({ get: () => undefined });

      const res = await GET();
      const data = await res.json();

      expect(res.status).toBe(401);
      expect(data.error).toBe('Not authenticated');
    });

    it('returns requests if cookie valid', async () => {
      (cookies as unknown as Mock).mockReturnValue({ get: () => ({ value: 'token' }) });
      (adminAuth.verifySessionCookie as Mock).mockResolvedValue({ uid: 'user1' });

      const mockDocs = [
        {
          id: 'req1',
          data: () => ({
            method: 'GET',
            url: 'https://api.test',
            requestTimestamp: new Date('2023-01-01T00:00:00.000Z'),
          }),
        },
      ];
      const mockGet = vi.fn().mockResolvedValue({ docs: mockDocs });
      const mockOrderBy = vi.fn(() => ({ limit: () => ({ get: mockGet }) }));
      const mockWhere = vi.fn(() => ({ orderBy: mockOrderBy }));
      (adminDb.collection as Mock).mockReturnValue({ where: mockWhere });

      const res = await GET();
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toHaveLength(1);
      expect(data[0]).toMatchObject({
        id: 'req1',
        method: 'GET',
        url: 'https://api.test',
      });
    });
  });

  describe('POST', () => {
    it('returns 401 if no cookie', async () => {
      (cookies as unknown as Mock).mockReturnValue({ get: () => undefined });

      const req = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify({ method: 'GET', url: 'https://api.test' }),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(401);
      expect(data.error).toBe('Not authenticated');
    });

    it('stores request if authenticated', async () => {
      (cookies as unknown as Mock).mockReturnValue({ get: () => ({ value: 'token' }) });
      (adminAuth.verifySessionCookie as Mock).mockResolvedValue({ uid: 'user1' });

      const mockAdd = vi.fn().mockResolvedValue({});
      const mockCollection = { add: mockAdd };
      (adminDb.collection as Mock).mockReturnValue(mockCollection);

      const req = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify({ method: 'POST', url: 'https://api.test', body: { foo: 'bar' } }),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(mockAdd).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          url: 'https://api.test',
          userId: 'user1',
        })
      );
    });

    it('returns 400 if missing method or url', async () => {
      (cookies as unknown as Mock).mockReturnValue({ get: () => ({ value: 'token' }) });
      (adminAuth.verifySessionCookie as Mock).mockResolvedValue({ uid: 'user1' });

      const req = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify({ method: '' }),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data.error).toBe('method and url required');
    });
  });
});
