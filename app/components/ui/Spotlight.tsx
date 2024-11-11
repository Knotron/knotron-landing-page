import React from "react";
import { MovingBorderDemo } from "../Hero-Button";
import ParticleSphere from "./blob";

export function GridBackgroundDemo() {
    return (
      <div className="h-[50rem] w-full bg-black bg-grid-[#10121a] relative flex items-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_left,transparent_0%,black)]"></div>
        
        {/* Main content container with flexbox */}
        <div className="flex justify-between items-center w-full relative z-20 px-20">
          {/* Left side content */}
          <div className="flex flex-col gap-4">
            <p className="text-4xl sm:text-5xl font-silkscreen relative bg-clip-text bg-gradient-to-b text-[#f2f5f9]">
              AI-Powered Workspace<br/>For Research
            </p>
            <p className="text-lg sm:text-xl text-[#c1c3d0] font-light">
              You're now the commander of an AI army<br/>Give orders and get work done at the speed of AI
            </p>
            <div>
              <MovingBorderDemo />
            </div>
          </div>

          {/* Right side particle sphere */}
          <div className="flex-shrink-0">
            <ParticleSphere 
              rgb="14, 165, 233"
              backgroundColor="rgba(0, 0, 0, 1)"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    );
  }