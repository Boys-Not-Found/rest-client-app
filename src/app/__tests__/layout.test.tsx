import { render, screen } from '@testing-library/react';

import { ReactNode } from 'react';

const MockRootLayout = ({ children }: { children: ReactNode }) => (
  <div className="--mock-geist-sans --mock-geist-mono antialiased">
    <div data-testid="providers">{children}</div>
    <div data-testid="toaster" />
  </div>
);

it('renders children and providers/toaster', () => {
  render(
    <MockRootLayout>
      <p>Hello</p>
    </MockRootLayout>
  );

  expect(screen.getByText('Hello')).toBeInTheDocument();
  expect(screen.getByTestId('providers')).toBeInTheDocument();
  expect(screen.getByTestId('toaster')).toBeInTheDocument();
});
