import { useSite } from '../lib/site';
import { useReducedMotion } from '../lib/hooks';

/** Seamless moving festival ribbon. */
export default function Ribbon({ variant = 'flame' }: { variant?: 'flame' | 'gold' | 'leaf' }) {
  const site = useSite();
  const reduced = useReducedMotion();
  const text = (site?.ribbon.text || 'SIBAQ 2K26 ◆ TALENT ◆ ART ◆ CULTURE ◆ KNOWLEDGE ◆ ').repeat(4);
  const styles =
    variant === 'gold'
      ? 'bg-marigold text-night border-y border-night/20'
      : variant === 'leaf'
        ? 'bg-leaf text-night border-y border-night/20'
        : 'bg-gradient-to-r from-ember via-flame to-ember text-ink border-y border-black/10';

  return (
    <div className={`relative overflow-hidden py-3 ${styles}`} aria-hidden="true">
      <div className={`flex w-max whitespace-nowrap ${reduced ? '' : 'animate-marquee'}`}>
        {[0, 1].map((half) => (
          <span key={half} className="font-head text-sm font-extrabold uppercase tracking-[0.3em]">
            {text.split('◆').map((chunk, i) => (
              <span key={i} className="inline-flex items-center">
                <span className="px-4">{chunk.trim()}</span>
                <span className="diamond h-2 w-2 bg-current opacity-70" />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
