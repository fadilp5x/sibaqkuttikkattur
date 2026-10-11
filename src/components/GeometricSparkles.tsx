import { useReducedMotion } from '../lib/hooks';

export default function GeometricSparkles({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion();
  const animClass = reduced ? '' : 'animate-floaty origin-center';
  
  return (
    <svg 
      className={`w-full h-16 ${className} pointer-events-none fest-decoration`} 
      viewBox="0 0 200 50" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Diamond */}
      <polygon points="25,5 45,25 25,45 5,25" fill="#E52B2B" className={animClass} style={{ animationDelay: '0ms' }} />
      {/* Star 4-pt */}
      <polygon points="80,8 86,20 98,25 86,30 80,42 74,30 62,25 74,20" fill="#FFC928" className={animClass} style={{ animationDelay: '400ms' }} />
      {/* Confetti square */}
      <rect x="125" y="15" width="16" height="16" rx="2" transform="rotate(25 133 23)" fill="#F15A24" className={animClass} style={{ animationDelay: '800ms' }} />
      {/* Green Starburst */}
      <polygon points="175,10 179,20 189,22 181,30 183,40 175,34 167,40 169,30 161,22 171,20" fill="#36AD50" className={animClass} style={{ animationDelay: '1200ms' }} />
    </svg>
  );
}
