const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/sibermu' },
  { label: 'Instagram', href: 'https://www.instagram.com/sibermu/' },
  { label: 'X (Twitter)', href: 'https://twitter.com/sibermu' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCeyzSDwnAzK3Hfza5hMcICw' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-surface border-t border-primary-hover" aria-label="Footer">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_0.7fr] md:gap-20">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-medium tracking-tight">SiberMu</span>
              <span className="font-body text-xs uppercase tracking-[0.14em] text-surface/70">
                Pendidikan Jarak Jauh
              </span>
            </div>
            <p className="mt-4 max-w-lg font-body text-sm leading-relaxed text-surface/80">
              Universitas Siber Muhammadiyah menyelenggarakan pendidikan tinggi jarak jauh berbasis teknologi digital dengan memadukan keunggulan akademik, fleksibilitas belajar, dan nilai Islam berkemajuan.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-body text-surface/70">
              <span className="border border-surface/20 bg-surface/10 px-2.5 py-1">
                SK Mendikbudristek No. 430/E/O/2021
              </span>
              <span className="border border-surface/20 bg-surface/10 px-2.5 py-1">
                Akreditasi BAN-PT (BAIK)
              </span>
            </div>
          </div>

          <div>
            <p className="mb-4 font-body text-xs font-bold uppercase tracking-[0.14em] text-surface/70">
              Kanal Resmi & Media Sosial
            </p>
            <ul className="m-0 flex flex-wrap gap-x-6 gap-y-3 p-0 list-none" role="list">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-surface/90 underline decoration-surface/30 underline-offset-4 transition-colors hover:text-surface hover:decoration-surface focus-visible:rounded"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-surface/15 pt-6 text-xs font-body text-surface/70">
              <p className="font-semibold text-surface">Persyarikatan Muhammadiyah</p>
              <p className="mt-1">Pendidikan Berkemajuan untuk Seluruh Pelosok Indonesia</p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-surface/20 pt-6 font-body text-xs text-surface/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Universitas Siber Muhammadiyah. Hak cipta dilindungi undang-undang.</p>
          <a
            href="https://sibermu.ac.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-surface transition-colors focus-visible:rounded"
          >
            sibermu.ac.id
          </a>
        </div>
      </div>
    </footer>
  );
}
