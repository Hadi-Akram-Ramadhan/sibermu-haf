import type { Metadata } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
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
    <html lang="id" className={`${fraunces.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-screen bg-background text-text-primary antialiased paper-grain">
        {children}
      </body>
    </html>
  );
}
