import { describe, expect, it } from 'vitest';
import { calculateMonthlyWithholding } from '@/lib/tax/withholding';
import { calculateTakeHome, inferGrossFromNetDetailed } from '@/lib/tax/income';

// 독립 fixture: 공식 PDF14쪽3500~3520천원 행, 27쪽 고액 산식.
// https://www.law.go.kr/LSW/flDownload.do?flSeq=169798151 (개정2026.2.27)
describe('2026 공식 월 원천징수 표', () => {
  it.each([
    [3_499_999, 1, 0, 124_770],
    [3_500_000, 1, 0, 127_220],
    [3_500_000, 3, 1, 41_630],
    [3_500_000, 4, 2, 3_510],
    [3_500_000, 5, 3, 0],
    [3_520_000, 1, 0, 129_660],
    [3_500_000, 12, 0, 7_270], // 10640−(14010−10640)×1
    [3_500_000, 15, 0, 0],
    [0, 1, 0, 0],
    [769_999, 1, 0, 0],
  ])('과세급여%i/가족%i/자녀%i → %i원', (salary, family, children, expected) => {
    expect(calculateMonthlyWithholding(salary, family, children).incomeTax).toBe(expected);
  });

  it('지급·원천징수월2→3에 자녀공제만 변경된다', () => {
    expect(calculateMonthlyWithholding(3_500_000, 4, 2, 1).incomeTax).toBe(20_180);
    expect(calculateMonthlyWithholding(3_500_000, 4, 2, 2).incomeTax).toBe(20_180);
    expect(calculateMonthlyWithholding(3_500_000, 4, 2, 3).incomeTax).toBe(3_510);
    expect(calculateMonthlyWithholding(3_500_000, 3, 1, 2).incomeTax).toBe(49_960);
    expect(calculateMonthlyWithholding(3_500_000, 3, 1, 3).incomeTax).toBe(41_630);
    expect(calculateMonthlyWithholding(3_500_000, 1, 0, 2).incomeTax).toBe(127_220);
  });

  it('80/120%는 자녀공제 후 적용하고 최종10원 미만을 버린다', () => {
    expect(calculateMonthlyWithholding(3_500_000, 1, 0, 7, 80)).toEqual({ referenceTax: 127_220, incomeTax: 101_770 });
    expect(calculateMonthlyWithholding(3_500_000, 1, 0, 7, 120).incomeTax).toBe(152_660);
    expect(calculateMonthlyWithholding(3_500_000, 3, 1, 7, 80)).toEqual({ referenceTax: 41_630, incomeTax: 33_300 });
    expect(calculateMonthlyWithholding(3_500_000, 3, 1, 7, 120).incomeTax).toBe(49_950);
    expect(calculateMonthlyWithholding(3_500_000, 4, 2, 7, 80).incomeTax).toBe(2_800);
    expect(calculateMonthlyWithholding(3_500_000, 4, 2, 7, 120).incomeTax).toBe(4_210);
  });

  it('1천원 미만 부징수는 비율 적용 후 판단하며 =1000원은 징수', () => {
    // PDF4쪽:1060~1065천원1040,1075~1080천원1250.
    expect(calculateMonthlyWithholding(1_060_000, 1, 0, 7, 80)).toEqual({ referenceTax: 1_040, incomeTax: 0 });
    expect(calculateMonthlyWithholding(1_060_000, 1, 0, 7, 100).incomeTax).toBe(1_040);
    expect(calculateMonthlyWithholding(1_060_000, 1, 0, 7, 120).incomeTax).toBe(1_240);
    expect(calculateMonthlyWithholding(1_075_000, 1, 0, 7, 80).incomeTax).toBe(1_000);
    // 가족50명:10M기준960840−30000×39=−209160. 고액 가산식 적용 전0하한 금지.
    const below = calculateMonthlyWithholding(10_539_825, 50, 0);
    expect(below.referenceTax).toBeCloseTo(999.975, 3);
    expect(below.incomeTax).toBe(0);
    expect(calculateMonthlyWithholding(10_539_826, 50, 0).incomeTax).toBe(1_000);
  });

  it('11초과 공식 조정은 실제 세액 감소 구간을 보존한다', () => {
    // PDF22쪽:7640행10명482520/11명462200,7660행486740/464840.
    expect(calculateMonthlyWithholding(7_640_000, 20, 0).incomeTax).toBe(279_320);
    expect(calculateMonthlyWithholding(7_660_000, 20, 0).incomeTax).toBe(267_740);
  });

  it.each([
    [9_999_999, 1_503_990], [10_000_000, 1_507_400], [10_000_001, 1_532_400],
    [13_999_999, 2_904_390], [14_000_000, 2_904_400], [14_000_001, 2_904_400],
    [27_999_999, 8_117_990], [28_000_000, 8_118_000], [28_000_001, 8_118_000],
    [29_999_999, 8_901_990], [30_000_000, 8_902_000], [30_000_001, 8_902_000],
    [44_999_999, 14_901_990], [45_000_000, 14_902_000], [45_000_001, 14_902_000],
    [86_999_999, 32_541_990], [87_000_000, 32_542_000], [87_000_001, 32_542_000],
    [90_000_000, 33_892_000],
  ])('고액 산식 경계%i원 → %i원', (salary, expected) => {
    expect(calculateMonthlyWithholding(salary, 1, 0).incomeTax).toBe(expected);
  });

  it('고액 기준행에도 가족·자녀·80%를 같은 순서로 적용한다', () => {
    // 정확히10M:1170840−45830=1125010;80%=900008→900000.
    expect(calculateMonthlyWithholding(10_000_000, 4, 2, 7, 80)).toEqual({ referenceTax: 1_125_010, incomeTax: 900_000 });
    expect(calculateMonthlyWithholding(10_000_001, 4, 2, 7, 80).incomeTax).toBe(920_000);
  });

  it.each([-1, NaN, Infinity, 1.5, Number.MAX_SAFE_INTEGER + 1])('잘못된 과세급여%s는 거부', (salary) => {
    expect(() => calculateMonthlyWithholding(salary, 1, 0)).toThrow(RangeError);
  });
  it('가족·자녀·월·비율의 잘못된 조합은 거부', () => {
    for (const family of [0, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1])
      expect(() => calculateMonthlyWithholding(3_500_000, family, 0)).toThrow(RangeError);
    for (const children of [-1, 1, 1.5, NaN])
      expect(() => calculateMonthlyWithholding(3_500_000, 1, children)).toThrow(RangeError);
    for (const month of [0, 13, 1.5, NaN])
      expect(() => calculateMonthlyWithholding(3_500_000, 1, 0, month)).toThrow(RangeError);
    expect(() => calculateMonthlyWithholding(3_500_000, 1, 0, 7, 90 as 100)).toThrow(RangeError);
  });
});

describe('공식 표 실수령액 연결과 역산 불연속', () => {
  const options = { nontaxableMonthly: 0, dependents: 1, children: 0 };
  const forward = (gross: number, extra = {}) => calculateTakeHome({
    wageType: 'monthly', wageAmount: gross, severance: 'separate', ...options, ...extra,
  });

  it('특별징수 지방소득세104원은10원 미만 버림100원이고2천원 부징수하지 않는다', () => {
    const result = forward(1_060_000);
    expect(result.incomeTax).toBe(1_040);
    expect(result.localIncomeTax).toBe(100);
    expect(forward(1_060_000, { withholdingRate: 80 }).localIncomeTax).toBe(0);
  });
  it('비과세 전액·0급여와 전환으로 생긴 소수급여를 정규화한다', () => {
    expect(forward(0).monthlyNetIncome).toBe(0);
    expect(forward(3_500_000, { nontaxableMonthly: 3_500_000 }).incomeTax).toBe(0);
    expect(forward(50_000_000 / 12).monthlyGrossIncome).toBe(4_166_666);
    expect(forward(50_000_000 / 13).monthlyGrossIncome).toBe(3_846_153);
    expect(() => forward(3_500_000, { nontaxableMonthly: 0.5 })).toThrow(RangeError);
  });

  it.each([
    [3_499_999, 1, 0, 7], [3_500_000, 1, 0, 7], [3_520_000, 1, 0, 7],
    [7_639_999, 20, 0, 7], [7_640_000, 20, 0, 7], [7_659_999, 20, 0, 7], [7_660_000, 20, 0, 7],
    [10_000_000, 1, 0, 7], [10_000_001, 1, 0, 7],
    [6_370_000, 1, 0, 6], [6_590_000, 1, 0, 7], [410_999, 1, 0, 7], [411_000, 1, 0, 7],
    [10_539_825, 50, 0, 7], [10_539_826, 50, 0, 7],
    [3_500_000, 4, 2, 2], [3_500_000, 4, 2, 3],
  ])('실제 달성 가능한 월급%i/가족%i/자녀%i/월%i 역산 후 재계산', (gross, dependents, children, calculationMonth) => {
    const selected = { ...options, dependents, children, calculationMonth };
    const target = forward(gross, selected).monthlyNetIncome;
    const result = inferGrossFromNetDetailed(target, selected);
    const actual = forward(result.annualGrossIncome / 12, selected).monthlyNetIncome;
    expect(result.achievedMonthlyNet).toBe(actual);
    expect(result.difference).toBe(actual - target);
    expect(result.targetMatched).toBe(true);
    expect(actual).toBe(target);
    expect(result.annualGrossIncome).toBeLessThanOrEqual(gross * 12);
  });

  it('가족20명 세액 감소로 생기는 도달 불가능한 간격은 양쪽 실제 후보를 비교한다', () => {
    const selected = { ...options, dependents: 20 };
    const before = forward(7_659_999, selected).monthlyNetIncome;
    const after = forward(7_660_000, selected).monthlyNetIncome;
    const target = Math.floor((before + after) / 2);
    const candidates: { gross: number; net: number }[] = [];
    // 독립 국소 완전 탐색: 간격 양끝200원씩, 알고리즘의 이분 탐색과 무관하게 검산.
    for (const boundary of [7_659_999, 7_660_000]) {
      for (let gross = boundary - 200; gross <= boundary + 200; gross++)
        candidates.push({ gross, net: forward(gross, selected).monthlyNetIncome });
    }
    candidates.sort((a, b) => Math.abs(a.net - target) - Math.abs(b.net - target) || a.gross - b.gross);
    const result = inferGrossFromNetDetailed(target, selected);
    expect(result.targetMatched).toBe(false);
    expect(result.annualGrossIncome).toBe(candidates[0]!.gross * 12);
    expect(result.achievedMonthlyNet).toBe(candidates[0]!.net);
    expect(result.difference).toBe(candidates[0]!.net - target);
  });

  it('선택비율과 비과세를 역산에서도 보존한다', () => {
    const selected = { ...options, nontaxableMonthly: 200_000, dependents: 4, children: 2, withholdingRate: 120 as const, calculationMonth: 3 };
    const target = forward(3_700_000, selected).monthlyNetIncome;
    const result = inferGrossFromNetDetailed(target, selected);
    expect(forward(result.annualGrossIncome / 12, selected).monthlyNetIncome).toBe(target);
    expect(result.targetMatched).toBe(true);
  });
  it('탐색한계와 정확히 도달하지 못한 목표를 숨기지 않는다', () => {
    const result = inferGrossFromNetDetailed(1_000_000_000, options);
    expect(result.annualGrossIncome).toBe(999_999_996);
    expect(result.atSearchLimit).toBe(true);
    expect(result.targetMatched).toBe(false);
    expect(result.difference).toBe(result.achievedMonthlyNet - 1_000_000_000);
    const fractional = inferGrossFromNetDetailed(0.5, options);
    expect(fractional.targetMatched).toBe(false);
    expect(fractional.annualGrossIncome).toBe(0); // 같은0.5원 오차이면 낮은 연봉.
    expect(fractional.difference).toBe(-0.5);
  });
  it('새 상세API는 잘못된 목표·옵션을 거부하고0원은 정상 처리한다', () => {
    for (const value of [-1, NaN, Infinity])
      expect(() => inferGrossFromNetDetailed(value, options)).toThrow(RangeError);
    expect(() => inferGrossFromNetDetailed(1, { ...options, children: 2 })).toThrow(RangeError);
    expect(() => inferGrossFromNetDetailed(1, { ...options, calculationMonth: 13 })).toThrow(RangeError);
    expect(inferGrossFromNetDetailed(0, options)).toEqual({ annualGrossIncome: 0, achievedMonthlyNet: 0, difference: 0, targetMatched: true, atSearchLimit: false });
  });
});
