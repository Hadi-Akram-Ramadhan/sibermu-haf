# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Official Landing Page: Universitas Siber Muhammadiyah (SiberMu)

---

## 1. Executive Summary & Vision

- **Nama Produk**: Official Landing Page Universitas Siber Muhammadiyah (SiberMu)
- **Tipe Institusi**: Perguruan Tinggi Swasta berbasis Pendidikan Jarak Jauh (PJJ) Daring Penuh di bawah naungan Persyarikatan Muhammadiyah.
- **Tujuan Utama**: Menjadi pintu gerbang digital utama bagi calon mahasiswa baru dari seluruh penjuru Indonesia dan mancanegara, menyampaikan value proposition kuliah online yang terjangkau, fleksibel, terakreditasi resmi, serta mengonversi pengunjung menjadi pendaftar di portal admisi resmi.
- **Standar Estetika**: Mengadopsi level Awwwards Site of the Day (SOTD) dengan nuansa cyber-academic, brutalist-editorial layout, dan physical materiality (bukan flat design murahan), namun tetap mempertahankan tema terang (light mode) yang formal, bersih, dan berbobot akademis.
- **Target Kapasitas**: Tahan banting menghadapi lonjakan 1.000+ user konkuren tanpa beban komputasi server (Zero 503/403 downtime).

---

## 2. Tech Stack & Arsitektur Sistem

| Komponen | Spesifikasi & Versi | Peran Teknis |
|---|---|---|
| **Framework** | Next.js 16.3.6 (App Router, Turbopack) | Static Site Generation (SSG), Zero-JS server execution pada landing page |
| **Bahasa** | TypeScript 5 (Strict Mode) | Validasi tipe data tanpa kompromi, nol penggunaan tipe `any` |
| **Styling** | Tailwind CSS 3.4.17 + Custom CSS Variables | Utility-first styling dengan sistem token warna arsitektural |
| **Motion & Scroll** | GSAP 3.12.7 + ScrollTrigger | Pinned storytelling, parallax depth, dan scrubbed visual effects |
| **Spatial Canvas** | Native HTML5 Canvas 2D Context | Constellation mesh network 60fps GPU-accelerated (zero dependency) |
| **Testing** | Vitest 2.1.9 + `@testing-library/react` | Unit testing komponen, aksesibilitas, dan simulasi interaksi user |
| **Deploy Target** | Vercel Edge Network / Global CDN | Edge caching, prerendered static assets, high availability |

### Ketahanan 1.000+ User Konkuren (Zero 503/403)
Landing page ini dirancang dengan arsitektur **100% Static Site Generation (SSG)**:
- Output build: `○ (Static) prerendered as static content`.
- Seluruh markup HTML, CSS, dan asset dibundel saat build time (`npm run build`).
- Saat 1.000 pengunjung masuk bersamaan, request dilayani langsung oleh CDN/Edge Cache (Vercel Edge Network) tanpa mengeksekusi query database dinamis atau rendering berulang di origin server Node.js.
- Database query hanya terjadi ketika user mengeklik CTA dan dialihkan ke subdomain aplikasi terpisah (`admissions.sibermu.ac.id`).

---

## 3. Sistem Desain & Token Visual

### 3.1 Palet Warna Resmi
Semua warna didefinisikan secara tersentralisasi di `tailwind.config.ts` dan `app/globals.css`:
- `background`: `#FAFAF7` (Warm off-white, dasar kanvas netral terinspirasi dari kertas arsip modern).
- `surface`: `#FFFFFF` (Permukaan kartu, modal, dan container bertekstur).
- `primary`: `#0B5D3B` (Hijau tua resmi Muhammadiyah yang anggun dan berwibawa).
- `primary-hover`: `#146C4D` (Turunan hijau interaktif untuk hover state).
- `text-primary`: `#1A1F1C` (Hitam kehijauan pekat dengan kontras rasio WCAG AAA terhadap background).
- `text-secondary`: `#5B6560` (Abu-abu kehijauan lembut untuk teks pendukung dan metadata).
- `accent-gold`: `#C9A24B` (Aksen emas terkurasi untuk index markers, corner accents, dan status telemetry).

### 3.2 Tipografi
- **Display Font**: `Playfair Display` (Google Fonts, serif modern dengan karakter elegan dan editorial).
- **Body & Technical Font**: `Plus Jakarta Sans` (Google Fonts, sans-serif geometris Indonesia yang sangat terbaca di layar monitor maupun mobile).

### 3.3 Anti-Slop & Tactile Materiality Rules
1. **Zero Em Dash**: Dilarang keras menggunakan tanda strip panjang em dash pada copywriting maupun komentar kode. Gunakan koma, titik, atau tanda kurung.
2. **Physical Materiality**: Tidak menggunakan blur/glassmorphism berlebihan atau generic radial glow. Menggunakan solid offset shadows (`shadow-[6px_6px_0_0_#0B5D3B]`), corner crosshairs (`+`), sudut arsitektural (`┌ ┐ └ ┘`), dan SVG fractal noise paper grain (3.5% opacity).
3. **Data Verifikatif**: Tidak ada angka karangan ("99.9% Kepuasan", "10.000+ Mahasiswa"). Semua data wajib sesuai SK dan data riil institusi.
4. **Motion Fallback**: Wajib mematuhi `prefers-reduced-motion` untuk kenyamanan aksesibilitas.

---

## 4. Struktur Data Resmi Institusi

### 4.1 Legalitas & Akreditasi
- **Surat Keputusan Izin**: Keputusan Mendikbudristek RI No. 430/E/O/2021.
- **Peringkat Akreditasi**: Akreditasi BAIK dari Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT).
- **Metode Pembelajaran**: 100% Pendidikan Jarak Jauh (PJJ Daring).

### 4.2 Program Studi (6 Program Sarjana S1)
1. **S1 Informatika (INF-PJJ)**:
   - Gelar: S.Kom. | Beban: 144 SKS | Fakultas: FTIK (Teknologi dan Ilmu Kesehatan)
   - Fokus: Rekayasa Perangkat Lunak, Kecerdasan Buatan, Cloud Computing
   - Karier: Software Engineer, AI Specialist, Cloud Architect
2. **S1 Sistem Informasi (SI-PJJ)**:
   - Gelar: S.Kom. | Beban: 144 SKS | Fakultas: FTIK
   - Fokus: Analitik Data Bisnis, Manajemen Proyek TI, Tata Kelola Digital
   - Karier: Business Analyst, Data Analyst, IT Project Manager
3. **S1 Administrasi Kesehatan (ADMKES-PJJ)**:
   - Gelar: S.Kes. | Beban: 144 SKS | Fakultas: FTIK
   - Fokus: Manajemen Faskes, Sistem Informasi Medis, Kebijakan Kesehatan
   - Karier: Administrator RS/Klinik, Health Data Officer, Analis Kebijakan Faskes
4. **S1 Hukum (HKM-PJJ)**:
   - Gelar: S.H. | Beban: 144 SKS | Fakultas: FBH (Bisnis dan Humaniora)
   - Fokus: Hukum Siber & Bisnis, Hukum Islam Terapan, Advokasi & Litigasi
   - Karier: Legal Consultant, Corporate Counsel, Advokat / Praktisi Hukum
5. **S1 Manajemen (MNJ-PJJ)**:
   - Gelar: S.M. | Beban: 144 SKS | Fakultas: FBH
   - Fokus: Pemasaran Digital, Manajemen Keuangan, Kewirausahaan Berkelanjutan
   - Karier: Business Development, Marketing Strategist, Wirausahawan Digital
6. **S1 Akuntansi (AKT-PJJ)**:
   - Gelar: S.Akun. | Beban: 144 SKS | Fakultas: FBH
   - Fokus: Akuntansi Forensik & Audit, Perpajakan Digital, Akuntansi Syariah
   - Karier: Auditor Independen, Tax Consultant, Financial Controller

### 4.3 Kontak & Kanal Informasi Resmi
- **Portal Pendaftaran**: `https://admissions.sibermu.ac.id/`
- **Panduan Admisi**: `https://sibermu.ac.id/admisi/`
- **Email Humas**: `humas@sibermu.ac.id`
- **WhatsApp Hotline**: `+62 895-3185-1105`
- **Telegram Hotline**: `https://t.me/+6281919071707`
- **Alamat Kampus**: Jl. Kaliurang KM 5,5 No. 72, Caturtunggal, Depok, Sleman, D.I. Yogyakarta 55281
- **Media Sosial**:
  - Facebook: `https://www.facebook.com/sibermu`
  - Instagram: `https://www.instagram.com/sibermu/`
  - Twitter / X: `https://twitter.com/sibermu`
  - YouTube: `https://www.youtube.com/channel/UCeyzSDwnAzK3Hfza5hMcICw`

---

## 5. Rincian Komponen & Interaktivitas

### 5.1 `CustomCursor.tsx`
- Follower kursor desktop bergaya magnetik: cincin luar dinamis + titik fokus tengah.
- Membesar dan menampilkan label saat hover elemen interaktif (`a`, `button`, `[data-cursor]`).
- Otomatis nonaktif pada layar sentuh (`(pointer: coarse)`) atau mode `prefers-reduced-motion`.

### 5.2 `InteractiveCyberCanvas.tsx`
- Kanvas visual 2D HTML5 murni di background Hero.
- Memvisualisasikan jejaring simpul mahasiswa siber antar wilayah dengan garis konstelasi interaktif yang bereaksi terhadap kursor mouse.
- Menggunakan `IntersectionObserver` agar rendering otomatis berhenti (pause) saat Hero tidak terlihat di layar, menjaga performa komputasi perangkat klien.

### 5.3 `Navbar.tsx`
- Header arsitektural dengan status telemetri real-time: `YOGYAKARTA [WIB] • SERVER PJJ: ONLINE`.
- Navigasi link ke `#keunggulan`, `#program`, `#biaya`, dan kontak.
- Tombol CTA `Daftar Sekarang` menuju portal admisi.
- Mobile drawer responsif dengan kontrol keyboard accessible (Escape key to close, aria attributes).

### 5.4 `Hero.tsx`
- Headline display tipografi raksasa dengan animasi GSAP per baris kata.
- Technical index badges: `[ SIBERMU / 2026 ]`, `( 01 )`.
- Parallax frame foto perkuliahan daring dengan overlay kedalaman bergradasi halus.
- Dua tombol aksi: pendaftaran langsung dan penelusuran program studi.

### 5.5 `MarqueeTicker.tsx`
- Running ticker horizontal kontras tinggi yang menampilkan informasi resmi universitas secara kinetik.
- Berhenti otomatis pada mode reduced motion.

### 5.6 `Stats.tsx`
- Grid metrik institusi (6 Prodi S1, 2 Fakultas, 100% PJJ Daring, Izin 2021) dengan animasi angka GSAP count-up.
- Garis grid arsitektural dengan crosshair `+` di sudut-sudutnya.

### 5.7 `WhyUs.tsx`
- Pinned storytelling section: layar terbagi dua (split-screen) menggunakan GSAP ScrollTrigger `matchMedia`.
- Sisi kiri terkunci (pinned) saat scroll, sementara sisi kanan menyajikan 4 pilar keunggulan (Fleksibilitas Penuh, Biaya Terjangkau & Bisa Dicicil, Nilai Islam Berkemajuan, Legalitas Resmi).

### 5.8 `Programs.tsx`
- Interactive Blueprint Deck: tab filter fakultas (Semua, FTIK, FBH).
- Kartu prodi dengan offset underlay shadow fisik (`shadow-[6px_6px_0_0_#0B5D3B]`).
- Modal/Drawer detail kurikulum saat tombol `Detail Kurikulum & Karier` diklik, menampilkan rincian gelar, SKS, profil lulusan, dan tombol daftar langsung.

### 5.9 `AdmissionCTA.tsx`
- Menampilkan 4 jalur masuk resmi: Jalur Reguler, Jalur Karyawan, Jalur Persyarikatan, dan Jalur Prestasi.
- Kartu kontak resmi terverifikasi lengkap dengan link direct WhatsApp, Telegram, email, dan alamat kantor fisik Yogyakarta.

### 5.10 `ScrollDepthGauge.tsx`
- Telemetri scroll di pojok kanan bawah layar: menampilkan `INDEX // XX%` secara live berdasarkan posisi scroll pembaca, dilengkapi tombol `TOP ↑` dengan smooth scroll.

### 5.11 `Footer.tsx`
- Monolithic brutalist footer dengan tautan navigasi, sosial media resmi lengkap, informasi domain, hak cipta, dan identitas Persyarikatan Muhammadiyah.

---

## 6. Prosedur Pengembangan & Perintah Operasional

### 6.1 Instalasi & Setup Dependensi
```bash
npm install
```

### 6.2 Menjalankan Development Server
```bash
npm run dev
```
Akses di browser pada `http://localhost:3000`.

### 6.3 Menjalankan Unit Testing
```bash
npm run test
```
Semua 10 file test dan 22 unit test wajib berstatus lulus (`passed`) sebelum commit atau deploy.

### 6.4 Melakukan Production Build
```bash
npm run build
```
Pastikan kompilasi Turbopack selesai tanpa ada error TypeScript maupun warning static optimization.

---

## 7. Instruksi Bagi AI Agent Berikutnya

1. **Jaga Konsistensi Desain**: Jangan mengubah warna di luar token yang ada di `tailwind.config.ts` dan `app/globals.css`. Dilarang menggunakan gradien neon, background gelap tanpa alasan, atau tanda em dash.
2. **Utamakan Clean Code & Unit Testing**: Setiap kali menambahkan atau mengedit fitur, jalankan `npm run test` untuk memastikan tidak ada regresi pada tes unit yang sudah ada.
3. **Optimasi Performa**: Pertahankan arsitektur SSG. Jangan memasukkan library pihak ketiga yang membebani bundle size tanpa alasan yang jelas.
4. **Respek Aksesibilitas**: Pastikan semua tombol memiliki `aria-label` yang sesuai, kontras warna memenuhi standar WCAG, dan interaktivitas mendukung navigasi keyboard.
