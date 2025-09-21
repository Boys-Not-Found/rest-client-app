const store = vi.hoisted(() => ({
  url: 'https://initial.url',
  setUrl: vi.fn<(next: string) => void>(),
}));

vi.mock('@/store/useRestStore', () => ({
  useRestStore: (selector: (s: { url: string; setUrl: (v: string) => void }) => unknown) =>
    selector({ url: store.url, setUrl: store.setUrl }),
}));

vi.mock('@/lib/variables', () => ({
  applyVariables: (val: string) => `applied:${val}`,
}));

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import EndpointInput from '../[[...rest]]/components/EndpointInput';

describe('EndpointInput', () => {
  beforeEach(() => {
    store.url = 'https://initial.url';
    store.setUrl.mockClear();
  });

  it('renders the input with the initial url', () => {
    render(<EndpointInput />);
    const input = screen.getByPlaceholderText(
      'https://api.example.com/endpoint'
    ) as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.value).toBe('https://initial.url');
  });

  it('updates local state and calls setUrl with applied variables on change', () => {
    render(<EndpointInput />);
    const input = screen.getByPlaceholderText(
      'https://api.example.com/endpoint'
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'https://new.url' } });

    expect(input.value).toBe('https://new.url');

    expect(store.setUrl).toHaveBeenCalledWith('applied:https://new.url');
  });
});
