"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const IMAGES = [
  { src: "/assets/Asset1.png", alt: "Sport" },
  { src: "/assets/Asset1.png", alt: "Sahara" },
  { src: "/assets/Asset1.png", alt: "Divote" },
];

export default function Backto() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Duplicate images for seamless loop
    const items = Array.from(track.children);
    items.forEach((item) => track.appendChild(item.cloneNode(true)));

    const totalWidth = Array.from(track.children).reduce((acc, el: any) => {
      const style = getComputedStyle(el);
      return (
        acc +
        el.offsetWidth +
        parseFloat(style.marginLeft) +
        parseFloat(style.marginRight)
      );
    }, 0) / 2; // half because we duplicated

    // Animate
    gsap.to(track, {
      x: -totalWidth,
      duration: 6,
      ease: "linear",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });
  }, []);

  return (
    <div className="main bg-primary w-full lg:h-[58vw] h-[75vw] lg:p-14 p-4 font-[Satoshi] flex flex-col">
      <div className="text-content-2 flex w-full mb-10">
        <h1 className="text-light lg:text-[5.4vw] text-[4.5vw] font-syne font-bold leading-none tracking-tight">
  Back to the simple, <br />
  intuitive, and <span style={{ color: "#ff0000" }}>inspiring</span>
</h1>
      </div>

      <div className="marquee-container w-full overflow-hidden relative flex items-center h-[25vw]">
        <div
          ref={trackRef}
          className="marquee-inner flex whitespace-nowrap"
          style={{ width: "max-content" }}
        >
          {IMAGES.map((img, i) => (
            <div key={i} className="w-[25vw] h-[25vw] mx-5 flex-shrink-0">
              {/* 
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={400}
                className="object-contain w-full h-full"
              />
              */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
