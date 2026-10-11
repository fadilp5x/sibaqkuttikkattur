import { useEffect, useState } from 'react';
import { api, type TeamMember } from '../lib/api';
import SectionHead from '../components/SectionHead';
import Reveal from '../components/Reveal';

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  useEffect(() => {
    api.team().then(setTeam).catch(() => setTeam([]));
  }, []);

  return (
    <section className="container-x pb-20 pt-28">
      <SectionHead
        kicker="Leadership & committee"
        title={
          <>
            The people <span className="text-gradient-fest">behind SIBAQ</span>
          </>
        }
        note="Dedicated student leadership and coordinators from Shamsul Huda Islamic Academy."
      />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {team.map((m, i) => (
          <Reveal key={m.id} delay={(i % 4) * 80}>
            <div className="card-dark group overflow-hidden">
              <div className="relative aspect-[4/5] overflow-hidden">
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt={`${m.name} — ${m.role}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-plum2 to-night">
                    <span className="display text-4xl text-marigold/70">
                      {m.name.split(' ').map((w) => w[0]).join('')}
                    </span>
                  </div>
                )}
                <span className="diamond absolute right-3 top-3 h-2.5 w-2.5 bg-marigold" aria-hidden="true" />
              </div>
              <div className="p-4">
                {m.category && <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-flame">{m.category}</p>}
                <p className="mt-1 font-head text-sm font-extrabold text-ink">{m.name}</p>
                <p className="text-xs text-ink/55">{m.role}</p>
              </div>
            </div>
          </Reveal>
        ))}
        {team.length === 0 && (
          <p className="col-span-2 py-10 text-center text-sm text-ink/40 sm:col-span-3 lg:col-span-4">
            Team profiles will appear here once published.
          </p>
        )}
      </div>
    </section>
  );
}
