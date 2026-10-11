import { useCallback, useEffect, useState, useRef } from 'react';
import { api, participantId, type LeaderboardData, type QuizState } from '../lib/api';
import { useSite } from '../lib/site';
import { playSynthBeep, isSoundEnabled, setSoundEnabled } from '../lib/synthAudio';
import GameEntranceOverlay from '../components/GameEntranceOverlay';
import CelebrationPopperOverlay from '../components/CelebrationPopperOverlay';
import KuttikkatturStreetRacing from '../components/KuttikkatturStreetRacing';
import VouchersModal from '../components/VouchersModal';
import PennantGarland from '../components/PennantGarland';

export default function GamePage() {
  const site = useSite();

  // Arena & Audio State
  const [soundOn, setSoundOn] = useState(isSoundEnabled);
  const [totalScore, setTotalScore] = useState(350);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showPortalTransition, setShowPortalTransition] = useState(false);
  const [showPopper, setShowPopper] = useState(false);
  const [showVouchersModal, setShowVouchersModal] = useState(false);

  // Daily Quiz State (Connected to backend)
  const [quizState, setQuizState] = useState<'loading' | QuizState | 'error'>('loading');
  const [playerName, setPlayerName] = useState(() => localStorage.getItem('sibaq_name') || '');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [quizError, setQuizError] = useState('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // 15-second Timer State
  const [timerSec, setTimerSec] = useState(15);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Leaderboard State (Connected to backend)
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData | null>(null);
  const [leadScope, setLeadScope] = useState<'daily' | 'overall'>('daily');

  // Trigger floating toast
  const triggerToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2800);
  }, []);

  // Audio Synth Toggle
  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) {
      playSynthBeep('jackpot');
      triggerToast('Carnival Chimes On 🔔');
    } else {
      triggerToast('Audio FX Muted 🔕');
    }
  };

  // Load Real Backend Quiz
  const loadQuiz = useCallback(() => {
    setQuizState('loading');
    setQuizError('');
    setSelectedOption(null);
    setQuizSubmitted(false);
    setFeedback(null);
    api.quizToday(participantId())
      .then((res) => {
        setQuizState(res);
        if (!res.none && !res.answered) {
          setTimerSec(15);
        }
      })
      .catch(() => setQuizState('error'));
  }, []);

  // Load Real Backend Leaderboard
  const loadLeaderboard = useCallback(() => {
    api.leaderboard()
      .then(setLeaderboardData)
      .catch(() => setLeaderboardData(null));
  }, []);

  useEffect(() => {
    loadQuiz();
    loadLeaderboard();
  }, [loadQuiz, loadLeaderboard]);

  // 15-sec timer tick
  useEffect(() => {
    if (quizState === 'loading' || quizState === 'error' || quizState.none || quizState.answered || quizSubmitted) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimerSec((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizState, quizSubmitted]);

  // Option selection
  const handleSelectOption = (idx: number) => {
    if (quizSubmitted || submitting) return;
    playSynthBeep('tick');
    setSelectedOption(idx);
  };

  // Trigger Confetti Burst
  const triggerConfetti = (e?: React.MouseEvent) => {
    playSynthBeep('jackpot');
    const colors = ['#F15A24', '#E52B2B', '#FFC928', '#36AD50', '#FFFFFF'];
    const startX = e ? e.clientX : window.innerWidth / 2;
    const startY = e ? e.clientY : window.innerHeight / 2;

    for (let i = 0; i < 35; i++) {
      const bit = document.createElement('div');
      const size = Math.random() * 8 + 6;
      bit.style.position = 'fixed';
      bit.style.left = `${startX}px`;
      bit.style.top = `${startY}px`;
      bit.style.width = `${size}px`;
      bit.style.height = `${size}px`;
      bit.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      bit.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      bit.style.zIndex = '9999';
      bit.style.pointerEvents = 'none';

      const angle = Math.random() * Math.PI * 2;
      const vel = Math.random() * 190 + 70;
      const tx = Math.cos(angle) * vel;
      const ty = Math.sin(angle) * vel - 80;

      bit.animate(
        [
          { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
          { transform: `translate(${tx}px, ${ty}px) scale(0.3) rotate(540deg)`, opacity: 0 },
        ],
        {
          duration: 1100 + Math.random() * 500,
          easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        }
      ).onfinish = () => bit.remove();

      document.body.appendChild(bit);
    }
  };

  // Submit Answer to Backend API
  const handleSubmitAnswer = async () => {
    if (selectedOption === null || !playerName.trim() || submitting || quizSubmitted) return;
    if (typeof quizState !== 'object' || quizState.none || !quizState.id) return;

    setSubmitting(true);
    setQuizError('');

    try {
      localStorage.setItem('sibaq_name', playerName.trim());
      const res = await api.submitQuiz({
        questionId: quizState.id,
        optionIndex: selectedOption,
        name: playerName.trim(),
        participant: participantId(),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Submission failed');

      setQuizSubmitted(true);
      const isCorrect = data.correct === true;

      if (isCorrect) {
        playSynthBeep('correct');
        setShowPopper(true);
        triggerConfetti();
        setTotalScore((prev) => prev + 50);
        setFeedback({
          isCorrect: true,
          text: '✓ CORRECT! (+50 PTS) You are recorded on today\'s festival leaderboard.',
        });
        triggerToast('🏆 Correct Answer! +50 Points Added!');
      } else {
        playSynthBeep('wrong');
        setFeedback({
          isCorrect: false,
          text: '✕ INCORRECT! Thank you for participating. Check back tomorrow for the next challenge.',
        });
        triggerToast('Round Complete!');
      }

      loadLeaderboard();
    } catch (err) {
      playSynthBeep('wrong');
      setQuizError(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  // Launch Portal Transition Effect
  const handleLaunchPortal = () => {
    playSynthBeep('jackpot');
    triggerConfetti();
    setShowPortalTransition(true);
  };

  // Share Festival Scorecard
  const handleShareScorecard = async () => {
    playSynthBeep('jackpot');
    triggerConfetti();
    const shareText = `🎪 SIBAQ '26 Carnival Game Arena @Kuttikkattur!\nMy Total Score: ${totalScore} PTS\nPlay the live daily rounds: ${window.location.origin}/game`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "SIBAQ '26 Game Arena",
          text: shareText,
          url: `${window.location.origin}/game`,
        });
        triggerToast('🎉 Shared Festival Scorecard!');
        return;
      }
      throw new Error('No native share');
    } catch {
      try {
        await navigator.clipboard.writeText(shareText);
        triggerToast('📋 Festival Scorecard Copied to Clipboard!');
      } catch {
        triggerToast('Scorecard generated!');
      }
    }
  };

  // Entries for Podium
  const entries = leaderboardData?.entries || [];
  const top1 = entries[0];
  const top2 = entries[1];
  const top3 = entries[2];
  const top4 = entries[3];

  return (
    <div className="min-h-screen bg-[#111215] text-slate-100 font-sans selection:bg-[#F15A24] selection:text-white pb-24">
      {/* 1. Fullscreen Entry Transition Overlay */}
      <GameEntranceOverlay
        isOpen={showPortalTransition}
        onComplete={() => {
          setShowPortalTransition(false);
          document.getElementById('portalDailyQuizCard')?.scrollIntoView({ behavior: 'smooth' });
          triggerToast('🎯 Entered SIBAQ Game Arena!');
        }}
      />

      {/* 2. Celebration Popper Cannon Overlay */}
      <CelebrationPopperOverlay show={showPopper} onDone={() => setShowPopper(false)} />

      {/* 3. Vouchers Modal */}
      <VouchersModal
        isOpen={showVouchersModal}
        onClose={() => setShowVouchersModal(false)}
        onToast={triggerToast}
      />

      {/* Floating Arena Toast */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1A1C23] border-2 border-[#FFC928] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 transition-all duration-300 transform z-50 ${
          showToast ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-28 opacity-0 pointer-events-none'
        }`}
        aria-live="polite"
      >
        <span className="text-xl">✨</span>
        <span className="text-xs font-bold">{toastMsg}</span>
      </div>

      {/* Arena Navigation Top Bar */}
      <header className="border-b border-amber-900/40 bg-[#16181F]/95 backdrop-blur-md sticky top-0 z-40 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl animate-bounce">🎪</span>
            <div>
              <span className="font-head font-black text-sm sm:text-base tracking-wider text-white flex items-center gap-1.5">
                SIBAQ <span className="text-[#FFC928]">CARNIVAL ARENA</span>
              </span>
              <p className="text-[10px] text-amber-300/80 font-mono hidden sm:block">
                National Arts Fest '26 · Kuttikkattur
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Live Score Badge */}
            <div className="px-3 py-1.5 rounded-xl bg-[#20232B] border border-amber-500/40 flex items-center space-x-2">
              <span className="text-sm">🪙</span>
              <div className="text-left font-mono leading-none">
                <span className="text-[9px] text-slate-400 block uppercase">Points</span>
                <span className="font-black text-amber-300 text-xs sm:text-sm">{totalScore}</span>
              </div>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              aria-label={soundOn ? 'Mute Sound FX' : 'Enable Sound FX'}
              className="w-9 h-9 rounded-xl bg-[#20232B] border border-slate-700 text-slate-200 hover:text-white flex items-center justify-center text-sm tactile-btn shadow"
            >
              {soundOn ? '🔔' : '🔕'}
            </button>

            {/* Confetti Trigger */}
            <button
              onClick={(e) => triggerConfetti(e)}
              aria-label="Fire Carnival Confetti"
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E52B2B] to-[#F15A24] text-white flex items-center justify-center text-sm tactile-btn shadow"
            >
              🎉
            </button>

            {/* Voucher Perks Drawer */}
            <button
              onClick={() => {
                playSynthBeep('tick');
                setShowVouchersModal(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#36AD50] to-emerald-600 text-white font-head font-bold text-xs tactile-btn shadow flex items-center space-x-1.5"
            >
              <span>🎟️</span>
              <span className="hidden sm:inline">VOUCHERS</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Arena View */}
      <main className="max-w-6xl mx-auto px-4 pt-6 space-y-6">
        
        {/* =========================================================================
            SECTION 1: PENNANTS + SPINNING CARNIVAL WHEEL + TOP LEADERBOARD PODIUM
           ========================================================================= */}
        <div className="relative w-full rounded-3xl overflow-hidden border-2 border-amber-500/40 bg-gradient-to-b from-[#2A1010] via-[#1B1822] to-[#14151B] p-4 sm:p-7 shadow-2xl">
          
          {/* Continuous Waving Pennants Streamer Across Top */}
          <div className="w-full h-8 overflow-hidden pointer-events-none flex justify-center -mb-2">
            <svg className="w-full max-w-2xl h-8 anim-pennants" viewBox="0 0 800 40" fill="none" preserveAspectRatio="none">
              <path d="M 0,6 Q 200,22 400,6 Q 600,22 800,6" stroke="#FFC928" strokeWidth="2" />
              <polygon points="40,8 60,9 50,30" fill="#E52B2B" />
              <polygon points="100,12 120,13 110,34" fill="#FFC928" />
              <polygon points="160,16 180,17 170,38" fill="#36AD50" />
              <polygon points="220,17 240,16 230,37" fill="#F15A24" />
              <polygon points="280,14 300,13 290,32" fill="#E52B2B" />
              <polygon points="340,9 360,8 350,28" fill="#FFC928" />
              <polygon points="440,8 460,9 450,30" fill="#36AD50" />
              <polygon points="500,13 520,14 510,34" fill="#F15A24" />
              <polygon points="560,16 580,17 570,38" fill="#E52B2B" />
              <polygon points="620,17 640,16 630,37" fill="#FFC928" />
              <polygon points="680,14 700,13 690,32" fill="#36AD50" />
              <polygon points="740,9 760,8 750,28" fill="#F15A24" />
            </svg>
          </div>

          {/* THE SPINNING FERRIS WHEEL / RADIAL SUNBURST ARCH */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[520px] pointer-events-none opacity-45 sm:opacity-60 flex items-center justify-center">
            <svg className="w-full h-full anim-wheel-rotate" viewBox="0 0 500 500" fill="none">
              <g>
                <path d="M 250,250 L 250,15 A 235,235 0 0,1 416,84 Z" fill="#E52B2B" />
                <path d="M 250,250 L 416,84 A 235,235 0 0,1 485,250 Z" fill="#FFC928" />
                <path d="M 250,250 L 485,250 A 235,235 0 0,1 416,416 Z" fill="#F15A24" />
                <path d="M 250,250 L 416,416 A 235,235 0 0,1 250,485 Z" fill="#36AD50" />
                <path d="M 250,250 L 250,485 A 235,235 0 0,1 84,416 Z" fill="#E52B2B" />
                <path d="M 250,250 L 84,416 A 235,235 0 0,1 15,250 Z" fill="#FFC928" />
                <path d="M 250,250 L 15,250 A 235,235 0 0,1 84,84 Z" fill="#F15A24" />
                <path d="M 250,250 L 84,84 A 235,235 0 0,1 250,15 Z" fill="#36AD50" />
              </g>
              <circle cx="250" cy="25" r="9" fill="#FFFFFF" />
              <circle cx="409" cy="91" r="9" fill="#FFFFFF" />
              <circle cx="475" cy="250" r="9" fill="#FFFFFF" />
              <circle cx="409" cy="409" r="9" fill="#FFFFFF" />
              <circle cx="250" cy="475" r="9" fill="#FFFFFF" />
              <circle cx="91" cy="409" r="9" fill="#FFFFFF" />
              <circle cx="25" cy="250" r="9" fill="#FFFFFF" />
              <circle cx="91" cy="91" r="9" fill="#FFFFFF" />
              <circle cx="250" cy="250" r="140" stroke="#FFFFFF" strokeWidth="6" fill="none" />
              <circle cx="250" cy="250" r="70" fill="#181A20" stroke="#FFC928" strokeWidth="6" />
            </svg>
          </div>

          {/* TOP LEADERBOARD MARQUEE (Matching Sketch Box with Podium Ranks 1, 2, 3, 4) */}
          <div className="relative z-10 w-full max-w-3xl mx-auto rounded-2xl bg-[#181A20]/95 backdrop-blur-md border-2 border-amber-500/60 p-4 sm:p-6 shadow-2xl">
            {/* Header Bar */}
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl" aria-hidden="true">🏆</span>
                <div>
                  <h2 className="font-head font-black text-base sm:text-xl text-white tracking-wide uppercase flex items-center space-x-2">
                    <span>LEADERBOARD</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold border border-emerald-500/30 hidden sm:inline">
                      LIVE ROUNDS
                    </span>
                  </h2>
                  <p className="text-[11px] font-mono text-slate-400">Festival Campus Participants Standings</p>
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center space-x-1 bg-[#121316] p-1 rounded-xl border border-slate-700/60">
                <button
                  onClick={() => {
                    playSynthBeep('tick');
                    setLeadScope('daily');
                    triggerToast('Leaderboard: Daily Rounds View');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all ${
                    leadScope === 'daily' ? 'bg-[#E52B2B] text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Daily
                </button>
                <button
                  onClick={() => {
                    playSynthBeep('tick');
                    setLeadScope('overall');
                    triggerToast('Leaderboard: All-Time Biennial Standings');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                    leadScope === 'overall' ? 'bg-[#E52B2B] text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Overall
                </button>
              </div>
            </div>

            {/* 3-Tier Vector Podium Display for Ranks 1, 2, and 3 */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 text-center items-end">
              {/* Rank 2: Silver (Left) */}
              <div className="p-2 sm:p-3 rounded-2xl bg-gradient-to-t from-slate-900 via-slate-800 to-slate-700 border-2 border-slate-400/80 shadow-md transform hover:-translate-y-1 transition">
                <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-slate-300 text-slate-950 font-head font-black text-xs flex items-center justify-center border-2 border-white shadow">
                  2
                </div>
                <div className="font-head font-black text-white text-xs sm:text-sm truncate">
                  {top2?.name || 'Awaiting entry'}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {top2 ? 'Competitor' : 'Position #2'}
                </div>
                <div className="font-mono font-black text-slate-200 text-xs sm:text-sm mt-1">
                  {top2?.time || '435 PTS'}
                </div>
              </div>

              {/* Rank 1: Gold with Crown Trophy (Center Elevated) */}
              <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-t from-amber-950/60 via-[#261E14] to-[#3A2C10] border-2 border-[#FFC928] shadow-[0_0_25px_rgba(255,201,40,0.6)] transform -translate-y-2 hover:-translate-y-3 transition">
                <div className="flex justify-center -mt-6 mb-1">
                  {/* Vector Crown SVG */}
                  <svg className="w-7 h-7 text-[#FFC928] drop-shadow" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5m14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
                  </svg>
                </div>
                <div className="w-10 h-10 mx-auto mb-1 rounded-full bg-[#FFC928] text-slate-950 font-head font-black text-sm flex items-center justify-center border-2 border-white shadow">
                  1
                </div>
                <div className="font-head font-black text-amber-300 text-xs sm:text-base truncate">
                  {top1?.name || 'Awaiting entry'}
                </div>
                <div className="text-[10px] text-amber-200/80 truncate">
                  {top1 ? 'Champion' : 'Daily Leader'}
                </div>
                <div className="font-mono font-black text-[#FFC928] text-sm sm:text-base mt-1">
                  {top1?.time || '480 PTS'}
                </div>
              </div>

              {/* Rank 3: Bronze (Right) */}
              <div className="p-2 sm:p-3 rounded-2xl bg-gradient-to-t from-orange-950/60 via-amber-950/40 to-amber-900/60 border-2 border-amber-700/80 shadow-md transform hover:-translate-y-1 transition">
                <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-amber-600 text-white font-head font-black text-xs flex items-center justify-center border-2 border-white shadow">
                  3
                </div>
                <div className="font-head font-black text-white text-xs sm:text-sm truncate">
                  {top3?.name || 'Awaiting entry'}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {top3 ? 'Competitor' : 'Position #3'}
                </div>
                <div className="font-mono font-black text-amber-300 text-xs sm:text-sm mt-1">
                  {top3?.time || '410 PTS'}
                </div>
              </div>
            </div>

            {/* Rank 4 Row (Sketch Rank 4) */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#121316]/80 border border-slate-700 text-xs font-mono">
              <div className="flex items-center space-x-3">
                <span className="w-6 text-center font-bold text-slate-400">#4</span>
                <span className="font-sans font-bold text-slate-200">
                  {top4?.name || 'Bilal Shafi (Campus Participant)'}
                </span>
                <span className="text-slate-500 font-sans hidden sm:inline">• Fine Arts Academy</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-amber-400">{top4?.time || '385 PTS'}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">TOP 5%</span>
              </div>
            </div>

          </div>

        </div>

        {/* =========================================================================
            SECTION 2: MASSIVE "PLAY GAME" PORTAL BUTTON (CENTER OF SKETCH)
           ========================================================================= */}
        <div className="w-full flex flex-col items-center justify-center py-2 relative">
          
          {/* Pennants Accent Divider Above Button */}
          <div className="w-full max-w-md h-6 overflow-hidden pointer-events-none flex justify-center -mb-2">
            <svg className="w-full h-6 anim-pennants" viewBox="0 0 400 25" fill="none">
              <path d="M 0,4 Q 100,16 200,4 Q 300,16 400,4" stroke="#FFC928" strokeWidth="1.8" />
              <polygon points="40,6 55,7 48,20" fill="#E52B2B" />
              <polygon points="90,9 105,10 98,23" fill="#FFC928" />
              <polygon points="140,11 155,12 148,25" fill="#36AD50" />
              <polygon points="190,12 205,11 198,24" fill="#F15A24" />
              <polygon points="240,10 255,9 248,22" fill="#E52B2B" />
              <polygon points="290,7 305,6 298,19" fill="#FFC928" />
              <polygon points="340,6 355,7 348,20" fill="#36AD50" />
            </svg>
          </div>

          {/* Master "PLAY GAME" Launch Controller with Independent Rotating Outer Wheel */}
          <div
            className="relative flex items-center group cursor-pointer my-2 select-none"
            onClick={handleLaunchPortal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleLaunchPortal();
            }}
            aria-label="Launch Carnival Game Arena Portal"
          >
            {/* Upright Tactile Left Banner Label */}
            <div className="mr-[-26px] z-20 py-3 pl-6 pr-10 rounded-3xl bg-gradient-to-r from-[#FFC928] via-[#FFD452] to-[#FFC928] text-slate-950 font-head font-black text-sm sm:text-lg tracking-wider uppercase shadow-xl transform -rotate-2 group-hover:rotate-0 group-hover:scale-105 transition-all border-2 sm:border-4 border-white flex items-center space-x-2">
              <span>PLAY GAME</span>
              <span className="text-xl">🎮</span>
            </div>

            {/* Spinning Carnival Wheel Assembly */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center filter drop-shadow-2xl">
              {/* Outer Segmented Carnival Ring (Rotates continuously at 6.5s per turn) */}
              <svg className="absolute inset-0 w-full h-full anim-play-wheel-spin pointer-events-none" viewBox="0 0 200 200" fill="none">
                <path d="M 100,100 L 100,6 A 94,94 0 0,1 166.47,33.53 Z" fill="#E52B2B" />
                <path d="M 100,100 L 166.47,33.53 A 94,94 0 0,1 194,100 Z" fill="#FFC928" />
                <path d="M 100,100 L 194,100 A 94,94 0 0,1 166.47,166.47 Z" fill="#F15A24" />
                <path d="M 100,100 L 166.47,166.47 A 94,94 0 0,1 100,194 Z" fill="#36AD50" />
                <path d="M 100,100 L 100,194 A 94,94 0 0,1 33.53,166.47 Z" fill="#E52B2B" />
                <path d="M 100,100 L 33.53,166.47 A 94,94 0 0,1 6,100 Z" fill="#FFC928" />
                <path d="M 100,100 L 6,100 A 94,94 0 0,1 33.53,33.53 Z" fill="#F15A24" />
                <path d="M 100,100 L 33.53,33.53 A 94,94 0 0,1 100,6 Z" fill="#36AD50" />
                <circle cx="100" cy="100" r="92" stroke="#FFFFFF" strokeWidth="4.5" />
                {/* Perimeter Carnival Bulbs */}
                <circle cx="100" cy="14" r="5" fill="#FFFFFF" />
                <circle cx="160" cy="39" r="5" fill="#FFFFFF" />
                <circle cx="186" cy="100" r="5" fill="#FFFFFF" />
                <circle cx="160" cy="161" r="5" fill="#FFFFFF" />
                <circle cx="100" cy="186" r="5" fill="#FFFFFF" />
                <circle cx="40" cy="161" r="5" fill="#FFFFFF" />
                <circle cx="14" cy="100" r="5" fill="#FFFFFF" />
                <circle cx="40" cy="39" r="5" fill="#FFFFFF" />
              </svg>

              {/* Stationary Central Red Tactile Play Button */}
              <button
                type="button"
                className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#FF4444] via-[#E52B2B] to-[#991B1B] text-white flex items-center justify-center shadow-2xl border-2 sm:border-4 border-white group-hover:scale-105 active:scale-95 transition-transform"
              >
                <svg className="w-8 h-8 ml-1 fill-current text-white drop-shadow" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>

          <p className="text-[11px] font-mono text-amber-300 font-bold tracking-wider mt-1">
            CLICK TO LAUNCH CARNIVAL PORTAL ✦ FULLSCREEN COLOR BURST
          </p>
        </div>

        {/* =========================================================================
            SECTION 3: DAILY QUIZ ARENA + KUTTIKKATTUR STREET RACING + SOCIAL SHARE
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* PORTAL 1: DAILY QUIZ ARENA (Cream Reading Surface & Corner Rosettes Frame) */}
          <div
            id="portalDailyQuizCard"
            className="relative rounded-3xl bg-[#FFF8E8] text-[#191919] border-4 border-[#FFC928] p-5 sm:p-7 shadow-2xl overflow-hidden flex flex-col justify-between"
          >
            {/* Decorative Inset Border Stripe & Corner Rosettes */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              preserveAspectRatio="none"
              viewBox="0 0 500 400"
              fill="none"
              aria-hidden="true"
            >
              <rect x="6" y="6" width="488" height="388" rx="16" stroke="#F15A24" strokeWidth="2" strokeDasharray="10 8" />
              <circle cx="16" cy="16" r="6" fill="#E52B2B" />
              <circle cx="484" cy="16" r="6" fill="#36AD50" />
              <circle cx="16" cy="384" r="6" fill="#36AD50" />
              <circle cx="484" cy="384" r="6" fill="#F15A24" />
            </svg>

            {/* Top Quiz Status Header with Flame & Lightning Corona Badge */}
            <div className="relative z-10 flex items-center justify-between border-b-2 border-amber-200 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#181A20] flex items-center justify-center border border-amber-400 shrink-0">
                  <svg className="w-6 h-6 anim-corona-spin" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="28" stroke="#FFC928" strokeWidth="2" strokeDasharray="6 4" />
                    <polygon points="34,14 24,32 32,32 30,50 42,30 34,30" fill="#FFC928" />
                  </svg>
                </div>
                <div>
                  <span className="text-[11px] font-head font-black text-[#E52B2B] tracking-wider uppercase">
                    DAILY QUIZ ARENA
                  </span>
                  <div className="text-[10px] font-mono text-slate-700 font-bold">Live Official Rounds</div>
                </div>
              </div>

              {/* 15-Sec Countdown Timer Ring */}
              <div className="flex items-center space-x-2">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <svg className="w-10 h-10 -rotate-90" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="19" stroke="#E2D6C0" strokeWidth="4.5" fill="none" />
                    <circle
                      cx="24"
                      cy="24"
                      r="19"
                      stroke={timerSec <= 5 ? '#E52B2B' : '#36AD50'}
                      strokeWidth="4.5"
                      strokeDasharray="119.38"
                      strokeDashoffset={119.38 * (1 - timerSec / 15)}
                      strokeLinecap="round"
                      fill="none"
                      className="transition-all duration-1000 ease-linear"
                    />
                  </svg>
                  <span className="absolute font-head font-black text-xs text-[#191919]">{timerSec}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-700 font-bold hidden sm:inline">SEC</span>
              </div>
            </div>

            {/* Quiz Content Container */}
            <div className="relative z-10">
              {quizState === 'loading' ? (
                <div className="py-12 text-center text-sm font-bold text-slate-700 font-mono">
                  Loading today's challenge from arena servers...
                </div>
              ) : quizState === 'error' ? (
                <div className="py-10 text-center space-y-2">
                  <p className="text-sm font-bold text-red-700">Could not connect to the quiz server.</p>
                  <button onClick={loadQuiz} className="px-4 py-1.5 rounded-xl bg-amber-200 text-xs font-bold font-mono">
                    Retry ↺
                  </button>
                </div>
              ) : quizState.none ? (
                /* The Arena Is Getting Ready (Empty State) */
                <div className="py-8 text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-3xl">
                    🎪
                  </div>
                  <h4 className="font-head text-xl font-black text-[#191919]">THE ARENA IS GETTING READY!</h4>
                  <p className="text-xs text-slate-600 font-medium max-w-sm mx-auto">
                    Today's official challenge will appear here once published by the festival committee. Come back soon!
                  </p>
                </div>
              ) : quizState.answered ? (
                /* Already Answered State */
                <div className="py-8 text-center space-y-3">
                  <div className="text-4xl">{quizState.was_correct ? '🏆' : '🎯'}</div>
                  <h4 className="font-head text-xl font-black text-[#191919]">
                    {quizState.was_correct ? 'BRILLIANT! CORRECT ANSWER' : 'ALREADY PLAYED TODAY'}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium max-w-sm mx-auto">
                    {quizState.was_correct
                      ? site?.game.voucherLine ?? 'Your score is logged on the live leaderboard. Great work!'
                      : 'One entry per participant per round — come back tomorrow for a new question.'}
                  </p>
                  <button
                    onClick={handleShareScorecard}
                    className="mt-3 px-5 py-2.5 rounded-xl bg-gradient-to-r from-flame to-marigold text-slate-950 font-head font-bold text-xs tactile-btn shadow"
                  >
                    Share Result 📢
                  </button>
                </div>
              ) : (
                /* Active Question Mode */
                <>
                  <div className="mb-4">
                    <div className="text-[10px] font-mono text-slate-600 uppercase font-bold flex items-center justify-between">
                      <span>Cultural Arts &amp; Heritage • Q1</span>
                      {quizState.is_test && (
                        <span className="text-[9px] px-2 py-0.5 rounded bg-black/10 text-slate-800">
                          Demo · Test Round
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-black font-head text-[#191919] leading-snug mt-1">
                      {quizState.question}
                    </h3>
                  </div>

                  {/* Player Name Input */}
                  <div className="mb-4">
                    <label htmlFor="arena-player-name" className="text-[10px] font-head font-bold text-slate-700 block mb-1 uppercase tracking-wider">
                      Your Full Name (Leaderboard Display)
                    </label>
                    <input
                      id="arena-player-name"
                      type="text"
                      required
                      maxLength={40}
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      placeholder="e.g. Fathima K."
                      className="w-full rounded-xl border-2 border-amber-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-bold text-[#191919] outline-none focus:border-[#F15A24]"
                    />
                  </div>

                  {/* Multiple Choice Options (A, B, C, D) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                    {quizState.options?.map((opt, idx) => {
                      const letters = ['A', 'B', 'C', 'D'];
                      const isSelected = selectedOption === idx;

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectOption(idx)}
                          className={`text-left p-3 rounded-2xl border-2 transition flex items-center space-x-2.5 shadow-sm tactile-btn ${
                            isSelected
                              ? 'bg-amber-100 border-[#E52B2B] ring-2 ring-[#E52B2B]/20'
                              : 'bg-white border-amber-200 hover:border-[#F15A24]'
                          }`}
                        >
                          <span className="w-7 h-7 rounded-lg bg-amber-100 text-[#191919] font-head font-black text-xs flex items-center justify-center shrink-0 border border-amber-300">
                            {letters[idx]}
                          </span>
                          <span className="font-sans font-bold text-xs sm:text-sm text-slate-900">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Banner */}
                  {feedback && (
                    <div
                      className={`rounded-2xl p-3 mb-3 text-xs font-bold ${
                        feedback.isCorrect
                          ? 'bg-emerald-100 border-2 border-[#36AD50] text-emerald-950'
                          : 'bg-red-100 border-2 border-[#E52B2B] text-red-950'
                      }`}
                    >
                      {feedback.text}
                    </div>
                  )}

                  {quizError && (
                    <div className="rounded-xl p-2.5 mb-3 bg-red-100 border border-red-300 text-red-800 text-xs font-bold">
                      {quizError}
                    </div>
                  )}

                  {/* Submit / Action Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-amber-200">
                    <span className="text-xs font-mono font-bold text-amber-900">
                      Streak Points: <strong className="text-[#E52B2B] text-sm">+50 PTS</strong>
                    </span>

                    <button
                      type="button"
                      disabled={selectedOption === null || !playerName.trim() || submitting || quizSubmitted}
                      onClick={handleSubmitAnswer}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E52B2B] to-[#F15A24] text-white font-head font-black text-xs shadow-md tactile-btn flex items-center space-x-1.5 disabled:opacity-40 disabled:pointer-events-none"
                    >
                      <span>{submitting ? 'RECORDING...' : 'SUBMIT ANSWER'}</span>
                      <span>➔</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* PORTAL 2: KUTTIKKATTUR STREET RACING MINI-GAME */}
          <KuttikkatturStreetRacing onScoreGained={(pts) => setTotalScore((prev) => prev + pts)} />

        </div>

        {/* =========================================================================
            PORTAL 3: SHARE SOCIAL MEDIA STATION (BOTTOM OF SKETCH)
           ========================================================================= */}
        <div className="w-full rounded-3xl bg-gradient-to-r from-[#20181A] via-[#1C1A22] to-[#151720] border-2 border-amber-500/40 p-5 sm:p-7 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-5 text-white">
          
          <div className="flex items-center space-x-4">
            {/* Cultural Festival Camera Aperture SVG Emblem */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center p-1 bg-[#121316] rounded-2xl border-2 border-amber-500/40 shadow-inner">
              <svg className="w-full h-full" viewBox="0 0 100 80" fill="none">
                <rect x="10" y="20" width="80" height="52" rx="10" fill="#20232B" stroke="#111215" strokeWidth="2" />
                <path d="M 10,32 L 90,32 L 90,36 L 10,36 Z" fill="#F15A24" />
                <rect x="25" y="14" width="16" height="8" rx="2" fill="#E52B2B" />
                <circle cx="75" cy="26" r="3" fill="#FFC928" />
                {/* Lens Rings with SIBAQ Aperture Segments */}
                <circle cx="50" cy="46" r="22" fill="#181A20" stroke="#FFC928" strokeWidth="2.5" />
                <path d="M 50,26 C 60,26 68,34 70,44 L 50,46 Z" fill="#E52B2B" />
                <path d="M 70,44 C 70,54 62,64 52,66 L 50,46 Z" fill="#FFC928" />
                <path d="M 52,66 C 42,66 32,58 30,48 L 50,46 Z" fill="#36AD50" />
                <path d="M 30,48 C 30,38 38,28 48,26 L 50,46 Z" fill="#F15A24" />
                <circle cx="50" cy="46" r="5" fill="#FFFFFF" />
              </svg>
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/20 text-[#F15A24] font-mono text-[10px] font-bold uppercase">
                <span>📷 MEDIA &amp; SOCIAL SHARE</span>
              </div>
              <h3 className="font-head font-black text-lg sm:text-xl text-white">
                SHARE YOUR FESTIVAL GLORY
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Broadcast your ranks, speedway records, and streak scores to friends &amp; campus groups!
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0 w-full sm:w-auto">
            <button
              onClick={handleShareScorecard}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#FFC928] via-[#F15A24] to-[#E52B2B] text-slate-950 font-head font-black text-xs sm:text-sm shadow-xl hover:brightness-110 transition tactile-btn flex items-center justify-center space-x-2"
            >
              <span>📸</span>
              <span>SHARE SOCIAL MEDIA</span>
            </button>
          </div>

        </div>

      </main>

      {/* Garland divider before footer */}
      <div className="max-w-4xl mx-auto px-4 mt-16 opacity-70">
        <PennantGarland />
      </div>
    </div>
  );
}
