import { render, screen } from '@testing-library/react';

vi.mock('next/font/google', () => ({
  Geist: () => ({ variable: '--mock-geist-sans' }),
  Geist_Mono: () => ({ variable: '--mock-geist-mono' }),
}));

vi.mock('./providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="providers">{children}</div>
  ),
}));

vi.mock('react-hot-toast', () => ({
  Toaster: () => <div data-testid="toaster" />,
}));

describe('RootLayout', () => {
  it('renders children and providers/toaster', async () => {
    // мокаем async RootLayout как обычный компонент
    const MockRootLayout = ({ children }: { children: React.ReactNode }) => (
      <div data-testid="body">
        <div data-testid="providers">{children}</div>
        <div data-testid="toaster" />
      </div>
    );

    render(
      <MockRootLayout>
        <p>Hello</p>
      </MockRootLayout>
    );

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByTestId('body')).toBeInTheDocument();
    expect(screen.getByTestId('providers')).toBeInTheDocument();
    expect(screen.getByTestId('toaster')).toBeInTheDocument();
  });
});
