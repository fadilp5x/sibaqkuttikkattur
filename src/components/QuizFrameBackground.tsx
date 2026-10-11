export default function QuizFrameBackground({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} 
      viewBox="0 0 200 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <rect x="10" y="10" width="180" height="100" rx="14" fill="#FFF8E8" stroke="#FFC928" strokeWidth="3" />
      <polygon points="10,25 25,10 10,10" fill="#E52B2B" />
      <polygon points="190,25 175,10 190,10" fill="#36AD50" />
      <polygon points="10,95 25,110 10,110" fill="#36AD50" />
      <polygon points="190,95 175,110 190,110" fill="#F15A24" />
      <rect x="65" y="5" width="70" height="14" rx="7" fill="#E52B2B" />
    </svg>
  );
}
