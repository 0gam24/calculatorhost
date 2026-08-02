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

const URL = 'https://calculatorhost.com/guide/real-estate-earnest-money-forfeit-2026/';
const DATE_PUBLISHED = '2026-08-03';
const DATE_MODIFIED = '2026-08-03';

export const metadata: Metadata = {
  title: '부동산 계약금 해약금·가계약금 2026, 배액상환·반환 기준',
  description:
    '부동산 계약금을 걸고 마음이 바뀌면 어떻게 되는지 정리했습니다. 매수인은 계약금 포기, 매도인은 배액상환으로 해제 가능(민법 §565). 이행착수 시한, 가계약금 반환, 일부 지급 판례까지.',
  keywords: [
    '계약금 포기 계약해지',
    '매도인 배액배상',
    '가계약금 반환',
    '부동산 계약 취소 계약금',
    '해약금 계약해제',
    '민법 565조',
    '위약금 손해배상 예정',
    '이행착수 전 해제',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '부동산 계약금 해약금·가계약금 2026, 배액상환·반환 기준' }],
    title: '부동산 계약금 해약금·가계약금 2026, 배액상환·반환 기준',
    description: '매수인 포기 vs 매도인 배액상환의 정확한 기준. 이행착수 시한, 가계약금 반환 여부, 계약금 일부 지급 시 대법원 판례까지 민법 §565 기준으로 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '부동산 계약금 해약금·가계약금 2026, 배액상환·반환 기준',
    description: '계약금 5,000만 원 포기, 매도인 배액 1억 상환. 이행착수 전까지만 가능. 가계약금은 사안별. 민법 §565·§398 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '계약금 5,000만 원을 걸었는데 취소하려면 얼마를 손해 보나요?',
    answer:
      '매수인이 해약금 해제를 하는 경우 원칙적으로 계약금 전액인 5,000만 원을 포기해야 합니다(민법 §565). 즉, 계약을 없던 것으로 하고 계약금을 반환받지 못하는 방식으로 해제하는 것입니다. 다만 상대방(매도인)이 이미 중도금을 받거나 이전 준비에 착수한 뒤라면 해약금 해제 자체가 불가능하므로, 이 경우에는 별도의 손해배상 문제로 넘어갑니다.',
  },
  {
    question: '매도인이 계약을 취소하려면 계약금을 그냥 돌려주면 되나요?',
    answer:
      '아닙니다. 매도인이 해약금 해제를 하려면 받은 계약금의 두 배(배액)를 상환해야 합니다(민법 §565). 계약금 5,000만 원을 받았다면 매수인에게 1억 원을 돌려주어야 계약이 해제됩니다. 이때도 매수인이 아직 이행에 착수하기 전이어야 하며, 이미 중도금을 지급한 뒤라면 매도인이 배액을 준다 해도 일방적으로 해제할 수 없습니다.',
  },
  {
    question: '이행 착수라는 말이 정확히 무엇인가요?',
    answer:
      '이행 착수란 계약상 의무의 이행 행위를 객관적으로 시작한 것을 말합니다. 부동산 매매에서는 매수인이 중도금을 지급하거나, 매도인이 등기이전에 필요한 서류를 준비해 통지하는 등의 행위가 대표적입니다. 이행 착수 이후에는 민법 §565의 해약금 규정으로는 계약을 해제할 수 없고, 채무불이행 책임(민법 §551)에 따른 손해배상 문제로 넘어갑니다.',
  },
  {
    question: '계약금 1억 약정에 1,000만 원만 냈는데 상대방이 배액을 요구하면 얼마인가요?',
    answer:
      '대법원 판례는 실제 지급한 금액이 아니라 약정한 계약금 전액을 기준으로 배액상환액을 정합니다(대법원 2014다231378 등). 즉, 매도인이 배액상환으로 해제하려면 약정 계약금 1억 원의 두 배인 2억 원이 기준이 됩니다. 이는 계약금 일부만 받았다고 해약금 부담을 낮추는 행위를 막기 위한 취지입니다. 다만 구체적 판단은 사안에 따라 다를 수 있어 변호사 상담이 필요합니다.',
  },
  {
    question: '위약금 약정이 있으면 해약금과는 별개인가요?',
    answer:
      '위약금은 손해배상액의 예정(민법 §398)으로, 해약금(§565)과 법적 성격이 다릅니다. 계약서에 위약금 조항이 있으면 채무불이행이 발생했을 때 그 금액만큼을 배상액으로 미리 정한 것이 됩니다. 실무에서는 계약금이 위약금 성격을 함께 갖는 경우가 많은데, 위약금이 지나치게 과도하면 법원이 감액할 수 있습니다(§398 ②). 계약서 문구를 반드시 확인하세요.',
  },
  {
    question: '중도금까지 넣은 뒤에도 계약을 해제할 수 있나요?',
    answer:
      '민법 §565의 해약금 조항으로는 원칙적으로 불가능합니다. 중도금 지급은 대표적인 이행 착수 행위이므로, 그 이후에는 계약금 포기나 배액상환만으로 계약을 해제할 수 없습니다. 다만 상대방이 계약을 위반한 경우(예: 잔금기일에 이전등기 협력을 거부)에는 채무불이행을 이유로 한 법정 해제가 가능하며, 이때는 실제 손해액 배상 문제가 됩니다.',
  },
  {
    question: '가계약금 100만 원만 걸었는데 돌려받을 수 있나요?',
    answer:
      '가계약금은 민법에 별도 규정이 없어 사안별로 판단합니다. 목적물, 매매대금, 잔금일 등 중요사항이 이미 합의되어 정식 계약이 성립했다고 볼 수 있으면 해약금·위약금 규정이 적용되어 반환이 어려울 수 있습니다. 반면 단순히 매물을 붙잡아 두기 위한 예약금 성격이면 반환이 원칙일 수 있습니다. 다만 실제 판단은 문자·계약서 문구, 중요조건 합의 정도에 따라 달라지므로 다툼이 생기면 변호사나 대한법률구조공단 상담을 권장합니다.',
  },
  {
    question: '계약금 반환 소송은 어떻게 진행되나요?',
    answer:
      '가계약금이나 계약금 반환은 민사소송(대여금·부당이득반환청구)으로 다투게 됩니다. 청구액이 3,000만 원 이하라면 소액사건심판법에 따라 절차가 간소화됩니다. 소송 전에 내용증명을 발송해 반환을 요구하고, 상대방이 응하지 않으면 지급명령 또는 소액소송을 검토합니다. 소득이 일정 기준 이하이면 대한법률구조공단(klac.or.kr)에서 무료 상담과 소송지원을 받을 수 있습니다.',
  },
];

export default function RealEstateEarnestMoneyForfeit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '부동산 계약금 해약금·가계약금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '부동산 계약금 해약금·가계약금 2026, 배액상환·반환 기준',
    description:
      '부동산 계약금 해약금·가계약금 완전 정리. 매수인 포기, 매도인 배액상환, 이행착수 시한, 가계약금 반환 여부, 계약금 일부 지급 시 대법원 판례를 민법 §565·§398 기준으로 설명합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['계약금', '해약금', '배액상환', '가계약금', '위약금', '민법 565조', '이행착수'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '부동산 계약금 해약금·가계약금 2026',
    description:
      '계약금 포기·배액상환의 시한, 가계약금 반환 여부, 계약금 일부 지급 판례를 민법 §565 기준으로 정리한 부동산 계약 실무 가이드.',
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
                    { name: '부동산 계약금 해약금·가계약금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">부동산 매수·매도 당사자 · 9분 읽기 · 2026-08-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  부동산 계약금 해약금·가계약금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">배액상환·반환 기준 완전 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  집을 계약하고 계약금을 걸었는데 갑자기 마음이 바뀌었을 때, 그 돈은 정말 다 날리는 것인지, 파는 사람이 취소하면 배로 돌려받을 수 있는지, 문자로 주고받은 가계약금은 어떻게 되는지 헷갈리는 분들이 많습니다. 결론부터 말하면 우리 민법 §565가 정한 해약금 규정에 따라 매수인은 계약금을 포기하고, 매도인은 받은 계약금의 두 배를 상환해 계약을 해제할 수 있습니다. 다만 상대방이 이행에 착수한 뒤에는 이 방법이 통하지 않으며, 가계약금은 사안별로 판단이 갈립니다.
                </p>
              </header>

              <AdSlot slot="guide-real-estate-earnest-money-forfeit-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">계약금을 걸고 계약을 취소할 수 있나요</h2>
                <p>
                  민법 §565에 따르면 매매 계약에서 계약금을 교부한 경우, 당사자 한쪽이 이행에 착수할 때까지는 매수인은 계약금을 포기하고, 매도인은 받은 계약금의 두 배를 상환하여 계약을 해제할 수 있습니다. 이를 실무에서는 해약금 해제라고 부릅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">해약금 해제의 기본 원리 (민법 §565)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 매수인이 해제할 때: 지급한 계약금을 포기(반환청구 불가)
                    <br />
                    · 매도인이 해제할 때: 받은 계약금의 두 배를 상환(배액상환)
                    <br />
                    · 조건: 상대방이 이행에 착수하기 전까지만 가능
                    <br />
                    · 성격: 계약 위반이 아닌 정당한 해제 사유
                  </p>
                </div>
                <p>
                  중요한 점은 이 방식이 계약 위반이 아니라 법이 인정하는 정당한 해제 방법이라는 것입니다. 즉, 매수인이 계약금을 포기하고 해제하더라도 매도인이 추가로 손해배상을 요구할 수 없고, 매도인이 배액을 상환하며 해제하더라도 매수인이 별도로 위약금을 청구할 수 없는 것이 원칙입니다.
                </p>
                <p>
                  다만, 계약서에 위약금 조항이 별도로 있거나, 상대방이 이미 이행에 착수한 뒤라면 이야기가 완전히 달라집니다. 이 경우에는 민법 §565가 아니라 채무불이행에 관한 §551과 손해배상액 예정에 관한 §398이 적용됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">매수인은 포기, 매도인은 배액상환, 계산 사례</h2>
                <p>
                  구체적인 금액으로 살펴보면 이해가 훨씬 쉽습니다. 아래 세 가지 사례는 실무에서 자주 마주치는 상황을 정리한 것입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 매수인이 마음을 바꿔 해제 (계약금 5,000만 원)</p>
                  <p className="text-sm text-text-secondary">
                    · 매매대금: 5억 원, 계약금 5,000만 원(10%) 지급 완료
                    <br />
                    · 중도금 지급 전, 매수인이 개인 사정으로 해제 결정
                    <br />
                    · 매수인의 부담: 지급한 계약금 <strong>5,000만 원 전액 포기</strong>
                    <br />
                    · 반환액: 0원. 매도인은 계약금을 그대로 보유
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 매수인이 5,000만 원을 손해 보고 계약을 없던 것으로 함.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 매도인이 시세 급등으로 해제 (배액상환 1억 원)</p>
                  <p className="text-sm text-text-secondary">
                    · 매매대금: 5억 원, 계약금 5,000만 원 수령
                    <br />
                    · 계약 이후 시세가 6억 원으로 급등, 매도인이 해제 결정
                    <br />
                    · 매도인의 부담: 받은 계약금 5,000만 원 × 2 = <strong>1억 원을 매수인에게 상환</strong>
                    <br />
                    · 매수인의 실제 이익: 지급 계약금 5,000만 원 + 위약금 성격의 5,000만 원 = 총 1억 원 수령
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 매도인이 계약금의 두 배를 돌려주어야 계약을 해제할 수 있음.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 매도인이 배액상환을 실제로 이행해야 해제 효력</p>
                  <p className="text-sm text-text-secondary">
                    · 매도인이 &quot;배액을 줄 테니 계약을 없던 걸로 하자&quot;고 통보만 함
                    <br />
                    · 매수인은 이를 거부하고 이전등기·잔금 준비 등 이행에 착수
                    <br />
                    · 이 경우 매도인이 배액 1억 원을 실제로 제공(공탁 포함)하지 않는 한 해제 효력 발생 안 됨
                    <br />
                    · 판례상 &quot;상환의 이행 제공&quot;이 있어야 해제 효력이 인정됨
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 말로만 하는 배액상환은 무효. 실제 지급 또는 공탁이 필요.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만, 계약서에 &quot;위약 시 계약금의 두 배를 배상한다&quot;는 위약금 특약이 있는 경우는 상황이 조금 다릅니다. 이때는 해약금과 위약금의 성격이 겹쳐 있어, 채무불이행 유무에 따라 적용 조항이 갈립니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">언제까지 해제할 수 있나요, 이행 착수 전까지만</h2>
                <p>
                  민법 §565가 정한 해약금 해제는 &quot;당사자의 한쪽이 이행에 착수할 때까지&quot;만 가능합니다. 이 시한을 넘기면 계약금 포기나 배액상환만으로는 계약을 없던 것으로 만들 수 없습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 이행 착수의 대표적 예시와 해제 가능성</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">단계</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">해당 행위</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">해약금 해제</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">계약 직후</td>
                        <td className="p-3">계약금만 지급, 그 외 조치 없음</td>
                        <td className="p-3"><strong>가능</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">중도금 준비</td>
                        <td className="p-3">매수인이 중도금 대출 실행, 통장 이체 준비</td>
                        <td className="p-3">사안별 판단(다툼 소지)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">중도금 지급</td>
                        <td className="p-3">매수인이 매도인 계좌로 중도금 실제 이체</td>
                        <td className="p-3"><strong>불가능</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">서류 준비</td>
                        <td className="p-3">매도인이 등기이전 서류 준비해 매수인에 통지</td>
                        <td className="p-3"><strong>불가능</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">잔금 지급</td>
                        <td className="p-3">잔금 지급 및 소유권 이전등기</td>
                        <td className="p-3">계약 완결(해제 논의 X)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  즉, 중도금까지 지급된 뒤에는 계약금 두 배를 돌려준다고 해도 상대방이 동의하지 않으면 일방적으로 계약을 해제할 수 없습니다. 이 시점부터는 계약이 사실상 확정 단계에 들어간 것으로 보는 것입니다.
                </p>
                <p>
                  다만, 상대방이 계약을 위반한 경우(예: 잔금기일에 매도인이 이전등기 협력을 거부, 매수인이 잔금을 정당한 사유 없이 미납)에는 이행 착수 이후에도 채무불이행을 이유로 한 법정 해제(민법 §544 이하)가 가능합니다. 이 경우 실제 손해액 산정이 별도로 필요합니다.
                </p>
              </section>

              <AdSlot slot="guide-real-estate-earnest-money-forfeit-2026-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">가계약금·계약금·위약금의 차이 비교</h2>
                <p>
                  실무에서 가계약금, 계약금, 위약금은 서로 다른 개념이지만 자주 혼용됩니다. 아래 표로 각각의 법적 성격과 결과를 정리했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 가계약금·계약금·위약금 성격 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">법적 근거</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">해제 시 결과</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">특징</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">가계약금</td>
                        <td className="p-3">명문 규정 없음(사안별 판단)</td>
                        <td className="p-3">약정에 따름, 반환 원칙일 수 있음</td>
                        <td className="p-3">본 계약 성립 여부가 관건</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">계약금(해약금)</td>
                        <td className="p-3">민법 §565</td>
                        <td className="p-3">매수인 포기 or 매도인 배액상환</td>
                        <td className="p-3">이행착수 전까지만 가능</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">위약금</td>
                        <td className="p-3">민법 §398(손해배상 예정)</td>
                        <td className="p-3">채무불이행 시 약정 금액 배상</td>
                        <td className="p-3">과다 시 법원 감액 가능</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  계약서에 &quot;계약금은 위약금으로 한다&quot;는 특약이 있으면, 계약금이 해약금 성격과 위약금 성격을 동시에 갖게 됩니다. 이 경우 채무불이행이 인정되면 위약금으로, 정당한 해제 사유가 있으면 해약금으로 각각 작동합니다.
                </p>
                <p>
                  예외: 위약금 액수가 부당하게 과도하다고 판단되면 법원이 민법 §398 ②에 따라 감액할 수 있습니다. 예를 들어 계약금이 매매대금의 50%에 이르는 극단적인 경우에는 법원이 통상적인 수준으로 낮출 여지가 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">가계약금도 돌려받을 수 있나요, 약정에 따라 갈립니다</h2>
                <p>
                  가계약금은 민법에 명문 규정이 없어 사안별로 판단이 갈립니다. 핵심 기준은 &quot;정식 계약이 이미 성립했다고 볼 수 있는가&quot; 그리고 &quot;해약금 약정을 한 것으로 볼 수 있는가&quot;입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">가계약금이 몰수될 가능성이 높은 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 매물 특정, 매매대금, 중도금·잔금 시점 등 주요 조건이 모두 합의됨
                    <br />
                    · 문자·카톡·계약서 초안 등에 &quot;계약금 성격&quot;임이 명시됨
                    <br />
                    · 실무상 정식 계약이 성립했다고 볼 여지가 큼
                    <br />
                    · 이 경우 민법 §565 해약금 규정이 유추 적용되어 반환 어려움
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">가계약금 반환 가능성이 높은 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 매물 확정, 대금 협상 등이 아직 되지 않은 단계
                    <br />
                    · 단순히 &quot;매물을 붙잡아 두기 위한 예약금&quot; 성격
                    <br />
                    · 문구에 &quot;계약금&quot; &quot;위약&quot; 등의 표현이 없고 예약금·가지급금 성격
                    <br />
                    · 정식 계약 미성립으로 부당이득 반환청구가 가능한 경우가 많음
                  </p>
                </div>
                <p className="mt-4">
                  다만, 판단은 문자 대화 내용, 부동산 중개인의 안내, 계약서 초안 문구, 실제 조건 협상 정도 등을 종합적으로 검토해야 합니다. 100만~500만 원 정도의 가계약금이라도 다툼이 생기면 소액소송으로 이어질 수 있어, 애초에 문자로 &quot;정식 계약 전 예약금이며 사정 변경 시 반환한다&quot;는 문구를 남겨두는 것이 안전합니다.
                </p>
                <p>
                  예외: 매수인이 정당한 사유 없이 일방적으로 취소하는 경우에는 매도인이 입은 실제 손해(다른 매수 희망자 놓친 기회비용 등)에 대한 손해배상 청구가 별도로 가능할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">계약금 일부만 냈으면 기준은 약정 계약금 전액</h2>
                <p>
                  결론부터 말하면, 대법원 판례는 계약금 일부만 지급한 상태에서 해약금 해제를 다툴 때 기준 금액을 &quot;실제 지급한 금액&quot;이 아니라 &quot;약정한 계약금 전액&quot;으로 봅니다(대법원 2015. 4. 23. 선고 2014다231378 판결 등).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 계약금 1억 약정, 1,000만 원만 지급</p>
                  <p className="text-sm text-text-secondary">
                    · 매매대금 10억 원, 계약금 1억 원 약정
                    <br />
                    · 매수인이 계약 당일 1,000만 원만 우선 지급, 나머지 9,000만 원은 며칠 뒤 지급 예정
                    <br />
                    · 매도인이 시세 상승으로 배액상환 해제 시도
                    <br />
                    · 판례 기준: 배액상환 기준액은 실제 받은 1,000만 원이 아니라 <strong>약정 계약금 1억 원의 두 배 = 2억 원</strong>
                    <br />
                    · 매도인은 매수인이 준 1,000만 원을 돌려주고, 추가로 1억 9,000만 원을 지급해야 해제 가능
                    <br />
                    <span className="text-xs text-text-tertiary">결론: &quot;일부만 냈으니 배액상환도 그만큼&quot;은 오해. 판례는 약정 전액을 기준.</span>
                  </p>
                </div>
                <p className="mt-4">
                  이 판례의 취지는, 계약금의 일부만 받고 &quot;내가 부담하는 배액상환액도 그만큼 줄었다&quot;고 주장하며 쉽게 해약하는 것을 막기 위한 것입니다. 계약금 약정의 취지가 계약의 구속력을 강화하는 데 있는 만큼, 지급 시점이나 방식으로 그 부담을 회피할 수 없다는 판단입니다.
                </p>
                <p>
                  다만, 개별 사건의 계약서 문구, 협의 과정, 지급 지연 사유 등에 따라 결과가 달라질 수 있으므로, 실제 분쟁이 생기면 변호사 상담이나 대한법률구조공단(klac.or.kr) 상담을 반드시 받으시기 바랍니다. 유사한 대법원 판결 다수가 축적되어 있어 일관된 방향이지만, 개별 사안의 세부 사정이 결과를 바꿀 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실무 팁, 분쟁을 예방하는 계약서 작성 요령</h2>
                <p>
                  계약금 분쟁의 상당수는 계약 당시 문구를 명확히 하지 않아 발생합니다. 아래 팁은 부동산 중개사가 아닌 매수·매도 당사자 관점에서 알아두면 좋은 사항입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>계약금 조항 명확화:</strong> &quot;계약금은 위약금으로 한다&quot; 또는 &quot;해제 시 배액상환한다&quot; 등의 문구를 명시하면 나중에 다툴 여지가 줄어듭니다.
                  </li>
                  <li>
                    <strong>가계약금 문자 정리:</strong> 문자로 &quot;정식 계약 전 예약금이며, 조건 미합의 시 반환한다&quot; 같은 문구를 남겨두면 반환 청구 시 유리합니다.
                  </li>
                  <li>
                    <strong>중도금 시점 조정:</strong> 매수인이 마음이 바뀔 가능성이 조금이라도 있다면 중도금 지급 시점을 최대한 늦추는 것이 안전(해약 여지 유지).
                  </li>
                  <li>
                    <strong>배액상환 시 실제 지급 확인:</strong> 매도인이 배액상환으로 해제 통보를 하면 실제 계좌로 입금 또는 법원 공탁까지 이루어졌는지 반드시 확인.
                  </li>
                  <li>
                    <strong>이전 준비 착수 시점 기록:</strong> 매수인은 중도금 대출 서류, 매도인은 등기 서류 준비 시점을 문자·이메일로 남겨두면 이행착수 입증에 도움.
                  </li>
                </ul>
                <p className="mt-4">
                  다만, 이 팁들은 일반적인 참고사항이며 개별 사안의 최선책은 사안에 따라 다릅니다. 거래 금액이 크거나 조건이 복잡한 경우 계약 체결 전에 부동산 전문 변호사의 자문을 받는 것을 권장합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/broker-fee/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">중개수수료 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">매매·전세 거래액별 상한 요율로 중개보수를 즉시 계산.</p>
                  </Link>
                  <Link
                    href="/guide/real-estate-broker-fee-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부동산 중개수수료 요율 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">거래 단계별 상한 요율과 실무 협상 포인트 정리.</p>
                  </Link>
                  <Link
                    href="/guide/housing-fund-plan-source-of-funds-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주택 자금조달계획서 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">계약 이후 제출해야 하는 자금 출처 서류의 작성법.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-right-vs-fixed-date-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세권 vs 확정일자 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">전세 계약 시 보증금 보호를 위한 두 제도의 차이.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-guarantee-insurance-hug-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세보증금 반환보증(HUG) 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금을 지키는 HUG·SGI 반환보증 가입 조건과 비용.</p>
                  </Link>
                  <Link
                    href="/guide/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 가이드 보기</div>
                    <p className="mt-1 text-sm text-text-secondary">세금·금융·부동산 실무 가이드를 한 곳에서 탐색.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 부동산 계약 실무에 관한 일반 정보 제공을 목적으로 작성된 교육 콘텐츠이며, 개별 사건에 대한 법률 자문이 아닙니다. 실제 계약금 분쟁은 계약서 문구, 문자·통화 내용, 이행 착수 여부, 위약금 특약 등 세부 사정에 따라 결과가 크게 달라질 수 있습니다. 특히 소송이나 조정을 앞두고 있다면 반드시 부동산 전문 변호사 또는 대한법률구조공단(klac.or.kr)의 상담을 받아 개별 사안에 맞는 법률 조언을 받으시기 바랍니다. 본 콘텐츠는 2026-08-03을 기준으로 작성되었으며, 관련 법령·판례 변경 시 업데이트됩니다. 본문에서 인용한 조항은 <strong>민법 §565(해약금)·§398(배상액의 예정)·§551(해제와 손해배상)·§544(이행지체와 해제)</strong>이며, 대법원 판례로 <strong>2014다231378</strong> 등을 참고했습니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(민법 원문)</a>,{' '}
                  <a href="https://easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기쉬운 생활법령정보(부동산 매매)</a>,{' '}
                  <a href="https://www.klac.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">대한법률구조공단(무료 법률 상담)</a>,{' '}
                  <a href="https://glaw.scourt.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">대법원 종합법률정보(판례 검색)</a>.
                </p>
              </section>

              <ShareButtons
                title="부동산 계약금 해약금·가계약금 2026 가이드"
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