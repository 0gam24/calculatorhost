'use client';

import { useEffect, useId } from 'react';
import { cn } from '@/lib/utils';
import { useCalculatorWorkspace } from './CalculatorWorkspace';

export interface FormCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}
export function FormCard({ title, children, className }: FormCardProps) {
  const id = useId();
  const workspace = useCalculatorWorkspace();
  const register = workspace?.registerForm;
  useEffect(() => register?.(id), [id, register]);
  const hasAction = !workspace || workspace.forms.at(-1) === id;
  return (
    <section
      aria-label="계산 입력"
      data-calculation-form
      className={cn('card flex flex-col gap-4 sm:gap-5', className)}
    >
      <header>
        <h2 className="text-base font-semibold text-text-primary">{title}</h2>
      </header>
      {children}
      {hasAction ? (
        <button
          type="button"
          onClick={workspace?.confirmResult}
          className="min-h-12 w-full rounded-xl bg-primary-600 px-5 py-3 text-base font-semibold text-white hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          결과 확인
        </button>
      ) : null}
    </section>
  );
}
