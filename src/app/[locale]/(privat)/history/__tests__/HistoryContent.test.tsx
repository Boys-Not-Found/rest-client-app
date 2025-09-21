import { RequestRecord } from '@/types/types';
import HistoryContent from '../_components/HistoryContent';
import { setRequestLocale } from 'next-intl/server';
import { vi } from 'vitest';

vi.mock('next-intl/server', () => ({
  setRequestLocale: vi.fn(),
}));

describe('HistoryContent', () => {
  it('calls setRequestLocale and renders HistoryList', async () => {
    const requests: RequestRecord[] = [
      {
        id: '1',
        method: 'GET',
        url: '/test',
        statusCode: 200,
        latency: 123,
        requestSize: 456,
        responseSize: 789,
        errorDetails: null,
        requestTimestamp: new Date().toISOString(),
        body: '',
        headers: { 'Content-Type': 'application/json' },
      },
      {
        id: '2',
        method: 'POST',
        url: '/submit',
        statusCode: null,
        latency: null,
        requestSize: null,
        responseSize: null,
        errorDetails: 'Network error',
        requestTimestamp: new Date().toISOString(),
        body: '{"key":"value"}',
        headers: { 'Content-Type': 'application/json' },
      },
    ];
    const params = { locale: 'en' as const };

    const element = await HistoryContent({ requests, params });

    expect(setRequestLocale).toHaveBeenCalledWith('en');
    expect(element.type.name).toBe('HistoryList');
  });
});
