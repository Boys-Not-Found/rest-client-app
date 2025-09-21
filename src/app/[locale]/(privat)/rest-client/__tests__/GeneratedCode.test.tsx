import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import GeneratedCode from '../[[...rest]]/components/GeneratedCode';

interface RestStoreMock {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string;
}

vi.mock('@/store/useRestStore', () => {
  const state: RestStoreMock = {
    method: 'GET',
    url: 'https://api.example.com',
    headers: { 'X-Test': '1' },
    body: '{"foo":"bar"}',
  };

  return {
    useRestStore: (selector: (s: RestStoreMock) => unknown): unknown => selector(state),
  };
});

const mockFetch = vi.fn();
global.fetch = mockFetch as unknown as typeof fetch;

function jsonResponse(data: unknown, ok = true): Response {
  return new Response(JSON.stringify(data), {
    status: ok ? 200 : 500,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('<GeneratedCode />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders target buttons', () => {
    render(<GeneratedCode />);
    expect(screen.getByText('JavaScript (Fetch)')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('shows generated snippet after successful fetch', async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({ snippet: 'console.log("ok")' }));

    render(<GeneratedCode />);

    await waitFor(() => {
      expect(screen.getByText(/console\.log/)).toBeInTheDocument();
    });
  });

  it('shows error if fetch returns non-JSON content type', async () => {
    const res = new Response('plain text', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
    mockFetch.mockResolvedValueOnce(res);

    render(<GeneratedCode />);

    await waitFor(() => {
      expect(screen.getByText(/Not JSON/)).toBeInTheDocument();
    });
  });

  it('shows error if response not ok and returns JSON error', async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({ error: 'Boom' }, false));

    render(<GeneratedCode />);

    await waitFor(() => {
      expect(screen.getByText(/Boom/)).toBeInTheDocument();
    });
  });

  it('switches tab and refetches code', async () => {
    mockFetch.mockResolvedValue(jsonResponse({ snippet: 'snippet' }));
    render(<GeneratedCode />);

    fireEvent.click(screen.getByText('Python'));
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });
});
