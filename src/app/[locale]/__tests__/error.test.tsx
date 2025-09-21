import { screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ErrorPage from '../error';
import { renderWithIntl } from '@/test-utils/renderWithIntl';
import toast from 'react-hot-toast';

vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    error: vi.fn(),
  },
  error: vi.fn(),
}));

describe('ErrorPage', () => {
  it('renders default error message and button', () => {
    const reset = vi.fn();
    const error = new Error('Something went wrong');

    renderWithIntl(<ErrorPage error={error} reset={reset} />, 'en');

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Something went wrong');
    expect(screen.getByRole('button', { name: /Try again/i })).toBeInTheDocument();
  });

  it('calls reset when button is clicked', () => {
    const reset = vi.fn();
    const error = new Error('Boom!');

    renderWithIntl(<ErrorPage error={error} reset={reset} />, 'en');

    fireEvent.click(screen.getByRole('button'));
    expect(reset).toHaveBeenCalled();
  });

  it('shows toast when error changes', () => {
    const reset = vi.fn();
    const error = new Error('Toast me');
    renderWithIntl(<ErrorPage error={error} reset={reset} />, 'en');

    expect(toast.error).toHaveBeenCalled();
  });
});
