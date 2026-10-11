import { useEffect, useState } from 'react';
import { api, type Partner } from '../lib/api';
import EnquiryForm from '../components/EnquiryForm';
import Reveal from '../components/Reveal';
import SponsorStageEmblem from '../components/SponsorStageEmblem';
import PennantGarland from '../components/PennantGarland';
import ShapeDivider from '../components/ShapeDivider';
import ThankYouSection from '../components/ThankYouSection';

const VERIFIED_REACH = [
  { value: '4,000+', label: 'Competing Candidates', note: 'Pan-India collegiate participants' },
  { value: '35+', label: 'Collegiate Campuses', note: 'Institutions represented' },
  { value: '1,000+', label: 'Daily On-Ground Visitors', note: 'Audience, scholars & guests' },
  { value: 'Global', label: 'YouTube Livestream', note: 'Worldwide diaspora broadcast' },
];

interface OfficialTier {
  id: string;
  name: string;
  tagline: string;
  slots: string;
  price: string;
  themeStyle: {
    cardBg: string;
    border: string;
    textColor: string;
    subTextColor: string;
    badgeBg: string;
    badgeText: string;
    accentGlow: string;
    btnClass: string;
    diamondColor: string;
  };
  benefits: string[];
}

const OFFICIAL_TIERS: OfficialTier[] = [
  {
    id: 'title',
    name: 'Title Sponsor',
    tagline: 'Premier Festival Title Partnership',
    slots: '1 Available Slot',
    price: '₹3,00,000',
    themeStyle: {
      cardBg: 'bg-gradient-to-br from-[#4A0E17] via-[#2D0B12] to-[#1F070C]',
      border: 'border-2 border-[#E52B2B] ring-4 ring-flame/20',
      textColor: 'text-white',
      subTextColor: 'text-white/80',
      badgeBg: 'bg-gradient-to-r from-[#E52B2B] to-[#F15A24]',
      badgeText: 'text-white',
      accentGlow: 'shadow-[0_20px_60px_rgba(229,43,43,0.35)]',
      btnClass: 'bg-gradient-to-r from-flame via-marigold to-flame text-ink hover:scale-105 shadow-xl',
      diamondColor: 'bg-marigold',
    },
    benefits: [
      'Official Title Partnership across all assets',
      'Premium logo placement across all platforms',
      'Main stage branding and backdrop visibility',
      'Exclusive stall / branding space',
      'Top-tier digital and social media promotion',
      'Major Announcement Integration',
      'Event brochure cover / premium placement',
      'Post-Event Appreciation Feature',
      'Main Entrance Branding',
      'Premium Billboard',
      'Mobile LED',
      'Social Feed Posts & Stories',
      'Premium Website Placement',
      'YouTube live stream visibility',
      'MC mentions (multiple)',
      'Dedicated Promotional Creatives',
    ],
  },
  {
    id: 'co-title',
    name: 'Co-Title Sponsor',
    tagline: 'High-Impact Co-Title Partnership',
    slots: '2 Available Slots',
    price: '₹1,50,000',
    themeStyle: {
      cardBg: 'bg-gradient-to-br from-[#1E1728] via-[#161220] to-[#0F0C16]',
      border: 'border-2 border-[#8B5CF6]/50',
      textColor: 'text-white',
      subTextColor: 'text-white/75',
      badgeBg: 'bg-purple-900/60 border border-purple-400/40',
      badgeText: 'text-purple-200',
      accentGlow: 'shadow-[0_15px_45px_rgba(139,92,246,0.25)]',
      btnClass: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 shadow-lg',
      diamondColor: 'bg-purple-400',
    },
    benefits: [
      'Co-Title Partnership recognition',
      'Post-Event Appreciation',
      'Main Stage LED — all event days',
      'Premium Stage Logo',
      'Main Entrance Branding',
      'Billboard Visibility',
      'Mobile LED',
      'Dedicated Brand Film',
      'Promotional Reels',
      'Promotional Posters',
      'Feed Posts & Stories',
      'Social Feed Posts & Stories',
      'Live Footer Branding',
      'Premium Website Placement',
      'Major Announcement Mentions',
      'Premium On-Ground Branding',
    ],
  },
  {
    id: 'gold',
    name: 'Gold Partner',
    tagline: 'Featured Stage & Broadcast Presence',
    slots: '3 Available Slots',
    price: '₹50,000',
    themeStyle: {
      cardBg: 'bg-gradient-to-br from-[#FFF9E6] via-[#FFF3CC] to-[#FFEBB3]',
      border: 'border-2 border-[#FFC928]',
      textColor: 'text-[#191919]',
      subTextColor: 'text-[#444444]',
      badgeBg: 'bg-[#FFC928] border border-black/10',
      badgeText: 'text-[#191919] font-black',
      accentGlow: 'shadow-[0_15px_40px_rgba(255,201,40,0.3)]',
      btnClass: 'bg-gradient-to-r from-[#FFC928] to-[#F15A24] text-white hover:scale-105 shadow-md',
      diamondColor: 'bg-[#F15A24]',
    },
    benefits: [
      'Stage LED — all event days',
      'Brand Promo Video',
      'Billboard',
      'Premium Stage Logo',
      'Mobile LED',
      'Promotional Reels',
      'Post-Event Mention',
      'Promotional Posters',
      'Feed Posts & Stories',
      'Brand Feature',
      'Live Footer Branding',
      'Website Gold Partner section',
      'On-Ground Branding',
      'Brand Activation',
    ],
  },
  {
    id: 'silver',
    name: 'Silver Partner',
    tagline: 'Prominent Venue & Media Visibility',
    slots: '5 Available Slots',
    price: '₹30,000',
    themeStyle: {
      cardBg: 'bg-gradient-to-br from-[#0F3920] via-[#0A2B17] to-[#061D10]',
      border: 'border-2 border-[#36AD50]',
      textColor: 'text-white',
      subTextColor: 'text-white/80',
      badgeBg: 'bg-[#36AD50]/30 border border-[#36AD50]',
      badgeText: 'text-[#6EE7B7]',
      accentGlow: 'shadow-[0_15px_40px_rgba(54,173,80,0.25)]',
      btnClass: 'bg-[#36AD50] text-white hover:bg-[#2E9444] shadow-md',
      diamondColor: 'bg-[#FFC928]',
    },
    benefits: [
      'On-Ground Branding',
      'Post-Event Mention',
      'Shared Billboard',
      'Promotional Reel',
      'Promotional Posters',
      'Feed Posts & Stories',
      'Brand Story Feature',
      'Live Footer Branding',
      'Website Silver Partner Listing',
    ],
  },
  {
    id: 'associate',
    name: 'Associate Partner',
    tagline: 'Community & Digital Recognition',
    slots: '8 Available Slots',
    price: '₹20,000',
    themeStyle: {
      cardBg: 'bg-gradient-to-br from-[#FFFDF8] via-[#FFF8E8] to-[#FFF3DC]',
      border: 'border-2 border-[#F15A24]/40',
      textColor: 'text-[#191919]',
      subTextColor: 'text-[#555555]',
      badgeBg: 'bg-[#F15A24]/10 border border-[#F15A24]/30',
      badgeText: 'text-[#F15A24]',
      accentGlow: 'shadow-[0_10px_30px_rgba(241,90,36,0.15)]',
      btnClass: 'bg-gradient-to-r from-flame to-ember text-white hover:opacity-90 shadow-md',
      diamondColor: 'bg-[#36AD50]',
    },
    benefits: [
      'Promotional Reel',
      'Promotional Poster',
      'Feed Post & Stories',
      'Live Footer Branding',
      'Website Partner Listing',
      'Brand Mention',
      'Shared On-Ground Branding',
      'Post-Event Appreciation',
    ],
  },
];

export default function SponsorsPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [selectedTierForEnquiry, setSelectedTierForEnquiry] = useState<string>('Title Sponsor');

  useEffect(() => {
    api.partners().then(setPartners).catch(() => setPartners([]));
  }, []);

  const handleEnquire = (tierName: string) => {
    setSelectedTierForEnquiry(tierName);
    document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] pb-28 pt-20">
      {/* 1. Dramatic Stage Hero with Canopy & Spotlight Artwork */}
      <section className="relative overflow-hidden bg-gradient-to-br from-night via-[#2A121A] to-plum pb-20 pt-12 sm:pt-16 text-white shadow-xl">
        <PennantGarland className="absolute top-0 left-0 right-0 opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-marigold/20 via-transparent to-transparent opacity-70 pointer-events-none" />

        <div className="container-x relative z-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            
            {/* Left: Headline & Proposition */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-marigold/30 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-marigold mb-4 backdrop-blur-md">
                <span className="diamond h-1.5 w-1.5 bg-marigold" />
                Corporate & Brand Partnerships
                <span className="diamond h-1.5 w-1.5 bg-marigold" />
              </div>

              <h1 className="display text-5xl sm:text-6xl md:text-7xl leading-[0.95] text-white">
                BE A PART OF <br />
                <span className="text-gradient-fest">SIBAQ '26</span>
              </h1>

              <p className="mt-5 text-base sm:text-lg leading-relaxed text-white/80 max-w-xl font-medium">
                Support talent. Enable creativity. Put your brand on the festival stage before thousands
                of emerging scholars, community leaders, and regional audiences.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#packages"
                  className="rounded-xl bg-gradient-to-r from-marigold to-flame px-7 py-3.5 font-head text-xs font-extrabold uppercase tracking-wider text-night shadow-xl transition-all hover:scale-105"
                >
                  View Sponsorship Tiers ↓
                </a>
                <a
                  href="#enquiry"
                  className="rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 font-head text-xs font-extrabold uppercase tracking-wider text-white hover:bg-white/20 transition-all"
                >
                  Request Rate Card
                </a>
              </div>
            </div>

            {/* Right: Traditional Stage & Trophy Emblem */}
            <div className="lg:col-span-5 flex justify-center">
              <Reveal>
                <div className="relative w-full max-w-md aspect-[4/3] flex items-center justify-center p-2">
                  <SponsorStageEmblem />
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Verified Reach & Attendance Metrics */}
      <section className="container-x -mt-8 relative z-20">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {VERIFIED_REACH.map((r, i) => (
            <Reveal key={r.label} delay={i * 70}>
              <div className="rounded-3xl border-2 border-[#E8DFD2] bg-white p-6 text-center shadow-lg transition-transform hover:-translate-y-1">
                <p className="display text-3xl sm:text-4xl text-flame">{r.value}</p>
                <p className="mt-1 text-xs font-head font-extrabold uppercase tracking-wider text-ink">{r.label}</p>
                <p className="mt-1 text-[11px] text-ink/55 font-medium">{r.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Autonomous Animated Shape Divider Transition */}
      <div className="w-full max-w-4xl mx-auto my-12 px-4">
        <ShapeDivider className="w-full h-14 sm:h-18" />
      </div>

      {/* 3. Confirmed Institutional Organizers & Partners */}
      {partners.length > 0 && (
        <section className="container-x py-4">
          <div className="rounded-3xl border-2 border-[#E8DFD2] bg-[#FFF8E8] p-8 text-center shadow-sm">
            <p className="kicker text-marigold">Organized & Endorsed By</p>
            <h3 className="display mt-1 text-2xl text-ink">INSTITUTIONAL PARTNERS</h3>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              {partners.map((p) => (
                <a
                  key={p.id}
                  href={p.url !== '#' ? p.url : undefined}
                  target={p.url !== '#' ? '_blank' : undefined}
                  rel="noreferrer"
                  className="flex flex-col items-center group transition-transform hover:scale-105"
                >
                  <div className="h-16 w-32 flex items-center justify-center p-2 rounded-xl bg-white border border-black/5 shadow-sm">
                    <img src={p.logo} alt={p.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <span className="mt-2 text-xs font-bold text-ink/70 group-hover:text-flame transition-colors">
                    {p.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Sponsorship Packages & Tiers Introduction */}
      <section id="packages" className="container-x py-12 scroll-mt-24">
        <div className="mx-auto max-w-2xl text-center mb-8">
          <p className="kicker text-flame">Curated Corporate Packages</p>
          <h2 className="display mt-2 text-3xl sm:text-5xl text-ink">
            SPONSORSHIP <span className="text-gradient-fest">PLANS</span>
          </h2>
          <p className="mt-3 text-sm text-ink/70 leading-relaxed font-medium">
            Five comprehensive tiers crafted to elevate your enterprise presence through on-ground pavilions, billboard visibility, LED coverage, and digital broadcasts.
          </p>
        </div>

        {/* Provisional Pricing & Package Data Discrepancy Notice */}
        <div className="mb-10 mx-auto max-w-3xl rounded-2xl border border-marigold/50 bg-[#FFF8E8] p-4 text-center text-xs text-ink/75 shadow-sm">
          <span className="font-extrabold text-flame">Pricing Notice:</span> Detailed package values (₹3,00,000 Title / ₹1,50,000 Co-Title / Associate Partner) are displayed provisionally according to the official individual tier slide specifications. Final allocations confirmed upon committee agreement.
        </div>

        {/* Autonomous Animated Shape Divider before Package Cards */}
        <div className="w-full max-w-4xl mx-auto mb-12 px-4">
          <ShapeDivider className="w-full h-14 sm:h-18" />
        </div>

        {/* 5 Distinct Official Package Cards */}
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {OFFICIAL_TIERS.map((tier, i) => {
            const isTitle = tier.id === 'title';
            return (
              <Reveal key={tier.id} delay={i * 80}>
                <div
                  className={`relative flex h-full flex-col justify-between rounded-[2.5rem] p-8 transition-all duration-300 hover:-translate-y-2 ${
                    tier.themeStyle.cardBg
                  } ${tier.themeStyle.border} ${tier.themeStyle.accentGlow} ${
                    isTitle ? 'lg:col-span-2 xl:col-span-1 ring-4 ring-flame/30' : ''
                  }`}
                >
                  <div>
                    {/* Top Tier Badge & Slot Count */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`rounded-full px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider ${
                          tier.themeStyle.badgeBg
                        } ${tier.themeStyle.badgeText}`}
                      >
                        {tier.slots}
                      </span>
                      {isTitle && (
                        <span className="rounded-full bg-flame px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-md">
                          Flagship Tier
                        </span>
                      )}
                    </div>

                    <h3 className={`display mt-5 text-3xl sm:text-4xl ${tier.themeStyle.textColor}`}>
                      {tier.name}
                    </h3>
                    <p className={`mt-1 text-xs font-bold uppercase tracking-wider ${tier.themeStyle.subTextColor}`}>
                      {tier.tagline}
                    </p>

                    {/* Investment Box */}
                    <div className="mt-5 border-y border-white/10 py-4">
                      <p className={`text-[10px] font-extrabold uppercase tracking-widest ${tier.themeStyle.subTextColor}`}>
                        Official Investment
                      </p>
                      <p className="display mt-1 text-4xl sm:text-5xl font-black text-marigold drop-shadow-sm">
                        {tier.price}
                      </p>
                    </div>

                    {/* Verified Benefits List (Fully visible without hover) */}
                    <div className="mt-6">
                      <p className={`text-xs font-extrabold uppercase tracking-wider mb-3 ${tier.themeStyle.subTextColor}`}>
                        Package Entitlements ({tier.benefits.length}):
                      </p>
                      <ul className="space-y-2.5">
                        {tier.benefits.map((b) => (
                          <li
                            key={b}
                            className={`flex items-start gap-2.5 text-xs leading-relaxed font-medium ${tier.themeStyle.subTextColor}`}
                          >
                            <span
                              className={`diamond mt-1.5 h-1.5 w-1.5 shrink-0 ${tier.themeStyle.diamondColor}`}
                              aria-hidden="true"
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Enquire Button */}
                  <div className="mt-8 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => handleEnquire(tier.name)}
                      className={`w-full rounded-2xl py-4 text-center font-head text-xs font-extrabold uppercase tracking-wider transition-all duration-200 ${
                        tier.themeStyle.btnClass
                      }`}
                    >
                      Enquire for {tier.name} →
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}

          {/* 6. Food Support Contribution Card */}
          <Reveal delay={400}>
            <div className="relative flex h-full flex-col justify-between rounded-[2.5rem] border-2 border-dashed border-[#F15A24]/60 bg-gradient-to-br from-[#FFF8E8] via-white to-[#FFF8E8] p-8 shadow-md hover:-translate-y-1 transition-all">
              <div>
                <span className="rounded-full bg-flame/15 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-flame">
                  Community Hospitality
                </span>

                <h3 className="display mt-5 text-3xl sm:text-4xl text-ink">
                  FOOD SUPPORT CONTRIBUTION
                </h3>
                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-flame">
                  Flexible Community Patronage
                </p>

                <div className="mt-5 border-y border-black/10 py-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-ink/50">
                    Contribution Amount
                  </p>
                  <p className="display mt-1 text-3xl text-gradient-fest font-black">
                    Any Amount
                  </p>
                </div>

                <div className="mt-6 space-y-4 text-xs sm:text-sm text-ink/75 font-medium leading-relaxed">
                  <p>
                    Contribute any amount and have your brand QR code featured on food distribution packages serving delegates, students, and attendees.
                  </p>
                  <div className="rounded-2xl border border-black/5 bg-cream p-4">
                    <p className="font-head text-xs font-bold text-ink">Key Benefit:</p>
                    <p className="mt-1 text-xs text-ink/70">
                      Direct individual brand QR code printed on food packets distributed throughout the 3 festival days.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-black/10">
                <button
                  type="button"
                  onClick={() => handleEnquire('Food Support Contribution')}
                  className="w-full rounded-2xl bg-gradient-to-r from-flame to-marigold py-4 text-center font-head text-xs font-extrabold uppercase tracking-wider text-ink shadow-md hover:scale-105 transition-all"
                >
                  Contribute Food Support →
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Venue Advantage & Highway Corridor */}
      <section className="container-x mt-12">
        <Reveal>
          <div className="rounded-[2.5rem] border-2 border-[#E8DFD2] bg-white p-8 sm:p-12 shadow-lg grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="chip border-marigold/40 text-night bg-marigold/10 mb-3">Prime Location Advantage</span>
              <h3 className="display text-3xl sm:text-4xl text-ink">
                MAVOOR–KOZHIKODE ROAD <span className="text-gradient-fest">CORRIDOR</span>
              </h3>
              <p className="mt-3 text-sm text-ink/70 leading-relaxed font-medium">
                The fest grounds at Shamsul Huda Islamic Academy occupy a premier roadside parcel on one of the busiest highway arteries connecting Kozhikode City, Calicut Medical College, and Mavoor.
              </p>

              <ul className="mt-6 space-y-2.5 text-xs text-ink/80 font-medium">
                <li className="flex items-center gap-2.5">
                  <span className="diamond h-1.5 w-1.5 bg-flame" />
                  Direct roadside highway visibility for entrance arches and LED displays
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="diamond h-1.5 w-1.5 bg-marigold" />
                  Convenient access from Kozhikode Railway Station (~12 KM) & Calicut Airport
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="diamond h-1.5 w-1.5 bg-leaf" />
                  Dedicated parking grounds, cultural pavilions, and Edumart Book Fest stalls
                </li>
              </ul>
            </div>

            <div className="lg:col-span-5 overflow-hidden rounded-2xl shadow-md border border-black/10 aspect-[4/3]">
              <img
                src="/media/campus.jpg"
                alt="Fest ground at Shamsul Huda Islamic Academy, Kuttikkattur"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* 6. Sponsorship Enquiry Section */}
      <section id="enquiry" className="container-x mt-16 scroll-mt-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <Reveal>
              <div className="rounded-3xl border-2 border-[#E8DFD2] bg-white p-7 shadow-sm">
                <p className="kicker text-flame">Connect Directly</p>
                <h3 className="display mt-1 text-2xl text-ink">TALK TO OUR MARKETING HEAD</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink/65 font-medium">
                  Detailed rate cards, stage dimensions, and customized brand activation packages are provided directly by our marketing lead.
                </p>

                <div className="mt-6 rounded-2xl border border-black/5 bg-cream/70 p-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-ink/40">Marketing Head</p>
                  <p className="font-head text-base font-extrabold text-ink mt-0.5">Sinan P</p>
                  <p className="text-xs text-flame font-bold">Partnerships & Sponsorships</p>
                  <p className="mt-1 text-xs text-ink/60 font-medium">Shamsul Huda Islamic Academy, Kuttikkattur</p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <a href="tel:+919562008296" className="chip border-flame/40 text-flame font-bold hover:bg-flame/10">
                    📞 +91 95620 08296
                  </a>
                  <a
                    href="https://wa.me/919562008296"
                    target="_blank"
                    rel="noreferrer"
                    className="chip border-leaf/40 text-leaf font-bold hover:bg-leaf/10"
                  >
                    💬 WhatsApp
                  </a>
                  <a href="mailto:sibaqkuttikatoor@gmail.com" className="chip border-marigold/40 text-ink/80 font-bold hover:bg-marigold/10">
                    ✉️ sibaqkuttikatoor@gmail.com
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <div className="rounded-3xl border-2 border-[#E8DFD2] bg-white shadow-xl p-2 sm:p-4">
                <EnquiryForm
                  kind="sponsor"
                  heading={`Submit Sponsorship Enquiry (${selectedTierForEnquiry})`}
                />
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* Autonomous Animated Shape Divider before Thank You closing section */}
      <div className="w-full max-w-4xl mx-auto my-16 px-4">
        <ShapeDivider className="w-full h-14 sm:h-18" />
      </div>

      {/* 7. Full-Width Animated Thank You Closing Section */}
      <ThankYouSection />
    </div>
  );
}
