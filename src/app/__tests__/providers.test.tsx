import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Providers } from '../providers';

import { useUserStore } from '@/store/useUserStore';

vi.mock('@/store/useUserStore', () => {
  const store = {
    user: null,
    setUser: vi.fn(),
  };
  return {
    useUserStore: (selector?: (s: typeof store) => unknown) => (selector ? selector(store) : store),
  };
});

const mockFetch = vi.fn();
global.fetch = mockFetch as unknown as typeof fetch;

describe('Providers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('renders loader while loading', () => {
    mockFetch.mockReturnValue(new Promise(() => {}));
    render(
      <Providers>
        <div>child</div>
      </Providers>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
  it('sets user and renders children on success', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ user: { uid: '123', email: 'test@example.com' } }),
    });

    render(
      <Providers>
        <div>child</div>
      </Providers>
    );

    await waitFor(() => expect(screen.getByText('child')).toBeInTheDocument());

    const store = useUserStore();
    expect(store.setUser).toHaveBeenCalledWith({
      uid: '123',
      email: 'test@example.com',
    });
  });

  it('sets user=null on error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(
      <Providers>
        <div>child</div>
      </Providers>
    );

    await waitFor(() => expect(screen.getByText('child')).toBeInTheDocument());

    const store = useUserStore();
    expect(store.setUser).toHaveBeenCalledWith(null);
  });
});
