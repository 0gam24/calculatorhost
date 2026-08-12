// [revenue-lever: indexing+traffic]
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

const URL = 'https://calculatorhost.com/guide/comprehensive-real-estate-tax-exclusion-application-2026/';
const DATE_PUBLISHED = '2026-08-04';
const DATE_MODIFIED = '2026-08-04';

export const metadata: Metadata = {
  title: '종부세 합산배제 신고 2026, 9월 16~30일 임대주택 빼는 법',
  description:
    '등록 임대주택이 있는데 종합부동산세 고지서에 그대로 합산돼 세금이 크게 나온다면, 9월 16일부터 30일까지 합산배제 신고를 놓쳤을 가능성이 큽니다. 대상 주택, 신고 기간, 최초 신고 후 변동신고까지 종합부동산세법 §8 기준으로 정리했습니다.',
  keywords: [
    '종부세 합산배제',
    '합산배제 신고 9월',
    '임대주택 종부세 제외',
    '종합부동산세 합산배제 신고',
    '합산배제 임대주택 요건',
    '종부세 절세 임대사업자',
    '종합부동산세법 8조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '종합부동산세 합산배제 신고 2026' }],
    title: '종부세 합산배제 신고 2026, 9월 16~30일 임대주택 빼는 법',
    description: '등록 임대주택을 종부세 과세대상에서 빼는 합산배제 신고. 9월 16~30일 신고 기간과 대상 주택 요건을 종부세법 §8 기준 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '종부세 합산배제 신고 2026, 9월 16~30일 임대주택 제외',
    description: '9월 16~30일 합산배제 신고로 등록 임대주택을 종부세에서 제외. 최초 신고 후 변동 없으면 재신고 불필요. 종부세법 §8.',
  },
};

const FAQ_ITEMS = [
  {
    question: '종부세 합산배제 신고가 정확히 무엇인가요?',
    answer:
      '합산배제 신고는 요건을 갖춘 임대주택 등을 종합부동산세 과세대상에서 빼달라고 신고하는 절차입니다(종합부동산세법 §8③). 등록 임대주택은 과세기준일인 6월 1일 현재 소유하고 있으면 다른 주택과 합산돼 세액이 커지는데, 9월 16일부터 30일까지 합산배제 신고를 하면 그 주택을 과세표준에서 제외해 세 부담을 줄일 수 있습니다.',
  },
  {
    question: '신고 기간은 언제인가요?',
    answer:
      '매년 9월 16일부터 9월 30일까지입니다. 홈택스(hometax.go.kr)에서 전자신고하거나 주소지(본점) 관할 세무서에 합산배제 신고서를 제출하면 됩니다. 이 기간을 놓치면 그해 종부세 고지(12월)에 임대주택이 그대로 합산되어 나올 수 있으므로 기한을 반드시 지켜야 합니다.',
  },
  {
    question: '한 번 신고하면 매년 다시 해야 하나요?',
    answer:
      '아닙니다. 최초로 합산배제 신고를 한 뒤 물건 변동이 없으면 다음 해부터는 다시 신고하지 않아도 됩니다. 다만 임대주택을 추가로 취득했거나, 요건에서 벗어났거나, 소유 현황이 바뀐 경우에는 같은 기간에 변동신고를 해야 합니다. 변동을 신고하지 않으면 실제와 다른 세액이 부과될 수 있습니다.',
  },
  {
    question: '어떤 임대주택이 합산배제 대상인가요?',
    answer:
      '지방자치단체 임대사업자 등록과 세무서 사업자등록을 모두 갖추고, 임대 개시일 당시 공시가격, 임대 의무기간, 임대료 증액 제한(5% 이내) 등 시행령이 정한 요건을 충족한 주택입니다. 요건은 등록 시점과 주택 유형(건설임대·매입임대)에 따라 달라지므로, 개별 주택이 대상인지는 홈택스 안내나 관할 세무서로 확인해야 합니다.',
  },
  {
    question: '임대주택 외에 합산배제되는 것도 있나요?',
    answer:
      '있습니다. 종업원에게 무상이나 저가로 제공하는 사원용 주택, 기숙사, 미분양 주택, 어린이집용 주택, 주택건설사업자의 미분양 등 시행령이 정한 사회정책적 목적의 주택도 합산배제 대상입니다. 이들은 임대주택과 신고서 서식이 다를 수 있으니 유형에 맞는 서식으로 신고하세요.',
  },
  {
    question: '합산배제 신고를 하면 세금이 얼마나 줄어드나요?',
    answer:
      '주택 수와 공시가격에 따라 달라집니다. 예를 들어 거주주택 외 등록 임대주택 2채가 합산되면 과세표준이 커지고 세율 구간도 높아지는데, 합산배제되면 그 임대주택 공시가격이 과세표준에서 빠져 세액이 크게 낮아집니다. 다만 정확한 절감액은 공시가격, 공정시장가액비율, 세율에 따라 다르므로 개별 계산이 필요합니다.',
  },
  {
    question: '의무임대기간을 못 채우면 어떻게 되나요?',
    answer:
      '합산배제로 감면받은 세액이 추징될 수 있습니다. 임대 의무기간 안에 주택을 팔거나 임대를 중단하거나 임대료 증액 제한을 위반하면, 그동안 빠졌던 종부세가 다시 부과됩니다. 따라서 합산배제는 의무기간과 임대료 5% 상한을 끝까지 지킬 수 있을 때 신청하는 것이 안전합니다.',
  },
  {
    question: '거주주택은 종부세를 어떻게 계산하나요?',
    answer:
      '합산배제된 임대주택을 뺀 나머지 주택으로 종부세를 계산합니다. 등록 임대주택이 모두 합산배제되면, 본인이 실제 거주하는 1주택만 남아 1세대1주택자 공제(공시가격 12억 등)를 적용받을 수 있는 경우도 있습니다. 다만 거주주택 특례 요건은 별도이므로 국세청 안내로 확인하세요.',
  },
];

export default function ComprehensiveRealEstateTaxExclusion2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '종부세 합산배제 신고 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '종부세 합산배제 신고 2026, 9월 16~30일 임대주택 빼는 법',
    description:
      '등록 임대주택을 종합부동산세 과세대상에서 제외하는 합산배제 신고. 9월 16~30일 신고 기간, 대상 주택 요건, 최초 신고 후 변동신고, 추징 리스크까지 종부세법 §8 기준 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['종합부동산세', '합산배제', '임대주택', '9월 신고', '임대사업자'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '종부세 합산배제 신고 2026',
    description: '등록 임대주택을 종부세에서 빼는 합산배제 신고의 기간·대상·변동신고를 정리한 가이드.',
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
                    { name: '종부세 합산배제 신고 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">임대사업자·다주택자 · 8분 읽기 · 2026-08-04</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  종부세 합산배제 신고 2026
                  <br />
                  <span className="text-2xl text-text-secondary">9월 16~30일, 임대주택 빼는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 등록 임대주택을 가진 임대사업자와 다주택자를 위해 씁니다. 요건을 갖춘 임대주택은 종합부동산세 과세대상에서 뺄 수 있는데, 그러려면 매년 9월 16일부터 30일까지 합산배제 신고를 해야 합니다. 이 짧은 2주를 놓치면 12월 고지서에 임대주택이 그대로 합산돼 세금이 크게 나옵니다. 신고 대상과 기간, 한 번 신고 후 변동 관리까지 순서대로 정리했습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">합산배제란 무엇인가</h2>
                <p>
                  합산배제는 요건을 갖춘 주택을 종부세 과세표준에서 빼는 제도입니다. 종합부동산세법 §8③은 임대주택, 사원용 주택 등 일정 요건을 갖춘 주택을 과세표준 합산에서 제외하도록 정하고 있습니다. 종부세는 사람별로 보유 주택 공시가격을 모두 더해 과세표준을 만드는데, 임대주택이 여기서 빠지면 과세표준이 줄고 세율 구간도 낮아져 세액이 내려갑니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary list-disc ml-5">
                    <li>과세기준일: 6월 1일 현재 소유자</li>
                    <li>신고 기간: 9월 16일 ~ 9월 30일</li>
                    <li>신고처: 홈택스 전자신고 또는 관할 세무서</li>
                    <li>최초 신고 후 변동 없으면 재신고 불필요</li>
                    <li>근거: 종합부동산세법 §8③</li>
                  </ul>
                </div>
                <p>
                  다만 합산배제는 신고를 해야 적용됩니다. 자동으로 빠지지 않으므로, 요건을 갖춘 임대주택이 있어도 신고하지 않으면 과세대상에 그대로 남습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신고 기간은 언제이고 어디에 하나요?</h2>
                <p>
                  9월 16일부터 30일까지, 홈택스나 관할 세무서에 신고합니다. 이 2주가 합산배제의 유일한 정기 신고 창구입니다. 홈택스에서 전자신고하면 대상 물건이 조회되어 편리하고, 서면으로는 임대주택 합산배제 신고서를 주소지(법인은 본점) 관할 세무서에 제출합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 종부세 합산배제 신고 주요 일정</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">단계</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">시기</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">과세기준일</td>
                        <td className="p-3">6월 1일</td>
                        <td className="p-3">이날 소유자에게 종부세 과세</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">합산배제 신고</td>
                        <td className="p-3">9월 16~30일</td>
                        <td className="p-3">임대주택 등 과세표준 제외 신고</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">고지·납부</td>
                        <td className="p-3">12월 1~15일</td>
                        <td className="p-3">합산배제 반영된 고지서로 납부</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  예외: 신고 기한을 놓쳐 임대주택이 합산돼 고지된 경우, 납부 후 경정청구 등으로 바로잡을 여지가 있으나 절차가 번거롭습니다. 처음부터 9월 기한 안에 신고하는 것이 가장 확실합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">한 번 신고하면 매년 다시 해야 하나요?</h2>
                <p>
                  변동이 없으면 다시 하지 않아도 됩니다. 최초 합산배제 신고 이후 소유·임대 현황에 변화가 없으면 이후 연도는 별도 신고 없이 계속 합산배제가 적용됩니다. 반대로 변화가 생기면 같은 9월 기간에 변동신고를 해야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>추가 취득:</strong> 합산배제 대상 임대주택을 새로 등록했다면 추가 신고.</li>
                  <li><strong>요건 이탈:</strong> 임대 중단, 매도, 임대료 5% 초과 인상 등으로 요건을 벗어나면 제외 신고.</li>
                  <li><strong>현황 변경:</strong> 임차인·임대료·용도 등 신고 내용이 바뀌면 변동신고.</li>
                </ul>
                <p>
                  다만 변동을 신고하지 않고 그대로 두면 실제와 다른 세액이 부과되거나, 요건 이탈분에 대해 추징이 발생할 수 있으니 변화가 있을 때마다 챙겨야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떤 주택이 합산배제되나요?</h2>
                <p>
                  등록 임대주택과 사회정책 목적 주택이 대상입니다. 크게 두 갈래로 나뉩니다. 하나는 지자체·세무서에 등록하고 임대 의무기간, 공시가격, 임대료 5% 증액 제한 등 요건을 갖춘 임대주택이고, 다른 하나는 사원용 주택, 기숙사, 어린이집용 주택, 미분양 주택 등 사회정책적 목적의 주택입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 합산배제 주택 유형 (개요)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">예시</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">핵심 요건</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">합산배제 임대주택</td>
                        <td className="p-3">매입·건설임대</td>
                        <td className="p-3">등록·의무기간·임대료 5% 제한</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">사원용 주택 등</td>
                        <td className="p-3">사택·기숙사</td>
                        <td className="p-3">무상·저가 제공, 규모 기준</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">기타 정책 주택</td>
                        <td className="p-3">어린이집·미분양</td>
                        <td className="p-3">용도·기간 요건</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 임대주택 요건은 등록 시점(연도)과 주택 유형에 따라 공시가격 상한, 의무임대기간이 다르게 적용되어 매우 복잡합니다. 개별 주택이 대상인지는 홈택스 조회 결과와 관할 세무서 확인을 함께 받는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">합산배제 효과, 사례로 보기</h2>
                <p>
                  거주주택 1채와 등록 임대주택이 함께 있을 때 합산배제 신고 여부가 세 부담을 어떻게 가르는지 단계로 살펴봅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 신고 안 함 (합산)</p>
                  <p className="text-sm text-text-secondary">
                    · 거주주택 공시 10억 + 등록 임대주택 2채 공시 6억
                    <br />
                    · 합산 과세표준 기준: 공시 16억 전부 합산
                    <br />
                    · 결과: 높은 세율 구간 적용, 다주택 판정 가능성
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 9월 합산배제 신고 (제외)</p>
                  <p className="text-sm text-text-secondary">
                    · 임대주택 2채(공시 6억) 과세표준에서 제외
                    <br />
                    · 남는 과세대상: 거주주택 공시 10억만
                    <br />
                    · 결과: 과세표준 축소, 1주택 공제 적용 여지
                  </p>
                </div>
                <p>
                  다만 위 수치는 이해를 돕는 가정이며 실제 세액은 공정시장가액비율, 세율, 1세대1주택 공제 적용 여부에 따라 달라집니다. 정확한 절감액은 종부세 계산기와 국세청 안내로 확인하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/calculator/comprehensive-property-tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">종합부동산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">공시가격을 넣어 종부세를 시뮬레이션하세요.</p>
                  </Link>
                  <Link href="/guide/comprehensive-real-estate-tax-who-pays-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">종부세 누가 내나 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">1주택 12억·다주택 9억 공제와 과세기준일.</p>
                  </Link>
                  <Link href="/guide/comprehensive-real-estate-tax-single-house-credit-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">1세대1주택 세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">고령자·장기보유 공제로 종부세 줄이기.</p>
                  </Link>
                  <Link href="/guide/housing-rental-business-registration-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">주택임대사업자 등록</div>
                    <p className="mt-1 text-sm text-text-secondary">등록 요건과 세제 혜택·의무를 한눈에.</p>
                  </Link>
                  <Link href="/guide/housing-rental-income-separate-taxation/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">주택임대소득 분리과세</div>
                    <p className="mt-1 text-sm text-text-secondary">2천만원 이하 임대소득 세금 계산법.</p>
                  </Link>
                  <Link href="/category/tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·재산세·종부세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 합산배제 임대주택 요건(등록 시점별 공시가격 상한, 의무임대기간, 임대료 제한)은 매우 복잡하고 개별 사실관계에 따라 달라집니다. 대상 여부, 신고 방법, 추징 가능성은 반드시 홈택스 조회와 관할 세무서, 국세청 상담(126)으로 확인하세요. 본 콘텐츠는 2026-08-04 기준이며 관련 법령은 <strong>종합부동산세법 §8</strong> 및 같은 법 시행령을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 합산배제 신고 안내</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스 전자신고</a>.
                </p>
              </section>

              <ShareButtons title="종부세 합산배제 신고 2026 가이드" url={URL} />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
