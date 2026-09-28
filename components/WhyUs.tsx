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
  // Index pilar yang sedang aktif di viewport (scroll-driven highlight)
  const [activePillar, setActivePillar] = useState<number>(0);
  const pillarRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;

    registerGsap();

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {

      // Desktop: parallax subtle pada tiap panel pilar saat scroll track berjalan
      mm.add('(min-width: 768px)', () => {
        const panels = gsap.utils.toArray<HTMLElement>('[data-pillar]');
        gsap.to(panels, {
          yPercent: -65,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-pillars-track]',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.7,
          },
        });

        // Scroll-driven active pillar highlight (IntersectionObserver pola GSAP)
        // Alasan: user tahu sedang "membaca" pilar mana, bukan scroll buta.
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
          {/* Alasan: user tahu posisi mereka dalam narasi 4 pilar tanpa harus scroll balik ke atas. */}
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
                  {/* Garis indikator aktif */}
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

        {/* Kolom Kanan: Scroll Track Pilar */}
        <div data-pillars-track className="border-l border-primary/15 bg-surface/80">
          <div className="flex flex-col">
            {PILLARS.map((pillar, index) => {
              const isActive = activePillar === index;
              return (
                <article
                  key={pillar.number}
                  ref={(el) => { pillarRefs.current[index] = el; }}
                  data-pillar
                  className={[
                    'relative flex min-h-[60svh] flex-col justify-between',
                    'border-b border-primary/15 bg-surface p-6 sm:p-10 md:min-h-svh md:p-12',
                    'transition-colors duration-300',
                    // Reflective active state: border kiri tebal + bg sedikit berbeda
                    // Alasan: sinyal posisi tanpa glow — hierarki lewat warna & batas.
                    isActive
                      ? 'border-l-2 border-l-primary bg-[#F9FAF6]'
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
                    <span className="border border-primary/15 px-2.5 py-0.5 font-body text-[11px] text-text-secondary">
                      {index + 1} / {PILLARS.length}
                    </span>
                  </div>

                  {/* Konten Utama */}
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
