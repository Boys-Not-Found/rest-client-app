import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, beforeEach, beforeAll, vi, expect } from 'vitest';

const { setUserMock, mockUser, mockAuth } = vi.hoisted(() => {
  const mockUser = { uid: 'uid123', email: 'test@example.com' };
  return {
    setUserMock: vi.fn(),
    mockUser,
    mockAuth: { currentUser: mockUser },
  };
});

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key.split('.').pop() ?? '',
  useLocale: () => 'en',
}));

vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
}));

vi.mock('@/store/useUserStore', () => ({
  useUserStore: (selector: (state: { setUser: typeof setUserMock }) => unknown) =>
    selector({ setUser: setUserMock }),
}));

vi.mock('@/lib/firebase/client', () => ({
  auth: mockAuth,
}));

vi.mock('firebase/auth', () => {
  const createUserWithEmailAndPassword = vi.fn().mockResolvedValue({
    user: mockUser,
  });
  const updateProfile = vi.fn().mockResolvedValue(undefined);
  const sendEmailVerification = vi.fn().mockResolvedValue(undefined);

  return {
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    FirebaseError: class extends Error {},
  };
});

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import SignUpPage from '../sign-up/page';

describe('SignUpPage', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: { origin: 'http://localhost' },
      writable: true,
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates user, updates profile, and updates state', async () => {
    render(<SignUpPage />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'Aa!123456' } });
    fireEvent.change(screen.getByLabelText(/confirm-password/i), {
      target: { value: 'Aa!123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign-up/i }));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalled();
      expect(updateProfile).toHaveBeenCalled();
      expect(setUserMock).toHaveBeenCalledWith({
        uid: 'uid123',
        email: 'test@example.com',
        displayName: 'John',
      });
    });
  });
});
