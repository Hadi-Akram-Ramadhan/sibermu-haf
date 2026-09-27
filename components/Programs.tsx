'use client';

import { useState } from 'react';

interface Program {
  name: string;
  degree: string;
  faculty: 'FTIK' | 'FBH';
  description: string;
  focus: string[];
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
    faculty: 'FTIK',
    description:
      'Pengembangan perangkat lunak, arsitektur komputasi awan, dan kecerdasan buatan terapan berbasis proyek nyata.',
    focus: ['Rekayasa Perangkat Lunak', 'Kecerdasan Buatan', 'Cloud Computing'],
  },
  {
    name: 'Sistem Informasi',
    degree: 'S1 (PJJ)',
    faculty: 'FTIK',
    description:
      'Menghubungkan strategi bisnis dengan solusi teknologi informasi, analitik data, dan tata kelola sistem digital.',
    focus: ['Analitik Data Bisnis', 'Manajemen Proyek TI', 'Tata Kelola Digital'],
  },
  {
    name: 'Administrasi Kesehatan',
    degree: 'S1 (PJJ)',
    faculty: 'FTIK',
    description:
      'Manajemen layanan kesehatan modern, sistem informasi rekam medis, dan kebijakan kesehatan masyarakat.',
    focus: ['Manajemen Faskes', 'Sistem Informasi Medis', 'Kebijakan Kesehatan'],
  },
  {
    name: 'Hukum',
    degree: 'S1 (PJJ)',
    faculty: 'FBH',
    description:
      'Memadukan pemahaman hukum positif Indonesia dengan prinsip hukum Islam, mencetak sarjana hukum yang berintegritas.',
    focus: ['Hukum Siber & Bisnis', 'Hukum Islam Terapan', 'Advokasi & Litigasi'],
  },
  {
    name: 'Manajemen',
    degree: 'S1 (PJJ)',
    faculty: 'FBH',
    description:
      'Kepemimpinan bisnis, strategi pemasaran digital, inovasi kewirausahaan, dan tata kelola perusahaan berkelanjutan.',
    focus: ['Pemasaran Digital', 'Manajemen Keuangan', 'Kewirausahaan Berkelanjutan'],
  },
  {
    name: 'Akuntansi',
    degree: 'S1 (PJJ)',
    faculty: 'FBH',
    description:
      'Akuntansi keuangan digital, audit sistem informasi, perpajakan, dan pelaporan keuangan entitas syariah maupun publik.',
    focus: ['Akuntansi Forensik & Audit', 'Perpajakan Digital', 'Akuntansi Syariah'],
  },
];

export default function Programs() {
  const [selectedFaculty, setSelectedFaculty] = useState<string>('ALL');

  const filteredPrograms =
    selectedFaculty === 'ALL'
      ? PROGRAMS
      : PROGRAMS.filter((p) => p.faculty === selectedFaculty);

  return (
    <section
      id="program"
      aria-labelledby="programs-heading"
      className="bg-surface py-section border-b border-primary/10"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Program Sarjana PJJ
            </p>
            <h2
              id="programs-heading"
              className="font-display text-display-xl font-medium text-text-primary"
            >
              Enam jalur ilmu, satu komitmen kualitas.
            </h2>
          </div>
          <p className="max-w-md font-body text-base leading-relaxed text-text-secondary">
            Semua program studi diselenggarakan secara daring penuh dengan kurikulum yang diakui pemerintah dan Persyarikatan Muhammadiyah.
          </p>
        </div>

        {/* Tab filter fakultas dengan keyboard navigation */}
        <div
          role="tablist"
          aria-label="Filter fakultas"
          className="mt-12 flex flex-wrap gap-2 border-b border-primary/10 pb-4"
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
                  'px-4 py-2 text-sm font-body font-medium transition-colors focus-visible:rounded',
                  active
                    ? 'border-b-2 border-primary text-primary font-semibold'
                    : 'text-text-secondary hover:text-text-primary',
                ].join(' ')}
              >
                {fac.label}
              </button>
            );
          })}
        </div>

        {/* Grid kartu program studi non-templated: kartu tidak berbentuk seragam AI */}
        <div
          id="programs-grid"
          role="tabpanel"
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredPrograms.map((prog, index) => (
            <article
              key={prog.name}
              className="group flex flex-col justify-between border border-primary/15 bg-background p-7 transition-colors hover:border-primary/40 focus-within:border-primary"
            >
              <div>
                <div className="flex items-baseline justify-between border-b border-primary/10 pb-4">
                  <span className="font-body text-xs font-semibold tracking-wider text-text-secondary uppercase">
                    {prog.degree}
                  </span>
                  <span className="font-body text-xs text-text-secondary">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-medium text-text-primary group-hover:text-primary transition-colors">
                  {prog.name}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary">
                  {prog.description}
                </p>
              </div>

              <div className="mt-8 border-t border-primary/10 pt-4">
                <p className="font-body text-xs font-semibold tracking-wide uppercase text-text-primary mb-2">
                  Fokus Pembelajaran
                </p>
                <ul className="m-0 p-0 list-none flex flex-wrap gap-1.5" role="list">
                  {prog.focus.map((f) => (
                    <li
                      key={f}
                      className="border border-primary/15 bg-surface px-2.5 py-1 font-body text-xs text-text-secondary"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
