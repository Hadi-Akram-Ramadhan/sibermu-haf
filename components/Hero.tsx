'use client';

import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger } from '@/lib/gsap';
import InteractiveCyberCanvas from '@/components/InteractiveCyberCanvas';

const ADMISSIONS_URL = process.env.NEXT_PUBLIC_ADMISSIONS_URL ?? 'https://admissions.sibermu.ac.id/';

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;

    registerGsap();
    const context = gsap.context(() => {
      // Gambar latar bergerak lebih lambat, menciptakan kedalaman tanpa distraksi.
      gsap.to(visualRef.current, {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Reveals tiap unit kata memandu mata ke value proposition utama.
      gsap.from('[data-hero-word]', {
        yPercent: 110,
        duration: 0.85,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.15,
      });

      gsap.from('[data-hero-support]', {
        opacity: 0,
        y: 20,
        duration: 0.65,
        stagger: 0.12,
        ease: 'power2.out',
        delay: 0.6,
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-[min(780px,100svh)] overflow-hidden bg-primary text-surface"
      aria-labelledby="hero-heading"
    >
      {/* Interactive Constellation Cyber Canvas (Awwwards SOTD spatial depth) */}
      <InteractiveCyberCanvas />

      {/*
       * Frame dan overlay foto kuliah daring
       */}
      <div ref={visualRef} className="absolute inset-0 -bottom-[14%] pointer-events-none">
        <div className="absolute inset-0 bg-primary/85" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(to_top,rgba(11,93,59,0.96),rgba(11,93,59,0.4),transparent)]" />
        <div
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="border border-surface/20 bg-primary/40 px-5 py-3 text-center font-body text-xs tracking-[0.15em] text-surface/60 backdrop-blur-sm">
            [ FOTO KULIAH DARING SIBERMU ]
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(820px,100svh)] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-10 md:pb-20">
        {/* Technical index indicators ala bleibtgleich */}
        <div data-hero-support className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-surface/20 pb-4 font-body text-xs tracking-[0.14em] text-surface/75">
          <div className="flex items-center gap-3">
            <span className="text-accent-gold">[ SIBERMU / 2026 ]</span>
            <span>100% PENDIDIKAN JARAK JAUH</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span>IZIN MENDIKBUDRISTEK NO. 430/E/O/2021</span>
            <span className="text-accent-gold">•</span>
            <span>AKREDITASI BAIK</span>
          </div>
        </div>

        <h1
          id="hero-heading"
          className="max-w-5xl font-display text-[clamp(2.8rem,7.5vw,6.5rem)] font-medium leading-[1.02] tracking-tight"
        >
          <span className="block overflow-hidden"><span data-hero-word className="block">Kuliah fleksibel,</span></span>
          <span className="block overflow-hidden"><span data-hero-word className="block italic text-surface/90">ilmu berdaya guna,</span></span>
          <span className="block overflow-hidden"><span data-hero-word className="block">untuk masa depan.</span></span>
        </h1>

        <div data-hero-support className="mt-10 grid gap-8 border-t border-surface/20 pt-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div className="flex gap-4">
            <span className="font-body text-xs font-semibold text-accent-gold mt-1">( 01 )</span>
            <p className="max-w-xl font-body text-base leading-relaxed text-surface/85 md:text-lg">
              SiberMu menghadirkan pendidikan tinggi jenjang S1 berbasis teknologi siber dengan kurikulum terapan dan nilai Islam berkemajuan, dapat diakses dari mana saja tanpa meninggalkan aktivitas Anda.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <a
              href={ADMISSIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center bg-surface px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.12em] text-primary transition-colors hover:bg-background focus-visible:rounded"
            >
              Daftar Mahasiswa Baru
            </a>
            <a
              href="#program"
              className="inline-flex min-h-12 items-center justify-center border border-surface/40 px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.12em] text-surface transition-colors hover:border-surface hover:bg-surface/10 focus-visible:rounded"
            >
              Lihat Program Studi
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
