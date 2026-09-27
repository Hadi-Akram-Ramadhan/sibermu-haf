'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion, registerGsap } from '@/lib/gsap';

const ADMISSIONS_URL = process.env.NEXT_PUBLIC_ADMISSIONS_URL ?? 'https://admissions.sibermu.ac.id/';

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

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);
  const [activeFaculty, setActiveFaculty] = useState<'ALL' | 'FTIK' | 'FBH'>('ALL');
  const [hoveredProgram, setHoveredProgram] = useState<string>('inf');

  const filteredPrograms =
    activeFaculty === 'ALL'
      ? PROGRAM_PREVIEWS
      : PROGRAM_PREVIEWS.filter((p) => p.faculty === activeFaculty);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;

    registerGsap();

    const context = gsap.context(() => {
      // Parallax scroll halus untuk panel direktori program
      if (ledgerRef.current) {
        gsap.to(ledgerRef.current, {
          y: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }

      // Stagger reveal untuk headline editorial
      gsap.from('.hero-line', {
        yPercent: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.1,
      });

      // Stagger detail metadata
      gsap.from('.hero-detail', {
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 0.45,
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-[90vh] bg-[#F7F8F4] pt-24 pb-16 md:pt-32 md:pb-24 border-b border-primary/15"
      aria-labelledby="hero-heading"
    >
      {/* Strip Telemetry Akademik Resmi */}
      <div className="mx-auto max-w-7xl px-5 pb-8 md:px-10">
        <div className="flex items-center justify-between border-b border-primary/15 pb-3 font-body text-[11px] uppercase tracking-[0.14em] text-text-secondary hero-detail">
          <span>[ SIBERMU • PENDIDIKAN TINGGI JARAK JAUH ]</span>
          <span className="hidden sm:inline-block">Izin Resmi Kemendikbudristek RI</span>
          <span>[ YOGYAKARTA / INDONESIA ]</span>
        </div>
      </div>

      {/* Grid Dua Kolom Editorial */}
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-[1.1fr_0.9fr] md:gap-14 md:px-10">
        {/* Kolom Kiri: Tipografi Elegan & Proporsional */}
        <div className="flex flex-col justify-center">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-4 hero-line">
            Universitas Siber Muhammadiyah
          </p>

          <h1 id="hero-heading" className="leading-[1.1] tracking-tight">
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
            Kuliah Sarjana S1 daring penuh dengan fleksibilitas total. Dirancang bagi Anda yang ingin meraih gelar akademik resmi tanpa meninggalkan karier, keluarga, atau pengabdian.
          </p>

          {/* Legalitas Status */}
          <dl className="mt-6 grid max-w-lg grid-cols-2 gap-4 border-t border-primary/15 pt-6 hero-detail">
            <div className="border-l-2 border-primary pl-4">
              <dt className="font-body text-[11px] uppercase tracking-[0.1em] text-text-secondary">Izin Kemendikbudristek</dt>
              <dd className="mt-1 font-body text-sm font-bold text-text-primary">SK No. 430/E/O/2021</dd>
            </div>
            <div className="border-l-2 border-accent-gold pl-4">
              <dt className="font-body text-[11px] uppercase tracking-[0.1em] text-text-secondary">Akreditasi Institusi</dt>
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

        {/* Kolom Kanan: Direktori Akademik Interaktif (Pengganti Foto Distraktif & Tanpa Fake Terminal) */}
        <div ref={ledgerRef} className="hero-detail">
          <div
            className="border border-primary/20 bg-surface p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(11,93,59,0.08)] transition-all duration-200"
            aria-label="Direktori Cepat Program Studi PJJ SiberMu"
          >
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
            <div className="mt-4 flex gap-1.5 border-b border-primary/10 pb-3" role="tablist" aria-label="Filter fakultas hero">
              {(
                [
                  { id: 'ALL', label: 'Semua' },
                  { id: 'FTIK', label: 'Teknologi & Kes.' },
                  { id: 'FBH', label: 'Bisnis & Hum.' },
                ] as const
              ).map((tab) => {
                const isActive = activeFaculty === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFaculty(tab.id)}
                    className={[
                      'px-3 py-1 text-xs font-body font-semibold tracking-wider transition-colors',
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

            {/* Daftar Program Interaktif */}
            <ul className="mt-4 divide-y divide-primary/10 list-none m-0 p-0" role="list">
              {filteredPrograms.map((prog) => {
                const isHovered = hoveredProgram === prog.id;
                return (
                  <li
                    key={prog.id}
                    onMouseEnter={() => setHoveredProgram(prog.id)}
                    className={[
                      'group cursor-pointer py-3 px-2.5 transition-colors duration-150',
                      isHovered ? 'bg-[#F7F8F4]' : 'hover:bg-[#FAFAF7]',
                    ].join(' ')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
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

                    {/* Detail Fokus yang Muncul pada Program yang Sedang Disorot */}
                    {isHovered && (
                      <p className="mt-1.5 font-body text-[11px] leading-relaxed text-text-secondary">
                        Fokus: {prog.focus}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Footer Direktori: Kepastian Akreditasi */}
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
