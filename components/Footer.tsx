"use client";

import React, { useState, useEffect } from "react";

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
        className={`transition-all duration-300 ease-in-out absolute w-full flex justify-center lg:items-center gap-24 tracking-wide lg:text-2xl text-xl font-bold ${
          isActive ? "opacity-100 scale-110 text-[#ff0000]" : "opacity-50 scale-100 text-[#ffffff]"
        }`}
      >
        {name}
      </h1>

      {isActive && (
        <div
          className="absolute lg:top-10 top-2 left-28 lg:w-[20vw] w-[67vw] transition-all duration-500 ease-in-out z-50"
          style={getDesktopStyles()}
        >
          <video
            src={videoSrc}
            loop
            playsInline
            muted
            autoPlay
            preload="metadata"
            className="shadow-2xl object-cover w-full h-auto rounded-md border-2 border-[#ff0000]"
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
    { name: "Behance", videoSrc: "https://studio-size.com/wp-content/uploads/2024/05/Behance.mp4" },
    { name: "Dribbble", videoSrc: "https://studio-size.com/wp-content/uploads/2024/05/Dribbble.mp4" },
    { name: "Vimeo", videoSrc: "https://studio-size.com/wp-content/uploads/2024/05/Vimeo.mp4" },
    { name: "Youtube", videoSrc: "https://studio-size.com/wp-content/uploads/2024/05/Youtube.mp4" },
    { name: "LinkedIn", videoSrc: "https://studio-size.com/wp-content/uploads/2024/05/Linkedin.mp4" },
    { name: "Savee.it", videoSrc: "https://studio-size.com/wp-content/uploads/2024/05/Saveeit.mp4" },
    { name: "Fonts in Use", videoSrc: "https://studio-size.com/wp-content/uploads/2024/05/Fonts-in-use.mp4" },
    { name: "Pinterest", videoSrc: "https://studio-size.com/wp-content/uploads/2024/05/Pinterest.mp4" },
  ];

  return (
    <div className="footer-content w-full relative lg:h-[58vw] h-[180vw] overflow-hidden lg:pt-40 pt-14 bg-[#020202] lg:p-14 p-4">
      {/* Social links */}
      <ul className="links flex w-full lg:flex-row flex-col list-none lg:border-b-2 lg:gap-14 gap-10 border-[#262b31] lg:h-16 z-50">
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
      <div className="link2 flex lg:mt-14 mt-[35vw] lg:h-5 lg:w-auto relative flex-col lg:flex-row gap-4">
        <h1 className="text-[#ffffff] font-sans hover:text-[#ff0000] transition-all duration-300 ease-in-out hover:scale-105 lg:text-xl text-[10px]">
          
        </h1>

        <div className="flex justify-end w-full lg:text-xs text-[7px] items-center font-sans lg:gap-10 gap-2 mt-2 lg:mt-0">
          {["© RECfolk—All rights reserved."].map((item, idx) => (
            <h1
              key={idx}
              className="text-[#ffffff] hover:cursor-pointer hover:text-[#ff0000] transition-all duration-300 ease-in-out hover:scale-105"
            >
              {item}
            </h1>
          ))}
        </div>
      </div>

      {/* Large RECfolk text */}
      <div className="flex items-center justify-center w-full lg:mt-0 mt-6 relative">
  <h1 className="text-[#ffffff] lg:text-[10vw] text-[10vw] font-sans font-bold leading-none relative flex">
    <span className="text-white">RE</span>
    <span className="text-[#ff0000]">C</span>
    <span className="text-white">folk</span>
    <span className="lg:text-2xl text-[16px] absolute lg:right-14 lg:bottom-10 bottom-0 right-0 text-[#ff0000]">®</span>
  </h1>
</div>

    </div>
  );
};

export default Footer;
