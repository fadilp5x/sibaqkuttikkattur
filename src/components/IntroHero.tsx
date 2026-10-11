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
const FADE_DURATION = 900;

function preloadImage(src: string) {
  const img = new Image();
  img.src = src;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  dist: number;
}

export default function IntroHero() {
  const site = useSite();
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(reduced ? 3 : 0);
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [bursting, setBursting] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const interacted = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Phase animation
  useEffect(() => {
    if (reduced) return;
    const t = timers.current;
    const add = (fn: () => void, ms: number) => t.push(setTimeout(fn, ms));
    add(() => setPhase(1), 350);
    add(() => setPhase(2), 950);
    add(() => setPhase(3), 1800);
    return () => t.forEach(clearTimeout);
  }, [reduced]);

  // Cinematic Slideshow with Black Transition
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

  // Audio Toggle for YouTube IFrame
  const toggleAudio = () => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    const nextMuted = !isMuted;
    const command = nextMuted ? 'mute' : 'unMute';
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func: command, args: '' }),
      '*'
    );
    setIsMuted(nextMuted);
  };

  // Interactive Headline Celebration Burst
  const triggerCelebration = () => {
    if (bursting) return;
    setBursting(true);
    const colors = ['#F15A24', '#FFC928', '#E52B2B', '#36AD50', '#FFF8E8'];
    const newParticles: Particle[] = Array.from({ length: 24 }).map((_, i) => ({
      id: Date.now() + i,
      x: 0,
      y: 0,
      color: colors[i % colors.length],
      size: Math.random() * 6 + 6,
      angle: (i / 24) * 360 + Math.random() * 15,
      dist: Math.random() * 120 + 70,
    }));
    setParticles(newParticles);
    setTimeout(() => {
      setBursting(false);
      setParticles([]);
    }, 1400);
  };

  const hero = site?.hero;
  const s = site?.site;

  const MARQUEE_ITEMS = [
    'TALENT',
    'ART',
    'CULTURE',
    'KNOWLEDGE',
    'NATIONAL ARTS FEST',
  ];

  return (
    <section id="intro" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-black">
      {/* 1. Cinematic Background Slideshow (Fades to black between slides) */}
      <div className="absolute inset-0 bg-black">
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
              className={`h-full w-full object-cover transition-transform duration-[6000ms] ${
                i === current && !reduced ? 'scale-105' : 'scale-100'
              }`}
              style={{
                filter: 'grayscale(0.9) contrast(1.15) brightness(0.72)',
                objectPosition: i === 0 ? 'center 30%' : 'center 40%',
              }}
              loading={i === 0 ? 'eager' : 'lazy'}
              {...(i === 0 ? { fetchpriority: 'high' } : {})}
            />
          </div>
        ))}
        {/* Cinematic dark gradients for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/85" />
        {/* Soft bottom mask into next section */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* Decorative geometric sparkle ambient fields */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <GeometricSparkles className="absolute right-0 sm:right-10 top-24 w-[140%] sm:w-full opacity-40" />
        <GeometricSparkles className="absolute left-[-20%] sm:left-[-10%] top-[45%] w-[120%] opacity-30 scale-[-1]" />
      </div>

      {/* 2. Top Marquee Banner (Below site header, above hero headline) */}
      <div className="relative z-20 mt-16 sm:mt-18 border-y border-white/10 bg-gradient-to-r from-ember via-flame to-ember py-2 text-white shadow-lg overflow-hidden">
        <div className="flex w-max whitespace-nowrap animate-marquee">
          {[0, 1].map((half) => (
            <div key={half} className="flex items-center gap-6 px-3">
              {MARQUEE_ITEMS.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <span className="font-display text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-white">
                    {item}
                  </span>
                  <span className="diamond h-2 w-2 bg-marigold shadow-[0_0_8px_#FFC928]" aria-hidden="true" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Hero Container */}
      <div className="container-x relative z-10 flex flex-1 flex-col items-center justify-center gap-6 pb-20 pt-10 text-center">
        
        {/* Phase 1 — Kicker */}
        {phase >= 1 && (
          <div className="animate-fade-up flex items-center gap-3">
            <span className="diamond h-2 w-2 bg-flame animate-pulse" />
            <p className="font-head text-[11px] font-extrabold uppercase tracking-[0.3em] text-white/90">
              {s?.edition ?? '11th Biennial Edition · National Arts Fest'}
            </p>
            <span className="diamond h-2 w-2 bg-flame animate-pulse" />
          </div>
        )}

        {/* Phase 2 — Interactive SIBAQ Headline */}
        <div className="relative">
          <button
            onClick={triggerCelebration}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                triggerCelebration();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Celebrate SIBAQ 2K26"
            className={`group relative display block cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-marigold rounded-2xl ${
              phase >= 2 ? 'animate-pop' : 'opacity-0'
            }`}
          >
            <h1 className="text-[26vw] leading-[0.88] sm:text-9xl md:text-[10.5rem] tracking-tight">
              <span className="text-gradient-fest block drop-shadow-[0_0_45px_rgba(240,74,36,0.6)] group-hover:brightness-110 transition-all">
                SIBAQ
              </span>
            </h1>
            <span className="mt-1 block font-head text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-marigold/80 opacity-0 group-hover:opacity-100 transition-opacity">
              ✦ Click to celebrate ✦
            </span>
          </button>

          {/* Confetti Celebration Particle Burst */}
          {bursting && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-30" aria-hidden="true">
              {particles.map((p) => {
                const rad = (p.angle * Math.PI) / 180;
                const tx = Math.cos(rad) * p.dist;
                const ty = Math.sin(rad) * p.dist;
                return (
                  <span
                    key={p.id}
                    className="absolute diamond rounded-[1px] animate-fade-out"
                    style={{
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      backgroundColor: p.color,
                      transform: `translate(${tx}px, ${ty}px) rotate(${p.angle}deg)`,
                      transition: 'transform 1.2s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 1.2s ease-out',
                      boxShadow: `0 0 10px ${p.color}`,
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Phase 3 — Line + Video Player + Controls */}
        {phase >= 3 && (
          <>
            <p className="animate-fade-up max-w-lg text-sm leading-relaxed text-white/85 sm:text-base font-medium">
              {hero?.line ?? 'The National Arts Fest of Darul Huda Islamic University — a national stage where talent meets tradition.'}
            </p>

            {/* Video Player Container */}
            <div className="animate-fade-up relative w-full max-w-md sm:max-w-lg">
              <div
                className="absolute -inset-1.5 rounded-[2rem] bg-gradient-to-r from-flame/60 via-marigold/50 to-leaf/50 opacity-75 blur-md"
                aria-hidden="true"
              />
              <div className="relative aspect-video overflow-hidden rounded-[1.8rem] bg-black shadow-2xl border border-white/10">
                <iframe
                  ref={iframeRef}
                  src="https://www.youtube-nocookie.com/embed/gBnLyPDYVpc?autoplay=1&mute=1&controls=0&playsinline=1&rel=0&modestbranding=1&loop=1&playlist=gBnLyPDYVpc&enablejsapi=1"
                  title="SIBAQ 2K26 Official Video"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                />

                {/* Accessible Audio Toggle Button */}
                <button
                  onClick={toggleAudio}
                  aria-label={isMuted ? 'Turn video audio on' : 'Mute video audio'}
                  className="group/btn absolute bottom-3 right-3 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-3.5 py-1.5 text-xs font-bold text-white shadow-xl backdrop-blur-md transition-all hover:bg-black/90 hover:border-marigold"
                >
                  {isMuted ? (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-marigold">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                      </svg>
                      <span className="font-head text-[11px] tracking-wide text-white/90">Sound On</span>
                    </>
                  ) : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-leaf animate-pulse">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                      <span className="font-head text-[11px] tracking-wide text-white/90">Playing 🔊</span>
                    </>
                  )}
                </button>
              </div>

              {/* Decorative base diamonds */}
              <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 gap-2" aria-hidden="true">
                <span className="diamond h-3 w-3 bg-marigold" />
                <span className="diamond h-3 w-3 bg-flame" />
                <span className="diamond h-3 w-3 bg-leaf" />
              </div>
            </div>

            {/* Restyled Date & Venue Chips */}
            <div className="animate-fade-up flex flex-wrap items-center justify-center gap-3 mt-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-flame/50 bg-cream/95 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wide text-ink shadow-lg">
                <span className="diamond h-2 w-2 bg-flame" aria-hidden="true" />
                November 20–22, 2026
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-marigold/50 bg-cream/95 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wide text-ink shadow-lg">
                <span className="diamond h-2 w-2 bg-marigold" aria-hidden="true" />
                Mavoor–Kozhikode Road, Kuttikkattur
              </span>
            </div>

            {/* 3.6 Co-Powered by Edumart Endorsement in Bottom Transition Area */}
            <div className="animate-fade-up mt-4 flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 backdrop-blur-sm shadow-md">
              <span className="font-head text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.25em] text-white/70">
                Co-powered by
              </span>
              <img
                src="https://i.ibb.co/Z6mMFk2s/edumart-perinthalmanna-malappuram-supermarkets-ihbbosyt34.jpg"
                alt="Edumart"
                className="h-6 sm:h-7 w-auto rounded object-contain bg-white px-1.5 py-0.5 shadow-sm"
              />
            </div>
          </>
        )}
      </div>

      {/* Scroll cue + skip */}
      <div className="container-x relative bottom-6 z-10 flex items-center justify-between">
        <a
          href="#stats"
          className="group flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.25em] text-white/70 transition-colors hover:text-marigold"
        >
          <span className="flex h-9 w-6 items-start justify-center rounded-full border border-current p-1.5">
            <span className="h-2 w-1 animate-bounce rounded-full bg-current" />
          </span>
          Scroll
        </a>
        <button
          onClick={skip}
          className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-flame"
        >
          Skip intro ↓
        </button>
      </div>
    </section>
  );
}
