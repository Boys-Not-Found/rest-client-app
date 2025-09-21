import { render, screen } from '@testing-library/react';
import AuthLayout from '../layout';

describe('AuthLayout', () => {
  it('renders children inside main and section', () => {
    render(
      <AuthLayout>
        <p>Test Content</p>
      </AuthLayout>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();

    expect(screen.getByRole('main')).toBeInTheDocument();
    const section = screen.getByText('Test Content').closest('section');
    expect(section).toBeInTheDocument();
  });
});
