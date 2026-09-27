'use client';

import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;

    registerGsap();
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add('(min-width: 768px)', () => {
        const panels = gsap.utils.toArray<HTMLElement>('[data-pillar]');
        gsap.to(panels, {
          yPercent: -70,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-pillars-track]',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
          },
        });
      });

      mm.add('(max-width: 767px)', () => {
        gsap.from('[data-pillar]', {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.1,
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
        {/* Kolom Kiri: Pinned Sticky Title */}
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
            Kuliah jarak jauh bukan sekadar memindahkan papan tulis ke layar digital. Ini tentang membuka akses belajar yang terstruktur, bermartabat, dan relevan dengan tantangan zaman.
          </p>

          <div className="mt-8 hidden md:flex items-center gap-3 text-xs font-semibold text-text-secondary font-body">
            <span className="h-px w-8 bg-accent-gold" />
            <span>4 Pilar Utama Pembelajaran PJJ</span>
          </div>
        </div>

        {/* Kolom Kanan: Pinned Scroll Track */}
        <div data-pillars-track className="border-l border-primary/15 bg-surface/80">
          <div className="flex flex-col">
            {PILLARS.map((pillar, index) => (
              <article
                key={pillar.number}
                data-pillar
                className="group relative flex min-h-[60svh] flex-col justify-between border-b border-primary/15 bg-surface p-6 sm:p-10 md:min-h-svh md:p-12 transition-colors duration-200 hover:bg-[#F9FAF6]"
              >
                {/* Header Pilar */}
                <div className="flex items-center justify-between border-b border-primary/10 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-lg font-bold text-accent-gold">
                      {pillar.number}
                    </span>
                    <span className="h-3 w-px bg-primary/20" />
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
                  <h3 className="font-display text-xl sm:text-2xl font-medium text-text-primary transition-colors group-hover:text-primary">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 font-body text-sm leading-relaxed text-text-secondary">
                    {pillar.description}
                  </p>
                </div>

                {/* Footer Pilar */}
                <div className="flex items-center justify-between pt-4 border-t border-primary/10 font-body text-xs text-text-secondary">
                  <span>Standar Akademik SiberMu</span>
                  <span className="text-[11px] font-mono text-accent-gold font-semibold uppercase">
                    Kampus Merdeka
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
