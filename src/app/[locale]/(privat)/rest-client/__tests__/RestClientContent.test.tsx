import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RestClientContent from '../[[...rest]]/components/RestClientContent';

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
}));

const mockReplace = vi.fn();
vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

const mockSendRequest = vi.fn();
vi.mock('@/hooks/useRestClient', () => ({
  useRestClient: () => ({ sendRequest: mockSendRequest, loading: false }),
}));

type RestResponse = {
  status: number;
  statusText?: string;
  data?: unknown;
  text?: string;
  error?: string | null;
};

const mockState = {
  method: 'POST',
  url: 'https://api.example.com',
  headers: [{ id: '1', key: 'X-Test', value: '1' }],
  body: '{"foo":"bar"}',
  response: undefined as RestResponse | undefined,
  setMethod: vi.fn(),
  setUrl: vi.fn(),
  setBody: vi.fn(),
  setHeaders: vi.fn(),
  setResponse: vi.fn(),
  setInitial: vi.fn(),
  reset: vi.fn(),
};

vi.mock('@/store/useRestStore', () => {
  const useRestStore = (selector?: (s: typeof mockState) => unknown) =>
    selector ? selector(mockState) : mockState;

  useRestStore.getState = () => mockState;

  return { useRestStore };
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

describe('RestClientContent', () => {
  it('renders all UI elements', () => {
    render(<RestClientContent />);
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
    expect(screen.getByTestId('method-selector-mock')).toBeInTheDocument();
    expect(screen.getByText('EndpointInput')).toBeInTheDocument();
    expect(screen.getByText('HeadersEditor')).toBeInTheDocument();
    expect(screen.getByText('BodyEditor')).toBeInTheDocument();
    expect(screen.getByText('GeneratedCode')).toBeInTheDocument();
  });

  it('calls onSend and posts the request when response exists', async () => {
    mockState.response = {
      status: 200,
      statusText: 'OK',
      data: { ok: true },
      text: 'OK',
      error: null,
    };

    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
    } as unknown as Response);

    render(<RestClientContent />);

    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => {
      expect(mockSendRequest).toHaveBeenCalled();
      expect(mockReplace).toHaveBeenCalled();
      expect(fetchSpy).toHaveBeenCalledWith(
        '/api/requests',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });

    fetchSpy.mockRestore();
  });
});
