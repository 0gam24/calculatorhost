/**
 * 환율·환전 계산 단위 테스트
 *
 * 원→외화(매도) / 외화→원(매입) / 스프레드·수수료 적용 + 경계값
 * 명세: docs/calculator-spec/환율.md §7
 */

import { describe, expect, it } from 'vitest';
import {
  calculateExchange,
  type ExchangeInput,
} from '@/lib/finance/exchange';

// ============================================
// 헬퍼: 입력값 생성
// ============================================

function createInput(overrides: Partial<ExchangeInput>): ExchangeInput {
  return {
    direction: 'krwToForeign',
    amount: 1_000_000,
    baseRate: 1350,
    spreadPercent: 1.5,
    feePercent: 0,
    feeFlat: 0,
    ...overrides,
  };
}

// ============================================
// 1-3: 원 → 외화 (매도) 기본 케이스
// ============================================

describe('calculateExchange — 원→외화 (krwToForeign)', () => {
  it('기준환율 1350, 스프레드 1.5%, 수수료 0 → appliedRate 증가', () => {
    // appliedRate = 1350 × (1 + 0.015) = 1350 × 1.015 = 1370.25
    // grossAmount = 1,000,000 / 1370.25 ≈ 729.79 USD
    const result = calculateExchange(
      createInput({
        direction: 'krwToForeign',
        amount: 1_000_000,
        baseRate: 1350,
        spreadPercent: 1.5,
        feePercent: 0,
      })
    );

    expect(result.appliedRate).toBeCloseTo(1370.25, 1);
    expect(result.grossAmount).toBeCloseTo(729.79, 1);
    expect(result.netAmount).toBeCloseTo(729.79, 1);
  });

  it('100만 원, 환율 1350, 스프레드 0% → appliedRate = baseRate', () => {
    const result = calculateExchange(
      createInput({
        direction: 'krwToForeign',
        amount: 1_000_000,
        baseRate: 1350,
        spreadPercent: 0,
      })
    );

    expect(result.appliedRate).toBe(1350);
    expect(result.grossAmount).toBeCloseTo(740.74, 2);
  });

  it('수수료 반영: 수수료 5% 적용 시 netAmount 감소', () => {
    const result = calculateExchange(
      createInput({
        direction: 'krwToForeign',
        amount: 1_000_000,
        baseRate: 1350,
        spreadPercent: 1.5,
        feePercent: 5,
      })
    );

    // grossAmount ≈ 729.927
    // feeAmount = 729.927 × 0.05 ≈ 36.496
    // netAmount ≈ 693.43
    expect(result.netAmount).toBeLessThan(result.grossAmount);
  });

  it('원 금액 0 → 경고 + 결과 0', () => {
    const result = calculateExchange(
      createInput({
        direction: 'krwToForeign',
        amount: 0,
      })
    );

    expect(result.warnings).toContain('환전 금액은 0보다 커야 합니다');
    expect(result.grossAmount).toBe(0);
    expect(result.netAmount).toBe(0);
  });
});

// ============================================
// 4-6: 외화 → 원 (매입) 기본 케이스
// ============================================

describe('calculateExchange — 외화→원 (foreignToKrw)', () => {
  it('USD 1000, 기준환율 1350, 스프레드 1.5% → appliedRate 감소', () => {
    // appliedRate = 1350 × (1 - 0.015) = 1350 × 0.985 = 1329.75
    // grossAmount = 1000 × 1329.75 = 1,329,750
    const result = calculateExchange(
      createInput({
        direction: 'foreignToKrw',
        amount: 1000,
        baseRate: 1350,
        spreadPercent: 1.5,
        feePercent: 0,
      })
    );

    expect(result.appliedRate).toBeCloseTo(1329.75, 2);
    expect(result.grossAmount).toBe(1_329_750);
    expect(result.netAmount).toBe(1_329_750);
  });

  it('USD 500, 스프레드 0% → appliedRate = baseRate', () => {
    const result = calculateExchange(
      createInput({
        direction: 'foreignToKrw',
        amount: 500,
        baseRate: 1350,
        spreadPercent: 0,
      })
    );

    expect(result.appliedRate).toBe(1350);
    expect(result.grossAmount).toBe(675_000);
  });

  it('수수료 반영: 수수료 3% 적용 시 netAmount 감소 (원화 단위)', () => {
    const result = calculateExchange(
      createInput({
        direction: 'foreignToKrw',
        amount: 1000,
        baseRate: 1350,
        spreadPercent: 1.5,
        feePercent: 3,
      })
    );

    // grossAmount = 1,329,750
    // feeAmount = (1,329,750 × 0.03) = 39,892.5 → 10원 단위 절사 = 39,890
    // netAmount = 1,329,750 - 39,890 = 1,289,860
    expect(result.feeAmount).toBeGreaterThan(0);
    expect(result.netAmount).toBeLessThan(result.grossAmount);
  });

  it('외화 금액 0 → 경고 + 결과 0', () => {
    const result = calculateExchange(
      createInput({
        direction: 'foreignToKrw',
        amount: 0,
      })
    );

    expect(result.warnings).toContain('환전 금액은 0보다 커야 합니다');
    expect(result.grossAmount).toBe(0);
  });
});

// ============================================
// 7-9: 환율 및 스프레드 경계값
// ============================================

describe('calculateExchange — 환율 경계값', () => {
  it('기준환율 0 → 경고 + 결과 0', () => {
    const result = calculateExchange(
      createInput({
        baseRate: 0,
      })
    );

    expect(result.warnings).toContain('기준환율은 0보다 커야 합니다');
    expect(result.appliedRate).toBe(0);
  });

  it('음수 스프레드 → 0으로 처리', () => {
    const result = calculateExchange(
      createInput({
        direction: 'krwToForeign',
        spreadPercent: -2,
      })
    );

    expect(result.appliedRate).toBe(result.baseRate);
  });

  it('매우 큰 금액: 1억 원 → 계산 정확성 유지', () => {
    const result = calculateExchange(
      createInput({
        direction: 'krwToForeign',
        amount: 100_000_000,
        baseRate: 1350,
        spreadPercent: 1.5,
      })
    );

    expect(result.grossAmount).toBeGreaterThan(0);
    expect(result.netAmount).toBeGreaterThan(0);
  });
});

// ============================================
// 10-12: 실질환율 (effectiveRate) 검증
// ============================================

describe('calculateExchange — 실질환율', () => {
  it('원→외화: effectiveRate = 원화액 / 최종외화액', () => {
    const result = calculateExchange(
      createInput({
        direction: 'krwToForeign',
        amount: 1_000_000,
        baseRate: 1350,
        spreadPercent: 1.5,
        feePercent: 2,
      })
    );

    // 수수료 후 외화액이 작아지므로 실질환율은 appliedRate보다 높음
    expect(result.effectiveRate).toBeGreaterThan(result.appliedRate);
  });

  it('외화→원: effectiveRate = 최종원화액 / 외화액', () => {
    const result = calculateExchange(
      createInput({
        direction: 'foreignToKrw',
        amount: 1000,
        baseRate: 1350,
        spreadPercent: 1.5,
        feePercent: 3,
      })
    );

    // 수수료 차감 후 원화액이 작아지므로 실질환율은 appliedRate보다 낮음
    expect(result.effectiveRate).toBeLessThan(result.appliedRate);
  });
});

// ============================================
// 13-15: 고정 수수료
// ============================================

describe('calculateExchange — 고정 수수료', () => {
  it('고정 수수료만 적용: feePercent=0, feeFlat=5000', () => {
    const result = calculateExchange(
      createInput({
        direction: 'foreignToKrw',
        amount: 1000,
        baseRate: 1350,
        feePercent: 0,
        feeFlat: 5000,
      })
    );

    expect(result.feeAmount).toBe(5000);
    expect(result.netAmount).toBe(result.grossAmount - 5000);
  });

  it('% + 고정 수수료 병행', () => {
    const result = calculateExchange(
      createInput({
        direction: 'foreignToKrw',
        amount: 1000,
        baseRate: 1350,
        feePercent: 2,
        feeFlat: 3000,
      })
    );

    expect(result.feeAmount).toBeGreaterThan(3000);
  });

  // 2026-10-14 정정: 입력란은 "고정 수수료 (수령 통화 기준)" 이라 원→달러에서는 USD 로 받는다.
  // 이전 버전은 5를 원화로 보고 적용환율로 나눠 약 0.004 USD 만 뺐다.
  it('원→외화: 고정 수수료 5 USD 는 5 USD 그대로 차감', () => {
    const result = calculateExchange(
      createInput({
        direction: 'krwToForeign',
        amount: 1_350_000,
        baseRate: 1350,
        spreadPercent: 0,
        feePercent: 0,
        feeFlat: 5,
      })
    );

    expect(result.grossAmount).toBe(1000);
    expect(result.feeAmount).toBe(5);
    expect(result.netAmount).toBe(995);
  });

  it('원→외화: % 수수료와 고정 수수료(USD) 병행', () => {
    const result = calculateExchange(
      createInput({
        direction: 'krwToForeign',
        amount: 1_350_000,
        baseRate: 1350,
        spreadPercent: 0,
        feePercent: 1,
        feeFlat: 5,
      })
    );

    // 1000 USD × 1% = 10 USD + 5 USD = 15 USD
    expect(result.feeAmount).toBe(15);
    expect(result.netAmount).toBe(985);
  });

  it('음수 고정 수수료 → 0으로 처리', () => {
    const result = calculateExchange(
      createInput({
        direction: 'foreignToKrw',
        amount: 1000,
        baseRate: 1350,
        spreadPercent: 0,
        feePercent: 0,
        feeFlat: -5000,
      })
    );

    expect(result.feeAmount).toBe(0);
    expect(result.netAmount).toBe(1_350_000);
  });

  it('수수료가 환전액보다 크면 수령액 0 + 경고', () => {
    const result = calculateExchange(
      createInput({
        direction: 'krwToForeign',
        amount: 13_500,
        baseRate: 1350,
        spreadPercent: 0,
        feePercent: 0,
        feeFlat: 20,
      })
    );

    expect(result.netAmount).toBe(0);
    expect(result.effectiveRate).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
  });
});
