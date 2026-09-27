const ADMISSIONS_URL = process.env.NEXT_PUBLIC_ADMISSIONS_URL ?? 'https://admissions.sibermu.ac.id/';
const INFO_URL = process.env.NEXT_PUBLIC_INFO_URL ?? 'https://sibermu.ac.id/admisi/';
const CONTACT_WA = process.env.NEXT_PUBLIC_CONTACT_WA ?? '6289531851105';
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'humas@sibermu.ac.id';

const ADMISSION_PATHS = [
  {
    id: 'reguler',
    title: 'Jalur Reguler',
    description: 'Terbuka untuk siapa pun yang telah menyelesaikan pendidikan SMA/sederajat dan ingin melanjutkan jenjang sarjana secara daring.',
  },
  {
    id: 'karyawan',
    title: 'Jalur Karyawan',
    description: 'Dirancang untuk profesional aktif yang ingin menyelesaikan atau meningkatkan jenjang akademik sembari tetap bekerja.',
  },
  {
    id: 'persyarikatan',
    title: 'Jalur Persyarikatan',
    description: 'Khusus anggota dan keluarga warga Muhammadiyah, dengan kemudahan proses dan apresiasi afiliasi Persyarikatan.',
  },
  {
    id: 'prestasi',
    title: 'Jalur Prestasi',
    description: 'Bagi pendaftar dengan rekam jejak akademik atau non-akademik yang unggul di bidang masing-masing.',
  },
];

export default function AdmissionCTA() {
  return (
    <section
      id="jalur-admisi"
      aria-labelledby="admission-heading"
      className="bg-background py-section"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {/* Headline besar + sub copy */}
        <div className="mb-20 max-w-3xl">
          <div className="mb-5 h-px w-12 bg-accent-gold" aria-hidden="true" />
          <h2
            id="admission-heading"
            className="font-display text-display-2xl font-medium text-text-primary"
          >
            Mulai semester depan adalah keputusan yang bisa Anda ambil hari ini.
          </h2>
          <p className="mt-8 max-w-xl font-body text-lg leading-relaxed text-text-secondary">
            SiberMu membuka empat jalur masuk supaya tidak ada hambatan waktu, lokasi, atau latar belakang yang menghentikan Anda memulai kuliah.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={ADMISSIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center bg-primary px-7 py-3.5 font-body text-sm font-semibold text-surface transition-colors hover:bg-primary-hover focus-visible:rounded"
            >
              Daftar Mahasiswa Baru
            </a>
            <a
              href={INFO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center border border-primary/30 bg-transparent px-7 py-3.5 font-body text-sm font-semibold text-primary transition-colors hover:bg-primary/5 focus-visible:rounded"
            >
              Informasi Lengkap Admisi
            </a>
          </div>
        </div>

        {/* Empat jalur masuk, disusun seperti index editorial */}
        <div className="border-y border-primary/20">
          {ADMISSION_PATHS.map((path, index) => (
            <div key={path.id} className="group grid gap-4 border-b border-primary/15 p-6 last:border-b-0 md:grid-cols-[0.15fr_0.85fr_1.7fr] md:items-center md:p-8 transition-colors hover:bg-surface">
              <span className="font-body text-xs font-semibold tracking-[0.14em] text-accent-gold">( 0{index + 1} )</span>
              <h3 className="font-display text-xl font-medium text-primary group-hover:translate-x-1 transition-transform">
                {path.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-text-secondary">
                {path.description}
              </p>
            </div>
          ))}
        </div>

        {/* Kontak aktif di bawah jalur masuk */}
        <div
          id="kontak"
          className="mt-16 flex flex-col gap-6 border-t border-primary/10 pt-14 md:flex-row md:items-start md:justify-between"
        >
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary mb-4">
              Ada pertanyaan?
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-body text-base font-medium text-text-primary hover:text-primary transition-colors focus-visible:rounded"
              >
                {CONTACT_EMAIL}
              </a>
              <a
                href={`https://wa.me/${CONTACT_WA}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-base font-medium text-text-primary hover:text-primary transition-colors focus-visible:rounded"
              >
                WhatsApp: +62 895-3185-1105
              </a>
              <a
                href="https://t.me/+6281919071707"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-base font-medium text-text-primary hover:text-primary transition-colors focus-visible:rounded"
              >
                Telegram Resmi SiberMu
              </a>
            </div>
          </div>

          <div className="max-w-sm">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary mb-4">
              Kantor Pusat
            </p>
            <address className="font-body text-sm leading-relaxed text-text-secondary not-italic">
              Jl. HOS Cokroaminoto No. 17, Kota Yogyakarta,
              <br />
              Daerah Istimewa Yogyakarta 55253
            </address>
          </div>
        </div>
      </div>
    </section>
  );
}
