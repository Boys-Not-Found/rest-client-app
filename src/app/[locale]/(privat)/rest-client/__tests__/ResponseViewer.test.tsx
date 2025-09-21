type RespType = {
  status?: number;
  statusText?: string;
  data?: unknown;
  text?: string;
  error?: string;
} | null;

const state = vi.hoisted(() => ({
  mockResp: null as RespType,
}));

vi.mock('@/store/useRestStore', () => ({
  useRestStore: (selector: (s: { response: RespType }) => unknown) =>
    selector({ response: state.mockResp }),
}));

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ResponseViewer from '../[[...rest]]/components/ResponseViewer';

describe('ResponseViewer', () => {
  it('shows placeholder when there is no response', () => {
    state.mockResp = null;

    render(<ResponseViewer />);
    expect(screen.getByText('No response yet')).toBeInTheDocument();
  });

  it('renders status, statusText and JSON data when response exists', () => {
    state.mockResp = {
      status: 200,
      statusText: 'OK',
      data: { foo: 'bar' },
    };

    render(<ResponseViewer />);
    expect(screen.getByText(/Status: 200/)).toBeInTheDocument();
    expect(screen.getByText('OK')).toBeInTheDocument();
    expect(screen.getByText(/"foo": "bar"/)).toBeInTheDocument();
  });

  it('renders text when data is not provided', () => {
    state.mockResp = {
      status: 404,
      statusText: 'Not Found',
      text: 'Resource missing',
    };

    render(<ResponseViewer />);
    expect(screen.getByText(/Status: 404/)).toBeInTheDocument();
    expect(screen.getByText('Not Found')).toBeInTheDocument();
    expect(screen.getByText('Resource missing')).toBeInTheDocument();
  });
});
