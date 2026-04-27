/**
 * BMI (체질량지수) 계산 — 순수 함수
 *
 * 공식: BMI = 몸무게(kg) / 키(m)²
 *
 * 분류 기준(한국): 대한비만학회 「비만 진료지침」 2022
 * (WHO 서양 기준과 다름 — 아시아인에게 더 엄격한 컷오프)
 */

export const BMI_NORMAL_LOWER = 18.5;
export const BMI_NORMAL_UPPER = 22.9;

export type BmiCategory =
  | 'underweight'
  | 'normal'
  | 'overweight'
  | 'obesity1'
  | 'obesity2'
  | 'obesity3';

export interface BmiInput {
  heightCm: number;
  weightKg: number;
}

export interface BmiResult {
  bmi: number;                 // 소수 2자리
  category: BmiCategory;
  categoryLabel: string;       // '정상' / '1단계 비만' 등
  normalWeightLower: number;   // 정상 구간 하한 kg (소수 1자리)
  normalWeightUpper: number;   // 정상 구간 상한 kg (소수 1자리)
  diffToNormal: number;        // 현재 - 정상 상한 (양수 = 감량 필요, 음수 = 증량 필요)
  warnings: string[];
}

const CATEGORY_LABELS: Record<BmiCategory, string> = {
  underweight: '저체중',
  normal: '정상',
  overweight: '과체중 (비만 전단계)',
  obesity1: '1단계 비만',
  obesity2: '2단계 비만',
  obesity3: '3단계 비만 (고도비만)',
};

function roundTo(value: number, digits: number): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export function classifyBmi(bmi: number): BmiCategory {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 23) return 'normal';
  if (bmi < 25) return 'overweight';
  if (bmi < 30) return 'obesity1';
  if (bmi < 35) return 'obesity2';
  return 'obesity3';
}

export function categoryToLabel(category: BmiCategory): string {
  return CATEGORY_LABELS[category];
}

export function calculateBmi(input: BmiInput): BmiResult {
  const warnings: string[] = [];

  if (!Number.isFinite(input.heightCm) || input.heightCm <= 0) {
    warnings.push('유효한 키(cm)를 입력해 주세요.');
  }
  if (!Number.isFinite(input.weightKg) || input.weightKg <= 0) {
    warnings.push('유효한 몸무게(kg)를 입력해 주세요.');
  }
  if (input.heightCm < 100 || input.heightCm > 250) {
    if (input.heightCm > 0) warnings.push('키는 100~250cm 범위로 입력해 주세요.');
  }
  if (input.weightKg < 20 || input.weightKg > 300) {
    if (input.weightKg > 0) warnings.push('몸무게는 20~300kg 범위로 입력해 주세요.');
  }

  if (warnings.length > 0) {
    return {
      bmi: 0,
      category: 'normal',
      categoryLabel: '-',
      normalWeightLower: 0,
      normalWeightUpper: 0,
      diffToNormal: 0,
      warnings,
    };
  }

  const heightM = input.heightCm / 100;
  const bmi = roundTo(input.weightKg / (heightM * heightM), 2);
  const category = classifyBmi(bmi);

  const normalWeightLower = roundTo(BMI_NORMAL_LOWER * heightM * heightM, 1);
  const normalWeightUpper = roundTo(BMI_NORMAL_UPPER * heightM * heightM, 1);

  let diffToNormal = 0;
  if (input.weightKg > normalWeightUpper) {
    diffToNormal = roundTo(input.weightKg - normalWeightUpper, 1);
  } else if (input.weightKg < normalWeightLower) {
    diffToNormal = roundTo(input.weightKg - normalWeightLower, 1);
  }

  return {
    bmi,
    category,
    categoryLabel: CATEGORY_LABELS[category],
    normalWeightLower,
    normalWeightUpper,
    diffToNormal,
    warnings,
  };
}
