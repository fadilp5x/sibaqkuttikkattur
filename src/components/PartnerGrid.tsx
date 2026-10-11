import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, type Partner } from '../lib/api';
import { useReducedMotion } from '../lib/hooks';

/** Logo grid with honest placeholder tiles when no partners are published yet. */
export default function PartnerGrid() {
  const reduced = useReducedMotion();
  const [partners, setPartners] = useState<Partner[] | null>(null);
  useEffect(() => {
    api.partners().then(setPartners).catch(() => setPartners([]));
  }, []);

  const tiles: Partner[] =
    partners === null
      ? []
      : partners.length > 0
        ? partners
        : [
            { id: -1, name: 'Your brand here', logo: '', url: '' },
            { id: -2, name: 'Your brand here', logo: '', url: '' },
            { id: -3, name: 'Your brand here', logo: '', url: '' },
            { id: -4, name: 'Your brand here', logo: '', url: '' },
          ];
  const placeholders = partners !== null && partners.length === 0;

  return (
    <div>
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto`}>
        {tiles.map((p, i) =>
          p.logo ? (
            <a
              key={p.id}
              href={p.url || '#'}
              target={p.url ? '_blank' : undefined}
              rel="noreferrer"
              className={`group flex h-40 flex-col items-center justify-center overflow-hidden rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-md ${reduced ? '' : 'animate-fade-up'}`}
              style={reduced ? {} : { animationDelay: `${i * 100}ms` }}
            >
              <img src={p.logo} alt={p.name} loading="lazy" className="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" />
            </a>
          ) : (
            <div
              key={p.id}
              className={`flex h-40 flex-col items-center justify-center gap-2 rounded-[1.5rem] bg-gray-50 p-6 text-center shadow-sm ring-1 ring-black/5 ${placeholders ? '' : 'opacity-60'}`}
            >
              <span className="diamond h-2 w-2 bg-marigold/60" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/45">{p.name}</span>
            </div>
          )
        )}
      </div>
      {placeholders && (
        <p className="mt-3 text-center text-xs text-ink/45">
          Official partner logos will appear here.{' '}
          <Link to="/sponsors" className="font-bold text-marigold hover:underline">
            Become a partner
          </Link>
        </p>
      )}
    </div>
  );
}
