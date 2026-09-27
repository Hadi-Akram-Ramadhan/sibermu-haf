import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

describe('Footer Component', () => {
  it('renders every official social media link', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: 'Facebook' })).toHaveAttribute('href', 'https://www.facebook.com/sibermu');
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', 'https://www.instagram.com/sibermu/');
    expect(screen.getByRole('link', { name: 'X (Twitter)' })).toHaveAttribute('href', 'https://twitter.com/sibermu');
    expect(screen.getByRole('link', { name: 'YouTube' })).toHaveAttribute('href', 'https://www.youtube.com/channel/UCeyzSDwnAzK3Hfza5hMcICw');
  });
});
