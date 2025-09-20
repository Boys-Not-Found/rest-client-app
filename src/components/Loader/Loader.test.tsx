import { render, screen, cleanup } from '@testing-library/react';
import Loader from './Loader';
import { describe, expect, it, afterAll } from 'vitest';
import '@testing-library/jest-dom';

describe('Loader', () => {
  afterAll(() => {
    cleanup();
  });

  it('should renders loading spinner,', () => {
    render(<Loader />);
    const spinner = screen.getByTestId('loader');
    expect(spinner).toBeInTheDocument();
  });
});
