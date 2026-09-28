import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import KemahasiswaanSection from '@/components/KemahasiswaanSection';

describe('KemahasiswaanSection Component', () => {
  it('renders section heading and official ormawa cards by default', () => {
    render(<KemahasiswaanSection />);

    expect(screen.getByRole('heading', { level: 2, name: /ekosistem kemahasiswaan/i })).toBeInTheDocument();
    expect(screen.getByText('BEM')).toBeInTheDocument();
    expect(screen.getByText('DPM')).toBeInTheDocument();
    expect(screen.getByText('IMM')).toBeInTheDocument();
  });

  it('switches to UKM tab and displays cyber & innovation clubs', () => {
    render(<KemahasiswaanSection />);

    const ukmTab = screen.getByRole('tab', { name: /unit kegiatan/i });
    fireEvent.click(ukmTab);

    expect(screen.getByText('SiberMu Cyber & Security Lab')).toBeInTheDocument();
    expect(screen.getByText('AI & Software Innovation Club')).toBeInTheDocument();
  });

  it('switches to Prestasi tab and filters by category', () => {
    render(<KemahasiswaanSection />);

    const prestasiTab = screen.getByRole('tab', { name: /torehan prestasi/i });
    fireEvent.click(prestasiTab);

    expect(screen.getByText(/Capture The Flag/i)).toBeInTheDocument();

    const techFilter = screen.getByRole('button', { name: 'Teknologi' });
    fireEvent.click(techFilter);

    expect(screen.getByText(/Capture The Flag/i)).toBeInTheDocument();
  });

  it('switches to Layanan Mahasiswa tab and renders student support services', () => {
    render(<KemahasiswaanSection />);

    const layananTab = screen.getByRole('tab', { name: /layanan mahasiswa/i });
    fireEvent.click(layananTab);

    expect(screen.getByText(/bimbingan konseling & pendampingan mental/i)).toBeInTheDocument();
    expect(screen.getByText(/pusat informasi & pengajuan beasiswa/i)).toBeInTheDocument();
  });
});
