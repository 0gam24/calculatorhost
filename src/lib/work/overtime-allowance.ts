/**
 * 성인 일반근로자의 근로기준법56조 적용 사업장, 한 근무일의 수당 참고 계산.
 * 근거: 근로기준법56조1~3항(시행2026.10.2).
 * https://law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1012828203
 * 권리·사업장 적용 여부·통상시급·계약상 추가 지급·기지급액·별도 유급휴일 임금·공제는 판정하지 않는다.
 * 24시간/시급100만원은 계산기의 입력 지원 범위이며 법정 한도가 아니다.
 * 원 미만 반올림·절사 규칙을 가정하지 않으며 반환 금액에 소수가 있을 수 있다.
 */
export type AllowanceMode = 'overtime' | 'holiday' | 'scheduledNight';

export interface OvertimeAllowanceInput {
  mode: AllowanceMode;
  /** 사용자가 별도 확인한 통상시급(원). */
  hourlyWage: number;
  /** 한 근무일의 해당 근로시간. 소정야간 모드에는 야간을 포함한 소정근로시간. */
  totalHours: number;
  /** 총근로 중22~06시에 해당하는 시간. */
  nightHours: number;
}

export interface OvertimeAllowanceResult {
  workPay: number;
  overtimePremium: number;
  holidayPremium: number;
  nightPremium: number;
  premiumPay: number;
  totalPay: number;
}

function toHundredthHours(value: number, label: string): bigint {
  if (!Number.isFinite(value) || value < 0 || value > 24) {
    throw new RangeError(`${label}은 0~24시간 범위의 유한한 숫자여야 합니다.`);
  }
  // 0.29×100 등의 이진 부동소수 오차 때문에 곱셈 결과의 정수 여부로 판정하지 않는다.
  const hundredths = Math.round(value * 100);
  if (hundredths / 100 !== value) {
    throw new RangeError(`${label}은 소수 둘째 자리까지 입력해 주세요.`);
  }
  return BigInt(hundredths);
}

export function calculateOvertimeAllowance(input: OvertimeAllowanceInput): OvertimeAllowanceResult {
  const { mode, hourlyWage, totalHours, nightHours } = input;
  if (mode !== 'overtime' && mode !== 'holiday' && mode !== 'scheduledNight') {
    throw new RangeError('계산 유형은 연장근로, 휴일근로, 소정근로 중 야간 중 하나여야 합니다.');
  }
  if (!Number.isInteger(hourlyWage) || hourlyWage < 0 || hourlyWage > 1_000_000) {
    throw new RangeError('통상시급은 0~1,000,000원 범위의 원 단위 정수여야 합니다.');
  }
  const total = toHundredthHours(totalHours, '총 근로시간');
  const night = toHundredthHours(nightHours, '야간 근로시간');
  if (mode === 'scheduledNight' && total > 800n) {
    throw new RangeError('소정 야간 모드는 한 근무일 8시간 이하만 지원합니다. 연장·야간 시간을 구분해 확인해 주세요.');
  }
  if (night > total || night > 800n) {
    throw new RangeError('야간 근로시간은 총 근로시간 이내이면서 한 근무일 8시간 이하여야 합니다.');
  }

  // 모든 금액을 분모200의 정수 분자로 계산하여 시간×시급×0.5 누적 오차를 피한다.
  const wage = BigInt(hourlyWage);
  const work = mode === 'scheduledNight' ? 0n : total * wage * 2n;
  const overtime = mode === 'overtime' ? total * wage : 0n;
  const firstEight = total < 800n ? total : 800n;
  const afterEight = total > 800n ? total - 800n : 0n;
  // 제56조2항: 휴일가산에 연장50%를 다시 더하지 않는다.
  const holiday = mode === 'holiday' ? (firstEight + afterEight * 2n) * wage : 0n;
  const nightExtra = night * wage;
  const premiums = overtime + holiday + nightExtra;
  const asWon = (numerator: bigint): number => Number(numerator) / 200;
  return {
    workPay: asWon(work),
    overtimePremium: asWon(overtime),
    holidayPremium: asWon(holiday),
    nightPremium: asWon(nightExtra),
    premiumPay: asWon(premiums),
    totalPay: asWon(work + premiums),
  };
}
