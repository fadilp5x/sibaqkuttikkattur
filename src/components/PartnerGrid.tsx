import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, type Partner } from '../lib/api';
import { useReducedMotion } from '../lib/hooks';

export default function PartnerGrid() {
  const reduced = useReducedMotion();
  const [partners, setPartners] = useState<Partner[] | null>(null);

  useEffect(() => {
    api.partners().then(setPartners).catch(() => setPartners([]));
  }, []);

  const verifiedDefaults: Partner[] = [
    {
      id: 'default-1',
      name: 'Darul Huda Islamic University',
      logo: 'https://www.dhiu.in/resources/img/uni-logo.png',
      url: 'https://www.dhiu.in',
    },
    {
      id: 'default-2',
      name: 'Shamsul Huda Islamic Academy',
      logo: 'https://www.shamsulhuda.in/assets/shia-logo-j%20(1)-BLNbhxve.png',
      url: 'https://www.shamsulhuda.in',
    },
    {
      id: 'default-3',
      name: 'Edumart Book Fest',
      logo: 'https://i.ibb.co/Z6mMFk2s/edumart-perinthalmanna-malappuram-supermarkets-ihbbosyt34.jpg',
      url: '#',
    },
  ];

  const tiles = partners && partners.length > 0 ? partners : verifiedDefaults;

  const cornerColors = ['bg-flame', 'bg-leaf', 'bg-marigold', 'bg-ember'];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {tiles.map((p, i) => {
          const corner = cornerColors[i % cornerColors.length];
          return (
            <a
              key={p.id}
              href={p.url || '#'}
              target={p.url && p.url !== '#' ? '_blank' : undefined}
              rel="noreferrer"
              className={`group relative flex flex-col items-center justify-between overflow-hidden rounded-[2rem] border-2 border-[#E8DFD2] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-flame/40 ${
                reduced ? '' : 'animate-fade-up'
              }`}
              style={reduced ? {} : { animationDelay: `${i * 120}ms` }}
            >
              {/* Decorative corner accent */}
              <span className={`diamond absolute -right-3 -top-3 h-8 w-8 ${corner} opacity-80`} aria-hidden="true" />
              <span className={`diamond absolute left-4 top-4 h-2 w-2 ${corner}`} aria-hidden="true" />

              {/* Logo Area */}
              <div className="flex h-28 w-full items-center justify-center p-2">
                <img
                  src={p.logo}
                  alt={p.name}
                  loading="lazy"
                  className="max-h-24 w-auto max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Institution Name */}
              <div className="mt-4 pt-3 border-t border-black/5 w-full text-center">
                <p className="font-head text-xs sm:text-sm font-extrabold uppercase tracking-wider text-ink/85 group-hover:text-flame transition-colors line-clamp-1">
                  {p.name}
                </p>
                <span className="mt-1 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-marigold">
                  <span>Official Partner</span>
                  <span className="diamond h-1 w-1 bg-marigold" />
                </span>
              </div>
            </a>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-ink/60 font-medium">
        Want to showcase your organisation on the national festival stage?{' '}
        <Link to="/sponsors" className="font-bold text-flame hover:underline ml-1">
          Explore Brand Partnerships →
        </Link>
      </p>
    </div>
  );
}
