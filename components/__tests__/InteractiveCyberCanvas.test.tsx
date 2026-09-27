import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import InteractiveCyberCanvas from '@/components/InteractiveCyberCanvas';

describe('InteractiveCyberCanvas Component', () => {
  it('renders canvas element with aria-hidden="true" for accessible decoration', () => {
    // Mock getContext untuk jsdom
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      setTransform: vi.fn(),
    });

    const { container } = render(<InteractiveCyberCanvas />);
    const canvas = container.querySelector('canvas');

    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute('aria-hidden', 'true');
  });
});
