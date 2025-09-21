import { render, screen } from '@testing-library/react';
import Loading from '../loading';

describe('Loading component', () => {
  it('renders Loader', () => {
    render(<Loading />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});
