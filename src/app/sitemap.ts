import type { MetadataRoute } from 'next';
import { statSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { getLastModifiedForRoute } from '@/lib/seo/date-modified-helper';

// next.config.ts 의 output: 'export' 모드에서 route handler 도 정적 생성 필수.
export const dynamic = 'force-static';

const BASE = 'https://calculatorhost.com';

/**
 * lastModified 우선순위: ① dateModified manifest (git 마지막 커밋 시각, prebuild 생성)
 * ② page.tsx 파일 mtime ③ 빌드 시점(now).
 *
 * CI(Cloudflare Pages) 클론은 모든 파일 mtime 이 클론 시각이라 ②만 쓰면 전 URL 이
 * 빌드 시각으로 뭉개짐 → Google 은 부정확한 lastmod 를 무시 (build-sitemap 가이드).
 * git 커밋 시각 기반 manifest 가 정확한 freshness 신호. (2026-07-22 공식 가이드 동기화)
 */
function fileMtime(relativePath: string): string {
  try {
    const filePath = resolve(process.cwd(), relativePath);
    if (!existsSync(filePath)) return new Date().toISOString();
    return statSync(filePath).mtime.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function pageLastModified(route: string, relativePath: string): string {
  return getLastModifiedForRoute(route, () => fileMtime(relativePath));
}

const CALCULATOR_SLUGS = [
  'salary',
  'severance',
  'loan',
  'loan-limit',
  'capital-gains-tax',
  'acquisition-tax',
  'property-tax',
  'comprehensive-property-tax',
  'broker-fee',
  'rent-conversion',
  'area',
  'savings',
  'deposit',
  'retirement',
  'bmi',
  'd-day',
  'freelancer-tax',
  'gift-tax',
  'inheritance-tax',
  'vehicle-tax',
  'exchange',
  'housing-subscription',
  'child-tax-credit',
  'n-jobber-insurance',
  'rental-yield',
  'inflation',
  'averaging-down',
  'split-buy',
  'split-sell',
  'vat',
  'dti',
];

const CATEGORY_SLUGS = ['work', 'tax', 'finance', 'real-estate', 'lifestyle'];

// 가이드 콘텐츠 (Article schema)
const GUIDE_SLUGS = [
  // 2026-08-19 신규 5편 (장기보유특별공제표1·근로소득공제·문화비소득공제·상속세인적공제·증여취득세시가인정액)
  'long-term-holding-special-deduction-general-2026',
  'earned-income-deduction-brackets-2026',
  'culture-expense-income-deduction-2026',
  'inheritance-other-personal-deduction-2026',
  'gift-acquisition-tax-market-value-2026',
  // 2026-08-18 신규 5편 (증권거래세인상·상가권리금세금·기장세액공제·금융재산상속공제·저축성보험비과세)
  'securities-transaction-tax-increase-2026',
  'commercial-premium-goodwill-tax-2026',
  'bookkeeping-tax-credit-2026',
  'financial-asset-inheritance-deduction-2026',
  'savings-insurance-tax-exemption-2026',
  // 2026-08-17 신규 5편 (부모자녀계좌이체증여세·실업급여알바신고·버팀목전세대출·상속부동산감정평가·농지연금)
  'parent-child-account-transfer-gift-tax-2026',
  'unemployment-benefit-part-time-work-2026',
  'beotimok-jeonse-loan-conditions-2026',
  'inheritance-real-estate-appraisal-vs-official-price-2026',
  'farmland-pension-2026',
  // 2026-08-16 신규 5편 (폭염산재작업중지권·2026세제개편안·청약통장전환·분양권전매제한·기업업무추진비한도)
  'heatwave-heat-illness-work-injury-2026',
  'tax-reform-2026-key-changes',
  'housing-subscription-account-conversion-2026',
  'presale-right-resale-restriction-2026',
  'business-entertainment-expense-limit-2026',
  // 2026-08-15 신규 5편 (단기육아휴직·배우자유산사산휴가·생활비용돈증여세·달러예금세금·부동산실거래신고)
  'short-term-parental-leave-2026',
  'spouse-miscarriage-stillbirth-leave-2026',
  'living-expenses-allowance-gift-tax-exemption-2026',
  'foreign-currency-deposit-tax-2026',
  'real-estate-transaction-report-2026',
  // 2026-08-14 신규 5편 (국세미환급금·추석상여금·증여세분납연부연납·연금계좌이전·사택비과세)
  'national-tax-unclaimed-refund-2026',
  'chuseok-bonus-tax-2026',
  'gift-tax-installment-payment-2026',
  'pension-account-transfer-2026',
  'company-housing-nontaxable-2026',
  // 2026-08-13 신규 5편 (상속포기·전입신고·퇴직연금디폴트옵션·증여취소반환·국민취업지원제도)
  'inheritance-renunciation-2026',
  'resident-registration-move-in-report-2026',
  'retirement-pension-default-option-2026',
  'gift-return-cancellation-2026',
  'national-employment-support-allowance-2026',
  // 2026-08-12 신규 5편 (배우자상속공제·상병수당·노령연금소득감액·결혼세액공제·무주택기간산정)
  'spouse-inheritance-deduction-2026',
  'sickness-benefit-2026',
  'national-pension-work-income-deduction-2026',
  'marriage-tax-credit-2026',
  'housing-subscription-no-house-period-2026',
  // 2026-08-11 신규 5편 (전세사기피해자지원·취업후학자금상환·재건축부담금·연차사용촉진·스톡옵션세금)
  'jeonse-fraud-victim-support-2026',
  'income-contingent-loan-repayment-2026',
  'reconstruction-excess-profit-levy-2026',
  'annual-leave-usage-promotion-2026',
  'venture-stock-option-tax-2026',
  // 2026-08-09 신규 5편 (주52시간연장수당·해고예고수당·유류분·토지거래허가구역·부모급여아동수당)
  '52-hour-workweek-overtime-pay-2026',
  'dismissal-advance-notice-pay-2026',
  'inheritance-legal-reserve-claim-2026',
  'land-transaction-permit-zone-2026',
  'parental-benefit-child-allowance-2026',
  // 2026-08-08 신규 5편 (간이지급명세서·포괄임금제·금리인하요구권·두루누리·소득금액증명원)
  'simplified-payment-statement-obligation-2026',
  'inclusive-wage-system-2026',
  'interest-rate-cut-request-right-2026',
  'durunuri-social-insurance-support-2026',
  'income-certificate-issuance-2026',
  // 2026-08-07 신규 5편 (부동산인지세·상속주택취득세·5인미만근로기준법·수습최저임금90%·부가세예정고지)
  'real-estate-sales-contract-stamp-tax-2026',
  'inheritance-house-acquisition-tax-2026',
  'small-business-under-5-employees-labor-law-2026',
  'probation-period-minimum-wage-90-percent-2026',
  'vat-preliminary-notice-individual-2026',
  // 2026-08-06 신규 5편 (2027최저임금·하이브리드개소세종료·고배당분리과세·현금영수증의무발행·근로계약서의무)
  'minimum-wage-2027',
  'hybrid-vehicle-consumption-tax-sunset-2026',
  'dividend-separate-taxation-value-up-2026',
  'cash-receipt-mandatory-issuance-2026',
  'employment-contract-written-obligation-2026',
  // 2026-08-05 신규 5편 (세제개편안부동산·자동차채권환급·주민세종업원분·공모주청약배정·임대차원상복구)
  'real-estate-tax-reform-2026',
  'local-development-bond-refund-2026',
  'resident-tax-employee-portion-2026',
  'ipo-subscription-allocation-2026',
  'lease-restoration-obligation-2026',
  // 2026-08-04 신규 5편 (1세대1주택거주요건·종부세합산배제신고·창업자금증여특례·평균임금통상임금·적격증빙가산세)
  'one-house-2-year-residence-requirement-2026',
  'comprehensive-real-estate-tax-exclusion-application-2026',
  'startup-fund-gift-tax-special-2026',
  'average-wage-vs-ordinary-wage-2026',
  'qualified-receipt-evidence-penalty-2026',
  // 2026-08-03 신규 5편 (취득세일시적2주택중과배제·다자녀자동차취득세감면·국민연금납부예외·부동산해약금가계약금·양도세취득양도시기)
  'acquisition-tax-temporary-two-houses-exclusion-2026',
  'multi-child-vehicle-acquisition-tax-exemption-2026',
  'national-pension-payment-exception-2026',
  'real-estate-earnest-money-forfeit-2026',
  'capital-gains-acquisition-timing-2026',
  // 2026-08-02 신규 5편 (주택임대사업자등록·신생아취득세감면·양도세환산취득가액·청약예치금액·가족돌봄휴직휴가)
  'housing-rental-business-registration-2026',
  'newborn-childbirth-acquisition-tax-reduction-2026',
  'capital-gains-converted-acquisition-value-2026',
  'private-housing-subscription-deposit-amount-2026',
  'family-care-leave-2026',
  // 2026-08-01 신규 5편 (주담대6억한도·다주택취득세중과·법정상속순위상속분·간이과세세금계산서·임금체불대지급금)
  'mortgage-loan-limit-6-billion-cap-2026',
  'multi-house-acquisition-tax-heavy-8-12-percent-2026',
  'legal-inheritance-order-share-2026',
  'simplified-taxpayer-tax-invoice-obligation-2026',
  'unpaid-wage-substitute-payment-2026',
  // 2026-07-31 신규 5편 (6+6부모육아휴직제·성실신고확인제·조합원입주권양도세·디딤돌대출·계약갱신거절사유)
  'parental-leave-6-plus-6-special-2026',
  'sincere-filing-confirmation-2026',
  'redevelopment-membership-right-capital-gains-tax-2026',
  'didimdol-loan-conditions-2026',
  'lease-renewal-refusal-grounds-2026',
  // 2026-07-30 신규 5편 (고향사랑기부제·주택자금조달계획서·청약재당첨제한·국민연금임의계속가입·ISA만기연금전환)
  'hometown-love-donation-tax-credit-2026',
  'housing-fund-plan-source-of-funds-2026',
  'housing-subscription-rewin-restriction-2026',
  'national-pension-voluntary-continued-enrollment-2026',
  'isa-maturity-pension-account-transfer-2026',
  // 2026-07-29 신규 5편 (근로장려금지급액·사업용신용카드등록·상속세연부연납·겸용주택양도세·국민연금유족연금)
  'earned-income-tax-credit-payment-amount-2026',
  'business-credit-card-hometax-registration-2026',
  'inheritance-tax-filing-payment-installment-2026',
  'mixed-use-house-capital-gains-exemption-2026',
  'national-pension-survivor-benefit-2026',
  // 2026-07-28 신규 5편 (주민세개인분·국민연금상한·자녀세대분리비과세·이혼재산분할세금·업무용승용차비용처리)
  'resident-tax-individual-portion-2026',
  'national-pension-income-upper-limit-2026',
  'child-household-separation-capital-gains-exemption-2026',
  'divorce-property-division-alimony-tax-2026',
  'business-vehicle-expense-deduction-2026',
  // 2026-07-27 신규 5편 (근로장려금지급일감액·자녀장려금지급액·국민연금분할연금·부가세대손세액공제·청약월25만인정한도)
  'earned-income-tax-credit-payment-reduction-2026',
  'child-tax-benefit-payment-2026',
  'national-pension-divorce-split-2026',
  'vat-bad-debt-tax-credit-2026',
  'housing-subscription-monthly-25-recognition-2026',
  // 2026-07-26 신규 5편 (증여취득세·국민연금크레딧·IRP중도인출·기타소득300만분리과세·임차권등기명령)
  'gift-acquisition-tax-2026',
  'national-pension-credit-system-2026',
  'irp-early-withdrawal-conditions-2026',
  'other-income-300-separate-taxation-2026',
  'tenant-lease-registration-injunction-2026',
  // 2026-07-25 신규 5편 (법인세중간예납·의제매입세액공제·리츠배당세금·전세권vs확정일자·복지포인트과세)
  'corporate-tax-interim-prepayment-2026',
  'deemed-input-tax-credit-2026',
  'reits-dividend-tax-2026',
  'jeonse-right-vs-fixed-date-2026',
  'welfare-points-taxation-2026',
  // 2026-07-24 신규 5편 (주민세사업소분·출산전후휴가급여·육아기근로시간단축급여·주택청약1순위·국민연금반환일시금)
  'resident-tax-business-establishment-2026',
  'maternity-leave-benefit-2026',
  'childcare-reduced-hours-benefit-2026',
  'housing-subscription-first-priority-2026',
  'national-pension-lump-sum-refund-2026',
  // 2026-07-23 신규 5편 (배우자출산휴가·스트레스DSR3단계·신생아특례디딤돌대출·간이과세포기·분양권취득세)
  'spouse-childbirth-leave-2026',
  'stress-dsr-stage3-2026',
  'newborn-special-mortgage-loan-2026',
  'simplified-taxation-waiver-2026',
  'presale-right-acquisition-tax-2026',
  // 2026-07-22 신규 5편 (간이과세자7월부가세·부가세매입세액불공제·재산세카드납부·청년월세지원·부가세가산세)
  'simplified-taxpayer-july-vat-2026',
  'vat-non-deductible-input-tax-2026',
  'property-tax-credit-card-payment-2026',
  'youth-monthly-rent-support-2026',
  'vat-penalty-underreporting-2026',
  // 2026-07-21 신규 5편 (폐업부가세확정신고·세대생략증여할증·퇴직금지급기한14일·비상장주식양도세·비과세급여항목)
  'business-closure-vat-final-return-2026',
  'generation-skipping-gift-surcharge-2026',
  'severance-pay-deadline-14-days-2026',
  'unlisted-stock-capital-gains-tax-2026',
  'non-taxable-salary-allowances-2026',
  // 2026-07-20 신규 5편 (근로장려금반기신청·전세보증금반환보증HUG·금투자세금·사업용계좌신고·본인부담상한제환급)
  'earned-income-tax-credit-semiannual-application-2026',
  'jeonse-guarantee-insurance-hug-2026',
  'gold-investment-tax-2026',
  'business-use-account-registration-2026',
  'medical-expense-out-of-pocket-cap-refund-2026',
  // 2026-07-19 신규 5편 (성실신고확인제도·국민연금추납·조기재취업수당·상가환산보증금·국민주택채권매입)
  'honest-tax-return-confirmation-2026',
  'national-pension-additional-payment-2026',
  'early-reemployment-allowance-2026',
  'commercial-lease-conversion-deposit-2026',
  'national-housing-bond-purchase-2026',
  // 2026-07-17 신규 5편 (노란우산공제·간이세액표·금융소득건보료·소액임차인최우선변제·종부세고령자장기보유공제)
  'noran-umbrella-mutual-aid-deduction-2026',
  'simplified-withholding-tax-table-2026',
  'financial-income-health-insurance-premium-2026',
  'small-tenant-priority-repayment-2026',
  'comprehensive-real-estate-tax-elderly-longterm-credit-2026',
  // 2026-07-16 신규 5편 (국민연금임의가입·연금저축중도해지·비과세종합저축·신용카드매출세액공제·퇴직금중간정산)
  'national-pension-voluntary-subscription-2026',
  'pension-savings-early-termination-tax-2026',
  'tax-free-comprehensive-savings-2026',
  'credit-card-sales-vat-deduction-2026',
  'retirement-pay-interim-settlement-2026',
  // 2026-07-15 신규 5편 (혼인출산증여공제·건보임의계속가입·종소세중간예납·상가권리금보호·국내주식대주주양도세)
  'marriage-childbirth-gift-deduction-2026',
  'health-insurance-voluntary-continuation-2026',
  'comprehensive-income-tax-interim-prepayment-2026',
  'commercial-lease-premium-recovery-protection-2026',
  'domestic-stock-major-shareholder-tax-2026',
  // 2026-07-14 신규 5편 (중도퇴사연말정산·기장의무·상생임대인·채권투자세금·계약갱신청구권)
  'mid-year-resignation-year-end-tax-2026',
  'bookkeeping-obligation-double-entry-vs-simple-2026',
  'cooperative-landlord-capital-gains-exemption-2026',
  'bond-investment-tax-2026',
  'lease-renewal-request-implied-renewal-2026',
  // 2026-07-13 신규 5편 (간이과세부가세·기타소득60%·연금소득세·중소기업청년감면·간주임대료)
  'simplified-taxation-vat-2026',
  'other-income-necessary-expense-60-2026',
  'pension-income-tax-withholding-2026',
  'sme-youth-income-tax-reduction-2026',
  'deemed-rental-income-2026',
  // 2026-07-12 신규 5편 (양도세 필요경비·예금자보호1억·전월세신고제·국민연금조기연기·주민세)
  'capital-gains-necessary-expenses-2026',
  'deposit-protection-limit-2026',
  'lease-report-system-2026',
  'national-pension-early-deferred-2026',
  'resident-tax-2026',
  // 2026-07-11 신규 5편 (임대차·투자·근로·상속 실무: 상가임대차·임차권등기·ETF세금·일용직·가업상속)
  'commercial-building-lease-2026',
  'lease-registration-order-2026',
  'etf-tax-domestic-overseas-2026',
  'daily-worker-income-tax-2026',
  'family-business-inheritance-deduction-2026',
  // 2026-07-10 신규 5편 (투자·상속·부동산 실무 — 배당소득세·상속한정승인·오피스텔·사업자등록·코인2027)
  'dividend-income-tax-2026',
  'inheritance-limited-acceptance-2026',
  'officetel-tax-2026',
  'business-registration-2026',
  'virtual-asset-tax-2027',
  // 2026-07-07 신규 5편 (연말정산 공제 클러스터 2차 — 주담대이자·교육비·보험료·ISA·맞벌이배분)
  'mortgage-interest-deduction-2026',
  'education-expense-tax-credit-2026',
  'insurance-premium-tax-credit-2026',
  'isa-account-tax-benefit-2026',
  'dual-income-couple-year-end-tax-2026',
  // 2026-07-03 신규 5편 (고CPC 미커버 갭 + 연말정산 공제 클러스터 — 취득세감면·신용카드·자녀·기부금·청약저축)
  'first-home-acquisition-tax-reduction-2026',
  'credit-card-income-deduction-2026',
  'child-tax-credit-2026',
  'donation-tax-credit-2026',
  'housing-subscription-savings-deduction-2026',
  // 2026-07-01 신규 5편 (7월 재산세 1기·부가세 1기 신고 시즌 + 종부세·연금·양도세 절차 수요)
  'property-tax-installment-payment-2026',
  'comprehensive-real-estate-tax-single-house-credit-2026',
  'pension-savings-irp-tax-credit-2026',
  'capital-gains-tax-preliminary-return-2026',
  'vat-early-refund-2026',
  // 2026-06-30 신규 5편 (세금 면제·공제 한도 검색수요 + 7월 재산세 시즌 재산세 특례·세부담상한)
  'freelancer-take-home-3-3-percent-2026',
  'gift-tax-exemption-limit-2026',
  'inheritance-tax-deduction-limit-2026',
  'property-tax-burden-cap-2026',
  'property-tax-single-house-special-rate-2026',
  // 2026-06-29 데이터 기반 5편 (GSC 전월세전환·DTI 수요 + 7/1 국민연금 인상 + Naver 재산세·전세대출, 저환각 토픽)
  'rent-conversion-calculation-2026',
  'dti-calculation-2026',
  'salary-take-home-2026-july-insurance-increase',
  'jeonse-loan-limit-interest-2026',
  'comprehensive-real-estate-tax-joint-ownership-2026',
  // 2026-06-28 데이터 기반 5편 (Naver 자동차세 급상승 인접 + 임대차·중개·순수 금융/투자 갭, 저환각 토픽)
  'rent-increase-5-percent-cap-2026',
  'broker-fee-negotiation-savings-2026',
  'vehicle-tax-card-payment-2026',
  'real-interest-rate-inflation-2026',
  'split-sell-profit-taking-strategy-2026',
  // 2026-06-22 신규 5편 (세법 계산 허브 + 대출 상환방식 — 고CPC·색인 +5)
  'vehicle-tax-calculation-2026',
  'comprehensive-real-estate-tax-calculation-2026',
  'gift-tax-calculation-2026',
  'inheritance-vs-gift-tax-comparison-2026',
  'equal-payment-vs-equal-principal-2026',
  // 시기성 (월별)
  'tax-calendar-2026',
  'year-end-tax-settlement',
  'january-vehicle-tax-prepayment',
  'february-tax-refund-tracking',
  'march-corporate-tax',
  'april-vat-preliminary-q1',
  'april-comprehensive-property-tax-exclusion',
  'may-comprehensive-income-tax',
  'june-property-tax',
  'property-tax-base-date-june-1-2026',
  'vehicle-individual-consumption-tax-deadline-2026-june',
  'vehicle-tax-june-payment-annual-discount-2026',
  'comprehensive-real-estate-tax-who-pays-2026',
  'earned-income-tax-credit-late-application-2026',
  'energy-voucher-2026-summer-cooling-subsidy',
  'interest-rate-hike-dsr-loan-limit-july-2026',
  'high-oil-price-relief-fund-2026-application',
  'youth-future-savings-account-2026',
  'unemployment-benefit-2026',
  'national-pension-2026',
  'national-pension-premium-2026',
  'basic-pension-2026',
  'health-insurance-premium-2026',
  // 자동차세 종합 허브 (Naver +56% 급상승 + 6월 1기분 시즌, GSC vehicle-tax 노출 456)
  'vehicle-tax-2026',
  // 분야별
  'dsr-loan-limit-tips',
  'averaging-down-vs-loss-cut',
  'capital-gains-tax-tips',
  'dsr-regulation-zones',
  'freelancer-salary-comparison',
  // Phase M: 신규 가이드 2개 (트래픽 가치 높은 니치)
  'jeonse-deposit-safety',
  'capital-gains-tax-5-steps',
  // Phase N: 신규 가이드 1개 (블루오션 C 페르소나)
  'salary-negotiation-take-home',
  // Phase O: 신규 가이드 (5월 신고 시즈널 — 근로·자녀장려금 헷갈림)
  'earned-income-tax-credit-vs-child',
  // GSC 노출 42회 단일 토픽 (페이지 부재 → 즉시 캡처)
  'rent-conversion-rate-2026-housing-lease-act',
  // 퇴직금 vs 연금 DC/DB 비교 가이드 (sitemap 누락 보강)
  'severance-vs-pension-dc-db',
  // 시즈널 7월 부가세 1기 확정신고 (Phase 3 시즈널 6편 첫 발행)
  'july-vat-final-1st-half',
  // 시즈널 8월 양도세 절세 검토
  'august-capital-gains-tax-review',
  // 시즈널 9월 재산세 2차 납부
  'september-property-tax-second',
  // 시즈널 10월 부가세 2기 예정신고
  'october-vat-q2-preliminary',
  // 시즈널 11월 연말정산 준비
  'november-year-end-tax-prep',
  // 시즈널 12월 양도세 마감 결정 (마지막 시즈널)
  'december-capital-gains-tax-deadline',
  // 분양권 양도세 완전 정리 (4티어 핫 키워드)
  'presale-right-capital-gains-tax',
  // 1세대1주택 12억 한도 완전 정리 (4티어 핫 키워드)
  'one-household-12-billion-exemption',
  // N잡 건강보험 피부양자 탈락 가이드 (4티어 핫 키워드)
  'n-jobber-insurance-dependent-disqualification',
  // 주택임대소득 분리과세 2,000만 원 가이드 (4티어 핫 키워드)
  'housing-rental-income-separate-taxation',
  // 자녀·근로장려금 신청 가이드 (5월 31일 마감 시즈널 + 4티어)
  'child-earned-income-tax-credit-application-2026',
  // 부부 공동명의 양도세 절세 가이드 (4티어 핫 키워드)
  'joint-ownership-couple-capital-gains-tax-savings',
  // 상속세 사전 증여 합산 10년/5년 가이드 (4티어 핫 키워드 — 상증법 §13)
  'inheritance-tax-10-year-prior-gift-aggregation',
  // 일시적 2주택 양도세 비과세 3년 가이드 (4티어 핫 키워드 — 시행령 §155)
  'temporary-two-houses-capital-gains-exemption',
  // 장기보유특별공제 80% 가이드 (4티어 핫 키워드 — 1세대1주택 §95 ② / 시행령 §159의3)
  'long-term-holding-special-deduction-80-percent',
  // 부담부증여 양도+증여세 가이드 (4티어 핫 키워드 — 상증법 §47 ②)
  'burden-gift-debt-assumption-tax',
  // 금융소득 종합과세 vs 분리과세 가이드 (4티어 핫 키워드 + 5월 신고 시즈널 — 소득세법 §14 ⑦ / §62)
  'financial-income-comprehensive-vs-separate-taxation',
  // 이월과세 5년→10년 확대 가이드 (4티어 핫 키워드 — 소득세법 §97의2 / 2025-01-01 시행)
  'carry-over-basis-spouse-gift-5-10-year',
  // 자녀 주택 증여 vs 매매 비교 가이드 (4티어 핫 키워드 — 상증법 §35 ① / 시행령 §26)
  'child-house-gift-vs-sale-comparison',
  // 자경농지 8년 100% 감면 가이드 (4티어 핫 키워드 — 조특법 §69 / §133)
  'self-farming-land-100-percent-exemption',
  // 가족 간 차용증·금전대여 증여세 가이드 (4티어 핫 키워드 — 상증법 §41의4 / 시행령 §31의5 적정이자율 4.6%)
  'family-loan-agreement-gift-tax-avoidance',
  'july-vat-and-tax-withholding',
  // 종합소득세 무신고·지연 가산세 (4티어 핫 키워드 — 국세기본법 §47의2 / §47의4 / §48 / 5월 31일 마감 시즈널)
  'income-tax-late-filing-penalty-2026',
  // 프리랜서 단순경비율 vs 기준경비율 (4티어 핫 키워드 — 소득세법 §80 / 시행령 §143·§145 / 5월 31일 마감 시즈널)
  'freelancer-simplified-vs-standard-expense-rate-2026',
  // N잡러 종합소득세 합산 신고 (4티어 핫 키워드 — 소득세법 §14 / §55 / §70 / 5월 31일 마감 시즈널)
  'n-jobber-comprehensive-income-tax-2026',
  // 소득공제 vs 세액공제 (4티어 — 소득세법 §50~§59의5 / 5월 31일 마감 시즈널)
  'income-deduction-vs-tax-credit-2026',
  // 사적연금 1,500만 원 분리과세 (4티어 — 소득세법 §14 ③ 9호 / §129 ⑤ / 5월 마감 시즈널 + 은퇴자 페르소나)
  'private-pension-1500-million-separate-taxation-2026',
  // 월세 세액공제 (4티어 — 조세특례제한법 §95의2 / 5월 추가 신고 시즌 + 무주택 직장인 페르소나)
  'monthly-rent-tax-credit-2026',
  // 종합소득세 환급금 입금 시기 (4티어 — 국세기본법 §51~§52 / 5월 마감 7일 전 시즌 후행 직격)
  'comprehensive-income-tax-refund-timing-2026',
  // 종소세 경정청구 5년 (4티어 — 국세기본법 §45의2 / 장기 트래픽 + 시즌 보강)
  'income-tax-correction-claim-5-year-2026',
  // 상속주택 양도세 1세대1주택 합가 5년 (4티어 — 소득세법 §89 / 시행령 §155 ② / 양도세 hub 강화)
  'inherited-house-capital-gains-exemption-5-year-2026',
  // 종합소득세 분납 신청 1천만 초과 2개월 분할 (4티어 — 소득세법 §77 / 5월 마감 5일 전 시즌 직격)
  'income-tax-installment-payment-2026',
  // 의료비 세액공제 3% 초과 15% 700만 한도 (4티어 — 조세특례제한법 §53 / 누락 회복형)
  'medical-expense-tax-credit-3-percent-2026',
  // 인적공제 부양가족 150만 (4티어 — 소득세법 §50 §51 / 직계존비속·형제자매 요건)
  'personal-deduction-dependent-150-2026',
  // 사업소득 vs 기타소득 분류 (4티어 — 소득세법 §19 / §21 / §37 / 시행령 §87)
  'business-income-vs-other-income-classification-2026',
  // 외국납부세액공제 해외주식·배당 (4티어 블루오션 — 소득세법 §57)
  'foreign-tax-credit-overseas-stock-2026',
  // 사망자 종합소득세 상속인 신고 (4티어 블루오션 — 소득세법 §74 / 6개월 기한)
  'deceased-comprehensive-income-tax-heir-filing-2026',
  // 5월 31일 마감 당일 신고 가이드 (시즌 직격 — 소득세법 §70 / 자정 24:00 마감)
  'may-31-deadline-day-income-tax-filing-2026',
  // 자진신고 6월 30일 50% 감면 (시즌 후행 — 국세기본법 §48 / 마감 후 첫 30일)
  'voluntary-filing-june-50-percent-reduction-2026',
  // 분리과세 vs 종합과세 마스터 (4티어 정리형 — 소득세법 §14 / 사적연금·금융·기타소득)
  'separate-vs-comprehensive-taxation-master-2026',
  // 2026-06-15 데이터 기반 5편 (Naver 급상승 클러스터 롱테일 + GSC 수요 갭)
  // 건강보험 피부양자 자격조건 (건강보험료 +48% — 전업주부·은퇴자 페르소나)
  'health-insurance-dependent-qualification-2026',
  // 국민연금 예상 수령액 (국민연금 +69% — "얼마 받나" 후속 질문)
  'national-pension-expected-benefit-2026',
  // 전기차·하이브리드 자동차세 (자동차세 +67% — EV 정액세율 §127)
  'electric-vehicle-tax-2026',
  // 건강보험 지역가입자 보험료 (건강보험료 +48% — 자영업자·프리랜서)
  'health-insurance-regional-subscriber-2026',
  // 퇴직소득세 계산 (GSC "퇴직금 세금 계산기" 수요 — 소득세법 §48·§55②)
  'retirement-income-tax-2026',
  // 2026-06-16 데이터 기반 3편 (GSC page2 직전 + 수요 쿼리 캡처)
  // 주택 중개수수료 요율표 (GSC broker-fee 10.6위/380노출 — 공인중개사법 §32/시행규칙 §20)
  'real-estate-broker-fee-rate-2026',
  // 예금·적금 이자소득세 15.4% (GSC "예금 이자소득세 15.4% 2026" 8.7위 — 소득세법 §129/§14③)
  'interest-income-tax-15-4-percent-2026',
  // 화폐가치·인플레이션 계산 (GSC inflation 8.9위/162노출 — 비-YMYL 물가 복리 공식)
  'inflation-money-value-2026',
  // 2026-06-19 데이터 기반 5편 (포화 클러스터 회피 → 미커버 인접 토픽, 색인 표면 확장)
  // 연차수당 계산법 (근로 페르소나 — 근로기준법 §60·§61 / salary 계산기 cross-link)
  'annual-leave-allowance-2026',
  // 주휴수당 계산법 (근로 페르소나 — 근로기준법 §55·시행령 §30·§18③ 초단시간)
  'weekly-holiday-allowance-2026',
  // 2026-07-09 신규 5편 (근로·노동+임대차+투자 — 최저임금·통상임금·육아휴직·확정일자·해외주식)
  'minimum-wage-2026',
  'ordinary-wage-2026',
  'parental-leave-benefit-2026',
  'lease-priority-right-fixed-date-2026',
  'overseas-stock-capital-gains-tax-2026',
  // 4대보험 요율 종합 (근로 페르소나 — 국민연금법 §88 7월 인상 / salary·severance cross-link)
  'four-major-insurance-rates-2026',
  // 주택연금 역모기지 (은퇴자 페르소나 — 주택금융공사법 / retirement 계산기 cross-link)
  'housing-pension-reverse-mortgage-2026',
  // 퇴직소득세 이연 IRP (퇴직·세금 — 소득세법 §146의2·§129①5의2호 30~40% 감면)
  'retirement-income-tax-deferral-irp-2026',
  // 중도상환수수료 면제·계산 (금융 — 금융소비자보호법 / loan·loan-limit 계산기 cross-link)
  'prepayment-penalty-fee-2026',
  // 2026-06-21 데이터 기반 5편 (세법 SSoT §N 검증 가능 핵심 토픽 — 색인 표면 +5, 고CPC)
  // 종합소득세율 8구간 (소득세법 §55 — 5월 신고 후행 + 직장인·프리랜서 페르소나)
  'comprehensive-income-tax-rate-brackets-2026',
  // 취득세 계산법 (지방세법 §10~§17 — 부동산 거래 직전자 페르소나, 고CPC)
  'acquisition-tax-calculation-2026',
  // 재산세 계산법 (지방세법 §111·§111의2·§112 — 6월 1일 과세기준일 시즌 + Naver +15%)
  'property-tax-calculation-2026',
  // 상속세 계산법 (상증법 §26·§18~§21·§68 — 은퇴·자산가 페르소나, 고CPC)
  'inheritance-tax-calculation-2026',
  // 2026-06-24 데이터 기반 5편 (Naver 자동차세 +251%·재산세 +13% 급상승 + 순수 금융공식 갭)
  // 재산세 7월 납부 일정·분납 (지방세법 §114·§115·§118 — 6월 1일 과세 후행 + 7월 납기 시즌)
  'property-tax-july-payment-schedule-2026',
  // LTV 계산법 (금융 — 담보인정비율·대출가능액·DSR/DTI 차이, 부동산 거래 직전자 페르소나)
  'ltv-calculation-2026',
  // 자동차세 연납 환급 (지방세법 §127·§128·시행령 §125 — Naver 자동차세 +251% 급상승)
  'vehicle-tax-prepayment-refund-2026',
  // 임대수익률 계산 (표면 vs 순수익률·갭투자 실투자금 — 생활 투자자 페르소나)
  'rental-yield-calculation-2026',
  // 복리·72의 법칙 (순수 금융공식 — 단리 vs 복리·원금 2배 기간, 비-YMYL 트래픽 미끼)
  'compound-interest-72-rule-2026',
  // 2026-06-25 데이터 기반 5편 (Naver 자동차세 +296%·재산세 +30% 급상승 + 대출/환전 순수공식 갭)
  // 하이브리드 자동차세 (지방세법 §127①1·2·3호 — Naver 자동차세 +296% 급상승, EV 정액과 비교)
  'hybrid-vehicle-tax-2026',
  // 자동차 취득세 (지방세법 §12① — 승용 7%·경차 4%, 자동차 구매자 페르소나 고CPC)
  'vehicle-acquisition-tax-2026',
  // 재산세 도시지역분·지역자원시설세 (지방세법 §112·§146 — 6월 1일 과세 후행 + Naver 재산세 +30%)
  'property-tax-urban-area-regional-resource-tax-2026',
  // DSR·DTI·LTV 차이 (금융 — 대출 3대 지표 정리, LTV 가이드 cross-link 메시)
  'dsr-dti-ltv-difference-2026',
  // 환전 수수료·우대율 (순수 금융공식 — 매매기준율·스프레드, 해외송금·여행 페르소나)
  'currency-exchange-fee-preferential-rate-2026',
  // 2026-06-26 데이터 기반 5편 (Naver 자동차세 +296%·재산세 +30% 인접 + 순수 금융/근로 갭, 저환각 토픽)
  // 연장·야간·휴일근로 가산수당 (근로기준법 §50·§56·§57 — 근로 페르소나, salary cross-link)
  'overtime-night-holiday-allowance-2026',
  // 전세 vs 월세 비교 (주택임대차보호법 §7의2 전환율 상한 — 임대차 페르소나, rent-conversion cross-link)
  'jeonse-vs-monthly-rent-comparison-2026',
  // 재산세 vs 종부세 비교 (지방세법 §111·§111의2 / 종부법 §9 — 6월 1일 과세 시즌 + Naver 재산세 +30%)
  'property-tax-vs-comprehensive-real-estate-tax-2026',
  // 자동차 할부 vs 리스 vs 렌트 (순수 금융공식 — 자동차 구매자 페르소나, Naver 자동차세 +296% 인접)
  'car-installment-vs-lease-vs-rent-2026',
  // 대환대출 갈아타기 절약 (순수 금융공식 — 중도상환수수료·인지세 비용, 대출 실행자 페르소나)
  'mortgage-refinance-savings-2026',
  // 2026-06-27 데이터 기반 5편 (Naver 자동차세 +320%·재산세 +38% 인접 + 순수 금융 갭, 저환각 토픽)
  // 중고차 자동차세 일할계산 (지방세법 §128 — Naver 자동차세 +320% 인접, vehicle-tax 계산기 cross-link)
  'used-car-vehicle-tax-daily-proration-2026',
  // 고정금리 vs 변동금리 (순수 금융 비교 — 대출 실행자 페르소나, loan 계산기 cross-link)
  'mortgage-fixed-vs-variable-rate-2026',
  // 신용점수와 대출금리 (순수 금융 — 신용점수 구간별 금리, loan-limit 계산기 cross-link)
  'credit-score-loan-interest-rate-2026',
  // 정기예금 vs 적금 vs 파킹통장 (순수 금융 비교 — 이자소득세 §129, deposit·savings 계산기 cross-link)
  'deposit-vs-savings-vs-parking-account-2026',
  // 청약가점 84점 만점 계산법 (주택공급규칙 별표1 — 청약 대기자 페르소나, housing-subscription 계산기 cross-link)
  'housing-subscription-score-84-points-2026',
];

export default function sitemap(): MetadataRoute.Sitemap {
  // next.config.ts 의 trailingSlash: true 와 일관성을 위해 모든 URL 끝에 / 추가.
  // canonical 과 sitemap 의 URL 형식이 일치해야 Google 색인 충돌 X.
  return [
    {
      url: `${BASE}/`,
      lastModified: pageLastModified('/', 'src/app/page.tsx'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...CATEGORY_SLUGS.map((slug) => ({
      url: `${BASE}/category/${slug}/`,
      lastModified: pageLastModified(`/category/${slug}/`, `src/app/category/${slug}/page.tsx`),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...CALCULATOR_SLUGS.map((slug) => ({
      url: `${BASE}/calculator/${slug}/`,
      lastModified: pageLastModified(`/calculator/${slug}/`, `src/app/calculator/${slug}/page.tsx`),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    // 용어사전 (단일 페이지, 18개 용어)
    {
      url: `${BASE}/glossary/`,
      lastModified: pageLastModified('/glossary/', 'src/app/glossary/page.tsx'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    // 가이드 인덱스
    {
      url: `${BASE}/guide/`,
      lastModified: pageLastModified('/guide/', 'src/app/guide/page.tsx'),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    // 가이드 카테고리 허브 5종 (2026-07-22 신설 — GUIDES SSoT 자동 반영)
    ...(['tax', 'tax-real-estate', 'finance', 'investment', 'work'] as const).map((slug) => ({
      url: `${BASE}/guide/category/${slug}/`,
      lastModified: pageLastModified(`/guide/category/${slug}/`, 'src/app/guide/page.tsx'),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    // 변경 이력 (Changelog) — Freshness 신호용 hub.
    // updates-log.ts 커밋이 페이지 실변경 신호이므로 manifest(page.tsx 기준) 대신 파일 mtime 유지.
    {
      url: `${BASE}/updates/`,
      lastModified: fileMtime('src/lib/constants/updates-log.ts'),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    // 피드 구독 허브 (RSS·Atom·JSON·llms.txt 발견)
    {
      url: `${BASE}/feeds/`,
      lastModified: pageLastModified('/feeds/', 'src/app/feeds/page.tsx'),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    // 계산기 위젯 임베드 허브 (백링크 유도 + "계산기 위젯" 키워드 유입)
    {
      url: `${BASE}/embed-widgets/`,
      lastModified: pageLastModified('/embed-widgets/', 'src/app/embed-widgets/page.tsx'),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    // 가이드 개별 게시물
    ...GUIDE_SLUGS.map((slug) => ({
      url: `${BASE}/guide/${slug}/`,
      lastModified: pageLastModified(`/guide/${slug}/`, `src/app/guide/${slug}/page.tsx`),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...['about', 'privacy', 'terms', 'contact', 'affiliate-disclosure'].map((slug) => ({
      url: `${BASE}/${slug}/`,
      lastModified: pageLastModified(`/${slug}/`, `src/app/${slug}/page.tsx`),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    })),
  ];
}
