import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import CustomCursor from '@/components/CustomCursor';

describe('CustomCursor Component', () => {
  it('renders cursor container when enabled on fine pointer', () => {
    window.matchMedia = vi.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { container } = render(<CustomCursor />);
    const cursor = container.querySelector('[aria-hidden="true"]');
    expect(cursor).toBeInTheDocument();
  });

  it('disables on touch devices (pointer: coarse)', () => {
    window.matchMedia = vi.fn((query: string) => ({
      matches: query === '(pointer: coarse)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { container } = render(<CustomCursor />);
    expect(container.firstChild).toBeNull();
  });
});
