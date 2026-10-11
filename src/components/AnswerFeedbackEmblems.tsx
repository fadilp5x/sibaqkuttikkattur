import { useReducedMotion } from '../lib/hooks';

export function CorrectEmblem({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <div className={`relative ${className}`}>
      {/* Particle burst */}
      {!reduced && (
        <div className="absolute inset-0 animate-ping rounded-full bg-leaf/40" style={{ animationIterationCount: 1, animationDuration: '600ms' }} />
      )}
      <svg className={`h-full w-full ${reduced ? '' : 'animate-pop'}`} viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Correct answer">
        <circle cx="40" cy="25" r="18" fill="#36AD50" stroke="#FFFFFF" strokeWidth="2.5" />
        <path d="M 31,25 L 37,31 L 49,19" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function IncorrectEmblem({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <div className={`relative ${className}`}>
      <svg className={`h-full w-full ${reduced ? '' : 'animate-shake'}`} viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Incorrect answer">
        <circle cx="120" cy="25" r="18" fill="#E52B2B" stroke="#FFFFFF" strokeWidth="2.5" />
        <path d="M 112,17 L 128,33 M 128,17 L 112,33" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
