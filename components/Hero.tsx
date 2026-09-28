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
      // 1. Scroll-reveal per baris headline — clip dari bawah ke atas
      // Alasan: teks reveal per baris lebih editorial daripada opacity polos.
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

      // 3. Parallax halus pada ledger card — memberi kedalaman tanpa mengalihkan
      // Alasan: panel direktori bergerak lebih lambat dari halaman = kedalaman material.
      if (ledgerRef.current) {
        gsap.to(ledgerRef.current, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // 4. Headline subtle opacity scrub saat scroll (anchor visual teks)
      // Alasan: teks besar jadi "kilas pandang" saat user scroll, bukan menghilang tiba-tiba.
      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          opacity: 0.15,
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
      className="relative min-h-[90vh] bg-[#F7F8F4] pt-24 pb-16 md:pt-32 md:pb-24 border-b border-primary/15 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Ambient backdrop: specular light corner — material depth, bukan dekorasi */}
      {/* Alasan: off-white hangat butuh sedikit kedalaman agar tidak tampak rata dan murahan. */}
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
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-[1.1fr_0.9fr] md:gap-14 md:px-10">

        {/* Kolom Kiri: Tipografi Editorial */}
        <div className="flex flex-col justify-center">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-4 hero-line">
            Universitas Siber Muhammadiyah
          </p>

          <h1
            id="hero-heading"
            ref={headlineRef}
            className="leading-[1.1] tracking-tight"
          >
            <div className="overflow-hidden">
              <span className="block hero-line font-display text-[clamp(2.25rem,4.2vw,3.75rem)] font-medium text-text-primary">
                Belajar tanpa batas ruang,
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="block hero-line font-display text-[clamp(2rem,3.8vw,3.25rem)] font-normal italic text-primary">
                ilmu berdaya guna,
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="block hero-line font-display text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium text-text-primary">
                untuk masa depan Anda.
              </span>
            </div>
          </h1>

          <p className="mt-6 max-w-lg font-body text-base leading-relaxed text-text-secondary hero-detail">
            Kuliah Sarjana S1 daring penuh dengan fleksibilitas total. Dirancang bagi Anda yang
            ingin meraih gelar akademik resmi tanpa meninggalkan karier, keluarga, atau pengabdian.
          </p>

          {/* Legalitas — informasional, bukan dekoratif */}
          <dl className="mt-6 grid max-w-lg grid-cols-2 gap-4 border-t border-primary/15 pt-6 hero-detail">
            <div className="border-l-2 border-primary pl-4">
              <dt className="font-body text-[11px] uppercase tracking-[0.1em] text-text-secondary">
                Izin Kemendikbudristek
              </dt>
              <dd className="mt-1 font-body text-sm font-bold text-text-primary">
                SK No. 430/E/O/2021
              </dd>
            </div>
            <div className="border-l-2 border-accent-gold pl-4">
              <dt className="font-body text-[11px] uppercase tracking-[0.1em] text-text-secondary">
                Akreditasi Institusi
              </dt>
              <dd className="mt-1 font-body text-sm font-bold text-text-primary">BAIK (BAN-PT)</dd>
            </div>
          </dl>

          {/* CTA Ganda */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row hero-detail">
            <a
              href={ADMISSIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center bg-primary px-7 py-3.5 font-body text-xs font-bold uppercase tracking-[0.12em] text-surface transition-colors hover:bg-primary-hover focus-visible:rounded"
            >
              Daftar Mahasiswa Baru
            </a>
            <a
              href="#program"
              className="inline-flex min-h-12 items-center justify-center border border-primary/30 bg-surface px-7 py-3.5 font-body text-xs font-bold uppercase tracking-[0.12em] text-primary transition-colors hover:border-primary hover:bg-background focus-visible:rounded"
            >
              Lihat Program Studi
            </a>
          </div>
        </div>

        {/* Kolom Kanan: Direktori Akademik Interaktif */}
        {/* Reflective: border hairline + light sweep on hover via CSS group */}
        <div ref={ledgerRef} className="hero-detail">
          <div
            className="group relative border border-primary/20 bg-surface p-6 sm:p-7 overflow-hidden
                        shadow-[0_4px_24px_-6px_rgba(11,93,59,0.07)]
                        transition-[border-color,shadow] duration-300
                        hover:border-primary/35 hover:shadow-[0_6px_32px_-6px_rgba(11,93,59,0.12)]"
            aria-label="Direktori Cepat Program Studi PJJ SiberMu"
          >
            {/* Specular sheen: light sweep diagonal saat hover — material matte, bukan glow */}
            {/* Alasan: efek material pada surface kartu memberi kesan premium tanpa neon. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-16deg]
                         bg-gradient-to-r from-transparent via-white/40 to-transparent
                         opacity-0 transition-[opacity,transform] duration-700 ease-in-out
                         group-hover:translate-x-[200%] group-hover:opacity-100"
            />

            {/* Header Direktori */}
            <div className="flex items-center justify-between border-b border-primary/15 pb-4">
              <div>
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                  Direktori Akademik
                </span>
                <h2 className="mt-1 font-display text-lg font-medium text-text-primary">
                  6 Program Sarjana S1 PJJ
                </h2>
              </div>
              <span className="border border-primary/20 bg-background px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                100% Online
              </span>
            </div>

            {/* Filter Tab Fakultas */}
            <div
              className="mt-4 flex gap-1.5 border-b border-primary/10 pb-3"
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
                        ? 'border-b-2 border-primary text-primary font-bold'
                        : 'text-text-secondary hover:text-text-primary',
                    ].join(' ')}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Daftar Program */}
            <ul className="mt-4 divide-y divide-primary/10 list-none m-0 p-0" role="list">
              {filteredPrograms.map((prog) => {
                const isHovered = hoveredProgram === prog.id;
                return (
                  <li
                    key={prog.id}
                    onMouseEnter={() => setHoveredProgram(prog.id)}
                    className={[
                      'group/item cursor-pointer py-3 px-2.5 transition-colors duration-150',
                      isHovered ? 'bg-[#F2F4EF]' : 'hover:bg-[#F7F8F4]',
                    ].join(' ')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        {/* Indikator aktif: garis kiri kecil saat hovered */}
                        <span
                          className={[
                            'inline-block w-0.5 self-stretch rounded-full transition-colors duration-150',
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
                      <span className="font-body text-[11px] font-medium text-text-secondary">
                        {prog.sks}
                      </span>
                    </div>

                    {isHovered && (
                      <p className="mt-1.5 ml-3 font-body text-[11px] leading-relaxed text-text-secondary">
                        Fokus: {prog.focus}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Footer Direktori */}
            <div className="mt-5 border-t border-primary/15 pt-3.5 flex items-center justify-between text-[11px] font-body text-text-secondary">
              <span>Kurikulum Kampus Merdeka</span>
              <span className="font-semibold text-primary">Biaya Dapat Dicicil</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
