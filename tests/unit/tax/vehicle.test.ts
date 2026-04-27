/**
 * 자동차세 단위 테스트
 * 명세: docs/calculator-spec/자동차세.md §9
 */

import { describe, expect, it } from 'vitest';
import { calculateVehicleTax } from '@/lib/tax/vehicle';

describe('자동차세 계산 (vehicle.ts)', () => {
  describe('기본 세율 구간 (cc당 요율)', () => {
    it('999cc → 80원/cc 적용', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 999,
        vehicleAgeYears: 0,
        includeAnnualDiscount: false,
      });
      expect(r.baseRate).toBe(80);
      expect(r.grossVehicleTax).toBe(999 * 80); // 79,920원
    });

    it('1000cc → 80원/cc 적용 (경계)', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 1000,
        vehicleAgeYears: 0,
        includeAnnualDiscount: false,
      });
      expect(r.baseRate).toBe(80);
      expect(r.grossVehicleTax).toBe(1000 * 80); // 80,000원
    });

    it('1001cc → 140원/cc 적용', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 1001,
        vehicleAgeYears: 0,
        includeAnnualDiscount: false,
      });
      expect(r.baseRate).toBe(140);
      expect(r.grossVehicleTax).toBe(1001 * 140); // 140,140원
    });

    it('1600cc → 140원/cc 적용 (경계)', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 1600,
        vehicleAgeYears: 0,
        includeAnnualDiscount: false,
      });
      expect(r.baseRate).toBe(140);
      expect(r.grossVehicleTax).toBe(1600 * 140); // 224,000원
    });

    it('1601cc → 200원/cc 적용', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 1601,
        vehicleAgeYears: 0,
        includeAnnualDiscount: false,
      });
      expect(r.baseRate).toBe(200);
      expect(r.grossVehicleTax).toBe(1601 * 200); // 320,200원
    });

    it('3000cc → 200원/cc 적용', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 3000,
        vehicleAgeYears: 0,
        includeAnnualDiscount: false,
      });
      expect(r.baseRate).toBe(200);
      expect(r.grossVehicleTax).toBe(3000 * 200); // 600,000원
    });
  });

  describe('기본 예제: 1998cc 신차', () => {
    it('1998cc 신차 → 1998×200 = 399,600원', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 1998,
        vehicleAgeYears: 0,
        includeAnnualDiscount: false,
      });
      expect(r.baseRate).toBe(200);
      expect(r.grossVehicleTax).toBe(399600);
      expect(r.reductionRate).toBe(0); // 신차: 경감 없음
      expect(r.vehicleTaxAfterReduction).toBe(399600);
    });

    it('1998cc 신차 → 지방교육세 = 399600 × 30% = 119,880원 (10원 절사)', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 1998,
        vehicleAgeYears: 0,
        includeAnnualDiscount: false,
      });
      // 399,600 × 0.3 = 119,880 (정확히 나누어떨어짐)
      expect(r.localEducationTax).toBe(119880);
      expect(r.totalAnnual).toBe(399600 + 119880); // 519,480원
    });

    it('1998cc 신차 → 연납 할인 없음 시 반기 납부 = totalAnnual / 2', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 1998,
        vehicleAgeYears: 0,
        includeAnnualDiscount: false,
      });
      expect(r.finalAnnualPayment).toBe(r.totalAnnual); // 할인 미적용
      expect(r.semiAnnualPayment).toBe(Math.floor(r.totalAnnual / 2 / 10) * 10); // 259,740원
    });

    it('1998cc 신차 → 연납 할인 6.4% 적용', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 1998,
        vehicleAgeYears: 0,
        includeAnnualDiscount: true,
      });
      // totalAnnual = 519,480
      // 할인 = 519,480 × 0.064 = 33,247.68 → 10원 절사 = 33,240원
      expect(r.annualPaymentDiscount).toBe(33240);
      expect(r.finalAnnualPayment).toBe(519480 - 33240); // 486,240원
    });
  });

  describe('차령 경감률 계산', () => {
    it('신차(0년) → 경감률 0%', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 2000,
        vehicleAgeYears: 0,
        includeAnnualDiscount: false,
      });
      expect(r.reductionRate).toBe(0);
    });

    it('2년차 → 경감률 0%', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 2000,
        vehicleAgeYears: 2,
        includeAnnualDiscount: false,
      });
      expect(r.reductionRate).toBe(0);
    });

    it('3년차 → 경감률 5%', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 2000,
        vehicleAgeYears: 3,
        includeAnnualDiscount: false,
      });
      expect(r.reductionRate).toBe(0.05);
    });

    it('4년차 → 경감률 10%', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 2000,
        vehicleAgeYears: 4,
        includeAnnualDiscount: false,
      });
      expect(r.reductionRate).toBe(0.1);
    });

    it('11년차 → 경감률 45%', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 2000,
        vehicleAgeYears: 11,
        includeAnnualDiscount: false,
      });
      expect(r.reductionRate).toBe(0.45);
    });

    it('12년차 → 경감률 50% cap', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 2000,
        vehicleAgeYears: 12,
        includeAnnualDiscount: false,
      });
      expect(r.reductionRate).toBe(0.5);
    });

    it('15년차 이상 → 경감률 50% cap', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 2000,
        vehicleAgeYears: 15,
        includeAnnualDiscount: false,
      });
      expect(r.reductionRate).toBe(0.5);
    });
  });

  describe('1998cc 5년차 → 15% 경감', () => {
    it('기본: 1998 × 200 = 399,600원', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 1998,
        vehicleAgeYears: 5,
        includeAnnualDiscount: false,
      });
      expect(r.grossVehicleTax).toBe(399600);
    });

    it('경감율 15% (5년차: (5-2)×5%)', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 1998,
        vehicleAgeYears: 5,
        includeAnnualDiscount: false,
      });
      expect(r.reductionRate).toBeCloseTo(0.15, 2);
      const expectedReduction = Math.floor((399600 * 0.15) / 10) * 10;
      expect(r.reductionAmount).toBe(expectedReduction);
      expect(r.vehicleTaxAfterReduction).toBe(399600 - expectedReduction);
    });

    it('지방교육세 계산 (10원 절사)', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 1998,
        vehicleAgeYears: 5,
        includeAnnualDiscount: false,
      });
      expect(r.localEducationTax).toBeGreaterThan(0);
      expect(r.localEducationTax % 10).toBe(0); // 10원 단위 확인
    });

    it('연간 총액 = 차감경 후 자동차세 + 지방교육세', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 1998,
        vehicleAgeYears: 5,
        includeAnnualDiscount: false,
      });
      expect(r.totalAnnual).toBe(r.vehicleTaxAfterReduction + r.localEducationTax);
    });
  });

  describe('경차 999cc', () => {
    it('999cc 신차 → 999 × 80 = 79,920원', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 999,
        vehicleAgeYears: 0,
        includeAnnualDiscount: false,
      });
      expect(r.baseRate).toBe(80);
      expect(r.grossVehicleTax).toBe(79920);
      expect(r.localEducationTax % 10).toBe(0); // 10원 단위
      expect(r.totalAnnual).toBe(r.grossVehicleTax + r.localEducationTax);
    });
  });

  describe('대형차 (3000cc)', () => {
    it('3000cc 신차 → 3000 × 200 = 600,000원', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 3000,
        vehicleAgeYears: 0,
        includeAnnualDiscount: false,
      });
      expect(r.grossVehicleTax).toBe(600000);
      expect(r.localEducationTax).toBe(180000); // 600,000 × 30%
      expect(r.totalAnnual).toBe(780000);
    });

    it('5000cc 초과 경고', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 5001,
        vehicleAgeYears: 0,
        includeAnnualDiscount: false,
      });
      expect(r.warnings.some((w) => w.includes('대형'))).toBe(true);
    });
  });

  describe('입력 검증', () => {
    it('지원 안 되는 용도 → warning', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 1998,
        vehicleAgeYears: 0,
        includeAnnualDiscount: false,
      });
      expect(r.warnings).toHaveLength(0); // 올바른 입력
    });

    it('0cc → warning, 결과 0', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 0,
        vehicleAgeYears: 0,
        includeAnnualDiscount: false,
      });
      expect(r.warnings.some((w) => w.includes('배기량'))).toBe(true);
      expect(r.grossVehicleTax).toBe(0);
      expect(r.totalAnnual).toBe(0);
    });

    it('음수 cc → warning, 결과 0', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: -1000,
        vehicleAgeYears: 0,
        includeAnnualDiscount: false,
      });
      expect(r.warnings.some((w) => w.includes('배기량'))).toBe(true);
      expect(r.totalAnnual).toBe(0);
    });

    it('음수 차령 → warning', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 1998,
        vehicleAgeYears: -1,
        includeAnnualDiscount: false,
      });
      expect(r.warnings.some((w) => w.includes('차령'))).toBe(true);
      expect(r.totalAnnual).toBe(0);
    });

    it('NaN engineCc → warning', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: NaN,
        vehicleAgeYears: 0,
        includeAnnualDiscount: false,
      });
      expect(r.warnings.length).toBeGreaterThan(0);
    });
  });

  describe('10원 단위 절사 확인', () => {
    it('지방교육세 소수점 발생 케이스 → 10원 절사', () => {
      // 배기량을 선택해서 지방교육세가 소수점이 나오도록
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 1500,
        vehicleAgeYears: 0,
        includeAnnualDiscount: false,
      });
      // 1500 × 140 = 210,000
      // 210,000 × 30% = 63,000 (정확)
      expect(r.localEducationTax % 10).toBe(0); // 10원 단위
      expect(r.totalAnnual % 10).toBe(0); // 10원 단위
    });

    it('연납 할인 10원 절사', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 1998,
        vehicleAgeYears: 0,
        includeAnnualDiscount: true,
      });
      // totalAnnual = 519,480
      // 할인 = 519,480 × 0.064 = 33,247.68
      expect(r.annualPaymentDiscount % 10).toBe(0); // 10원 단위
    });
  });

  describe('반기별 납부액 계산', () => {
    it('연납 미사용 시 반기 = totalAnnual / 2 (10원 절사)', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 1998,
        vehicleAgeYears: 0,
        includeAnnualDiscount: false,
      });
      const expected = Math.floor(r.totalAnnual / 2 / 10) * 10;
      expect(r.semiAnnualPayment).toBe(expected);
      // totalAnnual = 519,480 → 반기 = 259,740원
      expect(r.semiAnnualPayment).toBe(259740);
    });

    it('반기액은 연납 할인 여부와 무관하게 동일', () => {
      const r1 = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 1998,
        vehicleAgeYears: 0,
        includeAnnualDiscount: false,
      });
      const r2 = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 1998,
        vehicleAgeYears: 0,
        includeAnnualDiscount: true,
      });
      expect(r1.semiAnnualPayment).toBe(r2.semiAnnualPayment);
    });
  });
});
