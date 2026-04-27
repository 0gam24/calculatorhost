/**
 * 면적 변환 단위 테스트
 * 명세: docs/calculator-spec/평수환산.md §7
 */

import { describe, expect, it } from 'vitest';
import {
  convertArea,
  pyeongToSqm,
  sqmToPyeong,
  SQM_PER_PYEONG,
  PYEONG_PER_SQM,
} from '@/lib/utils/area';

describe('상수', () => {
  it('1평 = 400/121 ㎡', () => {
    expect(SQM_PER_PYEONG).toBeCloseTo(3.3057851239669, 10);
  });

  it('1㎡ = 121/400 평', () => {
    expect(PYEONG_PER_SQM).toBeCloseTo(0.3025, 10);
  });

  it('SQM_PER_PYEONG × PYEONG_PER_SQM = 1', () => {
    expect(SQM_PER_PYEONG * PYEONG_PER_SQM).toBeCloseTo(1, 12);
  });
});

describe('pyeongToSqm', () => {
  it('1평 → 3.3058㎡ (소수 4자리 반올림)', () => {
    expect(pyeongToSqm(1)).toBeCloseTo(3.3058, 4);
  });

  it('34평 → 112.3967㎡', () => {
    expect(pyeongToSqm(34)).toBeCloseTo(112.3967, 4);
  });

  it('0평 → 0', () => {
    expect(pyeongToSqm(0)).toBe(0);
  });

  it('음수 → 0', () => {
    expect(pyeongToSqm(-5)).toBe(0);
  });

  it('NaN → 0', () => {
    expect(pyeongToSqm(NaN)).toBe(0);
  });
});

describe('sqmToPyeong', () => {
  it('1㎡ → 0.3025평', () => {
    expect(sqmToPyeong(1)).toBeCloseTo(0.3025, 4);
  });

  it('84㎡ → 25.41평', () => {
    expect(sqmToPyeong(84)).toBeCloseTo(25.41, 2);
  });

  it('0 → 0', () => {
    expect(sqmToPyeong(0)).toBe(0);
  });

  it('음수 → 0', () => {
    expect(sqmToPyeong(-1)).toBe(0);
  });
});

describe('convertArea (양방향 엔트리)', () => {
  it('평 입력 시 pyeong·sqm 둘 다 반환', () => {
    const r = convertArea({ value: 32, unit: 'pyeong' });
    expect(r.pyeong).toBe(32);
    expect(r.sqm).toBeCloseTo(105.7851, 4);
    expect(r.warnings).toHaveLength(0);
  });

  it('㎡ 입력 시 pyeong·sqm 둘 다 반환', () => {
    const r = convertArea({ value: 84, unit: 'sqm' });
    expect(r.sqm).toBe(84);
    expect(r.pyeong).toBeCloseTo(25.41, 2);
    expect(r.warnings).toHaveLength(0);
  });

  it('음수 입력 → 0 처리 + warning', () => {
    const r = convertArea({ value: -5, unit: 'pyeong' });
    expect(r.pyeong).toBe(0);
    expect(r.sqm).toBe(0);
    expect(r.warnings.length).toBeGreaterThan(0);
  });

  it('NaN 입력 → 0 + warning', () => {
    const r = convertArea({ value: NaN, unit: 'sqm' });
    expect(r.pyeong).toBe(0);
    expect(r.sqm).toBe(0);
    expect(r.warnings.length).toBeGreaterThan(0);
  });

  it('왕복 변환: 평 → ㎡ → 평 (±0.0001 이내)', () => {
    const original = 24;
    const toSqm = pyeongToSqm(original);
    const back = sqmToPyeong(toSqm);
    expect(Math.abs(back - original)).toBeLessThan(0.001);
  });

  it('아파트 공급 "34평" 시나리오: 34평 = 약 112.4㎡', () => {
    const r = convertArea({ value: 34, unit: 'pyeong' });
    expect(r.sqm).toBeGreaterThan(112);
    expect(r.sqm).toBeLessThan(113);
  });

  it('국토부 84㎡ 시나리오: 84㎡ = 약 25.41평', () => {
    const r = convertArea({ value: 84, unit: 'sqm' });
    expect(r.pyeong).toBeGreaterThan(25);
    expect(r.pyeong).toBeLessThan(26);
  });

  it('kind 필드(전용/공급/대지)는 계산에 영향 없음', () => {
    const a = convertArea({ value: 32, unit: 'pyeong', kind: 'exclusive' });
    const b = convertArea({ value: 32, unit: 'pyeong', kind: 'supply' });
    const c = convertArea({ value: 32, unit: 'pyeong', kind: 'land' });
    expect(a.sqm).toBe(b.sqm);
    expect(b.sqm).toBe(c.sqm);
  });
});
