"use client";

import React, { useEffect, useCallback, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { SecondImages, MediaItem } from "./utils/SecondImages";

const Page6: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const mediaItems: MediaItem[] = SecondImages;

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (cursorRef.current) {
        const cursorWidth = cursorRef.current.offsetWidth;
        const cursorHeight = cursorRef.current.offsetHeight;
        gsap.to(cursorRef.current, {
          x: e.clientX - cursorWidth / 2,
          y: e.clientY - cursorHeight / 2,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (isDragging && containerRef.current) {
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        containerRef.current.scrollLeft = scrollLeft - walk;
      }
    },
    [isDragging, startX, scrollLeft]
  );

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          opacity: 1,
          duration: 0.3,
          scale: 1,
        });
      }
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (cursorRef.current) {
      gsap.to(cursorRef.current, { opacity: 1, duration: 0.3 });
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.4 });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!isDragging && cursorRef.current) {
      gsap.to(cursorRef.current, { scale: 0, duration: 0.4 });
    }
  }, [isDragging]);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener("mousemove", handleMouseMove as EventListener);
      container.addEventListener("mousedown", handleMouseDown as EventListener);
      container.addEventListener("mouseup", handleMouseUp);
      container.addEventListener("mouseleave", handleMouseLeave);
      container.addEventListener("mouseenter", handleMouseEnter);
    }

    if (cursorRef.current) {
      gsap.set(cursorRef.current, { scale: 0, opacity: 1 });
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove as EventListener);
        container.removeEventListener("mousedown", handleMouseDown as EventListener);
        container.removeEventListener("mouseup", handleMouseUp);
        container.removeEventListener("mouseleave", handleMouseLeave);
        container.removeEventListener("mouseenter", handleMouseEnter);
      }
    };
  }, [
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
    handleMouseLeave,
  ]);

  return (
    <div className="page-6 w-full lg:h-[68vw] h-fit p-4 lg:p-14 font-[Satoshi] bg-[#020202] text-[#ffffff]">
      <div className="content mt-10 relative">
        {/* Media container */}
        <div
          ref={containerRef}
          className="container flex gap-4 lg:gap-7 flex-nowrap overflow-auto overflow-y-hidden whitespace-nowrap scroll-smooth"
          style={{ cursor: isDragging ? "grabbing" : "pointer" }}
        >
          {mediaItems.map((item, index) => (
            <div key={index} className="inline-block" style={{ scrollSnapAlign: "start" }}>
              <div
                className="box rounded-lg relative overflow-hidden border-2 border-[#262b31] hover:border-[#ff0000] transition-all duration-300 shadow-lg"
                style={{ width: `calc(${item.width}px * 0.8)`, height: `calc(${item.height}px * 0.8)` }}
              >
                {item.img && (
                  <Image
                    src={item.img}
                    width={item.width}
                    height={item.height}
                    alt="image"
                    className="transition-transform duration-500 hover:scale-105 object-cover w-full h-full"
                  />
                )}
                {item.isVimeo ? (
  <iframe
    src={item.video}
    className="absolute top-0 left-0 w-full h-full z-0 object-cover"
    allow="autoplay; fullscreen"
    allowFullScreen
  ></iframe>
) : (
  <video
    id={`video-${index}`}
    className="absolute top-0 left-0 w-full h-full z-0 object-cover transition-opacity duration-500 ease-in-out"
    muted
    loop
    autoPlay
    playsInline
    src={item.video}
  ></video>
)}

              </div>
            </div>
          ))}
        </div>

        {/* Drag cursor */}
        <div
          ref={cursorRef}
          className="drag-cursor lg:fixed p-2 px-8 top-0 left-0 w-[80px] h-[50px] rounded-full bg-[#ff0000] text-[#ffffff] flex items-center justify-center text-[15px] pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 opacity-0 font-bold shadow-md"
        >
          Drag
        </div>

        {/* Text Content */}
        <div className="text-content w-full h-full lg:mt-16 flex flex-col lg:flex-row gap-6">
          <div className="button-container flex items-center justify-between w-full lg:w-[30vw] gap-4">
            <div className="button flex items-center justify-between gap-3">
              <button className="lg:p-3 p-2 bg-[#262b31] border-2 border-[#ffffff] rounded-full text-[#ffffff] hover:bg-[#ff0000] hover:border-[#ff0000] transition-all duration-300 hover:scale-110">
                <i className="ri-arrow-left-line"></i>
              </button>
              <button className="lg:p-3 p-2 bg-[#262b31] border-2 border-[#ffffff] rounded-full text-[#ffffff] hover:bg-[#ff0000] hover:border-[#ff0000] transition-all duration-300 hover:scale-110">
                <i className="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>

          <div className="main-text w-full lg:w-[64vw] flex flex-col lg:gap-10 mt-4 lg:mt-0">
            <p className="text-[#ffffff] tracking-wide leading-snug lg:text-2xl text-sm font-semibold">
              Great design has no expiration date. It lasts for years and inspires instantly. Our creative freedom enables us to spend more time on fewer projects.
            </p>
            <p className="text-[#ffffff] tracking-wide leading-snug lg:text-2xl text-sm mt-5 lg:mt-0 font-semibold">
              Focus on the intellectual, functional, and artistic aspects of business. Looking to create profound ideas, timeless design, and beauty in everyday life.
            </p>
          </div>
        </div>
      </div>

      {/* About section */}
      <div className="about w-full lg:w-[50%] mt-10 ml-0 lg:ml-[29.5vw] flex items-center gap-7"></div>
    </div>
  );
};

export default Page6;
