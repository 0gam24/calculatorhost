// [revenue-lever: traffic+indexing] 2026 세제개편안 고령자 지방이주 양도세 감면 신설 조기 선점, 롱테일 트래픽 + 색인 표면 확대.
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

const URL = 'https://calculatorhost.com/guide/senior-metro-to-provincial-move-cgt-reduction-2026-reform/';
const DATE_PUBLISHED = '2026-08-21';
const DATE_MODIFIED = '2026-08-21';

export const metadata: Metadata = {
  title: '고령자 지방 이주 양도세 감면 2027, 최대 5억 신설 특례',
  description:
    '2026-08-03 세제개편안, 만 65세 이상 1주택자가 수도권 집을 팔고 비수도권으로 이주하면 양도세를 2027년 50%(5억 한도), 2028년 30%(3억 한도) 감면합니다. 조건과 사후관리 5년 추징 규정을 정리했습니다.',
  keywords: [
    '고령자 지방 이주 양도세 감면',
    '65세 양도세 감면 5억',
    '2026 세제개편 지방 이주',
    '수도권 매각 비수도권 이주',
    '조세특례제한법 신설',
    '고령 1주택자 양도세 특례',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '고령자 지방 이주 양도세 감면 2027, 최대 5억 신설 특례',
      },
    ],
    title: '고령자 지방 이주 양도세 감면 2027, 최대 5억 신설 특례',
    description:
      '만 65세 1주택자가 수도권 주택을 팔고 비수도권으로 이주하면 양도세를 2027년 50%(5억), 2028년 30%(3억) 감면. 2026 세제개편안 신설 특례 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '고령자 지방 이주 양도세 감면 2027, 최대 5억 신설 특례',
    description:
      '2026-08-03 세제개편안. 만 65세 1주택자가 수도권 집을 팔고 지방 이주 시 양도세 감면(2027년 50%·5억, 2028년 30%·3억). 5년 사후관리 추징 유의.',
  },
};

const FAQ_ITEMS = [
  {
    question: '고령자 지방 이주 양도세 감면 특례가 무엇인가요?',
    answer:
      '만 65세 이상 1세대 1주택자가 수도권 주택을 팔고 비수도권으로 이주할 때 양도소득세를 감면해 주는 신설 특례입니다. 2026-08-03 정부 세제개편안에 담긴 내용으로, 2027년 양도분은 산출세액의 50%(최대 5억원), 2028년 양도분은 30%(최대 3억원)까지 감면됩니다. 국회 통과 후 조세특례제한법 개정으로 시행될 예정입니다.',
  },
  {
    question: '누가 감면을 받을 수 있나요?',
    answer:
      '양도일 기준 만 65세 이상이면서 1세대 1주택자여야 합니다. 수도권 소재 주택을 특수관계인이 아닌 제3자에게 팔고, 양도 후 6개월 이내에 본인과 배우자가 비수도권으로 주민등록을 이전하고 실제 거주해야 합니다. 여기에 양도 당시 그 주택에서 계속 2년 이상 거주했고 보유기간 중 총 5년 이상 거주한 이력도 갖춰야 합니다.',
  },
  {
    question: '얼마나 감면되나요? 5억원이 상한인가요?',
    answer:
      '2027년 양도분은 산출세액의 50%가 감면되며 감면액 상한은 5억원입니다. 2028년 양도분은 산출세액의 30%가 감면되고 상한은 3억원으로 낮아집니다. 예를 들어 산출세액이 12억원이면 2027년에는 6억이 아니라 상한인 5억까지만 감면되고, 2028년에는 3.6억이 아니라 3억까지만 감면됩니다.',
  },
  {
    question: '수도권과 비수도권은 어떻게 구분하나요?',
    answer:
      '수도권정비계획법에 따라 서울, 인천, 경기도가 수도권이고 나머지 지역이 비수도권입니다. 대전, 대구, 광주, 부산, 울산, 세종 등 광역시와 도 지역 모두 비수도권에 해당합니다. 다만 이 특례는 이주 지역에 별도의 인구감소지역 요건을 요구하지 않으므로, 비수도권 어디로든 이주하면 요건을 충족합니다. (세컨드홈 특례와 다른 부분입니다.)',
  },
  {
    question: '감면받고 5년 안에 다시 서울로 이사 가면 어떻게 되나요?',
    answer:
      '감면받은 세액과 이자상당가산액을 전액 추징당합니다. 사후관리 기간 5년 동안 (1) 본인이나 배우자가 수도권으로 다시 이주하거나, (2) 수도권 주택을 재취득하거나, (3) 처분했던 기존 주택을 본인이나 세대원이 다시 매입하면 추징 대상이 됩니다. 감면 신청 전에 5년간 계속 지방에 거주할 계획이 확실한지 반드시 점검해야 합니다.',
  },
  {
    question: '함께 발표된 세컨드홈 특례 확대와는 무엇이 다른가요?',
    answer:
      '세컨드홈 특례 확대는 다주택자가 지방 저가주택을 사도 1주택으로 간주해 주는 별도 제도입니다. 기존에는 인구감소지역과 관심지역 공시가 9억(관심지역 4억) 이하로 좁았는데, 이번 개편안에서는 광역시를 제외한 비수도권 전체 공시가 4억 이하로 대상이 넓어졌습니다. 반면 이번 가이드의 감면 특례는 매각 후 이주 요건을 갖춘 고령 1주택자를 대상으로 하는 완전히 다른 제도입니다.',
  },
  {
    question: '언제부터 언제까지 신청할 수 있나요?',
    answer:
      '개편안 원안대로 국회를 통과하면 2027년 1월 1일부터 2028년 12월 31일까지 양도분에 적용되는 한시 특례입니다. 2029년 이후 양도분에는 현재 개편안 기준으로는 적용되지 않으므로, 이주 계획이 있다면 감면 폭이 더 큰 2027년(50%·5억 한도) 안에 양도 시점을 맞추는 것이 유리합니다. 다만 국회 심사 과정에서 감면율, 한도, 시행 기간이 조정될 가능성은 남아 있습니다.',
  },
  {
    question: '1세대 1주택 12억 비과세와 함께 적용되나요?',
    answer:
      '네. 이 감면은 산출된 양도세액에 대해 적용되는 것이므로, 먼저 1세대 1주택 12억 비과세 규정(소득세법 §89 ① 3호)을 적용한 뒤 남은 과세분에 대해 산출된 세액에 감면율을 곱합니다. 즉 양도가액 12억까지는 비과세되고 초과분에 대해 계산된 세액에서 다시 50% 또는 30%가 감면됩니다. 실제 수치는 취득가·보유기간·거주기간에 따라 크게 달라지므로 홈택스 모의계산 후 세무사 상담을 권장합니다.',
  },
];

export default function SeniorMetroToProvincialMoveCgtReduction2026ReformPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '고령자 지방 이주 양도세 감면 2026 세제개편' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '고령자 지방 이주 양도세 감면 2027, 최대 5억 신설 특례',
    description:
      '2026-08-03 정부 세제개편안에 담긴 만 65세 1주택자 수도권 매각·비수도권 이주 양도세 감면 신설 특례. 2027년 50%·5억, 2028년 30%·3억 한도. 조건과 사후관리 추징 규정 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: [
      '고령자 지방 이주 양도세 감면',
      '65세 양도세 감면 5억',
      '2026 세제개편 지방 이주',
      '수도권 매각 비수도권 이주',
      '조세특례제한법 신설',
      '고령 1주택자 양도세 특례',
    ],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '고령자 지방 이주 양도세 감면 2027, 최대 5억 신설 특례',
    description:
      '만 65세 1주택자가 수도권 주택을 매각하고 비수도권으로 이주할 때 양도세를 감면해 주는 2026 세제개편안 신설 특례를 정리한 가이드.',
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
                    { name: '고령자 지방 이주 양도세 감면 2026 세제개편' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">고령 1주택자·지방 이주 예정자 · 9분 읽기 · 2026-08-21</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  고령자 지방 이주 양도세 감면 2027
                  <br />
                  <span className="text-2xl text-text-secondary">· 최대 5억 신설 특례 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026-08-03 발표된 정부 세제개편안에 만 65세 이상 1주택자의 지방 이주를 유도하기 위한 양도세 감면 특례가 신설됐습니다. 서울, 인천, 경기의 집을 팔고 비수도권으로 이주하면 2027년 양도분은 산출세액의 50%(최대 5억), 2028년 양도분은 30%(최대 3억)까지 세금을 깎아 줍니다. 다만 조건이 까다롭고 5년 사후관리 추징이 있으므로 신청 전에 반드시 요건을 확인해야 합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">얼마나 감면되나: 2027년 50%, 2028년 30% 한시 특례</h2>
                <p>
                  이번 특례는 감면율과 상한이 연도별로 다릅니다. 2027년에 팔면 산출세액의 절반이 사라지지만 2028년으로 넘어가면 감면율과 상한이 함께 줄어드는 구조입니다. 정부는 이주를 앞당기려는 인센티브 설계라고 밝혔습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">
                      표 1. 고령자 지방 이주 양도세 감면율 (2026 세제개편안, 국회 통과 후 조세특례제한법 신설 예정)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">양도 시점</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">감면율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">감면액 상한</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2027년 1월 1일 ~ 12월 31일</td>
                        <td className="p-3"><strong>50%</strong></td>
                        <td className="p-3">5억원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2028년 1월 1일 ~ 12월 31일</td>
                        <td className="p-3"><strong>30%</strong></td>
                        <td className="p-3">3억원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2029년 1월 1일 이후</td>
                        <td className="p-3">미적용</td>
                        <td className="p-3">현행 소득세법으로 복귀</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">간단 예시</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 서울 아파트를 2027년에 팔아 산출된 양도세가 8억원인 경우
                    <br />
                    → 감면액 = min(8억 × 50%, 5억) = <strong>4억원 감면</strong>
                    <br />
                    · 같은 조건으로 2028년에 팔면 산출세액 8억 → min(8억 × 30%, 3억) = <strong>2.4억원 감면</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">
                      * 산출세액 계산에는 1세대 1주택 12억 비과세, 장기보유특별공제, 기본공제 250만원, 누진공제가 모두 반영된 후의 세액을 사용합니다.
                    </span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 상한이 있어 아주 큰 산출세액이라도 무한정 감면되지 않습니다. 예컨대 산출세액 15억원짜리 큰 거래라도 2027년 감면 한도는 5억원에서 멈춥니다. 2028년으로 미루면 상한이 3억으로 더 줄어들어 손해가 커질 수 있으니, 매각 시점을 언제로 잡을지가 이번 특례의 핵심 의사결정입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">감면 대상: 만 65세 1주택자의 5가지 요건</h2>
                <p>
                  이 특례는 요건이 상당히 촘촘합니다. 다섯 가지 조건을 모두 갖춰야 감면을 받을 수 있고, 하나라도 어긋나면 원칙적으로 적용 대상에서 제외됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>연령:</strong> 양도일 기준 만 65세 이상이어야 합니다. 부부 공동명의라면 개편안 원안 해석상 지분권자별 요건을 따지므로 사전에 국세청 유권해석을 확인하는 것이 안전합니다.
                  </li>
                  <li>
                    <strong>1세대 1주택:</strong> 양도일 현재 세대원 전체가 국내에 주택 1채만 보유해야 합니다. 오피스텔·분양권·조합원입주권도 주택 수에 포함될 수 있으므로 유의합니다.
                  </li>
                  <li>
                    <strong>수도권 소재 주택:</strong> 매각 대상 주택이 서울, 인천, 경기 안에 있어야 합니다. 광역시나 도 지역 주택은 대상이 아닙니다.
                  </li>
                  <li>
                    <strong>거주 이력:</strong> 양도일 현재 그 주택에서 계속 2년 이상 거주했고, 보유기간 중 총 5년 이상 실거주한 기록이 있어야 합니다. 임대만 두고 본인은 살지 않았다면 요건 미달입니다.
                  </li>
                  <li>
                    <strong>제3자 양도 후 6개월 내 이주:</strong> 특수관계인이 아닌 제3자에게 매각한 뒤 6개월 이내에 본인과 배우자가 비수도권으로 주민등록을 이전하고 실제 거주해야 합니다. 자녀에게 매도하거나 이주 없이 지방에 주소만 옮기는 편법은 배제됩니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만, 시행령·시행규칙이 확정되기 전까지 세부 판정 기준(거주기간 산정 방법, 부부 공동명의 처리 등)이 조정될 가능성이 있습니다. 개편안 통과 이후 기획재정부 보도자료와 국세청 예규를 함께 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">수도권과 비수도권 구분 기준</h2>
                <p>
                  이번 특례에서 말하는 수도권은 수도권정비계획법상 정의를 그대로 씁니다. 즉 서울특별시, 인천광역시, 경기도가 수도권이고 그 외 지역이 비수도권입니다. 조정대상지역이나 투기과열지구 지정 여부와는 무관합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 수도권·비수도권 구분 (수도권정비계획법 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">해당 지역</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">이번 특례 적용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">수도권 (매각 대상)</td>
                        <td className="p-3">서울, 인천, 경기</td>
                        <td className="p-3">매각 시 감면 대상</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">비수도권 (이주 대상)</td>
                        <td className="p-3">부산, 대구, 광주, 대전, 울산, 세종, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주</td>
                        <td className="p-3">이주 시 감면 요건 충족</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  이번 특례는 함께 발표된 세컨드홈 특례와 달리 이주 지역에 인구감소지역·관심지역 같은 별도 제한을 두지 않습니다. 광역시로 이주하든 군 단위 소도시로 이주하든 비수도권이기만 하면 요건을 충족합니다. 다만 세컨드홈 특례처럼 지방 저가주택을 사서 함께 갖고 있으면 1주택 요건이 깨질 수 있으므로 계획 단계에서 두 제도의 관계를 명확히 정리해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 감면받고 5년 안에 서울로 돌아가면 어떻게 되나</h2>
                <p>
                  감면세액과 이자상당가산액이 전액 추징됩니다. 이 특례에는 5년의 사후관리 기간이 붙어 있는데, 그 안에 다음 세 가지 사유 중 하나라도 발생하면 국세청이 감면 결정을 취소하고 세금을 다시 걷습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>사유 1: 수도권 재취득.</strong> 본인 또는 세대원이 서울, 인천, 경기에 새 주택을 취득하는 경우입니다.
                  </li>
                  <li>
                    <strong>사유 2: 본인·배우자 수도권 재이주.</strong> 주민등록만 옮겨도 문제되며, 실제 거주 이력까지 함께 판단됩니다.
                  </li>
                  <li>
                    <strong>사유 3: 처분한 기존 주택 재매입.</strong> 본인이나 세대원이 원래 팔았던 주택을 다시 매입하는 이례적 경우도 배제됩니다.
                  </li>
                </ul>
                <p className="mt-4">
                  이자상당가산액은 감면 시점부터 추징 시점까지의 이자에 해당하는 금액으로, 국세환급가산금 이자율(2026년 기준 연 3.5% 안팎)에 따라 산정됩니다. 감면세액이 4억원이고 3년 뒤 사후관리를 위반하면 원세액 4억에 이자 수천만원이 붙어 돌아오는 셈입니다. 다만, 상속·이혼·요양 목적의 예외 사유가 시행령에서 어떻게 정리될지는 아직 확정되지 않았습니다.
                </p>
                <p className="mt-4">
                  실무적으로는 감면을 신청하기 전에 5년간 지방 거주가 실제로 가능한지 가족과 충분히 논의하고, 자녀 결혼·손주 육아 등으로 다시 서울로 올라올 가능성이 있다면 신청 자체를 재검토하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세컨드홈 특례 확대: 함께 나온 관련 개편</h2>
                <p>
                  같은 개편안에는 다주택자를 위한 세컨드홈 특례 확대안도 담겼습니다. 이번 지방 이주 감면과 자주 혼동되므로 차이를 정리해 둡니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 3. 이번 세제개편안 지방 관련 두 제도의 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">고령자 지방 이주 감면 (본 가이드)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세컨드홈 특례 확대</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">대상자</td>
                        <td className="p-3">만 65세 이상 1주택자</td>
                        <td className="p-3">지방주택을 추가 취득한 다주택자</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">핵심 혜택</td>
                        <td className="p-3">수도권 매각 시 양도세 감면</td>
                        <td className="p-3">지방주택 취득 시 1주택 간주</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">대상 지역</td>
                        <td className="p-3">이주지: 비수도권 전체</td>
                        <td className="p-3">취득지: 광역시 제외 비수도권 공시가 4억 이하</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">이주 요건</td>
                        <td className="p-3">필수 (6개월 내 주민등록 이전)</td>
                        <td className="p-3">없음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  두 제도 모두 지방 부동산 활성화가 목적이지만 접근 방식이 다릅니다. 세컨드홈 특례는 도시 거주자가 지방에 별장·투자용 주택을 살 수 있게 문을 열어 주는 반면, 지방 이주 감면은 도시 은퇴 세대의 주거지 자체를 지방으로 옮기는 것을 유도합니다. 대상자가 완전히 겹치지 않으므로 자신에게 유리한 제도가 무엇인지 세무사와 사전 검토를 권장합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">언제부터 언제까지 적용되나</h2>
                <p>
                  개편안 원안대로 국회를 통과할 경우 2027년 1월 1일부터 2028년 12월 31일까지 양도분에 한해 적용되는 한시 특례입니다. 2029년 이후 양도분은 다시 현행 소득세법 체계로 돌아갑니다.
                </p>
                <p className="mt-4">
                  감면율이 2027년 50%에서 2028년 30%로 낮아지고 상한도 5억에서 3억으로 줄어들기 때문에, 이주 계획이 이미 있다면 2027년 안에 매각·이주를 마치는 것이 세부담 관점에서 유리합니다. 다만 6개월 이내 이주 요건이 있으므로, 이주 준비(집 구하기, 병원·교통·자녀 근접성 검토)를 매각 전에 어느 정도 마쳐 두어야 합니다.
                </p>
                <p className="mt-4">
                  국회 심사 과정에서 감면율·한도·기간이 바뀔 가능성도 있습니다. 특히 감면 대상 연령을 만 60세로 낮추자는 야권 의견, 상한을 낮추자는 재정 당국 의견이 함께 논의되고 있으므로 최종 법률안이 나올 때까지 매각·이주 타이밍을 확정하지 않는 것이 안전합니다. 자세한 진행은 기획재정부 세제실 공지와 국회 의안정보시스템에서 확인할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">다만, 개편안 통과 전 실무 주의점</h2>
                <p>
                  이 특례는 2026-08-20 현재 개편안 단계이며 아직 법률로 확정되지 않았습니다. 미리 계약금을 걸거나 이주 준비를 서두르기 전에 다음을 반드시 점검하세요.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>법률 확정 시점:</strong> 조세특례제한법 개정안이 국회 본회의를 통과하고 공포되기 전까지는 감면이 확정된 것이 아닙니다. 시행령·시행규칙까지 나와야 세부 요건이 확정됩니다.
                  </li>
                  <li>
                    <strong>양도 시점 선택:</strong> 2026년에 팔면 감면이 없고, 2027년으로 넘겨야 50% 감면이 시작됩니다. 계약일이 아니라 잔금일 기준으로 양도 시기가 판정되는 소득세법 §98에 유의합니다.
                  </li>
                  <li>
                    <strong>1세대 1주택 요건 충돌:</strong> 지방으로 이주하면서 지방 주택을 사면 다주택자가 되어 특례 요건이 깨질 수 있습니다. 이주 전 임차인지 매수인지 결정이 필요합니다.
                  </li>
                  <li>
                    <strong>이자상당가산액 리스크:</strong> 5년 안에 계획이 바뀌면 이자까지 추징됩니다. 65세는 자녀 결혼·손주 육아 등 변수가 많은 시기이므로 가족과 사전 합의를 문서화하는 것을 권장합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  본 가이드의 계산 사례는 이해를 돕기 위한 예시일 뿐이며 실제 세액은 취득가, 보유기간, 장기보유특별공제, 조정대상지역 여부, 감가상각 여부 등에 따라 크게 달라집니다. 시행 전 반드시 홈택스 모의계산과 세무사 개별 상담을 거치세요.
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
                    <div className="font-semibold text-primary-500">1세대 1주택 12억 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">감면 이전 단계에서 먼저 적용되는 기본 비과세 한도.</p>
                  </Link>
                  <Link
                    href="/guide/one-house-2-year-residence-requirement-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">2년 거주 요건 완전 정리</div>
                    <p className="mt-1 text-sm text-text-secondary">이번 특례의 핵심 조건인 실거주 요건 판정 기준.</p>
                  </Link>
                  <Link
                    href="/guide/cooperative-landlord-capital-gains-exemption-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상생임대주택 양도세 특례</div>
                    <p className="mt-1 text-sm text-text-secondary">거주요건 대체 인정 방식으로 유사한 양도세 감면 제도.</p>
                  </Link>
                  <Link
                    href="/guide/basic-pension-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">기초연금 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">지방 이주 후 소득이 줄었을 때 함께 검토할 노후 지원 제도.</p>
                  </Link>
                  <Link
                    href="/calculator/capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">감면 적용 전 산출세액을 미리 시뮬레이션.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·종부세 통합 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 2026-08-03 발표된 정부 세제개편안 자료를 기준으로 2026-08-21에 작성됐으며, 국회 심사 과정에서 감면율·한도·시행 기간·요건이 변경될 수 있습니다. 최종 법률과 시행령이 공포된 이후 국세청·기획재정부 안내를 재확인하시고, 실제 양도·이주 결정 전에는 세무사 개별 상담을 반드시 받으시기 바랍니다. 본 가이드는 정보 제공 목적이며 특정 부동산 거래에 대한 투자 판단이나 세무 대리를 대신하지 않습니다. 관련 법조항은 <strong>조세특례제한법 신설 조항(개편안), 소득세법 §89 ① 3호(1세대 1주택 비과세), §98(양도 시기), 수도권정비계획법 §2(수도권 정의)</strong>를 따르며, 시행 확정 시 즉시 반영합니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.moef.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">기획재정부 세제실</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스 양도소득세 모의계산</a>.
                </p>
              </section>

              <ShareButtons
                title="고령자 지방 이주 양도세 감면 2027 가이드"
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
