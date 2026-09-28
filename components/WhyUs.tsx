'use client';

/**
 * WhyUs.tsx — Pinned Scroll Storytelling: 4 Pilar PJJ SiberMu
 *
 * Pola zero.university:
 *  - Desktop: kolom kiri sticky (judul tetap), kolom kanan scroll mengungkap pilar satu per satu.
 *  - ScrollTrigger IntersectionObserver mendeteksi pilar mana yang sedang di viewport:
 *    nomor pilar yang aktif di-highlight warna primary (efek "satu cerita dalam satu layar").
 *  - Mobile: stagger reveal sederhana (parallax tidak cocok di layar kecil).
 *
 * Reflective modern:
 *  - Pilar aktif mendapat border-left primary tebal + background surface lebih tegas.
 *  - Bukan glow, bukan badge — transisi border & background adalah sinyal hierarki.
 *
 * Cleanup: gsap.matchMedia + gsap.context selalu di-revert di useEffect cleanup.
 */

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion, registerGsap } from '@/lib/gsap';

interface Pillar {
  number: string;
  tag: string;
  title: string;
  description: string;
}

const PILLARS: Pillar[] = [
  {
    number: '01',
    tag: 'Fleksibilitas PJJ',
    title: 'Ruang belajar yang mengikuti ritme hidup Anda.',
    description:
      'Materi kuliah, forum diskusi, dan pendampingan akademik dirancang khusus untuk pembelajaran jarak jauh. Anda leluasa menata waktu studi tanpa meninggalkan pekerjaan, keluarga, atau amanah komunitas.',
  },
  {
    number: '02',
    tag: 'Karakter & Moralitas',
    title: 'Ilmu yang berpijak pada nilai Islam berkemajuan.',
    description:
      'Pendidikan di SiberMu menempatkan integritas moral, kepedulian sosial, dan kemandirian berpikir kritis sebagai bagian utuh dari kultur akademik, bukan sekadar pelengkap formalitas.',
  },
  {
    number: '03',
    tag: 'Relevansi Industri',
    title: 'Kurikulum untuk dunia kerja yang terus bergerak.',
    description:
      'Setiap program sarjana PJJ menghubungkan pemahaman konseptual dengan studi kasus nyata, diperkuat semangat Kampus Merdeka untuk kesiapan karier profesional masa kini.',
  },
  {
    number: '04',
    tag: 'Akses Berkeadilan',
    title: 'Biaya kuliah terencana dan dapat dicicil.',
    description:
      'SiberMu berkomitmen membuka akses pendidikan tinggi seluas-luasnya melalui skema biaya transparan yang dapat dicicil per semester, menjamin kepastian studi tanpa kendala finansial mendadak.',
  },
];

export default function WhyUs() {
  const rootRef = useRef<HTMLElement>(null);
  const [activePillar, setActivePillar] = useState<number>(0);
  const pillarRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;

    registerGsap();

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Desktop: scroll highlight on pillar panels
      mm.add('(min-width: 768px)', () => {
        const panels = gsap.utils.toArray<HTMLElement>('[data-pillar]');

        panels.forEach((panel, i) => {
          gsap.to(panel, {
            scrollTrigger: {
              trigger: panel,
              start: 'top center',
              end: 'bottom center',
              onEnter: () => setActivePillar(i),
              onEnterBack: () => setActivePillar(i),
            },
          });
        });
      });

      // Mobile: stagger reveal dari bawah saat masuk viewport
      mm.add('(max-width: 767px)', () => {
        gsap.from('[data-pillar]', {
          opacity: 0,
          y: 24,
          duration: 0.55,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 75%',
            once: true,
          },
        });
      });
    }, rootRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="keunggulan"
      aria-labelledby="why-us-heading"
      className="bg-[#F4F5F0] border-b border-primary/15"
    >
      <div className="mx-auto grid max-w-7xl md:grid-cols-[0.85fr_1.15fr] md:px-10">
        {/* Kolom Kiri: Sticky Title + Pilar Indicator */}
        <div className="px-5 py-section-sm md:sticky md:top-0 md:flex md:h-svh md:flex-col md:justify-center md:px-0 md:pr-12">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-3">
            Keunggulan SiberMu
          </p>

          <h2
            id="why-us-heading"
            className="font-display text-[clamp(1.85rem,3.2vw,2.5rem)] font-medium text-text-primary leading-tight"
          >
            Pendidikan tinggi yang berakar pada kenyataan hidup.
          </h2>

          <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-text-secondary">
            Kuliah jarak jauh bukan sekadar memindahkan papan tulis ke layar digital. Ini tentang
            membuka akses belajar yang terstruktur, bermartabat, dan relevan dengan tantangan zaman.
          </p>

          {/* Pilar navigator: indikator aktif berdasarkan scroll position */}
          <nav
            aria-label="Navigator pilar keunggulan"
            className="mt-10 hidden md:flex flex-col gap-3"
          >
            {PILLARS.map((pillar, i) => {
              const isActive = activePillar === i;
              return (
                <div
                  key={pillar.number}
                  className="flex items-center gap-3 transition-all duration-300"
                  aria-current={isActive ? 'step' : undefined}
                >
                  <div
                    className={[
                      'h-px transition-all duration-300',
                      isActive ? 'w-8 bg-primary' : 'w-4 bg-primary/25',
                    ].join(' ')}
                    aria-hidden="true"
                  />
                  <span
                    className={[
                      'font-display text-sm font-bold transition-colors duration-300',
                      isActive ? 'text-primary' : 'text-text-secondary/50',
                    ].join(' ')}
                  >
                    {pillar.number}
                  </span>
                  <span
                    className={[
                      'font-body text-xs uppercase tracking-wider transition-colors duration-300',
                      isActive ? 'text-text-secondary' : 'text-text-secondary/40',
                    ].join(' ')}
                  >
                    {pillar.tag}
                  </span>
                </div>
              );
            })}
          </nav>

          <div className="mt-8 hidden md:flex items-center gap-3 text-xs font-semibold text-text-secondary font-body">
            <span className="h-px w-8 bg-accent-gold" />
            <span>4 Pilar Utama Pembelajaran PJJ</span>
          </div>
        </div>

        {/* Kolom Kanan: Scroll Track Pilar dengan Konten Visual Kaya */}
        <div data-pillars-track className="border-l border-primary/15 bg-surface/80">
          <div className="flex flex-col">
            {PILLARS.map((pillar, index) => {
              const isActive = activePillar === index;
              return (
                <article
                  key={pillar.number}
                  ref={(el) => {
                    pillarRefs.current[index] = el;
                  }}
                  data-pillar
                  className={[
                    'relative flex min-h-[70svh] flex-col justify-between',
                    'border-b border-primary/15 bg-surface p-6 sm:p-10 md:p-12',
                    'transition-colors duration-300',
                    isActive
                      ? 'border-l-4 border-l-primary bg-[#F9FAF6]'
                      : 'border-l-0 hover:bg-[#F9FAF6]',
                  ].join(' ')}
                >
                  {/* Header Pilar */}
                  <div className="flex items-center justify-between border-b border-primary/10 pb-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={[
                          'font-display text-lg font-bold transition-colors duration-300',
                          isActive ? 'text-primary' : 'text-accent-gold',
                        ].join(' ')}
                      >
                        {pillar.number}
                      </span>
                      <span className="h-3 w-px bg-primary/20" aria-hidden="true" />
                      <span className="font-body text-xs font-semibold text-text-secondary uppercase tracking-wider">
                        {pillar.tag}
                      </span>
                    </div>
                    <span className="border border-primary/15 bg-background px-2.5 py-0.5 font-body text-[11px] text-text-secondary font-semibold">
                      {index + 1} / {PILLARS.length}
                    </span>
                  </div>

                  {/* Konten Utama & Visual Pendukung Khusus Per Pilar */}
                  <div className="my-auto py-6 max-w-xl">
                    <h3
                      className={[
                        'font-display text-xl sm:text-2xl font-medium transition-colors duration-300',
                        isActive ? 'text-primary' : 'text-text-primary',
                      ].join(' ')}
                    >
                      {pillar.title}
                    </h3>
                    <p className="mt-4 font-body text-sm leading-relaxed text-text-secondary">
                      {pillar.description}
                    </p>

                    {/* Pilar 01: Visual Foto & Fitur Belajar Fleksibel */}
                    {index === 0 && (
                      <div className="mt-6 border border-primary/15 bg-background p-3.5 shadow-sm">
                        <div className="relative aspect-[16/9] w-full overflow-hidden border border-primary/10 bg-surface mb-3">
                          <Image
                            src="/images/pjj-flexible-learning.jpg"
                            alt="Mahasiswa SiberMu belajar malam hari dengan fleksibel melalui laptop dan catatan"
                            fill
                            sizes="(max-width: 768px) 100vw, 500px"
                            className="object-cover object-center"
                          />
                          <div className="absolute top-2 left-2 border border-primary/20 bg-surface/90 px-2 py-0.5 text-[10px] font-body font-semibold uppercase tracking-wider text-primary backdrop-blur-sm">
                            Sistem LMS 24 Jam
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center font-body text-[11px]">
                          <div className="border border-primary/10 bg-surface p-2">
                            <span className="block font-bold text-primary">24/7</span>
                            <span className="text-text-secondary text-[10px]">Akses Modul</span>
                          </div>
                          <div className="border border-primary/10 bg-surface p-2">
                            <span className="block font-bold text-primary">Asinkron</span>
                            <span className="text-text-secondary text-[10px]">Atur Jam Sendiri</span>
                          </div>
                          <div className="border border-primary/10 bg-surface p-2">
                            <span className="block font-bold text-primary">38 Provinsi</span>
                            <span className="text-text-secondary text-[10px]">Jangkauan Nasional</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Pilar 02: Kultur Nilai Akademik Muhammadiyah */}
                    {index === 1 && (
                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <div className="border border-primary/15 bg-background p-3.5">
                          <span className="font-display text-sm font-bold text-primary block mb-1">
                            Integritas Ilmiah
                          </span>
                          <p className="font-body text-xs text-text-secondary leading-relaxed">
                            Standar kejujuran akademik dan orisinalitas riset berbobot nasional.
                          </p>
                        </div>
                        <div className="border border-primary/15 bg-background p-3.5">
                          <span className="font-display text-sm font-bold text-primary block mb-1">
                            Kemandirian Nalar
                          </span>
                          <p className="font-body text-xs text-text-secondary leading-relaxed">
                            Kemampuan berpikir kritis, solutif, dan berwawasan global.
                          </p>
                        </div>
                        <div className="border border-primary/15 bg-background p-3.5">
                          <span className="font-display text-sm font-bold text-primary block mb-1">
                            Kepedulian Sosial
                          </span>
                          <p className="font-body text-xs text-text-secondary leading-relaxed">
                            Ilmu pengetahuan yang didedikasikan untuk kemaslahatan masyarakat.
                          </p>
                        </div>
                        <div className="border border-primary/15 bg-background p-3.5">
                          <span className="font-display text-sm font-bold text-primary block mb-1">
                            Etika Digital
                          </span>
                          <p className="font-body text-xs text-text-secondary leading-relaxed">
                            Adab pemanfaatan teknologi siber yang berkeadaban dan amanah.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Pilar 03: Relevansi Industri & Kampus Merdeka */}
                    {index === 2 && (
                      <div className="mt-6 border border-primary/15 bg-background p-4">
                        <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-primary mb-3">
                          Ekosistem Pembelajaran Siap Kerja:
                        </p>
                        <div className="space-y-2.5 font-body text-xs">
                          <div className="flex items-center gap-2.5 bg-surface p-2.5 border border-primary/10">
                            <span className="text-primary font-bold">01.</span>
                            <span className="text-text-primary font-medium">
                              Studi Kasus & Proyek Nyata Industri Kontemporer
                            </span>
                          </div>
                          <div className="flex items-center gap-2.5 bg-surface p-2.5 border border-primary/10">
                            <span className="text-primary font-bold">02.</span>
                            <span className="text-text-primary font-medium">
                              Dosen Praktisi Profesional & Pengajar Ahli Tersertifikasi
                            </span>
                          </div>
                          <div className="flex items-center gap-2.5 bg-surface p-2.5 border border-primary/10">
                            <span className="text-primary font-bold">03.</span>
                            <span className="text-text-primary font-medium">
                              Portofolio Karya Digital Terstruktur untuk Mempercepat Karier
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Pilar 04: Transparansi Biaya & Skema Cicilan */}
                    {index === 3 && (
                      <div className="mt-6 border border-primary/15 bg-background p-4">
                        <div className="flex items-center justify-between border-b border-primary/10 pb-2 mb-3">
                          <span className="font-body text-xs font-bold uppercase tracking-wider text-primary">
                            Rincian Pembiayaan Terencana
                          </span>
                          <span className="border border-accent-gold/40 bg-surface px-2 py-0.5 text-[10px] font-bold text-accent-gold">
                            Transparan
                          </span>
                        </div>
                        <ul className="space-y-2 font-body text-xs text-text-secondary list-none p-0 m-0">
                          <li className="flex items-center justify-between bg-surface p-2 border border-primary/10">
                            <span>Skema Cicilan per Semester</span>
                            <strong className="text-primary font-bold">Bisa Dicicil Bertahap</strong>
                          </li>
                          <li className="flex items-center justify-between bg-surface p-2 border border-primary/10">
                            <span>Sumbangan Pengembangan Institusi (SPI)</span>
                            <strong className="text-text-primary font-bold">Nol Uang Gedung Tambahan</strong>
                          </li>
                          <li className="flex items-center justify-between bg-surface p-2 border border-primary/10">
                            <span>Fasilitas Pembelajaran Online & LMS</span>
                            <strong className="text-primary font-bold">Termasuk Penuh</strong>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Footer Pilar */}
                  <div className="flex items-center justify-between pt-4 border-t border-primary/10 font-body text-xs text-text-secondary">
                    <span>Standar Akademik SiberMu</span>
                    <span
                      className={[
                        'text-[11px] font-mono font-semibold uppercase transition-colors duration-300',
                        isActive ? 'text-primary' : 'text-accent-gold',
                      ].join(' ')}
                    >
                      Kampus Merdeka
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
