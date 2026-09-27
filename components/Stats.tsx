'use client';

import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion, registerGsap } from '@/lib/gsap';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  note: string;
}

const STATS: StatItem[] = [
  { value: 6, suffix: '', label: 'Program Studi S1', note: 'Pendidikan Jarak Jauh' },
  { value: 2, suffix: '', label: 'Fakultas', note: 'Teknologi & Bisnis-Humaniora' },
  { value: 100, suffix: '%', label: 'Kuliah Online', note: 'Tanpa hadir fisik ke kampus' },
  { value: 2021, suffix: '', label: 'Izin Operasional', note: 'Pendidikan Tinggi Jarak Jauh' },
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
        delay: index * 0.1,
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
    <div className="flex items-baseline gap-1">
      <span
        ref={numRef}
        className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-medium leading-none text-[#E5B54F] tabular-nums"
        aria-label={String(item.value)}
      >
        0
      </span>
      {item.suffix && (
        <span className="font-display text-[clamp(1.5rem,2.5vw,2.25rem)] font-medium leading-none text-[#E5B54F]">
          {item.suffix}
        </span>
      )}
    </div>
  );
}

export default function Stats() {
  return (
    <section
      id="tentang"
      aria-labelledby="stats-heading"
      className="bg-[#072C1C] text-surface py-section border-y border-white/10"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {/* Header editorial kontras tinggi */}
        <div className="mb-14 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end md:gap-14">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-gold mb-3">
              Data & Legalitas Institusi
            </p>
            <h2
              id="stats-heading"
              className="font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-medium leading-tight text-surface"
            >
              Kepastian mutu dan legalitas resmi dalam setiap langkah belajar.
            </h2>
          </div>
          <p className="font-body text-base leading-relaxed text-surface/75">
            SiberMu beroperasi di bawah izin resmi Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI (Kemendikbudristek) No. 430/E/O/2021 dengan status akreditasi institusi Baik dari Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT).
          </p>
        </div>

        {/* Grid statistik arsitektural hairline */}
        <dl className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {STATS.map((item, i) => (
            <div
              key={item.label}
              className="group flex flex-col justify-between gap-5 border border-white/15 bg-white/[0.02] p-6 transition-colors duration-150 hover:bg-white/[0.06] hover:border-white/30 md:p-8"
            >
              <div>
                <CounterItem item={item} index={i} />
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="font-body text-sm font-semibold text-surface group-hover:text-accent-gold transition-colors">
                  {item.label}
                </p>
                <p className="mt-1 font-body text-xs leading-snug text-surface/60">
                  {item.note}
                </p>
              </div>
            </div>
          ))}
        </dl>

        <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-6 font-body text-xs text-surface/50">
          <span>Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT)</span>
          <span className="hidden sm:inline">Persyarikatan Muhammadiyah</span>
        </div>
      </div>
    </section>
  );
}
