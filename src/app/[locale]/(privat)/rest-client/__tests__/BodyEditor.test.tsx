const store = vi.hoisted(() => ({
  body: '{"foo":"bar"}',
  setBody: vi.fn<(next: string) => void>(),
}));

vi.mock('@/store/useRestStore', () => ({
  useRestStore: (selector: (s: { body: string; setBody: (v: string) => void }) => unknown) =>
    selector({ body: store.body, setBody: store.setBody }),
}));

vi.mock('@/lib/variables', () => ({
  applyVariables: (val: string) => `applied:${val}`,
}));

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import BodyEditor from '../[[...rest]]/components/BodyEditor';

describe('BodyEditor', () => {
  beforeEach(() => {
    store.body = '{"foo":"bar"}';
    store.setBody.mockClear();
  });

  it('renders the title and textarea with initial body', () => {
    render(<BodyEditor />);
    expect(screen.getByText('Body')).toBeInTheDocument();

    const textarea = screen.getByPlaceholderText(
      'Raw request body (JSON, text, etc.)'
    ) as HTMLTextAreaElement;

    expect(textarea).toBeInTheDocument();
    expect(textarea.value).toBe('{"foo":"bar"}');
  });

  it('updates local state and calls setBody with applied variables on change', () => {
    render(<BodyEditor />);
    const textarea = screen.getByPlaceholderText(
      'Raw request body (JSON, text, etc.)'
    ) as HTMLTextAreaElement;

    fireEvent.change(textarea, { target: { value: '{"baz":"qux"}' } });

    expect(textarea.value).toBe('{"baz":"qux"}');

    expect(store.setBody).toHaveBeenCalledWith('applied:{"baz":"qux"}');
  });
});
