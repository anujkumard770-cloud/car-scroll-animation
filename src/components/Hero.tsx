"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TopDownCar from "@/components/TopDownCar";
import { ChevronDown, ArrowRight } from "lucide-react";

// Safe ScrollTrigger registration for Next.js SSR
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Letter breakdown for "W E L C O M E   I T Z F I Z Z"
const HEADLINE_LETTERS = [
  { char: "W", id: 0 },
  { char: "E", id: 1 },
  { char: "L", id: 2 },
  { char: "C", id: 3 },
  { char: "O", id: 4 },
  { char: "M", id: 5 },
  { char: "E", id: 6 },
  { char: " ", id: 7, isSpace: true },
  { char: "I", id: 8 },
  { char: "T", id: 9 },
  { char: "Z", id: 10 },
  { char: "F", id: 11 },
  { char: "I", id: 12 },
  { char: "Z", id: 13 },
  { char: "Z", id: 14 },
];

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const roadRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const carWrapperRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);

  const box1Ref = useRef<HTMLDivElement | null>(null);
  const box2Ref = useRef<HTMLDivElement | null>(null);
  const box3Ref = useRef<HTMLDivElement | null>(null);
  const box4Ref = useRef<HTMLDivElement | null>(null);
  const scrollPromptRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // Check prefers-reduced-motion preference
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const letters = headlineRef.current?.querySelectorAll<HTMLSpanElement>(".headline-char");
      const statBoxes = [box1Ref.current, box2Ref.current, box3Ref.current, box4Ref.current].filter(Boolean);

      if (prefersReducedMotion) {
        // Fallback for reduced motion: instant visibility
        gsap.set(statBoxes, { opacity: 1, y: 0 });
        if (trailRef.current) gsap.set(trailRef.current, { width: "100%" });
        if (letters) gsap.set(letters, { opacity: 1 });
        return;
      }

      // -------------------------------------------------------------
      // 1. INITIAL LOAD TIMELINE: Subtle entrance
      // -------------------------------------------------------------
      const introTl = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      introTl
        .fromTo(
          trackRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 }
        )
        .fromTo(
          carWrapperRef.current,
          { x: -180, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.1, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          scrollPromptRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        );

      // -------------------------------------------------------------
      // 2. SCROLL-DRIVEN ANIMATION (GSAP ScrollTrigger with scrub)
      // -------------------------------------------------------------
      const road = roadRef.current;
      const car = carWrapperRef.current;
      const trail = trailRef.current;
      if (!road || !car || !trail) return;

      const mm = gsap.matchMedia();

      // Responsive calculations using MatchMedia
      mm.add("(min-width: 1024px)", () => {
        // Desktop calculation
        const getEndX = () => {
          const roadWidth = road.offsetWidth || window.innerWidth;
          const carWidth = car.offsetWidth || 300;
          return roadWidth - carWidth + 40;
        };

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=220%",
            scrub: 0.8,
            pin: trackRef.current,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const carRect = car.getBoundingClientRect();
              const carFrontX = carRect.right - 20; // Nose of the vehicle
              const roadRect = road.getBoundingClientRect();
              const trailWidth = Math.max(0, carFrontX - roadRect.left);

              gsap.set(trail, { width: `${trailWidth}px` });

              // Dynamically illuminate each letter as the car passes over it
              if (letters) {
                letters.forEach((letter) => {
                  const letterRect = letter.getBoundingClientRect();
                  const letterCenterX = letterRect.left + letterRect.width * 0.4;
                  if (carFrontX >= letterCenterX) {
                    letter.style.opacity = "1";
                    letter.style.transform = "translateY(0px) scale(1)";
                  } else {
                    letter.style.opacity = "0.08";
                    letter.style.transform = "translateY(4px) scale(0.96)";
                  }
                });
              }
            },
          },
        });

        // Horizontal car travel
        scrollTl.to(
          car,
          {
            x: () => getEndX(),
            ease: "none",
            duration: 1,
          },
          0
        );

        // Box 1 (58% Lime-Yellow - Top Left)
        scrollTl.fromTo(
          box1Ref.current,
          { opacity: 0, y: -25, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.2 },
          0.15
        );

        // Box 2 (23% Light Blue - Bottom Left)
        scrollTl.fromTo(
          box2Ref.current,
          { opacity: 0, y: 25, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.2 },
          0.38
        );

        // Box 3 (27% Charcoal Dark - Top Right)
        scrollTl.fromTo(
          box3Ref.current,
          { opacity: 0, y: -25, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.2 },
          0.60
        );

        // Box 4 (40% Orange - Bottom Right)
        scrollTl.fromTo(
          box4Ref.current,
          { opacity: 0, y: 25, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.2 },
          0.78
        );

        // Scroll prompt fades away when user starts scrolling
        scrollTl.to(
          scrollPromptRef.current,
          { opacity: 0, y: 15, duration: 0.1 },
          0
        );
      });

      // Tablet & Mobile Viewport (< 1024px)
      mm.add("(max-width: 1023px)", () => {
        const getEndX = () => {
          const roadWidth = road.offsetWidth || window.innerWidth;
          const carWidth = car.offsetWidth || 220;
          return roadWidth - carWidth + 20;
        };

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=180%",
            scrub: 0.8,
            pin: trackRef.current,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: () => {
              const carRect = car.getBoundingClientRect();
              const carFrontX = carRect.right - 10;
              const roadRect = road.getBoundingClientRect();
              const trailWidth = Math.max(0, carFrontX - roadRect.left);

              gsap.set(trail, { width: `${trailWidth}px` });

              if (letters) {
                letters.forEach((letter) => {
                  const letterRect = letter.getBoundingClientRect();
                  const letterCenterX = letterRect.left + letterRect.width * 0.4;
                  if (carFrontX >= letterCenterX) {
                    letter.style.opacity = "1";
                  } else {
                    letter.style.opacity = "0.08";
                  }
                });
              }
            },
          },
        });

        scrollTl.to(
          car,
          {
            x: () => getEndX(),
            ease: "none",
            duration: 1,
          },
          0
        );

        // Progressive reveal of cards on mobile
        scrollTl.fromTo(
          box1Ref.current,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.2 },
          0.15
        );
        scrollTl.fromTo(
          box2Ref.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.2 },
          0.38
        );
        scrollTl.fromTo(
          box3Ref.current,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.2 },
          0.60
        );
        scrollTl.fromTo(
          box4Ref.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.2 },
          0.78
        );

        scrollTl.to(
          scrollPromptRef.current,
          { opacity: 0, duration: 0.1 },
          0
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#d1d1d1] text-slate-900 selection:bg-[#45db7d] selection:text-black overflow-hidden"
    >
      {/* Pinned 100vh Track Container */}
      <div
        ref={trackRef}
        className="relative w-full h-screen min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#d1d1d1]"
      >
        {/* ============================================================ */}
        {/* TOP STAT CARDS ROW (Box 1 & Box 3)                          */}
        {/* ============================================================ */}
        <div className="absolute top-12 sm:top-14 md:top-16 lg:top-20 inset-x-0 w-full max-w-7xl mx-auto px-4 sm:px-8 pointer-events-none z-30 flex justify-between items-start">
          {/* Box 1: 58% Lime-Yellow Card */}
          <div
            ref={box1Ref}
            id="box1"
            className="pointer-events-auto opacity-0 bg-[#def54f] text-[#111111] p-4 sm:p-6 md:p-7 rounded-2xl shadow-xl border border-black/10 flex flex-col justify-center max-w-[210px] sm:max-w-[260px] md:max-w-[290px] ml-auto mr-4 md:mr-16 lg:mr-28 transition-transform duration-200 hover:scale-105"
          >
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-sans tracking-tight leading-none mb-1 text-black">
              58%
            </div>
            <p className="text-xs sm:text-sm md:text-base font-semibold text-slate-900 leading-snug">
              Increase in pick up point use
            </p>
          </div>

          {/* Box 3: 27% Charcoal Dark Card */}
          <div
            ref={box3Ref}
            id="box3"
            className="pointer-events-auto opacity-0 bg-[#2b2b2b] text-white p-4 sm:p-6 md:p-7 rounded-2xl shadow-xl border border-white/10 flex flex-col justify-center max-w-[210px] sm:max-w-[260px] md:max-w-[290px] mr-2 sm:mr-4 md:mr-12 transition-transform duration-200 hover:scale-105"
          >
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-sans tracking-tight leading-none mb-1 text-white">
              27%
            </div>
            <p className="text-xs sm:text-sm md:text-base font-medium text-slate-200 leading-snug">
              Increase in pick up point use
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CENTER TRACK: Black Road + Dynamic Neon Green Trail + Car   */}
        {/* ============================================================ */}
        <div
          ref={roadRef}
          id="road"
          className="relative w-full h-44 sm:h-52 md:h-60 bg-[#1e1e1e] flex items-center overflow-hidden shadow-2xl border-y border-black/40 z-20"
        >
          {/* Dynamic Bright Green Trail (Leaves a vivid neon band behind the moving car) */}
          <div
            ref={trailRef}
            id="trail"
            className="absolute top-0 left-0 h-full bg-[#45db7d] z-10 w-0 transition-none will-change-[width] shadow-[0_0_30px_rgba(69,219,125,0.4)]"
          />

          {/* Large Bold Headline: "W E L C O M E   I T Z F I Z Z" */}
          <div
            ref={headlineRef}
            className="absolute inset-0 flex items-center justify-start pl-4 sm:pl-8 md:pl-16 z-15 pointer-events-none select-none w-full"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-sans uppercase tracking-[0.14em] sm:tracking-[0.2em] md:tracking-[0.24em] text-black whitespace-nowrap leading-none flex items-center">
              {HEADLINE_LETTERS.map((item) =>
                item.isSpace ? (
                  <span key={item.id} className="inline-block w-4 sm:w-8 md:w-12">
                    &nbsp;
                  </span>
                ) : (
                  <span
                    key={item.id}
                    className="headline-char inline-block opacity-10 transition-[opacity,transform] duration-150 will-change-[opacity,transform]"
                  >
                    {item.char}
                  </span>
                )
              )}
            </h1>
          </div>

          {/* Orange Top-Down Sports Car (Driven along the track by GSAP scroll scrub) */}
          <div
            ref={carWrapperRef}
            id="car"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 will-change-transform flex items-center"
          >
            <TopDownCar
              className="w-[200px] sm:w-[260px] md:w-[320px] lg:w-[360px] h-auto"
            />
          </div>
        </div>

        {/* ============================================================ */}
        {/* BOTTOM STAT CARDS ROW (Box 2 & Box 4)                       */}
        {/* ============================================================ */}
        <div className="absolute bottom-12 sm:bottom-14 md:bottom-16 lg:bottom-20 inset-x-0 w-full max-w-7xl mx-auto px-4 sm:px-8 pointer-events-none z-30 flex justify-between items-end">
          {/* Box 2: 23% Light Blue Card */}
          <div
            ref={box2Ref}
            id="box2"
            className="pointer-events-auto opacity-0 bg-[#6ac9ff] text-[#111111] p-4 sm:p-6 md:p-7 rounded-2xl shadow-xl border border-black/10 flex flex-col justify-center max-w-[210px] sm:max-w-[260px] md:max-w-[290px] ml-auto mr-4 md:mr-24 lg:mr-36 transition-transform duration-200 hover:scale-105"
          >
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-sans tracking-tight leading-none mb-1 text-black">
              23%
            </div>
            <p className="text-xs sm:text-sm md:text-base font-semibold text-slate-900 leading-snug">
              Decreased in customer phone calls
            </p>
          </div>

          {/* Box 4: 40% Vivid Orange Card */}
          <div
            ref={box4Ref}
            id="box4"
            className="pointer-events-auto opacity-0 bg-[#fa7328] text-[#111111] p-4 sm:p-6 md:p-7 rounded-2xl shadow-xl border border-black/10 flex flex-col justify-center max-w-[210px] sm:max-w-[260px] md:max-w-[290px] mr-2 sm:mr-4 md:mr-10 transition-transform duration-200 hover:scale-105"
          >
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-sans tracking-tight leading-none mb-1 text-black">
              40%
            </div>
            <p className="text-xs sm:text-sm md:text-base font-semibold text-slate-950 leading-snug">
              Decreased in customer phone calls
            </p>
          </div>
        </div>

        {/* Scroll Prompt Indicator */}
        <div
          ref={scrollPromptRef}
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center space-y-1 select-none cursor-pointer"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight * 1.5,
              behavior: "smooth",
            });
          }}
        >
          <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-slate-700 bg-white/70 px-3 py-1 rounded-full border border-slate-400/40 shadow-xs flex items-center gap-1.5">
            Scroll To Drive <ArrowRight className="w-3.5 h-3.5 text-slate-800" />
          </span>
          <ChevronDown className="w-4 h-4 text-slate-700 animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
