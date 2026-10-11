import { Link } from 'react-router-dom';
import SectionHead from '../components/SectionHead';
import PartnerGrid from '../components/PartnerGrid';
import Reveal from '../components/Reveal';

export default function PartnersPage() {
  return (
    <section className="container-x pb-20 pt-28">
      <SectionHead
        kicker="Brand partners"
        title={
          <>
            Partners in <span className="text-gradient-fest">possibilities</span>
          </>
        }
        note="Brands that stand with young talent. Official partner identities appear here as they are confirmed."
      />
      <div className="mt-10">
        <PartnerGrid />
      </div>
      <Reveal>
        <div className="card-dark mt-12 flex flex-col items-start gap-4 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-head text-lg font-extrabold text-ink">Want your brand here?</h2>
            <p className="mt-1 text-sm text-ink/60">
              Sponsorship tiers are open — from Associate to Title partner.
            </p>
          </div>
          <Link to="/sponsors" className="btn-primary shrink-0">
            Become a sponsor
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
