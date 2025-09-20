import { Mock, vi } from 'vitest';
import LocaleLayout from '../layout';
import { ClientWrapper } from '@/test-utils/СlientWrapper';
import { render, screen } from '@testing-library/react';

vi.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  hasLocale: vi.fn(() => true),
}));
vi.mock('next-intl/server', () => ({
  setRequestLocale: vi.fn(),
}));
vi.mock('@/components/Header/Header', () => ({
  default: () => <header data-testid="header">Header</header>,
}));
vi.mock('@/components/Footer/Footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));
vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

describe('LocaleLayout', () => {
  it('renders children, Header, and Footer when locale is valid', async () => {
    render(
      <ClientWrapper>
        <div data-testid="children">Page Content</div>
      </ClientWrapper>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('children')).toBeInTheDocument();
  });

  it('calls notFound if locale is invalid', async () => {
    const { hasLocale } = await import('next-intl');
    const { notFound } = await import('next/navigation');
    (hasLocale as unknown as Mock).mockReturnValue(false);

    const params = Promise.resolve({ locale: 'xx' });

    await LocaleLayout({ children: <div />, params });

    expect(notFound).toHaveBeenCalled();
  });
});
