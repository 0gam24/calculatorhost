import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 한국 원화 포맷 (천 단위 쉼표).
 * 10원 미만은 절사 (세금 계산 표준).
 */
export function formatKRW(amount: number, options: { truncateTen?: boolean } = {}): string {
  const value = options.truncateTen === false ? amount : Math.floor(amount / 10) * 10;
  return `${value.toLocaleString('ko-KR')}원`;
}

/**
 * 큰 단위 한국어 축약 (억/만원)
 */
export function formatKoreanUnit(amount: number): string {
  const abs = Math.abs(amount);
  if (abs >= 100_000_000) {
    const eok = amount / 100_000_000;
    return `${eok.toFixed(eok % 1 === 0 ? 0 : 2)}억원`;
  }
  if (abs >= 10_000) {
    const man = Math.floor(amount / 10_000);
    return `${man.toLocaleString('ko-KR')}만원`;
  }
  return formatKRW(amount);
}

export function formatPercent(ratio: number, fractionDigits = 2): string {
  return `${(ratio * 100).toFixed(fractionDigits)}%`;
}
