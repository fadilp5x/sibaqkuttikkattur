import { useReducedMotion } from '../lib/hooks';

export default function PennantGarland({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion();
  
  return (
    <svg 
      className={`w-full h-16 fest-decoration ${reduced ? '' : 'animate-sway origin-top'} ${className}`} 
      viewBox="0 0 300 45" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path d="M 0,8 Q 150,24 300,8" stroke="#FFC928" strokeWidth="2" />
      <polygon points="20,10 40,11 30,35" fill="#E52B2B" />
      <polygon points="55,12 75,14 65,38" fill="#FFC928" />
      <polygon points="90,14 110,16 100,40" fill="#36AD50" />
      <polygon points="125,16 145,17 135,42" fill="#F15A24" />
      <polygon points="160,17 180,16 170,42" fill="#E52B2B" />
      <polygon points="195,16 215,14 205,40" fill="#FFC928" />
      <polygon points="230,14 250,12 240,38" fill="#36AD50" />
      <polygon points="265,11 285,10 275,35" fill="#F15A24" />
    </svg>
  );
}
