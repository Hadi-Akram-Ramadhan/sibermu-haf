import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AdmissionCTA from '@/components/AdmissionCTA';

describe('AdmissionCTA Component', () => {
  it('renders all four official admission pathways', () => {
    render(<AdmissionCTA />);

    expect(screen.getByText(/jalur reguler/i)).toBeInTheDocument();
    expect(screen.getByText(/jalur karyawan/i)).toBeInTheDocument();
    expect(screen.getByText(/jalur persyarikatan/i)).toBeInTheDocument();
    expect(screen.getByText(/jalur prestasi/i)).toBeInTheDocument();
  });

  it('renders all real contact links pointing to official sources', () => {
    render(<AdmissionCTA />);

    const admissionsLink = screen.getByRole('link', { name: /daftar mahasiswa baru/i });
    expect(admissionsLink).toHaveAttribute('href', 'https://admissions.sibermu.ac.id/');
    expect(admissionsLink).toHaveAttribute('rel', 'noopener noreferrer');

    const emailLink = screen.getByRole('link', { name: /humas@sibermu/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:humas@sibermu.ac.id');
  });

  it('renders official campus address in Yogyakarta', () => {
    render(<AdmissionCTA />);
    expect(screen.getByText(/Kaliurang/i)).toBeInTheDocument();
    expect(screen.getByText(/Yogyakarta/i)).toBeInTheDocument();
  });

  it('toggles FAQ accordion answer on user click', () => {
    render(<AdmissionCTA />);
    const faqButton = screen.getByRole('button', { name: /apakah ijazah sibermu resmi/i });
    expect(faqButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(faqButton);
    expect(faqButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/izin kemendikbudristek ri no\. 430\/e\/o\/2021/i)).toBeInTheDocument();

    fireEvent.click(faqButton);
    expect(faqButton).toHaveAttribute('aria-expanded', 'false');
  });
});
