import { Link } from 'react-router-dom';
import { useSite } from '../lib/site';
import IntroHero from '../components/IntroHero';
import StatsSection from '../components/StatsSection';
import PartnerGrid from '../components/PartnerGrid';
import GameCTA from '../components/GameCTA';
import FestivalParticles from '../components/FestivalParticles';
import HomePreviews from '../components/HomePreviews';
import PennantGarland from '../components/PennantGarland';
import FestivalRibbon from '../components/FestivalRibbon';
import Ribbon from '../components/Ribbon';
import GeometricSparkles from '../components/GeometricSparkles';
import SectionHead from '../components/SectionHead';
import Reveal from '../components/Reveal';

export default function Home() {
  const site = useSite();

  return (
    <>
      <FestivalParticles density="sparse" />
      <IntroHero />
      <Ribbon variant="flame" />
      <StatsSection />
      <PennantGarland className="opacity-80" />

      {/* Disciplines Marquee */}
      {site && (
        <section className="relative overflow-hidden bg-ember py-4 border-y-2 border-black/10">
          <Reveal>
            <div className="flex w-max whitespace-nowrap animate-marquee">
              {[0, 1].map((half) => (
                <div key={half} className="flex items-center">
                  {site.about.disciplines.map((d, i) => (
                    <div key={i} className="flex items-center text-night">
                      <span className="font-display text-2xl uppercase tracking-widest">{d}</span>
                      <span className="mx-6 diamond h-3 w-3 animate-pulse bg-marigold shadow-[0_0_12px_rgba(255,201,40,0.8)]" aria-hidden="true" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p className="mt-5 text-center relative z-10">
              <Link to="/about" className="rounded-full bg-night/10 px-5 py-2 font-head text-[11px] font-extrabold uppercase tracking-[0.2em] text-night backdrop-blur hover:bg-night/20 transition-colors">
                Explore the fest
              </Link>
            </p>
          </Reveal>
        </section>
      )}

      {/* Partners */}
      <section className="container-x py-16 sm:py-20 relative">
        <GeometricSparkles className="absolute top-0 right-0 w-1/2 opacity-40 pointer-events-none scale-x-[-1]" />
        <SectionHead
          kicker="Brand partners"
          title={
            <>
              Partners in <span className="text-gradient-fest">possibilities</span>
            </>
          }
        />
        <div className="mt-8">
          <Reveal>
            <PartnerGrid />
          </Reveal>
        </div>
        <p className="mt-5 text-center">
          <Link to="/partners" className="text-xs font-extrabold uppercase tracking-[0.22em] text-marigold hover:underline">
            View all partners →
          </Link>
        </p>
      </section>

      {/* Edumart teaser */}
      {site && (
        <section className="container-x py-12 relative mt-4">
          <FestivalRibbon className="absolute top-0 left-0 right-0 z-0 opacity-40 scale-y-[-1]" />
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-white p-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5">
              <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-flame/5" aria-hidden="true" />
              
              <div className="relative flex flex-col md:flex-row md:items-center overflow-hidden rounded-[1.8rem] bg-white">
                {/* Image side */}
                <div className="relative aspect-video w-full md:w-2/5 md:aspect-square lg:aspect-video shrink-0 bg-gray-50 border-r border-black/5">
                  <img src="https://i.ibb.co/Z6mMFk2s/edumart-perinthalmanna-malappuram-supermarkets-ihbbosyt34.jpg" alt="Edumart Book Fest" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                </div>
                
                {/* Content side */}
                <div className="relative p-8 md:p-10 lg:p-12 flex-1">
                  <span className="diamond absolute -right-6 -top-6 h-24 w-24 bg-marigold/10" aria-hidden="true" />
                  <span className="absolute left-8 top-10 h-12 w-12 rounded-full border-4 border-dashed border-marigold/30 animate-spin-slow" aria-hidden="true" />
                  
                  <div className="relative z-10 pl-6 sm:pl-0 mt-6 sm:mt-0">
                    <p className="kicker text-flame">Special cultural feature</p>
                    <h2 className="display mt-3 text-4xl text-ink sm:text-5xl uppercase tracking-wide">EDUMART BOOK FEST '26</h2>
                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink/70 font-medium">{site.bookfest.blurb}</p>
                    
                    <div className="mt-8 flex items-center gap-4">
                      <Link to="/edumart-book-fest" className="rounded-xl bg-gradient-to-r from-flame to-ember px-6 py-3.5 font-head text-[13px] font-extrabold uppercase tracking-[0.15em] text-white shadow-lg transition-transform hover:-translate-y-0.5">
                        Discover
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <FestivalRibbon className="absolute bottom-0 left-0 right-0 z-0 opacity-40" />
        </section>
      )}

      <GameCTA />
      <Ribbon variant="gold" />
      <HomePreviews />
    </>
  );
}
