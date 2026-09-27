import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Programs from '@/components/Programs';

describe('Programs Component', () => {
  it('renders all six official study programs by default', () => {
    render(<Programs />);

    expect(screen.getByText('Informatika')).toBeInTheDocument();
    expect(screen.getByText('Sistem Informasi')).toBeInTheDocument();
    expect(screen.getByText('Administrasi Kesehatan')).toBeInTheDocument();
    expect(screen.getByText('Hukum')).toBeInTheDocument();
    expect(screen.getByText('Manajemen')).toBeInTheDocument();
    expect(screen.getByText('Akuntansi')).toBeInTheDocument();
  });

  it('filters programs by faculty when clicking tabs', () => {
    render(<Programs />);

    const ftikTab = screen.getByRole('tab', { name: /teknologi & ilmu kesehatan/i });
    fireEvent.click(ftikTab);

    // FTIK prodi harus ada
    expect(screen.getByText('Informatika')).toBeInTheDocument();
    expect(screen.getByText('Sistem Informasi')).toBeInTheDocument();
    expect(screen.getByText('Administrasi Kesehatan')).toBeInTheDocument();

    // FBH prodi tidak boleh muncul
    expect(screen.queryByText('Hukum')).toBeNull();
    expect(screen.queryByText('Manajemen')).toBeNull();
    expect(screen.queryByText('Akuntansi')).toBeNull();
  });

  it('opens and closes the blueprint curriculum modal on interaction', () => {
    render(<Programs />);

    const detailButtons = screen.getAllByRole('button', { name: /detail kurikulum dan karier/i });
    expect(detailButtons.length).toBe(6);

    // Buka modal untuk prodi pertama (Informatika)
    fireEvent.click(detailButtons[0]);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('S1 PJJ Informatika')).toBeInTheDocument();
    expect(screen.getByText('Fakultas Teknologi dan Ilmu Kesehatan')).toBeInTheDocument();
    expect(screen.getByText(/software engineer/i)).toBeInTheDocument();

    // Tutup modal dengan tombol tutup
    const closeBtn = screen.getByRole('button', { name: /tutup/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).toBeNull();

    // Buka lagi lalu tutup dengan tombol Escape
    fireEvent.click(detailButtons[0]);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
