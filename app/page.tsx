import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MarqueeTicker from '@/components/MarqueeTicker';
import Stats from '@/components/Stats';
import WhyUs from '@/components/WhyUs';
import Programs from '@/components/Programs';
import AdmissionCTA from '@/components/AdmissionCTA';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ScrollDepthGauge from '@/components/ScrollDepthGauge';

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main id="main-content">
        <Hero />
        <MarqueeTicker />
        <Stats />
        <WhyUs />
        <Programs />
        <AdmissionCTA />
      </main>
      <Footer />
      <ScrollDepthGauge />
    </>
  );
}
