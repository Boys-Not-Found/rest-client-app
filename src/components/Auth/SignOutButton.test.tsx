import { screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import SignOutButton from './SignOutButton';
import { replaceMock } from '../../../vitest-setup';
import { renderWithIntl } from '@/test-utils/renderWithIntl';

vi.mock('firebase/auth', () => ({
  signOut: vi.fn(() => Promise.resolve()),
  getAuth: vi.fn(() => ({})),
  GoogleAuthProvider: vi.fn(),
}));

const setUserMock = vi.fn();
vi.mock('@/store/useUserStore', () => ({
  useUserStore: (selector: (state: { setUser: typeof setUserMock }) => unknown) =>
    selector({ setUser: setUserMock }),
}));

vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ replace: replaceMock }),
}));

vi.mock('next-intl', async (importOriginal) => {
  const actual: typeof import('next-intl') = await importOriginal();
  return {
    ...actual,
    useTranslations: () => (key: string) => key,
    useLocale: () => 'en',
  };
});

describe('SignOutButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ ok: true }))
    );
  });

  it('signs out and redirects on click', async () => {
    const { signOut } = await import('firebase/auth');

    renderWithIntl(<SignOutButton />, 'en');

    const button = screen.getByRole('button', { name: /sign_out/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
      expect(setUserMock).toHaveBeenCalledWith(null);
      expect(replaceMock).toHaveBeenCalledWith('/', { locale: 'en' });
      expect(fetch).toHaveBeenCalledWith('/api/signout', {
        method: 'POST',
        credentials: 'include',
      });
    });
  });
});
