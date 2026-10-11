import { useState } from 'react';
import { useSite } from '../lib/site';
import EnquiryForm from '../components/EnquiryForm';
import Reveal from '../components/Reveal';
import PromoteMegaphone from '../components/PromoteMegaphone';
import PennantGarland from '../components/PennantGarland';
import FestivalRibbon from '../components/FestivalRibbon';

const CHANNELS = [
  {
    icon: '🛣️',
    title: 'Highway Hoardings',
    tag: 'Outdoor Reach',
    text: 'Prominent QR-enabled display boards along the high-traffic Mavoor–Kozhikode highway corridor, seen by thousands of daily commuters.',
  },
  {
    icon: '📺',
    title: 'Mobile LED Displays',
    tag: 'Dynamic Motion',
    text: 'Fleet of moving high-lumen screens traversing the fest zone, broadcast pavilions, and food court across all three festival days.',
  },
  {
    icon: '🎤',
    title: 'Main Stage Backdrop',
    tag: 'Headline Spotlight',
    text: 'Prime brand presence behind every headline session, national debate, awards ceremony, and distinguished scholarly gathering.',
  },
  {
    icon: '🎬',
    title: 'Custom Brand Films & Digital Reels',
    tag: 'Digital Reach',
    text: 'Tailored festival reels, social campaigns, and livestream sponsor lower-thirds reaching alumni and community networks worldwide.',
  },
];

export default function PromotePage() {
  const site = useSite();
  const s = site?.site;
  const [copiedLink, setCopiedLink] = useState(false);

  const copyEventLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      /* clipboard fallback */
    }
  };

  const shareToWhatsapp = () => {
    const text = encodeURIComponent(
      `Check out SIBAQ National Arts Fest '26 at Kuttikkattur, Kozhikode! Visit the official portal: ${window.location.origin}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-paper pb-28 pt-20">
      {/* 1. High-Energy Campaign Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-flame via-ember to-night pb-20 pt-12 sm:pt-16 text-white">
        <PennantGarland className="absolute top-0 left-0 right-0 opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-marigold/20 via-transparent to-transparent opacity-60 pointer-events-none" />

        <div className="container-x relative z-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            
            {/* Left: Text & Key Actions */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-marigold/30 bg-black/20 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-marigold mb-4 backdrop-blur-md">
                <span className="diamond h-1.5 w-1.5 bg-marigold" />
                Public Campaign & Outreach
                <span className="diamond h-1.5 w-1.5 bg-marigold" />
              </div>

              <h1 className="display text-5xl sm:text-6xl md:text-7xl leading-[0.95] text-white">
                SPREAD THE <br />
                <span className="text-marigold drop-shadow-md">SIBAQ SPIRIT</span>
              </h1>

              <p className="mt-5 text-base sm:text-lg leading-relaxed text-white/90 max-w-xl font-medium">
                From roadside highway hoardings to digital festival reels, join us in putting
                South India's most celebrated collegiate arts fest on every screen and street.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={copyEventLink}
                  className="rounded-xl bg-white px-6 py-3.5 font-head text-xs font-extrabold uppercase tracking-wider text-night shadow-xl transition-all hover:bg-cream hover:scale-105"
                >
                  {copiedLink ? 'Event Link Copied ✓' : 'Copy Festival Link'}
                </button>
                <button
                  onClick={shareToWhatsapp}
                  className="rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 font-head text-xs font-extrabold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-leaf hover:border-leaf"
                >
                  Share to WhatsApp
                </button>
                <a
                  href="#enquiry"
                  className="rounded-xl border border-marigold/50 bg-marigold/20 px-6 py-3.5 font-head text-xs font-extrabold uppercase tracking-wider text-marigold hover:bg-marigold hover:text-night transition-all"
                >
                  Partner With Us ↓
                </a>
              </div>
            </div>

            {/* Right: Festive Megaphone Illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <Reveal>
                <div className="relative w-full max-w-sm aspect-[5/4] flex items-center justify-center p-2">
                  <PromoteMegaphone />
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* Decorative Ribbon Transition */}
      <div className="relative my-8">
        <FestivalRibbon className="w-full opacity-35" />
      </div>

      {/* 2. Official Promotional Channels */}
      <section className="container-x py-10">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <p className="kicker text-marigold">Exposure Opportunities</p>
          <h2 className="display mt-2 text-3xl sm:text-4xl text-ink">
            PROMOTION <span className="text-gradient-fest">CHANNELS</span>
          </h2>
          <p className="mt-2 text-sm text-ink/60">
            Reach thousands of attendees, campus delegations, and digital viewers across Kozhikode.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="h-full rounded-3xl border border-black/10 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cream text-3xl shadow-inner" aria-hidden="true">
                    {c.icon}
                  </span>
                  <span className="rounded-full bg-flame/10 px-3 py-1 font-head text-[10px] font-extrabold uppercase tracking-wider text-flame">
                    {c.tag}
                  </span>
                </div>
                <h3 className="font-head text-lg font-extrabold text-ink mt-5">{c.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink/65 font-medium">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. Downloadable Branding & Social Media Creatives */}
      <section className="container-x mt-12">
        <Reveal>
          <div className="rounded-[2.5rem] border border-black/10 bg-cream p-8 sm:p-12 shadow-md">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="chip border-flame/30 text-flame mb-3">Official Brand Media</span>
                <h3 className="display text-3xl sm:text-4xl text-ink">DOWNLOAD CAMPAIGN ASSETS</h3>
                <p className="mt-3 text-sm text-ink/70 leading-relaxed">
                  Support SIBAQ on your social feed, community posters, or local noticeboards.
                  Download high-resolution official vector badges and brand emblems.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="/media/brand-lockup.jpg"
                  download="sibaq-official-lockup.jpg"
                  className="flex items-center gap-2 rounded-xl bg-flame px-5 py-3 font-head text-xs font-extrabold uppercase tracking-wider text-white shadow-md hover:bg-ember transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Official Lockup (JPG)
                </a>
                <a
                  href="/media/brand-logotype.png"
                  download="sibaq-logotype.png"
                  className="flex items-center gap-2 rounded-xl border border-black/20 bg-white px-5 py-3 font-head text-xs font-extrabold uppercase tracking-wider text-ink shadow-sm hover:border-flame hover:text-flame transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Transparent Logo (PNG)
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 4. Expression of Interest / Enquiry Form */}
      <section id="enquiry" className="container-x mt-16 scroll-mt-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          
          {/* Direct Marketing Contact */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal>
              <div className="rounded-3xl border border-black/10 bg-white p-7 shadow-sm">
                <p className="kicker text-marigold">Direct Coordination</p>
                <h3 className="display mt-1 text-2xl text-ink">MARKETING COMMITTEE</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink/60">
                  Connect directly with the student marketing and brand activations team for stalls, hoardings, or custom partnerships.
                </p>

                {s && (
                  <div className="mt-6 space-y-3">
                    <div className="rounded-2xl border border-black/5 bg-cream/70 p-4">
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-ink/40">Marketing Head</p>
                      <p className="font-head text-base font-extrabold text-ink mt-0.5">Sinan P</p>
                      <p className="text-xs text-flame font-bold">Partnerships & Outreach</p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <a href={`tel:${s.phoneRaw}`} className="chip border-flame/40 text-flame font-bold hover:bg-flame/10">
                        📞 Call {s.phone}
                      </a>
                      <a
                        href={`https://wa.me/${s.whatsapp}`}
                        target="_blank"
                        rel="noreferrer"
                        className="chip border-leaf/40 text-leaf font-bold hover:bg-leaf/10"
                      >
                        💬 WhatsApp
                      </a>
                      <a href={`mailto:${s.email}`} className="chip border-marigold/40 text-ink/80 font-bold hover:bg-marigold/10">
                        ✉️ {s.email}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-3xl border border-black/10 bg-cream p-6 text-xs text-ink/65 leading-relaxed">
                <span className="diamond inline-block h-1.5 w-1.5 bg-flame mr-2" />
                <strong>Press & Media Accreditations:</strong> Photojournalists and regional reporters can request press access through the same enquiry desk.
              </div>
            </Reveal>
          </div>

          {/* Enquiry Form */}
          <div className="lg:col-span-7">
            <Reveal delay={150}>
              <div className="rounded-3xl border border-black/10 bg-white shadow-xl p-2 sm:p-4">
                <EnquiryForm kind="promote" heading="Submit Promotion Request" />
              </div>
            </Reveal>
          </div>

        </div>
      </section>
    </div>
  );
}
