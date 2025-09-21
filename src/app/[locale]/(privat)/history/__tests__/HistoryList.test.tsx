import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HistoryList from '../_components/HistoryList';
import type { RequestRecord } from '@/types/types';
import type { PropsWithChildren } from 'react';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, ...props }: PropsWithChildren<{ href: string }>) => (
    <a {...props}>{children}</a>
  ),
}));

describe('HistoryList', () => {
  it('shows no requests message and link when requests is empty', () => {
    render(<HistoryList requests={[]} />);
    expect(screen.getByText('no-requests')).toBeInTheDocument();
    expect(screen.getByText('rest')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/rest-client');
  });

  it('renders a list of requests when provided', () => {
    const requests: RequestRecord[] = [
      {
        id: '1',
        method: 'POST',
        url: 'https://api.example.com',
        body: '{"foo":"bar"}',
        headers: { 'X-Test': '1' },
        statusCode: 200,
        latency: 123,
        requestSize: 100,
        responseSize: 200,
        requestTimestamp: '2025-09-21T12:00:00.000Z',
        errorDetails: null,
      },
      {
        id: '2',
        method: 'GET',
        url: 'https://api.example2.com',
        body: '',
        headers: {},
        statusCode: 404,
        latency: 50,
        requestSize: 50,
        responseSize: 0,
        requestTimestamp: '2025-09-21T13:00:00.000Z',
        errorDetails: 'Not Found',
      },
    ];

    render(<HistoryList requests={requests} />);

    expect(screen.getAllByRole('link')).toHaveLength(2);

    expect(screen.getByText('POST')).toBeInTheDocument();
    expect(screen.getByText('https://api.example.com')).toBeInTheDocument();
    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('https://api.example2.com')).toBeInTheDocument();

    expect(screen.getByText('Error: Not Found')).toBeInTheDocument();

    expect(screen.getByText('Status: 200 | Latency: 123 ms')).toBeInTheDocument();
    expect(screen.getByText('Status: 404 | Latency: 50 ms')).toBeInTheDocument();

    expect(screen.getByText('Request size: 100 bytes')).toBeInTheDocument();
    expect(screen.getByText('Response size: 200 bytes')).toBeInTheDocument();
  });
});
