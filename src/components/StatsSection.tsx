import { useEffect, useRef, useState } from 'react';
import { api, type Stat } from '../lib/api';
import SectionHead from './SectionHead';
import Reveal from './Reveal';
import GeometricSparkles from './GeometricSparkles';

function useCountUp(target: string, run: boolean, delayMs: number = 0) {
  const [display, setDisplay] = useState(run ? '0' : target);
  const [done, setDone] = useState(!run);

  useEffect(() => {
    if (!run) return;
    const match = target.match(/^([\d,]+)(.*)$/);
    if (!match) {
      setDisplay(target);
      setDone(true);
      return;
    }
    const end = parseInt(match[1].replace(/,/g, ''), 10);
    const suffix = match[2];
    const duration = 1400;

    const timeout = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(end * eased).toLocaleString('en-IN') + suffix);
        if (p < 1) {
          requestAnimationFrame(tick);
        } else {
          setDone(true);
        }
      };
      requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      clearTimeout(timeout);
    };
  }, [run, target, delayMs]);

  return { display, done };
}

function StatCard({ stat, run, index }: { stat: Stat; run: boolean; index: number }) {
  const { display, done } = useCountUp(stat.value, run, index * 140);

  // Four distinct official brand color accents
  const styles = [
    { border: 'border-flame', text: 'text-flame', diamond: 'bg-flame', glow: 'shadow-[0_12px_28px_rgba(241,90,36,0.18)]' },
    { border: 'border-ember', text: 'text-ember', diamond: 'bg-ember', glow: 'shadow-[0_12px_28px_rgba(229,43,43,0.18)]' },
    { border: 'border-marigold', text: 'text-marigold', diamond: 'bg-marigold', glow: 'shadow-[0_12px_28px_rgba(255,201,40,0.22)]' },
    { border: 'border-leaf', text: 'text-leaf', diamond: 'bg-leaf', glow: 'shadow-[0_12px_28px_rgba(54,173,80,0.18)]' },
  ];
  const s = styles[index % styles.length];

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border-2 ${s.border} bg-white p-6 sm:p-8 shadow-sm transition-all duration-500 hover:-translate-y-1.5 ${
        done ? s.glow : ''
      }`}
    >
      {/* Top accent badge & decorative corner diamond */}
      <span className={`diamond absolute -right-3 -top-3 h-8 w-8 ${s.diamond} opacity-80`} aria-hidden="true" />
      <span className={`diamond absolute left-4 top-4 h-2 w-2 ${s.diamond}`} aria-hidden="true" />

      {/* Large animated number */}
      <p className={`display text-5xl sm:text-6xl lg:text-7xl ${s.text} tracking-tight font-extrabold transition-transform duration-300 ${
        done ? 'scale-100' : 'scale-95'
      }`}>
        {display}
      </p>

      {/* Label and descriptive text */}
      <p className="mt-3 font-head text-base sm:text-lg font-extrabold uppercase tracking-[0.16em] text-ink">
        {stat.label}
      </p>
      {stat.note && (
        <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-ink/70 font-medium">
          {stat.note}
        </p>
      )}

      {/* Bottom subtle color stripe */}
      <div className={`absolute inset-x-0 bottom-0 h-1.5 ${s.diamond}`} />
    </div>
  );
}

/** Institutional statistics — count-up runs once per page visit on a warm carnival cream foundation. */
export default function StatsSection() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [run, setRun] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.stats().then(setStats).catch(() => setStats([]));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="stats" className="relative scroll-mt-20 py-20 sm:py-28 bg-[#FFF8E8] border-b border-black/5 overflow-hidden">
      {/* Ambient background sparkles */}
      <GeometricSparkles className="absolute top-10 left-[8%] w-[85%] opacity-35 pointer-events-none" />
      <div className="pattern-dots absolute inset-0 opacity-30 pointer-events-none" />

      <div className="container-x relative z-10" ref={ref}>
        <SectionHead
          kicker="Our reach"
          title={
            <>
              A festival that <span className="text-gradient-fest">unites thousands</span>
            </>
          }
          note="The Darul Huda institutional network behind the fest — across campuses, disciplines and cultures."
        />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, i) => (
            <Reveal key={s.id} delay={i * 90}>
              <StatCard stat={s} run={run} index={i} />
            </Reveal>
          ))}
          {stats.length === 0 && (
            <div className="col-span-full py-12 text-center text-sm font-bold text-ink/40">
              Loading verified festival statistics…
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
