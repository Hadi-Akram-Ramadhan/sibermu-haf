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
      'Pengembangan perangkat lunak modern, arsitektur komputasi awan, dan kecerdasan buatan terapan berbasis proyek nyata.',
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
      'Menghubungkan strategi bisnis dengan solusi teknologi informasi, analitika data, dan tata kelola sistem digital perusahaan.',
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
      'Manajemen tata kelola fasilitas layanan kesehatan modern, sistem informasi rekam medis, dan kepemimpinan klinis.',
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
      'Memadukan keahlian hukum positif Indonesia, hukum siber kontemporer, dan prinsip moral keadilan berkemajuan.',
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
      'Kepemimpinan strategis, akselerasi pemasaran digital, inovasi kewirausahaan, dan tata kelola organisasi berkelanjutan.',
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
      'Akuntansi keuangan digital, audit sistem informasi, perpajakan mutakhir, serta tata kelola keuangan entitas syariah dan publik.',
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
      className="bg-[#FAFAF7] py-section border-b border-primary/15"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {/* Header Section */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between border-b border-primary/15 pb-8">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-3">
              Program Sarjana S1 PJJ
            </p>
            <h2
              id="programs-heading"
              className="font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-medium text-text-primary leading-tight"
            >
              Enam jalur keilmuan, <span className="italic text-primary font-normal">satu standar mutu akademik.</span>
            </h2>
          </div>
          <p className="max-w-md font-body text-sm leading-relaxed text-text-secondary">
            Semua program studi diselenggarakan secara daring penuh dengan kurikulum yang diakui pemerintah dan Persyarikatan Muhammadiyah.
          </p>
        </div>

        {/* Tab filter fakultas */}
        <div
          role="tablist"
          aria-label="Filter fakultas"
          className="mt-8 flex flex-wrap gap-2 border-b border-primary/10 pb-4"
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
                  'px-4 py-2 text-xs font-body font-semibold uppercase tracking-[0.12em] transition-colors focus-visible:rounded',
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

        {/* Grid kartu program studi */}
        <div
          id="programs-grid"
          role="tabpanel"
          className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredPrograms.map((prog) => (
            <article
              key={prog.name}
              className="group relative flex flex-col justify-between border border-primary/15 bg-surface p-7 transition-colors duration-150 hover:border-primary focus-within:border-primary"
            >
              <div>
                <div className="flex items-center justify-between border-b border-primary/10 pb-3.5">
                  <span className="font-mono text-xs font-semibold text-accent-gold">
                    {prog.code}
                  </span>
                  <span className="border border-primary/20 bg-background px-2 py-0.5 font-body text-[11px] font-semibold text-primary">
                    {prog.degree}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-xl sm:text-2xl font-medium text-text-primary transition-colors group-hover:text-primary">
                  {prog.name}
                </h3>
                <p className="mt-2.5 font-body text-xs sm:text-sm leading-relaxed text-text-secondary">
                  {prog.description}
                </p>
              </div>

              <div className="mt-6 border-t border-primary/10 pt-4">
                <div className="mb-3 flex items-center justify-between text-xs font-body text-text-secondary">
                  <span>Beban: <strong className="text-text-primary font-mono">{prog.credits}</strong></span>
                  <span>Gelar: <strong className="text-primary font-semibold">{prog.titleDegree}</strong></span>
                </div>

                <ul className="m-0 mb-4 flex flex-wrap gap-1.5 p-0 list-none" role="list">
                  {prog.focus.map((f) => (
                    <li
                      key={f}
                      className="border border-primary/10 bg-background px-2.5 py-1 font-body text-[11px] text-text-secondary"
                    >
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => setActiveBlueprint(prog)}
                  className="w-full border border-primary/30 bg-transparent py-2.5 font-body text-xs font-bold uppercase tracking-[0.12em] text-primary transition-colors hover:bg-primary hover:text-surface focus-visible:rounded"
                >
                  Detail Kurikulum dan Karier
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Blueprint Detail Modal Dialog */}
      {activeBlueprint && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="blueprint-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-text-primary/60 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-2xl border-2 border-primary bg-surface p-6 sm:p-9 shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveBlueprint(null)}
              aria-label="Tutup detail kurikulum"
              className="absolute top-5 right-5 border border-primary/20 px-3 py-1 font-body text-xs font-bold text-text-secondary transition-colors hover:bg-primary hover:text-surface focus-visible:rounded"
            >
              ✕ TUTUP
            </button>

            <span className="font-mono text-xs font-semibold text-accent-gold uppercase tracking-wider">
              {activeBlueprint.code} • {activeBlueprint.degree}
            </span>
            <h3 id="blueprint-title" className="mt-1 font-display text-2xl sm:text-3xl font-medium text-text-primary">
              S1 PJJ {activeBlueprint.name}
            </h3>
            <p className="mt-1 font-body text-xs text-text-secondary">
              {activeBlueprint.facultyFull}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-4 border-y border-primary/10 py-4 font-body text-xs">
              <div className="border border-primary/10 bg-background p-3">
                <span className="text-text-secondary block">Beban Studi Total</span>
                <strong className="text-sm text-text-primary font-mono">{activeBlueprint.credits}</strong>
              </div>
              <div className="border border-primary/10 bg-background p-3">
                <span className="text-text-secondary block">Gelar Akademik</span>
                <strong className="text-sm text-primary">{activeBlueprint.titleDegree}</strong>
              </div>
            </div>

            <div className="mt-5">
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-primary mb-2.5">
                Peluang Profesi & Prospek Karier Lulusan:
              </p>
              <div className="flex flex-wrap gap-2">
                {activeBlueprint.career.map((c) => (
                  <span
                    key={c}
                    className="border border-primary/20 bg-background px-3 py-1 font-body text-xs text-text-primary font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-7 flex gap-3">
              <a
                href={process.env.NEXT_PUBLIC_ADMISSIONS_URL ?? 'https://admissions.sibermu.ac.id/'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-primary py-3 text-center font-body text-xs font-bold uppercase tracking-[0.12em] text-surface transition-colors hover:bg-primary-hover focus-visible:rounded"
              >
                Daftar Program Studi Ini
              </a>
              <button
                type="button"
                onClick={() => setActiveBlueprint(null)}
                className="border border-primary/30 px-5 py-3 font-body text-xs font-semibold uppercase tracking-[0.12em] text-text-primary transition-colors hover:bg-background focus-visible:rounded"
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
