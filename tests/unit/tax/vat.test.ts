import { describe, expect, it } from 'vitest';
import {
  calculateVat,
  extractVatFromTotal,
  addVatToSupplyValue,
  VAT_RATE,
  SIMPLIFIED_VAT_VALUE_ADDED_RATE,
} from '@/lib/tax/vat';

describe('calculateVat — 일반과세자', () => {
  it('매출 1억, 매입 5천만 → 납부세액 500만원', () => {
    const r = calculateVat({
      businessType: 'general',
      salesAmount: 100_000_000,
      purchaseAmount: 50_000_000,
    });
    expect(r.outputVat).toBe(10_000_000);
    expect(r.inputVatDeduction).toBe(5_000_000);
    expect(r.payableVat).toBe(5_000_000);
    expect(r.isRefund).toBe(false);
  });

  it('매입이 매출 초과 → 환급 + 경고', () => {
    const r = calculateVat({
      businessType: 'general',
      salesAmount: 30_000_000,
      purchaseAmount: 50_000_000,
    });
    expect(r.payableVat).toBe(-2_000_000);
    expect(r.isRefund).toBe(true);
    expect(r.warnings.some((w) => w.includes('환급'))).toBe(true);
  });

  it('매입세액 공제비율 50% 적용', () => {
    const r = calculateVat({
      businessType: 'general',
      salesAmount: 100_000_000,
      purchaseAmount: 50_000_000,
      deductibleRatio: 50,
    });
    expect(r.inputVatDeduction).toBe(2_500_000);
    expect(r.payableVat).toBe(7_500_000);
  });

  it('매입 0 (매입세액공제 없음)', () => {
    const r = calculateVat({
      businessType: 'general',
      salesAmount: 50_000_000,
    });
    expect(r.outputVat).toBe(5_000_000);
    expect(r.inputVatDeduction).toBe(0);
    expect(r.payableVat).toBe(5_000_000);
  });

  it('매출 0 → 경고', () => {
    const r = calculateVat({
      businessType: 'general',
      salesAmount: 0,
    });
    expect(r.warnings.some((w) => w.includes('매출'))).toBe(true);
  });
});

describe('calculateVat — 간이과세자', () => {
  it('소매업 매출 1억 → 매출세액 = 1억 × 15% × 10% = 150만원', () => {
    const r = calculateVat({
      businessType: 'simplified',
      salesAmount: 100_000_000,
      simplifiedIndustry: 'retail',
    });
    expect(r.outputVat).toBe(1_500_000);
    expect(r.valueAddedRate).toBe(15);
  });

  it('제조업 매출 5천만 → 부가가치율 20%', () => {
    const r = calculateVat({
      businessType: 'simplified',
      salesAmount: 50_000_000,
      simplifiedIndustry: 'manufacturing',
    });
    expect(r.valueAddedRate).toBe(20);
    expect(r.outputVat).toBe(1_000_000);
  });

  it('연 매출 4,800만 미만 → 면세 + 경고', () => {
    const r = calculateVat({
      businessType: 'simplified',
      salesAmount: 30_000_000,
      simplifiedIndustry: 'retail',
    });
    expect(r.isExempt).toBe(true);
    expect(r.payableVat).toBe(0);
    expect(r.warnings.some((w) => w.includes('면제'))).toBe(true);
  });

  it('간이과세자는 환급 없음', () => {
    const r = calculateVat({
      businessType: 'simplified',
      salesAmount: 100_000_000,
      purchaseAmount: 200_000_000,
      simplifiedIndustry: 'retail',
    });
    expect(r.isRefund).toBe(false);
    expect(r.payableVat).toBeGreaterThanOrEqual(0);
  });

  it('업종 미지정 시 기본 retail (15%) 적용', () => {
    const r = calculateVat({
      businessType: 'simplified',
      salesAmount: 100_000_000,
    });
    expect(r.valueAddedRate).toBe(15);
  });
});

describe('calculateVat — 안전 처리', () => {
  it('음수 입력 → 0으로 클램프', () => {
    const r = calculateVat({
      businessType: 'general',
      salesAmount: -1000,
      purchaseAmount: -500,
    });
    expect(r.outputVat).toBe(0);
    expect(r.inputVatDeduction).toBe(0);
  });

  it('NaN 입력 → 0으로 클램프', () => {
    const r = calculateVat({
      businessType: 'general',
      salesAmount: NaN,
    });
    expect(r.outputVat).toBe(0);
  });

  it('항상 면책 경고 포함', () => {
    const r = calculateVat({
      businessType: 'general',
      salesAmount: 100_000_000,
    });
    expect(r.warnings.some((w) => w.includes('교육') || w.includes('참고'))).toBe(true);
  });
});

describe('extractVatFromTotal — VAT 포함 → 공급가액', () => {
  it('110,000원 (VAT 포함) → 공급가액 100,000원 + VAT 10,000원', () => {
    const r = extractVatFromTotal(110_000);
    expect(r.supplyValue).toBe(100_000);
    expect(r.vat).toBe(10_000);
  });

  it('1,100,000원 → 1,000,000 + 100,000', () => {
    const r = extractVatFromTotal(1_100_000);
    expect(r.supplyValue).toBe(1_000_000);
    expect(r.vat).toBe(100_000);
  });

  it('0원 → 0/0', () => {
    expect(extractVatFromTotal(0)).toEqual({ supplyValue: 0, vat: 0 });
  });
});

describe('addVatToSupplyValue — 공급가액 → VAT 포함', () => {
  it('100,000원 공급가액 → VAT 10,000원 + 총 110,000원', () => {
    const r = addVatToSupplyValue(100_000);
    expect(r.vat).toBe(10_000);
    expect(r.totalPrice).toBe(110_000);
  });

  it('1,000,000원 → 110만원', () => {
    const r = addVatToSupplyValue(1_000_000);
    expect(r.totalPrice).toBe(1_100_000);
  });
});

describe('상수', () => {
  it('VAT_RATE = 10', () => {
    expect(VAT_RATE).toBe(10);
  });

  it('간이과세 부가가치율 5종 정의', () => {
    expect(SIMPLIFIED_VAT_VALUE_ADDED_RATE.utility).toBe(5);
    expect(SIMPLIFIED_VAT_VALUE_ADDED_RATE.retail).toBe(15);
    expect(SIMPLIFIED_VAT_VALUE_ADDED_RATE.manufacturing).toBe(20);
    expect(SIMPLIFIED_VAT_VALUE_ADDED_RATE.service).toBe(30);
    expect(SIMPLIFIED_VAT_VALUE_ADDED_RATE.other).toBe(40);
  });
});
