import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import LivingBookIllustration from './LivingBookIllustration';

export default function EdumartFeatureSection() {
  return (
    <section className="container-x py-16 sm:py-24 relative overflow-hidden">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-ember via-flame to-ember p-1 shadow-2xl ring-2 ring-flame/30">
          {/* Internal background texture */}
          <div className="pattern-dots absolute inset-0 opacity-20 pointer-events-none" />
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-marigold/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-leaf/20 blur-3xl pointer-events-none" />

          {/* Main Card Grid */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 rounded-[2.3rem] bg-[#191919] p-8 sm:p-12 lg:p-16 text-white overflow-hidden">
            
            {/* Left Content Column */}
            <div className="w-full lg:w-7/12 flex flex-col items-start text-left">
              
              {/* Brand Tag + Edumart Logo */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-marigold/40 bg-marigold/10 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.2em] text-marigold">
                  <span className="diamond h-1.5 w-1.5 bg-marigold" />
                  Special Cultural Feature
                </span>
                <img
                  src="https://i.ibb.co/Z6mMFk2s/edumart-perinthalmanna-malappuram-supermarkets-ihbbosyt34.jpg"
                  alt="Edumart"
                  className="h-7 w-auto rounded bg-white px-2 py-0.5 object-contain shadow-sm"
                />
              </div>

              {/* Headline */}
              <h2 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[0.95]">
                EDUMART BOOK FEST '26
              </h2>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/80 max-w-xl font-medium">
                A reader-first pavilion beside the main fest ground — showcasing scholarly publications, translations, classic Islamic literature, academic texts, and children’s volumes.
              </p>

              {/* Highlights: 50–70% OFF & 1,000+ BOOKS */}
              <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-lg">
                {/* 50–70% Discount Badge */}
                <div className="rounded-2xl border-2 border-marigold/60 bg-gradient-to-br from-flame/30 to-ember/40 p-4 sm:p-5 shadow-lg backdrop-blur-sm">
                  <span className="font-head text-[11px] font-extrabold uppercase tracking-widest text-marigold">
                    Festival Discount
                  </span>
                  <p className="display text-3xl sm:text-4xl text-marigold mt-1">
                    50–70% OFF
                  </p>
                  <p className="text-[11px] text-white/70 mt-0.5 font-bold">
                    On selected book collections
                  </p>
                </div>

                {/* 1,000+ Books at Fair */}
                <div className="rounded-2xl border-2 border-leaf/60 bg-gradient-to-br from-leaf/20 to-black/40 p-4 sm:p-5 shadow-lg backdrop-blur-sm">
                  <span className="font-head text-[11px] font-extrabold uppercase tracking-widest text-leaf">
                    Curated Fair
                  </span>
                  <p className="display text-3xl sm:text-4xl text-leaf mt-1">
                    1,000+ BOOKS
                  </p>
                  <p className="text-[11px] text-white/70 mt-0.5 font-bold">
                    Leading national publishers
                  </p>
                </div>
              </div>

              {/* CTA Action */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/edumart-book-fest"
                  className="rounded-2xl bg-gradient-to-r from-flame via-marigold to-flame px-7 py-4 font-head text-xs sm:text-sm font-extrabold uppercase tracking-[0.18em] text-ink shadow-[0_10px_25px_rgba(241,90,36,0.4)] transition-all hover:scale-105 hover:shadow-[0_15px_30px_rgba(241,90,36,0.6)]"
                >
                  Explore the Book Fest →
                </Link>
                <span className="font-head text-xs font-bold text-white/60 tracking-wider">
                  November 20–22, 2026 · Fest Grounds
                </span>
              </div>
            </div>

            {/* Right Column: Animated Living Book Illustration */}
            <div className="w-full lg:w-5/12 flex items-center justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-[500/380]">
                <LivingBookIllustration className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]" />
              </div>
            </div>

          </div>
        </div>
      </Reveal>
    </section>
  );
}
