import Image from "next/image";
import Hero from "./components/Hero";
import Copilot from "./components/Copilot";
import Footer from "./components/Footer";
import { FloatingNav } from "./components/ui/FloatingNav";
import { BentoGridSecondDemo } from "./components/Meetings";

export default function Home() {
  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden">
      <div className="fixed top-7 left-7 z-50 
        opacity-100 translate-x-0 
        md:opacity-100 md:translate-x-0
        max-md:opacity-0 max-md:-translate-x-full
        transition-all duration-500 ease-in-out">
        <Image
          src="/logo.svg"
          alt="Company Logo"
          width={150}
          height={50}
          priority
        />
      </div>
      <div className="w-full">
        <div className="fixed top-7 z-50 w-full flex justify-center transition-all duration-500 ease-in-out
          md:justify-end md:pr-7">
          <FloatingNav 
            navItems={[
              {name: 'X', link: 'https://x.com/KnotronAI'}, 
              {name: 'LinkedIn', link: 'https://www.linkedin.com/company/knotron'}
            ]}
          />
        </div>
        <Hero />
        <Copilot />
        <BentoGridSecondDemo />
        <Footer />
      </div>
    </main>
  );
}