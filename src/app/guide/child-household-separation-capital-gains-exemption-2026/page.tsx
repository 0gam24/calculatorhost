// [revenue-lever: indexing+traffic]
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/child-household-separation-capital-gains-exemption-2026/';
const DATE_PUBLISHED = '2026-07-28';
const DATE_MODIFIED = '2026-07-28';

export const metadata: Metadata = {
  title: '자녀 세대분리 1세대1주택 비과세 2026, 30세 미만 소득요건',
  description:
    '자녀를 세대분리하면 1세대1주택 양도세 비과세를 각각 받을 수 있지만, 30세 미만은 소득요건을 충족해야 인정됩니다. 소득세법 시행령 제152조의3 세대 요건과 실질 판단 기준, 서류상 분리의 함정까지 정리했습니다.',
  keywords: [
    '자녀 세대분리',
    '세대분리 소득요건',
    '1세대1주택 비과세 세대분리',
    '30세 미만 세대분리',
    '세대분리 양도세',
    '소득세법 시행령 152조의3',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '자녀 세대분리 1세대1주택 비과세 2026, 30세 미만 소득요건',
      },
    ],
    title: '자녀 세대분리 1세대1주택 비과세 2026, 30세 미만 소득요건과 실질 판단',
    description:
      '자녀를 세대분리하면 부모와 자녀가 각각 1세대1주택 비과세를 받을 수 있지만, 30세 미만은 중위소득 40% 이상의 소득요건을 충족해야 인정됩니다. 소득세법 시행령 제152조의3 기준.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '자녀 세대분리 1세대1주택 비과세 2026, 30세 미만 소득요건',
    description:
      '30세 미만 자녀는 중위소득 40% 이상 소득이 있어야 별도 세대로 인정되어 각자 1세대1주택 비과세를 받습니다. 소득세법 시행령 §152의3.',
  },
};

const FAQ_ITEMS = [
  {
    question: '자녀를 세대분리하면 무조건 양도세 비과세가 되나요?',
    answer:
      '아닙니다. 자녀가 별도 세대로 인정되어야 부모와 자녀가 각자 1세대1주택 비과세를 받을 수 있습니다(소득세법 §88제6호, §89①제3호). 30세 미만 미혼 자녀는 소득세법 시행령 §152의3의 소득요건을 충족해야 별도 세대로 인정되며, 서류상 주소만 옮긴 위장 분리는 국세기본법 §14 실질과세 원칙에 따라 부인될 수 있습니다.',
  },
  {
    question: '30세 미만 자녀는 세대분리가 아예 불가능한가요?',
    answer:
      '가능은 하지만 조건이 붙습니다. 소득세법 시행령 §152의3제3호에 따라 기준 중위소득 40% 이상의 소득으로 주택·토지를 관리하고 독립된 생계를 유지할 수 있어야 합니다. 근로소득, 사업소득, 임대소득 등 경상·반복적으로 발생하는 소득이 인정되며, 일시적 아르바이트나 부모 용돈은 제외되는 경향입니다. 단, 미성년자는 이 요건으로 인정되지 않습니다.',
  },
  {
    question: '결혼한 자녀는 나이와 소득 무관하게 세대분리가 되나요?',
    answer:
      '네, 혼인한 자녀는 나이·소득과 무관하게 배우자와 함께 별도 세대를 구성할 수 있습니다. 소득세법 시행령 §152의3은 배우자가 있는 경우를 원칙적 1세대로 보고, 배우자가 없는 경우에도 30세 이상, 배우자 사망·이혼, 소득요건 충족 중 하나이면 별도 세대로 인정합니다. 결혼은 그 중 가장 명확한 사유입니다.',
  },
  {
    question: '중위소득 40%가 구체적으로 얼마인가요?',
    answer:
      '기준 중위소득은 보건복지부가 매년 8월경 고시하며, 가구원 수에 따라 다르고 매년 변동합니다. 1인 가구 기준으로 보면 월 90만원대 초반에서 100만원대 초반 수준이 통상적이지만, 정확한 금액은 반드시 해당 양도 연도의 보건복지부 고시를 확인해야 합니다. 소득세법 시행령 §152의3제3호는 12개월 환산 금액을 기준으로 삼습니다.',
  },
  {
    question: '주민등록상 세대분리만 하면 세대가 나뉜 것으로 봐주나요?',
    answer:
      '아닙니다. 국세청은 주민등록초본, 실제 거주지, 생활비 흐름, 통신비·건강보험료 납부 주체 등을 종합해 실제 생계 분리 여부를 판단합니다(국세기본법 §14 실질과세). 주소만 옮기고 실제로는 부모와 함께 살거나 부모가 생활비를 전액 대주는 경우 세대분리가 부인되어 비과세가 취소되고 가산세까지 추징될 수 있습니다.',
  },
  {
    question: '세대분리 인정 여부는 언제 판정하나요?',
    answer:
      '양도일 현재를 기준으로 판정합니다. 즉 주택을 양도하는 그 시점에 자녀가 별도 세대 요건을 충족해야 부모·자녀 각자 1세대1주택으로 인정받습니다. 양도 직전에 급하게 세대분리를 신고하는 경우 국세청이 형식적 분리로 판단할 수 있으므로, 최소 수개월 이상 실질적 생계 분리 상태를 유지하는 것이 안전합니다.',
  },
  {
    question: '세대분리 인정을 뒷받침할 수 있는 서류는 무엇인가요?',
    answer:
      '주민등록초본은 기본이며, 근로소득원천징수영수증, 사업소득 신고자료, 임대차계약서(자녀 명의), 자녀 명의 공과금·통신비·건강보험료 납부 내역, 별도 주소지에서의 실거주 증빙(관리비 납부 내역·택배 수령 기록) 등을 함께 갖추는 것이 좋습니다. 위장 분리가 의심되면 국세청이 사후 소명을 요구할 수 있습니다.',
  },
  {
    question: '세대분리로 인정받으면 부모의 양도소득세는 얼마나 절세되나요?',
    answer:
      '1세대1주택으로 인정되고 양도가액이 12억원 이하이면 부모 주택 양도세가 전액 비과세됩니다(소득세법 §89①제3호, 시행령 §154). 양도가가 12억을 넘으면 12억 초과분에만 비례 과세되므로 절세폭이 여전히 큽니다. 세대분리가 부인되어 1세대2주택으로 과세되면 수천만원에서 수억원의 세금이 발생할 수 있어 차이가 매우 큽니다. 정확한 세액은 양도소득세 계산기에서 확인하세요.',
  },
];

export default function ChildHouseholdSeparationCapitalGainsExemption2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '자녀 세대분리 1세대1주택 비과세' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '자녀 세대분리 1세대1주택 비과세 2026, 30세 미만 소득요건과 실질 판단',
    description:
      '자녀 세대분리로 부모와 자녀가 각자 1세대1주택 비과세를 받는 요건. 30세 미만 소득요건(중위소득 40%), 소득세법 시행령 §152의3 세대 판정, 위장 분리 시 실질과세 부인 위험까지 실무 관점에서 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: [
      '자녀 세대분리',
      '세대분리 소득요건',
      '1세대1주택 비과세',
      '30세 미만 세대분리',
      '소득세법 시행령 152조의3',
      '실질과세 원칙',
    ],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '자녀 세대분리 1세대1주택 비과세 2026',
    description:
      '자녀 세대분리 요건, 30세 미만 소득요건, 실질과세 판정 기준까지 1세대1주택 비과세를 안전하게 받기 위한 실무 가이드.',
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
                    { name: '자녀 세대분리 1세대1주택 비과세' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">주택 소유자 · 8분 읽기 · 2026-07-28</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  자녀 세대분리와 1세대1주택 비과세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">, 30세 미만 소득요건과 실질 판단</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  부모와 자녀가 각각 주택 한 채씩 가지고 있을 때, 세대분리 여부에 따라 양도소득세가 전액 비과세되거나 수천만원 이상 부과되는 결과가 갈립니다. 특히 30세 미만 자녀는 나이만으로는 세대분리가 인정되지 않고 소득요건까지 갖춰야 합니다. 이 가이드는 소득세법 시행령 §152의3에 따른 세대 요건, 실질과세 판정 기준, 위장 분리의 함정까지 실무 관점에서 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-child-household-separation-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 세대분리가 왜 양도세 비과세와 직결되나요?</h2>
                <p>
                  1세대1주택 비과세는 세대 단위로 판정하기 때문입니다. 소득세법 §89①제3호와 시행령 §154는 1세대가 국내에 1주택을 2년 이상 보유(조정지역은 거주요건 추가)하고 양도가액이 12억원 이하이면 양도소득세를 비과세한다고 규정합니다. 여기서 1세대는 거주자와 배우자가 같은 주소에서 생계를 함께하는 가족 집단을 뜻합니다(소득세법 §88제6호).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">TL;DR 세대분리와 주택 수</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 세대분리 인정: 부모 1주택 + 자녀 1주택 = 각자 1세대1주택 (양자 모두 비과세 가능)
                    <br />
                    · 세대분리 부인: 부모와 자녀가 같은 세대로 묶여 1세대2주택 (부모 주택 비과세 불가)
                    <br />
                    · 판정 시점: 양도일 현재의 세대 상태
                    <br />
                    · 근거: 소득세법 §88제6호, §89①제3호, 시행령 §152의3, §154
                  </p>
                </div>
                <p className="mt-4">
                  즉 세대가 하나로 묶이면 부모 A주택과 자녀 B주택을 합쳐 1세대2주택이 되고, 양도하는 쪽이 비과세를 받지 못합니다. 반대로 자녀가 별도 세대로 인정되면 각자 1세대1주택이 되어 각각 12억원 이하 비과세 요건을 따로 판정합니다.
                </p>
                <p className="mt-4">
                  다만 형식적으로 주민등록만 나눠 놓았다고 세대가 나뉜 것이 아닙니다. 국세기본법 §14 실질과세 원칙에 따라 실제 생계 분리 여부가 함께 검증됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 세대분리로 인정받는 요건은 무엇인가요?</h2>
                <p>
                  소득세법 시행령 §152의3은 배우자가 없어도 별도 세대로 보는 세 가지 사유를 규정합니다. 하나라도 충족하면 됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">
                      표 1. 배우자가 없어도 1세대로 보는 요건 (소득세법 시행령 §152의3)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">요건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">판정 포인트</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">제1호 나이</td>
                        <td className="p-3">거주자의 나이가 <strong>30세 이상</strong></td>
                        <td className="p-3">가장 단순, 소득 무관</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">제2호 혼인 상태</td>
                        <td className="p-3">배우자가 사망하거나 이혼한 경우</td>
                        <td className="p-3">가족관계증명서로 입증</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">제3호 소득</td>
                        <td className="p-3">소득세법 §4 소득이 <strong>기준 중위소득 40% 이상</strong>이고 주택·토지 관리와 독립 생계 가능</td>
                        <td className="p-3">30세 미만 자녀의 유일한 통로, 미성년자 제외</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  참고로 결혼(혼인)한 자녀는 배우자가 있으므로 §152의3의 전제조건 자체를 벗어나 나이·소득과 무관하게 별도 세대를 구성할 수 있습니다.
                </p>
                <p className="mt-4">
                  다만 세 요건 중 하나를 충족했다고 자동으로 세대분리가 되는 것은 아닙니다. 위 요건은 <strong>별도 세대로 볼 수 있는 자격 요건</strong>이며, 실제로 부모와 생계를 분리하고 별도 주소에서 독립 생활을 하고 있어야 인정됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 30세 미만 자녀도 세대분리가 되나요?</h2>
                <p>
                  됩니다. 다만 소득요건을 반드시 충족해야 합니다. 소득세법 시행령 §152의3제3호가 요구하는 소득은 "소득세법 §4에 따른 소득"이므로 근로소득, 사업소득, 이자·배당소득, 임대소득 등이 포함되며, 일시적이지 않고 <strong>경상·반복적</strong>으로 발생해야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>근로소득</strong>: 재직 중인 직장의 원천징수영수증으로 입증. 정규직·비정규직 모두 인정되나 몇 개월 단기 아르바이트는 반복성 판단에서 취약합니다.
                  </li>
                  <li>
                    <strong>사업소득</strong>: 사업자등록 후 실제 매출·부가가치세 신고 이력이 있어야 합니다. 형식적 개업만으로는 부족합니다.
                  </li>
                  <li>
                    <strong>임대소득</strong>: 자녀 명의 주택·상가에서 발생한 월세·전세 이자 소득. 다만 부모가 실질적으로 소유하는 주택에서 명의만 자녀로 돌린 경우 실질과세 원칙(국세기본법 §14)으로 부인될 수 있습니다.
                  </li>
                  <li>
                    <strong>미성년자 제외</strong>: 시행령 §152의3제3호는 미성년자를 명시적으로 제외합니다. 미성년 자녀가 아무리 소득이 있어도 부모 세대에 묶이며, 별도 세대로 분리되지 않습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 소득요건은 <strong>양도일 현재의 소득 상태</strong>를 봅니다. 과거에 소득이 있었다가 양도 시점에 실직 상태이거나, 반대로 양도 직전 급하게 취업한 경우 국세청이 소득의 반복성·독립생계 능력을 다시 판정할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 소득요건, 얼마를 벌어야 하나요?</h2>
                <p>
                  기준 중위소득 40% 이상을 12개월 환산한 금액입니다. 여기서 기준 중위소득은 보건복지부가 국민기초생활 보장법 §2제11호에 따라 매년 8월경 고시하는 값으로, 가구원 수에 따라 다르고 매년 변동합니다.
                </p>
                <p className="mt-4">
                  1인 가구 기준 중위소득 40%는 통상 월 90만원대 초반에서 100만원대 초반 수준으로 형성되며, 이를 12개월로 환산하면 대략 1,100만원에서 1,300만원 부근이 목표선이 됩니다. 다만 이 수치는 참고용이며, 실제 양도 연도의 보건복지부 고시를 반드시 확인해야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">소득요건 실무 체크</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 기준: 양도 연도의 보건복지부 기준 중위소득 40%, 12개월 환산액
                    <br />
                    · 판정 시점: 주택 양도일 현재
                    <br />
                    · 인정 소득: 소득세법 §4의 반복·경상 소득(근로·사업·임대·이자 등)
                    <br />
                    · 제외: 미성년자, 일회성 소득, 부모의 정기적 지원금(용돈)
                  </p>
                </div>
                <p className="mt-4">
                  다만 소득요건을 넘어섰다고 곧바로 세대분리가 인정되는 것은 아닙니다. 시행령 §152의3제3호 후단은 "소유하고 있는 주택 또는 토지를 관리·유지하면서 독립된 생계를 유지할 수 있는 경우"라고 규정해, 소득으로 실제 독립 생계가 가능해야 한다는 실질 요건을 추가합니다. 소득이 있어도 부모 집에 계속 얹혀 살면 요건 충족이 어렵습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 서류상 주소만 옮기면 세대분리가 되나요?</h2>
                <p>
                  되지 않습니다. 국세청은 국세기본법 §14 실질과세 원칙에 따라 주민등록초본, 실제 거주 사실, 생계 원천, 공과금·통신비·건강보험료 납부 주체 등을 종합해 판단합니다. 형식적 전입신고만으로는 세대분리가 인정되지 않고, 오히려 위장 분리로 판단되면 비과세가 부인되고 가산세까지 추징됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>가장 흔한 함정</strong>: 자녀 주소만 원룸·지방 친척집으로 옮겨두고 실제로는 부모와 함께 사는 경우. 관리비·전기요금이 자녀 명의로 나오지 않으면 실질적으로 거주하지 않는다는 유력한 증거가 됩니다.
                  </li>
                  <li>
                    <strong>생활비 지원 문제</strong>: 자녀가 별도 주소에 실거주해도 부모가 생활비 대부분을 대주면 독립 생계가 아니라고 판단될 수 있습니다. 자녀 명의 계좌로 매달 부모 이체가 정기적으로 들어가는 흐름은 위험 신호입니다.
                  </li>
                  <li>
                    <strong>양도 직전 급히 분리</strong>: 양도 몇 달 전에 자녀를 세대분리한 경우 국세청이 조세회피 목적을 의심할 수 있습니다. 실질과세 원칙상 형식이 아닌 경제적 실질로 판단하므로 부인 위험이 높아집니다.
                  </li>
                </ul>
                <p className="mt-4">
                  예외: 자녀가 대학 진학, 직장 발령, 결혼 등 명확한 사유로 별도 지역에 실거주해 온 오랜 이력이 있다면 실질 분리가 비교적 쉽게 인정됩니다. 반대로 이런 배경 없이 양도 직전 분리한 경우 최소한의 실거주 증빙과 소득·생활비 흐름을 갖춰야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 세대분리 인정 vs 부인, 실제 세금 차이는?</h2>
                <p>
                  두 시나리오를 비교하면 세금 차이가 얼마나 큰지 명확해집니다. 부모가 A주택(양도가 10억, 양도차익 5억, 12억 이하)을 양도하는 상황을 예로 듭니다. 자녀는 별도로 B주택을 보유 중입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">
                      표 2. 세대분리 인정 vs 부인 세금 비교 (부모 A주택 양도 기준)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세대분리 인정</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세대분리 부인</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">세대 구성</td>
                        <td className="p-3">부모 1세대, 자녀 1세대</td>
                        <td className="p-3">부모+자녀 1세대</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">부모 주택 수</td>
                        <td className="p-3">1세대1주택</td>
                        <td className="p-3">1세대2주택</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">비과세 적용</td>
                        <td className="p-3">가능(12억 이하 전액 비과세)</td>
                        <td className="p-3">불가</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">양도세(대략)</td>
                        <td className="p-3">0원</td>
                        <td className="p-3">수천만원 단위 발생</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  더 작은 규모로 계산 감을 잡아 보겠습니다. 자녀 소유 B주택(양도차익 8,000만원, 보유 5년, 다주택 상황)을 양도한다고 가정하면 세대분리 부인 시에는 다음처럼 세금이 발생합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2 mt-4">
                  <p className="font-semibold text-text-primary">사례. 세대분리 부인 시 자녀 B주택 양도세(개산)</p>
                  <p className="text-sm text-text-secondary">
                    · 양도차익: 8,000만원
                    <br />
                    · 기본공제: 250만원 차감(소득세법 §103)
                    <br />
                    · 과세표준: 8,000만 - 250만 = 7,750만원
                    <br />
                    · 세율: 소득세법 §55, 5,000만 초과~8,800만 구간 24%, 누진공제 576만
                    <br />
                    · 산출세액: 7,750만 × 24% - 576만 = 1,860만 - 576만 = <strong>약 1,284만원</strong>
                    <br />
                    · 지방소득세 10% 추가 시 총 <strong>약 1,412만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">세대분리 인정 시 이 세액이 0원이 되므로 차액이 약 1,412만원. 부모 주택까지 함께 부인되면 차액은 수천만원~수억원 단위로 확대됩니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 위 세액은 개산이며 조정지역 여부, 보유·거주기간에 따른 장기보유특별공제, 다주택 중과 배제 특례 등에 따라 실제 부담은 달라집니다. 정확한 계산은 아래 양도소득세 계산기에서 조건을 넣어 확인해 보세요.
                </p>
              </section>

              <AdSlot slot="guide-child-household-separation-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 세대분리 입증 서류와 실무 팁</h2>
                <p>
                  세대분리 입증은 양도 시점에 서류가 있어야 하는 것이 아니라, 국세청이 사후 소명을 요구할 때 즉시 제출할 수 있어야 합니다. 다음 서류를 미리 정리해 두는 것이 안전합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>주민등록초본</strong>: 자녀의 전입·전출 이력이 시간 순으로 남아 실제 별도 주소 거주 기간을 증명합니다. 세무서 제출용은 주소변동 이력 포함으로 발급받아야 합니다.
                  </li>
                  <li>
                    <strong>소득 증빙</strong>: 근로소득원천징수영수증(홈택스 발급), 사업소득 종합소득세 신고서, 임대소득 신고 자료. 30세 미만 자녀는 이 서류가 가장 결정적입니다.
                  </li>
                  <li>
                    <strong>주거 실체 증빙</strong>: 자녀 명의 임대차계약서, 관리비·전기·가스·수도요금 납부 내역, 통신비 청구서, 인터넷·OTT 요금, 택배 수령 내역 등. 자녀 명의로 실제 결제된 흔적이 다양할수록 실거주 인정이 쉽습니다.
                  </li>
                  <li>
                    <strong>독립 생계 증빙</strong>: 자녀 명의 계좌의 급여 입금·자체 소비 흐름, 신용카드 사용 내역. 부모 계좌에서 정기 이체가 크게 들어오는 흐름은 최소화하는 것이 유리합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 서류가 완벽해도 형식적 분리로 판단되면 부인될 수 있습니다. 사전 절세 상담이 필요한 고액 거래(양도차익 3억 이상 등)에서는 세무사와 함께 실질 요건 충족 여부를 점검하고, 필요하면 국세청에 사전답변제도(질의회신)를 활용하는 방법도 있습니다.
                </p>
                <p className="mt-4">
                  예외: 결혼, 해외 유학, 지방 발령 등 자연스러운 사유로 자녀가 오래전부터 별도 거주해 온 경우에는 별도의 절세 목적 없이도 실질 분리가 이미 완성돼 있는 상태이므로, 통상적인 주민등록초본과 소득 서류만으로도 인정이 쉬운 편입니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/one-household-12-billion-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">1세대1주택 12억 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">12억 한도 비례과세 구조와 계산 방법을 배웁니다.</p>
                  </Link>
                  <Link
                    href="/guide/temporary-two-houses-capital-gains-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">일시적 2주택 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">기존 주택 처분 기한과 신규 취득 규칙을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/capital-gains-tax-5-steps/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 5단계 계산</div>
                    <p className="mt-1 text-sm text-text-secondary">양도차익부터 최종 세액까지 단계별로 이해합니다.</p>
                  </Link>
                  <Link
                    href="/guide/long-term-holding-special-deduction-80-percent/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">장기보유특별공제 최대 80%</div>
                    <p className="mt-1 text-sm text-text-secondary">보유·거주 기간별 공제율과 실제 절세 효과를 확인합니다.</p>
                  </Link>
                  <Link
                    href="/calculator/capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도가·취득가·보유기간을 입력해 세액을 계산합니다.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·종부세 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 자녀 세대분리 인정 여부는 개별 가족의 실제 생계·주거·소득 상황과 국세청의 실질과세 판정에 따라 달라지므로, 고액 거래 전에는 반드시 세무사와 상담하거나 국세청 상담(126)을 활용하세요. 본 콘텐츠는 2026-07-28을 기준으로 작성되었으며, 소득세법 및 시행령 개정 시 즉시 업데이트됩니다. 주요 근거 법조항은 <strong>소득세법 §88(정의), §89(비과세 양도소득), 시행령 §152의3(1세대의 범위), §154(1세대1주택의 범위), 국세기본법 §14(실질과세)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">
                    법제처 국가법령정보센터
                  </a>
                  ,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">
                    국세청
                  </a>
                  ,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">
                    홈택스
                  </a>
                  .
                </p>
              </section>

              <ShareButtons title="자녀 세대분리 1세대1주택 비과세 2026 가이드" url={URL} />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
