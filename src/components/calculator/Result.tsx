'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useCalculatorWorkspace } from './CalculatorWorkspace';
import { CalculatorDetails } from './CalculatorDetails';
import { NextCalculation } from './NextCalculation';

export interface ResultRowProps {
  label: string;
  value: string;
  note?: string;
  emphasize?: boolean;
}
export function ResultRow({ label, value, note }: ResultRowProps) {
  return (
    <div
      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border-subtle py-3 last:border-0"
      aria-label={`${label}: ${value}${note ? `, ${note}` : ''}`}
    >
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-sm text-text-secondary">{label}</span>
        {note ? <span className="text-xs text-text-secondary">{note}</span> : null}
      </div>
      <span className="break-words text-base font-semibold tabular-nums text-text-primary">
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
  visibleRowCount?: number;
  nextStep?: React.ReactNode;
  empty?: boolean;
}
export function ResultCard({
  title,
  heroLabel,
  heroValue,
  heroNote,
  rows,
  children,
  visibleRowCount = 3,
  nextStep,
  empty = false,
}: ResultCardProps) {
  const workspace = useCalculatorWorkspace();
  const invalid = workspace && Object.keys(workspace.invalidFields).length > 0;
  const [copyStatus, setCopyStatus] = useState('결과 복사');
  const prominent = [
    ...rows.filter((row) => row.emphasize),
    ...rows.filter((row) => !row.emphasize),
  ].slice(0, Math.min(3, visibleRowCount));
  const detailed = rows.filter((row) => !prominent.includes(row));
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        [
          title,
          `${heroLabel}: ${heroValue}`,
          ...(heroNote ? [heroNote] : []),
          ...rows.map((row) => `${row.label}: ${row.value}${row.note ? ` (${row.note})` : ''}`),
        ].join('\n'),
      );
      setCopyStatus('복사했습니다');
    } catch {
      setCopyStatus('복사할 수 없습니다');
    }
  };
  return (
    <section
      aria-label="계산 결과"
      data-calculation-result
      tabIndex={-1}
      className={cn(
        'card flex min-w-0 flex-col gap-4 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 sm:gap-5',
      )}
    >
      <header aria-live="polite" aria-atomic="true">
        <h2 className="text-base font-semibold text-text-primary">{title}</h2>
        <p className="mt-2 text-sm text-text-secondary">{heroLabel}</p>
        <p
          className={cn(
            'mt-3 break-words font-bold tabular-nums leading-tight tracking-tight',
            invalid || empty
              ? 'text-lg text-text-secondary'
              : 'text-3xl text-primary-700 dark:text-primary-300 sm:text-4xl',
          )}
          aria-label={`${heroLabel}: ${invalid ? '입력을 확인해 주세요' : heroValue}`}
        >
          {invalid ? '입력을 확인해 주세요' : heroValue}
        </p>
        {heroNote && !invalid ? (
          <p className="mt-3 text-xs leading-relaxed text-text-secondary">{heroNote}</p>
        ) : null}
      </header>
      {!invalid && !empty ? (
        <>
          {prominent.length ? (
            <div>
              {prominent.map((row) => (
                <ResultRow key={row.label} {...row} />
              ))}
            </div>
          ) : null}
          {detailed.length ? (
            <CalculatorDetails title="결과 상세">
              <div>
                {detailed.map((row) => (
                  <ResultRow key={row.label} {...row} />
                ))}
              </div>
            </CalculatorDetails>
          ) : null}
          {children}
          <button
            type="button"
            onClick={copy}
            className="min-h-12 self-start rounded-lg border border-border-base px-4 py-3 text-sm font-medium text-text-secondary hover:border-primary-500"
            aria-live="polite"
          >
            {copyStatus}
          </button>
          {nextStep ?? (workspace ? <NextCalculation from={workspace.slug} /> : null)}
        </>
      ) : (
        <p className="text-sm text-text-secondary">
          {empty && !invalid
            ? '필요한 입력을 채우면 결과가 자동으로 표시됩니다.'
            : '비어 있거나 잘못된 값을 수정하면 결과가 다시 표시됩니다.'}
        </p>
      )}
    </section>
  );
}
