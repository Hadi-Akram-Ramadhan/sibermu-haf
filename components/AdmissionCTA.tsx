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
    description: 'Untuk lulusan SMA/sederajat yang ingin menempuh pendidikan sarjana secara daring.',
  },
  {
    id: 'karyawan',
    title: 'Jalur Karyawan',
    description: 'Untuk profesional aktif yang ingin meningkatkan jenjang akademik sambil tetap bekerja.',
  },
  {
    id: 'persyarikatan',
    title: 'Jalur Persyarikatan',
    description: 'Untuk anggota dan keluarga warga Muhammadiyah dengan kemudahan proses sesuai ketentuan admisi.',
  },
  {
    id: 'prestasi',
    title: 'Jalur Prestasi',
    description: 'Untuk pendaftar dengan rekam jejak akademik atau non-akademik sesuai syarat penerimaan.',
  },
];

const FAQS = [
  {
    question: 'Apakah ijazah SiberMu resmi?',
    answer: 'SiberMu menyelenggarakan pendidikan sarjana dengan izin Kemendikbudristek RI No. 430/E/O/2021 dan status akreditasi institusi BAIK dari BAN-PT.',
  },
  {
    question: 'Bagaimana sistem kuliah dan ujian di SiberMu?',
    answer: 'Perkuliahan diselenggarakan secara daring melalui sistem pembelajaran SiberMu. Materi, diskusi, pendampingan, dan evaluasi mengikuti kalender akademik yang berlaku.',
  },
  {
    question: 'Apakah biaya kuliah dapat dicicil?',
    answer: 'SiberMu menyediakan pilihan pembayaran biaya kuliah yang dapat direncanakan. Detail skema dan ketentuannya tersedia melalui kanal admisi resmi.',
  },
];

export default function AdmissionCTA() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="jalur-admisi" aria-labelledby="admission-heading" className="bg-background py-section">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid gap-10 border-b border-primary/15 pb-16 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-primary">Pendaftaran Mahasiswa Baru</p>
            <h2 id="admission-heading" className="mt-5 font-display text-display-xl font-medium text-text-primary">
              Ambil langkah akademik berikutnya, dari tempat Anda berada.
            </h2>
          </div>
          <div>
            <p className="max-w-xl font-body text-base leading-relaxed text-text-secondary">
              Pilih jalur pendaftaran yang sesuai, lalu lanjutkan proses melalui portal admisi resmi SiberMu.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={ADMISSIONS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center bg-primary px-6 py-3 font-body text-sm font-semibold text-surface transition-colors hover:bg-primary-hover">
                Daftar Mahasiswa Baru
              </a>
              <a href={INFO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center border border-primary/30 px-6 py-3 font-body text-sm font-semibold text-primary transition-colors hover:bg-surface">
                Panduan Admisi
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-y border-primary/20">
          {ADMISSION_PATHS.map((path, index) => (
            <article key={path.id} className="grid gap-4 border-b border-primary/15 py-7 last:border-b-0 md:grid-cols-[0.14fr_0.86fr_1.7fr] md:items-center md:gap-8">
              <span className="font-body text-xs font-semibold text-accent-gold">0{index + 1}</span>
              <h3 className="font-display text-xl font-medium text-text-primary">{path.title}</h3>
              <p className="font-body text-sm leading-relaxed text-text-secondary">{path.description}</p>
            </article>
          ))}
        </div>

        <div id="faq" className="mt-section-sm grid gap-10 border-t border-primary/15 pt-section-sm md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-primary">Informasi yang sering ditanyakan</p>
            <h2 className="mt-5 font-display text-display-lg font-medium text-text-primary">Jawaban sebelum Anda mendaftar.</h2>
          </div>
          <div className="border-t border-primary/20">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <article key={faq.question} className="border-b border-primary/20">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex min-h-16 w-full items-center justify-between gap-5 py-4 text-left font-body text-base font-semibold text-text-primary hover:text-primary"
                    >
                      {faq.question}
                      <span className="shrink-0 font-display text-2xl font-normal" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                    </button>
                  </h3>
                  <div id={`faq-answer-${index}`} hidden={!isOpen} className="pb-5 pr-10 font-body text-sm leading-relaxed text-text-secondary">
                    {faq.answer}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div id="kontak" className="mt-section-sm grid gap-8 border-t border-primary/15 pt-10 md:grid-cols-2">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">Butuh bantuan admisi?</p>
            <div className="mt-4 flex flex-col gap-3">
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-body text-base font-semibold text-text-primary hover:text-primary">{CONTACT_EMAIL}</a>
              <a href={`https://wa.me/${CONTACT_WA}`} target="_blank" rel="noopener noreferrer" className="font-body text-base font-semibold text-text-primary hover:text-primary">WhatsApp: +62 895-3185-1105</a>
              <a href="https://t.me/+6281919071707" target="_blank" rel="noopener noreferrer" className="font-body text-base font-semibold text-text-primary hover:text-primary">Telegram Resmi SiberMu</a>
            </div>
          </div>
          <address className="font-body text-sm leading-relaxed text-text-secondary not-italic md:justify-self-end md:max-w-sm">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.14em]">Kantor Pusat</span>
            Jl. Kaliurang KM 5,5 No. 72, Caturtunggal, Depok, Sleman, Daerah Istimewa Yogyakarta 55281
          </address>
        </div>
      </div>
    </section>
  );
}
