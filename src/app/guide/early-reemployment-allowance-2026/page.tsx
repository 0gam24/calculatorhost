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

const URL = 'https://calculatorhost.com/guide/early-reemployment-allowance-2026/';
const DATE_PUBLISHED = '2026-07-19';
const DATE_MODIFIED = '2026-07-19';

export const metadata: Metadata = {
  title: '조기재취업수당 2026 | 지급요건·계산법·신청시기',
  description:
    '조기재취업수당은 소정급여일수를 절반 이상 남기고 재취업하면 잔여일수의 절반만큼 구직급여일액을 곱해 지급합니다. 지급요건 3가지, 실제 계산 사례, 청구 시기까지 정리했습니다. 고용보험법 §64 기준.',
  keywords: [
    '조기재취업수당',
    '실업급여 재취업',
    '구직급여 잔여일수',
    '조기재취업수당 지급요건',
    '조기재취업수당 계산',
    '고용보험법 64조',
    '실업급여 신청 재취업',
    '조기재취업수당 청구서',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '조기재취업수당 2026 | 지급요건·계산법·신청시기' }],
    title: '조기재취업수당 2026 · 실업급여 남기고 재취업하면 받는 돈',
    description: '소정급여일수 절반 이상을 남기고 재취업·창업하면 조기재취업수당을 받을 수 있습니다. 지급요건과 정확한 계산법.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '조기재취업수당 2026 · 지급요건·계산법·신청시기',
    description: '구직급여일액 × 잔여 소정급여일수 × 2분의 1. 조기재취업수당의 정확한 계산법과 지급요건, 고용보험법 §64.',
  },
};

const FAQ_ITEMS = [
  {
    question: '조기재취업수당은 얼마를 받을 수 있나요?',
    answer:
      '조기재취업수당은 구직급여일액 × 잔여 소정급여일수 × 2분의 1로 계산됩니다(고용보험법 §64, 시행령 §84). 예를 들어 구직급여일액이 66,000원이고 소정급여일수 150일 중 90일을 남기고 재취업하면, 90일의 절반인 45일분 2,970,000원을 받습니다.',
  },
  {
    question: '아무 때나 재취업하면 조기재취업수당을 받을 수 있나요?',
    answer:
      '아닙니다. 실업 신고일부터 14일이 지난 후 재취업해야 하고, 재취업일 전날 기준 소정급여일수를 2분의 1 이상 남긴 상태여야 하며, 재취업한 곳에서 12개월 이상 계속 근무해야 지급 대상이 됩니다(고용보험법 §64). 세 요건을 모두 충족해야 합니다.',
  },
  {
    question: '자영업으로 창업해도 조기재취업수당을 받을 수 있나요?',
    answer:
      '네, 창업도 재취업과 동일하게 인정됩니다. 다만 사업을 12개월 이상 계속 영위했다는 사실을 실제 영업 증빙(사업자등록증, 매출 자료 등)으로 확인받아야 하며, 단순히 사업자 등록만 해두고 실질적으로 운영하지 않으면 인정되지 않을 수 있습니다.',
  },
  {
    question: '조기재취업수당은 언제, 어떻게 청구하나요?',
    answer:
      '재취업 또는 창업일로부터 12개월이 지난 후 조기재취업수당 청구서를 제출해야 합니다. 12개월간 계속 근무(또는 사업 영위)했는지 확인하는 절차이기 때문에, 청구 시점이 재취업일이 아니라 그로부터 1년 뒤라는 점에 유의해야 합니다. 이직일 당시 65세 이상인 경우 등은 예외가 적용될 수 있습니다.',
  },
  {
    question: '예전에 조기재취업수당을 받은 적이 있으면 또 받을 수 있나요?',
    answer:
      '재수급에는 제한이 있습니다. 과거 조기재취업수당을 받은 이력이 있으면 일정 기간 내에는 다시 받을 수 없도록 제한하는 규정이 있으므로, 정확한 재수급 가능 여부는 고용센터에서 확인해야 합니다.',
  },
  {
    question: '이직 전 다니던 회사에 다시 취업해도 받을 수 있나요?',
    answer:
      '원칙적으로 이직 전 사업주 또는 그와 밀접하게 관련된 사업주에게 재고용된 경우는 조기재취업수당 지급 대상에서 제외됩니다. 자회사·관계회사로 옮기는 경우도 해당될 수 있으니 재취업 전 고용센터에 미리 확인하는 것이 안전합니다.',
  },
  {
    question: '소정급여일수를 정확히 절반만 남기고 재취업해도 요건이 충족되나요?',
    answer:
      '네, 충족됩니다. 요건은 "2분의 1 이상"이므로 정확히 절반을 남긴 시점도 포함됩니다. 예를 들어 소정급여일수 150일이면 75일 이상 남기고 재취업해야 하며, 75일은 요건을 충족하지만 74일은 충족하지 못합니다.',
  },
  {
    question: '65세 이상 구직자는 조기재취업수당 요건이 다른가요?',
    answer:
      '네, 이직일 당시 65세 이상인 경우 등은 12개월 근속 확인이나 청구 시기 등에서 예외 규정이 적용될 수 있습니다(고용보험법 시행령 §84). 정확한 적용 기준은 관할 고용센터에 문의해 확인하는 것이 정확합니다.',
  },
];

export default function EarlyReemploymentAllowance2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '조기재취업수당 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '조기재취업수당 2026 · 지급요건·계산법·신청시기 완전정리',
    description:
      '실업급여 수급 중 소정급여일수를 절반 이상 남기고 재취업하면 받는 조기재취업수당. 지급요건 3가지, 구직급여일액 계산 사례, 경계값 판단법, 청구 절차까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['조기재취업수당', '실업급여', '구직급여일액', '소정급여일수', '고용보험법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '조기재취업수당 2026',
    description:
      '실업급여 수급 중 조기 재취업 시 받는 조기재취업수당의 지급요건과 정확한 계산법.',
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
                    { name: '조기재취업수당 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">구직급여 수급자 · 7분 읽기 · 2026-07-19</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  조기재취업수당 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 실업급여 남기고 재취업하면 받는 돈</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  실업급여를 받던 중 생각보다 빨리 취업이 되면 손해라고 느끼는 분들이 많습니다. 그런데 소정급여일수를 절반 이상 남기고 재취업하면, 남은 실업급여의 절반을 조기재취업수당으로 한 번에 받을 수 있습니다. 이 가이드는 지급요건 3가지, 정확한 계산법, 경계값 판단 기준, 청구 시기까지 완전히 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-early-reemployment-allowance-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">조기재취업수당이란 무엇인가요?</h2>
                <p>
                  조기재취업수당은 실업급여(구직급여) 수급 중 조기에 재취업하거나 창업한 사람에게 남은 급여일수의 일부를 미리 지급하는 제도입니다(고용보험법 §64, 시행령 §84). 실업급여를 다 쓰고 나서 취업하는 것보다, 빨리 취업한 사람에게 오히려 인센티브를 주는 구조입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">조기재취업수당의 기본 원리</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    지급액 = 구직급여일액 × 잔여 소정급여일수 × 2분의 1
                    <br />
                    예: 구직급여일액 66,000원, 소정급여일수 150일 중 90일을 남기고 재취업
                    <br />
                    → 45일(90일의 절반) × 66,000원 = <strong>2,970,000원</strong>
                  </p>
                </div>
                <p className="mt-4">
                  이 제도의 취지는 구직자가 실업급여를 끝까지 소진하기보다 빠르게 노동시장으로 복귀하도록 유도하는 데 있습니다. 다만 아무나 받을 수 있는 것은 아니며, 아래 요건을 모두 충족해야 합니다.
                </p>
                <p className="mt-4">
                  다만 조기재취업수당은 자동으로 지급되지 않습니다. 재취업일로부터 12개월이 지난 후 별도의 청구 절차를 거쳐야만 지급받을 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">조기재취업수당 지급요건 3가지는 무엇인가요?</h2>
                <p>
                  조기재취업수당을 받으려면 다음 세 가지 요건을 모두 충족해야 합니다(고용보험법 §64). 하나라도 빠지면 지급 대상에서 제외됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 조기재취업수당 지급요건 3가지 (고용보험법 §64, 시행령 §84)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">요건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">① 재취업 시점</td>
                        <td className="p-3">실업 신고일부터 14일이 지난 후 재취업(또는 창업)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">② 잔여일수</td>
                        <td className="p-3">재취업일 전날 기준 소정급여일수를 2분의 1 이상 남긴 상태</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">③ 근속기간</td>
                        <td className="p-3">재취업한 곳에서 12개월 이상 계속 근무(또는 사업 영위)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  세 요건이 모두 충족되어야 하며, 이직일 당시 65세 이상인 경우 등은 예외 규정이 적용될 수 있습니다(시행령 §84).
                </p>
                <p className="mt-4">
                  다만 이직 전 사업주 또는 그와 밀접하게 관련된 사업주에게 재고용된 경우는 지급 대상에서 제외됩니다. 자회사나 계열사로 이동한 경우도 해당될 수 있으므로 재취업 전 고용센터에 미리 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">조기재취업수당은 얼마나 받을 수 있나요?</h2>
                <p>
                  지급액은 구직급여일액 × 잔여 소정급여일수 × 2분의 1로 계산됩니다(고용보험법 §64). 잔여 소정급여일수란 재취업일 전날을 기준으로 아직 받지 않은 실업급여 일수를 말합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 소정급여일수 150일 중 90일을 남기고 재취업</p>
                  <p className="text-sm text-text-secondary">
                    · 구직급여일액: 66,000원
                    <br />
                    · 소정급여일수: 150일
                    <br />
                    · 재취업 전날 기준 잔여일수: 90일
                    <br />
                    · 지급 대상 일수: 90일 × 2분의 1 = <strong>45일</strong>
                    <br />
                    · 조기재취업수당: 45일 × 66,000원 = <strong>2,970,000원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 소정급여일수 210일 중 120일을 남기고 재취업</p>
                  <p className="text-sm text-text-secondary">
                    · 구직급여일액: 60,000원
                    <br />
                    · 소정급여일수: 210일
                    <br />
                    · 재취업 전날 기준 잔여일수: 120일
                    <br />
                    · 지급 대상 일수: 120일 × 2분의 1 = <strong>60일</strong>
                    <br />
                    · 조기재취업수당: 60일 × 60,000원 = <strong>3,600,000원</strong>
                  </p>
                </div>
                <p className="mt-4">
                  다만 구직급여일액에는 고용노동부 고시에 따른 상한액·하한액이 적용됩니다. 실제 자신의 구직급여일액은 실업급여 수급자격증 또는 고용센터 안내문에서 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">잔여일수 경계값은 어떻게 판단하나요?</h2>
                <p>
                  요건은 "소정급여일수의 2분의 1 이상"을 남기는 것이므로, 정확히 절반을 남긴 시점도 요건을 충족합니다. 절반에서 하루라도 모자라면 지급 대상에서 제외됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 소정급여일수 150일 기준 잔여일수별 요건 충족 여부 (고용보험법 §64)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">재취업 전날 잔여일수</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">절반(75일) 대비</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">요건 충족 여부</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">76일</td>
                        <td className="p-3">절반 초과</td>
                        <td className="p-3"><strong>충족</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">75일</td>
                        <td className="p-3">절반과 동일</td>
                        <td className="p-3"><strong>충족</strong> (2분의 1 이상)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">74일</td>
                        <td className="p-3">절반 미만</td>
                        <td className="p-3"><strong>미충족</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  즉 소정급여일수 150일이면 75일 이상 남기고 재취업해야 하며, 74일은 요건을 충족하지 못합니다. 재취업 시점을 며칠 조정할 수 있는 상황이라면 이 경계값을 미리 계산해보는 것이 유리합니다.
                </p>
                <p className="mt-4">
                  다만 잔여일수 기준일은 재취업일 "전날"이므로, 재취업일 자체를 며칠 앞당기거나 늦추는 것만으로 하루 차이가 요건 충족 여부를 가를 수 있습니다. 정확한 잔여일수는 고용센터 또는 워크넷 실업인정 내역에서 확인해야 합니다.
                </p>
              </section>

              <AdSlot slot="guide-early-reemployment-allowance-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">조기재취업수당은 언제, 어떻게 청구하나요?</h2>
                <p>
                  조기재취업수당은 재취업(또는 창업)일로부터 12개월이 지난 후 청구서를 제출해야 지급받을 수 있습니다. 재취업 즉시 신청하는 제도가 아니라는 점을 반드시 기억해야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>1단계 · 재취업(또는 창업):</strong> 앞서 설명한 3가지 요건 중 시점·잔여일수 요건을 충족한 상태에서 재취업합니다.
                  </li>
                  <li>
                    <strong>2단계 · 12개월 근속(또는 사업 영위) 확인:</strong> 재취업한 곳에서 12개월 이상 계속 근무하거나 사업을 계속 운영해야 합니다.
                  </li>
                  <li>
                    <strong>3단계 · 청구서 제출:</strong> 12개월이 지난 후 관할 고용센터에 조기재취업수당 청구서와 재직증명서(또는 사업 영위 증빙)를 제출합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 이직일 당시 65세 이상인 경우 등은 청구 시기나 근속 확인 방식에서 예외가 적용될 수 있으므로(시행령 §84), 정확한 절차는 관할 고용센터에서 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">조기재취업수당 신청 시 주의할 점은 무엇인가요?</h2>
                <p>
                  조기재취업수당은 한 번 받았다고 이후 실업급여 수급 때마다 반복해서 받을 수 있는 제도가 아닙니다. 아래 사항을 놓치면 청구 자체가 반려될 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>재수급 제한:</strong> 과거 조기재취업수당을 받은 이력이 있으면 일정 기간 내에는 다시 받을 수 없도록 제한하는 규정이 있습니다.
                  </li>
                  <li>
                    <strong>이직 전 사업주 재고용 제외:</strong> 이직 전 사업주나 그와 밀접하게 관련된 사업주에게 다시 고용된 경우는 대상에서 제외됩니다.
                  </li>
                  <li>
                    <strong>자영업 증빙:</strong> 창업의 경우 사업자등록만으로는 부족하며, 실제 영업 사실을 증빙 자료로 확인받아야 합니다.
                  </li>
                  <li>
                    <strong>12개월 미충족:</strong> 재취업 후 12개월을 채우지 못하고 퇴사하면 청구 요건 자체가 성립하지 않습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 개별 사정에 따라 예외가 인정되는 경우도 있으므로, 청구 전 반드시 관할 고용센터 또는 고용보험 홈페이지(ei.go.kr)에서 자신의 상황을 확인하는 것이 가장 정확합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/unemployment-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">실업급여(구직급여) 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">소정급여일수·구직급여일액 산정 기준부터 신청 절차까지.</p>
                  </Link>
                  <Link
                    href="/guide/mid-year-resignation-year-end-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연중 퇴사 시 연말정산</div>
                    <p className="mt-1 text-sm text-text-secondary">재취업 시점에 따라 달라지는 연말정산 처리 방법.</p>
                  </Link>
                  <Link
                    href="/guide/parental-leave-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">육아휴직급여 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">고용보험 급여 제도를 함께 이해하면 도움이 됩니다.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 직장인 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·퇴직금·은퇴자금 등 직장인 관련 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 노무·법률 상담이 아닙니다. 실제 조기재취업수당 지급 대상 여부, 지급액, 재수급 제한 적용 여부는 관할 고용센터 또는 고용보험 홈페이지(ei.go.kr)에서 반드시 확인하세요. 특히 65세 이상 예외 규정, 재수급 제한, 이직 전 사업주 재고용 등은 개별 사정에 따라 판단이 달라질 수 있으므로 직접 문의하는 것이 안전합니다. 본 콘텐츠는 2026-07-19를 기준으로 작성되었으며, 고용보험법 개정 시 즉시 업데이트됩니다. 조기재취업수당의 정확한 기준은 <strong>고용보험법 §64(조기재취업 수당)</strong> 및 <strong>같은 법 시행령 §84(조기재취업 수당의 지급기준)</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.ei.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용보험 홈페이지</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>.
                </p>
              </section>

              <ShareButtons
                title="조기재취업수당 2026 가이드"
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
