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

const URL = 'https://calculatorhost.com/guide/basic-pension-2026/';
const DATE_PUBLISHED = '2026-06-09';
const DATE_MODIFIED = '2026-06-09';

export const metadata: Metadata = {
  title: '기초연금 2026 — 월 최대 34만 9,700원, 선정기준·국민연금 연계',
  description:
    '2026년 기초연금 월 최대 349,700원(부부 559,520원)으로 인상. 선정기준액 단독 247만원·부부 395.2만원, 65세 소득하위 70% 대상. 국민연금 받으면 깎이는지(연계감액), 부부감액, 신청 방법까지 정리했습니다.',
  keywords: [
    '기초연금',
    '기초연금 2026',
    '기초연금 수급자격',
    '기초연금 선정기준액',
    '기초연금 국민연금 연계감액',
    '기초연금 부부감액',
    '기초연금 신청방법',
    '소득인정액',
    '노령연금',
    '기초연금법 3조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '기초연금 2026 — 월 최대 34만 9,700원, 선정기준·국민연금 연계',
    description:
      '2026년 기초연금 월 최대 349,700원. 선정기준액 단독 247만원·부부 395.2만원, 국민연금 연계감액·부부감액·신청 방법 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '기초연금 2026 — 월 최대 34만 9,700원, 선정기준·국민연금 연계' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '기초연금 2026 — 월 최대 34만 9,700원',
    description: '선정기준액·국민연금 연계감액·부부감액·신청 방법 완정리.',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '기초연금 2026 — 월 최대 34만 9,700원, 선정기준·국민연금 연계' }],
  },
};

const FAQ_ITEMS = [
  {
    question: '2026년 기초연금은 얼마인가요?',
    answer:
      '단독가구는 월 최대 349,700원입니다. 2025년 342,510원에서 7,190원 올랐습니다. 부부가 모두 받으면 각각 20% 감액되어 합산 559,520원입니다. 다만 소득 수준이 선정기준액에 가깝거나 국민연금을 많이 받으면 이보다 적게 받을 수 있습니다.',
  },
  {
    question: '기초연금은 누가 받을 수 있나요?',
    answer:
      '만 65세 이상이면서 소득인정액이 선정기준액 이하인 소득 하위 70% 어르신이 받습니다. 2026년 선정기준액은 단독가구 월 247만원, 부부가구 월 395만 2천원입니다. 대한민국 국적이고 국내에 거주해야 하며, 공무원연금 등 직역연금 수급자는 원칙적으로 제외됩니다.',
  },
  {
    question: '국민연금을 받으면 기초연금이 깎이나요?',
    answer:
      '많이 받으면 일부 깎일 수 있지만, 대부분은 전액 받습니다. 국민연금 월 수령액이 기초연금 기준연금액의 1.5배(2026년 약 52만 4,550원)를 넘으면 연계감액이 적용됩니다. 다만 아무리 깎여도 기준연금액의 50%(약 17만 5천원)는 반드시 보장됩니다. 국민연금이 그 이하면 기초연금은 줄지 않습니다.',
  },
  {
    question: '부부가 함께 받으면 왜 깎이나요?',
    answer:
      '현재는 부부가 모두 받으면 각각 20%가 감액됩니다. 그래서 2026년 부부 합산 최대액은 559,520원입니다. 다만 이 부부감액 제도는 2027년부터 단계적으로 폐지가 확정되어, 앞으로 부부 수급액은 늘어날 예정입니다.',
  },
  {
    question: '소득인정액은 어떻게 계산하나요?',
    answer:
      '소득인정액은 소득평가액과 재산의 소득환산액을 합한 금액입니다. 근로소득은 기본공제(월 110만원)와 30% 추가공제를 적용하고, 집·예금 등 재산은 지역별 기본재산액을 공제한 뒤 연 4% 환산율로 월 소득으로 바꿔 더합니다. 계산이 복잡하므로 복지로나 주민센터에서 모의계산으로 확인하는 것이 정확합니다.',
  },
  {
    question: '기초연금은 어디서 신청하나요?',
    answer:
      '주소지 읍·면·동 주민센터나 국민연금공단 지사를 방문해 신청하거나, 복지로(bokjiro.go.kr) 온라인으로 신청합니다. 만 65세 생일이 속한 달의 1개월 전부터 미리 신청할 수 있습니다. 신청해야 받을 수 있으므로, 자동으로 지급되지 않는다는 점에 유의하세요.',
  },
  {
    question: '소득이 선정기준액을 조금 넘으면 한 푼도 못 받나요?',
    answer:
      '소득인정액이 선정기준액을 넘으면 받지 못합니다. 다만 기준을 살짝 넘는 경우를 위해 소득역전 방지 감액 제도가 있어, 경계선에 있는 분들은 일부라도 받을 수 있도록 단계적으로 조정됩니다. 정확한 판정은 신청 후 소득인정액 조사로 결정되므로, 애매하면 일단 신청해 보는 것이 좋습니다.',
  },
] as const;

export default function BasicPension2026() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '기초연금 2026 — 수급자격·금액·신청' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '기초연금 2026 — 월 최대 34만 9,700원, 선정기준·국민연금 연계감액',
    description:
      '2026년 기초연금 월 최대 349,700원(부부 559,520원). 선정기준액 단독 247만원·부부 395.2만원, 65세 소득하위 70% 대상. 국민연금 연계감액, 부부감액, 신청 방법을 정리했습니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['기초연금', '기초연금 선정기준액', '기초연금 국민연금 연계감액', '기초연금 부부감액', '소득인정액'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '기초연금 2026 — 수급자격·금액·국민연금 연계·신청',
    description:
      '2026년 기초연금 월 최대 349,700원. 선정기준액 단독 247만원·부부 395.2만원, 국민연금 연계감액(최소 50% 보장), 부부감액, 신청 방법.',
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
                    { name: '기초연금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">근로 · 9분 읽기 · 2026-06-09</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  기초연금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 월 최대 34만 9,700원, 선정기준·국민연금 연계</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  기초연금은 만 65세 이상 어르신 중 소득 하위 70%에게 매월 지급하는 노후 소득보장 제도입니다.
                  2026년 기준연금액은 월 최대 <strong>349,700원</strong>(부부 559,520원)으로 올랐고, 선정기준액도 단독가구 <strong>월 247만원</strong>으로 높아졌습니다.
                  누가 얼마를 받는지, 국민연금을 받으면 깎이는지, 어떻게 신청하는지 정확히 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-basic-pension-top" format="horizontal" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <div className="space-y-3 text-sm" data-speakable>
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 font-semibold text-text-primary">2026년 기초연금 주요 정보</caption>
                    <thead>
                      <tr className="bg-primary-500/10">
                        <th scope="col" className="border border-border-base px-2 py-2 text-left">항목</th>
                        <th scope="col" className="border border-border-base px-2 py-2 text-left">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-primary-500/5">
                        <td className="border border-border-base px-2 py-1 font-semibold">2026 기준연금액 (단독)</td>
                        <td className="border border-border-base px-2 py-1 font-bold text-primary-600 dark:text-primary-400">
                          월 최대 349,700원 (2025년 342,510원 → +7,190원)
                        </td>
                      </tr>
                      <tr className="bg-primary-500/5">
                        <td className="border border-border-base px-2 py-1 font-semibold">부부 합산 최대</td>
                        <td className="border border-border-base px-2 py-1 font-bold text-primary-600 dark:text-primary-400">
                          월 559,520원 (각 20% 부부감액)
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">대상</td>
                        <td className="border border-border-base px-2 py-1">만 65세 이상 + 소득 하위 70%</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">선정기준액 (소득인정액)</td>
                        <td className="border border-border-base px-2 py-1">단독 월 247만원 / 부부 월 395.2만원</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">국민연금 연계감액</td>
                        <td className="border border-border-base px-2 py-1">국민연금 월액이 524,550원 초과 시 일부 감액 (최소 50% 보장)</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">신청</td>
                        <td className="border border-border-base px-2 py-1">주민센터·국민연금공단·복지로(온라인)</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">법적 근거</td>
                        <td className="border border-border-base px-2 py-1">기초연금법 §3·§5·§8</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 기초연금이란? — 65세 이상 소득 하위 70%</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  기초연금은 만 65세 이상이면서 소득인정액이 선정기준액 이하인 어르신에게 매월 지급됩니다(기초연금법 §3).
                  국민연금처럼 보험료를 낸 대가가 아니라, 노후 소득을 보장하기 위해 국가가 세금으로 지급하는 제도입니다.
                  2026년 선정기준액은 단독가구 월 247만원, 부부가구 월 395만 2천원으로, 2025년보다 단독 기준 19만원 올랐습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">2026년 기초연금 선정기준액 (소득인정액 기준)</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">가구 유형</th>
                        <th scope="col" className="px-3 py-2 text-left">2025년</th>
                        <th scope="col" className="px-3 py-2 text-left">2026년</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">단독가구</td>
                        <td className="px-3 py-2">월 228만원</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">월 247만원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">부부가구</td>
                        <td className="px-3 py-2">월 364.8만원</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">월 395.2만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-danger-500 border-l-4 bg-danger-500/5 p-4">
                  <p className="text-sm text-danger-700 dark:text-danger-300">
                    <strong>⚠️ 다만,</strong> 공무원연금·사학연금·군인연금 등 직역연금을 받는 분과 그 배우자는 원칙적으로 기초연금 대상에서 제외됩니다.
                    또 선정기준액은 &ldquo;소득&rdquo;이 아니라 재산까지 환산해 합친 &ldquo;소득인정액&rdquo; 기준이라는 점에 유의하세요.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 얼마 받나? — 2026년 월 최대 349,700원</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  2026년 기준연금액은 단독가구 기준 월 최대 349,700원입니다(기초연금법 §5).
                  2025년 342,510원에서 7,190원 인상됐습니다.
                  부부가 모두 받으면 각각 20%씩 감액되어 합산 559,520원이 최대입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">2026년 기초연금 월 지급액 (최대 기준)</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">구분</th>
                        <th scope="col" className="px-3 py-2 text-left">1인당</th>
                        <th scope="col" className="px-3 py-2 text-left">가구 합산</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">단독가구</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">349,700원</td>
                        <td className="px-3 py-2">349,700원</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">부부가구 (둘 다 수급)</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">279,760원</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">559,520원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                  <p className="text-sm text-text-secondary">
                    <strong>💡 참고:</strong> 위 금액은 &ldquo;최대&rdquo;입니다.
                    소득인정액이 선정기준액에 가깝거나(소득역전 방지 감액), 국민연금을 많이 받으면(연계감액) 실제 수령액은 이보다 줄어듭니다.
                    반대로 소득·재산이 적은 어르신은 대부분 최대액을 받습니다.
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-basic-pension-mid" format="rectangle" />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 국민연금 받으면 기초연금이 깎이나? — 연계감액</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  많이 받으면 일부 깎일 수 있지만, 대부분은 전액 받습니다.
                  국민연금 월 수령액이 기초연금 기준연금액의 1.5배(2026년 약 524,550원)를 넘으면 기초연금이 일부 감액됩니다(국민연금 연계감액, 기초연금법 §5).
                  국민연금이 그 이하라면 기초연금은 전혀 줄지 않습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-2">핵심 안전장치 — 최소 50% 보장</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    연계감액이 적용되더라도 기준연금액의 <strong>50%(2026년 약 17만 5천원)</strong>는 반드시 보장됩니다.
                    즉 국민연금을 아무리 많이 받아도 기초연금이 0원이 되지는 않습니다.
                    &ldquo;국민연금 성실히 냈더니 기초연금 한 푼도 못 받는다&rdquo;는 말은 사실과 다릅니다.
                  </p>
                </div>
                <div className="rounded-lg border border-danger-500 border-l-4 bg-danger-500/5 p-4">
                  <p className="text-sm text-danger-700 dark:text-danger-300">
                    <strong>⚠️ 다만,</strong> 연계감액은 단순히 국민연금 액수만이 아니라 소득재분배급여(A급여) 부분을 함께 따져 계산합니다.
                    본인의 정확한 감액 여부는 국민연금공단(1355)에서 A급여액을 조회해 확인하는 것이 정확합니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 부부가 함께 받으면? — 부부감액 20%와 2027년 폐지</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  현재는 부부가 모두 기초연금을 받으면 각각 20%씩 감액됩니다(기초연금법 §8).
                  그래서 2026년 부부 합산 최대액은 559,520원으로, 단독 2명(699,400원)보다 적습니다.
                  다만 이 부부감액은 2027년부터 단계적으로 폐지가 확정되어, 앞으로 부부 수급액은 늘어날 예정입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                  <p className="text-sm text-text-secondary">
                    <strong>💡 왜 깎였나:</strong> 부부가 함께 살면 생활비를 일부 공유한다는 취지로 도입된 감액이지만, 1인 가구와의 형평성 논란이 이어져 폐지가 결정됐습니다.
                    2027년 이후 적용 방식은 보건복지부 고시로 확정되므로 발표를 확인하세요.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 소득인정액이란? — 신청 전에 알아야 할 기준</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  기초연금 수급 여부를 가르는 것은 단순 소득이 아니라 소득인정액입니다.
                  소득인정액은 소득평가액과 재산의 소득환산액을 더한 값입니다.
                  근로소득은 월 110만원을 기본공제한 뒤 30%를 추가 공제하고, 집·예금 등 재산은 지역별 기본재산액을 뺀 다음 연 4% 환산율로 월 소득으로 바꿔 더합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-2">계산이 복잡할 때</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    공제·환산율이 매년 바뀌고 항목이 많아 손으로 정확히 계산하기 어렵습니다.
                    복지로(bokjiro.go.kr) &ldquo;기초연금 모의계산&rdquo;에서 소득·재산을 입력하면 예상 수급 여부와 금액을 확인할 수 있습니다.
                    근로소득 공제 덕분에 일을 한다고 해서 곧바로 탈락하지는 않습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 신청 방법은? — 생일 한 달 전부터 신청</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  기초연금은 신청해야 받을 수 있으며, 자동으로 지급되지 않습니다.
                  만 65세 생일이 속한 달의 1개월 전부터 미리 신청할 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <ol className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>1) 신청 장소</strong> — 주소지 읍·면·동 주민센터, 국민연금공단 지사, 또는 복지로(bokjiro.go.kr) 온라인.
                    </li>
                    <li>
                      <strong>2) 준비물</strong> — 신분증, 본인 명의 통장, 배우자 금융정보 제공 동의서(부부의 경우), 전·월세 계약서(해당 시).
                    </li>
                    <li>
                      <strong>3) 소득·재산 조사</strong> — 신청 후 소득인정액 조사로 수급 여부와 금액이 결정됩니다.
                    </li>
                    <li>
                      <strong>4) 결과 통지·지급</strong> — 결정 통지 후 신청일이 속한 달부터 매월 지급됩니다.
                    </li>
                  </ol>
                </div>
                <div className="rounded-lg border border-danger-500 border-l-4 bg-danger-500/5 p-4">
                  <p className="text-sm text-danger-700 dark:text-danger-300">
                    <strong>⚠️ 주의:</strong> 신청이 늦으면 늦은 만큼 받지 못합니다(소급 지급 안 됨).
                    65세 생일 한 달 전부터 신청 가능하므로 미리 챙기세요. 거동이 불편하면 찾아뵙는 서비스(방문 신청)도 신청할 수 있습니다.
                  </p>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/guide/national-pension-2026/" className="text-primary-600 underline dark:text-primary-500">
                      국민연금 2026 — 보험료율·수령나이·개혁
                    </Link>
                    {' — 기초연금 연계감액의 기준이 되는 국민연금 수령액'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/severance-vs-pension-dc-db/" className="text-primary-600 underline dark:text-primary-500">
                      퇴직금 DC·DB 비교
                    </Link>
                    {' — 국민연금·기초연금과 함께 짜는 노후 3층 연금'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/private-pension-1500-million-separate-taxation-2026/" className="text-primary-600 underline dark:text-primary-500">
                      사적연금 1,500만원 분리과세 2026
                    </Link>
                    {' — 연금저축·IRP 수령 시 세금 갈림길'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/inheritance-tax-10-year-prior-gift-aggregation/" className="text-primary-600 underline dark:text-primary-500">
                      상속세 10년 사전증여 합산
                    </Link>
                    {' — 노후 자산을 자녀에게 물려줄 때의 세금'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/category/work/" className="text-primary-600 underline dark:text-primary-500">
                      근로 계산기·가이드
                    </Link>
                    {' — 연봉·퇴직금·은퇴자금 등 노후 설계 도구'}
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="기초연금 2026 — 월 최대 34만 9,700원, 선정기준·국민연금 연계"
                url={URL}
                description="2026년 기초연금 월 최대 349,700원(부부 559,520원). 선정기준액 단독 247만원·부부 395.2만원, 국민연금 연계감액·부부감액·신청 방법 정리."
              />

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 기초연금법 §3(수급권자의 범위)·§5(기초연금액의 산정·국민연금 연계)·§8(기초연금액의 감액) ·{' '}
                  <a
                    href="https://basicpension.mohw.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    기초연금 (basicpension.mohw.go.kr)
                  </a>{' '}
                  ·{' '}
                  <a
                    href="https://www.bokjiro.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    복지로 (bokjiro.go.kr)
                  </a>{' '}
                  ·{' '}
                  <a
                    href="https://www.mohw.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    보건복지부 (mohw.go.kr)
                  </a>{' '}
                  .
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 2026년 6월 9일 기준 보건복지부가 고시한 기초연금 기준연금액·선정기준액과 기초연금법령을 바탕으로 작성되었습니다.
                  기준연금액·선정기준액·소득인정액 산정 기준은 매년 고시로 변경되며, 부부감액 폐지 등 제도는 개정에 따라 달라질 수 있습니다.
                  본인의 정확한 수급 여부와 금액은 복지로(bokjiro.go.kr) 모의계산 또는 국민연금공단(국번 없이 1355)에서 확인하시기 바랍니다.
                  본 콘텐츠는 AI 보조 작성 후 운영자 검수를 거쳤습니다.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (calculatorhost)
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
