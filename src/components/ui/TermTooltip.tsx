'use client';

import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/Icon';

interface TermTooltipProps {
  term: string;
  definition: string;
  href?: string;
}

export function TermTooltip({ term, definition, href }: TermTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipId = `tooltip-${term.toLowerCase().replace(/\s+/g, '-')}`;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  // Escape 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  // Blur 시 닫기 (포커스가 tooltip 밖으로 나가면)
  const handleBlur = (e: React.FocusEvent) => {
    if (
      !buttonRef.current?.contains(e.relatedTarget as Node) &&
      !tooltipRef.current?.contains(e.relatedTarget as Node)
    ) {
      setIsOpen(false);
    }
  };

  // 인라인(phrasing) 요소만 사용 — 본문 <p> 안에 중첩돼도 유효한 HTML 이 되도록
  // (div/p 를 <p> 안에 넣으면 브라우저가 <p> 를 자동 종료 → 하이드레이션 불일치 발생)
  return (
    <span className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-describedby={tooltipId}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={handleBlur}
        className="underline decoration-dotted underline-offset-4 font-medium text-text-primary hover:text-primary-500 transition-colors"
      >
        {term}
      </button>

      {isOpen && (
        <span
          ref={tooltipRef}
          id={tooltipId}
          role="tooltip"
          onBlur={handleBlur}
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 block max-w-xs z-50 bg-bg-card border border-border-base rounded-lg shadow-lg p-3 text-sm text-text-secondary whitespace-normal"
        >
          <span className="mb-2 block">{definition}</span>
          {href && (
            <a
              href={href}
              className="text-primary-500 hover:text-primary-600 font-medium inline-flex items-center gap-1"
              onClick={() => setIsOpen(false)}
            >
              용어사전에서 자세히
              <Icon name="chevron-right" size={14} />
            </a>
          )}
        </span>
      )}
    </span>
  );
}
