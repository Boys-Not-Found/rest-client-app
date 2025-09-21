const store = vi.hoisted(() => ({
  headers: [{ id: 'h1', key: 'Content-Type', value: 'application/json' }],
  setHeaders: vi.fn<(next: { id: string; key: string; value: string }[]) => void>(),
}));

vi.mock('@/store/useRestStore', () => ({
  useRestStore: (
    selector: (s: {
      headers: { id: string; key: string; value: string }[];
      setHeaders: (v: { id: string; key: string; value: string }[]) => void;
    }) => unknown
  ) => selector({ headers: store.headers, setHeaders: store.setHeaders }),
}));

vi.mock('@/lib/variables', () => ({
  applyVariables: (val: string) => val,
}));

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import HeadersEditor from '../[[...rest]]/components/HeadersEditor';

describe('HeadersEditor', () => {
  beforeEach(() => {
    store.headers = [{ id: 'h1', key: 'Content-Type', value: 'application/json' }];
    store.setHeaders.mockClear();
  });

  it('renders the title and the existing header row', () => {
    render(<HeadersEditor />);
    expect(screen.getByText('Headers')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Content-Type')).toBeInTheDocument();
    expect(screen.getByDisplayValue('application/json')).toBeInTheDocument();
  });

  it('calls setHeaders when "+ Add" is clicked', () => {
    render(<HeadersEditor />);
    fireEvent.click(screen.getByRole('button', { name: /\+ Add/i }));
    expect(store.setHeaders).toHaveBeenCalledTimes(1);
    const nextArg = store.setHeaders.mock.calls[0][0];
    expect(nextArg.length).toBe(2);
    expect(nextArg[1].key).toBe('');
    expect(nextArg[1].value).toBe('');
  });

  it('updateHeader calls setHeaders with updated key/value', () => {
    render(<HeadersEditor />);
    const keyInput = screen.getByDisplayValue('Content-Type');
    fireEvent.change(keyInput, { target: { value: 'Accept' } });

    const valInput = screen.getByDisplayValue('application/json');
    fireEvent.change(valInput, { target: { value: 'text/plain' } });

    expect(store.setHeaders).toHaveBeenCalled();
    const lastArg = store.setHeaders.mock.calls.at(-1)?.[0];
    expect(lastArg?.[0]).toMatchObject({
      key: 'Accept',
      value: 'text/plain',
    });
  });

  it('removeHeader calls setHeaders without the removed header', () => {
    render(<HeadersEditor />);
    const removeBtn = screen.getByTestId('remove-header');
    fireEvent.click(removeBtn);
    expect(store.setHeaders).toHaveBeenCalledTimes(1);
    const nextArg = store.setHeaders.mock.calls[0][0];
    expect(nextArg).toHaveLength(0);
  });
});
