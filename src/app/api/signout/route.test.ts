import { POST } from './route';
import { cookies } from 'next/headers';
import { Mock } from 'vitest';

vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}));

describe('/api/signout', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('deletes session cookie and returns signed out', async () => {
    const deleteMock = vi.fn();
    (cookies as unknown as Mock).mockReturnValue({ delete: deleteMock });

    const res = await POST();
    const data = await res.json();

    expect(deleteMock).toHaveBeenCalledWith('session');
    expect(res.status).toBe(200);
    expect(data).toEqual({ status: 'signed out' });
  });
});
