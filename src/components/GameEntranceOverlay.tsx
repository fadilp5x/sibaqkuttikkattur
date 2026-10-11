import { useEffect, useState } from 'react';
import { useReducedMotion } from '../lib/hooks';
import { playSynthBeep } from '../lib/synthAudio';

interface Props {
  isOpen: boolean;
  onComplete: () => void;
}

export default function GameEntranceOverlay({ isOpen, onComplete }: Props) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      return;
    }

    playSynthBeep('jackpot');

    const duration = reduced ? 400 : 2000;
    const intervalTime = 30;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 350);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isOpen, onComplete, reduced]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F1014]/95 backdrop-blur-2xl transition-opacity duration-300"
      aria-modal="true"
      role="dialog"
      aria-label="Entering Game Arena"
    >
      {/* Left Opening Velvet Curtain */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#7F1D1D] via-[#DC2626] to-[#991B1B] border-r-4 border-[#FFC928] shadow-2xl flex items-center justify-end pr-6 ${
          reduced ? 'opacity-0' : 'curtain-anim-left'
        }`}
      >
        <div className="text-right space-y-1">
          <span className="text-3xl text-amber-300">🎪</span>
          <div className="font-head font-black text-amber-200 text-sm tracking-widest uppercase">SIBAQ</div>
        </div>
      </div>

      {/* Right Opening Velvet Curtain */}
      <div
        className={`absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#7F1D1D] via-[#DC2626] to-[#991B1B] border-l-4 border-[#FFC928] shadow-2xl flex items-center justify-start pl-6 ${
          reduced ? 'opacity-0' : 'curtain-anim-right'
        }`}
      >
        <div className="text-left space-y-1">
          <span className="text-3xl text-amber-300">🎯</span>
          <div className="font-head font-black text-amber-200 text-sm tracking-widest uppercase">ARENA</div>
        </div>
      </div>

      {/* Center Concentric Entrance Spinner SVG */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center animate-fade-up">
        <svg
          className="w-64 h-64 sm:w-72 sm:h-72 drop-shadow-[0_0_40px_rgba(241,90,36,0.6)]"
          viewBox="0 0 300 300"
          fill="none"
          aria-hidden="true"
        >
          {/* Orbiting Nodes Ring */}
          <g className={reduced ? '' : 'anim-spin-ring-1'}>
            <circle cx="150" cy="150" r="126" stroke="#FFC928" strokeWidth="8" strokeDasharray="24 16" />
            <circle cx="150" cy="150" r="126" stroke="#E52B2B" strokeWidth="8" strokeDasharray="16 24" strokeDashoffset="12" />
            <circle cx="150" cy="24" r="8" fill="#36AD50" />
            <circle cx="276" cy="150" r="8" fill="#FFC928" />
            <circle cx="150" cy="276" r="8" fill="#E52B2B" />
            <circle cx="24" cy="150" r="8" fill="#F15A24" />
          </g>
          {/* Middle Cog Ring */}
          <g className={reduced ? '' : 'anim-spin-ring-2'}>
            <circle cx="150" cy="150" r="84" stroke="#F15A24" strokeWidth="10" strokeDasharray="14 12" />
            <circle cx="150" cy="150" r="84" stroke="#FFE07A" strokeWidth="4" strokeDasharray="6 20" />
          </g>
          {/* Inner Core Star Burst */}
          <circle cx="150" cy="150" r="50" fill="#181A20" stroke="#FFC928" strokeWidth="4" />
          <polygon points="150,110 160,140 190,150 160,160 150,190 140,160 110,150 140,140" fill="#FFC928" />
          <circle cx="150" cy="150" r="10" fill="#E52B2B" />
        </svg>

        <h3 className="mt-6 font-head font-black text-xl sm:text-2xl text-white tracking-widest uppercase drop-shadow-md">
          ENTERING THE SIBAQ ARENA
        </h3>
        <p className="mt-1 text-xs text-amber-300/80 font-mono tracking-wider">
          Get ready to play · Kuttikkattur '26
        </p>

        {/* Thin Progress Rail */}
        <div className="mt-5 h-2 w-56 overflow-hidden rounded-full bg-white/10 border border-white/20">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#E52B2B] via-[#FFC928] to-[#36AD50] transition-all duration-75"
            style={{ width: `${Math.round(progress)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
