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

const URL = 'https://calculatorhost.com/guide/youth-monthly-rent-support-2026/';
const DATE_PUBLISHED = '2026-07-22';
const DATE_MODIFIED = '2026-07-22';

export const metadata: Metadata = {
  title: '청년 월세 특별지원 2026, 상시신청 전환·신청 방법 총정리',
  description:
    '2026년 청년 월세 특별지원이 한시사업에서 상시신청 체계로 개편되는 흐름을 정리했습니다. 대상·소득요건·지원 방식·신청 절차와 함께, 복지로와 거주지 지자체 공고에서 반드시 확인해야 할 항목까지 함께 정리합니다.',
  keywords: [
    '청년 월세 지원',
    '청년월세 상시신청',
    '청년 월세 특별지원 2026',
    '청년 주거지원',
    '월세 지원 신청방법',
    '국토교통부 청년월세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '청년 월세 특별지원 2026 상시신청 안내' }],
    title: '청년 월세 특별지원 2026, 상시신청 전환과 신청 방법',
    description:
      '무주택 청년을 위한 월세 특별지원이 2026년부터 상시신청 체계로 개편되는 방향입니다. 대상, 소득요건, 지원 절차와 복지로·지자체 공고 확인 포인트를 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '청년 월세 특별지원 2026 상시신청, 누가 어떻게 받나',
    description:
      '무주택 청년 월세 특별지원 2026년 개편 방향, 신청 자격과 절차 정리. 정확한 금액과 요건은 복지로·거주지 지자체 공고 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '청년 월세 특별지원이 2026년부터 상시신청으로 바뀐 게 맞나요?',
    answer:
      '방향은 그렇습니다. 기존 청년 월세 특별지원은 특정 기간 동안만 접수하는 한시사업 형태로 운영되어 왔는데, 정부는 이를 상시신청 가능한 체계로 개편하는 방향을 예고해 왔습니다. 다만 시행 시점, 접수 창구, 세부 요건은 국토교통부와 각 지자체 공고에 따라 달라질 수 있으므로, 신청 전 반드시 복지로(bokjiro.go.kr)와 거주지 시·군·구청 공고를 확인해야 합니다.',
  },
  {
    question: '누가 청년 월세 특별지원을 받을 수 있나요?',
    answer:
      '대체로 만 19~34세 사이의 무주택 청년으로, 부모와 별도 거주하며 임차보증금·월세가 일정 기준 이하인 주택에 살고 있는 경우가 대상입니다. 본인 소득과 가구 소득, 재산 기준을 함께 봅니다. 실제 연령 범위, 소득 상한, 재산 상한, 임차보증금·월세 상한선은 연도별·지자체별 공고마다 다르므로 반드시 최신 공고에서 확인해야 합니다.',
  },
  {
    question: '지원 금액과 지원 기간은 얼마인가요?',
    answer:
      '월세의 일부를 일정 기간 동안 지원하는 방식이 일반적입니다. 다만 월 지원 상한액, 총 지원 기간, 실제 지급 금액은 국토교통부 사업 지침과 거주지 지자체 공고에 따라 매년 달라질 수 있습니다. 본 가이드에서는 특정 금액을 확정 사실로 제시하지 않으며, 정확한 금액은 복지로 공고와 지자체 안내문에서 확인해 주세요.',
  },
  {
    question: '신청은 어디서 어떻게 하나요?',
    answer:
      '온라인은 복지로(bokjiro.go.kr)에서 공동인증서 또는 간편인증으로 로그인해 신청합니다. 오프라인은 주소지 관할 읍·면·동 행정복지센터에 방문해 신청서와 증빙 서류를 제출할 수 있습니다. 접수 창구와 심사 기간은 지자체 사정에 따라 달라질 수 있으니, 신청 전 관할 행정복지센터에 문의해 두면 이후 진행이 매끄럽습니다.',
  },
  {
    question: '다른 주거지원과 중복 수급이 가능한가요?',
    answer:
      '중복 여부는 사업별로 다릅니다. 대체로 주거급여 수급자, 공공임대·기숙사 거주자, 타 부처·지자체의 유사한 월세 지원을 이미 받고 있는 경우 중복 수급이 제한되는 경향이 있습니다. 다만 유사 사업도 지원 성격에 따라 판단이 갈리므로, 이미 다른 주거지원을 받고 있다면 신청 전 복지로 또는 관할 행정복지센터에 중복 여부를 반드시 확인해야 합니다.',
  },
  {
    question: '어떤 서류를 준비해야 하나요?',
    answer:
      '일반적으로 신분증, 임대차계약서 사본, 월세 이체 내역, 주민등록등본, 가족관계증명서, 소득·재산 확인 서류가 필요합니다. 세부 목록은 공고마다 다르며, 확정일자 도장이 있는 임대차계약서를 요구하는 경우도 있습니다. 소득 산정 방식(본인 단독 기준인지 원가구 포함인지)도 공고에 따라 다르므로, 신청 전 안내문의 서류 체크리스트를 그대로 따라 준비하는 것이 안전합니다.',
  },
  {
    question: '지급은 어떻게 이뤄지나요?',
    answer:
      '심사를 통과하면 신청인 본인 계좌로 매월 지원금이 입금되는 방식이 일반적입니다. 소급 지급 여부, 첫 지급월, 실제 계좌 입금일은 지자체별로 차이가 있을 수 있습니다. 지원 기간 도중 이사, 소득 변동, 세대 구성 변경이 생기면 반드시 변경 신고를 해야 하며, 신고를 늦추면 과지급분 환수 대상이 될 수 있으므로 주의합니다.',
  },
  {
    question: '신청했다가 탈락했는데 다시 신청할 수 있나요?',
    answer:
      '기존 한시사업 시절에는 접수 기간을 놓치면 다음 회차까지 기다려야 했지만, 상시신청 체계로 개편되면 소득·자산 요건이 다시 충족되는 시점에 재신청이 가능한 방향으로 운영될 것으로 안내되고 있습니다. 다만 재신청 조건, 재신청 대기 기간, 심사 절차의 세부 사항은 사업 지침과 지자체 공고에 따라 다르므로, 탈락 사유 안내문을 먼저 확인한 뒤 관할 창구에 상담을 요청하는 것이 좋습니다.',
  },
];

export default function YouthMonthlyRentSupport2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '청년 월세 특별지원 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '청년 월세 특별지원 2026, 상시신청 전환·신청 방법 총정리',
    description:
      '무주택 청년을 위한 월세 특별지원이 2026년부터 상시신청 체계로 개편되는 방향에 맞춰, 대상·소득요건·지원 방식·신청 절차와 확인 포인트를 정리했습니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['청년 월세 지원', '청년월세 상시신청', '청년 주거지원', '복지로', '국토교통부'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '청년 월세 특별지원 2026',
    description:
      '2026년 청년 월세 특별지원 상시신청 개편 방향, 대상·소득요건·신청 절차 안내.',
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
                    { name: '청년 월세 특별지원 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">무주택 청년·사회초년생 · 8분 읽기 · 2026-07-22</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  청년 월세 특별지원 2026
                  <br />
                  <span className="text-2xl text-text-secondary">상시신청 전환과 신청 방법 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  청년 월세 특별지원은 무주택 청년의 주거비 부담을 덜기 위해 정부와 지자체가 함께 운영해 온 사업입니다. 2026년에는 기존 한시 접수 방식에서 상시신청이 가능한 체계로 개편되는 방향이 예고되어, 신청 시점을 놓쳐 지원을 받지 못하던 문제가 완화될 것으로 안내되고 있습니다. 이 가이드는 대상, 소득·재산 요건의 대체적인 방향, 신청 절차, 다른 주거지원과의 관계를 정리하되, 구체적인 금액과 상한선은 반드시 복지로와 거주지 지자체 공고에서 확인해야 하는 부분임을 함께 짚어 드립니다.
                </p>
              </header>

              <AdSlot slot="guide-youth-monthly-rent-support-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">청년 월세 지원 2026, 상시신청으로 바뀌었나요?</h2>
                <p>
                  방향은 그렇습니다. 청년 월세 특별지원은 그동안 정해진 접수 기간에만 신청을 받는 한시사업 형태로 운영되면서, 시기를 놓쳐 아예 지원을 받지 못하는 사례가 반복되어 왔습니다. 이를 개선하기 위해 정부는 자격이 되는 청년이면 언제든 신청할 수 있는 상시신청 체계로 개편하는 방향을 밝혀 왔고, 2026년에는 그 흐름이 본격화될 것으로 안내되고 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">상시신청 전환의 의미</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 정해진 접수 기간이 사라지고, 자격이 충족되는 시점에 신청 가능
                    <br />
                    · 소득·재산 변동으로 자격이 새로 생긴 경우 재신청 문턱이 낮아지는 방향
                    <br />
                    · 다만 실제 시행 시점, 처리 기간, 지원 순위 방식은 지자체 사정에 따라 다를 수 있음
                  </p>
                </div>
                <p className="mt-4">
                  다만 이 방향성은 국토교통부 사업 지침과 지자체 조례에 따라 세부 방식이 달라집니다. 어떤 지자체는 상시 접수하되 심사 결과를 분기 단위로 통보할 수 있고, 다른 지자체는 대기 순위 방식으로 운영할 수 있습니다. 예외적으로 예산 소진 시 일시 접수 중단이 발생하는 지역도 있을 수 있으므로, 신청 직전 관할 지자체 공고를 확인하는 습관이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">누가 신청할 수 있나요? 자격 요건</h2>
                <p>
                  대체로 만 19세부터 34세 사이의 무주택 청년이 대상입니다. 부모와 별도 세대를 이루어 임차 주택에 거주하고, 본인 소득과 원가구(부모 포함) 소득이 일정 기준 이하이며, 재산도 일정 상한 이내여야 합니다. 임차보증금과 월세도 각각 상한선이 있어, 지나치게 비싼 주택은 지원 대상에서 제외되는 방향으로 설계됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">
                      표 1. 청년 월세 특별지원 신청요건 요약(대체적 방향, 실제 기준은 공고에서 확인)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">대체 기준(방향)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">최종 확인처</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">연령</td>
                        <td className="p-3">만 19~34세 무주택 청년</td>
                        <td className="p-3">복지로·거주지 지자체 공고</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">주택 요건</td>
                        <td className="p-3">부모와 별도 거주, 임차보증금·월세 상한 이내</td>
                        <td className="p-3">국토교통부 지침·지자체 공고</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">소득 요건</td>
                        <td className="p-3">본인 및 원가구 소득이 기준 중위소득 대비 일정 이하</td>
                        <td className="p-3">복지로 모의계산·행정복지센터</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">재산 요건</td>
                        <td className="p-3">본인 및 원가구 총재산이 기준 이내</td>
                        <td className="p-3">복지로·지자체 공고</td>
                      </tr>
                      <tr>
                        <td className="p-3">중복 수급</td>
                        <td className="p-3">주거급여·공공임대·유사 지원과 중복 시 제한 가능</td>
                        <td className="p-3">복지로·관할 행정복지센터</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 이 표의 항목별 수치는 매년, 지자체마다 다릅니다. 특히 원가구 소득 계산 시 부모의 자산을 어디까지 포함하는지, 병역이행 기간을 연령 산정 시 얼마나 인정해 주는지 같은 세부 규정은 공고에 따라 갈리므로, 자격 판단은 반드시 최신 공고와 복지로 모의계산 기능을 함께 활용해 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">얼마를 지원받나요? 금액과 기간</h2>
                <p>
                  청년 월세 특별지원은 임차 주택의 실제 월세 중 일부를 일정 기간 동안 매월 지원하는 방식이 일반적입니다. 월 지원 상한액과 총 지원 기간은 사업 지침과 지자체 조례에 따라 다르며, 매년 예산 상황에 따라 조정될 수 있습니다.
                </p>
                <p className="mt-4">
                  본 가이드에서는 구체적인 월 금액이나 총액을 확정 사실로 제시하지 않습니다. 특정 숫자가 오래된 공고 기준일 수 있고, 지자체별로 자체 예산을 얹어 상향해 주는 경우도 있기 때문입니다. 대신 실제 신청 시 확인해야 할 항목을 짚어 드립니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>월 지원 상한액</strong>: 실제 월세가 상한액보다 낮으면 실제 월세만큼만 지급되는 구조가 일반적입니다.
                  </li>
                  <li>
                    <strong>총 지원 기간</strong>: 연속 지급 방식과 분할 지급 방식이 다를 수 있습니다. 도중에 자격이 상실되면 남은 회차는 지급되지 않습니다.
                  </li>
                  <li>
                    <strong>보증금 월세 환산</strong>: 보증금이 큰 경우 일부 지자체는 환산율을 적용해 월세 상한 판단을 하므로, 계약 형태에 따라 결과가 달라질 수 있습니다.
                  </li>
                  <li>
                    <strong>소급 지급 여부</strong>: 신청일 이전 월세는 지원 대상이 아닌 경우가 많습니다. 자격이 된다면 최대한 이른 시점에 신청하는 편이 유리합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 실제 월 지원 상한, 지급 개월 수, 소급 인정 여부 등 세부 조건은 반드시 복지로 공고문과 거주지 지자체 안내에서 최신 값을 확인해야 합니다. 예외적으로 지자체 자체 예산으로 국토교통부 기준보다 확대 지원하는 지역도 있으므로, 거주지 시·군·구청 주거복지 담당 부서에 문의해 두면 정확합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신청 방법과 절차 단계별 정리</h2>
                <p>
                  청년 월세 특별지원 신청은 크게 온라인 복지로 신청과 오프라인 행정복지센터 방문 신청으로 나뉩니다. 절차 자체는 어렵지 않지만, 서류 준비와 소득·재산 조사 대응이 실제 통과율을 좌우합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">1단계. 자격 사전 확인</p>
                  <p className="text-sm text-text-secondary">
                    복지로(bokjiro.go.kr) 접속 후 복지서비스 검색에서 청년 월세를 조회하고, 모의계산 기능으로 대략적인 자격 여부를 확인합니다. 이 단계에서 부적격이 명확히 뜨면 신청을 서두르기보다는 원인을 먼저 파악하는 편이 시간을 아낍니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">2단계. 서류 준비</p>
                  <p className="text-sm text-text-secondary">
                    임대차계약서 사본, 최근 월세 이체 내역, 주민등록등본, 가족관계증명서, 소득·재산 확인서류를 준비합니다. 임대차계약서에는 확정일자가 찍혀 있는 편이 유리하며, 계좌이체 내역은 임대인 명의로 정기적으로 나간 흔적이 필요합니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">3단계. 온라인 또는 오프라인 신청</p>
                  <p className="text-sm text-text-secondary">
                    온라인은 복지로에서 공동인증서 또는 간편인증으로 로그인 후 신청서를 작성하고 서류를 업로드합니다. 오프라인은 주소지 관할 읍·면·동 행정복지센터를 방문해 신청서를 작성합니다. 방문 전 필요 서류를 전화로 재확인하면 재방문을 피할 수 있습니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">4단계. 심사와 결과 통보</p>
                  <p className="text-sm text-text-secondary">
                    지자체가 소득·재산·주택 요건을 조사한 뒤 지원 여부와 지급 개시월을 통보합니다. 처리 기간은 지자체마다 다르며, 자료 보완 요청이 오면 정해진 기한 내 응답해야 심사가 지연되지 않습니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">5단계. 지급 개시와 변동 신고</p>
                  <p className="text-sm text-text-secondary">
                    결정된 지원금이 매월 본인 계좌로 입금되기 시작합니다. 지원 기간 중 이사, 세대분리·합가, 소득 큰 변동, 계약 변경 등이 발생하면 반드시 관할 창구에 변경 신고를 해야 하며, 신고 지연은 과지급분 환수로 이어질 수 있습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">다른 주거지원과 중복될 수 있나요?</h2>
                <p>
                  중복 수급 여부는 사업 성격에 따라 판단이 갈립니다. 대체로 이미 다른 공공 주거지원을 받고 있는 경우 청년 월세 특별지원 신청이 제한되는 경향이 있지만, 사업 종류마다 세부 규정이 다르므로 일률적으로 단정할 수 없습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">
                      표 2. 청년 월세 특별지원과 다른 주거지원의 관계(대체 비교, 세부는 공고 확인)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지원 성격</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">청년월세와의 관계</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">청년 월세 특별지원</td>
                        <td className="p-3">임차 월세 일부 현금 지원</td>
                        <td className="p-3">본 가이드 대상 사업</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">주거급여(기초생활보장)</td>
                        <td className="p-3">저소득 가구 임차료·수선비 지원</td>
                        <td className="p-3">중복 수급 제한 경향, 원가구 기준 판단</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">버팀목 전세자금대출</td>
                        <td className="p-3">전세보증금 저리 대출</td>
                        <td className="p-3">성격이 달라 병행 가능한 경우가 많음(공고 확인)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">공공임대·행복주택·기숙사</td>
                        <td className="p-3">공공이 공급하는 저렴한 임차 주택</td>
                        <td className="p-3">이미 거주 중이면 청년월세 대상 제외 방향</td>
                      </tr>
                      <tr>
                        <td className="p-3">지자체 자체 청년 월세</td>
                        <td className="p-3">시·도·구 자체 예산 지원</td>
                        <td className="p-3">동일 성격 지원은 중복 제한 가능성 있음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 위 관계는 일반적인 방향일 뿐이며, 각 사업의 세부 지침에 따라 예외가 존재합니다. 이미 다른 주거지원을 이용 중이라면 신청 전 반드시 복지로 상담센터(129) 또는 거주지 행정복지센터에 중복 수급 가능 여부를 문의해 확정해 두는 것이 안전합니다.
                </p>
              </section>

              <AdSlot slot="guide-youth-monthly-rent-support-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">필요 서류와 지급 방식</h2>
                <p>
                  서류 준비의 완결성이 심사 통과와 지급 시점에 큰 영향을 줍니다. 일반적으로 요구되는 서류와 지급 흐름을 미리 정리해 두면 반복 방문을 줄일 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>신분증과 주민등록등본</strong>: 본인 확인과 세대 구성 확인용. 세대분리 상태가 명확히 표시되어야 합니다.
                  </li>
                  <li>
                    <strong>임대차계약서 사본</strong>: 임대인·임차인 성명, 보증금·월세 금액, 계약기간이 명확해야 하며, 확정일자가 있으면 유리합니다.
                  </li>
                  <li>
                    <strong>월세 이체 내역</strong>: 임대인 명의 계좌로 정기 이체된 내역이 필요합니다. 현금 납부만 있는 경우 별도 증빙이 요구될 수 있습니다.
                  </li>
                  <li>
                    <strong>가족관계증명서</strong>: 원가구 소득 산정과 무주택 여부 확인에 사용됩니다.
                  </li>
                  <li>
                    <strong>소득·재산 확인 자료</strong>: 국세청 소득 자료, 건강보험 자격득실, 금융재산 자료 등이 조회 동의로 대체되는 경우가 많습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  지급 방식은 심사 통과 후 신청인 본인 계좌로 매월 입금되는 구조가 일반적입니다. 예외적으로 임대인 계좌로 직접 이체하는 지자체가 있을 수 있으며, 이 경우 별도 위임 서류가 필요할 수 있습니다. 다만 서류 목록과 지급 방식의 세부는 반드시 관할 창구의 안내를 우선 따르는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">지원 시나리오 예시(공고 기준, 확정 아님)</h2>
                <p>
                  아래 사례들은 이해를 돕기 위한 가상의 상황이며, 실제 지원액과 자격은 공고에 따라 달라집니다. 금액은 확정 값이 아닌 예시 흐름으로만 참고해 주세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 사회초년생 A, 서울 원룸 반전세</p>
                  <p className="text-sm text-text-secondary">
                    · 만 27세, 무주택, 부모와 별도 거주
                    <br />
                    · 보증금 1천만원 + 월세 50만원 원룸 거주
                    <br />
                    · 본인 근로소득과 원가구 소득이 공고 기준 이하 가정
                    <br />
                    · 결과 예시: 공고에서 정한 월 지원 상한 이내에서 매월 일정액이 본인 계좌로 지급되는 흐름. 실제 금액은 국토교통부·서울시 공고 기준으로 산정.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 지방 근무 청년 B, 오피스텔 월세</p>
                  <p className="text-sm text-text-secondary">
                    · 만 30세, 무주택, 지방 광역시 거주
                    <br />
                    · 보증금 500만원 + 월세 45만원 오피스텔 거주
                    <br />
                    · 원가구 소득이 공고 기준 이하이나 재산 조사 시 부모 차량 가액 확인 필요 가정
                    <br />
                    · 결과 예시: 재산 조사 결과에 따라 통과 여부가 갈릴 수 있으며, 통과 시 지역 지자체 공고 기준의 월 지원 상한 내에서 지급.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 신혼부부 청년 C, 이미 버팀목 대출 이용</p>
                  <p className="text-sm text-text-secondary">
                    · 만 33세, 무주택, 배우자와 함께 거주
                    <br />
                    · 전세보증금은 버팀목 전세자금대출로 조달, 월세는 없음
                    <br />
                    · 결과 예시: 월세가 발생하지 않는 순수 전세 구조라면 청년 월세 특별지원 대상에서 벗어날 가능성이 큼. 전세 이자 부담은 별도 주거지원 사업으로 검토하는 편이 방향에 맞음.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">놓치기 쉬운 함정과 주의사항</h2>
                <p>
                  지원 대상이 되어도 몇 가지 실무적 함정으로 인해 지원이 중단되거나 환수되는 경우가 있습니다. 미리 알아 두면 대부분 피할 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>임차보증금·월세 상한 초과</strong>: 상한을 조금이라도 넘으면 원칙적으로 대상에서 제외됩니다. 계약 갱신 시 조건이 바뀌면 재확인해야 합니다.
                  </li>
                  <li>
                    <strong>부모와 실제로 함께 거주</strong>: 주민등록만 분리되어 있고 실제 부모 집에서 지내는 경우 조사 과정에서 문제가 될 수 있습니다.
                  </li>
                  <li>
                    <strong>현금으로만 월세 납부</strong>: 이체 내역이 남지 않으면 소명 부담이 커집니다. 가능한 계좌이체를 이용하고 임대인의 확인서를 별도로 받아 두는 것이 안전합니다.
                  </li>
                  <li>
                    <strong>변동 신고 지연</strong>: 이사, 소득 변동, 세대 구성 변경 등을 늦게 신고하면 지원금이 과지급되어 이후 환수 대상이 될 수 있습니다.
                  </li>
                  <li>
                    <strong>공고문 확인 없이 신청</strong>: 오래된 블로그 정보만 보고 지원한다면 예산 소진, 요건 변경 등을 놓칠 수 있습니다. 공고 원문을 우선 확인하는 습관이 필요합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 위 항목들도 상황에 따라 예외가 있을 수 있고, 지자체 담당자의 판단이 개입되는 부분이 있습니다. 애매한 상황이라면 신청 전 관할 행정복지센터에 상담 예약을 잡아 서면 안내를 받아 두는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/monthly-rent-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">월세 세액공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">연말정산에서 월세를 돌려받는 세액공제 조건과 계산법.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-guarantee-insurance-hug-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세보증금 반환보증 HUG 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">전세 사기를 대비하는 보증보험 가입 조건과 실무.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-loan-limit-interest-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세자금대출 한도와 이자 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">청년·신혼부부 대상 전세대출의 한도와 금리 흐름.</p>
                  </Link>
                  <Link
                    href="/guide/lease-priority-right-fixed-date-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">확정일자와 우선변제권 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">임차보증금을 지키는 확정일자·전입신고 순서 정리.</p>
                  </Link>
                  <Link
                    href="/calculator/rent-conversion/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전월세 전환 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금과 월세 사이 전환율을 즉시 계산해 비교.</p>
                  </Link>
                  <Link
                    href="/category/real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부동산 계산기 전체 보기</div>
                    <p className="mt-1 text-sm text-text-secondary">임대차·매매·세금을 아우르는 부동산 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항</strong>: 본 가이드는 청년 주거지원 정책의 이해를 돕기 위한 교육 목적의 정리이며, 개인 맞춤 상담이 아닙니다. 청년 월세 특별지원의 대상 연령, 소득·재산 요건, 임차보증금·월세 상한, 월 지원 금액, 총 지원 기간, 신청 창구, 중복 수급 여부는 국토교통부 사업 지침과 각 지자체 공고에 따라 매년, 지역별로 달라집니다. 반드시 복지로(bokjiro.go.kr), 마이홈포털(myhome.go.kr), 국토교통부(molit.go.kr) 및 거주지 시·군·구청 공고에서 최신 기준을 확인한 뒤 신청하시기 바랍니다. 본 콘텐츠는 2026-07-22 기준으로 작성되었으며, 사업 지침 개편 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.bokjiro.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">복지로</a>,{' '}
                  <a href="https://www.molit.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국토교통부</a>,{' '}
                  <a href="https://www.myhome.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">마이홈포털</a>.
                </p>
              </section>

              <ShareButtons
                title="청년 월세 특별지원 2026 가이드"
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
