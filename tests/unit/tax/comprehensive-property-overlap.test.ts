/**
 * 종합부동산세 — 공제할 재산세액(재산세 중복분) TDD
 *
 * 근거 (law.go.kr, 2026-10-07 확인):
 *   종부세법 §9③ — 주택분 과세표준 금액에 대해 부과된 주택분 재산세는 종부세액에서 공제
 *   종부세법 §9⑤ — 1세대1주택 세액공제는 "제1항·제3항 및 제4항에 따라 산출된 세액"에 공제율을 곱한다
 *                   → 공제할 재산세액을 뺀 뒤의 금액이 세액공제 base
 *   종부세법 시행령 §4의3①
 *     공제할 재산세액 = 재산세 부과세액 합계
 *       × (종부세 과세표준 × 재산세 공정시장가액비율 × 재산세 표준세율)
 *       ÷ (주택을 합산해 재산세 표준세율로 계산한 재산세 상당액)
 *   지방세법 시행령 §109①2호 — 재산세 공정시장가액비율 60%, 2026년 1세대1주택 43/44/45%
 *                              (시가표준액 9억 초과 1세대1주택 포함)
 *   지방세법 §111①3호 — 주택 표준세율, 최고 구간 1천분의 4
 *
 * 분자 "× 표준세율" 해석 (2026-10-07 결정):
 *   종부세 과세표준은 공제금액을 넘는 '맨 위' 가액이라, 그에 대응하는 재산세는 최고 구간 1천분의 4로 계산한다
 *   (누진 구간을 0원부터 다시 적용하지 않는다).
 *   실제 고지액 대조: 공시 15억 1세대1주택(공제율 0)의 종부세는 2025년 약 69만 1천원(농특세 포함)으로 보도됐다.
 *   이 방식 = 691,200원으로 일치, 누진 재적용 방식 = 970,200원으로 불일치.
 *   2023년 같은 조건 종부세 58만원(농특세 제외) 보도도 576,000원으로 일치.
 *
 * 가정: 재산세 세부담 상한(지방세법 §122)·가감조정세율 미적용 → 분모 = 재산세 부과세액 합계
 *       → 공제할 재산세액 = 분자. 종부세 세부담 상한(§10)은 계산하지 않는다(페이지에 안내).
 *
 * 적용 순서: 산출세액(§9①) → 공제할 재산세액(§9③) → 1세대1주택 세액공제(§9⑤⑥⑧) → 농특세 20%
 * 금액은 10원 단위 절사(기존 코드 규칙).
 */

import { describe, it, expect } from 'vitest';
import {
  calculateComprehensivePropertyTax,
  calculatePropertyTaxOverlapCredit,
  type ComprehensivePropertyTaxInput,
} from '@/lib/tax/comprehensive-property';

describe('공제할 재산세액 calculatePropertyTaxOverlapCredit (종부세법 §9③, 시행령 §4의3)', () => {
  it('공시 12억 1세대1주택: 종부세 과세표준 0 → 0원', () => {
    expect(
      calculatePropertyTaxOverlapCredit({
        totalPublishedPrice: 1_200_000_000,
        basicDeduction: 1_200_000_000,
        isOneHouseholdOneHouse: true,
      }),
    ).toBe(0);
  });

  // 과세표준 (15억 − 12억) × 60% = 1.8억 → × 45% = 8,100만 → × 0.4% = 324,000
  it('공시 15억 1세대1주택 → 324,000원 (재산세 공정시장가액비율 45%)', () => {
    expect(
      calculatePropertyTaxOverlapCredit({
        totalPublishedPrice: 1_500_000_000,
        basicDeduction: 1_200_000_000,
        isOneHouseholdOneHouse: true,
      }),
    ).toBe(324_000);
  });

  // 과세표준 (20억 − 12억) × 60% = 4.8억 → × 45% = 2.16억 → × 0.4% = 864,000
  it('공시 20억 1세대1주택 → 864,000원', () => {
    expect(
      calculatePropertyTaxOverlapCredit({
        totalPublishedPrice: 2_000_000_000,
        basicDeduction: 1_200_000_000,
        isOneHouseholdOneHouse: true,
      }),
    ).toBe(864_000);
  });

  // 과세표준 (15억 − 9억) × 60% = 3.6억 → × 60% = 2.16억 → × 0.4% = 864,000
  it('공시 합계 15억 2주택 → 864,000원 (재산세 공정시장가액비율 60%)', () => {
    expect(
      calculatePropertyTaxOverlapCredit({
        totalPublishedPrice: 1_500_000_000,
        basicDeduction: 900_000_000,
        isOneHouseholdOneHouse: false,
      }),
    ).toBe(864_000);
  });

  // 과세표준 (30억 − 9억) × 60% = 12.6억 → × 60% = 7.56억 → × 0.4% = 3,024,000
  it('공시 합계 30억 3주택 → 3,024,000원', () => {
    expect(
      calculatePropertyTaxOverlapCredit({
        totalPublishedPrice: 3_000_000_000,
        basicDeduction: 900_000_000,
        isOneHouseholdOneHouse: false,
      }),
    ).toBe(3_024_000);
  });
});

describe('calculateComprehensivePropertyTax: 공제할 재산세액 반영', () => {
  const base = (over: Partial<ComprehensivePropertyTaxInput>): ComprehensivePropertyTaxInput => ({
    houseCount: 'one',
    totalPublishedPrice: 1_500_000_000,
    isOneHouseholdOneHouse: true,
    seniorAgeYears: 55,
    holdingYears: 3,
    ...over,
  });

  // 산출 1.8억 × 0.5% = 900,000 − 324,000 = 576,000, 농특세 115,200 → 691,200 (2025 보도 약 69만 1천원과 일치)
  it('공시 15억 1세대1주택(공제율 0) → 총 691,200원', () => {
    const r = calculateComprehensivePropertyTax(base({}));
    expect(r.grossTax).toBe(900_000);
    expect(r.propertyTaxCredit).toBe(324_000);
    expect(r.creditAmount).toBe(0);
    expect(r.netTax).toBe(576_000);
    expect(r.ruralSpecialTax).toBe(115_200);
    expect(r.totalTax).toBe(691_200);
  });

  // 산출 4.8억 × 0.7% − 60만 = 2,760,000 − 864,000 = 1,896,000
  // 세액공제 80% (70세 40% + 15년 50%, 한도 80%) = 1,516,800 → 순세액 379,200, 농특세 75,840
  it('공시 20억 1세대1주택, 70세·15년 보유 → 세액공제는 재산세 공제 후 금액에 적용', () => {
    const r = calculateComprehensivePropertyTax(
      base({ totalPublishedPrice: 2_000_000_000, seniorAgeYears: 70, holdingYears: 15 }),
    );
    expect(r.grossTax).toBe(2_760_000);
    expect(r.propertyTaxCredit).toBe(864_000);
    expect(r.totalCreditRate).toBe(0.8);
    expect(r.creditAmount).toBe(1_516_800);
    expect(r.netTax).toBe(379_200);
    expect(r.ruralSpecialTax).toBe(75_840);
    expect(r.totalTax).toBe(455_040);
  });

  // 산출 3.6억 × 0.7% − 60만 = 1,920,000 − 864,000 = 1,056,000, 농특세 211,200
  it('공시 합계 15억 2주택 → 총 1,267,200원', () => {
    const r = calculateComprehensivePropertyTax(
      base({ houseCount: 'two', isOneHouseholdOneHouse: false }),
    );
    expect(r.grossTax).toBe(1_920_000);
    expect(r.propertyTaxCredit).toBe(864_000);
    expect(r.netTax).toBe(1_056_000);
    expect(r.ruralSpecialTax).toBe(211_200);
    expect(r.totalTax).toBe(1_267_200);
  });

  // 중과 12.6억 × 2.0% − 1,440만 = 10,800,000 − 3,024,000 = 7,776,000, 농특세 1,555,200
  it('공시 합계 30억 3주택 → 총 9,331,200원', () => {
    const r = calculateComprehensivePropertyTax(
      base({ houseCount: 'threeOrMore', isOneHouseholdOneHouse: false, totalPublishedPrice: 3_000_000_000 }),
    );
    expect(r.grossTax).toBe(10_800_000);
    expect(r.propertyTaxCredit).toBe(3_024_000);
    expect(r.netTax).toBe(7_776_000);
    expect(r.totalTax).toBe(9_331_200);
  });

  it('공시 12억 1세대1주택 경계 → 모두 0원', () => {
    const r = calculateComprehensivePropertyTax(base({ totalPublishedPrice: 1_200_000_000 }));
    expect(r.grossTax).toBe(0);
    expect(r.propertyTaxCredit).toBe(0);
    expect(r.totalTax).toBe(0);
  });

  // 산출 6,000만 × 0.5% = 300,000 − 108,000(6,000만 × 45% × 0.4%) = 192,000, 농특세 38,400
  it('공시 13억 1세대1주택 → 총 230,400원', () => {
    const r = calculateComprehensivePropertyTax(base({ totalPublishedPrice: 1_300_000_000 }));
    expect(r.grossTax).toBe(300_000);
    expect(r.propertyTaxCredit).toBe(108_000);
    expect(r.netTax).toBe(192_000);
    expect(r.totalTax).toBe(230_400);
  });
});
