/**
 * 2026년 대출한도 규제 상수 (DSR·LTV·DTI) — SSoT
 *
 * 법적 근거:
 * - 은행법 시행령 §24의4 (Debt Service Ratio 기준)
 * - 여신심사 선진화 가이드라인 (금융위원회·금융감독원)
 * - 주택담보대출 LTV·DTI 규제 (금융감독원 고시)
 * - 2026년 스트레스 DSR 풀 적용 기준 (변동금리·혼합형·주기형 전면)
 *
 * ⚠️ 이 파일은 calc-logic-verifier 에이전트 승인 없이 수정 금지.
 * 개정 시 ADR 기록: docs/adr/NNN-대출한도-규제-개정.md
 */

export const YEAR = 2026;

// ============================================
// 타입 정의
// ============================================

export type RegionType = 'nonRegulated' | 'adjusted' | 'speculation';
export type LenderType = 'bank' | 'nonBank';
export type HousingStatus = 'general' | 'firstOrSubsistence';

// ============================================
// DSR (Debt Service Ratio, 총부채원리금상환비율)
// 법적 근거: 은행법 시행령 §24의4
// ============================================

/** DSR 한도: 은행권 40% (0.4) */
export const DSR_LIMIT_BANK = 0.4; // 은행법 시행령 §24의4, 은행업감독업무 시행세칙

/** DSR 한도: 2금융권(저축은행·여신전문) 50% (0.5) */
export const DSR_LIMIT_NON_BANK = 0.5; // 여신심사 선진화 가이드라인

// ============================================
// 스트레스 DSR (Stress Testing)
// 법적 근거: 금융감독원 변동금리 대출 DSR 기준 (2024.02~2026 단계 적용)
// ============================================

/**
 * 스트레스 DSR 금리 가산값 (%)
 * 2026년 기준 1.5%p 적용 (변동금리·혼합형·주기형 전면)
 * 실제 금감원 고시값 변경 시 교체
 * 참고: 금감원 분기별 고시 (연 1회 개정, 2024.02 도입 → 2026 풀 적용)
 */
export const STRESS_DSR_RATE_2026 = 0.015; // 1.5%p 가산

// ============================================
// LTV (Loan To Value, 담보인정비율)
// 법적 근거: 금융감독원 주택담보대출 규제 고시
// ============================================

/**
 * LTV 한도: 규제지역(투기·투기과열·조정대상) 50% (0.5)
 * 금융감독원 주택담보대출 규제 고시, 은행업감독업무 시행세칙
 */
export const LTV_REGULATED = 0.5;

/**
 * LTV 한도: 비규제지역 70% (0.7)
 * 금융감독원 주택담보대출 규제 고시
 */
export const LTV_NON_REGULATED = 0.7;

/**
 * LTV 한도: 생애최초 주택구입자·서민 실수요자 80% (0.8)
 * 금융감독원 서민실수요자 우대 정책
 * 조건: (1) 무주택자·1세대1주택, (2) 부부 연소득 8천만 이하(또는 해당 지역 기준) 등
 */
export const LTV_FIRST_HOME_OR_SUBSISTENCE = 0.8;

// ============================================
// DTI (Debt To Income, 총부채상환비율)
// 법적 근거: 은행업감독업무 시행세칙, 여신심사 선진화 가이드라인
// ============================================

/**
 * DTI 한도: 규제지역(투기·투기과열·조정대상) 40% (0.4)
 * 새로운 DSR 전면 시행으로 실효성 낮아졌으나 여전히 병행 적용
 */
export const DTI_REGULATED = 0.4;

/**
 * DTI 한도: 비규제지역 50-60% (0.5 사용)
 * 실제 금융기관별로 50~60% 범위에서 자율 결정
 * 본 계산기는 보수적 50% 기준 적용 (금융감독원 기본 가이드라인)
 */
export const DTI_NON_REGULATED = 0.5;

// ============================================
// 헬퍼 함수
// ============================================

/**
 * 지역·주택 상태별 LTV 비율 반환
 * @param region 지역 유형 (규제/조정/투기)
 * @param housingStatus 주택 구입 상태 (일반/생애최초·서민)
 * @returns LTV 비율 (0.5 ~ 0.8)
 */
export function getLtvRate(
  region: RegionType,
  housingStatus: HousingStatus
): number {
  // 생애최초·서민 우대 최우선
  if (housingStatus === 'firstOrSubsistence') {
    return LTV_FIRST_HOME_OR_SUBSISTENCE; // 80%
  }
  // 지역 기준 (일반 / 생애최초 아님)
  if (region === 'nonRegulated') {
    return LTV_NON_REGULATED; // 70%
  }
  // 조정·투기 지역
  return LTV_REGULATED; // 50%
}

/**
 * 금융기관별 DSR 한도 반환
 * @param lender 금융기관 유형 (은행/2금융권)
 * @returns DSR 한도 (0.4 또는 0.5)
 */
export function getDsrLimit(lender: LenderType): number {
  return lender === 'bank' ? DSR_LIMIT_BANK : DSR_LIMIT_NON_BANK;
}

/**
 * 지역별 DTI 한도 반환
 * @param region 지역 유형 (규제/조정/투기/비규제)
 * @returns DTI 한도 (0.4 또는 0.5)
 */
export function getDtiLimit(region: RegionType): number {
  if (region === 'nonRegulated') {
    return DTI_NON_REGULATED; // 50%
  }
  // 조정·투기 지역
  return DTI_REGULATED; // 40%
}
