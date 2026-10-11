import { useReducedMotion } from '../lib/hooks';

export default function FestivalRibbon({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion();
  
  return (
    <svg 
      className={`w-full h-14 fest-decoration ${reduced ? '' : 'animate-float-horizontal'} ${className}`} 
      viewBox="0 0 320 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path d="M 0,20 C 50,5 110,35 160,20 C 210,5 270,35 320,20 L 320,30 C 270,45 210,15 160,30 C 110,45 50,15 0,30 Z" fill="#F15A24" />
      <path d="M 0,20 C 50,5 110,35 160,20 L 160,30 C 110,45 50,15 0,30 Z" fill="#E52B2B" />
      <path d="M 160,20 C 210,5 270,35 320,20 L 320,30 C 270,45 210,15 160,30 Z" fill="#36AD50" />
    </svg>
  );
}
