import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders all authors with correct links', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: '@elena-v-volkova' })).toHaveAttribute(
      'href',
      'https://github.com/elena-v-volkova'
    );

    expect(screen.getByRole('link', { name: '@madii09' })).toHaveAttribute(
      'href',
      'https://github.com/madii09'
    );

    expect(screen.getByRole('link', { name: '@dzichonka' })).toHaveAttribute(
      'href',
      'https://github.com/dzichonka'
    );
  });

  it('renders RS School link with logo', () => {
    render(<Footer />);
    const rssLink = screen.getByRole('link', { name: /course logo/i });
    expect(rssLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');

    const logo = screen.getByRole('img', { name: /course logo/i });
    expect(logo).toBeInTheDocument();
  });

  it('renders current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
