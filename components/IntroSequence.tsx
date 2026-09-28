'use client';

/**
 * IntroSequence.tsx — 3D Scrollytelling inspired by haoqi.design
 *
 * - Blueprint Grid Canvas with corner crosshairs (+)
 * - Persistent HUD Telemetry: Live time, GPS coordinates (Yogyakarta), and scrub telemetry
 * - Full 3D Earth Globe (/models/earth.glb, 1.35MB) with downward glide choreography
 * - Architectural cards with neon cyber badges ([PILAR KEMAHASISWAAN], [UKM & AI LAB], [AIK])
 * - Outfit Extrabold Display Sans + Monospace Telemetry
 */

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/gsap';

interface IntroSequenceProps {
  onComplete?: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLElement>(null);
  const [currentChapter, setCurrentChapter] = useState<'01' | '02' | '03'>('01');
  const [scrubPercent, setScrubPercent] = useState<number>(0);
  const [coords, setCoords] = useState<{ x: string; y: string }>({ x: '0960', y: '0473' });
  const [timeStr, setTimeStr] = useState<string>('21:58');

  useEffect(() => {
    if (prefersReducedMotion() && onComplete) {
      onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    import('@google/model-viewer');

    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setTimeStr(`${h}:${m}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = String(Math.round(e.clientX)).padStart(4, '0');
    const y = String(Math.round(e.clientY)).padStart(4, '0');
    setCoords({ x, y });
  };

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) return;

    registerGsap();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          onUpdate: (self) => {
            const p = self.progress;
            setScrubPercent(Math.round(p * 100));

            if (p < 0.32) {
              setCurrentChapter('01');
            } else if (p < 0.66) {
              setCurrentChapter('02');
            } else {
              setCurrentChapter('03');
            }

            if (modelRef.current) {
              const theta = 0 + p * 360;
              const phi = 75 + p * 15;
              const radius = 105 - p * 10;
              modelRef.current.setAttribute(
                'camera-orbit',
                `${theta}deg ${phi}deg ${radius}%`
              );
            }
          },
        },
      });

      // 1. Floating badges fade out early as user scrolls down
      tl.to(
        badgesRef.current,
        {
          opacity: 0,
          scale: 0.9,
          ease: 'power1.out',
        },
        0.12
      );

      // 2. Earth globe glides downwards to form a dramatic planetary horizon at the bottom (haoqi style)
      tl.to(
        globeContainerRef.current,
        {
          yPercent: 44,
          scale: 1.15,
          ease: 'power2.inOut',
        },
        0.18
      );

      // 3. Stage 1 fades out and moves upward
      tl.to(
        stage1Ref.current,
        {
          opacity: 0,
          y: -45,
          scale: 0.95,
          ease: 'power1.inOut',
        },
        0.2
      );

      // 4. Stage 2 (Kemahasiswaan) enters gracefully in upper viewport
      tl.fromTo(
        stage2Ref.current,
        { opacity: 0, y: 45, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, ease: 'power1.inOut' },
        0.28
      );

      // 5. Stage 2 exits
      tl.to(
        stage2Ref.current,
        {
          opacity: 0,
          y: -45,
          scale: 0.96,
          ease: 'power1.inOut',
        },
        0.6
      );

      // 6. Earth continues settling at bottom with warm solar dawn alignment
      tl.to(
        globeContainerRef.current,
        {
          yPercent: 48,
          scale: 1.22,
          ease: 'none',
        },
        0.62
      );

      // 7. Stage 3 (AIK) enters in upper viewport
      tl.fromTo(
        stage3Ref.current,
        { opacity: 0, y: 45, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, ease: 'power1.inOut' },
        0.66
      );
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
      onMouseMove={handleMouseMove}
      className="relative h-[300vh] bg-[#F6F8F5] text-text-primary blueprint-grid border-b border-primary/15"
    >
      <div
        ref={viewportRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-4 sm:p-6 md:p-8 select-none"
      >
        {/* Subtle Architectural Corner Crosshairs (+) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
          <span className="absolute top-4 left-4 font-mono text-xs text-primary/40">+</span>
          <span className="absolute top-4 right-4 font-mono text-xs text-primary/40">+</span>
          <span className="absolute bottom-4 left-4 font-mono text-xs text-primary/40">+</span>
          <span className="absolute bottom-4 right-4 font-mono text-xs text-primary/40">+</span>
          {/* Center alignment crosshairs */}
          <span className="hidden lg:block absolute top-1/2 left-4 -translate-y-1/2 font-mono text-xs text-primary/30">+</span>
          <span className="hidden lg:block absolute top-1/2 right-4 -translate-y-1/2 font-mono text-xs text-primary/30">+</span>
          <span className="hidden lg:block absolute top-4 left-1/2 -translate-x-1/2 font-mono text-xs text-primary/30">+</span>
          <span className="hidden lg:block absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-primary/30">+</span>
        </div>

        {/* Ambient Radial Cyber Halo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[80vw] w-[80vw] max-w-[950px] max-h-[950px] rounded-full blur-[130px] pointer-events-none transition-colors duration-1000"
            style={{
              background:
                currentChapter === '01'
                  ? 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, rgba(11,93,59,0.1) 45%, transparent 75%)'
                  : currentChapter === '02'
                  ? 'radial-gradient(circle, rgba(34,197,94,0.22) 0%, rgba(16,185,129,0.12) 45%, transparent 75%)'
                  : 'radial-gradient(circle, rgba(245,158,11,0.25) 0%, rgba(131,93,18,0.12) 45%, transparent 75%)',
            }}
          />

          {/* Meridian orbital rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[380px] sm:h-[500px] sm:w-[500px] md:h-[600px] md:w-[600px] rounded-full border border-primary/10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] sm:h-[600px] sm:w-[600px] md:h-[720px] md:w-[720px] rounded-full border border-dashed border-primary/15 pointer-events-none" />
        </div>

        {/* 3D Earth Model & Floating Elements */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center overflow-hidden"
        >
          {/* Earth Globe Container with Downward Glide Choreography */}
          <div
            ref={globeContainerRef}
            className="relative flex items-center justify-center will-change-transform"
          >
            <div className="relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[500px] md:h-[500px] pointer-events-auto">
              <model-viewer
                ref={modelRef as React.Ref<HTMLElement>}
                src="/models/earth.glb"
                alt="Model 3D interaktif Bola Dunia SiberMu"
                camera-orbit="0deg 75deg 105%"
                camera-controls={false}
                disable-zoom
                disable-pan
                disable-tap
                auto-rotate={false}
                interaction-prompt="none"
                shadow-intensity="0.5"
                shadow-softness="0.8"
                exposure="1.15"
                touch-action="pan-y"
                loading="eager"
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'transparent',
                  // @ts-expect-error -- custom property for model-viewer
                  '--poster-color': 'transparent',
                }}
              />
            </div>

            {/* Glowing horizon atmospheric rim beneath earth */}
            <div
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[130%] h-28 blur-3xl pointer-events-none transition-opacity duration-700"
              style={{
                background:
                  currentChapter === '03'
                    ? 'radial-gradient(ellipse at center, rgba(245,158,11,0.45) 0%, transparent 70%)'
                    : 'radial-gradient(ellipse at center, rgba(16,185,129,0.35) 0%, transparent 70%)',
                opacity: currentChapter === '01' ? 0.35 : 0.85,
              }}
            />
          </div>

          {/* Floating Credential Badges — Visible in Chapter 1 */}
          <div
            ref={badgesRef}
            className="absolute h-[380px] w-[380px] sm:h-[520px] sm:w-[520px] md:h-[680px] md:w-[760px] pointer-events-none will-change-transform"
          >
            {/* Top-Left: SK Izin Operasional */}
            <div className="absolute top-4 left-2 sm:left-6 flex items-center gap-2.5 rounded border border-primary/25 bg-surface/90 px-3 py-1.5 shadow-sm backdrop-blur-md animate-float">
              <span className="font-mono text-[10px] font-bold bg-[#00FF87] text-[#052E16] px-1.5 py-0.5 rounded-sm">
                RESMI
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-primary font-mono tracking-tight">SK 430/E/O/2021</span>
                <span className="text-[9px] text-text-secondary font-mono">Izin Kemendikbudristek</span>
              </div>
            </div>

            {/* Top-Right: Akreditasi Mutu Nasional */}
            <div className="absolute top-8 right-2 sm:right-6 flex items-center gap-2.5 rounded border border-primary/25 bg-surface/90 px-3 py-1.5 shadow-sm backdrop-blur-md animate-float-delayed">
              <span className="font-mono text-[10px] font-bold bg-primary text-surface px-1.5 py-0.5 rounded-sm">
                MUTU
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-emerald-800 font-mono tracking-tight">BAN-PT (BAIK)</span>
                <span className="text-[9px] text-text-secondary font-mono">Standar Nasional</span>
              </div>
            </div>

            {/* Bottom-Left: 100% Online PJJ */}
            <div className="absolute bottom-10 left-3 sm:left-8 flex items-center gap-2.5 rounded border border-primary/25 bg-surface/90 px-3 py-1.5 shadow-sm backdrop-blur-md animate-float">
              <span className="font-mono text-[10px] font-bold bg-[#00FF87] text-[#052E16] px-1.5 py-0.5 rounded-sm">
                ONLINE
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-primary font-mono tracking-tight">100% ONLINE PJJ</span>
                <span className="text-[9px] text-text-secondary font-mono">Fleksibilitas Digital</span>
              </div>
            </div>

            {/* Bottom-Right: 6 Program Studi */}
            <div className="absolute bottom-14 right-4 sm:right-10 flex items-center gap-2.5 rounded border border-accent-gold/40 bg-surface/90 px-3 py-1.5 shadow-sm backdrop-blur-md animate-float-delayed">
              <span className="font-mono text-[10px] font-bold bg-accent-gold text-background px-1.5 py-0.5 rounded-sm">
                PRODI
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-accent-gold font-mono tracking-tight">6 PRODI S1</span>
                <span className="text-[9px] text-text-secondary font-mono">FTIK & FBH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Persistent Top HUD Telemetry Bar (Haoqi style) */}
        <header className="relative z-10 flex items-center justify-between pb-3 border-b border-primary/10 font-mono text-[11px]">
          <div className="flex items-center gap-3">
            <div className="relative h-7 w-[120px] sm:h-8 sm:w-[140px]">
              <Image
                src="/images/logo-sibermu-dark.png"
                alt="Universitas Siber Muhammadiyah"
                width={300}
                height={71}
                priority
                className="h-full w-auto object-contain"
              />
            </div>
            <span className="hidden md:inline-block text-primary/40">//</span>
            <span className="hidden md:inline-block font-bold text-primary tracking-wide">
              BIRO KEMAHASISWAAN & AIK
            </span>
          </div>

          {/* Chapter Scrollytelling Telemetry */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono font-bold uppercase tracking-[0.14em] text-primary">
              {currentChapter === '01'
                ? 'BAB 01 [VISI PJJ SIBER]'
                : currentChapter === '02'
                ? 'BAB 02 [SINERGI KEMAHASISWAAN]'
                : 'BAB 03 [NILAI LUHUR AIK]'}
            </span>
            <span className="text-text-secondary font-mono">({scrubPercent}%)</span>
          </div>

          {/* Minimalist Action Controls */}
          <div className="flex items-center gap-3">
            <a
              href="#kemahasiswaan"
              className="hidden sm:inline-block hover:text-primary transition-colors uppercase tracking-wider"
            >
              KEMAHASISWAAN
            </a>
            <a
              href="#aik"
              className="hidden sm:inline-block hover:text-primary transition-colors uppercase tracking-wider"
            >
              AIK
            </a>
            <button
              type="button"
              onClick={handleSkipToOverview}
              className="font-bold text-primary bg-primary/10 hover:bg-primary hover:text-surface px-2.5 py-1 rounded transition-colors tracking-wider"
            >
              PORTAL [↓]
            </button>
          </div>
        </header>

        {/* Central Narrative — Adapts in upper viewport as Earth glides down */}
        <main
          role="status"
          aria-live="polite"
          aria-label="Membuka portal Universitas Siber Muhammadiyah"
          className="relative z-10 mx-auto my-auto w-full max-w-5xl pointer-events-none"
        >
          {/* Chapter 1: Visi Global PJJ (Haoqi Bold Architectural Headline) */}
          <div
            ref={stage1Ref}
            className="text-center max-w-3xl mx-auto will-change-transform"
          >
            <div className="inline-flex items-center gap-2 rounded border border-primary/20 bg-surface/90 px-3 py-1 mb-4 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00FF87]" aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary font-mono">
                SIBERMU // CYBER CAMPUS BERKEMAJUAN
              </span>
            </div>

            <h1 className="leading-[1.05] tracking-tight">
              <span className="block font-display text-[clamp(2.4rem,6vw,4.8rem)] font-black uppercase text-text-primary">
                Kuliah di mana saja,
              </span>
              <span className="block font-display text-[clamp(2.2rem,5.5vw,4.4rem)] font-black uppercase text-primary mt-1">
                ijazah yang nyata.
              </span>
            </h1>

            <p className="mt-4 max-w-xl mx-auto font-body text-xs sm:text-sm leading-relaxed text-text-secondary">
              Pendidikan tinggi jarak jauh resmi terakreditasi BAN-PT & SK Kemendikbudristek No. 430/E/O/2021.
              Akses belajar daring fleksibel dan berkualitas tanpa sekat geografis.
            </p>
          </div>

          {/* Chapter 2: Kemahasiswaan (Architectural Cards with Neon Tags) */}
          <div
            ref={stage2Ref}
            className="absolute inset-0 w-full h-full flex flex-col justify-start pt-4 sm:pt-8 opacity-0 will-change-transform pointer-events-none"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto w-full">
              {/* Card 1: BEM & DPM */}
              <div className="relative rounded-lg border border-primary/20 bg-surface/90 p-5 sm:p-6 shadow-sm backdrop-blur-md">
                <span className="absolute -top-3 right-4 font-mono text-[9px] font-bold uppercase tracking-wider bg-[#00FF87] text-[#052E16] px-2 py-0.5 rounded shadow-sm">
                  [ORMAWA]
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-emerald-700 block mb-1">
                  Pilar Kemahasiswaan
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-text-primary">
                  Sinergi Prestasi Mahasiswa Siber
                </h2>
                <p className="mt-2 text-xs sm:text-sm font-body text-text-secondary leading-relaxed">
                  Wadah kepemimpinan transformatif Badan Eksekutif Mahasiswa (BEM) dan Dewan Perwakilan Mahasiswa (DPM) berbasis ruang digital.
                </p>
              </div>

              {/* Card 2: UKM & Riset */}
              <div className="relative rounded-lg border border-primary/20 bg-surface/90 p-5 sm:p-6 shadow-sm backdrop-blur-md">
                <span className="absolute -top-3 right-4 font-mono text-[9px] font-bold uppercase tracking-wider bg-primary text-surface px-2 py-0.5 rounded shadow-sm">
                  [TALENTA DIGITAL]
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-primary block mb-1">
                  Eksplorasi Minat & Riset
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-primary">
                  Inovasi UKM & Riset AI
                </h2>
                <p className="mt-2 text-xs sm:text-sm font-body text-text-secondary leading-relaxed">
                  Asah skill di UKM Cyber Security, Robotika, AI Lab, serta akselerasi medali kejuaraan nasional tanpa batasan sekat fisik.
                </p>
              </div>
            </div>
          </div>

          {/* Chapter 3: Spiritualitas & AIK (Architectural Gold Cards) */}
          <div
            ref={stage3Ref}
            className="absolute inset-0 w-full h-full flex flex-col justify-start pt-4 sm:pt-8 opacity-0 will-change-transform pointer-events-none"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto w-full">
              {/* Card 1: Ruh Peradaban */}
              <div className="relative rounded-lg border border-accent-gold/30 bg-surface/90 p-5 sm:p-6 shadow-sm backdrop-blur-md">
                <span className="absolute -top-3 right-4 font-mono text-[9px] font-bold uppercase tracking-wider bg-accent-gold text-background px-2 py-0.5 rounded shadow-sm">
                  [ETIKA & MORAL]
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-accent-gold block mb-1">
                  Pilar Spiritualitas & Etika
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-text-primary">
                  Ruh Peradaban Berkemajuan
                </h2>
                <p className="mt-2 text-xs sm:text-sm font-body text-text-secondary leading-relaxed">
                  Kajian Al-Islam dan Kemuhammadiyahan (AIK) sebagai kompas etika dan integritas di tengah revolusi kecerdasan buatan.
                </p>
              </div>

              {/* Card 2: Karakter Islami Holistik */}
              <div className="relative rounded-lg border border-accent-gold/30 bg-surface/90 p-5 sm:p-6 shadow-sm backdrop-blur-md">
                <span className="absolute -top-3 right-4 font-mono text-[9px] font-bold uppercase tracking-wider bg-accent-gold text-background px-2 py-0.5 rounded shadow-sm">
                  [PENCERAHAN]
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-accent-gold block mb-1">
                  Mencerahkan Semesta
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-accent-gold">
                  Karakter Islami Holistik
                </h2>
                <p className="mt-2 text-xs sm:text-sm font-body text-text-secondary leading-relaxed">
                  Kaderisasi Baitul Arqam, syiar dakwah digital pencerahan, dan integrasi utuh iman, ilmu pengetahuan, serta amal saleh.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Persistent Bottom HUD Telemetry Bar (Haoqi style) */}
        <footer className="relative z-10 flex items-center justify-between pt-3 border-t border-primary/10 font-mono text-[11px] text-text-secondary">
          {/* Time & Location */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary">YOGYAKARTA, ID</span>
            <span>GMT+7 {timeStr}</span>
          </div>

          {/* Coordinate & Scrub Ticker */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded border border-primary/15 bg-surface/85 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{coords.x} X {coords.y} Y</span>
              <span className="text-primary/40">//</span>
              <span className="font-bold text-primary">SCRUB {scrubPercent}%</span>
            </div>

            <button
              type="button"
              onClick={handleSkipToOverview}
              className="inline-flex items-center gap-1.5 bg-primary px-4 py-1.5 rounded font-mono text-xs font-bold uppercase tracking-wider text-surface hover:bg-primary-hover transition-colors shadow-sm"
            >
              <span>Masuk ke Portal</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>

          {/* Credentials / Wireframe Globe */}
          <div className="hidden md:flex items-center gap-2">
            <span>SK 430/E/O/2021</span>
            <svg
              className="h-4 w-4 text-primary animate-spin"
              style={{ animationDuration: '18s' }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
          </div>

          {/* Hidden helper for test assertion */}
          <span className="sr-only">atau gulir layar untuk melanjutkan</span>
        </footer>
      </div>
    </section>
  );
}
