/**
 * 종합부동산세 계산 테스트
 *
 * 테스트 케이스:
 * - 기본 계산 (1주택, 다주택, 3주택+)
 * - 과세표준 0 (공제 초과)
 * - 고령자/장기보유 공제
 * - 공제 합산 한도 (80%)
 * - 경계값 (3억, 6억, 12억, 25억, 50억, 94억)
 * - 농특세 계산
 */

import { describe, it, expect } from 'vitest';
import {
  calculateComprehensivePropertyTax,
  calculateSeniorCredit,
  calculateLongHoldCredit,
  selectComprehensivePropertyTaxBrackets,
  selectBasicDeduction,
  type ComprehensivePropertyTaxInput,
} from '@/lib/tax/comprehensive-property';
import {
  COMPREHENSIVE_PROPERTY_TAX_BRACKETS_GENERAL,
  COMPREHENSIVE_PROPERTY_TAX_BRACKETS_MULTI,
} from '@/lib/constants/tax-rates-2026';

describe('종합부동산세 계산', () => {
  // ────────────────────────────────────────
  // 헬퍼 함수 테스트
  // ────────────────────────────────────────

  describe('calculateSeniorCredit', () => {
    it('비1세대1주택자 → 0', () => {
      expect(calculateSeniorCredit(false, 75)).toBe(0);
    });

    it('1세대1주택, 59세 → 0', () => {
      expect(calculateSeniorCredit(true, 59)).toBe(0);
    });

    it('1세대1주택, 60~64세 → 20%', () => {
      expect(calculateSeniorCredit(true, 62)).toBe(0.2);
    });

    it('1세대1주택, 65~69세 → 30%', () => {
      expect(calculateSeniorCredit(true, 67)).toBe(0.3);
    });

    it('1세대1주택, 70세 이상 → 40%', () => {
      expect(calculateSeniorCredit(true, 75)).toBe(0.4);
    });

    it('1세대1주택, 100세 → 40%', () => {
      expect(calculateSeniorCredit(true, 100)).toBe(0.4);
    });
  });

  describe('calculateLongHoldCredit', () => {
    it('비1세대1주택자 → 0', () => {
      expect(calculateLongHoldCredit(false, 15)).toBe(0);
    });

    it('1세대1주택, 4년 → 0', () => {
      expect(calculateLongHoldCredit(true, 4)).toBe(0);
    });

    it('1세대1주택, 5~10년 → 20%', () => {
      expect(calculateLongHoldCredit(true, 7)).toBe(0.2);
    });

    it('1세대1주택, 10~15년 → 40%', () => {
      expect(calculateLongHoldCredit(true, 12)).toBe(0.4);
    });

    it('1세대1주택, 15년 이상 → 50%', () => {
      expect(calculateLongHoldCredit(true, 20)).toBe(0.5);
    });
  });

  describe('selectBasicDeduction', () => {
    it('1주택 1세대1주택 → 12억', () => {
      expect(selectBasicDeduction('one', true)).toBe(1_200_000_000);
    });

    it('1주택 비1세대1주택 → 9억', () => {
      expect(selectBasicDeduction('one', false)).toBe(900_000_000);
    });

    it('2주택 → 9억', () => {
      expect(selectBasicDeduction('two', true)).toBe(900_000_000);
    });

    it('3주택 이상 → 9억', () => {
      expect(selectBasicDeduction('threeOrMore', true)).toBe(900_000_000);
    });
  });

  describe('selectComprehensivePropertyTaxBrackets', () => {
    it('1주택, 2주택 → 일반 구간', () => {
      const brackets1 = selectComprehensivePropertyTaxBrackets('one');
      const brackets2 = selectComprehensivePropertyTaxBrackets('two');
      expect(brackets1).toEqual(COMPREHENSIVE_PROPERTY_TAX_BRACKETS_GENERAL);
      expect(brackets2).toEqual(COMPREHENSIVE_PROPERTY_TAX_BRACKETS_GENERAL);
    });

    it('3주택 이상 → 중과 구간', () => {
      const brackets = selectComprehensivePropertyTaxBrackets('threeOrMore');
      expect(brackets).toEqual(COMPREHENSIVE_PROPERTY_TAX_BRACKETS_MULTI);
    });
  });

  // ────────────────────────────────────────
  // 메인 계산 테스트
  // ────────────────────────────────────────

  describe('calculateComprehensivePropertyTax', () => {
    /**
     * Test 1: 1주택 공시 10억 1세대1주택자
     * - 공제 12억 > 공시가 10억
     * - 과세표준 = 0
     * - 종부세 = 0
     */
    it('1주택 공시 10억 1세대1주택 → 과세표준 0 → 종부세 0', () => {
      const input: ComprehensivePropertyTaxInput = {
        houseCount: 'one',
        totalPublishedPrice: 1_000_000_000,
        isOneHouseholdOneHouse: true,
        seniorAgeYears: 50,
        holdingYears: 5,
      };
      const result = calculateComprehensivePropertyTax(input);

      expect(result.basicDeduction).toBe(1_200_000_000);
      expect(result.taxableBase).toBe(0);
      expect(result.grossTax).toBe(0);
      expect(result.netTax).toBe(0);
      expect(result.totalTax).toBe(0);
      expect(result.warnings).toContain(
        '공시가 합계가 공제금액 이하여서 종합부동산세가 부과되지 않습니다.',
      );
    });

    /**
     * Test 2: 1주택 공시 15억 1세대1주택자
     * - 과세표준 = (15억 - 12억) × 60% = 1.8억
     * - 0.5% 구간 → 1.8억 × 0.005 = 90만
     * - 공제 없음 (고령/보유 불충족)
     * - 농특세 = 90만 × 20% = 18만
     * - 총 = 90만 + 18만 = 108만
     */
    it('1주택 공시 15억 1세대1주택 → 과세표준 1.8억 → 종부세 90만', () => {
      const input: ComprehensivePropertyTaxInput = {
        houseCount: 'one',
        totalPublishedPrice: 1_500_000_000,
        isOneHouseholdOneHouse: true,
        seniorAgeYears: 50,
        holdingYears: 3, // 공제 미충족
      };
      const result = calculateComprehensivePropertyTax(input);

      expect(result.basicDeduction).toBe(1_200_000_000);
      expect(result.taxableBase).toBe(180_000_000); // (15억 - 12억) × 0.6
      expect(result.appliedBracket).toBe('general');
      expect(result.grossTax).toBe(900_000); // 1.8억 × 0.5%
      expect(result.seniorCreditRate).toBe(0);
      expect(result.longHoldCreditRate).toBe(0);
      expect(result.creditAmount).toBe(0);
      expect(result.netTax).toBe(900_000);
      expect(result.ruralSpecialTax).toBe(180_000); // 90만 × 20%
      expect(result.totalTax).toBe(1_080_000);
    });

    /**
     * Test 3: 2주택 공시 20억
     * - 기본공제 = 9억
     * - 과세표준 = (20억 - 9억) × 60% = 660,000,000원 (6.6억)
     * - 600M 초과 1200M 이하 구간 (1.0%)
     * - 660M × 0.01 - 2,400,000 = 6,600,000 - 2,400,000 = 4,200,000
     * - 10원 단위 절사: 4,200,000 → 4,200,000
     * - 농특세 = 4,200,000 × 20% = 840,000
     * - 총 = 4,200,000 + 840,000 = 5,040,000
     */
    it('2주택 공시 20억 → 과세표준 6.6억 → 누진세 계산', () => {
      const input: ComprehensivePropertyTaxInput = {
        houseCount: 'two',
        totalPublishedPrice: 2_000_000_000,
        isOneHouseholdOneHouse: false,
        seniorAgeYears: 50,
        holdingYears: 0,
      };
      const result = calculateComprehensivePropertyTax(input);

      expect(result.basicDeduction).toBe(900_000_000);
      expect(result.taxableBase).toBe(660_000_000); // (20억 - 9억) × 0.6
      expect(result.appliedBracket).toBe('general');
      expect(result.grossTax).toBe(4_200_000); // 6.6억 × 0.01 - 2,400,000
      expect(result.creditAmount).toBe(0); // 다주택이므로 공제 불가
      expect(result.netTax).toBe(4_200_000);
      expect(result.ruralSpecialTax).toBe(840_000);
      expect(result.totalTax).toBe(5_040_000);
    });

    /**
     * Test 4: 3주택 공시 25억 (중과 세율 적용)
     * - 기본공제 = 9억
     * - 과세표준 = (25억 - 9억) × 60% = 960,000,000원 (9.6억)
     * - 중과 세율: 960M은 12억 이하 구간 (1.0%)
     * - 960M × 0.01 - 2,400,000 = 9,600,000 - 2,400,000 = 7,200,000
     * - 10원 단위 절사: 7,200,000 → 7,200,000
     * - 농특세 = 7,200,000 × 20% = 1,440,000
     * - 총 = 7,200,000 + 1,440,000 = 8,640,000
     */
    it('3주택 공시 25억 → 중과 세율 적용 → 과세표준 9.6억', () => {
      const input: ComprehensivePropertyTaxInput = {
        houseCount: 'threeOrMore',
        totalPublishedPrice: 2_500_000_000,
        isOneHouseholdOneHouse: false,
        seniorAgeYears: 50,
        holdingYears: 0,
      };
      const result = calculateComprehensivePropertyTax(input);

      expect(result.basicDeduction).toBe(900_000_000);
      expect(result.taxableBase).toBe(960_000_000); // (25억 - 9억) × 0.6
      expect(result.appliedBracket).toBe('multi');
      // 중과 구간 9.6억 = 12억 이하 (1.0%)
      expect(result.grossTax).toBe(7_200_000);
      expect(result.netTax).toBe(7_200_000);
      expect(result.ruralSpecialTax).toBe(1_440_000);
      expect(result.totalTax).toBe(8_640_000);
    });

    /**
     * Test 5: 1세대1주택 고령자(70세) + 장기보유(15년)
     * - 공시 15억, 과세표준 1.8억 → 기본 90만
     * - 고령자 40% + 장기보유 50% = 90% → 한도 80% 적용
     * - 공제액 = 90만 × 80% = 72만
     * - 순세액 = 90만 - 72만 = 18만
     * - 농특세 = 18만 × 20% = 3.6만 = 36,000
     */
    it('1세대1주택 고령(70세) + 장보(15년) → 공제 80% 한도', () => {
      const input: ComprehensivePropertyTaxInput = {
        houseCount: 'one',
        totalPublishedPrice: 1_500_000_000,
        isOneHouseholdOneHouse: true,
        seniorAgeYears: 70,
        holdingYears: 15,
      };
      const result = calculateComprehensivePropertyTax(input);

      expect(result.seniorCreditRate).toBe(0.4);
      expect(result.longHoldCreditRate).toBe(0.5);
      expect(result.totalCreditRate).toBe(0.8); // 0.4 + 0.5 = 0.9, but capped at 0.8
      expect(result.grossTax).toBe(900_000);
      expect(result.creditAmount).toBe(720_000); // 900_000 × 0.8
      expect(result.netTax).toBe(180_000); // 900_000 - 720_000
      expect(result.ruralSpecialTax).toBe(36_000);
      expect(result.totalTax).toBe(216_000);
    });

    /**
     * Test 6: 3억 경계값 (일반)
     * - 과세표준 정확히 3억 → 0.5% 구간 끝
     * - 3억 × 0.005 - 0 = 1,500,000
     */
    it('과세표준 3억 경계 (일반) → 0.5% 구간', () => {
      const input: ComprehensivePropertyTaxInput = {
        houseCount: 'one',
        totalPublishedPrice: 1_500_000_000, // 12억 + (3억 / 0.6)
        isOneHouseholdOneHouse: true,
        seniorAgeYears: 50,
        holdingYears: 0,
      };
      const result = calculateComprehensivePropertyTax(input);

      // 과세표준 = (15억 - 12억) × 0.6 = 1.8억은 3억 미만
      // 하지만 3억 경계를 정확히 테스트하려면:
      // 공시가 = 12억 + (3억 / 0.6) = 12억 + 5억 = 17억
      // 그런데 실제로는 12억 + 5억 = 17억일 때 과세표준이 정확히 3억
      const input2: ComprehensivePropertyTaxInput = {
        houseCount: 'one',
        totalPublishedPrice: 1_700_000_000,
        isOneHouseholdOneHouse: true,
        seniorAgeYears: 50,
        holdingYears: 0,
      };
      const result2 = calculateComprehensivePropertyTax(input2);
      expect(result2.taxableBase).toBe(300_000_000);
      expect(result2.grossTax).toBe(1_500_000); // 3억 × 0.005
    });

    /**
     * Test 7: 6억 경계값 (일반)
     * - 공시가 = 12억 + (6억 / 0.6) = 12억 + 10억 = 22억
     * - 과세표준 = 6억
     * - 6억 × 0.007 - 600,000 = 4,200,000 - 600,000 = 3,600,000
     */
    it('과세표준 6억 경계 (일반) → 0.7% 구간', () => {
      const input: ComprehensivePropertyTaxInput = {
        houseCount: 'one',
        totalPublishedPrice: 2_200_000_000,
        isOneHouseholdOneHouse: true,
        seniorAgeYears: 50,
        holdingYears: 0,
      };
      const result = calculateComprehensivePropertyTax(input);

      expect(result.taxableBase).toBe(600_000_000);
      expect(result.grossTax).toBe(3_600_000); // 6억 × 0.007 - 600,000
    });

    /**
     * Test 8: 12억 경계값 (일반 vs 중과)
     * - 공시가 = 9억 + (12억 / 0.6) = 9억 + 20억 = 29억
     * - 과세표준 = (29억 - 9억) × 0.6 = 1,200,000,000원 (12억)
     * - 일반: 1,200M × 0.01 - 2,400,000 = 12,000,000 - 2,400,000 = 9,600,000
     * - 중과: 1,200M × 0.01 - 2,400,000 = 9,600,000 (둘 다 동일, 12억 이하는 1.0%)
     */
    it('과세표준 12억 경계 → 일반·중과 동일 1.0%', () => {
      const inputGeneral: ComprehensivePropertyTaxInput = {
        houseCount: 'two',
        totalPublishedPrice: 2_900_000_000, // 9억 + (12억 / 0.6)
        isOneHouseholdOneHouse: false,
        seniorAgeYears: 50,
        holdingYears: 0,
      };
      const resultGeneral = calculateComprehensivePropertyTax(inputGeneral);

      const inputMulti: ComprehensivePropertyTaxInput = {
        houseCount: 'threeOrMore',
        totalPublishedPrice: 2_900_000_000,
        isOneHouseholdOneHouse: false,
        seniorAgeYears: 50,
        holdingYears: 0,
      };
      const resultMulti = calculateComprehensivePropertyTax(inputMulti);

      expect(resultGeneral.taxableBase).toBe(1_200_000_000);
      expect(resultMulti.taxableBase).toBe(1_200_000_000);
      expect(resultGeneral.grossTax).toBe(9_600_000);
      expect(resultMulti.grossTax).toBe(9_600_000); // 둘 다 동일
    });

    /**
     * Test 9: 25억 경계값 (일반 vs 중과 차이)
     * - 공시가 = 9억 + (25억 / 0.6) ≈ 51.67억
     * - 과세표준 = (51.67억 - 9억) × 0.6 ≈ 25.6억 (정수로 조정: 51.666...억)
     * - 일반: 25억 × 0.013 - 6,000,000 = 3,250,000,000 - 6,000,000 = 3,244,000,000
     * - 중과: 25억 × 0.020 - 14,400,000 = 5,000,000,000 - 14,400,000 = 4,985,600,000
     * (실제 과세표준은 25.6억이 되므로 값을 재계산)
     *
     * 정확히 25억 경계를 맞추려면:
     * 공시가 = 9억 + (25억 / 0.6) = 9억 + 41.666...억 = 50.666...억
     * 반올림하면 과세표준이 정확히 25억이 되지 않으므로 근사값 사용
     */
    it('과세표준 25억 경계 → 일반 1.3% vs 중과 2.0%', () => {
      const publicPrice = 5_066_666_666; // 9억 + (25억 / 0.6) 근사
      const expectedTaxableBase = Math.floor((publicPrice - 900_000_000) * 0.6);

      const input1: ComprehensivePropertyTaxInput = {
        houseCount: 'two',
        totalPublishedPrice: publicPrice,
        isOneHouseholdOneHouse: false,
        seniorAgeYears: 50,
        holdingYears: 0,
      };
      const result1 = calculateComprehensivePropertyTax(input1);

      const input2: ComprehensivePropertyTaxInput = {
        houseCount: 'threeOrMore',
        totalPublishedPrice: publicPrice,
        isOneHouseholdOneHouse: false,
        seniorAgeYears: 50,
        holdingYears: 0,
      };
      const result2 = calculateComprehensivePropertyTax(input2);

      // 과세표준은 같음
      expect(result1.taxableBase).toBe(expectedTaxableBase);
      expect(result2.taxableBase).toBe(expectedTaxableBase);

      // 세율은 다름
      expect(result1.appliedBracket).toBe('general');
      expect(result2.appliedBracket).toBe('multi');
      // 일반 1.3% 구간: expectedTaxableBase × 0.013 - 6,000,000
      const generalTax = expectedTaxableBase * 0.013 - 6_000_000;
      const generalTaxRounded = Math.floor(generalTax / 10) * 10;
      // 중과 2.0% 구간: expectedTaxableBase × 0.020 - 14,400,000
      const multiTax = expectedTaxableBase * 0.020 - 14_400_000;
      const multiTaxRounded = Math.floor(multiTax / 10) * 10;
      expect(result1.grossTax).toBe(generalTaxRounded);
      expect(result2.grossTax).toBe(multiTaxRounded);
    });

    /**
     * Test 10: 0원 입력
     * - 종부세 0
     * - 경고 메시지
     */
    it('공시가 0원 → 경고 + 종부세 0', () => {
      const input: ComprehensivePropertyTaxInput = {
        houseCount: 'one',
        totalPublishedPrice: 0,
        isOneHouseholdOneHouse: true,
        seniorAgeYears: 50,
        holdingYears: 0,
      };
      const result = calculateComprehensivePropertyTax(input);

      expect(result.totalTax).toBe(0);
      expect(result.warnings).toContain('공시가 합계는 0원 이상이어야 합니다.');
    });

    /**
     * Test 11: 1세대1주택 체크 위험
     * - 1주택이 아닌데 isOneHouseholdOneHouse = true
     * - 경고만 발생, 9억 공제 적용 (공제 선택 로직)
     */
    it('비1주택인데 1세대1주택 체크 → 경고 + 9억 공제 적용', () => {
      const input: ComprehensivePropertyTaxInput = {
        houseCount: 'two',
        totalPublishedPrice: 1_500_000_000,
        isOneHouseholdOneHouse: true, // 잘못된 선택
        seniorAgeYears: 50,
        holdingYears: 5,
      };
      const result = calculateComprehensivePropertyTax(input);

      expect(result.basicDeduction).toBe(900_000_000); // 2주택이므로 9억
      expect(result.warnings).toContain(
        '1세대1주택자 여부는 1주택 선택 시에만 유효합니다. 무시 처리됩니다.',
      );
    });

    /**
     * Test 12: 농특세 계산 정확도
     * - 종부세 계산 후 정확히 20% 공제
     * - 10원 단위 절사
     */
    it('농특세 = 순세액 × 20% (10원 단위 절사)', () => {
      const input: ComprehensivePropertyTaxInput = {
        houseCount: 'one',
        totalPublishedPrice: 1_500_000_000,
        isOneHouseholdOneHouse: true,
        seniorAgeYears: 50,
        holdingYears: 0,
      };
      const result = calculateComprehensivePropertyTax(input);

      const expectedRural = Math.floor((result.netTax * 0.2) / 10) * 10;
      expect(result.ruralSpecialTax).toBe(expectedRural);
      expect(result.totalTax).toBe(result.netTax + result.ruralSpecialTax);
    });

    /**
     * Test 13: 최고 세율 구간 (94억 초과)
     * - 일반: 2.7%
     * - 중과: 5.0%
     * - 공시가 = 9억 + (100억 / 0.6) ≈ 175.67억
     * - 과세표준 = (175.67억 - 9억) × 0.6 ≈ 100억
     */
    it('과세표준 100억 초과 → 최고 세율 적용', () => {
      const publicPrice = 17_566_666_667; // 9억 + (100억 / 0.6) 근사
      const expectedTaxableBase = Math.floor((publicPrice - 900_000_000) * 0.6);

      const input1: ComprehensivePropertyTaxInput = {
        houseCount: 'two',
        totalPublishedPrice: publicPrice,
        isOneHouseholdOneHouse: false,
        seniorAgeYears: 50,
        holdingYears: 0,
      };
      const result1 = calculateComprehensivePropertyTax(input1);

      const input2: ComprehensivePropertyTaxInput = {
        houseCount: 'threeOrMore',
        totalPublishedPrice: publicPrice,
        isOneHouseholdOneHouse: false,
        seniorAgeYears: 50,
        holdingYears: 0,
      };
      const result2 = calculateComprehensivePropertyTax(input2);

      // 과세표준 확인
      expect(result1.taxableBase).toBe(expectedTaxableBase);
      expect(result2.taxableBase).toBe(expectedTaxableBase);

      // 일반: expectedTaxableBase × 0.027 - 101,800,000
      const generalTax = expectedTaxableBase * 0.027 - 101_800_000;
      const generalTaxRounded = Math.floor(generalTax / 10) * 10;
      // 중과: expectedTaxableBase × 0.050 - 183,400,000
      const multiTax = expectedTaxableBase * 0.050 - 183_400_000;
      const multiTaxRounded = Math.floor(multiTax / 10) * 10;
      expect(result1.grossTax).toBe(generalTaxRounded);
      expect(result2.grossTax).toBe(multiTaxRounded);
    });
  });
});
