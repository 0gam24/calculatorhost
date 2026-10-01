'use client';

import { cn } from '@/lib/utils';

interface AmountPresetsProps {
  label: string;
  value: number;
  options: ReadonlyArray<{ label: string; value: number }>;
  onSelect: (value: number) => void;
}

/** Replace the canonical won amount; these choices do not add to the current input. */
export function AmountPresets({ label, value, options, onSelect }: AmountPresetsProps) {
  return (
    <fieldset data-amount-presets className="min-w-0">
      <legend className="mb-2 text-xs text-text-secondary">{label} · 선택한 금액으로 변경</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            data-preset-value={option.value}
            aria-pressed={value === option.value}
            onClick={() => onSelect(option.value)}
            className={cn(
              'min-h-12 min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm font-medium tabular-nums focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              value === option.value
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-200'
                : 'border-border-base bg-bg-card text-text-secondary hover:border-primary-500',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
