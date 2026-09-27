# CLAUDE.md

Panduan ini dibaca otomatis oleh Claude Code setiap sesi kerja di repo ini. Tujuannya supaya konteks project, aturan, dan preferensi tidak perlu diulang tiap kali chat baru dimulai.

## Tentang project ini

Landing page resmi **Universitas Siber Muhammadiyah (SiberMu)** — universitas berbasis kuliah online/jarak jauh (PJJ) di bawah naungan Muhammadiyah. Landing page ini adalah pintu masuk utama calon mahasiswa: memperkenalkan value proposition kampus, menampilkan program studi, dan mengarahkan ke pendaftaran.

Detail spesifikasi desain lengkap ada di `design.md` — **baca file itu dulu sebelum membuat/mengubah UI apapun.**

## Tech stack

- Next.js 14+ (App Router), TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger untuk scroll animation
- Deploy target: Vercel

## Struktur folder

```
app/
  layout.tsx
  page.tsx
  globals.css
components/
  Navbar.tsx
  Hero.tsx
  Stats.tsx
  WhyUs.tsx
  Programs.tsx
  Testimonials.tsx
  AdmissionCTA.tsx
  Footer.tsx
lib/
  gsap.ts        // setup & register plugin GSAP
```

## Aturan koding

- TypeScript ketat — hindari `any`. Definisikan `interface`/`type` untuk semua props komponen.
- Semua komponen yang memakai GSAP atau hook browser wajib `"use client"`, dan bersihkan animasi dengan `gsap.context().revert()` di cleanup `useEffect` supaya tidak memory leak.
- Semua gambar pakai `next/image`, semua font pakai `next/font`. Jangan pakai `<img>` mentah atau `<link>` font manual.
- Warna, font, spacing HANYA diambil dari token yang didefinisikan di `design.md` / `tailwind.config.ts`. Jangan hardcode hex baru di tengah komponen.
- Hormati `prefers-reduced-motion` — sediakan fallback animasi minimal untuk user yang mengaktifkannya.
- Jangan tambah dependency baru (library animasi lain, UI kit, dsb.) tanpa menyebutkan alasannya dulu — projectnya harus tetap ringan.
- Sebelum commit: pastikan `npm run build` jalan tanpa error/warning, dan type-check bersih.

## Konten & copywriting

- Semua teks harus spesifik ke konteks SiberMu (kuliah online/jarak jauh, fleksibel, nilai-nilai Muhammadiyah, kurikulum Kampus Merdeka, biaya terjangkau bisa dicicil) — bukan copy generik ala startup ("Unlock your potential", dsb).
- Kalau ragu dengan data (jumlah mahasiswa, nama program studi, alamat kampus), tanyakan ke saya dulu daripada mengarang angka.

## Sebelum mulai kerja

1. Baca `design.md` untuk detail visual & interaksi.
2. Kalau ada instruksi saya yang bertentangan dengan `design.md`, tanyakan dulu — jangan diam-diam pilih salah satu.
3. Kerjakan section per section (bukan semua sekaligus), supaya saya bisa review bertahap.

## Deployment (Vercel)

- Jangan hardcode environment variable — pakai `.env.local`, sediakan `.env.example`.
- Perhatikan case-sensitivity import (Vercel build di Linux, beda dengan lokal macOS/Windows) — sumber umum error "Module not found" saat deploy padahal lancar di lokal.
- Domain gambar eksternal (kalau ada) didaftarkan di `next.config.js` → `images.remotePatterns`.
- Sertakan `.gitignore` standar Next.js dan `README.md` singkat (cara install, cara run, env var yang dibutuhkan).
