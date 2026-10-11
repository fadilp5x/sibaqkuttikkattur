export default function ShapeDivider({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-full h-full object-contain ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 120" width="100%" height="100%" fill="none" aria-hidden="true">
  <defs>
    <style>{`

      /* Embedded Autonomous CSS Keyframes for Shape Divider */
      @keyframes div-shift-left {
        0%, 100% { transform: translateX(0px); }
        50% { transform: translateX(-8px); }
      }
      @keyframes div-shift-right {
        0%, 100% { transform: translateX(0px); }
        50% { transform: translateX(8px); }
      }
      @keyframes div-center-rotate {
        0%, 100% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(45deg) scale(1.15); filter: drop-shadow(0 0 8px #FFC928); }
      }
      @keyframes div-wave-shimmer {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 1; }
      }

      .anim-div-left { animation: div-shift-left 4.6s ease-in-out infinite; }
      .anim-div-right { animation: div-shift-right 4.6s ease-in-out infinite; }
      .anim-div-center { animation: div-center-rotate 4.6s ease-in-out infinite; transform-origin: 400px 60px; }
      .anim-div-shimmer { animation: div-wave-shimmer 2.8s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .anim-div-left, .anim-div-right, .anim-div-center, .anim-div-shimmer {
          animation: none !important;
          transform: none !important;
        }
      }
    
      [data-festival-theme="calm"] {

        .anim-div-left, .anim-div-right, .anim-div-center, .anim-div-shimmer {
          animation: none !important;
          transform: none !important;
        
      }
      `}</style>

    <linearGradient id="divLineGradL" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#E52B2B" stopOpacity="0" />
      <stop offset="50%" stopColor="#F15A24" />
      <stop offset="100%" stopColor="#FFC928" />
    </linearGradient>

    <linearGradient id="divLineGradR" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#FFC928" />
      <stop offset="50%" stopColor="#36AD50" />
      <stop offset="100%" stopColor="#36AD50" stopOpacity="0" />
    </linearGradient>

    <filter id="divShadow" x="-5%" y="-20%" width="110%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#191919" floodOpacity="0.14" />
    </filter>
  </defs>

  
  <line x1="50" y1="60" x2="350" y2="60" stroke="url(#divLineGradL)" strokeWidth="2.5" strokeLinecap="round" />
  <line x1="450" y1="60" x2="750" y2="60" stroke="url(#divLineGradR)" strokeWidth="2.5" strokeLinecap="round" />

  
  <g id="divider-left-cluster" className="anim-div-left" filter="url(#divShadow)">
    <polygon points="120,60 130,45 140,60 130,75" fill="#E52B2B" stroke="#191919" strokeWidth="1.8" />
    <circle cx="170" cy="60" r="5" fill="#F15A24" stroke="#191919" strokeWidth="1.8" />
    <polygon points="210,48 222,60 210,72 198,60" fill="#FFC928" stroke="#191919" strokeWidth="1.8" />
    <polygon points="255,42 270,60 255,78 240,60" fill="#36AD50" stroke="#191919" strokeWidth="2" />
    <circle cx="305" cy="60" r="7" fill="#E52B2B" stroke="#191919" strokeWidth="2" />
    <polygon points="345,40 362,60 345,80 328,60" fill="#F15A24" stroke="#191919" strokeWidth="2" />
  </g>

  
  <g id="divider-central-keystone" className="anim-div-center" filter="url(#divShadow)">
    <polygon points="400,26 434,60 400,94 366,60" fill="#FFC928" stroke="#191919" strokeWidth="3.5" strokeLinejoin="round" />
    <polygon points="400,38 422,60 400,82 378,60" fill="#36AD50" stroke="#191919" strokeWidth="2" />
    <polygon points="400,48 412,60 400,72 388,60" fill="#E52B2B" />
    <circle cx="400" cy="60" r="4" fill="#FFFFFF" />
  </g>

  
  <g id="divider-right-cluster" className="anim-div-right" filter="url(#divShadow)">
    <polygon points="455,40 472,60 455,80 438,60" fill="#F15A24" stroke="#191919" strokeWidth="2" />
    <circle cx="495" cy="60" r="7" fill="#E52B2B" stroke="#191919" strokeWidth="2" />
    <polygon points="545,42 560,60 545,78 530,60" fill="#36AD50" stroke="#191919" strokeWidth="2" />
    <polygon points="590,48 602,60 590,72 578,60" fill="#FFC928" stroke="#191919" strokeWidth="1.8" />
    <circle cx="630" cy="60" r="5" fill="#F15A24" stroke="#191919" strokeWidth="1.8" />
    <polygon points="670,60 680,45 690,60 680,75" fill="#E52B2B" stroke="#191919" strokeWidth="1.8" />
  </g>

  
  <g className="anim-div-shimmer">
    <circle cx="280" cy="40" r="2.5" fill="#FFC928" />
    <circle cx="520" cy="40" r="2.5" fill="#FFC928" />
    <circle cx="380" cy="18" r="2.5" fill="#36AD50" />
    <circle cx="420" cy="18" r="2.5" fill="#E52B2B" />
  </g>
</svg>
  );
}
