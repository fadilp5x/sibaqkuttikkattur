import MediaGallery from '../components/MediaGallery';
import PennantGarland from '../components/PennantGarland';
import GeometricSparkles from '../components/GeometricSparkles';
import FestivalRibbon from '../components/FestivalRibbon';
import Soundwave from '../components/Soundwave';
import Reveal from '../components/Reveal';

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-paper pb-28 pt-20">
      {/* 1. Cinematic Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-paper via-cream/60 to-paper pb-16 pt-12 sm:pt-16">
        <PennantGarland className="absolute top-0 left-0 right-0 opacity-70" />
        <GeometricSparkles className="absolute right-[-10%] top-1/4 w-1/3 opacity-30 pointer-events-none" />

        <div className="container-x relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-flame/30 bg-flame/5 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-flame mb-4">
              <span className="diamond h-1.5 w-1.5 bg-flame" />
              Festival Archive & Visual Memories
              <span className="diamond h-1.5 w-1.5 bg-flame" />
            </div>

            <h1 className="display text-5xl sm:text-6xl md:text-7xl text-ink leading-[0.95]">
              MOMENTS FROM <span className="text-gradient-fest">SIBAQ</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-ink/75 max-w-2xl mx-auto font-medium">
              Photographs, performances and stories that capture the energy of the fest.
            </p>

            {/* Autonomous Animated Soundwave Supporting Illustration */}
            <div className="mt-8 mx-auto w-full max-w-md sm:max-w-lg h-20 sm:h-24">
              <Soundwave className="w-full h-full drop-shadow-sm" />
            </div>
          </div>

          {/* Featured Hero Media Composition */}
          <div className="mt-12 overflow-hidden rounded-[2.5rem] border border-black/10 bg-white p-3 sm:p-5 shadow-2xl">
            <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden rounded-[2rem] bg-night">
              <iframe
                src="https://www.youtube-nocookie.com/embed/gBnLyPDYVpc?rel=0&playsinline=1"
                title="SIBAQ National Arts Fest Featured Documentary & Stage Reveal"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 rounded-full bg-flame animate-pulse" />
                <p className="font-head text-sm font-extrabold uppercase tracking-wider text-ink">
                  Featured Official Video: 11th Biennial Fest Showcase
                </p>
              </div>
              <span className="chip border-marigold/40 text-ink/70">
                November 20–22, 2026 · Kuttikkattur
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Ribbon Divider */}
      <div className="relative my-6">
        <FestivalRibbon className="w-full opacity-35" />
      </div>

      {/* 2. Interactive Photography & Film Gallery */}
      <section className="container-x py-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <p className="kicker text-marigold">Curated Collection</p>
          <h2 className="display mt-2 text-3xl sm:text-4xl text-ink">
            EXPLORE THE <span className="text-gradient-fest">EXHIBITION</span>
          </h2>
          <p className="mt-2 text-sm text-ink/60">
            Browse stage performances, scholarly debates, and festival atmospheres.
          </p>
        </div>

        <MediaGallery />
      </section>

      {/* 3. Festival Archival Themes & Storytelling */}
      <section className="container-x mt-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-cream via-white to-cream p-8 sm:p-12 border border-black/10 shadow-lg">
            <div className="max-w-2xl">
              <p className="kicker text-flame">Cultural Legacy</p>
              <h2 className="display mt-2 text-3xl sm:text-4xl text-ink">
                PRESERVING TRADITION, <br />
                AMPLIFYING EXPRESSION
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">
                SIBAQ is more than an arts festival — it is a vibrant confluence of collegiate heritage,
                intellectual discourse, and creative expression. Every edition records hundreds of
                competitions across Arabic calligraphy, multilingual debates, visual arts, and Islamic scholastic oratory.
              </p>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-black/10 bg-white/80 p-4 text-center">
                  <p className="display text-3xl text-flame">400+</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-ink/60">Events Documented</p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-white/80 p-4 text-center">
                  <p className="display text-3xl text-marigold">35+</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-ink/60">Campuses Participating</p>
                </div>
                <div className="col-span-2 sm:col-span-1 rounded-2xl border border-black/10 bg-white/80 p-4 text-center">
                  <p className="display text-3xl text-leaf">3 Days</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-ink/60">National Stage</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
