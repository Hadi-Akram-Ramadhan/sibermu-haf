'use client';

import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion, registerGsap } from '@/lib/gsap';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  note?: string;
}

const STATS: StatItem[] = [
  { value: 6, suffix: '', label: 'Program Studi S1', note: 'Pendidikan Jarak Jauh' },
  { value: 2, suffix: '', label: 'Fakultas', note: 'Teknologi & Bisnis-Humaniora' },
  { value: 100, suffix: '%', label: 'Kuliah Online', note: 'Tanpa hadir ke kampus' },
  { value: 2021, suffix: '', label: 'Izin Operasional', note: 'Mendikbudristek No. 430/E/O/2021' },
];

function CounterItem({ item, index }: { item: StatItem; index: number }) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!numRef.current) return;

    if (prefersReducedMotion()) {
      numRef.current.textContent = String(item.value);
      return;
    }

    registerGsap();
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: item.value,
        duration: 1.6,
        ease: 'power2.out',
        delay: index * 0.12,
        onUpdate() {
          if (numRef.current) {
            numRef.current.textContent = String(Math.round(obj.val));
          }
        },
        scrollTrigger: {
          trigger: numRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, [item.value, index]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline gap-0.5">
        <span
          ref={numRef}
          className="font-display text-display-xl font-medium text-primary tabular-nums"
          aria-label={String(item.value)}
        >
          0
        </span>
        {item.suffix && (
          <span className="font-display text-display-lg font-medium text-primary">
            {item.suffix}
          </span>
        )}
      </div>
      <p className="font-body text-base font-semibold text-text-primary">{item.label}</p>
      {item.note && (
        <p className="font-body text-sm text-text-secondary leading-snug">{item.note}</p>
      )}
    </div>
  );
}

export default function Stats() {
  return (
    <section
      id="tentang"
      aria-labelledby="stats-heading"
      className="bg-surface py-section border-b border-primary/10"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {/* Heading asimetris, bukan centered title generik */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 md:items-end">
          <h2
            id="stats-heading"
            className="font-display text-display-lg font-medium text-text-primary"
          >
            Satu keputusan yang mengubah{' '}
            <em className="not-italic text-primary">cara Anda belajar</em>
          </h2>
          <p className="font-body text-base leading-relaxed text-text-secondary md:text-right">
            Universitas Siber Muhammadiyah beroperasi di bawah izin resmi Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi Republik Indonesia dengan status akreditasi institusi{' '}
            <strong className="text-text-primary">Baik</strong>.
          </p>
        </div>

        {/* Grid angka, layout 2x2, desktop bisa 4 kolom */}
        <dl className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">
          {STATS.map((item, i) => (
            <div key={item.label} className="flex flex-col gap-1">
              <CounterItem item={item} index={i} />
            </div>
          ))}
        </dl>

        {/* Satu garis aksen gold yang hemat di bawah statistik */}
        <div
          className="mt-16 h-px w-16 bg-accent-gold"
          role="presentation"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
