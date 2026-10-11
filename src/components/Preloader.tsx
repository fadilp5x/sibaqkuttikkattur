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

// Easing function for smooth number transitions (easeOutQuad)
const easeOutQuad = (t: number) => t * (2 - t);

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

    // 1. Minimum 4500ms duration (reduced motion gets a concise 600ms courtesy transition)
    const minTimePromise = new Promise((resolve) => setTimeout(resolve, reduced ? 600 : 4500));

    // 2. Application ready signal
    const appReadyPromise = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        const onLoad = () => resolve();
        window.addEventListener('load', onLoad, { once: true });
        // Fallback safety cap so visitor is never trapped if load event is missed
        setTimeout(resolve, 8000);
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
          
          // Only apply easing if we are actually progressing (not paused)
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

    // Coordinate all three conditions:
    // Minimum 4.5 seconds elapsed AND progress animation complete AND application ready
    Promise.all([minTimePromise, appReadyPromise, animPromise]).then(() => {
      if (unmounted) return;
      setProgress(100); // Ensure exactly 100%
      // Brief hold before fading out
      fadeTimeout = setTimeout(() => {
        if (unmounted) return;
        onDone();
        setLeaving(true);
        doneTimeout = setTimeout(() => {
          if (unmounted) return;
          setFinished(true);
        }, reduced ? 0 : 500); // 500ms fade transition
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
      {/* 1. Top thin loading line at the very top of viewport */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-black/5 z-20">
        <div 
          className="h-full bg-gradient-to-r from-flame via-marigold to-leaf shadow-[0_0_8px_rgba(255,201,40,0.6)]"
          style={{ width: `${progress}%`, transition: 'none' }}
        />
      </div>

      <div className="pattern-dots absolute inset-0 opacity-40 pointer-events-none" />
      
      {/* Vertically stacked composition */}
      <div className="relative z-10 flex h-full max-h-[100svh] w-full max-w-4xl flex-col items-center justify-between sm:justify-center gap-3 sm:gap-4 md:gap-5 my-auto">
        
        {/* TOP: Existing animated SIBAQ logo */}
        <div className={`flex-shrink-0 transition-transform duration-700 ease-out ${leaving ? '-translate-y-3 opacity-90' : 'translate-y-0 opacity-100'}`}>
          <img
            src="/media/sibaq-preloader.svg"
            alt="SIBAQ National Arts Fest"
            className="h-11 sm:h-14 md:h-16 w-auto max-w-[85vw] object-contain drop-shadow-sm select-none"
          />
        </div>

        {/* MIDDLE: Animated cyclist landscape (natural 920:620 aspect ratio) */}
        <div className={`w-full max-w-[min(94vw,760px)] flex-1 min-h-0 max-h-[min(56vh,480px)] flex items-center justify-center transition-transform duration-700 ease-out ${leaving ? 'scale-[1.02]' : 'scale-100'}`}>
          <div className="w-full h-full aspect-[920/620] max-h-full flex items-center justify-center">
            <CyclistLandscape className="w-full h-full" />
          </div>
        </div>
        
        {/* BOTTOM: Loading progress & animated percentage counter */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2.5 sm:gap-3">
          {/* Progress Bar */}
          <div className="h-[3px] sm:h-[4px] w-48 sm:w-64 max-w-[75vw] overflow-hidden rounded-full bg-black/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-flame via-marigold to-leaf transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Animated Percentage */}
          <div className="flex items-center gap-2">
            <span className="diamond h-1.5 w-1.5 bg-flame" aria-hidden="true" />
            <p className="font-display text-base sm:text-lg tracking-[0.2em] text-ink/80 tabular-nums font-bold">
              {Math.round(progress)}%
            </p>
            <span className="diamond h-1.5 w-1.5 bg-leaf" aria-hidden="true" />
          </div>
        </div>

      </div>
    </div>
  );
}
