import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/housing-pension-reverse-mortgage-2026/';
const DATE_PUBLISHED = '2026-06-19';
const DATE_MODIFIED = '2026-06-19';

export const metadata: Metadata = {
  title: '주택연금(역모기지) 2026 완벽 가이드 | 가입조건·공시가격·월지급금 결정요인 | calculatorhost',
  description:
    '주택연금은 집을 담보로 평생 월금을 받는 국가보증 역모기지입니다. 만 55세 이상 가입조건, 공시가격 12억 한도, 배우자 승계, 우대지급방식, 월지급금 결정요인을 정리합니다.',
  keywords: [
    '주택연금',
    '역모기지',
    '연금수령',
    '공시가격',
    '가입조건',
    '월지급금',
    '배우자 승계',
    '우대지급',
    '한국주택금융공사',
    '은퇴자금',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '주택연금(역모기지) 2026 완벽 가이드' }],
    title: '주택연금(역모기지) 2026 | 가입조건·월지급금·배우자 승계',
    description: '집을 담보로 평생 월금을 받는 국가보증 역모기지. 만 55세 이상 가입조건·공시가격 12억 한도·월지급금 결정요인을 완벽 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '주택연금(역모기지)는 정확히 무엇인가요?',
    answer:
      '집을 담보로 평생 매월 연금을 받는 국가보증 대출상품입니다. 한국주택금융공사(정부출연기관)가 운영하며, 가입자가 사망할 때까지 또는 다른 선택지에 따라 정해진 기간 동안 월금을 지급합니다. 상환은 가입자 사망 후 주택 판매로 자동 정산되므로, 생존 중에는 월금만 받습니다. 법적 근거: 주택금융공사법.',
  },
  {
    question: '만 55세 미만이면 가입할 수 없나요?',
    answer:
      '그렇습니다. 부부 중 1명이라도 만 55세 이상이면 가입 가능합니다. 배우자가 만 55세 이상인 경우, 1명만 가입자로 등록하고 배우자는 사망 시 승계자가 될 수 있습니다. 다만 신청 본인은 반드시 만 55세 이상이어야 합니다.',
  },
  {
    question: '공시가격 12억을 초과하면 어떻게 되나요?',
    answer:
      '다주택자의 경우 "보유주택 공시가격 합산이 12억 원 이하"여야 가입할 수 있습니다. 예를 들어 주택 A(공시가 5억)·B(공시가 8억)를 소유하면 합산 13억으로 초과되어 가입 불가능합니다. 1주택자는 그 주택이 12억을 초과하면 가입 불가능하며, 초과분은 월지급금 산정에 반영되지 않습니다.',
  },
  {
    question: '배우자가 사망한 후 나는 어떻게 되나요?',
    answer:
      '가입 때 선택한 저당권방식 또는 신탁방식에 따라 다릅니다. 신탁방식(권장)을 선택했다면 배우자가 자동으로 승계하여 동일한 월지급금을 감액 없이 계속 받습니다. 저당권방식은 배우자가 손수 소유권 이전·근저당 변경 등 절차를 해야 하므로 번거롭습니다. 신탁방식을 추천하는 이유입니다.',
  },
  {
    question: '월지급금은 어떻게 결정되나요?',
    answer:
      '가입 당시 나이가 많을수록, 주택가격(12억 한도)이 높을수록, 적용금리가 낮을수록 월지급금이 많습니다. 예: 만 65세와 만 75세가 같은 집으로 가입하면 75세가 더 많이 받습니다. 정확한 월지급금은 한국주택금융공사의 "예상연금 조회"에서 나이·주택가격을 입력해 확인할 수 있습니다.',
  },
  {
    question: '주택연금 수령액은 세금이 붙나요?',
    answer:
      '아닙니다. 주택연금 수령액은 소득세 비과세입니다. 대출금(선취이자 포함)을 나누어 받는 것이므로 소득이 아니기 때문입니다. 다만 해당 주택에 대한 재산세(25% 감면), 취득세(감면 가능), 등록면허세(감면 가능)는 별도로 계산됩니다.',
  },
  {
    question: '기초연금을 받고 있는데 주택연금도 받을 수 있나요?',
    answer:
      '네, 기초연금과 주택연금을 동시에 받을 수 있습니다. 다만 기초연금 수급 조건은 소득·재산 기준이 있으므로, 주택연금 월지급금이 증가해도 기초연금 지급 여부에 영향이 없는지 사전에 관할 주민센터에 확인하는 게 좋습니다.',
  },
  {
    question: '우대지급방식이란 무엇인가요?',
    answer:
      '저소득·저가주택 보유자를 위해 월지급금을 더 많이 주는 방식입니다. 요건: 본인 또는 배우자가 기초연금 수급권자이면서, 부부 기준 1주택 보유. 조건을 충족하면 일반 지급 대비 월지급금이 약 10~20% 더 많습니다.',
  },
];

export default function HousingPensionReverseMortgage2026() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '주택연금(역모기지) 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '주택연금(역모기지) 2026 완벽 가이드 — 가입조건·공시가격·월지급금·배우자 승계',
    description:
      '집을 담보로 평생 월금을 받는 국가보증 역모기지. 만 55세 이상 가입조건, 공시가격 12억 원 한도, 월지급금 결정요인, 배우자 승계 절차, 우대지급방식, 세제 혜택까지 완벽 정리했습니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['주택연금', '역모기지', '공시가격', '월지급금', '은퇴자금'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '주택연금(역모기지) 2026 | 가입조건·공시가격·월지급금',
    description:
      '집을 담보로 평생 월금을 받는 국가보증 역모기지. 만 55세 이상 가입조건, 공시가격 12억 한도, 배우자 승계, 월지급금 결정요인, 우대지급방식, 세제 혜택을 완벽 정리.',
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
                    { name: '주택연금(역모기지)' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">금융 · 9분 읽기 · 2026-06-19</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  주택연금(역모기지) 2026 완벽 가이드 — 가입조건·공시가격·월지급금·배우자 승계
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  집을 담보로 평생 매월 연금을 받는 국가보증 역모기지, 주택연금. 가입조건부터 월지급금 결정요인, 배우자 승계, 세제 혜택까지 놓친 부분 없이 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-housing-pension-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">주택연금 한눈에</h2>
                <table className="w-full text-sm" data-speakable>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th className="text-left py-2 px-2 font-semibold">항목</th>
                      <th className="text-left py-2 px-2 font-semibold">내용</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="py-2 px-2">가입연령</td>
                      <td className="py-2 px-2">부부 중 1명이 만 55세 이상</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 px-2">가입대상 주택</td>
                      <td className="py-2 px-2">공시가격 12억 원 이하 (다주택자 합산)</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 px-2">월지급금</td>
                      <td className="py-2 px-2">나이·주택가격·금리에 따라 결정 (정확한 금액은 공사 조회)</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 px-2">수령액 과세</td>
                      <td className="py-2 px-2">소득세 비과세 (대출금 성격)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2">배우자 승계</td>
                      <td className="py-2 px-2">신탁방식 선택 시 감액 없이 자동 승계</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">주택연금이란 무엇인가?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  주택연금은 <strong>집을 담보로 평생 매월 연금을 받는 국가보증 역모기지</strong>입니다.
                  한국주택금융공사(정부출연기관)가 운영하며, 가입자가 살고 있는 집을 담보로 설정한 후,
                  사망할 때까지 또는 선택한 방식에 따라 정해진 기간 동안 매달 현금을 지급합니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  가장 중요한 특징은 <strong>생존 중에는 월금만 받고, 상환은 사망 후 주택을 판매</strong>할 때 자동으로 정산된다는 것입니다.
                  따라서 매달 생활비를 보충하면서도 집에서 계속 살 수 있습니다.
                  이를 "역모기지"라 부르는 이유는, 일반 주담대(돈을 받고 월납금을 냄)의 반대 개념이기 때문입니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">가입조건 — 누가 신청할 수 있을까?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  주택연금 가입의 핵심 조건은 <strong>나이, 주택가격, 주택 소유 현황</strong>입니다.
                </p>
                <h3 className="text-lg font-semibold mt-4">1️⃣ 나이 조건 — 만 55세 이상</h3>
                <p className="text-text-secondary leading-relaxed text-sm">
                  <strong>부부 중 1명이라도 만 55세 이상</strong>이면 가입할 수 있습니다.
                  배우자가 만 60세, 본인이 만 53세라면, 배우자가 가입자가 되어 신청 가능합니다.
                  다만 신청을 주도하는 사람(가입자 본인)은 반드시 만 55세 이상이어야 합니다.
                </p>
                <p className="text-xs text-text-tertiary">
                  ⚠️ 다만 배우자가 가입자가 되는 경우, 본인은 배우자 사망 후 "승계자"가 될 수 있으므로 추가 신청 절차 없이 자동 계승됩니다.
                </p>

                <h3 className="text-lg font-semibold mt-4">2️⃣ 주택 조건 — 공시가격 12억 원 이하</h3>
                <p className="text-text-secondary leading-relaxed text-sm">
                  <strong>가입 시점의 공시가격을 기준</strong>으로 다음이 적용됩니다.
                </p>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    <strong>1주택자:</strong> 그 주택의 공시가격이 12억 원 이하면 가입 가능.
                    12억을 초과하면 초과분은 월지급금에 반영되지 않으므로, 실질적으로 12억 기준으로 계산됩니다.
                  </li>
                  <li>
                    <strong>다주택자:</strong> 모든 보유주택의 공시가격을 합산하여 12억 원 이하여야 가입 가능.
                    예: 주택 A(공시가 6억)·B(공시가 7억) 소유 시, 합산 13억으로 초과되어 가입 불가능.
                  </li>
                </ul>
                <p className="text-xs text-text-tertiary">
                  ⚠️ 공시가격은 매년 1월 1일 기준으로 공시되므로, 시장가격과 다를 수 있습니다.
                  정확한 공시가격은 부동산공시가격알리미(realtyprice.kr)에서 확인하세요.
                </p>

                <h3 className="text-lg font-semibold mt-4">3️⃣ 주택 유형</h3>
                <p className="text-text-secondary leading-relaxed text-sm">
                  단독주택, 오피스텔(분양), 아파트, 다세대·다가구주택, 상가주택 등 대부분의 주택이 대상입니다.
                  다만 미분양 또는 미점유 주택은 제외됩니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">월지급금 — 얼마를 받을 수 있을까?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  주택연금의 월지급금은 <strong>가입 시점의 나이, 주택가격, 적용금리</strong>에 따라 결정됩니다.
                  동일한 집이라도 나이가 많을수록, 나중에 신청할수록 월지급금이 많습니다.
                </p>
                <h3 className="text-lg font-semibold mt-4">월지급금 결정요인</h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>① 가입연령 (가장 중요)</strong>
                    <br />
                    만 65세와 만 75세가 같은 주택(공시가 5억)으로 신청하면, 75세가 훨씬 더 많은 월지급금을 받습니다.
                    이유는 평균 수명을 고려해 나이가 많을수록 짧은 기간에 많은 금액을 나누어 주기 때문입니다.
                  </li>
                  <li>
                    <strong>② 주택가격 (12억 한도)</strong>
                    <br />
                    공시가격이 높을수록 월지급금이 많습니다. 예: 공시가 3억 vs 6억 집이면, 6억 집이 약 2배 정도 월지급금이 많습니다.
                    다만 12억을 초과하는 부분은 계산에 반영되지 않습니다.
                  </li>
                  <li>
                    <strong>③ 적용금리</strong>
                    <br />
                    한국주택금융공사가 정하는 적용금리가 낮을수록 월지급금이 많습니다.
                    금리는 시장 금리에 따라 변동하므로, 신청 시점이 중요합니다.
                  </li>
                </ul>

                <h3 className="text-lg font-semibold mt-4">⚠️ 정확한 월지급금 확인 방법</h3>
                <p className="text-sm text-text-tertiary">
                  구체적인 월지급금(원 단위)을 표로 제시하기는 어렵습니다. 왜냐하면 금리가 수시로 변하고,
                  한국주택금융공사의 산정 방식도 개편되기 때문입니다.
                  <br />
                  <strong>정확한 월지급금은 반드시 한국주택금융공사(hf.go.kr)의 "예상연금 조회"에서 직접 입력하여 확인하세요.</strong>
                  나이, 주택가격, 지역 등을 입력하면 즉시 월지급금을 볼 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">지급방식 4가지 — 어떤 방식을 선택할까?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  주택연금은 4가지 지급방식을 선택할 수 있습니다. 각각 장단점이 있으므로 본인 상황에 맞게 선택하세요.
                </p>
                <h3 className="text-lg font-semibold mt-4">1️⃣ 종신지급방식 (가장 일반적)</h3>
                <p className="text-sm text-text-secondary">
                  <strong>사망할 때까지 매월 같은 금액을 지급</strong>합니다.
                  예: 월 300만 원을 매달 받다가, 사망 후 주택을 팔아 상환합니다.
                  <br />
                  <strong>장점:</strong> 가장 높은 월지급금을 받을 수 있음.
                  <br />
                  <strong>단점:</strong> 수명이 짧으면 받은 월지급금 합계가 주택가격보다 적을 수 있습니다 (그러나 국가보증이므로 손실 없음).
                </p>

                <h3 className="text-lg font-semibold mt-4">2️⃣ 확정기간방식</h3>
                <p className="text-sm text-text-secondary">
                  <strong>10년, 15년, 20년 등 정한 기간 동안만 지급</strong>합니다.
                  기간이 만료되면 지급이 중단됩니다.
                  <br />
                  <strong>장점:</strong> 기간이 짧을수록 월지급금이 많음.
                  <br />
                  <strong>단점:</strong> 기간 만료 후 추가 수령 없음. 오래 사시는 분에게는 불리합니다.
                </p>

                <h3 className="text-lg font-semibold mt-4">3️⃣ 대출상환방식</h3>
                <p className="text-sm text-text-secondary">
                  <strong>주담대(주택담보대출) 상환용 일시금을 먼저 인출한 후, 나머지 잔액을 종신 또는 기간 지급</strong>합니다.
                  예: 주담대 1억 상환 → 나머지로 월 150만 원 종신 지급.
                  <br />
                  <strong>장점:</strong> 기존 높은 금리 대출을 갚을 수 있음.
                  <br />
                  <strong>단점:</strong> 초기 일시금 인출로 잔액이 줄어들어 월지급금이 적어집니다.
                </p>

                <h3 className="text-lg font-semibold mt-4">4️⃣ 우대지급방식</h3>
                <p className="text-sm text-text-secondary">
                  <strong>저소득·저가주택 보유자를 위해 월지급금을 더 많이 주는 방식</strong>입니다.
                  <br />
                  <strong>요건:</strong> 본인 또는 배우자가 기초연금 수급권자 + 부부 기준 1주택.
                  <br />
                  <strong>우대액:</strong> 일반 지급 대비 약 10~20% 더 많음.
                  <br />
                  <strong>추천:</strong> 저가주택(공시가 2~3억) + 기초연금 수급자라면 강력 추천입니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">배우자 승계 — 배우자가 사망 후 어떻게 되나?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  주택연금의 큰 장점은 <strong>배우자가 사망해도 생존자(배우자 또는 본인)가 동일한 월금을 계속 받을 수 있다</strong>는 것입니다.
                  다만 가입 시 선택한 방식에 따라 절차가 달라집니다.
                </p>
                <h3 className="text-lg font-semibold mt-4">신탁방식 (권장) — 자동 승계, 절차 간단</h3>
                <p className="text-sm text-text-secondary">
                  가입자와 배우자의 공동명의 또는 신탁 형태로 주택을 등록합니다.
                  가입자 사망 시, 배우자가 <strong>자동으로 계승하여 동일한 월금을 감액 없이 계속 받습니다.</strong>
                  <br />
                  <strong>장점:</strong> 별도의 소유권 이전, 근저당 변경 등 절차 불필요. 자동 계승.
                  <br />
                  <strong>권장 이유:</strong> 배우자가 고령이면 번거로운 등기 절차를 할 수 없을 수 있으므로, 신탁방식이 훨씬 안전합니다.
                </p>

                <h3 className="text-lg font-semibold mt-4">저당권방식 — 수동 승계, 절차 번거로움</h3>
                <p className="text-sm text-text-secondary">
                  가입자 단독명의 주택에 저당권만 설정합니다.
                  가입자 사망 시, 배우자가 <strong>손수 소유권 이전, 근저당 변경 등 등기 절차를 처리</strong>해야 승계됩니다.
                  <br />
                  <strong>단점:</strong> 고령 배우자가 직접 법무사 방문, 등기부 변경 등을 해야 하므로 번거롭습니다.
                  또한 절차 중 실수가 있으면 월금 지급이 중단될 수 있습니다.
                </p>

                <p className="border-l-4 border-l-highlight-500 bg-card pl-4 py-3 text-sm">
                  <strong>결론:</strong> 신탁방식을 강력히 권장합니다. 배우자 사망 후 생존자가 복잡한 등기 절차 없이 자동 계승되는 것이
                  가장 안전하고 편합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">세제 혜택 — 세금과 재산세</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  주택연금의 또 다른 장점은 세제 혜택입니다. 월지급금은 소득세 비과세이며,
                  관련 세금과 수수료도 감면됩니다.
                </p>
                <h3 className="text-lg font-semibold mt-4">1️⃣ 월지급금은 소득세 비과세</h3>
                <p className="text-sm text-text-secondary">
                  주택연금 수령액은 <strong>소득세가 붙지 않습니다.</strong>
                  이유는 대출금(선취이자 포함)을 나누어 받는 것이므로 "소득"이 아니기 때문입니다.
                  따라서 연 1,200만 원을 받아도, 연 2,400만 원을 받아도 소득세 신고 대상이 아닙니다.
                  <br />
                  근거: 한국주택금융공사법 및 조세특례제한법(주택담보노후연금 관련 규정).
                </p>

                <h3 className="text-lg font-semibold mt-4">2️⃣ 재산세 25% 감면</h3>
                <p className="text-sm text-text-secondary">
                  주택연금 가입 주택은 <strong>재산세가 25% 감면</strong>됩니다.
                  예: 예상 재산세 200만 원 → 150만 원으로 감소.
                  <br />
                  이 감면은 매년 자동으로 적용되므로, 별도 신청 불필요. 근거: 지방세특례제한법(주택연금 가입주택 재산세 경감 규정).
                </p>

                <h3 className="text-lg font-semibold mt-4">3️⃣ 등록면허세·국민주택채권 감면</h3>
                <p className="text-sm text-text-secondary">
                  저당권 설정 시 등록면허세, 그리고 특정 요건(저가주택·1주택)에 따라 국민주택채권이 감면될 수 있습니다.
                  정확한 감면 여부는 한국주택금융공사에 확인하세요.
                </p>

                <p className="text-xs text-text-tertiary">
                  ⚠️ 주택연금 가입 후 발생하는 재산세는 여전히 납부해야 합니다.
                  주택연금 월금으로 재산세를 내야 한다는 점을 고려해 가입 결정하세요.
                </p>
              </section>

              <AdSlot slot="guide-housing-pension-mid" format="rectangle" />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">주택연금 신청 절차</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  주택연금 신청 절차는 생각보다 간단합니다. 한국주택금융공사 방문 또는 온라인으로 진행할 수 있습니다.
                </p>
                <ol className="space-y-3 text-sm">
                  <li>
                    <strong>1단계:</strong> 한국주택금융공사(hf.go.kr) 방문 또는 전화 상담
                  </li>
                  <li>
                    <strong>2단계:</strong> 필요 서류 준비 (신분증, 건강보험증, 주택권리증, 임차인 확인서 등)
                  </li>
                  <li>
                    <strong>3단계:</strong> 한국주택금융공사에 신청 및 심사 (약 2~3주)
                  </li>
                  <li>
                    <strong>4단계:</strong> 주택 감정 및 심사 완료
                  </li>
                  <li>
                    <strong>5단계:</strong> 저당권 또는 신탁 등기 (법무사 비용 약 50~100만 원)
                  </li>
                  <li>
                    <strong>6단계:</strong> 첫 월금 지급 (통상 등기 완료 후 15일 이내)
                  </li>
                </ol>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">흔한 오해 5가지</h2>
                <ol className="space-y-2 text-sm">
                  <li>
                    <strong>❌ "주택연금은 연금이므로 재산세를 안 낸다?"</strong>
                    <br />
                    <span className="text-text-tertiary">아닙니다. 여전히 재산세를 내야 하지만, 25% 감면될 뿐입니다.</span>
                  </li>
                  <li>
                    <strong>❌ "월금을 받으면 기초연금이 끊긴다?"</strong>
                    <br />
                    <span className="text-text-tertiary">아닙니다. 주택연금 수령액은 기초연금 소득으로 계산되지 않으므로, 기초연금과 동시 수령 가능합니다. 다만 사전에 지자체에 확인하는 게 좋습니다.</span>
                  </li>
                  <li>
                    <strong>❌ "자식에게 상속해줄 수 없다?"</strong>
                    <br />
                    <span className="text-text-tertiary">배우자 사망 후 자식에게 상속하려면, 미리 주택을 처분하거나 주택연금을 중도해지해야 합니다. 가입자·배우자 모두 사망하면 주택은 자동으로 공사에 처분됩니다.</span>
                  </li>
                  <li>
                    <strong>❌ "월금이 많으면 건강보험료가 올라간다?"</strong>
                    <br />
                    <span className="text-text-tertiary">주택연금 수령액은 소득으로 계산되지 않으므로, 건강보험료에 영향을 미치지 않습니다.</span>
                  </li>
                  <li>
                    <strong>❌ "가입 후 이사하면 월금이 중단된다?"</strong>
                    <br />
                    <span className="text-text-tertiary">주택연금 가입 후 이사하면 월금은 계속 받지만, 그 집에 다른 사람이 살게 됩니다. 임차인을 보호하기 위해 임차인 동의가 필요합니다.</span>
                  </li>
                </ol>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">관련 법령 & 공식 출처</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    한국주택금융공사법·시행령(가입 요건·주택담보노후연금보증): <a href="https://www.law.go.kr" target="_blank" rel="nofollow noopener noreferrer" className="text-primary-500 underline">법제처 국가법령정보센터</a>
                  </li>
                  <li>
                    지방세특례제한법(재산세 25% 감면)·조세특례제한법(월지급금 소득세 비과세): <a href="https://www.law.go.kr" target="_blank" rel="nofollow noopener noreferrer" className="text-primary-500 underline">법제처 국가법령정보센터</a>
                  </li>
                  <li>
                    한국주택금융공사 공식 홈페이지: <a href="https://www.hf.go.kr" target="_blank" rel="nofollow noopener noreferrer" className="text-primary-500 underline">hf.go.kr</a> (예상연금 조회, 신청 안내)
                  </li>
                  <li>
                    부동산공시가격알리미(공시가격): <a href="https://www.realtyprice.kr" target="_blank" rel="nofollow noopener noreferrer" className="text-primary-500 underline">realtyprice.kr</a>
                  </li>
                  <li>
                    기초연금(수급 자격 확인): 주민센터 또는 보건복지부
                  </li>
                </ul>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">관련 계산기 & 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    ➜ <Link href="/calculator/retirement/" className="font-semibold text-primary-500 hover:underline">
                      은퇴자금 계산기
                    </Link>
                    {' — 필요한 총 은퇴자금 산출'}
                  </li>
                  <li>
                    ➜ <Link href="/calculator/broker-fee/" className="font-semibold text-primary-500 hover:underline">
                      중개수수료 계산기
                    </Link>
                    {' — 주택 매매 시 중개보수 상한 확인'}
                  </li>
                  <li>
                    ➜ <Link href="/calculator/inflation/" className="font-semibold text-primary-500 hover:underline">
                      화폐가치 계산기
                    </Link>
                    {' — 30년 뒤 월지급금의 실질 구매력 확인'}
                  </li>
                  <li>
                    ➜ <Link href="/guide/national-pension-expected-benefit-2026/" className="font-semibold text-primary-500 hover:underline">
                      국민연금 예상수령액 2026
                    </Link>
                    {' — 월 연금수령액 확인'}
                  </li>
                  <li>
                    ➜ <Link href="/guide/basic-pension-2026/" className="font-semibold text-primary-500 hover:underline">
                      기초연금 수급 조건 2026
                    </Link>
                    {' — 우대지급방식 요건 확인'}
                  </li>
                  <li>
                    ➜ <Link href="/guide/private-pension-1500-million-separate-taxation-2026/" className="font-semibold text-primary-500 hover:underline">
                      사적연금 과세 2026
                    </Link>
                    {' — 기타 연금소득 세제'}
                  </li>
                </ul>
              </section>

              <section className="space-y-3 border-t border-border-base pt-6">
                <p className="text-xs text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 참고용이며 법적 효력이 없습니다.
                  정확한 월지급금, 수급 자격, 세제 우대 등은 반드시 한국주택금융공사에 문의하시기 바랍니다.
                </p>
              </section>

              <section className="space-y-3 border-t border-border-base pt-6">
                <p className="text-xs text-text-tertiary">
                  <strong>AI 보조 표기:</strong> 본 가이드는 AI(Claude) 보조 작성 후 운영자 검수를 거쳤습니다.
                </p>
                <p className="text-xs text-text-tertiary">
                  마지막 갱신: 2026-06-19 | 한국주택금융공사법, 한국주택금융공사 상품안내 기준
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
