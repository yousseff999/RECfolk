'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const [showCard, setShowCard] = useState(false);
  const [sending, setSending] = useState(false);

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

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;

    try {
      await emailjs.sendForm(
        'service_fw6rdrs',      // Your Gmail Service ID
        'template_k81mu6c', // Replace with your EmailJS Template ID
        form,
        'ekPHoRaRf9Ot9GmQN'       // Replace with your EmailJS Public Key
      );
      alert('Message sent successfully!');
      form.reset();
      setShowCard(false);
    } catch (error) {
      console.error(error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full overflow-hidden bg-black text-white font-[Satoshi] uppercase"
    >
      {/* Background Vimeo Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="w-full h-full relative">
          <iframe
            title="vimeo-player"
            src="https://player.vimeo.com/video/1089240383?h=7a283e1d4e&autoplay=1&loop=1&muted=1&background=1"
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            allowFullScreen
          ></iframe>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
        <p
          ref={paragraphRef}
          className="text-gray-300 text-base lg:text-lg max-w-[30ch] mb-6 font-mono"
        ></p>

        <h1
          ref={titleRef}
          className="text-[8vw] md:text-[5vw] font-syne font-bold text-white leading-tight"
        >
          Let’s Make It Happen
        </h1>

        {/* Contact Button */}
        <div className="mt-10 flex justify-center items-center">
          <button
            onClick={() => setShowCard(true)}
            className="px-8 py-4 border-2 border-[#ff0000] rounded-full bg-transparent text-[#ff0000] font-semibold tracking-wide hover:bg-[#ff0000] hover:text-white transition-all duration-300 ease-in-out hover:scale-110"
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Contact Card Modal */}
      {showCard && (
        <div className="fixed inset-0 bg-black/70 z-20 flex items-center justify-center p-4">
          <div className="bg-black border border-[#ff0000] rounded-xl p-8 w-full max-w-md text-white relative">
            <button
              onClick={() => setShowCard(false)}
              className="absolute top-4 right-4 text-[#ff0000] font-bold text-xl hover:text-white transition-colors"
            >
              &times;
            </button>
            <h2 className="text-2xl font-syne font-bold mb-6 text-center">Send a Message</h2>
            <form onSubmit={handleSend} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"         // Matches {{name}} in template
                placeholder="Your Name"
                required
                className="p-3 rounded-lg bg-black border border-gray-600 text-white placeholder-gray-400 focus:border-[#ff0000] outline-none transition-colors"
              />
              <input
                type="email"
                name="email"        // Matches {{email}} in template
                placeholder="Your Email"
                required
                className="p-3 rounded-lg bg-black border border-gray-600 text-white placeholder-gray-400 focus:border-[#ff0000] outline-none transition-colors"
              />
              <input
                type="text"
                name="title"        // Matches {{title}} in template
                placeholder="Subject"
                className="p-3 rounded-lg bg-black border border-gray-600 text-white placeholder-gray-400 focus:border-[#ff0000] outline-none transition-colors"
              />
              <textarea
                name="message"      // Matches {{message}} in template
                placeholder="Your Message"
                required
                rows={5}
                className="p-3 rounded-lg bg-black border border-gray-600 text-white placeholder-gray-400 focus:border-[#ff0000] outline-none transition-colors"
              ></textarea>
              <button
                type="submit"
                disabled={sending}
                className="mt-2 px-6 py-3 bg-[#ff0000] text-white font-semibold rounded-lg hover:bg-white hover:text-[#ff0000] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Bottom Info */}
      <div className="absolute bottom-6 flex flex-col md:flex-row w-full items-center justify-between px-8 text-gray-400 text-xs md:text-sm font-mono z-10">
        <div className="hidden md:flex items-center gap-4">
          <div className="border border-gray-500 p-2 rounded-lg">🌍</div>
          <div className="flex flex-col border border-gray-500 border-l-0 px-3 py-2 rounded-r-lg">
            <p className="font-bold text-gray-300">Working Globally</p>
            <p>Available Now</p>
          </div>
        </div>

        <div className="text-center md:text-right mt-4 md:mt-0">
          <p className="font-bold uppercase">For further inquiries</p>
          <a
            href="mailto:Contact@recfolk.com"
            className="text-white hover:text-[#ff0000] transition-all duration-300"
          >
            Contact@recfolk.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
