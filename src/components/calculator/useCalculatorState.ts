'use client';

import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

/** Private per-tab input memory. Values never enter URLs or analytics events. */
export function useCalculatorState<T>(
  key: string,
  initial: T | (() => T),
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initial);
  const [restored, setRestored] = useState(false);
  const storageKey = `calculatorhost:input:v1:${key}`;
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved !== null) {
        const parsed: unknown = JSON.parse(saved);
        if (
          typeof parsed === typeof value &&
          (typeof parsed !== 'number' || Number.isFinite(parsed)) &&
          Array.isArray(parsed) === Array.isArray(value)
        ) {
          setValue(parsed as T);
        }
      }
    } catch {
      /* Storage may be unavailable. */
    }
    setRestored(true);
    // A field's storage key is fixed for its mounted lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);
  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      /* Continue without persistence. */
    }
  }, [storageKey, value, restored]);
  return [value, setValue];
}
