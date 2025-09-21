import { describe, it, expect, beforeEach } from 'vitest';
import { useRestStore } from '../useRestStore';

describe('useRestStore', () => {
  beforeEach(() => {
    useRestStore.getState().reset();
  });

  it('should have default values', () => {
    const state = useRestStore.getState();
    expect(state.method).toBe('GET');
    expect(state.url).toBe('');
    expect(state.headers).toEqual([]);
    expect(state.body).toBe('');
    expect(state.response).toBeUndefined();
  });

  it('should update method', () => {
    useRestStore.getState().setMethod('POST');
    expect(useRestStore.getState().method).toBe('POST');
  });

  it('should update url', () => {
    useRestStore.getState().setUrl('/api/test');
    expect(useRestStore.getState().url).toBe('/api/test');
  });

  it('should update headers', () => {
    const headers = [{ id: '1', key: 'Content-Type', value: 'application/json' }];
    useRestStore.getState().setHeaders(headers);
    expect(useRestStore.getState().headers).toEqual(headers);
  });

  it('should update body', () => {
    useRestStore.getState().setBody('{"foo": "bar"}');
    expect(useRestStore.getState().body).toBe('{"foo": "bar"}');
  });

  it('should update response', () => {
    const response = { status: 200, data: { message: 'ok' } };
    useRestStore.getState().setResponse(response);
    expect(useRestStore.getState().response).toEqual(response);
  });

  it('should set initial values', () => {
    useRestStore.getState().setInitial({
      method: 'PUT',
      endpointUrl: '/api/init',
      requestBody: '{"init": true}',
    });

    const state = useRestStore.getState();
    expect(state.method).toBe('PUT');
    expect(state.url).toBe('/api/init');
    expect(state.body).toBe('{"init": true}');
  });

  it('should reset to default values', () => {
    useRestStore.getState().setMethod('POST');
    useRestStore.getState().reset();

    const state = useRestStore.getState();
    expect(state.method).toBe('GET');
    expect(state.url).toBe('');
    expect(state.headers).toEqual([]);
    expect(state.body).toBe('');
    expect(state.response).toBeUndefined();
  });
});
