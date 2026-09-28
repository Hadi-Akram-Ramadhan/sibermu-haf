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
  const [activeFaculty, setActiveFaculty] = useState<FacultyFilter>('ALL');
  const [hoveredProgram, setHoveredProgram] = useState<string>('inf');

  const filteredPrograms =
    activeFaculty === 'ALL'
      ? PROGRAM_PREVIEWS
      : PROGRAM_PREVIEWS.filter((p) => p.faculty === activeFaculty);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;

    registerGsap();

    const ctx = gsap.context(() => {
      // 1. Scroll-reveal per baris headline
      gsap.from('.hero-line', {
        yPercent: 105,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.05,
      });

      // 2. Reveal metadata & CTA stagger setelah headline
      gsap.from('.hero-detail', {
        opacity: 0,
        y: 18,
        duration: 0.65,
        stagger: 0.09,
        ease: 'power2.out',
        delay: 0.45,
      });

      // 3. Parallax halus pada ledger card
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

      // 4. Headline subtle opacity scrub saat scroll
      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          opacity: 0.2,
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
      className="relative min-h-[92vh] bg-[#F7F8F4] pt-24 pb-16 md:pt-32 md:pb-24 border-b border-primary/15 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Ambient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[60%] w-[45%] opacity-[0.04]"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 100% 0%, rgba(11,93,59,1) 0%, transparent 70%)',
        }}
      />

      {/* Strip Telemetri Akademik Resmi */}
      <div className="mx-auto max-w-7xl px-5 pb-8 md:px-10">
        <div className="flex items-center justify-between border-b border-primary/15 pb-3 font-body text-[11px] uppercase tracking-[0.14em] text-text-secondary hero-detail">
          <span>[ SIBERMU • PENDIDIKAN TINGGI JARAK JAUH ]</span>
          <span className="hidden sm:inline-block">Izin Resmi Kemendikbudristek RI</span>
          <span>[ YOGYAKARTA / INDONESIA ]</span>
        </div>
      </div>

      {/* Grid Dua Kolom Editorial */}
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 md:px-10">
        {/* Kolom Kiri: Tipografi Editorial & Value Proposition Kemahasiswaan & AIK */}
        <div className="flex flex-col justify-center pt-2">
          <div className="inline-flex items-center gap-2 mb-3 hero-line">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Biro Kemahasiswaan & Al-Islam Kemuhammadiyahan (AIK)
            </p>
          </div>

          <h1
            id="hero-heading"
            ref={headlineRef}
            className="leading-[1.12] tracking-tight"
          >
            <div className="overflow-hidden">
              <span className="block hero-line font-display text-[clamp(2.1rem,4vw,3.6rem)] font-medium text-text-primary">
                Sinergi Prestasi Mahasiswa,
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="block hero-line font-display text-[clamp(1.9rem,3.6vw,3.1rem)] font-normal italic text-primary">
                Karakter Luhur Berkemajuan,
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="block hero-line font-display text-[clamp(1.7rem,3.1vw,2.6rem)] font-medium text-text-primary">
                Menebar Manfaat di Ruang Siber.
              </span>
            </div>
          </h1>

          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-text-secondary hero-detail">
            Portal terpadu mahasiswa Universitas Siber Muhammadiyah: wahana pembinaan organisasi, eksplorasi minat bakat UKM siber, pemacuan prestasi nasional, layanan mahasiswa responsif, serta penempaan spiritualitas Al-Islam dan Kemuhammadiyahan.
          </p>

          {/* Quick Dual-Pillar Shortcuts */}
          <div className="mt-4 flex flex-wrap gap-2 hero-detail">
            <a
              href="#kemahasiswaan"
              className="inline-flex items-center gap-1.5 border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono font-bold uppercase tracking-[0.08em] text-primary hover:bg-primary hover:text-surface transition-colors"
            >
              <span>› Pilar Kemahasiswaan</span>
            </a>
            <a
              href="#aik"
              className="inline-flex items-center gap-1.5 border border-accent-gold/40 bg-accent-gold/15 px-3 py-1 text-xs font-mono font-bold uppercase tracking-[0.08em] text-accent-gold hover:bg-accent-gold hover:text-background transition-colors"
            >
              <span>› Pilar Al-Islam & AIK</span>
            </a>
            <a
              href="#layanan"
              className="inline-flex items-center gap-1.5 border border-primary/30 bg-surface px-3 py-1 text-xs font-mono font-semibold uppercase tracking-[0.08em] text-text-secondary hover:text-primary transition-colors"
            >
              <span>› Layanan Mahasiswa</span>
            </a>
          </div>

          {/* Legalitas Resmi Terverifikasi */}
          <dl className="mt-6 grid max-w-lg grid-cols-2 gap-4 border-t border-primary/15 pt-5 hero-detail">
            <div className="border-l-2 border-primary pl-4 bg-surface/50 py-2">
              <dt className="font-body text-[11px] uppercase tracking-[0.1em] text-text-secondary">
                Izin Kemendikbudristek
              </dt>
              <dd className="mt-1 font-body text-sm font-bold text-text-primary">
                SK No. 430/E/O/2021
              </dd>
            </div>
            <div className="border-l-2 border-accent-gold pl-4 bg-surface/50 py-2">
              <dt className="font-body text-[11px] uppercase tracking-[0.1em] text-text-secondary">
                Akreditasi Institusi
              </dt>
              <dd className="mt-1 font-body text-sm font-bold text-text-primary">BAIK (BAN-PT)</dd>
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

          <p className="mt-4 font-body text-xs text-text-secondary hero-detail flex items-center gap-2">
            <span className="font-mono text-primary font-semibold">[i]</span>
            Biaya kuliah transparan dapat dicicil per semester tanpa pungutan gedung tambahan.
          </p>
        </div>

        {/* Kolom Kanan: Editorial Showcase (Fotografi Mahasiswa PJJ + Direktori Terintegrasi) */}
        <div ref={ledgerRef} className="hero-detail flex flex-col gap-5">
          {/* 1. Frame Fotografi Mahasiswa PJJ SiberMu */}
          <div className="group relative border-2 border-primary/20 bg-surface p-2.5 shadow-[6px_6px_0_0_#0B5D3B] transition-all duration-300 hover:shadow-[8px_8px_0_0_#0B5D3B]">
            {/* Corner Crosshairs Tactile Editorial */}
            <span className="absolute -top-1.5 -left-1.5 font-mono text-xs font-bold text-primary select-none" aria-hidden="true">+</span>
            <span className="absolute -top-1.5 -right-1.5 font-mono text-xs font-bold text-primary select-none" aria-hidden="true">+</span>
            <span className="absolute -bottom-1.5 -left-1.5 font-mono text-xs font-bold text-primary select-none" aria-hidden="true">+</span>
            <span className="absolute -bottom-1.5 -right-1.5 font-mono text-xs font-bold text-primary select-none" aria-hidden="true">+</span>

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
              <div className="absolute top-3 left-3 flex items-center gap-2 border border-primary/20 bg-surface/95 px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-wider text-text-primary shadow-sm backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span>Pendidikan Jarak Jauh (PJJ)</span>
              </div>

              <div className="absolute bottom-3 right-3 border border-primary/20 bg-surface/95 px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-wider text-text-secondary shadow-sm backdrop-blur-sm">
                [ Yogyakarta / Online ]
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
