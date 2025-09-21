import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import RestClientPage from '../page';
import * as userStore from '@/store/useUserStore';
import { renderWithIntl } from '@/test-utils/renderWithIntl';

vi.mock('../components/RestClientContent', () => ({
  __esModule: true,
  default: () => <div>RestClientContent</div>,
}));

describe('RestClientPage', () => {
  it('renders RestClientContent when user exists', async () => {
    vi.spyOn(userStore, 'useUserStore').mockImplementation(() => ({ user: { uid: '1' } }));
    renderWithIntl(<RestClientPage />, 'en');

    const content = await screen.findByText('RestClientContent');
    expect(content).toBeInTheDocument();
  });
});
