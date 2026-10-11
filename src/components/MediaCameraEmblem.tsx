export default function MediaCameraEmblem({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 480"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <style>{`
          /* Embedded Autonomous CSS Keyframes */
          @keyframes media-aperture-breathe {
            0%, 100% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(16deg) scale(1.025); }
          }
          @keyframes media-shutter-click {
            0%, 88%, 100% { transform: translateY(0); }
            92% { transform: translateY(3.5px); }
            96% { transform: translateY(-0.5px); }
          }
          @keyframes media-filmstrip-sway {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-4px) rotate(-0.6deg); }
          }
          @keyframes media-sheen-sweep {
            0% { transform: translateX(-140px) rotate(35deg); opacity: 0; }
            25% { opacity: 0.65; }
            60% { transform: translateX(140px) rotate(35deg); opacity: 0; }
            100% { opacity: 0; }
          }
          @keyframes media-particle-twinkle {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.75; }
            50% { transform: scale(1.35) rotate(25deg); opacity: 1; filter: drop-shadow(0 0 6px #FFC928); }
          }
          @keyframes media-light-mote-rise {
            0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
            30% { opacity: 0.85; }
            70% { opacity: 0.7; }
            100% { transform: translate(12px, -32px) scale(1.2); opacity: 0; }
          }

          .anim-media-aperture { animation: media-aperture-breathe 4s ease-in-out infinite; transform-origin: 285px 242px; }
          .anim-media-shutter { animation: media-shutter-click 3.5s ease-in-out infinite; }
          .anim-media-ribbon { animation: media-filmstrip-sway 4.5s ease-in-out infinite; transform-origin: center center; }
          .anim-media-sheen { animation: media-sheen-sweep 5s ease-in-out infinite; }
          .anim-media-star-1 { animation: media-particle-twinkle 2.5s ease-in-out infinite; transform-origin: 85px 115px; }
          .anim-media-star-2 { animation: media-particle-twinkle 3s ease-in-out infinite 0.7s; transform-origin: 505px 102px; }
          .anim-media-star-3 { animation: media-particle-twinkle 2.7s ease-in-out infinite 1.4s; transform-origin: 68px 318px; }
          .anim-media-star-4 { animation: media-particle-twinkle 2.3s ease-in-out infinite 0.3s; transform-origin: 525px 302px; }
          .anim-media-star-5 { animation: media-particle-twinkle 2.8s ease-in-out infinite 1.8s; transform-origin: 285px 42px; }
          
          .anim-media-mote-1 { animation: media-light-mote-rise 3.2s ease-out infinite; }
          .anim-media-mote-2 { animation: media-light-mote-rise 4.1s ease-out infinite 1.1s; }
          .anim-media-mote-3 { animation: media-light-mote-rise 3.7s ease-out infinite 2.2s; }
          .anim-media-mote-4 { animation: media-light-mote-rise 4.4s ease-out infinite 0.6s; }

          @media (prefers-reduced-motion: reduce) {
            .anim-media-aperture, .anim-media-shutter, .anim-media-ribbon, 
            .anim-media-sheen, .anim-media-star-1, .anim-media-star-2, 
            .anim-media-star-3, .anim-media-star-4, .anim-media-star-5,
            .anim-media-mote-1, .anim-media-mote-2, .anim-media-mote-3, .anim-media-mote-4 {
              animation: none !important;
            }
          }
        `}</style>

        <linearGradient id="mediaLensGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2D3036" />
          <stop offset="50%" stopColor="#191919" />
          <stop offset="100%" stopColor="#101114" />
        </linearGradient>

        <linearGradient id="mediaBodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="25%" stopColor="#FFF8E8" />
          <stop offset="85%" stopColor="#F2E6CE" />
          <stop offset="100%" stopColor="#E2D2B0" />
        </linearGradient>

        <radialGradient id="mediaRimGlow" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFE07A" />
          <stop offset="70%" stopColor="#FFC928" />
          <stop offset="100%" stopColor="#D99C0B" />
        </radialGradient>

        <filter id="mediaSubtleDrop" x="-8%" y="-8%" width="116%" height="120%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#191919" floodOpacity="0.14" />
        </filter>
      </defs>

      {/* Ambient Light Particle Motes */}
      <g id="media-ambient-particles">
        <circle cx="210" cy="210" r="3" fill="#FFC928" className="anim-media-mote-1" />
        <circle cx="360" cy="270" r="2.5" fill="#36AD50" className="anim-media-mote-2" />
        <circle cx="230" cy="285" r="3.5" fill="#F15A24" className="anim-media-mote-3" />
        <circle cx="340" cy="180" r="2" fill="#FFFFFF" className="anim-media-mote-4" />
        <circle cx="160" cy="240" r="2.5" fill="#FFE07A" className="anim-media-mote-2" />
        <circle cx="410" cy="230" r="3" fill="#FFC928" className="anim-media-mote-1" />
      </g>

      {/* Floating Festival Sparkles */}
      <g id="media-ambient-sparkles">
        <g className="anim-media-star-1">
          <path d="M 85,90 Q 85,115 60,115 Q 85,115 85,140 Q 85,115 110,115 Q 85,115 85,90 Z" fill="#FFC928" />
          <circle cx="85" cy="115" r="3" fill="#FFFFFF" />
        </g>
        <g className="anim-media-star-2">
          <path d="M 505,80 Q 505,102 483,102 Q 505,102 505,124 Q 505,102 527,102 Q 505,102 505,80 Z" fill="#F15A24" />
          <circle cx="505" cy="102" r="2.5" fill="#FFFFFF" />
        </g>
        <g className="anim-media-star-3">
          <path d="M 68,300 Q 68,318 50,318 Q 68,318 68,336 Q 68,318 86,318 Q 68,318 68,300 Z" fill="#E52B2B" />
          <circle cx="68" cy="318" r="2" fill="#FFFFFF" />
        </g>
        <g className="anim-media-star-4">
          <path d="M 525,285 Q 525,302 508,302 Q 525,302 525,319 Q 525,302 542,302 Q 525,302 525,285 Z" fill="#36AD50" />
          <circle cx="525" cy="302" r="2.5" fill="#FFFFFF" />
        </g>
        <g className="anim-media-star-5">
          <path d="M 285,30 Q 285,42 273,42 Q 285,42 285,54 Q 285,42 297,42 Q 285,42 285,30 Z" fill="#FFC928" />
          <circle cx="285" cy="42" r="2" fill="#FFFFFF" />
        </g>
      </g>

      {/* Flowing Cultural Filmstrip Ribbon */}
      <g id="media-filmstrip-ribbon" className="anim-media-ribbon" filter="url(#mediaSubtleDrop)">
        <path d="M 32,235 C 75,170 145,215 210,285 C 245,322 285,340 330,340 C 275,345 220,325 185,285 C 130,225 70,205 32,235 Z" fill="#E52B2B" opacity="0.9" />
        <path d="M 36,232 C 80,165 150,210 215,280 L 210,320 C 145,250 78,205 34,272 Z" fill="#FFF8E8" stroke="#191919" strokeWidth="3" strokeLinejoin="round" />
        <path d="M 36,232 C 80,165 150,210 215,280" stroke="#F15A24" strokeWidth="6" strokeLinecap="round" />
        <path d="M 34,272 C 78,205 145,250 210,320" stroke="#FFC928" strokeWidth="6" strokeLinecap="round" />

        <g fill="#191919">
          <rect x="52" y="218" width="6" height="8" rx="1.5" transform="rotate(-32 52 218)" />
          <rect x="74" y="200" width="6" height="8" rx="1.5" transform="rotate(-20 74 200)" />
          <rect x="100" y="196" width="6" height="8" rx="1.5" transform="rotate(-5 100 196)" />
          <rect x="128" y="208" width="6" height="8" rx="1.5" transform="rotate(18 128 208)" />
          <rect x="156" y="228" width="6" height="8" rx="1.5" transform="rotate(32 156 228)" />
          <rect x="180" y="254" width="6" height="8" rx="1.5" transform="rotate(42 180 254)" />
          <rect x="50" y="252" width="6" height="8" rx="1.5" transform="rotate(-32 50 252)" />
          <rect x="72" y="234" width="6" height="8" rx="1.5" transform="rotate(-20 72 234)" />
          <rect x="98" y="230" width="6" height="8" rx="1.5" transform="rotate(-5 98 230)" />
          <rect x="126" y="242" width="6" height="8" rx="1.5" transform="rotate(18 126 242)" />
          <rect x="154" y="262" width="6" height="8" rx="1.5" transform="rotate(32 154 262)" />
          <rect x="178" y="288" width="6" height="8" rx="1.5" transform="rotate(42 178 288)" />
        </g>

        <path d="M 88,198 L 86,242" stroke="#191919" strokeWidth="2.5" strokeDasharray="2 1" />
        <path d="M 142,216 L 140,260" stroke="#191919" strokeWidth="2.5" strokeDasharray="2 1" />

        <path d="M 370,305 C 430,270 480,220 545,190 L 565,225 C 500,255 450,305 385,345 Z" fill="#FFF8E8" stroke="#191919" strokeWidth="3" strokeLinejoin="round" />
        <path d="M 370,305 C 430,270 480,220 545,190" stroke="#36AD50" strokeWidth="6" strokeLinecap="round" />
        <path d="M 385,345 C 450,305 500,255 565,225" stroke="#FFC928" strokeWidth="6" strokeLinecap="round" />

        <g fill="#191919">
          <rect x="400" y="295" width="6" height="8" rx="1.5" transform="rotate(-28 400 295)" />
          <rect x="430" y="275" width="6" height="8" rx="1.5" transform="rotate(-28 430 275)" />
          <rect x="462" y="255" width="6" height="8" rx="1.5" transform="rotate(-26 462 255)" />
          <rect x="495" y="235" width="6" height="8" rx="1.5" transform="rotate(-24 495 235)" />
          <rect x="528" y="215" width="6" height="8" rx="1.5" transform="rotate(-22 528 215)" />
          <rect x="415" y="325" width="6" height="8" rx="1.5" transform="rotate(-28 415 325)" />
          <rect x="445" y="305" width="6" height="8" rx="1.5" transform="rotate(-28 445 305)" />
          <rect x="477" y="285" width="6" height="8" rx="1.5" transform="rotate(-26 477 285)" />
          <rect x="510" y="265" width="6" height="8" rx="1.5" transform="rotate(-24 510 265)" />
          <rect x="543" y="245" width="6" height="8" rx="1.5" transform="rotate(-22 543 245)" />
        </g>
      </g>

      {/* Festival Camera Main Chassis */}
      <g id="media-camera-chassis" filter="url(#mediaSubtleDrop)">
        <rect x="135" y="338" width="310" height="12" rx="6" fill="#191919" opacity="0.25" />
        <rect x="130" y="140" width="320" height="205" rx="32" fill="#191919" stroke="#101114" strokeWidth="4" />
        <rect x="130" y="180" width="320" height="135" fill="#24262C" />

        <line x1="140" y1="195" x2="200" y2="195" stroke="#333740" strokeWidth="2" strokeLinecap="round" />
        <line x1="140" y1="205" x2="200" y2="205" stroke="#333740" strokeWidth="2" strokeLinecap="round" />
        <line x1="140" y1="215" x2="195" y2="215" stroke="#333740" strokeWidth="2" strokeLinecap="round" />
        <line x1="380" y1="195" x2="440" y2="195" stroke="#333740" strokeWidth="2" strokeLinecap="round" />
        <line x1="380" y1="205" x2="440" y2="205" stroke="#333740" strokeWidth="2" strokeLinecap="round" />
        <line x1="385" y1="215" x2="440" y2="215" stroke="#333740" strokeWidth="2" strokeLinecap="round" />

        <path d="M 130,172 C 130,150 146,134 168,134 L 412,134 C 434,134 450,150 450,172 L 450,182 L 130,182 Z" fill="url(#mediaBodyGrad)" stroke="#191919" strokeWidth="3.5" />
        <path d="M 130,174 L 450,174 L 450,186 L 130,186 Z" fill="#F15A24" />
        <path d="M 130,184 L 450,184 L 450,187 L 130,187 Z" fill="#FFC928" />

        {/* Animated Shutter Button */}
        <g className="anim-media-shutter">
          <rect x="160" y="116" width="34" height="20" rx="4" fill="#191919" />
          <rect x="164" y="106" width="26" height="12" rx="3" fill="#E52B2B" stroke="#191919" strokeWidth="2" />
        </g>

        <rect x="208" y="122" width="24" height="14" rx="3" fill="#D99C0B" stroke="#191919" strokeWidth="2" />
        <rect x="360" y="120" width="38" height="15" rx="3" fill="#191919" />
        <rect x="366" y="112" width="26" height="10" rx="2" fill="#E2D2B0" stroke="#191919" strokeWidth="2" />

        <rect x="375" y="146" width="48" height="24" rx="7" fill="#191919" stroke="#E2D2B0" strokeWidth="2.5" />
        <rect x="381" y="151" width="36" height="14" rx="4" fill="#2E4A7D" />
        <path d="M 383,153 L 398,153 L 388,163 L 383,163 Z" fill="#75A2EE" opacity="0.6" />

        <circle cx="166" cy="158" r="8" fill="#191919" stroke="#E2D2B0" strokeWidth="2" />
        <circle cx="166" cy="158" r="4.5" fill="#E52B2B" />
      </g>

      {/* Camera Lens Assembly with Breathing Aperture Blades */}
      <g id="media-lens-assembly" filter="url(#mediaSubtleDrop)">
        <circle cx="285" cy="242" r="108" fill="#191919" stroke="#FFC928" strokeWidth="5" />
        <circle cx="285" cy="242" r="99" fill="#FFF8E8" stroke="#191919" strokeWidth="3" />
        <circle cx="285" cy="242" r="93" fill="#F15A24" />
        <circle cx="285" cy="242" r="88" fill="url(#mediaRimGlow)" stroke="#191919" strokeWidth="3" />
        <circle cx="285" cy="242" r="80" fill="url(#mediaLensGrad)" stroke="#101114" strokeWidth="4" />

        {/* Breathing Aperture Blades */}
        <g className="anim-media-aperture">
          <path d="M 285,166 C 315,166 338,182 348,206 L 285,242 Z" fill="#E52B2B" stroke="#191919" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M 348,206 C 362,232 358,262 342,284 L 285,242 Z" fill="#F15A24" stroke="#191919" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M 342,284 C 322,308 292,318 264,312 L 285,242 Z" fill="#FFC928" stroke="#191919" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M 264,312 C 235,306 215,285 212,256 L 285,242 Z" fill="#36AD50" stroke="#191919" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M 212,256 C 210,225 226,196 250,180 L 285,242 Z" fill="#E52B2B" stroke="#191919" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M 250,180 C 260,172 272,167 285,166 L 285,242 Z" fill="#36AD50" stroke="#191919" strokeWidth="2.5" strokeLinejoin="round" />

          <polygon points="285,228 298,236 298,252 285,260 272,252 272,236" fill="#141518" stroke="#FFC928" strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx="285" cy="244" r="5" fill="#191919" />
        </g>

        {/* Specular Lens Glare Sheen */}
        <g className="anim-media-sheen">
          <path d="M 226,204 C 242,185 264,174 290,174 C 302,174 314,177 325,183" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
        </g>
        <path d="M 244,300 C 260,308 276,311 294,310" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
        <circle cx="330" cy="192" r="3.5" fill="#FFFFFF" opacity="0.8" />
      </g>
    </svg>
  );
}
