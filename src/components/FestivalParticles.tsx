import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../lib/hooks';
import { useTheme } from '../lib/theme';

type Particle = {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  type: 'diamond' | 'circle' | 'square' | 'star';
  color: string;
  opacity: number;
  rotation: number;
  vRotation: number;
};

const COLORS = ['#F15A24', '#E52B2B', '#FFC928', '#36AD50'];

export default function FestivalParticles({ density = 'sparse' }: { density?: 'sparse' | 'dense' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const { theme } = useTheme();
  const calm = theme === 'calm';

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    const particles: Particle[] = [];
    const numParticles = density === 'dense' ? (calm ? 15 : 40) : (calm ? 5 : 15);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const createParticle = (resetY = false): Particle => {
      const types: Particle['type'][] = ['diamond', 'circle', 'square', 'star'];
      return {
        x: Math.random() * canvas.width,
        y: resetY ? canvas.height + 20 : Math.random() * canvas.height,
        size: Math.random() * 6 + 2,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 0.8 - 0.2, // Move upwards
        type: types[Math.floor(Math.random() * types.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: Math.random() * 0.5 + 0.1,
        rotation: Math.random() * Math.PI * 2,
        vRotation: (Math.random() - 0.5) * 0.02,
      };
    };

    for (let i = 0; i < numParticles; i++) {
      particles.push(createParticle());
    }

    const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
    };

    let lastTime = 0;
    const render = (time: number) => {
      if (calm && time - lastTime < 30) {
        animationFrame = requestAnimationFrame(render);
        return;
      }
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.x += p.vx * (calm ? 0.3 : 1);
        p.y += p.vy * (calm ? 0.3 : 1);
        p.rotation += p.vRotation * (calm ? 0.3 : 1);

        if (p.y < -20 || p.x < -20 || p.x > canvas.width + 20) {
          Object.assign(p, createParticle(true));
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.type === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'square') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else if (p.type === 'diamond') {
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size, 0);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size, 0);
          ctx.fill();
        } else if (p.type === 'star') {
          drawStar(0, 0, 4, p.size, p.size / 2.5);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [density, reduced, calm]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60"
      aria-hidden="true"
    />
  );
}
