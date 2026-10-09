import React from "react";

interface CarGraphicProps {
  className?: string;
  headlightsOn?: boolean;
}

/**
 * CarGraphic Component
 * A high-detail, responsive vector hypercar (inspired by modern electric aero-hypercars)
 * Rendered using pure scalable SVG with GPU-friendly layers, contrast shaders for Light Mode,
 * illuminated headlights, carbon aerodynamic elements, and realistic road ground shadows.
 */
export const CarGraphic: React.FC<CarGraphicProps> = ({
  className = "",
  headlightsOn = true,
}) => {
  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1200 430"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xl"
      >
        <defs>
          {/* Main Body Gradient - Deep Liquid Graphite & Polished Metal for high contrast in light mode */}
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#111319" />
            <stop offset="25%" stopColor="#2b313d" />
            <stop offset="50%" stopColor="#181a22" />
            <stop offset="85%" stopColor="#0e1015" />
            <stop offset="100%" stopColor="#08090d" />
          </linearGradient>

          {/* Roof & Cockpit Glass */}
          <linearGradient id="cockpitGradient" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#0f172a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0.98" />
          </linearGradient>

          {/* Metallic Accent Highlight */}
          <linearGradient id="metallicHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
          </linearGradient>

          {/* Wheel Rim Gradient */}
          <radialGradient id="rimGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#1e293b" />
            <stop offset="75%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>

          {/* Brake Caliper Neon Glow */}
          <linearGradient id="caliperGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>

          {/* Headlight Beam Projection */}
          <linearGradient id="headlightBeam" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.7" />
            <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
          </linearGradient>

          {/* Realistic Multi-Layer Road Contact Shadow for Light Mode */}
          <radialGradient id="groundShadowContact" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#0f172a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="groundUnderglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
            <stop offset="65%" stopColor="#0ea5e9" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>

          {/* Carbon Fiber Accent */}
          <linearGradient id="carbonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e2430" />
            <stop offset="100%" stopColor="#090b10" />
          </linearGradient>
        </defs>

        {/* 1. Ground Shadow & Road Contact (Rich depth in Light Mode) */}
        <ellipse cx="600" cy="358" rx="540" ry="34" fill="url(#groundUnderglow)" />
        <ellipse cx="600" cy="362" rx="490" ry="24" fill="url(#groundShadowContact)" />
        <ellipse cx="600" cy="365" rx="420" ry="12" fill="#020617" opacity="0.75" />

        {/* 2. Headlight Forward Light Projection Cone */}
        {headlightsOn && (
          <path
            d="M 1045 258 L 1200 226 L 1200 326 L 1055 272 Z"
            fill="url(#headlightBeam)"
            className="transition-opacity duration-500"
          />
        )}

        {/* 3. Aerodynamic Rear Wing / Spoiler */}
        <path
          d="M 155 185 C 140 180, 110 185, 95 195 L 125 215 C 145 208, 175 205, 205 205 L 195 188 Z"
          fill="url(#carbonGradient)"
          stroke="#0284c7"
          strokeWidth="1.2"
        />
        <path d="M 140 215 L 155 250 L 175 250 L 165 210 Z" fill="#0d0e12" />

        {/* 4. Main Body Silhouette (Sculpted Hypercar Profile) */}
        <path
          d="M 120 270 
             C 125 240, 150 220, 200 215 
             C 270 208, 350 205, 410 185 
             C 470 165, 540 140, 640 140 
             C 740 140, 810 175, 870 215 
             C 930 225, 1020 240, 1070 255 
             C 1090 260, 1100 270, 1085 285 
             C 1070 295, 1045 305, 985 305 
             C 960 305, 940 310, 930 325 
             L 890 325 
             C 870 270, 780 270, 760 325 
             L 420 325 
             C 400 270, 310 270, 290 325 
             L 170 325 
             C 140 325, 120 305, 120 270 Z"
          fill="url(#bodyGradient)"
          stroke="#334155"
          strokeWidth="2.5"
        />

        {/* 5. Aerodynamic Side Contours & Door Scoops */}
        <path
          d="M 330 280 C 440 260, 580 270, 740 250 C 760 270, 770 295, 750 310 C 620 315, 460 315, 330 280 Z"
          fill="url(#carbonGradient)"
          opacity="0.9"
        />
        {/* Speed / Body Character Line */}
        <path
          d="M 210 230 C 350 220, 520 200, 730 230 C 850 250, 960 265, 1045 268"
          stroke="url(#metallicHighlight)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* 6. Cockpit Canopy & Aerodynamic Windshield */}
        <path
          d="M 445 190 
             C 505 170, 570 152, 655 152 
             C 730 152, 790 175, 840 210 
             C 800 212, 720 215, 630 215 
             C 540 215, 475 205, 445 190 Z"
          fill="url(#cockpitGradient)"
          stroke="#38bdf8"
          strokeWidth="1.8"
          strokeOpacity="0.7"
        />
        {/* Cockpit Reflection Stripe */}
        <path
          d="M 490 185 C 560 162, 630 158, 710 160 C 670 178, 620 185, 530 195 Z"
          fill="#ffffff"
          opacity="0.35"
        />

        {/* 7. Front LED Headlight Matrix */}
        <g>
          {/* Main illuminated blade */}
          <path
            d="M 1020 255 L 1070 260 L 1055 268 L 1005 264 Z"
            fill={headlightsOn ? "#0284c7" : "#64748b"}
            filter={headlightsOn ? "drop-shadow(0px 0px 8px #0284c7)" : undefined}
          />
          {/* Upper LED DRL strip */}
          <path
            d="M 985 248 C 1020 252, 1050 256, 1075 260"
            stroke={headlightsOn ? "#ffffff" : "#94a3b8"}
            strokeWidth="3.5"
            strokeLinecap="round"
            filter={headlightsOn ? "drop-shadow(0px 0px 6px #38bdf8)" : undefined}
          />
        </g>

        {/* 8. Rear LED Tail-Light Bar */}
        <path
          d="M 122 268 L 138 245 L 175 240"
          stroke="#ef4444"
          strokeWidth="4"
          strokeLinecap="round"
          filter="drop-shadow(0px 0px 8px #ef4444)"
        />

        {/* 9. Front Wheel & Rim Assembly (Center approx X: 825, Y: 325) */}
        <g transform="translate(825, 325)">
          <circle r="64" fill="#090b10" stroke="#334155" strokeWidth="10" />
          <circle r="52" fill="url(#rimGrad)" stroke="#1e293b" strokeWidth="3" />
          <circle r="40" fill="#1e293b" stroke="#475569" strokeWidth="2" strokeDasharray="6 3" />
          <path d="M -30 -18 A 36 36 0 0 1 -12 -34 L -8 -24 A 26 26 0 0 0 -22 -12 Z" fill="url(#caliperGlow)" />
          <circle r="12" fill="#0f172a" stroke="#0284c7" strokeWidth="2.5" />
          <line x1="0" y1="-12" x2="0" y2="-48" stroke="#38bdf8" strokeWidth="3.5" opacity="0.95" />
          <line x1="11" y1="6" x2="42" y2="24" stroke="#38bdf8" strokeWidth="3.5" opacity="0.95" />
          <line x1="-11" y1="6" x2="-42" y2="24" stroke="#38bdf8" strokeWidth="3.5" opacity="0.95" />
          <line x1="8" y1="-9" x2="34" y2="-36" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
          <line x1="-8" y1="-9" x2="-34" y2="-36" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
        </g>

        {/* 10. Rear Wheel & Rim Assembly (Center approx X: 355, Y: 325) */}
        <g transform="translate(355, 325)">
          <circle r="66" fill="#090b10" stroke="#334155" strokeWidth="10" />
          <circle r="54" fill="url(#rimGrad)" stroke="#1e293b" strokeWidth="3" />
          <circle r="42" fill="#1e293b" stroke="#475569" strokeWidth="2" strokeDasharray="6 3" />
          <path d="M -32 -20 A 38 38 0 0 1 -14 -36 L -10 -26 A 28 28 0 0 0 -24 -14 Z" fill="url(#caliperGlow)" />
          <circle r="12" fill="#0f172a" stroke="#0284c7" strokeWidth="2.5" />
          <line x1="0" y1="-12" x2="0" y2="-50" stroke="#38bdf8" strokeWidth="3.5" opacity="0.95" />
          <line x1="11" y1="6" x2="44" y2="26" stroke="#38bdf8" strokeWidth="3.5" opacity="0.95" />
          <line x1="-11" y1="6" x2="-44" y2="26" stroke="#38bdf8" strokeWidth="3.5" opacity="0.95" />
          <line x1="8" y1="-9" x2="36" y2="-38" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
          <line x1="-8" y1="-9" x2="-34" y2="-38" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
        </g>

        {/* 11. Front Splitter & Carbon Aero Diffuser */}
        <path
          d="M 1030 315 L 1115 315 L 1100 325 L 1025 325 Z"
          fill="#0284c7"
          opacity="0.9"
        />
        <path
          d="M 140 322 L 180 322 L 165 332 L 125 332 Z"
          fill="#ef4444"
          opacity="0.85"
        />
      </svg>
    </div>
  );
};

export default CarGraphic;
