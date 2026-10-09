import React from "react";
import { Zap } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 px-6 bg-white border-t border-slate-200 text-slate-500 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 rounded-lg bg-slate-950 flex items-center justify-center text-sky-400">
            <Zap className="w-4 h-4 fill-sky-400" />
          </div>
          <span className="font-extrabold text-slate-900 tracking-wider">ITZFIZZ MOTORS</span>
        </div>

        <div className="flex items-center space-x-6 text-slate-600 font-medium">
          <span>GSAP 3.12+</span>
          <span>Next.js App Router</span>
          <span>ScrollTrigger</span>
          <span>60 FPS GPU Scrub</span>
        </div>

        <div className="font-medium text-slate-500">
          © 2026 ITZFIZZ Automotive. All performance specifications verified.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
