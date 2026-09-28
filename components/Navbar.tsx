'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const ADMISSIONS_URL =
  process.env.NEXT_PUBLIC_ADMISSIONS_URL ?? 'https://admissions.sibermu.ac.id/';

interface NavItem {
  label: string;
  href: string;
  sectionId?: string;
}

const NAV_LINKS: NavItem[] = [
  { label: 'Kemahasiswaan', href: '#kemahasiswaan', sectionId: 'kemahasiswaan' },
  { label: 'Ormawa & UKM', href: '#ormawa-ukm', sectionId: 'ormawa-ukm' },
  { label: 'Prestasi', href: '#prestasi', sectionId: 'prestasi' },
  { label: 'Layanan', href: '#layanan', sectionId: 'layanan' },
  { label: 'Al-Islam & AIK', href: '#aik', sectionId: 'aik' },
  { label: 'Kajian & Syiar', href: '#syiar-kajian', sectionId: 'syiar-kajian' },
  { label: 'Kontak', href: '#kontak', sectionId: 'kontak' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isDarkSection, setIsDarkSection] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Monitor scroll position, dynamic progress indicator, and active section spy
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Hitung progress scroll halaman (0 - 100)
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(
          100,
          Math.max(0, (currentScrollY / docHeight) * 100)
        );
        setScrollProgress(progress);
      }

      // Deteksi jika navbar berada di atas section gelap seperti #stats
      const statsEl = document.getElementById('stats');
      if (statsEl) {
        const rect = statsEl.getBoundingClientRect();
        // Ketika section stats berada di area navbar (0-70px dari atas viewport)
        if (rect.top <= 65 && rect.bottom >= 65) {
          setIsDarkSection(true);
        } else {
          setIsDarkSection(false);
        }
      }

      // Scroll spy untuk mendeteksi section yang aktif
      const sections = ['kemahasiswaan', 'aik', 'kontak', 'program', 'jalur-admisi'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard accessibility: Escape to close mobile menu
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

  // Lock body scroll when mobile menu is open
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isDarkSection
          ? 'bg-[#062919]/95 text-white border-b border-emerald-500/25 shadow-lg backdrop-blur-md py-2.5 sm:py-3'
          : scrolled
          ? 'bg-white/98 text-text-primary shadow-[0_4px_20px_-4px_rgba(11,93,59,0.12)] border-b border-primary/15 py-2 sm:py-2.5 backdrop-blur-md'
          : 'bg-[#FAFBF9]/95 text-text-primary border-b border-primary/10 py-3 sm:py-3.5 backdrop-blur-md',
      ].join(' ')}
    >
      {/* Dynamic Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-primary via-emerald-500 to-accent-gold transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 md:px-10"
        aria-label="Navigasi utama"
      >
        {/* Brand / Logo + Official Mandate Badge */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:rounded"
            aria-label="Universitas Siber Muhammadiyah, kembali ke beranda"
          >
            <div
              className={[
                'relative h-8 w-[135px] sm:h-9 sm:w-[155px] md:h-10 md:w-[170px] transition-all duration-200 group-hover:scale-[1.02]',
                isDarkSection ? 'brightness-0 invert' : '',
              ].join(' ')}
            >
              <Image
                src="/images/logo-sibermu-dark.png"
                alt="Universitas Siber Muhammadiyah"
                width={300}
                height={71}
                priority
                className="h-full w-auto object-contain"
              />
            </div>
            <span className="sr-only">SiberMu</span>
          </Link>

          <span
            className={[
              'hidden sm:inline-block h-5 w-px transition-colors duration-200',
              isDarkSection ? 'bg-white/20' : 'bg-primary/25',
            ].join(' ')}
            aria-hidden="true"
          />

          <div className="hidden sm:flex flex-col">
            <span
              className={[
                'text-[11px] md:text-[11.5px] font-bold font-display uppercase tracking-[0.12em] transition-colors duration-200',
                isDarkSection ? 'text-emerald-300' : 'text-primary',
              ].join(' ')}
            >
              Biro Kemahasiswaan & AIK
            </span>
            <span
              className={[
                'text-[9.5px] md:text-[10px] font-body transition-colors duration-200',
                isDarkSection ? 'text-white/70' : 'text-text-secondary',
              ].join(' ')}
            >
              Sinergi Prestasi & Karakter Berkemajuan
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links — Tipografi Bersih & Elegan (Tanpa Kotak Rusak) */}
        <ul
          className="hidden lg:flex items-center gap-4 xl:gap-6 list-none m-0 p-0"
          role="list"
        >
          {NAV_LINKS.map((link) => {
            const isActive = link.sectionId && activeSection === link.sectionId;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={[
                    'group relative py-1 text-xs xl:text-[13px] font-body font-medium tracking-normal transition-colors duration-150 whitespace-nowrap focus-visible:rounded',
                    isDarkSection
                      ? isActive
                        ? 'text-accent-gold font-bold'
                        : 'text-white/80 hover:text-white'
                      : isActive
                      ? 'text-primary font-bold'
                      : 'text-text-secondary hover:text-primary',
                  ].join(' ')}
                >
                  <span>{link.label}</span>
                  {/* Clean Hairline Underline Indicator (Tidak merusak layout) */}
                  <span
                    className={[
                      'absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-200',
                      isActive
                        ? isDarkSection
                          ? 'bg-accent-gold scale-x-100 opacity-100'
                          : 'bg-primary scale-x-100 opacity-100'
                        : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60 bg-current',
                    ].join(' ')}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href={ADMISSIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'inline-flex items-center justify-center px-4 py-2 font-body text-xs font-bold uppercase tracking-[0.1em] transition-all duration-150 focus-visible:rounded',
              isDarkSection
                ? 'bg-accent-gold text-background hover:bg-yellow-400 shadow-[2px_2px_0_0_#072C1C]'
                : 'bg-primary text-surface hover:bg-primary-hover shadow-[2px_2px_0_0_#063B25]',
            ].join(' ')}
          >
            Daftar Sekarang
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          ref={hamburgerRef}
          type="button"
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden flex flex-col justify-center gap-1.5 p-2 text-text-primary hover:text-primary transition-colors focus-visible:rounded"
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

      {/* Mobile Drawer Navigation */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Menu navigasi"
        aria-modal="true"
        className={[
          'lg:hidden fixed inset-0 top-[56px] sm:top-[60px] bg-white z-40',
          'flex-col px-6 pt-6 pb-10 gap-6 border-b-2 border-primary shadow-2xl overflow-y-auto',
          menuOpen ? 'flex' : 'hidden',
        ].join(' ')}
      >
        <div className="border-b border-primary/15 pb-3">
          <p className="font-display text-sm font-bold text-primary uppercase tracking-[0.12em]">
            Biro Kemahasiswaan & AIK
          </p>
          <p className="text-xs font-mono text-text-secondary mt-0.5">
            Portal Terpadu Mahasiswa Universitas Siber Muhammadiyah
          </p>
        </div>

        <ul className="flex flex-col gap-3 list-none m-0 p-0" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={closeMenu}
                className="block py-2 font-display text-lg font-medium text-text-primary hover:text-primary transition-colors border-b border-primary/5 focus-visible:rounded"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="pt-4 border-t border-primary/15 flex flex-col gap-3">
          <a
            href={ADMISSIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="flex items-center justify-center min-h-12 w-full bg-primary px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-surface hover:bg-primary-hover shadow-[3px_3px_0_0_#063B25] transition-colors focus-visible:rounded"
          >
            Daftar Sekarang
          </a>
          <a
            href="https://wa.me/6285179946901"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="flex items-center justify-center min-h-11 w-full border border-primary/30 bg-surface px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-primary hover:bg-primary/5 transition-colors focus-visible:rounded"
          >
            Hotline WhatsApp: 0851 7994 6901
          </a>
        </div>
      </div>
    </header>
  );
}
