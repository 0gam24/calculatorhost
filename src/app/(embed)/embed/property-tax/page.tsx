import type { Metadata } from 'next';
import { EmbedShell } from '@/components/calculator/EmbedShell';
import { PropertyTaxCalculator } from '../../../calculator/property-tax/PropertyTaxCalculator';

const CANONICAL = 'https://calculatorhost.com/calculator/property-tax/';

export const metadata: Metadata = {
  title: '재산세 계산기 (임베드 위젯) | calculatorhost',
  description: '외부 사이트 삽입용 재산세 계산기 위젯. 2026년 공정시장가액비율·세율 반영.',
  alternates: { canonical: CANONICAL },
  robots: { index: false, follow: true },
};

export default function PropertyTaxEmbedPage() {
  return (
    <EmbedShell title="재산세 계산기" canonicalUrl={CANONICAL}>
      <PropertyTaxCalculator />
    </EmbedShell>
  );
}
