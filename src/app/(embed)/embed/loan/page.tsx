import type { Metadata } from 'next';
import { EmbedShell } from '@/components/calculator/EmbedShell';
import { LoanCalculator } from '../../../calculator/loan/LoanCalculator';

const CANONICAL = 'https://calculatorhost.com/calculator/loan/';

export const metadata: Metadata = {
  title: '대출이자 계산기 (임베드 위젯) | calculatorhost',
  description: '외부 사이트 삽입용 대출이자 계산기 위젯. 원리금균등·만기일시 상환 지원.',
  alternates: { canonical: CANONICAL },
  robots: { index: false, follow: true },
};

export default function LoanEmbedPage() {
  return (
    <EmbedShell title="대출이자 계산기" canonicalUrl={CANONICAL}>
      <LoanCalculator />
    </EmbedShell>
  );
}
