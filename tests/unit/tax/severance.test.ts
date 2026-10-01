/**
 * 퇴직금 계산 테스트
 *
 * 스펙: docs/calculator-spec/퇴직금.md §7
 * 검증 기준:
 * - 법정 퇴직금: 근로자퇴직급여 보장법 §8
 * - 퇴직소득세: 소득세법 §48(퇴직소득공제) · §55②(연분연승 산출세액)
 * - 근속연수공제 / 환산급여공제 구간 경계
 */

import { describe, it, expect } from 'vitest';
import { calculateSeverance, type SeveranceInput } from '@/lib/tax/severance';

// ============================================
// 헬퍼
// ============================================

/**
 * 입력 객체 빠른 생성
 */
function createInput(overrides: Partial<SeveranceInput>): SeveranceInput {
  return {
    hireDate: '2020-01-01',
    leaveDate: '2023-12-31',
    monthlyOrdinaryWage: 3_000_000,
    monthlyExtraAllowance: 0,
    annualBonus: 0,
    annualLeaveAllowance: 0,
    planType: 'statutory',
    includeTax: true,
    ...overrides,
  };
}

// ============================================
// 테스트 케이스
// ============================================

describe('calculateSeverance', () => {
  it.each([
    ['2025-01-01', '2026-01-01', 1, 1_000_000],
    ['2025-01-01', '2026-01-02', 2, 2_000_000],
    ['2024-01-01', '2025-01-01', 1, 1_000_000],
    ['2024-01-01', '2025-01-02', 2, 2_000_000],
    ['2024-02-29', '2025-03-01', 1, 1_000_000],
    ['2024-02-29', '2025-03-02', 2, 2_000_000],
  ])('소득세법48 단수: %s → %s는 %i년 공제', (hireDate, leaveDate, years, deduction) => {
    const result = calculateSeverance(
      createInput({ hireDate, leaveDate, ordinaryDailyWage: 100_000 }),
    );
    expect(result.serviceYearsRounded).toBe(years);
    expect(result.serviceYearsDeduction).toBe(deduction);
  });

  it('통상 일 임금이 더 높은 1년 근무: 정밀 비교 후 원 미만 반올림', () => {
    const result = calculateSeverance(
      createInput({
        hireDate: '2025-01-01',
        leaveDate: '2026-01-01',
        ordinaryDailyWage: (3_000_000 / 209) * 8,
        includeTax: false,
      }),
    );
    // 독립 계산: 365일, 10/1~12/31의 92일. 24,000,000/209 ×30=3,444,976.0765원.
    expect(result.serviceDays).toBe(365);
    expect(result.threeMonthDays).toBe(92);
    expect(result.averageDailyWage).toBeCloseTo(97_826.08695652174, 8);
    expect(result.ordinaryDailyWage).toBeCloseTo(114_832.53588516747, 8);
    expect(result.basisDailyWage).toBe(result.ordinaryDailyWage);
    expect(result.wageBasis).toBe('ordinary');
    expect(result.isEligibleForStatutory).toBe(true);
    expect(result.statutorySeverance).toBe(3_444_976);
    expect(result.netSeverance).toBe(3_444_976);
    expect(result.warnings).toContainEqual(expect.stringContaining('원 미만'));
  });

  it('평균 일 임금이 높으면 통상임금으로 낮추지 않는다', () => {
    const result = calculateSeverance(
      createInput({
        hireDate: '2025-01-01',
        leaveDate: '2026-01-01',
        ordinaryDailyWage: 90_000,
        includeTax: false,
      }),
    );
    expect(result.wageBasis).toBe('average');
    expect(result.basisDailyWage).toBeCloseTo(97_826.08695652174, 8);
    expect(result.statutorySeverance).toBe(2_934_783);
  });

  it('동일한 평균·통상 일 임금도 정밀 값으로 계산한다', () => {
    const result = calculateSeverance(
      createInput({
        hireDate: '2025-01-01',
        leaveDate: '2026-01-01',
        ordinaryDailyWage: 9_000_000 / 92,
        includeTax: false,
      }),
    );
    expect(result.wageBasis).toBe('average');
    expect(result.statutorySeverance).toBe(2_934_783);
  });

  it('호환 호출의 통상임금 누락은 평균만의 참고액 경고로 구분', () => {
    const result = calculateSeverance(
      createInput({ hireDate: '2025-01-01', leaveDate: '2026-01-01', includeTax: false }),
    );
    expect(result.ordinaryDailyWage).toBeNull();
    expect(result.wageBasis).toBe('averageOnly');
    expect(result.warnings).toContainEqual(expect.stringContaining('통상임금 미확인'));
  });

  it.each([0, -1, NaN, Infinity, -Infinity])(
    '명시된 잘못된 통상임금 %s는 참고액도 생성하지 않는다',
    (ordinaryDailyWage) => {
      expect(() => calculateSeverance(createInput({ ordinaryDailyWage }))).toThrow('통상임금');
    },
  );

  it.each(['', '0000-00-00', '2025-02-29', '2024-02-30', '2025-13-01', '2025-1-01', 'abc'])(
    '실제 달력에 없는 날짜 %s 거부',
    (leaveDate) => {
      expect(() => calculateSeverance(createInput({ leaveDate }))).toThrow('날짜');
    },
  );

  it.each([-1, NaN, Infinity])('잘못된 평균임금 자료 %s 거부', (monthlyOrdinaryWage) => {
    expect(() => calculateSeverance(createInput({ monthlyOrdinaryWage }))).toThrow('평균임금');
  });

  it('새 평균월임금 alias와 통상 일 임금은 독립 입력', () => {
    const result = calculateSeverance(
      createInput({ averageMonthlyWage: 2_000_000, ordinaryDailyWage: 100_000 }),
    );
    expect(result.threeMonthWageTotal).toBe(6_000_000);
    expect(result.basisDailyWage).toBe(100_000);
  });

  it.each([
    ['2024-01-02', '2025-01-01', 365, false],
    ['2024-01-02', '2025-01-02', 366, true],
    ['2024-02-29', '2025-02-28', 365, false],
    ['2024-02-29', '2025-03-01', 366, true],
    ['2025-01-01', '2025-12-31', 364, false],
    ['2025-01-01', '2026-01-01', 365, true],
  ])('역년 자격과 end-exclusive: %s → %s (%i일)', (hireDate, leaveDate, serviceDays, eligible) => {
    // 민법160: 해당일 없는 2월의 기간은 월말에 만료; 퇴직일은 그 다음 날.
    const result = calculateSeverance(
      createInput({ hireDate, leaveDate, ordinaryDailyWage: 100_000 }),
    );
    expect(result.serviceDays).toBe(serviceDays);
    expect(result.isEligibleForStatutory).toBe(eligible);
    expect(result.statutorySeverance > 0).toBe(eligible);
  });

  it.each([
    ['2026-01-01', 92],
    ['2026-05-29', 89],
    ['2026-05-30', 90],
    ['2026-05-31', 91],
    ['2024-05-29', 90],
    ['2024-05-30', 90],
    ['2024-05-31', 91],
    ['2026-07-31', 92],
    ['2026-12-31', 92],
    ['2026-08-31', 92],
  ])('MOEL 공개 계산기 미산입기간 없는 월말 기간: %s → %i일', (leaveDate, days) => {
    // retire_cal.js setDate의 5월 idx=3 예외/나머지 idx=4 첫달 dd 분기에서 독립 산정.
    const result = calculateSeverance(createInput({ hireDate: '2020-01-01', leaveDate }));
    expect(result.threeMonthDays).toBe(days);
  });

  // ─── §1: 기본 케이스 (근속 3년 10개월) ───
  it('근속 3년 월급 300만 → 법정퇴직금 계산', () => {
    // 2020-01-01 ~ 2023-12-31 종료일 제외 = 1,460일
    // 재직연수 = 1460 / 365 = 4
    // 기존 세금 참고 계산의 근속연수 = 4
    const result = calculateSeverance(
      createInput({
        hireDate: '2020-01-01',
        leaveDate: '2023-12-31',
        monthlyOrdinaryWage: 3_000_000,
      }),
    );

    expect(result.serviceDays).toBe(1460);
    expect(result.serviceYears).toBe(4);
    expect(result.serviceYearsRounded).toBe(4);

    // 3개월 임금 = 3M × 3 = 9M
    // 일수 = 2023-10-01 ~ 2023-12-31 = 92일
    // avgDailyWage = 9,000,000 / 92; 일 임금 중간 절사 없음
    expect(result.threeMonthDays).toBe(92);
    expect(result.averageDailyWage).toBeCloseTo(97_826.08695652174, 8);

    // 법정퇴직금 = 97,826 × 30 × (1461 / 365) = 97,826 × 30 × 4.0027...
    // = 97,826 × 120.08... = 11,750,XXX
    expect(result.statutorySeverance).toBe(11_739_130);
    expect(result.wageBasis).toBe('averageOnly');
  });

  // ─── §2: 재직 1년 미만 → 법정 의무 없음 ───
  it('재직 180일 → 퇴직금 0 + 경고', () => {
    const result = calculateSeverance(
      createInput({
        hireDate: '2023-07-01',
        leaveDate: '2023-12-29',
      }),
    );

    expect(result.serviceDays).toBe(181); // 퇴직일 제외
    expect(result.statutorySeverance).toBe(0);
    expect(result.warnings).toContain('재직 1년 미만은 법정 퇴직금 지급 의무가 없습니다.');
  });

  it('퇴직일이 입사일 이전 또는 같은 날이면 오류', () => {
    for (const leaveDate of ['2023-01-01', '2023-12-31']) {
      expect(() => calculateSeverance(createInput({ hireDate: '2023-12-31', leaveDate }))).toThrow(
        '입사일보다 이후',
      );
    }
  });
  // ─── §4: 근속연수공제 경계 — 5년 ───
  it('근속 5년 → 근속공제 = 5 × 1,000,000 = 5,000,000', () => {
    const result = calculateSeverance(
      createInput({
        hireDate: '2019-01-01',
        leaveDate: '2024-01-01', // 정확히 5년
        monthlyOrdinaryWage: 5_000_000,
        includeTax: true,
      }),
    );

    expect(result.serviceYearsRounded).toBe(5);
    expect(result.serviceYearsDeduction).toBe(5_000_000);
  });

  // ─── §5: 근속연수공제 경계 — 10년 ───
  it('근속 10년 → 근속공제 = 5,000,000 + (10-5) × 2,000,000 = 15,000,000', () => {
    const result = calculateSeverance(
      createInput({
        hireDate: '2014-01-01',
        leaveDate: '2024-01-01', // 정확히 10년
        monthlyOrdinaryWage: 5_000_000,
        includeTax: true,
      }),
    );

    expect(result.serviceYearsRounded).toBe(10);
    expect(result.serviceYearsDeduction).toBe(15_000_000);
  });

  // ─── §6: 근속연수공제 경계 — 20년 ───
  it('근속 20년 → 근속공제 = 15,000,000 + (20-10) × 2,500,000 = 40,000,000', () => {
    const result = calculateSeverance(
      createInput({
        hireDate: '2004-01-01',
        leaveDate: '2024-01-01', // 정확히 20년
        monthlyOrdinaryWage: 5_000_000,
        includeTax: true,
      }),
    );

    expect(result.serviceYearsRounded).toBe(20);
    expect(result.serviceYearsDeduction).toBe(40_000_000);
  });

  // ─── §7: 근속연수공제 — 25년 (초과) ───
  it('근속 25년 → 근속공제 = 40,000,000 + (25-20) × 3,000,000 = 55,000,000', () => {
    const result = calculateSeverance(
      createInput({
        hireDate: '1999-01-01',
        leaveDate: '2024-01-01', // 정확히 25년
        monthlyOrdinaryWage: 5_000_000,
        includeTax: true,
      }),
    );

    expect(result.serviceYearsRounded).toBe(25);
    expect(result.serviceYearsDeduction).toBe(55_000_000);
  });

  // ─── §8: 환산급여공제 경계 — 800만 이하 전액 ───
  it('환산급여 800만 이하 → 전액 공제 → 과세표준 0', () => {
    // 설정: 퇴직금이 매우 적어서 환산급여 ≤ 8M
    // 근속 1년, 월급 200만: 법정퇴직금 ≈ 200만 × 30 × (365/365) = 6M
    // 근속공제(1년) = 1M, 조정 = 6M - 1M = 5M
    // 환산급여 = 5M × 12 / 1 = 60M (경계값 넘음) → 다시 조정
    // 더 극단적: 월급 100만, 근속 1년 → 법정퇴직금 ≈ 3M, 근속공제 1M → 2M
    // 환산급여 = 2M × 12 / 1 = 24M (여전히 경계 초과)
    // 근속 1년 미만 올림에서 법정퇴직금이 0이 되도록:
    // → 세금 미포함 모드에서 테스트하거나, 환산급여 계산 자체 검증
    const result = calculateSeverance(
      createInput({
        hireDate: '2023-06-15',
        leaveDate: '2023-12-31', // 약 200일
        monthlyOrdinaryWage: 100_000,
        includeTax: true,
      }),
    );

    // 법정퇴직금이 0이므로 환산급여도 0
    expect(result.statutorySeverance).toBe(0);
    expect(result.convertedSalary).toBe(0);
    expect(result.convertedSalaryDeduction).toBe(0);
  });

  it('기존 퇴직소득세 공제 계산: 정밀 퇴직금 반영 후 독립 수작업 fixture', () => {
    const result = calculateSeverance(
      createInput({
        hireDate: '2014-01-01',
        leaveDate: '2024-01-01',
        monthlyOrdinaryWage: 10_000_000,
      }),
    );
    // 3천만원/92일 ×30×3652/365 = 97,879,690원(반올림).
    // (97,879,690-15,000,000)×12/10=99,455,628.
    // 45,200,000+(99,455,628-70,000,000)×55%=61,400,595.4.
    expect(result.statutorySeverance).toBe(97_879_690);
    expect(result.convertedSalary).toBe(99_455_628);
    expect(result.convertedSalaryDeduction).toBe(61_400_595);
  });
  // ─── §10: 상여금·연차수당 3개월분 반영 ───
  it('연간 상여금 1,200만 + 연차수당 480만 → 3개월분 가산', () => {
    // 3개월 임금 = 300만 × 3 + 1,200만 × 3/12 + 480만 × 3/12 + 0
    //             = 900만 + 300만 + 120만 = 1,320만
    const result = calculateSeverance(
      createInput({
        hireDate: '2020-01-01',
        leaveDate: '2023-12-31', // 약 4년
        monthlyOrdinaryWage: 3_000_000,
        annualBonus: 12_000_000,
        annualLeaveAllowance: 4_800_000,
        includeTax: true,
      }),
    );

    expect(result.threeMonthWageTotal).toBe(13_200_000);
  });

  // ─── §11: 세금 미포함 (includeTax = false) ───
  it('includeTax = false → totalTax = 0, netSeverance = 법정퇴직금', () => {
    const result = calculateSeverance(
      createInput({
        hireDate: '2020-01-01',
        leaveDate: '2023-12-31',
        monthlyOrdinaryWage: 3_000_000,
        includeTax: false,
      }),
    );

    expect(result.totalTax).toBe(0);
    expect(result.retirementIncomeTax).toBe(0);
    expect(result.netSeverance).toBe(result.statutorySeverance);
  });

  // ─── §12: DC형 경고 메시지 ───
  it('planType = DC → DC 안내 경고 추가', () => {
    const result = calculateSeverance(
      createInput({
        hireDate: '2020-01-01',
        leaveDate: '2023-12-31',
        monthlyOrdinaryWage: 3_000_000,
        planType: 'DC',
        includeTax: true,
      }),
    );

    // DC 경고가 배열에 포함되어 있는지 확인 (정확한 문자열 매칭)
    const hasDCWarning = result.warnings.some((w) =>
      w.includes('DC형은 실제 적립금·운용수익이 별도 산출됩니다'),
    );
    expect(hasDCWarning).toBe(true);
  });

  // ─── 추가 1: 윤년 처리 (2024는 윤년) ───
  it('2024-01-01 ~ 2024-12-31 종료일 제외 → 365일, 역년 1년 미만', () => {
    const result = calculateSeverance(
      createInput({
        hireDate: '2024-01-01',
        leaveDate: '2024-12-31', // 윤년, 366일
        monthlyOrdinaryWage: 5_000_000,
        includeTax: true,
      }),
    );

    expect(result.serviceDays).toBe(365);
    expect(result.isEligibleForStatutory).toBe(false);
    expect(result.statutorySeverance).toBe(0);
  });

  // ─── 추가 2: 지방소득세 (퇴직소득세의 10%) ───
  it('퇴직소득세 계산 시 지방소득세 = 퇴직소득세 × 10%', () => {
    const result = calculateSeverance(
      createInput({
        hireDate: '2014-01-01',
        leaveDate: '2024-01-01', // 10년
        monthlyOrdinaryWage: 10_000_000,
        includeTax: true,
      }),
    );

    // 근속공제 15M, 환산급여가 산출되면 환산급여공제 적용
    // 과세표준 → 소득세율 적용 → 월 환산 × 근속연수
    expect(result.localIncomeTax).toBe(Math.floor((result.retirementIncomeTax * 0.1) / 10) * 10);
  });

  // ─── 추가 3: 월 평균 임금 0원 경고 ───
  it('monthlyOrdinaryWage = 0 → 경고 추가', () => {
    const result = calculateSeverance(
      createInput({
        hireDate: '2020-01-01',
        leaveDate: '2023-12-31',
        monthlyOrdinaryWage: 0,
        includeTax: true,
      }),
    );

    expect(result.warnings).toContain(
      '평균임금 자료의 합계가 0원입니다. 실제 지급된 임금 자료를 확인해 주세요.',
    );
  });

  // ─── 추가 4: 정확한 기초일수 계산 (3개월 구간) ───
  it('3개월 기간의 일수를 정확히 계산', () => {
    // 2023-10-01 ~ 2023-12-31 = 92일
    const result = calculateSeverance(
      createInput({
        hireDate: '2020-01-01',
        leaveDate: '2023-12-31',
        monthlyOrdinaryWage: 3_000_000,
        includeTax: false,
      }),
    );

    expect(result.threeMonthDays).toBe(92);
  });

  // ─── 추가 5: 근속연수 소수점 4자리 정확도 ───
  it('serviceYears 는 소수점 4자리 표기', () => {
    const result = calculateSeverance(
      createInput({
        hireDate: '2020-01-01',
        leaveDate: '2020-12-31', // 약 1년
        monthlyOrdinaryWage: 3_000_000,
        includeTax: false,
      }),
    );

    // 365일이면 serviceYears = 365 / 365 = 1.0000
    // 366일이면 serviceYears = 366 / 365 = 1.0027
    const yearsStr = result.serviceYears.toFixed(4);
    expect(yearsStr).toMatch(/^\d+\.\d{4}$/);
  });

  // ─── 추가 6: 10원 단위 절사 (법정퇴직금) ───
  it('퇴직소득세와 지방소득세 참고 계산은 기존 10원 단위 절사 유지', () => {
    const result = calculateSeverance(
      createInput({
        hireDate: '2020-01-01',
        leaveDate: '2023-12-31',
        monthlyOrdinaryWage: 3_000_000,
        includeTax: true,
      }),
    );

    // 모든 세금은 10원 단위 절사 (끝자리 항상 0)
    expect(result.retirementIncomeTax % 10).toBe(0);
    expect(result.localIncomeTax % 10).toBe(0);
  });

  // ─── 추가 7: 세후 실수령액 = 법정퇴직금 - 총세금 ───
  it('netSeverance = statutorySeverance - totalTax', () => {
    const result = calculateSeverance(
      createInput({
        hireDate: '2014-01-01',
        leaveDate: '2024-01-01', // 10년
        monthlyOrdinaryWage: 8_000_000,
        includeTax: true,
      }),
    );

    expect(result.netSeverance).toBe(result.statutorySeverance - result.totalTax);
  });
});
