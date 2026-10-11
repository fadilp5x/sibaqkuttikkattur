import { useState } from 'react';
import { useSite } from '../lib/site';
import Reveal from '../components/Reveal';
import DonationFrame from '../components/DonationFrame';
import PennantGarland from '../components/PennantGarland';
import FestivalRibbon from '../components/FestivalRibbon';

export default function DonationPage() {
  const site = useSite();
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  if (!site) return <div className="min-h-screen bg-paper" />;
  const d = site.donation;

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(d.upi);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard fallback */
    }
  };

  return (
    <div className="min-h-screen bg-paper pb-28 pt-20">
      {/* 1. Dramatic Hero Section with Brand Gradient & Warm Carnival Feel */}
      <section className="relative overflow-hidden bg-gradient-to-br from-night via-night to-plum pb-20 pt-12 sm:pt-16 text-white">
        <PennantGarland className="absolute top-0 left-0 right-0 opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-flame/20 via-transparent to-transparent opacity-70 pointer-events-none" />

        <div className="container-x relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-marigold/30 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-marigold mb-4 backdrop-blur-md">
              <span className="diamond h-1.5 w-1.5 bg-marigold" />
              Community Patronage & Endowment
              <span className="diamond h-1.5 w-1.5 bg-marigold" />
            </div>

            <h1 className="display text-5xl sm:text-6xl md:text-7xl leading-[0.95] text-white">
              SUPPORT THE <span className="text-gradient-fest">ACADEMY</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-white/80 max-w-2xl mx-auto font-medium">
              Every contribution helps strengthen the learning environment, student scholarships,
              and cultural opportunities available at Shamsul Huda Islamic Academy.
            </p>
          </div>

          {/* Main Contribution Stage */}
          <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-center">
            
            {/* Left: The Verified QR Code & Traditional Festive Frame */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <Reveal>
                <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-cream p-6 sm:p-8 text-ink shadow-2xl border-4 border-marigold/40">
                  {/* Decorative Frame Asset */}
                  <div className="absolute -top-12 -left-12 -right-12 h-44 opacity-25 pointer-events-none">
                    <DonationFrame />
                  </div>

                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-flame/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-flame mb-4">
                      <span className="h-2 w-2 rounded-full bg-flame animate-pulse" />
                      Official Verified Payment QR
                    </div>

                    {/* QR Code Container (Protected, Static, Never Rotated/Distorted) */}
                    <div className="relative rounded-2xl border-4 border-white bg-white p-3 shadow-xl">
                      {d.qr ? (
                        <img
                          src={d.qr}
                          alt={`Official donation QR code — ${d.title}`}
                          className="h-60 w-60 max-w-full object-contain"
                        />
                      ) : (
                        <div className="flex h-60 w-60 items-center justify-center rounded-xl border border-dashed border-black/20 text-center text-xs text-ink/40 p-4">
                          Official donation QR will be published here by the committee.
                        </div>
                      )}

                      {/* Zoom Button */}
                      {d.qr && (
                        <button
                          onClick={() => setShowQrModal(true)}
                          className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-night/80 text-white shadow-md transition-transform hover:scale-110"
                          title="Enlarge QR code"
                          aria-label="Enlarge QR code"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                          </svg>
                        </button>
                      )}
                    </div>

                    <p className="mt-4 text-xs font-bold text-ink/70">
                      Scan with Google Pay, PhonePe, Paytm or any BHIM UPI app
                    </p>

                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      <span className="rounded-md bg-black/5 px-2.5 py-1 font-mono text-[11px] font-bold text-ink/60">GPay</span>
                      <span className="rounded-md bg-black/5 px-2.5 py-1 font-mono text-[11px] font-bold text-ink/60">PhonePe</span>
                      <span className="rounded-md bg-black/5 px-2.5 py-1 font-mono text-[11px] font-bold text-ink/60">Paytm</span>
                      <span className="rounded-md bg-black/5 px-2.5 py-1 font-mono text-[11px] font-bold text-ink/60">BHIM</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: Payment Details, UPI Copy & Purpose */}
            <div className="lg:col-span-7">
              <Reveal delay={100}>
                <div className="rounded-[2.5rem] border border-white/10 bg-white/10 p-7 sm:p-10 backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center gap-2 text-marigold">
                    <span className="diamond h-2 w-2 bg-marigold" />
                    <p className="font-head text-xs font-extrabold uppercase tracking-widest">{d.title}</p>
                  </div>

                  <h2 className="display mt-2 text-3xl sm:text-4xl text-white">
                    DIRECT UPI & BANK TRANSFER
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    {d.description}
                  </p>

                  {/* Interactive UPI Copy Button */}
                  <button
                    onClick={copyUpi}
                    className="mt-6 flex w-full items-center justify-between rounded-2xl border-2 border-marigold/60 bg-gradient-to-r from-marigold/20 via-marigold/10 to-transparent p-5 text-left transition-all hover:bg-marigold/25 hover:border-marigold focus-visible:outline-2 focus-visible:outline-marigold"
                    aria-label={`Copy UPI ID ${d.upi}`}
                  >
                    <div>
                      <span className="block text-[10px] font-extrabold uppercase tracking-[0.25em] text-marigold">
                        Tap to Copy UPI ID
                      </span>
                      <span className="mt-1 block font-mono text-lg sm:text-xl font-extrabold text-white">
                        {d.upi}
                      </span>
                    </div>

                    <span className={`chip border-2 transition-all ${
                      copied 
                        ? 'border-leaf bg-leaf text-white font-bold scale-105' 
                        : 'border-marigold text-marigold bg-white/10 font-bold'
                    }`}>
                      {copied ? 'Copied ✓' : 'Copy UPI'}
                    </span>
                  </button>

                  {/* Account Information */}
                  {d.account && (
                    <div className="mt-5 rounded-2xl border border-white/15 bg-white/5 p-4 text-xs text-white/80">
                      <p className="font-extrabold uppercase tracking-wider text-marigold text-[10px]">Beneficiary Account</p>
                      <p className="mt-1 font-mono text-sm text-white font-medium">{d.account}</p>
                    </div>
                  )}

                  {/* Suggested Contributions */}
                  {d.tiers && d.tiers.length > 0 && (
                    <div className="mt-6">
                      <p className="font-head text-xs font-extrabold uppercase tracking-wider text-white/70">
                        Suggested Contributions
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2.5">
                        {d.tiers.map((t) => (
                          <span
                            key={t}
                            className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 font-mono text-sm font-extrabold text-marigold shadow-sm hover:border-marigold transition-colors"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="mt-2 text-[11px] text-white/50">
                        Every amount is received with deep gratitude. Enter your chosen amount directly in your UPI app.
                      </p>
                    </div>
                  )}

                  <div className="mt-6 flex items-start gap-3 rounded-2xl border border-leaf/30 bg-leaf/10 p-4 text-xs leading-relaxed text-white/80">
                    <span className="diamond mt-1 h-2 w-2 shrink-0 bg-leaf" />
                    <p>
                      <strong>Direct & Secure:</strong> Contributions go straight to the official account of Shamsul Huda Islamic Academy. The website does not store bank cards or personal financial information.
                    </p>
                  </div>
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

      {/* 2. Educational & Institutional Pillars (Informative Scroll Storytelling) */}
      <section className="container-x py-12">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <p className="kicker text-flame">Impact & Purpose</p>
          <h2 className="display mt-2 text-3xl sm:text-4xl text-ink">
            WHERE YOUR <span className="text-gradient-fest">SUPPORT GOES</span>
          </h2>
          <p className="mt-2 text-sm text-ink/65">
            Empowering scholastic excellence, moral scholarship, and cultural development at Kuttikkattur.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Reveal delay={50}>
            <div className="h-full rounded-3xl border border-black/10 bg-cream p-7 shadow-sm transition-transform hover:-translate-y-1">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-flame/15 text-2xl text-flame mb-5">
                🎓
              </span>
              <h3 className="font-head text-lg font-extrabold text-ink">Student Scholarships</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink/65 font-medium">
                Supporting deserving young minds pursuing integrated religious and secular higher education with full boarding and academic resources.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="h-full rounded-3xl border border-black/10 bg-cream p-7 shadow-sm transition-transform hover:-translate-y-1">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-marigold/20 text-2xl text-night mb-5">
                📚
              </span>
              <h3 className="font-head text-lg font-extrabold text-ink">Library & Research Pavilions</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink/65 font-medium">
                Equipping our campus library with classical Arabic manuscripts, translations, contemporary science and humanities reference volumes.
              </p>
            </div>
          </Reveal>

          <Reveal delay={190}>
            <div className="h-full rounded-3xl border border-black/10 bg-cream p-7 shadow-sm transition-transform hover:-translate-y-1">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf/20 text-2xl text-leaf mb-5">
                🎨
              </span>
              <h3 className="font-head text-lg font-extrabold text-ink">Cultural Arts Infrastructure</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink/65 font-medium">
                Nurturing oratory, calligraphy, literature and debate stages that prepare students for national platforms and community leadership.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. The Hosting Institution Banner */}
      <section className="container-x mt-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-plum via-night to-plum p-8 sm:p-12 text-white shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="chip border-marigold/40 text-marigold mb-3">Shamsul Huda Islamic Academy</span>
                <h3 className="display text-3xl sm:text-4xl">AN ENDURING HERITAGE IN KUTTIKKATTUR</h3>
                <p className="mt-3 text-sm text-white/75 leading-relaxed">
                  Functioning under the supervision of Kuttikkattoor Muslim Jamaath Committee and affiliated with Darul Huda Islamic University, the academy fosters leaders of intellect, ethics, and social commitment.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={copyUpi}
                  className="rounded-xl bg-gradient-to-r from-flame to-ember px-6 py-3.5 font-head text-xs font-extrabold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105"
                >
                  {copied ? 'Copied UPI ID ✓' : 'Contribute via UPI'}
                </button>
                <a
                  href={`tel:${site.site.phoneRaw}`}
                  className="rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 font-head text-xs font-extrabold uppercase tracking-wider text-white text-center hover:bg-white/20 transition-colors"
                >
                  Contact Committee
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* QR Code Zoom Modal */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-night/90 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged Donation QR Code"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="relative flex flex-col items-center rounded-3xl bg-white p-8 max-w-sm w-full text-center shadow-2xl animate-pop"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-ink hover:bg-black/10"
              aria-label="Close"
            >
              ✕
            </button>
            <h4 className="font-head text-lg font-extrabold text-ink">Official UPI QR Code</h4>
            <p className="mt-1 text-xs text-ink/60">{d.title}</p>
            <div className="mt-4 rounded-2xl border-4 border-cream p-2 bg-white">
              <img src={d.qr} alt="Donation QR Code" className="h-64 w-64 object-contain" />
            </div>
            <p className="mt-4 font-mono text-sm font-extrabold text-flame">{d.upi}</p>
            <button
              onClick={copyUpi}
              className="mt-3 w-full rounded-xl bg-flame py-2.5 font-head text-xs font-extrabold uppercase tracking-wider text-white"
            >
              {copied ? 'Copied ✓' : 'Copy UPI ID'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
