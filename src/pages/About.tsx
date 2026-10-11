import { Link } from 'react-router-dom';
import { useSite } from '../lib/site';
import SectionHead from '../components/SectionHead';
import Reveal from '../components/Reveal';
import Ribbon from '../components/Ribbon';

export default function About() {
  const site = useSite();
  if (!site) return <div className="min-h-screen" />;
  const { about, site: s } = site;

  return (
    <>
      <section className="container-x pb-10 pt-28">
        <SectionHead
          kicker="About"
          title={
            <>
              What is <span className="text-gradient-fest">SIBAQ?</span>
            </>
          }
          note={about.lead}
        />
      </section>

      <Ribbon variant="leaf" />

      <section className="container-x grid gap-10 py-16 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <div className="space-y-4">
            {about.body.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-ink/70 sm:text-base">
                {p}
              </p>
            ))}
          </div>
          <div className="card-dark mt-8 p-6">
            <p className="kicker">Hosted by</p>
            <p className="mt-2 font-head text-lg font-extrabold text-ink">{s.host}</p>
            <p className="mt-1 text-sm text-ink/60">
              under the {s.committee} · {s.university}
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          {about.campusImage && (
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-[2rem] bg-gradient-to-br from-marigold/40 via-flame/30 to-leaf/30 opacity-60 blur-sm" aria-hidden="true" />
              <img
                src={about.campusImage}
                alt="Shamsul Huda Islamic Academy campus, the festival host"
                className="relative h-64 w-full rounded-[1.8rem] object-cover shadow-2xl sm:h-80"
                loading="lazy"
              />
            </div>
          )}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {about.stageImages.slice(0, 2).map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`SIBAQ stage moment ${i + 1}`}
                className="h-32 w-full rounded-2xl border border-black/10 object-cover sm:h-40"
                loading="lazy"
              />
            ))}
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-20">
        <SectionHead kicker="Disciplines" title={<>Where talent <span className="text-gradient-fest">competes</span></>} />
        <div className="mt-8 flex flex-wrap gap-2.5">
          {about.disciplines.map((d, i) => (
            <Reveal key={d} delay={i * 60}>
              <span className="chip text-ink/80">
                <span className="diamond h-1.5 w-1.5 bg-flame" aria-hidden="true" />
                {d}
              </span>
            </Reveal>
          ))}
        </div>
        <p className="mt-10">
          <Link to="/game" className="btn-primary">
            Play the daily quiz
          </Link>
        </p>
      </section>
    </>
  );
}
