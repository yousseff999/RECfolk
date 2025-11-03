'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ContactSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(
      paragraphRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    ).fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      '-=0.5'
    );
  }, []);

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full overflow-hidden bg-black text-white font-[Satoshi] uppercase"
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover brightness-50"
        src="https://studio-size.com/wp-content/uploads/2024/05/Studio-Size-%E2%80%94-Labs02.mp4"
        autoPlay
        muted
        loop
        playsInline
      ></video>

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
        <p
          ref={paragraphRef}
          className="text-gray-300 text-base lg:text-lg max-w-[30ch] mb-6 font-mono"
        >
          Your design is a masterpiece waiting to become alive.
        </p>

        <h1
          ref={titleRef}
          className="text-[8vw] md:text-[5vw] font-bold text-white leading-tight"
        >
          Let’s Make It Happen
        </h1>

        {/* Contact Button */}
        <div className="mt-10 flex justify-center items-center">
          <a
            href="https://wa.me/+97466046659"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-[#ff0000] rounded-full bg-transparent text-[#ff0000] font-semibold tracking-wide hover:bg-[#ff0000] hover:text-white transition-all duration-300 ease-in-out hover:scale-110"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-6 flex flex-col md:flex-row w-full items-center justify-between px-8 text-gray-400 text-xs md:text-sm font-mono">
        <div className="hidden md:flex items-center gap-4">
          <div className="border border-gray-500 p-2 rounded-lg">
            🌍
          </div>
          <div className="flex flex-col border border-gray-500 border-l-0 px-3 py-2 rounded-r-lg">
            <p className="font-bold text-gray-300">Working Globally</p>
            <p>Available Nov ’25</p>
          </div>
        </div>

        <div className="text-center md:text-right mt-4 md:mt-0">
          <p className="font-bold uppercase">For further inquiries</p>
          <a
            href="mailto:recfolkteam@gmail.com"
            className="text-white hover:text-[#ff0000] transition-all duration-300"
          >
            recfolkteam@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
