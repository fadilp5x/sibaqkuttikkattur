import { Link } from 'react-router-dom';
import { useSite } from '../lib/site';

export default function SiteFooter() {
  const site = useSite();
  const s = site?.site || { logo: '', tagline: 'SIBAQ Festival', edition: '2K26', phoneRaw: '', phone: '', email: '' };
  const footerData = site?.footer || { note: '', credit: 'SIBAQ Kuttikkattur' };
  return (
    <footer className="relative mt-24 border-t border-black/10 bg-gray-50/60 pb-28 pt-14">
      <div className="container-x">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <img src="/media/sibaq-logo.svg" alt="SIBAQ @Kuttikkattur" className="h-12 w-auto" />
            <p className="mt-4 text-sm leading-relaxed text-ink/60">{s.tagline} · {s.edition}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">{footerData.note}</p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2.5 text-sm sm:grid-cols-3">
            {[
              ['/', 'Home'],
              ['/about', 'What is SIBAQ?'],
              ['/partners', 'Brand Partners'],
              ['/game', 'Game & Vouchers'],
              ['/edumart-book-fest', 'Book Fest'],
              ['/team', 'Our Team'],
              ['/media', 'Media'],
              ['/donation', 'Donation'],
              ['/promote', 'Promote'],
              ['/sponsors', 'Sponsors'],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="text-ink/60 transition-colors hover:text-marigold">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-black/10 pt-6 text-xs text-ink/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {footerData.credit}</p>
          <p>
            <a href={`tel:${s.phoneRaw}`} className="hover:text-marigold">{s.phone}</a>
            <span className="mx-2 diamond h-1 w-1 inline-block bg-current align-middle" aria-hidden="true" />
            <a href={`mailto:${s.email}`} className="hover:text-marigold">{s.email}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
