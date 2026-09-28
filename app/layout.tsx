import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sibermu.ac.id'),
  title: 'Universitas Siber Muhammadiyah | Kuliah Online Fleksibel dan Diakui',
  description:
    'Universitas Siber Muhammadiyah (SiberMu) menyelenggarakan program sarjana S1 Pendidikan Jarak Jauh (PJJ) berbasis teknologi dan nilai Islam berkemajuan.',
  openGraph: {
    title: 'Universitas Siber Muhammadiyah | Kuliah Online Fleksibel dan Diakui',
    description:
      'Pendidikan jarak jauh terakreditasi dengan 6 program studi sarjana fleksibel dan terjangkau di bawah Persyarikatan Muhammadiyah.',
    type: 'website',
    locale: 'id_ID',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${outfit.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-screen bg-background text-text-primary antialiased paper-grain">
        {children}
      </body>
    </html>
  );
}
