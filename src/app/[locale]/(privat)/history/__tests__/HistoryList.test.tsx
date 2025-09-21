import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HistoryList from '../_components/HistoryList';
import type { RequestRecord } from '@/types/types';
import type { PropsWithChildren } from 'react';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

// Mock Link
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
        requestTimestamp: '2025-09-21T12:00:00.000Z',
        userId: 'user1',
        requestData: {
          endpointUrl: 'https://api.example.com',
          requestDuration: 123,
          requestMethod: 'POST',
          requestTimestamp: 1695288000000,
          requestSize: 100,
          responseSize: 200,
          responseStatusCode: 200,
          responseStatusText: 'OK',
          errorDetails: null,
        },
      },
      {
        id: '2',
        requestTimestamp: '2025-09-21T13:00:00.000Z',
        userId: 'user2',
        requestData: {
          endpointUrl: 'https://api.example2.com',
          requestDuration: 50,
          requestMethod: 'GET',
          requestTimestamp: 1695288000000,
          requestSize: 50,
          responseSize: 0,
          responseStatusCode: 404,
          responseStatusText: 'Not Found',
          errorDetails: 'Not Found',
        },
      },
    ];

    render(<HistoryList requests={requests} />);

    // There should be two links
    expect(screen.getAllByRole('link')).toHaveLength(2);

    // Check first request
    expect(screen.getByText('POST')).toBeInTheDocument();
    expect(screen.getByText('https://api.example.com')).toBeInTheDocument();
    expect(screen.getByText('Status: 200 | Latency: 123 ms')).toBeInTheDocument();
    expect(screen.getByText('Request size: 100')).toBeInTheDocument();
    expect(screen.getByText('Response size: 200')).toBeInTheDocument();

    // Check second request
    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('https://api.example2.com')).toBeInTheDocument();
    expect(screen.getByText('Status: 404 | Latency: 50 ms')).toBeInTheDocument();
    expect(screen.getByText('Request size: 50')).toBeInTheDocument();
    expect(screen.getByText('Response size: 0')).toBeInTheDocument();
    expect(screen.getByText('Error: Not Found')).toBeInTheDocument();
  });
});
