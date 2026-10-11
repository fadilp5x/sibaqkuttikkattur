export default function ArenaHeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`w-full h-auto max-w-full ${className}`}
      viewBox="0 0 320 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Red & Yellow Big Top Tent */}
      <polygon points="160,10 60,70 260,70" fill="#241414" />
      <polygon points="160,10 130,70 100,70 160,10" fill="#E52B2B" />
      <polygon points="160,10 100,70 70,70 160,10" fill="#FFC928" />
      <polygon points="160,10 190,70 220,70 160,10" fill="#E52B2B" />
      <polygon points="160,10 220,70 250,70 160,10" fill="#FFC928" />
      <polygon points="160,5 175,10 160,15" fill="#FFC928" />
      <line x1="160" y1="2" x2="160" y2="15" stroke="#FFFFFF" strokeWidth="1.5" />
      
      {/* Pennants */}
      <g className="animate-sway origin-top">
        <path d="M 60,65 Q 160,85 260,65" stroke="#FFC928" strokeWidth="1.5" />
        <polygon points="90,70 105,71 97,85" fill="#E52B2B" />
        <polygon points="120,72 135,73 127,88" fill="#FFC928" />
        <polygon points="150,73 165,73 157,90" fill="#36AD50" />
        <polygon points="180,73 195,72 187,88" fill="#F15A24" />
        <polygon points="210,71 225,70 217,85" fill="#E52B2B" />
      </g>
      
      {/* Side Horns/Trumpets */}
      <polygon points="35,65 60,78 60,88 35,100" fill="#FFC928" />
      <polygon points="285,65 260,78 260,88 285,100" fill="#FFC928" />
    </svg>
  );
}
