import { useReducedMotion } from '../lib/hooks';
import Reveal from './Reveal';

export default function ThankYouSection({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <section
      id="thank-you"
      className={`relative w-full overflow-hidden bg-gradient-to-br from-[#F15A24] via-[#E52B2B] to-[#991B1B] py-24 sm:py-32 text-white text-center ${className}`}
    >
      {/* Background festive glow & geometric motes */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-marigold/20 via-transparent to-black/30 pointer-events-none" />
      <div className="pattern-dots absolute inset-0 opacity-20 pointer-events-none" />

      {/* Floating ambient diamonds */}
      {!reduced && (
        <>
          <span className="diamond absolute left-10 top-16 h-4 w-4 bg-marigold/60 animate-floaty" />
          <span className="diamond absolute right-12 top-24 h-5 w-5 bg-leaf/60 animate-floaty" style={{ animationDelay: '0.8s' }} />
          <span className="diamond absolute left-1/4 bottom-16 h-3 w-3 bg-white/40 animate-floaty" style={{ animationDelay: '1.4s' }} />
          <span className="diamond absolute right-1/4 bottom-20 h-4 w-4 bg-marigold/50 animate-floaty" style={{ animationDelay: '2.1s' }} />
        </>
      )}

      <div className="container-x relative z-10 mx-auto max-w-4xl px-6">
        <Reveal>
          <div className="flex flex-col items-center">
            
            {/* 1. Geometric Crest & Official Festival Logo */}
            <div className="relative mb-8 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center">
              {/* Rotating outer diamond ring */}
              <div
                className={`absolute inset-0 rotate-45 rounded-3xl border-2 border-marigold/50 bg-white/10 backdrop-blur-md shadow-2xl ${
                  reduced ? '' : 'animate-pulse-slow'
                }`}
              />
              <div className="relative z-10 p-4">
                <img
                  src="/media/sibaq-logo.svg"
                  alt="SIBAQ '26 Official Emblem"
                  className="h-14 sm:h-16 w-auto object-contain drop-shadow-md invert brightness-200"
                />
              </div>
            </div>

            {/* 2. Main Heading: "Thank you." */}
            <h2 className="display text-6xl sm:text-7xl md:text-8xl tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
              Thank you<span className="text-marigold">.</span>
            </h2>

            {/* 3. Supporting Copy */}
            <div className="mt-6 flex flex-col items-center gap-1.5 font-head font-extrabold uppercase tracking-[0.25em] text-[#FFF8E8] text-sm sm:text-base md:text-lg">
              <span className="opacity-90">FOR CONSIDERING</span>
              <span className="opacity-90">A PARTNERSHIP WITH</span>
              <span className="mt-1 text-marigold text-base sm:text-xl md:text-2xl tracking-[0.3em] font-black drop-shadow-sm">
                SIBAQ '26
              </span>
            </div>

            {/* Decorative Divider */}
            <div className="my-8 flex items-center justify-center gap-3">
              <span className="h-[1px] w-16 bg-white/30" />
              <span className="diamond h-2 w-2 bg-marigold shadow-md" />
              <span className="diamond h-3 w-3 bg-white shadow-md" />
              <span className="diamond h-2 w-2 bg-leaf shadow-md" />
              <span className="h-[1px] w-16 bg-white/30" />
            </div>

            {/* 4. Official Institutional Endorsement */}
            <div className="rounded-2xl border border-white/20 bg-black/20 px-6 py-4 backdrop-blur-md max-w-lg">
              <p className="font-head text-[11px] font-extrabold uppercase tracking-widest text-marigold">
                Organizing Institution & Leadership
              </p>
              <p className="mt-1 text-sm font-bold text-white">
                Shamsul Huda Islamic Academy · Kuttikkattur, Kozhikode
              </p>
              <p className="mt-0.5 text-xs text-white/75 font-medium">
                Affiliated with Darul Huda Islamic University, Chemmad
              </p>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
