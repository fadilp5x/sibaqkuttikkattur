export default function Soundwave({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-full h-full object-contain ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 320" width="100%" height="100%" fill="none" aria-hidden="true">
  <defs>
    <style>{`

      /* Embedded Autonomous CSS Keyframes for Soundwave */
      @keyframes wav-bar-bounce-1 {
        0%, 100% { transform: scaleY(0.35); }
        50% { transform: scaleY(1.0); }
      }
      @keyframes wav-bar-bounce-2 {
        0%, 100% { transform: scaleY(0.85); }
        50% { transform: scaleY(0.25); }
      }
      @keyframes wav-bar-bounce-3 {
        0%, 100% { transform: scaleY(0.45); }
        50% { transform: scaleY(0.95); }
      }
      @keyframes wav-wave-undulate {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
      @keyframes wav-pulse-glow {
        0%, 100% { opacity: 0.6; filter: drop-shadow(0 0 3px #FFC928); }
        50% { opacity: 1; filter: drop-shadow(0 0 10px #FFC928); }
      }

      .anim-wav-1 { animation: wav-bar-bounce-1 1.6s ease-in-out infinite; transform-origin: center bottom; }
      .anim-wav-2 { animation: wav-bar-bounce-2 1.4s ease-in-out infinite; transform-origin: center bottom; }
      .anim-wav-3 { animation: wav-bar-bounce-3 1.8s ease-in-out infinite; transform-origin: center bottom; }
      .anim-wav-4 { animation: wav-bar-bounce-1 1.5s ease-in-out infinite 0.3s; transform-origin: center bottom; }
      .anim-wav-5 { animation: wav-bar-bounce-2 1.7s ease-in-out infinite 0.2s; transform-origin: center bottom; }

      .anim-wav-sine { animation: wav-wave-undulate 3.2s ease-in-out infinite; }
      .anim-wav-glow { animation: wav-pulse-glow 2.4s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .anim-wav-1, .anim-wav-2, .anim-wav-3, .anim-wav-4, .anim-wav-5, .anim-wav-sine, .anim-wav-glow {
          animation: none !important;
          transform: none !important;
        }
      }
    
      [data-festival-theme="calm"] {

        .anim-wav-1, .anim-wav-2, .anim-wav-3, .anim-wav-4, .anim-wav-5, .anim-wav-sine, .anim-wav-glow {
          animation: none !important;
          transform: none !important;
        
      }
      `}</style>

    <linearGradient id="wavGradRed" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stopColor="#E52B2B" />
      <stop offset="100%" stopColor="#FF5A5A" />
    </linearGradient>
    <linearGradient id="wavGradOrange" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stopColor="#F15A24" />
      <stop offset="100%" stopColor="#FFA07A" />
    </linearGradient>
    <linearGradient id="wavGradYellow" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stopColor="#FFC928" />
      <stop offset="100%" stopColor="#FFE885" />
    </linearGradient>
    <linearGradient id="wavGradGreen" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stopColor="#36AD50" />
      <stop offset="100%" stopColor="#62D87B" />
    </linearGradient>

    <filter id="wavShadow" x="-5%" y="-10%" width="110%" height="125%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#191919" floodOpacity="0.14" />
    </filter>
  </defs>

  
  <line x1="40" y1="230" x2="540" y2="230" stroke="#2B2F38" strokeWidth="3" strokeLinecap="round" />

  
  <path className="anim-wav-sine" d="M 40,160 C 90,110 140,210 190,160 C 240,110 290,200 340,150 C 390,100 440,210 490,160 C 515,135 530,150 540,160" 
        stroke="#FFC928" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 4" opacity="0.6" />

  
  <g id="soundwave-equalizer-bars" filter="url(#wavShadow)">
    
    <g transform="translate(60, 230)"><rect className="anim-wav-1" x="-8" y="-90" width="16" height="90" rx="8" fill="url(#wavGradRed)" stroke="#191919" strokeWidth="2" /></g>
    
    <g transform="translate(95, 230)"><rect className="anim-wav-2" x="-8" y="-130" width="16" height="130" rx="8" fill="url(#wavGradOrange)" stroke="#191919" strokeWidth="2" /></g>
    
    <g transform="translate(130, 230)"><rect className="anim-wav-3" x="-8" y="-70" width="16" height="70" rx="8" fill="url(#wavGradYellow)" stroke="#191919" strokeWidth="2" /></g>
    
    <g transform="translate(165, 230)"><rect className="anim-wav-4" x="-8" y="-150" width="16" height="150" rx="8" fill="url(#wavGradGreen)" stroke="#191919" strokeWidth="2" /></g>
    
    
    <g transform="translate(200, 230)"><rect className="anim-wav-5" x="-8" y="-110" width="16" height="110" rx="8" fill="url(#wavGradRed)" stroke="#191919" strokeWidth="2" /></g>
    
    <g transform="translate(235, 230)"><rect className="anim-wav-1" x="-8" y="-165" width="16" height="165" rx="8" fill="url(#wavGradOrange)" stroke="#191919" strokeWidth="2" /></g>
    
    
    <g transform="translate(270, 230)" className="anim-wav-glow"><rect className="anim-wav-2" x="-9" y="-190" width="18" height="190" rx="9" fill="url(#wavGradYellow)" stroke="#191919" strokeWidth="2.5" /></g>
    <circle cx="270" cy="35" r="4" fill="#FFFFFF" className="anim-wav-glow" />

    
    <g transform="translate(305, 230)"><rect className="anim-wav-3" x="-8" y="-165" width="16" height="165" rx="8" fill="url(#wavGradGreen)" stroke="#191919" strokeWidth="2" /></g>
    
    <g transform="translate(340, 230)"><rect className="anim-wav-4" x="-8" y="-110" width="16" height="110" rx="8" fill="url(#wavGradRed)" stroke="#191919" strokeWidth="2" /></g>
    
    <g transform="translate(375, 230)"><rect className="anim-wav-5" x="-8" y="-150" width="16" height="150" rx="8" fill="url(#wavGradOrange)" stroke="#191919" strokeWidth="2" /></g>
    
    <g transform="translate(410, 230)"><rect className="anim-wav-1" x="-8" y="-70" width="16" height="70" rx="8" fill="url(#wavGradYellow)" stroke="#191919" strokeWidth="2" /></g>
    
    <g transform="translate(445, 230)"><rect className="anim-wav-2" x="-8" y="-130" width="16" height="130" rx="8" fill="url(#wavGradGreen)" stroke="#191919" strokeWidth="2" /></g>
    
    <g transform="translate(480, 230)"><rect className="anim-wav-3" x="-8" y="-90" width="16" height="90" rx="8" fill="url(#wavGradRed)" stroke="#191919" strokeWidth="2" /></g>
    
    <g transform="translate(515, 230)"><rect className="anim-wav-4" x="-8" y="-55" width="16" height="55" rx="8" fill="url(#wavGradOrange)" stroke="#191919" strokeWidth="2" /></g>
  </g>

  
  <polygon points="120,60 125,65 120,70 115,65" fill="#36AD50" />
  <polygon points="450,55 455,60 450,65 445,60" fill="#FFC928" />
  <polygon points="200,45 204,49 200,53 196,49" fill="#F15A24" />
</svg>
  );
}
