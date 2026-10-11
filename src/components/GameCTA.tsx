import { Link } from 'react-router-dom';
import { useSite } from '../lib/site';
import Reveal from './Reveal';

function daysUntilFest(): number | null {
  const fest = new Date('2026-11-20T00:00:00');
  const diff = Math.ceil((fest.getTime() - Date.now()) / 86_400_000);
  return diff >= 0 ? diff : null;
}

/** Home game call-to-action — "Ready to PLAY?" */
export default function GameCTA() {
  const site = useSite();
  const days = daysUntilFest();

  return (
    <Reveal>
      <section className="container-x py-6">
        <div className="glow-flame relative overflow-hidden rounded-[2.2rem] bg-gradient-to-br from-ember via-flame to-[#c71f10] p-7 sm:p-10">
          <div className="pattern-dots absolute inset-0 opacity-30" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-14 h-48 w-48 rotate-12 rounded-full border-[10px] border-black/15"
          />
          <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-head text-[11px] font-extrabold uppercase tracking-[0.3em] text-black/75">
                Daily quiz · Live now
              </p>
              <h2 className="display mt-2 text-4xl text-ink sm:text-5xl">
                Ready to <span className="text-marigold">PLAY?</span>
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/85">
                {site?.game.voucherLine ?? 'Answer today’s question and win exciting vouchers.'}
              </p>
              {days !== null && (
                <p className="mt-3 inline-block rounded-full bg-paper/30 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-ink">
                  Fest starts in {days} {days === 1 ? 'day' : 'days'}
                </p>
              )}
            </div>
            <Link to="/game" className="btn-marigold relative shrink-0 !px-9 !py-4 text-base">
              <svg width="16" height="18" viewBox="0 0 22 24" fill="none" aria-hidden="true" className="ml-0.5">
                <path d="M21 12L0.5 23.25V0.75L21 12Z" fill="currentColor" />
              </svg>
              Play & Win
            </Link>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
