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

const URL = 'https://calculatorhost.com/guide/multi-child-vehicle-acquisition-tax-exemption-2026/';
const DATE_PUBLISHED = '2026-08-03';
const DATE_MODIFIED = '2026-08-03';

export const metadata: Metadata = {
  title: '다자녀 자동차 취득세 감면 2026, 3자녀 면제·2자녀 50%',
  description:
    '18세 미만 자녀 3명 이상 양육자는 양육용 차 1대 취득세 면제(6인 이하 승용은 140만원 한도, 초과분만 납부). 2자녀는 50% 경감. 지방세특례제한법 §22의2, 2027년 12월 31일까지.',
  keywords: [
    '다자녀 자동차 취득세 면제',
    '3자녀 차 취득세',
    '다자녀 취득세 140만원',
    '2자녀 취득세 감면',
    '다자녀 카니발 취득세',
    '다자녀 자동차 세제혜택',
    '지방세특례제한법 22조의2',
    '18세 미만 자녀 취득세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '다자녀 자동차 취득세 감면 2026, 3자녀 면제·2자녀 50%' }],
    title: '다자녀 자동차 취득세 감면 2026, 3자녀 면제·2자녀 50%',
    description: '자녀 3명 이상이면 양육용 차 1대 취득세 면제(7~10인승 전액, 6인 이하는 140만원 한도). 자녀 2명은 50% 경감. 지방세특례제한법 §22의2 기준 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '다자녀 자동차 취득세 감면 2026, 3자녀 면제·2자녀 50%',
    description: '18세 미만 3자녀 이상은 양육용 차 1대 취득세 면제, 2자녀는 50% 경감. 지방세특례제한법 §22의2.',
  },
};

const FAQ_ITEMS = [
  {
    question: '자녀가 3명이면 어떤 차든 취득세가 전액 면제되나요?',
    answer:
      '차종과 승차정원에 따라 다릅니다. 지방세특례제한법 §22의2에 따라 승차정원 7~10인승 승용자동차는 취득세가 전액 면제되지만, 6인 이하 승용자동차는 취득세가 140만원 이하일 때만 전액 면제되고 140만원을 넘으면 140만원을 공제하고 초과분만 납부합니다. 승합(15인 이하)·화물(1톤 이하)·이륜(250cc 이하)은 대체로 전액 면제 대상입니다.',
  },
  {
    question: '자녀 나이는 몇 살까지 인정되나요?',
    answer:
      '18세 미만 자녀만 인원 산정에 포함됩니다. 취득·등록 시점을 기준으로 판단하며, 감면 신청 이후 자녀가 성년(만 18세)이 되어도 이미 감면받은 취득세는 그대로 유지됩니다. 다만 신청 시점에 셋째가 이미 18세를 넘었다면 3자녀 요건이 성립하지 않으니 출생·주민등록 관계로 정확한 인원을 먼저 확인하세요.',
  },
  {
    question: '자녀가 2명인 가구도 감면을 받을 수 있나요?',
    answer:
      '네, 2025년 개정으로 18세 미만 자녀 2명 양육자도 취득세 50% 경감 대상에 포함되었습니다(지방세특례제한법 §22의2). 다만 감면 한도, 차종 기준, 세부 요건은 3자녀의 전액 면제와 다를 수 있고 지자체별 안내가 조금씩 다르므로, 실제 신청 전에 위택스나 관할 시·군·구청에서 정확한 감면율과 한도를 확인하시는 것을 권장합니다.',
  },
  {
    question: '한 세대에서 몇 대까지 감면받을 수 있나요?',
    answer:
      '세대 기준 1대만 감면됩니다. 이미 다자녀 감면을 받은 차량이 세대 내에 있으면 두 번째 차량은 대상에서 제외되며, 배우자 명의로 이전하거나 세대분리를 해도 감면 목적의 위장 이전으로 판단되면 추징될 수 있습니다. 감면받은 차량을 매각한 뒤 새 차로 교체하는 경우에는 관할 지자체에 사전 문의해 승계 가능 여부를 확인하세요.',
  },
  {
    question: '언제까지, 어떻게 신청해야 하나요?',
    answer:
      '취득일부터 60일 이내에 취득세를 신고할 때 함께 감면 신청을 하면 됩니다. 감면신청서에 가족관계증명서(자녀 나이 확인), 주민등록등본, 자동차 등록 서류를 첨부해 관할 시·군·구청이나 위택스(wetax.go.kr)에 접수합니다. 신고 기한을 넘겼거나 감면 신청을 빠뜨렸다면 경정청구로 나중에 환급받을 수도 있으니 포기하지 마세요.',
  },
  {
    question: '감면받은 차를 팔거나 명의를 바꾸면 어떻게 되나요?',
    answer:
      '자동차 등록일부터 1년 이내에 정당한 사유 없이 소유권을 이전하거나 양도하면 감면받은 취득세가 추징됩니다(지방세특례제한법 §22의2). 사망·혼인·이민 등 부득이한 사유는 예외로 인정될 수 있으나, 단순히 더 큰 차로 교체하려는 경우 등은 추징 대상입니다. 감면 혜택을 유지하려면 등록 후 최소 1년은 보유하는 것이 안전합니다.',
  },
  {
    question: '취득세가 면제되면 지방교육세와 농특세도 면제되나요?',
    answer:
      '취득세와 부가세목(지방교육세·농어촌특별세)은 별도로 판단됩니다. 다자녀 감면의 경우 취득세 본세는 면제되지만 부가세목의 감면 범위는 조문과 지자체 운영에 따라 달라질 수 있어, 실제 고지서에는 소액의 부가세목이 남을 수 있습니다. 정확한 최종 부담액은 취득세 신고 시점에 위택스 또는 관할 시·군·구청에서 확인하세요.',
  },
  {
    question: '전기차 감면과 다자녀 감면을 동시에 받을 수 있나요?',
    answer:
      '두 감면은 원칙적으로 서로 다른 조문에 기반하므로 중복 적용이 완전히 배제되지는 않지만, 세대 내에 이미 다른 사유로 감면받은 차량이 있으면 다자녀 감면이 제외될 수 있습니다. 또한 하나의 차량에 대해서는 감면액이 큰 쪽으로 선택 적용되는 경우가 많으므로, 전기차·경차·다자녀 중 어느 것이 유리한지 미리 위택스 또는 관할 지자체에 확인한 뒤 신청하는 것이 안전합니다.',
  },
];

export default function MultiChildVehicleAcquisitionTaxExemption2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '다자녀 자동차 취득세 감면 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '다자녀 자동차 취득세 감면 2026, 3자녀 면제·2자녀 50% 완전 정리',
    description:
      '18세 미만 자녀 3명 이상이면 양육 목적 차량 1대 취득세 전액 면제(6인 이하 승용은 140만원 한도), 자녀 2명은 50% 경감. 지방세특례제한법 §22의2 기준 신청·추징까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['다자녀 자동차 취득세', '3자녀 취득세 면제', '2자녀 취득세 50%', '지방세특례제한법 22조의2', '카니발 취득세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '다자녀 자동차 취득세 감면 2026',
    description:
      '3자녀 이상 가구의 자동차 취득세 면제, 2자녀 50% 경감, 차종·인승별 한도와 신청 절차를 정리한 가이드.',
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
                    { name: '다자녀 자동차 취득세 감면 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">다자녀 학부모 · 9분 읽기 · 2026-08-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  다자녀 자동차 취득세 감면 2026
                  <br />
                  <span className="text-2xl text-text-secondary">3자녀 면제·2자녀 50%, 지방세특례제한법 §22의2</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  아이가 셋이면 차 한 대는 통째로 취득세를 안 낼 수 있고, 둘이어도 절반은 깎일 수 있다는 이야기를 어렴풋이 들어봤을 겁니다. 문제는 어떤 차종이 되는지, 몇 인승이어야 전액 면제인지, 6인 이하 승용은 왜 140만원이라는 숫자가 붙는지가 지자체마다 안내가 조금씩 달라 혼란스럽다는 점입니다. 이 가이드는 지방세특례제한법 §22의2를 기준으로 다자녀 자동차 취득세 감면의 대상·한도·신청 기한·추징 조건을 하나하나 정리해, 아이를 태울 차를 계약하기 직전에 놓치지 않도록 돕습니다.
                </p>
              </header>

              <AdSlot slot="guide-multi-child-vehicle-acquisition-tax-exemption-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">다자녀 자동차 취득세 감면이란 무엇인가요?</h2>
                <p>
                  다자녀 자동차 취득세 감면은 18세 미만 자녀를 여러 명 양육하는 가구가 양육 목적으로 자동차를 취득할 때 취득세를 면제하거나 경감해 주는 지방세 감면 제도입니다. 근거는 지방세특례제한법 §22의2(다자녀 양육자에 대한 감면)이며, 3자녀 이상은 원칙적으로 전액 면제, 2자녀 가구는 50% 경감을 적용받습니다. 적용 기한은 2027년 12월 31일까지 취득·등록하는 차량입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 대상: 18세 미만 자녀 3명 이상(또는 2명, 50% 경감) 양육자
                    <br />
                    · 대수: 세대당 양육 목적 차량 1대
                    <br />
                    · 승용 7~10인승: 취득세 전액 면제
                    <br />
                    · 승용 6인 이하: 취득세 140만원 이하면 전액 면제, 초과 시 140만원 공제 후 잔액 납부
                    <br />
                    · 승합(15인 이하)·화물(1톤 이하)·이륜(250cc 이하): 감면 대상
                    <br />
                    · 신청: 취득일부터 60일 이내 취득세 신고 시 감면신청서 제출
                    <br />
                    · 추징: 등록 후 1년 이내 정당한 사유 없이 이전·양도 시 감면세액 추징
                  </p>
                </div>
                <p>
                  다만 취득세와 같이 부과되는 지방교육세·농어촌특별세 등 부가세목의 감면 여부는 조문 해석과 지자체 안내에 따라 달라질 수 있어 실제 고지서에는 소액이 남을 수 있습니다. 정확한 최종 부담액은 신고 단계에서 위택스나 관할 시·군·구청 세무 담당자에게 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자녀가 몇 명이어야 감면받을 수 있나요?</h2>
                <p>
                  기준은 취득·등록 시점에 18세 미만인 자녀 수입니다. 지방세특례제한법 §22의2는 원래 3자녀 이상 양육자를 대상으로 취득세를 면제해 왔고, 2025년 개정으로 2자녀 양육자까지 50% 경감 대상에 포함되었습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>18세 미만 자녀 3명 이상:</strong> 취득세 전액 면제(6인 이하 승용은 140만원 한도 적용). 세대당 양육 목적 차량 1대에 한합니다.
                  </li>
                  <li>
                    <strong>18세 미만 자녀 2명:</strong> 취득세 50% 경감. 세부 한도와 차종 요건은 3자녀 규정과 차이가 있을 수 있으므로 위택스 또는 관할 지자체 확인이 필요합니다.
                  </li>
                  <li>
                    <strong>기준 시점:</strong> 취득·등록일 기준으로 판단합니다. 신청 후 자녀가 성년이 되어도 이미 확정된 감면은 유지되지만, 신청 시점에 이미 18세가 지난 자녀는 인원에서 제외됩니다.
                  </li>
                  <li>
                    <strong>가족관계 확인:</strong> 가족관계증명서와 주민등록등본으로 자녀 수·나이를 증빙합니다. 재혼 가정의 자녀, 입양 자녀 포함 여부는 관할 지자체에 사전 문의하세요.
                  </li>
                </ul>
                <p>
                  다만, 세대 내에 이미 다자녀 감면을 받은 차량이 있으면 두 번째 차량은 대상에서 제외됩니다. 배우자·부모 명의로 나눠도 세대가 같으면 1대 한도가 그대로 적용되니, 감면 신청 전에 세대분리 여부와 다른 감면 차량 유무를 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">차종·인승별로 얼마까지 감면되나요?</h2>
                <p>
                  같은 3자녀 가구라도 어떤 차를 사느냐에 따라 감면 폭이 크게 갈립니다. 특히 6인 이하 승용자동차는 140만원 한도가 있고, 7인승 이상 승용과 승합·화물·이륜은 취득세를 통째로 면제받는 구조라는 점이 핵심입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 다자녀 3자녀 이상 취득세 감면 한도 (지방세특례제한법 §22의2, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">차종·구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">감면 방식</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">대표 사례</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">승용자동차 7~10인승</td>
                        <td className="p-3"><strong>전액 면제</strong></td>
                        <td className="p-3">카니발·스타리아 등 7~9인승</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">승용자동차 6인 이하</td>
                        <td className="p-3"><strong>140만원까지 면제, 초과분만 납부</strong></td>
                        <td className="p-3">일반 세단·SUV 5인승</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">승합자동차(승차정원 15인 이하)</td>
                        <td className="p-3">면제</td>
                        <td className="p-3">소형 승합</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">화물자동차(최대적재량 1톤 이하)</td>
                        <td className="p-3">면제</td>
                        <td className="p-3">1톤 트럭</td>
                      </tr>
                      <tr>
                        <td className="p-3">이륜자동차(배기량 250cc 이하)</td>
                        <td className="p-3">면제</td>
                        <td className="p-3">스쿠터·소형 오토바이</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  왜 6인 이하 승용에만 140만원 한도가 있느냐 하면, 다자녀 감면의 정책 취지가 아이들을 한꺼번에 태울 수 있는 차량 지원이기 때문입니다. 5인승 세단·SUV는 아이를 여럿 태우기에 적합하지 않다고 보아 감면 폭을 제한한 것이고, 7~10인승 다인승 차량은 취득세 전액 면제로 강하게 지원합니다.
                </p>
                <p>
                  주의: 같은 카니발이라도 승차정원이 몇 인승이냐, 화물밴 개조 여부는 어떠하냐에 따라 분류가 달라져 감면 방식이 바뀔 수 있습니다. 계약서에 인승·차종 표기가 명확한지 확인하고, 애매하면 신청 전에 위택스 또는 관할 시·군·구청에 문의하세요. 예외적으로 2자녀 가구의 감면 한도·차종 범위는 3자녀 규정과 다를 수 있어 실제 신고 직전에 조건을 다시 확인하는 편이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 취득세 감면 계산 사례</h2>
                <p>
                  가상의 세 가지 사례로 감면 폭을 비교해 보겠습니다. 취득세 본세만 계산하며, 지방교육세·농어촌특별세 등 부가세목은 별도 판단이 필요합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 7인승 SUV, 취득세 220만원 (3자녀)</p>
                  <p className="text-sm text-text-secondary">
                    · 차종·인승: 승용자동차 7인승
                    <br />
                    · 산출 취득세 본세: 220만원
                    <br />
                    · 감면 방식: 승용 7~10인승 전액 면제
                    <br />
                    · 실제 납부 취득세: <strong>0원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 220만원 전액 면제. 부가세목(지교세·농특세)은 별도 확인.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 5인승 세단, 취득세 120만원 (3자녀)</p>
                  <p className="text-sm text-text-secondary">
                    · 차종·인승: 승용자동차 6인 이하(5인승)
                    <br />
                    · 산출 취득세 본세: 120만원
                    <br />
                    · 감면 방식: 140만원 이하이므로 전액 면제
                    <br />
                    · 실제 납부 취득세: <strong>0원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 140만원 한도 내라 결과적으로 취득세 본세는 0원.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 5인승 SUV, 취득세 180만원 (3자녀)</p>
                  <p className="text-sm text-text-secondary">
                    · 차종·인승: 승용자동차 6인 이하(5인승)
                    <br />
                    · 산출 취득세 본세: 180만원
                    <br />
                    · 감면 방식: 140만원 공제, 초과분 40만원만 납부
                    <br />
                    · 실제 납부 취득세: 180만원 − 140만원 = <strong>40만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 6인 이하 승용은 취득세가 140만원을 넘으면 그 초과분만 부담.</span>
                  </p>
                </div>
                <p className="mt-4">
                  세 사례를 비교하면, 같은 3자녀 가구라도 7~10인승 다인승 차량으로 갈아탈 때 감면 효과가 가장 큽니다. 반대로 고급 5인승 SUV처럼 취득세가 140만원을 훌쩍 넘는 차량은 감면을 받아도 여전히 수십만원의 취득세가 남는 구조라는 점을 미리 계산에 넣어야 합니다. 예외: 2자녀 가구의 사례별 실효 세액은 50% 경감 특성상 계산 방식이 달라지므로 위택스에서 개별 시뮬레이션을 권장합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떤 차량이 대상인가요?</h2>
                <p>
                  다자녀 감면은 양육 목적의 차량 1대에만 적용됩니다. 사업용·영업용으로 등록된 차량이나 세대 내 다른 명의로 이미 감면받은 차량이 있는 경우 대상에서 제외됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>양육 목적 자동차 1대:</strong> 다자녀 양육자 본인 명의(또는 배우자 공동명의 등 지자체 인정 범위) 차량이어야 하며, 세대당 1대로 제한됩니다.
                  </li>
                  <li>
                    <strong>승용자동차:</strong> 7~10인승 전액 면제, 6인 이하 140만원 한도. 카니발·스타리아 같은 다인승 미니밴이 대표적 수혜 차종입니다.
                  </li>
                  <li>
                    <strong>승합자동차:</strong> 승차정원 15인 이하 승합차. 아이 여럿과 부모까지 태울 수 있는 소형 승합이 여기 속합니다.
                  </li>
                  <li>
                    <strong>화물자동차:</strong> 최대적재량 1톤 이하. 자영업·소상공인 겸용으로 활용하는 사례가 많습니다.
                  </li>
                  <li>
                    <strong>이륜자동차:</strong> 배기량 250cc 이하 이륜차도 대상. 배달업 종사자 등에게 유용합니다.
                  </li>
                </ul>
                <p>
                  다만, 리스·렌터카 차량은 명의 구조상 감면 대상이 아닌 경우가 많고, 법인 명의 차량은 다자녀 감면 취지에 맞지 않아 제외됩니다. 중고차라도 지방세특례제한법 §22의2 요건(양육 목적, 세대당 1대, 자녀 3명 이상 등)을 충족하면 감면 대상이 될 수 있으나, 이전 소유자의 감면 이력이 있으면 승계 여부를 관할 지자체에서 반드시 확인해야 합니다.
                </p>
              </section>

              <AdSlot slot="guide-multi-child-vehicle-acquisition-tax-exemption-2026-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">언제, 어떻게 신청하나요?</h2>
                <p>
                  다자녀 감면은 자동으로 적용되지 않고 반드시 신청해야 합니다. 취득세 신고 기한인 취득일부터 60일 이내에 감면 신청을 함께 접수하는 것이 가장 안전합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">1단계. 필요 서류 준비</p>
                  <p className="text-sm text-text-secondary">
                    가족관계증명서(자녀 수·나이 확인), 주민등록등본(세대 확인), 자동차 매매계약서·양도증명서 등 등록 서류, 신청인 신분증. 지자체에 따라 감면신청서 서식이 별도 있으니 위택스 또는 관할 시·군·구청 홈페이지에서 미리 다운로드하세요.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">2단계. 취득세 신고와 감면 신청 동시 접수</p>
                  <p className="text-sm text-text-secondary">
                    취득일부터 60일 이내에 관할 시·군·구청 세무과 또는 위택스(wetax.go.kr)에서 취득세를 신고할 때 감면신청서를 함께 제출합니다. 자동차 등록 사업소에서 등록과 취득세 신고를 동시에 진행하는 경우가 많으므로, 방문 전에 서류를 챙겨 가는 것이 효율적입니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">3단계. 신고 기한을 놓쳤다면 경정청구</p>
                  <p className="text-sm text-text-secondary">
                    60일 이내 감면 신청을 빠뜨렸다면 이미 낸 취득세에 대해 경정청구로 환급을 요청할 수 있습니다. 기한과 절차는 지방세기본법의 경정청구 규정을 따르므로, 관할 지자체나 위택스 안내를 확인해 최대한 빨리 접수하세요.
                  </p>
                </div>
                <p className="mt-4">
                  적용 기한은 2027년 12월 31일까지 취득·등록하는 차량입니다. 이후에는 개정 여부와 감면율이 달라질 수 있으니, 감면 혜택을 활용하려면 기한 안에 계약·등록·신청을 마무리하는 편이 안전합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">감면 후 1년 이내 처분하면 왜 추징되나요?</h2>
                <p>
                  다자녀 감면은 양육 목적으로 차량을 실제 사용하는 것을 전제로 하기 때문에, 등록 후 짧은 시간에 소유권을 이전하거나 매각하면 감면 취지에 어긋난 것으로 보고 감면세액을 추징합니다. 지방세특례제한법 §22의2는 자동차 등록일부터 1년 이내에 정당한 사유 없이 소유권을 이전하거나 양도한 경우 감면된 취득세를 추징하도록 규정합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>추징 대상 사례:</strong> 등록 후 6개월 만에 지인에게 매각, 세대분리 후 자녀 명의로 이전, 감면 목적의 위장 명의 취득 등.
                  </li>
                  <li>
                    <strong>예외적 정당 사유:</strong> 취득자 사망, 혼인·이혼 등 가족관계 변동, 이민, 천재지변·사고로 인한 폐차, 그 밖에 관할 지자체가 인정하는 부득이한 사유.
                  </li>
                  <li>
                    <strong>추징세액 계산:</strong> 감면받은 취득세 전액이 원칙이며, 가산세가 함께 부과될 수 있습니다.
                  </li>
                </ul>
                <p>
                  다만 정당 사유의 판단은 지자체 재량이 큽니다. 예상치 못한 사정으로 1년 이내에 처분해야 한다면 미리 관할 시·군·구청 세무 담당자와 상의해 소명 자료를 준비하는 것이 좋습니다. 감면 혜택을 온전히 지키려면 등록 후 최소 1년은 실제 양육에 사용하며 보유하는 것이 가장 안전한 전략입니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/acquisition-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">감면 전 산출 취득세를 미리 확인해 감면 폭을 가늠하세요.</p>
                  </Link>
                  <Link
                    href="/guide/vehicle-acquisition-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자동차 취득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">차종·가격별 취득세율과 부가세목을 한 번에 정리.</p>
                  </Link>
                  <Link
                    href="/guide/electric-vehicle-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전기차 자동차세·감면 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">전기차 취득세·자동차세 감면과 다자녀 혜택 비교 포인트.</p>
                  </Link>
                  <Link
                    href="/guide/newborn-childbirth-acquisition-tax-reduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">출산·양육 취득세 감면</div>
                    <p className="mt-1 text-sm text-text-secondary">신생아·출산 가구의 주택·차량 취득세 감면 요건 정리.</p>
                  </Link>
                  <Link
                    href="/guide/child-tax-benefit-payment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자녀 세제 혜택·수당 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">자녀장려금·자녀세액공제 등 연간 지원금 총정리.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·재산세·상속세·종부세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무·법률 조언이 아닙니다. 다자녀 감면의 정확한 대상 여부, 감면 한도, 부가세목 처리, 2자녀 가구의 세부 요건은 지자체 운영 지침과 개정 상황에 따라 달라질 수 있으므로, 실제 신고 전 위택스(wetax.go.kr) 또는 관할 시·군·구청 세무 담당자에게 반드시 확인하세요. 특히 리스·렌터카·법인 명의 차량, 재혼·입양 자녀 인원 산정, 감면 후 1년 이내 처분의 정당 사유 인정 여부 등은 사례별 판단이 필요합니다. 본 콘텐츠는 2026-08-03을 기준으로 작성되었으며, 지방세특례제한법 §22의2 및 시행령·시행규칙 개정 시 즉시 업데이트됩니다. 감면의 정확한 법적 근거는 <strong>지방세특례제한법 §22의2(다자녀 양육자에 대한 감면)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(지방세특례제한법 §22의2)</a>,{' '}
                  <a href="https://easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기쉬운 생활법령정보(easylaw.go.kr)</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스(지방세 종합정보)</a>.
                </p>
              </section>

              <ShareButtons
                title="다자녀 자동차 취득세 감면 2026 가이드"
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