export default function PoetryScroll({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-full h-full object-contain ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 380" width="100%" height="100%" fill="none" aria-hidden="true">
  <defs>
    <style>{`

      /* Embedded Autonomous CSS Keyframes for Poetry Scroll */
      @keyframes poe-scroll-unroll {
        0% { transform: scaleX(0.75); opacity: 0.6; }
        50%, 100% { transform: scaleX(1.0); opacity: 1; }
      }
      @keyframes poe-line-draw {
        0%, 25% { stroke-dashoffset: 450; opacity: 0; }
        70%, 100% { stroke-dashoffset: 0; opacity: 1; }
      }
      @keyframes poe-quote-settle {
        0%, 30% { transform: translateY(-15px) scale(0.6); opacity: 0; }
        60% { transform: translateY(2px) scale(1.15); opacity: 1; }
        75%, 100% { transform: translateY(0) scale(1); opacity: 1; }
      }
      @keyframes poe-glint-sweep {
        0%, 100% { transform: translateX(-120px) rotate(25deg); opacity: 0; }
        35% { opacity: 0.55; }
        60% { transform: translateX(240px) rotate(25deg); opacity: 0; }
      }

      .anim-poe-scroll { animation: poe-scroll-unroll 4.2s ease-out infinite; transform-origin: center center; }
      .anim-poe-line {
        stroke-dasharray: 450;
        stroke-dashoffset: 450;
        animation: poe-line-draw 4.2s ease-in-out infinite;
      }
      .anim-poe-quote-l { animation: poe-quote-settle 4.2s cubic-bezier(0.34, 1.56, 0.64, 1) infinite; transform-origin: 150px 115px; }
      .anim-poe-quote-r { animation: poe-quote-settle 4.2s cubic-bezier(0.34, 1.56, 0.64, 1) infinite 0.2s; transform-origin: 410px 225px; }
      .anim-poe-glint { animation: poe-glint-sweep 4.8s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .anim-poe-scroll, .anim-poe-line, .anim-poe-quote-l, .anim-poe-quote-r, .anim-poe-glint {
          animation: none !important;
          stroke-dashoffset: 0 !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    
      [data-festival-theme="calm"] {

        .anim-poe-scroll, .anim-poe-line, .anim-poe-quote-l, .anim-poe-quote-r, .anim-poe-glint {
          animation: none !important;
          stroke-dashoffset: 0 !important;
          opacity: 1 !important;
          transform: none !important;
        
      }
      `}</style>

    <linearGradient id="poeParchmentGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#FFFDF8" />
      <stop offset="30%" stopColor="#FFF8E8" />
      <stop offset="80%" stopColor="#F5E8CB" />
      <stop offset="100%" stopColor="#EAD6B0" />
    </linearGradient>

    <linearGradient id="poeWoodGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#A7612E" />
      <stop offset="50%" stopColor="#783D16" />
      <stop offset="100%" stopColor="#4E230B" />
    </linearGradient>

    <filter id="poeShadow" x="-10%" y="-10%" width="120%" height="125%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#191919" floodOpacity="0.16" />
    </filter>
  </defs>

  
  <g id="poetry-scroll-canvas" className="anim-poe-scroll" filter="url(#poeShadow)">
    
    <path d="M 120,85 C 150,75 410,75 440,85 L 440,275 C 410,285 150,285 120,275 Z" 
          fill="url(#poeParchmentGrad)" stroke="#191919" strokeWidth="3" strokeLinejoin="round" />
    
    
    <rect x="100" y="70" width="360" height="20" rx="10" fill="url(#poeWoodGrad)" stroke="#191919" strokeWidth="2.5" />
    <circle cx="100" cy="80" r="14" fill="#FFC928" stroke="#191919" strokeWidth="2.5" />
    <circle cx="460" cy="80" r="14" fill="#FFC928" stroke="#191919" strokeWidth="2.5" />
    <circle cx="100" cy="80" r="5" fill="#E52B2B" />
    <circle cx="460" cy="80" r="5" fill="#E52B2B" />

    
    <rect x="100" y="270" width="360" height="20" rx="10" fill="url(#poeWoodGrad)" stroke="#191919" strokeWidth="2.5" />
    <circle cx="100" cy="280" r="14" fill="#FFC928" stroke="#191919" strokeWidth="2.5" />
    <circle cx="460" cy="280" r="14" fill="#FFC928" stroke="#191919" strokeWidth="2.5" />
    <circle cx="100" cy="280" r="5" fill="#36AD50" />
    <circle cx="460" cy="280" r="5" fill="#36AD50" />

    
    <g stroke="#191919" strokeWidth="1.8" fill="none">
      <path d="M 135,105 L 155,105 L 155,125" stroke="#F15A24" strokeWidth="2.5" />
      <path d="M 425,105 L 405,105 L 405,125" stroke="#F15A24" strokeWidth="2.5" />
      <path d="M 135,255 L 155,255 L 155,235" stroke="#36AD50" strokeWidth="2.5" />
      <path d="M 425,255 L 405,255 L 405,235" stroke="#36AD50" strokeWidth="2.5" />
    </g>

    
    <path className="anim-poe-glint" d="M 240,90 L 270,90 L 250,270 L 220,270 Z" fill="#FFFFFF" opacity="0.3" />
  </g>

  
  <g id="poetry-quote-left" className="anim-poe-quote-l">
    <path d="M 155,140 C 145,140 138,132 138,122 C 138,110 148,102 160,102 C 162,102 164,103 166,104 C 160,118 152,130 155,140 Z" fill="#E52B2B" stroke="#191919" strokeWidth="2" />
    <path d="M 175,140 C 165,140 158,132 158,122 C 158,110 168,102 180,102 C 182,102 184,103 186,104 C 180,118 172,130 175,140 Z" fill="#E52B2B" stroke="#191919" strokeWidth="2" />
  </g>

  
  <g id="poetry-quote-right" className="anim-poe-quote-r">
    <path d="M 385,210 C 395,210 402,218 402,228 C 402,240 392,248 380,248 C 378,248 376,247 374,246 C 380,232 388,220 385,210 Z" fill="#36AD50" stroke="#191919" strokeWidth="2" />
    <path d="M 405,210 C 415,210 422,218 422,228 C 422,240 412,248 400,248 C 398,248 396,247 394,246 C 400,232 408,220 405,210 Z" fill="#36AD50" stroke="#191919" strokeWidth="2" />
  </g>

  
  <g id="poetry-flourish-rule">
    <path className="anim-poe-line" d="M 160,200 C 220,215 340,185 400,200" 
          stroke="#F15A24" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    
    <polygon points="280,192 286,198 280,204 274,198" fill="#FFC928" stroke="#191919" strokeWidth="1.8" />
  </g>
</svg>
  );
}
