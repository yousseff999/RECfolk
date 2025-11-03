import React from "react";

const Page7 = () => {
  return (
    <div className="w-full h-screen relative bg-[#020202] lg:p-14 p-6 font-[Satoshi] overflow-hidden">
      {/* Video container */}
      <div className="video-content w-full h-full relative overflow-hidden rounded-xl shadow-2xl">
        <video
          className="object-cover w-full h-full rounded-xl transition-transform duration-700 hover:scale-105"
          muted
          autoPlay
          loop
          src="https://studio-size.com/wp-content/uploads/2024/05/Studio-Size-%E2%80%94-Labs02.mp4"
        ></video>

        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/90 via-transparent to-transparent rounded-xl"></div>

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col justify-end lg:p-14 p-6 z-10">
          <h1 className="text-[#ffffff] text-[5vw] w-[75%] font-bold leading-[4.3vw] tracking-tight drop-shadow-lg">
            RECfolk — the <br /> place for all artforms
          </h1>

          <div className="smtext flex items-center justify-start w-fit gap-5 mt-7">
            {/* 
<h2 className="text-[#ff0000] font-bold text-lg lg:text-xl tracking-wide">
  Explore Labs
</h2>
<button
  className="p-3 px-5 bg-[#262b31] border-2 border-[#ff0000] rounded-full text-[#ffffff] font-semibold hover:bg-[#ff0000] hover:text-[#ffffff] transition-all duration-300 hover:scale-110 flex items-center gap-2"
>
  <i className="ri-arrow-right-line"></i>
</button> 
*/}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Page7;
