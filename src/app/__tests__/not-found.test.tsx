import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import NotFoundPage from '../not-found';

vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('NotFoundPage', () => {
  it('renders title and button', () => {
    render(<NotFoundPage />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Page not found');
    expect(screen.getByRole('link', { name: /Go Home Page/i })).toHaveAttribute('href', '/');
  });
});
