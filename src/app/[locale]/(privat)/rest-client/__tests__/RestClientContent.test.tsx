import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
}));

vi.mock('@/hooks/useRestClient', () => ({
  useRestClient: () => ({ sendRequest: vi.fn(), loading: false }),
}));

vi.mock('@/store/useRestStore', () => {
  const mockState = {
    method: 'GET',
    url: '',
    headers: [],
    body: '',
    response: null,
    setMethod: vi.fn(),
    setUrl: vi.fn(),
    setBody: vi.fn(),
    setHeaders: vi.fn(),
  };
  return {
    useRestStore: (selector?: (s: typeof mockState) => unknown) =>
      selector ? selector(mockState) : mockState,
    useRestStore_getState: () => mockState,
  };
});

vi.mock('../[[...rest]]/components/BodyEditor', () => ({ default: () => <div>BodyEditor</div> }));
vi.mock('../[[...rest]]/components/EndpointInput', () => ({
  default: () => <div>EndpointInput</div>,
}));
vi.mock('../[[...rest]]/components/GeneratedCode', () => ({
  default: () => <div>GeneratedCode</div>,
}));
vi.mock('../[[...rest]]/components/HeadersEditor', () => ({
  default: () => <div>HeadersEditor</div>,
}));
vi.mock('../[[...rest]]/components/MethodSelector', () => ({
  default: () => <div data-testid="method-selector-mock" />,
}));

import RestClientContent from '../[[...rest]]/components/RestClientContent';

describe('RestClientContent', () => {
  it('renders and shows the Send button', () => {
    render(<RestClientContent />);

    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();

    expect(screen.getByTestId('method-selector-mock')).toBeInTheDocument();
    expect(screen.getByText('EndpointInput')).toBeInTheDocument();
  });
});
