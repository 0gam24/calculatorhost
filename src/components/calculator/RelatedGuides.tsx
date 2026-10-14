import Link from 'next/link';
import { GUIDES } from '@/app/guide/page';
import { guidesForCalculator, type MappedCalculator } from '@/lib/data/guide-calculator-map';

interface RelatedGuidesProps {
  calculator: MappedCalculator;
  limit?: number;
}

/**
 * 계산기 아래 "이 계산기와 함께 보는 가이드" 목록 (제목만).
 * 가이드 → 계산기 카드와 같은 규칙(src/lib/data/guide-calculator-map.ts)으로 양방향을 잇는다.
 */
export function RelatedGuides({ calculator, limit = 6 }: RelatedGuidesProps) {
  const guides = guidesForCalculator(calculator, GUIDES, limit);
  if (guides.length === 0) return null;
  return (
    <section aria-label="이 계산기와 함께 보는 가이드" className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">이 계산기와 함께 보는 가이드</h2>
      <ul className="grid gap-2 md:grid-cols-2">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/guide/${g.slug}/`}
              className="flex min-h-12 items-center rounded-xl border border-border-base bg-bg-card px-4 py-3 text-sm text-text-primary hover:border-primary-500"
            >
              {g.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
