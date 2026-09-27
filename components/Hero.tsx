'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger } from '@/lib/gsap';

const ADMISSIONS_URL = process.env.NEXT_PUBLIC_ADMISSIONS_URL ?? 'https://admissions.sibermu.ac.id/';

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;

    registerGsap();

    const context = gsap.context(() => {
      // Cinematic parallax image - bergerak lebih lambat saat scroll untuk depth
      gsap.to(imageRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text reveal per line dengan stagger - teknik mask editorial ala Awwwards SOTD
      gsap.from('.hero-line', {
        yPercent: 110,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power4.out',
        delay: 0.15,
      });

      // Detail metadata reveal halus setelah headline selesai
      gsap.from('.hero-detail', {
        opacity: 0,
        y: 20,
        duration: 0.65,
        ease: 'power2.out',
        delay: 1.2,
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen overflow-hidden bg-background pt-24 md:pt-32"
      aria-labelledby="hero-heading"
    >
      {/* Banner status akademik resmi di atas */}
      <div className="mx-auto max-w-7xl px-5 pb-section-sm md:px-10">
        <div className="mb-6 flex items-center justify-between border-b border-primary/10 pb-3 font-body text-[11px] uppercase tracking-[0.14em] text-text-secondary hero-detail">
          <span>[ UNIVERSITAS SIBER MUHAMMADIYAH • 2026 ]</span>
          <span className="hidden sm:inline-block">Pendidikan Jarak Jauh Resmi</span>
          <span>[ YOGYAKARTA / INDONESIA ]</span>
        </div>
      </div>

      {/* Full-bleed Editorial Layout */}
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-section-sm md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-16 md:px-10">
        {/* Kolom kiri: Typography Raksasa dengan Reveal Mask */}
        <div className="flex flex-col justify-end pb-6">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-6 hero-line">
            Universitas Siber Muhammadiyah
          </p>

          <h1 id="hero-heading" className="leading-[0.98]">
            <div className="overflow-hidden"><span className="block hero-line font-display text-[clamp(3.5rem,8.5vw,8.5rem)] font-medium text-text-primary">Belajar tanpa batas ruang,</span></div>
            <div className="overflow-hidden"><span className="block hero-line font-display text-[clamp(3rem,7.5vw,7rem)] font-normal italic text-primary">ilmu berdaya guna,</span></div>
            <div className="overflow-hidden"><span className="block hero-line font-display text-[clamp(2.5rem,6vw,5.5rem)] font-medium text-text-primary">untuk masa depan.</span></div>
          </h1>

          <p className="mt-8 max-w-xl font-body text-lg leading-relaxed text-text-secondary hero-detail">
            Program Sarjana PJJ yang memberi ruang belajar dari mana saja, tanpa meninggalkan pekerjaan, keluarga, dan pengabdian.
          </p>

          {/* Grid Legalitas Official Status */}
          <dl className="mt-8 grid max-w-xl gap-x-8 gap-y-6 border-t border-primary/10 pt-8 sm:grid-cols-2 hero-detail">
            <div>
              <dt className="font-body text-xs uppercase tracking-[0.1em] text-text-secondary">Surat Keputusan</dt>
              <dd className="mt-1 font-body text-sm font-bold text-text-primary">No. 430/E/O/2021</dd>
            </div>
            <div>
              <dt className="font-body text-xs uppercase tracking-[0.1em] text-text-secondary">Akreditasi Institusi</dt>
              <dd className="mt-1 font-body text-sm font-bold text-text-primary">BAIK, BAN-PT</dd>
            </div>
          </dl>

          {/* CTA Dual Action */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row hero-detail">
            <a
              href={ADMISSIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center bg-primary px-8 py-4 font-body text-sm font-bold uppercase tracking-[0.12em] text-surface transition-colors hover:bg-primary-hover focus-visible:rounded"
            >
              Daftar Mahasiswa Baru
            </a>
            <a
              href="#program"
              className="inline-flex min-h-14 items-center justify-center border border-primary/30 px-8 py-4 font-body text-sm font-bold uppercase tracking-[0.12em] text-primary transition-colors hover:bg-surface focus-visible:rounded"
            >
              Lihat Program Studi
            </a>
          </div>
        </div>

        {/* Kolom kanan: Gambar mahasiswa besar dengan efek parallax */}
        <div className="relative">
          <div
            ref={imageRef}
            className="relative aspect-[4/5] overflow-hidden border border-primary/10 bg-surface p-4 shadow-[10px_20px_40px_-12px_rgba(11,93,59,0.15)] md:aspect-[5/6]"
          >
            <Image
              src="/images/hero-student.jpg"
              alt="Mahasiswa sedang belajar secara mandiri menggunakan laptop"
              fill
              priority
              sizes="(max-width: 767px) calc(100vw - 40px), 48vw"
              quality={90}
              className="object-cover"
            />
            <figcaption className="absolute bottom-4 left-4 right-4 font-body text-xs leading-relaxed text-text-secondary">
              Pendidikan jarak jauh yang tetap dekat dengan proses belajar.
            </figcaption>
          </div>
        </div>
      </div>
    </section>
  );
}
