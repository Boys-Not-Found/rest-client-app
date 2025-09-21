import '@testing-library/jest-dom';
import { vi } from 'vitest';

export const replaceMock = vi.fn();
export const useAuthMock = vi.fn();
export const useTranslationsMock = vi.fn();

vi.mock('@/context/useAuth', () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock('@/i18n/navigation', () => {
  return {
    useRouter: () => ({ replace: replaceMock }),
    usePathname: () => '/',
    redirect: vi.fn(),

    Link: ({ children, href }: { children: React.ReactNode; href?: string }) => (
      <a href={href ?? '#'}>{children}</a>
    ),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});
