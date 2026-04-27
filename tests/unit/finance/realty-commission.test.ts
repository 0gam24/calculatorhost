/**
 * 부동산 중개수수료 계산 단위 테스트
 *
 * 경계값 + 일반 케이스 + 특례 케이스 + 협의 요율 커버
 * 명세: docs/calculator-spec/중개수수료.md §8
 */

import { describe, expect, it } from 'vitest';
import {
  calculateRealtyCommission,
  type CommissionInput,
} from '@/lib/finance/realty-commission';

// ============================================
// 헬퍼: 입력값 생성
// ============================================

function createInput(overrides: Partial<CommissionInput>): CommissionInput {
  return {
    transactionType: 'sale',
    propertyKind: 'house',
    salePrice: 500_000_000,
    includeVat: false,
    ...overrides,
  };
}

// ============================================
// 테스트 1-5: 주택 매매 기본 케이스 + 경계값
// ============================================

describe('calculateRealtyCommission — 주택 매매', () => {
  it('매매 5억 주택 → 0.4% = 200만', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'sale',
        propertyKind: 'house',
        salePrice: 500_000_000,
      })
    );

    expect(result.transactionAmount).toBe(500_000_000);
    expect(result.appliedRate).toBe(0.004);
    expect(result.limit).toBeNull();
    expect(result.maxCommission).toBe(2_000_000); // 5억 × 0.4%
    expect(result.negotiatedCommission).toBeNull();
    expect(result.vat).toBe(0);
    expect(result.total).toBe(2_000_000);
    expect(result.bothSideTotal).toBe(4_000_000);
    expect(result.warnings).toHaveLength(0);
  });

  it('매매 9억 경계 (정확히 9억) → 0.4% 구간 (경계값 이하)', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'sale',
        propertyKind: 'house',
        salePrice: 900_000_000,
      })
    );

    expect(result.transactionAmount).toBe(900_000_000);
    expect(result.appliedRate).toBe(0.004); // 2억~9억: 0.4%
    expect(result.maxCommission).toBe(3_600_000); // 9억 × 0.4%
  });

  it('매매 9억 초과 (9억 1만) → 0.5% 구간으로 전환', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'sale',
        propertyKind: 'house',
        salePrice: 900_100_000,
      })
    );

    expect(result.appliedRate).toBe(0.005); // 9억~12억: 0.5%
    expect(result.maxCommission).toBe(4_500_500); // 9억 1만 × 0.5%
  });

  it('매매 15억 1원 주택 → 0.7% = 1,050만 (15억 초과 구간)', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'sale',
        propertyKind: 'house',
        salePrice: 1_500_000_001,
      })
    );

    expect(result.appliedRate).toBe(0.007); // 15억 초과: 0.7%
    expect(result.maxCommission).toBe(10_500_000); // 1500000001 × 0.7% = 10500000.007 → 10500000
  });

  it('매매 5천만 경계 한도액 25만 적용', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'sale',
        propertyKind: 'house',
        salePrice: 50_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.006); // ~5천만: 0.6%
    expect(result.limit).toBe(250_000);
    const gross = 50_000_000 * 0.006; // 30만
    expect(result.maxCommission).toBe(Math.min(gross, 250_000)); // 30만
  });

  it('매매 4천만 소액 → 0.6% 한도 25만 적용 확인', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'sale',
        propertyKind: 'house',
        salePrice: 40_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.006);
    expect(result.limit).toBe(250_000);
    const gross = Math.floor((40_000_000 * 0.006) / 10) * 10; // 40000000 × 0.6% = 240000 → 10원 단위 절사 = 240000
    expect(result.maxCommission).toBe(240_000); // 한도 25만보다 커서 한도 적용
  });

  it('매매 5천만~2억 구간: 150만원 → 0.5% 한도 80만', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'sale',
        propertyKind: 'house',
        salePrice: 150_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.005);
    expect(result.limit).toBe(800_000);
    expect(result.maxCommission).toBe(750_000); // 1.5억 × 0.5%
  });

  it('매매 2억 경계 (정확히 2억) → 0.5% 구간 유지', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'sale',
        propertyKind: 'house',
        salePrice: 200_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.005); // 경계값 ≤ 인 경우 해당 구간
    expect(result.limit).toBe(800_000);
  });
});

// ============================================
// 테스트 6-8: 주택 전세 및 월세
// ============================================

describe('calculateRealtyCommission — 주택 임대차', () => {
  it('전세 3억 → 0.3% = 90만', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'jeonse',
        propertyKind: 'house',
        salePrice: 300_000_000,
      })
    );

    expect(result.transactionAmount).toBe(300_000_000);
    expect(result.appliedRate).toBe(0.003); // 1억~6억: 0.3%
    expect(result.limit).toBeNull();
    expect(result.maxCommission).toBe(900_000);
  });

  it('전세 12억 → 0.4% = 480만', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'jeonse',
        propertyKind: 'house',
        salePrice: 1_200_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.004); // 6억~12억: 0.4%
    expect(result.maxCommission).toBe(4_800_000);
  });

  it('월세 보증금 1000만 월세 50만 → 거래금액 6000만 (5천만 이상 100배 적용)', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'monthly',
        propertyKind: 'house',
        deposit: 10_000_000,
        monthlyRent: 500_000,
      })
    );

    // baseHigh = 1000만 + 50만 × 100 = 6000만 >= 5000만 → 6000만 적용
    expect(result.transactionAmount).toBe(60_000_000);
    expect(result.appliedRate).toBe(0.004); // 5천만 초과~1억: 0.4%
    expect(result.limit).toBe(300_000);
    expect(result.maxCommission).toBe(240_000); // 6000만 × 0.4% = 240만, 한도 30만 초과이므로 240만
  });

  it('월세 보증금 100만 월세 30만 → 거래금액 2200만 (5천만 미만 70배 적용)', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'monthly',
        propertyKind: 'house',
        deposit: 1_000_000,
        monthlyRent: 300_000,
      })
    );

    // baseHigh = 100만 + 30만 × 100 = 3100만 < 5000만
    // → 100만 + 30만 × 70 = 2200만 적용
    expect(result.transactionAmount).toBe(22_000_000);
    expect(result.appliedRate).toBe(0.005); // ~5천만: 0.5%
    expect(result.limit).toBe(200_000);
    expect(result.maxCommission).toBe(110_000); // 2200만 × 0.5% = 11만, 한도 20만 이상
  });

  it('월세 거래금액 정확히 5000만 경계 (= 이상 100배)', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'monthly',
        propertyKind: 'house',
        deposit: 0,
        monthlyRent: 500_000,
      })
    );

    // baseHigh = 0 + 50만 × 100 = 5000만 >= 5000만 → 100배 적용
    expect(result.transactionAmount).toBe(50_000_000);
    expect(result.appliedRate).toBe(0.005); // ~5천만: 0.5%
  });
});

// ============================================
// 테스트 9-10: 오피스텔 및 기타
// ============================================

describe('calculateRealtyCommission — 오피스텔 및 기타', () => {
  it('오피스텔 주거용 매매 3억 → 고정 0.5% = 150만 (한도 없음)', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'sale',
        propertyKind: 'officetel',
        salePrice: 300_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.005);
    expect(result.limit).toBeNull();
    expect(result.maxCommission).toBe(1_500_000);
  });

  it('오피스텔 주거용 전세 3억 → 고정 0.4% = 120만', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'jeonse',
        propertyKind: 'officetel',
        salePrice: 300_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.004);
    expect(result.maxCommission).toBe(1_200_000);
  });

  it('그 외(상가) 5억 협의요율 미입력 → 0.9% 상한 + warning', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'sale',
        propertyKind: 'other',
        salePrice: 500_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.009);
    expect(result.limit).toBeNull();
    expect(result.maxCommission).toBe(4_500_000); // 5억 × 0.9%
    expect(result.negotiatedCommission).toBeNull();
    expect(result.warnings).toContain(
      '협의 요율이 없어서 법정 상한 0.9%를 적용했습니다'
    );
  });

  it('그 외(상가) 5억 협의요율 0.5% → 0.5% 사용 (한도 없으므로 250만)', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'sale',
        propertyKind: 'other',
        salePrice: 500_000_000,
        negotiatedRate: 0.005,
      })
    );

    expect(result.maxCommission).toBe(4_500_000); // 상한 0.9%
    expect(result.negotiatedCommission).toBe(2_500_000); // 5억 × 0.5%
    expect(result.warnings).toHaveLength(0);
  });

  it('기타 물건 협의요율이 상한 초과 → 상한 적용 + warning', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'sale',
        propertyKind: 'other',
        salePrice: 500_000_000,
        negotiatedRate: 0.011, // 1.1% > 0.9%
      })
    );

    expect(result.negotiatedCommission).toBe(4_500_000); // 상한 0.9% 적용
    expect(result.warnings.some((w) => w.includes('초과'))).toBe(true);
  });
});

// ============================================
// 테스트 11-14: 부가세 및 양측 합계
// ============================================

describe('calculateRealtyCommission — 부가세 및 양측', () => {
  it('부가세 10% 포함 시 총액에 VAT 10% (10원 단위 절사)', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'sale',
        propertyKind: 'house',
        salePrice: 500_000_000,
        includeVat: true,
      })
    );

    const baseCommission = 2_000_000; // 5억 × 0.4%
    const expectedVat = Math.floor((baseCommission * 0.1) / 10) * 10; // 20만
    expect(result.vat).toBe(expectedVat);
    expect(result.total).toBe(baseCommission + expectedVat);
  });

  it('협의요율 반영 후 부가세 계산 (협의요율 기준으로 계산)', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'sale',
        propertyKind: 'house',
        salePrice: 500_000_000,
        negotiatedRate: 0.003,
        includeVat: true,
      })
    );

    const negotiatedCommission = 1_500_000; // 5억 × 0.3%
    const expectedVat = Math.floor((negotiatedCommission * 0.1) / 10) * 10; // 15만
    expect(result.negotiatedCommission).toBe(negotiatedCommission);
    expect(result.vat).toBe(expectedVat);
    expect(result.total).toBe(negotiatedCommission + expectedVat);
  });

  it('양측 합계 = 총액 × 2 (매도자+매수자)', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'sale',
        propertyKind: 'house',
        salePrice: 500_000_000,
        includeVat: false,
      })
    );

    expect(result.bothSideTotal).toBe(result.total * 2);
  });

  it('협의요율 적용 시에도 양측 합계 정확성', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'sale',
        propertyKind: 'house',
        salePrice: 500_000_000,
        negotiatedRate: 0.002,
        includeVat: true,
      })
    );

    const expectedTotal =
      1_000_000 + Math.floor((1_000_000 * 0.1) / 10) * 10;
    expect(result.bothSideTotal).toBe(expectedTotal * 2);
  });
});

// ============================================
// 테스트 15: 협의요율 경계 및 예외
// ============================================

describe('calculateRealtyCommission — 협의요율 처리', () => {
  it('협의요율 0원 이하 입력 시 무시 (null 처리)', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'sale',
        propertyKind: 'house',
        salePrice: 500_000_000,
        negotiatedRate: 0,
      })
    );

    expect(result.negotiatedCommission).toBeNull();
    expect(result.total).toBe(result.maxCommission);
  });

  it('협의요율 상한과 정확히 같을 때 → 협의요율 적용', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'sale',
        propertyKind: 'house',
        salePrice: 500_000_000,
        negotiatedRate: 0.004, // 정확히 상한 0.4%
      })
    );

    expect(result.negotiatedCommission).toBe(2_000_000);
    expect(result.warnings).toHaveLength(0);
  });

  it('협의요율 미세한 차이 초과 → 상한 적용', () => {
    const result = calculateRealtyCommission(
      createInput({
        transactionType: 'sale',
        propertyKind: 'house',
        salePrice: 500_000_000,
        negotiatedRate: 0.0041, // 0.4% 보다 미세히 높음
      })
    );

    expect(result.negotiatedCommission).toBe(2_000_000); // 상한 0.4% 적용
    expect(result.warnings.some((w) => w.includes('초과'))).toBe(true);
  });
});

// ============================================
// 테스트 16-18: 입력 검증
// ============================================

describe('calculateRealtyCommission — 입력 검증', () => {
  it('매매 음수 매매가 입력 → 에러', () => {
    expect(() => {
      calculateRealtyCommission(
        createInput({
          transactionType: 'sale',
          salePrice: -100_000_000,
        })
      );
    }).toThrow('매매가는 0 이상');
  });

  it('월세 보증금 음수 → 에러', () => {
    expect(() => {
      calculateRealtyCommission(
        createInput({
          transactionType: 'monthly',
          propertyKind: 'house',
          deposit: -1_000_000,
          monthlyRent: 500_000,
        })
      );
    }).toThrow();
  });

  it('월세 월세 미입력 → 에러', () => {
    expect(() => {
      calculateRealtyCommission({
        transactionType: 'monthly',
        propertyKind: 'house',
        deposit: 1_000_000,
        includeVat: false,
      });
    }).toThrow();
  });
});

// ============================================
// 테스트 19-21: 경계값 정밀성
// ============================================

describe('calculateRealtyCommission — 구간 경계값 정밀성', () => {
  it('주택 매매 2억~9억 경계 정확히 2억: 0.5%에서 0.4%로 변경', () => {
    const atBoundary = calculateRealtyCommission(
      createInput({
        transactionType: 'sale',
        propertyKind: 'house',
        salePrice: 200_000_001,
      })
    );

    expect(atBoundary.appliedRate).toBe(0.004); // 2억 초과는 0.4% 구간
  });

  it('주택 전세 1억 경계값 정확성: 0.4%→0.3%', () => {
    const atBoundary = calculateRealtyCommission(
      createInput({
        transactionType: 'jeonse',
        propertyKind: 'house',
        salePrice: 100_000_000,
      })
    );

    expect(atBoundary.appliedRate).toBe(0.004); // 5천만~1억: 0.4%

    const above = calculateRealtyCommission(
      createInput({
        transactionType: 'jeonse',
        propertyKind: 'house',
        salePrice: 100_000_001,
      })
    );

    expect(above.appliedRate).toBe(0.003); // 1억 초과: 0.3%
  });

  it('12억~15억 경계값: 0.5%→0.6%', () => {
    const atBoundary = calculateRealtyCommission(
      createInput({
        transactionType: 'sale',
        propertyKind: 'house',
        salePrice: 1_200_000_000,
      })
    );

    expect(atBoundary.appliedRate).toBe(0.005); // 9억~12억: 0.5%

    const above = calculateRealtyCommission(
      createInput({
        transactionType: 'sale',
        propertyKind: 'house',
        salePrice: 1_200_000_001,
      })
    );

    expect(above.appliedRate).toBe(0.006); // 12억~15억: 0.6%
  });
});
