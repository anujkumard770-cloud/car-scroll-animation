import React from "react";

interface TopDownCarProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

/**
 * TopDownCar Component
 * High-detail top-view vector rendering of a McLaren/Porsche style aerodynamic orange hypercar.
 * Oriented horizontally facing right (East) for smooth scroll-driven track travel.
 */
export const TopDownCar: React.FC<TopDownCarProps> = ({
  className = "",
  width = 320,
  height = 140,
}) => {
  return (
    <div
      className={`relative inline-block select-none pointer-events-none drop-shadow-2xl ${className}`}
      style={{ width, height }}
    >
      <svg
        viewBox="0 0 480 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Main Orange Metallic Gradient */}
          <linearGradient id="carOrangeBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff7a18" />
            <stop offset="15%" stopColor="#fa5c00" />
            <stop offset="50%" stopColor="#ff852e" />
            <stop offset="85%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>

          {/* Highlights & Reflection Stripe */}
          <linearGradient id="bodyHighlight" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#ffa057" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffa057" stopOpacity="0.3" />
          </linearGradient>

          {/* Tinted Cockpit Glass */}
          <linearGradient id="cockpitGlass" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#090d16" />
            <stop offset="35%" stopColor="#1e293b" />
            <stop offset="70%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Carbon Fiber Aerodynamic Trim */}
          <linearGradient id="carbonTrim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#262626" />
            <stop offset="100%" stopColor="#0f0f0f" />
          </linearGradient>

          {/* Underbody Ambient Shadow */}
          <filter id="carShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* 1. Exposed Wide Tires (4 Wheels) */}
        {/* Front Top Tire */}
        <rect x="330" y="8" width="62" height="24" rx="6" fill="#171717" stroke="#0a0a0a" strokeWidth="2" />
        <line x1="342" y1="12" x2="382" y2="12" stroke="#404040" strokeWidth="2" strokeDasharray="4 3" />
        {/* Front Bottom Tire */}
        <rect x="330" y="178" width="62" height="24" rx="6" fill="#171717" stroke="#0a0a0a" strokeWidth="2" />
        <line x1="342" y1="198" x2="382" y2="198" stroke="#404040" strokeWidth="2" strokeDasharray="4 3" />
        {/* Rear Top Tire */}
        <rect x="78" y="6" width="70" height="28" rx="6" fill="#171717" stroke="#0a0a0a" strokeWidth="2" />
        <line x1="92" y1="10" x2="136" y2="10" stroke="#404040" strokeWidth="2" strokeDasharray="4 3" />
        {/* Rear Bottom Tire */}
        <rect x="78" y="176" width="70" height="28" rx="6" fill="#171717" stroke="#0a0a0a" strokeWidth="2" />
        <line x1="92" y1="200" x2="136" y2="200" stroke="#404040" strokeWidth="2" strokeDasharray="4 3" />

        {/* 2. Rear Carbon Diffuser & Exhaust Outlets */}
        <path d="M 28 85 L 50 85 L 45 125 L 28 125 Z" fill="url(#carbonTrim)" />
        <rect x="22" y="94" width="12" height="8" rx="2" fill="#262626" stroke="#525252" strokeWidth="1" />
        <rect x="22" y="108" width="12" height="8" rx="2" fill="#262626" stroke="#525252" strokeWidth="1" />

        {/* 3. Rear Aerodynamic Active Wing */}
        <path
          d="M 38 42 C 45 60, 48 85, 48 105 C 48 125, 45 150, 38 168 C 50 162, 58 145, 58 105 C 58 65, 50 48, 38 42 Z"
          fill="url(#carbonTrim)"
          stroke="#000000"
          strokeWidth="1.5"
        />

        {/* 4. Main Body Aerodynamic Shell */}
        <path
          d="M 46 105 
             C 46 68, 70 36, 120 32
             C 170 28, 240 40, 310 35
             C 360 32, 410 45, 442 75
             C 458 90, 464 100, 464 105
             C 464 110, 458 120, 442 135
             C 410 165, 360 178, 310 175
             C 240 170, 170 182, 120 178
             C 70 174, 46 142, 46 105 Z"
          fill="url(#carOrangeBody)"
          stroke="#9a3412"
          strokeWidth="2.5"
        />

        {/* 5. Sculpted Aerodynamic Side Intakes */}
        <path
          d="M 160 38 C 210 52, 260 52, 295 40 L 290 52 C 255 62, 210 62, 165 48 Z"
          fill="#1c1917"
          opacity="0.9"
        />
        <path
          d="M 160 172 C 210 158, 260 158, 295 170 L 290 158 C 255 148, 210 148, 165 162 Z"
          fill="#1c1917"
          opacity="0.9"
        />

        {/* 6. Front Hood Aerodynamic Vents */}
        <path
          d="M 370 78 C 395 82, 410 90, 420 100 L 415 105 L 365 84 Z"
          fill="#1c1917"
          opacity="0.85"
        />
        <path
          d="M 370 132 C 395 128, 410 120, 420 110 L 415 105 L 365 126 Z"
          fill="#1c1917"
          opacity="0.85"
        />

        {/* 7. Teardrop Glass Cockpit (Windshield, Roof, Rear Engine Glass) */}
        {/* Windshield */}
        <path
          d="M 255 64 
             C 295 68, 335 80, 350 105 
             C 335 130, 295 142, 255 146 
             C 270 125, 270 85, 255 64 Z"
          fill="url(#cockpitGlass)"
          stroke="#0f172a"
          strokeWidth="1.5"
        />
        {/* Windshield Glare Reflection */}
        <path
          d="M 270 75 C 300 85, 320 95, 335 105 C 315 100, 290 90, 265 80 Z"
          fill="#ffffff"
          opacity="0.3"
        />

        {/* Roof & Engine Glass Cover */}
        <path
          d="M 140 70 
             C 175 64, 220 64, 255 64 
             C 270 85, 270 125, 255 146 
             C 220 146, 175 146, 140 140 
             C 125 125, 125 85, 140 70 Z"
          fill="url(#cockpitGlass)"
          stroke="#0f172a"
          strokeWidth="1.5"
        />

        {/* Engine Vents Louvers */}
        <line x1="160" y1="85" x2="160" y2="125" stroke="#475569" strokeWidth="2.5" />
        <line x1="180" y1="80" x2="180" y2="130" stroke="#475569" strokeWidth="2.5" />
        <line x1="200" y1="76" x2="200" y2="134" stroke="#475569" strokeWidth="2.5" />
        <line x1="220" y1="74" x2="220" y2="136" stroke="#475569" strokeWidth="2.5" />

        {/* 8. Sleek Side Mirrors */}
        <path d="M 290 35 L 305 20 L 315 24 L 295 42 Z" fill="#ea580c" stroke="#1c1917" strokeWidth="1" />
        <path d="M 290 175 L 305 190 L 315 186 L 295 168 Z" fill="#ea580c" stroke="#1c1917" strokeWidth="1" />

        {/* 9. Front Headlight LED Blades */}
        <path
          d="M 425 65 C 440 72, 448 80, 452 86 L 444 88 C 438 82, 430 76, 420 70 Z"
          fill="#38bdf8"
          filter="drop-shadow(0 0 3px #38bdf8)"
        />
        <path
          d="M 425 145 C 440 138, 448 130, 452 124 L 444 122 C 438 128, 430 134, 420 140 Z"
          fill="#38bdf8"
          filter="drop-shadow(0 0 3px #38bdf8)"
        />

        {/* 10. Centerline Spine Highlight */}
        <path
          d="M 70 105 L 125 105 M 350 105 L 448 105"
          stroke="url(#bodyHighlight)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default TopDownCar;
