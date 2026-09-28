'use client';

import { useState } from 'react';

type KemahasiswaanTab = 'ormawa' | 'ukm' | 'prestasi' | 'layanan';

interface OrmawaItem {
  code: string;
  name: string;
  type: string;
  description: string;
  focus: string[];
  contact: string;
}

interface UkmItem {
  id: string;
  name: string;
  category: string;
  description: string;
  activities: string[];
  schedule: string;
}

interface PrestasiItem {
  id: string;
  title: string;
  student: string;
  studyProgram: string;
  category: 'Teknologi' | 'AIK & MTQ' | 'Karya Ilmiah' | 'Bisnis Digital';
  level: 'Nasional' | 'Internasional' | 'Regional';
  year: string;
  achievement: string;
}

interface LayananItem {
  id: string;
  title: string;
  type: string;
  description: string;
  sla: string;
  channel: string;
  requirements: string[];
}

const ORMAWA_DATA: OrmawaItem[] = [
  {
    code: 'BEM',
    name: 'Badan Eksekutif Mahasiswa SiberMu',
    type: 'Lembaga Eksekutif Kampus Siber',
    description:
      'Wadah aspirasi dan eksekusi program kemahasiswaan tingkat universitas yang beroperasi secara digital dengan prinsip tata kelola amanah dan inovatif.',
    focus: ['Advokasi Hak Belajar Siber', 'Kemitraan Industri Digital', 'Pengabdian Masyarakat Terpencil'],
    contact: 'bem@sibermu.ac.id',
  },
  {
    code: 'DPM',
    name: 'Dewan Perwakilan Mahasiswa SiberMu',
    type: 'Lembaga Legislatif & Pengawasan',
    description:
      'Lembaga perwakilan mahasiswa yang bertugas menyusun regulasi kemahasiswaan, mengawasi kinerja eksekutif, serta menampung suara mahasiswa dari 38 provinsi.',
    focus: ['Legislasi Digital Kampus', 'Sidang Aspirasi Terbuka Online', 'Audit Program Kemahasiswaan'],
    contact: 'dpm@sibermu.ac.id',
  },
  {
    code: 'IMM',
    name: 'PK IMM Universitas Siber Muhammadiyah',
    type: 'Organisasi Otonom Muhammadiyah',
    description:
      'Pimpinan Komisariat Ikatan Mahasiswa Muhammadiyah sebagai laboratorium kepemimpinan intelektual, religiusitas profetik, dan humanitas kader siber berkemajuan.',
    focus: ['Perkaderan Darul Arqam Dasar (DAD)', 'Kajian Epistemologi Islam', 'Gerakan Filantropi Digital'],
    contact: 'imm@sibermu.ac.id',
  },
];

const UKM_DATA: UkmItem[] = [
  {
    id: 'cyber-club',
    name: 'SiberMu Cyber & Security Lab',
    category: 'Teknologi & Keamanan Siber',
    description:
      'Komunitas riset dan kompetisi Capture The Flag (CTF), mitigasi kerentanan perangkat lunak, dan edukasi pertahanan digital etis.',
    activities: ['Latihan Mingguan CTF & Bug Bounty', 'Audit Keamanan Aplikasi Open-Source', 'Workshop Ethical Hacking'],
    schedule: 'Jumat malam (Online Lab)',
  },
  {
    id: 'ai-software',
    name: 'AI & Software Innovation Club',
    category: 'Rancang Bangun Perangkat Lunak',
    description:
      'Inkubator mahasiswa pembuat prototipe aplikasi cerdas, implementasi large language models, dan rekayasa perangkat lunak berskala besar.',
    activities: ['Hackathon Produk Digital Tiap Semester', 'Open Source Contribution Sprint', 'Mentoring Full-Stack Modern'],
    schedule: 'Sabtu pagi (Discord & GitHub)',
  },
  {
    id: 'debat-riset',
    name: 'Lembaga Riset & Debat Ilmiah Siber',
    category: 'Penalaran & Keilmuan',
    description:
      'Wadah pengembangan critical thinking, riset multidisiplin siber, serta persiapan delegasi kompetisi debat bahasa Indonesia dan Inggris tingkat nasional.',
    activities: ['Simulasi Debat Parlementer Virtual', 'Pelatihan Penulisan Jurnal Ilmiah', 'Bedah Isu Kebijakan Publik'],
    schedule: 'Rabu malam (Zoom Meeting)',
  },
  {
    id: 'multimedia-syiar',
    name: 'Multimedia & Visual Creative Lab',
    category: 'Seni Kreatif & Desain',
    description:
      'Pusat kreasi konten visual, sinematografi pendek, UI/UX design, dan infografis dakwah Islam berkemajuan untuk media sosial dan publikasi kampus.',
    activities: ['Produksi Konten Kreatif SiberMu', 'Kurasi Portofolio Desain Grafis', 'Klinik Tipografi & Layout Editorial'],
    schedule: 'Kamis sore (Studio Virtual)',
  },
  {
    id: 'seni-sastra',
    name: 'Komunitas Sastra & Budaya Nusantara',
    category: 'Sastra & Kebudayaan',
    description:
      'Ruang apresiasi karya sastra, esai reflektif, puisi digital, dan pelestarian nilai budaya lokal dalam medium siber modern.',
    activities: ['Antologi Puisi Mahasiswa Siber', 'Klub Baca Buku & Diskusi Filsafat', 'Pentas Monolog Daring'],
    schedule: 'Minggu malam (Google Meet)',
  },
  {
    id: 'esports-edu',
    name: 'SiberMu Esports & Game Strategy',
    category: 'Olahraga Digital Kompetitif',
    description:
      'Pengembangan sportivitas, strategi kompetitif beregu, dan manajemen talenta game siber dengan disiplin waktu dan etika profesional.',
    activities: ['Turnamen Antar-Kampus PJJ', 'Sesi Taktik Analitik Game', 'Seminar Anti-Kecanduan & Manajemen Mental'],
    schedule: 'Sabtu malam (Arena Kompetisi)',
  },
];

const PRESTASI_DATA: PrestasiItem[] = [
  {
    id: 'pres-1',
    title: 'Juara 1 National Capture The Flag (CTF) Cyber Defense',
    student: 'Ahmad Faiz & Tim CyberMu',
    studyProgram: 'Informatika S1',
    category: 'Teknologi',
    level: 'Nasional',
    year: '2025',
    achievement: 'Medali Emas & Sertifikasi Cyber Defense Practitioner',
  },
  {
    id: 'pres-2',
    title: 'Juara 2 Musabaqah Karya Tulis Ilmiah Al-Qur\'an (KTIQ)',
    student: 'Nur Laila Ramadhani',
    studyProgram: 'Sistem Informasi S1',
    category: 'AIK & MTQ',
    level: 'Nasional',
    year: '2025',
    achievement: 'Gagasan Aplikasi Tafsir Ayat Kauniyah Berbasis Graf Interaktif',
  },
  {
    id: 'pres-3',
    title: 'Finalis Global Remote Hackathon: AI for Sustainable Healthcare',
    student: 'Rian Hidayat, dkk.',
    studyProgram: 'Administrasi Kesehatan S1',
    category: 'Teknologi',
    level: 'Internasional',
    year: '2024',
    achievement: 'Pengembangan Dashboard Deteksi Dini Stunting Daerah Terpencil',
  },
  {
    id: 'pres-4',
    title: 'Juara 1 Lomba Business Plan Mahasiswa Muhammadiyah',
    student: 'Fajar Nugroho & Tim EduSiber',
    studyProgram: 'Manajemen S1',
    category: 'Bisnis Digital',
    level: 'Nasional',
    year: '2024',
    achievement: 'Pendanaan Inkubasi Start-up Pembelajaran Mikro UMKM',
  },
  {
    id: 'pres-5',
    title: 'Best Paper Kategori Kebijakan Hukum Digital & Privasi Data',
    student: 'Zahra Anindita',
    studyProgram: 'Hukum S1',
    category: 'Karya Ilmiah',
    level: 'Nasional',
    year: '2024',
    achievement: 'Dipublikasikan pada Jurnal Terakreditasi SINTA 2',
  },
];

const LAYANAN_DATA: LayananItem[] = [
  {
    id: 'lay-konseling',
    title: 'Bimbingan Konseling & Pendampingan Mental',
    type: 'Layanan Psikologis Daring',
    description:
      'Sesi bimbingan 1-on-1 privat bersama konselor tersertifikasi untuk mahasiswa yang menghadapi burnout belajar daring, persoalan adaptasi, atau beban pribadi.',
    sla: '1 x 24 Jam Kerja',
    channel: 'Sesi Privat Virtual & Chat Terenkripsi',
    requirements: ['KTM Elektronik SiberMu aktif', 'Mengisi form asesmen awal secara mandiri'],
  },
  {
    id: 'lay-beasiswa',
    title: 'Pusat Informasi & Pengajuan Beasiswa',
    type: 'Bantuan Biaya Pendidikan',
    description:
      'Pengelolaan beasiswa Persyarikatan Muhammadiyah, beasiswa kader daerah 3T, beasiswa prestasi akademik dan non-akademik, serta program KIP Kuliah.',
    sla: 'Sesuai Jadwal Gelombang Beasiswa',
    channel: 'Portal Beasiswa Biro Kemahasiswaan',
    requirements: ['Transkrip IPK minimum 3.25', 'Surat rekomendasi Pimpinan Daerah Muhammadiyah / Aisyiyah setempat'],
  },
  {
    id: 'lay-surat',
    title: 'Penerbitan Surat Rekomendasi & Legalisir Digital',
    type: 'Administrasi Kemahasiswaan',
    description:
      'Permohonan surat keterangan mahasiswa aktif, rekomendasi magang bersertifikat, surat izin lomba, dan legalisir dokumen resmi dengan tanda tangan elektronik ber-QR Code.',
    sla: 'Maksimal 2 Hari Kerja',
    channel: 'Sistem Terintegrasi E-Service SiberMu',
    requirements: ['Status mahasiswa tidak sedang cuti', 'Bebas tunggakan SPP semester berjalan'],
  },
  {
    id: 'lay-disabilitas',
    title: 'Unit Layanan Aksesibilitas Mahasiswa Difabel',
    type: 'Pendampingan Khusus',
    description:
      'Dukungan format perkuliahan adaptif (screen reader friendly, teks transkripsi video kuliah, modul format braille digital) untuk mahasiswa penyandang disabilitas sensorik.',
    sla: 'Pendampingan Berkelanjutan',
    channel: 'Helpdesk Inklusi SiberMu',
    requirements: ['Registrasi berkas verifikasi kebutuhan aksesibilitas pada awal semester'],
  },
];

export default function KemahasiswaanSection() {
  const [activeTab, setActiveTab] = useState<KemahasiswaanTab>('ormawa');
  const [filterPrestasi, setFilterPrestasi] = useState<string>('Semua');

  const filteredPrestasi =
    filterPrestasi === 'Semua'
      ? PRESTASI_DATA
      : PRESTASI_DATA.filter((p) => p.category === filterPrestasi);

  return (
    <section
      id="kemahasiswaan"
      className="relative bg-background py-20 px-5 md:px-10 border-b border-primary/15"
      aria-label="Bidang Kemahasiswaan SiberMu"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 border border-primary/25 bg-surface px-3 py-1 text-xs font-mono uppercase tracking-[0.14em] text-primary mb-4 shadow-[2px_2px_0_0_#0B5D3B]">
            <span>Pilar I</span>
            <span>•</span>
            <span>Biro Kemahasiswaan SiberMu</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-text-primary">
            Ekosistem Kemahasiswaan Aktif, Merdeka, & Berprestasi
          </h2>
          <p className="mt-4 font-body text-base text-text-secondary leading-relaxed">
            Meski terpisah ribuan kilometer di seluruh penjuru tanah air, mahasiswa Universitas Siber Muhammadiyah terhubung dalam dinamika organisasi, eksplorasi minat bakat melalui UKM siber, pembuktian prestasi nasional, dan dukungan layanan mahasiswa yang responsif tanpa jeda.
          </p>
        </div>

        {/* Tab Selector */}
        <div
          role="tablist"
          aria-label="Kategori Bidang Kemahasiswaan"
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-surface border border-primary/20 mb-10 shadow-[4px_4px_0_0_rgba(11,93,59,0.12)]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'ormawa'}
            aria-controls="panel-ormawa"
            id="tab-ormawa"
            onClick={() => setActiveTab('ormawa')}
            className={[
              'px-4 py-3 text-xs sm:text-sm font-body font-semibold uppercase tracking-[0.08em] transition-all text-center',
              activeTab === 'ormawa'
                ? 'bg-primary text-surface shadow-[2px_2px_0_0_#063B25]'
                : 'text-text-secondary hover:text-primary hover:bg-primary/5',
            ].join(' ')}
          >
            Organisasi (Ormawa)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'ukm'}
            aria-controls="panel-ukm"
            id="tab-ukm"
            onClick={() => setActiveTab('ukm')}
            className={[
              'px-4 py-3 text-xs sm:text-sm font-body font-semibold uppercase tracking-[0.08em] transition-all text-center',
              activeTab === 'ukm'
                ? 'bg-primary text-surface shadow-[2px_2px_0_0_#063B25]'
                : 'text-text-secondary hover:text-primary hover:bg-primary/5',
            ].join(' ')}
          >
            Unit Kegiatan (UKM)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'prestasi'}
            aria-controls="panel-prestasi"
            id="tab-prestasi"
            onClick={() => setActiveTab('prestasi')}
            className={[
              'px-4 py-3 text-xs sm:text-sm font-body font-semibold uppercase tracking-[0.08em] transition-all text-center',
              activeTab === 'prestasi'
                ? 'bg-primary text-surface shadow-[2px_2px_0_0_#063B25]'
                : 'text-text-secondary hover:text-primary hover:bg-primary/5',
            ].join(' ')}
          >
            Torehan Prestasi
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'layanan'}
            aria-controls="panel-layanan"
            id="tab-layanan"
            onClick={() => setActiveTab('layanan')}
            className={[
              'px-4 py-3 text-xs sm:text-sm font-body font-semibold uppercase tracking-[0.08em] transition-all text-center',
              activeTab === 'layanan'
                ? 'bg-primary text-surface shadow-[2px_2px_0_0_#063B25]'
                : 'text-text-secondary hover:text-primary hover:bg-primary/5',
            ].join(' ')}
          >
            Layanan Mahasiswa
          </button>
        </div>

        {/* Tab 1: ORMAWA */}
        {activeTab === 'ormawa' && (
          <div
            id="panel-ormawa"
            role="tabpanel"
            aria-labelledby="tab-ormawa"
            className="grid gap-6 md:grid-cols-3"
          >
            {ORMAWA_DATA.map((ormawa) => (
              <div
                key={ormawa.code}
                className="relative flex flex-col justify-between border border-primary/25 bg-surface p-6 sm:p-7 shadow-[5px_5px_0_0_#0B5D3B] transition-transform duration-200 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-primary/15 pb-4 mb-4">
                    <span className="font-mono text-2xl font-bold tracking-tight text-primary">
                      {ormawa.code}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-text-muted border border-primary/20 px-2 py-0.5">
                      Resmi Kampus
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-text-primary leading-snug">
                    {ormawa.name}
                  </h3>
                  <p className="mt-1 text-xs font-mono uppercase text-accent-gold tracking-[0.08em]">
                    {ormawa.type}
                  </p>
                  <p className="mt-3 font-body text-sm text-text-secondary leading-relaxed">
                    {ormawa.description}
                  </p>

                  <div className="mt-5 border-t border-primary/10 pt-4">
                    <p className="text-[11px] font-mono uppercase tracking-[0.1em] text-text-muted mb-2 font-semibold">
                      Fokus Gerak & Program Pokok:
                    </p>
                    <ul className="space-y-1.5 list-none m-0 p-0 text-xs font-body text-text-primary">
                      {ormawa.focus.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-primary font-bold">›</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-primary/15 flex items-center justify-between text-xs font-mono text-text-muted">
                  <span>Kontak: {ormawa.contact}</span>
                  <a
                    href={`mailto:${ormawa.contact}`}
                    className="font-bold text-primary hover:underline"
                  >
                    Hubungi
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: UKM */}
        {activeTab === 'ukm' && (
          <div
            id="panel-ukm"
            role="tabpanel"
            aria-labelledby="tab-ukm"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {UKM_DATA.map((ukm) => (
              <div
                key={ukm.id}
                className="flex flex-col justify-between border border-primary/25 bg-surface p-6 shadow-[5px_5px_0_0_#0B5D3B] transition-transform duration-200 hover:-translate-y-1"
              >
                <div>
                  <div className="inline-block text-[11px] font-mono uppercase tracking-[0.1em] text-primary bg-primary/10 px-2 py-0.5 mb-3 border border-primary/20">
                    {ukm.category}
                  </div>
                  <h3 className="font-display text-xl font-bold text-text-primary">
                    {ukm.name}
                  </h3>
                  <p className="mt-2.5 font-body text-sm text-text-secondary leading-relaxed">
                    {ukm.description}
                  </p>

                  <div className="mt-4 border-t border-primary/10 pt-3">
                    <p className="text-[11px] font-mono uppercase tracking-[0.1em] text-text-muted mb-2 font-semibold">
                      Aktivitas Inti:
                    </p>
                    <ul className="space-y-1 list-none m-0 p-0 text-xs font-body text-text-primary">
                      {ukm.activities.map((act, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-accent-gold font-bold">▪</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-primary/15 flex items-center justify-between text-xs font-mono">
                  <span className="text-text-muted">{ukm.schedule}</span>
                  <a
                    href="https://wa.me/6285179946901?text=Halo%20Biro%20Kemahasiswaan%20SiberMu,%20saya%20ingin%20bergabung%20dengan%20UKM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-primary hover:underline"
                  >
                    Gabung UKM
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: PRESTASI */}
        {activeTab === 'prestasi' && (
          <div id="panel-prestasi" role="tabpanel" aria-labelledby="tab-prestasi">
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 mb-6" aria-label="Filter kategori prestasi">
              {['Semua', 'Teknologi', 'AIK & MTQ', 'Bisnis Digital', 'Karya Ilmiah'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilterPrestasi(cat)}
                  className={[
                    'px-3.5 py-1.5 text-xs font-mono uppercase tracking-[0.08em] border transition-colors',
                    filterPrestasi === cat
                      ? 'bg-primary text-surface border-primary font-bold'
                      : 'bg-surface text-text-secondary border-primary/20 hover:border-primary',
                  ].join(' ')}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid gap-4">
              {filteredPrestasi.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-primary/25 bg-surface p-5 sm:p-6 shadow-[4px_4px_0_0_#0B5D3B] hover:border-primary transition-colors"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.1em] text-primary font-semibold">
                        Tingkat {p.level}
                      </span>
                      <span className="text-xs font-mono text-accent-gold font-bold">
                        {p.category} • {p.year}
                      </span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-text-primary">
                      {p.title}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-text-secondary">
                      Peraih: <span className="font-semibold text-text-primary">{p.student}</span> ({p.studyProgram})
                    </p>
                    <p className="text-xs font-mono text-primary font-medium">
                      Hasil: {p.achievement}
                    </p>
                  </div>

                  <div className="shrink-0 sm:text-right border-t sm:border-t-0 border-primary/10 pt-3 sm:pt-0">
                    <span className="inline-block border border-accent-gold/40 bg-accent-gold/15 px-3 py-1 font-mono text-xs font-bold text-accent-gold">
                      Terverifikasi Biro
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: LAYANAN */}
        {activeTab === 'layanan' && (
          <div
            id="panel-layanan"
            role="tabpanel"
            aria-labelledby="tab-layanan"
            className="grid gap-6 md:grid-cols-2"
          >
            {LAYANAN_DATA.map((lay) => (
              <div
                key={lay.id}
                className="flex flex-col justify-between border border-primary/25 bg-surface p-6 sm:p-7 shadow-[5px_5px_0_0_#0B5D3B]"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-primary/15 pb-3 mb-3">
                    <span className="text-xs font-mono uppercase tracking-[0.1em] text-primary font-semibold">
                      {lay.type}
                    </span>
                    <span className="text-xs font-mono text-accent-gold font-bold">
                      SLA: {lay.sla}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-text-primary">
                    {lay.title}
                  </h3>
                  <p className="mt-3 font-body text-sm text-text-secondary leading-relaxed">
                    {lay.description}
                  </p>

                  <div className="mt-4 border-t border-primary/10 pt-3">
                    <p className="text-[11px] font-mono uppercase tracking-[0.1em] text-text-muted mb-1.5 font-semibold">
                      Syarat Pengajuan:
                    </p>
                    <ul className="space-y-1 list-none m-0 p-0 text-xs font-body text-text-primary">
                      {lay.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-primary font-bold">✓</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-primary/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                  <span className="text-text-muted">Kanal: {lay.channel}</span>
                  <a
                    href="https://wa.me/6285179946901?text=Halo%20Biro%20Kemahasiswaan%20SiberMu,%20saya%20ingin%20mengajukan%20layanan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-primary px-4 py-2 font-semibold uppercase tracking-[0.08em] text-surface hover:bg-primary-hover transition-colors"
                  >
                    Ajukan Layanan
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
