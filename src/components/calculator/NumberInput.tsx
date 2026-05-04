'use client';

import { useCallback, useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

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
  /** 단위 버튼 (예: 억/천만/백만) */
  unitButtons?: Array<{ label: string; value: number }>;
  className?: string;
  /** onChange 호출을 지연(ms). 0 이면 즉시 호출. IME composition 중에는 자동 무시. */
  debounceMs?: number;
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
}: NumberInputProps) {
  const [isComposing, setIsComposing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 부모의 value 변경 시 localValue 동기화
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // debounce 타이머 정리 (언마운트)
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isComposing) return;
      const raw = e.target.value.replace(/[^\d]/g, '');
      const num = raw === '' ? 0 : Number(raw);
      if (max != null && num > max) return;

      // 즉시 로컬 상태 업데이트 (UI 반응성)
      setLocalValue(num);

      // 기존 타이머 정리
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // debounceMs가 0 이면 즉시 호출, 그 외는 지연
      if (debounceMs === 0) {
        onChange(num);
      } else {
        debounceTimerRef.current = setTimeout(() => {
          onChange(num);
        }, debounceMs);
      }
    },
    [onChange, max, isComposing, debounceMs],
  );

  const handleCompositionStart = useCallback(() => {
    setIsComposing(true);
  }, []);

  const handleCompositionEnd = useCallback(
    (e: React.CompositionEvent<HTMLInputElement>) => {
      setIsComposing(false);
      const raw = e.currentTarget.value.replace(/[^\d]/g, '');
      const num = raw === '' ? 0 : Number(raw);
      if (max != null && num > max) return;

      // 로컬 상태 업데이트
      setLocalValue(num);

      // 기존 타이머 정리
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // IME 종료 시에는 debounce 무시하고 즉시 호출
      onChange(num);
    },
    [onChange, max],
  );

  const handleBlur = useCallback(() => {
    // 포매팅을 blur 시점에만 적용하여 입력 중 커서 이동 방지
    if (inputRef.current && value !== 0) {
      inputRef.current.value = value.toLocaleString('ko-KR');
    }
  }, [value]);

  const addUnit = (delta: number) => {
    const next = value + delta;
    if (max != null && next > max) return;
    if (next < min) return;
    onChange(next);
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-sm font-medium text-text-primary">
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          type="text"
          inputMode="numeric"
          pattern="[0-9,]*"
          value={localValue === 0 ? '' : localValue.toLocaleString('ko-KR')}
          onChange={handleChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border-base bg-bg-card pl-4 pr-12 py-3 text-right text-lg font-semibold tabular-nums text-text-primary placeholder:text-text-tertiary focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          aria-describedby={helpText ? `${id}-help` : undefined}
        />
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-text-secondary">
          {unit}
        </span>
      </div>
      {unitButtons && unitButtons.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {unitButtons.map((btn) => (
            <button
              key={btn.label}
              type="button"
              onClick={() => addUnit(btn.value)}
              aria-pressed={false}
              className="rounded-chip border border-border-base px-3 py-1 text-caption font-medium hover:border-primary-500 hover:text-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 active:scale-[0.97] active:bg-primary-600/10 transition-all duration-100"
            >
              +{btn.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => onChange(0)}
            aria-label="입력값 초기화"
            className="rounded-chip border border-border-base px-3 py-1 text-caption font-medium text-text-tertiary hover:border-danger-500 hover:text-danger-500 focus-visible:ring-2 focus-visible:ring-danger-500 focus-visible:ring-offset-2 active:scale-[0.97] active:bg-danger-500/10 transition-all duration-100"
          >
            초기화
          </button>
        </div>
      ) : null}
      {helpText ? (
        <p id={`${id}-help`} className="text-caption text-text-tertiary">
          {helpText}
        </p>
      ) : null}
    </div>
  );
}
