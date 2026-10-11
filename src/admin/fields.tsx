import { useRef, useState } from 'react';
import { uploadFile } from './api';

const inputCls =
  'w-full rounded-xl border border-black/15 bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/25 outline-none focus:border-marigold';
const labelCls = 'mb-1 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-marigold';

export function TextField(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className={labelCls}>{props.label}</label>
      <input
        type={props.type ?? 'text'}
        className={inputCls}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}

export function TextArea(props: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className={labelCls}>{props.label}</label>
      <textarea
        rows={props.rows ?? 3}
        className={`${inputCls} resize-y`}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}

/** Newline-separated text ↔ JSON string array (quiz options, benefits, features…). */
export function LinesField(props: { label: string; value: string; onChange: (v: string) => void }) {
  let lines: string[] = [];
  try {
    const parsed = JSON.parse(props.value || '[]');
    if (Array.isArray(parsed)) lines = parsed.map(String);
  } catch {
    lines = props.value ? props.value.split('\n') : [];
  }
  return (
    <div>
      <label className={labelCls}>{props.label} (one per line)</label>
      <textarea
        rows={4}
        className={`${inputCls} resize-y`}
        value={lines.join('\n')}
        onChange={(e) => props.onChange(JSON.stringify(e.target.value.split('\n').filter((l) => l.trim() !== '')))}
      />
    </div>
  );
}

export function BoolField(props: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1">
      <input
        type="checkbox"
        checked={props.value}
        onChange={(e) => props.onChange(e.target.checked)}
        className="h-4 w-4 accent-flame"
      />
      <span className="text-xs font-bold text-ink/80">{props.label}</span>
    </label>
  );
}

export function ImageField(props: { label: string; value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const pick = async (file: File) => {
    setBusy(true);
    setError('');
    try {
      props.onChange(await uploadFile(file));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <label className={labelCls}>{props.label}</label>
      <div className="flex items-center gap-3">
        {props.value && <img src={props.value} alt="" className="h-12 w-12 rounded-lg border border-black/10 object-cover" />}
        <input
          className={inputCls}
          value={props.value}
          placeholder="/media/… or upload"
          onChange={(e) => props.onChange(e.target.value)}
        />
        <input
          ref={ref}
          type="file"
          accept="image/*,video/mp4,video/webm"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && pick(e.target.files[0])}
        />
        <button
          type="button"
          onClick={() => ref.current?.click()}
          disabled={busy}
          className="shrink-0 rounded-xl border border-marigold/50 px-3.5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-marigold disabled:opacity-50"
        >
          {busy ? '…' : 'Upload'}
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-flame">{error}</p>}
    </div>
  );
}
