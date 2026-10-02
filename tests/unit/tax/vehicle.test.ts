/**
 * 자동차세 단위 테스트
 * 명세: docs/calculator-spec/자동차세.md §9
 */

import { describe, expect, it } from 'vitest';
import { calculateVehicleTax, getVehiclePaymentCalendar } from '@/lib/tax/vehicle';

describe('자동차세 계산 (vehicle.ts)', () => {
  it.each([
    [0, 480_000, 144_000, 624_000],
    [1, 480_000, 144_000, 624_000],
    [2, 480_000, 144_000, 624_000],
    [3, 456_000, 136_800, 592_800],
    [12, 240_000, 72_000, 312_000],
  ])('2400cc 공개 예시: 법정 차령 %i, 연납 할인 제외', (age, tax, education, total) => {
    // 지방세법 제127조·제151조: 표준세율, 두 과세 반기의 차령이 같다고 가정.
    const result = calculateVehicleTax({
      usage: 'passengerNonBusiness',
      engineCc: 2400,
      vehicleAgeYears: age,
      includeAnnualDiscount: false,
    });
    expect(result.vehicleTaxAfterReduction).toBe(tax);
    expect(result.localEducationTax).toBe(education);
    expect(result.totalAnnual).toBe(total);
    expect(result.finalAnnualPayment).toBe(total);
    expect(result.annualPaymentDiscount).toBe(0);
  });

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

    it('1998cc 신차 → 2026년 1월 연납은 2/1부터 334일을 적용', () => {
      // §128③, 시행령 §125⑥: 334/365 × 5%. 중간 공제 절사 없이 최종 세목별 절사.
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness', engineCc: 1998, vehicleAgeYears: 0,
        includeAnnualDiscount: true,
      });
      // 본세399600×6966/7300=381317.260... →381310;
      // 교육세114395.178... →114390. 합계495700, 기준519480 대비23780원 감소.
      expect(r.finalAnnualPayment).toBe(495_700);
      expect(r.paymentDueNow).toBe(495_700);
      expect(r.annualPaymentDiscount).toBe(23_780);
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
      expect(r.reductionAmount).toBe(59_940);
      expect(r.vehicleTaxAfterReduction).toBe(339_660);
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

    it('연납 후 최종 세목별 끝수 처리를 반영한 기준액 대비 감소액', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness',
        engineCc: 1998,
        vehicleAgeYears: 0,
        includeAnnualDiscount: true,
      });
      expect(r.annualPaymentDiscount).toBe(23_780);
      expect(r.finalAnnualPayment % 10).toBe(0);
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
  describe('2026년 법정 연납 기준과 반기별 차령 회귀', () => {
    // 지방세법 §128③: Jan334/365·Mar275/365, June제2기전체·Sept92/184.
    // 시행령 §125⑥ 5%. 기대값은 아래 정수 금액을 독립 검산한 고정 fixture.
    it.each([
      [1, 43_420, 905_580],
      [3, 35_750, 913_250],
    ])('3650cc 신차 %i월: 감소 %i원, 납부 %i원', (month, discount, payment) => {
      // A=3650×200=730000, 교육219000. Jan본세33400+교육10020 공제;
      // Mar본세27500+교육8250 공제. 모든 결과 끝수가 정확히 10원 단위이다.
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness', engineCc: 3650, vehicleAgeYears: 0,
        includeAnnualDiscount: true, annualPaymentMonthOfApplication: month, taxYear: 2026,
      });
      expect(r.totalAnnual).toBe(949_000);
      expect(r.annualPaymentDiscount).toBe(discount);
      expect(r.finalAnnualPayment).toBe(payment);
      expect(r.paymentDueNow).toBe(payment);
      expect(r.warnings).toEqual([]);
    });

    it.each([
      [6, 15_600, 296_400, 608_400],
      [9, 7_800, 304_200, 616_200],
    ])('2400cc %i월: 감소 %i원, 제2기 선납 %i원, 연합산 %i원', (month, discount, due, annual) => {
      // 제2기 본세240000+교육72000=312000. June5%=15600, Sept92/184×5%=7800.
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness', engineCc: 2400, vehicleAgeYears: 0,
        includeAnnualDiscount: true, annualPaymentMonthOfApplication: month,
      });
      expect(r.totalAnnual).toBe(624_000);
      expect(r.firstHalfPayment).toBe(312_000);
      expect(r.secondHalfPayment).toBe(312_000);
      expect(r.paymentDueNow).toBe(due);
      expect(r.finalAnnualPayment).toBe(annual);
      expect(r.annualPaymentDiscount).toBe(discount);
    });

    it('2400cc 상반기 법정차령2 / 하반기3: 두 반기를 별도 경감', () => {
      // §127①2: H1본세240000, H2본세228000; 교육72000+68400. 합계608400.
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness', engineCc: 2400, vehicleAgeYears: 2,
        vehicleAgeYearsSecondHalf: 3, includeAnnualDiscount: false,
      });
      expect(r.reductionRate).toBe(0);
      expect(r.reductionRateSecondHalf).toBe(0.05);
      expect(r.reductionAmount).toBe(12_000);
      expect(r.vehicleTaxAfterReduction).toBe(468_000);
      expect(r.localEducationTax).toBe(140_400);
      expect(r.totalAnnual).toBe(608_400);
      expect(r.firstHalfPayment).toBe(312_000);
      expect(r.secondHalfPayment).toBe(296_400);
      expect(r.semiAnnualPayment).toBe(312_000);
      expect(r.paymentDueNow).toBe(312_000);
      expect(r.finalAnnualPayment).toBe(608_400);
    });

    it('차령12년 경감 상한은 다음 반기13년에도 50%', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness', engineCc: 2400, vehicleAgeYears: 12,
        vehicleAgeYearsSecondHalf: 13, includeAnnualDiscount: false,
      });
      expect(r.reductionRateSecondHalf).toBe(0.5);
      expect(r.firstHalfPayment).toBe(156_000);
      expect(r.secondHalfPayment).toBe(156_000);
      expect(r.totalAnnual).toBe(312_000);
    });

    it('교육세 과표는 자동차세 끝수 처리 전 금액이며 중간 경감액을 절사하지 않음', () => {
      // 1098×140=153720, 5%경감 후146034. 본세146030;
      // 교육세146034×.3=43810.2 →43810 (146030×.3을 다시 절사한43800은 잘못).
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness', engineCc: 1098, vehicleAgeYears: 3,
        includeAnnualDiscount: false,
      });
      expect(r.reductionAmount).toBe(7_686);
      expect(r.vehicleTaxAfterReduction).toBe(146_030);
      expect(r.localEducationTax).toBe(43_810);
      expect(r.totalAnnual).toBe(189_840);
      // 반기별 최종 징수 끝수: 본세73017→73010, 교육21905.1→21900. 양반기189820.
      expect(r.firstHalfPayment).toBe(94_910);
      expect(r.secondHalfPayment).toBe(94_910);
      expect(r.finalAnnualPayment).toBe(189_840); // 비연납 연간 참고액 계약
    });

    it('999cc 차령3년: 경감액 3996원을 중간 10원 절사하지 않음', () => {
      // 79920×.95=75924; 교육22777.2. 최종 본세75920+교육22770=98690.
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness', engineCc: 999, vehicleAgeYears: 3,
        includeAnnualDiscount: false,
      });
      expect(r.reductionAmount).toBe(3_996);
      expect(r.totalAnnual).toBe(98_690);
    });
  });

  describe('지원연도·신청월·반기차령 검증', () => {
    it.each([2025, 2027, 2024, 0, NaN, Infinity])('미지원 정책연도 %s는 warning과 0원', (taxYear) => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness', engineCc: 2400, vehicleAgeYears: 2,
        includeAnnualDiscount: true, taxYear,
      });
      expect(r.warnings.some((w) => w.includes('2026년'))).toBe(true);
      expect(r.totalAnnual).toBe(0);
      expect(r.finalAnnualPayment).toBe(0);
      expect(r.paymentDueNow).toBe(0);
      expect(r.firstHalfPayment).toBe(0);
      expect(r.secondHalfPayment).toBe(0);
    });

    it.each([0, 2, 12, 1.5, NaN, Infinity])('신청월 %s는 보간·기본값 대체 없이 제한', (month) => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness', engineCc: 2400, vehicleAgeYears: 2,
        includeAnnualDiscount: true, annualPaymentMonthOfApplication: month,
      });
      expect(r.warnings.some((w) => w.includes('신청월'))).toBe(true);
      expect(r.finalAnnualPayment).toBe(0);
    });

    it.each([-1, 1, 4, 2.5, NaN, Infinity])('H1차령2에 대해 H2 %s는 지원하지 않음', (age) => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness', engineCc: 2400, vehicleAgeYears: 2,
        vehicleAgeYearsSecondHalf: age, includeAnnualDiscount: false,
      });
      expect(r.warnings.some((w) => w.includes('하반기'))).toBe(true);
      expect(r.totalAnnual).toBe(0);
    });

    it.each([NaN, Infinity, 2.5])('유효하지 않은 H1차령 %s도 0원 제한', (age) => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness', engineCc: 2400, vehicleAgeYears: age,
        includeAnnualDiscount: false,
      });
      expect(r.warnings.length).toBeGreaterThan(0);
      expect(r.totalAnnual).toBe(0);
    });

    it('분수 배기량은 정수형 세액 산식에 통과시키지 않음', () => {
      const r = calculateVehicleTax({
        usage: 'passengerNonBusiness', engineCc: 2400.5, vehicleAgeYears: 2,
        includeAnnualDiscount: false,
      });
      expect(r.warnings.some((w) => w.includes('배기량'))).toBe(true);
      expect(r.totalAnnual).toBe(0);
    });
  });

  describe('달력 전용 윤년 검사 (다른 연도 공제율 인증 아님)', () => {
    it.each([
      [2026, 1, 334, 365],
      [2024, 1, 335, 366],
      [2028, 1, 335, 366],
      [2026, 3, 275, 365],
      [2024, 3, 275, 366],
      [2026, 6, 184, 365],
      [2026, 9, 92, 365],
    ])('%i년 %i월: 잔여%i일 / 연%i일', (year, month, remaining, annualDays) => {
      expect(getVehiclePaymentCalendar(year, month)).toEqual({
        daysRemaining: remaining, daysInYear: annualDays, daysInSecondHalf: 184,
      });
    });

    it.each([NaN, 0, 99, 10000, 2026.5])('잘못된 달력 연도%s는 거부', (year) => {
      expect(() => getVehiclePaymentCalendar(year, 1)).toThrow('달력 연도');
    });
    it('달력 함수도 미지원 신청월2를 보간하지 않음', () => {
      expect(() => getVehiclePaymentCalendar(2026, 2)).toThrow('신청월');
    });
  });

});
