import { render, screen } from '@testing-library/react';
import PrivatLayout from '../layout';

describe('PrivatLayout', () => {
  it('renders children inside main and section', () => {
    render(
      <PrivatLayout>
        <p>Private Content</p>
      </PrivatLayout>
    );

    expect(screen.getByText('Private Content')).toBeInTheDocument();

    expect(screen.getByRole('main')).toBeInTheDocument();

    const section = screen.getByText('Private Content').closest('section');
    expect(section).toBeInTheDocument();
  });
});
