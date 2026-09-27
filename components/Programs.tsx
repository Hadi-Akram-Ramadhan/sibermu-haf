'use client';

import { useEffect, useState } from 'react';

interface Program {
  name: string;
  degree: string;
  code: string;
  credits: string;
  titleDegree: string;
  faculty: 'FTIK' | 'FBH';
  facultyFull: string;
  description: string;
  focus: string[];
  career: string[];
}

const FACULTIES = [
  { id: 'ALL', label: 'Semua Program Studi' },
  { id: 'FTIK', label: 'Teknologi & Ilmu Kesehatan' },
  { id: 'FBH', label: 'Bisnis & Humaniora' },
] as const;

const PROGRAMS: Program[] = [
  {
    name: 'Informatika',
    degree: 'S1 (PJJ)',
    code: 'INF-PJJ',
    credits: '144 SKS',
    titleDegree: 'S.Kom.',
    faculty: 'FTIK',
    facultyFull: 'Fakultas Teknologi dan Ilmu Kesehatan',
    description:
      'Pengembangan perangkat lunak, arsitektur komputasi awan, dan kecerdasan buatan terapan berbasis proyek nyata.',
    focus: ['Rekayasa Perangkat Lunak', 'Kecerdasan Buatan', 'Cloud Computing'],
    career: ['Software Engineer', 'AI Specialist', 'Cloud Architect'],
  },
  {
    name: 'Sistem Informasi',
    degree: 'S1 (PJJ)',
    code: 'SI-PJJ',
    credits: '144 SKS',
    titleDegree: 'S.Kom.',
    faculty: 'FTIK',
    facultyFull: 'Fakultas Teknologi dan Ilmu Kesehatan',
    description:
      'Menghubungkan strategi bisnis dengan solusi teknologi informasi, analitik data, dan tata kelola sistem digital.',
    focus: ['Analitik Data Bisnis', 'Manajemen Proyek TI', 'Tata Kelola Digital'],
    career: ['Business Analyst', 'Data Analyst', 'IT Project Manager'],
  },
  {
    name: 'Administrasi Kesehatan',
    degree: 'S1 (PJJ)',
    code: 'ADMKES-PJJ',
    credits: '144 SKS',
    titleDegree: 'S.Kes.',
    faculty: 'FTIK',
    facultyFull: 'Fakultas Teknologi dan Ilmu Kesehatan',
    description:
      'Manajemen layanan kesehatan modern, sistem informasi rekam medis, dan kebijakan kesehatan masyarakat.',
    focus: ['Manajemen Faskes', 'Sistem Informasi Medis', 'Kebijakan Kesehatan'],
    career: ['Administrator RS/Klinik', 'Health Data Officer', 'Analis Kebijakan Faskes'],
  },
  {
    name: 'Hukum',
    degree: 'S1 (PJJ)',
    code: 'HKM-PJJ',
    credits: '144 SKS',
    titleDegree: 'S.H.',
    faculty: 'FBH',
    facultyFull: 'Fakultas Bisnis dan Humaniora',
    description:
      'Memadukan pemahaman hukum positif Indonesia dengan prinsip hukum Islam, mencetak sarjana hukum yang berintegritas.',
    focus: ['Hukum Siber & Bisnis', 'Hukum Islam Terapan', 'Advokasi & Litigasi'],
    career: ['Legal Consultant', 'Corporate Counsel', 'Advokat / Praktisi Hukum'],
  },
  {
    name: 'Manajemen',
    degree: 'S1 (PJJ)',
    code: 'MNJ-PJJ',
    credits: '144 SKS',
    titleDegree: 'S.M.',
    faculty: 'FBH',
    facultyFull: 'Fakultas Bisnis dan Humaniora',
    description:
      'Kepemimpinan bisnis, strategi pemasaran digital, inovasi kewirausahaan, dan tata kelola perusahaan berkelanjutan.',
    focus: ['Pemasaran Digital', 'Manajemen Keuangan', 'Kewirausahaan Berkelanjutan'],
    career: ['Business Development', 'Marketing Strategist', 'Wirausahawan Digital'],
  },
  {
    name: 'Akuntansi',
    degree: 'S1 (PJJ)',
    code: 'AKT-PJJ',
    credits: '144 SKS',
    titleDegree: 'S.Akun.',
    faculty: 'FBH',
    facultyFull: 'Fakultas Bisnis dan Humaniora',
    description:
      'Akuntansi keuangan digital, audit sistem informasi, perpajakan, dan pelaporan keuangan entitas syariah maupun publik.',
    focus: ['Akuntansi Forensik & Audit', 'Perpajakan Digital', 'Akuntansi Syariah'],
    career: ['Auditor Independen', 'Tax Consultant', 'Financial Controller'],
  },
];

export default function Programs() {
  const [selectedFaculty, setSelectedFaculty] = useState<string>('ALL');
  const [activeBlueprint, setActiveBlueprint] = useState<Program | null>(null);

  const filteredPrograms =
    selectedFaculty === 'ALL'
      ? PROGRAMS
      : PROGRAMS.filter((p) => p.faculty === selectedFaculty);

  useEffect(() => {
    if (!activeBlueprint) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveBlueprint(null);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [activeBlueprint]);

  return (
    <section
      id="program"
      aria-labelledby="programs-heading"
      className="bg-surface py-section border-b border-primary/20"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="mb-6 flex items-center justify-between border-b border-primary/15 pb-3 font-body text-[11px] uppercase tracking-[0.14em] text-text-secondary">
          <span>[ 02 / Program Studi ]</span>
          <span className="hidden sm:inline">Pendidikan Jarak Jauh S1</span>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="programs-heading"
              className="font-display text-[clamp(2.4rem,5vw,4.5rem)] font-medium text-text-primary leading-[1.05]"
            >
              Enam jalur ilmu, <span className="italic text-primary font-normal">satu standar mutu.</span>
            </h2>
          </div>
          <p className="max-w-md font-body text-base leading-relaxed text-text-secondary">
            Semua program studi diselenggarakan secara daring penuh dengan kurikulum yang diakui pemerintah dan Persyarikatan Muhammadiyah.
          </p>
        </div>

        {/* Tab filter fakultas */}
        <div
          role="tablist"
          aria-label="Filter fakultas"
          className="mt-12 flex flex-wrap gap-2 border-b border-primary/15 pb-4"
        >
          {FACULTIES.map((fac) => {
            const active = selectedFaculty === fac.id;
            return (
              <button
                key={fac.id}
                role="tab"
                type="button"
                aria-selected={active}
                aria-controls="programs-grid"
                onClick={() => setSelectedFaculty(fac.id)}
                className={[
                  'px-4 py-2 text-xs font-body uppercase tracking-[0.12em] transition-colors focus-visible:rounded',
                  active
                    ? 'border-b-2 border-primary text-primary font-bold'
                    : 'text-text-secondary hover:text-text-primary',
                ].join(' ')}
              >
                {fac.label}
              </button>
            );
          })}
        </div>

        {/* Grid kartu program studi dengan Physical Materiality (Awwwards SOTD deck) */}
        <div
          id="programs-grid"
          role="tabpanel"
          className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredPrograms.map((prog, index) => (
            <article
              key={prog.name}
              className="group relative flex flex-col justify-between border border-primary/20 bg-surface p-7 transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-[0_8px_20px_-4px_rgba(11,93,59,0.12)] focus-within:border-primary"
            >

              <div>
                <div className="flex items-baseline justify-between border-b border-primary/10 pb-4">
                  <span className="font-body text-xs font-semibold tracking-wider text-accent-gold uppercase">
                    [ {prog.degree} ]
                  </span>
                  <span className="font-body text-xs font-semibold text-text-secondary">
                    ( 0{index + 1} )
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-medium text-text-primary group-hover:text-primary transition-colors">
                  {prog.name}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary">
                  {prog.description}
                </p>
              </div>

              <div className="mt-8 border-t border-primary/10 pt-5">
                <div className="flex items-center justify-between mb-3 text-[11px] font-body text-text-secondary">
                  <span>Beban: <strong className="text-text-primary">{prog.credits}</strong></span>
                  <span>Gelar: <strong className="text-primary font-semibold">{prog.titleDegree}</strong></span>
                </div>

                <ul className="m-0 p-0 list-none flex flex-wrap gap-1.5 mb-5" role="list">
                  {prog.focus.map((f) => (
                    <li
                      key={f}
                      className="border border-primary/20 bg-surface px-2.5 py-1 font-body text-xs text-text-secondary"
                    >
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => setActiveBlueprint(prog)}
                  className="w-full border border-primary/30 bg-transparent py-2.5 font-body text-xs font-semibold uppercase tracking-[0.12em] text-primary transition-colors hover:bg-primary hover:text-surface focus-visible:rounded"
                >
                  Detail Kurikulum dan Karier
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Blueprint Detail Modal / Drawer */}
      {activeBlueprint && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="blueprint-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-text-primary/60 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-2xl border-2 border-primary bg-surface p-7 sm:p-10 shadow-[8px_8px_0_0_#0B5D3B]">
            <button
              type="button"
              onClick={() => setActiveBlueprint(null)}
              aria-label="Tutup detail kurikulum"
              className="absolute top-4 right-4 border border-primary/30 p-2 font-body text-xs font-bold text-text-primary hover:bg-primary hover:text-surface transition-colors focus-visible:rounded"
            >
              ✕ TUTUP
            </button>

            <span className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-gold">
              [ {activeBlueprint.code} • {activeBlueprint.degree} ]
            </span>
            <h3 id="blueprint-title" className="mt-2 font-display text-3xl font-medium text-text-primary">
              S1 PJJ {activeBlueprint.name}
            </h3>
            <p className="mt-1 font-body text-xs text-text-secondary">
              {activeBlueprint.facultyFull}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 border-y border-primary/15 py-4 font-body text-xs">
              <div>
                <span className="text-text-secondary block">Beban Studi Total</span>
                <strong className="text-sm text-text-primary">{activeBlueprint.credits}</strong>
              </div>
              <div>
                <span className="text-text-secondary block">Gelar Akademik</span>
                <strong className="text-sm text-primary">{activeBlueprint.titleDegree}</strong>
              </div>
            </div>

            <div className="mt-6">
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-primary mb-2">
                Peluang Profesi & Karier Lulusan
              </p>
              <div className="flex flex-wrap gap-2">
                {activeBlueprint.career.map((c) => (
                  <span key={c} className="border border-primary/20 bg-background px-3 py-1 font-body text-xs text-text-primary">
                    ✓ {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <a
                href={process.env.NEXT_PUBLIC_ADMISSIONS_URL ?? 'https://admissions.sibermu.ac.id/'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-primary py-3 text-center font-body text-xs font-semibold uppercase tracking-[0.12em] text-surface hover:bg-primary-hover transition-colors focus-visible:rounded"
              >
                Daftar Program Studi Ini
              </a>
              <button
                type="button"
                onClick={() => setActiveBlueprint(null)}
                className="border border-primary/30 px-5 py-3 font-body text-xs font-semibold uppercase tracking-[0.12em] text-text-primary hover:bg-background transition-colors focus-visible:rounded"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
