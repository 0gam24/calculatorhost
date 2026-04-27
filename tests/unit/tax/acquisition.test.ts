/**
 * 취득세 계산 단위 테스트
 *
 * 경계값 + 일반 케이스 + 특례 케이스 커버
 * 명세: docs/calculator-spec/취득세.md §7
 */

import { describe, expect, it } from 'vitest';
import {
  calculateAcquisitionTax,
  type AcquisitionTaxInput,
} from '@/lib/tax/acquisition';

// ============================================
// 헬퍼: 입력값 생성
// ============================================

function createInput(overrides: Partial<AcquisitionTaxInput>): AcquisitionTaxInput {
  return {
    method: 'purchase',
    target: 'residential',
    houseCount: 1,
    areaOver85: false,
    adjustedArea: false,
    acquisitionPrice: 600_000_000,
    firstHomeBuyerDiscount: false,
    ...overrides,
  };
}

// ============================================
// 메인 세율 테스트: 매매 (Purchase)
// ============================================

describe('calculateAcquisitionTax — 매매 주택', () => {
  it('1주택 85㎡ 이하 6억 (1.0%)', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 1,
        areaOver85: false,
        acquisitionPrice: 600_000_000,
      })
    );

    expect(result.taxBase).toBe(600_000_000);
    expect(result.appliedRate).toBe(0.01);
    expect(result.acquisitionTax).toBe(6_000_000); // 6억 × 1%
    expect(result.specialRuralTax).toBe(0); // 85㎡ 이하
    expect(result.localEducationTax).toBe(600_000); // 6백만 × 10%
    expect(result.totalPayment).toBe(6_600_000);
    expect(result.discountAmount).toBe(0);
  });

  it('1주택 85㎡ 초과 10억 (3.0% + 농특세 0.2%)', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 1,
        areaOver85: true,
        acquisitionPrice: 1_000_000_000,
      })
    );

    expect(result.taxBase).toBe(1_000_000_000);
    expect(result.appliedRate).toBe(0.03);
    expect(result.acquisitionTax).toBe(30_000_000); // 10억 × 3%
    expect(result.specialRuralTax).toBe(2_000_000); // 10억 × 0.2%
    expect(result.localEducationTax).toBe(3_000_000); // 3천만 × 10%
    expect(result.totalPayment).toBe(35_000_000);
  });

  it('1주택 6억~9억 경계 정확성: 7.5억', () => {
    // 공식: (7.5억 × 2 / 3억 - 3) / 100 = (5 - 3) / 100 = 0.02 = 2.0%
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 1,
        areaOver85: false,
        acquisitionPrice: 750_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.02); // 2.0% 정확히
    expect(result.acquisitionTax).toBe(15_000_000); // 7.5억 × 2%
  });

  it('1주택 6억 정확히 (1.0% 경계)', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 1,
        areaOver85: false,
        acquisitionPrice: 600_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.01);
    expect(result.acquisitionTax).toBe(6_000_000);
  });

  it('1주택 9억 정확히 (3.0% 경계)', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 1,
        areaOver85: false,
        acquisitionPrice: 900_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.03);
    expect(result.acquisitionTax).toBe(27_000_000); // 9억 × 3%
  });

  it('2주택 비조정지역 (기본 1.0%)', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 2,
        adjustedArea: false,
        areaOver85: false,
        acquisitionPrice: 700_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.01);
    expect(result.acquisitionTax).toBe(7_000_000);
  });

  it('2주택 조정지역 (8.0% 중과)', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 2,
        adjustedArea: true,
        areaOver85: false,
        acquisitionPrice: 800_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.08);
    expect(result.acquisitionTax).toBe(64_000_000); // 8억 × 8%
  });

  it('3주택 조정지역 (12.0% 중과)', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 3,
        adjustedArea: true,
        areaOver85: false,
        acquisitionPrice: 800_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.12);
    expect(result.acquisitionTax).toBe(96_000_000); // 8억 × 12%
  });

  it('3주택 비조정지역 (12.0% 중과)', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 3,
        adjustedArea: false,
        areaOver85: false,
        acquisitionPrice: 800_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.12);
    expect(result.acquisitionTax).toBe(96_000_000); // 8억 × 12%
  });

  it('4주택 이상 비조정지역 (12.0% 중과)', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 4,
        adjustedArea: false,
        areaOver85: false,
        acquisitionPrice: 1_000_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.12);
    expect(result.acquisitionTax).toBe(120_000_000);
  });

  it('2주택 조정지역 85㎡ 초과 (농특세 0.2%)', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 2,
        adjustedArea: true,
        areaOver85: true,
        acquisitionPrice: 1_000_000_000,
      })
    );

    expect(result.acquisitionTax).toBe(80_000_000); // 10억 × 8%
    expect(result.specialRuralTax).toBe(2_000_000); // 10억 × 0.2% (일반)
    expect(result.localEducationTax).toBe(8_000_000); // 8천만 × 10%
    expect(result.totalPayment).toBe(90_000_000);
  });

  it('3주택 조정지역 85㎡ 초과 (농특세 1.0% 중과)', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 3,
        adjustedArea: true,
        areaOver85: true,
        acquisitionPrice: 1_000_000_000,
      })
    );

    expect(result.acquisitionTax).toBe(120_000_000); // 10억 × 12%
    expect(result.specialRuralTax).toBe(10_000_000); // 10억 × 1.0% (중과)
    expect(result.localEducationTax).toBe(12_000_000); // 1.2억 × 10%
    expect(result.totalPayment).toBe(142_000_000);
  });
});

// ============================================
// 증여 취득세
// ============================================

describe('calculateAcquisitionTax — 증여', () => {
  it('증여 기본 (3.5%)', () => {
    const result = calculateAcquisitionTax(
      createInput({
        method: 'gift',
        houseCount: 1,
        adjustedArea: false,
        acquisitionPrice: 500_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.035);
    expect(result.acquisitionTax).toBe(17_500_000); // 5억 × 3.5%
  });

  it('증여 + 조정지역 + 3주택 중과 (12.0%)', () => {
    const result = calculateAcquisitionTax(
      createInput({
        method: 'gift',
        houseCount: 3,
        adjustedArea: true,
        acquisitionPrice: 500_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.12);
    expect(result.acquisitionTax).toBe(60_000_000); // 5억 × 12%
  });
});

// ============================================
// 상속 취득세
// ============================================

describe('calculateAcquisitionTax — 상속', () => {
  it('상속 기본 (2.8%)', () => {
    const result = calculateAcquisitionTax(
      createInput({
        method: 'inheritance',
        houseCount: 1,
        acquisitionPrice: 1_000_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.028);
    expect(result.acquisitionTax).toBe(28_000_000); // 10억 × 2.8%
  });

  it('상속은 조정지역/주택수 중과 미적용', () => {
    const result = calculateAcquisitionTax(
      createInput({
        method: 'inheritance',
        houseCount: 3,
        adjustedArea: true,
        acquisitionPrice: 1_000_000_000,
      })
    );

    // 상속은 항상 기본 2.8%
    expect(result.appliedRate).toBe(0.028);
    expect(result.acquisitionTax).toBe(28_000_000);
  });
});

// ============================================
// 생애최초 감면
// ============================================

describe('calculateAcquisitionTax — 생애최초 감면', () => {
  it('생애최초 감면 200만 한도 (취득세 > 200만)', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 1,
        areaOver85: false,
        acquisitionPrice: 1_000_000_000, // 10억 × 3% = 3천만
        firstHomeBuyerDiscount: true,
      })
    );

    expect(result.acquisitionTax).toBe(30_000_000 - 2_000_000); // 2천만 (200만 감면)
    expect(result.discountAmount).toBe(2_000_000);
  });

  it('생애최초 감면 전액 (취득세 < 200만)', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 1,
        areaOver85: false,
        acquisitionPrice: 100_000_000, // 1억 × 1% = 1백만 < 200만
        firstHomeBuyerDiscount: true,
      })
    );

    expect(result.acquisitionTax).toBe(0); // 100만 - 100만 = 0
    expect(result.discountAmount).toBe(1_000_000);
  });

  it('생애최초 감면 미적용 시', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 1,
        areaOver85: false,
        acquisitionPrice: 1_000_000_000,
        firstHomeBuyerDiscount: false,
      })
    );

    expect(result.discountAmount).toBe(0);
    expect(result.acquisitionTax).toBe(30_000_000);
  });
});

// ============================================
// 10원 단위 절사 검증
// ============================================

describe('calculateAcquisitionTax — 반올림 규칙 (10원 단위)', () => {
  it('취득세 10원 단위 절사', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 1,
        areaOver85: false,
        acquisitionPrice: 123_456_789, // 1.23억 × 1% = 123만 4567.89 → 123만 4560 (10원 절사)
      })
    );

    expect(result.acquisitionTax).toBe(1_234_560); // 절사됨
    expect(result.acquisitionTax % 10).toBe(0); // 10의 배수 확인
  });

  it('농특세 10원 단위 절사', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 1,
        areaOver85: true,
        acquisitionPrice: 123_456_789,
      })
    );

    expect(result.specialRuralTax % 10).toBe(0);
  });

  it('지방교육세 10원 단위 절사', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 1,
        areaOver85: false,
        acquisitionPrice: 123_456_789,
      })
    );

    expect(result.localEducationTax % 10).toBe(0);
  });
});

// ============================================
// 극단 케이스
// ============================================

describe('calculateAcquisitionTax — 극단 케이스', () => {
  it('취득가 0원', () => {
    const result = calculateAcquisitionTax(
      createInput({
        acquisitionPrice: 0,
      })
    );

    expect(result.taxBase).toBe(0);
    expect(result.acquisitionTax).toBe(0);
    expect(result.totalPayment).toBe(0);
  });

  it('고가 (100억)', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 1,
        acquisitionPrice: 10_000_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.03); // 9억 초과이므로 3.0%
    expect(result.acquisitionTax).toBe(300_000_000);
  });

  it('미지원 대상: 농지', () => {
    const result = calculateAcquisitionTax(
      createInput({
        target: 'farmland',
        acquisitionPrice: 500_000_000,
      })
    );

    expect(result.acquisitionTax).toBe(0);
    expect(result.note).toContain('전문가 상담');
  });

  it('미지원 취득방법: 원시취득', () => {
    const result = calculateAcquisitionTax(
      createInput({
        method: 'primitive',
        acquisitionPrice: 500_000_000,
      })
    );

    expect(result.acquisitionTax).toBe(0);
    expect(result.note).toContain('전문가 상담');
  });
});

// ============================================
// 통합 시나리오 (명세 §7)
// ============================================

describe('calculateAcquisitionTax — 명세 테스트 케이스 (§7)', () => {
  it('케이스 1: 1주택 85㎡ 이하 6억', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 1,
        areaOver85: false,
        acquisitionPrice: 600_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.01);
    expect(result.acquisitionTax).toBe(6_000_000);
    expect(result.specialRuralTax).toBe(0);
  });

  it('케이스 2: 1주택 85㎡ 초과 10억', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 1,
        areaOver85: true,
        acquisitionPrice: 1_000_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.03);
    expect(result.acquisitionTax).toBe(30_000_000);
    expect(result.specialRuralTax).toBe(2_000_000);
  });

  it('케이스 3: 2주택 조정지역 8억', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 2,
        adjustedArea: true,
        areaOver85: false,
        acquisitionPrice: 800_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.08);
    expect(result.acquisitionTax).toBe(64_000_000);
  });

  it('케이스 4: 3주택 조정지역 8억', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 3,
        adjustedArea: true,
        areaOver85: false,
        acquisitionPrice: 800_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.12);
    expect(result.acquisitionTax).toBe(96_000_000);
  });

  it('케이스 5: 증여 시 시가표준액 기준', () => {
    const result = calculateAcquisitionTax(
      createInput({
        method: 'gift',
        houseCount: 1,
        adjustedArea: false,
        acquisitionPrice: 500_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.035);
    expect(result.acquisitionTax).toBe(17_500_000);
  });

  it('케이스 6: 상속 시 기본 세율', () => {
    const result = calculateAcquisitionTax(
      createInput({
        method: 'inheritance',
        houseCount: 1,
        acquisitionPrice: 500_000_000,
      })
    );

    expect(result.appliedRate).toBe(0.028);
    expect(result.acquisitionTax).toBe(14_000_000);
  });

  it('케이스 7: 생애최초 감면 200만 한도', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 1,
        areaOver85: false,
        acquisitionPrice: 1_000_000_000,
        firstHomeBuyerDiscount: true,
      })
    );

    expect(result.discountAmount).toBe(2_000_000);
    expect(result.acquisitionTax).toBe(30_000_000 - 2_000_000);
  });
});

// ============================================
// 지방교육세 및 농특세 조합
// ============================================

describe('calculateAcquisitionTax — 지방교육세 + 농특세 조합', () => {
  it('지방교육세는 감면 후 취득세 기준', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 1,
        areaOver85: false,
        acquisitionPrice: 1_000_000_000,
        firstHomeBuyerDiscount: true,
      })
    );

    // 취득세: 3천만 - 200만 = 2800만
    // 지교세: 2800만 × 10% = 280만
    expect(result.acquisitionTax).toBe(28_000_000);
    expect(result.localEducationTax).toBe(2_800_000);
  });

  it('85㎡ 초과 + 중과 시 농특세 1.0%', () => {
    const result = calculateAcquisitionTax(
      createInput({
        houseCount: 3,
        adjustedArea: true,
        areaOver85: true,
        acquisitionPrice: 1_000_000_000,
      })
    );

    // 농특세: 10억 × 1.0% = 1천만 (중과)
    expect(result.specialRuralTax).toBe(10_000_000);
  });
});
