import { useEffect, useState } from 'react';
import { api, type SponsorPackage, type Partner } from '../lib/api';
import EnquiryForm from '../components/EnquiryForm';
import Reveal from '../components/Reveal';
import SponsorStageEmblem from '../components/SponsorStageEmblem';
import PennantGarland from '../components/PennantGarland';
import FestivalRibbon from '../components/FestivalRibbon';

const VERIFIED_REACH = [
  { value: '4,000+', label: 'Competing Candidates', note: 'Pan-India collegiate participants' },
  { value: '35+', label: 'Collegiate Campuses', note: 'Institutions represented' },
  { value: '1,000+', label: 'Daily On-Ground Visitors', note: 'Audience, scholars & guests' },
  { value: 'Global', label: 'YouTube Livestream', note: 'Worldwide diaspora broadcast' },
];

export default function SponsorsPage() {
  const [packages, setPackages] = useState<SponsorPackage[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    api.sponsors().then(setPackages).catch(() => setPackages([]));
    api.partners().then(setPartners).catch(() => setPartners([]));
  }, []);

  const anyUnconfirmed = packages.some((p) => p.price === null && p.slots !== 'Custom');

  return (
    <div className="min-h-screen bg-paper pb-28 pt-20">
      {/* 1. Dramatic Stage Hero with Canopy & Spotlight Artwork */}
      <section className="relative overflow-hidden bg-gradient-to-br from-night via-night to-plum pb-20 pt-12 sm:pt-16 text-white">
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
              <div className="rounded-3xl border border-black/10 bg-white p-6 text-center shadow-lg transition-transform hover:-translate-y-1">
                <p className="display text-3xl sm:text-4xl text-flame">{r.value}</p>
                <p className="mt-1 text-xs font-head font-extrabold uppercase tracking-wider text-ink">{r.label}</p>
                <p className="mt-1 text-[11px] text-ink/50">{r.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Decorative Ribbon Transition */}
      <div className="relative my-10">
        <FestivalRibbon className="w-full opacity-35" />
      </div>

      {/* 3. Confirmed Institutional Organizers & Partners */}
      {partners.length > 0 && (
        <section className="container-x py-6">
          <div className="rounded-3xl border border-black/10 bg-cream/70 p-8 text-center shadow-sm">
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

      {/* 4. Sponsorship Packages & Tiers */}
      <section id="packages" className="container-x py-12 scroll-mt-24">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <p className="kicker text-flame">Curated Tiers</p>
          <h2 className="display mt-2 text-3xl sm:text-5xl text-ink">
            SPONSORSHIP <span className="text-gradient-fest">PACKAGES</span>
          </h2>
          <p className="mt-2 text-sm text-ink/65">
            Select a tier tailored to your enterprise goals or discuss a bespoke branded activation.
          </p>
        </div>

        {anyUnconfirmed && (
          <div className="mb-8 rounded-2xl border border-marigold/40 bg-marigold/10 p-4 text-center text-xs text-ink/75">
            <span className="font-bold text-ink">Note on Rates:</span> Selected package availability and customized activations are confirmed by the organizing committee.
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((p, i) => {
            const isTitle = i === 0;
            const isFeatured = i === 1;

            return (
              <Reveal key={p.id} delay={(i % 3) * 80}>
                <div
                  className={`relative flex h-full flex-col rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1.5 shadow-md ${
                    isTitle
                      ? 'border-2 border-flame bg-gradient-to-b from-white via-cream to-white ring-4 ring-flame/10'
                      : isFeatured
                      ? 'border border-marigold/60 bg-white'
                      : 'border border-black/10 bg-white'
                  }`}
                >
                  {/* Tier Badge */}
                  {isTitle && (
                    <span className="absolute -top-3.5 right-6 rounded-full bg-gradient-to-r from-flame to-ember px-4 py-1 text-[11px] font-extrabold uppercase tracking-widest text-white shadow-md">
                      Flagship Tier · 1 Slot
                    </span>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="chip border-black/10 text-ink/60">{p.slots}</span>
                    <span className="text-xs font-bold text-flame uppercase tracking-wider">{p.tagline}</span>
                  </div>

                  <h3 className="display mt-4 text-2xl sm:text-3xl text-ink">{p.name}</h3>

                  {/* Pricing Display */}
                  <div className="mt-4 pb-4 border-b border-black/10">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-ink/40">Investment</p>
                    <p className="display mt-1 text-3xl sm:text-4xl text-gradient-fest font-extrabold">
                      {p.price ? p.price : <span className="text-2xl text-ink/50">Custom / On Request</span>}
                    </p>
                  </div>

                  {/* Benefits List */}
                  <ul className="mt-6 flex-1 space-y-3">
                    {p.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-xs leading-relaxed text-ink/75 font-medium">
                        <span className="diamond mt-1 h-1.5 w-1.5 shrink-0 bg-marigold" aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tier Call to Action */}
                  <div className="mt-8 pt-4">
                    <a
                      href="#enquiry"
                      className={`block w-full rounded-xl py-3 text-center font-head text-xs font-extrabold uppercase tracking-wider transition-all ${
                        isTitle
                          ? 'bg-gradient-to-r from-flame to-ember text-white shadow-lg shadow-flame/20 hover:opacity-90'
                          : 'border border-black/20 bg-cream/50 text-ink hover:border-flame hover:text-flame hover:bg-white'
                      }`}
                    >
                      Enquire for {p.name}
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* 5. Venue Advantage & Highway Corridor */}
      <section className="container-x mt-12">
        <Reveal>
          <div className="rounded-[2.5rem] border border-black/10 bg-white p-8 sm:p-12 shadow-lg grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="chip border-marigold/40 text-night bg-marigold/10 mb-3">Prime Location Advantage</span>
              <h3 className="display text-3xl sm:text-4xl text-ink">
                MAVOOR–KOZHIKODE ROAD <span className="text-gradient-fest">CORRIDOR</span>
              </h3>
              <p className="mt-3 text-sm text-ink/70 leading-relaxed">
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
              <div className="rounded-3xl border border-black/10 bg-white p-7 shadow-sm">
                <p className="kicker text-flame">Connect Directly</p>
                <h3 className="display mt-1 text-2xl text-ink">TALK TO OUR MARKETING HEAD</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink/60">
                  Detailed rate cards, stage dimensions, and customized brand activation packages are provided directly by our marketing lead.
                </p>

                <div className="mt-6 rounded-2xl border border-black/5 bg-cream/70 p-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-ink/40">Marketing Head</p>
                  <p className="font-head text-base font-extrabold text-ink mt-0.5">Sinan P</p>
                  <p className="text-xs text-flame font-bold">Partnerships & Sponsorships</p>
                  <p className="mt-2 text-xs text-ink/60">Shamsul Huda Islamic Academy, Kuttikkattur</p>
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
              <div className="rounded-3xl border border-black/10 bg-white shadow-xl p-2 sm:p-4">
                <EnquiryForm kind="sponsor" heading="Submit Sponsorship Enquiry" />
              </div>
            </Reveal>
          </div>

        </div>
      </section>
    </div>
  );
}
