import { useCallback, useEffect, useState } from 'react';
import { api, participantId, type LeaderboardData, type QuizState, type Voucher } from '../lib/api';

import { useSite } from '../lib/site';
import Reveal from '../components/Reveal';
import FestivalParticles from '../components/FestivalParticles';
import ArenaHeroIllustration from '../components/ArenaHeroIllustration';
import PennantGarland from '../components/PennantGarland';
import GeometricSparkles from '../components/GeometricSparkles';
import QuizFrameBackground from '../components/QuizFrameBackground';
import { CorrectEmblem, IncorrectEmblem } from '../components/AnswerFeedbackEmblems';

type Tab = 'quiz' | 'leaders' | 'vouchers';

const MEDALS = ['🥇', '🥈', '🥉'];

function ShareResult({ label }: { label: string }) {
  const [note, setNote] = useState('');
  const share = async () => {
    const text = label + ' — play the SIBAQ 2K26 daily quiz!';
    const url = window.location.origin + '/game';
    try {
      if (navigator.share) {
        await navigator.share({ title: 'SIBAQ 2K26', text, url });
        return;
      }
      throw new Error('no native share');
    } catch {
      try {
        await navigator.clipboard.writeText(text + ' ' + url);
        setNote('Link copied ✓');
      } catch {
        setNote('');
      }
    }
    setTimeout(() => setNote(''), 2500);
  };
  return (
    <button onClick={share} className="btn-ghost !border-marigold/50 !py-2.5 !text-xs !text-marigold">
      Share result {note && <span className="normal-case tracking-normal">· {note}</span>}
    </button>
  );
}

function QuizTab() {
  const site = useSite();
  const [state, setState] = useState<'loading' | QuizState | 'error'>('loading');
  const [name, setName] = useState(() => localStorage.getItem('sibaq_name') || '');
  const [choice, setChoice] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(() => {
    setState('loading');
    api.quizToday(participantId()).then(setState).catch(() => setState('error'));
  }, []);
  useEffect(load, [load]);

  const submit = async () => {
    if (choice === null || !name.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      localStorage.setItem('sibaq_name', name.trim());
      const res = await api.submitQuiz({
        questionId: (state as QuizState).id!,
        optionIndex: choice,
        name: name.trim(),
        participant: participantId(),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (state === 'loading') return <p className="py-14 text-center text-sm text-ink/40 font-medium">Loading today's challenge...</p>;
  if (state === 'error')
    return (
      <div className="py-14 text-center">
        <p className="text-sm text-ink/50 font-medium">Could not load the quiz.</p>
        <button onClick={load} className="btn-ghost mt-4 !py-2.5 !text-xs">Retry</button>
      </div>
    );
  if (state.none)
    return (
      <div className="relative overflow-hidden rounded-[2rem] bg-white p-10 text-center shadow-lg ring-1 ring-black/5">
        <QuizFrameBackground />
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50 shadow-inner">
            <span className="diamond absolute -right-2 -top-2 h-6 w-6 animate-spin-slow bg-marigold/20" />
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-flame">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
          </div>
          <h3 className="relative font-head text-2xl font-extrabold text-ink sm:text-3xl">The Arena Is Getting Ready!</h3>
          <p className="relative mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-ink/60 font-medium">
            Today's challenge will appear here once it is published. Come back soon.
          </p>
        </div>
      </div>
    );

  const q = state;

  if (q.answered) {
    return (
      <div className="relative overflow-hidden rounded-[2rem] bg-cream p-10 text-center shadow-lg ring-1 ring-black/5 animate-pop">
        <QuizFrameBackground />
        <div className="relative z-10 flex flex-col items-center">
          <div className="mx-auto h-24 w-40 mb-2">
            {q.was_correct ? <CorrectEmblem /> : <IncorrectEmblem />}
          </div>
          <h3 className="mt-5 font-head text-2xl font-extrabold text-ink">
            {q.was_correct ? 'Brilliant! Correct answer' : 'Already played today'}
          </h3>
          <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-ink/60 font-medium">
            {q.was_correct
              ? site?.game.voucherLine ?? 'You are on today\'s leaderboard.'
              : 'One entry per day — come back tomorrow for a new question.'}
          </p>
          {q.was_correct && (
            <div className="mt-6">
              <ShareResult label="I cracked today's SIBAQ 2K26 quiz" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden p-8 sm:p-10 md:p-12 rounded-[2rem] bg-cream shadow-lg ring-1 ring-black/5">
      <QuizFrameBackground />
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-marigold/20 to-flame/5 blur-2xl" aria-hidden="true" />
      
      <div className="relative z-10 flex items-center justify-between gap-3">
        <span className="chip text-marigold border-marigold/30 bg-marigold/5 font-bold">Q · {q.date}</span>
        {q.is_test && (
          <span className="rounded-full border border-black/20 bg-black/5 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink/50">
            Demo · test content
          </span>
        )}
      </div>

      <h3 className="relative z-10 mt-5 font-head text-xl font-extrabold leading-snug text-ink sm:text-2xl">{q.question}</h3>

      <div className="relative z-10 mt-6">
        <label htmlFor="q-name" className="kicker mb-1.5 block">Your name</label>
        <input
          id="q-name"
          required
          maxLength={40}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Shown on the leaderboard"
          className="w-full rounded-xl border border-black/15 bg-gray-50 px-4 py-3.5 text-sm font-medium text-ink placeholder:text-ink/40 outline-none transition-colors focus:border-marigold focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,201,40,0.15)]"
        />
      </div>

      <div className="relative z-10 mt-5 space-y-2.5" role="radiogroup" aria-label="Answer options">
        {q.options?.map((opt, i) => (
          <button
            key={i}
            role="radio"
            aria-checked={choice === i}
            onClick={() => setChoice(i)}
            className={`group flex w-full items-center gap-3 rounded-2xl border px-4 py-4 text-left text-[15px] font-bold transition-all ` + (
              choice === i
                ? 'border-flame bg-flame/5 text-ink shadow-[0_4px_12px_-4px_rgba(240,74,36,0.15)]'
                : 'border-black/10 bg-white hover:border-marigold/50 hover:bg-gray-50 text-ink/80'
            )}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ` + (
                choice === i ? 'border-flame bg-flame' : 'border-black/20 group-hover:border-marigold/50'
              )}
              aria-hidden="true"
            >
              {choice === i && <span className="h-2 w-2 animate-pop rounded-full bg-white" />}
            </span>
            {opt}
          </button>
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-xl border border-flame/40 bg-flame/10 px-4 py-3 text-sm font-medium text-flame">
          {error}
        </p>
      )}

      <button onClick={submit} disabled={choice === null || !name.trim() || submitting} className="mt-6 w-full rounded-xl bg-gradient-to-r from-flame to-ember px-5 py-4 font-head text-[14px] font-extrabold uppercase tracking-[0.1em] text-white shadow-lg transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0">
        {submitting ? 'Checking...' : 'Submit answer'}
      </button>
    </div>
  );
}

function LeadersTab() {
  const [dates, setDates] = useState<string[]>([]);
  const [date, setDate] = useState<string>('');
  const [data, setData] = useState<LeaderboardData | null>(null);

  useEffect(() => {
    api
      .leaderboardDates()
      .then((d) => {
        setDates(d);
        return api.leaderboard();
      })
      .then(setData)
      .catch(() => setData(null));
  }, []);

  const pick = (d: string) => {
    setDate(d);
    api.leaderboard(d).then(setData).catch(() => setData(null));
  };

  return (
    <div>
      {dates.length > 0 && (
        <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto pb-1">
          {dates.map((d) => (
            <button
              key={d}
              onClick={() => pick(d)}
              className={`shrink-0 rounded-full px-5 py-2 text-[11px] font-bold tracking-[0.08em] transition-colors shadow-sm ` + (
                (data?.date === d) || (!date && data?.date === d && d === data.date)
                  ? 'bg-marigold text-night ring-1 ring-marigold'
                  : 'bg-white border border-black/10 text-ink/60 hover:text-marigold hover:border-marigold/50'
              )}
            >
              {d}
            </button>
          ))}
        </div>
      )}

      {!data ? (
        <p className="py-14 text-center text-sm text-ink/40 font-medium">Loading leaderboard...</p>
      ) : data.none || data.is_test || data.entries.length === 0 ? (
        <div className="py-14 text-center">
          <p className="text-[15px] font-medium text-ink/50">No leaderboard entries for this date.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 font-bold text-ink/50">Rank</th>
                <th className="px-6 py-4 font-bold text-ink/50">Name</th>
                <th className="px-6 py-4 font-bold text-ink/50 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {data.entries.map((e, i) => (
                <tr key={i} className={i < 3 ? 'bg-marigold/5' : ''}>
                  <td className="px-6 py-4 font-bold text-ink/60">
                    {i < 3 ? <span className="text-xl">{MEDALS[i]}</span> : `#${i + 1}`}
                  </td>
                  <td className="px-6 py-4 font-bold text-ink">{e.name}</td>
                  <td className="px-6 py-4 text-right font-medium text-ink/60">{e.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function VouchersTab() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  
  useEffect(() => {
    api.vouchers().then(setVouchers).catch(() => setVouchers([]));
  }, []);

  if (vouchers.length === 0) {
    return (
      <div className="py-14 text-center">
        <p className="text-[15px] font-medium text-ink/50">No vouchers available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {vouchers.map((v) => (
        <Reveal key={v.id}>
          <div className="relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 transition-all hover:shadow-md">
            <span className="diamond absolute -right-4 -top-4 h-24 w-24 bg-gradient-to-br from-marigold/20 to-flame/10" aria-hidden="true" />
            <div className="flex items-start justify-between gap-4">
              <div className="relative z-10">
                <p className="kicker text-flame">{v.brand || 'SIBAQ reward'}</p>
                <h3 className="mt-2 font-head text-xl font-extrabold text-ink">{v.title}</h3>
                {v.description && <p className="mt-2 text-[15px] text-ink/70 font-medium">{v.description}</p>}
              </div>
              {v.image && <img src={v.image} alt="" className="relative z-10 h-16 w-16 rounded-xl object-cover shadow-sm" />}
            </div>
            {v.instructions && (
              <p className="relative z-10 mt-5 rounded-xl border border-black/5 bg-gray-50 p-4 text-[13px] leading-relaxed text-ink/60 font-medium">
                {v.instructions}
              </p>
            )}
            {v.expiry && <p className="relative z-10 mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-marigold">Valid till {v.expiry}</p>}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function GamePage() {
  const [tab, setTab] = useState<Tab>('quiz');
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <section className="container-x min-h-[100svh] pb-24 pt-28 bg-gray-50/50">
      <FestivalParticles density="dense" />
      {/* Game Arena Hero */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-paper via-paper to-gray-50/50 text-center shadow-sm ring-1 ring-black/5 mb-10 pb-10">
        <PennantGarland className="absolute top-0 left-0 right-0 z-0" />
        
        <div className="relative z-10 flex flex-col items-center pt-16">
          <div className="w-full max-w-sm mb-6 animate-fade-up">
            <ArenaHeroIllustration />
          </div>
          
          <div className="relative flex flex-col items-center">
            <GeometricSparkles className="absolute inset-0 scale-125 pointer-events-none" />
            <p className="kicker mb-3 flex items-center gap-2 text-marigold relative z-10">
              <span className="diamond h-1.5 w-1.5 bg-marigold animate-pulse" />
              {today}
              <span className="diamond h-1.5 w-1.5 bg-marigold animate-pulse" style={{ animationDelay: '0.5s' }} />
            </p>
            <h1 className="display text-4xl sm:text-6xl tracking-wide text-ink relative z-10">
              SIBAQ <span className="text-gradient-fest">GAME ARENA</span>
            </h1>
            <p className="mt-4 font-head text-[13px] font-bold uppercase tracking-widest text-ink/60 relative z-10">
              Play. Learn. Climb the Leaderboard.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-xl relative z-10">
        <div className="mb-8 flex rounded-full border border-black/10 bg-white p-1.5 shadow-sm" role="tablist" aria-label="Game sections">
          {(
            [
              ['quiz', 'Quiz'],
              ['leaders', 'Leaderboard'],
              ['vouchers', 'Vouchers'],
            ] as [Tab, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`relative flex-1 rounded-full py-3.5 font-head text-[12px] font-extrabold uppercase tracking-[0.14em] transition-colors ` + (
                tab === id ? 'text-ink shadow-sm' : 'text-ink/50 hover:text-marigold hover:bg-gray-50'
              )}
            >
              {tab === id && <span className="absolute inset-0 rounded-full bg-marigold" style={{ zIndex: -1 }} />}
              {label}
            </button>
          ))}
        </div>

        <div role="tabpanel">
          {tab === 'quiz' && <QuizTab />}
          {tab === 'leaders' && <LeadersTab />}
          {tab === 'vouchers' && <VouchersTab />}
        </div>
      </div>
      
      {/* Background decorations for carnival feel */}
      <div className="absolute top-1/2 left-0 w-32 h-32 bg-flame/5 rounded-full blur-3xl -z-10" aria-hidden="true" />
      <div className="absolute bottom-20 right-0 w-48 h-48 bg-marigold/5 rounded-full blur-3xl -z-10" aria-hidden="true" />
    </section>
  );
}
