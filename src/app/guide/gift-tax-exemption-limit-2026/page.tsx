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

const URL = 'https://calculatorhost.com/guide/gift-tax-exemption-limit-2026/';
const DATE_PUBLISHED = '2026-06-30';
const DATE_MODIFIED = '2026-06-30';

export const metadata: Metadata = {
  title: '증여세 면제한도 2026 | 공제액 한계·10년 합산·혼인공제 완벽 정리 | calculatorhost',
  description:
    '증여세 면제한도(증여재산공제)를 정확히 이해하세요. 배우자 6억·자녀 5천만·혼인공제 1억까지 10년 합산. 얼마까지 증여세 없이 가능한지 정리.',
  keywords: [
    '증여세 면제한도',
    '증여재산공제',
    '증여세 공제액',
    '배우자 증여공제',
    '혼인공제',
    '출산공제',
    '증여세 10년 합산',
    '상증법 53조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '증여세 면제한도 2026 | 공제액·10년 합산·혼인공제 | calculatorhost' }],
    title: '증여세 면제한도 2026',
    description: '배우자 6억, 자녀 5천만, 혼인공제 1억까지 얼마나 세금 없이 증여할 수 있을까?',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-default.png'],
  },
};

const FAQ_ITEMS = [
  {
    question: '배우자에게 6억 초과 증여하면 모두 세금이 나나요?',
    answer:
      '네. 배우자 공제는 정확히 6억원이므로, 6억을 초과하는 부분부터 과세표준이 됩니다. 예: 배우자에게 8억 증여 → 과세표준 2억 → 세액 약 2,000만원.',
  },
  {
    question: '부모 양쪽에게서 증여받으면 공제가 두 배인가요?',
    answer:
      '네. 아버지와 어머니는 별도의 증여자이므로, 각각 5천만원씩 공제를 받을 수 있습니다(자녀 입장). 10년 이내 각각으로부터 5천만씩 = 총 1억까지 공제.',
  },
  {
    question: '미성년 자녀 증여 공제가 더 적은 이유는 뭔가요?',
    answer:
      '법률상 미성년자는 재산 관리 능력이 없어 보호 대상으로 분류되므로, 공제를 적게 인정합니다. 성년 자녀(20세 이상)는 5천만, 미성년은 2천만 공제.',
  },
  {
    question: '혼인공제는 따로 신청해야 하나요?',
    answer:
      '혼인공제(상증법 §53의2, 2024 신설)는 증여신고 시 서류를 제출하면 자동 적용됩니다. 혼인신고증명서 또는 혼인관계증명서와 증여세 신고서를 함께 제출하세요.',
  },
  {
    question: '출산공제와 혼인공제를 둘 다 받을 수 있나요?',
    answer:
      '아닙니다. 출산공제와 혼인공제의 합계는 최대 1억원입니다. 예: 혼인공제 5천만 받고 출산공제 5천만 받으면 총 1억 (초과 불가).',
  },
  {
    question: '10년이 지나면 공제가 초기화되는 건 확실한가요?',
    answer:
      '네, 확실합니다. 증여재산공제는 10년을 단위로 계산됩니다(상증법 §53①). 2020년 증여가 끝나면 2030년부터 새로운 10년 구간이 시작되어 공제가 초기화됩니다.',
  },
  {
    question: '비혼 파트너에게 증여하면 공제가 없나요?',
    answer:
      '맞습니다. 증여공제는 법적 배우자와 직계존속/비속만 인정합니다. 비혼 파트너나 친구는 기타 친족도 아니므로 공제 0입니다. 타인과 같습니다.',
  },
  {
    question: '증여세 신고를 안 하면 어떻게 되나요?',
    answer:
      '공제 범위 내라도 신고 의무가 있습니다. 신고하지 않으면 무신고 가산세 20~40%가 부과되고, 나중에 적발되면 더 큰 불이익을 받을 수 있습니다.',
  },
];

export default function GiftTaxExemptionLimit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '증여세 면제한도 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '증여세 면제한도 2026 — 공제액·10년 합산·혼인공제',
    description:
      '배우자, 자녀, 혼인·출산 공제까지. 얼마까지 증여세 없이 재산을 줄 수 있는지 명확히 정리합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['증여세', '면제한도', '공제', '10년 합산', '상증법 53조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '증여세 면제한도 2026',
    description: '증여재산공제 한계와 10년 합산 규칙. 얼마까지 세금 없이 증여 가능할까?',
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
                    { name: '증여세 면제한도 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">증여자·수증자·가족 · 10분 읽기 · 2026-06-30</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  증여세 면제한도 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 배우자·자녀·혼인공제까지 정확히 계산</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  재산을 자녀나 배우자에게 줄 때, 가장 먼저 묻는 질문이 있습니다. "얼마까지 세금 없이 줄 수 있을까?" 그 답이 바로 증여재산공제입니다. 상증법 §53에 정해진 공제액만큼은 증여세를 내지 않아도 되며, 신고 의무도 없습니다. 다만 10년 단위로 합산되고, 2024년부터는 혼인·출산공제 같은 추가 공제도 생겼습니다. 이 가이드에서는 관계별 공제 한도와 함정을 명확하게 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-gift-tax-exemption-limit-top" format="horizontal" />

              <section className="space-y-6">
                <h2 className="border-l-2 border-primary-500 pl-3 text-2xl font-bold">증여재산공제 한눈에: 관계별 공제액 표</h2>
                <p data-speakable>
                  증여세 면제한도는 <strong>상증법 §53(증여재산공제)</strong>에서 정해집니다. 같은 증여자로부터 10년 이내에 받은 증여를 합산하여 공제를 적용하는 것이 핵심입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="text-sm text-text-secondary mb-3 text-left">상증법 §53에 따른 증여재산공제(10년 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base bg-bg-card">
                        <th scope="col" className="text-left p-3 font-semibold">수증자 관계</th>
                        <th scope="col" className="text-left p-3 font-semibold">공제액</th>
                        <th scope="col" className="text-left p-3 font-semibold">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">배우자</td>
                        <td className="p-3">6억원</td>
                        <td className="p-3">법적 배우자만. 10년마다 초기화.</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3 font-semibold">성년 직계비속</td>
                        <td className="p-3">5,000만원</td>
                        <td className="p-3">자녀(20세↑). 1인당 적용.</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">미성년 직계비속</td>
                        <td className="p-3">2,000만원</td>
                        <td className="p-3">자녀(20세 미만). 1인당 적용.</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3 font-semibold">직계존속 → 직계비속</td>
                        <td className="p-3">5,000만원</td>
                        <td className="p-3">부모 → 자녀. 부모 양쪽 각각 5천만.</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">기타 친족(6촌 이내)</td>
                        <td className="p-3">1,000만원</td>
                        <td className="p-3">형제자매, 조부모, 손자 등.</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3 font-semibold">타인(친족 아님)</td>
                        <td className="p-3">0원</td>
                        <td className="p-3">친구, 직원, 비혼 파트너 등.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="text-sm text-text-primary font-semibold mb-2">핵심 포인트</p>
                  <p className="text-sm text-text-secondary">
                    배우자에게는 <strong>6억원</strong>까지, 성년 자녀는 <strong>1인당 5천만</strong>원까지 세금 없이 증여할 수 있습니다. 공제는 10년 단위로 합산되며, 같은 수증자로부터 10년 후에는 공제가 초기화되어 다시 받을 수 있습니다.
                  </p>
                </div>
                <p className="mt-4 text-sm text-text-secondary border-l-2 border-primary-500 pl-4">
                  <strong>⚠️ 주의:</strong> 공제액 내에서는 <strong>세금이 나오지 않지만, 신고 의무가 여전히 있습니다.</strong> 신고 없이 적발되면 무신고 가산세가 부과됩니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="border-l-2 border-primary-500 pl-3 text-2xl font-bold">관계별 공제 상세 설명</h2>

                <div className="space-y-4 mt-6">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">배우자: 6억원 공제</h3>
                    <p data-speakable className="text-sm text-text-secondary">
                      법적 배우자에게는 <strong>10년마다 6억원</strong> 공제가 인정됩니다. 배우자에게 6억 이하를 증여하면 증여세가 0원입니다. 6억을 초과하는 부분부터 과세표준이 되어 세금이 발생합니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">성년 자녀(20세↑): 1인당 5천만원 공제</h3>
                    <p data-speakable className="text-sm text-text-secondary">
                      성년 직계비속(자녀가 20세 이상)에게는 1명당 <strong>5천만원</strong> 공제가 적용됩니다. 자녀가 2명이면 1억원(5천만×2), 3명이면 1.5억원입니다. 동일한 부모로부터 10년 이내에 받은 증여를 모두 합산하여 공제를 한 번만 받습니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">미성년 자녀(20세 미만): 1인당 2천만원 공제</h3>
                    <p data-speakable className="text-sm text-text-secondary">
                      미성년 자녀에게는 <strong>1인당 2천만원만</strong> 공제됩니다. 성년이 되면 이후 증여부터는 5천만원 공제가 적용됩니다. 미성년자공제(상속에서 연 1천만원)와는 다릅니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">부모로부터 받는 증여: 직계존속 공제 5천만원</h3>
                    <p data-speakable className="text-sm text-text-secondary">
                      자녀가 <strong>부모로부터</strong> 받는 증여는 성년이든 미성년이든 5천만원 공제가 기본입니다(미성년이 아닌 자녀 기준). 아버지와 어머니는 별개의 증여자이므로 각각 5천만씩 공제를 받을 수 있어서, 부모 양쪽에게서 총 1억원까지 공제 가능합니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">기타 친족(6촌 이내): 1천만원 공제</h3>
                    <p data-speakable className="text-sm text-text-secondary">
                      형제자매, 조부모, 손자, 사위 등 6촌 이내 친족에게는 <strong>1인당 1천만원</strong>만 공제됩니다. 친족 관계를 입증하는 서류가 필요합니다.
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm text-text-secondary border-l-2 border-primary-500 pl-4">
                  <strong>⚠️ 다만:</strong> 배우자에게 주는 6억과 자녀에게 주는 5천만은 따로 계산됩니다. 부부가 함께 자녀에게 증여할 때, 배우자 공제와 자녀 공제가 중복되지는 않습니다. 각자의 증여에 각자의 공제를 적용합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="border-l-2 border-primary-500 pl-3 text-2xl font-bold">10년 합산의 의미 — 같은 증여자로부터</h2>
                <p data-speakable>
                  증여재산공제의 가장 중요한 규칙은 <strong>10년 합산</strong>입니다. 이것을 정확히 이해해야 절세 계획이 가능합니다.
                </p>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">10년 합산이란?</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block">현재 증여 시점으로부터 <strong>10년 이내에 같은 증여자로부터 받은 모든 증여</strong>를 합산하여 공제를 적용합니다.</span>
                    <span className="block">예: 2025년에 부모에게 2억원 증여 → 공제 5천만 (과세표준 1.5억) → 세금 냄</span>
                    <span className="block">예: 2027년에 같은 부모에게 3억원 증여 → 10년 이내 재증여 → 합산액 5억 → 공제는 5천만 (1회만)</span>
                    <span className="block">→ 과세표준 = (2억 + 3억) - 5천만 = 4.5억</span>
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">구체적 예시 1: 자녀가 10년 내 부모로부터 2회 증여</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block">2024년: 자녀가 부모로부터 2억원 증여 (공제 5천만 후 과세표준 1.5억)</span>
                    <span className="block">2026년: 같은 부모로부터 3억원 추가 증여</span>
                    <span className="block font-semibold">→ 합산 증여액: 2억 + 3억 = 5억원</span>
                    <span className="block font-semibold">→ 공제: 5천만원 (1회만 적용)</span>
                    <span className="block font-semibold">→ 과세표준: 5억 - 5천만 = 4.5억</span>
                    <span className="block font-semibold">→ 세액: 4.5억 × 20% - 1,000만(누진공제) = 8,000만원</span>
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">구체적 예시 2: 배우자에게 6억 × 2회 (10년 초과)</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block">2020년: 배우자에게 6억원 증여 (공제 6억 → 과세표준 0 → 세금 0)</span>
                    <span className="block">2030년(10년 후): 배우자에게 다시 6억원 증여</span>
                    <span className="block font-semibold">→ 새로운 10년 구간 시작(2030~2040)</span>
                    <span className="block font-semibold">→ 공제: 다시 6억원 (초기화됨)</span>
                    <span className="block font-semibold">→ 과세표준: 6억 - 6억 = 0 → 세금 0</span>
                    <span className="block font-semibold">총 12억을 10년마다 나누어 증여 시 세금 0</span>
                  </p>
                </div>

                <p className="mt-4 text-sm text-text-secondary border-l-2 border-primary-500 pl-4">
                  <strong>⚠️ 중요:</strong> 10년 기한은 "<strong>현재 증여일</strong>로부터 역산 10년"입니다. 즉, 2026년 증여는 2016년 이후 증여와 합산됩니다. 기산점을 명확히 해야 나중에 분쟁이 없습니다.
                </p>
              </section>

              <AdSlot slot="guide-gift-tax-exemption-limit-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="border-l-2 border-primary-500 pl-3 text-2xl font-bold">혼인·출산공제: 2024년 신설 추가 공제</h2>
                <p data-speakable>
                  2024년 1월 1일부터 새로운 증여공제가 시작되었습니다. 상증법 §53의2(혼인·출산 증여재산공제)에 따라, <strong>직계존속이 직계비속에게 혼인 또는 출산 목적으로 증여할 때 추가 1억원</strong>을 공제합니다.
                </p>

                <div className="space-y-4 mt-6">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">혼인공제: 혼인 전후 4년(전 2년·후 2년) 이내 증여</h3>
                    <p className="text-sm text-text-secondary">
                      혼인신고일을 기준으로, 신고 <strong>2년 전부터 2년 후까지(총 4년)</strong> 기간 내에 부모 또는 직계존속이 자녀에게 증여한 재산에 대해 <strong>1억원 추가 공제</strong>가 적용됩니다. 예: 2025년 혼인 → 2023년~2027년 기간 내 증여가 혼인공제 대상.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">출산공제: 자녀 출생일 또는 입양신고일 전후 2년 이내 증여</h3>
                    <p className="text-sm text-text-secondary">
                      자녀가 태어나거나 입양될 때(신고일), 그 <strong>전후 2년(총 4년은 아님) 이내</strong>에 부모가 자녀 또는 다른 자녀에게 증여한 재산에 대해 <strong>1억원 추가 공제</strong>가 적용됩니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">혼인공제 + 출산공제의 합산 한도</h3>
                    <p className="text-sm text-text-secondary">
                      <strong>중요:</strong> 혼인공제와 출산공제는 합산하여 최대 1억원입니다. 혼인 후 곧 아이를 낳은 경우, 혼인공제 5천만 + 출산공제 5천만 = 총 1억원이지, 2억원이 아닙니다.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">예시: 혼인공제 활용 시 공제액</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block">상황: 2025년 혼인한 자녀가 부모로부터 1.5억원 증여받음</span>
                    <span className="block font-semibold">기본 공제: 성년 직계비속 5천만 (또는 직계존속 5천만)</span>
                    <span className="block font-semibold">추가 혼인공제: 1억 (혼인 2년 전~2년 후 범위)</span>
                    <span className="block font-semibold">→ 총 공제: 5천만 + 1억 = 1.5억</span>
                    <span className="block font-semibold">→ 과세표준: 1.5억 - 1.5억 = 0</span>
                    <span className="block font-semibold">→ 증여세: 0원 ✓ (혼인 없었으면 세금 500만원)</span>
                  </p>
                </div>

                <p className="mt-4 text-sm text-text-secondary border-l-2 border-primary-500 pl-4">
                  <strong>⚠️ 다만:</strong> 기본 공제 5천만 + 혼인공제 1억을 합산하면 1.5억이지만, 혼인공제 1억 자체가 "추가"이므로 중복 선택은 불가합니다. 둘을 더하는 것이 맞습니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="border-l-2 border-primary-500 pl-3 text-2xl font-bold">공제 초과 시 증여세 계산법</h2>
                <p data-speakable>
                  공제 한도를 초과하면 <strong>초과분에 대해 상증법 §26의 5단계 누진세율</strong>이 적용됩니다. 과세표준이 커질수록 세율이 올라갑니다.
                </p>

                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm border-collapse">
                    <caption className="text-sm text-text-secondary mb-3 text-left">상증법 §26 증여세 세율표(5단계)</caption>
                    <thead>
                      <tr className="border-b border-border-base bg-bg-card">
                        <th scope="col" className="text-left p-3 font-semibold">과세표준</th>
                        <th scope="col" className="text-left p-3 font-semibold">세율</th>
                        <th scope="col" className="text-left p-3 font-semibold">누진공제</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1억 이하</td>
                        <td className="p-3">10%</td>
                        <td className="p-3">0</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">1억 초과 ~ 5억 이하</td>
                        <td className="p-3">20%</td>
                        <td className="p-3">1,000만</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">5억 초과 ~ 10억 이하</td>
                        <td className="p-3">30%</td>
                        <td className="p-3">6,000만</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">10억 초과 ~ 30억 이하</td>
                        <td className="p-3">40%</td>
                        <td className="p-3">1억 6,000만</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">30억 초과</td>
                        <td className="p-3">50%</td>
                        <td className="p-3">4억 6,000만</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">예시: 자녀에게 1억원 증여(공제 초과)</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block">증여액: 1억원</span>
                    <span className="block">공제: 성년 직계비속 5천만</span>
                    <span className="block">과세표준: 1억 - 5천만 = 5천만</span>
                    <span className="block">세율 구간: 1억 이하 → 10%</span>
                    <span className="block font-semibold">→ 세액 = 5천만 × 10% = 500만원</span>
                  </p>
                </div>

                <p className="mt-4 text-sm text-text-secondary border-l-2 border-primary-500 pl-4">
                  <strong>⚠️ 주의:</strong> 세율 구간별로 누진공제가 다릅니다. 과세표준이 정확해야 올바른 세액이 계산됩니다. 복잡한 경우 계산기나 세무사 상담을 권장합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="border-l-2 border-primary-500 pl-3 text-2xl font-bold">공제 한도 내 증여 시 신고 의무</h2>
                <p data-speakable>
                  많은 사람이 놓치는 부분입니다. 공제 범위 내라면 <strong>세금이 없지만 신고 의무는 여전히 있습니다</strong>(상증법 §61).
                </p>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">신고 시 필요한 것</p>
                  <ul className="text-sm text-text-secondary space-y-2">
                    <li>• <strong>증여세 신고서</strong> (국세청 홈택스 또는 세무사 대리)</li>
                    <li>• <strong>증여재산 평가 자료</strong> (부동산 공시가격, 은행잔액, 주식평가액 등)</li>
                    <li>• <strong>신고 기한</strong>: 증여받은 달의 말일부터 <strong>3개월 이내</strong></li>
                    <li>• <strong>혼인·출산공제 신청 시</strong>: 혼인관계증명서, 가족관계증명서, 출생증명서 등</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary text-sm mb-3">미신고 시 불이익</p>
                  <p className="text-sm text-text-secondary space-y-2">
                    <span className="block">• <strong>무신고 가산세</strong>: 세금이 없어도 20~40% 가산세 부과 (세액 기준)</span>
                    <span className="block">• <strong>세무조사 대상</strong>: 신고 이력이 없으면 나중에 적발 시 조사 받을 가능성</span>
                    <span className="block">• <strong>사후 합산 위험</strong>: 상속 시 미신고 증여가 다시 합산될 가능성</span>
                  </p>
                </div>

                <p className="mt-4 text-sm text-text-secondary border-l-2 border-primary-500 pl-4">
                  <strong>⚠️ 필수:</strong> 공제 범위 내라도 신고는 반드시 하세요. 신고 후 결과는 세금 0이더라도, 신고 기록이 남아야 나중의 혼란이 없습니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="border-l-2 border-primary-500 pl-3 text-2xl font-bold">공제 활용 전략 4가지</h2>
                <ul className="space-y-4">
                  <li>
                    <strong>1. 10년 분산 증여 전략:</strong> 공제 한도를 매해 활용합니다. 자녀에게 매년 5천만씩 10년 증여 = 총 5억 공제 → 세금 0. 배우자는 매 10년마다 6억씩 가능.
                  </li>
                  <li>
                    <strong>2. 혼인 목적 증여 활용:</strong> 혼인 예정이면 혼인공제 1억을 놓치지 마세요. 혼인 2년 전부터 신청 가능하므로 미리 계획합니다.
                  </li>
                  <li>
                    <strong>3. 배우자 + 자녀 병행:</strong> 부부가 함께 증여하면 배우자 공제 6억 + 각 자녀 공제를 중복 적용 가능. 예: 부부 각각 자녀에게 5천만씩 = 자녀당 1억 공제.
                  </li>
                  <li>
                    <strong>4. 관계별 최적화:</strong> 타인에게는 공제가 없으므로(제외 배우자, 직계 친족), 반드시 법적 관계를 명확히 한 후 증여합니다.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6 border-t border-border-base pt-8 border-l-2 border-primary-500 pl-3">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 & 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/gift-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">면제한도와 세율을 직접 입력해서 증여세 계산</p>
                  </Link>
                  <Link
                    href="/guide/gift-tax-calculation-2026"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">재산평가부터 최종 세액까지 5단계 완벽 계산</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-vs-gift-tax-comparison-2026"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 vs 증여세</div>
                    <p className="mt-1 text-sm text-text-secondary">공제 차이와 절세 전략 비교. 어느 쪽이 유리할까?</p>
                  </Link>
                  <Link
                    href="/guide/family-loan-agreement-gift-tax-avoidance"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">가족 차용증과 증여세</div>
                    <p className="mt-1 text-sm text-text-secondary">증여로 보지 않으려면 차용증을 어떻게 쓸까?</p>
                  </Link>
                  <Link
                    href="/guide/child-house-gift-vs-sale-comparison"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자녀 주택 증여 vs 매매</div>
                    <p className="mt-1 text-sm text-text-secondary">증여세 vs 양도세. 자녀에게 집을 줄 때 손익 분석</p>
                  </Link>
                  <Link
                    href="/category/tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세, 상속세, 취득세 등 다른 세금도 비교</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 증여는 복합적인 가족 상황, 자산 규모, 법적 환경에 따라 크게 달라집니다. 실제 증여 계획은 반드시 세무사·회계사와 상담 후 진행하세요. 본 콘텐츠는 {DATE_MODIFIED}을 기준으로 작성되었습니다.
                </p>
                <p className="text-xs text-text-tertiary">
                  <strong>법적 근거:</strong> 상속세 및 증여세법 §53(증여재산공제)·§53의2(혼인·출산공제)·§26(세율)·§61(신고 의무)
                </p>
                <p className="text-xs text-text-tertiary">
                  <strong>업데이트:</strong> 2026-06-30 작성. AI 보조 작성 후 운영자 검수 완료.
                </p>
              </section>

              <ShareButtons
                title="증여세 면제한도 2026"
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
