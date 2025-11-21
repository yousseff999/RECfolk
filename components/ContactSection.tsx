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
      {/* Background Vimeo Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Same aspect ratio container as Part2 */}
        <div className="w-full h-full relative">
          <iframe
            title="vimeo-player"
            src="https://player.vimeo.com/video/1089240383?h=7a283e1d4e&autoplay=1&loop=1&muted=1&background=1"
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            allowFullScreen
          ></iframe>

          {/* Optional dark overlay (same effect as brightness-50 */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
        <p
          ref={paragraphRef}
          className="text-gray-300 text-base lg:text-lg max-w-[30ch] mb-6 font-mono"
        >
          
        </p>

        <h1
  ref={titleRef}
  className="text-[8vw] md:text-[5vw] font-syne font-bold text-white leading-tight"
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
      <div className="absolute bottom-6 flex flex-col md:flex-row w-full items-center justify-between px-8 text-gray-400 text-xs md:text-sm font-mono z-10">
        <div className="hidden md:flex items-center gap-4">
          <div className="border border-gray-500 p-2 rounded-lg">
            🌍
          </div>
          <div className="flex flex-col border border-gray-500 border-l-0 px-3 py-2 rounded-r-lg">
            <p className="font-bold text-gray-300">Working Globally</p>
            <p>Available Now</p>
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
