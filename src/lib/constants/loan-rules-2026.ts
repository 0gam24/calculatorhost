/**
 * 2026년 주택담보대출 한도 규제 상수 (DSR·LTV·DTI·스트레스 DSR·주담대 최대한도) — SSoT
 *
 * 근거 (2026-10-14 확인, 금융위원회 보도자료·정책브리핑):
 * - DSR·LTV·DTI 비율은 법률 조문이 아니라 은행업감독규정 등 금융위원회 고시와 가계부채 관리방안으로 정한다
 * - 6·27 가계부채 관리 강화 방안 (2025-06-27): 수도권·규제지역 주택구입 주담대 최대 6억 원,
 *   생애최초 LTV 70%(수도권·규제지역), 만기 최장 30년, 6개월 안 전입
 * - 10·15 주택시장 안정화 대책 (2025-10-15, 금융 부문 2025-10-16 시행): 서울 전역·경기 12곳 규제지역 지정,
 *   규제지역 LTV 40%, 시가 15억 원 이하 6억·15억 원 초과 25억 원 이하 4억·25억 원 초과 2억 원,
 *   수도권·규제지역 주담대 스트레스 금리 하한 1.5% → 3.0%
 * - 2026-07-01 규제지역 추가 지정: 화성 동탄구·용인 기흥구·구리시
 * - 8·13 금융 종합대책 (2026-08-13): 위 비율·한도 유지, 일부 변경은 2027-01-01부터
 * - 지방 주담대 스트레스 DSR: 2단계(1.5% × 50%) 적용을 2026-12-31까지 연장
 *
 * 2026-10-14 개정: 이전 값(규제지역 LTV 50%, 비규제 DTI 50%, 생애최초 일괄 80%,
 * 스트레스 가산 일괄 1.5%p, 수도권 주담대 최대한도 없음)은 2024년 기준이라 전면 교체했다.
 *
 * ⚠️ 이 파일은 calc-logic-verifier 에이전트 승인 없이 수정 금지.
 * 개정 시 ADR 기록: docs/adr/NNN-대출한도-규제-개정.md
 */

export const YEAR = 2026;

// ============================================
// 타입 정의
// ============================================

/**
 * 지역 구분
 * - regulated: 규제지역(투기과열지구·조정대상지역). 2026-10 현재 서울 25개 구 전체, 경기 과천·광명·
 *   성남 분당·수정·중원·수원 영통·장안·팔달·안양 동안·용인 수지·의왕·하남, 2026-07-01부터 화성 동탄구·
 *   용인 기흥구·구리시
 * - capitalArea: 규제지역이 아닌 수도권(서울·경기·인천 중 위 지역 밖)
 * - local: 지방(비규제)
 */
export type RegionType = 'regulated' | 'capitalArea' | 'local';
export type LenderType = 'bank' | 'nonBank';
/** general: 무주택 또는 처분조건부 1주택, firstHome: 생애최초 주택구입 */
export type HousingStatus = 'general' | 'firstHome';
/** 금리 유형. 스트레스 금리를 얼마나 더할지 정한다 (30년 만기 기준 비율) */
export type RateType = 'variable' | 'mixed' | 'periodic' | 'fixed';

// ============================================
// DSR (총부채원리금상환비율)
// ============================================

/** DSR 한도: 은행권 40% */
export const DSR_LIMIT_BANK = 0.4;

/** DSR 한도: 2금융권 50% */
export const DSR_LIMIT_NON_BANK = 0.5;

// ============================================
// LTV (담보인정비율)
// ============================================

/** 규제지역 LTV 40% (무주택·처분조건부 1주택, 10·15 대책) */
export const LTV_REGULATED = 0.4;

/** 비규제지역 LTV 70% (수도권 비규제·지방) */
export const LTV_NON_REGULATED = 0.7;

/** 생애최초 주택구입 LTV, 수도권·규제지역 70% (6·27 대책) */
export const LTV_FIRST_HOME_CAPITAL = 0.7;

/** 생애최초 주택구입 LTV, 지방 80% */
export const LTV_FIRST_HOME_LOCAL = 0.8;

// ============================================
// DTI (총부채상환비율)
// ============================================

/** DTI 한도: 규제지역(투기과열지구) 40% */
export const DTI_REGULATED = 0.4;

/** DTI 한도: 그 밖의 지역 60% (대부분 DSR 40%가 먼저 한도를 정한다) */
export const DTI_NON_REGULATED = 0.6;

// ============================================
// 주택구입 목적 주담대 최대한도 (수도권·규제지역, 10·15 대책)
// ============================================

export interface MortgageCapTier {
  /** 이 시가 이하까지 (원). null 이면 그 위 전부 */
  upToPrice: number | null;
  /** 최대 대출액 (원) */
  cap: number;
}

/** 시가 15억 원 이하 6억 원, 15억 원 초과 25억 원 이하 4억 원, 25억 원 초과 2억 원 */
export const MORTGAGE_CAP_TIERS_CAPITAL: MortgageCapTier[] = [
  { upToPrice: 1_500_000_000, cap: 600_000_000 },
  { upToPrice: 2_500_000_000, cap: 400_000_000 },
  { upToPrice: null, cap: 200_000_000 },
];

/** 생애최초 LTV 우대 대출의 최대한도 6억 원 (지방 포함) */
export const FIRST_HOME_LOAN_CAP = 600_000_000;

/** 수도권·규제지역 주담대 만기 최장 30년 (6·27 대책) */
export const MAX_TERM_YEARS_CAPITAL = 30;

// ============================================
// 스트레스 DSR (한도 계산에만 더하는 가상 금리)
// ============================================

/** 수도권·규제지역 주담대 스트레스 금리 3.0%p (2025-10-16~, 하한 1.5% → 3.0%) */
export const STRESS_RATE_CAPITAL = 0.03;

/** 지방 주담대 스트레스 금리 1.5% × 2단계 적용률 50% = 0.75%p (2026-12-31까지) */
export const STRESS_RATE_LOCAL = 0.0075;

/** 금리 유형별 스트레스 금리 반영 비율. 수도권·규제지역은 3단계, 지방은 2단계 비율 (30년 만기 기준) */
export const STRESS_RATIO_CAPITAL: Record<RateType, number> = {
  variable: 1,
  mixed: 0.8,
  periodic: 0.4,
  fixed: 0,
};
export const STRESS_RATIO_LOCAL: Record<RateType, number> = {
  variable: 1,
  mixed: 0.6,
  periodic: 0.3,
  fixed: 0,
};

// ============================================
// 헬퍼 함수
// ============================================

/** 수도권(규제지역 포함)인지 */
export function isCapitalOrRegulated(region: RegionType): boolean {
  return region !== 'local';
}

/** 지역·주택 상태별 LTV 비율 */
export function getLtvRate(region: RegionType, housingStatus: HousingStatus): number {
  if (housingStatus === 'firstHome') {
    return region === 'local' ? LTV_FIRST_HOME_LOCAL : LTV_FIRST_HOME_CAPITAL;
  }
  return region === 'regulated' ? LTV_REGULATED : LTV_NON_REGULATED;
}

/** 금융기관별 DSR 한도 */
export function getDsrLimit(lender: LenderType): number {
  return lender === 'bank' ? DSR_LIMIT_BANK : DSR_LIMIT_NON_BANK;
}

/** 지역별 DTI 한도 */
export function getDtiLimit(region: RegionType): number {
  return region === 'regulated' ? DTI_REGULATED : DTI_NON_REGULATED;
}

/**
 * 주택구입 목적 주담대 최대한도 (원). 한도가 없으면 null
 * - 수도권·규제지역: 시가별 6억·4억·2억
 * - 지방 생애최초: 6억 (생애최초 LTV 우대 대출 한도)
 * - 지방 일반: 없음
 */
export function getMortgageCap(
  region: RegionType,
  housePrice: number,
  housingStatus: HousingStatus,
): number | null {
  if (isCapitalOrRegulated(region)) {
    const tier = MORTGAGE_CAP_TIERS_CAPITAL.find(
      (t) => t.upToPrice === null || housePrice <= t.upToPrice,
    )!;
    return tier.cap;
  }
  return housingStatus === 'firstHome' ? FIRST_HOME_LOAN_CAP : null;
}

/** 지역·금리 유형별 스트레스 가산 금리 (%p, 예: 3 = 3.0%p) */
export function getStressAddOnPercent(region: RegionType, rateType: RateType): number {
  const base = isCapitalOrRegulated(region) ? STRESS_RATE_CAPITAL : STRESS_RATE_LOCAL;
  const ratio = isCapitalOrRegulated(region)
    ? STRESS_RATIO_CAPITAL[rateType]
    : STRESS_RATIO_LOCAL[rateType];
  // 부동소수 오차 정리 (0.45000000000000007 → 0.45)
  return Math.round(base * ratio * 100 * 10_000) / 10_000;
}
