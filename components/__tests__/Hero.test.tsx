import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from '@/components/Hero';

// Mock GSAP. ScrollTrigger tidak tersedia di jsdom.
vi.mock('@/lib/gsap', () => ({
  gsap: { context: () => ({ revert: vi.fn() }), from: vi.fn(), to: vi.fn() },
  ScrollTrigger: {},
  registerGsap: vi.fn(),
  prefersReducedMotion: () => true,
}));

describe('Hero Component', () => {
  it('renders hero heading with value proposition', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders CTA link to official admissions portal', () => {
    render(<Hero />);
    const cta = screen.getByRole('link', { name: /daftar mahasiswa baru/i });
    expect(cta).toHaveAttribute('href', 'https://admissions.sibermu.ac.id/');
    expect(cta).toHaveAttribute('target', '_blank');
    expect(cta).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders internal anchor link to program studi section', () => {
    render(<Hero />);
    const anchor = screen.getByRole('link', { name: /lihat program studi/i });
    expect(anchor).toHaveAttribute('href', '#program');
  });

  it('contains visible placeholder text for photo asset', () => {
    render(<Hero />);
    expect(screen.getByText(/foto kuliah daring sibermu/i)).toBeInTheDocument();
  });
});
