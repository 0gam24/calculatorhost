import { cn } from '@/lib/utils';

export interface ResultRowProps {
  label: string;
  value: string;
  note?: string;
  emphasize?: boolean;
}

export function ResultRow({ label, value, note, emphasize }: ResultRowProps) {
  return (
    <div
      className={cn(
        'flex items-baseline justify-between gap-4 border-b border-border-subtle py-3 last:border-0',
        emphasize && 'rounded-lg bg-primary-500/5 px-4 border-0',
      )}
      aria-label={`${label}: ${value}${note ? `, ${note}` : ''}`}
    >
      <div className="flex flex-col gap-0.5">
        <span
          className={cn(
            'text-sm',
            emphasize ? 'font-semibold text-text-primary' : 'text-text-secondary',
          )}
        >
          {label}
        </span>
        {note ? <span className="text-caption text-text-tertiary">{note}</span> : null}
      </div>
      <span
        className={cn(
          'tabular-nums',
          emphasize
            ? 'text-2xl font-bold text-primary-500'
            : 'text-base font-semibold text-text-primary',
        )}
      >
        {value}
      </span>
    </div>
  );
}

export interface ResultCardProps {
  title: string;
  heroLabel: string;
  heroValue: string;
  heroNote?: string;
  rows: ResultRowProps[];
  children?: React.ReactNode;
}

export function ResultCard({ title, heroLabel, heroValue, heroNote, rows, children }: ResultCardProps) {
  return (
    <section
      aria-label="계산 결과"
      aria-live="polite"
      aria-atomic="true"
      className="card flex flex-col gap-6"
    >
      <header>
        <h2 className="text-lg font-semibold text-text-secondary">{title}</h2>
        <p className="mt-1 text-sm text-text-tertiary">{heroLabel}</p>
        <p className="mt-4 hero-number" aria-label={`${heroLabel}: ${heroValue}`}>{heroValue}</p>
        {heroNote ? (
          <p className="mt-2 text-caption text-text-tertiary">{heroNote}</p>
        ) : null}
      </header>
      <div>
        {rows.map((row) => (
          <ResultRow key={row.label} {...row} />
        ))}
      </div>
      {children}
    </section>
  );
}
