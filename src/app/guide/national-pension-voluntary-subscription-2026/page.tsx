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

// 수익 레버 [revenue-lever: indexing+traffic]: 신규 색인 페이지 추가, 롱테일 트래픽 유입
const URL = 'https://calculatorhost.com/guide/national-pension-voluntary-subscription-2026/';
const DATE_PUBLISHED = '2026-07-16';
const DATE_MODIFIED = '2026-07-16';

export const metadata: Metadata = {
  title: '국민연금 임의가입 2026, 전업주부 노후연금 만드는 법',
  description:
    '소득이 없어도 국민연금에 스스로 가입할 수 있습니다. 국민연금법 §10 임의가입과 §13 임의계속가입의 대상·보험료·최소 가입기간 10년 요건을 전업주부 사례로 정리합니다.',
  keywords: [
    '국민연금 임의가입',
    '전업주부 국민연금',
    '임의계속가입',
    '국민연금 최소 가입기간',
    '노령연금 수급요건',
    '국민연금법 10조',
    '주부 노후준비',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '국민연금 임의가입 2026, 전업주부 노후연금 만드는 법' }],
    title: '국민연금 임의가입 2026, 소득 없어도 노후연금 만드는 법',
    description: '전업주부·학생도 국민연금법 §10 임의가입으로 노령연금 수급권을 만들 수 있습니다. 대상·보험료·10년 요건 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '국민연금 임의가입 2026, 전업주부 노후연금 만드는 법',
    description: '소득이 없어도 국민연금에 스스로 가입해 10년을 채우면 평생 노령연금을 받습니다. 국민연금법 §10.',
  },
};

const FAQ_ITEMS = [
  {
    question: '전업주부도 국민연금에 가입할 수 있나요?',
    answer:
      '가입할 수 있습니다. 소득이 없어 의무가입 대상이 아닌 전업주부는 국민연금법 §10에 따라 임의가입자로 스스로 신청할 수 있습니다. 배우자가 직장가입자여도 본인 명의로 별도 가입이 가능하며, 가입 후 납부한 기간은 온전히 본인의 노후연금으로 쌓입니다.',
  },
  {
    question: '임의가입과 임의계속가입은 무엇이 다른가요?',
    answer:
      '가입 시점이 다릅니다. 임의가입(§10)은 18세 이상 60세 미만이면서 소득이 없는 사람이 스스로 가입하는 것이고, 임의계속가입(§13)은 만 60세가 되었지만 가입기간이 부족하거나 연금을 더 늘리고 싶어 65세까지 납부를 이어가는 제도입니다. 둘 다 본인이 보험료 전액을 부담합니다.',
  },
  {
    question: '국민연금을 받으려면 최소 몇 년을 내야 하나요?',
    answer:
      '최소 10년(120개월)을 납부해야 노령연금을 받습니다. 이 기간을 못 채우면 노령연금 대신 그동안 낸 보험료에 이자를 더한 반환일시금만 받게 됩니다. 60세까지 10년이 안 되면 임의계속가입으로 부족분을 채워 수급권을 확보할 수 있습니다.',
  },
  {
    question: '임의가입 보험료는 얼마인가요?',
    answer:
      '본인이 정한 기준소득월액에 연금보험료율을 곱한 금액입니다. 2026년 하반기 요율은 9.5%로, 기준소득월액 100만원을 선택하면 월 9.5만원입니다. 다만 임의가입자는 국민연금공단이 고시한 최저 기준소득월액 이상으로만 선택할 수 있으므로, 정확한 최저 보험료는 공단에서 확인해야 합니다.',
  },
  {
    question: '보험료율이 오른다는데 임의가입자도 오르나요?',
    answer:
      '오릅니다. 국민연금 요율은 2026년 개혁에 따라 종전 9.0%에서 인상되어 2026년 현재 9.5%가 적용됩니다(국민연금법 §88). 임의가입자는 사업주 부담분이 없어 인상된 요율 전액을 본인이 부담하므로, 인상 시점에 보험료도 함께 오릅니다. 정확한 적용 요율은 국민연금공단 고시로 확인하세요.',
  },
  {
    question: '중간에 소득이 생기면 임의가입은 어떻게 되나요?',
    answer:
      '직장에 취업하거나 사업소득이 생기면 임의가입 자격이 사라지고 사업장가입자 또는 지역가입자로 자동 전환됩니다. 이 경우 그동안 임의가입으로 쌓은 기간은 그대로 유지되며, 이후 의무가입 기간과 합산되어 노후연금 산정에 반영됩니다.',
  },
  {
    question: '임의가입을 중간에 그만둘 수 있나요?',
    answer:
      '언제든 탈퇴할 수 있습니다. 다만 탈퇴해도 낸 보험료는 즉시 돌려받지 못하고, 나중에 수급 요건을 채우면 연금으로, 못 채우면 60세 이후 반환일시금으로 받습니다. 형편이 어려우면 탈퇴 대신 납부예외를 신청해 자격을 유지하는 편이 유리할 수 있습니다.',
  },
  {
    question: '임의가입이 노후에 정말 이득인가요?',
    answer:
      '가입기간이 길수록 유리한 구조입니다. 국민연금은 낸 돈뿐 아니라 전체 가입자 평균소득(A값)이 함께 반영돼 저소득 가입자에게 상대적으로 유리하게 설계돼 있습니다. 다만 개인별 수익은 가입기간·기준소득·수령 시점에 따라 달라지므로, 국민연금공단 예상연금 조회로 본인 사례를 확인하는 것이 정확합니다.',
  },
];

export default function NationalPensionVoluntarySubscription2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '국민연금 임의가입 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '국민연금 임의가입 2026, 소득 없어도 노후연금 만드는 법',
    description:
      '소득이 없는 전업주부·학생도 국민연금법 §10 임의가입으로 노령연금 수급권을 만들 수 있습니다. 임의가입과 임의계속가입의 대상, 보험료, 최소 가입기간 10년 요건을 사례로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['국민연금', '임의가입', '임의계속가입', '전업주부', '노령연금'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '국민연금 임의가입 2026',
    description:
      '소득이 없어도 국민연금에 스스로 가입하는 임의가입·임의계속가입 제도의 대상과 보험료, 10년 수급요건 정리.',
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
                    { name: '국민연금 임의가입 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">전업주부·노후준비 · 8분 읽기 · 2026-07-16</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  국민연금 임의가입 2026
                  <br />
                  <span className="text-2xl text-text-secondary">소득 없어도 노후연금 만드는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  국민연금은 직장인이나 자영업자만 가입하는 제도가 아닙니다. 소득이 없는 전업주부, 학생, 조기 은퇴자도 스스로 신청하면 가입할 수 있고, 10년만 채우면 평생 노령연금을 받습니다. 이 가이드는 소득이 없어도 국민연금에 가입하는 임의가입과, 60세 이후 부족한 기간을 채우는 임의계속가입의 대상·보험료·요건을 실제 사례로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-national-pension-voluntary-subscription-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">임의가입이란 무엇인가</h2>
                <p>
                  임의가입은 의무가입 대상이 아닌 사람이 스스로 국민연금에 가입하는 제도입니다(국민연금법 §10). 18세 이상 60세 미만 국내 거주자 중 사업장가입자도 지역가입자도 아닌 사람, 즉 소득이 없는 전업주부나 학생이 대표적인 대상입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-2 text-text-secondary">
                    임의가입이란, 소득이 없어 국민연금 의무가입 대상이 아닌 사람이 본인의 노후연금을 위해 자발적으로 가입하는 제도(국민연금법 §10)입니다.
                    <br />
                    핵심: 대상은 18세 이상 60세 미만 소득 없는 국내 거주자, 보험료는 전액 본인 부담.
                  </p>
                </div>
                <p className="mt-4">
                  많은 전업주부가 "배우자가 직장에서 국민연금을 내니까 나는 안 내도 된다"고 생각합니다. 그러나 국민연금은 개인별 계좌이므로, 배우자의 가입과 무관하게 본인이 가입하지 않으면 본인 명의의 노령연금은 생기지 않습니다.
                </p>
                <p className="mt-4">
                  다만 임의가입은 의무가 아니라 선택입니다. 가계 형편이 어렵다면 무리해서 가입하기보다, 최저 보험료로 시작해 여유가 생길 때 기준소득월액을 올리는 방식이 현실적입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">임의가입과 임의계속가입, 무엇이 다른가</h2>
                <p>
                  두 제도는 가입하는 시점과 목적이 다릅니다. 임의가입(§10)은 60세 이전에 소득이 없는 사람이 새로 가입하는 것이고, 임의계속가입(§13)은 60세가 넘어 의무가입이 끝난 뒤에도 납부를 이어가는 것입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 임의가입과 임의계속가입 비교 (국민연금법 §10·§13)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">임의가입 (§10)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">임의계속가입 (§13)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">가입 연령</td>
                        <td className="p-3">18세 이상 60세 미만</td>
                        <td className="p-3">60세 이상 65세 미만</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">주 대상</td>
                        <td className="p-3">전업주부·학생 등 소득 없는 자</td>
                        <td className="p-3">60세에 10년 미충족 또는 연금 증액 희망자</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">목적</td>
                        <td className="p-3">수급권 신규 확보</td>
                        <td className="p-3">부족한 가입기간 보충·연금액 증대</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">보험료 부담</td>
                        <td className="p-3">전액 본인</td>
                        <td className="p-3">전액 본인</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 두 제도 모두 이미 노령연금을 받고 있는 사람은 신청할 수 없습니다. 임의계속가입은 늦어도 65세까지만 가능하므로, 60세에 가입기간이 부족하다면 미루지 말고 신청 여부를 판단해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">보험료는 어떻게 정해지나</h2>
                <p>
                  임의가입 보험료는 본인이 선택한 기준소득월액에 연금보험료율을 곱해 정합니다. 2026년 연금개혁으로 요율이 종전 9.0%에서 인상되어 2026년 현재 9.5%가 적용됩니다(국민연금법 §88). 임의가입자는 사업주 부담이 없어 이 요율 전액을 본인이 냅니다. 인상 시행 시점의 정확한 적용 요율은 국민연금공단 고시로 확인하세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 기준소득월액 100만원 선택 (2026년 하반기)</p>
                  <p className="text-sm text-text-secondary">
                    · 기준소득월액: 100만원
                    <br />
                    · 요율: 9.5% (2026년 7월~)
                    <br />
                    · 월 보험료 = 100만원 × 9.5% = <strong>9만 5천원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 기준소득월액 200만원 선택 (2026년 하반기)</p>
                  <p className="text-sm text-text-secondary">
                    · 기준소득월액: 200만원
                    <br />
                    · 요율: 9.5%
                    <br />
                    · 월 보험료 = 200만원 × 9.5% = <strong>19만원</strong>
                  </p>
                </div>
                <p className="mt-4">
                  다만 임의가입자는 아무 금액이나 고를 수 없습니다. 국민연금공단이 정한 최저 기준소득월액 이상으로만 선택할 수 있으며, 이 하한액은 매년 고시로 바뀝니다. 최저 보험료의 정확한 금액은 국민연금공단(1355) 또는 홈페이지에서 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">60세에 10년이 안 되면 어떻게 하나</h2>
                <p>
                  임의계속가입으로 부족한 기간을 채우면 됩니다. 노령연금은 최소 가입기간 10년(120개월)을 채워야 나오는데, 60세에 이를 못 채우면 반환일시금만 받고 끝납니다. 임의계속가입은 이 상황을 구제하는 제도입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 3. 60세에 가입기간 8년(96개월)인 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 현재 가입기간: 96개월 (수급요건 120개월 미달)
                    <br />
                    · 부족분: 120 − 96 = <strong>24개월</strong>
                    <br />
                    · 임의계속가입으로 24개월(만 62세까지) 추가 납부
                    <br />
                    · 결과: 120개월 충족 → <strong>노령연금 수급권 확보</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 2년만 더 내면 반환일시금 대신 평생 연금으로 전환됩니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 임의계속가입도 65세를 넘겨서는 할 수 없습니다. 60세 시점에 가입기간이 크게 부족하면(예: 5년 미만) 65세까지 채우기 어려울 수 있으므로, 이 경우 반환일시금 수령과 계속 납부의 실익을 공단 상담으로 비교하는 것이 좋습니다.
                </p>
              </section>

              <AdSlot slot="guide-national-pension-voluntary-subscription-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">임의가입은 어떻게 신청하나</h2>
                <p>
                  신청은 국민연금공단을 통해 온라인·전화·방문으로 할 수 있습니다. 소득 증빙이 필요 없고, 본인 확인만 되면 접수 후 다음 달부터 보험료가 부과됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>1단계 자격 확인:</strong> 18세 이상 60세 미만이면서 현재 직장·지역 가입자가 아닌지 확인합니다. 이미 직장에 다니면 임의가입이 아니라 의무가입입니다.
                  </li>
                  <li>
                    <strong>2단계 기준소득월액 선택:</strong> 최저 하한액 이상에서 본인이 낼 금액을 정합니다. 형편에 따라 최저로 시작해도 되고, 노후연금을 키우려면 높게 설정합니다.
                  </li>
                  <li>
                    <strong>3단계 신청:</strong> 국민연금공단 홈페이지, 콜센터(1355), 가까운 지사 방문 중 편한 방법으로 접수합니다.
                  </li>
                  <li>
                    <strong>4단계 납부:</strong> 매월 고지서 또는 자동이체로 납부합니다. 형편이 어려우면 탈퇴 대신 납부예외를 신청해 자격을 유지할 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 임의가입 중 보험료를 오래 미납하면 자격이 상실될 수 있습니다. 납부가 어려운 시기에는 반드시 공단에 연락해 납부예외 등 대안을 확인하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/national-pension-expected-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 예상 수령액</div>
                    <p className="mt-1 text-sm text-text-secondary">가입기간·소득으로 미래 연금액을 가늠하는 방법.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-early-deferred-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 조기·연기수령</div>
                    <p className="mt-1 text-sm text-text-secondary">언제 받기 시작하느냐에 따라 달라지는 연금액.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-premium-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 보험료 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">요율 인상과 기준소득월액 상·하한을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/basic-pension-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">기초연금 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">65세 이후 받는 또 다른 노후 소득을 알아보세요.</p>
                  </Link>
                  <Link
                    href="/guide/housing-pension-reverse-mortgage-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주택연금 완전정복</div>
                    <p className="mt-1 text-sm text-text-secondary">집으로 노후 현금흐름을 만드는 또 하나의 축.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로·노후 계산기 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·퇴직금·연금 계산기를 한곳에서.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 재무·연금 조언이 아닙니다. 임의가입 자격, 최저 기준소득월액, 실제 예상 연금액은 국민연금공단(1355) 또는 홈페이지에서 반드시 확인하세요. 연금보험료율·기준소득월액 상·하한은 국민연금공단 고시에 따라 매년 달라집니다. 본 콘텐츠는 2026-07-16 기준이며 관련 법령·고시 개정 시 업데이트됩니다. 근거 조항은 <strong>국민연금법 §10(임의가입자)·§13(임의계속가입자)·§88(연금보험료)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nps.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국민연금공단</a>.
                </p>
              </section>

              <ShareButtons
                title="국민연금 임의가입 2026 가이드"
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
