import { screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import SignOutButton from './SignOutButton';
import { replaceMock } from '../../../vitest-setup';
import { renderWithIntl } from '@/test-utils/renderWithIntl';

vi.mock('firebase/auth', () => {
  return {
    signOut: vi.fn(() => Promise.resolve()),
    getAuth: vi.fn(() => ({})),
    GoogleAuthProvider: vi.fn(),
  };
});
const setUserMock = vi.fn();
vi.mock('@/store/useUserStore', () => ({
  useUserStore: (selector: (state: { setUser: typeof setUserMock }) => unknown) =>
    selector({ setUser: setUserMock }),
}));

describe('SignOutButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('signs out and redirects on click', async () => {
    const { signOut } = await import('firebase/auth');

    renderWithIntl(<SignOutButton />, 'en');

    const button = screen.getByRole('button', { name: /sign out/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
      expect(setUserMock).toHaveBeenCalledWith(null);
      expect(replaceMock).toHaveBeenCalledWith('/', { locale: 'en' });
    });
  });
});
