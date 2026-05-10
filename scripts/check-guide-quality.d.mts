/**
 * scripts/check-guide-quality.mjs 의 타입 선언.
 * tests/unit/scripts/check-guide-quality.test.ts 에서 import 시 사용.
 */

export type Severity = 'green' | 'yellow' | 'red';

export interface CheckResult {
  pass: boolean;
  severity: Severity;
  label: string;
  /** 본문 길이 검사 결과 */
  length?: number;
  threshold?: number;
  /** 권위 링크 카운트 결과 */
  found?: number;
  /** 금지 표현 위반 목록 */
  violations?: string[];
}

export interface ValidateResult {
  overall: Severity;
  checks: CheckResult[];
  failures: CheckResult[];
  extracted: {
    taxRatePercents: number[];
    statuteSections: string[];
  };
}

export function checkContentLength(src: string, threshold?: number): CheckResult;
export function checkAuthorityLinks(src: string, threshold?: number): CheckResult;
export function checkForbiddenPatterns(src: string): CheckResult;
export function checkAiDisclosure(src: string): CheckResult;
export function extractTaxRatePercents(src: string): number[];
export function extractStatuteSections(src: string): string[];
export function validateGuideContent(src: string): ValidateResult;
