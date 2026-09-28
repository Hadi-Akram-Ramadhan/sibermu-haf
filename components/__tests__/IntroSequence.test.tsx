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

  it('renders statement segments and academic telemetry', () => {
    vi.mocked(prefersReducedMotion).mockReturnValue(false);
    render(<IntroSequence onComplete={vi.fn()} />);

    expect(screen.getByText(/Kuliah di mana saja/i)).toBeInTheDocument();
    expect(screen.getByText(/ijazah yang nyata/i)).toBeInTheDocument();
    expect(screen.getByText('SK 430/E/O/2021')).toBeInTheDocument();
    expect(screen.getByText('BAN-PT (BAIK)')).toBeInTheDocument();
  });

  it('renders portal action button and scroll prompt, and responds to click', () => {
    const onCompleteMock = vi.fn();
    vi.mocked(prefersReducedMotion).mockReturnValue(false);
    render(<IntroSequence onComplete={onCompleteMock} />);

    const portalBtn = screen.getByRole('button', { name: /masuk ke portal/i });
    expect(portalBtn).toBeInTheDocument();
    expect(
      screen.getByText(/atau gulir layar untuk melanjutkan/i)
    ).toBeInTheDocument();
  });

  it('immediately triggers onComplete when prefers-reduced-motion is active', () => {
    const onCompleteMock = vi.fn();
    vi.mocked(prefersReducedMotion).mockReturnValue(true);

    render(<IntroSequence onComplete={onCompleteMock} />);
    expect(onCompleteMock).toHaveBeenCalledTimes(1);
  });
});
