'use client';

import { useCallback, useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useCalculatorWorkspace } from './CalculatorWorkspace';

export interface NumberInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  helpText?: string;
  unit?: string;
  min?: number;
  max?: number;
  unitButtons?: Array<{ label: string; value: number }>;
  className?: string;
  debounceMs?: number;
  integer?: boolean;
  /** Explicit canonical-value replacement, including repeated selections after invalid drafts. */
  resetToken?: number;
}
export function NumberInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  helpText,
  unit = '원',
  min = 0,
  max,
  unitButtons,
  className,
  debounceMs = 0,
  integer = false,
  resetToken,
}: NumberInputProps) {
  const [draft, setDraft] = useState(String(value));
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState<string>();
  const [moneyUnit, setMoneyUnit] = useState<'원' | '만원'>('원');
  const factor = moneyUnit === '만원' && unit === '원' ? 10_000 : 1;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const composing = useRef(false);
  const latest = useRef(value);
  const previousResetToken = useRef(resetToken);
  const workspace = useCalculatorWorkspace();
  const reportValidity = workspace?.reportValidity;

  useEffect(() => {
    if (value !== latest.current) {
      setDraft(String(value / factor));
      setError(undefined);
    }
    latest.current = value;
  }, [value, factor]);
  useEffect(() => {
    if (previousResetToken.current === resetToken) return;
    previousResetToken.current = resetToken;
    if (timer.current) clearTimeout(timer.current);
    latest.current = value;
    setDraft(String(value / factor));
    setError(
      !Number.isFinite(value) ||
        value < min ||
        (max !== undefined && value > max) ||
        (integer && !Number.isInteger(value))
        ? '입력 조건과 범위를 확인해 주세요.'
        : undefined,
    );
  }, [resetToken, value, factor, min, max, integer]);
  useEffect(() => {
    reportValidity?.(id, error);
    return () => reportValidity?.(id);
  }, [id, error, reportValidity]);
  useEffect(() => {
    if (
      !Number.isFinite(value) ||
      value < min ||
      (max !== undefined && value > max) ||
      (integer && !Number.isInteger(value))
    ) {
      setError('입력 조건과 범위를 확인해 주세요.');
    }
  }, [value, min, max, integer]);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const publish = useCallback(
    (number: number, immediate = false) => {
      if (timer.current) clearTimeout(timer.current);
      if (!debounceMs || immediate) onChange(number);
      else timer.current = setTimeout(() => onChange(number), debounceMs);
    },
    [debounceMs, onChange],
  );
  const updateDraft = (raw: string, immediate = false) => {
    const normalized = raw.replaceAll(',', '').trim();
    setDraft(normalized);
    if (timer.current) clearTimeout(timer.current);
    if (normalized === '') {
      setError('값을 입력해 주세요. 0은 숫자 0으로 입력할 수 있습니다.');
      return;
    }
    if (!/^-?(?:\d+\.?\d*|\.\d+)$/.test(normalized)) {
      setError('숫자를 확인해 주세요.');
      return;
    }
    const number =
      factor === 1 ? Number(normalized) : Number((Number(normalized) * factor).toPrecision(15));
    if (!Number.isFinite(number)) {
      setError('입력 가능한 숫자를 확인해 주세요.');
      return;
    }
    if (integer && !Number.isInteger(number)) {
      setError('정수로 입력해 주세요.');
      return;
    }
    if (number < min || (max !== undefined && number > max)) {
      setError(
        `${min.toLocaleString('ko-KR')} ${unit} 이상${max === undefined ? '' : ` ${max.toLocaleString('ko-KR')} ${unit} 이하`}로 입력해 주세요.`,
      );
      return;
    }
    setError(undefined);
    latest.current = number;
    publish(number, immediate);
  };
  const setNumber = (number: number) => {
    if (timer.current) clearTimeout(timer.current);
    setDraft(String(number / factor));
    setError(undefined);
    latest.current = number;
    onChange(number);
  };
  const display =
    focused || error ? draft : Number(draft).toLocaleString('ko-KR', { maximumFractionDigits: 10 });
  const describedBy =
    [helpText ? `${id}-help` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') ||
    undefined;
  return (
    <div className={cn('flex min-w-0 flex-col gap-2', className)}>
      <div className="flex min-h-6 items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium text-text-primary">
          {label}
        </label>
        {unitButtons?.length ? (
          <details className="text-sm text-text-secondary">
            <summary className="flex min-h-12 cursor-pointer items-center">빠른 입력</summary>
            <div className="flex flex-wrap gap-2 py-2">
              {unitButtons.map((button) => (
                <button
                  key={button.label}
                  type="button"
                  onClick={() => {
                    const canonical = error ? value : latest.current;
                    const next = canonical + button.value;
                    if (next >= min && (max === undefined || next <= max)) setNumber(next);
                  }}
                  className="min-h-12 rounded-lg border border-border-base px-3 py-2 text-sm font-medium hover:border-primary-500"
                >
                  +{button.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setNumber(Math.max(0, min))}
                aria-label={`${label} 초기화`}
                className="min-h-12 rounded-lg border border-border-base px-3 py-2 text-sm"
              >
                초기화
              </button>
            </div>
          </details>
        ) : null}
      </div>
      <div className="relative">
        {unit === '원' && unitButtons?.length ? (
          <select
            aria-label={`${label} 표시 단위`}
            value={moneyUnit}
            onChange={(event) => {
              const nextUnit = event.target.value as '원' | '만원';
              const canonical = error ? value : latest.current;
              publish(canonical, true);
              latest.current = canonical;
              setMoneyUnit(nextUnit);
              setDraft(String(canonical / (nextUnit === '만원' ? 10_000 : 1)));
              setError(undefined);
            }}
            className="absolute inset-y-0 right-0 z-10 min-h-12 rounded-r-xl border-l border-border-base bg-bg-card px-2 text-base text-text-secondary"
          >
            <option value="원">원</option>
            <option value="만원">만원</option>
          </select>
        ) : null}
        <input
          id={id}
          type="text"
          inputMode={integer ? 'numeric' : 'decimal'}
          value={display}
          onFocus={() => setFocused(true)}
          onChange={(event) => {
            if (composing.current) setDraft(event.target.value);
            else updateDraft(event.target.value);
          }}
          onCompositionStart={() => {
            composing.current = true;
          }}
          onCompositionEnd={(event) => {
            composing.current = false;
            updateDraft(event.currentTarget.value, true);
          }}
          onBlur={() => {
            setFocused(false);
            if (!error && draft !== '') publish(latest.current, true);
          }}
          placeholder={placeholder}
          autoComplete="off"
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(
            'min-h-12 w-full rounded-xl border bg-bg-card py-3 pl-4 text-right text-base font-semibold tabular-nums text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30',
            unit === '원' && unitButtons?.length ? 'pr-24' : 'pr-16',
            error ? 'border-danger-500' : 'border-border-base focus:border-primary-500',
          )}
        />
        {unit === '원' && unitButtons?.length ? null : (
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-text-secondary">
            {unit}
          </span>
        )}
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-danger-500">
          {error}
        </p>
      ) : null}
      {helpText ? (
        <p id={`${id}-help`} className="text-xs leading-relaxed text-text-secondary">
          {helpText}
        </p>
      ) : null}
    </div>
  );
}
