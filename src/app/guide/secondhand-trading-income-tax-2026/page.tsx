// [revenue-lever: traffic+indexing] 중고거래 과세 여부 급상승 검색 흡수, 일반·부업 트래픽 + 색인 표면 확대.
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

const URL = 'https://calculatorhost.com/guide/secondhand-trading-income-tax-2026/';
const DATE_PUBLISHED = '2026-08-23';
const DATE_MODIFIED = '2026-08-23';

export const metadata: Metadata = {
  title: '중고거래 세금 2026, 당근마켓 어디부터 사업소득인가',
  description:
    '쓰던 물건을 파는 일상 중고거래는 세금이 없지만, 영리 목적으로 계속·반복해 팔면 사업소득으로 과세됩니다. 당근마켓·번개장터 과세 기준, 플랫폼 자료제출, 사업자등록 여부를 소득세법 §19 기준으로 정리합니다.',
  keywords: [
    '중고거래 세금',
    '당근마켓 세금',
    '번개장터 세금',
    '중고거래 사업소득',
    '중고 판매 종합소득세',
    '플랫폼 자료제출',
    '소득세법 19조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '중고거래 세금 2026 당근마켓 사업소득 기준' }],
    title: '중고거래 세금 2026, 당근마켓 판매 어디부터 과세되나',
    description: '일상 중고 처분은 비과세, 영리 목적 반복 판매는 사업소득. 과세 기준과 판단법을 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '중고거래 세금 2026, 당근마켓 사업소득 기준',
    description: '일상 중고거래 비과세와 사업성 판단 기준을 정리한 가이드.',
  },
};

const FAQ_ITEMS = [
  {
    question: '당근마켓에서 쓰던 물건 팔면 세금을 내나요?',
    answer:
      '원칙적으로 세금이 없습니다. 자기가 쓰던 생활용품을 처분하는 일상적 중고거래는 영리를 목적으로 계속·반복하는 사업 활동이 아니어서 과세 대상이 아닙니다. 옷장 정리, 이사하며 가전 처분 같은 거래는 걱정하지 않아도 됩니다.',
  },
  {
    question: '그럼 어떤 경우에 세금을 내야 하나요?',
    answer:
      '영리를 목적으로 물건을 계속·반복해서 팔아 사업성이 인정되면 사업소득으로 과세됩니다(소득세법 §19). 예를 들어 새 상품을 대량으로 떼어다 자주 되팔거나, 사실상 판매를 업으로 하는 경우입니다. 거래의 지속성, 반복성, 수익 목적이 핵심 판단 기준입니다.',
  },
  {
    question: '얼마 이상 팔면 과세된다는 금액 기준이 있나요?',
    answer:
      '명확한 금액 기준은 없습니다. 국세청은 특정 금액을 넘으면 무조건 과세한다고 정해 두지 않았고, 거래의 성격(계속·반복·영리)으로 사업성을 종합 판단합니다(국세기본법 §14 실질과세). 따라서 금액이 작아도 사업 형태면 과세될 수 있고, 금액이 있어도 일상 처분이면 비과세입니다.',
  },
  {
    question: '국세청이 내 중고거래를 어떻게 아나요?',
    answer:
      '플랫폼 사업자가 거래·정산 자료를 과세당국에 제출하는 범위가 넓어지고 있어, 반복적 판매 정황이 파악될 수 있습니다. 다만 이는 사업성이 의심되는 거래를 가려내기 위한 것으로, 일상적 중고 처분까지 과세하려는 취지는 아닙니다. 사업 형태로 팔았다면 스스로 신고하는 것이 안전합니다.',
  },
  {
    question: '사업성이 인정되면 무엇을 해야 하나요?',
    answer:
      '사업자등록을 하고(소득세법 §168), 매년 5월 종합소득세를 신고해야 합니다. 판매 규모에 따라 부가가치세 신고 의무도 생깁니다. 매입원가, 택배비, 수수료 등은 필요경비로 공제되므로, 증빙을 모아 두면 실제 세부담을 줄일 수 있습니다.',
  },
  {
    question: '명품 리셀이나 한정판 되팔이도 과세 대상인가요?',
    answer:
      '반복적으로 시세 차익을 노리고 사고파는 형태라면 사업소득으로 볼 수 있습니다. 한두 번 개인 소장품을 처분한 것과, 계속해서 물건을 확보해 되파는 것은 성격이 다릅니다. 되팔이가 잦고 규모가 커질수록 사업성으로 판단될 가능성이 높아집니다.',
  },
  {
    question: '직장인이 부업으로 중고 판매를 하면 회사에 알려지나요?',
    answer:
      '사업소득이 발생해 신고하면 종합소득 자료로 잡히지만, 그 자체로 회사에 자동 통보되지는 않습니다. 다만 사업소득이 커지면 건강보험료 등에 영향을 줄 수 있습니다. 부업 규모가 사업 수준이면 사업자등록과 신고를 갖추는 것이 나중의 가산세 위험을 줄이는 길입니다.',
  },
  {
    question: '신고를 안 하면 어떻게 되나요?',
    answer:
      '사업성이 있는데도 신고를 누락하면 무신고가산세와 납부지연가산세가 붙어 추후 더 큰 금액으로 추징될 수 있습니다. 반대로 일상적 중고 처분은 애초에 과세 대상이 아니므로 신고할 필요가 없습니다. 본인 거래가 어느 쪽인지 애매하면 관할 세무서에 확인하세요.',
  },
];

export default function SecondhandTradingIncomeTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '중고거래 세금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '중고거래 세금 2026, 당근마켓 어디부터 사업소득인가',
    description:
      '일상 중고 처분의 비과세와 영리 목적 반복 판매의 사업소득 과세 기준, 플랫폼 자료제출, 사업자등록 여부를 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['중고거래 세금', '당근마켓 세금', '사업소득', '실질과세', '사업자등록'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '중고거래 세금 2026',
    description: '중고거래의 과세 여부와 사업성 판단 기준을 정리한 가이드.',
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
                    { name: '중고거래 세금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">일반·부업 · 6분 읽기 · 2026-08-23</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  중고거래 세금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 당근마켓 어디부터 사업소득인가</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  당근마켓이나 번개장터에서 몇 건 팔았을 뿐인데 세금 고지서를 받는 것 아니냐는 불안이 커지고 있습니다. 결론부터 말하면, 쓰던 물건을 정리하는 일상 중고거래는 세금이 없습니다. 다만 영리를 목적으로 계속 되파는 형태라면 이야기가 달라집니다. 이 가이드는 어디까지가 비과세이고 어디부터 과세인지, 그 판단 기준을 소득세법 §19를 바탕으로 명확히 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">중고거래도 세금을 내야 하나요?</h2>
                <p>
                  대부분은 내지 않습니다. 자기가 쓰던 생활용품을 처분하는 일상적 중고거래는 사업 활동이 아니어서 과세 대상이 아닙니다. 옷, 가전, 육아용품을 정리하는 정도라면 세금 걱정을 하지 않아도 됩니다.
                </p>
                <p>
                  과세 여부를 가르는 기준은 금액이 아니라 거래의 성격입니다. 영리를 목적으로 물건을 계속·반복해서 파는 사업성이 인정되면, 그때 비로소 사업소득으로 과세됩니다(소득세법 §19). 세법에서 사업소득은 영리를 목적으로 계속적·반복적으로 하는 활동에서 생기는 소득을 뜻하기 때문입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">한 줄 판별</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    내가 쓰던 걸 정리: 비과세(일상 처분)
                    <br />
                    사고팔아 이익을 노리는 반복 판매: 과세(사업소득)
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사업성은 무엇으로 판단하나요?</h2>
                <p>
                  세 가지, 지속성·반복성·영리 목적으로 종합 판단합니다. 국세청은 특정 금액을 넘으면 무조건 과세한다는 식의 금액 기준을 두지 않고, 거래 실질을 봅니다(국세기본법 §14 실질과세).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 비과세와 과세를 가르는 판단 요소</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">요소</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비과세 쪽(일상 처분)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과세 쪽(사업)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">반복성</td>
                        <td className="p-3">가끔, 정리 차원</td>
                        <td className="p-3">잦고 지속적</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">물건 성격</td>
                        <td className="p-3">쓰던 내 물건</td>
                        <td className="p-3">되팔려고 확보한 상품</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">목적</td>
                        <td className="p-3">처분·정리</td>
                        <td className="p-3">시세 차익·이윤</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 이 요소들은 칼로 자르듯 나뉘지 않고 함께 고려됩니다. 예: 처음엔 개인 물건 정리로 시작했더라도, 점차 물건을 떼어다 되파는 비중이 커지면 사업성으로 기울 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">국세청은 내 거래를 어떻게 아나요?</h2>
                <p>
                  플랫폼이 제출하는 자료로 파악될 수 있습니다. 중고·오픈마켓 플랫폼 사업자가 거래·정산 내역을 과세당국에 제출하는 범위가 넓어지면서, 반복적 판매 정황이 드러날 수 있습니다. 2026년 들어 과세당국은 단순 처분을 넘어 판매 목적의 반복 거래로 보이면 과세 대상으로 판단하는 기조입니다.
                </p>
                <p>
                  다만 이는 사업 형태의 거래를 가려내기 위한 것이지, 일상적 중고 처분까지 과세하려는 취지가 아닙니다. 그래도 내 거래가 사업에 가깝다면, 통보를 기다리기보다 스스로 신고하는 편이 가산세를 피하는 안전한 선택입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">과세 대상이면 무엇을 준비하나요?</h2>
                <p>
                  사업성이 인정되면 사업자등록을 하고(소득세법 §168), 매년 5월 종합소득세를 신고합니다. 판매 규모에 따라 부가가치세 신고 의무도 생깁니다. 이때 매입원가, 택배비, 포장비, 플랫폼 수수료 등은 필요경비로 공제되므로, 관련 증빙을 모아 두면 실제 세부담을 낮출 수 있습니다.
                </p>
                <p>
                  주의: 사업성 판단이 애매한 경계에 있다면 임의로 결론 내리지 말고 관할 세무서에 확인하세요. 신고하지 않아도 되는 일상 거래를 굳이 신고할 필요는 없지만, 사업에 해당하는데 방치하면 나중에 더 큰 부담으로 돌아옵니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/online-seller-smartstore-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">스마트스토어 세금 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">본격 판매로 넘어갈 때 사업자등록과 부가세 정리.</p>
                  </Link>
                  <Link
                    href="/guide/youtuber-creator-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">유튜버 세금 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">부업·콘텐츠 수익의 사업소득 신고 기준.</p>
                  </Link>
                  <Link
                    href="/guide/n-jobber-comprehensive-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">N잡러 종합소득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">부업 소득이 있는 직장인의 5월 신고 정리.</p>
                  </Link>
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">수입과 경비로 예상 세액을 계산해 보세요.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 실제 사업성 여부, 과세 대상 판단, 신고 의무는 개별 거래 실질에 따라 달라지므로 관할 세무서 또는 홈택스에서 확인하세요. 인용 조항은 소득세법 §19(사업소득), 소득세법 §168(사업자등록), 국세기본법 §14(실질과세)입니다. 본 콘텐츠는 2026-08-23 기준이며 세법·과세 실무 변경 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청(신종업종 세무안내)</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>.
                </p>
              </section>

              <ShareButtons title="중고거래 세금 2026 가이드" url={URL} />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
