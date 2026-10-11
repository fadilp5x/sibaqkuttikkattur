import { useEffect, useState } from 'react';
import { adminFetch } from './api';
import { BoolField, ImageField, LinesField, TextArea, TextField } from './fields';

export interface FieldSpec {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'bool' | 'image' | 'lines';
}

type Row = Record<string, unknown>;

/**
 * Generic CRUD editor for a content collection. Handles list, create, edit,
 * delete (with confirmation) and publish toggles.
 */
export default function CollectionEditor(props: {
  name: string;
  title: string;
  fields: FieldSpec[];
  defaults: Row;
  titleKey: string;
  subtitleKey?: string;
  imageKey?: string;
  hint?: string;
}) {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [editing, setEditing] = useState<Row | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);

  const load = () =>
    adminFetch<Row[]>(`/api/admin/collections/${props.name}`)
      .then(setRows)
      .catch((e) => setError(e.message));

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.name]);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const id = editing.id;
      const body = JSON.stringify(editing);
      if (isNew) await adminFetch(`/api/admin/collections/${props.name}`, { method: 'POST', body });
      else await adminFetch(`/api/admin/collections/${props.name}/${id}`, { method: 'PUT', body });
      setEditing(null);
      setSuccess('Successfully saved!');
      setTimeout(() => setSuccess(''), 3000);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (row: Row) => {
    if (!window.confirm(`Delete “${String(row[props.titleKey])}”? This cannot be undone.`)) return;
    try {
      await adminFetch(`/api/admin/collections/${props.name}/${row.id}`, { method: 'DELETE' });
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed');
    }
  };

  const set = (k: string, v: unknown) => setEditing((e) => (e ? { ...e, [k]: v } : e));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-head text-lg font-extrabold text-ink">{props.title}</h2>
          {props.hint && <p className="mt-1 max-w-lg text-xs leading-relaxed text-ink/45">{props.hint}</p>}
        </div>
        <button
          onClick={() => {
            setEditing({ ...props.defaults });
            setIsNew(true);
          }}
          className="btn-primary !px-5 !py-2.5 !text-xs"
        >
          + Add new
        </button>
      </div>

      {error && <p className="mt-4 rounded-xl border border-flame/40 bg-flame/10 px-4 py-3 text-sm text-flame">{error}</p>}
      {success && <p className="mt-4 rounded-xl border border-leaf/40 bg-leaf/10 px-4 py-3 text-sm text-leaf">{success}</p>}

      <div className="mt-5 space-y-2.5">
        {rows === null && <p className="py-8 text-center text-sm text-ink/40">Loading…</p>}
        {rows?.length === 0 && <p className="py-8 text-center text-sm text-ink/40">Nothing here yet — add the first entry.</p>}
        {rows?.map((row) => (
          <div key={String(row.id)} className="card-dark flex items-center gap-3.5 p-3.5">
            {props.imageKey && typeof row[props.imageKey] === 'string' && row[props.imageKey] ? (
              <img src={String(row[props.imageKey])} alt="" className="h-12 w-12 shrink-0 rounded-xl object-cover" />
            ) : (
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/5">
                <span className="diamond h-2 w-2 bg-marigold/60" />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-head text-sm font-bold text-ink">{String(row[props.titleKey] ?? '—')}</p>
              {props.subtitleKey && <p className="truncate text-xs text-ink/45">{String(row[props.subtitleKey] ?? '')}</p>}
              {row.is_test === true && (
                <span className="mt-1 inline-block rounded bg-black/10 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-ink/50">
                  Test content
                </span>
              )}
            </div>
            {'published' in row && (
              <button
                onClick={() => {
                  const next = { ...row, published: !row.published };
                  adminFetch(`/api/admin/collections/${props.name}/${row.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(next),
                  }).then(load);
                }}
                className={`rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider ${
                  row.published ? 'bg-leaf/15 text-leaf' : 'bg-black/10 text-ink/50'
                }`}
              >
                {row.published ? 'Live' : 'Hidden'}
              </button>
            )}
            <button
              onClick={() => {
                setEditing({ ...row });
                setIsNew(false);
              }}
              className="rounded-full border border-black/15 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-ink/70 hover:border-marigold hover:text-marigold"
            >
              Edit
            </button>
            <button
              onClick={() => remove(row)}
              aria-label="Delete"
              className="rounded-full border border-black/15 px-3 py-1.5 text-[10px] font-extrabold text-ink/50 hover:border-flame hover:text-flame"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center bg-paper/80 p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={() => setEditing(null)}>
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-black/10 bg-gray-50 p-6 sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h3 className="font-head text-base font-extrabold text-ink">{isNew ? 'Add entry' : 'Edit entry'}</h3>
            <div className="mt-4 space-y-3.5">
              {props.fields.map((f) => {
                const v = editing[f.key];
                if (f.type === 'bool') return <BoolField key={f.key} label={f.label} value={!!v} onChange={(x) => set(f.key, x)} />;
                if (f.type === 'textarea')
                  return <TextArea key={f.key} label={f.label} value={String(v ?? '')} onChange={(x) => set(f.key, x)} />;
                if (f.type === 'lines')
                  return <LinesField key={f.key} label={f.label} value={String(v ?? '[]')} onChange={(x) => set(f.key, x)} />;
                if (f.type === 'image')
                  return <ImageField key={f.key} label={f.label} value={String(v ?? '')} onChange={(x) => set(f.key, x)} />;
                return (
                  <TextField
                    key={f.key}
                    label={f.label}
                    type={f.type === 'number' ? 'number' : 'text'}
                    value={String(v ?? '')}
                    onChange={(x) => set(f.key, x)}
                  />
                );
              })}
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={save} disabled={saving} className="btn-primary flex-1 !py-3 !text-xs disabled:opacity-60">
                {saving ? 'Saving…' : 'Save'}
              </button>
              <button onClick={() => setEditing(null)} className="btn-ghost flex-1 !py-3 !text-xs">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
