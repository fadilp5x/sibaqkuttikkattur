import { useEffect, useMemo, useState, useCallback } from 'react';
import { api, type MediaItem } from '../lib/api';

function youtubeEmbed(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/);
  return m ? `https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0` : null;
}

export default function MediaGallery() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  useEffect(() => {
    api.media().then((data) => {
      // Include the official video highlight if not already present in the list
      const hasVideo = data.some((d) => d.type === 'video');
      if (!hasVideo) {
        const enriched: MediaItem[] = [
          ...data,
          {
            id: 999,
            type: 'video',
            title: "SIBAQ '26 Official Fest Teaser & Stage Reveal",
            src: 'https://www.youtube.com/watch?v=gBnLyPDYVpc',
            poster: '/media/stage-01.jpg',
          },
        ];
        setItems(enriched);
      } else {
        setItems(data);
      }
    }).catch(() => setItems([]));
  }, []);

  const shown = useMemo(
    () => (filter === 'all' ? items : items.filter((i) => i.type === filter)),
    [items, filter]
  );

  const viewerItem = viewerIndex !== null && shown[viewerIndex] ? shown[viewerIndex] : null;

  const handlePrev = useCallback(() => {
    if (viewerIndex === null) return;
    setViewerIndex((viewerIndex - 1 + shown.length) % shown.length);
  }, [viewerIndex, shown.length]);

  const handleNext = useCallback(() => {
    if (viewerIndex === null) return;
    setViewerIndex((viewerIndex + 1) % shown.length);
  }, [viewerIndex, shown.length]);

  const handleClose = useCallback(() => {
    setViewerIndex(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (viewerIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [viewerIndex, handleClose, handlePrev, handleNext]);

  return (
    <div>
      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2.5">
        {(['all', 'image', 'video'] as const).map((f) => {
          const isActive = filter === f;
          return (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setViewerIndex(null);
              }}
              aria-pressed={isActive}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-head text-xs font-extrabold uppercase tracking-[0.16em] transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-flame to-ember text-white shadow-md shadow-flame/20 scale-105'
                  : 'border border-black/15 bg-white text-ink/70 hover:border-marigold hover:text-marigold'
              }`}
            >
              {f === 'all' && <span className="diamond h-1.5 w-1.5 bg-current" />}
              {f === 'image' ? 'Photographs' : f === 'video' ? 'Videos' : 'All Archive'}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item, idx) => {
          const isLarge = idx === 0 && shown.length > 2;
          return (
            <div
              key={item.id}
              onClick={() => setViewerIndex(idx)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setViewerIndex(idx);
                }
              }}
              role="button"
              tabIndex={0}
              className={`group relative overflow-hidden rounded-3xl border border-black/10 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-marigold cursor-pointer ${
                isLarge ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
              aria-label={`View ${item.title}`}
            >
              {/* Media Visual Container */}
              <div className={`relative overflow-hidden bg-night/5 ${isLarge ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="relative h-full w-full">
                    <img
                      src={item.poster || '/media/stage-01.jpg'}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-night/35 backdrop-blur-[1px] transition-colors group-hover:bg-night/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-flame text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
                        <svg width="18" height="20" viewBox="0 0 22 24" fill="none" aria-hidden="true" className="ml-1">
                          <path d="M21 12L0.5 23.25V0.75L21 12Z" fill="currentColor" />
                        </svg>
                      </span>
                    </div>
                  </div>
                )}

                {/* Top Badge */}
                <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-white/20 bg-night/60 px-3 py-1 backdrop-blur-md">
                  <span
                    className={`h-2 w-2 rounded-full ${item.type === 'video' ? 'bg-flame animate-pulse' : 'bg-marigold'}`}
                  />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-white">
                    {item.type === 'video' ? 'Video' : 'Photo'}
                  </span>
                </div>

                {/* Bottom Gradient Overlay & Title */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 via-night/50 to-transparent p-5 pt-12 text-white">
                  <h3 className="font-head text-base font-extrabold leading-snug drop-shadow-sm sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-1 flex items-center gap-2 text-[11px] font-semibold text-white/70">
                    <span>Click to open lightbox</span>
                    <span className="text-marigold font-bold">→</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {shown.length === 0 && (
          <div className="col-span-full rounded-3xl border border-dashed border-black/15 bg-white p-12 text-center">
            <span className="diamond mx-auto mb-3 block h-4 w-4 bg-flame/30" />
            <p className="font-head text-base font-bold text-ink">No media items in this category yet</p>
            <p className="mt-1 text-xs text-ink/50">Switch filters above to view photographs or fest films.</p>
          </div>
        )}
      </div>

      {/* Interactive Lightbox Viewer */}
      {viewerItem && viewerIndex !== null && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-night/95 p-4 sm:p-8 backdrop-blur-md transition-opacity duration-300"
          role="dialog"
          aria-modal="true"
          aria-label={viewerItem.title}
          onClick={handleClose}
        >
          {/* Controls Bar */}
          <div className="fixed top-5 inset-x-0 mx-auto flex max-w-5xl items-center justify-between px-6 z-20 pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-md">
              <span className="diamond h-2 w-2 bg-marigold" />
              <span className="font-mono text-xs font-bold text-white">
                {viewerIndex + 1} / {shown.length}
              </span>
            </div>

            <button
              onClick={handleClose}
              aria-label="Close viewer (Escape)"
              className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-flame hover:border-flame"
            >
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Navigation Arrows */}
          {shown.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous media item (Left Arrow)"
                className="fixed left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-marigold hover:text-night hover:border-marigold"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next media item (Right Arrow)"
                className="fixed right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-marigold hover:text-night hover:border-marigold"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          {/* Media Content Stage */}
          <div
            className="relative flex flex-col items-center justify-center max-h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {viewerItem.type === 'image' ? (
              <img
                src={viewerItem.src}
                alt={viewerItem.title}
                className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl ring-1 ring-white/10"
              />
            ) : youtubeEmbed(viewerItem.src) ? (
              <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                <iframe
                  src={youtubeEmbed(viewerItem.src)!}
                  title={viewerItem.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : viewerItem.src.endsWith('.mp4') || viewerItem.src.endsWith('.webm') ? (
              <video
                src={viewerItem.src}
                controls
                autoPlay
                className="max-h-[75vh] w-full rounded-2xl shadow-2xl"
              />
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-sm text-white/70">
                <p>This video source is being processed.</p>
              </div>
            )}

            <div className="mt-4 text-center">
              <h4 className="font-head text-base sm:text-lg font-bold text-white drop-shadow">
                {viewerItem.title}
              </h4>
              <p className="mt-1 text-xs text-white/50">
                Use Arrow keys or swipe to navigate · Escape to close
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
