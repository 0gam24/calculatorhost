/**
 * 2026년 세율·공제 상수 (SSoT)
 *
 * ⚠️ 이 파일은 calc-logic-verifier 에이전트 승인 없이 수정 금지.
 * 근거: docs/data-model.md + .claude/skills/korean-tax-rates/REFERENCE.md
 * 개정 시 ADR 기록: docs/adr/NNN-세율-개정.md
 */

export const YEAR = 2026;

// ============================================
// 종합소득세 (8단계 누진) — 소득세법 §55
// ============================================
export interface TaxBracket {
  /** 과세표준 상한 (원). null 이면 초과 구간 */
  upperBound: number | null;
  /** 세율 (0.06 = 6%) */
  rate: number;
  /** 누진공제 (원) */
  cumulativeDeduction: number;
}

export const INCOME_TAX_BRACKETS: TaxBracket[] = [
  { upperBound: 14_000_000, rate: 0.06, cumulativeDeduction: 0 },
  { upperBound: 50_000_000, rate: 0.15, cumulativeDeduction: 1_260_000 },
  { upperBound: 88_000_000, rate: 0.24, cumulativeDeduction: 5_760_000 },
  { upperBound: 150_000_000, rate: 0.35, cumulativeDeduction: 15_440_000 },
  { upperBound: 300_000_000, rate: 0.38, cumulativeDeduction: 19_940_000 },
  { upperBound: 500_000_000, rate: 0.4, cumulativeDeduction: 25_940_000 },
  { upperBound: 1_000_000_000, rate: 0.42, cumulativeDeduction: 35_940_000 },
  { upperBound: null, rate: 0.45, cumulativeDeduction: 65_940_000 },
];

// ============================================
// 4대보험 요율 — 2026년 기준
// ============================================
export const SOCIAL_INSURANCE_2026 = {
  /** 국민연금 — 근로자 부담분 4.5% (총 9%) */
  pension: {
    employee: 0.045,
    total: 0.09,
    /** 기준소득월액 하한 */
    lowerMonthly: 400_000,
    /** 기준소득월액 상한 */
    upperMonthly: 6_370_000,
  },
  /** 건강보험 — 근로자 부담분 3.545% (총 7.09%) */
  health: {
    employee: 0.03545,
    total: 0.0709,
  },
  /** 장기요양 — 건강보험료의 12.95% */
  longTermCare: {
    rateOfHealth: 0.1295,
  },
  /** 고용보험 — 근로자 부담분 0.9% (총 1.8%) */
  employment: {
    employee: 0.009,
    total: 0.018,
  },
} as const;

// ============================================
// 지방소득세 — 소득세의 10%
// ============================================
export const LOCAL_INCOME_TAX_RATE = 0.1;

// ============================================
// 근로소득공제 구간
// ============================================
export interface EarnedIncomeDeductionBracket {
  upperBound: number | null;
  /** 고정 공제액 */
  fixed: number;
  /** 초과분 공제율 */
  rate: number;
  /** 총 공제 한도 */
  cap?: number;
}

export const EARNED_INCOME_DEDUCTION_BRACKETS: EarnedIncomeDeductionBracket[] = [
  { upperBound: 5_000_000, fixed: 0, rate: 0.7 },
  { upperBound: 15_000_000, fixed: 3_500_000, rate: 0.4 },
  { upperBound: 45_000_000, fixed: 7_500_000, rate: 0.15 },
  { upperBound: 100_000_000, fixed: 12_000_000, rate: 0.05 },
  { upperBound: null, fixed: 14_750_000, rate: 0.02, cap: 20_000_000 },
];

// ============================================
// 인적공제
// ============================================
export const PERSONAL_DEDUCTION = {
  basic: 1_500_000, // 기본공제 1인당
  additionalSenior70: 1_000_000, // 70세 이상 추가
  disabled: 2_000_000, // 장애인
  womenHousehold: 500_000, // 부녀자
} as const;

// ============================================
// 자녀세액공제 — 2026년 기준
// ============================================
export const CHILD_TAX_CREDIT = {
  first: 150_000, // 1인
  second: 200_000, // 2인째
  thirdPlus: 400_000, // 3인째부터 각 (공제가 상향되었을 수 있음 → 국세청 확인)
} as const;

// ============================================
// 양도소득세 — 소득세법 §92-§118, 시행령 §159의3
// ============================================
export const TRANSFER_TAX = {
  /** 1세대1주택 비과세 실거래가 상한 */
  oneHouseholdOneHouseNonTaxCap: 1_200_000_000, // 12억
  /** 기본공제 연 */
  annualBasicDeduction: 2_500_000,
  /** 단기 보유 세율 */
  shortTerm: {
    lessThan1Year: 0.4,
    lessThan2YearsHouse: 0.4,
  },
  /** 분양권 */
  subscriptionRight: {
    lessThan1Year: 0.7,
    moreThan1Year: 0.6,
  },
  /** 조정지역 다주택 중과 (기본세율에 가산) */
  adjustedAreaSurcharge: {
    twoHouses: 0.2, // +20%p
    threeOrMoreHouses: 0.3, // +30%p
  },
} as const;

// ============================================
// 장기보유특별공제 — 소득세법 §95②, 시행령 §159의3
// ============================================
/** 일반 장기보유특별공제: 연 2% (3년 이상 ~ 15년 이상 최대 30%) */
export const LONG_TERM_HOLDING_DEDUCTION_GENERAL_PER_YEAR = 0.02;
export const LONG_TERM_HOLDING_DEDUCTION_GENERAL_MAX_YEARS = 15;
export const LONG_TERM_HOLDING_DEDUCTION_GENERAL_MAX = 0.30;

/** 1세대1주택 보유 장기보유특별공제: 연 4% (최대 10년, 40%) — 시행령 §159의3① */
export const LONG_TERM_HOLDING_DEDUCTION_ONE_HOUSE_HOLD_PER_YEAR = 0.04;
/** 1세대1주택 거주 장기보유특별공제: 연 4% (최대 10년, 40%) — 시행령 §159의3① */
export const LONG_TERM_HOLDING_DEDUCTION_ONE_HOUSE_RESIDE_PER_YEAR = 0.04;
export const LONG_TERM_HOLDING_DEDUCTION_ONE_HOUSE_MAX_YEARS_EACH = 10;
export const LONG_TERM_HOLDING_DEDUCTION_ONE_HOUSE_MAX = 0.80;

// ============================================
// 취득세 — 지방세법 §10-§17, 시행령 §22
// ============================================
export interface AcquisitionTaxBracket {
  /** 취득가 상한 (원). null 이면 초과 구간 */
  upperBound: number | null;
  /** 세율 (0.01 = 1%) */
  rate: number;
}

/** 주택 매매 1주택자 기본 세율 (6억~9억 구간 선형보간) */
export const ACQUISITION_TAX_SINGLE_HOUSE_PURCHASE: AcquisitionTaxBracket[] = [
  { upperBound: 600_000_000, rate: 0.01 }, // 6억 이하 1.0% — 지방세법 §13
  { upperBound: 900_000_000, rate: -1 }, // 6억~9억 선형보간 (-1 은 선형 마커, 함수에서 처리)
  { upperBound: null, rate: 0.03 }, // 9억 초과 3.0%
];

export const ACQUISITION_TAX = {
  // ─── 기본 세율 (주택, 매매) ───
  /** 주택 매매 1주택자 구간별 세율 */
  singleHousePurchase: ACQUISITION_TAX_SINGLE_HOUSE_PURCHASE,

  // ─── 중과 세율 (비조정지역) ───
  /** 비조정지역 3주택 이상 — 지방세법 §13의2 */
  nonAdjustedThreeOrMore: 0.12,

  // ─── 증여 취득세 ───
  /** 증여 기본 세율 — 지특법 §13의2 */
  giftBasic: 0.035,
  /** 증여 + 조정지역 + 3주택 이상 중과 — 지특법 §13의2 */
  giftAdjustedHeavy: 0.12,

  // ─── 상속 취득세 ───
  /** 상속 기본 세율 */
  inheritanceBasic: 0.028,

  // ─── 조정지역 중과 ───
  /** 조정지역 2주택 세율 — 지방세법 §13의2 */
  adjustedTwoHouses: 0.08,
  /** 조정지역 3주택 이상 세율 — 지방세법 §13의2 */
  adjustedThreeOrMore: 0.12,

  // ─── 농어촌특별세 (85㎡ 초과) ───
  /** 85㎡ 초과 일반 농특세 — 농어촌특별세법 */
  specialRuralTaxOver85: 0.002,
  /** 85㎡ 초과 + 중과 농특세 — 농어촌특별세법 */
  specialRuralTaxHeavy: 0.01,

  // ─── 지방교육세 ───
  /** 지방교육세 (취득세의) — 지방세법 §265 */
  localEducationTaxOfAcquisition: 0.1,

  // ─── 생애최초 주택 감면 ───
  /** 생애최초 주택 감면 한도 (원) — 지특법 §36의2 */
  firstHomeBuyerMaxDiscount: 2_000_000,
  /** 생애최초 감면 소득제한 (부부합산) — 지특법 §36의2 */
  firstHomeBuyerMaxIncome: 70_000_000,
  /** 생애최초 감면 주택가액 제한 — 지특법 §36의2 */
  firstHomeBuyerMaxPrice: 1_200_000_000,
} as const;

// ============================================
// 재산세 세율 (주택, 일반) — 지방세법 §111
// ============================================
export const PROPERTY_TAX_BRACKETS_GENERAL: TaxBracket[] = [
  { upperBound: 60_000_000, rate: 0.001, cumulativeDeduction: 0 },
  { upperBound: 150_000_000, rate: 0.0015, cumulativeDeduction: 30_000 }, // 3만 원
  { upperBound: 300_000_000, rate: 0.0025, cumulativeDeduction: 180_000 }, // 18만 원
  { upperBound: null, rate: 0.004, cumulativeDeduction: 630_000 }, // 63만 원
];

/** 재산세 — 1세대1주택 공시가 9억 이하 특례 (누진공제는 일반과 동일) */
export const PROPERTY_TAX_BRACKETS_ONE_HOUSE: TaxBracket[] = [
  { upperBound: 60_000_000, rate: 0.0005, cumulativeDeduction: 0 },
  { upperBound: 150_000_000, rate: 0.001, cumulativeDeduction: 30_000 }, // 3만 원 (일반과 동일)
  { upperBound: 300_000_000, rate: 0.002, cumulativeDeduction: 180_000 }, // 18만 원 (일반과 동일)
  { upperBound: null, rate: 0.0035, cumulativeDeduction: 630_000 }, // 63만 원 (일반과 동일)
];

export const PROPERTY_TAX_ASSESSMENT_RATIO = 0.6; // 공정시장가액비율
export const PROPERTY_EDUCATION_TAX_RATE = 0.2; // 재산세의 20%
/** 도시지역분 세율 — 지방세법 §112 */
export const PROPERTY_URBAN_AREA_TAX_RATE = 0.0014; // 0.14%
/** 1세대1주택 특례 공시가 상한 — 지방세법 §111의2 */
export const PROPERTY_ONE_HOUSE_SPECIAL_CAP = 900_000_000; // 9억

// ============================================
// 퇴직소득세 — 소득세법 §148의4 (2023 개정, 2026 유지)
// ============================================

export interface ServiceYearsDeductionBracket {
  /** 근속연수 상한 (년). null = 무제한 */
  upperYears: number | null;
  /** 해당 구간 진입 기준 공제액 (원) */
  baseDeduction: number;
  /** 구간 내 연당 추가 공제액 (원) */
  perYearDeduction: number;
}

/**
 * 근속연수공제 구간 — 소득세법 §148의4
 * 예: 근속 7년 → baseDeduction(5년 초과) + (7-5) × 2,000,000 = 5,000,000 + 4,000,000 = 9,000,000
 */
export const SERVICE_YEARS_DEDUCTION_BRACKETS: ServiceYearsDeductionBracket[] = [
  { upperYears: 5, baseDeduction: 0, perYearDeduction: 1_000_000 }, // 5년 이하: 연 100만
  { upperYears: 10, baseDeduction: 5_000_000, perYearDeduction: 2_000_000 }, // 5~10년: 500만 + (n-5)×200만
  { upperYears: 20, baseDeduction: 15_000_000, perYearDeduction: 2_500_000 }, // 10~20년: 1,500만 + (n-10)×250만
  { upperYears: null, baseDeduction: 40_000_000, perYearDeduction: 3_000_000 }, // 20년 초과: 4,000만 + (n-20)×300만
];

export interface ConvertedSalaryDeductionBracket {
  /** 환산급여 상한 (원). null = 무제한 */
  upperBound: number | null;
  /** 해당 구간 진입 기준 공제액 (원) */
  base: number;
  /** 초과분 공제율 (0.6 = 60%) */
  rate: number;
}

/**
 * 환산급여공제 구간 — 소득세법 §148의4
 * 예: 환산급여 1억 원
 *   → 100M ≤ 300M이므로 base(6,170만) + (100M - 70M) × 45% = 61,700,000 + 13,500,000 = 75,200,000
 */
export const CONVERTED_SALARY_DEDUCTION_BRACKETS: ConvertedSalaryDeductionBracket[] = [
  { upperBound: 8_000_000, base: 0, rate: 1.0 }, // 800만 이하 전액
  { upperBound: 70_000_000, base: 8_000_000, rate: 0.6 }, // 800만~7,000만: 800만 + (n-800만)×60%
  { upperBound: 100_000_000, base: 45_200_000, rate: 0.55 }, // 7,000만~1억: 4,520만 + (n-7,000만)×55%
  { upperBound: 300_000_000, base: 61_700_000, rate: 0.45 }, // 1억~3억: 6,170만 + (n-1억)×45%
  { upperBound: null, base: 151_700_000, rate: 0.35 }, // 3억 초과: 1억 5,170만 + (n-3억)×35%
];

// ============================================
// 증여세·상속세 (공통 5단계) — 상증세법 §26
// ============================================
export const GIFT_INHERITANCE_TAX_BRACKETS: TaxBracket[] = [
  { upperBound: 100_000_000, rate: 0.1, cumulativeDeduction: 0 },
  { upperBound: 500_000_000, rate: 0.2, cumulativeDeduction: 10_000_000 },
  { upperBound: 1_000_000_000, rate: 0.3, cumulativeDeduction: 60_000_000 },
  { upperBound: 3_000_000_000, rate: 0.4, cumulativeDeduction: 160_000_000 },
  { upperBound: null, rate: 0.5, cumulativeDeduction: 460_000_000 },
];

/** 증여재산공제 (10년 합산) */
export const GIFT_DEDUCTION = {
  spouse: 600_000_000, // 배우자 6억
  adultDescendant: 50_000_000, // 성년 직계비속 5천만
  minorDescendant: 20_000_000, // 미성년 직계비속 2천만
  ascendant: 50_000_000, // 직계존속 5천만
  otherRelative: 10_000_000, // 기타 친족 1천만
} as const;

/** 신고세액공제율 (기한 내 자진신고) — 상증세법 §68 */
export const REPORTING_TAX_CREDIT_RATE = 0.03;

// ============================================
// 상속세 (공제) — 상증세법 §18·§19·§20·§21
// ============================================

/** 기초공제 2억 — 상증세법 §18 */
export const INHERITANCE_BASIC_DEDUCTION = 200_000_000;

/** 일괄공제 5억 — 상증세법 §21 */
export const INHERITANCE_LUMP_SUM_DEDUCTION = 500_000_000;

/** 자녀공제 1인당 5천만 — 상증세법 §20(기타인적공제) */
export const INHERITANCE_CHILD_DEDUCTION_PER_HEAD = 50_000_000;

/** 미성년자공제 1인당 연 1천만 — 상증세법 §20(미성년자공제) */
export const INHERITANCE_MINOR_DEDUCTION_PER_YEAR = 10_000_000;

/** 배우자 상속공제 최소 — 상증세법 §19 */
export const INHERITANCE_SPOUSE_MIN_DEDUCTION = 500_000_000;

/** 배우자 상속공제 최대 — 상증세법 §19 */
export const INHERITANCE_SPOUSE_MAX_DEDUCTION = 3_000_000_000;

// ============================================
// 종합부동산세 (누진 7단계) — 종부세법 §7·§8
// ============================================

/** 일반 세율 구간 (1-2주택) — 종부세법 §8 */
export const COMPREHENSIVE_PROPERTY_TAX_BRACKETS_GENERAL: TaxBracket[] = [
  { upperBound: 300_000_000, rate: 0.005, cumulativeDeduction: 0 },
  { upperBound: 600_000_000, rate: 0.007, cumulativeDeduction: 600_000 },
  { upperBound: 1_200_000_000, rate: 0.010, cumulativeDeduction: 2_400_000 },
  { upperBound: 2_500_000_000, rate: 0.013, cumulativeDeduction: 6_000_000 },
  { upperBound: 5_000_000_000, rate: 0.015, cumulativeDeduction: 11_000_000 },
  { upperBound: 9_400_000_000, rate: 0.020, cumulativeDeduction: 36_000_000 },
  { upperBound: null, rate: 0.027, cumulativeDeduction: 101_800_000 },
];

/** 중과 세율 구간 (3주택 이상) — 종부세법 §8② */
export const COMPREHENSIVE_PROPERTY_TAX_BRACKETS_MULTI: TaxBracket[] = [
  { upperBound: 300_000_000, rate: 0.005, cumulativeDeduction: 0 },
  { upperBound: 600_000_000, rate: 0.007, cumulativeDeduction: 600_000 },
  { upperBound: 1_200_000_000, rate: 0.010, cumulativeDeduction: 2_400_000 },
  { upperBound: 2_500_000_000, rate: 0.020, cumulativeDeduction: 14_400_000 },
  { upperBound: 5_000_000_000, rate: 0.030, cumulativeDeduction: 39_400_000 },
  { upperBound: 9_400_000_000, rate: 0.040, cumulativeDeduction: 89_400_000 },
  { upperBound: null, rate: 0.050, cumulativeDeduction: 183_400_000 },
];

/** 1세대1주택 공제 한도 (12억) — 종부세법 §8① */
export const COMPREHENSIVE_PROPERTY_TAX_ONE_HOUSE_DEDUCTION = 1_200_000_000;

/** 다주택 공제 한도 (9억) — 종부세법 §8① */
export const COMPREHENSIVE_PROPERTY_TAX_OTHER_DEDUCTION = 900_000_000;

/** 공정시장가액비율 (60%) — 종부세법 시행령 */
export const COMPREHENSIVE_PROPERTY_TAX_ASSESSMENT_RATIO = 0.6;

/** 농어촌특별세율 (종부세의 20%) — 농특세법 §5 */
export const RURAL_SPECIAL_TAX_ON_COMPREHENSIVE_PROPERTY_RATE = 0.2;

// ─── 1세대1주택 세액공제율 — 종부세법 §9 ───
/** 60~64세 고령자공제 */
export const ONE_HOUSE_SENIOR_CREDIT_60_64 = 0.20;
/** 65~69세 고령자공제 */
export const ONE_HOUSE_SENIOR_CREDIT_65_69 = 0.30;
/** 70세 이상 고령자공제 */
export const ONE_HOUSE_SENIOR_CREDIT_70_PLUS = 0.40;
/** 5~10년 장기보유공제 */
export const ONE_HOUSE_LONG_HOLD_5_10 = 0.20;
/** 10~15년 장기보유공제 */
export const ONE_HOUSE_LONG_HOLD_10_15 = 0.40;
/** 15년 이상 장기보유공제 */
export const ONE_HOUSE_LONG_HOLD_15_PLUS = 0.50;
/** 세액공제 합계 한도 (80%) — 종부세법 §9② */
export const ONE_HOUSE_TOTAL_CREDIT_CAP = 0.80;

// ============================================
// 프리랜서 사업소득 계산 관련 상수
// ============================================
/** 프리랜서 원천징수율 (3% 소득세 + 0.3% 지방소득세) — 소득세법 §127·§129 */
export const FREELANCER_WITHHOLDING_RATE = 0.033;

/** 인적용역(업종코드 94) 기본 단순경비율 (%) — 소득세법 시행령 §143 */
export const FREELANCER_DEFAULT_SIMPLE_EXPENSE_RATE = 64.1;

// ============================================
// 자녀장려금 — 조세특례제한법 §100의3 (2026)
// ============================================
/** 자녀 1인당 연 지급액 (원) */
export const CHILD_TAX_BENEFIT_PER_CHILD = 1_000_000;

/** 자녀장려금 소득 상한 (원) — 조세특례제한법 §100의3 */
export const CHILD_TAX_BENEFIT_INCOME_CAP = 43_000_000;

/** 자녀장려금 소득 감액 시작점 (원) — 조세특례제한법 §100의3 */
export const CHILD_TAX_BENEFIT_INCOME_PHASE_OUT_START = 36_000_000;

/** 자녀장려금 재산 상한 (원) — 조세특례제한법 §100의3 */
export const CHILD_TAX_BENEFIT_ASSET_CAP = 240_000_000;

// ============================================
// 자동차세 — 지방세법 §127·§137·§151 (2026)
// ============================================
export const VEHICLE_TAX_RATES_PASSENGER_NON_BUSINESS = {
  /** 1000cc 이하 비영업용 승용 — cc당 세율 (원) */
  upTo1000cc: 80,
  /** 1600cc 이하 비영업용 승용 — cc당 세율 (원) */
  upTo1600cc: 140,
  /** 1600cc 초과 비영업용 승용 — cc당 세율 (원) */
  over1600cc: 200,
} as const;

/** 차령경감 시작 연수 — 지방세법 §127② (3년 초과부터 시작) */
export const VEHICLE_TAX_REDUCTION_START_YEAR = 3;
/** 차령 당 경감률 — 연 5% 경감 */
export const VEHICLE_TAX_REDUCTION_PER_YEAR = 0.05;
/** 차령경감 최대 한도 — 50% cap */
export const VEHICLE_TAX_REDUCTION_MAX = 0.5;
/** 지방교육세 비율 — 자동차세의 30% (지방세법 §151) */
export const VEHICLE_LOCAL_EDUCATION_TAX_RATE = 0.3;
/** 연납(1월 일괄) 할인율 — 2026 국고예규 기준 */
export const VEHICLE_TAX_ANNUAL_PAYMENT_DISCOUNT_RATE = 0.064;

// ============================================
// 업데이트 로그
// ============================================
/**
 * 2026-04-24: 초판 (docs/data-model.md 기준)
 *   - 종합소득세, 4대보험, 양도소득세, 재산세, 증상증세 기본
 *
 * 2026-04-24: 취득세 보강 (V2)
 *   - ACQUISITION_TAX_SINGLE_HOUSE_PURCHASE 구간 추가 (6억/9억 경계)
 *   - 증여/상속 취득세 세율 상수화
 *   - 생애최초 감면 조건(소득/가격) 상수화
 *   - AcquisitionTaxBracket 인터페이스 정의
 *
 * 2026-04-24: 퇴직소득세 (V3)
 *   - SERVICE_YEARS_DEDUCTION_BRACKETS (근속연수공제 4구간)
 *   - CONVERTED_SALARY_DEDUCTION_BRACKETS (환산급여공제 5구간)
 *   - ServiceYearsDeductionBracket, ConvertedSalaryDeductionBracket 인터페이스
 *
 * 2026-04-24: 프리랜서 사업소득 (V4)
 *   - FREELANCER_WITHHOLDING_RATE = 0.033 (원천징수)
 *   - FREELANCER_DEFAULT_SIMPLE_EXPENSE_RATE = 0.641 (인적용역)
 *
 * 2026-04-24: 상속세 공제 (V5)
 *   - INHERITANCE_BASIC_DEDUCTION = 2억 (기초공제)
 *   - INHERITANCE_LUMP_SUM_DEDUCTION = 5억 (일괄공제)
 *   - INHERITANCE_CHILD_DEDUCTION_PER_HEAD = 5천만 (자녀공제/인)
 *   - INHERITANCE_MINOR_DEDUCTION_PER_YEAR = 1천만 (미성년자공제/연)
 *   - INHERITANCE_SPOUSE_MIN_DEDUCTION = 5억 (배우자 최소)
 *   - INHERITANCE_SPOUSE_MAX_DEDUCTION = 30억 (배우자 최대)
 *
 * 2026-04-24: 자동차세 (V6)
 *   - VEHICLE_TAX_RATES_PASSENGER_NON_BUSINESS (cc당 3구간)
 *   - 차령경감·지방교육세·연납할인 상수
 *
 * ⚠️ 주의: 모든 값은 공식 법조항과 교차 검증 필요.
 * 배포 전 calc-logic-verifier 에이전트 감수 필수.
 */
