/**
 * BMI 계산기 "구간별 바로 보기" 표: 키별 정상·과체중·비만 몸무게.
 *
 * 정상 범위는 calculateBmi 가 돌려주는 normalWeightLower/Upper(BMI_NORMAL_LOWER~UPPER 상수 × 키²).
 * 과체중·비만 시작 몸무게는 몸무게를 0.1kg씩 올려 가며 calculateBmi 의 분류가 처음 바뀌는 값이라
 * 계산기에 그 몸무게를 넣었을 때 나오는 분류와 항상 같다.
 */
import {
  BMI_NORMAL_LOWER,
  BMI_NORMAL_UPPER,
  calculateBmi,
  type BmiCategory,
} from '@/lib/utils/bmi';
import type { QuickTableData } from './types';

/** 0.1kg 단위 정수(예: 723 = 72.3kg) → "72.3" */
const tenthsToKg = (tenths: number): string => (tenths / 10).toFixed(1);

/** fromTenths 부터 0.1kg씩 올려 계산기가 처음 target 으로 분류하는 몸무게(0.1kg 단위 정수) */
function firstTenthsIn(heightCm: number, target: BmiCategory, fromTenths: number): number {
  for (let t = fromTenths; t <= 3000; t += 1) {
    if (calculateBmi({ heightCm, weightKg: t / 10 }).category === target) return t;
  }
  throw new Error(`BMI ${target} 구간을 찾지 못했습니다 (키 ${heightCm}cm)`);
}

export function bmiQuickTable(): QuickTableData {
  const heights = [150, 155, 160, 165, 170, 175, 180, 185, 190];
  return {
    title: '키별 정상 체중과 비만 기준 몸무게는 얼마인가요?',
    caption: '성인 키 150~190cm 몸무게 구간 (대한비만학회 2022 기준)',
    headers: [
      '키',
      `정상 (BMI ${BMI_NORMAL_LOWER}~${BMI_NORMAL_UPPER})`,
      '과체중 (BMI 23~24.9)',
      '비만 (BMI 25 이상)',
    ],
    rows: heights.map((heightCm) => {
      // 정상 범위는 키로만 정해진다. 몸무게 60kg 은 입력 범위 검사를 통과시키기 위한 값.
      const r = calculateBmi({ heightCm, weightKg: 60 });
      const overweightFrom = firstTenthsIn(
        heightCm,
        'overweight',
        Math.round(r.normalWeightUpper * 10),
      );
      const obesityFrom = firstTenthsIn(heightCm, 'obesity1', overweightFrom);
      return [
        `${heightCm}cm`,
        `${r.normalWeightLower.toFixed(1)}~${r.normalWeightUpper.toFixed(1)}kg`,
        `${tenthsToKg(overweightFrom)}~${tenthsToKg(obesityFrom - 1)}kg`,
        `${tenthsToKg(obesityFrom)}kg 이상`,
      ];
    }),
    note: '성인 기준으로 BMI(몸무게 ÷ 키(m)의 제곱)가 각 구간에 드는 몸무게입니다. 대한비만학회 2022 기준으로 정상은 BMI 18.5~22.9, 과체중(비만 전단계)은 23~24.9, 비만은 25 이상입니다. 정상 범위는 BMI 22.9까지로 계산해 과체중이 시작되는 몸무게보다 조금 낮게 끝나고, 과체중·비만 칸은 0.1kg 단위입니다. 근육이 많은 사람, 소아·청소년, 임산부는 이 기준을 그대로 쓰기 어렵습니다. 1cm 단위 키와 지금 몸무게는 위 계산기에서 확인하세요.',
  };
}
