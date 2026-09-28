'use client';

import { useState } from 'react';
import IntroSequence from '@/components/IntroSequence';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import WhyUs from '@/components/WhyUs';
import Programs from '@/components/Programs';
import AdmissionCTA from '@/components/AdmissionCTA';
import Footer from '@/components/Footer';

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  return (
    <>
      {!isReady && <IntroSequence onComplete={() => setIsReady(true)} />}

      <div
        className={[
          'transition-opacity duration-700 ease-out',
          isReady ? 'opacity-100' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      >
        <Navbar />
        <main id="main-content">
          <Hero />
          <Stats />
          <WhyUs />
          <Programs />
          <AdmissionCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
