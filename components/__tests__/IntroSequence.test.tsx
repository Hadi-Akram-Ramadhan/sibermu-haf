import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import IntroSequence from '@/components/IntroSequence';

vi.mock('@/lib/gsap', () => ({
  gsap: {
    context: vi.fn((cb) => {
      cb();
      return { revert: vi.fn() };
    }),
    timeline: vi.fn(() => ({
      fromTo: vi.fn().mockReturnThis(),
      to: vi.fn().mockReturnThis(),
    })),
    to: vi.fn(),
  },
  ScrollTrigger: {
    create: vi.fn(),
  },
  registerGsap: vi.fn(),
  prefersReducedMotion: vi.fn(),
}));

import { prefersReducedMotion } from '@/lib/gsap';

describe('IntroSequence Component (Zero.university inspired)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders status loading accessibility text and aria-label', () => {
    vi.mocked(prefersReducedMotion).mockReturnValue(false);
    render(<IntroSequence onComplete={vi.fn()} />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(
      screen.getByLabelText(/membuka portal universitas siber muhammadiyah/i)
    ).toBeInTheDocument();
  });

  it('renders statement segments with Fraunces typography', () => {
    vi.mocked(prefersReducedMotion).mockReturnValue(false);
    render(<IntroSequence onComplete={vi.fn()} />);

    expect(screen.getByText('Kuliah')).toBeInTheDocument();
    expect(screen.getByText('di mana saja.')).toBeInTheDocument();
    expect(screen.getByText('Ijazah')).toBeInTheDocument();
    expect(screen.getByText('yang nyata.')).toBeInTheDocument();
  });

  it('renders scroll-to-reveal prompt', () => {
    vi.mocked(prefersReducedMotion).mockReturnValue(false);
    render(<IntroSequence onComplete={vi.fn()} />);

    expect(screen.getByText(/gulir untuk membuka/i)).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('immediately triggers onComplete when prefers-reduced-motion is active', () => {
    const onCompleteMock = vi.fn();
    vi.mocked(prefersReducedMotion).mockReturnValue(true);

    render(<IntroSequence onComplete={onCompleteMock} />);
    expect(onCompleteMock).toHaveBeenCalledTimes(1);
  });
});
