export default function LivingBookIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 380"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <style>{`
          @keyframes page-flutter-left {
            0%, 100% { transform: rotate(0deg) skewY(0deg); }
            50% { transform: rotate(-3deg) skewY(-1deg); }
          }
          @keyframes page-flutter-right {
            0%, 100% { transform: rotate(0deg) skewY(0deg); }
            50% { transform: rotate(3deg) skewY(1deg); }
          }
          @keyframes book-mote-rise {
            0% { transform: translateY(0px) scale(0.6); opacity: 0; }
            30% { opacity: 0.9; }
            70% { opacity: 0.7; }
            100% { transform: translateY(-40px) translateX(8px) scale(1.1); opacity: 0; }
          }
          @keyframes ribbon-tail-sway {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(5deg); }
          }
          @keyframes star-twinkle {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.7; }
            50% { transform: scale(1.3) rotate(25deg); opacity: 1; filter: drop-shadow(0 0 5px #FFC928); }
          }

          .anim-page-l { animation: page-flutter-left 3.5s ease-in-out infinite; transform-origin: 250px 240px; }
          .anim-page-r { animation: page-flutter-right 3.5s ease-in-out infinite 0.2s; transform-origin: 250px 240px; }
          .anim-book-mote-1 { animation: book-mote-rise 3.2s ease-out infinite; }
          .anim-book-mote-2 { animation: book-mote-rise 3.8s ease-out infinite 1s; }
          .anim-book-mote-3 { animation: book-mote-rise 4.2s ease-out infinite 1.8s; }
          .anim-ribbon-tail { animation: ribbon-tail-sway 3s ease-in-out infinite; transform-origin: 250px 270px; }
          .anim-book-star-1 { animation: star-twinkle 2.5s ease-in-out infinite; transform-origin: 100px 90px; }
          .anim-book-star-2 { animation: star-twinkle 3s ease-in-out infinite 0.7s; transform-origin: 390px 75px; }
          .anim-book-star-3 { animation: star-twinkle 2.7s ease-in-out infinite 1.3s; transform-origin: 250px 45px; }

          @media (prefers-reduced-motion: reduce) {
            .anim-page-l, .anim-page-r, .anim-book-mote-1, .anim-book-mote-2,
            .anim-book-mote-3, .anim-ribbon-tail, .anim-book-star-1,
            .anim-book-star-2, .anim-book-star-3 {
              animation: none !important;
            }
          }
        `}</style>

        <linearGradient id="bookCoverGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E52B2B" />
          <stop offset="60%" stopColor="#F15A24" />
          <stop offset="100%" stopColor="#C41818" />
        </linearGradient>

        <linearGradient id="bookPageGradL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFF2D6" />
          <stop offset="85%" stopColor="#FFFDF7" />
          <stop offset="100%" stopColor="#EAD8BA" />
        </linearGradient>

        <linearGradient id="bookPageGradR" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#EAD8BA" />
          <stop offset="15%" stopColor="#FFFDF7" />
          <stop offset="100%" stopColor="#FFF2D6" />
        </linearGradient>

        <radialGradient id="bookGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFC928" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FFC928" stopOpacity="0" />
        </radialGradient>

        <filter id="bookShadow" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#191919" floodOpacity="0.16" />
        </filter>
      </defs>

      {/* Aura Glow */}
      <circle cx="250" cy="180" r="130" fill="url(#bookGlow)" />

      {/* Rising knowledge motes */}
      <circle cx="210" cy="160" r="3" fill="#FFC928" className="anim-book-mote-1" />
      <circle cx="280" cy="140" r="2.5" fill="#36AD50" className="anim-book-mote-2" />
      <circle cx="240" cy="120" r="3.5" fill="#F15A24" className="anim-book-mote-3" />
      <polygon points="265,100 268,103 265,106 262,103" fill="#FFC928" className="anim-book-mote-1" />
      <circle cx="190" cy="130" r="2" fill="#FFFFFF" className="anim-book-mote-2" />
      <circle cx="310" cy="150" r="2.5" fill="#FFC928" className="anim-book-mote-3" />

      {/* Ambient Twinkle Stars */}
      <g className="anim-book-star-1">
        <path d="M 100,75 Q 100,90 85,90 Q 100,90 100,105 Q 100,90 115,90 Q 100,90 100,75 Z" fill="#FFC928" />
        <circle cx="100" cy="90" r="2" fill="#FFFFFF" />
      </g>
      <g className="anim-book-star-2">
        <path d="M 390,60 Q 390,75 375,75 Q 390,75 390,90 Q 390,75 405,75 Q 390,75 390,60 Z" fill="#F15A24" />
        <circle cx="390" cy="75" r="2" fill="#FFFFFF" />
      </g>
      <g className="anim-book-star-3">
        <path d="M 250,30 Q 250,45 235,45 Q 250,45 250,60 Q 250,45 265,45 Q 250,45 250,30 Z" fill="#36AD50" />
      </g>

      {/* Book Body with Shadow */}
      <g filter="url(#bookShadow)">
        {/* Hardcover Base */}
        <path
          d="M 60,250 C 130,265 210,255 250,270 C 290,255 370,265 440,250 L 445,268 C 375,283 290,273 250,288 C 210,273 125,283 55,268 Z"
          fill="url(#bookCoverGrad)"
          stroke="#191919"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Thick Page Block Edge */}
        <path
          d="M 68,242 C 135,256 210,248 250,262 C 290,248 365,256 432,242 L 440,252 C 370,267 290,258 250,272 C 210,258 130,267 60,252 Z"
          fill="#E2D2B0"
          stroke="#191919"
          strokeWidth="2.5"
        />

        {/* Lower Left Page Leaf */}
        <path
          d="M 72,232 C 140,246 215,238 250,252 L 250,158 C 210,146 140,152 76,140 Z"
          fill="url(#bookPageGradL)"
          stroke="#191919"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Lower Right Page Leaf */}
        <path
          d="M 428,232 C 360,246 285,238 250,252 L 250,158 C 290,146 360,152 424,140 Z"
          fill="url(#bookPageGradR)"
          stroke="#191919"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Animated Upper Left Page (Turning) */}
        <g className="anim-page-l">
          <path
            d="M 80,222 C 145,234 218,226 250,244 L 250,150 C 212,136 145,142 84,130 Z"
            fill="url(#bookPageGradL)"
            stroke="#191919"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Simulated text lines */}
          <line x1="110" y1="155" x2="225" y2="162" stroke="#D4C2A1" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="110" y1="172" x2="220" y2="179" stroke="#D4C2A1" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="110" y1="189" x2="215" y2="196" stroke="#D4C2A1" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="110" y1="206" x2="190" y2="213" stroke="#D4C2A1" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Animated Upper Right Page (Turning) */}
        <g className="anim-page-r">
          <path
            d="M 420,222 C 355,234 282,226 250,244 L 250,150 C 288,136 355,142 416,130 Z"
            fill="url(#bookPageGradR)"
            stroke="#191919"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Simulated text lines */}
          <line x1="275" y1="162" x2="390" y2="155" stroke="#D4C2A1" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="280" y1="179" x2="390" y2="172" stroke="#D4C2A1" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="285" y1="196" x2="390" y2="189" stroke="#D4C2A1" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="290" y1="213" x2="365" y2="206" stroke="#D4C2A1" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Center Book Spine Groove */}
        <path d="M 250,146 L 250,276" stroke="#191919" strokeWidth="4" strokeLinecap="round" />
        <path d="M 248,148 L 248,274" stroke="#FFC928" strokeWidth="2" strokeLinecap="round" />

        {/* Bookmark Ribbon Hanging from Spine */}
        <g className="anim-ribbon-tail">
          <path
            d="M 250,252 C 248,285 238,305 242,328 L 254,320 L 262,328 C 258,305 252,285 250,252 Z"
            fill="#36AD50"
            stroke="#191919"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}
