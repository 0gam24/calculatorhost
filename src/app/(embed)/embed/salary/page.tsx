import type { Metadata } from 'next';
import { EmbedShell } from '@/components/calculator/EmbedShell';
import { SalaryCalculator } from '../../../calculator/salary/SalaryCalculator';

const CANONICAL = 'https://calculatorhost.com/calculator/salary/';

export const metadata: Metadata = {
  title: '연봉 실수령액 계산기 (임베드 위젯) | calculatorhost',
  description: '외부 사이트 삽입용 연봉 실수령액 계산기 위젯. 2026년 4대보험·세율 반영.',
  alternates: { canonical: CANONICAL },
  robots: { index: false, follow: true },
};

export default function SalaryEmbedPage() {
  return (
    <EmbedShell title="연봉 실수령액 계산기" canonicalUrl={CANONICAL}>
      <SalaryCalculator />
    </EmbedShell>
  );
}
