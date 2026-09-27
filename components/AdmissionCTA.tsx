'use client';

import { useState } from 'react';

const ADMISSIONS_URL = process.env.NEXT_PUBLIC_ADMISSIONS_URL ?? 'https://admissions.sibermu.ac.id/';
const INFO_URL = process.env.NEXT_PUBLIC_INFO_URL ?? 'https://sibermu.ac.id/admisi/';
const CONTACT_WA = process.env.NEXT_PUBLIC_CONTACT_WA ?? '6289531851105';
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'humas@sibermu.ac.id';

const ADMISSION_PATHS = [
  {
    id: 'reguler',
    title: 'Jalur Reguler',
    description: 'Untuk lulusan SMA/SMK/MA sederajat yang ingin menempuh pendidikan sarjana S1 secara daring penuh tanpa batas jarak geografis.',
  },
  {
    id: 'karyawan',
    title: 'Jalur Karyawan',
    description: 'Untuk profesional dan pekerja aktif yang ingin meningkatkan kualifikasi akademik sarjana sambil tetap produktif berkarier.',
  },
  {
    id: 'persyarikatan',
    title: 'Jalur Persyarikatan',
    description: 'Untuk anggota keluarga besar persyarikatan Muhammadiyah dan ' + 'Aisyiyah dengan kemudahan proses sesuai ketentuan admisi resmi.',
  },
  {
    id: 'prestasi',
    title: 'Jalur Prestasi',
    description: 'Untuk calon mahasiswa dengan rekam jejak capaian akademik unggulan maupun non-akademik di tingkat regional hingga nasional.',
  },
];

const FAQS = [
  {
    question: 'Apakah ijazah SiberMu resmi?',
    answer: 'SiberMu menyelenggarakan pendidikan sarjana dengan izin Kemendikbudristek RI No. 430/E/O/2021 dan status akreditasi institusi BAIK dari BAN-PT. Ijazah yang diterbitkan sah secara hukum dan diakui secara nasional.',
  },
  {
    question: 'Bagaimana sistem kuliah dan ujian di SiberMu?',
    answer: 'Seluruh perkuliahan diselenggarakan secara daring melalui sistem pembelajaran digital SiberMu. Materi pembelajaran, forum interaktif, pendampingan dosen, dan evaluasi terjadwal mengikuti kalender akademik.',
  },
  {
    question: 'Apakah biaya kuliah dapat dicicil?',
    answer: 'SiberMu menyediakan pilihan pembayaran biaya kuliah yang terencana dan dapat dicicil per semester. Panduan skema dan ketentuannya dapat diakses langsung melalui portal admisi resmi.',
  },
];

export default function AdmissionCTA() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section
      id="jalur-admisi"
      aria-labelledby="admission-heading"
      className="bg-background py-section border-b border-primary/15"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {/* Header Section */}
        <div className="grid gap-8 border-b border-primary/15 pb-12 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-3">
              Penerimaan Mahasiswa Baru
            </p>
            <h2
              id="admission-heading"
              className="font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-medium text-text-primary leading-tight"
            >
              Ambil langkah akademik berikutnya, dari tempat Anda berada saat ini.
            </h2>
          </div>
          <div>
            <p className="max-w-xl font-body text-sm leading-relaxed text-text-secondary">
              Pilih jalur pendaftaran yang sesuai dengan latar belakang Anda, lalu selesaikan proses registrasi melalui portal admisi resmi SiberMu.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={ADMISSIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center bg-primary px-7 py-3 font-body text-xs font-bold uppercase tracking-[0.12em] text-surface transition-colors hover:bg-primary-hover focus-visible:rounded"
              >
                Daftar Mahasiswa Baru
              </a>
              <a
                href={INFO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center border border-primary/30 bg-surface px-7 py-3 font-body text-xs font-bold uppercase tracking-[0.12em] text-primary transition-colors hover:border-primary hover:bg-background focus-visible:rounded"
              >
                Panduan Admisi
              </a>
            </div>
          </div>
        </div>

        {/* 4 Jalur Pendaftaran dengan Architectural Index Grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ADMISSION_PATHS.map((path, index) => (
            <article
              key={path.id}
              className="group flex flex-col justify-between border border-primary/15 bg-surface p-6 transition-colors duration-150 hover:border-primary"
            >
              <div>
                <span className="font-display text-sm font-bold text-accent-gold">
                  0{index + 1}
                </span>
                <h3 className="mt-3 font-display text-lg font-medium text-text-primary transition-colors group-hover:text-primary">
                  {path.title}
                </h3>
                <p className="mt-2.5 font-body text-xs leading-relaxed text-text-secondary">
                  {path.description}
                </p>
              </div>
              <div className="mt-5 border-t border-primary/10 pt-3 text-[11px] font-semibold text-primary uppercase tracking-wider">
                Jalur Resmi PJJ
              </div>
            </article>
          ))}
        </div>

        {/* Section FAQ Interaktif */}
        <div id="faq" className="mt-section-sm grid gap-10 border-t border-primary/15 pt-section-sm md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-3">
              Tanya Jawab Admisi
            </p>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-medium text-text-primary leading-tight">
              Jawaban penting sebelum Anda memulai pendaftaran.
            </h2>
            <p className="mt-4 max-w-sm font-body text-xs leading-relaxed text-text-secondary">
              Pertanyaan umum mengenai legalitas ijazah, ritme pembelajaran jarak jauh, dan rencana biaya studi.
            </p>
          </div>

          <div className="border-t border-primary/15">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <article
                  key={faq.question}
                  className="border-b border-primary/15"
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left font-body text-sm font-semibold text-text-primary hover:text-primary transition-colors focus-visible:rounded"
                    >
                      <span>{faq.question}</span>
                      <span
                        className="shrink-0 font-display text-xl font-normal text-primary"
                        aria-hidden="true"
                      >
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-answer-${index}`}
                    hidden={!isOpen}
                    className="pb-5 pr-8 font-body text-xs leading-relaxed text-text-secondary"
                  >
                    {faq.answer}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Kontak Resmi & Kantor Pusat */}
        <div id="kontak" className="mt-section-sm grid gap-8 border-t border-primary/15 pt-10 md:grid-cols-2">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary mb-2">
              Layanan Informasi & Konsultasi Admisi
            </p>
            <div className="mt-4 flex flex-col gap-2.5">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-body text-sm font-semibold text-text-primary hover:text-primary transition-colors focus-visible:rounded"
              >
                Email: {CONTACT_EMAIL}
              </a>
              <a
                href={`https://wa.me/${CONTACT_WA}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm font-semibold text-text-primary hover:text-primary transition-colors focus-visible:rounded"
              >
                WhatsApp: +62 895-3185-1105
              </a>
              <a
                href="https://t.me/+6281919071707"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm font-semibold text-text-primary hover:text-primary transition-colors focus-visible:rounded"
              >
                Telegram Resmi SiberMu
              </a>
            </div>
          </div>

          <address className="font-body text-xs leading-relaxed text-text-secondary not-italic md:border-l md:border-primary/15 md:pl-8">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-text-primary">
              Kantor Pusat Universitas Siber Muhammadiyah
            </span>
            Jl. Kaliurang KM 5,5 No. 72, Caturtunggal, Depok, Sleman, Daerah Istimewa Yogyakarta 55281
          </address>
        </div>
      </div>
    </section>
  );
}
