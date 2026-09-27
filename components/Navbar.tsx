'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
  { label: 'Program Studi', href: '#program' },
  { label: 'Keunggulan', href: '#keunggulan' },
  { label: 'Pendaftaran', href: '#jalur-admisi' },
  { label: 'Kontak', href: '#kontak' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Tutup menu saat klik link atau tekan Escape
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

  // Kunci scroll body saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      role="banner"
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-surface border-b border-primary/10 shadow-[0_1px_0_0_rgba(11,93,59,0.08)]'
          : 'bg-transparent',
      ].join(' ')}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-10"
        aria-label="Navigasi utama"
      >
        {/* Logo & Status Readout */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-display focus-visible:rounded"
            aria-label="Universitas Siber Muhammadiyah, kembali ke beranda"
          >
            {/* Wordmark, siap diganti logo SVG/PNG */}
            <span
              className={[
                'text-xl font-semibold tracking-tight transition-colors duration-300',
                scrolled ? 'text-primary' : 'text-surface',
              ].join(' ')}
            >
              SiberMu
            </span>
            <span
              className={[
                'hidden sm:inline text-xs font-body font-normal uppercase tracking-widest transition-colors duration-300 mt-0.5',
                scrolled ? 'text-text-secondary' : 'text-surface/70',
              ].join(' ')}
            >
              Univ. Siber Muhammadiyah
            </span>
          </Link>

          {/* Technical status indicator ala bleibtgleich */}
          <div
            className={[
              'hidden lg:flex items-center gap-2 border-l pl-4 font-body text-[11px] uppercase tracking-[0.14em] transition-colors',
              scrolled ? 'border-primary/15 text-text-secondary' : 'border-surface/20 text-surface/75',
            ].join(' ')}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-gold" />
            <span>PJJ Online</span>
            <span className="text-accent-gold">/</span>
            <span>Yogyakarta</span>
          </div>
        </div>

        {/* Nav links desktop */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={[
                  'font-body text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-200 focus-visible:rounded',
                  scrolled
                    ? 'text-text-secondary hover:text-primary'
                    : 'text-surface/80 hover:text-surface',
                ].join(' ')}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <a
          href={process.env.NEXT_PUBLIC_ADMISSIONS_URL ?? 'https://admissions.sibermu.ac.id/'}
          target="_blank"
          rel="noopener noreferrer"
          className={[
            'hidden md:inline-flex items-center px-4 py-2 text-xs font-body font-semibold uppercase tracking-[0.12em]',
            'border transition-colors duration-200 focus-visible:rounded',
            scrolled
              ? 'border-primary text-primary hover:bg-primary hover:text-surface'
              : 'border-surface text-surface hover:bg-surface hover:text-primary',
          ].join(' ')}
        >
          Daftar Sekarang
        </a>

        {/* Hamburger mobile */}
        <button
          ref={hamburgerRef}
          type="button"
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
          className={[
            'md:hidden flex flex-col gap-1.5 p-2 focus-visible:rounded',
            scrolled ? 'text-primary' : 'text-surface',
          ].join(' ')}
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

      {/* Mobile menu drawer */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-label="Menu navigasi"
        aria-modal="true"
        className={[
          'md:hidden fixed inset-0 top-[72px] bg-surface z-40',
          'flex-col px-5 pt-8 pb-10 gap-8',
          menuOpen ? 'flex' : 'hidden',
        ].join(' ')}
      >
        <ul className="flex flex-col gap-6 list-none m-0 p-0" role="list">
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

        <a
          href={process.env.NEXT_PUBLIC_ADMISSIONS_URL ?? 'https://admissions.sibermu.ac.id/'}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
          className="inline-flex items-center justify-center px-6 py-4 font-body font-semibold text-surface bg-primary hover:bg-primary-hover transition-colors focus-visible:rounded"
        >
          Daftar Sekarang
        </a>
      </div>
    </header>
  );
}
