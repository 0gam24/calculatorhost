import type { MetadataRoute } from 'next';
import { statSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

// next.config.ts 의 output: 'export' 모드에서 route handler 도 정적 생성 필수.
export const dynamic = 'force-static';

const BASE = 'https://calculatorhost.com';

/**
 * 각 페이지의 page.tsx 파일 mtime 을 lastModified 로 사용.
 * 빌드 시점 일괄 'now' 보다 정확 — 변경된 페이지만 Google 이 우선 크롤링.
 * 파일 없거나 stat 실패 시 빌드 시점(now) fallback.
 */
function pageLastModified(relativePath: string): string {
  try {
    const filePath = resolve(process.cwd(), relativePath);
    if (!existsSync(filePath)) return new Date().toISOString();
    return statSync(filePath).mtime.toISOString();
  } catch {
    return new Date().toISOString();
  }
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
      lastModified: pageLastModified('src/app/page.tsx'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...CATEGORY_SLUGS.map((slug) => ({
      url: `${BASE}/category/${slug}/`,
      lastModified: pageLastModified(`src/app/category/${slug}/page.tsx`),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...CALCULATOR_SLUGS.map((slug) => ({
      url: `${BASE}/calculator/${slug}/`,
      lastModified: pageLastModified(`src/app/calculator/${slug}/page.tsx`),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    // 용어사전 (단일 페이지, 18개 용어)
    {
      url: `${BASE}/glossary/`,
      lastModified: pageLastModified('src/app/glossary/page.tsx'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    // 가이드 인덱스
    {
      url: `${BASE}/guide/`,
      lastModified: pageLastModified('src/app/guide/page.tsx'),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    // 변경 이력 (Changelog) — Freshness 신호용 hub
    {
      url: `${BASE}/updates/`,
      lastModified: pageLastModified('src/lib/constants/updates-log.ts'),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    // 피드 구독 허브 (RSS·Atom·JSON·llms.txt 발견)
    {
      url: `${BASE}/feeds/`,
      lastModified: pageLastModified('src/app/feeds/page.tsx'),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    // 계산기 위젯 임베드 허브 (백링크 유도 + "계산기 위젯" 키워드 유입)
    {
      url: `${BASE}/embed-widgets/`,
      lastModified: pageLastModified('src/app/embed-widgets/page.tsx'),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    // 가이드 개별 게시물
    ...GUIDE_SLUGS.map((slug) => ({
      url: `${BASE}/guide/${slug}/`,
      lastModified: pageLastModified(`src/app/guide/${slug}/page.tsx`),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...['about', 'privacy', 'terms', 'contact', 'affiliate-disclosure'].map((slug) => ({
      url: `${BASE}/${slug}/`,
      lastModified: pageLastModified(`src/app/${slug}/page.tsx`),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    })),
  ];
}
