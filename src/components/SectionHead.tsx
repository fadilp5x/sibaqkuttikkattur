import { useReveal } from '../lib/hooks';

export function Diamonds({ count = 3, className = '' }: { count?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`diamond ${i === 1 ? 'h-2.5 w-2.5 bg-marigold' : 'h-1.5 w-1.5 bg-flame'}`}
        />
      ))}
    </span>
  );
}

interface Props {
  kicker: string;
  title: React.ReactNode;
  note?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHead({ kicker, title, note, align = 'left', light = false }: Props) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`${align === 'center' ? 'text-center' : ''} ${shown ? 'animate-fade-up' : 'opacity-0'}`}
    >
      <p className={`kicker flex items-center gap-2 ${align === 'center' ? 'justify-center' : ''}`}>
        <Diamonds className="scale-90" />
        {kicker}
      </p>
      <h2
        className={`display mt-3 text-4xl sm:text-5xl ${light ? 'text-ink' : 'text-ink'}`}
      >
        {title}
      </h2>
      {note && <p className={`mt-3 max-w-xl text-sm leading-relaxed sm:text-base ${align === 'center' ? 'mx-auto' : ''} ${light ? 'text-ink/70' : 'text-ink/60'}`}>{note}</p>}
    </div>
  );
}
