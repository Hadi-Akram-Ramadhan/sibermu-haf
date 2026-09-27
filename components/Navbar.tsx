'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const ADMISSIONS_URL = process.env.NEXT_PUBLIC_ADMISSIONS_URL ?? 'https://admissions.sibermu.ac.id/';

const NAV_LINKS = [
  { label: 'Program Studi', href: '#program' },
  { label: 'Keunggulan', href: '#keunggulan' },
  { label: 'Pendaftaran', href: '#jalur-admisi' },
  { label: 'Kontak', href: '#kontak' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      role="banner"
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
        scrolled
          ? 'bg-surface/95 backdrop-blur-sm border-b border-primary/15 shadow-[0_1px_3px_0_rgba(11,93,59,0.06)]'
          : 'bg-background/90 backdrop-blur-sm border-b border-transparent',
      ].join(' ')}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-10"
        aria-label="Navigasi utama"
      >
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-baseline gap-2 font-display focus-visible:rounded"
            aria-label="Universitas Siber Muhammadiyah, kembali ke beranda"
          >
            <span className="text-xl font-bold tracking-tight text-primary">
              SiberMu
            </span>
            <span className="hidden sm:inline text-xs font-body uppercase tracking-[0.14em] text-text-secondary">
              Univ. Siber Muhammadiyah
            </span>
          </Link>
          <span className="hidden lg:inline-block h-3.5 w-px bg-primary/20" aria-hidden="true" />
          <span className="hidden lg:inline text-[11px] font-body uppercase tracking-[0.12em] text-text-secondary">
            PJJ S1 Online Resmi
          </span>
        </div>

        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-text-secondary transition-colors hover:text-primary focus-visible:rounded"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={ADMISSIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-primary px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.12em] text-surface transition-colors hover:bg-primary-hover focus-visible:rounded"
          >
            Daftar Sekarang
          </a>
        </div>

        <button
          ref={hamburgerRef}
          type="button"
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center gap-1.5 p-2 text-text-primary focus-visible:rounded"
        >
          <span
            className={[
              'block h-0.5 w-5 bg-current transition-all duration-200 origin-center',
              menuOpen ? 'translate-y-2 rotate-45' : '',
            ].join(' ')}
          />
          <span
            className={[
              'block h-0.5 w-5 bg-current transition-all duration-200',
              menuOpen ? 'opacity-0' : '',
            ].join(' ')}
          />
          <span
            className={[
              'block h-0.5 w-5 bg-current transition-all duration-200 origin-center',
              menuOpen ? '-translate-y-2 -rotate-45' : '',
            ].join(' ')}
          />
        </button>
      </nav>

      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Menu navigasi"
        aria-modal="true"
        className={[
          'md:hidden fixed inset-0 top-[57px] bg-surface z-40',
          'flex-col px-6 pt-8 pb-10 gap-8 border-b border-primary/20 shadow-xl',
          menuOpen ? 'flex' : 'hidden',
        ].join(' ')}
      >
        <ul className="flex flex-col gap-5 list-none m-0 p-0" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={closeMenu}
                className="font-display text-2xl font-medium text-text-primary hover:text-primary transition-colors focus-visible:rounded"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="pt-4 border-t border-primary/15">
          <a
            href={ADMISSIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="flex items-center justify-center min-h-12 w-full bg-primary px-6 py-3.5 font-body text-sm font-semibold uppercase tracking-[0.12em] text-surface hover:bg-primary-hover transition-colors focus-visible:rounded"
          >
            Daftar Mahasiswa Baru
          </a>
        </div>
      </div>
    </header>
  );
}
