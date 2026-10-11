import IntroHero from '../components/IntroHero';
import StatsSection from '../components/StatsSection';
import ProgrammesSection from '../components/ProgrammesSection';
import PartnerGrid from '../components/PartnerGrid';
import EdumartFeatureSection from '../components/EdumartFeatureSection';
import GameCTA from '../components/GameCTA';
import FestivalParticles from '../components/FestivalParticles';
import HomePreviews from '../components/HomePreviews';
import PennantGarland from '../components/PennantGarland';
import Ribbon from '../components/Ribbon';
import GeometricSparkles from '../components/GeometricSparkles';
import SectionHead from '../components/SectionHead';
import Reveal from '../components/Reveal';
import ShapeDivider from '../components/ShapeDivider';
import ThankYouSection from '../components/ThankYouSection';

export default function Home() {
  return (
    <>
      <FestivalParticles density="sparse" />
      
      {/* 1. Cinematic Photographic Hero */}
      <IntroHero />
      
      <Ribbon variant="flame" />

      {/* 2. Statistics & Festival Reach Section */}
      <StatsSection />
      
      <PennantGarland className="opacity-80" />

      {/* 3. Cultural Disciplines & Programmes Section (Constellation, Marquee & 4 Spotlight SVGs) */}
      <ProgrammesSection />

      {/* 4. Brand Partners Showcase */}
      <section className="relative py-20 sm:py-24 bg-[#FFF8E8] border-b border-black/5 overflow-hidden">
        <GeometricSparkles className="absolute top-0 right-0 w-1/2 opacity-35 pointer-events-none scale-x-[-1]" />
        <div className="container-x relative z-10">
          <SectionHead
            kicker="Institutional & Brand Partners"
            title={
              <>
                Partners in <span className="text-gradient-fest">possibilities</span>
              </>
            }
            note="Institutional foundation and brand partners collaborating with the 11th biennial edition."
          />
          <div className="mt-10">
            <Reveal>
              <PartnerGrid />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Transition: Shape Divider into Edumart Book Fest */}
      <div className="w-full max-w-4xl mx-auto my-4 px-4">
        <ShapeDivider className="w-full h-14 sm:h-18" />
      </div>

      {/* 5. Edumart Book Fest '26 Feature Section */}
      <EdumartFeatureSection />

      {/* 6. Daily Quiz Callout (With FestivalPass) */}
      <GameCTA />

      <Ribbon variant="gold" />

      {/* 7. Remaining Main Scroll Experience: Team, Media, Donation, Promote, Sponsors */}
      <HomePreviews />

      {/* 8. Full-Width Animated Thank You Section */}
      <div className="w-full max-w-4xl mx-auto my-4 px-4">
        <ShapeDivider className="w-full h-14 sm:h-18" />
      </div>
      <ThankYouSection />
    </>
  );
}
