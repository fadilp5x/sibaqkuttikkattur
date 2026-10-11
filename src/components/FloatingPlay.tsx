import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useReducedMotion } from '../lib/hooks';
import GameEntranceOverlay from './GameEntranceOverlay';

export default function FloatingPlay() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const [isEntering, setIsEntering] = useState(false);

  if (pathname.startsWith('/game') || pathname.startsWith('/admin')) return null;

  return (
    <>
      <GameEntranceOverlay
        isOpen={isEntering}
        onComplete={() => {
          setIsEntering(false);
          navigate('/game');
        }}
      />
      <button
        type="button"
        onClick={() => setIsEntering(true)}
        aria-label="Play Game"
        className="group fixed bottom-6 right-4 z-40 flex items-center gap-3 animate-fade-up outline-none focus-visible:ring-4 focus-visible:ring-flame rounded-full cursor-pointer"
        style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
      {/* PLAY GAME label card */}
      <div className="hidden sm:flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-flame to-marigold px-5 font-head text-sm font-extrabold tracking-[0.1em] text-white shadow-lg shadow-flame/20 transition-transform duration-300 group-hover:-translate-x-1">
        PLAY GAME
      </div>

      {/* Spinning Wheel Control */}
      <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 drop-shadow-xl transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
        <svg
          className="h-full w-full"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Outer rotating wheel with 8 slices */}
          <g className={reduced ? '' : 'origin-center animate-spin-slow'} style={{ animationDuration: '6s' }}>
            {/* Slice 1: Red */}
            <path d="M 100,100 L 100,10 A 90,90 0 0,1 163.64,36.36 Z" fill="#E52B2B" />
            {/* Slice 2: Yellow */}
            <path d="M 100,100 L 163.64,36.36 A 90,90 0 0,1 190,100 Z" fill="#FFC928" />
            {/* Slice 3: Orange */}
            <path d="M 100,100 L 190,100 A 90,90 0 0,1 163.64,163.64 Z" fill="#F15A24" />
            {/* Slice 4: Green */}
            <path d="M 100,100 L 163.64,163.64 A 90,90 0 0,1 100,190 Z" fill="#36AD50" />
            {/* Slice 5: Red */}
            <path d="M 100,100 L 100,190 A 90,90 0 0,1 36.36,163.64 Z" fill="#E52B2B" />
            {/* Slice 6: Yellow */}
            <path d="M 100,100 L 36.36,163.64 A 90,90 0 0,1 10,100 Z" fill="#FFC928" />
            {/* Slice 7: Orange */}
            <path d="M 100,100 L 10,100 A 90,90 0 0,1 36.36,36.36 Z" fill="#F15A24" />
            {/* Slice 8: Green */}
            <path d="M 100,100 L 36.36,36.36 A 90,90 0 0,1 100,10 Z" fill="#36AD50" />
            {/* Outer white rim bulbs */}
            <circle cx="100" cy="18" r="4" fill="#FFFFFF" />
            <circle cx="158" cy="42" r="4" fill="#FFFFFF" />
            <circle cx="182" cy="100" r="4" fill="#FFFFFF" />
            <circle cx="158" cy="158" r="4" fill="#FFFFFF" />
            <circle cx="100" cy="182" r="4" fill="#FFFFFF" />
            <circle cx="42" cy="158" r="4" fill="#FFFFFF" />
            <circle cx="18" cy="100" r="4" fill="#FFFFFF" />
            <circle cx="42" cy="42" r="4" fill="#FFFFFF" />
            <circle cx="100" cy="100" r="88" stroke="#FFC928" strokeWidth="4" />
          </g>
          {/* Central Stable Red Play Core */}
          <g className={reduced ? '' : 'origin-center transition-transform duration-300'}>
            <circle cx="100" cy="100" r="45" fill="#E52B2B" stroke="#FFFFFF" strokeWidth="4" />
            <polygon points="94,84 116,100 94,116" fill="#FFFFFF" />
          </g>
        </svg>
      </div>
      </button>
    </>
  );
}
