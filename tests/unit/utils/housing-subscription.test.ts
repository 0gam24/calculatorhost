/**
 * 청약가점 계산 단위 테스트
 *
 * 무주택기간 / 부양가족수 / 청약통장가입기간 + 경계값
 * 명세: docs/calculator-spec/청약가점.md §7
 */

import { describe, expect, it } from 'vitest';
import {
  calculateHousingSubscriptionScore,
  type HousingSubscriptionInput,
} from '@/lib/utils/housing-subscription';

// ============================================
// 헬퍼: 입력값 생성
// ============================================

function createInput(
  overrides: Partial<HousingSubscriptionInput>
): HousingSubscriptionInput {
  return {
    noHomeYears: 0,
    dependents: 0,
    accountYears: 0,
    ...overrides,
  };
}

// ============================================
// 1-4: 무주택 기간 점수 (0~32점)
// ============================================

describe('calculateHousingSubscriptionScore — 무주택기간', () => {
  it('무주택 0년 → 2점 (1년 미만)', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        noHomeYears: 0,
        dependents: 0,
        accountYears: 0,
      })
    );

    expect(result.noHomeScore).toBe(2);
  });

  it('무주택 0.5년(6개월) → 2점 (1년 미만)', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        noHomeYears: 0.5,
      })
    );

    expect(result.noHomeScore).toBe(2);
  });

  it('무주택 1년 → 4점 (1년 이상 2년 미만)', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        noHomeYears: 1,
      })
    );

    expect(result.noHomeScore).toBe(4);
  });

  it('무주택 2년 → 6점', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        noHomeYears: 2,
      })
    );

    expect(result.noHomeScore).toBe(6);
  });

  it('무주택 14년 → 30점', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        noHomeYears: 14,
      })
    );

    expect(result.noHomeScore).toBe(30);
  });

  it('무주택 15년 → 32점 (만점)', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        noHomeYears: 15,
      })
    );

    expect(result.noHomeScore).toBe(32);
  });

  it('무주택 20년 → 32점 (최대값 유지)', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        noHomeYears: 20,
      })
    );

    expect(result.noHomeScore).toBe(32);
  });

  it('음수 입력 → 0으로 처리 + 경고', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        noHomeYears: -1,
      })
    );

    expect(result.noHomeScore).toBe(2);
    expect(result.warnings).toContain('무주택 기간은 0 이상이어야 합니다');
  });
});

// ============================================
// 5-8: 부양가족 수 점수 (5~35점)
// ============================================

describe('calculateHousingSubscriptionScore — 부양가족수', () => {
  it('부양 0명 → 5점', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        dependents: 0,
      })
    );

    expect(result.dependentsScore).toBe(5);
  });

  it('부양 1명 → 10점', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        dependents: 1,
      })
    );

    expect(result.dependentsScore).toBe(10);
  });

  it('부양 2명 → 15점', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        dependents: 2,
      })
    );

    expect(result.dependentsScore).toBe(15);
  });

  it('부양 3명 → 20점', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        dependents: 3,
      })
    );

    expect(result.dependentsScore).toBe(20);
  });

  it('부양 4명 → 25점', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        dependents: 4,
      })
    );

    expect(result.dependentsScore).toBe(25);
  });

  it('부양 5명 → 30점', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        dependents: 5,
      })
    );

    expect(result.dependentsScore).toBe(30);
  });

  it('부양 6명 → 35점 (만점)', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        dependents: 6,
      })
    );

    expect(result.dependentsScore).toBe(35);
  });

  it('부양 10명 → 35점 (최대값 유지)', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        dependents: 10,
      })
    );

    expect(result.dependentsScore).toBe(35);
  });

  it('음수 입력 → 5점 (0명으로 처리) + 경고', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        dependents: -2,
      })
    );

    expect(result.dependentsScore).toBe(5);
    expect(result.warnings).toContain('부양가족 수는 0 이상이어야 합니다');
  });
});

// ============================================
// 9-12: 청약통장 가입 기간 점수 (1~17점)
// ============================================

describe('calculateHousingSubscriptionScore — 청약통장가입기간', () => {
  it('가입 3개월 → 1점 (6개월 미만)', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        accountYears: 0.25, // 3개월
      })
    );

    expect(result.accountScore).toBe(1);
  });

  it('가입 6개월 → 2점 (6개월 이상 1년 미만)', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        accountYears: 0.5,
      })
    );

    expect(result.accountScore).toBe(2);
  });

  it('가입 8개월 → 2점 (6개월 이상 1년 미만)', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        accountYears: 0.67,
      })
    );

    expect(result.accountScore).toBe(2);
  });

  it('가입 1년 → 3점 (1년 이상 2년 미만)', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        accountYears: 1,
      })
    );

    expect(result.accountScore).toBe(3);
  });

  it('가입 2년 → 4점 (2년 이상 3년 미만)', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        accountYears: 2,
      })
    );

    expect(result.accountScore).toBe(4);
  });

  it('가입 10년 → 12점', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        accountYears: 10,
      })
    );

    expect(result.accountScore).toBe(12);
  });

  it('가입 15년 → 17점 (만점)', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        accountYears: 15,
      })
    );

    expect(result.accountScore).toBe(17);
  });

  it('가입 20년 → 17점 (최대값 유지)', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        accountYears: 20,
      })
    );

    expect(result.accountScore).toBe(17);
  });

  it('음수 입력 → 1점 (0개월로 처리) + 경고', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        accountYears: -1,
      })
    );

    expect(result.accountScore).toBe(1);
    expect(result.warnings).toContain('청약통장 가입 기간은 0 이상이어야 합니다');
  });
});

// ============================================
// 13-15: 합계 점수 및 시나리오
// ============================================

describe('calculateHousingSubscriptionScore — 합계', () => {
  it('최소값: 0년·0명·0개월 → 2+5+1 = 8점', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        noHomeYears: 0,
        dependents: 0,
        accountYears: 0,
      })
    );

    expect(result.totalScore).toBe(8);
  });

  it('만점: 15년·6명·15년 → 32+35+17 = 84점', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        noHomeYears: 15,
        dependents: 6,
        accountYears: 15,
      })
    );

    expect(result.totalScore).toBe(84);
  });

  it('중간값 시나리오: 5년·2명·3년 → 12+15+5 = 32점', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        noHomeYears: 5,
        dependents: 2,
        accountYears: 3,
      })
    );

    expect(result.noHomeScore).toBe(12);
    expect(result.dependentsScore).toBe(15);
    expect(result.accountScore).toBe(5);
    expect(result.totalScore).toBe(32);
  });

  it('높은 가점: 10년·4명·10년 → 22+25+12 = 59점', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        noHomeYears: 10,
        dependents: 4,
        accountYears: 10,
      })
    );

    expect(result.totalScore).toBe(59);
  });
});

// ============================================
// 16-17: 경고 메시지 및 복합 검증
// ============================================

describe('calculateHousingSubscriptionScore — 경고 및 복합', () => {
  it('여러 음수 입력 → 여러 경고 메시지', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        noHomeYears: -1,
        dependents: -2,
        accountYears: -3,
      })
    );

    expect(result.warnings).toHaveLength(3);
  });

  it('소수점 무주택기간 처리: 3.7년 → Math.floor(3.7)×2 + 2 = 10점', () => {
    const result = calculateHousingSubscriptionScore(
      createInput({
        noHomeYears: 3.7,
      })
    );

    expect(result.noHomeScore).toBe(2 + Math.floor(3.7) * 2); // 2 + 6 = 8
  });
});
