// BMI 계산기 "구간별 바로 보기" 표 (src/lib/quick-tables/bmi.ts).
// 정상 범위는 calculateBmi 값 그대로, 과체중·비만 시작 몸무게는 계산기 분류와 일치해야 한다.
import { describe, expect, it } from 'vitest';
import { bmiQuickTable } from '@/lib/quick-tables/bmi';
import { calculateBmi } from '@/lib/utils/bmi';
import type { QuickTableData } from '@/lib/quick-tables/types';

const row = (t: QuickTableData, first: string) => t.rows.find((r) => r[0] === first);
const category = (heightCm: number, weightKg: number) =>
  calculateBmi({ heightCm, weightKg }).category;

describe('BMI 키별 체중 표', () => {
  const t = bmiQuickTable();

  it('모양: 9행, 열 수 일치, 깨진 값·긴 줄표 없음', () => {
    expect(t.title.endsWith('?')).toBe(true);
    expect(t.caption.length).toBeGreaterThan(5);
    expect(t.note.length).toBeGreaterThan(10);
    expect(t.rows.length).toBeGreaterThanOrEqual(6);
    for (const r of t.rows) expect(r).toHaveLength(t.headers.length);
    expect(JSON.stringify(t)).not.toMatch(/NaN|Infinity|undefined|[—–]/);
  });

  it('170cm 정상 범위 = calculateBmi 의 normalWeightLower~Upper', () => {
    const r = calculateBmi({ heightCm: 170, weightKg: 60 });
    expect(row(t, '170cm')?.[1]).toBe(
      `${r.normalWeightLower.toFixed(1)}~${r.normalWeightUpper.toFixed(1)}kg`,
    );
    expect(row(t, '170cm')?.[1]).toBe('53.5~66.2kg');
  });

  it('과체중·비만 시작 몸무게에서 계산기 분류가 바뀐다 (전 행)', () => {
    for (const r of t.rows) {
      const heightCm = Number(r[0]?.replace('cm', ''));
      const [owFrom, owTo] = (r[2] ?? '').replace('kg', '').split('~').map(Number);
      const obFrom = Number((r[3] ?? '').replace('kg 이상', ''));
      expect(category(heightCm, owFrom! - 0.1)).toBe('normal');
      expect(category(heightCm, owFrom!)).toBe('overweight');
      expect(category(heightCm, owTo!)).toBe('overweight');
      expect(category(heightCm, obFrom)).toBe('obesity1');
    }
    expect(row(t, '170cm')?.[3]).toBe('72.3kg 이상');
  });
});
