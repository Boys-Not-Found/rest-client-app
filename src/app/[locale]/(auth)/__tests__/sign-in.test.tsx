import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import type { ReactNode, AnchorHTMLAttributes } from 'react';
import SignInPage from '../sign-in/page';

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode };

vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
  Link: ({ children, ...rest }: LinkProps) => <a {...rest}>{children}</a>,
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn().mockResolvedValue({
    user: { uid: '123', email: 'test@example.com', emailVerified: true },
  }),
  reload: vi.fn(),
  getIdToken: vi.fn().mockResolvedValue('fake-id-token'),
  sendPasswordResetEmail: vi.fn(),
  signInWithPopup: vi.fn(),
  getAuth: vi.fn(),
  GoogleAuthProvider: vi.fn(),
}));

describe('SignInPage', () => {
  it('calls signInWithEmailAndPassword with entered values', async () => {
    render(<SignInPage />);

    await userEvent.type(screen.getByPlaceholderText('email'), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText('password'), 'secretpassword');
    await userEvent.click(screen.getByRole('button', { name: 'sign-in' }));

    const { signInWithEmailAndPassword } = await import('firebase/auth');
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      undefined,
      'test@example.com',
      'secretpassword'
    );
  });

  it('renders email & password inputs', () => {
    render(<SignInPage />);
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    render(<SignInPage />);
    await userEvent.click(screen.getByRole('button', { name: 'sign-in' }));
    expect(await screen.findByText('Enter a valid email')).toBeInTheDocument();
    expect(await screen.findByText('Password must be at least 8 characters')).toBeInTheDocument();
  });
});
