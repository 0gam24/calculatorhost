import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import {
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
  buildItemListJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/';
const DATE_PUBLISHED = '2026-05-03';
const DATE_MODIFIED = '2026-07-09';

export const metadata: Metadata = {
  title: '가이드 — 카테고리별 모음 (세금·금융·투자·근로·부동산) | calculatorhost',
  description:
    '한국 거주자가 자주 마주치는 금융·세금·부동산·투자·근로 의사결정을 위한 실전 가이드 모음. 시기성 콘텐츠(5월 종소세, 7월 재산세) + 분야별 절세·전략 가이드.',
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '가이드 — 카테고리별 모음 (세금·금융·투자·근로·부동산) | calculatorhost' }],
    title: 'calculatorhost 가이드 — 카테고리별 모음',
    description: '시기성 + 분야별 실전 의사결정 가이드.',
    url: URL,
    type: 'website',

    locale: 'ko_KR',
  },
};

interface GuideEntry {
  slug: string;
  title: string;
  description: string;
  category: GuideCategory;
  publishedAt: string;
  readingMinutes: number;
  /** 시즌 강조 표기 (예: '5월 신고 시즌', '7월 납부 직전') */
  seasonal?: string;
  /** 다중 태그 — category 단일 분류로 표현 안 되는 교차 토픽 (예: '4티어', '핫키워드', 'YMYL', '시즈널'). */
  tags?: string[];
}

type GuideCategory = '세금' | '세금·부동산' | '금융' | '투자' | '근로';

interface CategoryMeta {
  id: GuideCategory;
  emoji: string;
  description: string;
}

const CATEGORIES: CategoryMeta[] = [
  { id: '세금', emoji: '🧾', description: '종합소득세·양도세·취득세·VAT 신고와 절세' },
  { id: '세금·부동산', emoji: '🏠', description: '재산세·종합부동산세·임대차 세제' },
  { id: '금융', emoji: '💰', description: 'DSR·LTV·대출한도·예적금·환율' },
  { id: '투자', emoji: '📈', description: '주식·코인 평단·분할매수·분할매도' },
  { id: '근로', emoji: '💼', description: '연봉·실수령·프리랜서·N잡러' },
];

export const GUIDES: GuideEntry[] = [
  // 2026-07-15 신규 5편 (혼인출산증여공제·건보임의계속가입·종소세중간예납·상가권리금보호·국내주식대주주양도세)
  {
    slug: 'marriage-childbirth-gift-deduction-2026',
    title: '혼인·출산 증여재산공제 2026, 최대 1억원 절세 요건 총정리',
    description:
      '결혼·출산 때 부모가 재산을 물려줘도 최대 1억원까지 증여세가 없습니다. 상증법 §53의2 혼인·출산 증여재산공제의 요건, 통합 1억 한도, 일반공제 5천만원과 합쳐 1.5억까지 무증여세로 받는 방법을 사례로 정리합니다.',
    category: '세금',
    publishedAt: '2026-07-15',
    readingMinutes: 8,
  },
  {
    slug: 'health-insurance-voluntary-continuation-2026',
    title: '건강보험 임의계속가입 2026, 퇴직 후 36개월 보험료 폭탄 막기',
    description:
      '퇴직하면 지역가입자로 바뀌며 재산·자동차까지 보험료에 반영돼 폭탄을 맞기 쉽습니다. 국민건강보험법 §110 임의계속가입으로 최대 36개월간 직장가입자 수준 보험료를 유지하는 요건과 신청기한을 정리합니다.',
    category: '근로',
    publishedAt: '2026-07-15',
    readingMinutes: 8,
  },
  {
    slug: 'comprehensive-income-tax-interim-prepayment-2026',
    title: '종합소득세 중간예납 2026, 11월 고지·추계신고·분납 총정리',
    description:
      '개인사업자·프리랜서는 11월에 전년 종합소득세의 절반을 미리 냅니다. 소득세법 §65 중간예납의 고지 방식, 50만원 미만 제외, 사업 부진 시 추계신고, 분납 요건을 사례로 정리합니다.',
    category: '세금',
    publishedAt: '2026-07-15',
    readingMinutes: 8,
  },
  {
    slug: 'commercial-lease-premium-recovery-protection-2026',
    title: '상가 권리금 회수기회 보호 2026, 임대인 방해 시 손해배상',
    description:
      '임대인이 정당한 사유 없이 신규임차인과의 계약을 막으면 권리금 손해를 배상해야 합니다. 상가건물임대차보호법 §10의4 권리금 회수기회 보호의 방해금지 행위, 손해배상 한도, 3년 소멸시효를 정리합니다.',
    category: '세금·부동산',
    publishedAt: '2026-07-15',
    readingMinutes: 8,
  },
  {
    slug: 'domestic-stock-major-shareholder-tax-2026',
    title: '국내주식 대주주 양도소득세 2026, 종목당 50억 기준과 세율',
    description:
      '국내 상장주식은 소액주주면 양도세가 없지만, 종목당 50억원 이상 보유한 대주주는 양도차익에 세금을 냅니다. 소득세법 §94와 시행령 §157 기준, 20~25% 세율, 반기별 신고를 사례로 정리합니다.',
    category: '투자',
    publishedAt: '2026-07-15',
    readingMinutes: 8,
  },
  // 2026-07-14 신규 5편 (중도퇴사연말정산·기장의무·상생임대인·채권투자세금·계약갱신청구권)
  {
    slug: 'mid-year-resignation-year-end-tax-2026',
    title: '중도퇴사 연말정산 2026, 재취업·5월 종소세로 환급받는 법',
    description:
      '연도 중간에 퇴사하면 기본공제만 반영돼 세금을 더 낸 상태가 됩니다. 재취업 시 종전근무지 합산, 미취업 시 5월 종합소득세 확정신고로 누락 공제를 되찾는 방법을 소득세법 §137로 정리합니다.',
    category: '세금',
    publishedAt: '2026-07-14',
    readingMinutes: 8,
  },
  {
    slug: 'bookkeeping-obligation-double-entry-vs-simple-2026',
    title: '복식부기 vs 간편장부 2026, 기장의무 기준과 무기장가산세',
    description:
      '개인사업자는 직전연도 수입금액에 따라 복식부기의무자(도소매 3억·제조 1.5억·서비스 7,500만원 이상)와 간편장부대상자로 나뉩니다. 무기장가산세 20%와 기장 이점을 소득세법 §160으로 정리합니다.',
    category: '세금',
    publishedAt: '2026-07-14',
    readingMinutes: 8,
  },
  {
    slug: 'cooperative-landlord-capital-gains-exemption-2026',
    title: '상생임대인 2026, 5% 이내 인상으로 양도세 거주요건 면제',
    description:
      '임대료를 직전 대비 5% 이내로 올린 1주택자는 양도소득세 비과세의 2년 거주요건을 면제받습니다. 직전계약 1년 6개월·상생계약 2년 요건과 2026년 말 일몰을 소득세법 시행령 §155의3으로 정리합니다.',
    category: '세금·부동산',
    publishedAt: '2026-07-14',
    readingMinutes: 8,
  },
  {
    slug: 'bond-investment-tax-2026',
    title: '채권투자 세금 2026, 표면이자 15.4%·매매차익 비과세',
    description:
      '개인이 직접 보유한 채권의 표면이자는 15.4% 과세되지만 매매차익은 비과세입니다. 저쿠폰채 절세, 금융소득 2,000만원 종합과세, 펀드·ETF 예외를 소득세법 §16으로 정리합니다.',
    category: '투자',
    publishedAt: '2026-07-14',
    readingMinutes: 8,
  },
  {
    slug: 'lease-renewal-request-implied-renewal-2026',
    title: '계약갱신청구권·묵시적 갱신 2026, 5% 상한과 2+2년',
    description:
      '임차인은 계약갱신요구권으로 2+2년 거주와 5% 이내 인상 상한을 보장받습니다. 묵시적 갱신과의 차이, 갱신거절 정당사유, 3개월 해지 규정을 주택임대차보호법 §6·§6의3으로 정리합니다.',
    category: '세금·부동산',
    publishedAt: '2026-07-14',
    readingMinutes: 8,
  },
  // 2026-07-13 신규 5편 (간이과세부가세·기타소득60%·연금소득세·중소기업청년감면·간주임대료)
  {
    slug: 'simplified-taxation-vat-2026',
    title: '간이과세자 부가가치세 2026, 기준 1억400만원·세금계산서 발급',
    description:
      '간이과세자는 직전연도 공급대가 1억400만원 미만 소규모 사업자입니다. 부가율 적용 세액, 세금계산서 발급 의무 4,800만원, 납부면제 조건을 부가가치세법 §61로 정리합니다.',
    category: '세금',
    publishedAt: '2026-07-13',
    readingMinutes: 8,
  },
  {
    slug: 'other-income-necessary-expense-60-2026',
    title: '기타소득 필요경비 60% 2026, 강연료·원고료 세금과 8.8% 원천징수',
    description:
      '강연료·원고료·자문료 기타소득은 증빙 없이 60% 필요경비가 인정돼 8.8%만 원천징수됩니다. 기타소득금액 300만원 이하 분리과세 선택과 절세 계산을 소득세법 §21로 정리합니다.',
    category: '세금',
    publishedAt: '2026-07-13',
    readingMinutes: 8,
  },
  {
    slug: 'pension-income-tax-withholding-2026',
    title: '연금소득세 2026, 사적연금 1500만원 분리과세와 연령별 3.3~5.5%',
    description:
      '연금저축·IRP 사적연금은 연 1,500만원까지 연령별 3.3~5.5% 저율 분리과세됩니다. 초과 시 종합·16.5% 분리과세 선택과 수령 절세 전략을 소득세법 §20의3으로 정리합니다.',
    category: '금융',
    publishedAt: '2026-07-13',
    readingMinutes: 8,
  },
  {
    slug: 'sme-youth-income-tax-reduction-2026',
    title: '중소기업 취업 청년 소득세 감면 2026, 90% 5년·연 200만원 한도',
    description:
      '만 15~34세 청년이 중소기업에 취업하면 소득세 90%를 5년간 감면받습니다(연 200만원 한도). 대상, 신청 방법, 병역 연령 차감을 조세특례제한법 §30으로 정리합니다.',
    category: '근로',
    publishedAt: '2026-07-13',
    readingMinutes: 8,
  },
  {
    slug: 'deemed-rental-income-2026',
    title: '간주임대료 2026, 3주택·보증금 3억 초과 전세보증금 과세',
    description:
      '전세보증금도 3주택 이상이면서 합계 3억원을 초과하면 간주임대료로 과세됩니다. 계산식(초과분 × 60% × 정기예금이자율), 소형주택 제외, 신고 방법을 소득세법 §25로 정리합니다.',
    category: '세금·부동산',
    publishedAt: '2026-07-13',
    readingMinutes: 8,
  },
  // ─── 2026-07-12 신규 5편 (양도세 필요경비·예금자보호1억·전월세신고제·국민연금조기연기·주민세) ───
  {
    slug: 'capital-gains-necessary-expenses-2026',
    title: '양도소득세 필요경비 2026, 취득가·자본적지출·양도비 공제',
    description:
      '양도차익에서 빼주는 필요경비 3가지(취득가액·자본적지출·양도비)의 인정 범위. 새시·발코니 확장은 인정, 도배·장판은 제외. 증빙 요건과 절세 계산 사례를 소득세법 §97로 정리합니다.',
    category: '세금·부동산',
    publishedAt: '2026-07-12',
    readingMinutes: 8,
  },
  {
    slug: 'deposit-protection-limit-2026',
    title: '예금자보호 한도 1억원 2026, 시행일·대상·분산예치',
    description:
      '2025년 9월 1일부터 예금자보호 한도가 5천만원에서 1억원으로 상향됐습니다. 보호 대상과 제외 상품, 금융회사별 1인당 한도 적용, 분산예치 전략을 예금자보호법 §32로 정리합니다.',
    category: '금융',
    publishedAt: '2026-07-12',
    readingMinutes: 7,
  },
  {
    slug: 'lease-report-system-2026',
    title: '전월세 신고제 2026, 대상·30일 기한·과태료·신고방법',
    description:
      '보증금 6천만원 초과 또는 월세 30만원 초과 주택 임대차는 계약일부터 30일 안에 신고해야 합니다. 대상, 온라인·주민센터 신고 방법, 과태료를 부동산 거래신고법 §6의2로 정리합니다.',
    category: '세금·부동산',
    publishedAt: '2026-07-12',
    readingMinutes: 8,
  },
  {
    slug: 'national-pension-early-deferred-2026',
    title: '국민연금 조기수령·연기연금 2026, 감액 6%·증액 7.2%',
    description:
      '국민연금은 최대 5년 조기 수령하면 연 6%씩 최대 30% 깎이고, 최대 5년 연기하면 연 7.2%씩 최대 36% 늘어납니다. 손익분기와 선택 기준을 국민연금법 §61·§62로 정리합니다.',
    category: '근로',
    publishedAt: '2026-07-12',
    readingMinutes: 8,
  },
  {
    slug: 'resident-tax-2026',
    title: '주민세 2026, 개인분·사업소분·종업원분 세율과 8월 납부',
    description:
      '주민세는 개인분(1만원 이하 조례), 사업소분(연면적 1㎡당 250원), 종업원분(급여총액 0.5%)으로 나뉩니다. 유형별 세율과 8월 납부 일정, 면세 기준을 지방세법으로 정리합니다.',
    category: '세금',
    publishedAt: '2026-07-12',
    readingMinutes: 7,
  },
  // ─── 2026-07-11 신규 5편 (임대차·투자·근로·상속 실무: 상가임대차·임차권등기·ETF세금·일용직·가업상속) ───
  {
    slug: 'commercial-building-lease-2026',
    title: '상가건물 임대차보호법 2026, 계약갱신 10년·권리금·차임 5%',
    description:
      '자영업 임차인·건물주를 위한 상가 임대차보호법. 계약갱신요구권 10년, 권리금 회수기회 보호(§10의4), 차임 증액 상한 5%, 대항력과 환산보증금 기준을 정리합니다.',
    category: '세금·부동산',
    publishedAt: '2026-07-11',
    readingMinutes: 9,
  },
  {
    slug: 'lease-registration-order-2026',
    title: '임차권등기명령 2026, 보증금 못 받고 이사할 때 대항력 유지',
    description:
      '임대차 종료 후 보증금을 못 받으면 임차인 단독으로 임차권등기명령을 신청합니다(주임법 §3의3). 신청 요건·절차·효과와 2023년 개정(송달 전 집행)을 정리합니다.',
    category: '세금·부동산',
    publishedAt: '2026-07-11',
    readingMinutes: 10,
  },
  {
    slug: 'etf-tax-domestic-overseas-2026',
    title: 'ETF 세금 2026, 국내 vs 해외상장 매매차익·분배금 과세',
    description:
      '국내주식형 ETF는 매매차익 비과세에 분배금 15.4%, 기타 ETF는 매매차익도 15.4%, 해외상장 ETF는 양도세 22%입니다. 유형별 과세 차이와 종합과세 기준을 정리합니다.',
    category: '투자',
    publishedAt: '2026-07-11',
    readingMinutes: 8,
  },
  {
    slug: 'daily-worker-income-tax-2026',
    title: '일용직 근로소득세 2026, 일당 세금 6%·15만원 공제·분리과세',
    description:
      '일용근로자는 일급 15만원 공제 후 6% 세율, 세액공제 55%로 실효 약 2.7%가 원천징수되고 분리과세로 끝납니다(소득세법 §14③). 일급별 세액을 사례로 정리합니다.',
    category: '근로',
    publishedAt: '2026-07-11',
    readingMinutes: 8,
  },
  {
    slug: 'family-business-inheritance-deduction-2026',
    title: '가업상속공제 2026, 최대 600억 공제 요건·사후관리 5년',
    description:
      '중소·중견기업 가업 승계 시 영위기간별 최대 600억원 상속세 공제(상증법 §18의2). 10년 경영 요건과 사후관리 5년(고용·자산·지분 유지) 조건을 정리합니다.',
    category: '세금',
    publishedAt: '2026-07-11',
    readingMinutes: 9,
  },
  // ─── 2026-07-10 신규 5편 (투자·상속·부동산 실무 — 배당소득세·상속한정승인·오피스텔·사업자등록·코인2027) ───
  {
    slug: 'dividend-income-tax-2026',
    title: '배당소득세 2026 — 15.4% 원천징수·금융소득 종합과세',
    description:
      '주식·펀드 배당금은 15.4%로 원천징수됩니다(소득세법 §17·§129). 이자+배당 합산 2,000만원 이하는 분리과세로 끝나고 초과분은 종합과세되는 구조를 사례로 정리합니다.',
    category: '투자',
    publishedAt: '2026-07-10',
    readingMinutes: 8,
  },
  {
    slug: 'inheritance-limited-acceptance-2026',
    title: '상속 한정승인·상속포기 2026 — 빚 초과 시 3개월 내 신고',
    description:
      '상속채무가 재산을 초과하면 3개월 내 한정승인 또는 상속포기를 신고합니다(민법 §1019). 한정승인·포기·특별한정승인의 차이와 후순위 승계 함정을 정리합니다.',
    category: '세금',
    publishedAt: '2026-07-10',
    readingMinutes: 9,
  },
  {
    slug: 'officetel-tax-2026',
    title: '오피스텔 세금 2026 — 주택용 vs 업무용 취득·재산·양도세',
    description:
      '오피스텔은 실제 사용 용도에 따라 세금이 크게 달라집니다. 취득세 4.6%, 주거용의 주택 수 포함 여부, 재산세·종부세·양도세·부가세 차이를 정리합니다.',
    category: '세금·부동산',
    publishedAt: '2026-07-10',
    readingMinutes: 9,
  },
  {
    slug: 'business-registration-2026',
    title: '개인사업자 등록 2026 — 프리랜서 전환·간이 vs 일반과세',
    description:
      '프리랜서에서 개인사업자로 전환할 때의 등록 절차와 간이과세(매출 1억 400만 미만) vs 일반과세 선택 기준을 정리합니다(부가세법 §8·§61). 4,800만 미만 납부면제까지.',
    category: '세금',
    publishedAt: '2026-07-10',
    readingMinutes: 8,
  },
  {
    slug: 'virtual-asset-tax-2027',
    title: '가상자산(코인) 과세 2027 — 250만 공제·22%·현재 비과세',
    description:
      '가상자산 양도차익은 현재(2026) 비과세이며 2027년 1월 시행 예정입니다(소득세법 §21). 연 250만원 공제 후 22% 분리과세·의제취득가액 구조를 정리합니다.',
    category: '투자',
    publishedAt: '2026-07-10',
    readingMinutes: 8,
  },
  // ─── 2026-07-07 신규 5편 (연말정산 공제 클러스터 2차 — 주담대이자·교육비·보험료·ISA·맞벌이배분) ───
  {
    slug: 'mortgage-interest-deduction-2026',
    title: '주택담보대출 이자 소득공제 2026 — 최대 2,000만원 절세',
    description:
      '무주택·1주택 세대주는 장기주택저당차입금 이자상환액을 소득공제받습니다(소득세법 §52). 기준시가 6억 이하 주택, 상환기간·금리·상환방식별 한도(600~2,000만원)를 정리합니다.',
    category: '세금',
    publishedAt: '2026-07-07',
    readingMinutes: 9,
  },
  {
    slug: 'education-expense-tax-credit-2026',
    title: '교육비 세액공제 2026 — 15% 공제·초중고 300만·대학 900만',
    description:
      '교육비는 15% 세액공제됩니다(소득세법 §59의4). 취학전·초중고 1명당 300만원, 대학생 900만원, 본인 전액 한도와 급식비·교복·현장체험학습 등 공제 대상을 정리합니다.',
    category: '세금',
    publishedAt: '2026-07-07',
    readingMinutes: 8,
  },
  {
    slug: 'insurance-premium-tax-credit-2026',
    title: '보장성보험료 세액공제 2026 — 100만원 한도·12% 공제',
    description:
      '기본공제대상자를 피보험자로 한 보장성보험료는 연 100만원 한도 12% 세액공제됩니다(소득세법 §59의4). 장애인전용 15%, 저축성보험 제외 등 조건을 정리합니다.',
    category: '세금',
    publishedAt: '2026-07-07',
    readingMinutes: 8,
  },
  {
    slug: 'isa-account-tax-benefit-2026',
    title: 'ISA 계좌 세제혜택 2026 — 200만원 비과세·9.9% 분리과세',
    description:
      'ISA(개인종합자산관리계좌)는 일반형 200만·서민형 400만원까지 비과세, 초과분은 9.9% 분리과세됩니다(조특법 §91의18). 3년 의무가입·손익통산·연금전환 혜택을 정리합니다.',
    category: '금융',
    publishedAt: '2026-07-07',
    readingMinutes: 8,
  },
  {
    slug: 'dual-income-couple-year-end-tax-2026',
    title: '맞벌이 부부 연말정산 배분 전략 2026 — 누가 받으면 절세할까',
    description:
      '맞벌이 부부는 부양가족·의료비·신용카드 공제를 누구에게 배분하느냐로 세금이 달라집니다(소득세법 §50·§59의2). 공제 항목별 유불리 기준과 시뮬 방법을 정리합니다.',
    category: '세금',
    publishedAt: '2026-07-07',
    readingMinutes: 9,
  },
  // ─── 2026-07-03 신규 5편 (고CPC 미커버 갭 + 연말정산 공제 클러스터 — 취득세감면·신용카드·자녀·기부금·청약저축) ───
  {
    slug: 'first-home-acquisition-tax-reduction-2026',
    title: '생애최초 취득세 감면 2026 — 200만원 한도·요건·신청',
    description:
      '생애최초로 주택을 사면 취득세를 최대 200만원까지 감면받습니다(지방세특례제한법 §36의3). 취득가액 12억 이하·소득요건 폐지·거주요건과 2026년 일몰 기한을 사례로 정리합니다.',
    category: '세금·부동산',
    publishedAt: '2026-07-03',
    readingMinutes: 8,
  },
  {
    slug: 'credit-card-income-deduction-2026',
    title: '신용카드 소득공제 2026 — 총급여 25% 초과·공제율·한도',
    description:
      '신용카드 등 사용액이 총급여의 25%를 넘으면 소득공제됩니다(조특법 §126의2). 카드 15%·체크/현금영수증 30%·전통시장/대중교통 40% 공제율과 300만/250만원 한도를 정리합니다.',
    category: '세금',
    publishedAt: '2026-07-03',
    readingMinutes: 8,
  },
  {
    slug: 'child-tax-credit-2026',
    title: '자녀세액공제 2026 — 8세 이상 1명 25만·다자녀·출산공제',
    description:
      '8세 이상 자녀·손자녀는 자녀세액공제 대상입니다(소득세법 §59의2). 1명 25만·2명 55만·3명 95만원과 출산·입양 공제(첫째 30만~셋째 70만)를 2024 개정 현행값으로 정리합니다.',
    category: '세금',
    publishedAt: '2026-07-03',
    readingMinutes: 8,
  },
  {
    slug: 'donation-tax-credit-2026',
    title: '기부금 세액공제 2026 — 15%·30% 공제율·고향사랑기부금',
    description:
      '기부금은 1천만원 이하 15%, 초과분 30%를 세액공제합니다(소득세법 §59의4). 정치자금·고향사랑 기부금 특례와 소득금액별 공제한도, 개인사업자 필요경비 방식을 정리합니다.',
    category: '세금',
    publishedAt: '2026-07-03',
    readingMinutes: 8,
  },
  {
    slug: 'housing-subscription-savings-deduction-2026',
    title: '주택청약저축 소득공제 2026 — 무주택 연 300만 40% 공제',
    description:
      '무주택 세대주(총급여 7천만 이하)는 주택청약종합저축 납입액을 연 300만원 한도 40% 소득공제받습니다(조특법 §87). 최대 120만원 소득공제·거주요건·2028년 일몰을 정리합니다.',
    category: '세금·부동산',
    publishedAt: '2026-07-03',
    readingMinutes: 7,
  },
  // ─── 2026-07-01 신규 5편 (7월 재산세 1기·부가세 1기 신고 시즌 + 종부세·연금·양도세 절차 수요) ───
  {
    slug: 'property-tax-installment-payment-2026',
    title: '재산세 분납(분할납부) 2026 — 250만원 초과 신청·기한·한도',
    description:
      '재산세 본세가 250만원을 초과하면 분할납부할 수 있습니다(지방세법 §118). 분납 한도(최대 50%), 위택스·세무서 신청 방법, 납부기한 지난 날부터 2개월 기한을 사례로 정리합니다.',
    category: '세금·부동산',
    publishedAt: '2026-07-01',
    readingMinutes: 8,
    seasonal: '7월 재산세 1기 납부',
  },
  {
    slug: 'comprehensive-real-estate-tax-single-house-credit-2026',
    title: '종부세 1세대1주택 세액공제 2026 — 고령자·장기보유 최대 80%',
    description:
      '1세대1주택자는 종합부동산세에서 고령자 공제(20~40%)와 장기보유 공제(20~50%)를 중복 적용받아 최대 80%까지 감면됩니다(종부세법 §9). 공제율 적용 순서와 부부공동명의 특례를 정리합니다.',
    category: '세금·부동산',
    publishedAt: '2026-07-01',
    readingMinutes: 9,
  },
  {
    slug: 'pension-savings-irp-tax-credit-2026',
    title: '연금저축·IRP 세액공제 2026 — 900만원 한도·최대 148만원 환급',
    description:
      '연금저축과 퇴직연금(IRP)을 합산 900만원까지 세액공제받습니다(소득세법 §59의3). 소득별 공제율(15%·12%)과 최대 환급액 148.5만원, 연금외수령 시 추징까지 사례로 정리합니다.',
    category: '세금',
    publishedAt: '2026-07-01',
    readingMinutes: 8,
  },
  {
    slug: 'capital-gains-tax-preliminary-return-2026',
    title: '양도소득세 예정신고 2026 — 2개월 기한·무신고 가산세',
    description:
      '부동산을 양도하면 양도일이 속하는 달의 말일부터 2개월 이내에 예정신고·납부해야 합니다(소득세법 §105). 무신고 가산세 20%, 연 2회 양도 시 5월 확정신고 합산을 정리합니다.',
    category: '세금',
    publishedAt: '2026-07-01',
    readingMinutes: 9,
  },
  {
    slug: 'vat-early-refund-2026',
    title: '부가가치세 조기환급 2026 — 수출·시설투자 15일 내 환급',
    description:
      '영세율 수출·사업설비 투자·재무구조개선 시 일반환급(30일)보다 빠른 15일 내 부가세를 돌려받습니다(부가세법 §59, 시행령 §107). 조기환급 대상·신고 단위·주의점을 정리합니다.',
    category: '세금',
    publishedAt: '2026-07-01',
    readingMinutes: 7,
    seasonal: '7월 부가세 1기 확정신고',
  },
  // ─── 2026-06-30 신규 5편 (세금 면제·공제 한도 검색수요 + 7월 재산세 시즌 재산세 특례·세부담상한) ───
  {
    slug: 'freelancer-take-home-3-3-percent-2026',
    title: '프리랜서 3.3% 원천징수와 실수령액 2026 — 5월 정산·환급',
    description:
      '프리랜서 3.3% 원천징수(소득세 3% + 지방세 0.3%, 소득세법 §127)의 정체와 실수령액 계산법을 정리합니다. 다음해 5월 종합소득세 신고로 환급 또는 추가납부가 결정되는 구조를 사례로 설명합니다.',
    category: '근로',
    publishedAt: '2026-06-30',
    readingMinutes: 9,
  },
  {
    slug: 'gift-tax-exemption-limit-2026',
    title: '증여세 면제한도 2026 — 증여재산공제·10년 합산·혼인공제',
    description:
      '증여세 면제한도(증여재산공제, 상증세법 §53)를 정리합니다. 배우자 6억·성년 자녀 5천만·혼인공제 1억까지 10년 합산 기준으로 얼마까지 증여세 없이 가능한지 사례로 설명합니다.',
    category: '세금',
    publishedAt: '2026-06-30',
    readingMinutes: 8,
  },
  {
    slug: 'inheritance-tax-deduction-limit-2026',
    title: '상속세 공제 한도 2026 — 일괄공제·배우자공제 얼마까지 면제?',
    description:
      '상속세를 안 내는 한도를 정리합니다. 일괄공제 5억(상증세법 §21)·배우자공제 최소 5억(§19)·자녀공제를 종합하면 배우자가 있을 때 통상 10억까지 면제 가능한 구조를 설명합니다.',
    category: '세금',
    publishedAt: '2026-06-30',
    readingMinutes: 8,
  },
  {
    slug: 'property-tax-burden-cap-2026',
    title: '재산세 세부담상한제 2026 — 공시가 폭등 시 인상폭 제한',
    description:
      '공시가격 급등 시 재산세 인상폭을 제한하는 세부담상한제(지방세법 §122)를 정리합니다. 주택별 상한율(105~130%)과 전년 대비 실제 부과액 계산법을 사례로 설명합니다.',
    category: '세금·부동산',
    publishedAt: '2026-06-30',
    readingMinutes: 7,
    seasonal: '7월 재산세 1기 납부',
  },
  {
    slug: 'property-tax-single-house-special-rate-2026',
    title: '1세대1주택 재산세 특례세율 2026 — 0.05%p 인하 구조',
    description:
      '공시가격 9억 이하 1세대1주택 재산세 특례세율(지방세법 §111의2)을 정리합니다. 일반세율 대비 0.05%p 인하와 누진공제 구조, 세액 절감 사례를 단계별로 설명합니다.',
    category: '세금·부동산',
    publishedAt: '2026-06-30',
    readingMinutes: 7,
    seasonal: '7월 재산세 1기 납부',
  },
  // ─── 2026-06-29 신규 5편 (GSC 전월세전환·DTI 수요 + 7/1 국민연금 인상 + Naver 재산세·전세대출, 저환각 토픽) ───
  {
    slug: 'rent-conversion-calculation-2026',
    title: '전월세 전환율 계산법 2026 — 보증금↔월세 환산 공식',
    description:
      '전세 보증금을 월세로(또는 반대로) 바꾸는 전환율 계산법을 정리합니다. 법정 한도(기준금리+2%, 주택임대차보호법 §7의2)와 실제 환산 사례를 단계별로 설명합니다.',
    category: '세금·부동산',
    publishedAt: '2026-06-29',
    readingMinutes: 8,
  },
  {
    slug: 'dti-calculation-2026',
    title: 'DTI 계산법 2026 — 총부채상환비율·연소득 기준 한도',
    description:
      'DTI(총부채상환비율) 계산 공식과 연소득 산정, 기타 대출 이자 반영, DSR·LTV와의 차이를 사례로 정리합니다. 주택담보대출 한도가 어떻게 결정되는지 설명합니다.',
    category: '금융',
    publishedAt: '2026-06-29',
    readingMinutes: 8,
  },
  {
    slug: 'salary-take-home-2026-july-insurance-increase',
    title: '2026년 7월 국민연금 인상 후 월급 실수령액 변화',
    description:
      '7월 1일 국민연금 요율 9.0→9.5% 인상(국민연금법 §88)으로 월급 실수령액이 얼마나 줄어드는지 계산합니다. 기준소득월액 상한(637만→659만) 인상까지 반영한 시뮬레이션.',
    category: '근로',
    publishedAt: '2026-06-29',
    readingMinutes: 8,
    seasonal: '7월 국민연금 인상 시행',
  },
  {
    slug: 'jeonse-loan-limit-interest-2026',
    title: '전세자금대출 한도·금리 구조 2026 — 보증기관별 비교',
    description:
      '전세자금대출 한도가 보증비율·보증한도·DSR로 어떻게 결정되는지, 3대 보증기관(HF·HUG·SGI)과 버팀목 정책상품·시중상품의 차이를 정리합니다.',
    category: '금융',
    publishedAt: '2026-06-29',
    readingMinutes: 8,
  },
  {
    slug: 'comprehensive-real-estate-tax-joint-ownership-2026',
    title: '부부 공동명의 종부세 특례 vs 단독명의 유불리 2026',
    description:
      '부부 공동명의 종합부동산세는 각자 9억(합 18억) 공제, 단독명의는 12억 공제입니다. 종부세법 §10의2 특례(12억+세액공제) 신청 유불리와 9월 신청 기한을 정리합니다.',
    category: '세금·부동산',
    publishedAt: '2026-06-29',
    readingMinutes: 9,
  },
  // ─── 2026-06-28 신규 5편 (Naver 자동차세 급상승 인접 + 임대차·중개·순수 금융/투자 갭, 저환각 토픽) ───
  {
    slug: 'rent-increase-5-percent-cap-2026',
    title: '전월세 인상 5% 상한 2026 — 계약갱신청구권 한도 완전정리',
    description:
      '주택임대차보호법 §7 차임증감청구권은 갱신 시 5% 이내로 인상을 제한합니다. 계약갱신요구권(§6의3)과 5% 상한 적용 조건·계산 사례를 정리합니다.',
    category: '세금·부동산',
    publishedAt: '2026-06-28',
    readingMinutes: 7,
  },
  {
    slug: 'broker-fee-negotiation-savings-2026',
    title: '중개수수료 협의로 아끼는 법 2026 — 상한요율 절약 완전정리',
    description:
      '중개수수료 상한요율(공인중개사법 §32)은 법적 한도일 뿐 협의로 깎을 수 있습니다. 거래금액별 요율과 부가세 확인, 계약 전 확정 협상 팁을 정리합니다.',
    category: '세금·부동산',
    publishedAt: '2026-06-28',
    readingMinutes: 8,
  },
  {
    slug: 'vehicle-tax-card-payment-2026',
    title: '자동차세 카드납부·연납 할인 2026 — 수수료 0원 절약법',
    description:
      '자동차세는 지방세라 신용카드 납부 수수료가 무료이고, 1월 연납 시 추가 공제(시행령 §125)까지 받습니다. 카드납부·연납 할인 활용법을 정리합니다.',
    category: '세금',
    publishedAt: '2026-06-28',
    readingMinutes: 7,
  },
  {
    slug: 'real-interest-rate-inflation-2026',
    title: '실질금리 계산 2026 — 물가 반영한 진짜 예금 수익률',
    description:
      '명목금리에서 물가상승률을 빼면 실질금리입니다. 피셔방정식과 이자소득세 15.4%(소득세법 §129)를 함께 반영해 예금의 진짜 수익률을 계산하는 법을 정리합니다.',
    category: '금융',
    publishedAt: '2026-06-28',
    readingMinutes: 8,
  },
  {
    slug: 'split-sell-profit-taking-strategy-2026',
    title: '분할매도 익절 전략 2026 — 평균 매도단가로 수익 지키기',
    description:
      '한 번에 팔지 않고 나눠 파는 분할매도는 고점 욕심과 급락 공포를 동시에 줄입니다. 평균 매도단가 계산과 목표가 분할 전략을 사례로 정리합니다.',
    category: '투자',
    publishedAt: '2026-06-28',
    readingMinutes: 7,
  },
  // ─── 2026-06-27 신규 5편 (Naver 자동차세 +320%·재산세 +38% 인접 + 순수 금융 갭, 저환각 토픽) ───
  {
    slug: 'used-car-vehicle-tax-daily-proration-2026',
    title: '중고차 자동차세 일할계산 2026 — 매매 시 누가 얼마 내나',
    description:
      '중고차 거래 시 자동차세는 소유 일수만큼 일할계산해 매도인·매수인이 나눠 냅니다. 지방세법 §128 기준 일할 계산법과 사례를 정리합니다.',
    category: '세금',
    publishedAt: '2026-06-27',
    readingMinutes: 8,
  },
  {
    slug: 'mortgage-fixed-vs-variable-rate-2026',
    title: '고정금리 vs 변동금리 2026 — 주택담보대출 어떤 게 유리할까',
    description:
      '주담대 고정금리와 변동금리(혼합형 포함)의 구조·장단점을 금리 환경별로 비교. 손익 시나리오와 선택 기준을 사례로 정리합니다.',
    category: '금융',
    publishedAt: '2026-06-27',
    readingMinutes: 9,
  },
  {
    slug: 'credit-score-loan-interest-rate-2026',
    title: '신용점수와 대출금리 2026 — 점수 구간별 금리·한도 차이',
    description:
      'NICE·KCB 신용점수 구간이 대출 승인·금리·한도에 미치는 영향. 점수를 올리는 실전 방법과 금융권별 적용 기준을 정리합니다.',
    category: '금융',
    publishedAt: '2026-06-27',
    readingMinutes: 8,
  },
  {
    slug: 'deposit-vs-savings-vs-parking-account-2026',
    title: '정기예금 vs 적금 vs 파킹통장 2026 — 목돈·여윳돈 어디에',
    description:
      '정기예금·정기적금·파킹통장의 이자 계산 방식과 실수령액을 비교. 이자소득세 15.4%(소득세법 §129)까지 반영한 선택 기준을 정리합니다.',
    category: '금융',
    publishedAt: '2026-06-27',
    readingMinutes: 9,
  },
  {
    slug: 'housing-subscription-score-84-points-2026',
    title: '청약가점 84점 만점 계산법 2026 — 무주택·부양가족·통장 점수표',
    description:
      '청약가점 84점은 무주택기간 32점·부양가족수 35점·청약통장 17점의 합입니다. 주택공급규칙 별표1 점수표와 사례별 계산을 정리합니다.',
    category: '세금·부동산',
    publishedAt: '2026-06-27',
    readingMinutes: 9,
  },
  // ─── 2026-06-26 신규 5편 (Naver 자동차세 +296%·재산세 +30% 인접 + 순수 금융/근로 갭, 저환각 토픽) ───
  {
    slug: 'overtime-night-holiday-allowance-2026',
    title: '연장·야간·휴일근로수당 계산 2026 — 1.5배·2배 가산 완전정리',
    description:
      '연장·야간·휴일근로 가산수당을 통상시급 기준으로 정확히 계산하는 법. 1.5배·2배·중복 가산, 근로기준법 §56·§57 보상휴가제까지 사례로 정리합니다.',
    category: '근로',
    publishedAt: '2026-06-26',
    readingMinutes: 8,
  },
  {
    slug: 'jeonse-vs-monthly-rent-comparison-2026',
    title: '전세 vs 월세 유불리 계산 2026 — 전월세 전환율로 손익 따지기',
    description:
      '보증금 기회비용과 전월세 전환율(주택임대차보호법 §7의2)로 전세·월세 선택지를 비교하는 법. 실제 손익 계산 예시로 더 유리한 쪽을 따집니다.',
    category: '세금·부동산',
    publishedAt: '2026-06-26',
    readingMinutes: 8,
  },
  {
    slug: 'property-tax-vs-comprehensive-real-estate-tax-2026',
    title: '재산세 vs 종부세 차이 2026 — 둘 다 내나? 과세기준·세율 비교',
    description:
      '지방세 재산세와 국세 종합부동산세의 차이점. 과세기준일·세율·부과기관·납부시기와 이중과세 조정(종부법 §9)까지 명확히 정리합니다.',
    category: '세금·부동산',
    publishedAt: '2026-06-26',
    readingMinutes: 8,
    seasonal: '6월 1일 과세 시즌',
  },
  {
    slug: 'car-installment-vs-lease-vs-rent-2026',
    title: '자동차 할부 vs 리스 vs 장기렌트 2026 — 어떤 게 유리할까',
    description:
      '할부·리스·장기렌트 세 방식을 소유권·총비용·세금·경비처리 기준으로 비교분석. 할부 월 납입액 계산 예시와 선택 기준을 정리합니다.',
    category: '금융',
    publishedAt: '2026-06-26',
    readingMinutes: 8,
  },
  {
    slug: 'mortgage-refinance-savings-2026',
    title: '대출 갈아타기 손익 계산 2026 — 중도상환수수료를 빼고도 이득일까',
    description:
      '대환대출이 이득인지 계산하려면 금리 인하분에서 중도상환수수료·부대비용을 빼야 합니다. 손익분기 회수기간 공식과 DSR·LTV 재심사 주의점을 정리합니다.',
    category: '금융',
    publishedAt: '2026-06-26',
    readingMinutes: 8,
  },
  // ─── 2026-06-25 신규 5편 (Naver 자동차세 +296%·재산세 +30% 급상승 + 대출/환전 순수공식 갭) ───
  {
    slug: 'hybrid-vehicle-tax-2026',
    title: '하이브리드 자동차세 2026 — 배기량 cc 과세·차령경감·전기차 정액 비교',
    description:
      '하이브리드 자동차세는 전기차처럼 정액 과세가 아니라 내연기관 배기량 기준 cc 과세입니다. 2026년 배기량별 세율, 차령경감, 전기차와의 차이를 명확히 정리합니다.',
    category: '세금',
    publishedAt: '2026-06-25',
    readingMinutes: 8,
    seasonal: '6월 1기분 시즌',
  },
  {
    slug: 'vehicle-acquisition-tax-2026',
    title: '자동차 취득세 계산 2026 — 승용 7%·경차 4%·과세표준 완전정리',
    description:
      '자동차를 구매할 때 내는 취득세를 정확히 계산하는 방법을 설명합니다. 비영업용 승용차 7%, 경차 4%, 신차·중고차 과세표준 차이, 친환경차 감면 요건까지 2026년 기준으로 완벽 정리합니다.',
    category: '세금',
    publishedAt: '2026-06-25',
    readingMinutes: 8,
  },
  {
    slug: 'property-tax-urban-area-regional-resource-tax-2026',
    title: '재산세 도시지역분·지역자원시설세 2026 — 고지서 항목 완전 정리',
    description:
      '7월 재산세 고지서를 받으면 본세 외에 도시지역분·지역자원시설세·지방교육세가 함께 붙어옵니다. 각 항목이 무엇이고 어떻게 계산되는지, 고지서를 읽는 방법을 명확히 정리합니다. 2026년 기준.',
    category: '세금·부동산',
    publishedAt: '2026-06-25',
    readingMinutes: 8,
    seasonal: '7월 고지서 직전',
  },
  {
    slug: 'dsr-dti-ltv-difference-2026',
    title: 'DSR·DTI·LTV 차이와 계산법 2026 — 헷갈리는 대출 3대 지표 정리',
    description:
      'DSR·DTI·LTV 세 대출 규제 지표의 정의와 차이를 명확히 정리합니다. 각 지표 계산 공식, 한도 기준, 실제 대출한도 결정 방식을 사례로 설명. 2026년 기준 최신 정보.',
    category: '금융',
    publishedAt: '2026-06-25',
    readingMinutes: 8,
  },
  {
    slug: 'currency-exchange-fee-preferential-rate-2026',
    title: '환전 수수료·환율 우대율 계산 2026 — 매매기준율·스프레드 완전정리',
    description:
      '환전할 때 "우대 90%"가 실제로 얼마를 절약하는지, 매매기준율·현찰 스프레드·우대율의 의미와 계산법을 공식으로 설명합니다. 해외 송금과 현찰의 차이도 정리.',
    category: '금융',
    publishedAt: '2026-06-25',
    readingMinutes: 8,
  },
  // ─── 2026-06-24 신규 5편 (Naver 자동차세 +251%·재산세 +13% 급상승 + 순수 금융공식 갭) ───
  {
    slug: 'property-tax-july-payment-schedule-2026',
    title: '재산세 7월 납부 일정·분납 2026 — 주택 7월·토지 9월·250만원 분할납부',
    description:
      '2026년 재산세 납부 일정 총정리. 과세기준일 6월 1일, 주택 1기분 7월 16~31일·2기분 9월, 토지 9월 납기, 250만원 초과 분할납부까지. 지방세법 §114·§115·§118 기준.',
    category: '세금·부동산',
    publishedAt: '2026-06-24',
    readingMinutes: 7,
    seasonal: '7월 납부 직전',
  },
  {
    slug: 'ltv-calculation-2026',
    title: 'LTV 계산법 2026 — 담보인정비율·대출가능액·DSR/DTI 차이',
    description:
      'LTV(담보인정비율) 계산법을 쉽게 정리합니다. 대출가능액 = 담보가치 × LTV 공식, 규제지역별 한도, DSR·DTI와의 차이, 주담대 한도 실전 계산까지. 2026년 기준.',
    category: '금융',
    publishedAt: '2026-06-24',
    readingMinutes: 7,
  },
  {
    slug: 'vehicle-tax-prepayment-refund-2026',
    title: '자동차세 연납 환급 2026 — 연중 매각·폐차 시 일할 환급받기',
    description:
      '1월에 연납한 자동차세, 연중 매각·폐차·이전 시 소유하지 않은 기간만큼 일할계산으로 환급받는 방법. 환급액 공식과 신청 절차, 자동차등록원부 확인까지. 지방세법 §127·§128 기준.',
    category: '세금',
    publishedAt: '2026-06-24',
    readingMinutes: 9,
  },
  {
    slug: 'rental-yield-calculation-2026',
    title: '임대수익률 계산 2026 — 표면수익률·순수익률·갭투자 실투자금',
    description:
      '부동산 임대수익률 계산법을 정리합니다. 표면수익률 vs 순수익률 차이, 제경비 포함 계산, 갭투자 실투자금 산정, 실제 투자 시나리오별 수익률 비교까지. 2026년 기준.',
    category: '투자',
    publishedAt: '2026-06-24',
    readingMinutes: 8,
  },
  {
    slug: 'compound-interest-72-rule-2026',
    title: '복리 계산법과 72의 법칙 2026 — 단리 vs 복리·원금 2배 기간',
    description:
      '복리의 원리와 72의 법칙을 쉽게 정리합니다. 단리 vs 복리 차이, 복리 빈도(연·분기·월)별 차이, 72÷수익률로 원금 2배 기간 계산, 세후 이자(15.4%)까지. 2026년 기준.',
    category: '금융',
    publishedAt: '2026-06-24',
    readingMinutes: 8,
  },
  // ─── 2026-06-22 신규 5편 (세법 계산 허브 4 + 대출 상환방식 1 — 색인 +5, 고CPC) ───
  {
    slug: 'vehicle-tax-calculation-2026',
    title: '자동차세 계산법 2026 — 배기량·차령경감·전기차 정액·지방교육세',
    description:
      '2026년 자동차세 정확한 계산법. 배기량별 세율(80·140·200원/cc)·차령경감(3년차부터 5%)·전기차 정액 13만원·지방교육세 30%·연납 5% 할인까지. 지방세법 §127·§128·§151 기준.',
    category: '세금',
    publishedAt: '2026-06-22',
    readingMinutes: 11,
  },
  {
    slug: 'comprehensive-real-estate-tax-calculation-2026',
    title: '종합부동산세 계산법 2026 — 공시가격·공제·세율·세액공제',
    description:
      '2026년 종부세 정확한 계산법. 공제금액(1주택 12억·다주택 9억)·공정시장가액비율 60%·세율 구간·누진공제·고령자 장기보유 세액공제 80%·농특세 20%까지. 종부세법 §8·§9 기준.',
    category: '세금·부동산',
    publishedAt: '2026-06-22',
    readingMinutes: 11,
  },
  {
    slug: 'gift-tax-calculation-2026',
    title: '증여세 계산법 2026 — 5단계 세율·증여재산공제·신고세액공제',
    description:
      '증여세를 정확히 계산하는 법. 5단계 누진세율·배우자 6억·성년 자녀 5천만 공제·10년 합산·신고세액공제 3%까지 완벽 정리. 상증세법 §26·§68 기준.',
    category: '세금',
    publishedAt: '2026-06-22',
    readingMinutes: 11,
  },
  {
    slug: 'inheritance-vs-gift-tax-comparison-2026',
    title: '상속세 vs 증여세 2026 — 어느 쪽이 유리한가? 비교 가이드',
    description:
      '상속세와 증여세 중 무엇이 유리한지 자산 규모·가족 구성별로 비교. 일괄공제 5억·배우자공제·증여재산공제·10년 합산까지 사례로 정리. 상증세법 §18~§26·§68 기준.',
    category: '세금',
    publishedAt: '2026-06-22',
    readingMinutes: 13,
  },
  {
    slug: 'equal-payment-vs-equal-principal-2026',
    title: '원리금균등 vs 원금균등 2026 — 대출 상환방식 비교',
    description:
      '원리금균등과 원금균등 상환방식의 차이를 1억·5%·30년 사례로 비교. 월 상환액·총이자·초기 부담까지 시뮬레이션. 어느 방식이 유리한지 상황별 선택 가이드.',
    category: '금융',
    publishedAt: '2026-06-22',
    readingMinutes: 7,
  },
  // ─── 2026-06-21 신규 5편 (세법 SSoT §N 검증 핵심 토픽 — 색인 +5, 고CPC) ───
  {
    slug: 'comprehensive-income-tax-rate-brackets-2026',
    title: '종합소득세율 2026 — 누진세 8단계·과세표준·산출세액 계산',
    description:
      '2026년 종합소득세 8단계 누진세율표와 정확한 계산법. 1,400만원부터 10억 초과까지 세율·누진공제·지방소득세. 직장인·프리랜서 필수. 소득세법 §55 기준.',
    category: '세금',
    publishedAt: '2026-06-21',
    readingMinutes: 8,
  },
  {
    slug: 'acquisition-tax-calculation-2026',
    title: '취득세 계산법 2026 — 주택 구입 세율·중과·농특세',
    description:
      '주택 구입 시 취득세를 정확히 계산하는 법. 구입가별 세율(1.0~3.0%), 2·3주택 중과세(8~12%), 85㎡ 초과 농특세, 지방교육세까지. 지방세법 §13·§13의2 기준.',
    category: '세금·부동산',
    publishedAt: '2026-06-21',
    readingMinutes: 8,
  },
  {
    slug: 'property-tax-calculation-2026',
    title: '재산세 계산법 2026 — 주택 재산세율·과세표준·1세대1주택 특례',
    description:
      '2026년 주택 재산세 계산법. 과세표준·세율 4구간·누진공제·1세대1주택 특례·지방교육세까지 완전 정리. 6월 1일 과세기준일 기준. 지방세법 §111.',
    category: '세금·부동산',
    publishedAt: '2026-06-21',
    readingMinutes: 8,
  },
  {
    slug: 'inheritance-tax-calculation-2026',
    title: '상속세 계산법 2026 — 5단계 누진세율·일괄공제·배우자공제',
    description:
      '상속세를 정확히 계산하는 법. 5단계 누진세율·일괄공제 5억·배우자공제·신고세액공제까지 완벽 정리. 은퇴·자산가 필수. 상증세법 §26 기준.',
    category: '세금',
    publishedAt: '2026-06-21',
    readingMinutes: 8,
  },
  // ─── 2026-06-21 신규 1편 (금융 — 대출 빠른 상환 고CPC, loan 클러스터 확장) ───
  {
    slug: 'prepayment-penalty-fee-2026',
    title: '중도상환수수료 계산·면제 조건 (2026) — 대출 빨리 갚을 때',
    description:
      '중도상환수수료 = 중도상환원금 × 수수료율 × (잔존기간 ÷ 면제기간) 공식과 3년 경과 면제·부분상환·대환 시 차이. 1억·5천만·2억 대출 상환 시 수수료 시뮬레이션과 절약 전략.',
    category: '금융',
    publishedAt: '2026-06-21',
    readingMinutes: 8,
  },
  // ─── 2026-07-09 신규 5편 (근로·노동+임대차+투자 — 최저임금·통상임금·육아휴직·확정일자·해외주식) ───
  {
    slug: 'minimum-wage-2026',
    title: '2026년 최저임금 시급 10,320원 — 월급 환산·수습감액·계산법',
    description:
      '2026년 최저임금 시급 10,320원(2025년 대비 290원 인상). 월 기준 약 216만원 환산, 주휴 209시간 포함(최저임금법 §5), 수습 3개월 90% 감액, 산입범위(주휴·상여금·복리후생), 위반 벌칙(3년/2천만원).',
    category: '근로',
    publishedAt: '2026-07-09',
    readingMinutes: 6,
  },
  {
    slug: 'ordinary-wage-2026',
    title: '통상임금 2026 — 정기상여 포함·연장수당 기초·판례 변경',
    description:
      '통상임금은 연장·야간·휴일수당의 산정 기준입니다(근로기준법 §2). 2024.12 대법원 전원합의체가 재직조건부 정기상여금도 통상임금에 포함하도록 변경한 내용과 시간급 계산법을 정리합니다.',
    category: '근로',
    publishedAt: '2026-07-09',
    readingMinutes: 9,
  },
  {
    slug: 'parental-leave-benefit-2026',
    title: '육아휴직급여 2026 — 지급률 단계·월 상한·6+6 부모제',
    description:
      '육아휴직급여는 고용보험에서 지급합니다(고용보험법 §70). 통상임금 100%/80% 단계 지급률, 월 상한, 6+6 부모육아휴직제, 신청 자격·기간을 정리합니다. 정확한 현행 상한은 고용노동부 고시 기준.',
    category: '근로',
    publishedAt: '2026-07-09',
    readingMinutes: 8,
  },
  {
    slug: 'lease-priority-right-fixed-date-2026',
    title: '확정일자·전입신고 우선변제권 2026 — 전세보증금 지키는 법',
    description:
      '전입신고+점유로 대항력, 확정일자까지 갖추면 우선변제권이 생깁니다(주택임대차보호법 §3·§3의2). 소액임차인 최우선변제(§8)와 배당순위, 전세사기 예방 실무를 정리합니다.',
    category: '세금·부동산',
    publishedAt: '2026-07-09',
    readingMinutes: 9,
  },
  {
    slug: 'overseas-stock-capital-gains-tax-2026',
    title: '해외주식 양도소득세 2026 — 250만원 공제·22%·5월 신고',
    description:
      '해외주식 양도차익은 연 250만원 공제 후 22%로 과세되고 다음해 5월 확정신고합니다(소득세법 §118의2). 환율 적용·손익통산·증권사 대행신고까지 사례로 정리합니다.',
    category: '투자',
    publishedAt: '2026-07-09',
    readingMinutes: 8,
  },
  // ─── 2026-06-19 신규 5편 (근로·은퇴·퇴직 인접 토픽, 색인 표면 확장) ───
  {
    slug: 'annual-leave-allowance-2026',
    title: '연차수당 계산법 (2026) — 미사용 연차 얼마 받나',
    description:
      '연차유급휴가 일수 산정(근로기준법 §60)부터 미사용 연차수당 = 1일 통상임금 × 미사용일수 공식까지. 입사 1년 미만·1년 이상·회계연도 기준 차이 + 통상임금 계산 예시.',
    category: '근로',
    publishedAt: '2026-06-19',
    readingMinutes: 8,
  },
  {
    slug: 'weekly-holiday-allowance-2026',
    title: '주휴수당 계산법 (2026) — 주 15시간 알바도 받나',
    description:
      '주휴수당 = (주 소정근로시간 ÷ 40) × 8 × 시급 공식과 주 15시간 미만 초단시간 제외 기준(근로기준법 §18③). 주 20·30·40시간 알바·단시간 근로자 실수령 예시.',
    category: '근로',
    publishedAt: '2026-06-19',
    readingMinutes: 6,
  },
  {
    slug: 'four-major-insurance-rates-2026',
    title: '4대보험 요율 총정리 (2026) — 7월 국민연금 인상 반영',
    description:
      '국민연금 7월 9.5% 인상(근로자 4.75%)·건강보험 7.09%·장기요양 12.95%·고용보험 등 2026년 4대보험 요율과 근로자 부담분 계산. 월급 300만 원 공제액 시뮬레이션.',
    category: '근로',
    publishedAt: '2026-06-19',
    readingMinutes: 8,
  },
  {
    slug: 'housing-pension-reverse-mortgage-2026',
    title: '주택연금(역모기지) 완벽 가이드 (2026) — 가입 조건·월 수령액',
    description:
      '만 55세 이상·공시가격 12억 이하 주택연금 가입 조건, 종신·확정기간·대출상환·우대 4가지 지급방식, 신탁 vs 저당권 차이, 재산세 25% 감면·소득세 비과세 혜택까지.',
    category: '금융',
    publishedAt: '2026-06-19',
    readingMinutes: 9,
  },
  {
    slug: 'retirement-income-tax-deferral-irp-2026',
    title: '퇴직소득세 이연·IRP 절세 가이드 (2026) — 30~40% 감면',
    description:
      'IRP 이전 시 퇴직소득세 과세이연(소득세법 §146의2)과 연금 수령 시 10년 이하 30%·초과 40% 감면(§129①5의2호). 세액공제 연 900만 원 한도 절세 시뮬레이션 포함.',
    category: '세금',
    publishedAt: '2026-06-19',
    readingMinutes: 9,
  },
  // ─── 허브 ───
  {
    slug: 'tax-calendar-2026',
    title: '2026 세금 캘린더 — 1월부터 12월까지 한눈에',
    description:
      '2026년 한 해 동안 내야 할 모든 세금·신고 일정을 월별로 정리. 각 일정에서 관련 가이드와 계산기로 1-click 이동. 직장인·사업자·자동차주·다주택자 페르소나별 핵심 일정.',
    category: '세금',
    publishedAt: '2026-05-03',
    readingMinutes: 6,
  },
  // ─── 1월 ───
  {
    slug: 'year-end-tax-settlement',
    title: '연말정산 완벽 가이드 (2026) — "13월의 월급" 받는 법',
    description:
      '신용카드·의료비·교육비·기부금·연금저축 공제 + 인적공제 + 환급 추적 + 추가 납부 회피 전략. 1월~2월 시즌 필독.',
    category: '세금',
    publishedAt: '2026-05-03',
    readingMinutes: 12,
    seasonal: '1~2월 정산 시즌',
    tags: ['시즈널'],
  },
  {
    slug: 'january-vehicle-tax-prepayment',
    title: '자동차세 연납 5% 할인 가이드 (2026) — 1월 16~31일 신청',
    description:
      '1월 신청 시 5% 한도 내 공제. 선납 일수에 비례. 위택스 신청법 + 계산기로 정확한 공제액 확인.',
    category: '세금·부동산',
    publishedAt: '2026-05-03',
    readingMinutes: 6,
    seasonal: '1월 16~31일',
    tags: ['시즈널'],
  },
  // ─── 2월 ───
  {
    slug: 'february-tax-refund-tracking',
    title: '2월 연말정산 환급 추적 + 5월 종소세 사전 준비',
    description:
      '환급 결과 확인 + 누락 공제 정정 + 경정청구 + 5월 종소세 신고 준비 체크리스트.',
    category: '근로',
    publishedAt: '2026-05-03',
    readingMinutes: 7,
    seasonal: '2~4월 환급/준비',
    tags: ['시즈널'],
  },
  // ─── 3월 ───
  {
    slug: 'march-corporate-tax',
    title: '법인세 신고 가이드 (2026) — 3월 31일 마감',
    description:
      '12월 결산 법인 법인세 세율 (9·19·21·24%) + R&D·고용증대 등 세액공제 + 분납 + 홈택스 전자신고.',
    category: '세금',
    publishedAt: '2026-05-03',
    readingMinutes: 8,
    seasonal: '3월 31일 마감',
    tags: ['시즈널'],
  },
  // ─── 4월 ───
  {
    slug: 'april-vat-preliminary-q1',
    title: '4월 부가세 1기 예정신고 가이드 (2026) — 1~3월 매출·매입',
    description:
      '4월 1~25일 일반과세자 부가세 신고. 매출세액·매입세액공제·홈택스 단계별 신고법 + 환급 받는 케이스.',
    category: '세금',
    publishedAt: '2026-05-03',
    readingMinutes: 8,
    seasonal: '4월 1~25일',
    tags: ['시즈널'],
  },
  {
    slug: 'april-comprehensive-property-tax-exclusion',
    title: '4월 종부세 합산배제·과세특례 신청 가이드 (2026)',
    description:
      '임대주택·일시적 2주택·고령자·장기보유 등 우대 신청. 4월 1~30일 마감 → 12월 종부세 절세 핵심.',
    category: '세금·부동산',
    publishedAt: '2026-05-03',
    readingMinutes: 9,
    seasonal: '4월 1~30일',
    tags: ['시즈널'],
  },
  // ─── 5월 (기존) ───
  {
    slug: 'may-comprehensive-income-tax',
    title: '5월 종합소득세 신고 완벽 가이드 (2026) — 프리랜서·사업자·N잡러 필독',
    description:
      '신고 대상·기한·홈택스 단계별 신고법·단순경비율 vs 기준경비율·절세 5가지·환급 받는 법까지 한 페이지에 정리. 5월 신고 시즌 직전 필독.',
    category: '세금',
    publishedAt: '2026-05-03',
    readingMinutes: 12,
    seasonal: '5월 신고 시즌',
    tags: ['시즈널'],
  },
  {
    slug: 'income-tax-late-filing-penalty-2026',
    title: '종합소득세 무신고·지연 가산세 2026 정확 계산',
    description:
      '5월 31일 마감 임박! 무신고가산세 20% + 납부지연가산세 일 0.022% 정확 계산 + 자진신고 감면 50~10% 타이밍 + 환급 상실 위험까지 완벽 정리.',
    category: '세금',
    publishedAt: '2026-05-20',
    readingMinutes: 9,
    seasonal: '5월 마감 직전 최후의 선택',
    tags: ['4티어', '시즈널', '핫키워드'],
  },
  {
    slug: 'n-jobber-comprehensive-income-tax-2026',
    title: 'N잡러 직장+부업 종합소득세 합산 신고 2026 | 5월 31일 선택 기준',
    description:
      '연봉 5천만+부업 2천만, 누진세율 24% 상향? 근로소득 연말정산 후 5월 종소세 신고는 왜 필수? 소득 종류별 합산·분리 기준·기타소득 300만 분리과세·금융소득 2천만 합산 기준·누진세율 효과·세액 시뮬 3가지.',
    category: '근로',
    publishedAt: '2026-05-21',
    readingMinutes: 11,
    seasonal: '5월 31일까지 합산 신고',
    tags: ['4티어', '시즈널', '핫키워드', '블루오션'],
  },
  {
    slug: 'business-income-vs-other-income-classification-2026',
    title: '사업소득 vs 기타소득 분류 기준 2026 | 강사·프리랜서 5월 신고 필독',
    description:
      '강사료·원고료가 사업소득일까 기타소득일까? 정기성·반복성 판정 기준·필요경비율 60% vs 80% 세금 2배 차이·누진세 vs 분리과세 22%·4대보험 의무·잘못 분류 시 40% 가산세 위험·300만 분리과세 선택권·법조항 정확화.',
    category: '세금',
    publishedAt: '2026-05-28',
    readingMinutes: 13,
    seasonal: '5월 31일 신고 직전',
    tags: ['4티어', '시즈널', '핫키워드', '블루오션'],
  },
  {
    slug: 'freelancer-simplified-vs-standard-expense-rate-2026',
    title: '프리랜서 단순경비율 vs 기준경비율 2026 | 5월 31일 신고 선택 기준',
    description:
      '5월 31일까지 10일! 프리랜서·1인사업자 경비율 선택으로 50만~200만 원 차이. 단순(6~80%) vs 기준경비율 비교·업종별 매출 기준·실경비 시뮬 3가지·함정 5가지·신고 체크리스트.',
    category: '세금',
    publishedAt: '2026-05-21',
    readingMinutes: 11,
    seasonal: '5월 31일까지 경비율 선택',
    tags: ['4티어', '시즈널', '핫키워드', '블루오션'],
  },
  {
    slug: 'income-deduction-vs-tax-credit-2026',
    title: '소득공제 vs 세액공제 2026 | 어느 쪽이 더 절세? 순서·차이·계산',
    description:
      '5월 31일 종소세 신고! 소득공제(과세표준 먼저 차감) vs 세액공제(세액에서 차감) 어느 쪽이 유리한가? 누진세율 적용 순서·기본공제 250만·표준세액공제 13만 선택권·중복 불가 항목·4티어 절세 가이드.',
    category: '세금',
    publishedAt: '2026-05-23',
    readingMinutes: 10,
    seasonal: '5월 31일까지 신고 준비',
    tags: ['4티어', '시즈널', '핫키워드', '블루오션'],
  },
  {
    slug: 'comprehensive-income-tax-refund-timing-2026',
    title: '종합소득세 환급금 입금 시기 2026 | 신고 후 언제 받을까?',
    description:
      '5월 신고 후 환급금은 언제 입금될까? 신고 시점별 환급 일정(6월 중순~7월 말) · 계좌 미등록 시 우편 통지 지연 · 가산세 발생 시 자동 차감 · 홈택스 추적 방법 · 환급 우선순위 · 국세기본법 §51-§52 완벽 정리.',
    category: '세금',
    publishedAt: '2026-05-24',
    readingMinutes: 7,
    seasonal: '5월 신고 후 환급 추적',
    tags: ['4티어', '시즈널', '핫키워드'],
  },
  {
    slug: 'income-tax-installment-payment-2026',
    title: '종합소득세 분납 신청 2026 | 1천만 초과 2개월 분할 납부',
    description:
      '5월 31일 마감 5일 전! 종합소득세 분납(분할 납부) 신청 완벽 가이드. 분납 가능 조건(1,000만 초과) · 분납 비율(1~2천만 vs 2천만↑ 다름) · 신청 방법 · 분납 기한(2개월) · 이자·가산세 0원 · 분납 vs 지연 납부 차이 · 사례별 시뮬레이션.',
    category: '세금',
    publishedAt: '2026-05-26',
    readingMinutes: 8,
    seasonal: '5월 31일까지 5일, 분납 신청',
    tags: ['4티어', '시즈널', '핫키워드'],
  },
  {
    slug: 'may-31-deadline-day-income-tax-filing-2026',
    title: '5월 31일 마감 당일 종합소득세 신고 2026 | 24시간 라이브 가이드',
    description:
      '마감 당일! 지금부터 20분 안에 신고 완료하는 5단계 · 자정 정확히 1분 전까지 정상 신고 · 자정 후 무신고가산세 20% · 홈택스 폭주 회피법(오후 1~6시 권장) · 당일 분납 신청 · 자진신고 감면 50%(6월 신고 시) · 일요일 마감 월요일 연장.',
    category: '세금',
    publishedAt: '2026-05-31',
    readingMinutes: 9,
    seasonal: '5월 31일 당일 긴급 신고',
    tags: ['4티어', '시즈널', '핫키워드'],
  },
  {
    slug: 'separate-vs-comprehensive-taxation-master-2026',
    title: '분리과세 vs 종합과세 2026 마스터 가이드 — 금융소득·사적연금·기타소득 선택 기준',
    description:
      '5월 31일 마감 당일! 금융소득(이자배당) 2,000만·사적연금 1,500만·기타소득 300만 한도 내 분리과세 vs 누진세 종합과세 선택 기준. 실제 시뮬 3개로 최대 절세액 계산. 소득세법 §14.',
    category: '세금',
    publishedAt: '2026-05-31',
    readingMinutes: 15,
    seasonal: '5월 31일 마감 당일 최종 결정',
    tags: ['4티어', '시즈널', '핫키워드', '블루오션'],
  },
  {
    slug: 'voluntary-filing-june-50-percent-reduction-2026',
    title: '자진신고 6월 50% 감면 가이드 2026 | 종소세 마감 후 가산세 절반',
    description:
      '5월 31일 마감 지난 종합소득세, 6월 1일~30일 자진신고로 가산세 50% 감면(1개월 내). 산출세액 500만→가산세 50만(정상 100만). 무신고가산세 20% vs 자진신고 감면. 국세기본법 §48. 6월 신고 완벽 가이드.',
    category: '세금',
    publishedAt: '2026-05-31',
    readingMinutes: 10,
    seasonal: '6월 1~30일 자진신고 50% 감면',
    tags: ['4티어', '시즈널', '핫키워드'],
  },
  {
    slug: 'private-pension-1500-million-separate-taxation-2026',
    title: '사적연금 1,500만 원 분리과세 vs 종합과세 2026 | 연령별 세율·신고·절세',
    description:
      '연금저축·IRP 1,500만 원 이하 분리과세(3.3~5.5% 저세율) vs 초과분 종합과세. 2024년 상향(1,200만→1,500만) 완벽 이해·연령별 세율·신고 방법·절세 전략·5/31 마감 필수.',
    category: '세금',
    publishedAt: '2026-05-23',
    readingMinutes: 13,
    seasonal: '5월 31일까지 신고 준비',
    tags: ['4티어', '시즈널', '핫키워드', '블루오션'],
  },
  {
    slug: 'monthly-rent-tax-credit-2026',
    title: '월세 세액공제 2026 무주택 직장인 환급 계산 | 17% + 750만 한도',
    description:
      '무주택 직장인·프리랜서 월세 세액공제 완벽 가이드. 17%/15% 공제율 구분·750만 한도·연말정산 누락 시 5월 추가 신고·신용카드 소득공제와 택일·주의사항 5가지·실전 사례 3개.',
    category: '세금·부동산',
    publishedAt: '2026-05-23',
    readingMinutes: 8,
    seasonal: '5월 31일까지 신고 준비',
    tags: ['4티어', '시즈널', '핫키워드'],
  },
  {
    slug: 'income-tax-correction-claim-5-year-2026',
    title: '경정청구로 5년 내 환급받기 2026 | 누락 공제·세액공제 회수 완벽 가이드',
    description:
      '5월 31일까지! 지난 5년 신고 시 누락한 공제(의료비·교육비·월세·기부금·자녀세액공제)로 환급받는 경정청구 완벽 가이드. 5년 기한 정확 계산·자주 누락 항목 8가지·신청 방법 4단계·환급 추적·무신고도 가능.',
    category: '세금',
    publishedAt: '2026-05-24',
    readingMinutes: 9,
    seasonal: '5월 31일까지 경정청구 신청',
    tags: ['4티어', '시즈널', '핫키워드', '블루오션'],
  },
  {
    slug: 'medical-expense-tax-credit-3-percent-2026',
    title: '의료비 세액공제 2026 3% 초과분 15% 공제 | 700만 한도·난임 30%',
    description:
      '5월 종소세 신고! 의료비 세액공제 완벽 정리. 총급여 3% 초과분만 세액공제 대상, 공제율 15% (난임 시술 30%), 한도 700만원 (본인·65세↑·6세↓·장애인 무한도). 공제 대상 의료비 10가지·보험금 차감·한도 구분·시뮬 3가지·신청 방법 4단계.',
    category: '세금',
    publishedAt: '2026-05-26',
    readingMinutes: 8,
    seasonal: '5월 31일까지 신고 마감',
    tags: ['4티어', '시즈널', '핫키워드', '블루오션'],
  },
  {
    slug: 'personal-deduction-dependent-150-2026',
    title: '종소세 인적공제 부양가족 150만원 2026 | 직계존비속 형제자매 요건',
    description:
      '5월 31일 종합소득세 신고! 인적공제 기본공제 1인당 150만원 이해하기. 배우자·부모·자녀·형제자매·위탁아동 공제 요건·경로우대 100만·장애인 200만 추가공제·연소득 100만원 기준·중복 등록 위험·가산세까지 완벽 정리.',
    category: '세금',
    publishedAt: '2026-05-26',
    readingMinutes: 12,
    seasonal: '5월 31일까지 신고 마감',
    tags: ['4티어', '시즈널', '핫키워드', '블루오션'],
  },
  {
    slug: 'june-property-tax',
    title: '재산세 완벽 가이드 (2026) — 6월 부과·7월 납부·공정시장가액 60%',
    description:
      '재산세 과세 기준일·납부 기한·계산식·1세대1주택 특례·세부담 상한·분할 납부까지 한 페이지. 7월 납부 시즌 직전 필독.',
    category: '세금·부동산',
    publishedAt: '2026-05-03',
    readingMinutes: 10,
    seasonal: '7월 납부 직전',
    tags: ['시즈널'],
  },
  {
    slug: 'property-tax-base-date-june-1-2026',
    title: '재산세 과세기준일 6월 1일 — 매매 잔금 타이밍과 부담자 판정',
    description:
      '재산세는 6월 1일 현재 소유자에게 1년치 전액 부과됩니다(지방세법 §114). 잔금일이 5월 31일이냐 6월 2일이냐로 매도자·매수자 부담이 갈립니다. 거래 직전 필독.',
    category: '세금·부동산',
    publishedAt: '2026-05-31',
    readingMinutes: 7,
    seasonal: '6월 1일 과세기준일',
    tags: ['시즈널', '거래직전'],
  },
  {
    slug: 'vehicle-individual-consumption-tax-deadline-2026-june',
    title: '자동차 개별소비세 6월 30일 마감 — 출고 기준·최대 143만원 절감',
    description:
      '자동차 개별소비세 인하(5%→3.5%)가 2026년 6월 30일 종료됩니다(개별소비세법 §1의2). 기준은 계약일이 아닌 출고일. 6월 안에 출고해야 최대 143만원을 아낍니다.',
    category: '세금',
    publishedAt: '2026-06-01',
    readingMinutes: 8,
    seasonal: '6월 30일 출고 마감',
    tags: ['시즈널', '블루오션'],
  },
  {
    slug: 'vehicle-tax-2026',
    title: '자동차세 완전 정리 (2026) — 배기량별 세율·연납 할인·차령경감',
    description:
      '비영업용 승용차 배기량 cc당 세율(1,000cc 이하 80원·1,001~1,600cc 140원·1,601cc 이상 200원)에 지방교육세 30%를 더한 자동차세 계산. 3년차부터 차령경감(연 5%, 최대 50%), 1월 연납 할인(5% 공제율) 완전 가이드. (지방세법 §127, §128, §151)',
    category: '세금',
    publishedAt: '2026-06-14',
    readingMinutes: 8,
    seasonal: '6월 정기분 시즌 (급상승 키워드)',
    tags: ['시즈널', '핫키워드'],
  },
  {
    slug: 'vehicle-tax-june-payment-annual-discount-2026',
    title: '자동차세 제1기 6월 납부 가이드 — cc당 세액·차령경감·연납 2026',
    description:
      '자동차세 제1기 정기분 납부는 6/16~30입니다(지방세법 §128). cc당 세액(80·140·200원), 3년차부터 차령경감 최대 50%, 전기차 정액 13만원, 1월 연납 공제까지 한 페이지.',
    category: '세금',
    publishedAt: '2026-06-02',
    readingMinutes: 8,
    seasonal: '6월 정기분 납부',
    tags: ['시즈널'],
  },
  {
    slug: 'electric-vehicle-tax-2026',
    title: '전기차 자동차세 2026 | 정액 세율·하이브리드 차이',
    description:
      '전기차·수소차는 배기량이 없어 정액 자동차세(연 10만원 + 지교세 30%)가 부과되고, 하이브리드는 배기량 기준 일반세율이 적용됩니다. 지방세법 §127 기준 전기차 vs 내연기관·하이브리드 세액 비교, 지방교육세·연납 할인 정보.',
    category: '세금',
    publishedAt: '2026-06-15',
    readingMinutes: 6,
    seasonal: '6월 자동차세 시즌 (롱테일)',
    tags: ['시즈널', '4티어', '핫키워드'],
  },
  {
    slug: 'comprehensive-real-estate-tax-who-pays-2026',
    title: '종합부동산세 2026 — 누가 내나, 12억 공제, 과세기준일 6월 1일',
    description:
      '종부세는 6월 1일 현재 소유자에게 부과됩니다(종합부동산세법 §7). 1주택 12억·다주택 9억 공제, 공정시장가액비율 60%, 세율 0.5~5%, 12월 납부까지 한 페이지.',
    category: '세금·부동산',
    publishedAt: '2026-06-02',
    readingMinutes: 9,
    seasonal: '6월 1일 과세기준일',
    tags: ['시즈널'],
  },
  {
    slug: 'earned-income-tax-credit-late-application-2026',
    title: '근로·자녀장려금 기한 후 신청 2026 — 5월 놓쳤다면 95% 지급',
    description:
      '정기신청(~5/31)을 놓쳤어도 6월 1일~11월 30일 기한 후 신청하면 산정액의 95%를 받습니다. 가구별 최대 165~330만원, 소득·재산 요건, 지급일까지 한 페이지.',
    category: '세금',
    publishedAt: '2026-06-02',
    readingMinutes: 8,
    seasonal: '기한 후 신청 6~11월',
    tags: ['시즈널', '블루오션'],
  },
  {
    slug: 'energy-voucher-2026-summer-cooling-subsidy',
    title: '2026 에너지바우처 — 여름 냉방비 최대 70만원 지원, 6월 15일 신청',
    description:
      '생계·의료·주거·교육급여 수급 + 취약계층 세대는 에너지바우처로 여름 냉방비를 지원받습니다. 신청 6/15~12/31, 가구별 29~70만원, 2026년 계절 사용제한 폐지.',
    category: '세금',
    publishedAt: '2026-06-02',
    readingMinutes: 7,
    seasonal: '6/15 신청 시작',
    tags: ['시즈널', '블루오션'],
  },
  {
    slug: 'interest-rate-hike-dsr-loan-limit-july-2026',
    title: '기준금리 오르면 대출한도 줄어들까? DSR·스트레스금리 영향 2026',
    description:
      '2026년 6월 현재 기준금리 2.50%(8연속 동결). 금리가 오르면 DSR·스트레스금리로 주담대·전세대출 한도가 어떻게 변하는지 구조와 가정 사례로 설명. 7월 16일 금통위 앞 점검.',
    category: '금융',
    publishedAt: '2026-06-02',
    readingMinutes: 9,
    seasonal: '7/16 금통위',
    tags: ['금융', '대출'],
  },
  {
    slug: 'high-oil-price-relief-fund-2026-application',
    title: '고유가 피해지원금 2026 — 대상·금액·신청 (소득 하위 70%, 7/3 마감)',
    description:
      '소득 하위 70%면 1인당 10~25만원(지역 차등). 2차 신청 5/18~7/3, 카드·지역사랑상품권으로 8/31까지 사용. 건강보험료 기준·신청 방법·사용처 총정리.',
    category: '세금',
    publishedAt: '2026-06-03',
    readingMinutes: 7,
    seasonal: '7/3 신청 마감',
    tags: ['시즈널', '블루오션'],
  },
  {
    slug: 'youth-future-savings-account-2026',
    title: '청년미래적금 2026 — 19~34세, 월 50만원·5% + 정부기여금 6~12%',
    description:
      '만 19~34세·소득요건 충족 시 월 최대 50만원, 기본금리 연 5% + 정부기여금 6~12% + 비과세. 3년 만기 약 2,200만원. 6월 22일 출시, 청년도약계좌와 중복 불가.',
    category: '금융',
    publishedAt: '2026-06-04',
    readingMinutes: 8,
    seasonal: '6/22 출시',
    tags: ['금융'],
  },
  {
    slug: 'unemployment-benefit-2026',
    title: '실업급여 2026 — 상한 68,100원·하한 66,048원, 조건·금액·신청',
    description:
      '2026년 실업급여 1일 상한 68,100원·하한 66,048원으로 인상. 수급조건(피보험단위기간 180일·비자발적 이직), 소정급여일수 120~270일, 지급액 계산(평균임금 60%), 신청 방법까지 정리.',
    category: '근로',
    publishedAt: '2026-06-07',
    readingMinutes: 9,
    tags: ['근로'],
  },
  {
    slug: 'national-pension-2026',
    title: '국민연금 2026 — 보험료율 9.5%·수령나이·예상수령액·개혁',
    description:
      '2026년 국민연금 개혁으로 보험료율 9%→9.5%, 소득대체율 41.5%→43% 인상. 출생연도별 수령나이(61~65세), 예상수령액 확인법, 조기수령(최대 30%↓)·연기연금(최대 36%↑) 손익 정리.',
    category: '근로',
    publishedAt: '2026-06-08',
    readingMinutes: 10,
    tags: ['근로'],
  },
  {
    slug: 'national-pension-premium-2026',
    title: '국민연금 보험료 2026 완전 정리 — 계산법·상한액·직장/지역 차이',
    description:
      '2026년 국민연금 보험료율 9%→9.5%, 기준소득월액 상한 2026년 7월부터 637만→659만원 조정. 직장가입자 근로자 부담 4.75%, 지역가입자 전액 납부. 상한액 초과 시 납부액 고정·소득공제 혜택 정리.',
    category: '근로',
    publishedAt: '2026-06-13',
    readingMinutes: 8,
    tags: ['시즈널'],
  },
  {
    slug: 'national-pension-expected-benefit-2026',
    title: '국민연금 예상 수령액 2026 — 조회·계산법·조기/연기 손익',
    description:
      '국민연금 예상 수령액은 가입기간과 평균소득으로 결정됩니다. 공단 예상연금액 조회 방법, 조기노령연금 감액(연 6%, 최대 30%), 연기연금 증액(연 7.2%, 최대 36%), 최소 가입기간 10년까지 국민연금공단 기준으로 정리.',
    category: '근로',
    publishedAt: '2026-06-15',
    readingMinutes: 8,
    seasonal: '네이버 급상승 국민연금 +69%',
    tags: ['4티어', '시즈널', '핫키워드'],
  },
  {
    slug: 'basic-pension-2026',
    title: '기초연금 2026 — 월 최대 34만 9,700원, 선정기준·국민연금 연계',
    description:
      '2026년 기초연금 월 최대 349,700원(부부 559,520원). 선정기준액 단독 247만원·부부 395.2만원, 65세 소득하위 70% 대상. 국민연금 연계감액(최소 50% 보장)·부부감액·신청 방법 정리.',
    category: '근로',
    publishedAt: '2026-06-09',
    readingMinutes: 9,
    tags: ['근로'],
  },
  {
    slug: 'health-insurance-premium-2026',
    title: '건강보험료 2026 — 요율 7.19%·피부양자 자격·지역가입자',
    description:
      '2026년 건강보험료율 7.09%→7.19%, 장기요양 12.95%→13.14% 인상. 직장가입자 보험료(근로자 3.595%), 피부양자 자격(소득 2,000만·재산 과표 9억), 지역가입자 산정 정리.',
    category: '근로',
    publishedAt: '2026-06-11',
    readingMinutes: 10,
    seasonal: '네이버 트렌드 +49%',
    tags: ['근로', '블루오션'],
  },
  {
    slug: 'health-insurance-dependent-qualification-2026',
    title: '건강보험 피부양자 자격조건 2026 | 소득·재산 요건 총정리',
    description:
      '2026년 건강보험 피부양자 자격은 소득요건과 재산요건을 모두 충족해야 인정됩니다. 합산소득 2,000만원 기준, 재산세 과세표준 5억 4천만원 한도, 형제자매 범위, 탈락 시 지역가입자 전환까지 국민건강보험공단 기준으로 정리했습니다.',
    category: '근로',
    publishedAt: '2026-06-15',
    readingMinutes: 7,
    seasonal: '네이버 급상승 건강보험료 +48%',
    tags: ['4티어', '시즈널', '핫키워드', '블루오션'],
  },
  {
    slug: 'health-insurance-regional-subscriber-2026',
    title: '지역가입자 건강보험료 2026 — 소득·재산 점수 계산법',
    description:
      '지역가입자 건강보험료는 소득점수와 재산점수를 합산해 부과점수당 금액을 곱해 산정합니다. 직장가입자와의 차이, 임의계속가입, 소득정산까지 국민건강보험공단 기준으로 정리.',
    category: '근로',
    publishedAt: '2026-06-15',
    readingMinutes: 8,
    seasonal: '네이버 급상승 건강보험료 +48%',
    tags: ['4티어', '시즈널', '핫키워드', '블루오션'],
  },
  // ─── 7월 ───
  {
    slug: 'july-vat-final-1st-half',
    title: '7월 부가세 1기 확정신고 가이드 (2026) — 일반·간이과세 완전정리',
    description:
      '7월 1~25일 부가가치세 1기 확정신고. 일반과세 vs 간이과세 차이·세액계산·홈택스 6단계·환급·절세 5가지.',
    category: '세금',
    publishedAt: '2026-05-12',
    readingMinutes: 11,
    seasonal: '7월 1~25일',
    tags: ['시즈널'],
  },
  // ─── 8월 ───
  {
    slug: 'august-capital-gains-tax-review',
    title: '8월 양도소득세 절세 검토 가이드 (2026) — 일시적2주택·장기보유 80%',
    description:
      '8월 부동산 양도 검토. 일시적2주택 3년 만료·장기보유공제 80%·단기 1년/2년 경계·양도 시점 vs 귀속연도·절세 5가지.',
    category: '세금·부동산',
    publishedAt: '2026-05-12',
    readingMinutes: 12,
    seasonal: '8월 양도 직전',
    tags: ['시즈널'],
  },
  // ─── 9월 ───
  {
    slug: 'september-property-tax-second',
    title: '9월 재산세 2차 납부 가이드 (2026) — 위택스·신용카드 할부·가산세',
    description:
      '9월 16~30일 재산세 2차 납부. 주택 분할 vs 토지 일괄·위택스 5가지 방법·신용카드 무이자 할부·미납 가산세·과오납 환급.',
    category: '세금·부동산',
    publishedAt: '2026-05-12',
    readingMinutes: 9,
    seasonal: '9월 16~30일',
    tags: ['시즈널'],
  },
  // ─── 10월 ───
  {
    slug: 'october-vat-q2-preliminary',
    title: '10월 부가세 2기 예정신고 가이드 (2026) — 환급·예정고지·연말 절세',
    description:
      '10월 1~25일 부가세 2기 예정신고. 예정신고 vs 예정고지 차이·환급 가능성·연말 절세 4가지·4분기 매입 계획.',
    category: '세금',
    publishedAt: '2026-05-12',
    readingMinutes: 10,
    seasonal: '10월 1~25일',
    tags: ['시즈널'],
  },
  // ─── 11월 ───
  {
    slug: 'november-year-end-tax-prep',
    title: '11월 연말정산 준비 가이드 (2026) — 12월 31일 마감 전 절세 8가지',
    description:
      '12월 31일 마감 전 마지막 절세 기회. 연금저축·IRP 900만 한도·신용카드·의료비·기부금·청약통장·월세 공제까지 단계별.',
    category: '세금',
    publishedAt: '2026-05-12',
    readingMinutes: 13,
    seasonal: '11~12월 골든타임',
    tags: ['시즈널'],
  },
  // ─── 12월 ───
  {
    slug: 'december-capital-gains-tax-deadline',
    title: '12월 양도세 vs 1월 양도세 가이드 (2026) — 연말 매도 결정 프레임',
    description:
      '12월 잔금 vs 1월 잔금. 귀속연도·신고 일정·2027 세법 개정 영향·양도손실 통산 4단계 의사결정.',
    category: '세금·부동산',
    publishedAt: '2026-05-12',
    readingMinutes: 11,
    seasonal: '12월 양도 직전',
    tags: ['시즈널'],
  },
  {
    slug: 'capital-gains-tax-tips',
    title: '양도소득세 절세 7가지 방법 (2026)',
    description:
      '1세대1주택 비과세, 장기보유공제 80%, 일시적 2주택 3년 특례, 자경 농지 100% 감면 등 양도세 절세 핵심 7가지를 시뮬레이션과 함께 정리.',
    category: '세금',
    publishedAt: '2026-05-03',
    readingMinutes: 9,
  },
  {
    slug: 'dsr-loan-limit-tips',
    title: 'DSR 대출한도를 늘리는 5가지 실전 방법 (2026)',
    description:
      '스트레스 DSR 1.5%p 풀 적용된 2026년, 같은 소득으로 대출한도를 더 받는 5가지 방법을 시뮬레이션과 함께 정리.',
    category: '금융',
    publishedAt: '2026-05-03',
    readingMinutes: 7,
  },
  {
    slug: 'dsr-regulation-zones',
    title: '비규제·조정·투기과열 DSR·LTV 규제 완전 정리 (2026)',
    description:
      '같은 주택이라도 위치(비규제·조정·투기과열)에 따라 대출 한도가 1억 원 이상 차이. 스트레스 DSR + 생애최초 우대 + 다주택 중과까지 종합 비교.',
    category: '금융',
    publishedAt: '2026-05-03',
    readingMinutes: 8,
  },
  {
    slug: 'averaging-down-vs-loss-cut',
    title: '물타기 vs 손절 vs 비중조절 — 언제 무엇을 선택해야 하나',
    description:
      '하락 종목을 만났을 때 평단을 낮추는 물타기, 즉시 매도하는 손절, 단계적 매도하는 비중조절 — 3가지 전략의 의사결정 기준.',
    category: '투자',
    publishedAt: '2026-05-03',
    readingMinutes: 8,
  },
  {
    slug: 'freelancer-salary-comparison',
    title: '프리랜서 vs 일반직 실수령액 비교 — 4대보험·세금 차이',
    description:
      '같은 연 5천만 원이라도 프리랜서(사업소득)와 일반직(근로소득)의 실수령액 차이. 4대보험 부담·종합소득세·경비 인정 시뮬레이션.',
    category: '근로',
    publishedAt: '2026-05-03',
    readingMinutes: 7,
  },
  // ─── 4티어 핫 키워드 가이드 (영구 발행) ───
  {
    slug: 'severance-vs-pension-dc-db',
    title: '퇴직금 vs 퇴직연금 DC/DB 차이 완전 정리 (2026)',
    description:
      'DC형(확정기여)·DB형(확정급여)·일시금 수령·연금 수령의 세제·운용·실수령 차이. IRP 이전·중도 해지 패널티 정리.',
    category: '근로',
    publishedAt: '2026-05-04',
    readingMinutes: 9,
    tags: ['4티어'],
  },
  {
    slug: 'retirement-income-tax-2026',
    title: '2026 퇴직소득세 계산법 — 연분연승법·근속연수공제',
    description:
      '퇴직소득세는 근속연수가 길수록 세 부담이 줄어드는 연분연승법으로 계산. 근속연수공제·환산급여공제·기본세율 적용 단계별 해석과 실전 시뮬레이션.',
    category: '근로',
    publishedAt: '2026-06-15',
    readingMinutes: 8,
    tags: ['4티어'],
  },
  {
    slug: 'jeonse-deposit-safety',
    title: '전세보증금 안전 가이드 — 보증보험·확정일자·우선변제',
    description:
      '전세사기 예방 5단계: 등기부 확인·시세 90% 이하·보증보험 가입·전입신고·확정일자. HUG/SGI 보증료 자동 계산.',
    category: '세금·부동산',
    publishedAt: '2026-05-04',
    readingMinutes: 8,
    tags: ['4티어'],
  },
  {
    slug: 'capital-gains-tax-5-steps',
    title: '양도소득세 5단계 시뮬 — 1세대1주택·다주택·일시적2주택',
    description:
      '양도가 산정→취득가·경비 차감→장기보유공제→과세표준→세율 적용까지 5단계로 실전 양도세 계산. 다주택 중과·12억 한도 비례 과세 포함.',
    category: '세금',
    publishedAt: '2026-05-05',
    readingMinutes: 10,
    tags: ['4티어'],
  },
  {
    slug: 'salary-negotiation-take-home',
    title: '연봉 협상 시 실수령 기준 제안 — 세전·세후 차이 정리',
    description:
      '연봉 인상 5% 제안 시 세후 실수령 변화 시뮬. 4대보험·소득세 누진 효과·식대·자녀세액공제 종합.',
    category: '근로',
    publishedAt: '2026-05-05',
    readingMinutes: 7,
    tags: ['4티어'],
  },
  {
    slug: 'earned-income-tax-credit-vs-child',
    title: '근로장려금 vs 자녀장려금 차이 (5월 신청)',
    description:
      '근로장려금(가구 소득 4,400만원 미만)과 자녀장려금(7,000만원 미만)의 자격·금액·중복 가능 여부 정리. 5월 31일 신청 마감.',
    category: '세금',
    publishedAt: '2026-05-05',
    readingMinutes: 6,
    seasonal: '5월 31일 마감',
    tags: ['4티어', '시즈널'],
  },
  {
    slug: 'rent-conversion-rate-2026-housing-lease-act',
    title: '2026 전월세 전환율 — 주택임대차보호법 한도',
    description:
      '한국은행 기준금리 + 2%p (2026년 약 5.5%) 한도. 임대인 일방 인상 거부권·갱신청구권·5% 인상 한도와 함께 정리.',
    category: '세금·부동산',
    publishedAt: '2026-05-06',
    readingMinutes: 7,
    tags: ['4티어'],
  },
  {
    slug: 'presale-right-capital-gains-tax',
    title: '분양권 양도소득세 완전 정리 — 60%/70% 단일 세율',
    description:
      '분양권은 보유 기간 무관 60%(1년 이상)·70%(1년 미만) 단일 세율. 1세대1주택 비과세 X, 장기보유공제 X.',
    category: '세금',
    publishedAt: '2026-05-08',
    readingMinutes: 8,
    tags: ['4티어'],
  },
  {
    slug: 'one-household-12-billion-exemption',
    title: '1세대1주택 12억 비과세 한도 완전 정리',
    description:
      '1세대1주택 양도 시 12억까지 비과세. 12억 초과분 비례 과세 공식·장기보유공제 80% 결합·거주 요건 종합.',
    category: '세금',
    publishedAt: '2026-05-08',
    readingMinutes: 9,
    tags: ['4티어'],
  },
  {
    slug: 'n-jobber-insurance-dependent-disqualification',
    title: 'N잡러 건강보험 피부양자 탈락 — 소득 3,400만 기준',
    description:
      '연 소득(근로+사업+이자배당) 합계 3,400만 초과 시 피부양자 자격 상실. 가족 명의 분산·DC형 IRP 활용 회피 전략.',
    category: '근로',
    publishedAt: '2026-05-09',
    readingMinutes: 8,
    tags: ['4티어'],
  },
  {
    slug: 'housing-rental-income-separate-taxation',
    title: '주택임대소득 분리과세 2,000만 기준',
    description:
      '주택임대소득 2,000만 이하 분리과세 14% 선택 가능. 등록임대 vs 미등록임대 세제·필요경비 인정 비율 정리.',
    category: '세금·부동산',
    publishedAt: '2026-05-09',
    readingMinutes: 8,
    tags: ['4티어'],
  },
  {
    slug: 'child-earned-income-tax-credit-application-2026',
    title: '자녀·근로장려금 신청 가이드 (2026 5월 31일 마감)',
    description:
      '자녀장려금 1인 50~80만, 근로장려금 최대 330만. 가구 유형별 자격·신청 절차·환급 일정 종합.',
    category: '세금',
    publishedAt: '2026-05-10',
    readingMinutes: 7,
    seasonal: '5월 31일 마감',
    tags: ['4티어', '시즈널'],
  },
  {
    slug: 'joint-ownership-couple-capital-gains-tax-savings',
    title: '부부 공동명의 양도세 절세 — 50:50 분산 효과',
    description:
      '부부 공동명의 시 양도소득세 누진세 분산·기본공제 250만 × 2 적용·세대 1주택 판정 동일. 취득세 6% 부담 비교까지.',
    category: '세금·부동산',
    publishedAt: '2026-05-11',
    readingMinutes: 9,
    tags: ['4티어'],
  },
  {
    slug: 'inheritance-tax-10-year-prior-gift-aggregation',
    title: '상속세 사전 증여 합산 10년/5년 완벽 정리',
    description:
      '상증법 §13 — 사전 증여 10년(상속인)·5년(상속인 외) 합산. 30억 자산 사례로 일괄 상속 vs 단계 증여 약 2.6억 절세 시뮬.',
    category: '세금',
    publishedAt: '2026-05-12',
    readingMinutes: 11,
    tags: ['4티어'],
  },
  {
    slug: 'temporary-two-houses-capital-gains-exemption',
    title: '일시적 2주택 양도세 비과세 3년',
    description:
      '신규 1년 후 취득 + 종전 3년 내 양도 + 보유 2년 = 비과세. 2023-01-12 시행령 개정으로 모든 지역 3년 통일. 12억 비례 과세.',
    category: '세금',
    publishedAt: '2026-05-12',
    readingMinutes: 10,
    tags: ['4티어'],
  },
  {
    slug: 'inherited-house-capital-gains-exemption-5-year-2026',
    title: '상속주택 양도세 1세대1주택 합가 5년 특례 2026',
    description:
      '상속 후 기존주택 5년 내 양도 시 1세대1주택 비과세(소득세법 §89·시행령 §155②). 양도 순서 핵심·5년은 사망일 기준·상속주택 비과세 제외·공동상속 처리·12억 한도 비례 과세·세금 사례 3개.',
    category: '세금',
    publishedAt: '2026-05-24',
    readingMinutes: 12,
    tags: ['4티어'],
  },
  {
    slug: 'long-term-holding-special-deduction-80-percent',
    title: '장기보유특별공제 80% 완전 정리 (1세대1주택)',
    description:
      '시행령 §159의3 표2 — 보유 4% × 10년(40%) + 거주 4% × 10년(40%) = 최대 80%. 다주택 중과 시 배제·분양권 미적용.',
    category: '세금',
    publishedAt: '2026-05-12',
    readingMinutes: 10,
    tags: ['4티어'],
  },
  {
    slug: 'burden-gift-debt-assumption-tax',
    title: '부담부증여 양도+증여세 — 전세보증금·은행대출',
    description:
      '상증법 §47 ② — 채무인수액은 양도, 무상분은 증여 분리 과세. 자산 10억 + 채무 4억 사례로 일반 증여 대비 약 1.19억 절세 시뮬.',
    category: '세금',
    publishedAt: '2026-05-12',
    readingMinutes: 10,
    tags: ['4티어'],
  },
  {
    slug: 'financial-income-comprehensive-vs-separate-taxation',
    title: '금융소득 종합과세 vs 분리과세 — 2,000만 기준',
    description:
      '소득세법 §14 ⑦·§62 비교과세. 분리(15.4% 자동) vs 종합(누진세+배당세액공제 §56). 5월 31일 신고 시즌 필독.',
    category: '세금',
    publishedAt: '2026-05-12',
    readingMinutes: 9,
    seasonal: '5월 31일 마감',
    tags: ['4티어', '시즈널'],
  },
  {
    slug: 'carry-over-basis-spouse-gift-5-10-year',
    title: '이월과세 5년→10년 확대 완벽 정리 2026 | 배우자·직계 증여 양도세',
    description:
      '이월과세 정의·소득세법 §97의2·2025년 5년에서 10년 확대·증여자 취득가 적용·면제 사유 5가지·시뮬 사례 2개·함정 5가지·절세 전략·신고 방법.',
    category: '세금',
    publishedAt: '2026-05-12',
    readingMinutes: 13,
    tags: ['4티어'],
  },
  {
    slug: 'child-house-gift-vs-sale-comparison',
    title: '자녀 주택 증여 vs 매매 비교 — 저가양수도 30%·3억 룰',
    description:
      '시가 10억 주택 자녀 이전 4가지 시나리오 비교. 상증법 §35 ① 저가양수도 30%·3억 룰, 자금출처 조사, 양도세 시가 기준(§101), 증여취득세, 신고 함정.',
    category: '세금',
    publishedAt: '2026-05-12',
    readingMinutes: 12,
    tags: ['4티어'],
  },
  {
    slug: 'self-farming-land-100-percent-exemption',
    title: '자경농지 8년 100% 감면 완벽 정리 2026',
    description:
      '자경농지 8년 양도세 100% 감면 조건·자경 요건(50% 노동력)·거주 요건(30km)·한도(연 1억/5년 2억)·시뮬 사례 3개·함정 5가지·신청 절차.',
    category: '세금',
    publishedAt: '2026-05-13',
    readingMinutes: 14,
    tags: ['4티어'],
  },
  {
    slug: 'family-loan-agreement-gift-tax-avoidance',
    title: '가족 간 차용증·금전대여 증여세 정확 정리 2026',
    description:
      '상증법 §41의4·시행령 §31의5 적정이자율 4.6%·연 차액 1,000만 면제·차용증 필수 요소·실질과세 입증 자료·함정 5가지·신고 절차 정리.',
    category: '세금',
    publishedAt: '2026-05-14',
    readingMinutes: 15,
    tags: ['4티어'],
  },
  {
    slug: 'foreign-tax-credit-overseas-stock-2026',
    title: '외국납부세액공제 2026 해외주식·배당 환급 신청 | 5월 31일',
    description:
      '해외주식 배당·이자에서 이미 낸 외국 세금을 한국 종합소득세에서 환급받는 외국납부세액공제. 한도 계산·신청 절차·10년 이월·증빙 서류(1099-DIV)·해외근로소득·양도소득 제외 완벽 정리.',
    category: '세금',
    publishedAt: '2026-05-28',
    readingMinutes: 13,
    seasonal: '5월 31일까지 신고 마감',
    tags: ['4티어', '시즈널', '핫키워드', '블루오션'],
  },
  {
    slug: 'deceased-comprehensive-income-tax-heir-filing-2026',
    title: '사망자 종합소득세 상속인 신고 2026 | 6개월 기한·소득세법 §74',
    description:
      '사망한 부모·배우자 소득, 상속인이 신고해야 할까? 사망자 종합소득세 신고 의무·기한(사망일+6개월)·신고 대상 소득·상속인 신고 규칙·세액 계산·5월 31일 마감 연장·신고 안 하면 가산세 20% 완벽 정리.',
    category: '세금',
    publishedAt: '2026-05-28',
    readingMinutes: 8,
    seasonal: '5월 31일까지 신고 마감',
    tags: ['4티어', '시즈널', '핫키워드', '블루오션'],
  },
  // ─── 2026-06-16 데이터 기반 3편 (GSC page2 직전 쿼리 캡처) ───
  {
    slug: 'real-estate-broker-fee-rate-2026',
    title: '주택 중개수수료 요율표 2026 — 매매·전세·월세 상한 완전정리',
    description:
      '부동산 중개수수료 상한요율을 공인중개사법 기준으로 정리. 주택 매매 6억원 기준 0.4%=240만원, 전세 3억 0.3%, 월세 보증금 환산(보증금+월세×100)까지 2026년 최신 요율과 협의 한도, 부가세·VAT 포함 여부를 명확히.',
    category: '세금·부동산',
    publishedAt: '2026-06-16',
    readingMinutes: 9,
    tags: ['핫키워드', '거래직전'],
  },
  {
    slug: 'interest-income-tax-15-4-percent-2026',
    title: '예금·적금 이자소득세 15.4% 2026 — 세후 이자·세금우대·종합과세',
    description:
      '예금·적금 이자소득세는 원천징수 15.4%(소득세 14%+지방소득세 1.4%). 세금우대종합저축 9.5%, 금융소득 2천만 초과 시 종합과세. 정기예금 1,000만원·연 3.5% 예시로 세후이자 계산법과 ISA 비과세 조건까지 2026년 기준 정리.',
    category: '금융',
    publishedAt: '2026-06-16',
    readingMinutes: 9,
    tags: ['핫키워드'],
  },
  {
    slug: 'inflation-money-value-2026',
    title: '화폐가치·인플레이션 계산 2026 — 10년 전 돈의 현재가치',
    description:
      '2026년 물가상승률 기준 미래 화폐가치·과거 돈의 현재가치 계산. 연 3% 물가 가정 시 10년 후 100만원의 현재가치, 복리 환산 공식, 통계청 CPI 환산, 품목별 물가상승률 차이를 명확히 정리.',
    category: '금융',
    publishedAt: '2026-06-16',
    readingMinutes: 8,
    tags: ['핫키워드'],
  },
];

// 시기성 가이드만 추출 (상단 배너용)
const SEASONAL_GUIDES = GUIDES.filter((g) => g.seasonal);

// 카테고리별 그룹화
const GUIDES_BY_CATEGORY: Record<GuideCategory, GuideEntry[]> = {
  '세금': [],
  '세금·부동산': [],
  '금융': [],
  '투자': [],
  '근로': [],
};
GUIDES.forEach((g) => GUIDES_BY_CATEGORY[g.category].push(g));

// 카테고리 이모지 조회 (전체 목록 배지용)
const CATEGORY_EMOJI = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.emoji])
) as Record<GuideCategory, string>;

// 전체 — 최신순 날짜별 그룹 (오늘 포스팅이 최상단)
const GUIDES_BY_DATE: { date: string; items: GuideEntry[] }[] = [];
[...GUIDES]
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .forEach((g) => {
    const last = GUIDES_BY_DATE[GUIDES_BY_DATE.length - 1];
    if (last && last.date === g.publishedAt) last.items.push(g);
    else GUIDES_BY_DATE.push({ date: g.publishedAt, items: [g] });
  });

export default function GuideIndexPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드' },
  ]);
  const webpageLd = buildWebPageJsonLd({
    name: 'calculatorhost 가이드 — 카테고리별 모음',
    description: '한국 거주자 대상 금융·세금·부동산·투자·근로 실전 가이드 모음 (카테고리별 분류).',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const itemListLd = buildItemListJsonLd(
    GUIDES.map((g) => ({
      name: g.title,
      url: `https://calculatorhost.com/guide/${g.slug}/`,
    })),
    'calculatorhost 가이드'
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main id="main-content" className="flex-1 px-4 py-8 md:px-8">
            <article className="mx-auto max-w-5xl space-y-10">
              <header>
                <Breadcrumb items={[{ name: '홈', href: '/' }, { name: '가이드' }]} />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  가이드 — 카테고리별 모음
                </h1>
                <p className="text-lg text-text-secondary">
                  한국 거주자가 자주 마주치는 금융·세금·부동산·투자·근로 의사결정 가이드.
                  현재 <strong>{GUIDES.length}개</strong> 발행 · 5개 카테고리 · 매월 추가됨.
                </p>
              </header>

              {/* 카테고리 빠른 이동 칩 */}
              <nav aria-label="카테고리 빠른 이동" className="card flex flex-wrap gap-2">
                <a
                  href="#all"
                  className="rounded-chip border border-primary-500 bg-primary-500/10 px-3 py-1.5 text-sm font-semibold text-primary-500 hover:bg-primary-500/20"
                >
                  🗂 전체 ({GUIDES.length})
                </a>
                <a
                  href="#seasonal"
                  className="rounded-chip border border-danger-500 bg-danger-500/10 px-3 py-1.5 text-sm font-semibold text-danger-700 dark:text-danger-300 hover:bg-danger-500/20"
                >
                  🔥 시즌 가이드 ({SEASONAL_GUIDES.length})
                </a>
                {CATEGORIES.map((cat) => {
                  const count = GUIDES_BY_CATEGORY[cat.id].length;
                  if (count === 0) return null;
                  return (
                    <a
                      key={cat.id}
                      href={`#${encodeURIComponent(cat.id)}`}
                      className="rounded-chip border border-border-base bg-bg-card px-3 py-1.5 text-sm font-medium hover:border-primary-500 hover:text-primary-500"
                    >
                      {cat.emoji} {cat.id} ({count})
                    </a>
                  );
                })}
              </nav>

              {/* 전체 — 최신순 날짜별 (가이드 진입 시 바로 보이는 기본 목록) */}
              <section id="all" aria-label="전체 가이드 (최신순)" className="card space-y-5 scroll-mt-4">
                <header className="flex items-baseline justify-between border-b border-border-base pb-2">
                  <h2 className="text-2xl font-bold">
                    🗂 전체 가이드{' '}
                    <span className="text-base text-text-tertiary font-normal">
                      (최신순 · {GUIDES.length})
                    </span>
                  </h2>
                  <span className="text-caption text-text-tertiary">최근 발행부터</span>
                </header>
                <div className="space-y-6">
                  {GUIDES_BY_DATE.map((group, gi) => (
                    <div key={group.date} className="space-y-2">
                      <h3 className="flex items-center gap-2 text-sm font-semibold text-text-secondary">
                        <time dateTime={group.date}>{group.date.replace(/-/g, '. ')}</time>
                        <span className="font-normal text-text-tertiary">
                          ({group.items.length}편)
                        </span>
                        {gi === 0 && (
                          <span className="rounded-chip bg-primary-500/15 px-2 py-0.5 text-caption font-semibold text-primary-500">
                            최신
                          </span>
                        )}
                      </h3>
                      <ul className="divide-y divide-border-base border-t border-border-base">
                        {group.items.map((g) => (
                          <li key={g.slug}>
                            <Link
                              href={`/guide/${g.slug}/`}
                              className="flex items-center gap-3 py-2 hover:bg-primary-500/5"
                            >
                              <span aria-hidden className="text-base">
                                {CATEGORY_EMOJI[g.category]}
                              </span>
                              <span className="flex-1 text-sm font-medium text-text-primary hover:text-primary-500">
                                {g.title}
                              </span>
                              <span className="hidden shrink-0 text-caption text-text-tertiary sm:inline">
                                {g.category}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* 시즌 가이드 — 강조 배너 */}
              {SEASONAL_GUIDES.length > 0 && (
                <section
                  id="seasonal"
                  aria-label="시즌 가이드"
                  className="card border-l-2 border-l-danger-500 bg-danger-500/5 space-y-4"
                >
                  <h2 className="text-2xl font-bold text-danger-700 dark:text-danger-300">
                    🔥 시즌 가이드 — 지금 가장 검색 많은 주제
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {SEASONAL_GUIDES.map((g) => (
                      <Link
                        key={g.slug}
                        href={`/guide/${g.slug}/`}
                        className="card card-hover flex flex-col gap-2 bg-bg-card border-2 border-danger-500/30"
                      >
                        <div className="flex items-center justify-between text-caption">
                          <span className="rounded-chip bg-danger-500/20 px-2 py-0.5 text-danger-700 dark:text-danger-300 font-semibold">
                            {g.seasonal}
                          </span>
                          <span className="text-text-tertiary">{g.readingMinutes}분 읽기</span>
                        </div>
                        <h3 className="text-base font-semibold text-text-primary">{g.title}</h3>
                        <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                          {g.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* 카테고리별 그룹화 */}
              {CATEGORIES.map((cat) => {
                const guides = GUIDES_BY_CATEGORY[cat.id];
                if (guides.length === 0) return null;
                return (
                  <section key={cat.id} id={cat.id} aria-label={`${cat.id} 가이드`} className="space-y-4">
                    <header className="flex items-baseline justify-between border-b border-border-base pb-2">
                      <h2 className="text-2xl font-bold">
                        <span aria-hidden>{cat.emoji}</span> {cat.id}{' '}
                        <span className="text-base text-text-tertiary font-normal">
                          ({guides.length})
                        </span>
                      </h2>
                      <a
                        href="#"
                        className="text-caption text-text-tertiary hover:text-primary-500"
                      >
                        ↑ 맨 위로
                      </a>
                    </header>
                    <p className="text-text-secondary text-sm">{cat.description}</p>
                    <div className="grid gap-4 md:grid-cols-2">
                      {guides.map((g) => (
                        <Link
                          key={g.slug}
                          href={`/guide/${g.slug}/`}
                          className="card card-hover flex flex-col gap-3"
                        >
                          <div className="flex items-center justify-between text-caption text-text-tertiary">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="rounded-chip bg-primary-500/10 px-2 py-0.5 text-primary-700 dark:text-primary-300 font-medium">
                                {g.category}
                              </span>
                              {g.tags?.map((tag) => {
                                // 4티어 = 핫키워드 (highlight 노란), 시즈널 = 시기성 (danger 빨간)
                                const isSeasonal = tag === '시즈널';
                                const cls = isSeasonal
                                  ? 'rounded-chip bg-danger-500/15 px-2 py-0.5 text-danger-700 dark:text-danger-300 font-semibold'
                                  : 'rounded-chip bg-highlight-500/15 px-2 py-0.5 text-highlight-700 dark:text-highlight-300 font-semibold';
                                return (
                                  <span key={tag} className={cls}>
                                    {isSeasonal ? '⏰' : '🔥'} {tag}
                                  </span>
                                );
                              })}
                            </div>
                            <span>{g.readingMinutes}분 읽기</span>
                          </div>
                          <h3 className="text-base font-semibold text-text-primary">{g.title}</h3>
                          <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                            {g.description}
                          </p>
                          <p className="text-caption text-text-tertiary mt-auto">
                            {g.publishedAt}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </section>
                );
              })}

              {/* 관련 자원 */}
              <section className="card space-y-3">
                <h2 className="text-xl font-semibold">📚 관련 자원</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/glossary/" className="text-primary-600 underline dark:text-primary-500">
                      용어사전 (28개)
                    </Link>{' '}
                    — DSR·LTV·평단·BEP·양도차익 등 핵심 용어 정의
                  </li>
                  <li>
                    →{' '}
                    <Link href="/" className="text-primary-600 underline dark:text-primary-500">
                      홈 — 31개 계산기 모음
                    </Link>
                  </li>
                  <li>
                    →{' '}
                    <Link href="/feed.xml" className="text-primary-600 underline dark:text-primary-500">
                      📡 RSS 피드 구독
                    </Link>{' '}
                    — 새 가이드 알림
                  </li>
                </ul>
              </section>

              <section
                aria-label="안내"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 본 가이드 카테고리에 포함된 콘텐츠는 다음 법령을 근거로 작성됩니다 — 소득세법 §48·§55·§70·§94·§103 (소득세·양도세·퇴직소득세) · 지방세법 §11·§13의2·§111·§128·§150 (취득세·재산세·자동차세·지방교육세) · 주택임대차보호법 §3·§3의2·§8 (임대차) · 은행법 §38·시행령 §24의4 (DSR·대출 규제) · 부가가치세법 §49 (예정 신고).
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (스마트데이터샵).
                  새 가이드는 매월 1~2개 추가됩니다. 알림은 위 RSS 또는 카카오톡 채널 (출시 예정).
                </p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
