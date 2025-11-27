"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface SocialLinkProps {
  name: string;
  videoSrc: string;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  index: number;
  totalLinks: number;
}

const SocialLink: React.FC<SocialLinkProps> = ({
  name,
  videoSrc,
  isActive,
  onMouseEnter,
  onMouseLeave,
  index,
  totalLinks,
}) => {
  const isFirst = index === 0;
  const isLast = index === totalLinks - 1;
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIfDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkIfDesktop();
    window.addEventListener("resize", checkIfDesktop);
    return () => window.removeEventListener("resize", checkIfDesktop);
  }, []);

  const getDesktopStyles = () => {
    if (!isDesktop) return {};
    return {
      left: isFirst ? "5%" : isLast ? "-192%" : "50%",
      right: isLast ? "0" : "auto",
      transform: !isFirst && !isLast ? "translateX(-50%)" : "none",
    };
  };

  return (
    <li
      className="video-content cursor-pointer relative w-full h-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <h1
        className={`transition-all duration-300 ease-in-out absolute w-full flex justify-center tracking-wide lg:text-lg text-sm font-bold ${
          isActive ? "opacity-100 scale-105 text-[#ff0000]" : "opacity-40 scale-100 text-[#ffffff]"
        }`}
      >
        {name}
      </h1>

      {isActive && (
        <div
          className="absolute lg:top-4 top-0 left-16 lg:w-[14vw] w-[55vw] transition-all duration-500 ease-in-out z-50"
          style={getDesktopStyles()}
        >
          <video
            src={videoSrc}
            loop
            playsInline
            muted
            autoPlay
            preload="metadata"
            className="shadow-xl object-cover w-full h-auto rounded-md border border-[#ff0000]"
          />
        </div>
      )}
    </li>
  );
};

interface SocialLinkData {
  name: string;
  videoSrc: string;
}

const Footer: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const socialLinks: SocialLinkData[] = [
    { name: "Instagram", videoSrc: "https://studio-size.com/wp-content/uploads/2024/05/Instagram.mp4" },
    { name: "LinkedIn", videoSrc: "https://studio-size.com/wp-content/uploads/2024/05/Linkedin.mp4" },
    { name: "WhatsApp", videoSrc: "https://studio-size.com/wp-content/uploads/2024/05/Pinterest.mp4" },
  ];

  return (
    <div className="footer-content w-full relative lg:h-[32vw] h-[70vw] overflow-hidden bg-[#020202] lg:pt-8 pt-4 lg:px-6 px-2">
      
      {/* Social links */}
      <ul className="links flex w-full lg:flex-row flex-col list-none lg:border-b border-[#262b31] lg:gap-4 gap-3 lg:h-10">
        {socialLinks.map((link, index) => (
          <SocialLink
            key={link.name}
            name={link.name}
            videoSrc={link.videoSrc}
            isActive={activeLink === link.name}
            onMouseEnter={() => setActiveLink(link.name)}
            onMouseLeave={() => setActiveLink(null)}
            index={index}
            totalLinks={socialLinks.length}
          />
        ))}
      </ul>

      {/* Bottom links */}
      <div className="link2 flex lg:mt-2 mt-[6vw] w-full relative flex-col lg:flex-row gap-0">
        <div className="flex justify-end w-full lg:text-[9px] text-[5px] font-sans">
          <h1 className="text-white hover:text-red-600 transition-all">
            © RECfolk—All rights reserved.
          </h1>
        </div>
      </div>

      {/* Large RECfolk text */}
      <div className="flex items-center justify-center w-full mt-0 relative">
        <div className="relative w-auto h-auto">
  <Image
    src="/assets/Asset1.png" // replace with your image path
    alt="RE C folk Logo"
    width={400} // adjust width
    height={280} // adjust height
    className="object-contain"
  />
</div>
      </div>

    </div>
  );
};

export default Footer;
