import { screen } from '@testing-library/react';
import { useAuthMock } from '../../../../vitest-setup';
import { renderWithIntl } from '@/test-utils/renderWithIntl';
import MainPage from '../page';

describe('MainPage', () => {
  it('renders welcome message when user is authenticated', () => {
    useAuthMock.mockReturnValue({ user: { displayName: 'John' } });

    renderWithIntl(<MainPage />, 'en');

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('About the Project')).toBeInTheDocument();
  });

  it('renders generic welcome message when user is not authenticated', () => {
    useAuthMock.mockReturnValue({ user: null });

    renderWithIntl(<MainPage />, 'en');

    expect(screen.getByText('Welcome to REST Client App')).toBeInTheDocument();
    expect(screen.queryByText('Welcome,')).not.toBeInTheDocument();
    expect(screen.getByText('About the Project')).toBeInTheDocument();
  });
});
