import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api, type Faq } from '../lib/api';
import { useSite } from '../lib/site';

/** FAQ chat widget — admin-managed questions, honest about being an assistant panel. */
export default function ChatWidget() {
  const site = useSite();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && faqs.length === 0) {
      api.faqs().then(setFaqs).catch(() => setFaqs([]));
    }
  }, [open, faqs.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (location.pathname.startsWith('/admin')) return null;
  const s = site?.site;

  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col items-end" style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Festival help"
          className="mb-3 flex h-[min(60vh,420px)] w-[min(88vw,340px)] animate-pop flex-col overflow-hidden rounded-3xl border border-black/12 bg-gray-50 shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-black/10 bg-gradient-to-r from-flame/20 to-marigold/10 px-4 py-3">
            <div>
              <p className="font-head text-sm font-extrabold text-ink">Fest Help</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-marigold">Quick answers</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close help"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 text-ink/80 hover:text-flame"
            >
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto p-3">
            {faqs.length === 0 && <p className="px-2 py-6 text-center text-sm text-ink/50">Questions will appear here soon.</p>}
            {faqs.map((f) => (
              <div key={f.id} className="overflow-hidden rounded-2xl border border-black/10 bg-white/[0.03]">
                <button
                  onClick={() => setActive(active === f.id ? null : f.id)}
                  aria-expanded={active === f.id}
                  className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left font-head text-[13px] font-bold text-ink/90 hover:text-marigold"
                >
                  {f.question}
                  <span className={`diamond h-1.5 w-1.5 shrink-0 bg-marigold transition-transform ${active === f.id ? 'rotate-[135deg]' : ''}`} aria-hidden="true" />
                </button>
                {active === f.id && <p className="animate-fade-up px-4 pb-3.5 text-[13px] leading-relaxed text-ink/70">{f.answer}</p>}
              </div>
            ))}
          </div>
          {s && (
            <div className="border-t border-black/10 p-3">
              <a
                href={`https://wa.me/${s.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="btn-marigold w-full !py-2.5 !text-xs"
              >
                WhatsApp the committee
              </a>
            </div>
          )}
        </div>
      )}
      <div className="flex items-center gap-2">
        <Link
          to="/game"
          className="hidden rounded-full border border-black/15 bg-gray-50 px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-marigold sm:block"
        >
          Play & Win
        </Link>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close fest help' : 'Open fest help'}
          aria-expanded={open}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold to-marigold p-3.5 text-night shadow-[0_12px_30px_-8px_rgba(255,179,0,0.6)] transition-transform hover:scale-105 active:scale-95"
        >
          {open ? (
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 3C7 3 3 6.6 3 11c0 2.2 1 4.2 2.7 5.6L5 21l4-1.6c1 .3 2 .4 3 .4 5 0 9-3.6 9-8s-4-8-9-8Z"
                fill="currentColor"
              />
              <circle cx="8.5" cy="11" r="1.2" fill="#150a10" />
              <circle cx="12" cy="11" r="1.2" fill="#150a10" />
              <circle cx="15.5" cy="11" r="1.2" fill="#150a10" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
