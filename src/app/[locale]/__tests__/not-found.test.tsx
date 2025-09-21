import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import NotFoundPage from '../not-found';
import { renderWithIntl } from '@/test-utils/renderWithIntl';

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('NotFoundPage', () => {
  it('renders title, description and button', () => {
    renderWithIntl(<NotFoundPage />, 'en');

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Page not found');
    expect(screen.getByText(/Could not find requested resource/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Return Home/i })).toHaveAttribute('href', '/');
  });
});
