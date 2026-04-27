/**
 * 상속세 계산 단위 테스트
 *
 * 문서: docs/calculator-spec/상속세.md §8
 * 함수: src/lib/tax/inheritance.ts
 */

import { describe, it, expect } from 'vitest';
import { calculateInheritanceTax, type InheritanceInput } from '@/lib/tax/inheritance';

describe('calculateInheritanceTax', () => {
  // ─────────────────────────────────────────────
  // 1. 상속 10억, 배우자 없음, 자녀 2
  //    기초 2억 + 자녀 1억(2×5천만) = 3억
  //    일괄 5억 > 3억 → 일괄 선택
  //    과표 5억 → 20% × 5억 - 1천만 = 9천만
  //    신고공제 3% = 270만 → finalTax 87,300,000
  // ─────────────────────────────────────────────
  it('상속 10억, 배우자 없음, 자녀 2 → 일괄공제 5억 선택 (세금 8730만)', () => {
    const input: InheritanceInput = {
      totalAssets: 1_000_000_000,
      funeralAndDebts: 0,
      hasSpouse: false,
      spouseInheritedAmount: 0,
      childrenCount: 2,
      minorChildrenCount: 0,
      minorChildrenAverageAgeYears: 0,
      deductionMode: 'auto',
      reportWithinDeadline: true,
    };

    const result = calculateInheritanceTax(input);

    expect(result.totalAssets).toBe(1_000_000_000);
    expect(result.taxableAssets).toBe(1_000_000_000);
    expect(result.basicDeduction).toBe(200_000_000);
    expect(result.childrenDeduction).toBe(100_000_000);
    expect(result.minorDeduction).toBe(0);
    expect(result.personalDeductionSubtotal).toBe(300_000_000);
    expect(result.lumpSumDeduction).toBe(500_000_000);
    expect(result.spouseDeduction).toBe(0);
    expect(result.selectedMode).toBe('lumpSum');
    expect(result.effectiveDeduction).toBe(500_000_000);
    expect(result.taxableBase).toBe(500_000_000);

    // 과표 5억 → 20% × 5억 - 1,000만 = 8,000만 - 1,000만 = 9,000만
    expect(result.grossTax).toBe(90_000_000);

    // 신고공제: 9,000만 × 3% = 2,700,000 (10원 단위 절사 → 270만)
    expect(result.reportingCredit).toBe(2_700_000);

    // 최종: 9,000만 - 270만 = 87,300,000
    expect(result.finalTax).toBe(87_300_000);
  });

  // ─────────────────────────────────────────────
  // 2. 상속 30억, 배우자 + 자녀 2, 배우자 실제 상속 15억
  //    기초 2억 + 자녀 1억 = 3억, 일괄 5억 → 5억 선택 (auto)
  //    배우자공제 = min(30억, max(5억, 15억)) = 15억
  //    효과적 공제 = 5억 + 15억 = 20억
  //    과표 10억
  //    30% × 10억 - 6천만 = 2.4억
  //    신고공제 3% = 720만 → final 232,800,000
  // ─────────────────────────────────────────────
  it('상속 30억, 배우자 + 자녀 2, 배우자 상속 15억 → 세금 2.328억', () => {
    const input: InheritanceInput = {
      totalAssets: 3_000_000_000,
      funeralAndDebts: 0,
      hasSpouse: true,
      spouseInheritedAmount: 1_500_000_000,
      childrenCount: 2,
      minorChildrenCount: 0,
      minorChildrenAverageAgeYears: 0,
      deductionMode: 'auto',
      reportWithinDeadline: true,
    };

    const result = calculateInheritanceTax(input);

    expect(result.totalAssets).toBe(3_000_000_000);
    expect(result.taxableAssets).toBe(3_000_000_000);
    expect(result.basicDeduction).toBe(200_000_000);
    expect(result.childrenDeduction).toBe(100_000_000);
    expect(result.personalDeductionSubtotal).toBe(300_000_000);
    expect(result.lumpSumDeduction).toBe(500_000_000);
    expect(result.selectedMode).toBe('lumpSum');
    expect(result.spouseDeduction).toBe(1_500_000_000);
    expect(result.effectiveDeduction).toBe(2_000_000_000);
    expect(result.taxableBase).toBe(1_000_000_000);

    // 과표 10억 → 30% × 10억 - 6천만 = 2.4억
    expect(result.grossTax).toBe(240_000_000);

    // 신고공제: 2.4억 × 3% = 7,200,000 (10원 단위 절사 → 720만)
    expect(result.reportingCredit).toBe(7_200_000);

    // 최종: 2.4억 - 720만 = 232,800,000
    expect(result.finalTax).toBe(232_800_000);
  });

  // ─────────────────────────────────────────────
  // 3. 배우자만 상속, 상속액 40억
  //    배우자공제 = min(30억, max(5억, 40억)) = 30억 + warning
  //    기초+자녀 = 2억, 일괄 5억 → 5억 선택
  //    효과적 공제 = 30억 + 5억 = 35억
  //    과표 5억
  //    20% × 5억 - 1천만 = 9천만 → final 87,300,000
  // ─────────────────────────────────────────────
  it('배우자만 상속 40억 → 배우자공제 최대 30억, 일괄 5억 (세금 8730만)', () => {
    const input: InheritanceInput = {
      totalAssets: 4_000_000_000,
      funeralAndDebts: 0,
      hasSpouse: true,
      spouseInheritedAmount: 4_000_000_000,
      childrenCount: 0,
      minorChildrenCount: 0,
      minorChildrenAverageAgeYears: 0,
      deductionMode: 'auto',
      reportWithinDeadline: true,
    };

    const result = calculateInheritanceTax(input);

    expect(result.spouseDeduction).toBe(3_000_000_000);
    expect(result.basicDeduction).toBe(200_000_000);
    expect(result.childrenDeduction).toBe(0);
    expect(result.lumpSumDeduction).toBe(500_000_000);
    expect(result.effectiveDeduction).toBe(3_500_000_000);
    expect(result.taxableBase).toBe(500_000_000);
    expect(result.grossTax).toBe(90_000_000);
    expect(result.reportingCredit).toBe(2_700_000);
    expect(result.finalTax).toBe(87_300_000);
    expect(result.warnings.length).toBeGreaterThan(0); // 배우자공제 상한 경고
  });

  // ─────────────────────────────────────────────
  // 4. 자녀 10명 (인적 공제 우월)
  //    기초 2억 + 자녀 5억(10×5천만) = 7억
  //    일괄 5억 < 7억 → 인적 선택 (auto)
  //    배우자 없음
  //    과표 3억 (10억 - 7억)
  //    20% × 3억 - 1천만 = 5천만
  //    신고공제 3% = 150만 → final 48,500,000
  // ─────────────────────────────────────────────
  it('상속 10억, 자녀 10명 → 인적공제 7억 선택 (일괄 5억보다 유리)', () => {
    const input: InheritanceInput = {
      totalAssets: 1_000_000_000,
      funeralAndDebts: 0,
      hasSpouse: false,
      spouseInheritedAmount: 0,
      childrenCount: 10,
      minorChildrenCount: 0,
      minorChildrenAverageAgeYears: 0,
      deductionMode: 'auto',
      reportWithinDeadline: true,
    };

    const result = calculateInheritanceTax(input);

    expect(result.childrenDeduction).toBe(500_000_000);
    expect(result.personalDeductionSubtotal).toBe(700_000_000);
    expect(result.selectedMode).toBe('basicAndPersonal');
    expect(result.effectiveDeduction).toBe(700_000_000);
    expect(result.taxableBase).toBe(300_000_000);

    // 과표 3억 → 20% × 3억 - 1천만 = 5천만
    expect(result.grossTax).toBe(50_000_000);

    // 신고공제: 5천만 × 3% = 1,500,000 (10원 단위 절사 → 150만)
    expect(result.reportingCredit).toBe(1_500_000);

    // 최종: 5천만 - 150만 = 48,500,000
    expect(result.finalTax).toBe(48_500_000);
  });

  // ─────────────────────────────────────────────
  // 5. 공과금·장례비 차감
  //    상속 10억, 장례비 5천만
  //    과세대상 = 10억 - 5천만 = 9.5억
  //    기초+자녀(자녀 1) = 2억 + 5천만 = 2.5억
  //    일괄 5억 > 2.5억 → 일괄 선택
  //    과표 4.5억
  //    20% × 4.5억 - 1천만 = 8천만
  //    신고공제 3% = 240만 → final 77,600,000
  // ─────────────────────────────────────────────
  it('상속 10억, 장례비 5천만 → 과세대상 9.5억 (세금 7760만)', () => {
    const input: InheritanceInput = {
      totalAssets: 1_000_000_000,
      funeralAndDebts: 50_000_000,
      hasSpouse: false,
      spouseInheritedAmount: 0,
      childrenCount: 1,
      minorChildrenCount: 0,
      minorChildrenAverageAgeYears: 0,
      deductionMode: 'auto',
      reportWithinDeadline: true,
    };

    const result = calculateInheritanceTax(input);

    expect(result.taxableAssets).toBe(950_000_000);
    expect(result.childrenDeduction).toBe(50_000_000);
    expect(result.personalDeductionSubtotal).toBe(250_000_000);
    expect(result.selectedMode).toBe('lumpSum');
    expect(result.effectiveDeduction).toBe(500_000_000);
    expect(result.taxableBase).toBe(450_000_000);

    // 과표 4.5억 → 20% × 4.5억 - 1천만 = 8천만
    expect(result.grossTax).toBe(80_000_000);

    // 신고공제: 8천만 × 3% = 2,400,000 (10원 단위 절사)
    expect(result.reportingCredit).toBe(2_400_000);

    // 최종: 8천만 - 240만 = 77,600,000
    expect(result.finalTax).toBe(77_600_000);
  });

  // ─────────────────────────────────────────────
  // 6. 50억 상속 → 50% 구간
  //    상속 50억, 자녀 1
  //    기초 2억 + 자녀 5천만 = 2.5억
  //    일괄 5억 > 2.5억 → 일괄 선택
  //    과표 45억
  //    50% × 45억 - 4.6억 = 22.5억 - 4.6억 = 17.9억
  //    신고공제 3% ≈ 5370만 → final 약 173,700,000
  // ─────────────────────────────────────────────
  it('상속 50억, 자녀 1 → 50% 구간, 최고 세율 적용', () => {
    const input: InheritanceInput = {
      totalAssets: 5_000_000_000,
      funeralAndDebts: 0,
      hasSpouse: false,
      spouseInheritedAmount: 0,
      childrenCount: 1,
      minorChildrenCount: 0,
      minorChildrenAverageAgeYears: 0,
      deductionMode: 'auto',
      reportWithinDeadline: true,
    };

    const result = calculateInheritanceTax(input);

    expect(result.taxableAssets).toBe(5_000_000_000);
    expect(result.personalDeductionSubtotal).toBe(250_000_000);
    expect(result.selectedMode).toBe('lumpSum');
    expect(result.effectiveDeduction).toBe(500_000_000);
    expect(result.taxableBase).toBe(4_500_000_000);

    // 과표 45억 → 50% × 45억 - 4.6억 = 22.5억 - 4.6억 = 17.9억
    expect(result.grossTax).toBe(1_790_000_000);

    // 신고공제: 17.9억 × 3% = 5,370만 (10원 단위)
    expect(result.reportingCredit).toBe(53_700_000);

    // 최종: 17.9억 - 5370만
    expect(result.finalTax).toBeCloseTo(1_736_300_000, -3);
  });

  // ─────────────────────────────────────────────
  // 7. 공제가 재산보다 커서 세금 0
  //    상속 5억, 자녀 2
  //    과세대상 5억
  //    기초 2억 + 자녀 1억 = 3억 < 일괄 5억 → 일괄 선택
  //    과표 0 → 세금 0
  // ─────────────────────────────────────────────
  it('상속 5억, 자녀 2 → 과표 0 (세금 0)', () => {
    const input: InheritanceInput = {
      totalAssets: 500_000_000,
      funeralAndDebts: 0,
      hasSpouse: false,
      spouseInheritedAmount: 0,
      childrenCount: 2,
      minorChildrenCount: 0,
      minorChildrenAverageAgeYears: 0,
      deductionMode: 'auto',
      reportWithinDeadline: true,
    };

    const result = calculateInheritanceTax(input);

    expect(result.taxableAssets).toBe(500_000_000);
    expect(result.childrenDeduction).toBe(100_000_000);
    expect(result.personalDeductionSubtotal).toBe(300_000_000);
    expect(result.selectedMode).toBe('lumpSum'); // 일괄이 유리
    expect(result.effectiveDeduction).toBe(500_000_000);
    expect(result.taxableBase).toBe(0);
    expect(result.grossTax).toBe(0);
    expect(result.reportingCredit).toBe(0);
    expect(result.finalTax).toBe(0);
  });

  // ─────────────────────────────────────────────
  // 8. 미성년자공제
  //    미성년 자녀 1명, 평균 10세
  //    공제 = 1 × (19-10) × 1천만 = 9천만
  //    상속 10억, 자녀 총 1 (미성년)
  //    기초 2억 + 자녀 5천만 + 미성년 9천만 = 3.4억
  //    일괄 5억 > 3.4억 → 일괄 선택
  //    과표 5억
  //    세금 9천만 → final 87,300,000
  // ─────────────────────────────────────────────
  it('미성년 자녀 1명(10세) → 미성년공제 9천만', () => {
    const input: InheritanceInput = {
      totalAssets: 1_000_000_000,
      funeralAndDebts: 0,
      hasSpouse: false,
      spouseInheritedAmount: 0,
      childrenCount: 1,
      minorChildrenCount: 1,
      minorChildrenAverageAgeYears: 10,
      deductionMode: 'auto',
      reportWithinDeadline: true,
    };

    const result = calculateInheritanceTax(input);

    expect(result.minorDeduction).toBe(90_000_000);
    expect(result.personalDeductionSubtotal).toBe(340_000_000);
    expect(result.selectedMode).toBe('lumpSum');
    expect(result.effectiveDeduction).toBe(500_000_000);
    expect(result.taxableBase).toBe(500_000_000);
    expect(result.grossTax).toBe(90_000_000);
    expect(result.finalTax).toBe(87_300_000);
  });

  // ─────────────────────────────────────────────
  // 9. 배우자 실제 상속 0원 (배우자 있지만 실제 상속 안 함)
  //    배우자공제 = max(5억, 0) = 5억 (최소 보장)
  //    상속 10억, 자녀 1
  //    기초 2억 + 자녀 5천만 = 2.5억 < 일괄 5억
  //    효과적 공제 = 5억 + 5억 = 10억
  //    과표 0 → 세금 0
  // ─────────────────────────────────────────────
  it('배우자 있지만 실제 상속분 0원 → 배우자공제 최소 5억 (세금 0)', () => {
    const input: InheritanceInput = {
      totalAssets: 1_000_000_000,
      funeralAndDebts: 0,
      hasSpouse: true,
      spouseInheritedAmount: 0,
      childrenCount: 1,
      minorChildrenCount: 0,
      minorChildrenAverageAgeYears: 0,
      deductionMode: 'auto',
      reportWithinDeadline: true,
    };

    const result = calculateInheritanceTax(input);

    expect(result.spouseDeduction).toBe(500_000_000);
    expect(result.lumpSumDeduction).toBe(500_000_000);
    expect(result.effectiveDeduction).toBe(1_000_000_000);
    expect(result.taxableBase).toBe(0);
    expect(result.finalTax).toBe(0);
  });

  // ─────────────────────────────────────────────
  // 10. deductionMode === 'lumpSum' 강제
  //     자녀 10명 (인적 7억 > 일괄 5억)이지만
  //     lumpSum 모드로 강제 선택
  // ─────────────────────────────────────────────
  it('deductionMode === "lumpSum" 강제 선택', () => {
    const input: InheritanceInput = {
      totalAssets: 1_000_000_000,
      funeralAndDebts: 0,
      hasSpouse: false,
      spouseInheritedAmount: 0,
      childrenCount: 10,
      minorChildrenCount: 0,
      minorChildrenAverageAgeYears: 0,
      deductionMode: 'lumpSum',
      reportWithinDeadline: true,
    };

    const result = calculateInheritanceTax(input);

    expect(result.personalDeductionSubtotal).toBe(700_000_000);
    expect(result.selectedMode).toBe('lumpSum');
    expect(result.effectiveDeduction).toBe(500_000_000); // 일괄로 강제
    expect(result.taxableBase).toBe(500_000_000);
    expect(result.grossTax).toBe(90_000_000);
  });

  // ─────────────────────────────────────────────
  // 11. deductionMode === 'basicAndPersonal' 강제
  //     일괄과 인적 중 인적 강제 선택
  // ─────────────────────────────────────────────
  it('deductionMode === "basicAndPersonal" 강제 선택', () => {
    const input: InheritanceInput = {
      totalAssets: 3_000_000_000,
      funeralAndDebts: 0,
      hasSpouse: false,
      spouseInheritedAmount: 0,
      childrenCount: 2,
      minorChildrenCount: 0,
      minorChildrenAverageAgeYears: 0,
      deductionMode: 'basicAndPersonal',
      reportWithinDeadline: true,
    };

    const result = calculateInheritanceTax(input);

    expect(result.personalDeductionSubtotal).toBe(300_000_000);
    expect(result.selectedMode).toBe('basicAndPersonal');
    expect(result.effectiveDeduction).toBe(300_000_000); // 인적으로 강제
    expect(result.taxableBase).toBe(2_700_000_000);
  });

  // ─────────────────────────────────────────────
  // 12. 신고기한 초과 → reportingCredit = 0
  // ─────────────────────────────────────────────
  it('신고기한 초과 → 신고세액공제 미적용', () => {
    const input: InheritanceInput = {
      totalAssets: 1_000_000_000,
      funeralAndDebts: 0,
      hasSpouse: false,
      spouseInheritedAmount: 0,
      childrenCount: 1,
      minorChildrenCount: 0,
      minorChildrenAverageAgeYears: 0,
      deductionMode: 'auto',
      reportWithinDeadline: false,
    };

    const result = calculateInheritanceTax(input);

    expect(result.grossTax).toBe(90_000_000);
    expect(result.reportingCredit).toBe(0);
    expect(result.finalTax).toBe(90_000_000);
    expect(result.warnings.some(w => w.includes('신고기한'))).toBe(true);
  });

  // ─────────────────────────────────────────────
  // 13. 입력 검증: totalAssets <= 0
  // ─────────────────────────────────────────────
  it('상속재산 <= 0 → 모든 필드 0 + warning', () => {
    const input: InheritanceInput = {
      totalAssets: 0,
      funeralAndDebts: 0,
      hasSpouse: false,
      spouseInheritedAmount: 0,
      childrenCount: 0,
      minorChildrenCount: 0,
      minorChildrenAverageAgeYears: 0,
      deductionMode: 'auto',
      reportWithinDeadline: true,
    };

    const result = calculateInheritanceTax(input);

    expect(result.finalTax).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  // ─────────────────────────────────────────────
  // 14. 10원 단위 절사 확인
  //     과표 123,456,789 → 반올림/절사 확인
  // ─────────────────────────────────────────────
  it('10원 단위 절사 확인', () => {
    const input: InheritanceInput = {
      totalAssets: 1_234_567_890,
      funeralAndDebts: 0,
      hasSpouse: false,
      spouseInheritedAmount: 0,
      childrenCount: 1,
      minorChildrenCount: 0,
      minorChildrenAverageAgeYears: 0,
      deductionMode: 'auto',
      reportWithinDeadline: true,
    };

    const result = calculateInheritanceTax(input);

    // grossTax와 reportingCredit 모두 10원 단위 확인
    expect(result.grossTax % 10).toBe(0);
    expect(result.reportingCredit % 10).toBe(0);
    expect(result.finalTax % 10).toBe(0);
  });

  // ─────────────────────────────────────────────
  // 15. 배우자공제 상한 초과 시 경고
  // ─────────────────────────────────────────────
  it('배우자공제 30억 상한 초과 → 경고 메시지', () => {
    const input: InheritanceInput = {
      totalAssets: 5_000_000_000,
      funeralAndDebts: 0,
      hasSpouse: true,
      spouseInheritedAmount: 3_500_000_000,
      childrenCount: 0,
      minorChildrenCount: 0,
      minorChildrenAverageAgeYears: 0,
      deductionMode: 'auto',
      reportWithinDeadline: true,
    };

    const result = calculateInheritanceTax(input);

    expect(result.spouseDeduction).toBe(3_000_000_000); // 상한 적용
    expect(result.warnings.some(w => w.includes('30억'))).toBe(true);
  });

  // ─────────────────────────────────────────────
  // 16. 10억 구간 경계값 (누진세 30% 구간)
  //     상속 15억, 자녀 없음
  //     기초 2억 < 일괄 5억 → 일괄 선택
  //     과표 = 15억 - 5억 = 10억
  //     세율 구간: 5억~10억 = 30%, 누진공제 6천만
  //     세금 = 30% × 10억 - 6천만 = 3억 - 6천만 = 2.4억
  // ─────────────────────────────────────────────
  it('과표 10억 경계값 (30% 구간)', () => {
    const input: InheritanceInput = {
      totalAssets: 1_500_000_000,
      funeralAndDebts: 0,
      hasSpouse: false,
      spouseInheritedAmount: 0,
      childrenCount: 0,
      minorChildrenCount: 0,
      minorChildrenAverageAgeYears: 0,
      deductionMode: 'auto',
      reportWithinDeadline: true,
    };

    const result = calculateInheritanceTax(input);

    expect(result.taxableAssets).toBe(1_500_000_000);
    expect(result.basicDeduction).toBe(200_000_000);
    expect(result.selectedMode).toBe('lumpSum');
    expect(result.effectiveDeduction).toBe(500_000_000);
    expect(result.taxableBase).toBe(1_000_000_000);
    // 과표 10억 → 30% × 10억 - 6천만 = 2.4억
    expect(result.grossTax).toBe(240_000_000);
  });

  // ─────────────────────────────────────────────
  // 17. 미성년 자녀 수 > 총 자녀 수 (안전 체크)
  // ─────────────────────────────────────────────
  it('미성년자 > 총 자녀 수 → 최소값 선택', () => {
    const input: InheritanceInput = {
      totalAssets: 1_000_000_000,
      funeralAndDebts: 0,
      hasSpouse: false,
      spouseInheritedAmount: 0,
      childrenCount: 1,
      minorChildrenCount: 5, // 자녀 1 > 미성년 5 (이상한 입력)
      minorChildrenAverageAgeYears: 10,
      deductionMode: 'auto',
      reportWithinDeadline: true,
    };

    const result = calculateInheritanceTax(input);

    // minorCount는 min(input.minorChildrenCount, input.childrenCount) = 1로 제한
    expect(result.minorDeduction).toBe(90_000_000);
    expect(result.childrenDeduction).toBe(50_000_000);
  });
});
