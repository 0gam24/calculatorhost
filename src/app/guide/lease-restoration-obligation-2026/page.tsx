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

const URL = 'https://calculatorhost.com/guide/lease-restoration-obligation-2026/';
const DATE_PUBLISHED = '2026-08-05';
const DATE_MODIFIED = '2026-08-05';

export const metadata: Metadata = {
  title: '전세·월세 원상복구 의무 범위 2026, 못자국·도배·곰팡이 기준',
  description:
    '퇴거할 때 어디까지 원상복구해야 할까요. 자연스러운 못자국·벽지 변색 같은 통상손모는 임차인 책임이 아니고, 흡연 착색·곰팡이·파손 같은 고의·과실은 배상 대상입니다. 민법 §615·§623과 판례 기준으로 정리했습니다.',
  keywords: [
    '전세 원상복구',
    '월세 원상복구 의무',
    '원상복구 범위',
    '통상손모',
    '도배 장판 원상복구',
    '원상복구 특약',
    '민법 615조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '전세·월세 원상복구 의무 범위 2026, 못자국·도배·곰팡이 기준' }],
    title: '전세·월세 원상복구 의무 범위 2026',
    description: '통상손모는 임차인 책임 아님, 고의·과실은 배상. 민법 §615·§623과 판례로 정리한 원상복구 기준.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '전세·월세 원상복구 의무 범위 2026',
    description: '못자국·벽지 변색은 통상손모(임차인 책임 아님), 흡연·곰팡이·파손은 배상. 민법 §615.',
  },
};

const FAQ_ITEMS = [
  {
    question: '원상복구 의무가 정확히 무엇인가요?',
    answer:
      '임차인이 집을 반환할 때 빌리기 전 상태로 되돌려 놓을 의무입니다. 민법은 사용대차의 원상회복 규정(§615)을 임대차에 준용해(§654), 임차인이 임차물을 원래 상태로 반환하도록 정합니다. 다만 모든 흔적을 새것처럼 복구하라는 뜻은 아니고, 정상적으로 살면서 생긴 자연스러운 손모는 제외됩니다.',
  },
  {
    question: '못 자국이나 벽지 변색도 물어줘야 하나요?',
    answer:
      '일상적으로 생긴 통상손모라면 임차인 책임이 아닙니다. 시간이 지나 자연스럽게 변색된 벽지, 가구를 놓아 생긴 눌림 자국, 못 몇 개 자국처럼 통상적인 사용으로 발생한 손모는 임대인이 부담하는 것이 원칙입니다. 판례도 임차인의 고의·과실이 아닌 통상손모에는 원상회복 의무가 없다고 봅니다.',
  },
  {
    question: '어떤 경우에 배상 책임이 생기나요?',
    answer:
      '고의나 관리 소홀로 생긴 손상은 배상 대상입니다. 실내 흡연으로 벽지가 누렇게 착색된 경우, 아이 낙서, 환기를 하지 않아 생긴 결로·곰팡이, 못질로 벽체가 크게 파손된 경우 등은 임차인의 과실로 보아 원상복구나 배상 책임이 인정될 수 있습니다. 통상손모와 과실 손상을 가르는 기준이 핵심입니다.',
  },
  {
    question: '계약서에 원상복구 특약이 있으면 무조건 따라야 하나요?',
    answer:
      '특약이 우선하지만 무제한은 아닙니다. 도배·장판을 새로 해놓고 나가라는 식의 특약은 유효할 수 있으나, 통상손모까지 전부 임차인에게 떠넘기는 지나친 특약은 다툼의 여지가 있습니다. 특약 문구가 구체적일수록 효력이 인정되기 쉬우므로, 입주 전에 범위를 명확히 정하고 서면으로 남기는 것이 안전합니다.',
  },
  {
    question: '입주 전 상태는 어떻게 증명하나요?',
    answer:
      '입주 시점의 사진·영상이 가장 강력한 증거입니다. 이사 들어가는 날 벽, 바닥, 창틀, 붙박이 상태를 날짜가 남게 촬영해 두면, 퇴거 시 기존 하자와 내가 낸 손상을 구분할 수 있습니다. 기존에 있던 못자국이나 얼룩도 미리 찍어 두면 부당한 원상복구 요구를 막는 데 도움이 됩니다.',
  },
  {
    question: '임대인이 과도한 원상복구비를 요구하면 어떻게 하나요?',
    answer:
      '통상손모와 과실 손상을 구분해 협의하고, 안 되면 조정·소송을 활용합니다. 우선 어떤 부분이 통상손모인지 근거(사진·판례 기준)를 제시해 협의하고, 합의가 어려우면 주택임대차분쟁조정위원회 조정이나 소액 민사소송으로 다툴 수 있습니다. 보증금에서 일방적으로 공제당했다면 반환 청구가 가능합니다.',
  },
  {
    question: '임대인의 수선의무와는 어떻게 다른가요?',
    answer:
      '임대인은 사용에 필요한 수선을 해줄 의무가 있습니다(민법 §623). 보일러 고장, 누수, 노후 설비 교체처럼 정상적 사용을 위한 수선은 임대인 책임입니다. 반면 임차인의 부주의로 생긴 파손은 임차인이 부담합니다. 원상복구 분쟁의 상당수는 이 둘의 경계에서 발생하므로, 하자 발생 즉시 임대인에게 통지하고 기록을 남기는 것이 중요합니다.',
  },
];

export default function LeaseRestorationObligation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '전세·월세 원상복구 의무' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '전세·월세 원상복구 의무 범위 2026, 못자국·도배·곰팡이 기준 완전 정리',
    description:
      '임차인의 원상복구 의무 범위를 통상손모와 고의·과실로 구분해 정리. 민법 §615(원상회복)·§654(준용)·§623(임대인 수선의무)과 판례 기준, 특약의 효력, 분쟁 예방 방법.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['원상복구', '통상손모', '임대차', '민법 615조', '원상복구 특약'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '전세·월세 원상복구 의무 범위 2026',
    description:
      '임차인 원상복구 의무 범위를 통상손모와 과실로 구분한 기준과 특약 효력, 분쟁 예방 방법 정리.',
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
                    { name: '전세·월세 원상복구 의무' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">전월세 임차인·임대인 · 8분 읽기 · 2026-08-05</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  전세·월세 원상복구 의무 범위 2026
                  <br />
                  <span className="text-2xl text-text-secondary">못자국·도배·곰팡이 어디까지</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 글은 이사를 앞둔 전월세 임차인과 보증금 정산을 앞둔 임대인 모두를 위해 씁니다. &quot;못 자국 몇 개도 물어줘야 하나?&quot;, &quot;도배를 새로 해주고 나가야 하나?&quot; 같은 실전 분쟁을 통상손모와 고의·과실이라는 기준으로 나눠 설명합니다. 민법 조문과 판례 기준, 특약의 효력, 분쟁을 막는 방법까지 순서대로 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-lease-restoration-obligation-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 원상복구 의무란 무엇인가요?</h2>
                <p>
                  집을 빌리기 전 상태로 되돌려 반환할 의무입니다. 민법은 원상회복 규정(§615)을 임대차에 준용해(§654), 임차인이 임차물을 원래 상태로 돌려주도록 정합니다. 다만 여기서 &quot;원래 상태&quot;는 새것으로 복구하라는 뜻이 아니라, 정상적으로 사용하며 생긴 자연스러운 손모를 제외한 상태를 말합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary list-disc ml-5">
                    <li>근거: 민법 §615(원상회복) 준용(§654)</li>
                    <li>통상손모(자연 변색·못자국 몇 개·가구 눌림): 임차인 책임 아님</li>
                    <li>고의·과실(흡연 착색·낙서·곰팡이·파손): 배상 대상</li>
                    <li>특약이 있으면 우선하되, 통상손모 전가 특약은 다툼 여지</li>
                    <li>임대인은 사용에 필요한 수선의무 부담(§623)</li>
                  </ul>
                </div>
                <p>
                  즉 판단의 핵심은 &quot;이 흔적이 정상적인 생활에서 자연스럽게 생긴 것인가, 아니면 나의 고의·부주의로 생긴 것인가&quot;입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 못 자국·벽지 변색도 물어줘야 하나요?</h2>
                <p>
                  통상손모라면 물어주지 않아도 됩니다. 시간이 지나 자연스럽게 바랜 벽지, 가구를 놓아 생긴 눌림 자국, 액자를 걸며 생긴 못 몇 개 자국처럼 통상적인 사용으로 생기는 손모는 임대인이 감가상각 차원에서 부담하는 것이 원칙입니다. 판례도 임차인의 고의·과실이 아닌 통상손모에는 원상회복 의무가 없다고 판단해 왔습니다.
                </p>
                <p>
                  임대료에는 이미 시설의 자연스러운 노후에 대한 비용이 어느 정도 반영돼 있다고 보기 때문입니다. 따라서 &quot;벽지가 조금 바랬으니 전부 새로 해놓으라&quot;는 요구는 통상손모 범위라면 정당하지 않을 수 있습니다.
                </p>
                <p>
                  다만 &quot;몇 개&quot;가 통상 범위인지, 손상 정도가 어느 선을 넘는지는 사안마다 다릅니다. 벽에 대못을 여러 개 박아 구조를 훼손한 정도라면 통상손모로 보기 어렵습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 어떤 경우에 배상 책임이 있나요?</h2>
                <p>
                  고의나 관리 소홀로 생긴 손상은 배상 대상입니다. 아래 표로 책임이 있는 경우와 없는 경우를 구분했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 원상복구·배상 책임 구분 (판례 경향)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">배상 책임 없음(통상손모)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">배상 책임 있음(고의·과실)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">시간 경과에 따른 벽지 변색</td>
                        <td className="p-3">실내 흡연으로 인한 니코틴 착색</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">가구 배치로 생긴 눌림 자국</td>
                        <td className="p-3">아이 낙서, 벽면 훼손</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">액자용 못 몇 개 자국</td>
                        <td className="p-3">못질로 인한 벽체 대형 파손</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">미세한 생활 스크래치</td>
                        <td className="p-3">환기 소홀로 생긴 결로·곰팡이</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  예외: 표는 일반적 경향이며, 실제 판단은 손상 정도, 사용 기간, 특약, 입주 시 상태에 따라 달라집니다. 같은 &quot;곰팡이&quot;라도 건물 하자로 인한 것이면 임대인 책임이 될 수 있습니다.
                </p>
              </section>

              <AdSlot slot="guide-lease-restoration-obligation-2026-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사례로 보는 원상복구 판단</h2>
                <p>
                  경계에 있는 상황을 사례로 살펴보면 판단 기준이 분명해집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 액자용 못 자국 3개 (2년 거주)</p>
                  <p className="text-sm text-text-secondary">
                    · 벽에 액자를 걸기 위한 못 자국 3개, 구조 훼손 없음
                    <br />
                    · 통상적 사용 범위의 손모로 볼 여지가 큼
                    <br />
                    <span className="text-xs text-text-tertiary">판단: 통상손모에 가까워 임차인 배상 책임 인정이 어려운 편.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 흡연으로 전체 벽지 누렇게 착색</p>
                  <p className="text-sm text-text-secondary">
                    · 실내 흡연으로 벽지·천장 전면 니코틴 착색
                    <br />
                    · 통상 사용을 벗어난 관리상 과실
                    <br />
                    <span className="text-xs text-text-tertiary">판단: 도배 비용 등 배상 책임 인정 가능성 높음.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 환기 부족으로 붙박이장 뒤 곰팡이</p>
                  <p className="text-sm text-text-secondary">
                    · 장기간 환기를 하지 않아 결로·곰팡이 발생
                    <br />
                    · 단, 건물 자체 방수·단열 하자면 임대인 책임 가능
                    <br />
                    <span className="text-xs text-text-tertiary">판단: 원인이 임차인 관리 소홀인지 건물 하자인지에 따라 갈림.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 위 판단은 일반적 경향일 뿐 확정된 결과가 아닙니다. 금액이 크거나 다툼이 있으면 사진 증거와 함께 전문가 상담이나 분쟁조정을 활용하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">분쟁을 막는 체크리스트</h2>
                <p>
                  원상복구 분쟁은 대부분 &quot;증거 부족&quot;에서 시작됩니다. 입주와 퇴거 시 다음을 챙기면 다툼을 크게 줄일 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>입주 당일 촬영:</strong> 벽·바닥·창틀·붙박이 상태를 날짜가 남게 사진·영상으로 기록합니다.
                  </li>
                  <li>
                    <strong>기존 하자 통지:</strong> 입주 때 이미 있던 못자국·얼룩·설비 하자를 임대인에게 알리고 기록을 남깁니다.
                  </li>
                  <li>
                    <strong>특약 명확화:</strong> 원상복구 특약이 있으면 범위(도배·장판 등)를 구체적으로 서면화합니다.
                  </li>
                  <li>
                    <strong>하자 즉시 통지:</strong> 거주 중 누수·보일러 고장 등은 즉시 임대인에게 알려 수선의무(§623) 대상임을 남깁니다.
                  </li>
                  <li>
                    <strong>퇴거 시 대조:</strong> 퇴거 청소 후 입주 사진과 대조해 통상손모와 과실 손상을 구분합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  합의가 어려우면 주택임대차분쟁조정위원회 조정이나 소액 민사소송을 활용할 수 있습니다. 보증금에서 부당하게 공제됐다면 반환을 청구할 수 있습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/jeonse-deposit-safety/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세보증금 안전 지키기</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금을 떼이지 않기 위한 핵심 체크포인트.</p>
                  </Link>
                  <Link
                    href="/guide/lease-renewal-request-implied-renewal-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">계약갱신·묵시적 갱신 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">갱신요구권과 묵시적 갱신의 조건 정리.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-right-vs-fixed-date-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세권 vs 확정일자 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금 보호 장치의 차이와 선택 기준.</p>
                  </Link>
                  <Link
                    href="/calculator/rent-conversion/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전월세 전환 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">전세와 월세 조건을 서로 환산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/lease-renewal-refusal-grounds-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">계약갱신 거절 사유 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">임대인이 갱신을 거절할 수 있는 경우.</p>
                  </Link>
                  <Link
                    href="/guide/category/tax-real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 부동산 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">임대차·재산세·종부세 관련 가이드 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개별 사건에 대한 법률 자문이 아닙니다. 원상복구 책임은 손상 정도, 거주 기간, 입주 시 상태, 특약 내용, 개별 판례에 따라 달라지므로, 실제 분쟁은 증거를 갖춰 전문가 상담이나 주택임대차분쟁조정위원회 등을 통해 해결하세요. 근거는 <strong>민법 §615(원상회복)·§654(준용)·§623(임대인 수선의무)</strong>이며, 본문의 사례 판단은 판례 경향을 정리한 것으로 확정된 결과가 아닙니다. 본 콘텐츠는 2026-08-05 기준입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(민법)</a>,{' '}
                  <a href="https://www.law.go.kr/LSW/main.html" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국가법령정보센터(주택임대차보호법)</a>.
                </p>
              </section>

              <ShareButtons
                title="전세·월세 원상복구 의무 범위 2026 가이드"
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
