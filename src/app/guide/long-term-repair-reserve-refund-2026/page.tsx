// [revenue-lever: traffic+indexing] 전세·월세 이사 장기수선충당금 반환 검색 흡수, 임차인 트래픽 + 색인 표면 확대.
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

const URL = 'https://calculatorhost.com/guide/long-term-repair-reserve-refund-2026/';
const DATE_PUBLISHED = '2026-08-23';
const DATE_MODIFIED = '2026-08-23';

export const metadata: Metadata = {
  title: '장기수선충당금 반환 2026, 전세·월세 이사 시 돌려받는 법',
  description:
    '아파트 관리비에 포함된 장기수선충당금은 원래 집주인 부담이라 세입자가 이사 갈 때 돌려받을 수 있습니다. 반환 근거(공동주택관리법 §30·시행령 §31⑧), 계산법, 못 받는 경우와 청구 절차를 정리합니다.',
  keywords: [
    '장기수선충당금 반환',
    '전세 이사 장기수선충당금',
    '장기수선충당금 돌려받기',
    '세입자 관리비 반환',
    '공동주택관리법 30조',
    '장충금 계산',
    '임대차 종료 정산',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '장기수선충당금 반환 2026 전세 월세 이사' }],
    title: '장기수선충당금 반환 2026, 이사 갈 때 세입자가 돌려받는 돈',
    description: '아파트 세입자가 낸 장기수선충당금은 집주인에게 반환 청구할 수 있습니다. 계산법과 절차를 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '장기수선충당금 반환 2026, 전세·월세 이사 시',
    description: '세입자가 낸 장기수선충당금을 이사 갈 때 집주인에게 돌려받는 법과 계산.',
  },
};

const FAQ_ITEMS = [
  {
    question: '장기수선충당금은 원래 누가 내는 돈인가요?',
    answer:
      '법적으로는 공동주택 소유자, 즉 집주인이 부담하는 돈입니다(공동주택관리법 §30). 승강기·배관·외벽 등 큰 수선에 대비해 아파트가 미리 적립하는 관리비 항목이기 때문입니다. 다만 관리비 고지서에 함께 청구되다 보니 실제 거주자인 세입자가 매달 대신 내는 경우가 많습니다.',
  },
  {
    question: '세입자가 낸 장기수선충당금을 돌려받을 수 있나요?',
    answer:
      '네, 돌려받을 수 있습니다. 임차인이 거주하는 동안 대신 납부한 장기수선충당금은 임대차가 끝날 때 소유자에게 반환을 청구할 수 있습니다(공동주택관리법 시행령 §31 제8항). 원래 집주인이 낼 돈을 세입자가 대납한 것이므로, 부당이득 반환의 성격(민법 §741)을 가집니다.',
  },
  {
    question: '얼마를 돌려받는지 어떻게 계산하나요?',
    answer:
      '거주 기간에 관리비로 낸 장기수선충당금을 모두 합산한 금액입니다. 관리사무소에서 입주일부터 이사일까지의 납부확인서를 발급받으면 총액을 확인할 수 있습니다. 보통 월 단가에 거주 개월수를 곱한 금액이며, 단지·면적에 따라 몇만 원에서 수십만 원까지 차이가 납니다.',
  },
  {
    question: '언제, 누구에게 청구하나요?',
    answer:
      '이사 나가는 시점(임대차 종료 시)에 집주인에게 청구합니다. 관리사무소에서 장기수선충당금 납부확인서를 받아 총액을 확인한 뒤, 집주인에게 해당 금액의 반환을 요청해 보증금과 함께 정산받는 것이 일반적입니다. 관리사무소가 세입자에게 직접 돌려주지는 않습니다.',
  },
  {
    question: '특약에 세입자가 부담한다고 적혀 있으면 못 받나요?',
    answer:
      '임대차 계약서에 장기수선충당금을 임차인이 부담한다는 특약이 있고 이에 동의했다면 반환받기 어려울 수 있습니다. 반대로 특약이 없다면 원칙대로 반환 청구가 가능합니다. 계약 전 특약 문구를 반드시 확인하고, 불리한 조항은 협의하세요.',
  },
  {
    question: '수선유지비도 돌려받을 수 있나요?',
    answer:
      '아닙니다. 형광등 교체, 청소, 소모품 교체 같은 일상적 수선유지비는 실제 사용자인 세입자가 부담하는 것이 원칙이라 반환 대상이 아닙니다. 반환 대상은 큰 수선에 대비해 적립하는 장기수선충당금입니다. 관리비 고지서에서 두 항목을 구분해 확인하세요.',
  },
  {
    question: '이사할 때 깜빡했는데 나중에 청구해도 되나요?',
    answer:
      '가능합니다. 이미 이사했더라도 관리사무소에서 납부확인서를 발급받아 전 집주인에게 청구할 수 있습니다. 다만 시간이 지날수록 연락과 정산이 번거로워지고 소멸시효 문제도 생길 수 있으므로, 가급적 보증금 반환 정산과 함께 처리하는 것이 깔끔합니다.',
  },
  {
    question: '집주인이 반환을 거부하면 어떻게 하나요?',
    answer:
      '먼저 관리사무소 납부확인서 등 증빙을 제시하며 서면으로 요청하세요. 그래도 거부하면 지급명령 신청이나 소액사건 소송으로 청구할 수 있습니다. 금액이 크지 않은 경우가 많아 지급명령이 간편한 편이며, 구체적 절차는 대한법률구조공단 등 상담 창구를 활용하세요.',
  },
];

export default function LongTermRepairReserveRefund2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '장기수선충당금 반환 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '장기수선충당금 반환 2026, 전세·월세 이사 시 돌려받는 법',
    description:
      '아파트 세입자가 대납한 장기수선충당금의 반환 근거, 계산법, 못 받는 경우와 청구 절차를 정리한 임차인 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['장기수선충당금 반환', '전세 이사', '세입자 관리비', '공동주택관리법', '임대차 종료'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '장기수선충당금 반환 2026',
    description: '아파트 세입자가 낸 장기수선충당금을 이사 시 돌려받는 방법과 계산을 정리한 가이드.',
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
                    { name: '장기수선충당금 반환 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">임차인 · 6분 읽기 · 2026-08-23</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  장기수선충당금 반환 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 전세·월세 이사 시 돌려받는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  아파트에서 전세나 월세로 살다 이사할 때, 그냥 넘기면 손해 보는 돈이 있습니다. 바로 매달 관리비에 섞여 나가던 장기수선충당금입니다. 원래 집주인이 낼 돈을 세입자가 대신 낸 것이라, 이사할 때 청구하면 돌려받을 수 있습니다. 이 가이드는 반환 근거와 계산법, 못 받는 경우, 집주인에게 청구하는 절차를 임차인 입장에서 정리했습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">장기수선충당금이란 무엇인가요?</h2>
                <p>
                  장기수선충당금은 아파트 같은 공동주택이 장래의 큰 수선에 대비해 미리 적립하는 관리비 항목입니다. 승강기 교체, 배관·옥상 방수, 외벽 도색처럼 목돈이 드는 공사를 대비한 자금으로, 관리규약에 따라 매달 관리비에 포함해 걷습니다.
                </p>
                <p>
                  핵심은 부담 주체입니다. 공동주택관리법 §30은 이 돈을 소유자, 즉 집주인이 부담하도록 정하고 있습니다. 그런데 실제로는 관리비 고지서에 함께 청구되다 보니 거주자인 세입자가 매달 대신 내는 구조가 됩니다. 그래서 이사할 때 정산이 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세입자가 돌려받을 수 있나요?</h2>
                <p>
                  네, 돌려받을 수 있습니다. 임차인이 거주 기간에 대신 낸 장기수선충당금은 임대차가 끝나는 때에 소유자에게 반환을 청구할 수 있습니다(공동주택관리법 시행령 §31 제8항). 집주인이 낼 돈을 세입자가 대납한 것이므로, 반환하지 않으면 집주인이 부당하게 이득을 보는 셈이 되어 부당이득 반환(민법 §741)의 성격을 가집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">반환 여부 판별 기준</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    반환 대상: 장기수선충당금(큰 수선 대비 적립금)
                    <br />
                    반환 제외: 수선유지비(형광등·청소 등 일상 관리비)
                    <br />
                    예외: 계약서에 세입자 부담 특약이 있고 동의한 경우
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">얼마를 돌려받나요?</h2>
                <p>
                  반환액은 거주한 기간에 낸 장기수선충당금의 합계입니다. 보통 월 부과액에 거주 개월수를 곱한 금액이며, 단지와 전용면적에 따라 단가가 다릅니다. 아래는 이해를 돕기 위한 계산 사례입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 84제곱미터, 월 8,000원, 2년 거주</p>
                  <p className="text-sm text-text-secondary">
                    · 월 장기수선충당금: 8,000원
                    <br />
                    · 거주 기간: 24개월
                    <br />
                    · 반환액: 8,000 × 24 = <strong>192,000원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 2. 대형 평형, 월 15,000원, 3년 거주</p>
                  <p className="text-sm text-text-secondary">
                    · 월 장기수선충당금: 15,000원
                    <br />
                    · 거주 기간: 36개월
                    <br />
                    · 반환액: 15,000 × 36 = <strong>540,000원</strong>
                  </p>
                </div>
                <p className="mt-4">
                  다만 매달 단가가 바뀌거나 중간에 조정된 경우 단순 곱셈과 달라질 수 있습니다. 정확한 금액은 관리사무소에서 입주일부터 이사일까지의 납부확인서를 발급받아 확인하는 것이 가장 확실합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">청구 절차는 어떻게 되나요?</h2>
                <p>
                  절차는 간단합니다. 순서대로 진행하면 보증금 반환과 함께 깔끔하게 정산할 수 있습니다.
                </p>
                <ol className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>이사 전 관리사무소를 방문해 입주일부터 이사일까지의 장기수선충당금 납부확인서를 발급받습니다.</li>
                  <li>납부확인서로 총 반환액을 확인합니다.</li>
                  <li>집주인에게 해당 금액을 알리고, 보증금 반환 시 함께 정산하거나 별도 입금을 요청합니다.</li>
                  <li>집주인이 거부하면 증빙을 근거로 서면 청구 후, 필요 시 지급명령이나 소액소송을 활용합니다.</li>
                </ol>
                <p className="mt-4">
                  주의: 관리사무소는 세입자에게 직접 돌려주지 않습니다. 반환 의무자는 어디까지나 소유자인 집주인이므로, 청구 상대를 혼동하지 마세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/lease-restoration-obligation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">원상복구 의무 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">이사 나갈 때 어디까지 복구해야 하는지 기준.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-deposit-safety/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세보증금 지키기</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금 반환을 안전하게 받기 위한 체크리스트.</p>
                  </Link>
                  <Link
                    href="/guide/lease-renewal-request-implied-renewal-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">계약갱신청구·묵시적 갱신</div>
                    <p className="mt-1 text-sm text-text-secondary">임대차 연장과 갱신 규칙을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/calculator/rent-conversion/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전월세 전환 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금과 월세 전환액을 바로 계산하세요.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 법률 조언이 아닙니다. 실제 반환액, 특약 효력, 분쟁 시 대응은 관리사무소·집주인과의 확인 및 법률 상담을 통해 판단하세요. 인용 조항은 공동주택관리법 §30(장기수선충당금 부담), 같은 법 시행령 §31(임차인의 반환 청구), 민법 §741(부당이득)입니다. 본 콘텐츠는 2026-08-23 기준이며 법령 개정 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.lh.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">LH 한국토지주택공사</a>,{' '}
                  <a href="https://www.easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기쉬운 생활법령정보</a>.
                </p>
              </section>

              <ShareButtons title="장기수선충당금 반환 2026 가이드" url={URL} />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
