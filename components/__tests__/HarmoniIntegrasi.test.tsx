import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import HarmoniIntegrasi from '@/components/HarmoniIntegrasi';

describe('HarmoniIntegrasi Component', () => {
  it('renders section title emphasizing synergy between Kemahasiswaan and AIK', () => {
    render(<HarmoniIntegrasi />);

    expect(screen.getByRole('heading', { level: 2, name: /sinergi kemahasiswaan & al-islam kemuhammadiyahan/i })).toBeInTheDocument();
    expect(screen.getAllByText('Tata Kelola Digital Amanah & Transparan').length).toBeGreaterThan(0);
  });

  it('switches synergy node on click and updates detailed manifesto panel', () => {
    render(<HarmoniIntegrasi />);

    const nodeBtn = screen.getByRole('button', { name: /kecerdasan buatan & komputasi beradab/i });
    fireEvent.click(nodeBtn);

    expect(screen.getByText(/Teknologi siber adalah instrumen tajdid untuk memuliakan harkat kemanusiaan/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Zero-Exploit Ethical Code Conduct/i).length).toBeGreaterThan(0);
  });
});
