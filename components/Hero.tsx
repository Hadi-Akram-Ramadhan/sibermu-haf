'use client';

import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger } from '@/lib/gsap';

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
      {/*
       * Placeholder jujur, ganti dengan file lokal: public/images/hero-sibermu.webp.
       * Frame dan overlay tetap dibangun agar aset final langsung masuk tanpa ubah layout.
       */}
      <div ref={visualRef} className="absolute inset-0 -bottom-[14%]">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(to_top,rgba(11,93,59,0.94),rgba(11,93,59,0.35),transparent)]" />
        <div
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="border border-surface/25 px-5 py-3 text-center font-body text-xs tracking-[0.15em] text-surface/65">
            [ FOTO KULIAH DARING SIBERMU ]
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(780px,100svh)] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-10 md:pb-24">
        <p data-hero-support className="mb-6 font-body text-xs font-semibold uppercase tracking-[0.16em] text-surface/75">
          Pendidikan Jarak Jauh berbasis nilai Muhammadiyah
        </p>

        <h1
          id="hero-heading"
          className="max-w-5xl font-display text-display-2xl font-medium leading-[1.03]"
        >
          <span className="block overflow-hidden"><span data-hero-word className="block">Belajar dari mana</span></span>
          <span className="block overflow-hidden"><span data-hero-word className="block italic">pun, tumbuh</span></span>
          <span className="block overflow-hidden"><span data-hero-word className="block">untuk memberi arti.</span></span>
        </h1>

        <div data-hero-support className="mt-9 flex flex-col gap-5 border-l border-accent-gold pl-5 md:mt-11 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl font-body text-base leading-relaxed text-surface/80 md:text-lg">
            Program sarjana PJJ yang menghubungkan fleksibilitas kuliah online dengan ilmu terapan, nilai Islam, dan tanggung jawab sosial.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={ADMISSIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center bg-surface px-6 py-3 font-body text-sm font-semibold text-primary transition-colors hover:bg-background focus-visible:rounded"
            >
              Daftar Mahasiswa Baru
            </a>
            <a
              href="#program"
              className="inline-flex min-h-11 items-center justify-center border border-surface/60 px-6 py-3 font-body text-sm font-semibold text-surface transition-colors hover:border-surface hover:bg-surface/10 focus-visible:rounded"
            >
              Lihat Program Studi
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
