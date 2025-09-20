import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import VariablesPage from '../page';
import * as userStore from '@/store/useUserStore';
import { renderWithIntl } from '@/test-utils/renderWithIntl';

const mockUser = { uid: '1', email: 'email', displayName: 'John' };

describe('VariablesPage', () => {
  it('renders VariablesContent when user exists', async () => {
    vi.spyOn(userStore, 'useUserStore').mockImplementation(() => ({ user: mockUser }));
    renderWithIntl(<VariablesPage />, 'en');

    const content = await screen.findByText('Variables');
    expect(content).toBeInTheDocument();
  });

  it('renders nothing when user is null', async () => {
    vi.spyOn(userStore, 'useUserStore').mockImplementation(() => ({ user: null }));

    renderWithIntl(<VariablesPage />, 'en');

    expect(screen.queryByText('Variables')).toBeInTheDocument();
  });
});
