"use client";

import React from "react";
import { BorderImage } from "@/app/components/ui/moving-border";

const Copilot = () => {
  return (
    <section className="w-full bg-black py-24 md:py-32">
      {/* Removed h-screen, added vertical padding */}
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-8">
          {/* Title Section */}
          <div className="flex flex-col items-center text-center space-y-4">
            <p className="text-3xl md:text-5xl font-arial text-[#f2f5f9]">
              Your Work Assistant
            </p>
            <p className="text-lg md:text-2xl font-arial text-[#c1c3d0] max-w-[600px]">
              An AI Army working simultaneously in front of you
            </p>
          </div>

          {/* Image with Moving Border */}
          <div className="mt-8 relative bg-[#191c26]" style={{ borderRadius: '10px' }}>
            
            <BorderImage
              src="/Copilot.svg"
              alt="AI Development Assistant"
              width={1000}
              height={742}
              className="shadow-2xl relative z-0"
              borderRadius="0.75rem"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Copilot;