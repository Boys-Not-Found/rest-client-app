import { screen } from '@testing-library/react';
import NavBar from './NavBar';
import { renderWithIntl } from '@/test-utils/renderWithIntl';

describe('NavBar', () => {
  it('renders all navigation links', () => {
    renderWithIntl(<NavBar />);

    expect(screen.getByRole('link', { name: /History/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Variables/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Rest Client/i })).toBeInTheDocument();
  });

  it('links have correct hrefs', () => {
    renderWithIntl(<NavBar />);

    expect(screen.getByRole('link', { name: /History/i })).toHaveAttribute('href', '/history');
    expect(screen.getByRole('link', { name: /Variables/i })).toHaveAttribute('href', '/variables');
    expect(screen.getByRole('link', { name: /Rest Client/i })).toHaveAttribute(
      'href',
      '/rest-client'
    );
  });
});
