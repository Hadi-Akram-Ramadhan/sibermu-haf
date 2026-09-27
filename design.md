# design.md — Sistem Desain Landing Page SiberMu

Spesifikasi visual & interaksi untuk landing page Universitas Siber Muhammadiyah. Dibaca bersama `CLAUDE.md`.

## Prinsip utama

Light, bersih, akademik-modern. Terinspirasi dari _bahasa UX_ situs **realevate.agency** (scroll effect immersive, hero full-bleed, tipografi besar sebagai elemen desain utama) — **bukan** tema warnanya (situs itu dark, punya kita harus light).

## 1. Warna (design tokens)

Definisikan sebagai CSS variables di `globals.css` dan mapping di `tailwind.config.ts`. Jangan hardcode hex di komponen manapun.

| Token            | Hex       | Penggunaan                                                                                                                                 |
| ---------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `background`     | `#FAFAF7` | Background utama halaman (off-white hangat, bukan putih pure)                                                                              |
| `surface`        | `#FFFFFF` | Card/section yang butuh kontras lebih tegas dari background                                                                                |
| `primary`        | `#0B5D3B` | Hijau tua Muhammadiyah — teks penting, ikon, border aksen, navbar/footer                                                                   |
| `primary-hover`  | `#146C4D` | Hover state / link aktif                                                                                                                   |
| `text-primary`   | `#1A1F1C` | Teks utama (hitam kehijauan, bukan pure black)                                                                                             |
| `text-secondary` | `#5B6560` | Teks sekunder/caption                                                                                                                      |
| `accent-gold`    | `#C9A24B` | Aksen sangat terbatas — garis pemisah, badge akreditasi, highlight kecil. Maksimal 1-2 elemen kecil per section, jangan jadi warna dominan |

Aturan:

- Tidak boleh ada neon sama sekali (neon green/cyan/pink, atau glow/shadow apapun).
- `primary` dipakai matte/flat — tidak digradasi jadi terang, tidak dicampur jadi gradient warna-warni.
- Kontras `primary` & `text-primary` di atas `background`/`surface` harus lolos WCAG AA.

## 2. Tipografi

- Headline besar = elemen desain utama, bukan sekadar teks. Pilih pairing font berkarakter:
  - **Display/heading**: font sans tegas atau serif modern (bukan default `Inter`) — harus tetap formal & mudah dibaca, ini institusi pendidikan bukan startup.
  - **Body**: font sans netral, nyaman dibaca di ukuran kecil.
- Load lewat `next/font` (Google Fonts atau lokal), jangan `<link>` manual.
- Skala tipografi harus terasa dramatis di headline (besar) tapi tetap proporsional di body — hindari semua heading dari satu ukuran/berat font yang sama.

## 3. Layout & spacing

- Whitespace besar (generous spacing) di semua section — biarkan konten "bernapas". Tema light butuh spacing lebih besar dari tema dark supaya tidak terasa kosong/murahan.
- Grid/layout section divariasikan — hindari semua section pakai pola "judul di tengah + 3 kolom ikon" yang sama persis.
- Mobile-first, tapi hero boleh didesain landscape-first kalau memang immersive di desktop (jelaskan alasan kalau dipakai).

## 4. Larangan keras: JANGAN "AI SLOP"

- ❌ Gradient warna-warni di background/tombol.
- ❌ Blob/blur shapes dekoratif generik di pojok section.
- ❌ Neon glow/shadow pada tombol atau teks.
- ❌ Ikon generic Heroicons/Lucide bertumpuk tanpa kurasi, atau emoji sebagai pengganti ikon.
- ❌ Card `shadow-lg rounded-2xl` default Tailwind di semua tempat tanpa variasi.
- ❌ Font default (`Inter`/system) untuk headline besar.
- ❌ Copy generik ("Unlock your potential", "Solusi terbaik untuk masa depan Anda").
- ❌ Layout simetris kaku 3-kolom fitur ikon+judul+deskripsi yang templated di semua section.
- ❌ Stock illustration vektor flat "corporate people" atau ilustrasi generik kampus.

Sebagai gantinya:

- ✅ Palet warna terbatas & disiplin sesuai tabel di atas.
- ✅ Fotografi nyata (mahasiswa, suasana belajar online, laptop/kelas virtual) sebagai elemen utama, bukan ilustrasi vektor.
- ✅ Tipografi besar & berani sebagai elemen desain.
- ✅ Micro-interaction halus dan bertujuan lewat GSAP (lihat bagian 5).

## 5. Animasi & interaksi (GSAP + ScrollTrigger)

- `import { ScrollTrigger } from "gsap/ScrollTrigger"`, register plugin di client component.
- Efek yang dipakai harus _purposeful_:
  - Pinning section tertentu saat scroll (misal "Kenapa Kuliah di Sini" pinned sambil konten bergantian).
  - Parallax halus pada gambar hero/section.
  - Text reveal per kata/baris saat masuk viewport (bukan cuma opacity 0→1 polos).
  - Horizontal scroll untuk showcase program studi (opsional).
  - Counter angka animasi untuk statistik kampus.
- Cleanup wajib: `gsap.context()` + `.revert()` di `useEffect` cleanup.
- Hormati `prefers-reduced-motion` — sediakan fallback tanpa animasi berlebihan.
- Semua animasi harus terasa halus di mobile — kurangi kompleksitas di breakpoint kecil kalau perlu.

## 6. Struktur halaman

1. **Navbar** — minimal: logo kiri, beberapa link (Program Studi, Tentang, Pendaftaran, Kontak), transparan di atas hero lalu solid saat scroll.
2. **Hero** — full-bleed image/video suasana kuliah online, tagline singkat + headline besar, CTA "Daftar Sekarang" yang jelas tapi tidak norak.
3. **Statistik** — jumlah mahasiswa, program studi, akreditasi, dosen — counter animasi saat scroll masuk viewport.
4. **Kenapa Kuliah di Sini** — value proposition (fleksibilitas, biaya, kualitas, nilai Muhammadiyah), layout tidak templated, bisa pakai pinning/parallax.
5. **Program Studi** — grid atau horizontal scroll, tiap kartu foto + nama program + deskripsi singkat.
6. **Testimoni** — kutipan mahasiswa/alumni yang terasa spesifik, bukan generik.
7. **CTA Pendaftaran** — satu ajakan besar + info kontak/jadwal.
8. **Footer** — logo, kontak resmi, sosial media, copyright.

## 7. Checklist review sebelum dianggap selesai

- [ ] Tidak ada warna di luar token pada bagian 1.
- [ ] Tidak ada satupun elemen dari daftar larangan bagian 4.
- [ ] Semua headline pakai font display, bukan default.
- [ ] Animasi GSAP di-cleanup dengan benar, dan ada fallback `prefers-reduced-motion`.
- [ ] Responsive di mobile, tablet, desktop.
- [ ] `npm run build` sukses tanpa error/warning.
