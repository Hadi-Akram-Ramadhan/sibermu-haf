'use client';

import { useEffect, useState } from 'react';

export default function ScrollDepthGauge() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const progress = Math.min(100, Math.max(0, Math.round((window.scrollY / scrollHeight) * 100)));
      setPercent(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside
      aria-label="Indikator halaman"
      className="fixed bottom-5 right-5 z-40 hidden sm:flex items-center gap-3 border border-primary/20 bg-surface/90 px-3.5 py-2 backdrop-blur-sm shadow-[3px_3px_0_0_rgba(11,93,59,0.15)]"
    >
      <span className="font-body text-[11px] font-semibold tracking-wider text-text-secondary">
        INDEX // <strong className="text-primary font-bold tabular-nums">{String(percent).padStart(2, '0')}%</strong>
      </span>
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Kembali ke atas halaman"
        className="font-body text-[11px] font-semibold uppercase tracking-wider text-primary hover:text-accent-gold transition-colors focus-visible:rounded"
      >
        TOP ↑
      </button>
    </aside>
  );
}
