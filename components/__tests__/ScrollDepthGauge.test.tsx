import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ScrollDepthGauge from '@/components/ScrollDepthGauge';

describe('ScrollDepthGauge Component', () => {
  it('renders index percentage readout and top scroll button', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(<ScrollDepthGauge />);

    expect(screen.getByRole('complementary', { name: /indikator halaman/i })).toBeInTheDocument();
    expect(screen.getByText(/INDEX \/\//i)).toBeInTheDocument();

    const topButton = screen.getByRole('button', { name: /kembali ke atas halaman/i });
    expect(topButton).toBeInTheDocument();

    fireEvent.click(topButton);
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
