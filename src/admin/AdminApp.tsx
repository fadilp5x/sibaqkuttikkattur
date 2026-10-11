import { useCallback, useEffect, useState } from 'react';
import { adminFetch } from './api';
import SettingsEditor from './SettingsEditor';
import CollectionEditor, { type FieldSpec } from './CollectionEditor';

// ---------------------------------------------------------------------------
// Content-policy notice shown in the admin shell.
const CONTENT_POLICY =
  'Content policy: no images of women anywhere on this website. Imagery must respect the Islamic values of the organising committee — prefer geometric patterns, typography and venue photography.';

const SECTIONS = [
  'Overview',
  'Settings',
  'Stats',
  'Partners',
  'Team',
  'Media',
  'Sponsors',
  'Quiz questions',
  'Submissions',
  'Leaderboard',
  'Vouchers',
  'FAQs',
  'Enquiries',
] as const;
type Section = (typeof SECTIONS)[number];

const COLLECTIONS: Record<string, { title: string; fields: FieldSpec[]; defaults: Record<string, unknown>; titleKey: string; subtitleKey?: string; imageKey?: string; hint?: string }> = {
  Stats: {
    title: 'Institutional statistics',
    titleKey: 'value',
    subtitleKey: 'label',
    hint: 'Exact figures from the official brochure. Do not invent numbers.',
    fields: [
      { key: 'value', label: 'Value (e.g. 10,000+)', type: 'text' },
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'note', label: 'Small note', type: 'text' },
      { key: 'sort', label: 'Sort order', type: 'number' },
      { key: 'published', label: 'Published', type: 'bool' },
    ],
    defaults: { value: '', label: '', note: '', sort: 10, published: true },
  },
  Partners: {
    title: 'Brand partners',
    titleKey: 'name',
    subtitleKey: 'url',
    imageKey: 'logo',
    hint: 'Upload official partner logos only — never invent brands.',
    fields: [
      { key: 'name', label: 'Brand name', type: 'text' },
      { key: 'logo', label: 'Logo', type: 'image' },
      { key: 'url', label: 'Website URL', type: 'text' },
      { key: 'sort', label: 'Sort order', type: 'number' },
      { key: 'published', label: 'Published', type: 'bool' },
    ],
    defaults: { name: '', logo: '', url: '', sort: 10, published: false },
  },
  Team: {
    title: 'Team members',
    titleKey: 'name',
    subtitleKey: 'role',
    imageKey: 'photo',
    hint: 'Photos must follow the content policy. Members without photos get a monogram avatar.',
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'category', label: 'Category chip', type: 'text' },
      { key: 'photo', label: 'Photo', type: 'image' },
      { key: 'sort', label: 'Sort order', type: 'number' },
      { key: 'published', label: 'Published', type: 'bool' },
    ],
    defaults: { name: '', role: '', category: '', photo: '', sort: 10, published: true },
  },
  Media: {
    title: 'Media gallery',
    titleKey: 'title',
    subtitleKey: 'src',
    imageKey: 'src',
    hint: 'Images or YouTube links. Videos load only when a visitor taps them.',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'type', label: 'Type (image / video)', type: 'text' },
      { key: 'src', label: 'Image URL / YouTube link / MP4', type: 'text' },
      { key: 'poster', label: 'Video poster image', type: 'image' },
      { key: 'sort', label: 'Sort order', type: 'number' },
      { key: 'published', label: 'Published', type: 'bool' },
    ],
    defaults: { title: '', type: 'image', src: '', poster: '', sort: 10, published: true },
  },
  Sponsors: {
    title: 'Sponsor packages',
    titleKey: 'name',
    subtitleKey: 'slots',
    hint: 'A package price becomes public only after “Price confirmed” is ticked. Conflicting brochure prices must stay unconfirmed.',
    fields: [
      { key: 'name', label: 'Package name', type: 'text' },
      { key: 'tagline', label: 'Tagline chip', type: 'text' },
      { key: 'slots', label: 'Slots (e.g. 2 slots)', type: 'text' },
      { key: 'price', label: 'Price (hidden until confirmed)', type: 'text' },
      { key: 'price_confirmed', label: 'Price confirmed by organiser', type: 'bool' },
      { key: 'benefits', label: 'Benefits', type: 'lines' },
      { key: 'sort', label: 'Sort order', type: 'number' },
      { key: 'published', label: 'Published', type: 'bool' },
    ],
    defaults: { name: '', tagline: '', slots: '', price: '', price_confirmed: false, benefits: '[]', sort: 10, published: true },
  },
  'Quiz questions': {
    title: 'Daily quiz questions',
    titleKey: 'question',
    subtitleKey: 'date',
    hint: 'Schedule one question per date. The correct answer is stored server-side only — it is never sent to visitors. Test content is excluded from the public leaderboard.',
    fields: [
      { key: 'date', label: 'Date (YYYY-MM-DD)', type: 'text' },
      { key: 'question', label: 'Question', type: 'textarea' },
      { key: 'options', label: 'Answer options', type: 'lines' },
      { key: 'correct_index', label: 'Correct option (0 = first)', type: 'number' },
      { key: 'is_test', label: 'Test content (excluded from leaderboard)', type: 'bool' },
      { key: 'published', label: 'Published', type: 'bool' },
    ],
    defaults: { date: new Date().toISOString().slice(0, 10), question: '', options: '[]', correct_index: 0, is_test: false, published: false },
  },
  Vouchers: {
    title: 'Vouchers & prizes',
    titleKey: 'title',
    subtitleKey: 'brand',
    imageKey: 'image',
    hint: 'Only real, organiser-approved offers. Leave unpublished until details are final.',
    fields: [
      { key: 'title', label: 'Voucher title', type: 'text' },
      { key: 'brand', label: 'Brand', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'instructions', label: 'Redemption instructions', type: 'textarea' },
      { key: 'expiry', label: 'Valid till', type: 'text' },
      { key: 'image', label: 'Image', type: 'image' },
      { key: 'sort', label: 'Sort order', type: 'number' },
      { key: 'published', label: 'Published', type: 'bool' },
    ],
    defaults: { title: '', brand: '', description: '', instructions: '', expiry: '', image: '', sort: 10, published: false },
  },
  FAQs: {
    title: 'Chat assistant FAQs',
    titleKey: 'question',
    subtitleKey: 'answer',
    hint: 'Answers shown by the floating help widget.',
    fields: [
      { key: 'question', label: 'Question', type: 'text' },
      { key: 'answer', label: 'Answer', type: 'textarea' },
      { key: 'sort', label: 'Sort order', type: 'number' },
      { key: 'published', label: 'Published', type: 'bool' },
    ],
    defaults: { question: '', answer: '', sort: 10, published: true },
  },
};

function Submissions() {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [rows, setRows] = useState<Array<Record<string, unknown>> | null>(null);

  const load = useCallback(
    (d: string) =>
      adminFetch<Array<Record<string, unknown>>>(`/api/admin/submissions?date=${d}`)
        .then(setRows)
        .catch(() => setRows([])),
    []
  );

  useEffect(() => {
    load(date);
  }, [date, load]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-head text-lg font-extrabold text-ink">Quiz submissions</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-xl border border-black/15 bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-marigold"
        />
      </div>
      <div className="mt-5 space-y-2">
        {rows === null && <p className="py-8 text-center text-sm text-ink/40">Loading…</p>}
        {rows?.length === 0 && <p className="py-8 text-center text-sm text-ink/40">No submissions for this date.</p>}
        {rows?.map((r) => (
          <div key={String(r.id)} className="card-dark flex items-center gap-3 p-3.5">
            <span className={`h-2.5 w-2.5 shrink-0 rotate-45 ${r.correct ? 'bg-leaf' : 'bg-flame'}`} aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-head text-sm font-bold text-ink">
                {String(r.name)} <span className="font-normal text-ink/40">chose option {String(r.option_index)}</span>
              </p>
              <p className="truncate text-xs text-ink/45">
                {String(r.submitted_at).slice(11, 19)} · {r.is_test ? 'test question' : 'live'}
              </p>
            </div>
            <button
              onClick={async () => {
                if (!window.confirm('Delete this submission?')) return;
                await adminFetch(`/api/admin/submissions/${r.id}`, { method: 'DELETE' });
                load(date);
              }}
              className="rounded-full border border-black/15 px-3 py-1.5 text-[10px] font-extrabold text-ink/50 hover:border-flame hover:text-flame"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeaderboardReview() {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [data, setData] = useState<{ winner_confirmed?: boolean; entries?: Array<{ rank: number; name: string; time: string }>; none?: boolean } | null>(null);
  const [questions, setQuestions] = useState<Array<Record<string, unknown>>>([]);

  const load = useCallback(
    (d: string) => adminFetch<typeof data>(`/api/leaderboard?date=${d}`).then(setData).catch(() => setData(null)),
    []
  );

  useEffect(() => {
    load(date);
    adminFetch<Array<Record<string, unknown>>>('/api/admin/collections/questions')
      .then(setQuestions)
      .catch(() => setQuestions([]));
  }, [date, load]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-head text-lg font-extrabold text-ink">Leaderboard review</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-xl border border-black/15 bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-marigold"
        />
      </div>

      {data && !data.none && data.entries && data.entries.length > 0 ? (
        <div className="card-dark mt-5 overflow-hidden">
          <ol>
            {data.entries.map((e) => (
              <li key={e.rank} className="flex items-center gap-4 border-b border-black/5 px-5 py-3.5 last:border-0">
                <span className="w-8 text-sm font-extrabold text-marigold">#{e.rank}</span>
                <span className="flex-1 truncate font-head text-sm font-bold text-ink">{e.name}</span>
                <span className="font-mono text-xs text-ink/45">{e.time}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-ink/40">
          No confirmed entries for this date (test questions are excluded).
        </p>
      )}

      <div className="mt-6 space-y-2">
        {questions
          .filter((q) => q.date === date)
          .map((q) => (
            <div key={String(q.id)} className="card-dark flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="truncate font-head text-sm font-bold text-ink">{String(q.question)}</p>
                <p className="text-xs text-ink/45">
                  {q.is_test ? 'test · ' : 'live · '}
                  {q.winner_confirmed ? 'winner confirmed' : 'winner not confirmed'}
                </p>
              </div>
              {!q.winner_confirmed && (
                <button
                  onClick={async () => {
                    await adminFetch(`/api/admin/questions/${q.id}/confirm-winner`, { method: 'POST' });
                    load(date);
                  }}
                  className="shrink-0 rounded-full border border-leaf/50 px-4 py-2 text-[10px] font-extrabold uppercase tracking-wider text-leaf hover:bg-leaf/10"
                >
                  Confirm winner
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

function Enquiries() {
  const [rows, setRows] = useState<Array<Record<string, unknown>> | null>(null);
  const load = () =>
    adminFetch<Array<Record<string, unknown>>>('/api/admin/enquiries').then(setRows).catch(() => setRows([]));
  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2 className="font-head text-lg font-extrabold text-ink">Enquiries</h2>
      <div className="mt-5 space-y-2.5">
        {rows === null && <p className="py-8 text-center text-sm text-ink/40">Loading…</p>}
        {rows?.length === 0 && <p className="py-8 text-center text-sm text-ink/40">No enquiries yet.</p>}
        {rows?.map((r) => (
          <div key={String(r.id)} className={`card-dark p-4 ${r.handled ? 'opacity-50' : ''}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-head text-sm font-bold text-ink">
                  {String(r.name)} <span className={`ml-1 rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase ${r.kind === 'sponsor' ? 'bg-marigold/15 text-marigold' : 'bg-flame/15 text-flame'}`}>{String(r.kind)}</span>
                </p>
                <p className="text-xs text-ink/50">{String(r.contact)}{r.package ? ` · ${String(r.package)}` : ''}</p>
                {r.message ? <p className="mt-1.5 text-xs leading-relaxed text-ink/60">{String(r.message)}</p> : null}
                <p className="mt-1 text-[10px] text-ink/30">{String(r.created_at)}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-1.5">
                <button
                  onClick={async () => {
                    await adminFetch(`/api/admin/enquiries/${r.id}`, { method: 'PUT', body: JSON.stringify({ handled: !r.handled }) });
                    load();
                  }}
                  className="rounded-full border border-black/15 px-3 py-1.5 text-[10px] font-extrabold uppercase text-ink/60 hover:border-leaf hover:text-leaf"
                >
                  {r.handled ? 'Reopen' : 'Done'}
                </button>
                <button
                  onClick={async () => {
                    if (!window.confirm('Delete this enquiry?')) return;
                    await adminFetch(`/api/admin/enquiries/${r.id}`, { method: 'DELETE' });
                    load();
                  }}
                  className="rounded-full border border-black/15 px-3 py-1.5 text-[10px] font-extrabold text-ink/50 hover:border-flame hover:text-flame"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Login({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await adminFetch('/api/admin/login', { method: 'POST', body: JSON.stringify({ username, password }) });
      onLogin();
    } catch (err) {
      setError(err instanceof Error && err.message !== 'UNAUTHORIZED' ? err.message : 'Invalid credentials. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-gray-50/50">
      <form onSubmit={submit} className="relative overflow-hidden rounded-[2rem] bg-white w-full max-w-md p-10 shadow-xl ring-1 ring-black/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-flame/5 via-white to-white" aria-hidden="true" />
        
        <div className="relative z-10 text-center mb-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-flame/10 text-flame mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <p className="font-display text-3xl uppercase tracking-widest text-ink">SIBAQ</p>
          <p className="kicker mt-1 text-flame">Admin Portal</p>
        </div>
        
        <div className="relative z-10 space-y-5">
          <div>
            <label htmlFor="ad-user" className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.15em] text-ink/60">Username</label>
            <input id="ad-user" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full rounded-xl border border-black/15 bg-gray-50 px-4 py-3.5 text-sm font-medium text-ink outline-none transition-colors focus:bg-white focus:border-flame focus:shadow-[0_0_0_3px_rgba(240,74,36,0.15)]" />
          </div>
          <div>
            <label htmlFor="ad-pass" className="mb-1.5 flex items-center justify-between text-[11px] font-extrabold uppercase tracking-[0.15em] text-ink/60">
              <span>Password</span>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="lowercase tracking-normal font-bold text-flame hover:underline" tabIndex={-1}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </label>
            <input id="ad-pass" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full rounded-xl border border-black/15 bg-gray-50 px-4 py-3.5 text-sm font-medium text-ink outline-none transition-colors focus:bg-white focus:border-flame focus:shadow-[0_0_0_3px_rgba(240,74,36,0.15)]" />
          </div>
          
          {error && <p role="alert" className="rounded-xl border border-ember/30 bg-ember/10 px-4 py-3 text-[13px] font-medium text-ember">{error}</p>}
          
          <button type="submit" disabled={busy || !username || !password} className="mt-6 w-full rounded-xl bg-gradient-to-r from-flame to-ember px-5 py-4 font-head text-[14px] font-extrabold uppercase tracking-[0.1em] text-white shadow-lg transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0">
            {busy ? 'Verifying...' : 'Sign In'}
          </button>
        </div>
      </form>
    </div>
  );
}
function OverviewDashboard() {
  const [data, setData] = useState<{ publishedQuestions: number; draftQuestions: number; activePartners: number; leaderboardEntries: number } | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    adminFetch<{ publishedQuestions: number; draftQuestions: number; activePartners: number; leaderboardEntries: number }>('/api/admin/overview')
      .then(setData)
      .catch(() => setError(true));
  }, []);

  if (error) return <p className="py-8 text-sm text-flame">Failed to load overview data.</p>;
  if (!data) return <p className="py-8 text-sm text-ink/50">Loading overview...</p>;

  return (
    <div className="space-y-6">
      <h2 className="font-head text-xl font-extrabold text-ink mb-6">Dashboard Overview</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card-dark p-6">
          <p className="kicker">Published Questions</p>
          <p className="mt-2 text-3xl font-display text-ink">{data.publishedQuestions}</p>
        </div>
        <div className="card-dark p-6">
          <p className="kicker">Draft Questions</p>
          <p className="mt-2 text-3xl font-display text-ink">{data.draftQuestions}</p>
        </div>
        <div className="card-dark p-6">
          <p className="kicker">Leaderboard Entries</p>
          <p className="mt-2 text-3xl font-display text-ink">{data.leaderboardEntries}</p>
        </div>
        <div className="card-dark p-6">
          <p className="kicker">Active Partners</p>
          <p className="mt-2 text-3xl font-display text-ink">{data.activePartners}</p>
        </div>
      </div>
    </div>
  );
}


export default function AdminApp() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [section, setSection] = useState<Section>('Overview');

  useEffect(() => {
    adminFetch<{ authed: boolean }>('/api/admin/me')
      .then((data) => setAuthed(!!data.authed))
      .catch(() => setAuthed(false));
  }, []);

  useEffect(() => {
    document.title = 'SIBAQ — Admin';
  }, []);

  if (authed === null) return <div className="min-h-screen" />;
  if (!authed) return <Login onLogin={() => setAuthed(true)} />;

  return (
    <div className="container-x pb-24 pt-24">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-display text-2xl tracking-[0.16em] text-ink">SIBAQ ADMIN</p>
          <p className="kicker mt-1">Content manager</p>
        </div>
        <button
          onClick={async () => {
            await adminFetch('/api/admin/logout', { method: 'POST' });
            setAuthed(false);
          }}
          className="rounded-full border border-black/15 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-ink/60 hover:border-flame hover:text-flame"
        >
          Sign out
        </button>
      </div>

      <p className="mt-4 rounded-2xl border border-marigold/30 bg-marigold/10 px-4 py-3 text-xs leading-relaxed text-marigold">
        {CONTENT_POLICY}
      </p>

      <nav className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1" aria-label="Admin sections">
        {SECTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setSection(s)}
            className={`shrink-0 rounded-full px-4 py-2.5 font-head text-[11px] font-extrabold uppercase tracking-[0.14em] transition-colors ${
              section === s ? 'bg-marigold text-ink shadow-sm' : 'border border-black/10 bg-white text-ink/60 hover:text-marigold hover:border-marigold/50'
            }`}
          >
            {s}
          </button>
        ))}
      </nav>

      <div className="mt-8">
        {section === 'Overview' && <OverviewDashboard />}
        {section === 'Settings' && <SettingsEditor />}
        {section === 'Submissions' && <Submissions />}
        {section === 'Leaderboard' && <LeaderboardReview />}
        {section === 'Enquiries' && <Enquiries />}
        {COLLECTIONS[section] && <CollectionEditor key={section} name={COLLECTIONS[section].title.toLowerCase().includes('quiz') ? 'questions' : section.toLowerCase()} {...COLLECTIONS[section]} />}
      </div>
    </div>
  );
}
