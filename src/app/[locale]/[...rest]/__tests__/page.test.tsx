import { vi } from 'vitest';
import { notFound } from 'next/navigation';
import CatchAllPage from '../page';

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

it('calls notFound', () => {
  CatchAllPage();
  expect(notFound).toHaveBeenCalled();
});
