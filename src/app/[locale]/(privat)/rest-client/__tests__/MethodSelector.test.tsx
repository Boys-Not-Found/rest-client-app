// ── Hoisted variables for Vitest mocks ─────────────────────────────────────────
const store = vi.hoisted(() => ({
  method: 'GET',
  setMethod: vi.fn<(value: string) => void>(),
}));

// ── Mocks ──────────────────────────────────────────────────────────────────────
vi.mock('@/store/useRestStore', () => ({
  useRestStore: (selector: (s: { method: string; setMethod: (v: string) => void }) => unknown) =>
    selector({ method: store.method, setMethod: store.setMethod }),
}));

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import MethodSelector from '../[[...rest]]/components/MethodSelector';

describe('MethodSelector', () => {
  beforeEach(() => {
    store.method = 'GET';
    store.setMethod.mockClear();
  });

  it('renders all HTTP methods and selects the current one', () => {
    render(<MethodSelector />);

    const options = screen.getAllByRole('option').map((o) => o.textContent);
    expect(options).toEqual(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']);

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('GET');
  });

  it('calls setMethod when a different method is selected', () => {
    render(<MethodSelector />);
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: 'POST' } });
    expect(store.setMethod).toHaveBeenCalledWith('POST');
  });
});
