import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FaqSection } from '@/components/calculator/FaqSection';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/beotimok-jeonse-loan-conditions-2026/';
const DATE_PUBLISHED = '2026-08-17';
const DATE_MODIFIED = '2026-08-17';
// [revenue-lever: indexing+traffic]

export const metadata: Metadata = {
  title: '버팀목 전세자금대출 2026, 소득·자산·한도 조건 총정리',
  description:
    '버팀목 전세자금대출은 무주택 세대주를 위한 주택도시기금 정책상품입니다. 소득·자산 요건, 대상주택, 한도와 금리, 청년버팀목 차이, 신청 절차를 2026년 기준으로 정리했습니다.',
  keywords: [
    '버팀목 전세자금대출',
    '청년버팀목 전세대출',
    '버팀목 대출 조건',
    '버팀목 소득 기준',
    '주택도시기금 전세대출',
    '전세대출 한도 금리',
    '주택도시기금법',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '버팀목 전세자금대출 2026' }],
    title: '버팀목 전세자금대출 2026, 조건과 한도 총정리',
    description:
      '무주택 세대주를 위한 주택도시기금 전세대출. 소득·자산 요건, 한도·금리, 청년버팀목 차이, 신청 절차.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '버팀목 전세자금대출 2026, 조건과 한도',
    description: '무주택 세대주 대상 주택도시기금 전세대출. 소득·자산 요건, 한도·금리, 신청 절차 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '버팀목 전세자금대출은 누가 받을 수 있나요?',
    answer:
      '무주택 세대주이면서 부부합산 소득·자산 요건을 충족하는 사람이 대상입니다. 대출 신청일 기준 세대주와 세대원 전원이 무주택이어야 하고, 임대차계약을 체결하고 보증금의 5% 이상을 지급한 상태여야 합니다. 구체적 요건은 주택도시기금 포털에서 최신 기준을 확인하세요.',
  },
  {
    question: '소득 기준은 얼마인가요?',
    answer:
      '일반 버팀목은 부부합산 연소득 5천만원 이하가 기준입니다. 신혼가구·2자녀 이상·청년 등은 소득 기준이 완화됩니다. 소득 외에 순자산 기준(2026년 기준 약 3억원대)도 함께 충족해야 합니다. 요건은 매년 조정되므로 신청 전 공식 포털에서 확인이 필요합니다.',
  },
  {
    question: '한도는 얼마까지 되나요?',
    answer:
      '가구 유형과 지역, 보증금 규모에 따라 한도가 다릅니다. 일반 가구보다 청년·신혼·다자녀 가구의 한도가 더 높게 설정됩니다. 보증금의 일정 비율(대체로 70~80%) 이내에서 상한 금액과 비교해 낮은 쪽이 실제 한도가 됩니다. 정확한 한도는 소득·보증금·지역을 넣어 포털에서 조회하세요.',
  },
  {
    question: '금리는 몇 퍼센트인가요?',
    answer:
      '소득 구간과 보증금 규모에 따라 차등 적용되며, 일반 시중 전세대출보다 낮은 정책 금리입니다. 기초생활수급자·한부모·다자녀·신혼 등은 우대금리가 추가돼 실효 금리가 더 내려갑니다. 금리는 수시로 변동하므로 신청 시점의 고시 금리를 확인해야 합니다.',
  },
  {
    question: '청년버팀목과 일반 버팀목은 뭐가 다른가요?',
    answer:
      '청년버팀목은 만 19세 이상 34세 이하 청년 단독세대 등을 위한 유형으로, 일반 버팀목보다 금리 우대와 한도 면에서 유리하게 설계됩니다. 나이·소득 요건을 충족하면 청년 유형이 대체로 더 유리하므로, 두 유형의 조건을 비교해 선택하세요.',
  },
  {
    question: '신청은 어디서 하나요?',
    answer:
      '주택도시기금 수탁은행(우리·국민·신한·농협·하나 등) 영업점 또는 기금e든든에서 신청합니다. 임대차계약 체결 후 잔금 지급일과 전입일 중 빠른 날부터 3개월 이내에 신청하는 것이 일반적입니다. 기한을 넘기면 대상에서 제외될 수 있으니 일정 관리가 중요합니다.',
  },
  {
    question: '집주인 동의나 대상주택 조건이 있나요?',
    answer:
      '대상주택은 전용면적과 보증금 상한 요건이 있습니다. 임차 전용면적 85제곱미터 이하(일부 지역·가구는 완화), 보증금 상한 이내 주택이 대상이며, 오피스텔도 주거용이면 가능한 경우가 있습니다. 확정일자와 전입신고, 임대인 협조가 필요한 경우가 있으니 계약 전 확인하세요.',
  },
];

export default function BeotimokJeonseLoanConditions2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '버팀목 전세자금대출 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '버팀목 전세자금대출 2026, 소득·자산·한도 조건 총정리',
    description:
      '무주택 세대주를 위한 주택도시기금 버팀목 전세자금대출의 소득·자산 요건, 대상주택, 한도·금리, 청년버팀목 차이, 신청 절차를 2026년 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['버팀목 전세자금대출', '청년버팀목', '주택도시기금', '전세대출 조건', '소득 기준', '한도'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '버팀목 전세자금대출 2026',
    description:
      '버팀목 전세자금대출의 소득·자산 요건, 한도·금리, 청년버팀목 차이, 신청 절차를 정리한 실전 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd([...FAQ_ITEMS]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main id="main-content" className="flex-1 px-4 py-8 md:px-8">
            <article className="mx-auto max-w-3xl space-y-8">
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '가이드', href: '/guide/' },
                    { name: '버팀목 전세자금대출 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">청년·임차인 · 8분 읽기 · 2026-08-17</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  버팀목 전세자금대출 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 소득·자산·한도 조건 총정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  전세 계약을 앞두고 목돈이 부족한 무주택자에게 버팀목 전세자금대출은 가장 먼저 검토할 정책상품입니다. 이 글은 처음 전세대출을 알아보는 청년과 신혼부부, 무주택 세대주를 위해 준비했습니다. 누가 받을 수 있는지, 소득·자산 요건과 한도·금리는 어떻게 정해지는지, 청년버팀목과 무엇이 다른지, 신청은 어디서 하는지를 순서대로 정리합니다. 금액·금리 요건은 매년 바뀌므로 정확한 수치는 주택도시기금 포털에서 확인하는 것을 전제로 읽어주세요.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">30초 요약</h2>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심만 먼저</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary list-disc ml-5">
                    <li>대상: 무주택 세대주 + 부부합산 소득·자산 요건 충족.</li>
                    <li>소득: 일반 부부합산 연 5천만원 이하(청년·신혼·다자녀는 완화).</li>
                    <li>금리: 시중보다 낮은 정책 금리 + 우대금리(취약계층·다자녀 등).</li>
                    <li>한도: 가구유형·지역·보증금별 차등, 청년·신혼이 더 유리.</li>
                    <li>신청: 임대차계약 후 잔금·전입일 기준 3개월 이내, 수탁은행·기금e든든.</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">버팀목 전세자금대출이 뭔가요?</h2>
                <p>
                  버팀목 전세자금대출은 정부의 주택도시기금으로 지원하는 저리 전세대출입니다. 주택도시기금법에 근거해 국토교통부가 운용하며, 무주택 서민의 주거 안정을 목적으로 합니다. 시중은행의 일반 전세대출보다 금리가 낮고, 소득·자산 요건을 두어 지원 대상을 서민·청년·신혼 중심으로 좁힌 것이 특징입니다.
                </p>
                <p>
                  일반 전세대출이 신용·담보 중심으로 심사한다면, 버팀목은 무주택 여부와 소득·자산 기준을 먼저 봅니다. 그래서 소득이 높거나 주택을 보유하면 대상에서 제외됩니다. 대신 요건만 맞으면 낮은 금리로 전세 보증금의 상당 부분을 조달할 수 있습니다.
                </p>
                <p>
                  다만 이 상품의 세부 요건은 정책에 따라 매년 바뀝니다. 소득·자산 한도, 대출 한도, 금리는 국토교통부 고시와 기금 운용 계획으로 조정되므로, 이 글의 수치는 방향을 잡는 용도로만 쓰고 실제 신청 전 공식 포털에서 최신 기준을 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">소득·자산 조건은 얼마인가요?</h2>
                <p>
                  일반 버팀목은 부부합산 연소득 5천만원 이하가 기준입니다. 여기에 순자산 기준이 더해져 소득과 자산을 모두 충족해야 합니다. 다만 가구 유형에 따라 소득 기준이 다음처럼 완화됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 가구유형별 소득 기준 (2026년 방향, 실제 수치는 기금 포털 확인)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">가구 유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">부부합산 소득 기준(대체 방향)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">일반 가구</td>
                        <td className="p-3">연 5천만원 이하</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">신혼가구</td>
                        <td className="p-3">완화(대체로 7천만원대 이하)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2자녀 이상</td>
                        <td className="p-3">완화 적용</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">청년 단독세대</td>
                        <td className="p-3">청년 전용 기준 적용</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 표의 완화 기준은 매년 조정됩니다. 특히 신혼·다자녀 기준은 정책 목표에 따라 자주 바뀌므로, 경계선에 있다면 반드시 신청 시점의 고시를 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">한도와 금리는 어떻게 정해지나요?</h2>
                <p>
                  한도는 보증금의 일정 비율과 상한 금액 중 낮은 쪽으로 정해집니다. 대체로 보증금의 70~80% 범위에서 가구유형·지역별 상한과 비교해 실제 대출 가능액이 산정됩니다. 청년·신혼·다자녀 가구는 일반 가구보다 상한이 높게 설계됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 보증금 2억원, 일반 가구</p>
                  <p className="text-sm text-text-secondary">
                    · 보증금: 2억원
                    <br />
                    · 비율 한도(가정 70%): 2억 × 70% = 1억4천만원
                    <br />
                    · 상한 금액과 비교: 둘 중 낮은 금액이 실제 한도
                    <br />
                    <span className="text-xs text-text-tertiary">비율과 상한 중 낮은 쪽이 적용되므로, 상한이 1억이면 최종 한도는 1억이 됩니다. 실제 상한은 포털에서 조회하세요.</span>
                  </p>
                </div>
                <p>
                  금리는 소득 구간과 보증금 규모에 따라 차등 적용됩니다. 소득이 낮을수록, 보증금이 작을수록 금리가 낮아지는 구조입니다. 여기에 기초생활수급자·한부모·다자녀·신혼 등 우대금리가 더해져 실효 금리가 내려갑니다. 다만 금리는 시장 상황에 따라 수시로 변동하므로, 신청 시점 고시 금리가 최종 기준입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">버팀목·디딤돌·일반 전세대출 어떻게 다른가요?</h2>
                <p>
                  세 상품은 목적과 대상이 다릅니다. 아래 비교표로 정리합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 전세·구입 정책대출 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">용도</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">특징</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">버팀목</td>
                        <td className="p-3">전세보증금</td>
                        <td className="p-3">무주택·소득요건, 저리 전세</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">디딤돌</td>
                        <td className="p-3">주택 구입자금</td>
                        <td className="p-3">무주택 구입, 장기 분할상환</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">일반 전세대출</td>
                        <td className="p-3">전세보증금</td>
                        <td className="p-3">소득요건 완화, 금리 상대적 높음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 소득이 기준을 넘어 버팀목 대상이 아니라면 일반 전세대출이나 보증기관 상품을 검토해야 합니다. 반대로 집을 살 계획이라면 전세대출인 버팀목이 아니라 구입자금인 디딤돌을 봐야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신청은 어떻게 하나요?</h2>
                <p>
                  임대차계약을 맺은 뒤 기한 안에 신청하는 것이 핵심입니다. 절차는 다음과 같습니다.
                </p>
                <ol className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li><strong>대상 확인:</strong> 무주택 여부와 소득·자산 요건을 기금 포털에서 사전 확인합니다.</li>
                  <li><strong>계약·계약금:</strong> 임대차계약을 체결하고 보증금의 5% 이상을 지급합니다.</li>
                  <li><strong>신청:</strong> 수탁은행 영업점 또는 기금e든든에서 신청합니다. 잔금 지급일과 전입일 중 빠른 날부터 3개월 이내가 일반적입니다.</li>
                  <li><strong>심사·실행:</strong> 소득·자산·주택 요건 심사 후 잔금일에 맞춰 대출이 실행됩니다.</li>
                  <li><strong>전입·확정일자:</strong> 대항력 확보를 위해 전입신고와 확정일자를 갖춥니다.</li>
                </ol>
                <p>
                  다만 신청 기한을 넘기면 대상에서 제외될 수 있습니다. 계약 단계에서 미리 은행에 상담해 서류와 일정을 확인해 두는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/jeonse-loan-limit-interest-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세자금대출 한도·이자 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">전세대출 전반의 한도와 이자 구조를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/didimdol-loan-conditions-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">디딤돌 구입자금대출 조건</div>
                    <p className="mt-1 text-sm text-text-secondary">집을 살 때 쓰는 정책 구입자금대출.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-guarantee-insurance-hug-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세보증금 반환보증 HUG</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금을 지키는 반환보증 가입법.</p>
                  </Link>
                  <Link
                    href="/guide/youth-monthly-rent-support-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청년 월세 지원 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">전세 대신 월세를 택할 때의 지원제도.</p>
                  </Link>
                  <Link
                    href="/calculator/loan/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">대출이자 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">월 상환액과 총 이자를 미리 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/category/finance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 금융 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">대출·DSR·예적금·전세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 금융 조언이 아닙니다. 버팀목 전세자금대출의 소득·자산 요건, 한도, 금리, 대상주택 기준은 국토교통부 고시와 주택도시기금 운용 계획에 따라 매년 변동됩니다. 본문의 수치는 방향을 잡는 참고용이며, 실제 신청 전 반드시 주택도시기금 포털 또는 수탁은행에서 최신 기준을 확인하세요. 본 콘텐츠는 2026-08-17 기준입니다. 근거: <strong>주택도시기금법</strong> 및 국토교통부 주택도시기금 운용 기준. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://nhuf.molit.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">주택도시기금 포털</a>,{' '}
                  <a href="https://www.lh.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">한국토지주택공사(LH)</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>.
                </p>
              </section>

              <ShareButtons
                title="버팀목 전세자금대출 2026 가이드"
                url={URL}
              />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
