import { cn } from '@/lib/utils';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionProps {
  items: FaqItem[];
  className?: string;
}

export function FaqSection({ items, className }: FaqSectionProps) {
  return (
    <section
      aria-label="자주 묻는 질문"
      className={cn('flex flex-col gap-4', className)}
    >
      <h2 className="text-2xl font-semibold">자주 묻는 질문</h2>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <details
            key={idx}
            className="group card cursor-pointer [&[open]]:bg-bg-raised [&[open]]:border-l-4 [&[open]]:border-l-primary-500"
          >
            <summary className="flex cursor-pointer items-center justify-between text-base font-semibold [&[open]]:text-primary-600 dark:[&[open]]:text-primary-500 transition-colors">
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className="ml-4 text-primary-500 transition-transform group-open:rotate-180"
              >
                ▾
              </span>
            </summary>
            <div
              className="mt-3 text-sm leading-relaxed text-text-secondary whitespace-pre-line"
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
