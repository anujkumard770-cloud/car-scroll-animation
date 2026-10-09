"use client";

import React from "react";
import { Cpu, BatteryCharging, Shield, Radio, Flame, Sparkles } from "lucide-react";

const SPECS = [
  {
    icon: BatteryCharging,
    title: "Solid-State Silicon Cell",
    detail: "980V Architecture",
    description: "120 kWh structural battery pack delivering 680 km of WLTP range with 10-80% ultra-fast charging in 12 minutes.",
  },
  {
    icon: Cpu,
    title: "Neural Torque Management",
    detail: "1,000Hz Cycle Rate",
    description: "Sub-millisecond individual wheel slip modulation for unmatched agility around high-speed apexes.",
  },
  {
    icon: Flame,
    title: "Active Aero Blades",
    detail: "Carbon Ground Effect",
    description: "Venturi tunnels with dynamic trailing edge flaps generating up to 850kg of downforce at 300 km/h.",
  },
  {
    icon: Shield,
    title: "Monocoque Carbon Cell",
    detail: "T1000 Aerospace Fiber",
    description: "Torsional rigidity exceeding 65,000 Nm/deg, offering F1-grade passenger safety and structural integrity.",
  },
  {
    icon: Radio,
    title: "Telemetry Satellite Uplink",
    detail: "Real-time Diagnostics",
    description: "Continuous cloud telemetry analysis streaming suspension stroke, tire temp, and aerodynamic efficiency.",
  },
  {
    icon: Sparkles,
    title: "Matrix Laser Luminescence",
    detail: "600m High-Beam Reach",
    description: "Adaptive digital beam shaping with anti-glare vehicle masking and precision corner illumination.",
  },
];

export const SpecsSection: React.FC = () => {
  return (
    <section id="specs-section" className="relative py-24 px-6 bg-slate-50 border-t border-slate-200 z-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono text-sky-700 mb-3 shadow-xs">
              <span className="font-bold tracking-wider">TECHNICAL SPECIFICATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-slate-950 uppercase">
              Engineered For The <span className="text-sky-600">Limitless</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm font-mono text-slate-600 max-w-md font-medium">
            Every curve, intake, and sub-frame engineered with zero compromise between aerodynamic drag and peak downforce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPECS.map((spec, i) => {
            const Icon = spec.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-sky-400 hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center mb-5 text-sky-600 group-hover:bg-slate-950 group-hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-sky-700 tracking-wider mb-1 font-bold uppercase">
                  {spec.detail}
                </div>
                <h3 className="text-xl font-bold font-mono text-slate-950 mb-2">
                  {spec.title}
                </h3>
                <p className="text-sm font-mono text-slate-600 leading-relaxed font-normal">
                  {spec.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpecsSection;
