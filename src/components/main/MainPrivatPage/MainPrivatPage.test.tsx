import { screen } from '@testing-library/react';
import MainPrivatPage from './MainPrivatPage';
import { renderWithIntl } from '@/test-utils/renderWithIntl';
import { useAuthMock } from '../../../../vitest-setup';

describe('MainPrivatPage', () => {
  it('renders user name and welcome message i if user is not null', () => {
    useAuthMock.mockReturnValue({ user: { displayName: 'Alice' } });
    renderWithIntl(<MainPrivatPage />);
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/Alice/i)).toBeInTheDocument();
  });

  it('renders default name and welcome message if user is null', () => {
    useAuthMock.mockReturnValue({ user: null });
    renderWithIntl(<MainPrivatPage />);
    expect(screen.getByText(/user/i)).toBeInTheDocument();
  });
});
