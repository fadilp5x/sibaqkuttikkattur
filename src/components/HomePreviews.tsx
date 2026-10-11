import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { api, type TeamMember, type MediaItem, type SponsorPackage } from '../lib/api';
import { useSite } from '../lib/site';
import { useReducedMotion } from '../lib/hooks';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import PennantGarland from './PennantGarland';
import FestivalRibbon from './FestivalRibbon';
import GeometricSparkles from './GeometricSparkles';
import MediaCameraEmblem from './MediaCameraEmblem';
import Soundwave from './Soundwave';
import SponsorStageEmblem from './SponsorStageEmblem';
import DonationFrame from './DonationFrame';

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

const DONATION_PRESETS = [100, 500, 1000];

export default function HomePreviews() {
  const site = useSite();
  const reduced = useReducedMotion();
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [sponsors, setSponsors] = useState<SponsorPackage[]>([]);
  
  // Team Mobile Carousel state & autoplay
  const [teamSlide, setTeamSlide] = useState(0);
  const [isTeamPaused, setIsTeamPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-changing slideshow for mobile team section (3.8 seconds per slide)
  useEffect(() => {
    if (reduced || isTeamPaused || team.length <= 1) return;
    const timer = setInterval(() => {
      setTeamSlide((prev) => (prev + 1) % team.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [reduced, isTeamPaused, team.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsTeamPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      setTeamSlide((prev) => (prev + 1) % team.length);
    } else if (diff < -40) {
      setTeamSlide((prev) => (prev - 1 + team.length) % team.length);
    }
    touchStartX.current = null;
    setTimeout(() => setIsTeamPaused(false), 2200);
  };

  // Media Slideshow state
  const [activeMedia, setActiveMedia] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const mediaTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Donation state
  const [selectedAmount, setSelectedAmount] = useState<number | null>(500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  useEffect(() => {
    // Load ALL available team members
    api.team().then((res) => setTeam(res)).catch(() => {});
    api.media().then((res) => setMedia(res)).catch(() => {});
    api.sponsors().then((res) => setSponsors(res.slice(0, 4))).catch(() => {});
  }, []);

  // Media Autoplay (5.5 seconds)
  useEffect(() => {
    if (reduced || isPaused || media.length <= 1) return;
    mediaTimer.current = setInterval(() => {
      setActiveMedia((prev) => (prev + 1) % media.length);
    }, 5500);
    return () => {
      if (mediaTimer.current) clearInterval(mediaTimer.current);
    };
  }, [reduced, isPaused, media.length]);

  const nextMedia = () => {
    setIsPaused(true);
    setActiveMedia((prev) => (prev + 1) % media.length);
  };

  const prevMedia = () => {
    setIsPaused(true);
    setActiveMedia((prev) => (prev - 1 + media.length) % media.length);
  };

  const d = site?.donation;

  const currentDonationAmount = isCustom ? Number(customAmount) || 0 : selectedAmount || 0;

  const dynamicUpiUrl = d?.upi
    ? `upi://pay?pa=${encodeURIComponent(d.upi)}&pn=${encodeURIComponent(
        'Shamsul Huda Islamic Academy'
      )}${currentDonationAmount > 0 ? `&am=${currentDonationAmount}` : ''}&cu=INR`
    : '';

  const copyUpi = async () => {
    if (!d?.upi) return;
    try {
      await navigator.clipboard.writeText(d.upi);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    } catch {
      /* fallback */
    }
  };

  return (
    <>
      {/* =========================================================================
          1. OUR TEAM SECTION — Warm Cream / Editorial Showcase (All Members)
         ========================================================================= */}
      <section id="team-preview" className="relative py-20 sm:py-28 bg-[#FFF8E8] border-t border-black/5 overflow-hidden">
        <PennantGarland className="absolute top-0 left-0 right-0 opacity-75 pointer-events-none" />
        <div className="pattern-dots absolute inset-0 opacity-25 pointer-events-none" />

        <div className="container-x relative z-10">
          <SectionHead
            kicker="Leadership & Committee"
            title={
              <>
                The people <span className="text-gradient-fest">behind SIBAQ</span>
              </>
            }
            note="Dedicated coordinators and student leadership from Shamsul Huda Islamic Academy organizing the 11th biennial edition."
          />

          {/* Desktop Multi-Column Grid */}
          <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {team.map((m, i) => (
              <Reveal key={m.id} delay={i * 60}>
                <div className="group relative flex flex-col overflow-hidden rounded-[2rem] border-2 border-[#E8DFD2] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-flame/40">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-cream">
                    {m.photo ? (
                      <img
                        src={m.photo}
                        alt={m.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-flame/20 to-marigold/20">
                        <span className="display text-4xl text-flame font-bold">{m.name.charAt(0)}</span>
                      </div>
                    )}
                    <span className="diamond absolute top-3 right-3 h-2 w-2 bg-marigold shadow-md" aria-hidden="true" />
                  </div>
                  <div className="p-3 text-left">
                    <h3 className="font-head text-base font-extrabold text-ink group-hover:text-flame transition-colors">
                      {m.name}
                    </h3>
                    <p className="mt-1 text-xs font-bold text-flame uppercase tracking-wider">{m.role}</p>
                    {m.category && (
                      <p className="mt-0.5 text-[11px] font-medium text-ink/55">{m.category}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Mobile Auto-Changing Animated Slideshow */}
          <div
            className="sm:hidden mt-8"
            onMouseEnter={() => setIsTeamPaused(true)}
            onMouseLeave={() => setIsTeamPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-[#E8DFD2] bg-white p-6 shadow-lg">
              {/* Subtle Auto-Advance Progress Line */}
              {!isTeamPaused && team.length > 1 && !reduced && (
                <div className="absolute top-0 inset-x-0 h-1 bg-black/5 overflow-hidden">
                  <div
                    key={teamSlide}
                    className="h-full bg-gradient-to-r from-flame via-marigold to-leaf"
                    style={{
                      animation: 'teamSlideProgress 3.8s linear forwards',
                    }}
                  />
                </div>
              )}

              {/* Header Badge & Counter */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-flame/10 px-3 py-1 font-head text-[10px] font-extrabold uppercase tracking-widest text-flame">
                  <span className="diamond h-1.5 w-1.5 bg-flame animate-pulse" />
                  Festival Committee
                </span>
                {team.length > 0 && (
                  <span className="font-head text-[11px] font-extrabold tracking-wider text-ink/40">
                    {teamSlide + 1} / {team.length}
                  </span>
                )}
              </div>

              {/* Sliding Carousel Track */}
              <div className="overflow-hidden w-full">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${teamSlide * 100}%)`,
                  }}
                >
                  {team.map((m, idx) => (
                    <div
                      key={m.id || idx}
                      className="w-full shrink-0 flex flex-col items-center text-center px-1"
                    >
                      <div className="relative aspect-[4/5] w-60 max-w-full overflow-hidden rounded-2xl bg-cream shadow-inner border border-black/5">
                        {m.photo ? (
                          <img
                            src={m.photo}
                            alt={m.name}
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-flame/20 to-marigold/20">
                            <span className="display text-5xl text-flame font-bold">
                              {m.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <span className="diamond absolute top-3 right-3 h-2 w-2 bg-marigold shadow-md" aria-hidden="true" />
                      </div>

                      <h3 className="mt-5 font-head text-xl font-extrabold text-ink tracking-tight">
                        {m.name}
                      </h3>
                      <p className="mt-1 text-xs font-bold text-flame uppercase tracking-wider">
                        {m.role}
                      </p>
                      {m.category && (
                        <p className="mt-0.5 text-xs font-medium text-ink/60">{m.category}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Carousel Controls & Dot Indicators */}
              <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsTeamPaused(true);
                    setTeamSlide((prev) => (prev - 1 + team.length) % team.length);
                  }}
                  aria-label="Previous team member"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-white text-ink shadow-sm transition-transform active:scale-90 hover:bg-cream"
                >
                  ←
                </button>
                <div className="flex gap-1.5 items-center">
                  {team.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setIsTeamPaused(true);
                        setTeamSlide(idx);
                      }}
                      aria-label={`Go to team member ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        teamSlide === idx ? 'w-6 bg-flame' : 'w-2 bg-black/20 hover:bg-black/40'
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsTeamPaused(true);
                    setTeamSlide((prev) => (prev + 1) % team.length);
                  }}
                  aria-label="Next team member"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-white text-ink shadow-sm transition-transform active:scale-90 hover:bg-cream"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/team"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-flame to-ember px-7 py-4 font-head text-xs sm:text-sm font-extrabold uppercase tracking-[0.18em] text-white shadow-xl hover:scale-105 transition-all"
            >
              <span>Meet the Full Festival Committee</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. MEDIA SECTION — Large Swipeable Editorial Slideshow (Cinematic Dark)
         ========================================================================= */}
      <section
        id="media-preview"
        className="relative py-20 sm:py-28 bg-[#191919] text-white border-y border-white/10 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <GeometricSparkles className="absolute -top-10 -left-10 w-2/3 opacity-25 pointer-events-none rotate-45" />

        <div className="container-x relative z-10">
          {/* Section Heading & Autonomous Media Camera Emblem */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-marigold/40 bg-white/10 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.2em] text-marigold">
                <span className="diamond h-1.5 w-1.5 bg-marigold animate-pulse" />
                Festival Archive
              </span>
              <h2 className="display mt-3 text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[0.95]">
                MOMENTS FROM <span className="text-gradient-fest">SIBAQ</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/75 max-w-lg font-medium">
                Photographs and films capturing the energy, scholarly oratory, and artistic celebration of the fest.
              </p>
            </div>

            {/* Embedded Animated Soundwave & Media Camera Emblem */}
            <div className="flex items-center gap-6 shrink-0">
              <div className="w-48 sm:w-60 h-20 sm:h-24">
                <Soundwave className="w-full h-full drop-shadow-lg" />
              </div>
              <div className="hidden lg:block w-36 h-28 shrink-0">
                <MediaCameraEmblem className="w-full h-full drop-shadow-xl" />
              </div>
            </div>
          </div>

          {/* Large Swipeable Featured Media Slideshow */}
          {media.length > 0 ? (
            <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-white/15 bg-black shadow-2xl">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black">
                {media.map((item, index) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      activeMedia === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={item.type === 'video' ? item.poster || '/media/stage-01.jpg' : item.src}
                      alt={item.title}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      className="h-full w-full object-cover sm:object-contain bg-black"
                    />

                    {/* Video Play Badge if Video */}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-flame text-white shadow-2xl transition-transform hover:scale-110">
                          <svg width="20" height="22" viewBox="0 0 22 24" fill="currentColor">
                            <path d="M21 12L0.5 23.25V0.75L21 12Z" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Gradient Caption Overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div>
                        <span className="font-head text-[11px] font-extrabold uppercase tracking-widest text-marigold">
                          {item.type === 'video' ? 'Festival Film' : 'Archive Photography'}
                        </span>
                        <h3 className="display text-2xl sm:text-3xl lg:text-4xl text-white mt-1">
                          {item.title}
                        </h3>
                      </div>
                      <div className="font-mono text-xs text-white/70 font-bold">
                        {index + 1} / {media.length}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Prev / Next Navigation Arrows */}
              <button
                onClick={prevMedia}
                aria-label="Previous photo"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 border border-white/20 text-white shadow-xl backdrop-blur-md transition-all hover:bg-flame hover:scale-110"
              >
                ←
              </button>
              <button
                onClick={nextMedia}
                aria-label="Next photo"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 border border-white/20 text-white shadow-xl backdrop-blur-md transition-all hover:bg-flame hover:scale-110"
              >
                →
              </button>

              {/* Bottom Progress Bar & Dot Indicators */}
              <div className="absolute top-4 right-4 z-20 flex gap-1.5">
                {media.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsPaused(true);
                      setActiveMedia(idx);
                    }}
                    aria-label={`Go to media slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      activeMedia === idx ? 'w-8 bg-marigold' : 'w-2 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="py-20 text-center">
              <span className="diamond mx-auto mb-3 block h-3 w-3 bg-flame/40" />
              <p className="text-sm font-bold text-white/50">Media gallery loading…</p>
            </div>
          )}

          {/* Action to Full Media Page */}
          <div className="mt-12 text-center">
            <Link
              to="/media"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-flame via-marigold to-flame px-8 py-4 font-head text-xs sm:text-sm font-extrabold uppercase tracking-[0.18em] text-ink shadow-[0_10px_30px_rgba(241,90,36,0.4)] transition-all hover:scale-105"
            >
              <span>Explore All Media & Video Gallery</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. DONATION SECTION — High-Contrast SIBAQ Red/Orange + Amount Selector
         ========================================================================= */}
      {d && (
        <section id="donation-preview" className="relative py-20 sm:py-28 bg-[#FFF8E8] border-b border-black/5 overflow-hidden">
          <FestivalRibbon className="absolute top-0 left-0 right-0 opacity-40 pointer-events-none" />

          <div className="container-x relative z-10">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#191919] via-[#241a22] to-[#191919] p-8 sm:p-12 lg:p-16 text-white shadow-2xl border-2 border-flame/30">
                <PennantGarland className="absolute top-0 left-0 right-0 opacity-40 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                  
                  {/* Left Column: Beneficiary & Amount Selector */}
                  <div className="w-full lg:w-7/12 text-left">
                    <span className="inline-flex items-center gap-2 rounded-full border border-marigold/40 bg-white/10 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.2em] text-marigold">
                      <span className="diamond h-1.5 w-1.5 bg-marigold" />
                      Community Patronage
                    </span>

                    <h2 className="display mt-3 text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[0.95]">
                      SUPPORT THE <span className="text-gradient-fest">ACADEMY</span>
                    </h2>

                    {/* Verified Beneficiary Details */}
                    <div className="mt-4 rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
                      <p className="font-head text-xs font-extrabold uppercase tracking-wider text-marigold">
                        Beneficiary Institution
                      </p>
                      <p className="mt-1 text-base font-bold text-white">
                        {d.account ?? 'Shamsul Huda Islamic Academy · Kuttikkattoor Branch'}
                      </p>
                      <p className="mt-1 text-xs text-white/70 leading-relaxed font-medium">
                        {d.description ?? 'Every contribution directly funds student scholarships, library facilities and cultural arts infrastructure at Kuttikkattoor.'}
                      </p>
                    </div>

                    {/* 10.2 Amount Selector: CHOOSE YOUR CONTRIBUTION */}
                    <div className="mt-6">
                      <p className="font-head text-xs font-extrabold uppercase tracking-[0.2em] text-marigold mb-3">
                        Choose Your Contribution
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {DONATION_PRESETS.map((amt) => {
                          const isSel = !isCustom && selectedAmount === amt;
                          return (
                            <button
                              key={amt}
                              onClick={() => {
                                setIsCustom(false);
                                setSelectedAmount(amt);
                              }}
                              className={`rounded-xl py-3 px-4 font-head text-sm font-extrabold transition-all border-2 ${
                                isSel
                                  ? 'border-marigold bg-marigold text-ink shadow-[0_0_15px_rgba(255,201,40,0.5)] scale-105'
                                  : 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                              }`}
                            >
                              ₹{amt}
                            </button>
                          );
                        })}
                        <button
                          onClick={() => {
                            setIsCustom(true);
                            setSelectedAmount(null);
                          }}
                          className={`rounded-xl py-3 px-4 font-head text-sm font-extrabold transition-all border-2 ${
                            isCustom
                              ? 'border-marigold bg-marigold text-ink shadow-[0_0_15px_rgba(255,201,40,0.5)] scale-105'
                              : 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          Custom
                        </button>
                      </div>

                      {/* Custom Amount Input */}
                      {isCustom && (
                        <div className="mt-3 animate-fade-up">
                          <label className="block text-xs font-bold text-white/80 mb-1">
                            Enter Amount (₹):
                          </label>
                          <input
                            type="number"
                            min="10"
                            placeholder="e.g. 2500"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            className="w-full sm:w-64 rounded-xl border-2 border-marigold bg-black/40 px-4 py-2.5 text-base font-bold text-white focus:outline-none"
                          />
                        </div>
                      )}
                    </div>

                    {/* Step-by-Step Payment Instructions */}
                    <div className="mt-6 border-t border-white/10 pt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <div className="flex flex-wrap gap-3">
                        {dynamicUpiUrl ? (
                          <a
                            href={dynamicUpiUrl}
                            className="rounded-xl bg-gradient-to-r from-flame to-ember px-6 py-3.5 font-head text-xs font-extrabold uppercase tracking-wider text-white shadow-xl hover:scale-105 transition-all"
                          >
                            Pay ₹{currentDonationAmount || 'Amount'} via UPI App
                          </a>
                        ) : null}

                        <button
                          onClick={copyUpi}
                          className="rounded-xl border border-white/25 bg-white/10 px-5 py-3.5 font-head text-xs font-extrabold uppercase tracking-wider text-white hover:bg-white/20 transition-colors"
                        >
                          {copiedUpi ? 'Copied UPI ID ✓' : `Copy UPI: ${d.upi}`}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: QR Code in the Autonomous Animated DonationFrame */}
                  <div className="w-full lg:w-5/12 flex flex-col items-center">
                    <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[640/480]">
                      <DonationFrame className="w-full h-full drop-shadow-2xl" />
                      
                      {/* Exact QR Code embedded inside the frame stage */}
                      {d.qr && (
                        <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-auto">
                          <div className="bg-white p-2.5 rounded-2xl shadow-lg border-2 border-black/10">
                            <img
                              src={d.qr}
                              alt="Donation QR Code"
                              className="w-36 h-36 sm:w-44 sm:h-44 object-contain"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <p className="mt-3 font-mono text-[11px] font-extrabold uppercase tracking-wider text-marigold text-center">
                      Scan with Google Pay, PhonePe, Paytm or Any UPI App
                    </p>
                  </div>

                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* =========================================================================
          4. PROMOTE SECTION (Preserved from Phase 1 requirements)
         ========================================================================= */}
      <section id="promote-preview" className="container-x py-16 sm:py-24 border-t border-black/5 bg-[#FFF8E8]/40">
        <SectionHead
          kicker="Campaign & Outreach"
          title={
            <>
              Spread the <span className="text-gradient-fest">SIBAQ spirit</span>
            </>
          }
          note="From roadside hoardings to digital reels, help us amplify the national fest."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.title} delay={i * 70}>
              <div className="rounded-3xl border border-black/10 bg-white h-full p-7 text-center shadow-sm transition-transform hover:-translate-y-1">
                <span className="flex mx-auto h-14 w-14 items-center justify-center rounded-2xl bg-cream text-2xl mb-4 shadow-inner" aria-hidden="true">
                  {c.icon}
                </span>
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

      {/* =========================================================================
          5. SPONSORS SECTION (Preserved from Phase 1 requirements)
         ========================================================================= */}
      <section id="sponsors-preview" className="container-x py-16 sm:py-24 border-t border-black/5 bg-paper pb-28 relative">
        <FestivalRibbon className="absolute top-0 left-0 right-0 opacity-40 scale-y-[-1]" />

        <Reveal>
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
            {/* Embedded Sponsor Stage Emblem */}
            <div className="w-40 sm:w-48 h-28 sm:h-32 mb-4">
              <SponsorStageEmblem className="w-full h-full drop-shadow-md" />
            </div>
            <span className="chip border-marigold/40 text-marigold bg-night mb-3">Corporate Partnerships</span>
            <h2 className="display mt-2 text-4xl sm:text-5xl text-ink tracking-wide">BE A PART OF SIBAQ '26</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/65 font-medium">
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
                <div
                  className={`relative flex h-full flex-col rounded-3xl border border-black/10 bg-white p-6 text-left shadow-sm transition-transform hover:-translate-y-1 ${
                    i === 0 ? 'border-2 border-flame ring-4 ring-flame/10' : ''
                  }`}
                >
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
          <Link
            to="/sponsors"
            className="btn-primary inline-flex bg-gradient-to-r from-marigold to-flame border-0 text-white shadow-xl shadow-flame/20"
          >
            Become a Sponsor & View Rate Card →
          </Link>
        </div>
      </section>
    </>
  );
}
