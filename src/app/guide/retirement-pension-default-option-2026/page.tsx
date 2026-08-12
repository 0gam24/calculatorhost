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

const URL = 'https://calculatorhost.com/guide/retirement-pension-default-option-2026/';
const DATE_PUBLISHED = '2026-08-13';
const DATE_MODIFIED = '2026-08-13';

export const metadata: Metadata = {
  title: '퇴직연금 디폴트옵션 2026, 안 정하면 생기는 일',
  description:
    'DC형·IRP 퇴직연금은 운용 지시를 안 하면 방치돼 수익이 0에 가깝습니다. 사전지정운용제도(디폴트옵션)의 상품 3유형, 지정 방법, 직접운용과의 비교를 근로자퇴직급여보장법 §21의2 기준으로 정리했습니다.',
  keywords: [
    '퇴직연금 디폴트옵션',
    '사전지정운용제도',
    'DC형 퇴직연금',
    'IRP 운용',
    '디폴트옵션 상품',
    '퇴직연금 방치',
    '근로자퇴직급여보장법 21조의2',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '퇴직연금 디폴트옵션 2026, 안 정하면 생기는 일' }],
    title: '퇴직연금 디폴트옵션 2026, 사전지정운용제도 완전 정리',
    description: 'DC·IRP 운용 지시를 안 하면 자동 운용되는 디폴트옵션. 상품 3유형, 위험등급, 직접운용 비교.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '퇴직연금 디폴트옵션 2026, 사전지정운용제도 정리',
    description: 'DC·IRP 운용 지시 없으면 자동 운용. 상품 3유형·위험등급·직접운용 비교. 근퇴법 §21의2.',
  },
};

const FAQ_ITEMS = [
  {
    question: '디폴트옵션(사전지정운용제도)이 정확히 무엇인가요?',
    answer:
      '디폴트옵션은 퇴직연금 가입자가 별도의 운용 지시를 하지 않을 때, 미리 정해 둔 상품으로 적립금이 자동 운용되도록 하는 제도입니다(근로자퇴직급여보장법 §21의2). 정식 명칭은 사전지정운용제도이며, 2022년 도입돼 2023년 7월 12일부터 시행됐습니다. 운용 무관심으로 돈이 방치되는 것을 막기 위한 장치입니다.',
  },
  {
    question: '누구에게 적용되나요?',
    answer:
      '가입자가 직접 운용을 지시하는 DC형(확정기여형)과 IRP(개인형 퇴직연금)에 적용됩니다. 반면 회사가 운용을 책임지고 정해진 금액을 지급하는 DB형(확정급여형)은 대상이 아닙니다. 즉 내 계좌를 내가 굴리는 유형이라면 디폴트옵션을 지정해 두는 것이 좋습니다.',
  },
  {
    question: '디폴트옵션을 지정하지 않으면 어떻게 되나요?',
    answer:
      '운용 지시가 없는 적립금은 대기성 자금으로 남아 사실상 이자가 거의 붙지 않는 상태로 방치될 수 있습니다. 디폴트옵션을 미리 지정해 두면, 만기가 도래하거나 새로 입금된 돈에 대해 운용 지시가 없을 때 사전에 고른 상품으로 자동 운용됩니다. 장기 방치는 물가상승률에도 못 미치는 실질 손실로 이어질 수 있습니다.',
  },
  {
    question: '디폴트옵션 상품에는 어떤 종류가 있나요?',
    answer:
      '크게 세 가지입니다. 원리금보장상품(예금·GIC 등), 법령이 허용하는 펀드상품(TDF, 밸런스펀드 등), 그리고 이들을 조합한 포트폴리오형 상품입니다(근로자퇴직급여보장법 §21의2). 각 상품은 고용노동부 심의를 거쳐 승인된 것만 제공되며, 가입자는 자신의 위험 성향에 맞게 하나를 선택합니다.',
  },
  {
    question: '위험등급은 어떻게 나뉘나요?',
    answer:
      '승인 상품은 대체로 초저위험, 저위험, 중위험, 고위험 등급으로 구분됩니다. 초저위험은 원리금보장 중심이라 안정적이지만 기대수익이 낮고, 고위험은 주식형 비중이 높아 변동성이 큽니다. 은퇴까지 기간이 길수록 위험을 감내하고, 은퇴가 가까우면 안정형으로 옮기는 것이 일반적인 접근입니다.',
  },
  {
    question: '디폴트옵션과 직접운용 중 무엇이 유리한가요?',
    answer:
      '직접 상품을 고르고 관리할 자신이 있으면 직접운용이 더 세밀할 수 있습니다. 다만 대다수는 관리에 소홀해 자금을 방치하기 쉬우므로, 방치를 막는 안전망으로 디폴트옵션을 지정해 두는 것이 유리합니다. 디폴트옵션을 지정해도 언제든 직접 운용 지시를 우선 적용할 수 있어 둘은 배타적이지 않습니다.',
  },
  {
    question: '디폴트옵션은 어떻게 지정하나요?',
    answer:
      '퇴직연금을 가입한 금융회사의 앱이나 홈페이지, 영업점에서 승인된 상품 목록을 보고 하나를 선택해 지정하면 됩니다. 상품별 위험등급, 과거 수익률, 수수료를 비교한 뒤 자신의 은퇴 시점과 성향에 맞게 고르는 것이 좋습니다. 지정 후에도 변경이 가능합니다.',
  },
  {
    question: '디폴트옵션으로 운용되면 세금이 바로 나오나요?',
    answer:
      '아닙니다. 퇴직연금 계좌 안에서 상품이 바뀌거나 수익이 나도 그 시점에 세금을 매기지 않고 과세가 미뤄집니다. 실제 세금은 나중에 연금이나 일시금으로 수령할 때 연금소득세 또는 퇴직소득세로 정산됩니다. 계좌 내 운용 단계에서는 과세이연 효과가 유지됩니다.',
  },
  {
    question: '한번 지정하면 바꿀 수 없나요?',
    answer:
      '언제든 바꿀 수 있습니다. 시장 상황이나 은퇴 시점 변화에 따라 다른 위험등급의 상품으로 변경하거나, 직접 운용 지시로 전환할 수 있습니다. 은퇴가 가까워질수록 안정형 비중을 높이는 식으로 주기적으로 점검하는 것이 바람직합니다.',
  },
];

export default function RetirementPensionDefaultOption2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '퇴직연금 디폴트옵션 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '퇴직연금 디폴트옵션 2026, 사전지정운용제도 완전 정리',
    description:
      'DC·IRP 운용 지시가 없을 때 자동 운용되는 디폴트옵션(사전지정운용제도). 상품 3유형, 위험등급, 직접운용 비교, 과세이연을 근로자퇴직급여보장법 §21의2 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['퇴직연금', '디폴트옵션', '사전지정운용제도', 'DC형', 'IRP'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '퇴직연금 디폴트옵션 2026',
    description:
      'DC·IRP 퇴직연금의 사전지정운용제도(디폴트옵션) 상품 유형, 위험등급, 지정 방법과 직접운용 비교.',
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
                    { name: '퇴직연금 디폴트옵션 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인·투자자 · 8분 읽기 · 2026-08-13</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  퇴직연금 디폴트옵션 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 안 정하면 생기는 일</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  DC형이나 IRP 퇴직연금은 내가 직접 굴려야 하는 계좌인데, 많은 사람이 운용 지시를 하지 않아 돈이 그냥 잠자고 있습니다. 이 가이드는 그 방치를 막는 디폴트옵션(사전지정운용제도)이 무엇인지, 상품 유형과 위험등급은 어떻게 고르는지, 직접운용과 비교해 언제 유리한지를 정리합니다. 대상 독자는 퇴직연금을 굴려야 하는데 어떻게 손대야 할지 막막한 직장인과 투자자입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">디폴트옵션이란 무엇인가요?</h2>
                <p>
                  디폴트옵션은 가입자가 운용 지시를 하지 않을 때 미리 정해 둔 상품으로 적립금이 자동 운용되도록 하는 제도입니다. 정식 명칭은 사전지정운용제도이며, 근로자퇴직급여보장법 §21의2에 근거합니다. 2022년 법이 도입돼 1년 유예를 거쳐 2023년 7월 12일부터 본격 시행됐습니다.
                </p>
                <p>
                  도입 배경은 단순합니다. DC·IRP 가입자 상당수가 운용에 무관심해 적립금이 대기성 자금으로 방치되고, 그 결과 수익률이 사실상 0에 가까웠기 때문입니다. 디폴트옵션은 이런 방치를 막아 최소한의 운용이 굴러가도록 하는 안전망입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 운용 지시가 없을 때 자동 운용되는 사전지정 상품(근퇴법 §21의2).
                    <br />
                    대상: DC형·IRP(DB형 제외).
                    <br />
                    상품: 원리금보장형 / 펀드형(TDF 등) / 포트폴리오형.
                    <br />
                    핵심: 지정 안 하면 돈이 방치돼 실질 손실 위험.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">누구에게 적용되나요? DB형은 왜 제외인가요?</h2>
                <p>
                  가입자가 직접 운용을 지시하는 DC형과 IRP에 적용됩니다. DB형이 제외되는 이유는, DB형은 회사가 운용 책임을 지고 근로자에게는 정해진 급여를 지급하기 때문입니다. 즉 근로자 개인의 운용 지시라는 개념 자체가 없어 디폴트옵션이 필요 없습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 퇴직연금 유형별 디폴트옵션 적용 (근로자퇴직급여보장법)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">운용 주체</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">디폴트옵션</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">DB형(확정급여)</td>
                        <td className="p-3">회사</td>
                        <td className="p-3">적용 안 됨</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">DC형(확정기여)</td>
                        <td className="p-3">근로자 본인</td>
                        <td className="p-3">적용</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">IRP(개인형)</td>
                        <td className="p-3">가입자 본인</td>
                        <td className="p-3">적용</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 같은 직장인이라도 회사가 어떤 제도를 도입했는지에 따라 유형이 다릅니다. 내 퇴직연금이 DC인지 DB인지 모른다면 가입 금융회사나 회사 인사팀에 먼저 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">지정하지 않으면 무슨 일이 생기나요?</h2>
                <p>
                  운용 지시가 없는 돈은 대기성 자금으로 남아 이자가 거의 붙지 않습니다. 특히 예금 만기가 지난 뒤 재예치 지시를 하지 않으면, 그 사이 자금이 놀면서 기대수익을 놓칩니다. 물가상승을 감안하면 사실상 실질 가치가 줄어드는 셈입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 적립금 5,000만원을 방치했을 때(가정)</p>
                  <p className="text-sm text-text-secondary">
                    · 상황: 예금 만기 후 재운용 지시 없이 1년 방치, 대기성 이율 0.1% 가정
                    <br />
                    · 방치 시 1년 수익: 약 5만원
                    <br />
                    · 디폴트옵션(연 3% 가정) 운용 시: 약 150만원
                    <br />
                    · 차이: 약 145만원(같은 원금, 같은 기간)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 수익률은 시장에 따라 달라지지만, 방치와 자동 운용의 격차는 결코 작지 않습니다. 위 수치는 이해를 돕기 위한 가정 예시입니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 디폴트옵션도 원금 손실이 없는 상품만 있는 것은 아닙니다. 펀드형·포트폴리오형은 시장 상황에 따라 원금이 줄 수 있으므로, 위험등급을 이해하고 고르는 것이 중요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상품 유형과 위험등급은 어떻게 고르나요?</h2>
                <p>
                  승인 상품은 원리금보장형, 펀드형, 포트폴리오형 세 갈래이고, 각각 위험등급이 매겨져 있습니다. 은퇴까지 남은 기간과 손실 감내 성향에 맞춰 고르는 것이 원칙입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 디폴트옵션 상품 유형과 성향 (근로자퇴직급여보장법 §21의2)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">특징</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">적합한 사람</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">원리금보장형</td>
                        <td className="p-3">예금·GIC 등 원리금보장형</td>
                        <td className="p-3">손실을 원치 않는 안정형</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">펀드형(TDF 등)</td>
                        <td className="p-3">은퇴시점에 맞춰 자동 배분</td>
                        <td className="p-3">장기 운용, 중간 위험 수용</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">포트폴리오형</td>
                        <td className="p-3">여러 상품을 묶어 분산</td>
                        <td className="p-3">분산과 성장을 함께 원하는 사람</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  일반적으로 은퇴까지 20년 이상 남았다면 성장형 비중을 높이고, 은퇴가 5년 이내로 가까워지면 안정형으로 옮기는 접근이 무난합니다. 다만 이는 일반적 원칙일 뿐 정답은 아니며, 개인의 자산 상황과 성향에 따라 달라집니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">디폴트옵션 vs 직접운용, 어떻게 정할까요?</h2>
                <p>
                  둘은 배타적이지 않습니다. 디폴트옵션을 지정해 두더라도 직접 운용 지시를 하면 그것이 우선 적용됩니다. 즉 디폴트옵션은 내가 신경 쓰지 못할 때를 대비한 안전망이고, 관리에 자신 있는 사람은 직접운용을 병행하면 됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>디폴트옵션이 나은 경우:</strong> 상품을 자주 들여다볼 시간이 없거나, 방치로 자금이 놀 위험이 큰 경우.
                  </li>
                  <li>
                    <strong>직접운용이 나은 경우:</strong> 원하는 상품과 배분을 스스로 관리할 수 있고 정기적으로 점검하는 경우.
                  </li>
                  <li>
                    <strong>병행:</strong> 기본은 직접운용하되, 만기 자금이 방치되지 않도록 디폴트옵션을 함께 지정해 두는 방식.
                  </li>
                </ul>
                <p className="mt-4">
                  예외: 디폴트옵션에 편입되는 펀드·포트폴리오 상품은 원금 손실 가능성이 있으므로, 안정성만 원한다면 원리금보장형을 고르는 것이 맞습니다. 자신의 목표와 성향을 먼저 정한 뒤 상품을 선택하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/severance-vs-pension-dc-db/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">DC vs DB 퇴직연금 비교</div>
                    <p className="mt-1 text-sm text-text-secondary">두 제도의 구조와 유불리를 먼저 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/pension-savings-irp-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연금저축·IRP 세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">최대 900만원 납입으로 세금 돌려받기.</p>
                  </Link>
                  <Link
                    href="/guide/irp-early-withdrawal-conditions-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">IRP 중도인출 조건</div>
                    <p className="mt-1 text-sm text-text-secondary">해지·인출 시 세금과 예외 사유.</p>
                  </Link>
                  <Link
                    href="/guide/retirement-income-tax-deferral-irp-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">퇴직소득세 이연(IRP)</div>
                    <p className="mt-1 text-sm text-text-secondary">IRP로 받으면 세금이 미뤄지는 원리.</p>
                  </Link>
                  <Link
                    href="/guide/etf-tax-domestic-overseas-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국내·해외 ETF 세금</div>
                    <p className="mt-1 text-sm text-text-secondary">연금계좌 ETF 운용 전 세금 구조 확인.</p>
                  </Link>
                  <Link
                    href="/calculator/retirement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">은퇴자금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">필요 은퇴자금을 시뮬레이션해보세요.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 특정 상품의 매수·가입을 권유하거나 성과를 약속하지 않습니다. 본문의 수익률 수치는 이해를 돕기 위한 가정 예시로 실제 수익과 다르며, 펀드·포트폴리오형은 원금 손실이 발생할 수 있습니다. 상품 선택은 위험등급·수수료·과거 수익률을 직접 확인하고 본인 책임하에 결정하세요. 본 콘텐츠는 2026-08-13을 기준으로 작성되었으며, 관련 법령 변경 시 업데이트됩니다. 인용 법조항: 근로자퇴직급여보장법 §21의2(사전지정운용제도), §21의3·§21의4(운용방법의 승인·지정 등). AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>,{' '}
                  <a href="https://www.fss.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">금융감독원</a>.
                </p>
              </section>

              <ShareButtons
                title="퇴직연금 디폴트옵션 2026 가이드"
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