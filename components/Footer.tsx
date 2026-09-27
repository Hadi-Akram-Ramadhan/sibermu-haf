const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/sibermu' },
  { label: 'Instagram', href: 'https://www.instagram.com/sibermu/' },
  { label: 'X (Twitter)', href: 'https://twitter.com/sibermu' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCeyzSDwnAzK3Hfza5hMcICw' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-surface" aria-label="Footer">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_0.6fr] md:gap-24">
          <div>
            <p className="font-display text-3xl font-medium">SiberMu</p>
            <p className="mt-3 max-w-lg font-body text-sm leading-relaxed text-surface/75">
              Universitas Siber Muhammadiyah. Pendidikan jarak jauh untuk ilmu yang berdaya guna, berintegritas, dan berpihak pada kemajuan.
            </p>
          </div>
          <div>
            <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.14em] text-surface/60">
              Terhubung dengan SiberMu
            </p>
            <ul className="m-0 flex flex-wrap gap-x-5 gap-y-3 p-0 list-none" role="list">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-surface/85 underline decoration-surface/30 underline-offset-4 transition-colors hover:text-surface focus-visible:rounded"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-surface/20 pt-6 font-body text-xs text-surface/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Universitas Siber Muhammadiyah. Hak cipta dilindungi.</p>
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
