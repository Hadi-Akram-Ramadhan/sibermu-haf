'use client';

/**
 * IntroSequence.tsx — 3D Scrollytelling with Google model-viewer
 *
 * - Model 3D: /models/earth.glb (Bola Dunia Siber Interaktif — PJJ Global & Mencerahkan Semesta)
 * - Modern sans-serif typography (Outfit + Plus Jakarta Sans)
 * - Anti-slop layout with dedicated breathing room between 3D model and narrative
 * - Clean perimeter HUD credential badges (translate only, no upside-down rotations)
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
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLElement>(null);
  const [currentChapter, setCurrentChapter] = useState<'01' | '02' | '03'>('01');
  const [modelReady, setModelReady] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() && onComplete) {
      onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    import('@google/model-viewer');
  }, []);

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
            if (p < 0.35) {
              setCurrentChapter('01');
            } else if (p < 0.68) {
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

      tl.to(
        stage1Ref.current,
        {
          opacity: 0,
          y: -40,
          scale: 0.96,
          ease: 'power1.inOut',
        },
        0.24
      );

      tl.fromTo(
        stage2Ref.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, ease: 'power1.inOut' },
        0.28
      );
      tl.to(
        stage2Ref.current,
        {
          opacity: 0,
          y: -40,
          scale: 0.96,
          ease: 'power1.inOut',
        },
        0.62
      );

      tl.fromTo(
        stage3Ref.current,
        { opacity: 0, y: 40, scale: 0.96 },
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
      className="relative h-[300vh] bg-[#F7F8F4] text-text-primary"
    >
      <div
        ref={viewportRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between px-5 py-5 sm:px-8 sm:py-6 md:px-12 select-none"
      >
        {/* Radial ambient cyber glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[80vw] w-[80vw] max-w-[950px] max-h-[950px] rounded-full blur-[120px] pointer-events-none transition-colors duration-1000"
            style={{
              background:
                currentChapter === '01'
                  ? 'radial-gradient(circle, rgba(16,185,129,0.24) 0%, rgba(11,93,59,0.12) 45%, transparent 75%)'
                  : currentChapter === '02'
                  ? 'radial-gradient(circle, rgba(34,197,94,0.26) 0%, rgba(16,185,129,0.14) 45%, transparent 75%)'
                  : 'radial-gradient(circle, rgba(245,158,11,0.28) 0%, rgba(131,93,18,0.14) 45%, transparent 75%)',
            }}
          />

          {/* Ethereal cyber orbital ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[380px] sm:h-[520px] sm:w-[520px] md:h-[620px] md:w-[620px] rounded-full border border-primary/10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[440px] w-[440px] sm:h-[600px] sm:w-[600px] md:h-[720px] md:w-[720px] rounded-full border border-dashed border-primary/15 pointer-events-none" />
        </div>

        {/* 3D Earth Model — Google model-viewer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center overflow-hidden"
        >
          <div className="relative w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] md:w-[540px] md:h-[540px] opacity-75 pointer-events-auto">
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
              shadow-softness="0.75"
              exposure="1.05"
              touch-action="pan-y"
              loading="eager"
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'transparent',
                // @ts-expect-error -- custom property for model-viewer
                '--poster-color': 'transparent',
              }}
              onLoad={() => setModelReady(true)}
            />
          </div>

          {/* Floating Credential Badges — Clean perimeter layout (translate only, no flip) */}
          <div className="absolute h-[380px] w-[380px] sm:h-[520px] sm:w-[520px] md:h-[680px] md:w-[760px] pointer-events-none">
            {/* Top-Left: Legalitas Izin Operasional */}
            <div className="absolute top-4 left-2 sm:left-6 flex items-center gap-2.5 rounded-full border border-primary/20 bg-surface/90 px-3.5 py-1.5 shadow-[0_8px_24px_rgba(11,93,59,0.12)] backdrop-blur-md animate-float">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-surface">
                ✓
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-primary font-body tracking-tight">SK 430/E/O/2021</span>
                <span className="text-[9px] text-text-secondary font-body font-medium">Izin Operasional Resmi</span>
              </div>
            </div>

            {/* Top-Right: Akreditasi Mutu Nasional */}
            <div className="absolute top-8 right-2 sm:right-6 flex items-center gap-2.5 rounded-full border border-emerald-600/25 bg-surface/90 px-3.5 py-1.5 shadow-[0_8px_24px_rgba(16,185,129,0.12)] backdrop-blur-md animate-float-delayed">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-surface">
                ★
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-emerald-800 font-body tracking-tight">BAN-PT (BAIK)</span>
                <span className="text-[9px] text-text-secondary font-body font-medium">Standar Mutu Nasional</span>
              </div>
            </div>

            {/* Bottom-Left: Fleksibilitas PJJ */}
            <div className="absolute bottom-10 left-3 sm:left-8 flex items-center gap-2.5 rounded-full border border-primary/20 bg-surface/90 px-3.5 py-1.5 shadow-[0_8px_24px_rgba(11,93,59,0.12)] backdrop-blur-md animate-float">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-surface">
                ⚡
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-primary font-body tracking-tight">100% ONLINE PJJ</span>
                <span className="text-[9px] text-text-secondary font-body font-medium">Fleksibilitas Digital</span>
              </div>
            </div>

            {/* Bottom-Right: 6 Program Studi */}
            <div className="absolute bottom-14 right-4 sm:right-10 flex items-center gap-2.5 rounded-full border border-accent-gold/40 bg-surface/90 px-3.5 py-1.5 shadow-[0_8px_24px_rgba(131,93,18,0.12)] backdrop-blur-md animate-float-delayed">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-gold text-[10px] font-bold text-background">
                ◆
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-accent-gold font-body tracking-tight">6 PRODI S1</span>
                <span className="text-[9px] text-text-secondary font-body font-medium">Fakultas Terakreditasi</span>
              </div>
            </div>
          </div>
        </div>

        {/* HUD Top Header */}
        <header className="relative z-10 flex items-center justify-between pt-2">
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

          {/* Chapter Scrollytelling Telemetry */}
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
                ? 'BAB 01 • VISI PJJ GLOBAL'
                : currentChapter === '02'
                ? 'BAB 02 • SINERGI KEMAHASISWAAN'
                : 'BAB 03 • NILAI LUHUR AIK'}
            </span>
          </div>

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

        {/* Central Narrative — 3 Cross-Fading Chapters with Clean Typography */}
        <main
          role="status"
          aria-live="polite"
          aria-label="Membuka portal Universitas Siber Muhammadiyah"
          className="relative z-10 mx-auto my-auto w-full max-w-5xl pointer-events-none"
        >
          {/* Chapter 1: Visi Global PJJ */}
          <div
            ref={stage1Ref}
            className="text-center max-w-2xl mx-auto will-change-transform"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-surface/85 px-3 py-1 mb-4 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-primary font-body">
                Kampus Siber Berkemajuan
              </span>
            </div>

            <h1 className="leading-[1.08] tracking-tight">
              <span className="block font-display text-[clamp(2.4rem,5.6vw,4.5rem)] font-extrabold text-text-primary">
                Kuliah di mana saja,
              </span>
              <span className="block font-display text-[clamp(2.2rem,5.2vw,4.2rem)] font-extrabold text-primary mt-1">
                ijazah yang nyata.
              </span>
            </h1>

            <p className="mt-4 max-w-lg mx-auto font-body text-xs sm:text-sm leading-relaxed text-text-secondary">
              Pendidikan tinggi jarak jauh resmi terakreditasi BAN-PT & SK Kemendikbudristek No. 430/E/O/2021.
              Akses belajar daring fleksibel dan berkualitas tanpa sekat geografis.
            </p>
          </div>

          {/* Chapter 2: Kemahasiswaan & Prestasi Digital */}
          <div
            ref={stage2Ref}
            className="absolute inset-0 w-full h-full flex flex-col justify-between opacity-0 will-change-transform pointer-events-none"
          >
            <div className="max-w-md pt-2 rounded-2xl border border-primary/10 bg-surface/80 p-5 shadow-sm backdrop-blur-md">
              <span className="text-[10px] font-body font-bold uppercase tracking-[0.16em] text-emerald-700 block mb-1">
                Pilar Kemahasiswaan
              </span>
              <h2 className="font-display text-[clamp(1.8rem,3.8vw,2.8rem)] leading-[1.1] font-extrabold tracking-tight text-text-primary">
                Sinergi Prestasi Mahasiswa Siber
              </h2>
              <p className="mt-2 text-xs sm:text-sm font-body text-text-secondary leading-relaxed">
                Wadah kepemimpinan demokratis Badan Eksekutif Mahasiswa (BEM) dan Dewan Perwakilan Mahasiswa (DPM).
              </p>
            </div>

            <div className="max-w-md self-end text-right pb-2 rounded-2xl border border-primary/10 bg-surface/80 p-5 shadow-sm backdrop-blur-md">
              <span className="text-[10px] font-body font-bold uppercase tracking-[0.16em] text-primary block mb-1">
                Eksplorasi Talenta
              </span>
              <h2 className="font-display text-[clamp(1.8rem,3.8vw,2.8rem)] leading-[1.1] font-extrabold tracking-tight text-primary">
                Inovasi UKM & Riset AI
              </h2>
              <p className="mt-2 text-xs sm:text-sm font-body text-text-secondary leading-relaxed">
                Asah keterampilan coding, cyber security, riset teknologi masa depan, dan akselerasi medali kejuaraan nasional.
              </p>
            </div>
          </div>

          {/* Chapter 3: Spiritualitas & AIK */}
          <div
            ref={stage3Ref}
            className="absolute inset-0 w-full h-full flex flex-col justify-between opacity-0 will-change-transform pointer-events-none"
          >
            <div className="max-w-md pt-2 rounded-2xl border border-accent-gold/20 bg-surface/80 p-5 shadow-sm backdrop-blur-md">
              <span className="text-[10px] font-body font-bold uppercase tracking-[0.16em] text-accent-gold block mb-1">
                Pilar Spiritualitas & Etika
              </span>
              <h2 className="font-display text-[clamp(1.8rem,3.8vw,2.8rem)] leading-[1.1] font-extrabold tracking-tight text-text-primary">
                Ruh Peradaban Berkemajuan
              </h2>
              <p className="mt-2 text-xs sm:text-sm font-body text-text-secondary leading-relaxed">
                Kajian Al-Islam dan Kemuhammadiyahan (AIK) sebagai pedoman etika moral di tengah transformasi era digital.
              </p>
            </div>

            <div className="max-w-md self-end text-right pb-2 rounded-2xl border border-accent-gold/20 bg-surface/80 p-5 shadow-sm backdrop-blur-md">
              <span className="text-[10px] font-body font-bold uppercase tracking-[0.16em] text-accent-gold block mb-1">
                Mencerahkan Semesta
              </span>
              <h2 className="font-display text-[clamp(1.8rem,3.8vw,2.8rem)] leading-[1.1] font-extrabold tracking-tight text-accent-gold">
                Karakter Islami Holistik
              </h2>
              <p className="mt-2 text-xs sm:text-sm font-body text-text-secondary leading-relaxed">
                Kaderisasi Baitul Arqam, syiar dakwah digital pencerahan, dan integrasi utuh iman, ilmu, serta amal saleh.
              </p>
            </div>
          </div>
        </main>

        {/* Bottom Dock */}
        <footer className="relative z-10 flex flex-col items-center gap-3 pb-2">
          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-surface/90 px-3.5 py-1 text-[11px] font-body font-bold uppercase tracking-[0.12em] text-primary shadow-sm backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span>SCROLL</span>
          </div>

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
