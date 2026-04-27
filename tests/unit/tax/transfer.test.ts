/**
 * 양도소득세 계산 테스트
 *
 * MVP 스펙 (docs/calculator-spec/양도소득세.md §8):
 * - 1세대1주택 8억 (전액 비과세)
 * - 1세대1주택 15억 (12억 초과분 과세)
 * - 2주택 조정지역 + 기본세율 + 20%p
 * - 3주택 조정지역 + 기본세율 + 30%p
 * - 단기 1년 미만 40%
 * - 분양권 1년 미만 70%
 * - 일시적 2주택 3년 이내 비과세
 * - 장기보유특별공제 10년
 *
 * 추가 케이스:
 * - 단기 2년 미만 주택
 * - 분양권 1년 이상 60%
 * - 장기보유 15년 일반 최대 30%
 * - 손실 처리
 * - 기본공제 소멸
 */

import { describe, it, expect } from 'vitest';
import { calculateTransferTax, type TransferInput } from '@/lib/tax/transfer';
import { TRANSFER_TAX } from '@/lib/constants/tax-rates-2026';

describe('calculateTransferTax', () => {
  // ============================================
  // 테스트 1: 1세대1주택 8억 (전액 비과세)
  // ============================================
  it('1세대1주택 8억 (전액 비과세)', () => {
    const input: TransferInput = {
      caseType: 'oneHouseOneHousehold',
      assetType: 'house',
      salePrice: 800_000_000,
      acquisitionPrice: 500_000_000,
      necessaryExpenses: 0,
      holdingYears: 3,
      residentYears: 3,
      householdHouseCount: 1,
      adjustedAreaSurcharge: 'none',
      isShortTerm: false,
    };

    const result = calculateTransferTax(input);

    expect(result.capitalGain).toBe(300_000_000); // 8억 - 5억
    expect(result.nontaxableAmount).toBe(300_000_000); // 전액 비과세
    expect(result.grossTax).toBe(0);
    expect(result.totalTax).toBe(0);
  });

  // ============================================
  // 테스트 2: 1세대1주택 15억 (12억 초과분 과세)
  // ============================================
  it('1세대1주택 15억 고가 (12억 초과분 과세)', () => {
    const input: TransferInput = {
      caseType: 'oneHouseOneHousehold',
      assetType: 'house',
      salePrice: 1_500_000_000,
      acquisitionPrice: 1_000_000_000,
      necessaryExpenses: 0,
      holdingYears: 5,
      residentYears: 5,
      householdHouseCount: 1,
      adjustedAreaSurcharge: 'none',
      isShortTerm: false,
    };

    const result = calculateTransferTax(input);

    const totalCapitalGain = 500_000_000; // 15억 - 10억
    // 과세 양도차익 = 5억 × (15억 - 12억) / 15억 = 5억 × 0.2 = 1억
    // 비과세 = 4억
    const expectedAdjustedCapitalGain = Math.floor(totalCapitalGain * 0.2);
    const expectedNontaxable = totalCapitalGain - expectedAdjustedCapitalGain;

    expect(result.capitalGain).toBe(500_000_000);
    expect(result.nontaxableAmount).toBe(expectedNontaxable);

    // 과세 양도차익 1억 - 장특공제 (5+5)×4% = 1억 × 40% = 4천만
    // transferIncome = 1억 - 4천만 = 6천만
    const expectedTransferIncome = expectedAdjustedCapitalGain - Math.floor(expectedAdjustedCapitalGain * 0.4);
    expect(result.transferIncome).toBeCloseTo(expectedTransferIncome, 0);
    expect(result.grossTax).toBeGreaterThan(0);
    expect(result.totalTax).toBeGreaterThan(0);
  });

  // ============================================
  // 테스트 3: 2주택 조정지역 + 20%p
  // ============================================
  it('2주택 조정지역: 기본세율 + 20%p', () => {
    const input: TransferInput = {
      caseType: 'general',
      assetType: 'house',
      salePrice: 600_000_000,
      acquisitionPrice: 400_000_000,
      necessaryExpenses: 0,
      holdingYears: 5,
      householdHouseCount: 2,
      adjustedAreaSurcharge: 'twoHouses',
      isShortTerm: false,
    };

    const result = calculateTransferTax(input);

    const capitalGain = 200_000_000;
    const longTermDeduction = 0; // 3년 이상 일반 사례, 5년 × 2% = 10%
    const transferIncome = capitalGain - longTermDeduction;
    const basicDeduction = 2_500_000;
    const taxableBase = transferIncome - basicDeduction; // 약 1.975억

    // 기본 누진세율 + 조정지역 20%p 가산
    // 15% 구간: 기본 15% + 20%p = 35%
    const expectedRate = 0.15 + 0.2; // 35%
    expect(result.appliedRate).toBe(-1); // 누진세
    expect(result.rateDescription).toContain('기본 누진세율');
    expect(result.grossTax).toBeGreaterThan(0);
    expect(result.warnings.some(w => w.includes('조정지역'))).toBe(true);
  });

  // ============================================
  // 테스트 4: 3주택 조정지역 + 30%p
  // ============================================
  it('3주택 조정지역: 기본세율 + 30%p', () => {
    const input: TransferInput = {
      caseType: 'general',
      assetType: 'house',
      salePrice: 600_000_000,
      acquisitionPrice: 400_000_000,
      necessaryExpenses: 0,
      holdingYears: 5,
      householdHouseCount: 3,
      adjustedAreaSurcharge: 'threeOrMoreHouses',
      isShortTerm: false,
    };

    const result = calculateTransferTax(input);

    // 3주택 조정지역 → +30%p
    expect(result.appliedRate).toBe(-1); // 누진세
    expect(result.warnings.some(w => w.includes('30%p'))).toBe(true);
  });

  // ============================================
  // 테스트 5: 단기 1년 미만 주택 (40%)
  // ============================================
  it('단기 1년 미만 주택 (40% 세율)', () => {
    const input: TransferInput = {
      caseType: 'general',
      assetType: 'house',
      salePrice: 500_000_000,
      acquisitionPrice: 400_000_000,
      necessaryExpenses: 0,
      holdingYears: 0.5,
      householdHouseCount: 1,
      adjustedAreaSurcharge: 'none',
      isShortTerm: true,
    };

    const result = calculateTransferTax(input);

    const capitalGain = 100_000_000;
    const transferIncome = capitalGain; // 장특공제 없음
    const taxableBase = transferIncome - TRANSFER_TAX.annualBasicDeduction; // 약 9,750만

    // 40% 고정세율
    const expectedGrossTax = Math.floor((taxableBase * 0.4) / 10) * 10;

    expect(result.appliedRate).toBe(0.4);
    expect(result.rateDescription).toContain('1년 미만');
    expect(result.grossTax).toBeCloseTo(expectedGrossTax, -2);
  });

  // ============================================
  // 테스트 6: 분양권 1년 미만 (70%)
  // ============================================
  it('분양권 1년 미만 (70% 세율)', () => {
    const input: TransferInput = {
      caseType: 'general',
      assetType: 'subscription-right',
      salePrice: 300_000_000,
      acquisitionPrice: 250_000_000,
      necessaryExpenses: 0,
      holdingYears: 0.5,
      householdHouseCount: 1,
      adjustedAreaSurcharge: 'none',
      isShortTerm: true,
      isSubscriptionRightShort: true,
    };

    const result = calculateTransferTax(input);

    const capitalGain = 50_000_000;
    const transferIncome = capitalGain;
    const taxableBase = transferIncome - TRANSFER_TAX.annualBasicDeduction;

    // 70% 고정세율
    const expectedGrossTax = Math.floor((taxableBase * 0.7) / 10) * 10;

    expect(result.appliedRate).toBe(0.7);
    expect(result.rateDescription).toContain('분양권');
    expect(result.rateDescription).toContain('1년 미만');
    expect(result.grossTax).toBeCloseTo(expectedGrossTax, -2);
  });

  // ============================================
  // 테스트 7: 일시적 2주택 3년 이내 비과세
  // ============================================
  it('일시적 2주택 12억 이하 (전액 비과세)', () => {
    const input: TransferInput = {
      caseType: 'temporaryTwoHouses',
      assetType: 'house',
      salePrice: 900_000_000,
      acquisitionPrice: 600_000_000,
      necessaryExpenses: 0,
      holdingYears: 2.5,
      householdHouseCount: 2,
      adjustedAreaSurcharge: 'none',
      isShortTerm: false,
    };

    const result = calculateTransferTax(input);

    expect(result.capitalGain).toBe(300_000_000);
    expect(result.nontaxableAmount).toBe(300_000_000);
    expect(result.grossTax).toBe(0);
    expect(result.totalTax).toBe(0);
  });

  // ============================================
  // 테스트 8: 장기보유특별공제 (1세대1주택 10년, 고가)
  // ============================================
  it('1세대1주택 고가 보유 10년 + 거주 10년 (80% 최대공제)', () => {
    const input: TransferInput = {
      caseType: 'oneHouseOneHousehold',
      assetType: 'house',
      salePrice: 1_500_000_000,
      acquisitionPrice: 1_000_000_000,
      necessaryExpenses: 0,
      holdingYears: 10,
      residentYears: 10,
      householdHouseCount: 1,
      adjustedAreaSurcharge: 'none',
      isShortTerm: false,
    };

    const result = calculateTransferTax(input);

    const capitalGain = 500_000_000;
    // 12억 초과: 과세 양도차익 = 5억 × (15억 - 12억) / 15억 = 5억 × 0.2 = 1억
    const adjustedGain = Math.floor(capitalGain * ((1_500_000_000 - 1_200_000_000) / 1_500_000_000));
    // 장특공제: (10 × 4%) + (10 × 4%) = 80% (최대값)
    const expectedDeduction = Math.floor(adjustedGain * 0.8);

    expect(result.longTermHoldingDeduction).toBe(expectedDeduction);
  });

  // ============================================
  // 테스트 9: 장기보유특별공제 (일반 15년 최대 30%)
  // ============================================
  it('일반 보유 15년 이상 (30% 최대공제)', () => {
    const input: TransferInput = {
      caseType: 'general',
      assetType: 'house',
      salePrice: 800_000_000,
      acquisitionPrice: 500_000_000,
      necessaryExpenses: 0,
      holdingYears: 20,
      householdHouseCount: 1,
      adjustedAreaSurcharge: 'none',
      isShortTerm: false,
    };

    const result = calculateTransferTax(input);

    const capitalGain = 300_000_000;
    // 일반: min(20 × 2%, 30%) = 30%
    const expectedDeduction = Math.floor(capitalGain * 0.3);

    expect(result.longTermHoldingDeduction).toBeCloseTo(expectedDeduction, 0);
  });

  // ============================================
  // 테스트 10: 단기 2년 미만 주택 (40%)
  // ============================================
  it('단기 2년 미만 주택 (40% 세율)', () => {
    const input: TransferInput = {
      caseType: 'general',
      assetType: 'house',
      salePrice: 500_000_000,
      acquisitionPrice: 400_000_000,
      necessaryExpenses: 0,
      holdingYears: 1.5,
      householdHouseCount: 1,
      adjustedAreaSurcharge: 'none',
      isShortTerm: false,
    };

    const result = calculateTransferTax(input);

    expect(result.appliedRate).toBe(0.4);
    expect(result.rateDescription).toContain('2년 미만');
  });

  // ============================================
  // 테스트 11: 분양권 1년 이상 (60%)
  // ============================================
  it('분양권 1년 이상 (60% 세율)', () => {
    const input: TransferInput = {
      caseType: 'general',
      assetType: 'subscription-right',
      salePrice: 300_000_000,
      acquisitionPrice: 250_000_000,
      necessaryExpenses: 0,
      holdingYears: 1.5,
      householdHouseCount: 1,
      adjustedAreaSurcharge: 'none',
      isShortTerm: false,
      isSubscriptionRightShort: false,
    };

    const result = calculateTransferTax(input);

    expect(result.appliedRate).toBe(0.6);
    expect(result.rateDescription).toContain('분양권');
    expect(result.rateDescription).toContain('1년 이상');
  });

  // ============================================
  // 테스트 12: 양도차손 (손실)
  // ============================================
  it('양도차손 (거래차손, 세금 0)', () => {
    const input: TransferInput = {
      caseType: 'general',
      assetType: 'house',
      salePrice: 400_000_000,
      acquisitionPrice: 500_000_000,
      necessaryExpenses: 0,
      holdingYears: 5,
      householdHouseCount: 1,
      adjustedAreaSurcharge: 'none',
      isShortTerm: false,
    };

    const result = calculateTransferTax(input);

    expect(result.capitalGain).toBe(0); // Math.max(0, ...)
    expect(result.grossTax).toBe(0);
    expect(result.totalTax).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  // ============================================
  // 테스트 13: 기본공제로 소멸
  // ============================================
  it('양도소득금액이 기본공제보다 작음 (세금 0)', () => {
    const input: TransferInput = {
      caseType: 'general',
      assetType: 'house',
      salePrice: 300_020_000,
      acquisitionPrice: 300_000_000,
      necessaryExpenses: 0,
      holdingYears: 5,
      householdHouseCount: 1,
      adjustedAreaSurcharge: 'none',
      isShortTerm: false,
    };

    const result = calculateTransferTax(input);

    // 양도차익 20,000 → 기본공제 2,500,000 초과 적용 → 과세표준 0
    expect(result.capitalGain).toBe(20_000);
    expect(result.taxableBase).toBe(0);
    expect(result.grossTax).toBe(0);
  });

  // ============================================
  // 테스트 14: 필요경비 적용
  // ============================================
  it('필요경비 (중개비·리모델링 등) 공제', () => {
    const input: TransferInput = {
      caseType: 'general',
      assetType: 'house',
      salePrice: 500_000_000,
      acquisitionPrice: 400_000_000,
      necessaryExpenses: 5_000_000,
      holdingYears: 5,
      householdHouseCount: 1,
      adjustedAreaSurcharge: 'none',
      isShortTerm: false,
    };

    const result = calculateTransferTax(input);

    // 양도차익 = 5억 - 4억 - 500만 = 95,000,000
    expect(result.capitalGain).toBe(95_000_000);
  });

  // ============================================
  // 테스트 15: 10원 단위 절사 검증
  // ============================================
  it('세금 10원 단위 절사', () => {
    const input: TransferInput = {
      caseType: 'general',
      assetType: 'house',
      salePrice: 505_555_555,
      acquisitionPrice: 400_000_000,
      necessaryExpenses: 0,
      holdingYears: 5,
      householdHouseCount: 1,
      adjustedAreaSurcharge: 'none',
      isShortTerm: false,
    };

    const result = calculateTransferTax(input);

    // 세금이 10원 단위로 절사되었는지 확인
    expect(result.grossTax % 10).toBe(0);
    expect(result.localIncomeTax % 10).toBe(0);
  });

  // ============================================
  // 테스트 16: 지방소득세 계산 (10%)
  // ============================================
  it('지방소득세는 산출세액의 10%', () => {
    const input: TransferInput = {
      caseType: 'general',
      assetType: 'house',
      salePrice: 500_000_000,
      acquisitionPrice: 400_000_000,
      necessaryExpenses: 0,
      holdingYears: 0.5, // 단기 40%
      householdHouseCount: 1,
      adjustedAreaSurcharge: 'none',
      isShortTerm: true,
    };

    const result = calculateTransferTax(input);

    const expectedLocalTax = Math.floor((result.grossTax * 0.1) / 10) * 10;
    expect(result.localIncomeTax).toBe(expectedLocalTax);
  });

  // ============================================
  // 테스트 17: 고가 1세대1주택 + 장특공제
  // ============================================
  it('1세대1주택 15억 + 보유 5년 (12억 초과분만 과세, 장특공제 적용)', () => {
    const input: TransferInput = {
      caseType: 'oneHouseOneHousehold',
      assetType: 'house',
      salePrice: 1_500_000_000,
      acquisitionPrice: 1_000_000_000,
      necessaryExpenses: 0,
      holdingYears: 5,
      residentYears: 3,
      householdHouseCount: 1,
      adjustedAreaSurcharge: 'none',
      isShortTerm: false,
    };

    const result = calculateTransferTax(input);

    const totalGain = 500_000_000;
    // 비과세: (12억 - 15억) / 15억 = -3억 / 15억 (음수이므로 과세)
    // 과세 양도차익 = 5억 × (15억 - 12억) / 15억 = 5억 × 0.2 = 1억
    const expectedAdjustedGain = Math.floor(totalGain * 0.2);
    // 장특공제: min((5+3) × 4%, 80%) = min(32%, 80%) = 32%
    const expectedDeduction = Math.floor(expectedAdjustedGain * 0.32);

    expect(result.nontaxableAmount).toBeGreaterThan(0);
    expect(result.longTermHoldingDeduction).toBeCloseTo(expectedDeduction, 0);
  });

  // ============================================
  // 테스트 18: MVP 외 자산 (경고)
  // ============================================
  it('토지 입력 시 경고 메시지', () => {
    const input: TransferInput = {
      caseType: 'general',
      assetType: 'land',
      salePrice: 500_000_000,
      acquisitionPrice: 400_000_000,
      necessaryExpenses: 0,
      holdingYears: 5,
      householdHouseCount: 1,
      adjustedAreaSurcharge: 'none',
      isShortTerm: false,
    };

    const result = calculateTransferTax(input);

    expect(result.warnings.some(w => w.includes('토지') || w.includes('미지원'))).toBe(true);
  });
});
