import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, type TeamMember, type MediaItem, type SponsorPackage } from '../lib/api';
import { useSite } from '../lib/site';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import PennantGarland from './PennantGarland';
import FestivalRibbon from './FestivalRibbon';
import GeometricSparkles from './GeometricSparkles';

const CHANNELS = [
  { icon: '🛣️', title: 'Highway hoardings', text: 'QR-enabled boards on the Mavoor–Kozhikode corridor.' },
  { icon: '📺', title: 'Mobile LED displays', text: 'Moving screens across the fest zone, all three days.' },
  { icon: '🎤', title: 'Main stage backdrop', text: 'Brand presence behind every headline session.' },
];

const VERIFIED_REACH = [
  { value: '4,000+', label: 'Candidates', note: 'Pan-India participants' },
  { value: '35+', label: 'Campuses', note: 'Colleges represented' },
  { value: '1,000+', label: 'Daily Footfall', note: 'Audience & guests' },
  { value: 'Global', label: 'Livestream', note: 'Worldwide broadcast' },
];

export default function HomePreviews() {
  const site = useSite();
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [sponsors, setSponsors] = useState<SponsorPackage[]>([]);
  const [copiedUpi, setCopiedUpi] = useState(false);

  useEffect(() => {
    api.team().then((res) => setTeam(res.slice(0, 4))).catch(() => {});
    api.media().then((res) => setMedia(res.slice(0, 6))).catch(() => {});
    api.sponsors().then((res) => setSponsors(res.slice(0, 4))).catch(() => {});
  }, []);

  const d = site?.donation;

  const copyUpi = async () => {
    if (!d?.upi) return;
    try {
      await navigator.clipboard.writeText(d.upi);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    } catch {
      /* clipboard fallback */
    }
  };

  return (
    <>
      {/* 1. OUR TEAM */}
      <section id="team-preview" className="container-x py-16 sm:py-24 border-t border-black/5 bg-gray-50/30 relative">
        <PennantGarland className="absolute top-0 left-0 right-0 opacity-70" />
        <SectionHead
          kicker="Leadership & committee"
          title={<>The people <span className="text-gradient-fest">behind SIBAQ</span></>}
          note="Dedicated student leadership and coordinators from Shamsul Huda Islamic Academy."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.id} delay={i * 70}>
              <div className="card-dark group overflow-hidden h-full">
                <div className="relative aspect-[4/5] overflow-hidden">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-plum2 to-night">
                      <span className="display text-4xl text-marigold/70">{m.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-head text-sm font-extrabold text-ink">{m.name}</h3>
                  <p className="mt-1 text-xs font-bold text-flame">{m.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/team" className="btn-primary inline-flex">Meet the full team</Link>
        </div>
      </section>

      {/* 2. MEDIA PREVIEW */}
      <section id="media-preview" className="container-x py-16 sm:py-24 border-t border-black/5 relative">
        <GeometricSparkles className="absolute top-1/2 -left-10 w-2/3 opacity-30 pointer-events-none -translate-y-1/2 rotate-90" />
        <SectionHead
          kicker="Festival Archive"
          title={<>Moments from <span className="text-gradient-fest">SIBAQ</span></>}
          note="Photographs, performances and stories that capture the energy of the fest."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {media.length > 0 ? (
            media.map((m, i) => (
              <Reveal key={m.id} delay={i * 50}>
                <Link
                  to="/media"
                  className="group relative aspect-[4/3] block overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  aria-label={m.title}
                >
                  <img
                    src={m.type === 'video' ? m.poster || '/media/stage-01.jpg' : m.src}
                    alt={m.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {m.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-night/25 transition-colors group-hover:bg-night/15">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-flame text-white shadow-xl transition-transform group-hover:scale-110">
                        <svg width="16" height="18" viewBox="0 0 22 24" fill="currentColor"><path d="M21 12L0.5 23.25V0.75L21 12Z" /></svg>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 via-night/40 to-transparent p-4 text-white">
                    <p className="font-head text-xs font-bold leading-tight drop-shadow sm:text-sm line-clamp-1">{m.title}</p>
                  </div>
                </Link>
              </Reveal>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <span className="diamond mx-auto mb-3 block h-3 w-3 bg-flame/30" />
              <p className="text-sm font-bold text-ink/40">Festival media loading…</p>
            </div>
          )}
        </div>
        <div className="mt-10 text-center">
          <Link to="/media" className="btn-primary inline-flex bg-gradient-to-r from-flame to-ember border-0 text-white shadow-md">
            Explore Full Gallery & Film Archive →
          </Link>
        </div>
      </section>

      {/* 3. DONATION PREVIEW */}
      {d && (
        <section id="donation-preview" className="container-x py-16 sm:py-24 border-t border-black/5 bg-paper">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-night via-night to-plum p-8 shadow-2xl sm:p-12 lg:p-16 text-white border border-white/10">
            <PennantGarland className="absolute top-0 left-0 right-0 opacity-40" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-flame/20 via-transparent to-transparent opacity-60 pointer-events-none" />

            <Reveal>
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                <div className="lg:w-7/12">
                  <span className="chip border-marigold/30 text-marigold bg-white/10 mb-3">Community Patronage</span>
                  <h2 className="display mt-2 text-4xl sm:text-5xl leading-tight">SUPPORT THE ACADEMY</h2>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/80 max-w-xl">
                    Every contribution funds student scholarships, library facilities and cultural arts infrastructure at Shamsul Huda Islamic Academy.
                  </p>
                  
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      to="/donation"
                      className="rounded-xl bg-gradient-to-r from-flame to-ember px-6 py-3.5 font-head text-xs font-extrabold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105"
                    >
                      View Donation Details
                    </Link>
                    <button
                      onClick={copyUpi}
                      className="rounded-xl border border-white/30 bg-white/10 px-5 py-3.5 font-head text-xs font-extrabold uppercase tracking-wider text-white hover:bg-white/20 transition-colors"
                    >
                      {copiedUpi ? 'Copied UPI ID ✓' : `Copy UPI: ${d.upi}`}
                    </button>
                  </div>
                </div>

                {d.qr && (
                  <div className="lg:w-4/12 flex flex-col items-center">
                    <div className="rounded-3xl border-4 border-marigold/40 bg-cream p-5 shadow-2xl text-center">
                      <div className="rounded-2xl border-2 border-white bg-white p-2">
                        <img src={d.qr} alt="Donation QR Code" className="w-48 h-48 sm:w-56 sm:h-56 object-contain" />
                      </div>
                      <p className="mt-3 font-mono text-[11px] font-extrabold text-ink/70 uppercase tracking-wider">
                        Scan to Support with Any UPI App
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* 4. PROMOTE PREVIEW */}
      <section id="promote-preview" className="container-x py-16 sm:py-24 border-t border-black/5 bg-gray-50/40">
        <SectionHead
          kicker="Campaign & Outreach"
          title={<>Spread the <span className="text-gradient-fest">SIBAQ spirit</span></>}
          note="From roadside hoardings to digital reels, help us amplify the fest."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.title} delay={i * 70}>
              <div className="rounded-3xl border border-black/10 bg-white h-full p-7 text-center shadow-sm transition-transform hover:-translate-y-1">
                <span className="flex mx-auto h-14 w-14 items-center justify-center rounded-2xl bg-cream text-2xl mb-4 shadow-inner" aria-hidden="true">{c.icon}</span>
                <h3 className="font-head text-base font-extrabold text-ink">{c.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink/65 font-medium">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/promote" className="btn-primary inline-flex bg-gradient-to-r from-flame to-ember text-white shadow-md">
            Help Promote SIBAQ →
          </Link>
        </div>
      </section>

      {/* 5. SPONSORS PREVIEW */}
      <section id="sponsors-preview" className="container-x py-16 sm:py-24 border-t border-black/5 bg-paper pb-28 relative">
        <FestivalRibbon className="absolute top-0 left-0 right-0 opacity-40 scale-y-[-1]" />
        
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="chip border-marigold/40 text-marigold bg-night mb-3">Corporate Partnerships</span>
            <h2 className="display mt-2 text-4xl sm:text-5xl text-ink tracking-wide">BE A PART OF SIBAQ '26</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/65">
              Support talent. Enable creativity. Put your brand on the festival stage before thousands of young participants and visitors.
            </p>
          </div>
        </Reveal>
        
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 mb-12">
          {VERIFIED_REACH.map((r, i) => (
            <Reveal key={r.label} delay={i * 70}>
              <div className="rounded-2xl border border-black/10 bg-white p-5 text-center shadow-sm">
                <p className="display text-3xl text-flame">{r.value}</p>
                <p className="mt-1 text-[11px] font-head font-extrabold uppercase tracking-wider text-ink">{r.label}</p>
                <p className="mt-0.5 text-[10px] text-ink/50">{r.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {sponsors.length > 0 && (
          <div className="mt-8 mb-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {sponsors.slice(0, 4).map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 80}>
                <div className={`relative flex h-full flex-col rounded-3xl border border-black/10 bg-white p-6 text-left shadow-sm transition-transform hover:-translate-y-1 ${i === 0 ? 'border-2 border-flame ring-4 ring-flame/10' : ''}`}>
                  {i === 0 && (
                    <span className="absolute -top-3 right-5 rounded-full bg-flame px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white">
                      Flagship Tier
                    </span>
                  )}
                  <p className="kicker text-flame">{p.tagline}</p>
                  <h3 className="display mt-2 text-xl text-ink">{p.name}</h3>
                  <p className="mt-3 display text-2xl text-gradient-fest font-extrabold">
                    {p.price ?? <span className="text-ink/40 text-lg">On request</span>}
                  </p>
                  <p className="mt-1 text-[11px] text-ink/50 font-bold uppercase tracking-wider">{p.slots}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link to="/sponsors" className="btn-primary inline-flex bg-gradient-to-r from-marigold to-flame border-0 text-white shadow-xl shadow-flame/20">
            Become a Sponsor & View Rate Card →
          </Link>
        </div>
      </section>
    </>
  );
}
