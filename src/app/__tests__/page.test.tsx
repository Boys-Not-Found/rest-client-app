import { vi } from 'vitest';
import RootPage from '../page';
import * as navigation from '@/i18n/navigation';

vi.mock('@/i18n/navigation', () => ({
  redirect: vi.fn(),
}));

it('RootPage should redirect from / to locale=en', async () => {
  await RootPage();
  expect(navigation.redirect).toHaveBeenCalledWith({ href: '/', locale: 'en' });
});
