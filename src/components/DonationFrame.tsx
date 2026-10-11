export default function DonationFrame({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-full h-full object-contain ${className}`} viewBox="0 0 640 480" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>{`
      /* Embedded Autonomous CSS Keyframes */
      @keyframes don-lantern-swing-l {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(2.8deg); }
        75% { transform: rotate(-2.8deg); }
      }
      @keyframes don-lantern-swing-r {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-2.8deg); }
        75% { transform: rotate(2.8deg); }
      }
      @keyframes don-tassel-flutter {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(4.2deg); }
      }
      @keyframes don-glow-pulse {
        0%, 100% { opacity: 0.85; filter: drop-shadow(0 0 3px #FFC928); }
        50% { opacity: 1; filter: drop-shadow(0 0 10px #FFC928) drop-shadow(0 0 14px #F15A24); }
      }
      @keyframes don-ember-float {
        0% { transform: translateY(0px) scale(0.6); opacity: 0; }
        25% { opacity: 0.9; }
        75% { opacity: 0.75; }
        100% { transform: translateY(-46px) translateX(6px) scale(1.15); opacity: 0; }
      }
      @keyframes don-star-twinkle {
        0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.75; }
        50% { transform: scale(1.35) rotate(30deg); opacity: 1; filter: drop-shadow(0 0 6px #FFC928); }
      }
      @keyframes don-bracket-breathe {
        0%, 100% { transform: scale(1); opacity: 0.9; }
        50% { transform: scale(1.03); opacity: 1; }
      }

      .anim-don-lantern-l { animation: don-lantern-swing-l 4.6s ease-in-out infinite; transformOrigin: 72px 40px; }
      .anim-don-lantern-r { animation: don-lantern-swing-r 4.6s ease-in-out infinite; transformOrigin: 568px 40px; }
      .anim-don-tassel-l { animation: don-tassel-flutter 3.2s ease-in-out infinite; transformOrigin: 72px 216px; }
      .anim-don-tassel-r { animation: don-tassel-flutter 3.2s ease-in-out infinite 0.5s; transformOrigin: 568px 216px; }
      .anim-don-glow { animation: don-glow-pulse 2.2s ease-in-out infinite; }
      
      .anim-don-ember-1 { animation: don-ember-float 3.5s ease-out infinite; }
      .anim-don-ember-2 { animation: don-ember-float 4.2s ease-out infinite 1.2s; }
      .anim-don-ember-3 { animation: don-ember-float 3.8s ease-out infinite 2s; }
      .anim-don-ember-4 { animation: don-ember-float 4.6s ease-out infinite 0.6s; }

      .anim-don-star-1 { animation: don-star-twinkle 2.5s ease-in-out infinite; transformOrigin: 58px 122px; }
      .anim-don-star-2 { animation: don-star-twinkle 3.1s ease-in-out infinite 0.8s; transformOrigin: 582px 122px; }
      .anim-don-star-3 { animation: don-star-twinkle 2.8s ease-in-out infinite 1.5s; transformOrigin: 76px 290px; }
      .anim-don-star-4 { animation: don-star-twinkle 3.2s ease-in-out infinite 0.4s; transformOrigin: 564px 290px; }
      .anim-don-bracket { animation: don-bracket-breathe 3.2s ease-in-out infinite; transformOrigin: 320px 240px; }

      @media (prefers-reduced-motion: reduce) {
        .anim-don-lantern-l, .anim-don-lantern-r, .anim-don-tassel-l, .anim-don-tassel-r,
        .anim-don-glow, .anim-don-ember-1, .anim-don-ember-2, .anim-don-ember-3, .anim-don-ember-4,
        .anim-don-star-1, .anim-don-star-2, .anim-don-star-3, .anim-don-star-4, .anim-don-bracket {
          animation: none !important;
        }
      }
    `}</style>

    <linearGradient id="donFrameGoldGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#FFE899" />
      <stop offset="45%" stopColor="#FFC928" />
      <stop offset="100%" stopColor="#D98A00" />
    </linearGradient>

    <linearGradient id="donFrameRedGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#E52B2B" />
      <stop offset="50%" stopColor="#F15A24" />
      <stop offset="100%" stopColor="#B81414" />
    </linearGradient>

    <linearGradient id="donFrameGreenGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#4CD06B" />
      <stop offset="50%" stopColor="#36AD50" />
      <stop offset="100%" stopColor="#1B6C30" />
    </linearGradient>

    <linearGradient id="donLanternGlow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#FFF8E8" />
      <stop offset="40%" stopColor="#FFC928" />
      <stop offset="100%" stopColor="#E52B2B" />
    </linearGradient>

    <filter id="donElevationShadow" x="-10%" y="-10%" width="120%" height="125%">
      <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#191919" floodOpacity="0.12" />
    </filter>
  </defs>

  <g id="donation-lantern-embers">
    <circle cx="72" cy="180" r="2.5" fill="#FFC928" className="anim-don-ember-1" />
    <circle cx="68" cy="195" r="3" fill="#F15A24" className="anim-don-ember-2" />
    <circle cx="76" cy="170" r="2" fill="#FFFFFF" className="anim-don-ember-3" />
    <circle cx="568" cy="180" r="2.5" fill="#FFC928" className="anim-don-ember-4" />
    <circle cx="572" cy="195" r="3" fill="#F15A24" className="anim-don-ember-1" />
    <circle cx="564" cy="170" r="2" fill="#FFFFFF" className="anim-don-ember-2" />
  </g>

  <g id="donation-lanterns" filter="url(#donElevationShadow)">
    <g id="lantern-left" className="anim-don-lantern-l">
      <line x1="72" y1="40" x2="72" y2="148" stroke="#FFC928" strokeWidth="2.5" strokeDasharray="6 4" strokeLinecap="round" />
      <circle cx="72" cy="150" r="5" fill="#D98A00" />
      <path d="M 58,168 C 58,154 86,154 86,168 Z" fill="url(#donFrameGoldGrad)" stroke="#191919" strokeWidth="2" />
      <rect x="62" y="168" width="20" height="4" fill="#E52B2B" />

      <path className="anim-don-glow" d="M 60,172 L 56,204 L 88,204 L 84,172 Z" fill="url(#donLanternGlow)" stroke="#191919" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="72" y1="172" x2="72" y2="204" stroke="#191919" strokeWidth="2" />
      <line x1="58" y1="188" x2="86" y2="188" stroke="#191919" strokeWidth="1.8" />

      <path d="M 58,204 L 72,216 L 86,204 Z" fill="url(#donFrameGoldGrad)" stroke="#191919" strokeWidth="2" />
      <circle cx="72" cy="220" r="3.5" fill="#E52B2B" />
      <path className="anim-don-tassel-l" d="M 72,224 L 66,248 C 66,252 78,252 78,248 Z" fill="url(#donFrameGreenGrad)" stroke="#191919" strokeWidth="1.8" />
    </g>

    <g id="lantern-right" className="anim-don-lantern-r">
      <line x1="568" y1="40" x2="568" y2="148" stroke="#FFC928" strokeWidth="2.5" strokeDasharray="6 4" strokeLinecap="round" />
      <circle cx="568" cy="150" r="5" fill="#D98A00" />
      <path d="M 554,168 C 554,154 582,154 582,168 Z" fill="url(#donFrameGoldGrad)" stroke="#191919" strokeWidth="2" />
      <rect x="558" y="168" width="20" height="4" fill="#E52B2B" />

      <path className="anim-don-glow" d="M 556,172 L 552,204 L 584,204 L 580,172 Z" fill="url(#donLanternGlow)" stroke="#191919" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="568" y1="172" x2="568" y2="204" stroke="#191919" strokeWidth="2" />
      <line x1="554" y1="188" x2="582" y2="188" stroke="#191919" strokeWidth="1.8" />

      <path d="M 554,204 L 568,216 L 582,204 Z" fill="url(#donFrameGoldGrad)" stroke="#191919" strokeWidth="2" />
      <circle cx="568" cy="220" r="3.5" fill="#E52B2B" />
      <path className="anim-don-tassel-r" d="M 568,224 L 562,248 C 562,252 574,252 574,248 Z" fill="url(#donFrameGreenGrad)" stroke="#191919" strokeWidth="1.8" />
    </g>
  </g>

  <g id="donation-heritage-cartouche" filter="url(#donElevationShadow)">
    <path d="M 120,240 C 95,200 95,160 120,120 C 145,150 145,210 120,240 Z" fill="url(#donFrameGreenGrad)" stroke="#191919" strokeWidth="2.5" />
    <path d="M 520,240 C 545,200 545,160 520,120 C 495,150 495,210 520,240 Z" fill="url(#donFrameGreenGrad)" stroke="#191919" strokeWidth="2.5" />

    <g stroke="#191919" strokeWidth="2.5" strokeLinejoin="round">
      <path d="M 125,170 C 105,185 105,215 125,230 L 155,200 Z" fill="#E52B2B" />
      <path d="M 120,225 C 102,242 104,272 126,286 L 158,255 Z" fill="#F15A24" />
      <path d="M 126,280 C 112,300 120,328 144,338 L 168,300 Z" fill="#FFC928" />

      <path d="M 515,170 C 535,185 535,215 515,230 L 485,200 Z" fill="#E52B2B" />
      <path d="M 520,225 C 538,242 536,272 514,286 L 482,255 Z" fill="#F15A24" />
      <path d="M 514,280 C 528,300 520,328 496,338 L 472,300 Z" fill="#FFC928" />
    </g>

    <g id="top-arch-crest">
      <path d="M 230,86 C 280,56 300,32 320,18 C 340,32 360,56 410,86 C 375,98 265,98 230,86 Z" fill="url(#donFrameRedGrad)" stroke="#191919" strokeWidth="3" strokeLinejoin="round" />
      <path d="M 260,82 C 290,62 308,44 320,32 C 332,44 350,62 380,82 Z" fill="url(#donFrameGoldGrad)" stroke="#191919" strokeWidth="2" />
      <path d="M 320,12 L 328,24 L 320,36 L 312,24 Z" fill="#FFC928" stroke="#191919" strokeWidth="2" />
      <circle cx="320" cy="24" r="3" fill="#FFFFFF" />
    </g>

    <g id="bottom-arch-crest">
      <path d="M 230,394 C 280,424 300,448 320,462 C 340,448 360,424 410,394 C 375,382 265,382 230,394 Z" fill="url(#donFrameRedGrad)" stroke="#191919" strokeWidth="3" strokeLinejoin="round" />
      <path d="M 260,398 C 290,418 308,436 320,448 C 332,436 350,418 380,398 Z" fill="url(#donFrameGoldGrad)" stroke="#191919" strokeWidth="2" />
      <path d="M 320,468 L 328,456 L 320,444 L 312,456 Z" fill="#FFC928" stroke="#191919" strokeWidth="2" />
      <circle cx="320" cy="456" r="3" fill="#FFFFFF" />
    </g>

    <rect x="142" y="80" width="356" height="320" rx="36" fill="url(#donFrameGoldGrad)" stroke="#191919" strokeWidth="4.5" />
    <rect x="154" y="92" width="332" height="296" rx="28" fill="#E52B2B" stroke="#191919" strokeWidth="2.5" />
    <rect x="162" y="100" width="316" height="280" rx="22" fill="#FFC928" />
  </g>

  <g id="donation-qr-stage" filter="url(#donElevationShadow)">
    <rect id="qr-target-viewport" x="170" y="108" width="300" height="264" rx="18" fill="#FFF8E8" stroke="#191919" strokeWidth="3" />

    <g className="anim-don-bracket">
      <path d="M 188,138 L 188,124 L 202,124" stroke="#F15A24" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="188" cy="124" r="2.5" fill="#36AD50" />

      <path d="M 452,138 L 452,124 L 438,124" stroke="#F15A24" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="452" cy="124" r="2.5" fill="#36AD50" />

      <path d="M 188,342 L 188,356 L 202,356" stroke="#F15A24" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="188" cy="356" r="2.5" fill="#36AD50" />

      <path d="M 452,342 L 452,356 L 438,356" stroke="#F15A24" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="452" cy="356" r="2.5" fill="#36AD50" />
    </g>

    <line x1="320" y1="120" x2="320" y2="128" stroke="#D9C7A7" strokeWidth="2" strokeLinecap="round" />
    <line x1="320" y1="352" x2="320" y2="360" stroke="#D9C7A7" strokeWidth="2" strokeLinecap="round" />
    <line x1="182" y1="240" x2="190" y2="240" stroke="#D9C7A7" strokeWidth="2" strokeLinecap="round" />
    <line x1="450" y1="240" x2="458" y2="240" stroke="#D9C7A7" strokeWidth="2" strokeLinecap="round" />
  </g>

  <g id="donation-ambient-accents">
    <g className="anim-don-star-1">
      <path d="M 58,110 Q 58,122 46,122 Q 58,122 58,134 Q 58,122 70,122 Q 58,122 58,110 Z" fill="#FFC928" />
    </g>
    <g className="anim-don-star-2">
      <path d="M 582,110 Q 582,122 570,122 Q 582,122 582,134 Q 582,122 594,122 Q 582,122 582,110 Z" fill="#36AD50" />
    </g>
    <g className="anim-don-star-3">
      <path d="M 76,280 Q 76,290 66,290 Q 76,290 76,300 Q 76,290 86,290 Q 76,290 76,280 Z" fill="#E52B2B" />
    </g>
    <g className="anim-don-star-4">
      <path d="M 564,280 Q 564,290 554,290 Q 564,290 564,300 Q 564,290 574,290 Q 564,290 564,280 Z" fill="#FFC928" />
    </g>
  </g>
</svg>
  );
}
