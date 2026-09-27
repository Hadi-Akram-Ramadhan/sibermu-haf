export default function MarqueeTicker() {
  const items = [
    'UNIVERSITAS SIBER MUHAMMADIYAH',
    'PENDIDIKAN JARAK JAUH',
    '6 PROGRAM STUDI S1',
    'AKREDITASI BAIK',
    'YOGYAKARTA / INDONESIA',
  ];

  return (
    <div className="overflow-hidden border-y border-primary/20 bg-primary py-3 text-surface" aria-label="Informasi SiberMu">
      <div className="marquee-track flex min-w-max items-center">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center whitespace-nowrap font-body text-xs font-semibold tracking-[0.14em]">
            <span className="mx-6 text-accent-gold" aria-hidden="true">+</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
