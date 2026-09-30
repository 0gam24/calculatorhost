/**
 * DTI(총부채상환비율) — 금액은 모두 연간 원 단위.
 * 근거: 한국주택금융공사 보금자리론 업무처리기준 제5장 2절,
 * 2026-07-20 개정, 본문 17~18쪽.
 * https://www.hf.go.kr/ko/sub01/sub01_01_01.do (업무처리기준 PDF)
 * 주택담보대출은 신규·기존 모두 원리금, 기타 부채는 이자를 합산한다.
 * 금융기관별 심사 소득·연간상환액·추정이자는 사용자가 별도 확인해야 한다.
 * 이 함수는 규제 한도 또는 대출 승인 여부를 판정하지 않는다.
 */
export interface DebtToIncomeInput {
  annualIncome: number;
  mortgageAnnualPayment: number;
  otherLoanAnnualInterest: number;
}

export interface DebtToIncomeResult {
  /** 0.4 = 40%. 소득 0원인 경우 정의할 수 없어 null */
  ratio: number | null;
  annualDebtPayment: number;
}

export function calculateDebtToIncome(input: DebtToIncomeInput): DebtToIncomeResult {
  for (const value of [
    input.annualIncome,
    input.mortgageAnnualPayment,
    input.otherLoanAnnualInterest,
  ]) {
    if (!Number.isFinite(value) || value < 0) {
      throw new RangeError('연 소득과 상환액은 0 이상의 유한한 금액이어야 합니다.');
    }
  }
  const annualDebtPayment = input.mortgageAnnualPayment + input.otherLoanAnnualInterest;
  return {
    annualDebtPayment,
    ratio: input.annualIncome === 0 ? null : annualDebtPayment / input.annualIncome,
  };
}
