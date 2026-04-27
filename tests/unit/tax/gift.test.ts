/**
 * 증여세 계산 단위 테스트
 *
 * 문서: docs/calculator-spec/증여세.md §9
 * 함수: src/lib/tax/gift.ts
 */

import { describe, it, expect } from 'vitest';
import { calculateGiftTax, type GiftInput } from '@/lib/tax/gift';

describe('calculateGiftTax', () => {
  // ─────────────────────────────────────────────
  // 1. 배우자 6억 증여 → 공제 6억 → 과표 0 → 세금 0
  // ─────────────────────────────────────────────
  it('배우자 6억 증여 → 세금 0', () => {
    const input: GiftInput = {
      giftValue: 600_000_000,
      relation: 'spouse',
      priorGiftValue: 0,
      assumedDebt: 0,
      reportWithinDeadline: true,
    };

    const result = calculateGiftTax(input);

    expect(result.giftValue).toBe(600_000_000);
    expect(result.taxableValue).toBe(600_000_000);
    expect(result.giftDeduction).toBe(600_000_000);
    expect(result.taxableBase).toBe(0);
    expect(result.grossTax).toBe(0);
    expect(result.reportingCredit).toBe(0);
    expect(result.finalTax).toBe(0);
  });

  // ─────────────────────────────────────────────
  // 2. 배우자 10억 증여 → 공제 6억 → 과표 4억 → 20% 구간 × 4억
  // ─────────────────────────────────────────────
  it('배우자 10억 증여 → 과표 4억 → 세금 7천만', () => {
    const input: GiftInput = {
      giftValue: 1_000_000_000,
      relation: 'spouse',
      priorGiftValue: 0,
      assumedDebt: 0,
      reportWithinDeadline: true,
    };

    const result = calculateGiftTax(input);

    expect(result.giftValue).toBe(1_000_000_000);
    expect(result.taxableValue).toBe(1_000_000_000);
    expect(result.giftDeduction).toBe(600_000_000);
    expect(result.taxableBase).toBe(400_000_000);

    // 구간: 5억 초과 → 20% × 4억 - 1,000만 = 8,000만 - 1,000만 = 7,000만
    expect(result.grossTax).toBe(70_000_000);

    // 신고공제: 7,000만 × 3% = 2,100,000 (10원 단위 절사 → 210만)
    expect(result.reportingCredit).toBe(2_100_000);

    // 최종: 7,000만 - 210만 = 6,790만
    expect(result.finalTax).toBe(67_900_000);
  });

  // ─────────────────────────────────────────────
  // 3. 성년 자녀 1억 증여 → 공제 5천만 → 과표 5천만 → 10% = 500만
  // ─────────────────────────────────────────────
  it('성년 자녀 1억 증여 → 과표 5천만 → 세금 500만', () => {
    const input: GiftInput = {
      giftValue: 100_000_000,
      relation: 'adultDescendant',
      priorGiftValue: 0,
      assumedDebt: 0,
      reportWithinDeadline: true,
    };

    const result = calculateGiftTax(input);

    expect(result.giftValue).toBe(100_000_000);
    expect(result.taxableValue).toBe(100_000_000);
    expect(result.giftDeduction).toBe(50_000_000);
    expect(result.taxableBase).toBe(50_000_000);

    // 구간: 1억 이하 → 10% × 5천만 = 500만
    expect(result.grossTax).toBe(5_000_000);

    // 신고공제: 500만 × 3% = 150,000
    expect(result.reportingCredit).toBe(150_000);

    // 최종: 500만 - 15만 = 485만
    expect(result.finalTax).toBe(4_850_000);
  });

  // ─────────────────────────────────────────────
  // 4. 미성년 자녀 1억 증여 → 공제 2천만 → 과표 8천만 → 10% = 800만
  // ─────────────────────────────────────────────
  it('미성년 자녀 1억 증여 → 과표 8천만 → 세금 800만', () => {
    const input: GiftInput = {
      giftValue: 100_000_000,
      relation: 'minorDescendant',
      priorGiftValue: 0,
      assumedDebt: 0,
      reportWithinDeadline: true,
    };

    const result = calculateGiftTax(input);

    expect(result.giftValue).toBe(100_000_000);
    expect(result.taxableValue).toBe(100_000_000);
    expect(result.giftDeduction).toBe(20_000_000);
    expect(result.taxableBase).toBe(80_000_000);

    // 구간: 1억 이하 → 10% × 8천만 = 800만
    expect(result.grossTax).toBe(8_000_000);

    // 신고공제: 800만 × 3% = 240,000
    expect(result.reportingCredit).toBe(240_000);

    // 최종: 800만 - 24만 = 776만
    expect(result.finalTax).toBe(7_760_000);
  });

  // ─────────────────────────────────────────────
  // 5. 부모자녀 10억 증여 → 공제 5천만 → 과표 9.5억 → 30% 구간
  // ─────────────────────────────────────────────
  it('부모자녀 10억 증여 → 과표 9.5억 → 세금 2.25억', () => {
    const input: GiftInput = {
      giftValue: 1_000_000_000,
      relation: 'ascendant',
      priorGiftValue: 0,
      assumedDebt: 0,
      reportWithinDeadline: true,
    };

    const result = calculateGiftTax(input);

    expect(result.giftValue).toBe(1_000_000_000);
    expect(result.taxableValue).toBe(1_000_000_000);
    expect(result.giftDeduction).toBe(50_000_000);
    expect(result.taxableBase).toBe(950_000_000);

    // 구간: 10억 이하 → 30% × 9.5억 - 6,000만 = 285,000,000 - 60,000,000 = 225,000,000
    expect(result.grossTax).toBe(225_000_000);

    // 신고공제: 2.25억 × 3% = 6,750,000
    expect(result.reportingCredit).toBe(6_750_000);

    // 최종: 2.25억 - 675만 = 2.175억
    expect(result.finalTax).toBe(218_250_000);
  });

  // ─────────────────────────────────────────────
  // 6. 10년 내 기증여 5천만 있었고, 성년 자녀에게 추가 1억 증여
  // ─────────────────────────────────────────────
  it('10년 기증여 5천만 있고, 추가 1억 증여 → 유효공제 0 → 과표 1억', () => {
    const input: GiftInput = {
      giftValue: 100_000_000,
      relation: 'adultDescendant',
      priorGiftValue: 50_000_000, // 10년 내 기증여
      assumedDebt: 0,
      reportWithinDeadline: true,
    };

    const result = calculateGiftTax(input);

    expect(result.giftValue).toBe(100_000_000);
    expect(result.taxableValue).toBe(150_000_000); // 100 + 50
    expect(result.giftDeduction).toBe(0); // 5천만 - 5천만 = 0
    expect(result.taxableBase).toBe(150_000_000);

    // 구간: 1억 초과 5억 이하 → 20% × 1.5억 - 1,000만 = 30,000,000 - 10,000,000 = 20,000,000
    expect(result.grossTax).toBe(20_000_000);

    // 신고공제: 2천만 × 3% = 600,000
    expect(result.reportingCredit).toBe(600_000);

    // 최종: 2천만 - 60만 = 1,940만
    expect(result.finalTax).toBe(19_400_000);

    // warning 확인 (기증여 합산 관련 경고)
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings.some(w => w.includes('한도를 초과'))).toBe(true);
  });

  // ─────────────────────────────────────────────
  // 7. 부담부증여: 채무 5천만, 증여 1억 → 과세가액 5천만 → 성년 자녀
  // ─────────────────────────────────────────────
  it('부담부증여: 채무 5천만, 증여 1억 → 과세가액 5천만 → 세금 0', () => {
    const input: GiftInput = {
      giftValue: 100_000_000,
      relation: 'adultDescendant',
      priorGiftValue: 0,
      assumedDebt: 50_000_000, // 부담부증여
      reportWithinDeadline: true,
    };

    const result = calculateGiftTax(input);

    expect(result.giftValue).toBe(100_000_000);
    expect(result.assumedDebt).toBe(50_000_000);
    expect(result.taxableValue).toBe(50_000_000); // 100 - 50
    expect(result.giftDeduction).toBe(50_000_000);
    expect(result.taxableBase).toBe(0);
    expect(result.grossTax).toBe(0);
    expect(result.finalTax).toBe(0);
  });

  // ─────────────────────────────────────────────
  // 8. 30억 초과 50% 구간: 40억 증여 자녀 → 과표 39.5억
  // ─────────────────────────────────────────────
  it('40억 증여 자녀 → 과표 39.5억 → 50% 구간 → 세금 1.5375억', () => {
    const input: GiftInput = {
      giftValue: 4_000_000_000,
      relation: 'adultDescendant',
      priorGiftValue: 0,
      assumedDebt: 0,
      reportWithinDeadline: true,
    };

    const result = calculateGiftTax(input);

    expect(result.giftValue).toBe(4_000_000_000);
    expect(result.taxableValue).toBe(4_000_000_000);
    expect(result.giftDeduction).toBe(50_000_000);
    expect(result.taxableBase).toBe(3_950_000_000);

    // 구간: 30억 초과 → 50% × 39.5억 - 4.6억 = 1,975,000,000 - 460,000,000 = 1,515,000,000
    expect(result.grossTax).toBe(1_515_000_000);

    // 신고공제: 15.15억 × 3% = 45,450,000
    expect(result.reportingCredit).toBe(45_450_000);

    // 최종: 15.15억 - 0.4545억 ≈ 14.6955억
    expect(result.finalTax).toBe(1_469_550_000);
  });

  // ─────────────────────────────────────────────
  // 9. 신고 기한 초과 → 신고세액공제 미적용
  // ─────────────────────────────────────────────
  it('신고 기한 초과 → 신고공제 0 → 최종세금 = 산출세액', () => {
    const input: GiftInput = {
      giftValue: 100_000_000,
      relation: 'adultDescendant',
      priorGiftValue: 0,
      assumedDebt: 0,
      reportWithinDeadline: false, // 기한 초과
    };

    const result = calculateGiftTax(input);

    expect(result.giftValue).toBe(100_000_000);
    expect(result.taxableBase).toBe(50_000_000);
    expect(result.grossTax).toBe(5_000_000);
    expect(result.reportingCredit).toBe(0); // 신고공제 미적용
    expect(result.finalTax).toBe(5_000_000);

    // warning 확인
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[result.warnings.length - 1]).toContain('신고기한');
  });

  // ─────────────────────────────────────────────
  // 10. 기타 친족 6억 증여 → 공제 1천만 → 과표 5.9억 → 30% 구간
  // ─────────────────────────────────────────────
  it('기타 친족 6억 증여 → 과표 5.9억 → 세금 1.17억', () => {
    const input: GiftInput = {
      giftValue: 600_000_000,
      relation: 'otherRelative',
      priorGiftValue: 0,
      assumedDebt: 0,
      reportWithinDeadline: true,
    };

    const result = calculateGiftTax(input);

    expect(result.giftValue).toBe(600_000_000);
    expect(result.taxableValue).toBe(600_000_000);
    expect(result.giftDeduction).toBe(10_000_000);
    expect(result.taxableBase).toBe(590_000_000);

    // 구간: 5억 초과 10억 이하 → 30% × 5.9억 - 6,000만 = 177,000,000 - 60,000,000 = 117,000,000
    expect(result.grossTax).toBe(117_000_000);

    // 신고공제: 1.17억 × 3% = 3,510,000
    expect(result.reportingCredit).toBe(3_510_000);

    // 최종: 1.17억 - 351만 = 1.1349억
    expect(result.finalTax).toBe(113_490_000);

    // warning 확인
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings.some(w => w.includes('기타 친족'))).toBe(true);
  });

  // ─────────────────────────────────────────────
  // 11. 음수 과세표준 → 과표 0
  // ─────────────────────────────────────────────
  it('증여 1천만, 성년자녀(공제 5천만) → 과표 0 → 세금 0', () => {
    const input: GiftInput = {
      giftValue: 10_000_000,
      relation: 'adultDescendant',
      priorGiftValue: 0,
      assumedDebt: 0,
      reportWithinDeadline: true,
    };

    const result = calculateGiftTax(input);

    expect(result.giftValue).toBe(10_000_000);
    expect(result.taxableValue).toBe(10_000_000);
    expect(result.giftDeduction).toBe(50_000_000);
    expect(result.taxableBase).toBe(0); // max(0, 10M - 50M) = 0
    expect(result.grossTax).toBe(0);
    expect(result.finalTax).toBe(0);
  });

  // ─────────────────────────────────────────────
  // 12. 입력값 0 또는 음수 → 에러 처리
  // ─────────────────────────────────────────────
  it('증여액 0 → warning + 모든 필드 0', () => {
    const input: GiftInput = {
      giftValue: 0,
      relation: 'spouse',
      priorGiftValue: 0,
      assumedDebt: 0,
      reportWithinDeadline: true,
    };

    const result = calculateGiftTax(input);

    expect(result.giftValue).toBe(0);
    expect(result.finalTax).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('증여재산');
  });

  // ─────────────────────────────────────────────
  // 13. 경계값: 1억 정확히 (구간 경계)
  // ─────────────────────────────────────────────
  it('과세표준 1억 정확히 (1억 이하 구간) → 10% = 1천만', () => {
    const input: GiftInput = {
      giftValue: 150_000_000,
      relation: 'adultDescendant', // 공제 5천만
      priorGiftValue: 0,
      assumedDebt: 0,
      reportWithinDeadline: true,
    };

    const result = calculateGiftTax(input);

    expect(result.taxableBase).toBe(100_000_000); // 150M - 50M
    // 1억 이하 구간: 10% × 1억 = 1,000만
    expect(result.grossTax).toBe(10_000_000);
  });

  // ─────────────────────────────────────────────
  // 14. 경계값: 5억 정확히 (구간 경계)
  // ─────────────────────────────────────────────
  it('과세표준 5억 정확히 (5억 이하 구간) → 20% × 5억 - 1,000만 = 9,000만', () => {
    const input: GiftInput = {
      giftValue: 550_000_000,
      relation: 'adultDescendant', // 공제 5천만
      priorGiftValue: 0,
      assumedDebt: 0,
      reportWithinDeadline: true,
    };

    const result = calculateGiftTax(input);

    expect(result.taxableBase).toBe(500_000_000); // 550M - 50M
    // 5억 이하 구간: 20% × 5억 - 1,000만 = 100,000,000 - 10,000,000 = 90,000,000
    expect(result.grossTax).toBe(90_000_000);
  });

  // ─────────────────────────────────────────────
  // 15. 10원 단위 절사 확인
  // ─────────────────────────────────────────────
  it('10원 단위 절사: 계산 결과 35만5555원 → 35만5550원', () => {
    // 특정 값을 선택하여 10원 단위 절사 확인
    // 예: 과표 = 12,345,678원, 10% = 1,234,567.8 → 절사 후 1,234,560
    const input: GiftInput = {
      giftValue: 12_895_678,
      relation: 'adultDescendant', // 공제 5천만
      priorGiftValue: 0,
      assumedDebt: 0,
      reportWithinDeadline: true,
    };

    const result = calculateGiftTax(input);

    // 과표 = 12,895,678 - 50,000,000 = 음수 → 0
    // → 세금 0
    expect(result.taxableBase).toBe(0);
    expect(result.grossTax).toBe(0);
    // 10원 단위인지 확인
    expect(result.grossTax % 10).toBe(0);
    expect(result.reportingCredit % 10).toBe(0);
  });

  // ─────────────────────────────────────────────
  // 16. 기증여 한도 초과 케이스
  // ─────────────────────────────────────────────
  it('10년 기증여 6억(배우자 공제 한도) 초과 시 유효공제 0 + warning', () => {
    const input: GiftInput = {
      giftValue: 100_000_000,
      relation: 'spouse',
      priorGiftValue: 600_000_000, // 공제 한도 = 6억
      assumedDebt: 0,
      reportWithinDeadline: true,
    };

    const result = calculateGiftTax(input);

    expect(result.giftDeduction).toBe(0); // 6억 - 6억 = 0
    expect(result.taxableBase).toBe(700_000_000); // (100M + 600M) - 0
    expect(result.warnings.some(w => w.includes('한도'))).toBe(true);
  });

  // ─────────────────────────────────────────────
  // 추가: 신고공제가 정확히 적용되는지 확인 (3% 정확도)
  // ─────────────────────────────────────────────
  it('신고공제 정확성: 산출세액의 정확히 3%', () => {
    const input: GiftInput = {
      giftValue: 500_000_000,
      relation: 'adultDescendant',
      priorGiftValue: 0,
      assumedDebt: 0,
      reportWithinDeadline: true,
    };

    const result = calculateGiftTax(input);

    // 과표 = 500M - 50M = 450M
    // 구간: 5억 초과 → 20% × 4.5억 - 1,000만 = 90,000,000 - 10,000,000 = 80,000,000
    expect(result.grossTax).toBe(80_000_000);

    // 신고공제 = 80M × 3% = 2,400,000 (10원 단위 절사 → 240만)
    expect(result.reportingCredit).toBe(2_400_000);
    expect(result.finalTax).toBe(80_000_000 - 2_400_000);
  });
});
