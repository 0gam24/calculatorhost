import type { Metadata } from 'next';
import { TransferTaxCalculator } from '../../../calculator/capital-gains-tax/TransferTaxCalculator';

const CANONICAL = 'https://calculatorhost.com/calculator/capital-gains-tax/';

/**
 * 양도소득세 계산기 임베드 위젯 (chrome-less).
 *
 * 외부 사이트가 <iframe> 으로 삽입하는 최소 페이지. Header/Sidebar/Footer/AdSlot 없음.
 * - noindex: 정식 계산기 페이지(/calculator/capital-gains-tax/)와 중복 색인 방지
 * - canonical: 정식 페이지로 고정 → 검색 신호를 원본에 집중
 * - 프레이밍 허용: public/_headers 의 /embed/* 규칙에서 X-Frame-Options 완화
 * - 광고 없음: MobileAnchorAdGuard 가 /embed/* 에서 앵커 광고 억제 (AdSense 정책)
 */
export const metadata: Metadata = {
  title: '양도소득세 계산기 (임베드 위젯) | calculatorhost',
  description: '외부 사이트 삽입용 양도소득세 계산기 위젯. 2026년 최신 세율 반영.',
  alternates: { canonical: CANONICAL },
  robots: { index: false, follow: true },
};

export default function CapitalGainsTaxEmbedPage() {
  return (
    <main className="min-h-screen bg-bg-base px-3 py-4">
      <div className="mx-auto max-w-2xl">
        <TransferTaxCalculator />
        <p className="mt-4 text-center text-xs text-text-tertiary">
          제공:{' '}
          <a
            href={CANONICAL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary-600 underline dark:text-primary-400"
          >
            양도소득세 계산기 — calculatorhost.com
          </a>{' '}
          · 2026년 최신 세율 반영
        </p>
      </div>
    </main>
  );
}
