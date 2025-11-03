'use client';

import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Page4 = () => {
  useEffect(() => {
    const text = document.querySelector(".text-content-2");

    gsap.fromTo(
      text,
      { y: "135%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: text,
          start: "top bottom",
          end: "top 30%",
          scrub: 2,
        },
      }
    );
  }, []);

  return (
    <div className="main bg-primary w-full lg:h-[58vw] h-[75vw] lg:p-14 p-4 font-[Satoshi]">
      {/* Headline */}
      <div className="text-content-2 flex w-full">
        <h1 className="text-light lg:text-[5.4vw] text-[4.5vw] font-bold leading-none tracking-tight">
          Back to the <span className="text-accent">simple</span>, <br />
          intuitive, and inspiring
        </h1>
      </div>

      {/* Content Section */}
      <div className="content flex flex-col lg:flex-row lg:p-10 p-0 lg:h-[40vw] h-auto items-center justify-between gap-10">
        {/* Left video */}
        <div className="video lg:w-[35vw] w-full flex items-center justify-center">
          <video
            autoPlay
            muted
            loop
            className="object-cover w-full h-full rounded-2xl"
            src="https://studio-size.com/wp-content/uploads/2024/06/size_clients_compressed.mp4"
          ></video>
        </div>

        {/* Right text */}
        <div className="text text-light flex flex-col lg:w-[49vw] w-full lg:px-10 px-5 justify-center">
          <h1 className="lg:text-[1.6vw] md:text-[2vw] text-[2.1vw] font-semibold leading-tight">
            Big multinational companies or small local brands. A partner approach
            with one universal goal — to create <span className="text-accent">authentic</span>, functional, and beautiful design.
          </h1>

          <div className="mt-10 flex items-center">
            {/* 
            <button
              className="lg:p-3 p-2 rounded-full border border-accent text-accent hover:bg-accent hover:text-light transition-all duration-300 ease-in-out hover:scale-110 shadow-md shadow-accent/30"
            >
              <i className="ri-arrow-right-line text-xl"></i>
            </button> 
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page4;
