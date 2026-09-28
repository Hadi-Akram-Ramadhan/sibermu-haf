import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AikSection from '@/components/AikSection';

describe('AikSection Component', () => {
  it('renders section heading and foundational Muhammadiyah values by default', () => {
    render(<AikSection />);

    expect(screen.getByRole('heading', { level: 2, name: /ruh spiritual & karakter islam berkemajuan/i })).toBeInTheDocument();
    expect(screen.getByText(/Tauhid Murni Berkemajuan/i)).toBeInTheDocument();
    expect(screen.getByText(/Tajdid & Pemikiran Kritis/i)).toBeInTheDocument();
    expect(screen.getByText(/Wasathiyah & Keadaban Digital/i)).toBeInTheDocument();
  });

  it('switches to Kegiatan Keagamaan tab and displays Baitul Arqam Mahasiswa', () => {
    render(<AikSection />);

    const kegTab = screen.getByRole('tab', { name: /kegiatan keagamaan/i });
    fireEvent.click(kegTab);

    expect(screen.getByText(/Baitul Arqam Mahasiswa \(BAM\) Daring/i)).toBeInTheDocument();
    expect(screen.getByText(/Mentoring Tahsin & Ibadah Praktis/i)).toBeInTheDocument();
    expect(screen.getByText(/Ujian Sertifikasi Kompetensi AIK Sarjana/i)).toBeInTheDocument();
  });

  it('switches to Kajian Tematik tab and displays academic webinar sessions', () => {
    render(<AikSection />);

    const kajianTab = screen.getByRole('tab', { name: /kajian tematik/i });
    fireEvent.click(kajianTab);

    expect(screen.getByText(/Etika Kecerdasan Buatan dan Batasan Moral/i)).toBeInTheDocument();
  });

  it('switches to Syiar & Layanan Digital tab and shows consultation hotline', () => {
    render(<AikSection />);

    const syiarTab = screen.getByRole('tab', { name: /syiar & layanan digital/i });
    fireEvent.click(syiarTab);

    expect(screen.getByText(/Pojok Konsultasi Fikih Siber/i)).toBeInTheDocument();
    expect(screen.getByText(/Buletin & Riset Al-Islam Berkemajuan/i)).toBeInTheDocument();
  });
});
