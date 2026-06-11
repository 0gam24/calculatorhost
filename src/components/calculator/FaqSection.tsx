import { cn } from '@/lib/utils';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionProps {
  items: FaqItem[];
  className?: string;
}

/**
 * FAQ 아코디언 — 단일 테두리 컨테이너 + 행 구분선(divide).
 * 항목마다 무거운 그림자 카드를 쓰지 않아 시각적으로 가볍고 깔끔(심플).
 */
export function FaqSection({ items, className }: FaqSectionProps) {
  return (
    <section aria-label="자주 묻는 질문" className={cn('flex flex-col gap-4', className)}>
      <h2 className="text-2xl font-semibold">자주 묻는 질문</h2>
      <div className="divide-y divide-border-base overflow-hidden rounded-2xl border border-border-base bg-bg-card">
        {items.map((item, idx) => (
          <details key={idx} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-base font-semibold text-text-primary transition-colors hover:bg-bg-raised group-open:text-primary-600 dark:group-open:text-primary-500 [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className="shrink-0 text-primary-500 transition-transform duration-200 group-open:rotate-180"
              >
                ▾
              </span>
            </summary>
            <div
              className="whitespace-pre-line px-5 pb-5 text-sm leading-relaxed text-text-secondary"
              data-speakable
            >
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
