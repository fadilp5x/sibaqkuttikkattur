import { useEffect, useState } from 'react';
import { api, type Voucher } from '../lib/api';
import { playSynthBeep } from '../lib/synthAudio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export default function VouchersModal({ isOpen, onClose, onToast }: Props) {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    api.vouchers()
      .then((data) => {
        setVouchers(data);
        setLoading(false);
      })
      .catch(() => {
        setVouchers([]);
        setLoading(false);
      });
  }, [isOpen]);

  const handleCopyCode = async (code: string, title: string) => {
    try {
      await navigator.clipboard.writeText(code);
      playSynthBeep('correct');
      onToast(`🎟️ Voucher code "${code}" copied for ${title}!`);
    } catch {
      onToast(`🎟️ Voucher: ${title}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#121316]/95 backdrop-blur-xl p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="voucher-modal-title"
    >
      <div className="relative w-full max-w-xl rounded-3xl bg-[#1A1C23] border-2 border-amber-500/50 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-700 pb-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl" aria-hidden="true">🎟️</span>
            <div>
              <h3 id="voucher-modal-title" className="font-head font-black text-lg text-white">
                SIBAQ FESTIVAL VOUCHERS
              </h3>
              <p className="text-xs text-slate-400 font-mono">Official festival perks and partner rewards</p>
            </div>
          </div>
          <button
            onClick={() => {
              playSynthBeep('tick');
              onClose();
            }}
            aria-label="Close vouchers"
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-bold tactile-btn"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-12 text-center text-sm text-slate-400 font-mono">
            Loading active festival vouchers...
          </div>
        ) : vouchers.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="text-4xl">🎫</div>
            <p className="text-sm font-bold text-white">No active vouchers right now.</p>
            <p className="text-xs text-slate-400 font-mono max-w-xs mx-auto">
              Check back daily during festival week for dining perks, Edumart book vouchers, and gala access passes!
            </p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {vouchers.map((v, idx) => {
              const borderColors = ['border-[#F15A24]', 'border-[#36AD50]', 'border-[#FFC928]', 'border-[#E52B2B]'];
              const bdr = borderColors[idx % borderColors.length];

              return (
                <div
                  key={v.id}
                  className={`relative p-4 rounded-2xl bg-[#20232B] border-2 ${bdr} overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                      {v.brand || 'SIBAQ Partner'}
                    </span>
                    <h4 className="font-head font-black text-white text-sm">{v.title}</h4>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">{v.description}</p>
                    {v.instructions && (
                      <p className="text-[11px] font-mono text-amber-400">{v.instructions}</p>
                    )}
                    {v.expiry && (
                      <p className="text-[10px] text-slate-500 font-mono">Valid until: {v.expiry}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleCopyCode(v.title, v.brand || 'SIBAQ Perk')}
                    className="self-start sm:self-center shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-[#E52B2B] to-[#F15A24] text-white font-head font-bold text-xs tactile-btn shadow"
                  >
                    Claim Code
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
