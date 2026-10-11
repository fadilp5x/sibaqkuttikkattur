export default function SponsorStageEmblem({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-full h-full object-contain ${className}`} viewBox="0 0 680 480" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>{`
      /* Embedded Autonomous CSS Keyframes */
      @keyframes sponsor-spotlight-sweep-l {
        0%, 100% { opacity: 0.28; transform: rotate(0deg); }
        50% { opacity: 0.65; transform: rotate(5deg); }
      }
      @keyframes sponsor-spotlight-sweep-r {
        0%, 100% { opacity: 0.28; transform: rotate(0deg); }
        50% { opacity: 0.65; transform: rotate(-5deg); }
      }
      @keyframes sponsor-flag-flutter {
        0%, 100% { transform: skewY(0deg) scaleX(1); }
        50% { transform: skewY(4.5deg) scaleX(0.92); }
      }
      @keyframes sponsor-bulb-chase-a {
        0%, 100% { opacity: 0.35; filter: drop-shadow(0 0 1px #FFC928); }
        50% { opacity: 1; filter: drop-shadow(0 0 7px #FFC928) drop-shadow(0 0 11px #F15A24); }
      }
      @keyframes sponsor-bulb-chase-b {
        0%, 100% { opacity: 1; filter: drop-shadow(0 0 7px #FFC928) drop-shadow(0 0 11px #F15A24); }
        50% { opacity: 0.35; filter: drop-shadow(0 0 1px #FFC928); }
      }
      @keyframes sponsor-urn-glint {
        0%, 100% { filter: drop-shadow(0 0 6px rgba(255, 201, 40, 0.25)); }
        50% { filter: drop-shadow(0 0 16px rgba(255, 201, 40, 0.65)); }
      }
      @keyframes sponsor-gold-mote-rise {
        0% { transform: translateY(0px) scale(0.5) rotate(0deg); opacity: 0; }
        25% { opacity: 0.95; }
        75% { opacity: 0.8; }
        100% { transform: translateY(-48px) translateX(10px) scale(1.2) rotate(60deg); opacity: 0; }
      }
      @keyframes sponsor-star-twinkle {
        0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.75; }
        50% { transform: scale(1.35) rotate(35deg); opacity: 1; filter: drop-shadow(0 0 6px #FFC928); }
      }

      .anim-spot-l { animation: sponsor-spotlight-sweep-l 3.8s ease-in-out infinite; transformOrigin: 200px 195px; }
      .anim-spot-r { animation: sponsor-spotlight-sweep-r 3.8s ease-in-out infinite; transformOrigin: 470px 195px; }
      .anim-flag { animation: sponsor-flag-flutter 2s ease-in-out infinite; transformOrigin: 340px 24px; }
      .anim-bulb-a { animation: sponsor-bulb-chase-a 1.4s ease-in-out infinite; }
      .anim-bulb-b { animation: sponsor-bulb-chase-b 1.4s ease-in-out infinite; }
      .anim-trophy { animation: sponsor-urn-glint 3.8s ease-in-out infinite; transformOrigin: 340px 250px; }

      .anim-gold-spark-1 { animation: sponsor-gold-mote-rise 3.4s ease-out infinite; }
      .anim-gold-spark-2 { animation: sponsor-gold-mote-rise 4.1s ease-out infinite 1s; }
      .anim-gold-spark-3 { animation: sponsor-gold-mote-rise 3.7s ease-out infinite 2.1s; }
      .anim-gold-spark-4 { animation: sponsor-gold-mote-rise 4.5s ease-out infinite 0.5s; }

      .anim-sponsor-star-1 { animation: sponsor-star-twinkle 2.8s ease-in-out infinite; transformOrigin: 120px 145px; }
      .anim-sponsor-star-2 { animation: sponsor-star-twinkle 3.2s ease-in-out infinite 0.9s; transformOrigin: 560px 145px; }
      .anim-sponsor-star-3 { animation: sponsor-star-twinkle 2.5s ease-in-out infinite 1.6s; transformOrigin: 68px 272px; }
      .anim-sponsor-star-4 { animation: sponsor-star-twinkle 3s ease-in-out infinite 0.4s; transformOrigin: 612px 272px; }

      @media (prefers-reduced-motion: reduce) {
        .anim-spot-l, .anim-spot-r, .anim-flag, .anim-bulb-a, .anim-bulb-b, .anim-trophy,
        .anim-gold-spark-1, .anim-gold-spark-2, .anim-gold-spark-3, .anim-gold-spark-4,
        .anim-sponsor-star-1, .anim-sponsor-star-2, .anim-sponsor-star-3, .anim-sponsor-star-4 {
          animation: none !important;
        }
      }
    `}</style>

    <linearGradient id="stageGoldGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#FFE07A" />
      <stop offset="50%" stopColor="#FFC928" />
      <stop offset="100%" stopColor="#D99700" />
    </linearGradient>

    <linearGradient id="stageCanopyRed" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#E52B2B" />
      <stop offset="100%" stopColor="#8C1313" />
    </linearGradient>

    <linearGradient id="stageCanopyGold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#FFE07A" />
      <stop offset="100%" stopColor="#D99700" />
    </linearGradient>

    <linearGradient id="stageRibbonDrape" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#E52B2B" />
      <stop offset="35%" stopColor="#F15A24" />
      <stop offset="70%" stopColor="#FFC928" />
      <stop offset="100%" stopColor="#36AD50" />
    </linearGradient>

    <radialGradient id="stageAuraGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#FFC928" stopOpacity="0.25" />
      <stop offset="100%" stopColor="#FFC928" stopOpacity="0" />
    </radialGradient>

    <filter id="stageElevationShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="15" floodColor="#191919" floodOpacity="0.14" />
    </filter>
  </defs>

  <circle cx="340" cy="270" r="180" fill="url(#stageAuraGlow)" />

  <g id="stage-victory-sparks">
    <polygon points="310,320 314,324 310,328 306,324" fill="#FFC928" className="anim-gold-spark-1" />
    <circle cx="370" cy="315" r="2.5" fill="#FFE07A" className="anim-gold-spark-2" />
    <polygon points="295,280 299,284 295,288 291,284" fill="#FFFFFF" className="anim-gold-spark-3" />
    <circle cx="385" cy="270" r="3" fill="#FFC928" className="anim-gold-spark-4" />
    <circle cx="330" cy="335" r="2.5" fill="#F15A24" className="anim-gold-spark-2" />
    <polygon points="355,290 359,294 355,298 351,294" fill="#FFE07A" className="anim-gold-spark-1" />
  </g>

  <g id="stage-sparkles">
    <g className="anim-sponsor-star-1">
      <path d="M 120,130 Q 120,145 105,145 Q 120,145 120,160 Q 120,145 135,145 Q 120,145 120,130 Z" fill="#FFC928" />
    </g>
    <g className="anim-sponsor-star-2">
      <path d="M 560,130 Q 560,145 545,145 Q 560,145 560,160 Q 560,145 575,145 Q 560,145 560,130 Z" fill="#FFC928" />
    </g>
    <g className="anim-sponsor-star-3">
      <path d="M 68,260 Q 68,272 56,272 Q 68,272 68,284 Q 68,272 80,272 Q 68,272 68,260 Z" fill="#36AD50" />
    </g>
    <g className="anim-sponsor-star-4">
      <path d="M 612,260 Q 612,272 600,272 Q 612,272 612,284 Q 612,272 624,272 Q 612,272 612,260 Z" fill="#E52B2B" />
    </g>
  </g>

  <g id="stage-gateways" filter="url(#stageElevationShadow)">
    <g transform="translate(60, 180)">
      <path d="M 20,180 L 20,80 C 20,40 50,10 80,10 C 110,10 140,40 140,80 L 140,180 Z" fill="#FFF8E8" stroke="#191919" strokeWidth="3" />
      <path d="M 35,180 L 35,85 C 35,55 55,30 80,30 C 105,30 125,55 125,85 L 125,180 Z" fill="#F15A24" opacity="0.9" />
      <path d="M 50,180 L 50,90 C 50,70 65,50 80,50 C 95,50 110,70 110,90 L 110,180 Z" fill="#FFC928" />
    </g>

    <g transform="translate(460, 180)">
      <path d="M 20,180 L 20,80 C 20,40 50,10 80,10 C 110,10 140,40 140,80 L 140,180 Z" fill="#FFF8E8" stroke="#191919" strokeWidth="3" />
      <path d="M 35,180 L 35,85 C 35,55 55,30 80,30 C 105,30 125,55 125,85 L 125,180 Z" fill="#F15A24" opacity="0.9" />
      <path d="M 50,180 L 50,90 C 50,70 65,50 80,50 C 95,50 110,70 110,90 L 110,180 Z" fill="#FFC928" />
    </g>
  </g>

  <g id="stage-dais-platform" filter="url(#stageElevationShadow)">
    <ellipse cx="340" cy="405" rx="300" ry="45" fill="#191919" opacity="0.25" />
    <ellipse cx="340" cy="385" rx="285" ry="40" fill="#E2D2B0" stroke="#191919" strokeWidth="3.5" />
    <path d="M 55,385 C 55,410 180,425 340,425 C 500,425 625,410 625,385 L 625,395 C 625,420 500,435 340,435 C 180,435 55,420 55,395 Z" fill="#D98A00" stroke="#191919" strokeWidth="3" />

    <ellipse cx="340" cy="370" rx="240" ry="32" fill="#FFF8E8" stroke="#191919" strokeWidth="3" />
    <ellipse cx="340" cy="365" rx="225" ry="28" fill="url(#stageGoldGrad)" stroke="#191919" strokeWidth="2.5" />

    <ellipse cx="340" cy="355" rx="105" ry="18" fill="#191919" />
    <ellipse cx="340" cy="350" rx="95" ry="15" fill="#E52B2B" stroke="#FFC928" strokeWidth="2" />
  </g>

  <g id="stage-canopy" filter="url(#stageElevationShadow)">
    <path d="M 125,185 L 340,35 L 555,185 Z" fill="#191919" />
    <path d="M 340,35 L 295,185 L 340,185 Z" fill="url(#stageCanopyRed)" />
    <path d="M 340,35 L 340,185 L 385,185 Z" fill="url(#stageCanopyGold)" />
    <path d="M 340,35 L 250,185 L 295,185 Z" fill="url(#stageCanopyGold)" />
    <path d="M 340,35 L 385,185 L 430,185 Z" fill="url(#stageCanopyRed)" />
    <path d="M 340,35 L 200,185 L 250,185 Z" fill="url(#stageCanopyRed)" />
    <path d="M 340,35 L 430,185 L 480,185 Z" fill="url(#stageCanopyGold)" />
    <path d="M 340,35 L 140,185 L 200,185 Z" fill="url(#stageCanopyGold)" />
    <path d="M 340,35 L 480,185 L 540,185 Z" fill="url(#stageCanopyRed)" />

    <path d="M 130,185 Q 155,200 180,185 Q 205,200 230,185 Q 255,200 280,185 Q 305,200 330,185 Q 355,200 380,185 Q 405,200 430,185 Q 455,200 480,185 Q 505,200 530,185 Q 545,195 550,185" fill="none" stroke="#FFC928" strokeWidth="7" strokeLinecap="round" />

    <g className="anim-flag">
      <line x1="340" y1="12" x2="340" y2="40" stroke="#FFC928" strokeWidth="3" strokeLinecap="round" />
      <path d="M 340,14 L 380,24 L 340,34 Z" fill="#E52B2B" stroke="#191919" strokeWidth="1.8" />
    </g>
  </g>

  <g id="stage-curtains">
    <path d="M 140,185 C 160,260 210,330 250,350 L 230,355 C 190,330 145,260 125,185 Z" fill="#36AD50" stroke="#191919" strokeWidth="2.5" />
    <path d="M 540,185 C 520,260 470,330 430,350 L 450,355 C 490,330 535,260 555,185 Z" fill="#36AD50" stroke="#191919" strokeWidth="2.5" />

    <path d="M 50,380 C 140,310 220,385 340,370 C 460,385 540,310 630,380 L 625,395 C 535,325 455,398 340,385 C 225,398 145,325 55,395 Z" fill="url(#stageRibbonDrape)" stroke="#191919" strokeWidth="2.5" />

    <g stroke="#191919" strokeWidth="1.5">
      <circle cx="210" cy="195" r="5" fill="#FFC928" className="anim-bulb-a" />
      <circle cx="260" cy="198" r="5" fill="#FFFFFF" className="anim-bulb-b" />
      <circle cx="310" cy="199" r="5" fill="#FFC928" className="anim-bulb-a" />
      <circle cx="340" cy="199" r="6" fill="#F15A24" className="anim-bulb-b" />
      <circle cx="370" cy="199" r="5" fill="#FFC928" className="anim-bulb-a" />
      <circle cx="420" cy="198" r="5" fill="#FFFFFF" className="anim-bulb-b" />
      <circle cx="470" cy="195" r="5" fill="#FFC928" className="anim-bulb-a" />
    </g>
  </g>

  <g id="stage-spotlights">
    <polygon className="anim-spot-l" points="200,195 280,360 310,360 210,195" fill="#FFC928" opacity="0.35" />
    <polygon className="anim-spot-r" points="480,195 400,360 370,360 470,195" fill="#FFC928" opacity="0.35" />
  </g>

  <g id="stage-trophy-urn" className="anim-trophy" filter="url(#stageElevationShadow)">
    <rect x="315" y="325" width="50" height="15" rx="3" fill="#9C1717" stroke="#191919" strokeWidth="2" />
    <rect x="325" y="305" width="30" height="20" rx="3" fill="url(#stageGoldGrad)" stroke="#191919" strokeWidth="2" />

    <path d="M 285,190 C 285,250 315,295 340,305 C 365,295 395,250 395,190 Z" fill="url(#stageGoldGrad)" stroke="#191919" strokeWidth="3.5" />
    <ellipse cx="340" cy="190" rx="55" ry="12" fill="#FFE899" stroke="#191919" strokeWidth="3" />
    <ellipse cx="340" cy="190" rx="46" ry="8" fill="#D98A00" />

    <path d="M 288,205 C 255,205 250,250 295,268 C 285,260 270,240 286,218 Z" fill="url(#stageGoldGrad)" stroke="#191919" strokeWidth="2.5" />
    <path d="M 392,205 C 425,205 430,250 385,268 C 395,260 410,240 394,218 Z" fill="url(#stageGoldGrad)" stroke="#191919" strokeWidth="2.5" />

    <path d="M 340,218 L 356,242 L 340,266 L 324,242 Z" fill="#E52B2B" stroke="#191919" strokeWidth="2" />
    <circle cx="340" cy="242" r="5" fill="#FFC928" />

    <path d="M 305,215 C 308,245 320,275 332,285" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" opacity="0.8" />
  </g>
</svg>
  );
}
