export default function LivingCalligraphy({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-full h-full object-contain ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%" fill="none" aria-hidden="true">
  <defs>
    <style>{`

      /* Embedded Autonomous CSS Keyframes for Calligraphy */
      @keyframes cal-stroke-draw {
        0% { stroke-dashoffset: 1200; opacity: 0.2; }
        15% { opacity: 1; }
        70%, 100% { stroke-dashoffset: 0; opacity: 1; }
      }
      @keyframes cal-pen-sweep {
        0% { transform: translate(-40px, 30px) rotate(-15deg); opacity: 0; }
        15% { opacity: 1; }
        65% { transform: translate(320px, -45px) rotate(12deg); opacity: 1; }
        80% { transform: translate(340px, -60px) rotate(0deg); opacity: 0.85; }
        100% { transform: translate(340px, -60px) rotate(0deg); opacity: 0.85; }
      }
      @keyframes cal-nuqta-pop {
        0%, 55% { transform: scale(0); opacity: 0; }
        70% { transform: scale(1.25); opacity: 1; }
        80%, 100% { transform: scale(1); opacity: 1; }
      }
      @keyframes cal-arabesque-bloom {
        0%, 65% { transform: scale(0.6) rotate(-20deg); opacity: 0; }
        85% { transform: scale(1.08) rotate(5deg); opacity: 1; filter: drop-shadow(0 0 8px #FFC928); }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
      }
      @keyframes cal-spark-twinkle {
        0%, 100% { opacity: 0.4; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.3); filter: drop-shadow(0 0 6px #36AD50); }
      }

      .anim-cal-stroke {
        stroke-dasharray: 1200;
        stroke-dashoffset: 1200;
        animation: cal-stroke-draw 4.2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
      }
      .anim-cal-pen {
        animation: cal-pen-sweep 4.2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
        transform-origin: 160px 220px;
      }
      .anim-cal-nuqta-1 { animation: cal-nuqta-pop 4.2s ease-out infinite; transform-origin: 245px 125px; }
      .anim-cal-nuqta-2 { animation: cal-nuqta-pop 4.2s ease-out infinite 0.15s; transform-origin: 275px 105px; }
      .anim-cal-arabesque { animation: cal-arabesque-bloom 4.2s cubic-bezier(0.34, 1.56, 0.64, 1) infinite; transform-origin: 470px 180px; }
      .anim-cal-spark { animation: cal-spark-twinkle 2.5s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .anim-cal-stroke, .anim-cal-pen, .anim-cal-nuqta-1, .anim-cal-nuqta-2, .anim-cal-arabesque, .anim-cal-spark {
          animation: none !important;
          stroke-dashoffset: 0 !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    
      [data-festival-theme="calm"] {

        .anim-cal-stroke, .anim-cal-pen, .anim-cal-nuqta-1, .anim-cal-nuqta-2, .anim-cal-arabesque, .anim-cal-spark {
          animation: none !important;
          stroke-dashoffset: 0 !important;
          opacity: 1 !important;
          transform: none !important;
        
      }
      `}</style>

    <linearGradient id="calStrokeGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#E52B2B" />
      <stop offset="35%" stopColor="#F15A24" />
      <stop offset="70%" stopColor="#FFC928" />
      <stop offset="100%" stopColor="#36AD50" />
    </linearGradient>

    <linearGradient id="calQalamGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#A7612E" />
      <stop offset="50%" stopColor="#783D16" />
      <stop offset="100%" stopColor="#4E230B" />
    </linearGradient>

    <filter id="calGlowFilter" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#FFC928" floodOpacity="0.25" />
    </filter>
  </defs>

  
  <ellipse cx="300" cy="200" rx="220" ry="120" fill="#FFC928" opacity="0.06" />

  
  <g id="calligraphy-flowing-strokes" filter="url(#calGlowFilter)">
    
    <path className="anim-cal-stroke" d="M 70,250 C 130,280 200,240 250,180 C 310,110 380,120 420,180 C 455,230 500,210 530,170" 
          stroke="url(#calStrokeGrad)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />

    
    <path className="anim-cal-stroke" d="M 120,220 C 190,160 280,260 360,200 C 410,160 460,180 500,220" 
          stroke="#FFC928" strokeWidth="4.5" strokeLinecap="round" opacity="0.8" />
  </g>

  
  <g id="calligraphy-nuqta-dots">
    
    <g className="anim-cal-nuqta-1">
      <polygon points="245,115 255,125 245,135 235,125" fill="#36AD50" stroke="#191919" strokeWidth="2" />
      <circle cx="245" cy="125" r="2" fill="#FFFFFF" />
    </g>
    
    <g className="anim-cal-nuqta-2">
      <polygon points="275,95 285,105 275,115 265,105" fill="#FFC928" stroke="#191919" strokeWidth="2" />
      <circle cx="275" cy="105" r="2" fill="#FFFFFF" />
    </g>
  </g>

  
  <g id="calligraphy-arabesque-bloom" className="anim-cal-arabesque">
    <path d="M 470,180 C 490,140 540,140 550,180 C 560,220 510,230 490,200 C 475,180 495,160 515,175 C 525,185 520,200 505,195" 
          stroke="#36AD50" strokeWidth="4" strokeLinecap="round" fill="none" />
    <circle cx="550" cy="180" r="5" fill="#FFC928" />
    <polygon points="530,150 535,155 530,160 525,155" fill="#E52B2B" />
  </g>

  
  <g id="calligraphy-reed-qalam" className="anim-cal-pen">
    
    <path d="M 160,220 L 110,130 C 105,120 115,110 125,115 L 180,205 Z" fill="url(#calQalamGrad)" stroke="#191919" strokeWidth="2" />
    
    <polygon points="160,220 172,212 165,228" fill="#FFC928" stroke="#191919" strokeWidth="1.8" />
    <line x1="135" y1="165" x2="162" y2="218" stroke="#191919" strokeWidth="1.5" />
    
    <circle cx="166" cy="225" r="3.5" fill="#E52B2B" />
  </g>

  
  <g id="calligraphy-ambient-sparkles">
    <polygon points="110,160 114,164 110,168 106,164" fill="#FFC928" className="anim-cal-spark" />
    <polygon points="380,95 385,100 380,105 375,100" fill="#36AD50" className="anim-cal-spark" />
    <polygon points="440,260 444,264 440,268 436,264" fill="#F15A24" className="anim-cal-spark" />
  </g>
</svg>
  );
}
