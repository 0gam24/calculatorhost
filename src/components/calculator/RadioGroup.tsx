'use client';

import { cn } from '@/lib/utils';

export interface RadioOption<T extends string> {
  value: T;
  label: string;
}

export interface RadioGroupProps<T extends string> {
  id: string;
  label: string;
  value: T;
  options: RadioOption<T>[];
  onChange: (value: T) => void;
  className?: string;
}

export function RadioGroup<T extends string>({
  id,
  label,
  value,
  options,
  onChange,
  className,
}: RadioGroupProps<T>) {
  return (
    <fieldset className={cn('flex flex-col gap-2', className)}>
      <legend id={`${id}-label`} className="text-sm font-medium text-text-primary">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2 sm:gap-3" role="radiogroup" aria-labelledby={`${id}-label`}>
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt.value)}
              className={cn(
                'rounded-chip border min-h-11 px-4 py-3 sm:py-2 text-sm font-medium transition-all duration-100 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                active
                  // WCAG AA: text-primary-700 (#3D43D0) on bg-primary-500/10 (#dee0fb) ≈ 6.2:1 (pass)
                  // 이전 text-primary-500 (#595FF7) ≈ 3.7:1 (fail)
                  ? 'border-primary-500 bg-primary-500/10 text-primary-700 dark:text-primary-300'
                  : 'border-border-base text-text-secondary hover:border-primary-500',
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
