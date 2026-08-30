/**
 * daily-topic-pool.mjs
 *
 * 매일 1편 자동 발행(`.github/workflows/daily-auto-post.yml`)용 토픽 풀.
 *
 * 배경: 기존 `ralph-auto-guide.mjs` 의 SEASONAL_GUIDES 는 12개 시즌 토픽 전용이라
 * 전부 발행된 시점(2026-05)부터 항상 `skipped` 를 반환했다. 매일 발행하려면
 * 고갈되지 않는 토픽 소스가 필요하므로 4티어 롱테일 후보를 풀로 분리한다.
 *
 * 선정 규칙:
 *  1. 현재 월(`months`)에 해당하는 시즌 토픽 우선
 *  2. 없으면 풀 순서대로 첫 미발행 토픽
 *  3. `src/app/guide/<slug>/` 가 이미 있으면 무조건 제외 (중복 발행 차단)
 *
 * 풀 소진 시 워크플로가 실패하며 운영자에게 보충을 요구한다.
 * 보충은 이 파일에 항목을 추가하면 끝 (다른 코드 변경 불필요).
 *
 * category 는 `src/app/guide/page.tsx` 의 GuideCategory 유니온과 1:1 이어야 한다.
 */
import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

/** @typedef {{slug: string, title: string, category: string, months?: number[]}} DailyTopic */

/** @type {DailyTopic[]} */
export const DAILY_TOPIC_POOL = [
  // ── 세금: 신고·증빙·가산세 ────────────────────────────────
  { slug: 'tax-invoice-late-issuance-penalty-2026', title: '세금계산서 지연발급 가산세, 언제 얼마나 붙나', category: '세금' },
  { slug: 'revised-tax-invoice-issuance-reasons-2026', title: '수정세금계산서 발급 사유와 작성일자 정하는 법', category: '세금' },
  { slug: 'electronic-tax-invoice-mandatory-target-2026', title: '전자세금계산서 의무발급 대상 기준', category: '세금' },
  { slug: 'withholding-tax-semiannual-payment-2026', title: '원천세 반기납부 신청 조건과 신청 기간', category: '세금', months: [1, 7] },
  { slug: 'year-end-tax-simplified-service-schedule-2026', title: '연말정산 간소화 서비스 일정과 자료 확인 순서', category: '세금', months: [1, 2] },
  { slug: 'donation-deduction-carryover-10-year-2026', title: '기부금 이월공제 10년, 못 받은 공제 살리는 법', category: '세금' },
  { slug: 'foreign-worker-flat-tax-rate-2026', title: '외국인 근로자 단일세율 과세특례 신청 방법', category: '세금' },
  { slug: 'overseas-financial-account-reporting-2026', title: '해외금융계좌 신고 대상과 미신고 과태료', category: '세금', months: [6] },
  { slug: 'overseas-real-estate-acquisition-report-2026', title: '해외부동산 취득·보유 신고 의무 정리', category: '세금' },
  { slug: 'tax-audit-selection-criteria-2026', title: '세무조사 선정 기준, 어떤 사업자가 대상이 되나', category: '세금' },
  { slug: 'tax-appeal-objection-procedure-2026', title: '조세불복 절차, 이의신청·심사청구·심판청구 차이', category: '세금' },
  { slug: 'national-tax-delinquency-seizure-2026', title: '국세 체납 시 압류 절차와 해제 조건', category: '세금' },
  { slug: 'tax-payment-deadline-extension-2026', title: '납부기한 연장·징수유예 신청 요건', category: '세금' },
  { slug: 'religious-worker-income-tax-2026', title: '종교인소득 신고 방법과 필요경비 처리', category: '세금' },
  { slug: 'capital-gains-tax-installment-payment-2026', title: '양도소득세 분납 조건과 신청 방법', category: '세금' },

  // ── 세금: 상속·증여 ──────────────────────────────────────
  { slug: 'gift-tax-annuity-payment-2026', title: '증여세 연부연납 조건과 담보 제공 방법', category: '세금' },
  { slug: 'inheritance-tax-annuity-payment-collateral-2026', title: '상속세 연부연납 기간과 담보 요건', category: '세금' },
  { slug: 'family-business-succession-gift-special-2026', title: '가업승계 증여세 과세특례 요건과 사후관리', category: '세금' },
  { slug: 'insurance-payout-inheritance-tax-2026', title: '보험금도 상속재산인가, 계약자·수익자별 과세 판단', category: '세금' },
  { slug: 'severance-pay-inheritance-tax-2026', title: '사망 퇴직금의 상속재산 포함 여부', category: '세금' },
  { slug: 'low-price-transfer-deemed-gift-2026', title: '저가양수도 증여의제, 시가 대비 얼마부터 과세되나', category: '세금' },
  { slug: 'title-trust-deemed-gift-2026', title: '명의신탁 증여의제, 차명 부동산·주식의 세금', category: '세금' },
  { slug: 'borrowed-name-account-taxation-2026', title: '차명계좌 적발 시 과세와 가산세', category: '세금' },
  { slug: 'parents-living-expenses-gift-tax-2026', title: '부모가 준 생활비, 어디까지 증여세 비과세인가', category: '세금' },
  { slug: 'wedding-gift-money-tax-2026', title: '축의금·혼수의 증여세 과세 기준', category: '세금' },

  // ── 세금·부동산: 취득·보유·양도 ──────────────────────────
  { slug: 'acquisition-tax-refund-contract-cancellation-2026', title: '계약 해제 시 취득세 환급 받는 조건', category: '세금·부동산' },
  { slug: 'acquisition-tax-standard-market-price-2026', title: '취득세 시가표준액, 실거래가와 무엇이 다른가', category: '세금·부동산' },
  { slug: 'property-tax-objection-appeal-2026', title: '재산세 이의신청 기간과 절차', category: '세금·부동산', months: [7, 9] },
  { slug: 'official-land-price-objection-2026', title: '공시지가 이의신청, 언제 어떻게 하나', category: '세금·부동산', months: [1, 5] },
  { slug: 'individual-house-price-announcement-2026', title: '개별주택가격 공시와 세금에 미치는 영향', category: '세금·부동산', months: [4] },
  { slug: 'rural-house-capital-gains-special-2026', title: '농어촌주택 취득 시 1세대1주택 특례 요건', category: '세금·부동산' },
  { slug: 'demolished-house-land-capital-gains-2026', title: '멸실주택 부수토지 양도, 주택인가 토지인가', category: '세금·부동산' },
  { slug: 'non-business-land-heavy-taxation-2026', title: '비사업용 토지 중과, 사업용으로 인정받는 기준', category: '세금·부동산' },
  { slug: 'farmland-ledger-registration-2026', title: '농지대장 등록 의무와 미신고 과태료', category: '세금·부동산' },
  { slug: 'commercial-rental-vat-obligation-2026', title: '상가 임대 시 부가세 신고 의무와 간주임대료', category: '세금·부동산' },
  { slug: 'land-expropriation-compensation-tax-2026', title: '토지 수용 보상금의 양도세와 감면 요건', category: '세금·부동산' },
  { slug: 'registration-license-tax-real-estate-2026', title: '등록면허세, 취득세와 헷갈리는 부분 정리', category: '세금·부동산' },
  { slug: 'ownership-transfer-registration-deadline-2026', title: '소유권이전등기 60일 기한과 지연 과태료', category: '세금·부동산' },
  { slug: 'real-estate-transaction-report-30-days-2026', title: '부동산거래신고 30일 기한과 위반 과태료', category: '세금·부동산' },
  { slug: 'multi-family-vs-multi-household-capital-gains-2026', title: '다가구주택과 다세대주택, 양도세가 갈리는 지점', category: '세금·부동산' },
  { slug: 'illegal-building-enforcement-fine-2026', title: '위반건축물 이행강제금 부과 기준과 해소 방법', category: '세금·부동산' },

  // ── 세금·부동산: 청약·분양·정비사업 ──────────────────────
  { slug: 'resale-restriction-period-2026', title: '전매제한 기간, 지역·유형별로 얼마나 되나', category: '세금·부동산' },
  { slug: 'special-supply-newlywed-2026', title: '신혼부부 특별공급 자격과 소득 기준', category: '세금·부동산' },
  { slug: 'special-supply-multi-child-2026', title: '다자녀 특별공급 배점과 당첨 커트라인 보는 법', category: '세금·부동산' },
  { slug: 'special-supply-first-time-buyer-2026', title: '생애최초 특별공급 자격 요건 총정리', category: '세금·부동산' },
  { slug: 'unsold-apartment-tax-benefit-2026', title: '미분양 주택 취득 시 세제 혜택 조건', category: '세금·부동산' },
  { slug: 'presale-balance-loan-conditions-2026', title: '분양 잔금대출 조건과 한도 계산', category: '세금·부동산' },
  { slug: 'reconstruction-safety-diagnosis-2026', title: '재건축 안전진단 절차와 통과 기준', category: '세금·부동산' },
  { slug: 'apartment-management-fee-disclosure-2026', title: '아파트 관리비 공개 의무와 이의 제기 방법', category: '세금·부동산' },
  { slug: 'self-registration-ownership-transfer-2026', title: '셀프등기 절차와 준비 서류', category: '세금·부동산' },

  // ── 금융: 대출·신용 ──────────────────────────────────────
  { slug: 'loan-transfer-infrastructure-2026', title: '대환대출 인프라로 금리 갈아타는 절차', category: '금융' },
  { slug: 'jeonse-loan-transfer-2026', title: '전세대출 갈아타기 조건과 주의점', category: '금융' },
  { slug: 'mortgage-grace-period-pros-cons-2026', title: '주담대 거치기간, 두면 유리한 경우와 불리한 경우', category: '금융' },
  { slug: 'deposit-collateral-loan-2026', title: '예금담보대출, 예금 깨는 것보다 유리한 조건', category: '금융' },
  { slug: 'insurance-policy-loan-2026', title: '보험계약대출(약관대출) 금리와 상환 방식', category: '금융' },
  { slug: 'credit-loan-vs-card-loan-2026', title: '신용대출과 카드론, 금리·신용점수 영향 비교', category: '금융' },
  { slug: 'sunshine-loan-policy-finance-2026', title: '햇살론 등 정책서민금융 지원 자격', category: '금융' },
  { slug: 'debt-adjustment-program-2026', title: '신용회복위원회 채무조정 신청 절차', category: '금융' },
  { slug: 'personal-rehabilitation-vs-bankruptcy-2026', title: '개인회생과 개인파산, 무엇이 다른가', category: '금융' },
  { slug: 'delinquency-credit-score-recovery-2026', title: '연체 이후 신용점수 회복에 걸리는 시간', category: '금융' },
  { slug: 'student-loan-interest-support-2026', title: '학자금대출 이자 지원 대상과 신청 방법', category: '금융' },
  { slug: 'household-debt-ratio-management-2026', title: '가계 부채비율, 어느 선부터 위험한가', category: '금융' },

  // ── 금융: 예금·결제·환전 ────────────────────────────────
  { slug: 'savings-bank-deposit-safety-check-2026', title: '저축은행 예금, 안전성 확인하는 방법', category: '금융' },
  { slug: 'cma-account-types-comparison-2026', title: 'CMA 종류별 차이와 예금자보호 여부', category: '금융' },
  { slug: 'bank-transfer-limit-adjustment-2026', title: '이체한도 상향 절차와 지연이체 서비스', category: '금융' },
  { slug: 'overseas-remittance-fee-comparison-2026', title: '해외송금 수수료 구조와 줄이는 방법', category: '금융' },
  { slug: 'travel-card-overseas-payment-2026', title: '트래블카드 해외결제, 환전 수수료 따져보기', category: '금융' },
  { slug: 'credit-card-annual-fee-benefit-2026', title: '카드 연회비, 혜택으로 회수되는 기준', category: '금융' },
  { slug: 'card-point-cash-conversion-2026', title: '카드포인트 현금화와 통합조회 방법', category: '금융' },
  { slug: 'emergency-fund-how-much-2026', title: '비상금은 얼마가 적정한가, 산정 기준', category: '금융' },

  // ── 투자: 주식·채권 ──────────────────────────────────────
  { slug: 'securities-transaction-tax-2026', title: '증권거래세율과 매도 시 실제 차감액', category: '투자' },
  { slug: 'stock-lending-fee-income-tax-2026', title: '주식 대여 수수료 수익의 세금 처리', category: '투자' },
  { slug: 'short-selling-individual-investor-2026', title: '개인 공매도 참여 조건과 담보 비율', category: '투자' },
  { slug: 'stock-split-merger-taxation-2026', title: '액면분할·합병 시 취득가액은 어떻게 되나', category: '투자' },
  { slug: 'individual-treasury-bond-2026', title: '개인투자용 국채, 이자 구조와 세제 혜택', category: '투자' },
  { slug: 'corporate-bond-credit-rating-2026', title: '회사채 신용등급 읽는 법과 부도 위험', category: '투자' },
  { slug: 'fund-fee-class-structure-2026', title: '펀드 클래스별 보수 차이와 선택 기준', category: '투자' },
  { slug: 'dividend-record-date-ex-dividend-2026', title: '배당기준일과 배당락, 언제까지 사야 받나', category: '투자', months: [3, 12] },
  { slug: 'employee-stock-ownership-plan-2026', title: '우리사주 취득·매도 시 과세와 보호예수', category: '투자' },

  // ── 투자: 연금계좌·대체투자 ─────────────────────────────
  { slug: 'pension-account-risky-asset-limit-2026', title: '연금계좌 위험자산 투자 한도와 운용 방법', category: '투자' },
  { slug: 'irp-vs-pension-savings-priority-2026', title: 'IRP와 연금저축, 무엇을 먼저 채워야 하나', category: '투자' },
  { slug: 'crypto-travel-rule-transfer-2026', title: '가상자산 트래블룰, 거래소 간 출금 절차', category: '투자' },
  { slug: 'crypto-staking-lending-income-tax-2026', title: '스테이킹·예치 보상의 과세 시점', category: '투자' },
  { slug: 'real-estate-fund-vs-reits-2026', title: '부동산펀드와 리츠, 세금과 환금성 비교', category: '투자' },
  { slug: 'p2p-online-investment-tax-2026', title: '온라인투자연계금융(P2P) 수익의 세금', category: '투자' },

  // ── 근로: 채용·해고·분쟁 ────────────────────────────────
  { slug: 'resignation-notice-period-2026', title: '사직서 제출 후 언제까지 출근해야 하나', category: '근로' },
  { slug: 'probation-period-dismissal-2026', title: '수습기간 해고, 어디까지 정당한가', category: '근로' },
  { slug: 'unfair-dismissal-remedy-application-2026', title: '부당해고 구제신청 기간과 절차', category: '근로' },
  { slug: 'workplace-harassment-report-procedure-2026', title: '직장 내 괴롭힘 신고 절차와 사업주 의무', category: '근로' },
  { slug: 'wage-claim-statute-of-limitations-2026', title: '못 받은 임금, 언제까지 청구할 수 있나', category: '근로' },
  { slug: 'fixed-term-contract-2-year-conversion-2026', title: '기간제 2년 초과 시 무기계약 전환 기준', category: '근로' },
  { slug: 'non-regular-worker-discrimination-remedy-2026', title: '비정규직 차별시정 신청 방법', category: '근로' },

  // ── 근로: 산재·보험 ──────────────────────────────────────
  { slug: 'industrial-accident-application-procedure-2026', title: '산재 신청 절차와 승인까지 걸리는 기간', category: '근로' },
  { slug: 'commuting-accident-industrial-recognition-2026', title: '출퇴근 재해, 산재로 인정되는 범위', category: '근로' },
  { slug: 'employment-insurance-freelancer-artist-2026', title: '노무제공자·예술인 고용보험 가입과 실업급여', category: '근로' },
  { slug: 'dual-job-employment-insurance-2026', title: '두 곳에서 일할 때 고용보험은 어디로 가입되나', category: '근로' },
  { slug: 'retirement-pension-transfer-job-change-2026', title: '이직 시 퇴직연금 이전 절차', category: '근로' },

  // ── 근로: 근로시간·휴가 ─────────────────────────────────
  { slug: 'annual-leave-first-year-11-days-2026', title: '입사 1년 차 연차 11일, 어떻게 생기나', category: '근로' },
  { slug: 'substitute-holiday-compensatory-leave-2026', title: '대체공휴일과 보상휴가, 수당은 어떻게 되나', category: '근로' },
  { slug: 'flexible-working-hours-system-2026', title: '탄력근로제 도입 요건과 연장수당 계산', category: '근로' },
  { slug: 'selective-working-hours-system-2026', title: '선택근로제 정산기간과 초과근로 판단', category: '근로' },
  { slug: 'wage-peak-system-2026', title: '임금피크제 적용 시 퇴직금과 실수령 변화', category: '근로' },
  { slug: 'retirement-age-reemployment-2026', title: '정년 이후 재고용, 임금과 4대보험은 어떻게 되나', category: '근로' },

  // ── 근로: 지원금 ────────────────────────────────────────
  { slug: 'youth-job-leap-incentive-2026', title: '청년일자리도약장려금 지원 요건과 금액', category: '근로' },
  { slug: 'employment-retention-subsidy-2026', title: '고용유지지원금 신청 조건과 절차', category: '근로' },
  { slug: 'parental-leave-substitute-worker-subsidy-2026', title: '육아휴직 대체인력지원금 신청 방법', category: '근로' },
  { slug: 'disability-employment-levy-2026', title: '장애인 고용부담금 산정과 감면', category: '근로' },
  { slug: 'foreign-worker-employment-permit-2026', title: '외국인 고용허가제(E-9) 사업주 절차', category: '근로' },
];

/**
 * 디스크에 이미 존재하는 가이드 슬러그 집합.
 * `src/app/guide/` 하위 디렉터리명이 곧 슬러그.
 */
export function readExistingSlugs(repoRoot = process.cwd()) {
  const guideDir = resolve(repoRoot, 'src/app/guide');
  if (!existsSync(guideDir)) return new Set();
  return new Set(
    readdirSync(guideDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name),
  );
}

/**
 * 오늘 발행할 토픽 1개 선정.
 * 시즌(months) 매칭 우선, 없으면 풀 순서. 모두 소진 시 null.
 *
 * @returns {DailyTopic|null}
 */
export function pickDailyTopic({ existingSlugs, now = new Date() } = {}) {
  const taken = existingSlugs ?? readExistingSlugs();
  const koreaMonth = Number(
    new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Seoul', month: 'numeric' }).format(now),
  );

  const available = DAILY_TOPIC_POOL.filter((t) => !taken.has(t.slug));
  if (available.length === 0) return null;

  const seasonal = available.find((t) => Array.isArray(t.months) && t.months.includes(koreaMonth));
  return seasonal ?? available[0];
}

/** 남은 토픽 수 (운영자 보충 시점 판단용). */
export function remainingTopicCount(existingSlugs = readExistingSlugs()) {
  return DAILY_TOPIC_POOL.filter((t) => !existingSlugs.has(t.slug)).length;
}
