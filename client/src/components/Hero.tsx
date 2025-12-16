import React from "react";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center bg-white text-black min-h-screen pb-20 px-4">
      {/* Hero Text */}
      <h1 className="text-4xl md:text-6xl text-center font-extrabold max-w-4xl mt-40 tracking-tight">
        Fullstack Developer Test
      </h1>

      <p className="text-gray-600 md:text-lg text-center max-w-xl mt-4">
        Upload large CSV files, process sales data efficiently, and download
        aggregated results — built for performance and scalability.
      </p>

      {/* CTA */}
      <div className="flex items-center gap-3 mt-10">
        <button className="flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full hover:bg-gray-900 transition font-medium">
          <span>Upload CSV</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Trusted By */}
      <div className="mt-28 flex flex-col items-center">
        <p className="text-gray-500 text-sm mb-10 uppercase tracking-wide">
          Trusted by developers & teams from
        </p>

        <div className="flex flex-wrap items-center justify-center gap-14 opacity-70">
          <span className="text-xl font-semibold">Mereb Tech</span>
          <span className="text-xl font-semibold">Hyper</span>
          <span className="text-xl font-semibold">Open Source</span>
          <span className="text-xl font-semibold">Startups</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
