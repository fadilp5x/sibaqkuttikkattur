import { useEffect, useState } from 'react';
import { useReducedMotion } from '../lib/hooks';
import CyclistLandscape from './CyclistLandscape';

type Milestone = { p: number; d: number };

const PATTERNS: Milestone[][] = [
  // Pattern A: Steady with pauses (~4350ms)
  [
    { p: 18, d: 650 },
    { p: 37, d: 700 },
    { p: 37, d: 350 }, // pause
    { p: 64, d: 950 },
    { p: 64, d: 350 }, // pause
    { p: 86, d: 750 },
    { p: 100, d: 600 },
  ],
  // Pattern B: Fast start, measured middle (~4350ms)
  [
    { p: 25, d: 550 },
    { p: 48, d: 850 },
    { p: 48, d: 300 }, // pause
    { p: 72, d: 1350 },
    { p: 72, d: 350 }, // pause
    { p: 100, d: 950 },
  ],
  // Pattern C: Gradual start, energetic finish (~4400ms)
  [
    { p: 12, d: 650 },
    { p: 31, d: 850 },
    { p: 31, d: 300 }, // pause
    { p: 58, d: 1050 },
    { p: 78, d: 650 },
    { p: 78, d: 350 }, // pause
    { p: 100, d: 550 },
  ],
  // Pattern D: Multi-milestone realistic progression (~4400ms)
  [
    { p: 20, d: 600 },
    { p: 20, d: 300 }, // pause
    { p: 43, d: 750 },
    { p: 61, d: 700 },
    { p: 61, d: 350 }, // pause
    { p: 83, d: 950 },
    { p: 100, d: 750 },
  ],
];

const easeOutQuad = (t: number) => t * (2 - t);

const PHRASE = 'SOMETHING BIG IS COMING';

export default function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let unmounted = false;
    let animFrame = 0;
    let fadeTimeout: ReturnType<typeof setTimeout>;
    let doneTimeout: ReturnType<typeof setTimeout>;

    // 1. Minimum 4500ms duration (reduced motion gets 600ms)
    const minTimePromise = new Promise((resolve) => setTimeout(resolve, reduced ? 600 : 4500));

    // 2. Application ready signal
    const appReadyPromise = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        const onLoad = () => resolve();
        window.addEventListener('load', onLoad, { once: true });
        setTimeout(resolve, 8000); // Safety fallback cap
      }
    });

    // 3. Progress animation
    const animateProgress = () => {
      return new Promise<void>((resolve) => {
        if (reduced) {
          setProgress(100);
          resolve();
          return;
        }

        const pattern = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
        let currentStep = 0;
        let startVal = 0;
        let startTime = performance.now();

        const tick = (now: number) => {
          if (unmounted) return;

          if (currentStep >= pattern.length) {
            setProgress(100);
            resolve();
            return;
          }

          const step = pattern[currentStep];
          const elapsed = now - startTime;
          const t = Math.min(1, elapsed / step.d);

          const isPause = step.p === startVal;
          const easedT = isPause ? t : easeOutQuad(t);

          const currentVal = startVal + (step.p - startVal) * easedT;
          setProgress(currentVal);

          if (t >= 1) {
            startVal = step.p;
            startTime = now;
            currentStep++;
          }
          animFrame = requestAnimationFrame(tick);
        };
        animFrame = requestAnimationFrame(tick);
      });
    };

    const animPromise = animateProgress();

    // Coordinate all conditions
    Promise.all([minTimePromise, appReadyPromise, animPromise]).then(() => {
      if (unmounted) return;
      setProgress(100);
      fadeTimeout = setTimeout(() => {
        if (unmounted) return;
        onDone();
        setLeaving(true);
        doneTimeout = setTimeout(() => {
          if (unmounted) return;
          setFinished(true);
        }, reduced ? 0 : 500);
      }, 150);
    });

    return () => {
      unmounted = true;
      cancelAnimationFrame(animFrame);
      clearTimeout(fadeTimeout);
      clearTimeout(doneTimeout);
    };
  }, [reduced, onDone]);

  if (finished) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper transition-opacity duration-500 overflow-hidden px-4 py-4 sm:py-6 ${
        leaving ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* 1. Thin loading line at the top edge of viewport */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-black/5 z-20">
        <div
          className="h-full bg-gradient-to-r from-flame via-marigold to-leaf shadow-[0_0_8px_rgba(255,201,40,0.6)]"
          style={{ width: `${progress}%`, transition: 'none' }}
        />
      </div>

      <div className="pattern-dots absolute inset-0 opacity-40 pointer-events-none" />

      {/* Central unified vertical stack */}
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center justify-center gap-3 sm:gap-4 my-auto">
        
        {/* 1. Animated SIBAQ logo — positioned immediately above the cyclist landscape */}
        <div className={`transition-all duration-700 ease-out ${leaving ? '-translate-y-2 opacity-90' : 'translate-y-0 opacity-100'}`}>
          <img
            src="/media/sibaq-preloader.svg"
            alt="SIBAQ National Arts Fest"
            className="h-10 sm:h-12 md:h-14 w-auto max-w-[80vw] object-contain drop-shadow-sm select-none"
          />
        </div>

        {/* 2. Animated Cyclist Landscape (Natural 920:620 aspect ratio) */}
        <div className={`w-full max-w-[min(94vw,700px)] flex items-center justify-center transition-all duration-700 ease-out ${leaving ? 'scale-[1.01]' : 'scale-100'}`}>
          <div className="w-full aspect-[920/620] max-h-[min(48vh,380px)] flex items-center justify-center">
            <CyclistLandscape className="w-full h-full" />
          </div>
        </div>

        {/* 3. Text: SOMETHING BIG IS COMING with subtle letter-by-letter reveal */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 px-4 text-center">
          {PHRASE.split('').map((char, index) => {
            const letterProgress = (index / PHRASE.length) * 80;
            const isRevealed = progress >= letterProgress || reduced;
            return (
              <span
                key={index}
                className={`font-display text-base sm:text-xl md:text-2xl tracking-[0.16em] uppercase font-extrabold transition-all duration-300 ${
                  char === ' ' ? 'w-2 sm:w-3' : ''
                } ${
                  isRevealed
                    ? 'opacity-100 translate-y-0 text-gradient-fest'
                    : 'opacity-20 translate-y-1 text-ink/30'
                }`}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* 4. Progress information and percentage counter */}
        <div className="flex flex-col items-center gap-2 sm:gap-2.5 mt-1 sm:mt-2">
          {/* Progress Bar */}
          <div className="h-[3px] sm:h-[4px] w-44 sm:w-60 max-w-[75vw] overflow-hidden rounded-full bg-black/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-flame via-marigold to-leaf transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Percentage */}
          <div className="flex items-center gap-2">
            <span className="diamond h-1.5 w-1.5 bg-flame" aria-hidden="true" />
            <p className="font-display text-sm sm:text-base tracking-[0.2em] text-ink/80 tabular-nums font-bold">
              {Math.round(progress)}%
            </p>
            <span className="diamond h-1.5 w-1.5 bg-leaf" aria-hidden="true" />
          </div>
        </div>

      </div>
    </div>
  );
}
