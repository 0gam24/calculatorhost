/**
 * 재산세 계산 단위 테스트
 *
 * 경계값 + 특례 조건 + 극단 케이스 커버
 * 명세: docs/calculator-spec/재산세.md §8
 */

import { describe, expect, it } from 'vitest';
import {
  calculateTaxBase,
  selectPropertyTaxBrackets,
  calculatePropertyTax,
  calculateUrbanAreaTax,
  calculateLocalEducationTax,
  splitInstallments,
  calculatePropertyTaxTotal,
} from '@/lib/tax/property';
import {
  PROPERTY_TAX_BRACKETS_GENERAL,
  PROPERTY_TAX_BRACKETS_ONE_HOUSE,
} from '@/lib/constants/tax-rates-2026';

describe('calculateTaxBase', () => {
  it('공시 3억 → 과표 1.8억 (60%)', () => {
    expect(calculateTaxBase(300_000_000)).toBe(180_000_000);
  });

  it('공시 0 → 과표 0', () => {
    expect(calculateTaxBase(0)).toBe(0);
  });

  it('공시 1억 → 과표 6000만', () => {
    expect(calculateTaxBase(100_000_000)).toBe(60_000_000);
  });
});

describe('selectPropertyTaxBrackets', () => {
  it('1세대1주택 O, 공시 9억 이하 → oneHouseSpecial', () => {
    const result = selectPropertyTaxBrackets({
      publishedPrice: 900_000_000,
      oneHouseholdOneHouse: true,
      urbanArea: false,
    });
    expect(result).toBe('oneHouseSpecial');
  });

  it('1세대1주택 O, 공시 9억 초과 → general', () => {
    const result = selectPropertyTaxBrackets({
      publishedPrice: 950_000_000,
      oneHouseholdOneHouse: true,
      urbanArea: false,
    });
    expect(result).toBe('general');
  });

  it('1세대1주택 X → general', () => {
    const result = selectPropertyTaxBrackets({
      publishedPrice: 500_000_000,
      oneHouseholdOneHouse: false,
      urbanArea: false,
    });
    expect(result).toBe('general');
  });
});

describe('calculatePropertyTax', () => {
  it('일반 과표 6000만 → 0.1% − 0 = 6만', () => {
    // 6000만 × 0.1% - 0 = 60,000
    const tax = calculatePropertyTax(60_000_000, PROPERTY_TAX_BRACKETS_GENERAL);
    expect(tax).toBe(60_000);
  });

  it('일반 과표 1.8억 → 0.25% − 18만 = 27만', () => {
    // 1.8억 × 0.25% - 18만 = 45만 - 18만 = 27만
    const tax = calculatePropertyTax(180_000_000, PROPERTY_TAX_BRACKETS_GENERAL);
    expect(tax).toBe(270_000);
  });

  it('일반 과표 3억 경계 → 0.25% − 18만 = 57만', () => {
    // 3억 × 0.25% - 18만 = 75만 - 18만 = 57만
    const tax = calculatePropertyTax(300_000_000, PROPERTY_TAX_BRACKETS_GENERAL);
    expect(tax).toBe(570_000);
  });

  it('일반 과표 3억 초과 → 0.4% − 63만', () => {
    // 3.5억 × 0.4% - 63만 = 140만 - 63만 = 77만
    const tax = calculatePropertyTax(350_000_000, PROPERTY_TAX_BRACKETS_GENERAL);
    expect(tax).toBe(770_000);
  });

  it('1세대1주택 특례 과표 6000만 → 0.05% = 3만', () => {
    // 6000만 × 0.05% - 0 = 30,000
    const tax = calculatePropertyTax(60_000_000, PROPERTY_TAX_BRACKETS_ONE_HOUSE);
    expect(tax).toBe(30_000);
  });

  it('1세대1주택 특례 과표 3.6억 → 0.35% − 63만 = 63만', () => {
    // 3.6억은 3억 초과, 3.6억 × 0.35% - 63만 = 1,260,000 - 630,000 = 630,000
    const tax = calculatePropertyTax(360_000_000, PROPERTY_TAX_BRACKETS_ONE_HOUSE);
    expect(tax).toBe(630_000);
  });

  it('10원 단위 절사: 과표 1억 일반 → 0.15% − 3만 = 12만', () => {
    // 1억은 1.5억 구간, 1억 × 0.15% - 3만 = 150,000 - 30,000 = 120,000
    const tax = calculatePropertyTax(100_000_000, PROPERTY_TAX_BRACKETS_GENERAL);
    expect(tax).toBe(120_000);
  });
});

describe('calculateUrbanAreaTax', () => {
  it('도시지역 과표 1.8억 → 0.14% = 25.2만 → 252,000 (절사)', () => {
    // 1.8억 × 0.0014 = 252,000 → floor(252,000/10)*10 = 252,000
    const tax = calculateUrbanAreaTax(180_000_000, true);
    expect(tax).toBe(252_000);
  });

  it('비도시지역 → 0', () => {
    const tax = calculateUrbanAreaTax(180_000_000, false);
    expect(tax).toBe(0);
  });

  it('도시지역 과표 3억 → 0.14% = 42만', () => {
    // 3억 × 0.0014 = 420,000
    const tax = calculateUrbanAreaTax(300_000_000, true);
    expect(tax).toBe(420_000);
  });
});

describe('calculateLocalEducationTax', () => {
  it('재산세 100만 → 20% = 20만', () => {
    const tax = calculateLocalEducationTax(1_000_000);
    expect(tax).toBe(200_000);
  });

  it('재산세 27만 → 20% = 5.4만 → 54,000 (절사)', () => {
    // 27만 × 0.2 = 54,000 → floor(54,000/10)*10 = 54,000
    const tax = calculateLocalEducationTax(270_000);
    expect(tax).toBe(54_000);
  });

  it('재산세 0 → 0', () => {
    const tax = calculateLocalEducationTax(0);
    expect(tax).toBe(0);
  });
});

describe('splitInstallments', () => {
  it('총 15만원 (20만 이하) → 7월 15만, 9월 0', () => {
    const result = splitInstallments(150_000);
    expect(result.installmentJuly).toBe(150_000);
    expect(result.installmentSeptember).toBe(0);
  });

  it('총 20만원 (경계) → 7월 20만, 9월 0', () => {
    const result = splitInstallments(200_000);
    expect(result.installmentJuly).toBe(200_000);
    expect(result.installmentSeptember).toBe(0);
  });

  it('총 30만원 (초과) → 7월 15만, 9월 15만', () => {
    const result = splitInstallments(300_000);
    // ceil(300,000/2/10)*10 = ceil(15,000)*10 = 150,000
    expect(result.installmentJuly).toBe(150_000);
    expect(result.installmentSeptember).toBe(150_000);
    expect(result.installmentJuly + result.installmentSeptember).toBe(300_000);
  });

  it('총 25만 5천원 → 합계 정확 일치', () => {
    const result = splitInstallments(255_000);
    expect(result.installmentJuly + result.installmentSeptember).toBe(255_000);
  });

  it('총 100만원 → 7월 50만, 9월 50만', () => {
    const result = splitInstallments(1_000_000);
    expect(result.installmentJuly).toBe(500_000);
    expect(result.installmentSeptember).toBe(500_000);
    expect(result.installmentJuly + result.installmentSeptember).toBe(1_000_000);
  });
});

describe('calculatePropertyTaxTotal', () => {
  it('공시 3억 일반 → 과표 1.8억 → 본세 27만 + 도시 25.2만 + 교육 5.4만', () => {
    const result = calculatePropertyTaxTotal({
      publishedPrice: 300_000_000,
      oneHouseholdOneHouse: false,
      urbanArea: true,
    });

    expect(result.taxBase).toBe(180_000_000);
    expect(result.appliedBracket).toBe('general');
    expect(result.propertyTax).toBe(270_000);
    expect(result.urbanAreaTax).toBe(252_000);
    // 교육세 = 27만 × 20% = 54,000
    expect(result.localEducationTax).toBe(54_000);
    expect(result.totalTax).toBe(270_000 + 252_000 + 54_000);
  });

  it('공시 6억 1세대1주택 → 특례 적용 확인', () => {
    const result = calculatePropertyTaxTotal({
      publishedPrice: 600_000_000,
      oneHouseholdOneHouse: true,
      urbanArea: false,
    });

    expect(result.appliedBracket).toBe('oneHouseSpecial');
    // 과표 3.6억 (3억 초과), 특례 0.35% - 63만 = 1,260,000 - 630,000 = 630,000
    expect(result.propertyTax).toBe(630_000);
  });

  it('공시 9억 1세대1주택 경계 → 특례 적용', () => {
    const result = calculatePropertyTaxTotal({
      publishedPrice: 900_000_000,
      oneHouseholdOneHouse: true,
      urbanArea: false,
    });

    expect(result.appliedBracket).toBe('oneHouseSpecial');
    expect(result.warnings).not.toContainEqual(
      expect.stringContaining('특례가 적용되지 않'),
    );
  });

  it('공시 9.5억 1세대1주택 신청 → 특례 미적용 + warning', () => {
    const result = calculatePropertyTaxTotal({
      publishedPrice: 950_000_000,
      oneHouseholdOneHouse: true,
      urbanArea: false,
    });

    expect(result.appliedBracket).toBe('general');
    expect(result.warnings).toContainEqual(
      expect.stringContaining('특례가 적용되지 않'),
    );
  });

  it('공시 1억 일반 → 과표 6000만 → 본세 6만', () => {
    const result = calculatePropertyTaxTotal({
      publishedPrice: 100_000_000,
      oneHouseholdOneHouse: false,
      urbanArea: false,
    });

    expect(result.taxBase).toBe(60_000_000);
    expect(result.propertyTax).toBe(60_000);
  });

  it('공시 1억 1세대1주택 → 과표 6000만 → 본세 3만', () => {
    const result = calculatePropertyTaxTotal({
      publishedPrice: 100_000_000,
      oneHouseholdOneHouse: true,
      urbanArea: false,
    });

    expect(result.appliedBracket).toBe('oneHouseSpecial');
    expect(result.propertyTax).toBe(30_000);
  });

  it('공시 0 → 0 + warning', () => {
    const result = calculatePropertyTaxTotal({
      publishedPrice: 0,
      oneHouseholdOneHouse: false,
      urbanArea: false,
    });

    expect(result.taxBase).toBe(0);
    expect(result.propertyTax).toBe(0);
    expect(result.totalTax).toBe(0);
    expect(result.warnings).toContainEqual(expect.stringContaining('공시가격'));
  });

  it('분납 20만 이하 → 7월 일괄', () => {
    const result = calculatePropertyTaxTotal({
      publishedPrice: 150_000_000,
      oneHouseholdOneHouse: false,
      urbanArea: false,
    });

    if (result.totalTax <= 200_000) {
      expect(result.installmentJuly).toBe(result.totalTax);
      expect(result.installmentSeptember).toBe(0);
    }
  });

  it('분납 합계 = 총 납부액 항상 일치', () => {
    const result = calculatePropertyTaxTotal({
      publishedPrice: 500_000_000,
      oneHouseholdOneHouse: false,
      urbanArea: true,
    });

    expect(result.installmentJuly + result.installmentSeptember).toBe(result.totalTax);
  });

  it('도시지역분 적용 시 경고 포함', () => {
    const result = calculatePropertyTaxTotal({
      publishedPrice: 300_000_000,
      oneHouseholdOneHouse: false,
      urbanArea: true,
    });

    expect(result.warnings).toContainEqual(expect.stringContaining('도시지역분'));
  });

  it('공통 경고 (세부담 상한) 항상 포함', () => {
    const result = calculatePropertyTaxTotal({
      publishedPrice: 200_000_000,
      oneHouseholdOneHouse: false,
      urbanArea: false,
    });

    expect(result.warnings).toContainEqual(expect.stringContaining('기본세율'));
  });

  it('공시 1억 5천만 일반 → 과표 9천만 → 0.15% − 3만 = 10.5만', () => {
    const result = calculatePropertyTaxTotal({
      publishedPrice: 150_000_000,
      oneHouseholdOneHouse: false,
      urbanArea: false,
    });

    const expectedTaxBase = 90_000_000;
    const expectedPropertyTax = 90_000_000 * 0.0015 - 30_000;
    expect(result.taxBase).toBe(expectedTaxBase);
    expect(result.propertyTax).toBe(Math.floor(expectedPropertyTax / 10) * 10);
  });
});
