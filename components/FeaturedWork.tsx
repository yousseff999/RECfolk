"use client";

import React, { useCallback, useRef, useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import Image from "next/image";
import gsap from "gsap";
import Link from "next/link";
import { FirstPageImages, MediaItem } from "./utils/FirstPageImages";

const Page3: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const mediaItems: MediaItem[] = FirstPageImages;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(0);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const firstChild = containerRef.current.children[0] as HTMLElement;
        const itemWidth = firstChild.offsetWidth;
        const gap = 28;
        const newItemsPerView = Math.floor(containerWidth / (itemWidth + gap));
        setItemsPerView(newItemsPerView);
      }
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      const firstChild = containerRef.current.children[0] as HTMLElement;
      const itemWidth = firstChild.offsetWidth;
      const gap = 28;
      const scrollPosition = index * (itemWidth + gap);
      containerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const navigateLeft = () => {
    setCurrentIndex((prev) => {
      const newIndex = Math.max(prev - itemsPerView, 0);
      scrollToIndex(newIndex);
      return newIndex;
    });
  };

  const navigateRight = () => {
    setCurrentIndex((prev) => {
      const newIndex = Math.min(prev + itemsPerView, FirstPageImages.length - 1);
      scrollToIndex(newIndex);
      return newIndex;
    });
  };

  // Cursor + drag handlers
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX - 37,
          y: e.clientY - 22,
          duration: 0.4,
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
    }
  }, []);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);
  const handleMouseEnter = useCallback(() => {
    if (cursorRef.current)
      gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
  }, []);
  const handleMouseLeave = useCallback(() => {
    if (!isDragging && cursorRef.current)
      gsap.to(cursorRef.current, { scale: 0, duration: 0.3 });
  }, [isDragging]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("mousemove", handleMouseMove as EventListener);
    container.addEventListener("mousedown", handleMouseDown as EventListener);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    gsap.set(cursorRef.current, { scale: 0, opacity: 1 });

    return () => {
      container.removeEventListener("mousemove", handleMouseMove as EventListener);
      container.removeEventListener("mousedown", handleMouseDown as EventListener);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave]);

  const handleVideoMouseEnter = (video: HTMLVideoElement) => video?.play();
  const handleVideoMouseLeave = (video: HTMLVideoElement) => {
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <div className="page-3 bg-primary w-full lg:h-[52vw] h-[75vw] p-6 lg:p-14 font-[Satoshi] text-light">
      {/* Header Section */}
      <div className="text-content flex justify-between items-center w-full">
       <h1 className="font-montserrat font-semibold text-xl lg:text-5xl md:text-3xl tracking-tight">
  Featured <span style={{ color: "#ff0000" }}>Work</span>
</h1>

        <div className="buttons flex items-center gap-3">
          <Link href="/portfolio"></Link>

          <button
            onClick={navigateLeft}
            className="lg:p-3 lg:px-4 p-1 px-2 bg-accent/20 border border-accent rounded-full text-accent hover:bg-accent hover:text-light transition-all duration-300 ease-in-out"
          >
            <i className="ri-arrow-left-line"></i>
          </button>

          <button
            onClick={navigateRight}
            className="lg:p-3 lg:px-4 p-1 px-2 bg-accent/20 border border-accent rounded-full text-accent hover:bg-accent hover:text-light transition-all duration-300 ease-in-out"
          >
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="content lg:mt-10 mt-5 relative">
        {/* Scroll Container with Blur Overlays */}
        <div className="relative w-full overflow-hidden">
          <div
            ref={containerRef}
            className="container flex gap-7 flex-nowrap overflow-x-auto overflow-y-hidden scroll-smooth"
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            {mediaItems.map((item: MediaItem, index: number) => (
              <div key={index} className="flex flex-col">
                <div
                  className="box relative overflow-hidden group flex-shrink-0"
                  style={{
                    width: item.width || "25vw",
                    height: item.height || "31vw",
                    backgroundColor: "var(--primary-color)",
                  }}
                >
                  {item.isVimeo ? (
                    <div className="w-full h-full relative">
                      <iframe
                        title={item.title}
                        src={`${item.video}&autoplay=1&loop=1&muted=1&background=1`}
                        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <>
                      <Image
                        src={item.img}
                        width={410}
                        height={100}
                        alt={item.title}
                        className="transition-opacity duration-300 object-cover w-full h-full ease-in-out opacity-100 group-hover:opacity-0"
                      />
                      <video
                        id={`video-${index}`}
                        className="absolute top-0 left-0 w-full h-full z-0 object-cover transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                        muted
                        loop
                        autoPlay
                        src={item.video}
                        onMouseEnter={(e) => handleVideoMouseEnter(e.currentTarget)}
                        onMouseLeave={(e) => handleVideoMouseLeave(e.currentTarget)}
                      />
                    </>
                  )}
                  <div className="absolute bottom-0 left-0 w-full h-[4px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
                <div className="mt-4">
                  <h3 className="lg:text-2xl text-[15px] font-bold text-light">{item.title}</h3>
                  <p className="lg:text-lg text-[10px] text-gray-400">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Left Blur Overlay */}
          <div className="absolute top-0 left-0 h-full w-60 pointer-events-none z-20 bg-gradient-to-r from-primary/100 to-primary/0" />

          {/* Right Blur Overlay */}
          <div className="absolute top-0 right-0 h-full w-60 pointer-events-none z-20 bg-gradient-to-l from-primary/100 to-primary/0" />
        </div>

        {/* Custom Cursor */}
        <div
          ref={cursorRef}
          className="drag-cursor fixed p-2 px-10 top-0 left-0 w-[75px] h-[45px] rounded-full bg-accent text-light lg:flex md:hidden hidden items-center justify-center text-[15px] pointer-events-none z-50 translate-x-[-50%] translate-y-[-50%] opacity-0 font-bold shadow-lg shadow-accent/40"
        >
          Drag
        </div>
      </div>
    </div>
  );
};

export default Page3;
