'use client';

/**
 * IntroSequence.tsx — Authentic 3D Scrollytelling (why.zero.university inspired)
 *
 * Menggunakan:
 *  - 1. Online 3D Scene via Spline (@splinetool/react-spline) dengan dynamic import SSR-safe.
 *  - 2. GSAP ScrollTrigger timeline terikat scroll fisik (scrub: 1.2) untuk perpindahan
 *       BAB 1 → BAB 2 → BAB 3 yang 100% BUTTERY SMOOTH tanpa ada lompatan mendadak.
 *  - 3. Koin-koin 3D melayang berotasi dalam ruang perspektif (persis Screenshot 5 zero.university).
 *  - 4. Tipografi editorial Fraunces & Geist split-layout modern.
 *  - 5. HUD minimalis & floating dock di bawah.
 */

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/gsap';

// Dynamic import Spline agar aman dari SSR Next.js
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => null,
});

interface IntroSequenceProps {
  onComplete?: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);
  const splineWrapRef = useRef<HTMLDivElement>(null);
  const tokensWrapRef = useRef<HTMLDivElement>(null);
  const [currentChapter, setCurrentChapter] = useState<'01' | '02' | '03'>('01');
  const [splineLoaded, setSplineLoaded] = useState(false);

  // Deteksi prefers-reduced-motion
  useEffect(() => {
    if (prefersReducedMotion() && onComplete) {
      onComplete();
    }
  }, [onComplete]);

  // GSAP ScrollTrigger: Scrub Timeline Buttery Smooth
  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) return;

    registerGsap();

    const ctx = gsap.context(() => {
      // Timeline utama terikat scrub scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2, // Interpolasi inersia ultra-halus 60 FPS
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.35) {
              setCurrentChapter('01');
            } else if (p < 0.68) {
              setCurrentChapter('02');
            } else {
              setCurrentChapter('03');
            }
          },
        },
      });

      // 1. Transisi Bab 1: Aktif di awal, perlahan memudar dan melayang ke atas
      tl.to(
        stage1Ref.current,
        {
          opacity: 0,
          y: -45,
          scale: 0.95,
          ease: 'power1.inOut',
        },
        0.24
      );

      // 2. Transisi Bab 2: Melayang masuk dari bawah secara halus, tampil, lalu memudar
      tl.fromTo(
        stage2Ref.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, ease: 'power1.inOut' },
        0.28
      );
      tl.to(
        stage2Ref.current,
        {
          opacity: 0,
          y: -45,
          scale: 0.95,
          ease: 'power1.inOut',
        },
        0.62
      );

      // 3. Transisi Bab 3: Melayang masuk dari bawah dan menetap
      tl.fromTo(
        stage3Ref.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, ease: 'power1.inOut' },
        0.66
      );

      // 4. Transformasi Elemen 3D Pusat & Koin Melayang sepanjang scroll
      if (splineWrapRef.current) {
        tl.to(
          splineWrapRef.current,
          {
            rotationY: 140,
            rotationX: 12,
            scale: 1.18,
            ease: 'none',
          },
          0
        );
      }

      if (tokensWrapRef.current) {
        tl.to(
          tokensWrapRef.current,
          {
            rotation: 180,
            scale: 1.12,
            ease: 'none',
          },
          0
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSkipToOverview = () => {
    if (onComplete) onComplete();
    const el = document.getElementById('overview');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight * 3, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="intro-story"
      aria-label="Pengantar Narasi Digital Universitas Siber Muhammadiyah"
      className="relative h-[300vh] bg-[#F7F8F4] text-text-primary"
    >
      {/* Sticky Pinned Viewport 100vh */}
      <div
        ref={viewportRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between px-5 py-5 sm:px-8 sm:py-6 md:px-12 select-none"
      >
        {/* Background Radiant Mesh Portal (why.zero.university inspired) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[75vw] w-[75vw] max-w-[900px] max-h-[900px] rounded-full blur-[110px] pointer-events-none transition-colors duration-1000"
            style={{
              background:
                currentChapter === '01'
                  ? 'radial-gradient(circle, rgba(16,185,129,0.22) 0%, rgba(11,93,59,0.1) 45%, transparent 75%)'
                  : currentChapter === '02'
                  ? 'radial-gradient(circle, rgba(34,197,94,0.25) 0%, rgba(16,185,129,0.12) 45%, transparent 75%)'
                  : 'radial-gradient(circle, rgba(245,158,11,0.26) 0%, rgba(131,93,18,0.12) 45%, transparent 75%)',
            }}
          />
        </div>

        {/* 3D Visual Pusat: Spline 3D Scene Online + Orbit Koin 3D */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-1 flex items-center justify-center overflow-hidden"
        >
          {/* Container Model 3D Spline */}
          <div
            ref={splineWrapRef}
            className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] md:w-[620px] md:h-[620px] transition-transform duration-300 pointer-events-auto"
          >
            <Spline
              scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
              onLoad={() => setSplineLoaded(true)}
              className="w-full h-full"
            />

            {/* Glowing 3D Orb Fallback saat asset 3D sedang memuat */}
            {!splineLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-gradient-to-tr from-primary via-emerald-500 to-accent-gold opacity-80 blur-lg animate-pulse" />
              </div>
            )}
          </div>

          {/* Koin-Koin 3D Melayang Mengitari Model (Persis Screenshot 5 why.zero.university) */}
          <div
            ref={tokensWrapRef}
            className="absolute h-[380px] w-[380px] sm:h-[540px] sm:w-[540px] md:h-[680px] md:w-[680px] pointer-events-none"
            style={{ perspective: 1200 }}
          >
            {/* Koin 1: SK Kemendikbudristek */}
            <div className="absolute top-4 left-1/4 -translate-x-1/2 flex items-center gap-2 rounded-full border border-primary/25 bg-surface/95 px-3 py-1.5 shadow-[0_10px_25px_rgba(11,93,59,0.15)] backdrop-blur-md animate-float">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-surface">
                ✓
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-[11px] font-bold text-primary font-body">SK 430/E/O/2021</span>
                <span className="text-[8px] text-text-secondary">Izin Operasional</span>
              </div>
            </div>

            {/* Koin 2: Akreditasi BAN-PT BAIK */}
            <div className="absolute top-1/4 right-2 sm:right-6 flex items-center gap-2 rounded-full border border-emerald-600/25 bg-surface/95 px-3 py-1.5 shadow-[0_10px_25px_rgba(16,185,129,0.15)] backdrop-blur-md animate-float-delayed">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-surface">
                ★
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-[11px] font-bold text-emerald-800 font-body">BAN-PT (BAIK)</span>
                <span className="text-[8px] text-text-secondary">Mutu Nasional</span>
              </div>
            </div>

            {/* Koin 3: 100% PJJ Online */}
            <div className="absolute bottom-12 left-4 sm:left-10 flex items-center gap-2 rounded-full border border-primary/25 bg-surface/95 px-3 py-1.5 shadow-[0_10px_25px_rgba(11,93,59,0.15)] backdrop-blur-md animate-float">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-surface">
                ⚡
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-[11px] font-bold text-primary font-body">100% ONLINE PJJ</span>
                <span className="text-[8px] text-text-secondary">Fleksibilitas Digital</span>
              </div>
            </div>

            {/* Koin 4: 6 Prodi Sarjana S1 */}
            <div className="absolute bottom-16 right-6 sm:right-14 flex items-center gap-2 rounded-full border border-accent-gold/40 bg-surface/95 px-3 py-1.5 shadow-[0_10px_25px_rgba(131,93,18,0.15)] backdrop-blur-md animate-float-delayed">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-gold text-[10px] font-bold text-background">
                ◆
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-[11px] font-bold text-accent-gold font-body">6 PRODI S1</span>
                <span className="text-[8px] text-text-secondary">FTIK & FBH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist Top HUD (ala why.zero.university Screenshot 3) */}
        <header className="relative z-10 flex items-center justify-between pt-2">
          {/* Brand & Mandate */}
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-[130px] sm:h-9 sm:w-[150px]">
              <Image
                src="/images/logo-sibermu-dark.png"
                alt="Universitas Siber Muhammadiyah"
                width={300}
                height={71}
                priority
                className="h-full w-auto object-contain"
              />
            </div>
            <span className="hidden sm:inline-block h-4 w-px bg-primary/20" aria-hidden="true" />
            <span className="hidden sm:inline-block font-body text-xs font-semibold text-primary">
              Biro Kemahasiswaan & AIK
            </span>
          </div>

          {/* Minimalist Ticker Ruler (ala why.zero.university -180 BZ) */}
          <div className="hidden md:flex flex-col items-center">
            <div className="flex items-center gap-1.5 opacity-40">
              {Array.from({ length: 15 }).map((_, i) => (
                <span
                  key={i}
                  className={[
                    'inline-block w-px bg-primary',
                    i === 7 ? 'h-3.5 opacity-90' : i % 3 === 0 ? 'h-2.5 opacity-60' : 'h-1.5 opacity-30',
                  ].join(' ')}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="mt-1 font-body text-[10px] font-bold uppercase tracking-[0.2em] text-primary/70">
              {currentChapter === '01'
                ? 'BAB 01 • VISI PJJ BERKEMAJUAN'
                : currentChapter === '02'
                ? 'BAB 02 • SINERGI KEMAHASISWAAN'
                : 'BAB 03 • NILAI LUHUR AIK'}
            </span>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-surface/90 px-3 py-1 text-[11px] font-body font-semibold text-primary shadow-sm backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              <span>100% PJJ RESMI</span>
            </span>

            <button
              type="button"
              onClick={handleSkipToOverview}
              className="text-xs font-body font-semibold text-text-secondary hover:text-primary transition-colors px-2 py-1"
            >
              Lewati ↓
            </button>
          </div>
        </header>

        {/* Central Narrative: 3 Layers Berada di DOM Bersamaan dengan GSAP Scrub */}
        <main
          role="status"
          aria-live="polite"
          aria-label="Membuka portal Universitas Siber Muhammadiyah"
          className="relative z-10 mx-auto my-auto w-full max-w-6xl pointer-events-none"
        >
          {/* BAB 1: VISI PJJ (Center Editorial Statement) */}
          <div
            ref={stage1Ref}
            className="text-center max-w-3xl mx-auto will-change-transform"
          >
            <div className="overflow-hidden mb-2">
              <span className="block font-display text-[clamp(2.5rem,6.2vw,5.2rem)] leading-[1.05] font-medium tracking-tight text-text-primary">
                Kuliah di mana saja,
              </span>
              <span className="block font-display text-[clamp(2.3rem,5.6vw,4.6rem)] leading-[1.08] italic font-normal text-primary mt-1">
                ijazah yang nyata.
              </span>
            </div>

            <p className="mt-4 max-w-xl mx-auto font-body text-sm sm:text-base leading-relaxed text-text-secondary">
              Pendidikan tinggi jarak jauh resmi terakreditasi BAN-PT & SK Kemendikbudristek No. 430/E/O/2021.
              Fleksibilitas pembelajaran daring berkualitas tanpa batasan geografis.
            </p>

            {/* Bento Telemetri */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="border border-primary/20 bg-surface/85 px-3 py-1 font-body text-xs font-bold text-primary backdrop-blur-sm">
                SK 430/E/O/2021
              </span>
              <span className="border border-primary/20 bg-surface/85 px-3 py-1 font-body text-xs font-bold text-primary backdrop-blur-sm">
                BAN-PT (BAIK)
              </span>
              <span className="border border-primary/20 bg-surface/85 px-3 py-1 font-body text-xs font-bold text-primary backdrop-blur-sm">
                100% ONLINE PJJ
              </span>
              <span className="border border-primary/20 bg-surface/85 px-3 py-1 font-body text-xs font-bold text-primary backdrop-blur-sm">
                6 PRODI S1
              </span>
            </div>
          </div>

          {/* BAB 2: PILAR KEMAHASISWAAN (Split Layout ala why.zero.university Screenshot 5) */}
          <div
            ref={stage2Ref}
            className="absolute inset-0 w-full h-full flex flex-col justify-between opacity-0 will-change-transform pointer-events-none"
          >
            {/* Pojok Kiri Atas */}
            <div className="max-w-md pt-2">
              <span className="text-[11px] font-body font-bold uppercase tracking-[0.16em] text-emerald-700 block mb-1">
                Pilar Kemahasiswaan
              </span>
              <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.08] font-medium tracking-tight text-text-primary">
                Sinergi Prestasi
              </h2>
              <p className="mt-2 text-xs sm:text-sm font-body text-text-secondary leading-relaxed">
                Wadah kolaborasi kepemimpinan Badan Eksekutif Mahasiswa (BEM) dan Dewan Perwakilan Mahasiswa (DPM).
              </p>
            </div>

            {/* Pojok Kanan Bawah */}
            <div className="max-w-md self-end text-right pb-2">
              <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.08] italic font-normal text-emerald-700">
                Mahasiswa Siber.
              </h2>
              <p className="mt-2 text-xs sm:text-sm font-body text-text-secondary leading-relaxed">
                Eksplorasi minat bakat di UKM Siber, coding, riset AI, serta akselerasi medali kejuaraan nasional.
              </p>
            </div>
          </div>

          {/* BAB 3: PILAR AL-ISLAM & KEMUHAMMADIYAHAN (Split Layout Emas) */}
          <div
            ref={stage3Ref}
            className="absolute inset-0 w-full h-full flex flex-col justify-between opacity-0 will-change-transform pointer-events-none"
          >
            {/* Pojok Kiri Atas */}
            <div className="max-w-md pt-2">
              <span className="text-[11px] font-body font-bold uppercase tracking-[0.16em] text-accent-gold block mb-1">
                Pilar Spiritualitas & Etika
              </span>
              <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.08] font-medium tracking-tight text-text-primary">
                Ruh Peradaban
              </h2>
              <p className="mt-2 text-xs sm:text-sm font-body text-text-secondary leading-relaxed">
                Meneguhkan kajian Al-Islam dan Kemuhammadiyahan (AIK) sebagai kompas etika di era kecerdasan digital.
              </p>
            </div>

            {/* Pojok Kanan Bawah */}
            <div className="max-w-md self-end text-right pb-2">
              <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.08] italic font-normal text-accent-gold">
                Karakter Berkemajuan.
              </h2>
              <p className="mt-2 text-xs sm:text-sm font-body text-text-secondary leading-relaxed">
                Kaderisasi Baitul Arqam, syiar dakwah digital pencerahan, dan integrasi iman, ilmu serta amal saleh.
              </p>
            </div>
          </div>
        </main>

        {/* Floating Bottom Dock (ala why.zero.university Screenshot 3 & 5) */}
        <footer className="relative z-10 flex flex-col items-center gap-3 pb-2">
          {/* Floating Pill: • SCROLL */}
          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-surface/90 px-3.5 py-1 text-[11px] font-body font-bold uppercase tracking-[0.12em] text-primary shadow-sm backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span>SCROLL</span>
          </div>

          {/* Floating Action Dock */}
          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-surface/95 px-3 py-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-md">
            <button
              type="button"
              onClick={handleSkipToOverview}
              className="inline-flex items-center gap-2 bg-primary px-5 py-2 rounded-full font-body text-xs font-bold uppercase tracking-[0.08em] text-surface transition-all duration-200 hover:bg-primary-hover shadow-sm"
            >
              <span>Masuk ke Portal</span>
              <span aria-hidden="true">→</span>
            </button>

            <span className="hidden sm:inline text-xs font-body text-text-secondary px-2">
              atau gulir layar untuk melanjutkan
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}
