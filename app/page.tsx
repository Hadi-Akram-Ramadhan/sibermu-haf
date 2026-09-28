'use client';

import Navbar from '@/components/Navbar';
import IntroSequence from '@/components/IntroSequence';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import HarmoniIntegrasi from '@/components/HarmoniIntegrasi';
import KemahasiswaanSection from '@/components/KemahasiswaanSection';
import AikSection from '@/components/AikSection';
import WhyUs from '@/components/WhyUs';
import Programs from '@/components/Programs';
import AdmissionCTA from '@/components/AdmissionCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <IntroSequence />
        <Hero />
        <Stats />
        <HarmoniIntegrasi />
        <KemahasiswaanSection />
        <AikSection />
        <WhyUs />
        <Programs />
        <AdmissionCTA />
      </main>
      <Footer />
    </>
  );
}
