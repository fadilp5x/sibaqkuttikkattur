import { Link } from 'react-router-dom';
import { useSite } from '../lib/site';
import Reveal from '../components/Reveal';
import Ribbon from '../components/Ribbon';

const ICONS = ['📚', '🏷️', '✍️', '☕'];

export default function BookFestPage() {
  const site = useSite();
  if (!site) return <div className="min-h-screen" />;
  const b = site.bookfest;

  return (
    <>
      <section className="container-x pb-12 pt-28 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="kicker flex items-center justify-center gap-2">
            <span className="diamond h-2 w-2 bg-marigold" /> Edumart <span className="diamond h-2 w-2 bg-marigold" />
          </p>
          <h1 className="display mt-4 text-5xl text-ink sm:text-7xl">
            Edumart <span className="text-gradient-fest">Book Fest</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink/65 sm:text-base">{b.blurb}</p>
          <span className="chip mt-5 text-ink/80">{b.dates}</span>
        </div>
      </section>

      <Ribbon variant="leaf" />

      <section className="container-x py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {b.features.map((f, i) => (
            <Reveal key={f} delay={i * 80}>
              <div className="card-dark h-full p-6 text-center">
                <span className="text-3xl" aria-hidden="true">{ICONS[i % ICONS.length]}</span>
                <p className="mt-3 font-head text-sm font-extrabold leading-snug text-ink">{f}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="card-dark mt-12 flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-head text-lg font-extrabold text-ink">Win your fest pass</h2>
              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-ink/60">
                Play the daily quiz during the fest and earn book vouchers redeemable at every Edumart stall.
              </p>
            </div>
            <Link to="/game" className="btn-marigold shrink-0">
              Play the quiz
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
