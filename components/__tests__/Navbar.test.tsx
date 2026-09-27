import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@/components/Navbar';

describe('Navbar Component', () => {
  beforeEach(() => {
    window.scrollY = 0;
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('renders brand name and all primary navigation anchors', () => {
    render(<Navbar />);

    expect(screen.getByText('SiberMu')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /program studi/i })[0]).toHaveAttribute('href', '#program');
    expect(screen.getAllByRole('link', { name: /keunggulan/i })[0]).toHaveAttribute('href', '#keunggulan');
    expect(screen.getAllByRole('link', { name: /pendaftaran/i })[0]).toHaveAttribute('href', '#jalur-admisi');
    expect(screen.getAllByRole('link', { name: /kontak/i })[0]).toHaveAttribute('href', '#kontak');
  });

  it('toggles mobile menu and supports keyboard escape to close', () => {
    render(<Navbar />);

    const toggle = screen.getByRole('button', { name: /buka menu/i });
    fireEvent.click(toggle);

    expect(screen.getByRole('dialog', { name: /menu navigasi/i })).not.toHaveClass('hidden');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.getByRole('dialog', { name: /menu navigasi/i })).toHaveClass('hidden');
  });

  it('contains valid admissions link pointing to official portal', () => {
    render(<Navbar />);
    const ctaLinks = screen.getAllByRole('link', { name: /daftar sekarang/i });
    expect(ctaLinks.length).toBeGreaterThan(0);
    expect(ctaLinks[0]).toHaveAttribute('href', 'https://admissions.sibermu.ac.id/');
  });
});
