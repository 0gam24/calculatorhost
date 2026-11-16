import type { Metadata } from 'next';
import { GuideCalculatorCta } from '@/components/guide/GuideCalculatorCta';
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

const URL = 'https://calculatorhost.com/guide/inherited-house-capital-gains-exemption-5-year-2026/';
const DATE_PUBLISHED = '2026-05-24';
const DATE_MODIFIED = '2026-11-16';

export const metadata: Metadata = {
  title: '상속주택 양도세 2026, 기존주택 팔 때 1세대1주택 비과세 특례',
  description:
    '주택을 상속받아 2주택이 되어도 상속 당시 갖고 있던 기존주택을 팔 때는 1세대1주택 비과세를 받을 수 있습니다. 기한 제한은 없습니다.',
  keywords: [
    '상속주택 양도세',
    '상속주택 1세대1주택',
    '상속 후 주택 양도',
    '상속주택 특례 155조',
    '상속개시일 기준',
    '상속주택 비과세',
    '기존주택 먼저 양도',
    '상속세와 양도세',
    '상속 2주택 양도',
    '소득세법 89',
  ],
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

const FAQ_ITEMS = [
  {
    question: '상속받은 집과 기존 집, 어느 것을 먼저 팔아야 하나요?',
    answer:
      '보통은 기존 주택(상속 당시 이미 갖고 있던 집)을 먼저 파는 쪽이 유리합니다. 기존 주택을 팔 때는 상속주택이 있어도 1주택으로 보아 비과세를 적용받기 때문입니다(소득세법 시행령 §155②). 상속주택을 먼저 팔면 그 양도는 2주택 상태라 과세되고, 남은 기존 주택은 1주택이 되어 일반 1세대1주택 요건을 갖추면 비과세를 받을 수 있습니다.',
  },
  {
    question: '기존주택을 언제까지 팔아야 하나요? 5년 기한이 있나요?',
    answer:
      '기한은 없습니다. 소득세법 시행령 §155②는 상속주택과 일반주택을 각각 1채씩 가진 1세대가 일반주택을 양도하면 1주택으로 본다고만 정하고, 양도 기한을 두지 않습니다. 신규 주택 취득 후 3년 안에 종전 주택을 팔아야 하는 일시적 2주택 특례(§155①)와 다른 점입니다. 상속과 관련해 5년이 쓰이는 곳은 상속주택 자체의 다주택 중과 배제나 종합부동산세·취득세의 주택 수 계산 같은 다른 규정입니다.',
  },
  {
    question: '상속주택은 양도세 비과세 대상이 아니라는데, 어떤 의미인가요?',
    answer:
      '이 특례는 기존 주택(상속개시 당시 이미 갖고 있던 주택)을 팔 때만 적용된다는 뜻입니다(소득세법 시행령 §155②). 기존 주택과 상속주택을 함께 가진 상태에서 상속주택을 먼저 팔면 2주택 양도로 과세됩니다. 다만 기존 주택을 먼저 팔아 상속주택 1채만 남았다면, 그 상속주택도 일반 1세대1주택 요건(보유 2년 등)을 갖추면 비과세를 받을 수 있습니다.',
  },
  {
    question: '기존주택의 보유·거주 기간은 어떻게 계산되나요?',
    answer:
      '기존주택은 상속과 무관하게 원래 1세대1주택 비과세 조건을 만족해야 합니다. 즉, 기존주택 보유 2년 이상(조정대상지역 취득 시 거주 2년 추가)이 필수입니다. 또 상속개시 당시 이미 보유한 주택이어야 하며, 상속받은 뒤에 새로 산 주택이나 상속개시일 전 2년 이내에 피상속인에게서 증여받은 주택은 이 특례의 기존주택에 해당하지 않습니다.',
  },
  {
    question: '부모가 상속한 주택 2채가 있으면 어떻게 되나요?',
    answer:
      '피상속인이 주택을 2채 이상 남겼다면 그중 1채만 이 특례의 상속주택으로 봅니다. 피상속인이 소유한 기간이 가장 긴 주택이 우선이고, 같으면 거주한 기간이 가장 긴 주택입니다(소득세법 시행령 §155②). 나머지 상속주택은 일반 주택으로 계산되어 기존주택을 팔 때 비과세를 받기 어렵습니다.',
  },
  {
    question: '배우자와 함께 상속받으면 배우자의 비과세도 가능한가요?',
    answer:
      '주택 수는 세대 단위로 셉니다. 부부는 같은 세대이므로 부부가 가진 주택을 합쳐 기존주택 1채와 상속주택 1채인 경우에 특례가 적용됩니다. 또 상속인과 피상속인이 상속개시 당시 같은 세대였다면 원칙적으로 이 특례를 적용하지 않습니다. 다만 1주택을 가진 자녀가 60세 이상 부모를 모시려고 세대를 합친 경우로서 합치기 전부터 부모가 갖고 있던 주택은 상속주택으로 인정합니다(§155② 단서).',
  },
  {
    question: '상속주택을 먼저 팔면 세금은 어떻게 되나요?',
    answer:
      '기존주택과 상속주택을 모두 가진 상태에서 상속주택을 팔면 2주택 양도로 양도세가 과세됩니다. 상속주택의 취득가액은 상속개시일 현재 상속세 평가액이므로, 상속 직후에 팔면 양도차익이 작아 세금이 크지 않을 수 있습니다. 다주택 중과 여부와 상속주택 중과 배제 요건은 양도 시점의 법령에 따라 달라지므로 양도 전에 확인이 필요합니다.',
  },
];

export default function InheritedHouseCapitalGainsExemptionGuide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '상속주택 양도세 1세대1주택 비과세 특례' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '상속주택 양도세 1세대1주택 비과세 특례 2026',
    description:
      '상속주택과 기존주택을 함께 보유할 때 기존주택 양도 비과세 요건·양도 순서·12억 한도·공동상속 처리·세금 사례.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['상속주택', '양도세', '상속주택 특례', '1세대1주택', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '상속주택 양도세 1세대1주택 비과세 특례 2026',
    description:
      '상속 후 기존주택 양도 시 1세대1주택 비과세·양도 순서·12억 한도·공동상속.',
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
                    { name: '상속주택 양도세 1세대1주택 비과세 특례' },
                  ]}
                />
                <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">
                  상속주택 양도세 1세대1주택 비과세 특례 2026
                </h1>
                <p className="mt-3 text-lg text-text-secondary" data-speakable>
                  부모가 남긴 주택을 상속받았는데, 기존에 살던 집까지 함께 보유하게 될 때 적용되는 특례를 정확히
                  정리합니다. 상속 당시 이미 갖고 있던 기존 주택을 양도하면 상속주택이 있어도 1세대1주택 비과세를 받을 수 있습니다
                  (소득세법 §89, 시행령 §155②). 양도 기한은 없으며, 어떤 주택이 기존 주택과 상속주택에 해당하는지와
                  양도 순서가 핵심입니다. 이 글은 처음에 5년 기한이 있는 것처럼 잘못 적었고 2026-11-16에 바로잡았습니다.
                </p>
              </header>
              <GuideCalculatorCta slug="inherited-house-capital-gains-exemption-5-year-2026" />

              {/* 1. 정의 및 Structured Summary */}
              <section aria-label="특례 정의 및 핵심 요약" className="card">
                <h2 className="mb-4 text-2xl font-semibold">상속주택 양도세 특례란?</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  상속주택 양도세 특례는 피상속인 사망 후 기존 주택과 함께 상속주택을 보유하게 되는 경우, 기존 주택에
                  한해서 1세대1주택 비과세를 적용하는 제도입니다(소득세법 §89 ① 3호, 시행령 §155②). 기존 주택을
                  양도할 때 1주택으로 보므로 양도가 12억 원 이하면 비과세됩니다. 상속은 본인 의사와 무관하게
                  생기므로, 상속 때문에 2주택이 된 사람을 보호하려는 특례입니다.
                </p>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <caption className="sr-only">상속주택 양도세 특례 핵심 정보</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">항목</th>
                        <th className="py-2 font-semibold">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4 font-semibold">대상</td>
                        <td className="py-2">기존주택 (상속주택 제외)</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4 font-semibold">양도 기한</td>
                        <td className="py-2">없음 (일시적 2주택 3년과 다름)</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4 font-semibold">비과세 한도</td>
                        <td className="py-2">양도가 12억 원 이하</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4 font-semibold">보유 기간 조건</td>
                        <td className="py-2">기존주택 2년 이상 (조정지역은 거주 2년 추가)</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-semibold">법적 근거</td>
                        <td className="py-2">소득세법 §89·§94, 시행령 §154·§155</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 2. 핵심 3가지 조건 */}
              <section aria-label="비과세 필수 조건" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-semibold">상속주택 양도세 비과세 3가지 필수 조건</h2>
                <ol className="list-inside list-decimal space-y-4 text-text-secondary" data-speakable>
                  <li>
                    <strong>① 상속개시 당시 보유한 기존주택 양도</strong>: 상속개시일에 이미 갖고 있던 주택을
                    양도해야 합니다(소득세법 시행령 §155②). 상속 후에 새로 산 주택과 상속개시일 전 2년 이내에
                    피상속인에게서 증여받은 주택은 제외됩니다. 양도 기한은 없습니다.
                  </li>
                  <li>
                    <strong>② 기존주택 보유 2년 이상</strong>: 기존 주택은 원래 1세대1주택 비과세 조건을
                    충족해야 합니다. 즉, 취득일부터 양도일까지 만 2년 이상 보유해야 합니다(소득세법 §89, 시행령
                    §154). 조정대상지역에서 취득한 기존주택이면 추가로 거주 2년도 필요합니다.
                  </li>
                  <li>
                    <strong>③ 양도가 12억 원 이하</strong>: 기존 주택의 양도가액이 12억 원 이하여야 비과세됩니다
                    (소득세법 §89 ① 3호). 12억 초과 시 비례 과세 공식이 적용되며, 상속주택은 비과세 대상에서
                    제외됩니다.
                  </li>
                </ol>
              </section>

              {/* 3. 양도 순서의 핵심 */}
              <section aria-label="양도 순서 결정" className="card">
                <h2 className="mb-4 text-2xl font-semibold">양도 순서가 절세를 좌우합니다</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  상속 후 2주택을 보유할 때, 어느 주택을 먼저 양도하느냐에 따라 세금이 완전히 달라집니다. 보통은
                  기존 주택(상속 전부터 소유하던 집)을 먼저 양도하는 쪽이 유리합니다. 기존 주택을 팔 때는 상속주택이 있어도
                  1주택으로 보기 때문입니다.
                </p>
                <div className="space-y-3 rounded-lg bg-bg-card p-4 text-sm">
                  <div>
                    <p className="mb-1 font-semibold text-text-primary">유리한 순서: 기존주택 → 상속주택</p>
                    <ul className="list-inside list-disc space-y-0.5 text-text-secondary">
                      <li>기존주택 양도: 1세대1주택 비과세 적용 (12억 이하)</li>
                      <li>상속주택 양도: 1채만 남은 상태라 보유 2년 등 요건을 갖추면 비과세 가능</li>
                      <li>총 세금: 두 주택 모두 비과세를 받을 여지가 있음</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-1 font-semibold text-text-primary">불리할 수 있는 순서: 상속주택 → 기존주택</p>
                    <ul className="list-inside list-disc space-y-0.5 text-text-secondary">
                      <li>상속주택 양도: 2주택 상태의 양도라 과세 (취득가액은 상속 당시 평가액)</li>
                      <li>기존주택 양도: 1주택이 되어 일반 1세대1주택 요건을 갖추면 비과세</li>
                      <li>총 세금: 상속주택 양도세가 발생. 상속 직후라 차익이 작으면 부담이 크지 않을 수 있음</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 4. 5년 기한 계산 */}
              <section aria-label="양도 기한과 기준일" className="card">
                <h2 className="mb-4 text-2xl font-semibold">양도 기한은 없고, 기준일은 상속개시일</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  기존 주택을 언제까지 팔아야 한다는 기한은 없습니다(소득세법 시행령 §155②). 다만 어떤 집이 기존 주택인지는
                  피상속인이 사망한 날(상속개시일)을 기준으로 판단합니다. 상속등기일이나 지분 분할일이 아닙니다.
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-2">
                    <strong className="text-text-primary">사례: 부친 사망 2021년 1월 1일</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>2021년 1월 1일 현재 갖고 있던 집: 기존 주택 (특례 대상)</li>
                    <li>2022년에 새로 산 집: 상속 후 취득이라 특례 대상 아님</li>
                    <li>기존 주택 양도일: 2025년이든 2030년이든 보유 2년 등 요건을 갖추면 비과세</li>
                  </ul>
                </div>
              </section>

              {/* 5. 실제 사례 시뮬 */}
              <section aria-label="실제 사례 시뮬레이션" className="card">
                <h2 className="mb-4 text-2xl font-semibold">실제 사례 3개, 양도가 11억 / 15억 / 20억</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  아래 사례들은 모두 기존주택을 먼저 양도하는 경우를 가정합니다. 상속개시 당시 보유한 기존주택이고 보유
                  2년 이상을 충족한 상황입니다. 세액은 장기보유특별공제와 지방소득세를 넣지 않은 단순 계산입니다.
                </p>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <caption className="sr-only">상속주택 특례 사례별 양도세 계산</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">사례</th>
                        <th className="py-2 pr-4 font-semibold">양도가</th>
                        <th className="py-2 pr-4 font-semibold">취득가</th>
                        <th className="py-2 pr-4 font-semibold">양도차익</th>
                        <th className="py-2 font-semibold">비과세 여부</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4">1번</td>
                        <td className="py-2 pr-4">11억</td>
                        <td className="py-2 pr-4">5억</td>
                        <td className="py-2 pr-4">6억</td>
                        <td className="py-2 font-semibold text-primary-600">전액 비과세</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4">2번</td>
                        <td className="py-2 pr-4">15억</td>
                        <td className="py-2 pr-4">7억</td>
                        <td className="py-2 pr-4">8억</td>
                        <td className="py-2">초과분 비례 과세</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">3번</td>
                        <td className="py-2 pr-4">20억</td>
                        <td className="py-2 pr-4">6억</td>
                        <td className="py-2 pr-4">14억</td>
                        <td className="py-2">초과분 비례 과세</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 space-y-4 rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <div>
                    <p className="mb-2 font-semibold text-text-primary">사례 1: 양도가 11억 (12억 이하)</p>
                    <ul className="list-inside list-disc space-y-1">
                      <li>조건: 상속개시 당시 보유한 기존주택, 보유 2년 이상</li>
                      <li>결과: 양도차익 6억 전액 비과세 → 양도세 0원</li>
                      <li>절세 효과: 비과세 미적용(전체 과세) 시 대비 약 2억 1,500만 원 절세</li>
                    </ul>
                  </div>

                  <div>
                    <p className="mb-2 font-semibold text-text-primary">사례 2: 양도가 15억 (12억 초과)</p>
                    <ul className="list-inside list-disc space-y-1">
                      <li>초과분: 15억 − 12억 = 3억</li>
                      <li>과세 비율: 3억 ÷ 15억 = 20%</li>
                      <li>과세 양도차익: 8억 × 20% = 1.6억</li>
                      <li>누진세 적용: 과세표준 (1.6억 − 기본공제 250만) × 38% − 누진공제 1,994만 ≈ 약 3,991만 원 양도세</li>
                      <li>절세 효과: 비과세 미적용(전체 과세) 시 대비 약 2억 5,910만 원 절세</li>
                    </ul>
                  </div>

                  <div>
                    <p className="mb-2 font-semibold text-text-primary">사례 3: 양도가 20억 (12억 초과)</p>
                    <ul className="list-inside list-disc space-y-1">
                      <li>초과분: 20억 − 12억 = 8억</li>
                      <li>과세 비율: 8억 ÷ 20억 = 40%</li>
                      <li>과세 양도차익: 14억 × 40% = 5.6억</li>
                      <li>누진세 적용: 과세표준 (5.6억 − 기본공제 250만) × 42% − 누진공제 3,594만 ≈ 약 1억 9,821만 원 양도세</li>
                      <li>절세 효과: 비과세 미적용(전체 과세) 시 대비 약 3억 6,470만 원 절세</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 6. FAQ */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 7. 공동상속 처리 */}
              <section aria-label="공동상속 처리" className="card">
                <h2 className="mb-4 text-2xl font-semibold">공동상속, 지분이 가장 큰 사람의 주택으로 봅니다</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  한 주택을 여러 상속인이 지분으로 나눠 상속받으면(공동상속주택), 상속지분이 가장 큰 상속인의 주택으로 봅니다.
                  지분이 작은 상속인은 자기 기존 주택을 팔 때 공동상속주택을 주택 수에서 빼고 판단합니다
                  (소득세법 시행령 §155③).
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-2">
                    <strong className="text-text-primary">공동상속 사례</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>부친 사망 → 부친 주택을 형 60%, 동생 40%로 상속</li>
                    <li>공동상속주택은 지분이 큰 형의 주택으로 봄</li>
                    <li>동생: 자기 기존 주택을 팔 때 공동상속주택 지분은 주택 수에서 제외, 1세대1주택 비과세 판단</li>
                    <li>형: 기존 주택과 상속주택 각 1채로 보아 §155② 특례로 기존 주택 비과세 판단</li>
                    <li>지분이 같으면 그 주택에 거주하는 사람, 최연장자 순으로 정함</li>
                  </ul>
                </div>
              </section>

              {/* 8. 상속주택 자체는 비과세 대상이 아님 */}
              <section aria-label="상속주택 비과세 불가" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-semibold">주의: 2주택 상태에서 상속주택을 팔면 과세됩니다</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  이 특례는 기존 주택(상속 전부터 소유하던 주택)을 팔 때만 적용됩니다. 기존 주택과 상속주택을 모두 가진
                  상태에서 상속주택을 팔면 2주택 양도로 과세됩니다. 다주택 중과 여부는 양도 시점의 법령을 확인해야 합니다.
                </p>
                <div className="space-y-2 text-sm text-text-secondary">
                  <p>
                    <strong className="text-text-primary">2주택 상태에서 상속주택을 양도:</strong> 비과세 적용 불가, 일반
                    2주택 양도세
                  </p>
                  <p>
                    <strong className="text-text-primary">2주택 상태에서 기존주택을 양도:</strong> 1세대1주택 비과세 적용
                  </p>
                  <p>
                    <strong className="text-text-primary">기존주택 양도 후 남은 상속주택을 양도:</strong> 기존주택은
                    비과세, 상속주택은 1주택만 남으므로 보유 2년 등 일반 요건을 갖추면 비과세 가능
                  </p>
                </div>
              </section>

              {/* 9. 거주 요건 */}
              <section aria-label="거주 요건" className="card">
                <h2 className="mb-4 text-2xl font-semibold">거주 요건, 기존주택 기준</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  기존 주택은 원래 1세대1주택 비과세 조건을 그대로 충족해야 합니다. 비조정대상지역에서 취득한 기존주택은
                  거주 요건이 없고, 조정대상지역에서 취득한 주택(2017년 8월 3일 이후)은 보유 2년 + 거주 2년을
                  모두 만족해야 합니다(소득세법 시행령 §154).
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-2">
                    <strong className="text-text-primary">거주 입증 자료</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>주민등록등본 (취득 후 이전하여 같은 주소 2년 이상 거주)</li>
                    <li>공과금 명세 (전기·가스·수도 요금 납부)</li>
                    <li>관리비 납부 내역, 우편물 수령 기록</li>
                  </ul>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  주의: 거주 기간은 기존 주택에 실제로 전입해 산 기간으로 따집니다. 주민등록만 옮기고 실제로 살지 않았다면
                  거주 기간으로 인정받지 못할 수 있습니다.
                </p>
              </section>

              {/* 10. 장기보유공제와의 관계 */}
              <section aria-label="장기보유공제" className="card">
                <h2 className="mb-4 text-2xl font-semibold">장기보유공제 동시 적용 가능</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  기존주택이 12억 초과하여 비례 과세되거나, 보유 10년 이상이면 장기보유공제 최대 80%를 동시에 적용할
                  수 있습니다(소득세법 §95). 보유 연 4% × 최대 10년 = 40% + 거주 연 4% × 최대 10년 = 40% = 합
                  80%.
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-2">
                    <strong className="text-text-primary">사례: 양도가 15억, 보유 12년 + 거주 10년</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>양도차익 8억 → 비례 과세 → 과세 양도차익 1.6억</li>
                    <li>장기보유공제 80% 적용 → 양도소득금액 3,200만 (1.6억 × 20%)</li>
                    <li>기본공제 250만 차감 후 과세표준 2,950만, 누진 15% 구간 → 약 316만 원 양도세 + 지방세</li>
                    <li>장기보유공제 미적용 시 약 3,991만 원과 비교 → 약 3,675만 원 절세</li>
                  </ul>
                </div>
              </section>

              {/* 11. 주의사항 */}
              <section aria-label="주의사항" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-semibold">주의사항 5가지</h2>
                <ul className="list-inside list-disc space-y-2 text-sm text-text-secondary">
                  <li>
                    <strong>양도 기한은 없음</strong>: 기존 주택 여부는 상속개시일(사망일) 기준으로 판단. 상속등기나
                    지분 분할일이 아님.
                  </li>
                  <li>
                    <strong>기존주택을 먼저 양도하는 쪽이 유리</strong>: 2주택 상태에서 상속주택을 먼저 팔면 그 양도는
                    과세.
                  </li>
                  <li>
                    <strong>상속 후 새로 산 집은 특례 대상 아님</strong>: 상속개시 당시 보유한 주택만 기존 주택으로 인정.
                  </li>
                  <li>
                    <strong>기존주택 보유·거주 기간 재확인</strong>: 원래 1세대1주택 조건(보유 2년 등)
                    필수.
                  </li>
                  <li>
                    <strong>공동상속인과 지분 확인</strong>: 공동상속주택은 지분이 가장 큰 사람의 주택으로 보므로 지분 비율
                    확인 필수.
                  </li>
                </ul>
              </section>

              {/* 12. 관련 계산기·가이드 */}
              <section aria-label="관련 계산기·가이드" className="card">
                <h2 className="mb-4 text-2xl font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-text-secondary">
                  <li>
                    →{' '}
                    <Link href="/calculator/capital-gains-tax/" className="text-primary-600 underline dark:text-primary-500">
                      양도소득세 계산기
                    </Link>{' '}
, 상속주택 및 기존주택 양도세 상세 계산
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/one-household-12-billion-exemption/" className="text-primary-600 underline dark:text-primary-500">
                      1세대1주택 12억 한도 정리
                    </Link>{' '}
, 비례 과세 공식·거주 요건·장기보유공제
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/temporary-two-houses-capital-gains-exemption/" className="text-primary-600 underline dark:text-primary-500">
                      일시적 2주택 양도세 비과세 3년
                    </Link>{' '}
, 신규 주택 취득 후 기존 주택 매도 특례
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/inheritance-tax-10-year-prior-gift-aggregation/" className="text-primary-600 underline dark:text-primary-500">
                      상속세 사전 증여 합산 10년
                    </Link>{' '}
, 상속과 증여의 통합 절세 전략
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/long-term-holding-special-deduction-80-percent/" className="text-primary-600 underline dark:text-primary-500">
                      장기보유특별공제 80% 활용법
                    </Link>{' '}
, 10년 보유·거주 시 최대 절감
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="상속주택 양도세 1세대1주택 비과세 특례 2026"
                url={URL}
                description="상속 후 기존주택 양도 시 비과세·양도 순서·12억 한도·공동상속 처리."
              />

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §89 (1세대1주택 비과세) · §94 (양도소득) · §95 (장기보유특별공제)
                  · 시행령 §154 (1세대1주택 범위·거주 요건) · §155 (일시적 2주택·상속주택 특례) · §155②
                  (상속주택 양도 특례) · 상속세 및 증여세법 §3 (상속개시일). 참고: <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">홈택스</a>,{' '}
                  <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청</a>,{' '}
                  <a href="https://www.law.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">법령정보센터</a>.
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 일반 정보 제공 목적이며 세무·법적 조언이 아닙니다. 상속세
                  신고, 지분 분할, 다중상속인 처리 등 개별 사정에 따라 적용이 달라지므로 반드시 세무사 또는 국세청
                  상담을 통해 확정하시기 바랍니다.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (스마트데이터샵).
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
