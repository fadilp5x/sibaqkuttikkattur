export default function CreativeBrush({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-full h-full object-contain ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 380" width="100%" height="100%" fill="none" aria-hidden="true">
  <defs>
    <style>{`

      /* Embedded Autonomous CSS Keyframes for Creative Brush */
      @keyframes bru-brush-sweep {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        35% { transform: translate(90px, -40px) rotate(16deg); }
        70% { transform: translate(175px, -15px) rotate(28deg); }
      }
      @keyframes bru-stroke-reveal {
        0% { stroke-dashoffset: 800; opacity: 0.3; }
        40% { opacity: 1; }
        80%, 100% { stroke-dashoffset: 0; opacity: 1; }
      }
      @keyframes bru-droplet-float {
        0%, 100% { transform: translateY(0px) scale(0.9); }
        50% { transform: translateY(-12px) scale(1.15); filter: drop-shadow(0 0 6px #F15A24); }
      }

      .anim-bru-brush { animation: bru-brush-sweep 4.6s ease-in-out infinite; transform-origin: 120px 240px; }
      .anim-bru-stroke {
        stroke-dasharray: 800;
        stroke-dashoffset: 800;
        animation: bru-stroke-reveal 4.6s ease-in-out infinite;
      }
      .anim-bru-drop-1 { animation: bru-droplet-float 2.8s ease-in-out infinite; }
      .anim-bru-drop-2 { animation: bru-droplet-float 3.2s ease-in-out infinite 0.6s; }

      @media (prefers-reduced-motion: reduce) {
        .anim-bru-brush, .anim-bru-stroke, .anim-bru-drop-1, .anim-bru-drop-2 {
          animation: none !important;
          stroke-dashoffset: 0 !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    
      [data-festival-theme="calm"] {

        .anim-bru-brush, .anim-bru-stroke, .anim-bru-drop-1, .anim-bru-drop-2 {
          animation: none !important;
          stroke-dashoffset: 0 !important;
          opacity: 1 !important;
          transform: none !important;
        
      }
      `}</style>

    <linearGradient id="bruPaintGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#E52B2B" />
      <stop offset="35%" stopColor="#F15A24" />
      <stop offset="70%" stopColor="#FFC928" />
      <stop offset="100%" stopColor="#36AD50" />
    </linearGradient>

    <linearGradient id="bruHandleGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#D97736" />
      <stop offset="60%" stopColor="#9C4410" />
      <stop offset="100%" stopColor="#6E2B06" />
    </linearGradient>

    <filter id="bruShadow" x="-10%" y="-10%" width="125%" height="125%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#191919" floodOpacity="0.16" />
    </filter>
  </defs>

  
  <g id="creative-brush-paint-trail" filter="url(#bruShadow)">
    <path className="anim-bru-stroke" d="M 60,250 C 130,290 220,240 310,180 C 390,130 460,150 510,180" 
          stroke="url(#bruPaintGrad)" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
    
    
    <path className="anim-bru-stroke" d="M 90,245 C 160,280 240,230 320,175 C 390,130 450,145 490,170" 
          stroke="#FFF8E8" strokeWidth="6" strokeLinecap="round" opacity="0.65" />
  </g>

  
  <g id="creative-brush-droplets">
    <circle cx="160" cy="285" r="5" fill="#E52B2B" className="anim-bru-drop-1" />
    <circle cx="185" cy="305" r="3.5" fill="#F15A24" className="anim-bru-drop-2" />
    <circle cx="340" cy="140" r="4.5" fill="#FFC928" className="anim-bru-drop-1" />
    <circle cx="430" cy="115" r="4" fill="#36AD50" className="anim-bru-drop-2" />
  </g>

  
  <g id="creative-brush-tool" className="anim-bru-brush" filter="url(#bruShadow)">
    
    <path d="M 65,290 L 195,160 C 200,155 208,155 212,160 L 222,170 C 226,174 226,182 221,187 L 90,315 C 80,325 60,310 65,290 Z" 
          fill="url(#bruHandleGrad)" stroke="#191919" strokeWidth="3" />
    
    
    <polygon points="195,160 220,135 242,157 217,182" fill="#E2E8F0" stroke="#191919" strokeWidth="2.5" />
    <line x1="205" y1="150" x2="227" y2="172" stroke="#94A3B8" strokeWidth="1.8" />
    
    
    <path d="M 220,135 C 235,120 260,110 275,125 C 290,140 280,165 265,180 L 242,157 Z" 
          fill="#36AD50" stroke="#191919" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M 245,115 C 265,115 275,125 270,145 Z" fill="#FFC928" />
    <circle cx="270" cy="128" r="4" fill="#F15A24" />
  </g>

  
  <polygon points="140,110 145,115 140,120 135,115" fill="#FFC928" />
  <polygon points="480,90 486,96 480,102 474,96" fill="#E52B2B" />
  <polygon points="380,250 385,255 380,260 375,255" fill="#36AD50" />
</svg>
  );
}
