import { useEffect, useState } from 'react';
import { adminFetch } from './api';
import { LinesField, TextArea, TextField } from './fields';

type Settings = Record<string, Record<string, unknown>>;

/** Editable site settings — grouped, flat key editing of the settings JSON. */
export default function SettingsEditor() {
  const [data, setData] = useState<Settings | null>(null);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    adminFetch<Settings>('/api/admin/settings').then(setData).catch((e) => {
      setError(e.message);
      setStatus('error');
    });
  }, []);

  const set = (section: string, key: string, value: unknown) =>
    setData((d) => (d ? { ...d, [section]: { ...d[section], [key]: value } } : d));

  const save = async () => {
    if (!data) return;
    setStatus('saving');
    try {
      await adminFetch('/api/admin/settings', { method: 'PUT', body: JSON.stringify(data) });
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed');
      setStatus('error');
    }
  };

  if (!data) return <p className="py-10 text-center text-sm text-ink/40">Loading settings…</p>;

  const text = (section: string, key: string, label: string) => (
    <TextField
      label={label}
      value={String(data[section]?.[key] ?? '')}
      onChange={(v) => set(section, key, v)}
    />
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-head text-lg font-extrabold text-ink">Site settings</h2>
        <div className="flex items-center gap-3">
          {status === 'saved' && <span className="text-xs font-bold text-leaf">Saved ✓</span>}
          {status === 'error' && <span className="text-xs font-bold text-flame">{error}</span>}
          <button onClick={save} disabled={status === 'saving'} className="btn-primary !px-5 !py-2.5 !text-xs disabled:opacity-60">
            {status === 'saving' ? 'Saving…' : 'Save settings'}
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <section className="card-dark space-y-3.5 p-6">
          <h3 className="kicker">Festival basics</h3>
          {text('site', 'tagline', 'Tagline')}
          {text('site', 'dates', 'Dates')}
          {text('site', 'venue', 'Venue (full)')}
          {text('site', 'venueShort', 'Venue (short)')}
          {text('site', 'host', 'Host institution')}
          {text('site', 'committee', 'Committee')}
        </section>

        <section className="card-dark space-y-3.5 p-6">
          <h3 className="kicker">Contact</h3>
          {text('site', 'phone', 'Phone (display)')}
          {text('site', 'phoneRaw', 'Phone (dial format)')}
          {text('site', 'whatsapp', 'WhatsApp number')}
          {text('site', 'email', 'Email')}
          {text('site', 'youtube', 'YouTube channel URL')}
        </section>

        <section className="card-dark space-y-3.5 p-6">
          <h3 className="kicker">Opening screen</h3>
          {text('hero', 'kicker', 'Kicker')}
          {text('hero', 'title', 'Headline')}
          <TextArea label="One-line intro" rows={2} value={String(data.hero?.line ?? '')} onChange={(v) => set('hero', 'line', v)} />
        </section>

        <section className="card-dark space-y-3.5 p-6">
          <h3 className="kicker">Festival ribbon</h3>
          <TextArea
            label="Ribbon text"
            rows={2}
            value={String(data.ribbon?.text ?? '')}
            onChange={(v) => set('ribbon', 'text', v)}
          />
          <p className="text-[11px] text-ink/40">◆ separators create the diamond accents automatically.</p>
        </section>

        <section className="card-dark space-y-3.5 p-6">
          <h3 className="kicker">Donation</h3>
          {text('donation', 'title', 'Title')}
          <TextArea label="Description" rows={2} value={String(data.donation?.description ?? '')} onChange={(v) => set('donation', 'description', v)} />
          {text('donation', 'upi', 'UPI ID')}
          {text('donation', 'account', 'Account line')}
          <LinesField label="Suggested tiers" value={JSON.stringify(data.donation?.tiers ?? [])} onChange={(v) => set('donation', 'tiers', JSON.parse(v || '[]'))} />
        </section>

        <section className="card-dark space-y-3.5 p-6">
          <h3 className="kicker">Book fest</h3>
          {text('bookfest', 'title', 'Title')}
          {text('bookfest', 'dates', 'Dates')}
          <TextArea label="Blurb" rows={2} value={String(data.bookfest?.blurb ?? '')} onChange={(v) => set('bookfest', 'blurb', v)} />
          <LinesField
            label="Features"
            value={JSON.stringify(data.bookfest?.features ?? [])}
            onChange={(v) => set('bookfest', 'features', JSON.parse(v || '[]'))}
          />
        </section>

        <section className="card-dark space-y-3.5 p-6">
          <h3 className="kicker">Game</h3>
          <TextArea label="Voucher line" rows={2} value={String(data.game?.voucherLine ?? '')} onChange={(v) => set('game', 'voucherLine', v)} />
        </section>

        <section className="card-dark space-y-3.5 p-6">
          <h3 className="kicker">Footer</h3>
          <TextArea label="Note" rows={2} value={String(data.footer?.note ?? '')} onChange={(v) => set('footer', 'note', v)} />
          {text('footer', 'credit', 'Credit line')}
        </section>
      </div>
    </div>
  );
}
