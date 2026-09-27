import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import WhyUs from '@/components/WhyUs';

vi.mock('@/lib/gsap', () => ({
  gsap: {
    context: () => ({ revert: vi.fn() }),
    matchMedia: () => ({ add: vi.fn(), revert: vi.fn() }),
    from: vi.fn(),
    to: vi.fn(),
    utils: { toArray: () => [] },
  },
  ScrollTrigger: {},
  registerGsap: vi.fn(),
  prefersReducedMotion: () => true,
}));

describe('WhyUs Component', () => {
  it('renders the four pillars without fabricating claims', () => {
    render(<WhyUs />);

    expect(screen.getByText(/ritme hidup/i)).toBeInTheDocument();
    expect(screen.getByText(/nilai islam/i)).toBeInTheDocument();
    expect(screen.getByText(/dunia kerja/i)).toBeInTheDocument();
    expect(screen.getByText(/biaya kuliah/i)).toBeInTheDocument();
  });

  it('has the correct section id for navbar anchor', () => {
    const { container } = render(<WhyUs />);
    const section = container.querySelector('#keunggulan');
    expect(section).not.toBeNull();
  });
});
