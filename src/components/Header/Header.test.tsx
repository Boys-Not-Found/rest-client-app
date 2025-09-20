import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Header from './Header';
import { replaceMock } from '../../../vitest-setup';

const { useAuthMock, useLocaleMock } = vi.hoisted(() => {
  return {
    useAuthMock: vi.fn(),
    useLocaleMock: vi.fn(),
  };
});

vi.mock('use-intl', () => ({
  useLocale: useLocaleMock,
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/context/useAuth', () => ({
  useAuth: useAuthMock,
}));

vi.mock('../NavBar/NavBar', () => ({
  default: () => <nav data-testid="navbar">NavBar</nav>,
}));

vi.mock('@/components/Auth/SignOutButton', () => ({
  default: () => <button data-testid="signout">SignOut</button>,
}));

describe('Header', () => {
  it('shows sign-in/up when no user', () => {
    useAuthMock.mockReturnValue({ user: null });
    useLocaleMock.mockReturnValue('en');

    render(<Header />);

    expect(screen.getByRole('link', { name: /sign-in/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign-up/i })).toBeInTheDocument();
  });

  it('shows NavBar and SignOut when user exists', () => {
    useAuthMock.mockReturnValue({ user: { uid: 1, email: 'email', displayName: 'name' } });
    useLocaleMock.mockReturnValue('en');

    render(<Header />);

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('signout')).toBeInTheDocument();
  });

  it('toggles locale on button click', async () => {
    useAuthMock.mockReturnValue({ user: null });
    useLocaleMock.mockReturnValue('en');

    render(<Header />);

    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'RU' });
    await user.click(button);

    expect(replaceMock).toHaveBeenCalledWith('/', { locale: 'ru' });
  });
});
