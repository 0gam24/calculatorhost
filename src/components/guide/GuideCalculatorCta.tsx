import Link from 'next/link';
import { GUIDES } from '@/app/guide/page';
import { CALCULATOR_LABELS, calculatorForGuide } from '@/lib/data/guide-calculator-map';

interface GuideCalculatorCtaProps {
  /** 가이드 slug (`/guide/{slug}/`) */
  slug: string;
}

/**
 * 가이드 본문 맨 위(첫 H2 앞)의 "이 글과 함께 쓰는 계산기" 카드.
 * 어떤 계산기를 붙일지는 src/lib/data/guide-calculator-map.ts 규칙이 정한다(없으면 그리지 않음).
 * 서버 컴포넌트라 링크가 정적 HTML 에 들어간다. 검색 요약에는 본문이 쓰이도록 data-nosnippet.
 */
export function GuideCalculatorCta({ slug }: GuideCalculatorCtaProps) {
  const guide = GUIDES.find((g) => g.slug === slug);
  const calc = guide ? calculatorForGuide(guide) : null;
  if (!calc) return null;
  const label = CALCULATOR_LABELS[calc];
  return (
    <aside
      aria-label="이 글과 함께 쓰는 계산기"
      data-nosnippet
      data-guide-calculator-cta={calc}
      className="rounded-xl border border-primary-500/40 bg-primary-500/5 p-4"
    >
      <p className="text-sm text-text-secondary">이 글의 내용을 내 조건으로 바로 계산해 보세요.</p>
      <Link
        href={`/calculator/${calc}/`}
        className="mt-2 flex min-h-12 items-center justify-between gap-3 rounded-lg border border-border-base bg-bg-card px-4 py-3 font-semibold text-primary-700 hover:border-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-primary-300"
      >
        <span>{label} 바로 쓰기</span>
        <span aria-hidden="true">→</span>
      </Link>
    </aside>
  );
}
