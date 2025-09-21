import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import VerifiedPage from '../verified/page';
import * as userStore from '@/store/useUserStore';
import { onAuthStateChanged as mockOnAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';

type MockUser = {
  uid: string;
  email: string;
  displayName?: string | null;
  emailVerified: boolean;
  reload: () => Promise<void>;
  getIdToken: (force?: boolean) => Promise<string>;
};

vi.mock('firebase/auth', () => {
  return {
    getAuth: () => ({}),
    onAuthStateChanged: vi.fn(),
    GoogleAuthProvider: vi.fn(),
  };
});

vi.mock('@/store/useUserStore');
vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
}));

global.fetch = vi.fn().mockResolvedValue({ ok: true });

describe('VerifiedPage', () => {
  it('shows success message when email is verified', async () => {
    const setUser = vi.fn();
    (userStore.useUserStore as unknown as jest.Mock).mockReturnValue(setUser);

    (mockOnAuthStateChanged as unknown as jest.Mock).mockImplementation(
      (_: typeof auth, callback: (user: MockUser | null) => void) => {
        callback({
          uid: '1',
          email: 'test@example.com',
          emailVerified: true,
          displayName: 'Test User',
          reload: async () => {},
          getIdToken: async () => 'token123',
        });
        return () => {};
      }
    );

    render(<VerifiedPage />);
    const successMessage = await screen.findByText(/Your email is verified/i);
    expect(successMessage).toBeInTheDocument();
  });

  it('shows fail message when no user', async () => {
    (mockOnAuthStateChanged as unknown as jest.Mock).mockImplementation(
      (_: typeof auth, callback: (user: MockUser | null) => void) => {
        callback(null);
        return () => {};
      }
    );

    render(<VerifiedPage />);
    const failMessage = await screen.findByText(/Verification failed/i);
    expect(failMessage).toBeInTheDocument();
  });
});
