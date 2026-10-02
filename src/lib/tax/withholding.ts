/**
 * 2026년 일반 월급여의 근로소득 간이세액표 원천징수.
 * 소득세법 시행령 별표 2(제189조제1항), 제194조.
 * https://www.law.go.kr/LSW/flDownload.do?flSeq=169798151
 * 지급·원천징수 월 기준: 2026.3.1부터 자녀 공제액 변경(대통령령36129 부칙15조).
 * 상여금, 복수 근무지, 일용근로 및 개별 특례는 이 함수의 지원 범위 밖이다.
 */
import {
  WITHHOLDING_ROWS_2026,
  WITHHOLDING_AT_TEN_MILLION_2026,
  WITHHOLDING_CHILD_CREDITS_2026,
  WITHHOLDING_HIGH_WAGE_BRACKETS_2026,
  WITHHOLDING_MINIMUM_COLLECTION,
} from '@/lib/constants/withholding-table-2026';

export type WithholdingRate = 80 | 100 | 120;

export interface MonthlyWithholdingResult {
  /** 가족·자녀 공제 후, 선택 비율 적용 전 세액. 고액급여 계산은 원 미만을 포함할 수 있다. */
  referenceTax: number;
  /** 선택 비율, 소액부징수와 최종 10원 미만 끝수 처리를 적용한 월 소득세. */
  incomeTax: number;
}

export function calculateMonthlyWithholding(
  monthlyTaxable: number,
  dependents: number,
  children: number,
  month = 7,
  rate: WithholdingRate = 100,
): MonthlyWithholdingResult {
  if (!Number.isSafeInteger(monthlyTaxable) || monthlyTaxable < 0) {
    throw new RangeError('월 과세급여는 0 이상인 안전한 원 단위 정수여야 합니다.');
  }
  if (
    !Number.isSafeInteger(dependents) || dependents < 1 ||
    !Number.isSafeInteger(children) || children < 0 || children > dependents - 1
  ) {
    throw new RangeError('가족 수는 본인 포함 1명 이상, 8~20세 공제대상 자녀는 본인 제외 가족 수 이내의 정수여야 합니다.');
  }
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new RangeError('2026년 원천징수 월은 1~12월이어야 합니다.');
  }
  if (rate !== 80 && rate !== 100 && rate !== 120) {
    throw new RangeError('원천징수 비율은 80%, 100%, 120% 중 하나여야 합니다.');
  }

  let columns: readonly number[] | undefined;
  if (monthlyTaxable >= 10_000_000) {
    columns = WITHHOLDING_AT_TEN_MILLION_2026;
  } else {
    let lo = 0;
    let hi = WITHHOLDING_ROWS_2026.length - 1;
    while (lo <= hi) {
      const middle = Math.floor((lo + hi) / 2);
      const row = WITHHOLDING_ROWS_2026[middle]!;
      if (monthlyTaxable < row.lower) hi = middle - 1;
      else if (monthlyTaxable >= row.upper) lo = middle + 1;
      else { columns = row.taxes; break; }
    }
  }
  if (!columns) return { referenceTax: 0, incomeTax: 0 };

  // 11명 초과: 11명 열 − (10명 열 − 11명 열) × (가족 수 − 11).
  // 고액급여 추가액을 더하기 전에 음수를 0으로 바꾸면 과다 원천징수가 발생한다.
  let familyTax = BigInt(columns[Math.min(dependents, 11) - 1]!);
  if (dependents > 11) {
    familyTax -= BigInt(columns[9]! - columns[10]!) * BigInt(dependents - 11);
  }
  let numerator = familyTax * 10_000n;
  if (monthlyTaxable > 10_000_000) {
    const bracket = WITHHOLDING_HIGH_WAGE_BRACKETS_2026.find(
      (item) => monthlyTaxable > item.lowerExclusive &&
        (item.upperInclusive === null || monthlyTaxable <= item.upperInclusive),
    )!;
    numerator += BigInt(bracket.fixedAddition) * 10_000n;
    numerator += BigInt(monthlyTaxable - bracket.excessBase) * BigInt(bracket.numerator);
  }
  const credits = month < 3
    ? WITHHOLDING_CHILD_CREDITS_2026.beforeMarch
    : WITHHOLDING_CHILD_CREDITS_2026.fromMarch;
  const childCredit = children === 0 ? 0n : children === 1
    ? BigInt(credits.one)
    : BigInt(credits.two) + BigInt(children - 2) * BigInt(credits.additional);
  numerator -= childCredit * 10_000n;
  if (numerator <= 0n) return { referenceTax: 0, incomeTax: 0 };

  // 제194조의 비율을 가족·자녀 조정 세액에 적용한다.
  // 국고금 관리법47조: 최종 국세 징수금 10원 미만 끝수 버림.
  // 소득세법86조: 원천징수세액 1천원 미만 부징수(1천원은 징수).
  const selectedTax = (numerator * BigInt(rate) / 10_000_000n) * 10n;
  const incomeTax = selectedTax < BigInt(WITHHOLDING_MINIMUM_COLLECTION) ? 0 : Number(selectedTax);
  return { referenceTax: Number(numerator) / 10_000, incomeTax };
}
