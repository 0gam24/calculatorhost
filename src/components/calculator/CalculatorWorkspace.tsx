'use client';

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { trackCalculationComplete } from '@/lib/analytics/calculator-events';

interface WorkspaceContext {
  slug: string;
  invalidFields: Record<string, string>;
  reportValidity: (id: string, error?: string) => void;
  forms: string[];
  registerForm: (id: string) => () => void;
  confirmResult: () => void;
}
const CalculatorContext = createContext<WorkspaceContext | null>(null);
export const useCalculatorWorkspace = () => useContext(CalculatorContext);

export function CalculatorWorkspace({
  children,
  className,
  slug,
}: {
  children: ReactNode;
  className?: string;
  slug: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [invalidFields, setInvalidFields] = useState<Record<string, string>>({});
  const [forms, setForms] = useState<string[]>([]);
  const reportValidity = useCallback((id: string, error?: string) => {
    setInvalidFields((previous) => {
      if (previous[id] === error || (!previous[id] && !error)) return previous;
      const next = { ...previous };
      if (error) next[id] = error;
      else delete next[id];
      return next;
    });
  }, []);
  const registerForm = useCallback((id: string) => {
    setForms((previous) => (previous.includes(id) ? previous : [...previous, id]));
    return () => setForms((previous) => previous.filter((item) => item !== id));
  }, []);
  const confirmResult = useCallback(() => {
    const revealField = (field: HTMLInputElement) => {
      let ancestor: HTMLElement | null = field.parentElement;
      while (ancestor && ancestor !== ref.current) {
        if (ancestor instanceof HTMLDetailsElement) ancestor.open = true;
        ancestor = ancestor.parentElement;
      }
      field.focus();
    };
    const invalid = ref.current?.querySelector<HTMLInputElement>(
      '[data-calculation-form] [aria-invalid="true"]',
    );
    if (invalid) {
      revealField(invalid);
      return;
    }
    const nativeInvalid = ref.current?.querySelector<HTMLInputElement>(
      '[data-calculation-form] input:invalid, [data-calculation-form] select:invalid',
    );
    if (nativeInvalid) {
      revealField(nativeInvalid);
      nativeInvalid.reportValidity();
      return;
    }
    trackCalculationComplete(slug);
    const result = ref.current?.querySelector<HTMLElement>('[data-calculation-result]');
    result?.focus({ preventScroll: true });
    result?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'nearest',
    });
  }, [slug]);
  return (
    <CalculatorContext.Provider
      value={{ slug, invalidFields, reportValidity, forms, registerForm, confirmResult }}
    >
      <div ref={ref} className={cn('calculator-workspace items-start', className)}>
        {children}
      </div>
    </CalculatorContext.Provider>
  );
}
