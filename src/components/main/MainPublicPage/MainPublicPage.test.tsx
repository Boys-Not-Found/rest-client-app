import { screen } from '@testing-library/react';
import MainPublicPage from './MainPublicPage';
import { renderWithIntl } from '@/test-utils/renderWithIntl';

describe('MainPrivatPage', () => {
  it('renders welcome message', () => {
    renderWithIntl(<MainPublicPage />);
    expect(screen.getByText(/Welcome to REST Client App/i)).toBeInTheDocument();
  });
});
