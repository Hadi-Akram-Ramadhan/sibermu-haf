'use client';

/**
 * IntroSequence.tsx — Pintu Masuk Editorial SiberMu (Rich & Non-Empty)
 *
 * Diperbaiki:
 * 1. Menghilangkan GSAP selector invalid `.intro-[data-prompt]` -> pakai `.intro-prompt`.
 * 2. Menyajikan informasi berbobot (telemetri akademik, legalitas resmi, 6 prodi preview)
 *    agar tampilan pembuka kaya akan konten (tidak terasa kosong).
 * 3. Bebas AI Slop: Tanpa dot indikator neon, tanpa bullet points generik, tanpa anak panah berlebih.
 * 4. Menyediakan gesture scroll / tombol untuk masuk ke portal.
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap, prefersReducedMotion, registerGsap } from '@/lib/gsap';

interface IntroSequenceProps {
  onComplete: () => void;
}

const STAT_TELEMETRY = [
  { label: 'IZIN OPERASIONAL', val: 'SK 430/E/O/2021' },
  { label: 'AKREDITASI', val: 'BAN-PT (BAIK)' },
  { label: 'SISTEM KULIAH', val: '100% ONLINE PJJ' },
  { label: 'PROGRAM SARJANA', val: '6 PRODI S1' },
];

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const handleComplete = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    if (!containerRef.current) {
      onCompleteRef.current();
      return;
    }
    gsap.to(containerRef.current, {
      opacity: 0,
      y: -16,
      duration: 0.45,
      ease: 'power2.inOut',
      onComplete: () => {
        onCompleteRef.current();
      },
    });
  }, [isClosing]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      onCompleteRef.current();
      return;
    }

    if (!containerRef.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.intro-header',
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        .fromTo(
          '.intro-seg',
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
          '-=0.2'
        )
        .fromTo(
          '.intro-grid-item',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          '-=0.3'
        )
        .fromTo(
          sheenRef.current,
          { x: '-100%' },
          { x: '100%', duration: 1.1, ease: 'power2.inOut' },
          '-=0.5'
        )
        .fromTo(
          '.intro-prompt',
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4 },
          '-=0.2'
        );
    }, containerRef);

    const onScrollOrWheel = () => {
      handleComplete();
    };

    window.addEventListener('wheel', onScrollOrWheel, { passive: true, once: true });
    window.addEventListener('touchmove', onScrollOrWheel, { passive: true, once: true });

    return () => {
      window.removeEventListener('wheel', onScrollOrWheel);
      window.removeEventListener('touchmove', onScrollOrWheel);
      ctx.revert();
    };
  }, [handleComplete]);

  return (
    <div
      ref={containerRef}
      role="status"
      aria-live="polite"
      aria-label="Membuka portal Universitas Siber Muhammadiyah"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#FAFAF7] p-6 sm:p-12 select-none overflow-hidden"
    >
      {/* Ambient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(11,93,59,0.04) 0%, transparent 75%)',
        }}
      />

      {/* Sheen Specular Overlay */}
      <div
        ref={sheenRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-[40%] -skew-x-12"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)',
          left: 0,
        }}
      />

      {/* Header Telemetri Kiri Atas & Kanan Atas */}
      <header className="intro-header relative z-10 flex items-center justify-between border-b border-primary/15 pb-4 font-body text-[11px] uppercase tracking-[0.14em] text-text-secondary">
        <div className="flex items-center gap-3">
          <span className="font-bold text-primary">SiberMu</span>
          <span className="h-3 w-px bg-primary/20" aria-hidden="true" />
          <span>Universitas Siber Muhammadiyah</span>
        </div>
        <div className="hidden sm:block">
          <span>[ Yogyakarta / Indonesia ]</span>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="relative z-10 mx-auto my-auto w-full max-w-5xl py-8">
        <div className="overflow-hidden mb-2">
          <span className="intro-seg block font-body text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Pendidikan Tinggi Jarak Jauh Berkemajuan
          </span>
        </div>

        <div className="overflow-hidden" aria-label="Kuliah di mana saja. Ijazah yang nyata.">
          <h1 className="font-display text-[clamp(2.5rem,6vw,5.25rem)] font-medium leading-[1.08] tracking-tight text-text-primary">
            <span className="intro-seg block">Kuliah di mana saja,</span>
            <span className="intro-seg block italic text-primary">
              ijazah yang nyata.
            </span>
          </h1>
        </div>

        {/* Telemetri Akademik Grid (Kaya Konten, Tanpa Bullet Points AI Slop) */}
        <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-primary/15 pt-6">
          {STAT_TELEMETRY.map((item) => (
            <div
              key={item.label}
              className="intro-grid-item border border-primary/15 bg-surface p-3.5 sm:p-4 shadow-sm"
            >
              <dt className="font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-text-secondary">
                {item.label}
              </dt>
              <dd className="mt-1 font-body text-xs font-bold text-text-primary">
                {item.val}
              </dd>
            </div>
          ))}
        </dl>
      </main>

      {/* Footer Controls & Gesture Prompt */}
      <footer className="intro-prompt relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-primary/15 pt-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleComplete}
            className="inline-flex min-h-11 items-center justify-center bg-primary px-7 py-2.5 font-body text-xs font-bold uppercase tracking-[0.14em] text-surface transition-colors hover:bg-primary-hover focus-visible:rounded"
          >
            Masuk ke Portal
          </button>
          <span className="font-body text-xs text-text-secondary">
            atau gulir layar untuk melanjutkan
          </span>
        </div>

        <div className="font-body text-[11px] uppercase tracking-[0.12em] text-text-secondary">
          Akreditasi BAN-PT · Terdaftar Kemendikbudristek
        </div>
      </footer>
    </div>
  );
}
