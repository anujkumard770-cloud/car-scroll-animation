"use client";

import React from "react";
import { Zap, Activity } from "lucide-react";

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel px-6 py-3.5 rounded-2xl border border-slate-200/90 shadow-sm bg-white/90">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center shadow-sm">
            <Zap className="w-5 h-5 text-sky-400 fill-sky-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-wider text-base text-slate-950 font-mono leading-none">
              ITZFIZZ
            </span>
            <span className="text-[10px] tracking-widest text-sky-600 font-mono mt-0.5 uppercase font-bold">
              Motorsport Dynamics
            </span>
          </div>
        </div>

        {/* Center telemetry status pill */}
        <div className="hidden md:flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Activity className="w-3.5 h-3.5 text-sky-600" />
          <span className="font-bold tracking-wider text-[11px] text-slate-800">
            AERO TELEMETRY ACTIVE
          </span>
        </div>

        {/* Action Button */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              const el = document.getElementById("specs-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="cursor-pointer px-5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white bg-slate-950 hover:bg-slate-800 transition-all duration-200 shadow-sm hover:shadow active:scale-95"
          >
            Explore Specs
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
