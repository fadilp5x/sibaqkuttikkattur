import { Link } from 'react-router-dom';
import { useSite } from '../lib/site';
import Reveal from './Reveal';
import ProgrammeConstellation from './ProgrammeConstellation';
import DebateSparks from './DebateSparks';
import LivingCalligraphy from './LivingCalligraphy';
import CreativeBrush from './CreativeBrush';
import PoetryScroll from './PoetryScroll';
import ShapeDivider from './ShapeDivider';

export default function ProgrammesSection() {
  const site = useSite();
  const disciplines = site?.about.disciplines ?? [
    'Debates & Oratory',
    'Arabic Calligraphy',
    'Visual Arts',
    'Classical Poetry',
    'Scholastic Research',
    'Media & Design',
  ];

  return (
    <section id="programmes" className="relative bg-[#FFFDF8] pt-16 pb-6 overflow-hidden">
      {/* 1. Programme Introduction & Constellation */}
      <div className="container-x relative z-10">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
            {/* Autonomous Animated Programme Constellation */}
            <div className="w-48 sm:w-64 h-36 sm:h-44 mb-3">
              <ProgrammeConstellation className="w-full h-full drop-shadow-md" />
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-flame/30 bg-flame/5 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-flame mb-3">
              <span className="diamond h-1.5 w-1.5 bg-flame" />
              Fest Categories & Disciplines
              <span className="diamond h-1.5 w-1.5 bg-flame" />
            </div>

            <h2 className="display text-4xl sm:text-5xl lg:text-6xl text-ink uppercase leading-[0.95]">
              CULTURAL <span className="text-gradient-fest">DISCIPLINES</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-ink/70 leading-relaxed max-w-2xl font-medium">
              Over 4,000 competing scholars from across South India demonstrate eloquence, classical Islamic calligraphy, visual expression, and literary heritage across three intense festival days.
            </p>
          </div>
        </Reveal>
      </div>

      {/* 2. Cultural Disciplines Animated Marquee */}
      <div className="mt-12 overflow-hidden bg-gradient-to-r from-ember via-flame to-ember py-4 border-y-2 border-black/15 shadow-md">
        <div className="flex w-max whitespace-nowrap animate-marquee">
          {[0, 1].map((half) => (
            <div key={half} className="flex items-center">
              {disciplines.map((d, i) => (
                <div key={i} className="flex items-center text-white">
                  <span className="font-display text-2xl uppercase tracking-widest drop-shadow-sm">{d}</span>
                  <span
                    className="mx-6 diamond h-3 w-3 animate-pulse bg-marigold shadow-[0_0_12px_rgba(255,201,40,0.85)]"
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Four Spotlight Cultural Discipline Feature Cards */}
      <div className="container-x mt-16 relative z-10">
        <div className="grid gap-8 md:grid-cols-2">
          
          {/* Card 1: Multilingual Debates & Public Speaking with DebateSparks */}
          <Reveal delay={60}>
            <div className="relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border-2 border-[#EAE5DD] bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-flame/40">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-full sm:w-1/2 aspect-[54/38] max-w-[260px] shrink-0">
                  <DebateSparks className="w-full h-full drop-shadow-md" />
                </div>
                <div className="flex-1 text-left">
                  <span className="font-head text-[11px] font-extrabold uppercase tracking-widest text-flame">
                    Scholastic Eloquence
                  </span>
                  <h3 className="display text-2xl sm:text-3xl text-ink mt-1">
                    Multilingual Debates & Public Speaking
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-ink/70 leading-relaxed font-medium">
                    Parliamentary debates, scholarly orations, and sharp dialectic exchanges conducted in English, Arabic, Malayalam, and Urdu.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-black/5 pt-4">
                {['Parliamentary Debate', 'Classical Oratory', 'Cross-Examination', 'Extempore'].map((tag) => (
                  <span key={tag} className="rounded-full bg-cream border border-black/5 px-3 py-1 font-head text-[10px] font-extrabold uppercase tracking-wider text-ink/75">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Card 2: Arabic Calligraphy with LivingCalligraphy */}
          <Reveal delay={120}>
            <div className="relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border-2 border-[#EAE5DD] bg-[#FFF8E8] p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-leaf/40">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-full sm:w-1/2 aspect-[60/40] max-w-[260px] shrink-0">
                  <LivingCalligraphy className="w-full h-full drop-shadow-md" />
                </div>
                <div className="flex-1 text-left">
                  <span className="font-head text-[11px] font-extrabold uppercase tracking-widest text-leaf">
                    Sacred Script & Geometry
                  </span>
                  <h3 className="display text-2xl sm:text-3xl text-ink mt-1">
                    Arabic Calligraphy & Script Arts
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-ink/70 leading-relaxed font-medium">
                    Mastery of the traditional reed pen and classical scripts — Thuluth, Naskh, Diwani, and Ruq'ah — executed with geometric precision.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-black/5 pt-4">
                {['Thuluth', 'Naskh', 'Diwani', 'Traditional Qalam'].map((tag) => (
                  <span key={tag} className="rounded-full bg-white border border-black/5 px-3 py-1 font-head text-[10px] font-extrabold uppercase tracking-wider text-ink/75">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Card 3: Visual Arts & Design with CreativeBrush */}
          <Reveal delay={180}>
            <div className="relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border-2 border-[#EAE5DD] bg-[#FFF8E8] p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-marigold/50">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-full sm:w-1/2 aspect-[58/38] max-w-[260px] shrink-0">
                  <CreativeBrush className="w-full h-full drop-shadow-md" />
                </div>
                <div className="flex-1 text-left">
                  <span className="font-head text-[11px] font-extrabold uppercase tracking-widest text-marigold">
                    Creative Aesthetics
                  </span>
                  <h3 className="display text-2xl sm:text-3xl text-ink mt-1">
                    Visual Arts & Design
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-ink/70 leading-relaxed font-medium">
                    Canvas painting, delicate watercolours, pencil sketching, typography, and evocative cultural compositions.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-black/5 pt-4">
                {['Canvas Painting', 'Watercolour', 'Pencil Sketch', 'Visual Design'].map((tag) => (
                  <span key={tag} className="rounded-full bg-white border border-black/5 px-3 py-1 font-head text-[10px] font-extrabold uppercase tracking-wider text-ink/75">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Card 4: Poetry & Literature with PoetryScroll */}
          <Reveal delay={240}>
            <div className="relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border-2 border-[#EAE5DD] bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-flame/40">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-full sm:w-1/2 aspect-[56/38] max-w-[260px] shrink-0">
                  <PoetryScroll className="w-full h-full drop-shadow-md" />
                </div>
                <div className="flex-1 text-left">
                  <span className="font-head text-[11px] font-extrabold uppercase tracking-widest text-flame">
                    Literary Heritage
                  </span>
                  <h3 className="display text-2xl sm:text-3xl text-ink mt-1">
                    Poetry & Classical Literature
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-ink/70 leading-relaxed font-medium">
                    Metered verse recitation, Arabic Qasida, Urdu Ghazal, Malayalam poetry, and scholarly literary criticism.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-black/5 pt-4">
                {['Arabic Qasida', 'Urdu Ghazal', 'Malayalam Verse', 'Literary Critique'].map((tag) => (
                  <span key={tag} className="rounded-full bg-cream border border-black/5 px-3 py-1 font-head text-[10px] font-extrabold uppercase tracking-wider text-ink/75">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

        </div>

        <div className="mt-10 text-center">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-flame to-ember px-8 py-4 font-head text-xs sm:text-sm font-extrabold uppercase tracking-[0.18em] text-white shadow-xl hover:scale-105 transition-all"
          >
            <span>Explore All 40+ Fest Categories</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* 4. Shape Divider Transition into Brand Partners */}
      <div className="mt-16 w-full max-w-4xl mx-auto px-4">
        <ShapeDivider className="w-full h-16 sm:h-20" />
      </div>
    </section>
  );
}
