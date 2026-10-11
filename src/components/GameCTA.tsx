import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSite } from '../lib/site';
import Reveal from './Reveal';
import FestivalPass from './FestivalPass';
import GameEntranceOverlay from './GameEntranceOverlay';

function daysUntilFest(): number | null {
  const fest = new Date('2026-11-20T00:00:00');
  const diff = Math.ceil((fest.getTime() - Date.now()) / 86_400_000);
  return diff >= 0 ? diff : null;
}

/** Home game call-to-action — "Ready to PLAY?" */
export default function GameCTA() {
  const site = useSite();
  const navigate = useNavigate();
  const days = daysUntilFest();
  const [isEntering, setIsEntering] = useState(false);

  const handleLaunchGame = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEntering(true);
  };

  return (
    <>
      {/* Full-screen Portal Entrance Transition Overlay */}
      <GameEntranceOverlay
        isOpen={isEntering}
        onComplete={() => {
          setIsEntering(false);
          navigate('/game');
        }}
      />

      <Reveal>
        <section className="container-x py-10 relative">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-ember via-flame to-ember p-8 sm:p-12 shadow-[0_20px_50px_rgba(241,90,36,0.28)] ring-2 ring-marigold/30 text-white">
            {/* Internal ambient pattern */}
            <div className="pattern-dots absolute inset-0 opacity-25 pointer-events-none" />
            
            {/* Animated decorative geometric rings and diamonds */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full border-[10px] border-white/10 animate-spin-slow"
            />
            <span className="diamond absolute right-12 bottom-6 h-6 w-6 bg-marigold/40 animate-floaty" aria-hidden="true" />
            <span className="diamond absolute left-8 top-6 h-3 w-3 bg-leaf/60" aria-hidden="true" />

            <div className="relative z-10 flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.25em] text-marigold">
                  <span className="diamond h-1.5 w-1.5 bg-marigold animate-pulse" />
                  Daily Quiz · Live Every Day
                </div>

                <h2 className="display mt-3 text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[0.95]">
                  Ready to <span className="text-marigold drop-shadow-[0_0_20px_rgba(255,201,40,0.6)]">PLAY?</span>
                </h2>

                <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/90 font-medium">
                  {site?.game.voucherLine ?? 'Answer today’s question correctly as fast as you can. Lead the daily leaderboard and earn exciting Edumart vouchers!'}
                </p>

                {days !== null && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-white shadow-sm backdrop-blur-sm">
                    <span className="diamond h-1.5 w-1.5 bg-leaf" />
                    Festival countdown: {days} {days === 1 ? 'day' : 'days'} remaining
                  </div>
                )}
              </div>

              {/* Autonomous Animated Festival Pass Motif */}
              <div className="w-52 sm:w-60 lg:w-64 h-32 sm:h-36 shrink-0 my-2 lg:my-0 self-center">
                <FestivalPass className="w-full h-full drop-shadow-2xl" />
              </div>

              <button
                type="button"
                onClick={handleLaunchGame}
                className="group relative flex shrink-0 items-center gap-3 rounded-2xl bg-white px-9 py-5 font-head text-base font-extrabold uppercase tracking-[0.18em] text-flame shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-cream hover:shadow-[0_15px_35px_rgba(0,0,0,0.35)] active:scale-95"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-flame text-white shadow-md transition-transform group-hover:scale-110">
                  <svg width="14" height="16" viewBox="0 0 22 24" fill="none" aria-hidden="true" className="ml-0.5">
                    <path d="M21 12L0.5 23.25V0.75L21 12Z" fill="currentColor" />
                  </svg>
                </span>
                <span>Play & Win Now</span>
              </button>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}
