/**
 * 2026년 귀속 연말정산 결정세액·예상 환급액 계산 — 순수 함수
 *
 * 법적 근거:
 * - 소득세법 §47 (근로소득공제), §50 (기본공제), §51의3 (연금보험료공제),
 *   §52 (특별소득공제), §55 (세율), §59 (근로소득세액공제), §59의2 (자녀세액공제),
 *   §59의3 (연금계좌세액공제), §59의4 (특별세액공제·표준세액공제)
 * - 조세특례제한법 §95의2 (월세 세액공제), §126의2 (신용카드 등 소득공제)
 * - 지방세법 §103의3 (지방소득세 10%)
 *
 * 상수: src/lib/constants/tax-rates-2026.ts, src/lib/constants/year-end-tax-2026.ts
 */

import {
  CHILD_TAX_CREDIT,
  INCOME_TAX_BRACKETS,
  LOCAL_INCOME_TAX_RATE,
  PERSONAL_DEDUCTION,
} from '@/lib/constants/tax-rates-2026';
import {
  CARD_DEDUCTION_2026,
  EARNED_INCOME_TAX_CREDIT,
  MONTHLY_RENT_TAX_CREDIT,
  PENSION_ACCOUNT_TAX_CREDIT,
  SPECIAL_TAX_CREDITS,
} from '@/lib/constants/year-end-tax-2026';
import {
  calculateEarnedIncomeDeduction,
  calculateEmployment,
  calculateHealth,
  calculateLongTermCare,
  calculatePension,
  calculateProgressiveTax,
  calculateTakeHome,
} from './income';

export type PrePaidTaxMode = 'auto' | 'manual';

export interface YearEndTaxInput {
  /** 연간 총급여 (비과세 제외 과세대상 연간 급여, 원) */
  annualGrossSalary: number;
  /** 기본공제 부양가족 수 (본인 포함, 1 이상 정수) */
  dependents: number;
  /** 8~20세 기본공제 대상 자녀 수 (0 이상, 본인 제외 가족 수 이내) */
  children: number;
  /** 기납부세액 입력 방식 ('auto': 2026 간이세액표×12 자동 추정, 'manual': 직접 입력) */
  prePaidTaxMode?: PrePaidTaxMode;
  /** 직접 입력 연간 기납부세액 합계 (소득세 + 지방소득세, 원). manual 모드에서 사용 */
  manualPrePaidTotalTax?: number;
  /** 연간 신용카드 사용액 (원) */
  creditCardSpend?: number;
  /** 연간 체크카드·현금영수증 사용액 (원) */
  debitAndCashSpend?: number;
  /** 연간 전통시장·대중교통 사용액 (원) */
  marketAndTransitSpend?: number;
  /** 연간 연금저축 납입액 (원, 한도 600만) */
  pensionSavings?: number;
  /** 연간 개인형퇴직연금(IRP) 납입액 (원, 연금저축 합산 한도 900만) */
  irpContribution?: number;
  /** 연간 보장성보험료 납입액 (원, 한도 100만) */
  insurancePremium?: number;
  /** 연간 의료비 지출액 (원, 총급여 3% 초과분 공제) */
  medicalExpense?: number;
  /** 연간 교육비 지출액 (원, 공제대상 한도 내 금액) */
  educationExpense?: number;
  /** 연간 기부금 지출액 (원) */
  donationAmount?: number;
  /** 연간 월세 납입액 (원, 총급여 8,000만 이하 무주택 세대주, 한도 1,000만) */
  annualRent?: number;
}

export interface YearEndTaxResult {
  // 1단계: 근로소득금액
  annualGrossSalary: number;
  earnedIncomeDeduction: number;
  earnedIncomeAmount: number;

  // 2단계: 종합소득공제
  personalDeduction: number;
  nationalPensionDeduction: number;
  healthAndEmploymentDeduction: number;
  cardMinimumUsage: number;
  cardBasicLimit: number;
  cardAdditionalLimit: number;
  cardDeduction: number;
  totalIncomeDeductions: number;

  // 3단계: 과세표준 & 산출세액
  taxableBase: number;
  calculatedTax: number;
  marginalTaxRate: number;

  // 4단계: 세액공제
  earnedIncomeTaxCredit: number;
  childTaxCredit: number;
  pensionAccountTaxCredit: number;
  insuranceTaxCredit: number;
  medicalTaxCredit: number;
  educationTaxCredit: number;
  donationTaxCredit: number;
  monthlyRentTaxCredit: number;
  monthlyRentEligible: boolean;
  standardTaxCreditApplied: boolean;
  totalTaxCredits: number;

  // 5단계: 결정세액 & 환급/추가납부
  determinedIncomeTax: number;
  determinedLocalTax: number;
  determinedTotalTax: number;

  prePaidTaxMode: PrePaidTaxMode;
  prePaidIncomeTax: number;
  prePaidLocalTax: number;
  prePaidTotalTax: number;

  /** 차감징수세액 (총 결정세액 - 총 기납부세액). 음수면 환급, 양수면 추가납부 */
  settlementAmount: number;
  /** 예상 환급액 (환급일 때 양수, 아니면 0) */
  refundAmount: number;
  /** 예상 추가납부액 (추가납부일 때 양수, 아니면 0) */
  additionalTaxAmount: number;
  /** 실효세율 (총 결정세액 / 연간 총급여, 0~1) */
  effectiveTaxRate: number;
}

function assertNonNegativeFinite(value: number, label: string): number {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${label}은(는) 0 이상의 유한한 숫자여야 합니다.`);
  }
  return value;
}

function truncate10(value: number): number {
  return Math.floor(Math.max(0, value) / 10) * 10;
}

/**
 * 근로소득세액공제 계산 — 소득세법 §59
 */
export function calculateEarnedIncomeTaxCredit(
  calculatedTax: number,
  annualGrossSalary: number,
): number {
  if (calculatedTax <= 0 || annualGrossSalary <= 0) return 0;

  const { baseThreshold, baseRate, excessBaseAmount, excessRate, limits } =
    EARNED_INCOME_TAX_CREDIT;

  const rawCredit =
    calculatedTax <= baseThreshold
      ? calculatedTax * baseRate
      : excessBaseAmount + (calculatedTax - baseThreshold) * excessRate;

  let limit: number;
  if (annualGrossSalary <= limits.tier1GrossCap) {
    limit = limits.tier1Max;
  } else if (annualGrossSalary <= limits.tier2GrossCap) {
    limit = Math.max(
      limits.tier2Min,
      limits.tier1Max - (annualGrossSalary - limits.tier1GrossCap) * limits.tier2Slope,
    );
  } else if (annualGrossSalary <= limits.tier3GrossCap) {
    limit = Math.max(
      limits.tier3Min,
      limits.tier2Min - (annualGrossSalary - limits.tier2GrossCap) * limits.tier3Slope,
    );
  } else {
    limit = Math.max(
      limits.tier4Min,
      limits.tier3Min - (annualGrossSalary - limits.tier3GrossCap) * limits.tier4Slope,
    );
  }

  return Math.floor(Math.min(rawCredit, limit));
}

/**
 * 자녀세액공제 계산 — 소득세법 §59의2 (2026년 귀속: 1명 25만, 2명 55만, 3명+ 각 40만)
 */
export function calculateChildTaxCredit(children: number): number {
  if (children <= 0) return 0;
  if (children === 1) return CHILD_TAX_CREDIT.first;
  if (children === 2) return CHILD_TAX_CREDIT.first + CHILD_TAX_CREDIT.second;
  return (
    CHILD_TAX_CREDIT.first +
    CHILD_TAX_CREDIT.second +
    (children - 2) * CHILD_TAX_CREDIT.thirdPlus
  );
}

/**
 * 신용카드 등 사용금액 소득공제 계산 — 조세특례제한법 §126의2 (2026년 귀속 자녀 한도 확대 반영)
 */
export function calculateCardDeduction(params: {
  annualGrossSalary: number;
  children: number;
  creditCardSpend: number;
  debitAndCashSpend: number;
  marketAndTransitSpend: number;
}): {
  minimumUsage: number;
  basicLimit: number;
  additionalLimit: number;
  deduction: number;
} {
  const {
    annualGrossSalary,
    children,
    creditCardSpend,
    debitAndCashSpend,
    marketAndTransitSpend,
  } = params;

  const minimumUsage = Math.floor(annualGrossSalary * CARD_DEDUCTION_2026.minimumUsageRate);
  const cappedChildren = Math.min(Math.max(0, children), CARD_DEDUCTION_2026.maxChildrenForCardBonus);
  const isHighIncome = annualGrossSalary > CARD_DEDUCTION_2026.highIncomeThreshold;

  const basicLimit = isHighIncome
    ? CARD_DEDUCTION_2026.basicLimitOver70M +
      cappedChildren * CARD_DEDUCTION_2026.basicChildBonusOver70M
    : CARD_DEDUCTION_2026.basicLimitUnderOrEqual70M +
      cappedChildren * CARD_DEDUCTION_2026.basicChildBonusUnderOrEqual70M;

  const additionalLimit = isHighIncome
    ? CARD_DEDUCTION_2026.additionalLimitOver70M
    : CARD_DEDUCTION_2026.additionalLimitUnderOrEqual70M;

  const totalSpend = creditCardSpend + debitAndCashSpend + marketAndTransitSpend;
  if (annualGrossSalary <= 0 || totalSpend <= minimumUsage) {
    return { minimumUsage, basicLimit, additionalLimit, deduction: 0 };
  }

  // 최저사용금액(총급여 25%)은 공제율이 낮은 순서(신용카드 15% → 체크·현금 30% → 전통시장·대중교통 40%)로 먼저 차감
  let remainingMin = minimumUsage;

  const creditAfterMin = Math.max(0, creditCardSpend - remainingMin);
  remainingMin = Math.max(0, remainingMin - creditCardSpend);

  const debitAfterMin = Math.max(0, debitAndCashSpend - remainingMin);
  remainingMin = Math.max(0, remainingMin - debitAndCashSpend);

  const marketTransitAfterMin = Math.max(0, marketAndTransitSpend - remainingMin);

  const creditDed = creditAfterMin * CARD_DEDUCTION_2026.rates.creditCard;
  const debitDed = debitAfterMin * CARD_DEDUCTION_2026.rates.debitAndCash;
  const marketTransitDed = marketTransitAfterMin * CARD_DEDUCTION_2026.rates.marketAndTransit;

  const rawTotal = creditDed + debitDed + marketTransitDed;
  const basicApplied = Math.min(rawTotal, basicLimit);
  const overflow = Math.max(0, rawTotal - basicLimit);
  const additionalApplied = Math.min(overflow, marketTransitDed, additionalLimit);

  return {
    minimumUsage,
    basicLimit,
    additionalLimit,
    deduction: Math.floor(basicApplied + additionalApplied),
  };
}

/**
 * 과세표준에 해당하는 한계세율 반환 — 소득세법 §55
 */
export function getMarginalTaxRate(taxableBase: number): number {
  if (taxableBase <= 0) return 0;
  for (const bracket of INCOME_TAX_BRACKETS) {
    if (bracket.upperBound === null || taxableBase <= bracket.upperBound) {
      return bracket.rate;
    }
  }
  return INCOME_TAX_BRACKETS[INCOME_TAX_BRACKETS.length - 1]?.rate ?? 0.45;
}

/**
 * 2026년 귀속 연말정산 결정세액 및 예상 환급액 계산
 */
export function calculateYearEndTax(input: YearEndTaxInput): YearEndTaxResult {
  const annualGrossSalary = assertNonNegativeFinite(input.annualGrossSalary, '연간 총급여');
  if (!Number.isInteger(input.dependents) || input.dependents < 1 || input.dependents > 20) {
    throw new RangeError('부양가족 수(본인 포함)는 1~20 사이의 정수여야 합니다.');
  }
  if (!Number.isInteger(input.children) || input.children < 0) {
    throw new RangeError('자녀 수는 0 이상의 정수여야 합니다.');
  }
  const children = Math.min(input.children, Math.max(0, input.dependents - 1));

  const creditCardSpend = assertNonNegativeFinite(input.creditCardSpend ?? 0, '신용카드 사용액');
  const debitAndCashSpend = assertNonNegativeFinite(
    input.debitAndCashSpend ?? 0,
    '체크카드·현금영수증 사용액',
  );
  const marketAndTransitSpend = assertNonNegativeFinite(
    input.marketAndTransitSpend ?? 0,
    '전통시장·대중교통 사용액',
  );
  const pensionSavings = assertNonNegativeFinite(input.pensionSavings ?? 0, '연금저축 납입액');
  const irpContribution = assertNonNegativeFinite(input.irpContribution ?? 0, 'IRP 납입액');
  const insurancePremium = assertNonNegativeFinite(input.insurancePremium ?? 0, '보장성보험료');
  const medicalExpense = assertNonNegativeFinite(input.medicalExpense ?? 0, '의료비 지출액');
  const educationExpense = assertNonNegativeFinite(input.educationExpense ?? 0, '교육비 지출액');
  const donationAmount = assertNonNegativeFinite(input.donationAmount ?? 0, '기부금');
  const annualRent = assertNonNegativeFinite(input.annualRent ?? 0, '연간 월세액');
  const prePaidTaxMode: PrePaidTaxMode = input.prePaidTaxMode ?? 'auto';
  const manualPrePaidTotalTax = assertNonNegativeFinite(
    input.manualPrePaidTotalTax ?? 0,
    '기납부세액',
  );

  // 1단계: 근로소득공제 및 근로소득금액 (소득세법 §47)
  const earnedIncomeDeduction = Math.floor(calculateEarnedIncomeDeduction(annualGrossSalary));
  const earnedIncomeAmount = Math.max(0, annualGrossSalary - earnedIncomeDeduction);

  // 2단계: 종합소득공제
  const personalDeduction = input.dependents * PERSONAL_DEDUCTION.basic;

  // 연간 4대보험 본인부담금 (2026년 1~6월 / 7~12월 국민연금 기준소득월액 상·하한 각각 6개월 반영)
  const monthlySalary = Math.floor(annualGrossSalary / 12);
  const pensionH1 = calculatePension(monthlySalary, 6) * 6;
  const pensionH2 = calculatePension(monthlySalary, 7) * 6;
  const nationalPensionDeduction = pensionH1 + pensionH2;

  const monthlyHealth = calculateHealth(monthlySalary);
  const monthlyLtc = calculateLongTermCare(monthlyHealth);
  const monthlyEmployment = calculateEmployment(monthlySalary);
  const healthAndEmploymentDeduction = (monthlyHealth + monthlyLtc + monthlyEmployment) * 12;

  const cardResult = calculateCardDeduction({
    annualGrossSalary,
    children,
    creditCardSpend,
    debitAndCashSpend,
    marketAndTransitSpend,
  });

  const totalIncomeDeductions =
    personalDeduction +
    nationalPensionDeduction +
    healthAndEmploymentDeduction +
    cardResult.deduction;

  // 3단계: 과세표준 & 산출세액 (소득세법 §55)
  const taxableBase = Math.max(0, earnedIncomeAmount - totalIncomeDeductions);
  const calculatedTax = Math.floor(calculateProgressiveTax(taxableBase, INCOME_TAX_BRACKETS));
  const marginalTaxRate = getMarginalTaxRate(taxableBase);

  // 4단계: 세액공제
  const earnedIncomeTaxCredit = calculateEarnedIncomeTaxCredit(calculatedTax, annualGrossSalary);
  const childTaxCredit = calculateChildTaxCredit(children);

  // 연금계좌세액공제 (소득세법 §59의3)
  const cappedPensionSavings = Math.min(pensionSavings, PENSION_ACCOUNT_TAX_CREDIT.pensionSavingsCap);
  const cappedPensionTotal = Math.min(
    cappedPensionSavings + irpContribution,
    PENSION_ACCOUNT_TAX_CREDIT.totalCap,
  );
  const pensionCreditRate =
    annualGrossSalary <= PENSION_ACCOUNT_TAX_CREDIT.highRateGrossCap
      ? PENSION_ACCOUNT_TAX_CREDIT.rateUnderOrEqual55M
      : PENSION_ACCOUNT_TAX_CREDIT.rateOver55M;
  const pensionAccountTaxCredit = Math.floor(cappedPensionTotal * pensionCreditRate);

  // 특별세액공제 (소득세법 §59의4)
  const insuranceTaxCredit = Math.floor(
    Math.min(insurancePremium, SPECIAL_TAX_CREDITS.insuranceCap) *
      SPECIAL_TAX_CREDITS.insuranceRate,
  );

  const medicalThreshold = Math.floor(annualGrossSalary * SPECIAL_TAX_CREDITS.medicalThresholdRate);
  const medicalEligible = Math.min(
    Math.max(0, medicalExpense - medicalThreshold),
    SPECIAL_TAX_CREDITS.medicalGeneralCap,
  );
  const medicalTaxCredit = Math.floor(medicalEligible * SPECIAL_TAX_CREDITS.medicalRate);

  const educationTaxCredit = Math.floor(educationExpense * SPECIAL_TAX_CREDITS.educationRate);

  const donationTaxCredit = Math.floor(
    donationAmount <= SPECIAL_TAX_CREDITS.donationThreshold
      ? donationAmount * SPECIAL_TAX_CREDITS.donationBaseRate
      : SPECIAL_TAX_CREDITS.donationThreshold * SPECIAL_TAX_CREDITS.donationBaseRate +
          (donationAmount - SPECIAL_TAX_CREDITS.donationThreshold) *
            SPECIAL_TAX_CREDITS.donationExcessRate,
  );

  // 월세 세액공제 (조특법 §95의2)
  const monthlyRentEligible =
    annualGrossSalary > 0 && annualGrossSalary <= MONTHLY_RENT_TAX_CREDIT.eligibleGrossCap;
  const rentRate =
    annualGrossSalary <= MONTHLY_RENT_TAX_CREDIT.highRateGrossCap
      ? MONTHLY_RENT_TAX_CREDIT.rateUnderOrEqual55M
      : MONTHLY_RENT_TAX_CREDIT.rateOver55MTo80M;
  const monthlyRentTaxCredit = monthlyRentEligible
    ? Math.floor(Math.min(annualRent, MONTHLY_RENT_TAX_CREDIT.annualRentCap) * rentRate)
    : 0;

  // 특별소득공제(건강·고용보험료)가 0원인 특수 케이스에서만 표준세액공제 13만 원 비교 적용
  const itemisedSpecialCredits =
    insuranceTaxCredit +
    medicalTaxCredit +
    educationTaxCredit +
    donationTaxCredit +
    monthlyRentTaxCredit;
  const standardTaxCreditApplied =
    healthAndEmploymentDeduction === 0 &&
    annualGrossSalary > 0 &&
    itemisedSpecialCredits < SPECIAL_TAX_CREDITS.standardTaxCreditWage;

  const appliedSpecialCredits = standardTaxCreditApplied
    ? SPECIAL_TAX_CREDITS.standardTaxCreditWage
    : itemisedSpecialCredits;

  const totalTaxCredits =
    earnedIncomeTaxCredit + childTaxCredit + pensionAccountTaxCredit + appliedSpecialCredits;

  // 5단계: 결정세액 (소득세 + 지방소득세 10%)
  const determinedIncomeTax = truncate10(Math.max(0, calculatedTax - totalTaxCredits));
  const determinedLocalTax = truncate10(determinedIncomeTax * LOCAL_INCOME_TAX_RATE);
  const determinedTotalTax = determinedIncomeTax + determinedLocalTax;

  // 기납부세액
  let prePaidIncomeTax: number;
  let prePaidLocalTax: number;
  let prePaidTotalTax: number;

  if (prePaidTaxMode === 'manual') {
    prePaidTotalTax = Math.round(manualPrePaidTotalTax);
    prePaidIncomeTax = Math.round(prePaidTotalTax / (1 + LOCAL_INCOME_TAX_RATE));
    prePaidLocalTax = prePaidTotalTax - prePaidIncomeTax;
  } else {
    if (annualGrossSalary === 0) {
      prePaidIncomeTax = 0;
      prePaidLocalTax = 0;
      prePaidTotalTax = 0;
    } else {
      const takeHome = calculateTakeHome({
        wageType: 'yearly',
        wageAmount: annualGrossSalary,
        severance: 'separate',
        nontaxableMonthly: 0,
        dependents: input.dependents,
        children,
        calculationMonth: 7,
        withholdingRate: 100,
      });
      prePaidIncomeTax = takeHome.incomeTax * 12;
      prePaidLocalTax = takeHome.localIncomeTax * 12;
      prePaidTotalTax = prePaidIncomeTax + prePaidLocalTax;
    }
  }

  const settlementAmount = determinedTotalTax - prePaidTotalTax;
  const refundAmount = settlementAmount < 0 ? Math.abs(settlementAmount) : 0;
  const additionalTaxAmount = settlementAmount > 0 ? settlementAmount : 0;
  const effectiveTaxRate = annualGrossSalary > 0 ? determinedTotalTax / annualGrossSalary : 0;

  return {
    annualGrossSalary,
    earnedIncomeDeduction,
    earnedIncomeAmount,
    personalDeduction,
    nationalPensionDeduction,
    healthAndEmploymentDeduction,
    cardMinimumUsage: cardResult.minimumUsage,
    cardBasicLimit: cardResult.basicLimit,
    cardAdditionalLimit: cardResult.additionalLimit,
    cardDeduction: cardResult.deduction,
    totalIncomeDeductions,
    taxableBase,
    calculatedTax,
    marginalTaxRate,
    earnedIncomeTaxCredit,
    childTaxCredit,
    pensionAccountTaxCredit,
    insuranceTaxCredit,
    medicalTaxCredit,
    educationTaxCredit,
    donationTaxCredit,
    monthlyRentTaxCredit,
    monthlyRentEligible,
    standardTaxCreditApplied,
    totalTaxCredits,
    determinedIncomeTax,
    determinedLocalTax,
    determinedTotalTax,
    prePaidTaxMode,
    prePaidIncomeTax,
    prePaidLocalTax,
    prePaidTotalTax,
    settlementAmount,
    refundAmount,
    additionalTaxAmount,
    effectiveTaxRate,
  };
}
