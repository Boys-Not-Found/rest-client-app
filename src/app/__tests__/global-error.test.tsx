import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GlobalError from '../global-error';

it('renders error message and button, calls reset on click', async () => {
  const user = userEvent.setup();
  const error = new Error('Test error');
  const resetMock = vi.fn();

  render(<GlobalError error={error} reset={resetMock} />);

  expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
  expect(screen.getByText(`Error message: ${error.message}`)).toBeInTheDocument();

  const button = screen.getByRole('button', { name: /try again/i });
  expect(button).toBeInTheDocument();

  await user.click(button);
  expect(resetMock).toHaveBeenCalledTimes(1);
});
