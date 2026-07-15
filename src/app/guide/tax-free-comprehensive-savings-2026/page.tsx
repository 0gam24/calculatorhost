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
const URL = 'https://calculatorhost.com/guide/tax-free-comprehensive-savings-2026/';
const DATE_PUBLISHED = '2026-07-16';
const DATE_MODIFIED = '2026-07-16';

export const metadata: Metadata = {
  title: '비과세종합저축 2026, 5천만원 이자 세금 0원 만드는 법',
  description:
    '만 65세 이상·장애인 등이 5,000만원까지 이자·배당에 세금을 내지 않는 비과세종합저축. 조특법 §88의2 대상 요건, 2026년 신규가입 제한, 15.4% 절세 효과를 사례로 정리합니다.',
  keywords: [
    '비과세종합저축',
    '노인 예금 비과세',
    '5천만원 비과세',
    '이자소득세 면제',
    '65세 예금 세금',
    '조세특례제한법 88조의2',
    '장애인 비과세저축',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '비과세종합저축 2026, 5천만원 이자 세금 0원 만드는 법' }],
    title: '비과세종합저축 2026, 5천만원까지 이자 세금 0원',
    description: '만 65세 이상·장애인 등이 5,000만원 한도로 이자·배당 세금을 면제받는 제도. 조특법 §88의2.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '비과세종합저축 2026, 5천만원 이자 세금 0원 만드는 법',
    description: '5,000만원 한도까지 이자·배당 15.4% 세금이 면제됩니다. 대상과 2026년 가입 요건 정리. 조특법 §88의2.',
  },
};

const FAQ_ITEMS = [
  {
    question: '비과세종합저축이 무엇인가요?',
    answer:
      '원금 5,000만원까지 이자·배당소득에 세금을 매기지 않는 절세 저축입니다(조세특례제한법 §88의2). 만 65세 이상 거주자나 장애인 등 정해진 대상이 예금·적금·펀드 등을 이 계좌로 가입하면, 발생한 이자·배당에 붙는 15.4% 세금이 면제됩니다.',
  },
  {
    question: '누가 가입할 수 있나요?',
    answer:
      '만 65세 이상 거주자, 장애인, 독립유공자와 유족, 국가유공 상이자, 기초생활수급자, 고엽제후유의증환자, 5·18 민주화운동 부상자 등이 대상입니다(조특법 §88의2). 나이 요건과 자격 요건 중 하나만 충족하면 되며, 신분을 증빙하는 서류를 갖춰 금융회사에 신청합니다.',
  },
  {
    question: '2026년에 가입 요건이 바뀌었나요?',
    answer:
      '만 65세 이상 대상의 신규가입 요건이 강화되었습니다. 2026년부터는 만 65세 이상이라도 기초연금 수급자여야 신규로 가입할 수 있습니다. 장애인·기초생활수급자 등 다른 대상은 종전처럼 가입할 수 있으며, 이미 가입한 계좌는 그대로 유지됩니다. 정확한 최신 요건은 금융회사에서 확인하세요.',
  },
  {
    question: '한도 5,000만원은 어떻게 계산하나요?',
    answer:
      '가입 원금(납입액) 기준으로 전 금융기관을 합산해 5,000만원입니다. 이자·수익까지 포함한 잔액이 아니라 넣은 원금 총액이 5,000만원을 넘지 않으면 됩니다. 여러 은행에 나눠 가입해도 합산 관리되므로, 한도를 초과하지 않도록 주의해야 합니다.',
  },
  {
    question: '세금이 얼마나 절약되나요?',
    answer:
      '이자·배당에 붙던 15.4%가 통째로 면제됩니다. 예를 들어 5,000만원을 연 4% 정기예금에 넣어 이자 200만원이 생기면, 일반 계좌는 30만 8천원을 세금으로 떼지만 비과세종합저축은 0원입니다. 금리가 높거나 예치 금액이 클수록 절세 효과가 커집니다.',
  },
  {
    question: '금융소득종합과세에도 도움이 되나요?',
    answer:
      '비과세 소득은 금융소득종합과세 합산 대상에서 빠집니다. 이자·배당이 연 2,000만원을 넘으면 종합과세되는데, 비과세종합저축에서 나온 소득은 이 2,000만원 계산에 포함되지 않습니다. 따라서 금융소득이 많은 고령자의 종합과세 부담을 낮추는 데도 유용합니다.',
  },
  {
    question: '중도해지하면 그동안 면제받은 세금을 토해내나요?',
    answer:
      '비과세종합저축은 만기·해지 시점과 무관하게 발생한 이자에 비과세가 적용되는 것이 원칙입니다. 다만 상품 자체(정기예금 등)의 중도해지 이율이 낮아져 이자가 줄어들 수는 있습니다. 상품별 조건이 다르므로 가입 전 약관을 확인하세요.',
  },
  {
    question: '자녀 명의로 가입해 절세할 수 있나요?',
    answer:
      '대상 요건은 실제 가입자 본인이 충족해야 합니다. 65세 미만이거나 자격이 없는 사람이 부모 명의를 빌려 가입하면 실질과세 원칙(국세기본법 §14)에 따라 비과세가 부인되고 세금이 추징될 수 있습니다. 명의만 빌리는 방식은 피해야 합니다.',
  },
];

export default function TaxFreeComprehensiveSavings2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '비과세종합저축 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '비과세종합저축 2026, 5천만원까지 이자 세금 0원',
    description:
      '만 65세 이상·장애인 등이 5,000만원 한도로 이자·배당소득 15.4% 세금을 면제받는 비과세종합저축의 대상 요건, 2026년 신규가입 제한, 절세 효과를 사례로 정리. 조세특례제한법 §88의2 기준.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['비과세종합저축', '이자소득세', '65세', '장애인', '절세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '비과세종합저축 2026',
    description:
      '만 65세 이상·장애인 등의 5,000만원 한도 이자·배당 비과세 제도와 2026년 가입 요건 정리.',
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
                    { name: '비과세종합저축 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">고령·저소득 · 8분 읽기 · 2026-07-16</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  비과세종합저축 2026
                  <br />
                  <span className="text-2xl text-text-secondary">5천만원 이자 세금 0원 만드는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  은퇴 후 예금 이자로 생활하는 분에게 이자소득세 15.4%는 적지 않은 부담입니다. 그런데 만 65세 이상이거나 장애인 등 정해진 대상이라면, 5,000만원까지 이자·배당에 세금을 전혀 내지 않는 비과세종합저축을 활용할 수 있습니다. 이 가이드는 누가 얼마까지 가입할 수 있는지, 2026년 바뀐 요건은 무엇인지, 실제로 세금이 얼마나 줄어드는지를 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-tax-free-comprehensive-savings-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">비과세종합저축이란</h2>
                <p>
                  비과세종합저축은 원금 5,000만원까지 이자·배당소득에 세금을 매기지 않는 절세 저축입니다(조세특례제한법 §88의2). 별도의 금융상품이 아니라, 정기예금·적금·펀드 같은 기존 상품을 이 비과세 계좌로 가입하는 방식입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-2 text-text-secondary">
                    비과세종합저축이란, 만 65세 이상·장애인 등 대상자가 원금 5,000만원 한도로 이자·배당소득에 비과세 혜택을 받는 저축(조특법 §88의2)입니다.
                    <br />
                    핵심: 면제되는 세율은 이자·배당에 붙는 15.4%(소득세 14% + 지방소득세 1.4%).
                  </p>
                </div>
                <p className="mt-4">
                  일반 예금은 이자를 받을 때 은행이 15.4%를 원천징수합니다(소득세법 §129, 지방세법 §103). 비과세종합저축은 이 원천징수를 하지 않으므로, 이자 전액을 그대로 받습니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 비과세는 이자·배당에만 적용됩니다. 주식 매매차익처럼 원래 비과세이거나 다른 세목이 적용되는 소득에는 이 제도가 별도로 의미가 없습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">누가 가입할 수 있나</h2>
                <p>
                  가입 대상은 나이 요건 또는 자격 요건 중 하나를 충족하는 사람입니다. 조특법 §88의2가 정한 대상은 다음과 같습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 비과세종합저축 가입 대상 (조특법 §88의2)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">대상</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">2026년 유의</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">연령 요건</td>
                        <td className="p-3">만 65세 이상 거주자</td>
                        <td className="p-3"><strong>기초연금 수급자만 신규가입</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">자격 요건</td>
                        <td className="p-3">장애인, 기초생활수급자</td>
                        <td className="p-3">종전대로 가입 가능</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">국가유공 등</td>
                        <td className="p-3">독립유공자·유족, 상이자, 5·18 부상자, 고엽제후유의증환자</td>
                        <td className="p-3">종전대로 가입 가능</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 2026년부터 만 65세 이상 대상은 기초연금을 받는 사람만 신규가입할 수 있도록 요건이 강화됐습니다. 기초연금을 받지 않는 65세 이상은 신규가입이 제한되므로, 본인이 대상인지 금융회사에서 먼저 확인해야 합니다. 이미 가입한 계좌는 그대로 유지됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세금이 실제로 얼마나 줄어드나</h2>
                <p>
                  절세 효과는 예치 금액과 금리에 비례합니다. 아래 두 사례로 일반 예금과 비과세종합저축의 세후 이자를 비교해보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 5,000만원 정기예금, 연 4%</p>
                  <p className="text-sm text-text-secondary">
                    · 연 이자 = 5,000만원 × 4% = 200만원
                    <br />
                    · 일반 예금 세금 = 200만원 × 15.4% = 30만 8천원 → 세후 이자 169만 2천원
                    <br />
                    · 비과세종합저축 세금 = <strong>0원</strong> → 세후 이자 <strong>200만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 연 30만 8천원을 더 받습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 3,000만원 예금, 연 3.5%</p>
                  <p className="text-sm text-text-secondary">
                    · 연 이자 = 3,000만원 × 3.5% = 105만원
                    <br />
                    · 일반 예금 세금 = 105만원 × 15.4% = 16만 1,700원 → 세후 88만 8,300원
                    <br />
                    · 비과세종합저축 세금 = <strong>0원</strong> → 세후 이자 <strong>105만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 연 16만 1,700원 절세. 5년이면 약 80만원 차이.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 한도 5,000만원은 원금(가입금액) 기준이며 전 금융기관을 합산합니다. 여러 은행에 나눠 가입해도 합산되므로, 총 납입 원금이 5,000만원을 넘지 않도록 관리해야 합니다.
                </p>
              </section>

              <AdSlot slot="guide-tax-free-comprehensive-savings-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">가입 전에 확인할 함정은</h2>
                <p>
                  혜택이 큰 만큼 요건을 잘못 이해하면 나중에 비과세가 부인될 수 있습니다. 실질과세 원칙(국세기본법 §14)상 형식만 갖춘 가입은 인정되지 않습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>명의 대여 금지:</strong> 대상이 아닌 사람이 부모·조부모 명의를 빌려 가입하면 비과세가 부인되고 세금이 추징됩니다. 대상 요건은 실제 가입자가 충족해야 합니다.
                  </li>
                  <li>
                    <strong>한도 초과 관리:</strong> 전 금융기관 합산 5,000만원을 넘기면 초과분은 비과세 대상에서 제외됩니다. 신규 가입 시 기존 가입액을 확인하세요.
                  </li>
                  <li>
                    <strong>신규가입 기한:</strong> 비과세종합저축은 조특법 부칙에 따라 정해진 기한까지만 신규가입이 가능합니다. 일몰 시한은 개정으로 바뀔 수 있으므로 가입 전 확인이 필요합니다.
                  </li>
                  <li>
                    <strong>대상 증빙 준비:</strong> 장애인등록증, 기초연금·기초생활수급 증명 등 자격 서류를 갖춰야 가입이 됩니다. 서류가 없으면 대상이어도 가입이 지연될 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 제도의 신규가입 요건과 일몰 시한은 세법 개정으로 자주 조정됩니다. 가입 시점의 정확한 요건은 반드시 은행 등 금융회사와 국세청에서 확인하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/deposit/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">정기예금 이자 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">세전·세후 이자를 바로 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/interest-income-tax-15-4-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">이자소득세 15.4%</div>
                    <p className="mt-1 text-sm text-text-secondary">일반 예금 이자에 붙는 세금 구조를 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/financial-income-comprehensive-vs-separate-taxation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융소득종합과세 2천만원</div>
                    <p className="mt-1 text-sm text-text-secondary">이자·배당이 많을 때의 과세 기준을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/isa-account-tax-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">ISA 계좌 절세 혜택</div>
                    <p className="mt-1 text-sm text-text-secondary">또 다른 이자·배당 절세 계좌를 비교하세요.</p>
                  </Link>
                  <Link
                    href="/guide/basic-pension-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">기초연금 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">65세 이후 노후 소득과 절세를 함께 설계하세요.</p>
                  </Link>
                  <Link
                    href="/category/finance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융 계산기 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">예적금·대출·환율 계산기를 한곳에서.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무·금융 조언이 아닙니다. 가입 대상 여부, 한도, 신규가입 기한(일몰)은 세법 개정으로 달라질 수 있으므로 가입 전 은행 등 금융회사와 국세청(126)에서 반드시 확인하세요. 본 콘텐츠는 2026-07-16 기준이며 관련 법령 개정 시 업데이트됩니다. 근거 조항은 <strong>조세특례제한법 §88의2(비과세종합저축), 소득세법 §129(원천징수세율), 지방세법 §103(개인지방소득세), 국세기본법 §14(실질과세)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="비과세종합저축 2026 가이드"
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
