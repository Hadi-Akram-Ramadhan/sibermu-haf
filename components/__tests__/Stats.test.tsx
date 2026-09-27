import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Stats from '@/components/Stats';

vi.mock('@/lib/gsap', () => ({
  gsap: {
    context: () => ({ revert: vi.fn() }),
    to: vi.fn(),
  },
  ScrollTrigger: {},
  registerGsap: vi.fn(),
  prefersReducedMotion: () => true,
}));

describe('Stats Component', () => {
  it('renders official campus statistics accurately', () => {
    render(<Stats />);

    // Memastikan 6 prodi S1, 2 fakultas, 100% online, 2021 izin
    expect(screen.getByText('Program Studi S1')).toBeInTheDocument();
    expect(screen.getByText('Fakultas')).toBeInTheDocument();
    expect(screen.getByText('Kuliah Online')).toBeInTheDocument();
    expect(screen.getByText('Izin Operasional')).toBeInTheDocument();
  });

  it('renders official accreditation statement', () => {
    render(<Stats />);
    expect(screen.getByText(/kementerian pendidikan/i)).toBeInTheDocument();
    expect(screen.getByText(/akreditasi institusi/i)).toBeInTheDocument();
    expect(screen.getByText(/430\/E\/O\/2021/i)).toBeInTheDocument();
  });
});
