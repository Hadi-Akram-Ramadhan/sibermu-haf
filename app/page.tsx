import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import WhyUs from '@/components/WhyUs';
import Programs from '@/components/Programs';
import AdmissionCTA from '@/components/AdmissionCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Stats />
        <WhyUs />
        <Programs />
        <AdmissionCTA />
      </main>
      <Footer />
    </>
  );
}
