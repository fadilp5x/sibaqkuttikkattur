export default function ProgrammeConstellation({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-full h-full object-contain ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 480" width="100%" height="100%" fill="none" aria-hidden="true">
  <defs>
    <style>{`

      /* Embedded Autonomous CSS Keyframes for Programme Constellation */
      @keyframes con-orbit-breathe {
        0%, 100% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(2deg) scale(1.02); }
      }
      @keyframes con-center-pulse {
        0%, 100% { transform: scale(1); filter: drop-shadow(0 0 6px #FFC928); }
        50% { transform: scale(1.08); filter: drop-shadow(0 0 16px #FFC928) drop-shadow(0 0 20px #F15A24); }
      }
      @keyframes con-node-float-1 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(3px, -4px); } }
      @keyframes con-node-float-2 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-4px, 3px); } }

      .anim-con-orbit { animation: con-orbit-breathe 8s ease-in-out infinite; transform-origin: 300px 240px; }
      .anim-con-center { animation: con-center-pulse 3s ease-in-out infinite; transform-origin: 300px 240px; }
      .anim-con-node-odd { animation: con-node-float-1 4s ease-in-out infinite; }
      .anim-con-node-even { animation: con-node-float-2 4.5s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .anim-con-orbit, .anim-con-center, .anim-con-node-odd, .anim-con-node-even {
          animation: none !important;
        }
      }
    
      [data-festival-theme="calm"] {

        .anim-con-orbit, .anim-con-center, .anim-con-node-odd, .anim-con-node-even {
          animation: none !important;
        
      }
      `}</style>

    <linearGradient id="conCenterGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#FFE885" />
      <stop offset="40%" stopColor="#FFC928" />
      <stop offset="100%" stopColor="#F15A24" />
    </linearGradient>

    <filter id="conShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#191919" floodOpacity="0.18" />
    </filter>
  </defs>

  
  <g className="anim-con-orbit" stroke="#FFC928" strokeOpacity="0.25" strokeDasharray="6 4" fill="none">
    <ellipse cx="300" cy="240" rx="210" ry="160" strokeWidth="2" />
    <ellipse cx="300" cy="240" rx="140" ry="105" strokeWidth="1.5" stroke="#36AD50" strokeOpacity="0.2" />
    
    
    <line x1="300" y1="80" x2="300" y2="400" strokeWidth="1.2" />
    <line x1="90" y1="240" x2="510" y2="240" strokeWidth="1.2" />
    <line x1="150" y1="125" x2="450" y2="355" strokeWidth="1.2" />
    <line x1="450" y1="125" x2="150" y2="355" strokeWidth="1.2" />
  </g>

  
  <g id="constellation-core" className="anim-con-center" filter="url(#conShadow)">
    <polygon points="300,195 345,240 300,285 255,240" fill="url(#conCenterGrad)" stroke="#191919" strokeWidth="4" strokeLinejoin="round" />
    <polygon points="300,210 330,240 300,270 270,240" fill="#E52B2B" stroke="#191919" strokeWidth="2" />
    <circle cx="300" cy="240" r="7" fill="#FFFFFF" />
  </g>

  
  <g id="constellation-eight-nodes">
    
    
    <g className="anim-con-node-odd" transform="translate(300, 80)">
      <circle cx="0" cy="0" r="26" fill="#191919" stroke="#FFC928" strokeWidth="2.5" />
      <polygon points="0,-12 8,2 -2,12 -8,2" fill="#36AD50" />
      <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
    </g>

    
    <g className="anim-con-node-even" transform="translate(450, 125)">
      <circle cx="0" cy="0" r="26" fill="#191919" stroke="#F15A24" strokeWidth="2.5" />
      <rect x="-10" y="-8" width="14" height="10" rx="3" fill="#F15A24" />
      <rect x="-4" y="-2" width="14" height="10" rx="3" fill="#FFC928" />
    </g>

    
    <g className="anim-con-node-odd" transform="translate(510, 240)">
      <circle cx="0" cy="0" r="26" fill="#191919" stroke="#36AD50" strokeWidth="2.5" />
      <path d="M -12,-6 C -6,-10 0,-4 0,-4 C 0,-4 6,-10 12,-6 L 12,8 C 6,4 0,10 0,10 C 0,10 -6,4 -12,8 Z" fill="#36AD50" stroke="#FFFFFF" strokeWidth="1.2" />
    </g>

    
    <g className="anim-con-node-even" transform="translate(450, 355)">
      <circle cx="0" cy="0" r="26" fill="#191919" stroke="#E52B2B" strokeWidth="2.5" />
      <path d="M -10,-8 C 4,-12 12,2 10,10 C 8,14 -4,14 -8,8 Z" fill="#E52B2B" />
      <circle cx="-2" cy="-2" r="2" fill="#FFC928" />
      <circle cx="4" cy="4" r="2" fill="#36AD50" />
    </g>

    
    <g className="anim-con-node-odd" transform="translate(300, 400)">
      <circle cx="0" cy="0" r="26" fill="#191919" stroke="#FFC928" strokeWidth="2.5" />
      <path d="M -10,10 C -6,2 2,-6 10,-10 C 6,-2 -2,6 -10,10 Z" fill="#FFC928" />
      <line x1="-10" y1="10" x2="6" y2="-6" stroke="#191919" strokeWidth="1.5" />
    </g>

    
    <g className="anim-con-node-even" transform="translate(150, 355)">
      <circle cx="0" cy="0" r="26" fill="#191919" stroke="#F15A24" strokeWidth="2.5" />
      <circle cx="0" cy="0" r="10" stroke="#F15A24" strokeWidth="3" />
      <polygon points="0,-6 6,0 0,6 -6,0" fill="#FFC928" />
    </g>

    
    <g className="anim-con-node-odd" transform="translate(90, 240)">
      <circle cx="0" cy="0" r="26" fill="#191919" stroke="#36AD50" strokeWidth="2.5" />
      <rect x="-5" y="-10" width="10" height="14" rx="4" fill="#36AD50" />
      <path d="M -8,-3 C -8,5 8,5 8,-3" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
      <line x1="0" y1="6" x2="0" y2="12" stroke="#FFFFFF" strokeWidth="2" />
    </g>

    
    <g className="anim-con-node-even" transform="translate(150, 125)">
      <circle cx="0" cy="0" r="26" fill="#191919" stroke="#E52B2B" strokeWidth="2.5" />
      <path d="M -10,-4 C -10,8 10,8 10,-4 Z" fill="#E52B2B" />
      <circle cx="-4" cy="-1" r="1.5" fill="#FFFFFF" />
      <circle cx="4" cy="-1" r="1.5" fill="#FFFFFF" />
    </g>

  </g>
</svg>
  );
}
