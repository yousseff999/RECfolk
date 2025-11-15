'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoaderProps {
  onLoadingComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onLoadingComplete }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline();
    const exitTl = gsap.timeline({ paused: true });

    if (titleRef.current && loaderRef.current) {
      const letters = titleRef.current.textContent?.split('') || [];
      titleRef.current.innerHTML = '';
      letterRefs.current = [];

      letters.forEach((letter, i) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        // Color the "C" red (index 2 in "RECfolk®"), rest white
        span.style.color = i === 2 ? '#ff0000' : '#ffffff';
        span.style.fontWeight = 'bold';
        letterRefs.current.push(span);
        titleRef.current?.appendChild(span);
      });

      // Initial fade in of loader
      tl.fromTo(
        loaderRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.inOut' }
      );

      // Animate letters in
      tl.to(letterRefs.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.08,
      });

      // Hold the logo for a bit
      tl.to({}, { duration: 2 });

      // Soft pulse
      tl.to(letterRefs.current, {
        scale: 1.1,
        duration: 1,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: 1,
      });

      // Exit animation
      exitTl
        .to(letterRefs.current, {
          opacity: 0,
          scale: 2,
          y: -50,
          duration: 1.2,
          stagger: 0.08,
          ease: 'power3.in',
        })
        .to(
          loaderRef.current,
          {
            yPercent: -100,
            duration: 1.6,
            ease: 'power2.inOut',
            onComplete: onLoadingComplete,
          },
          '-=0.4'
        );

      // Wait before leaving
      gsap.delayedCall(5, () => exitTl.play());
    }

    return () => {
      tl.kill();
      exitTl.kill();
    };
  }, [onLoadingComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-[#000000] flex items-center justify-center overflow-hidden"
    >
      <h1
        ref={titleRef}
        className="text-[8vw] font-bold tracking-tight leading-none"
      >
        RECfolk®
      </h1>
    </div>
  );
};

export default Loader;
