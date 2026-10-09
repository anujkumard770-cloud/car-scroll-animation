"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Gauge, Zap, Wind, Timer, ChevronDown, Sparkles } from "lucide-react";

// Safe ScrollTrigger registration for Next.js SSR
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Impact Metrics Data
const STATS_DATA = [
  {
    icon: Timer,
    value: "1.89s",
    unit: "",
    label: "0-100 KM/H",
    description: "Instant Launch Torque",
    accent: "text-sky-600",
  },
  {
    icon: Gauge,
    value: "425",
    unit: "KM/H",
    label: "TOP SPEED",
    description: "Aerodynamic Limit",
    accent: "text-blue-600",
  },
  {
    icon: Zap,
    value: "1,400",
    unit: "BHP",
    label: "PEAK OUTPUT",
    description: "Quad-Motor Vectoring",
    accent: "text-indigo-600",
  },
  {
    icon: Wind,
    value: "0.198",
    unit: "Cd",
    label: "DRAG COEFF",
    description: "Active Ground Effect",
    accent: "text-teal-600",
  },
];

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heroViewportRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const titleContainerRef = useRef<HTMLHeadingElement | null>(null);
  const statsContainerRef = useRef<HTMLDivElement | null>(null);
  const carWrapperRef = useRef<HTMLDivElement | null>(null);
  const speedLinesRef = useRef<HTMLDivElement | null>(null);
  const telemetryOverlayRef = useRef<HTMLDivElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // -------------------------------------------------------------
      // 1. INITIAL LOAD TIMELINE: Premium, staggered entrance
      // -------------------------------------------------------------
      const introTl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 1.1,
        },
      });

      const letterSpans = titleContainerRef.current?.querySelectorAll(".hero-letter");
      const statCards = statsContainerRef.current?.querySelectorAll(".stat-card");

      introTl
        // Sub-badge gentle descent
        .fromTo(
          badgeRef.current,
          { opacity: 0, y: -20, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }
        )
        // Staggered reveal of each letter in the headline
        .fromTo(
          letterSpans || [],
          {
            opacity: 0,
            y: 40,
            scale: 0.92,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.03,
            duration: 0.9,
          },
          "-=0.5"
        )
        // Staggered upward lift of the 4 impact metric cards
        .fromTo(
          statCards || [],
          {
            opacity: 0,
            y: 30,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "back.out(1.2)",
          },
          "-=0.6"
        )
        // Car vehicle reveals into place with smooth entrance
        .fromTo(
          carWrapperRef.current,
          {
            opacity: 0,
            scale: 0.9,
            x: -30,
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 1.2,
            ease: "power2.out",
          },
          "-=0.7"
        )
        // Scroll prompt indicator
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        );

      // -------------------------------------------------------------
      // 2. SCROLL-DRIVEN ANIMATION: 60 FPS GPU Scrub with ScrollTrigger
      // -------------------------------------------------------------
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1.1,
          pin: heroViewportRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1: Headline & stats gently parallax upward and fade
      scrollTl
        .to(
          [titleContainerRef.current, badgeRef.current],
          {
            yPercent: -60,
            opacity: 0.05,
            filter: "blur(4px)",
            force3D: true,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          statCards || [],
          {
            yPercent: -40,
            opacity: 0.08,
            stagger: 0.03,
            force3D: true,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            yPercent: 30,
            duration: 0.2,
            ease: "power1.out",
          },
          0
        );

      // Phase 2: Speed lines sweep horizontally to convey high velocity
      scrollTl.to(
        speedLinesRef.current,
        {
          xPercent: -80,
          opacity: 0.9,
          force3D: true,
          ease: "none",
        },
        0
      );

      // Phase 3: Vehicle dynamic motion (GPU-accelerated translate3d, scale, rotateZ)
      // Strictly avoiding layout reflows!
      scrollTl.to(
        carWrapperRef.current,
        {
          xPercent: 44,      // High-speed drive forward
          yPercent: 10,      // Cornering dynamic
          scale: 1.22,       // Forward perspective zoom
          rotationZ: 2.2,    // Subtle chassis roll
          force3D: true,
          ease: "power1.inOut",
        },
        0
      );

      // Phase 4: Dynamic telemetry HUD illuminates midway through scrub
      scrollTl.fromTo(
        telemetryOverlayRef.current,
        {
          opacity: 0,
          scale: 0.92,
          y: 25,
          pointerEvents: "none",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          force3D: true,
          duration: 0.35,
          ease: "power2.out",
        },
        0.35
      );
    },
    { scope: containerRef }
  );

  // Split headline "W E L C O M E   I T Z F I Z Z" into individual staggered letters
  const headlineWords = [
    { text: "WELCOME", color: "text-slate-950" },
    {
      text: "ITZFIZZ",
      color: "text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-600 to-indigo-600",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-white text-slate-900 overflow-hidden"
    >
      {/* Background Ambience & Clean Road Horizon */}
      <div className="absolute inset-0 pointer-events-none bg-grid-pattern opacity-60" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-sky-100/60 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-12 w-[450px] h-[300px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Viewport (Full viewport height above the fold: h-screen / min-h-screen) */}
      <div
        ref={heroViewportRef}
        className="relative w-full h-screen min-h-screen flex flex-col justify-between items-center px-4 sm:px-8 pt-24 pb-8 overflow-hidden"
      >
        {/* ============================================================ */}
        {/* TOP / CENTER SECTION: Headline & Impact Metrics Row         */}
        {/* ============================================================ */}
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center z-20 mt-2 sm:mt-4">
          {/* Sub-Headline Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs sm:text-sm font-mono text-slate-700 tracking-wider mb-3 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-600 animate-spin" style={{ animationDuration: "8s" }} />
            <span className="uppercase font-bold tracking-wider text-[11px] sm:text-xs">
              APEX ELECTRIC HYPER-ARCH // MK-IV
            </span>
          </div>

          {/* Bold Letter-Spaced Headline: "W E L C O M E   I T Z F I Z Z" */}
          <h1
            ref={titleContainerRef}
            aria-label="W E L C O M E I T Z F I Z Z"
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-mono tracking-widest sm:tracking-[0.25em] md:tracking-[0.36em] uppercase leading-none drop-shadow-xs flex flex-wrap justify-center gap-x-6 sm:gap-x-10 gap-y-2 select-none"
          >
            {headlineWords.map((word, wordIdx) => (
              <span key={wordIdx} className="inline-flex overflow-hidden">
                {word.text.split("").map((letter, letterIdx) => (
                  <span
                    key={letterIdx}
                    className={`hero-letter inline-block ${word.color} transition-transform duration-200 hover:scale-105`}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="mt-2.5 text-xs sm:text-sm md:text-base text-slate-600 font-mono tracking-wider max-w-2xl font-medium">
            Precision engineering meets instantaneous electric torque. Scroll down to initiate telemetry drive.
          </p>

          {/* Clean Stats / Impact Metrics Row */}
          <div
            ref={statsContainerRef}
            className="w-full max-w-5xl mt-5 sm:mt-7 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 px-2"
          >
            {STATS_DATA.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={idx}
                  className="stat-card glass-panel group p-3.5 sm:p-4 rounded-xl border border-slate-200/90 transition-all duration-300 flex flex-col items-start text-left relative overflow-hidden hover:border-sky-500/40 hover:shadow-md"
                >
                  <div className="absolute top-0 right-0 w-14 h-14 bg-sky-50/70 rounded-bl-full pointer-events-none group-hover:bg-sky-100 transition-colors" />

                  <div className="flex items-center space-x-2 mb-1.5">
                    <IconComp className={`w-4 h-4 ${stat.accent}`} />
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-500 tracking-wider uppercase">
                      {stat.label}
                    </span>
                  </div>

                  <div className="flex items-baseline space-x-1">
                    <span className="text-xl sm:text-2xl md:text-3xl font-black font-mono tracking-tight text-slate-950 group-hover:text-sky-600 transition-colors">
                      {stat.value}
                    </span>
                    {stat.unit && (
                      <span className="text-xs font-mono font-bold text-slate-500">
                        {stat.unit}
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] text-slate-500 font-mono mt-0.5 font-medium">
                    {stat.description}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Speed Lines Layer */}
        <div
          ref={speedLinesRef}
          className="absolute inset-x-0 bottom-20 sm:bottom-28 h-36 pointer-events-none opacity-40 flex flex-col justify-around overflow-hidden"
        >
          <div className="w-[200vw] h-[1.5px] bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
          <div className="w-[180vw] h-[2px] bg-gradient-to-r from-transparent via-slate-300 to-transparent translate-x-12" />
          <div className="w-[220vw] h-[1.5px] bg-gradient-to-r from-transparent via-blue-400 to-transparent -translate-x-20" />
          <div className="w-[190vw] h-[1.5px] bg-gradient-to-r from-transparent via-sky-500 to-transparent translate-x-32" />
        </div>

        {/* ============================================================ */}
        {/* CENTER / BOTTOM: Visual Element (Photorealistic Hypercar)    */}
        {/* ============================================================ */}
        <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center my-auto z-10 px-4">
          <div
            ref={carWrapperRef}
            className="w-full max-w-[820px] lg:max-w-[920px] gpu-accelerated relative flex items-center justify-center"
          >
            {/* Photorealistic Hypercar Asset with Crisp Contrast */}
            <div className="relative w-full">
              <Image
                src="/car.png"
                alt="ITZFIZZ Apex Hypercar"
                width={1376}
                height={693}
                priority
                className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Telemetry HUD Overlay (Revealed via GSAP Scroll scrub) */}
        <div
          ref={telemetryOverlayRef}
          className="absolute bottom-24 left-6 sm:left-12 z-30 max-w-xs p-4 rounded-xl glass-panel-glow opacity-0 pointer-events-none"
        >
          <div className="flex items-center justify-between text-xs font-mono text-sky-700 mb-2 font-bold">
            <span className="tracking-wider">AERODYNAMIC MODE</span>
            <span className="animate-pulse text-emerald-600">100% ENGAGED</span>
          </div>
          <div className="space-y-1.5 text-[11px] font-mono text-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-500">Rear Diffuser Angle:</span>
              <span className="font-bold text-slate-900">+14.2° Downforce</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Torque Vector Split:</span>
              <span className="font-bold text-sky-600">35% F / 65% R</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Brembo Carbon Ceramic:</span>
              <span className="font-bold text-emerald-600">Optimal Temp</span>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Prompt */}
        <div
          ref={scrollIndicatorRef}
          className="z-20 flex flex-col items-center space-y-2 select-none cursor-pointer"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight * 1.2,
              behavior: "smooth",
            });
          }}
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-500 font-bold animate-pulse">
            Scroll to Accelerate
          </span>
          <div className="w-5 h-8 rounded-full border border-slate-300 flex items-start justify-center p-1 bg-white shadow-xs">
            <div className="w-1.5 h-2 rounded-full bg-sky-600 animate-bounce" />
          </div>
          <ChevronDown className="w-4 h-4 text-sky-600 -mt-1 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
