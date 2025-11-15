'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Page1 from '@/components/LandingText';
import Part2 from '@/components/LandingVideo';
import Page3 from '@/components/FeaturedWork';
import Page4 from '@/components/Backto';
import Page5 from '@/components/TextVidAnimation';
import Page6 from '@/components/SecondScroll';
import Page7 from '@/components/SizeLab';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import ContactSection from '@/components/ContactSection';
const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-primary text-light transition-colors duration-300">
      {isLoading && <Loader onLoadingComplete={handleLoadingComplete} />}

      <div className={`${isLoading ? 'hidden' : 'block'} min-h-screen`}>
        <Navbar />

        {/* Home Section */}
        <section id="home" className="scroll-mt-20">
          <Part2 />
          <Page1 />
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="scroll-mt-20">
          <Page3 />
          <Page4 />
        </section>

        {/* Studio Section */}
        <section id="studio" className="scroll-mt-20">
          <Page5 />
          <Page6 />
        </section>

        {/* Labs Section */}
       {/* <section id="labs" className="scroll-mt-20">
          <Page7 />
        </section>   */} 

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-20">
          <ContactSection />
          <Footer />
        </section>
      </div>
    </div>
  );
};

export default Home;
