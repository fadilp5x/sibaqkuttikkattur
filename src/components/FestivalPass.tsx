export default function FestivalPass({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-full h-full object-contain ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 340" width="100%" height="100%" fill="none" aria-hidden="true">
  <defs>
    <style>{`

      /* Embedded Autonomous CSS Keyframes for Festival Pass */
      @keyframes pas-ticket-float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-8px) rotate(-1.5deg); }
      }
      @keyframes pas-sheen-sweep {
        0% { transform: translateX(-150px) rotate(30deg); opacity: 0; }
        25% { opacity: 0.6; }
        60% { transform: translateX(200px) rotate(30deg); opacity: 0; }
        100% { opacity: 0; }
      }
      @keyframes pas-star-twinkle {
        0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
        50% { transform: scale(1.3) rotate(30deg); opacity: 1; filter: drop-shadow(0 0 8px #FFC928); }
      }

      .anim-pas-ticket { animation: pas-ticket-float 4.2s ease-in-out infinite; transform-origin: center center; }
      .anim-pas-sheen { animation: pas-sheen-sweep 5s ease-in-out infinite; }
      .anim-pas-star { animation: pas-star-twinkle 2.8s ease-in-out infinite; transform-origin: center center; }

      @media (prefers-reduced-motion: reduce) {
        .anim-pas-ticket, .anim-pas-sheen, .anim-pas-star {
          animation: none !important;
          transform: none !important;
        }
      }
    
      [data-festival-theme="calm"] {

        .anim-pas-ticket, .anim-pas-sheen, .anim-pas-star {
          animation: none !important;
          transform: none !important;
        
      }
      `}</style>

    <linearGradient id="pasBodyGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#E52B2B" />
      <stop offset="50%" stopColor="#F15A24" />
      <stop offset="100%" stopColor="#FFC928" />
    </linearGradient>

    <linearGradient id="pasParchmentStub" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#FFFDF7" />
      <stop offset="100%" stopColor="#FFF8E8" />
    </linearGradient>

    <filter id="pasShadow" x="-10%" y="-10%" width="120%" height="125%">
      <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#191919" floodOpacity="0.22" />
    </filter>
  </defs>

  
  <g id="festival-ticket-body" className="anim-pas-ticket" filter="url(#pasShadow)">
    
    
    <path d="M 90,60 L 450,60 C 465,60 475,70 475,85 L 475,145 C 455,145 440,158 440,170 C 440,182 455,195 475,195 L 475,255 C 475,270 465,280 450,280 L 90,280 C 75,280 65,270 65,255 L 65,195 C 85,195 100,182 100,170 C 100,158 85,145 65,145 L 65,85 C 65,70 75,60 90,60 Z" 
          fill="url(#pasBodyGrad)" stroke="#191919" strokeWidth="4" strokeLinejoin="round" />

    
    <path d="M 100,75 L 350,75 L 350,265 L 100,265 C 90,265 82,257 82,247 L 82,190 C 98,187 110,178 110,170 C 110,162 98,153 82,150 L 82,93 C 82,83 90,75 100,75 Z" 
          fill="url(#pasParchmentStub)" stroke="#191919" strokeWidth="2.5" />

    
    <line x1="365" y1="75" x2="365" y2="265" stroke="#191919" strokeWidth="3" strokeDasharray="6 6" />

    
    <path d="M 380,75 L 440,75 C 450,75 458,83 458,93 L 458,150 C 442,153 430,162 430,170 C 430,178 442,187 458,190 L 458,247 C 458,257 450,265 440,265 L 380,265 Z" 
          fill="#191919" stroke="#FFC928" strokeWidth="2" />
    
    
    <polygon points="419,150 427,162 419,174 411,162" fill="#36AD50" stroke="#FFFFFF" strokeWidth="1.5" />
    <circle cx="419" cy="195" r="4" fill="#FFC928" />
    <circle cx="419" cy="125" r="4" fill="#E52B2B" />

    
    <g transform="translate(225, 170)">
      <polygon points="0,-45 45,0 0,45 -45,0" fill="#191919" stroke="#FFC928" strokeWidth="3" />
      <polygon points="0,-32 32,0 0,32 -32,0" fill="#36AD50" stroke="#FFFFFF" strokeWidth="2" />
      
      
      <polygon points="0,-16 16,0 0,16 -16,0" fill="#FFC928" />
      <circle cx="0" cy="0" r="5" fill="#E52B2B" />
    </g>

    
    <rect x="110" y="90" width="70" height="6" rx="3" fill="#F15A24" />
    <rect x="110" y="102" width="45" height="4" rx="2" fill="#36AD50" />
    <rect x="110" y="240" width="80" height="5" rx="2.5" fill="#E52B2B" />

    
    <path className="anim-pas-sheen" d="M 170,70 L 210,70 L 160,270 L 120,270 Z" fill="#FFFFFF" opacity="0.35" />
  </g>

  
  <g id="pass-ambient-sparkles">
    <polygon points="60,60 65,65 60,70 55,65" fill="#FFC928" className="anim-pas-star" />
    <polygon points="490,65 496,71 490,77 484,71" fill="#36AD50" className="anim-pas-star" />
    <polygon points="480,285 485,290 480,295 475,290" fill="#FFC928" className="anim-pas-star" />
  </g>
</svg>
  );
}
