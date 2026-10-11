import { useEffect } from 'react';

interface Props {
  show: boolean;
  onDone?: () => void;
}

export default function CelebrationPopperOverlay({ show, onDone }: Props) {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      onDone?.();
    }, 2200);
    return () => clearTimeout(timer);
  }, [show, onDone]);

  if (!show) return null;

  return (
    <div className="fixed bottom-10 left-8 z-50 pointer-events-none" aria-hidden="true">
      <svg className="w-48 h-48 anim-popper-recoil overflow-visible" viewBox="0 0 200 200" fill="none">
        {/* Ballistic Confetti Particles */}
        <g>
          <polygon points="90,70 102,64 96,80 84,74" fill="#FFC928" className="anim-pop-p1" />
          <rect x="94" y="66" width="10" height="10" rx="2" fill="#E52B2B" className="anim-pop-p2" />
          <circle cx="95" cy="72" r="5" fill="#36AD50" className="anim-pop-p3" />
          <polygon points="90,65 106,70 94,85" fill="#F15A24" className="anim-pop-p4" />
          <polygon points="94,68 100,54 108,68 94,68" fill="#FFC928" className="anim-pop-p1" />
        </g>
        {/* Smoke Ring */}
        <ellipse cx="88" cy="80" rx="22" ry="10" transform="rotate(-38 88 80)" fill="#FFE07A" opacity={0.8} />
        {/* Striped Cannon Cone */}
        <g transform="translate(20, 60) rotate(-38 50 50)">
          <polygon points="10,25 70,0 70,60" fill="#E52B2B" stroke="#111215" strokeWidth={3} />
          <polygon points="10,25 50,8 50,52" fill="#F15A24" />
          <polygon points="10,25 35,14 35,46" fill="#FFC928" stroke="#111215" strokeWidth={2} />
          <ellipse cx="70" cy="30" rx="8" ry="30" fill="#FFC928" stroke="#111215" strokeWidth={3} />
        </g>
      </svg>
    </div>
  );
}
