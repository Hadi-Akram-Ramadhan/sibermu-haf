'use client';

/**
 * Hero.tsx — Editorial Scroll-Storytelling Section
 *
 * Flow scroll-driven:
 *  1. Mount → headline "Belajar tanpa batas ruang..." reveal per baris (clip + stagger).
 *  2. Scroll → parallax halus pada direktori akademik (ledger panel).
 *  3. Headline melambat saat scroll (subtle scrub opacity) — teks jadi anchor visual.
 *
 * Reflective modern (anti AI-slop):
 *  - Specular hairline border transition (bukan glow neon).
 *  - Light sweep halus via pseudo-element CSS pada ledger card saat hover.
 *  - Tidak ada gradient biru-ungu, tidak ada blob dekoratif.
 *
 * Typography: Fraunces sebagai visual utama per design.md.
 * Accessibility: prefers-reduced-motion fallback lengkap.
 */

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion, registerGsap } from '@/lib/gsap';

const ADMISSIONS_URL =
  process.env.NEXT_PUBLIC_ADMISSIONS_URL ?? 'https://admissions.sibermu.ac.id/';

interface ProgramPreview {
  id: string;
  name: string;
  degree: string;
  sks: string;
  focus: string;
  faculty: string;
}

const PROGRAM_PREVIEWS: ProgramPreview[] = [
  {
    id: 'inf',
    name: 'Informatika',
    degree: 'S.Kom.',
    sks: '144 SKS',
    focus: 'Rekayasa Perangkat Lunak, Komputasi Awan, Kecerdasan Buatan',
    faculty: 'FTIK',
  },
  {
    id: 'si',
    name: 'Sistem Informasi',
    degree: 'S.Kom.',
    sks: '144 SKS',
    focus: 'Analitik Data Bisnis, Tata Kelola Sistem Digital, Manajemen TI',
    faculty: 'FTIK',
  },
  {
    id: 'admkes',
    name: 'Administrasi Kesehatan',
    degree: 'S.Kes.',
    sks: '144 SKS',
    focus: 'Manajemen Rumah Sakit, Sistem Informasi Rekam Medis',
    faculty: 'FTIK',
  },
  {
    id: 'hkm',
    name: 'Hukum',
    degree: 'S.H.',
    sks: '144 SKS',
    focus: 'Hukum Siber, Hukum Bisnis Kontemporer, Advokasi',
    faculty: 'FBH',
  },
  {
    id: 'mnj',
    name: 'Manajemen',
    degree: 'S.M.',
    sks: '144 SKS',
    focus: 'Pemasaran Digital, Keuangan Strategis, Kewirausahaan',
    faculty: 'FBH',
  },
  {
    id: 'akt',
    name: 'Akuntansi',
    degree: 'S.Akun.',
    sks: '144 SKS',
    focus: 'Akuntansi Digital, Audit Sistem Informasi, Perpajakan',
    faculty: 'FBH',
  },
];

type FacultyFilter = 'ALL' | 'FTIK' | 'FBH';

const FACULTY_TABS: { id: FacultyFilter; label: string }[] = [
  { id: 'ALL', label: 'Semua' },
  { id: 'FTIK', label: 'Teknologi & Kes.' },
  { id: 'FBH', label: 'Bisnis & Hum.' },
];

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [activeFaculty, setActiveFaculty] = useState<FacultyFilter>('ALL');
  const [hoveredProgram, setHoveredProgram] = useState<string>('inf');

  const filteredPrograms =
    activeFaculty === 'ALL'
      ? PROGRAM_PREVIEWS
      : PROGRAM_PREVIEWS.filter((p) => p.faculty === activeFaculty);

  // 1. Interactive Generative Shapes Canvas (why.zero.university inspired)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof canvas.getContext !== 'function') return;
    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext('2d');
    } catch {
      return;
    }
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mousePos.current.targetX = (clientX - width / 2) * 0.035;
      mousePos.current.targetY = (clientY - height / 2) * 0.035;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Palet warna resmi SiberMu: Emerald, Gold, Mint, Forest
    const COLORS = [
      'rgba(11, 93, 59, ',   // Emerald Primary
      'rgba(131, 93, 18, ',  // Accent Gold
      'rgba(16, 185, 129, ', // Mint
      'rgba(34, 197, 94, ',  // Fresh Green
      'rgba(217, 119, 6, ',  // Amber Warm
    ];

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      rotation: number;
      vRot: number;
      type: 'circle' | 'ring' | 'triangle' | 'polygon' | 'blob';
      color: string;
      alpha: number;
    }

    const SHAPE_COUNT = Math.min(24, Math.max(14, Math.floor(width / 75)));
    const particles: Particle[] = [];

    for (let i = 0; i < SHAPE_COUNT; i++) {
      const typeChoice = ['circle', 'ring', 'triangle', 'polygon', 'blob'][
        Math.floor(Math.random() * 5)
      ] as Particle['type'];

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 38 + 14,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.012,
        type: typeChoice,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.22 + 0.08,
      });
    }

    const drawBlob = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      const points = 6;
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const rad = size * (0.8 + Math.sin(angle * 3) * 0.2);
        const px = Math.cos(angle) * rad;
        const py = Math.sin(angle) * rad;
        if (i === 0) c.moveTo(px, py);
        else c.lineTo(px, py);
      }
      c.closePath();
      c.fill();
    };

    const drawPolygon = (c: CanvasRenderingContext2D, sides: number, radius: number) => {
      c.beginPath();
      for (let i = 0; i < sides; i++) {
        const a = (i / sides) * Math.PI * 2;
        const px = Math.cos(a) * radius;
        const py = Math.sin(a) * radius;
        if (i === 0) c.moveTo(px, py);
        else c.lineTo(px, py);
      }
      c.closePath();
      c.stroke();
    };

    const renderLoop = () => {
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Garis konstelasi antar partikel terdekat
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(11, 93, 59, ${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x + mousePos.current.x, particles[i].y + mousePos.current.y);
            ctx.lineTo(particles[j].x + mousePos.current.x, particles[j].y + mousePos.current.y);
            ctx.stroke();
          }
        }
      }

      // Render setiap bentuk acak
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;

        if (p.x < -p.size) p.x = width + p.size;
        if (p.x > width + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = height + p.size;
        if (p.y > height + p.size) p.y = -p.size;

        const posX = p.x + mousePos.current.x;
        const posY = p.y + mousePos.current.y;

        ctx.save();
        ctx.translate(posX, posY);
        ctx.rotate(p.rotation);

        switch (p.type) {
          case 'circle':
            ctx.beginPath();
            ctx.fillStyle = `${p.color}${p.alpha})`;
            ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'ring':
            ctx.beginPath();
            ctx.strokeStyle = `${p.color}${p.alpha * 1.5})`;
            ctx.lineWidth = 1.4;
            ctx.arc(0, 0, p.size * 0.55, 0, Math.PI * 2);
            ctx.stroke();
            break;
          case 'triangle':
            ctx.strokeStyle = `${p.color}${p.alpha * 1.6})`;
            ctx.lineWidth = 1.2;
            drawPolygon(ctx, 3, p.size * 0.6);
            break;
          case 'polygon':
            ctx.strokeStyle = `${p.color}${p.alpha * 1.4})`;
            ctx.lineWidth = 1.2;
            drawPolygon(ctx, 6, p.size * 0.55);
            break;
          case 'blob':
            ctx.fillStyle = `${p.color}${p.alpha * 0.85})`;
            drawBlob(ctx, p.size * 0.45);
            break;
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(renderLoop);
    };

    if (!prefersReducedMotion()) {
      animId = requestAnimationFrame(renderLoop);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // 2. GSAP Entrance and Parallax
  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;

    registerGsap();

    const ctx = gsap.context(() => {
      // Reveal headline per baris
      gsap.from('.hero-line', {
        yPercent: 105,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.05,
      });

      // Reveal detail, buttons, dan direktori
      gsap.from('.hero-detail', {
        opacity: 0,
        y: 18,
        duration: 0.65,
        stagger: 0.09,
        ease: 'power2.out',
        delay: 0.35,
      });

      // Parallax halus pada ledger card
      if (ledgerRef.current) {
        gsap.to(ledgerRef.current, {
          y: -24,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Headline scrub opacity saat scroll
      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          opacity: 0.25,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'center top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="overview"
      className="relative min-h-[92vh] bg-[#F7F8F4] pt-24 pb-16 md:pt-32 md:pb-24 border-b border-primary/15 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Canvas Bentuk Acak Interaktif (why.zero.university inspired) */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-70"
      />

      {/* Radiant Mesh Atmosphere Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute -top-[15%] left-1/2 -translate-x-1/2 h-[120%] w-[130%] max-w-none opacity-45 blur-3xl pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 110vw 85vh at 50% 30%, rgba(16,185,129,0.18) 0%, rgba(11,93,59,0.11) 40%, rgba(131,93,18,0.06) 70%, transparent 100%)',
          }}
        />
      </div>

      {/* Grid Dua Kolom Editorial */}
      <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 md:px-10">
        {/* Kolom Kiri: Tipografi Editorial & Value Proposition Kemahasiswaan & AIK */}
        <div className="flex flex-col justify-center pt-2">
          <div className="inline-flex items-center gap-3 mb-4 hero-line">
            <span className="font-body text-xs font-bold uppercase tracking-[0.16em] text-primary">
              Biro Kemahasiswaan & AIK
            </span>
            <span className="h-3 w-px bg-primary/25" aria-hidden="true" />
            <span className="text-xs font-body font-medium text-text-secondary">
              Universitas Siber Muhammadiyah
            </span>
          </div>

          <h1
            id="hero-heading"
            ref={headlineRef}
            className="leading-[1.1] tracking-tight"
          >
            <div className="overflow-hidden">
              <span className="block hero-line font-display text-[clamp(2.3rem,4.4vw,4rem)] font-extrabold tracking-tight text-text-primary">
                Kuliah di mana saja,
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="block hero-line font-display text-[clamp(2.1rem,4.2vw,3.7rem)] font-extrabold tracking-tight text-primary">
                ijazah yang nyata.
              </span>
            </div>
            <div className="overflow-hidden mt-1">
              <span className="block hero-line font-display text-[clamp(1.4rem,2.4vw,2.1rem)] font-medium text-text-primary/90">
                Sinergi Prestasi Mahasiswa & Karakter Berkemajuan di Ruang Siber.
              </span>
            </div>
          </h1>

          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-text-secondary hero-detail">
            Portal terpadu mahasiswa Universitas Siber Muhammadiyah: wadah pembinaan organisasi mahasiswa, eksplorasi talenta di unit kegiatan siber, pemacuan prestasi nasional, layanan mahasiswa responsif, serta penempaan spiritualitas Al-Islam dan Kemuhammadiyahan.
          </p>

          {/* Quick Dual-Pillar Shortcuts */}
          <div className="mt-4 flex flex-wrap gap-2 hero-detail">
            <a
              href="#kemahasiswaan"
              className="inline-flex items-center border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-body font-semibold uppercase tracking-[0.06em] text-primary hover:bg-primary hover:text-surface transition-colors"
            >
              Pilar Kemahasiswaan
            </a>
            <a
              href="#aik"
              className="inline-flex items-center border border-accent-gold/40 bg-accent-gold/15 px-3.5 py-1.5 text-xs font-body font-semibold uppercase tracking-[0.06em] text-accent-gold hover:bg-accent-gold hover:text-background transition-colors"
            >
              Pilar Al-Islam & AIK
            </a>
            <a
              href="#layanan"
              className="inline-flex items-center border border-primary/20 bg-surface px-3.5 py-1.5 text-xs font-body font-semibold uppercase tracking-[0.06em] text-text-secondary hover:text-primary hover:border-primary/40 transition-colors"
            >
              Layanan Mahasiswa
            </a>
          </div>

          {/* Legalitas Resmi Terverifikasi: 4 Bento Badges Bersih */}
          <dl className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-primary/15 pt-5 hero-detail">
            <div className="border-l-2 border-primary pl-3 bg-surface/70 backdrop-blur-sm py-2">
              <dt className="font-body text-[10px] uppercase tracking-[0.08em] text-text-secondary">
                Izin Operasional
              </dt>
              <dd className="mt-0.5 font-display text-xs sm:text-sm font-bold text-text-primary">
                SK 430/E/O/2021
              </dd>
            </div>
            <div className="border-l-2 border-accent-gold pl-3 bg-surface/70 backdrop-blur-sm py-2">
              <dt className="font-body text-[10px] uppercase tracking-[0.08em] text-text-secondary">
                Akreditasi BAN-PT
              </dt>
              <dd className="mt-0.5 font-display text-xs sm:text-sm font-bold text-text-primary">
                BAIK (Nasional)
              </dd>
            </div>
            <div className="border-l-2 border-primary pl-3 bg-surface/70 backdrop-blur-sm py-2">
              <dt className="font-body text-[10px] uppercase tracking-[0.08em] text-text-secondary">
                Sistem Kuliah
              </dt>
              <dd className="mt-0.5 font-display text-xs sm:text-sm font-bold text-text-primary">
                100% Online PJJ
              </dd>
            </div>
            <div className="border-l-2 border-accent-gold pl-3 bg-surface/70 backdrop-blur-sm py-2">
              <dt className="font-body text-[10px] uppercase tracking-[0.08em] text-text-secondary">
                Program Sarjana
              </dt>
              <dd className="mt-0.5 font-display text-xs sm:text-sm font-bold text-text-primary">
                6 Prodi S1
              </dd>
            </div>
          </dl>

          {/* CTA Ganda */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row hero-detail">
            <a
              href={ADMISSIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center bg-primary px-8 py-3.5 font-body text-xs font-bold uppercase tracking-[0.12em] text-surface transition-all duration-200 hover:bg-primary-hover shadow-[4px_4px_0_0_#072C1C] hover:shadow-[2px_2px_0_0_#072C1C] hover:translate-x-[2px] hover:translate-y-[2px] focus-visible:rounded"
            >
              Daftar Mahasiswa Baru
            </a>
            <a
              href="#program"
              className="inline-flex min-h-12 items-center justify-center border-2 border-primary/30 bg-surface px-7 py-3.5 font-body text-xs font-bold uppercase tracking-[0.12em] text-primary transition-all duration-200 hover:border-primary hover:bg-[#F2F4EF] focus-visible:rounded"
            >
              Lihat Program Studi
            </a>
          </div>

          <p className="mt-4 font-body text-xs text-text-secondary hero-detail">
            Biaya kuliah transparan dapat dicicil per semester tanpa uang gedung tambahan.
          </p>
        </div>

        {/* Kolom Kanan: Editorial Showcase (Fotografi Mahasiswa PJJ + Direktori Terintegrasi) */}
        <div ref={ledgerRef} className="hero-detail flex flex-col gap-5">
          {/* 1. Frame Fotografi Mahasiswa PJJ SiberMu */}
          <div className="group relative border-2 border-primary/20 bg-surface p-2.5 shadow-[6px_6px_0_0_#0B5D3B] transition-all duration-300 hover:shadow-[8px_8px_0_0_#0B5D3B]">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-background">
              <Image
                src="/images/hero-student-indonesia.jpg"
                alt="Mahasiswi Universitas Siber Muhammadiyah sedang belajar mandiri melalui laptop dalam program perkuliahan daring PJJ"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 550px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />

              {/* Badges Material di atas foto */}
              <div className="absolute top-3 left-3 border border-primary/20 bg-surface/95 px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-wider text-text-primary shadow-sm backdrop-blur-sm">
                Pendidikan Jarak Jauh (PJJ)
              </div>

              <div className="absolute bottom-3 right-3 border border-primary/20 bg-surface/95 px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-wider text-text-secondary shadow-sm backdrop-blur-sm">
                Yogyakarta • Online
              </div>
            </div>

            {/* Micro Caption Editorial */}
            <div className="mt-2.5 flex items-center justify-between px-2 py-1 text-[11px] font-body text-text-secondary">
              <span className="font-semibold text-text-primary">
                Fleksibel, Terarah, dan Terakreditasi
              </span>
              <span>100% Berbasis Daring</span>
            </div>
          </div>

          {/* 2. Direktori Program Studi Terpadu */}
          <div
            className="border-2 border-primary/20 bg-surface p-5 sm:p-6 shadow-[4px_4px_0_0_rgba(11,93,59,0.15)] transition-[border-color,shadow] duration-300 hover:border-primary/40"
            aria-label="Direktori Cepat Program Studi PJJ SiberMu"
          >
            {/* Header Direktori */}
            <div className="flex items-center justify-between border-b border-primary/15 pb-3">
              <div>
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                  Direktori Akademik
                </span>
                <h2 className="mt-0.5 font-display text-base sm:text-lg font-medium text-text-primary">
                  6 Program Sarjana S1 PJJ
                </h2>
              </div>
              <span className="border border-primary/20 bg-[#F2F4EF] px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-wider text-primary">
                100% Online
              </span>
            </div>

            {/* Filter Tab Fakultas */}
            <div
              className="mt-3 flex gap-1.5 border-b border-primary/10 pb-2.5"
              role="tablist"
              aria-label="Filter fakultas hero"
            >
              {FACULTY_TABS.map((tab) => {
                const isActive = activeFaculty === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFaculty(tab.id)}
                    className={[
                      'px-3 py-1 text-xs font-body font-semibold tracking-wider transition-colors focus-visible:rounded',
                      isActive
                        ? 'border-b-2 border-primary text-primary font-bold bg-[#F2F4EF]/60'
                        : 'text-text-secondary hover:text-text-primary',
                    ].join(' ')}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Daftar Program */}
            <ul className="mt-2 divide-y divide-primary/10 list-none m-0 p-0" role="list">
              {filteredPrograms.map((prog) => {
                const isHovered = hoveredProgram === prog.id;
                return (
                  <li
                    key={prog.id}
                    onMouseEnter={() => setHoveredProgram(prog.id)}
                    className={[
                      'group/item cursor-pointer py-2.5 px-2 transition-colors duration-150',
                      isHovered ? 'bg-[#F2F4EF]' : 'hover:bg-[#F7F8F4]',
                    ].join(' ')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={[
                            'inline-block w-1 h-3 self-center rounded-sm transition-colors duration-150',
                            isHovered ? 'bg-primary' : 'bg-transparent',
                          ].join(' ')}
                          aria-hidden="true"
                        />
                        <span className="font-display text-sm font-semibold text-text-primary group-hover/item:text-primary transition-colors">
                          {prog.name}
                        </span>
                        <span className="font-body text-[11px] text-text-secondary">
                          ({prog.degree})
                        </span>
                      </div>
                      <span className="font-mono text-[11px] font-semibold text-text-secondary">
                        {prog.sks}
                      </span>
                    </div>

                    {isHovered && (
                      <p className="mt-1 ml-3 font-body text-[11px] leading-relaxed text-text-secondary">
                        Fokus: {prog.focus}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Footer Direktori */}
            <div className="mt-3.5 border-t border-primary/15 pt-2.5 flex items-center justify-between text-[11px] font-body text-text-secondary">
              <span>Kurikulum Kampus Merdeka</span>
              <a
                href="#program"
                className="font-semibold text-primary hover:underline"
              >
                Rincian Kurikulum Lengkap
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
