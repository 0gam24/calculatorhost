// [revenue-lever: indexing+traffic]
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

const URL = 'https://calculatorhost.com/guide/inheritance-house-acquisition-tax-2026/';
const DATE_PUBLISHED = '2026-08-07';
const DATE_MODIFIED = '2026-08-07';

export const metadata: Metadata = {
  title: '상속 주택 취득세 2026, 무주택 1주택 특례 0.8%',
  description:
    '부모 집을 물려받았을 때 상속 주택 취득세는 기본 2.8%, 무주택 1가구 1주택 특례는 0.8%. 신고 기한 6개월, 다주택 중과 제외까지 지방세법 15조 기준 정리.',
  keywords: [
    '상속 주택 취득세',
    '상속 취득세 0.8%',
    '상속 취득세 2.8%',
    '무주택 특례 취득세',
    '상속 취득세 신고 기한',
    '상속 주택 다주택 중과',
    '상속 취득세 지방교육세',
    '지방세법 15조',
    '지방세법 11조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '상속 주택 취득세 2026, 무주택 1주택 특례 0.8%' }],
    title: '상속 주택 취득세 2026, 무주택 1주택 특례 0.8%',
    description: '기본 세율 2.8%, 무주택 1가구가 1주택을 상속받으면 특례 0.8%. 지방세법 15조 근거로 신고 기한·중과 제외까지 완전 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '상속 주택 취득세 2026, 무주택 1주택 특례 0.8%',
    description: '상속 주택 취득세 기본 2.8%, 무주택 1가구 특례 0.8%. 신고 기한 6개월. 지방세법 15조.',
  },
};

const FAQ_ITEMS = [
  {
    question: '상속 주택 취득세는 얼마인가요?',
    answer:
      '상속으로 주택을 취득하면 원칙적으로 시가표준액의 2.8%가 취득세로 부과됩니다(지방세법 §11①제1호). 다만 상속개시일 기준으로 상속인 세대가 무주택이면서 상속으로 1주택이 되는 경우에는 특례세율 0.8%가 적용됩니다(지방세법 §15①제2호). 지방교육세와 농어촌특별세는 별도이며, 전용면적 85제곱미터 이하 국민주택 규모는 농특세가 비과세됩니다.',
  },
  {
    question: '무주택 1가구 특례 0.8%를 받으려면 어떤 조건이 필요한가요?',
    answer:
      '상속개시일(피상속인 사망일) 현재 상속인이 속한 세대의 모든 구성원이 무주택이어야 합니다(지방세법 §15①제2호). 1가구 판정은 세대별 주민등록표를 기준으로 하며, 배우자·직계존비속 등 함께 등재된 가족의 주택 보유가 있으면 특례가 배제됩니다. 세대 분리가 형식적일 뿐 실질적으로 함께 거주하는 경우 부인될 수 있으므로 관할 시군구 사전 확인이 안전합니다.',
  },
  {
    question: '상속 취득세는 언제까지 신고·납부해야 하나요?',
    answer:
      '상속개시일이 속하는 달의 말일부터 6개월 이내에 신고·납부해야 합니다(지방세법 §20①). 예를 들어 3월 3일에 사망하면 3월 31일이 기산점이고 그해 9월 30일이 기한입니다. 상속인 중 외국에 주소를 둔 자가 있으면 9개월로 연장됩니다. 기한을 넘기면 무신고 가산세 20%와 납부지연 가산세가 일할로 부과되므로 서두르는 것이 좋습니다.',
  },
  {
    question: '상속받은 주택도 다주택자 중과세율 8%, 12% 대상인가요?',
    answer:
      '아닙니다. 다주택자 중과세율 8%·12%는 매매 등 유상거래에 적용되는 세율이므로 무상취득인 상속에는 해당하지 않습니다. 상속 주택은 기존 주택 수와 무관하게 기본 2.8%(또는 특례 0.8%)만 적용됩니다. 또한 상속개시일부터 일정 기간 동안은 상속 주택이 주택 수 계산에서 제외되어, 이후 다른 주택을 매입해도 중과 판정에 영향을 덜 주는 특례가 있습니다(정확한 기간은 관할 확인 필요).',
  },
  {
    question: '지방교육세와 농어촌특별세도 함께 내야 하나요?',
    answer:
      '네, 취득세 외에 지방교육세가 반드시 부과됩니다(지방세법 §151). 특례세율 0.8%가 적용되면 지방교육세는 약 0.16%가 더해져 합산 실효세율이 약 0.96%가 됩니다. 기본세율 2.8%가 적용되면 지방교육세가 별도 가산되며, 전용면적 85제곱미터 초과 주택은 농어촌특별세도 추가됩니다. 최종 실효세율은 전용면적·과세표준에 따라 달라지므로 위택스 시뮬레이션이나 관할 시군구 확인이 필수입니다.',
  },
  {
    question: '증여로 받은 주택과 상속받은 주택의 취득세는 어떻게 다른가요?',
    answer:
      '결정적으로 다릅니다. 증여는 무상취득 세율 3.5%가 기본이며, 증여자가 다주택자이고 조정대상지역 시가표준액 3억 원 이상 주택이면 12%까지 중과됩니다. 반면 상속은 무상취득이지만 별도 규정으로 기본 2.8%, 무주택 특례 0.8%가 적용되고 중과 대상이 아닙니다. 즉 같은 무상취득이라도 상속이 압도적으로 세부담이 낮으며, 이는 가족의 사망이라는 비자발적 승계라는 특수성 때문입니다.',
  },
  {
    question: '공동상속으로 지분만 받은 경우에도 특례가 적용되나요?',
    answer:
      '지분 상속의 경우 대표 상속인의 무주택 여부에 따라 특례 적용이 달라질 수 있습니다. 실무상 무주택자 지분이 과반(50% 초과)이면 해당 주택 전체가 특례세율 대상이 될 수 있다는 해석 사례가 있으나, 유주택자 지분에 대해서는 여전히 기본세율이 적용되는 경우도 있습니다. 공동상속은 지분 구조와 상속인별 세대 상황이 복잡해 일률 판단이 어려우니 반드시 관할 시군구 세정과에 사전 문의하세요.',
  },
  {
    question: '상속 취득세 신고 시 어떤 서류가 필요한가요?',
    answer:
      '기본적으로 취득세 신고서, 사망진단서 또는 기본증명서(피상속인), 상속인 가족관계증명서, 상속재산 분할협의서 또는 유언장, 주민등록표 등본이 필요합니다. 무주택 특례를 신청할 경우 세대 전원의 무주택 사실을 입증할 수 있는 자료(주민등록표 등본·전산조회 동의서 등)를 함께 제출합니다. 위택스에서 전자신고가 가능하며 부동산 소재지 관할 시군구청 세정과에서도 가능합니다.',
  },
];

export default function InheritanceHouseAcquisitionTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '상속 주택 취득세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '상속 주택 취득세 2026, 무주택 1주택 특례 0.8%',
    description:
      '부모 집 등을 물려받았을 때 취득세 계산법. 기본 세율 2.8%(지방세법 §11), 무주택 1가구 1주택 특례 0.8%(지방세법 §15). 신고 기한 6개월, 다주택 중과 제외, 지방교육세·농특세 처리까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['상속 취득세', '무주택 특례', '지방세법 15조', '2.8%', '0.8%'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '상속 주택 취득세 2026',
    description:
      '상속 주택 취득세 기본 2.8%, 무주택 특례 0.8%, 신고 기한 6개월. 지방세법 15조 기준.',
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
                    { name: '상속 주택 취득세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">상속인·유족 · 8분 읽기 · 2026-08-07</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  상속 주택 취득세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">무주택 1주택 특례 0.8%로 낮추는 조건</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  부모나 배우자가 돌아가시고 살던 집을 물려받게 되면 가장 먼저 부딪히는 세금이 취득세입니다. 상속 주택 취득세는 유상거래와 완전히 다른 규정을 따르며, 무주택 세대에는 특례세율 0.8%가 적용되어 세 부담이 크게 낮아집니다. 이 가이드는 기본 세율 2.8%와 특례 0.8%의 정확한 적용 조건, 신고 기한, 지방교육세·농특세 처리, 증여와의 결정적 차이까지 지방세법 원문을 근거로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">30초 요약, 상속 취득세 핵심 3가지</h2>
                <p>
                  상속 취득세는 무상취득이지만 유상거래·증여와 완전히 다른 별도 세율 체계를 씁니다. 아래 표와 요약을 먼저 확인하세요.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 상속 주택 취득세 기본 세율 요약 (지방세법 §11·§15, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">취득세율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근거 조항</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">상속 주택 기본세율</td>
                        <td className="p-3"><strong>2.8%</strong></td>
                        <td className="p-3">지방세법 §11①제1호</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">무주택 1가구가 1주택 상속</td>
                        <td className="p-3"><strong>0.8%</strong> (특례)</td>
                        <td className="p-3">지방세법 §15①제2호</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">상속 농지</td>
                        <td className="p-3">2.3%</td>
                        <td className="p-3">지방세법 §11①제1호</td>
                      </tr>
                      <tr>
                        <td className="p-3">참고: 증여(무상취득)</td>
                        <td className="p-3">3.5% (조정+다주택+3억이상 시 최대 12%)</td>
                        <td className="p-3">지방세법 §11①제2호</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심 3줄 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 상속 주택 취득세는 기본 2.8%, 무주택 1가구가 1주택을 물려받으면 특례 0.8%
                    <br />
                    · 신고 기한은 상속개시일이 속하는 달의 말일부터 6개월 이내(비거주자 포함 시 9개월)
                    <br />
                    · 상속은 다주택 중과 8%·12% 대상이 아니며, 상속 후 일정 기간 주택 수 계산에서도 제외
                  </p>
                </div>
                <p>
                  다만, 지방교육세와 농어촌특별세는 취득세와 별도로 가산되므로 실제 납부액은 위 세율보다 조금 더 높아집니다. 세부 계산은 위택스(wetax.go.kr) 시뮬레이션이 가장 정확합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상속 주택 취득세율은 얼마인가요, 기본 2.8%의 정체</h2>
                <p>
                  결론부터, 상속으로 주택을 취득하면 원칙적으로 시가표준액의 2.8%가 취득세로 부과됩니다. 근거는 지방세법 §11①제1호 나목입니다. 여기서 시가표준액은 매매가가 아니라 지자체가 고시한 공시가격 등을 말합니다.
                </p>
                <p>
                  많은 분들이 오해하는 부분이 있습니다. 뉴스에서 자주 나오는 "다주택자 취득세 8%, 12%"는 매매 등 유상거래에 적용되는 세율입니다. 상속은 사망이라는 비자발적 사유로 재산이 넘어오는 것이므로, 세법상 무상취득으로 분류되면서도 증여와 구분되는 독자 세율(2.8%)을 적용받습니다. 이는 유가족의 세부담을 배려한 정책적 판단입니다.
                </p>
                <p>
                  또한 상속으로 취득한 것이 농지인 경우에는 세율이 2.3%로 조금 더 낮습니다. 임야, 대지 등은 3.5% 무상취득 세율이 아니라 상속에 해당하는 2.8%(농지 2.3%)가 우선 적용됩니다.
                </p>
                <p>
                  다만, 시가표준액이 그대로 과세표준이 되는 것은 아닙니다. 실제 매매가 없는 상속의 경우 시가표준액이 곧 과세표준으로 작동하는 경우가 많지만, 감정평가 등이 있으면 이를 반영할 수 있습니다. 정확한 과세표준은 관할 시군구 세정과 확인이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">무주택 1가구 특례 0.8%, 조건은 무엇인가요</h2>
                <p>
                  가장 중요한 절세 포인트입니다. 상속개시일 기준으로 상속인의 세대가 완전히 무주택이면서 상속으로 1주택을 취득하는 경우, 취득세는 0.8%까지 낮아집니다. 근거는 지방세법 §15①제2호(취득세율의 특례)입니다. 기본 2.8% 대비 3.5배 낮은 수준이라 실제 납부액에서 큰 차이가 납니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">특례 0.8% 3대 조건</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    1. 상속개시일(피상속인 사망일) 현재, 상속인이 속한 세대 전원이 무주택
                    <br />
                    2. 해당 상속으로 그 세대가 처음 1주택 보유 상태가 됨
                    <br />
                    3. 1가구 판정은 세대별 주민등록표에 함께 등재된 가족 기준
                  </p>
                </div>
                <p>
                  실무에서 자주 발생하는 함정이 있습니다. 예를 들어 부모 사망 시 상속인 본인은 무주택이지만 함께 등재된 배우자나 자녀가 소형 아파트를 하나 가지고 있으면 세대가 무주택이 아니어서 특례가 배제됩니다. 심지어 함께 사는 성인 자녀의 주택도 판단 대상이 됩니다.
                </p>
                <p>
                  또한 세대 분리를 형식적으로만 해두고 실제로는 함께 거주하는 경우, 지자체가 실질과세 원칙에 따라 세대를 합쳐서 판단할 수 있습니다. 이런 이유로 헤럴드경제 보도 사례처럼, 같이 살던 집을 상속받았는데도 무주택 요건이 부인되어 수천만 원대 취득세가 부과되는 일이 실제로 발생합니다.
                </p>
                <p>
                  예외: 공동상속으로 지분만 받은 경우입니다. 실무 해석에 따르면 무주택자 상속인 지분이 과반(50% 초과)이면 해당 주택 전체가 특례 대상이 될 수 있다는 사례가 있지만, 지자체별·상황별로 판단이 다를 수 있어 일률 적용은 어렵습니다. 반드시 관할 시군구 세정과에 사전 유권해석을 받는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 계산 사례, 무주택 vs 유주택 세대의 차이</h2>
                <p>
                  세율 차이가 실제 금액으로는 얼마나 차이가 나는지, 시가표준액 3억 원 주택을 상속받는 경우로 비교해 보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 무주택 세대의 상속 (특례 0.8% 적용)</p>
                  <p className="text-sm text-text-secondary">
                    · 상속 주택 시가표준액: 3억 원 (전용면적 84제곱미터)
                    <br />
                    · 상속인 세대: 배우자와 함께 무주택
                    <br />
                    · 취득세: 3억 원 × 0.8% = <strong>240만 원</strong> (지방세법 §15①제2호)
                    <br />
                    · 지방교육세: 240만 원 × 20% 상당 = <strong>약 48만 원</strong> (지방세법 §151)
                    <br />
                    · 농어촌특별세: 85제곱미터 이하이므로 <strong>비과세</strong>
                    <br />
                    · 합계 납부액: <strong>약 288만 원</strong> (실효세율 약 0.96%)
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 유주택 세대의 상속 (기본 2.8% 적용)</p>
                  <p className="text-sm text-text-secondary">
                    · 상속 주택 시가표준액: 3억 원 (전용면적 84제곱미터)
                    <br />
                    · 상속인 세대: 자녀가 이미 소형 오피스텔 1채 보유
                    <br />
                    · 취득세: 3억 원 × 2.8% = <strong>840만 원</strong> (지방세법 §11①제1호)
                    <br />
                    · 지방교육세와 부가세목이 추가되며, 전용면적·과표에 따라 실효세율은 대략 3% 내외로 형성
                    <br />
                    · 합계 납부액: <strong>약 900만 원대</strong> 예상 (정확한 값은 위택스 계산 확인 필요)
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 시가표준액 8억 원 대형 주택 (전용 100제곱미터, 무주택)</p>
                  <p className="text-sm text-text-secondary">
                    · 취득세: 8억 원 × 0.8% = <strong>640만 원</strong>
                    <br />
                    · 지방교육세: 약 128만 원
                    <br />
                    · 농어촌특별세: 85제곱미터 초과이므로 별도 가산 (통상 취득세의 10% 상당)
                    <br />
                    · 합계 납부액: <strong>약 830만 원 이상</strong> (관할 시군구 계산 확인 필수)
                  </p>
                </div>
                <p>
                  다만, 정확한 지방교육세·농특세 합산 실효율은 전용면적·과세표준·주택 가격 구간에 따라 세부 규정이 달라지므로, 위 금액은 개략 추정입니다. 신고 전 위택스(wetax.go.kr) 시뮬레이션 또는 관할 시군구 세정과에서 확정 금액을 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">언제까지 신고하나요, 상속개시일 기준 6개월</h2>
                <p>
                  결론은 상속개시일(피상속인 사망일)이 속하는 달의 말일부터 6개월 이내입니다(지방세법 §20①). 상속인 중 외국에 주소를 둔 자가 있으면 9개월로 연장됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">신고 기한 산정 예시</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 사망일: 2026년 3월 3일
                    <br />
                    · 기산점: 그달 말일인 2026년 3월 31일
                    <br />
                    · 신고 기한: 그로부터 6개월 후, <strong>2026년 9월 30일</strong>까지
                  </p>
                </div>
                <p>
                  이 기한을 놓치면 상당한 가산세가 붙습니다. 무신고 가산세가 세액의 20%, 납부지연 가산세는 일할로 계속 쌓입니다. 특히 상속 취득세는 상속세 신고(사망일 속한 달의 말일부터 6개월 이내, 상증법 §67)와 기한이 유사하므로 두 신고를 한 번에 정리하는 것이 편합니다.
                </p>
                <p>
                  절차는 다음과 같습니다. 첫째, 상속재산 분할협의 또는 유언 확인을 통해 취득자를 확정합니다. 둘째, 취득세 신고서·사망진단서·가족관계증명서·분할협의서·주민등록표 등본을 준비합니다. 셋째, 위택스에서 전자신고하거나 부동산 소재지 관할 시군구청 세정과에 방문 신고합니다. 넷째, 신고 후 산출된 세액을 지정 계좌 또는 위택스로 납부합니다.
                </p>
                <p>
                  다만, 상속등기는 취득세 신고와 별개 절차입니다. 취득세를 먼저 신고·납부한 뒤 등기 시 취득세 영수증을 첨부해야 하며, 상속등기 자체의 기한 제한은 없으나 이해관계자 분쟁 방지를 위해 조속한 처리가 권장됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상속 주택도 다주택 중과 대상인가요, 결론은 아닙니다</h2>
                <p>
                  아닙니다. 상속 주택은 다주택 중과세율 8%·12%가 적용되지 않습니다. 이 중과세율은 지방세법상 유상거래(매매)에 한정되며, 무상취득인 상속에는 별도 규정(§11①제1호, §15①제2호)이 우선 적용되기 때문입니다.
                </p>
                <p>
                  더 나아가 상속인이 이미 다른 주택을 보유하고 있어 상속 후 다주택 상태가 되더라도, 상속 주택 자체의 취득세는 기본 2.8%만 부담합니다(무주택 특례는 이 경우 배제되므로 0.8%는 아님). 이는 매수를 통한 다주택 취득과 결정적으로 다른 지점입니다.
                </p>
                <p>
                  또 하나 중요한 규정이 있습니다. 상속으로 취득한 주택은 상속개시일부터 일정 기간 동안 취득세 중과 판정 시 주택 수 계산에서 제외됩니다. 즉 상속으로 2주택이 된 뒤 다른 주택을 추가로 매입해도, 유예 기간 내라면 상속 주택은 주택 수에서 빠져 3주택 중과가 아닌 2주택 기준으로 판정될 수 있습니다.
                </p>
                <p>
                  다만, 정확한 유예 기간(통상 5년 이내로 알려짐)과 세부 요건은 지방세법 시행령·시행규칙에 따라 상황별로 다르므로 반드시 관할 시군구 세정과 또는 세무사 확인이 필요합니다. 5년이 지나면 상속 주택도 정상 주택 수로 편입되어 이후 매수 시 중과 대상이 될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">지방교육세·농어촌특별세도 함께 붙나요</h2>
                <p>
                  네, 취득세 본세 외에 지방교육세는 원칙적으로 함께 부과됩니다. 지방세법 §151이 근거로, 취득세의 일정 비율이 지방교육세로 가산됩니다. 특례세율 0.8%가 적용되면 지방교육세는 대략 0.16% 수준(취득세의 20% 상당)이 더해져 합산 실효세율이 약 0.96%가 됩니다.
                </p>
                <p>
                  기본세율 2.8%가 적용되는 경우에는 지방교육세와 함께 실효세율이 3% 내외로 형성됩니다. 다만 정확한 지방교육세율은 취득세 세율 구간별로 세부 규정이 다르므로, 위 수치는 대략 추정치임을 유의하세요.
                </p>
                <p>
                  농어촌특별세는 전용면적이 결정적입니다. 국민주택 규모(전용면적 85제곱미터 이하)는 농어촌특별세가 비과세되지만, 이를 초과하는 대형 주택은 취득세의 10% 상당이 추가로 부과됩니다. 즉 무주택 특례 0.8% 적용 대상이라도, 전용 100제곱미터 아파트라면 농특세가 별도로 더해져 최종 부담이 조금 더 커집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">부가세목 3종 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 지방교육세: 거의 모든 상속 취득세 대상 (지방세법 §151)
                    <br />
                    · 농어촌특별세: 전용 85제곱미터 초과 시만 (85 이하는 비과세)
                    <br />
                    · 인지세: 취득세와 별도로 등기 시 소액 부과
                  </p>
                </div>
                <p>
                  다만, 각 부가세목의 정확한 실효율은 주택 가격·전용면적·과세표준에 따라 달라지므로, 최종 납부액은 위택스 계산기 또는 관할 시군구 세정과 문의로 확정하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">증여로 받은 주택과 무엇이 다른가요, 결정적 차이 3가지</h2>
                <p>
                  상속과 증여는 모두 무상취득이라 헷갈리기 쉽지만, 취득세 관점에서는 완전히 다른 규정을 따릅니다. 요약하면 상속이 압도적으로 세부담이 낮습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 상속 취득세 vs 증여 취득세 비교 (2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비교 항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상속 취득세</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">증여 취득세</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">기본 세율</td>
                        <td className="p-3"><strong>2.8%</strong></td>
                        <td className="p-3">3.5%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">특례 세율</td>
                        <td className="p-3">무주택 1주택 <strong>0.8%</strong></td>
                        <td className="p-3">해당 없음</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">중과세율</td>
                        <td className="p-3">해당 없음</td>
                        <td className="p-3">최대 <strong>12%</strong> (다주택자·조정지역·3억 이상)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">신고 기한</td>
                        <td className="p-3">사망월 말일부터 <strong>6개월</strong></td>
                        <td className="p-3">증여일이 속한 달의 말일부터 3개월</td>
                      </tr>
                      <tr>
                        <td className="p-3">근거 조항</td>
                        <td className="p-3">지방세법 §11·§15·§20</td>
                        <td className="p-3">지방세법 §11·§13의2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  결정적 차이 3가지는 다음과 같습니다. 첫째, 상속은 무주택 특례가 있어 0.8%까지 떨어지지만 증여에는 특례가 없습니다. 둘째, 상속은 중과 대상이 아니지만 증여는 다주택자·조정지역·시가표준액 3억 원 이상 3가지 요건 충족 시 12%까지 오릅니다. 셋째, 신고 기한도 상속은 6개월, 증여는 3개월로 다릅니다.
                </p>
                <p>
                  다만, 이 차이는 취득세만의 이야기입니다. 상속세와 증여세(국세)는 별도 규정과 공제 체계가 있으므로, 총 세부담 비교는 취득세뿐 아니라 국세까지 함께 계산해야 합니다. 자세한 비교는 아래 관련 가이드를 참고하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신고 후 놓치기 쉬운 3가지 후속 절차</h2>
                <p>
                  취득세 신고·납부만으로 끝이 아닙니다. 상속으로 주택을 받은 뒤에는 등기·양도세·재산세 관점에서 추가로 챙겨야 할 사항이 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>상속등기와 취득세 영수증</strong>: 취득세를 먼저 납부한 뒤 영수증을 첨부해 등기소에 소유권이전등기(상속) 신청. 등기 완료까지 통상 1~2주 소요.
                  </li>
                  <li>
                    <strong>재산세 과세대상 변경</strong>: 상속등기 완료 후 다음 6월 1일 기준으로 새 소유자에게 재산세가 부과됨. 첫해 재산세 고지서를 반드시 확인.
                  </li>
                  <li>
                    <strong>추후 매도 시 양도소득세 취득가액</strong>: 상속받은 주택을 나중에 매도할 때 취득가액은 상속개시일 시가로 계산됨(상속세 신고가액 활용 가능). 5년 이내 매도 시 1세대 1주택 비과세 특례 여부도 별도 확인.
                  </li>
                </ul>
                <p>
                  또한 상속 주택 자체의 양도세 특례(5년 이내 매도 시 비과세 판정에서 상속 주택 제외)와 관련해서는 별도 규정이 있으므로, 매도 계획이 있다면 미리 확인하는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/inheritance-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">국세인 상속세의 세율·공제·신고 절차를 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/legal-inheritance-order-share-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">법정 상속 순위와 상속분</div>
                    <p className="mt-1 text-sm text-text-secondary">배우자·자녀의 상속 지분과 대습상속 규정을 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/inherited-house-capital-gains-exemption-5-year-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속 주택 5년 양도세 특례</div>
                    <p className="mt-1 text-sm text-text-secondary">상속 후 매도 시 1세대 1주택 비과세 판정 예외 규정.</p>
                  </Link>
                  <Link
                    href="/guide/acquisition-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">일반 매매 취득세의 가격 구간별 세율과 계산 방식.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-vs-gift-tax-comparison-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속 vs 증여 어느 쪽이 유리한가</div>
                    <p className="mt-1 text-sm text-text-secondary">국세·지방세 총부담 비교로 최적 승계 전략 판단.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·증여세 완전 정리 허브.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 상속 주택 취득세율(2.8% 또는 특례 0.8%), 무주택 판정, 지방교육세·농어촌특별세 합산 실효율, 상속 후 주택 수 특례 유예 기간, 공동상속 지분별 세율 적용 여부는 개별 상황에 따라 달라질 수 있습니다. 신고 전 반드시 위택스(wetax.go.kr) 또는 관할 시군구청 세정과, 세무사 상담을 통해 최종 확인하세요. 본 콘텐츠는 2026-08-07을 기준으로 작성되었으며, 지방세법 개정 시 즉시 업데이트됩니다. 정확한 근거는 <strong>지방세법 §11①제1호(상속 무상취득 세율), §15①제2호(무주택 1주택 특례), §20①(신고·납부 기한), §151(지방교육세)</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(지방세법)</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스(지방세 종합정보)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스(상속세 안내)</a>.
                </p>
              </section>

              <ShareButtons
                title="상속 주택 취득세 2026 가이드"
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
