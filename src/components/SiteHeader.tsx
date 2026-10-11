import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSite } from '../lib/site';
import { useTheme } from '../lib/theme';

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'What is SIBAQ?' },
  { to: '/partners', label: 'Brand Partners' },
  { to: '/game', label: 'Game & Vouchers' },
  { to: '/edumart-book-fest', label: 'Edumart Book Fest' },
  { to: '/team', label: 'Our Team' },
  { to: '/media', label: 'Media' },
  { to: '/donation', label: 'Donation QR' },
  { to: '/promote', label: 'Want to Promote?' },
  { to: '/sponsors', label: 'Become a Sponsor' },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isFestival = theme === 'festival';
  return (
    <button
      onClick={() => setTheme(isFestival ? 'calm' : 'festival')}
      className="flex h-11 items-center gap-2 rounded-full border border-black/10 bg-white px-3 sm:px-4 text-[10px] font-extrabold uppercase tracking-wider text-ink transition-colors hover:border-marigold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marigold"
      aria-label={isFestival ? "Switch to Calm Mode" : "Switch to Festival Mode"}
      role="switch"
      aria-checked={isFestival}
    >
      {isFestival ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-flame">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
          </svg>
          <span className="hidden sm:inline">Festival Mode</span>
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-leaf">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.52-4.48 10-10 10Z"/>
          </svg>
          <span className="hidden sm:inline">Calm Mode</span>
        </>
      )}
    </button>
  );
}

export default function SiteHeader() {
  const site = useSite();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const s = site?.site;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-black/10 bg-paper/85 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-3">
          <Link to="/" className="flex items-center" aria-label="SIBAQ home">
            <img src="/media/sibaq-logo.svg" alt="" className="h-11 w-auto" />
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-black/5 text-ink transition-colors hover:border-marigold hover:text-marigold"
            >
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
                <path d="M0 1h20M0 7h14M0 13h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Drawer */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-paper/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <nav
          className={`absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col border-l border-black/10 bg-gray-50 transition-transform duration-300 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
            <span className="font-display text-lg tracking-[0.14em] text-ink">MENU</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-ink hover:border-flame hover:text-flame"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <ul className="flex-1 overflow-y-auto px-3 py-4">
            {NAV_LINKS.map((l, i) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-xl px-4 py-3.5 font-head text-sm font-bold tracking-wide transition-colors ${
                      isActive ? 'bg-flame/15 text-flame' : 'text-ink/85 hover:bg-black/5 hover:text-marigold'
                    }`
                  }
                >
                  <span>{l.label}</span>
                  <span className="diamond h-1.5 w-1.5 bg-current opacity-50" aria-hidden="true" />
                  <span className="sr-only">{String(i + 1).padStart(2, '0')}</span>
                </NavLink>
              </li>
            ))}
            <li className="mt-4 border-t border-black/10 pt-4">
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-4 py-3.5 font-head text-sm font-bold tracking-wide transition-colors ${
                    isActive ? 'bg-flame/15 text-flame' : 'text-ink/50 hover:bg-black/5 hover:text-marigold'
                  }`
                }
              >
                <span>Admin Login</span>
                <span className="diamond h-1.5 w-1.5 bg-current opacity-50" aria-hidden="true" />
              </NavLink>
            </li>
          </ul>
          {s && (
            <div className="border-t border-black/10 px-5 py-4 text-xs text-ink/60">
              <p className="font-semibold text-ink/80">{s.dates}</p>
              <p className="mt-0.5">{s.venueShort}</p>
              <a href={`tel:${s.phoneRaw}`} className="mt-2 inline-block font-bold text-marigold">
                {s.phone}
              </a>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
