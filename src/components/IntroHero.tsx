import { useEffect, useRef, useState, useCallback } from 'react';
import { useSite } from '../lib/site';
import { useReducedMotion } from '../lib/hooks';
import GeometricSparkles from './GeometricSparkles';

const SLIDES = [
  'https://i.ibb.co/TqpjC0tN/WhatsApp-Image-2026-10-11-at-2-43-06-AM-1.jpg',
  'https://i.ibb.co/zhvKf7S5/WhatsApp-Image-2026-10-11-at-2-43-05-AM.jpg',
  'https://i.ibb.co/ZzZXgT8D/WhatsApp-Image-2026-10-11-at-2-43-06-AM.jpg',
  'https://i.ibb.co/RpxymHtY/WhatsApp-Image-2026-10-11-at-2-43-07-AM.jpg',
  'https://i.ibb.co/mLJ8L0c/image.png',
];

const SLIDE_DURATION = 5000;
const FADE_DURATION = 800;

function preloadImage(src: string) {
  const img = new Image();
  img.src = src;
}

export default function IntroHero() {
  const site = useSite();
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(reduced ? 3 : 0);
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const interacted = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Phase animation
  useEffect(() => {
    if (reduced) return;
    const t = timers.current;
    const add = (fn: () => void, ms: number) => t.push(setTimeout(fn, ms));
    add(() => setPhase(1), 400);
    add(() => setPhase(2), 1200);
    add(() => setPhase(3), 2200);
    return () => t.forEach(clearTimeout);
  }, [reduced]);

  // Slideshow
  useEffect(() => {
    if (reduced) return;
    const next = (current + 1) % SLIDES.length;
    preloadImage(SLIDES[next]);
    const t = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent(next);
        setFading(false);
      }, FADE_DURATION);
    }, SLIDE_DURATION);
    return () => clearTimeout(t);
  }, [current, reduced]);

  // Cancel auto-scroll on interaction
  useEffect(() => {
    const cancel = () => { interacted.current = true; };
    const opts = { passive: true, once: true } as const;
    window.addEventListener('wheel', cancel, opts);
    window.addEventListener('touchstart', cancel, opts);
    window.addEventListener('keydown', cancel, opts);
    return () => {
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
      window.removeEventListener('keydown', cancel);
    };
  }, []);

  const skip = useCallback(() => {
    document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const hero = site?.hero;
  const s = site?.site;

  return (
    <section id="intro" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Slideshow background */}
      <div className="absolute inset-0">
        {SLIDES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity"
            style={{
              opacity: i === current ? (fading ? 0 : 1) : 0,
              transitionDuration: `${FADE_DURATION}ms`,
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
              style={{
                filter: 'grayscale(1) contrast(1.1) brightness(0.85)',
                objectPosition: i === 0 ? 'center 30%' : 'center 40%',
              }}
              loading={i === 0 ? 'eager' : 'lazy'}
              {...(i === 0 ? { fetchpriority: 'high' } : {})}
            />
          </div>
        ))}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        {/* Bottom white gradient mask */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      {/* Decorative geometric field */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <GeometricSparkles className="absolute right-0 sm:right-10 top-20 w-[150%] sm:w-full opacity-60" />
        <GeometricSparkles className="absolute left-[-20%] sm:left-[-10%] top-[40%] w-[120%] opacity-40 scale-[-1]" />
      </div>

      <div className="container-x relative z-10 flex flex-1 flex-col items-center justify-center gap-6 pb-24 pt-24 text-center">
        {/* Phase 1 — kicker */}
        {phase >= 1 && (
          <div className="animate-fade-up flex items-center gap-3">
            <span className="diamond h-2 w-2 bg-flame" />
            <p className="font-head text-[11px] font-extrabold uppercase tracking-[0.3em] text-white/90">
              {s?.edition ?? 'National Arts Fest'}
            </p>
            <span className="diamond h-2 w-2 bg-flame" />
          </div>
        )}

        {/* Phase 2 */}
        <h1 className={`display ${phase >= 2 ? 'animate-pop' : 'opacity-0'} text-[25vw] leading-[0.9] sm:text-9xl`}>
          <span className="text-gradient-fest block drop-shadow-[0_0_35px_rgba(240,74,36,0.45)]">SIBAQ</span>
        </h1>

        {/* Phase 3 */}
        {phase >= 3 && (
          <>
            <p className="animate-fade-up max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
              {hero?.line ?? 'The National Arts Fest of Darul Huda Islamic University.'}
            </p>

            <div className="animate-fade-up relative w-full max-w-md">
              <div
                className="absolute -inset-1.5 rounded-[2rem] bg-gradient-to-r from-flame/50 via-marigold/40 to-leaf/40 opacity-70 blur-sm"
                aria-hidden="true"
              />
              <div className="relative aspect-video overflow-hidden rounded-[1.8rem] shadow-2xl">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/gBnLyPDYVpc?autoplay=1&mute=1&controls=0&playsinline=1&rel=0&modestbranding=1&loop=1&playlist=gBnLyPDYVpc"
                  title="SIBAQ 2K26 Official Video"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 gap-2" aria-hidden="true">
                <span className="diamond h-3 w-3 bg-marigold" />
                <span className="diamond h-3 w-3 bg-flame" />
                <span className="diamond h-3 w-3 bg-leaf" />
              </div>
            </div>
          </>
        )}

        {/* Date / venue chips */}
        {phase >= 3 && (
          <div className="animate-fade-up flex flex-wrap items-center justify-center gap-2.5 mt-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-white/90 px-4 py-2 text-xs font-bold tracking-wide text-ink shadow-sm">
              <span className="diamond h-1.5 w-1.5 bg-flame" aria-hidden="true" />
              November 20–22, 2026
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-marigold/40 bg-white/90 px-4 py-2 text-xs font-bold tracking-wide text-ink shadow-sm">
              <span className="diamond h-1.5 w-1.5 bg-marigold" aria-hidden="true" />
              Mavoor–Kozhikode Road, Kuttikkattur
            </span>
          </div>
        )}
      </div>

      {/* Scroll cue + skip */}
      <div className="container-x relative bottom-8 z-10 flex items-center justify-between">
        <a
          href="#stats"
          className="group flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-marigold"
        >
          <span className="flex h-9 w-6 items-start justify-center rounded-full border border-current p-1.5">
            <span className="h-2 w-1 animate-bounce rounded-full bg-current" />
          </span>
          Scroll
        </a>
        <button
          onClick={skip}
          className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-flame"
        >
          Skip intro ↓
        </button>
      </div>
    </section>
  );
}
