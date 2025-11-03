'use client';

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FirstPageImages } from "@/components/utils/FirstPageImages";
import Image from "next/image";

const PortfolioPage: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="bg-black min-h-screen text-white font-[Satoshi]">
      <Navbar />

      <section className="pt-24 px-8 md:px-20">
        <h1 className="text-4xl md:text-6xl font-semibold mb-10">
          All Projects
        </h1>

        {/* ✅ If a project is selected */}
        {selectedIndex !== null ? (
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <div className="w-full md:w-[65%] flex justify-center">
              {FirstPageImages[selectedIndex].video ? (
                <video
                  src={FirstPageImages[selectedIndex].video}
                  autoPlay
                  muted
                  loop
                  controls
                  className="rounded-xl w-[90%] md:w-[80%] max-h-[70vh] object-cover shadow-lg"
                />
              ) : (
                <Image
                  src={FirstPageImages[selectedIndex].img}
                  width={1000}
                  height={600}
                  alt={FirstPageImages[selectedIndex].title}
                  className="rounded-xl w-[90%] md:w-[80%] max-h-[70vh] object-cover shadow-lg"
                />
              )}
            </div>

            <div className="w-full md:w-[30%] mt-6 md:mt-0 text-center md:text-left">
              <h3 className="text-3xl font-semibold mb-4">
                {FirstPageImages[selectedIndex].title}
              </h3>
              <p className="text-gray-400 text-lg">
                {FirstPageImages[selectedIndex].subtitle}
              </p>

              <button
                onClick={() => setSelectedIndex(null)}
                className="mt-8 px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition-all"
              >
                Back to all projects
              </button>
            </div>
          </div>
        ) : (
          // ✅ Grid view of all projects
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FirstPageImages.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setSelectedIndex(index)}
              >
                {item.video ? (
                  <video
                    src={item.video}
                    autoPlay
                    muted
                    loop
                    className="object-cover w-full h-[300px] rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                ) : (
                  <Image
                    src={item.img}
                    width={500}
                    height={300}
                    alt={item.title}
                    className="object-cover w-full h-[300px] rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                )}

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-opacity duration-300">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioPage;
