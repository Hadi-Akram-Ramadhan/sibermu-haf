# Landing Page Universitas Siber Muhammadiyah (SiberMu)

Landing page resmi berbasis **Next.js 14+ (App Router)**, **TypeScript**, **Tailwind CSS**, dan **GSAP ScrollTrigger**.
Didesain dengan pendekatan akademik-modern light, tipografi editorial Fraunces + Plus Jakarta Sans, dan disiplin token warna Muhammadiyah tanpa AI-slop.

## Panduan Instalasi & Menjalankan Lokal

1. **Clone repository dan masuk ke folder:**
   ```bash
   git clone <URL_REPO_ANDA>
   cd sibermu-haf
   ```

2. **Install dependency:**
   ```bash
   npm install
   ```

3. **Setup environment variables:**
   Salin `.env.example` menjadi `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Variabel yang tersedia (sudah terkonfigurasi ke portal resmi SiberMu):
   - `NEXT_PUBLIC_ADMISSIONS_URL`: URL portal admisi resmi (`https://admissions.sibermu.ac.id/`)
   - `NEXT_PUBLIC_INFO_URL`: URL informasi pendaftaran (`https://sibermu.ac.id/admisi/`)
   - `NEXT_PUBLIC_CONTACT_WA`: Nomor WhatsApp admisi resmi (`6289531851105`)
   - `NEXT_PUBLIC_CONTACT_EMAIL`: Email humas resmi (`humas@sibermu.ac.id`)

4. **Jalankan server pengembangan lokal:**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser.

5. **Jalankan Unit Test:**
   ```bash
   npm run test
   ```

6. **Build Produksi:**
   ```bash
   npm run build
   ```

---

## Panduan Push ke GitHub & Import ke Vercel

### 1. Push ke GitHub
```bash
git init
git add .
git commit -m "feat: landing page resmi Universitas Siber Muhammadiyah"
git branch -M main
git remote add origin https://github.com/<USERNAME_GITHUB>/<NAMA_REPO>.git
git push -u origin main
```

### 2. Import ke Vercel
1. Masuk ke [dashboard Vercel](https://vercel.com/) menggunakan akun GitHub.
2. Klik **Add New...** > **Project**.
3. Pilih repository GitHub yang baru di-push.
4. Pada konfigurasi project:
   - **Framework Preset**: `Next.js` (terdeteksi otomatis)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Environment Variables**: Tambahkan variabel dari `.env.example` bila ingin mengarahkan ke domain lain, atau biarkan default karena sudah memiliki fallback URL resmi di kode.
5. Klik **Deploy**. Selesai.
