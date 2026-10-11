import { useEffect, useState, type FormEvent } from 'react';
import { api, type SponsorPackage } from '../lib/api';

interface Props {
  kind: 'promote' | 'sponsor';
  heading?: string;
}

/** Shared enquiry form for the Promote and Sponsors pages. */
export default function EnquiryForm({ kind, heading }: Props) {
  const [packages, setPackages] = useState<SponsorPackage[]>([]);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [pkg, setPkg] = useState('');
  const [message, setMessage] = useState('');
  const [honey, setHoney] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  const isSponsor = kind === 'sponsor';
  useEffect(() => {
    if (isSponsor) api.sponsors().then(setPackages).catch(() => setPackages([]));
  }, [isSponsor]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (honey) {
      setState('sent');
      return;
    }
    setState('sending');
    setError('');
    try {
      const res = await api.sendEnquiry({ kind, name, contact, pkg, message });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Could not send your enquiry');
      }
      setState('sent');
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  if (state === 'sent') {
    return (
      <div className="card-dark animate-pop p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-leaf/15 text-2xl text-leaf">
          ✓
        </span>
        <h3 className="mt-4 font-head text-lg font-extrabold text-ink">Enquiry received</h3>
        <p className="mt-2 text-sm text-ink/60">
          Thank you — the committee will reach out to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card-dark space-y-4 p-7">
      <h3 className="font-head text-lg font-extrabold text-ink">{heading ?? 'Expression of interest'}</h3>

      {isSponsor && (
        <div>
          <label htmlFor="eq-pkg" className="kicker mb-1.5 block">Sponsorship package</label>
          <select
            id="eq-pkg"
            value={pkg}
            onChange={(e) => setPkg(e.target.value)}
            className="w-full rounded-xl border border-black/15 bg-gray-50 px-4 py-3 text-sm text-ink outline-none focus:border-marigold"
          >
            <option value="">Choose a package…</option>
            {packages.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name} — {p.slots}
              </option>
            ))}
            <option value="Other / custom">Other / custom activation</option>
          </select>
        </div>
      )}

      <div>
        <label htmlFor="eq-name" className="kicker mb-1.5 block">
          {isSponsor ? 'Brand / enterprise name' : 'Your name or business'}
        </label>
        <input
          id="eq-name"
          required
          maxLength={80}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={isSponsor ? 'e.g. Malabar Gold' : 'e.g. Ahamed Traders'}
          className="w-full rounded-xl border border-black/15 bg-gray-50 px-4 py-3 text-sm text-ink placeholder:text-ink/30 outline-none focus:border-marigold"
        />
      </div>

      <div>
        <label htmlFor="eq-contact" className="kicker mb-1.5 block">Phone / WhatsApp / Email</label>
        <input
          id="eq-contact"
          required
          maxLength={80}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="+91 …"
          className="w-full rounded-xl border border-black/15 bg-gray-50 px-4 py-3 text-sm text-ink placeholder:text-ink/30 outline-none focus:border-marigold"
        />
      </div>

      <div>
        <label htmlFor="eq-msg" className="kicker mb-1.5 block">Message (optional)</label>
        <textarea
          id="eq-msg"
          rows={3}
          maxLength={1000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isSponsor ? 'Custom activation details, stall requests…' : 'What would you like to promote?'}
          className="w-full resize-none rounded-xl border border-black/15 bg-gray-50 px-4 py-3 text-sm text-ink placeholder:text-ink/30 outline-none focus:border-marigold"
        />
      </div>

      {/* honeypot — invisible to humans */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      {state === 'error' && (
        <p role="alert" className="rounded-xl border border-flame/40 bg-flame/10 px-4 py-3 text-sm text-flame">
          {error}
        </p>
      )}

      <button type="submit" disabled={state === 'sending'} className="btn-primary w-full disabled:opacity-60">
        {state === 'sending' ? 'Sending…' : 'Send enquiry'}
      </button>
    </form>
  );
}
