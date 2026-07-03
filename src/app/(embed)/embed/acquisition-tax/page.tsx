import type { Metadata } from 'next';
import { EmbedShell } from '@/components/calculator/EmbedShell';
import { AcquisitionCalculator } from '../../../calculator/acquisition-tax/AcquisitionCalculator';

const CANONICAL = 'https://calculatorhost.com/calculator/acquisition-tax/';

export const metadata: Metadata = {
  title: '취득세 계산기 (임베드 위젯) | calculatorhost',
  description: '외부 사이트 삽입용 취득세 계산기 위젯. 2026년 최신 세율·중과 반영.',
  alternates: { canonical: CANONICAL },
  robots: { index: false, follow: true },
};

export default function AcquisitionTaxEmbedPage() {
  return (
    <EmbedShell title="취득세 계산기" canonicalUrl={CANONICAL}>
      <AcquisitionCalculator />
    </EmbedShell>
  );
}
