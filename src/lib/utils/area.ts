/**
 * 면적 단위 변환 — 순수 함수
 *
 * 법적 근거:
 * - 계량법 시행령 §9 (SI 단위 ㎡ 사용)
 * - 1평 = 400/121 ㎡ ≒ 3.3057851239669... (척관법 관습)
 * - 1㎡ = 121/400 평 ≒ 0.30250
 *
 * ⚠️ 수정은 calc-logic-verifier 에이전트 승인 후.
 */

export const SQM_PER_PYEONG = 400 / 121;
export const PYEONG_PER_SQM = 121 / 400;

export type AreaUnit = 'pyeong' | 'sqm';
export type AreaKind = 'exclusive' | 'supply' | 'land';

export interface AreaConversionInput {
  value: number;
  unit: AreaUnit;
  kind?: AreaKind;
}

export interface AreaConversionResult {
  inputValue: number;
  inputUnit: AreaUnit;
  pyeong: number;
  sqm: number;
  warnings: string[];
}

/**
 * 소수 n자리 반올림
 */
function roundTo(value: number, digits: number): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

/**
 * 평 → 제곱미터
 */
export function pyeongToSqm(pyeong: number): number {
  if (!Number.isFinite(pyeong) || pyeong <= 0) return 0;
  return roundTo(pyeong * SQM_PER_PYEONG, 4);
}

/**
 * 제곱미터 → 평
 */
export function sqmToPyeong(sqm: number): number {
  if (!Number.isFinite(sqm) || sqm <= 0) return 0;
  return roundTo(sqm * PYEONG_PER_SQM, 4);
}

/**
 * 양방향 변환 엔트리
 */
export function convertArea(input: AreaConversionInput): AreaConversionResult {
  const warnings: string[] = [];

  if (!Number.isFinite(input.value)) {
    return {
      inputValue: 0,
      inputUnit: input.unit,
      pyeong: 0,
      sqm: 0,
      warnings: ['유효한 숫자를 입력해 주세요.'],
    };
  }

  if (input.value < 0) {
    warnings.push('음수는 지원하지 않아 0으로 처리했습니다.');
  }

  const value = Math.max(0, input.value);

  let pyeong: number;
  let sqm: number;
  if (input.unit === 'pyeong') {
    pyeong = roundTo(value, 4);
    sqm = pyeongToSqm(value);
  } else {
    sqm = roundTo(value, 4);
    pyeong = sqmToPyeong(value);
  }

  return {
    inputValue: value,
    inputUnit: input.unit,
    pyeong,
    sqm,
    warnings,
  };
}
