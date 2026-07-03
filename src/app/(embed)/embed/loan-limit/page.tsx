import type { Metadata } from 'next';
import { EmbedShell } from '@/components/calculator/EmbedShell';
import { LoanLimitCalculator } from '../../../calculator/loan-limit/LoanLimitCalculator';

const CANONICAL = 'https://calculatorhost.com/calculator/loan-limit/';

export const metadata: Metadata = {
  title: 'DSR 대출한도 계산기 (임베드 위젯) | calculatorhost',
  description: '외부 사이트 삽입용 DSR·LTV 대출한도 계산기 위젯. 2026년 규제 기준 반영.',
  alternates: { canonical: CANONICAL },
  robots: { index: false, follow: true },
};

export default function LoanLimitEmbedPage() {
  return (
    <EmbedShell title="DSR 대출한도 계산기" canonicalUrl={CANONICAL}>
      <LoanLimitCalculator />
    </EmbedShell>
  );
}
