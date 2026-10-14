/** 원 단위 금액: 반올림 + 천 단위 쉼표 + "원" */
export const won = (n: number): string => `${Math.round(n).toLocaleString('ko-KR')}원`;

/** 금액 라벨: 1억 5,000만 원 / 5,000만 원 / 10만 원 */
export function manWon(n: number): string {
  const eok = Math.floor(n / 100_000_000);
  const man = Math.round((n % 100_000_000) / 10_000);
  if (eok > 0 && man > 0) return `${eok}억 ${man.toLocaleString('ko-KR')}만 원`;
  if (eok > 0) return `${eok}억 원`;
  return `${man.toLocaleString('ko-KR')}만 원`;
}

/** 비율(소수) → "1.67%" */
export const pct = (ratio: number, digits = 2): string => `${(ratio * 100).toFixed(digits)}%`;
