/**
 * BMI 단위 테스트
 * 명세: docs/calculator-spec/BMI.md §7
 */

import { describe, expect, it } from 'vitest';
import { calculateBmi, classifyBmi, categoryToLabel } from '@/lib/utils/bmi';

describe('classifyBmi (대한비만학회 2022 기준)', () => {
  it('18.4 → 저체중', () => expect(classifyBmi(18.4)).toBe('underweight'));
  it('18.5 → 정상 (경계)', () => expect(classifyBmi(18.5)).toBe('normal'));
  it('22.9 → 정상', () => expect(classifyBmi(22.9)).toBe('normal'));
  it('23.0 → 과체중', () => expect(classifyBmi(23.0)).toBe('overweight'));
  it('24.9 → 과체중', () => expect(classifyBmi(24.9)).toBe('overweight'));
  it('25.0 → 1단계 비만', () => expect(classifyBmi(25.0)).toBe('obesity1'));
  it('29.9 → 1단계 비만', () => expect(classifyBmi(29.9)).toBe('obesity1'));
  it('30.0 → 2단계 비만', () => expect(classifyBmi(30.0)).toBe('obesity2'));
  it('34.9 → 2단계 비만', () => expect(classifyBmi(34.9)).toBe('obesity2'));
  it('35.0 → 3단계 비만', () => expect(classifyBmi(35.0)).toBe('obesity3'));
});

describe('categoryToLabel', () => {
  it('모든 분류 한글 라벨 반환', () => {
    expect(categoryToLabel('underweight')).toBe('저체중');
    expect(categoryToLabel('normal')).toBe('정상');
    expect(categoryToLabel('overweight')).toBe('과체중 (비만 전단계)');
    expect(categoryToLabel('obesity1')).toBe('1단계 비만');
    expect(categoryToLabel('obesity2')).toBe('2단계 비만');
    expect(categoryToLabel('obesity3')).toBe('3단계 비만 (고도비만)');
  });
});

describe('calculateBmi', () => {
  it('170cm, 70kg → BMI 24.22 (과체중)', () => {
    const r = calculateBmi({ heightCm: 170, weightKg: 70 });
    // 70 / 1.7² = 70 / 2.89 = 24.2214...
    expect(r.bmi).toBeCloseTo(24.22, 2);
    expect(r.category).toBe('overweight');
  });

  it('160cm, 50kg → BMI 19.53 (정상)', () => {
    const r = calculateBmi({ heightCm: 160, weightKg: 50 });
    expect(r.bmi).toBeCloseTo(19.53, 1);
    expect(r.category).toBe('normal');
  });

  it('180cm, 95kg → BMI 29.32 (1단계 비만)', () => {
    const r = calculateBmi({ heightCm: 180, weightKg: 95 });
    expect(r.bmi).toBeCloseTo(29.32, 2);
    expect(r.category).toBe('obesity1');
  });

  it('표준 체중 범위: 170cm → 53.5~66.2kg', () => {
    const r = calculateBmi({ heightCm: 170, weightKg: 70 });
    expect(r.normalWeightLower).toBeCloseTo(53.5, 1);
    expect(r.normalWeightUpper).toBeCloseTo(66.2, 1);
  });

  it('몸무게가 정상 범위보다 높음 → 감량 필요량 양수', () => {
    const r = calculateBmi({ heightCm: 170, weightKg: 80 });
    expect(r.diffToNormal).toBeGreaterThan(0);
  });

  it('몸무게가 정상 범위보다 낮음 → 증량 필요량 음수', () => {
    const r = calculateBmi({ heightCm: 170, weightKg: 45 });
    expect(r.diffToNormal).toBeLessThan(0);
  });

  it('정상 범위 내 → diffToNormal = 0', () => {
    const r = calculateBmi({ heightCm: 170, weightKg: 60 });
    expect(r.diffToNormal).toBe(0);
  });

  it('키 0 → warning + bmi 0', () => {
    const r = calculateBmi({ heightCm: 0, weightKg: 70 });
    expect(r.bmi).toBe(0);
    expect(r.warnings.length).toBeGreaterThan(0);
  });

  it('몸무게 0 → warning', () => {
    const r = calculateBmi({ heightCm: 170, weightKg: 0 });
    expect(r.bmi).toBe(0);
    expect(r.warnings.length).toBeGreaterThan(0);
  });

  it('키 범위 초과 (251cm) → warning', () => {
    const r = calculateBmi({ heightCm: 251, weightKg: 70 });
    expect(r.warnings.length).toBeGreaterThan(0);
  });

  it('NaN → warning', () => {
    const r = calculateBmi({ heightCm: NaN, weightKg: 70 });
    expect(r.warnings.length).toBeGreaterThan(0);
  });
});
