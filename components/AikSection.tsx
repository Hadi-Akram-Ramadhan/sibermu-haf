'use client';

import { useState } from 'react';

type AikTab = 'nilai' | 'kegiatan' | 'kajian' | 'syiar';

interface NilaiMuhammadiyah {
  number: string;
  title: string;
  arabic?: string;
  summary: string;
  manifesto: string;
}

interface KegiatanItem {
  id: string;
  name: string;
  format: string;
  period: string;
  description: string;
  curriculum: string[];
}

interface KajianItem {
  id: string;
  title: string;
  speaker: string;
  topic: string;
  date: string;
  format: string;
  recordingUrl: string;
}

interface SyiarItem {
  id: string;
  title: string;
  type: string;
  description: string;
  actionText: string;
  actionHref: string;
}

const NILAI_MUHAMMADIYAH: NilaiMuhammadiyah[] = [
  {
    number: '01',
    title: 'Tauhid Murni Berkemajuan',
    arabic: 'التَّوْحِيدُ الْخَالِصُ',
    summary:
      'Memurnikan keimanan hanya kepada Allah SWT, membebaskan akal dari mitos dan kejumudan, serta menautkan tauhid dengan etika sains siber.',
    manifesto:
      'Mahasiswa SiberMu membangun teknologi dengan kesadaran muraqabah (merasa selalu diawasi Allah) sehingga bebas dari penipuan digital dan kejahatan siber.',
  },
  {
    number: '02',
    title: 'Tajdid & Pemikiran Kritis',
    arabic: 'التَّجْدِيدُ وَالِاجْتِهَادُ',
    summary:
      'Pembaruan tiada henti dalam cara kerja, riset, dan teknologi tanpa meninggalkan prinsip dasar Al-Qur\'an dan As-Sunnah Ash-Shahihah.',
    manifesto:
      'Menjadikan ruang siber sebagai ladang tajdid untuk menciptakan solusi pembelajaran modern yang mempermudah kehidupan umat manusia.',
  },
  {
    number: '03',
    title: 'Wasathiyah & Keadaban Digital',
    arabic: 'الْوَسَطِيَّةُ فِي الْفَضَاءِ الرَّقْمِيِّ',
    summary:
      'Mengedepankan moderasi, kesantunan bertutur kata, tabayyun (verifikasi informasi), dan menolak ujaran kebencian di jagat maya.',
    manifesto:
      'Setiap mahasiswa SiberMu bertindak sebagai duta perdamaian dan penjaga keadaban ruang publik internet Indonesia.',
  },
  {
    number: '04',
    title: 'Praksis Sosial Al-Ma\'un',
    arabic: 'فِقْهُ الْمَاعُونِ الرَّقْمِيِّ',
    summary:
      'Meneladani teologi Al-Ma\'un KH Ahmad Dahlan: agama harus berbuah pembelaan nyata bagi kaum dhuafa dan mustadh\'afin.',
    manifesto:
      'Mendedikasikan kemampuan komputasi, kecerdasan buatan, dan manajemen untuk membuka akses pendidikan bagi masyarakat di pelosok terpencil.',
  },
];

const KEGIATAN_DATA: KegiatanItem[] = [
  {
    id: 'bam',
    name: 'Baitul Arqam Mahasiswa (BAM) Daring',
    format: 'Perkaderan Ideologis & Spiritual Terstruktur (Virtual Camp)',
    period: 'Setiap Semester (Wajib bagi Mahasiswa Baru & Akhir)',
    description:
      'Wahana pembentukan karakter kader Muhammadiyah yang tangguh, memahami Matan Keyakinan dan Cita-cita Hidup Muhammadiyah (MKCH), serta kepemimpinan profetik di era digital.',
    curriculum: [
      'Hakikat Islam Berkemajuan & Fikih Informasi',
      'Studi Kemuhammadiyahan: Sejarah, Tokoh, & Amal Usaha',
      'Praktik Qiyamul Lail & Muhasabah Daring Terpimpin',
      'Penyusunan Rencana Aksi Sosial Berbasis Siber',
    ],
  },
  {
    id: 'mentoring-tahsin',
    name: 'Mentoring Tahsin & Ibadah Praktis Sesuai HPT',
    format: 'Bimbingan 1-on-1 & Kelompok Kecil Asynchronous & Synchronous',
    period: 'Mingguan (Fleksibel Menyesuaikan Jadwal Kerja Mahasiswa)',
    description:
      'Klinik perbaikan makharijul huruf, tajwid Al-Qur\'an, dan tata cara wudhu serta shalat sesuai panduan Himpunan Putusan Tarjih (HPT) Muhammadiyah.',
    curriculum: [
      'Standar Tahsin Tilawah Al-Qur\'an Level Dasar hingga Mahir',
      'Fiqih Shalat Fardhu & Sunnah Berdasarkan HPT',
      'Doa-Doa Ma\'tsurat Harian untuk Produktivitas Mahasiswa',
      'Asesmen Kelancaran Membaca Juz 30',
    ],
  },
  {
    id: 'sertifikasi-aik',
    name: 'Ujian Sertifikasi Kompetensi AIK Sarjana',
    format: 'Ujian Komprehensif Berstandar Majelis Diktilitbang PPM',
    period: 'Prasyarat Yudisium Kelulusan S1',
    description:
      'Tolok ukur integritas dan pemahaman keagamaan calon sarjana Universitas Siber Muhammadiyah agar menjadi lulusan yang profesional sekaligus berakhlak mulia.',
    curriculum: [
      'Uji Baca Tulis Al-Qur\'an Berkelanjutan',
      'Pemahaman Fikih Muamalah Digital Kontemporer',
      'Komitmen Pengabdian Persyarikatan & Keumatan',
    ],
  },
];

const KAJIAN_DATA: KajianItem[] = [
  {
    id: 'kajian-1',
    title: 'Etika Kecerdasan Buatan dan Batasan Moral dalam Fikih Tarjih',
    speaker: 'Majelis Tarjih dan Tajdid Pimpinan Pusat Muhammadiyah',
    topic: 'Kecerdasan Buatan, Hak Cipta Digital, & Moralitas Islam',
    date: 'Setiap Pekan ke-2 Tiap Bulan',
    format: 'Webinar Interaktif Zoom & YouTube Live',
    recordingUrl: 'https://youtube.com/@sibermu',
  },
  {
    id: 'kajian-2',
    title: 'Meneladani Etos Kerja & Teologi Kemajuan KH Ahmad Dahlan',
    speaker: 'Lembaga Pengembangan Studi Islam (LPSI) SiberMu',
    topic: 'Sejarah Pemikiran Kemuhammadiyahan & Kepemimpinan',
    date: 'Pekan ke-4 Tiap Bulan',
    format: 'Podcast Audio & Forum Diskusi LMS',
    recordingUrl: 'https://sibermu.ac.id/',
  },
  {
    id: 'kajian-3',
    title: 'Keluarga Sakinah & Manajemen Stres Mahasiswa Pekerja',
    speaker: 'Pimpinan Pusat \'Aisyiyah & Konselor Sahabat Mahasiswa',
    topic: 'Kesehatan Mental, Relasi Sosial, & Spiritualitas',
    date: 'Kajian Khusus Tematik Triwulanan',
    format: 'Sesi Diskusi Hati ke Hati Daring',
    recordingUrl: 'https://sibermu.ac.id/',
  },
];

const SYIAR_DATA: SyiarItem[] = [
  {
    id: 'syiar-fikih',
    title: 'Pojok Konsultasi Fikih Siber (Tanya Tarjih)',
    type: 'Layanan Tanya Jawab Interaktif',
    description:
      'Ajukan pertanyaan seputar hukum muamalah daring, etika konten digital, zakat penghasilan remote work, dan fikih keseharian yang dijawab langsung oleh dewan asatidz AIK SiberMu.',
    actionText: 'Kirim Pertanyaan Fikih',
    actionHref: 'https://wa.me/6285179946901?text=Halo%20Biro%20AIK%20SiberMu,%20saya%20ingin%20konsultasi%20fikih%20digital',
  },
  {
    id: 'syiar-buletin',
    title: 'Buletin & Riset Al-Islam Berkemajuan',
    type: 'Publikasi Digital Terbuka',
    description:
      'Akses artikel pemikiran, khutbah tematik, panduan ibadah praktis format e-book, dan rekaman audio tadabbur Al-Qur\'an yang dirancang untuk dibaca di perangkat mobile.',
    actionText: 'Baca E-Library AIK',
    actionHref: 'https://sibermu.ac.id/',
  },
  {
    id: 'syiar-lazis',
    title: 'Filantropi & Sedekah Digital Kader SiberMu',
    type: 'Aksi Nyata Kemanusiaan',
    description:
      'Saluran infak dan sedekah digital mahasiswa untuk program beasiswa kawan sebaya, tanggap bencana nasional Lazismu, dan sarana perangkat belajar bagi mahasiswa di daerah 3T.',
    actionText: 'Salurkan Kepedulian',
    actionHref: 'https://wa.me/6285179946901?text=Halo%20Biro%20AIK%20SiberMu,%20saya%20ingin%20berinfak%20peduli%20kader',
  },
];

export default function AikSection() {
  const [activeTab, setActiveTab] = useState<AikTab>('nilai');

  return (
    <section
      id="aik"
      className="relative bg-surface py-20 px-5 md:px-10 border-b border-primary/15"
      aria-label="Bidang Al-Islam dan Kemuhammadiyahan SiberMu"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 border border-accent-gold/40 bg-accent-gold/10 px-3 py-1 text-xs font-mono uppercase tracking-[0.14em] text-accent-gold mb-4 shadow-[2px_2px_0_0_#9E7B35]">
            <span>Pilar II</span>
            <span>•</span>
            <span>Al-Islam & Kemuhammadiyahan (AIK)</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-text-primary">
            Ruh Spiritual & Karakter Islam Berkemajuan
          </h2>
          <p className="mt-4 font-body text-base text-text-secondary leading-relaxed">
            Pendidikan siber di Universitas Siber Muhammadiyah bukan sekadar penguasaan kode dan infrastruktur cloud, melainkan ikhtiar membentuk pribadi yang teguh tauhidnya, luhur budi pekertinya, cerdas nalar tajdidnya, dan menebarkan rahmat bagi semesta alam.
          </p>
        </div>

        {/* Tab Selector */}
        <div
          role="tablist"
          aria-label="Kategori Bidang Al-Islam dan Kemuhammadiyahan"
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-background border border-primary/20 mb-10 shadow-[4px_4px_0_0_rgba(11,93,59,0.12)]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'nilai'}
            aria-controls="panel-nilai"
            id="tab-nilai"
            onClick={() => setActiveTab('nilai')}
            className={[
              'px-4 py-3 text-xs sm:text-sm font-body font-semibold uppercase tracking-[0.08em] transition-all text-center',
              activeTab === 'nilai'
                ? 'bg-primary text-surface shadow-[2px_2px_0_0_#063B25]'
                : 'text-text-secondary hover:text-primary hover:bg-primary/5',
            ].join(' ')}
          >
            Nilai Kemuhammadiyahan
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'kegiatan'}
            aria-controls="panel-kegiatan"
            id="tab-kegiatan"
            onClick={() => setActiveTab('kegiatan')}
            className={[
              'px-4 py-3 text-xs sm:text-sm font-body font-semibold uppercase tracking-[0.08em] transition-all text-center',
              activeTab === 'kegiatan'
                ? 'bg-primary text-surface shadow-[2px_2px_0_0_#063B25]'
                : 'text-text-secondary hover:text-primary hover:bg-primary/5',
            ].join(' ')}
          >
            Kegiatan Keagamaan
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'kajian'}
            aria-controls="panel-kajian"
            id="tab-kajian"
            onClick={() => setActiveTab('kajian')}
            className={[
              'px-4 py-3 text-xs sm:text-sm font-body font-semibold uppercase tracking-[0.08em] transition-all text-center',
              activeTab === 'kajian'
                ? 'bg-primary text-surface shadow-[2px_2px_0_0_#063B25]'
                : 'text-text-secondary hover:text-primary hover:bg-primary/5',
            ].join(' ')}
          >
            Kajian Tematik
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'syiar'}
            aria-controls="panel-syiar"
            id="tab-syiar"
            onClick={() => setActiveTab('syiar')}
            className={[
              'px-4 py-3 text-xs sm:text-sm font-body font-semibold uppercase tracking-[0.08em] transition-all text-center',
              activeTab === 'syiar'
                ? 'bg-primary text-surface shadow-[2px_2px_0_0_#063B25]'
                : 'text-text-secondary hover:text-primary hover:bg-primary/5',
            ].join(' ')}
          >
            Syiar & Layanan Digital
          </button>
        </div>

        {/* Tab 1: NILAI KEMUHAMMADIYAHAN */}
        {activeTab === 'nilai' && (
          <div
            id="panel-nilai"
            role="tabpanel"
            aria-labelledby="tab-nilai"
            className="grid gap-6 md:grid-cols-2"
          >
            {NILAI_MUHAMMADIYAH.map((val) => (
              <div
                key={val.number}
                className="relative border border-primary/25 bg-background p-6 sm:p-8 shadow-[5px_5px_0_0_#0B5D3B] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-primary/15 pb-4 mb-4">
                    <span className="font-mono text-3xl font-bold text-accent-gold">
                      {val.number}
                    </span>
                    {val.arabic && (
                      <span className="font-serif text-lg text-primary/80" dir="rtl">
                        {val.arabic}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-text-primary">
                    {val.title}
                  </h3>
                  <p className="mt-3 font-body text-sm text-text-secondary leading-relaxed">
                    {val.summary}
                  </p>
                </div>

                <div className="mt-6 border-l-2 border-primary bg-primary/5 p-4">
                  <p className="text-[11px] font-mono uppercase tracking-[0.1em] text-primary font-bold mb-1">
                    Manifestasi di Ruang Siber:
                  </p>
                  <p className="font-body text-xs text-text-primary leading-normal italic">
                    &ldquo;{val.manifesto}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: KEGIATAN KEAGAMAAN */}
        {activeTab === 'kegiatan' && (
          <div
            id="panel-kegiatan"
            role="tabpanel"
            aria-labelledby="tab-kegiatan"
            className="grid gap-6 lg:grid-cols-3"
          >
            {KEGIATAN_DATA.map((keg) => (
              <div
                key={keg.id}
                className="flex flex-col justify-between border border-primary/25 bg-background p-6 shadow-[5px_5px_0_0_#0B5D3B]"
              >
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-[0.1em] text-primary bg-primary/10 px-2 py-0.5 inline-block mb-3 border border-primary/20">
                    {keg.period}
                  </div>
                  <h3 className="font-display text-xl font-bold text-text-primary">
                    {keg.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-accent-gold">
                    {keg.format}
                  </p>
                  <p className="mt-3 font-body text-sm text-text-secondary leading-relaxed">
                    {keg.description}
                  </p>

                  <div className="mt-5 border-t border-primary/10 pt-4">
                    <p className="text-[11px] font-mono uppercase tracking-[0.1em] text-text-muted mb-2 font-semibold">
                      Materi & Sasaran Utama:
                    </p>
                    <ul className="space-y-1.5 list-none m-0 p-0 text-xs font-body text-text-primary">
                      {keg.curriculum.map((c, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-primary font-bold">›</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-primary/15">
                  <a
                    href="https://wa.me/6285179946901?text=Halo%20Biro%20AIK%20SiberMu,%20saya%20ingin%20tanya%20tentang%20jadwal%20kegiatan%20keagamaan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center border border-primary bg-primary/5 py-2 text-xs font-mono font-bold uppercase tracking-[0.08em] text-primary hover:bg-primary hover:text-surface transition-colors"
                  >
                    Konsultasi Jadwal
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: KAJIAN TEMATIK */}
        {activeTab === 'kajian' && (
          <div
            id="panel-kajian"
            role="tabpanel"
            aria-labelledby="tab-kajian"
            className="grid gap-6 md:grid-cols-3"
          >
            {KAJIAN_DATA.map((k) => (
              <div
                key={k.id}
                className="flex flex-col justify-between border border-primary/25 bg-background p-6 shadow-[5px_5px_0_0_#0B5D3B]"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-primary/15 pb-3 mb-3 text-xs font-mono">
                    <span className="text-accent-gold font-bold">{k.date}</span>
                    <span className="text-text-muted">{k.format}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-text-primary leading-snug">
                    {k.title}
                  </h3>
                  <div className="mt-3 space-y-1 text-xs font-body">
                    <p className="text-text-primary font-medium">
                      Narasumber: <span className="text-text-secondary">{k.speaker}</span>
                    </p>
                    <p className="text-text-muted font-mono">
                      Fokus: {k.topic}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-primary/15">
                  <a
                    href={k.recordingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full bg-primary px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.08em] text-surface hover:bg-primary-hover transition-colors shadow-sm"
                  >
                    Tonton Rekaman Kajian
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: SYIAR & LAYANAN DIGITAL */}
        {activeTab === 'syiar' && (
          <div
            id="panel-syiar"
            role="tabpanel"
            aria-labelledby="tab-syiar"
            className="grid gap-6 md:grid-cols-3"
          >
            {SYIAR_DATA.map((s) => (
              <div
                key={s.id}
                className="flex flex-col justify-between border border-primary/25 bg-background p-6 shadow-[5px_5px_0_0_#0B5D3B]"
              >
                <div>
                  <span className="inline-block text-[11px] font-mono uppercase tracking-[0.1em] text-primary bg-primary/10 px-2 py-0.5 mb-3 border border-primary/20">
                    {s.type}
                  </span>
                  <h3 className="font-display text-xl font-bold text-text-primary">
                    {s.title}
                  </h3>
                  <p className="mt-3 font-body text-sm text-text-secondary leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-primary/15">
                  <a
                    href={s.actionHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full bg-primary px-4 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.1em] text-surface hover:bg-primary-hover transition-colors shadow-sm"
                  >
                    {s.actionText}
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
