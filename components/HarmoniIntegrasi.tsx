'use client';

import { useState } from 'react';

interface LinkItem {
  id: string;
  pillKemahasiswaan: string;
  pillAik: string;
  synergyTitle: string;
  description: string;
  quote: string;
  metric: string;
}

const SYNERGY_NODES: LinkItem[] = [
  {
    id: 'syn-1',
    pillKemahasiswaan: 'Organisasi Mahasiswa (BEM, DPM, IMM)',
    pillAik: 'Etika Kepemimpinan Profetik & Musyawarah',
    synergyTitle: 'Tata Kelola Digital Amanah & Transparan',
    description:
      'Organisasi mahasiswa SiberMu tidak terjebak dalam politik praktis kampus, melainkan menjadi laboratorium pengabdian yang dipandu oleh sifat Siddiq, Amanah, Tabligh, dan Fathanah dalam tata kelola virtual.',
    quote: 'Kepemimpinan di ruang siber adalah amanah publik yang diawasi oleh Allah SWT dan konstitusi organisasi.',
    metric: '100% Laporan Keuangan Ormawa Terbuka Digital',
  },
  {
    id: 'syn-2',
    pillKemahasiswaan: 'UKM Riset, AI & Cyber Security Lab',
    pillAik: 'Semangat Tajdid & Etika Ilmu Pengetahuan',
    synergyTitle: 'Kecerdasan Buatan & Komputasi Beradab',
    description:
      'Setiap baris kode, arsitektur machine learning, dan audit kerentanan cyber yang dikembangkan mahasiswa SiberMu wajib berorientasi pada kemaslahatan manusia (mashlahah \'ammah) serta perlindungan privasi.',
    quote: 'Teknologi siber adalah instrumen tajdid untuk memuliakan harkat kemanusiaan, bukan memperdayainya.',
    metric: 'Zero-Exploit Ethical Code Conduct',
  },
  {
    id: 'syn-3',
    pillKemahasiswaan: 'Torehan Prestasi & Kompetisi Nasional',
    pillAik: 'Integritas Tauhid & Nilai Syukur',
    synergyTitle: 'Kemenangan Tanpa Kompromi Integritas',
    description:
      'Dalam hackathon, MTQ, lomba debat, maupun business plan, mahasiswa SiberMu menjunjung kejujuran mutlak, menghindari plagiarisme, serta menjadikan kemenangan sebagai sarana dakwah bil qalam.',
    quote: 'Juara sejati adalah mereka yang ilmunya meninggikan derajat takwa dan memberi solusi bagi problem nyata bangsa.',
    metric: '100% Karya Orisinal Berbasis Etika Akademik',
  },
  {
    id: 'syn-4',
    pillKemahasiswaan: 'Layanan Mahasiswa & Beasiswa',
    pillAik: 'Praksis Fiqih Al-Ma\'un & Solidaritas Sosial',
    synergyTitle: 'Inklusivitas & Pendampingan Tanpa Sekat',
    description:
      'Layanan konseling mental gratis, beasiswa kader daerah tertinggal (3T), serta pendampingan difabel diwujudkan sebagai aplikasi nyata teologi Al-Ma\'un KH Ahmad Dahlan dalam ekosistem kampus digital.',
    quote: 'Tidak ada mahasiswa yang tertinggal hanya karena kendala geografis, ekonomi, atau keterbatasan fisik.',
    metric: 'Jangkauan Mahasiswa di 38 Provinsi & Luar Negeri',
  },
];

export default function HarmoniIntegrasi() {
  const [activeId, setActiveId] = useState<string>('syn-1');
  const activeNode = SYNERGY_NODES.find((n) => n.id === activeId) ?? SYNERGY_NODES[0];

  return (
    <section
      className="relative bg-background py-20 px-5 md:px-10 border-b border-primary/15"
      aria-label="Harmoni Integrasi Kemahasiswaan dan AIK"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 border border-primary/25 bg-surface px-3 py-1 text-xs font-mono uppercase tracking-[0.14em] text-primary mb-4 shadow-[2px_2px_0_0_#0B5D3B]">
            <span>Harmoni Dwitunggal</span>
            <span>•</span>
            <span>Integrasi Satu Halaman</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-text-primary">
            Sinergi Kemahasiswaan & Al-Islam Kemuhammadiyahan
          </h2>
          <p className="mt-4 font-body text-base text-text-secondary leading-relaxed">
            Kedua pilar tidak berjalan sendiri-sendiri. Nilai-nilai Al-Islam dan Kemuhammadiyahan (AIK) menjadi kompas moral dan ruh spiritual yang menjiwai seluruh denyut aktivitas kemahasiswaan SiberMu.
          </p>
        </div>

        {/* Interactive Matrix Showcase */}
        <div className="grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Navigation nodes (left) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {SYNERGY_NODES.map((node) => {
              const isSelected = node.id === activeId;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveId(node.id)}
                  className={[
                    'text-left p-5 border transition-all duration-200 relative',
                    isSelected
                      ? 'border-primary bg-surface shadow-[5px_5px_0_0_#0B5D3B] -translate-x-1'
                      : 'border-primary/20 bg-surface/50 hover:bg-surface hover:border-primary/50 text-text-secondary',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.1em] text-accent-gold mb-1 font-semibold">
                    <span>{node.pillKemahasiswaan.split('(')[0]}</span>
                    <span>⟷</span>
                    <span>AIK</span>
                  </div>
                  <h3
                    className={[
                      'font-display text-base sm:text-lg font-bold transition-colors',
                      isSelected ? 'text-primary' : 'text-text-primary',
                    ].join(' ')}
                  >
                    {node.synergyTitle}
                  </h3>
                  <div className="mt-2 text-xs font-mono text-text-muted">
                    {node.metric}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Deep dive details (right) */}
          <div className="lg:col-span-7 flex flex-col justify-between border-2 border-primary bg-surface p-7 sm:p-9 shadow-[8px_8px_0_0_#0B5D3B]">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary/15 pb-4 mb-6">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-text-muted block">
                    Pilar Kemahasiswaan
                  </span>
                  <span className="font-mono text-sm font-bold text-text-primary">
                    {activeNode.pillKemahasiswaan}
                  </span>
                </div>
                <div className="sm:text-right">
                  <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-accent-gold block">
                    Ruh Al-Islam & Kemuhammadiyahan
                  </span>
                  <span className="font-mono text-sm font-bold text-primary">
                    {activeNode.pillAik}
                  </span>
                </div>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
                {activeNode.synergyTitle}
              </h3>

              <p className="mt-4 font-body text-base text-text-secondary leading-relaxed">
                {activeNode.description}
              </p>

              <div className="mt-6 border-l-2 border-accent-gold bg-accent-gold/10 p-4">
                <p className="text-xs font-mono uppercase tracking-[0.1em] text-accent-gold font-bold mb-1">
                  Komitmen Filosofis Insan SiberMu:
                </p>
                <p className="font-body text-sm text-text-primary italic leading-relaxed">
                  &ldquo;{activeNode.quote}&rdquo;
                </p>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-primary/15 flex flex-wrap items-center justify-between gap-4">
              <span className="font-mono text-xs text-primary font-bold">
                Standar Kualitas: {activeNode.metric}
              </span>
              <a
                href="#layanan"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-[0.08em] text-primary hover:underline"
              >
                <span>Lihat Penerapan di Layanan</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
