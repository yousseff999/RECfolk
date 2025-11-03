'use client';

import gsap from "gsap";
import React, { useEffect, useCallback, useRef } from "react";

const Part2: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (cursorRef.current) {
      const cursorWidth = cursorRef.current.offsetWidth;
      const cursorHeight = cursorRef.current.offsetHeight;
      gsap.to(cursorRef.current, {
        x: e.clientX - cursorWidth / 2,
        y: e.clientY - cursorHeight / 2,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  }, []);

  useEffect(() => {
    const part2content = document.querySelector(".part2-content") as HTMLElement;

    if (part2content) {
      part2content.addEventListener("mousemove", handleMouseMove as EventListener);
      part2content.addEventListener("mouseenter", handleMouseEnter);
      part2content.addEventListener("mouseleave", handleMouseLeave);
    }

    // Set initial state
    if (cursorRef.current) {
      gsap.set(cursorRef.current, { scale: 0, x: "-50%", y: "-50%" });
    }

    // Cleanup
    return () => {
      if (part2content) {
        part2content.removeEventListener("mousemove", handleMouseMove as EventListener);
        part2content.removeEventListener("mouseenter", handleMouseEnter);
        part2content.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return (
    <div className="part2 w-full h-[59vw] relative bg-primary overflow-hidden">
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="cursor h-[10vw] w-[10vw] bg-accent/90 rounded-full fixed top-0 z-50 
                   lg:flex sm:hidden items-center justify-center pointer-events-none 
                   text-light shadow-[0_0_30px_rgba(229,9,20,0.6)] border border-accent/70"
      >
        <h4 className="lg:text-2xl font-bold tracking-wide">RECfolk</h4>
      </div>

      {/* Video background */}
      <div className="part2-content relative w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/assets/page1.mp4"
          className="object-cover w-full h-full brightness-[0.65]"
        ></video>

        {/* Optional overlay gradient for more depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Part2;
