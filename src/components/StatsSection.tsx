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
  const { display, done } = useCountUp(stat.value, run, index * 150);
  
  // Use a cycle of the 4 brand colors for accents
  const colors = ['bg-flame', 'bg-ember', 'bg-marigold', 'bg-leaf'];
  const glowColors = ['shadow-flame/30', 'shadow-ember/30', 'shadow-marigold/30', 'shadow-leaf/30'];
  const color = colors[index % colors.length];
  const glow = glowColors[index % glowColors.length];

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-all duration-300 sm:p-8 ${done ? `shadow-lg ${glow}` : ''}`}>
      <span className={`absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-10 blur-xl ${color}`} aria-hidden="true" />
      <span className={`absolute left-0 top-0 h-1 w-full ${color}`} aria-hidden="true" />
      
      <p className={`display text-5xl text-ink sm:text-6xl ${done ? 'animate-pop' : ''}`}>
        {display}
      </p>
      <p className="mt-2 font-head text-sm font-extrabold uppercase tracking-[0.2em] text-ink">{stat.label}</p>
      {stat.note && <p className="mt-1 text-xs leading-relaxed text-ink/50">{stat.note}</p>}
    </div>
  );
}

/** Institutional statistics — count-up runs once per page visit. */
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
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="stats" className="relative scroll-mt-20 py-20 sm:py-24">
      <GeometricSparkles className="absolute top-10 left-[10%] w-[80%] opacity-30 pointer-events-none" />
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
        <div ref={ref} className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.id} delay={i * 90}>
              <StatCard stat={s} run={run} index={i} />
            </Reveal>
          ))}
          {stats.length === 0 && (
            <div className="col-span-2 py-10 text-center text-sm text-ink/40 lg:col-span-4">
              Statistics will appear here once published.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
