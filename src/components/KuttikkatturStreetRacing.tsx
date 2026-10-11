import { useEffect, useRef, useState, useCallback } from 'react';
import { playSynthBeep } from '../lib/synthAudio';

interface Props {
  onScoreGained?: (pts: number) => void;
}

export default function KuttikkatturStreetRacing({ onScoreGained }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [active, setActive] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gameState = useRef({
    car: { x: 150, y: 190, width: 28, height: 48 },
    obstacles: [] as { x: number; y: number; width: number; height: number }[],
    gems: [] as { x: number; y: number; radius: number; color: string }[],
    roadOffset: 0,
    speed: 4.5,
    animId: 0,
    currentScore: 0,
    isActive: false,
  });

  const steerLeft = useCallback(() => {
    if (!gameState.current.isActive) return;
    gameState.current.car.x = Math.max(35, gameState.current.car.x - 28);
    playSynthBeep('tick');
  }, []);

  const steerRight = useCallback(() => {
    if (!gameState.current.isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    gameState.current.car.x = Math.min(canvas.width - 35 - gameState.current.car.width, gameState.current.car.x + 28);
    playSynthBeep('tick');
  }, []);

  const stopGame = useCallback(() => {
    gameState.current.isActive = false;
    cancelAnimationFrame(gameState.current.animId);
    setActive(false);
    setGameOver(true);
  }, []);

  const startGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || 340;
    canvas.height = rect.height || 230;

    gameState.current.car = {
      x: canvas.width / 2 - 14,
      y: canvas.height - 62,
      width: 28,
      height: 48,
    };
    gameState.current.obstacles = [];
    gameState.current.gems = [];
    gameState.current.roadOffset = 0;
    gameState.current.speed = 4.5;
    gameState.current.currentScore = 0;
    gameState.current.isActive = true;

    setScore(0);
    setGameOver(false);
    setActive(true);
    playSynthBeep('jackpot');

    const loop = () => {
      if (!gameState.current.isActive) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      const st = gameState.current;

      // Draw Highway Track
      ctx.fillStyle = '#181A22';
      ctx.fillRect(0, 0, w, h);

      // Grass Curbs
      ctx.fillStyle = '#0E3D20';
      ctx.fillRect(0, 0, 30, h);
      ctx.fillRect(w - 30, 0, 30, h);

      // Road Borders (Yellow lines)
      ctx.strokeStyle = '#FFC928';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(30, 0);
      ctx.lineTo(30, h);
      ctx.moveTo(w - 30, 0);
      ctx.lineTo(w - 30, h);
      ctx.stroke();

      // Moving Dashed Center Strip
      st.roadOffset = (st.roadOffset + st.speed) % 40;
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.setLineDash([20, 20]);
      ctx.lineDashOffset = -st.roadOffset;
      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      ctx.stroke();
      ctx.setLineDash([]);

      // Spawn Gems
      if (Math.random() < 0.038) {
        const colors = ['#FFC928', '#36AD50', '#F15A24'];
        st.gems.push({
          x: Math.random() * (w - 100) + 40,
          y: -20,
          radius: 9,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      // Spawn Obstacles
      if (Math.random() < 0.024) {
        st.obstacles.push({
          x: Math.random() * (w - 110) + 40,
          y: -30,
          width: 32,
          height: 20,
        });
      }

      // Update & Render Gems
      for (let i = st.gems.length - 1; i >= 0; i--) {
        const gem = st.gems[i];
        gem.y += st.speed;

        ctx.fillStyle = gem.color;
        ctx.beginPath();
        ctx.moveTo(gem.x, gem.y - gem.radius);
        ctx.lineTo(gem.x + gem.radius, gem.y);
        ctx.lineTo(gem.x, gem.y + gem.radius);
        ctx.lineTo(gem.x - gem.radius, gem.y);
        ctx.closePath();
        ctx.fill();

        // Check Collision with Car
        if (
          gem.x > st.car.x - 8 &&
          gem.x < st.car.x + st.car.width + 8 &&
          gem.y > st.car.y - 8 &&
          gem.y < st.car.y + st.car.height + 8
        ) {
          playSynthBeep('gem');
          st.currentScore += 25;
          setScore(st.currentScore);
          onScoreGained?.(25);
          st.gems.splice(i, 1);
          continue;
        }
        if (gem.y > h + 30) st.gems.splice(i, 1);
      }

      // Update & Render Obstacles
      for (let i = st.obstacles.length - 1; i >= 0; i--) {
        const obs = st.obstacles[i];
        obs.y += st.speed;

        // Draw Road Hazard Striped Block
        ctx.fillStyle = '#E52B2B';
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        ctx.fillStyle = '#FFC928';
        ctx.fillRect(obs.x + 6, obs.y, 8, obs.height);
        ctx.fillRect(obs.x + 20, obs.y, 8, obs.height);

        // Collision Check
        if (
          st.car.x < obs.x + obs.width &&
          st.car.x + st.car.width > obs.x &&
          st.car.y < obs.y + obs.height &&
          st.car.y + st.car.height > obs.y
        ) {
          playSynthBeep('crash');
          stopGame();
          return;
        }
        if (obs.y > h + 30) st.obstacles.splice(i, 1);
      }

      // Render Player Festival Racer Vehicle
      ctx.fillStyle = '#E52B2B';
      ctx.beginPath();
      ctx.roundRect(st.car.x, st.car.y, st.car.width, st.car.height, [8, 8, 4, 4]);
      ctx.fill();

      // Windshield & Wheels
      ctx.fillStyle = '#22252A';
      ctx.fillRect(st.car.x - 3, st.car.y + 6, 4, 10);
      ctx.fillRect(st.car.x + st.car.width - 1, st.car.y + 6, 4, 10);
      ctx.fillRect(st.car.x - 3, st.car.y + st.car.height - 16, 4, 10);
      ctx.fillRect(st.car.x + st.car.width - 1, st.car.y + st.car.height - 16, 4, 10);

      // Cockpit Glass
      ctx.fillStyle = '#FFE07A';
      ctx.beginPath();
      ctx.ellipse(st.car.x + st.car.width / 2, st.car.y + 18, 7, 10, 0, 0, Math.PI * 2);
      ctx.fill();

      // Spoiler Wing
      ctx.fillStyle = '#FFC928';
      ctx.fillRect(st.car.x - 2, st.car.y + st.car.height - 5, st.car.width + 4, 5);

      st.animId = requestAnimationFrame(loop);
    };

    gameState.current.animId = requestAnimationFrame(loop);
  }, [onScoreGained, stopGame]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameState.current.isActive) return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        steerLeft();
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        steerRight();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const gs = gameState.current;
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(gs.animId);
    };
  }, [steerLeft, steerRight]);

  return (
    <div
      id="portalStreetRacingCard"
      className="relative rounded-3xl bg-[#181A20] border-4 border-[#36AD50] p-5 sm:p-7 shadow-2xl flex flex-col justify-between overflow-hidden text-white"
    >
      {/* Header: Title & Scoreboard */}
      <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-2xl" aria-hidden="true">🏎️</span>
          <div>
            <h3 className="font-head font-black text-base sm:text-lg text-white uppercase tracking-wide">
              KUTTIKKATTUR RACING
            </h3>
            <p className="text-[10px] font-mono text-emerald-400">Mavoor–Calicut Highway Sprint</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Gems Score</div>
          <div className="font-mono font-black text-emerald-400 text-lg">{score}</div>
        </div>
      </div>

      {/* Embedded Interactive Racing Canvas Track */}
      <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden border-2 border-slate-700 bg-[#0E1015] shadow-inner flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Start / Game Over Overlay */}
        {(!active || gameOver) && (
          <div className="absolute inset-0 bg-[#0E1015]/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center space-y-3 z-20">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#36AD50] to-emerald-700 text-white flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(54,173,80,0.5)]">
              {gameOver ? '💥' : '🚦'}
            </div>
            <div>
              <h4 className="font-head font-black text-lg text-white uppercase">
                {gameOver ? `CRASH! FINAL SCORE: ${score}` : 'KUTTIKKATTUR SPEEDWAY'}
              </h4>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Collect festival gems &amp; dodge barricades on the highway
              </p>
            </div>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#36AD50] to-emerald-600 hover:brightness-110 text-white font-head font-black text-xs shadow-md tactile-btn"
            >
              {gameOver ? 'PLAY AGAIN 🏁' : 'START ENGINES (PLAY) 🏁'}
            </button>
            <span className="text-[10px] font-mono text-slate-500">
              Controls: Left/Right Arrow Keys or Screen Buttons
            </span>
          </div>
        )}
      </div>

      {/* Touch Controls Row for Mobile */}
      <div className="flex items-center justify-between pt-3 mt-1">
        <div className="flex items-center space-x-2">
          <button
            onMouseDown={steerLeft}
            onTouchStart={steerLeft}
            aria-label="Steer left"
            className="px-4 py-2 rounded-xl bg-[#20232B] hover:bg-slate-700 active:bg-[#36AD50] text-white font-mono font-black text-xs border border-slate-700 tactile-btn"
          >
            ◀ STEER LEFT
          </button>
          <button
            onMouseDown={steerRight}
            onTouchStart={steerRight}
            aria-label="Steer right"
            className="px-4 py-2 rounded-xl bg-[#20232B] hover:bg-slate-700 active:bg-[#36AD50] text-white font-mono font-black text-xs border border-slate-700 tactile-btn"
          >
            STEER RIGHT ▶
          </button>
        </div>
        <button
          onClick={startGame}
          aria-label="Restart race"
          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold border border-slate-700 tactile-btn"
        >
          Restart 🔄
        </button>
      </div>
    </div>
  );
}
