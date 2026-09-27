'use client';

import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion, registerGsap } from '@/lib/gsap';

interface Pillar {
  number: string;
  title: string;
  description: string;
}

const PILLARS: Pillar[] = [
  {
    number: '01',
    title: 'Ruang belajar yang mengikuti ritme hidup Anda.',
    description:
      'Materi, diskusi, dan pendampingan dirancang untuk pendidikan jarak jauh. Anda bisa menata waktu kuliah tanpa meninggalkan pekerjaan, keluarga, atau tanggung jawab di komunitas.',
  },
  {
    number: '02',
    title: 'Ilmu yang berpijak pada nilai Islam berkemajuan.',
    description:
      'Pendidikan di SiberMu menempatkan integritas, kepedulian sosial, dan daya pikir kritis sebagai bagian dari proses akademik, bukan pelengkap di akhir.',
  },
  {
    number: '03',
    title: 'Kurikulum untuk dunia kerja yang terus bergerak.',
    description:
      'Program sarjana PJJ menghubungkan teori dengan kebutuhan praktik melalui pembelajaran terapan dan semangat Kampus Merdeka.',
  },
  {
    number: '04',
    title: 'Biaya kuliah yang dapat direncanakan.',
    description:
      'SiberMu menyediakan skema biaya yang terjangkau dan dapat dicicil, supaya pendidikan tinggi tidak berhenti pada batas ruang atau waktu.',
  },
];

export default function WhyUs() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;

    registerGsap();
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Pin desktop: satu nilai fokus per viewport agar narasi tidak terasa seperti kartu fitur.
      mm.add('(min-width: 768px)', () => {
        const panels = gsap.utils.toArray<HTMLElement>('[data-pillar]');
        gsap.to(panels, {
          yPercent: -75,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-pillars-track]',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
          },
        });
      });

      // Mobile: reveal kecil, tanpa pin agar scroll tetap ringan.
      mm.add('(max-width: 767px)', () => {
        gsap.from('[data-pillar]', {
          opacity: 0,
          y: 24,
          duration: 0.55,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 70%',
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
      className="bg-background"
    >
      <div className="mx-auto grid max-w-7xl md:grid-cols-[0.85fr_1.15fr] md:px-10">
        <div className="px-5 py-section-sm md:sticky md:top-0 md:flex md:h-svh md:flex-col md:justify-center md:px-0 md:pr-16">
          <p className="mb-5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Mengapa SiberMu
          </p>
          <h2
            id="why-us-heading"
            className="font-display text-display-xl font-medium text-text-primary"
          >
            Pendidikan tinggi, tetap dekat dengan kehidupan nyata.
          </h2>
          <p className="mt-7 max-w-md font-body text-base leading-relaxed text-text-secondary">
            Kuliah jarak jauh bukan soal memindahkan kelas ke layar. Ini soal membuka akses belajar yang tetap bermakna, terarah, dan manusiawi.
          </p>
        </div>

        <div data-pillars-track className="overflow-hidden border-l border-primary/20 bg-surface">
          <div className="flex flex-col">
            {PILLARS.map((pillar, index) => (
              <article
                key={pillar.number}
                data-pillar
                className="group relative flex min-h-[75svh] flex-col justify-between border-b border-primary/15 bg-surface p-6 sm:p-10 md:min-h-svh md:p-14 transition-colors hover:bg-background/40"
              >
                <div className="flex items-center justify-between border-b border-primary/10 pb-4">
                  <span className="font-body text-xs font-semibold text-accent-gold uppercase tracking-[0.14em]">
                    [ PILAR {pillar.number} ]
                  </span>
                  <span className="font-body text-xs text-text-secondary">
                    {index + 1} / {PILLARS.length}
                  </span>
                </div>
                <div className="max-w-xl">
                  <h3 className="font-display text-display-lg font-medium text-text-primary group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-5 max-w-lg font-body text-base leading-relaxed text-text-secondary">
                    {pillar.description}
                  </p>
                </div>
                <div className="flex items-center gap-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
                  <span className="h-px w-6 bg-accent-gold" />
                  <span>Sistem Belajar SiberMu</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
