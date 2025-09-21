import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import HistoryPage from '../page';

vi.mock('../_components/HistoryContent', () => ({
  __esModule: true,
  default: () => <div>HistoryContent</div>,
}));

global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => [],
});

vi.mock('next-intl/server', () => ({
  setRequestLocale: vi.fn(),
  getTranslations: vi.fn().mockResolvedValue((key: string) => key),
}));

vi.mock('next/headers', () => ({
  cookies: vi.fn().mockReturnValue({
    toString: () => 'cookie1=value1; cookie2=value2',
  }),
  headers: vi.fn().mockReturnValue({
    get: () => 'localhost:3000',
  }),
}));

describe('HistoryPage', () => {
  it('renders HistoryContent', async () => {
    const params = Promise.resolve({ locale: 'en' as const });

    const Page = await HistoryPage({ params });
    render(Page);

    const content = await screen.findByText('HistoryContent');
    expect(content).toBeInTheDocument();
  });
});
