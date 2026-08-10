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

const URL = 'https://calculatorhost.com/guide/venture-stock-option-tax-2026/';
const DATE_PUBLISHED = '2026-08-11';
const DATE_MODIFIED = '2026-08-11';

export const metadata: Metadata = {
  title: '스톡옵션 세금 2026 | 행사이익 과세와 벤처 비과세 특례',
  description:
    '스톡옵션(주식매수선택권) 행사이익은 재직 중이면 근로소득, 퇴직 후면 기타소득으로 과세됩니다. 벤처기업 비과세 특례 연 2억원(누적 5억), 5년 분할납부, 양도소득 과세특례를 조세특례제한법으로 정리했습니다.',
  keywords: [
    '스톡옵션 세금',
    '주식매수선택권 과세',
    '스톡옵션 행사이익',
    '벤처기업 스톡옵션 비과세',
    '스톡옵션 근로소득',
    '조세특례제한법 16조의2',
    '스타트업 스톡옵션 세금',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '스톡옵션 세금 2026 행사이익 과세와 벤처 비과세 특례' }],
    title: '스톡옵션 세금 2026 | 행사이익 과세와 벤처 비과세 특례',
    description: '행사이익은 근로소득 또는 기타소득. 벤처 비과세 연 2억(누적 5억), 5년 분할, 양도소득 특례 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '스톡옵션 세금 2026 행사이익 과세',
    description: '재직 중 행사는 근로소득, 퇴직 후는 기타소득. 벤처 비과세 연 2억·누적 5억.',
  },
};

const FAQ_ITEMS = [
  {
    question: '스톡옵션 행사이익은 어떻게 과세되나요?',
    answer:
      '행사이익(행사 시점 시가에서 행사가격을 뺀 금액)은 원칙적으로 근로 제공의 대가로 봅니다. 재직 중에 행사하면 근로소득(소득세법 §20), 퇴직 후에 행사하면 기타소득(소득세법 §21)으로 과세됩니다. 즉 스톡옵션을 언제 행사하느냐에 따라 소득 구분과 세 부담이 달라집니다.',
  },
  {
    question: '행사이익은 어떻게 계산하나요?',
    answer:
      '행사이익 = (행사 시점 1주당 시가 − 1주당 행사가격) × 행사 주식 수입니다. 예를 들어 행사가격 5,000원, 행사 시점 시가 2만원인 주식 1,000주를 행사하면 (2만 − 5천) × 1,000 = 1,500만원이 행사이익입니다. 이 금액이 과세 대상 소득에 해당합니다.',
  },
  {
    question: '벤처기업 스톡옵션 비과세 특례는 무엇인가요?',
    answer:
      '벤처기업 임직원이 2027년 12월 31일 이전에 부여받은 스톡옵션을 행사해 얻은 이익 중 연간 2억원 이내(벤처기업별 누적 5억원 이내)는 소득세를 과세하지 않습니다(조세특례제한법 §16의2). 다만 요건을 갖춘 벤처기업의 스톡옵션에만 적용되며, 한도를 넘는 부분은 일반 과세됩니다.',
  },
  {
    question: '세금을 나눠 낼 수 있나요?',
    answer:
      '네, 벤처기업 임직원이 스톡옵션을 행사한 경우 비과세된 금액을 제외한 소득세를 5년간 분할납부할 수 있는 납부 특례가 있습니다(조세특례제한법 §16의3). 행사이익이 커서 한 해 세 부담이 몰릴 때 유용하지만, 요건과 신청 방법은 국세청 안내를 따라야 합니다.',
  },
  {
    question: '근로소득 대신 양도소득으로 낼 수도 있나요?',
    answer:
      '일정 요건을 갖춘 적격 스톡옵션은 행사 시점에 근로소득세를 매기지 않고, 나중에 주식을 팔 때 양도소득세로 과세하는 방식을 선택할 수 있습니다(조세특례제한법 §16의4). 근로소득 누진세율과 양도소득세율 중 어느 쪽이 유리한지는 소득 규모와 주식 처분 계획에 따라 달라지므로 사전 비교가 필요합니다.',
  },
  {
    question: '스톡옵션은 받자마자 세금을 내나요?',
    answer:
      '아니요. 스톡옵션을 부여받는 시점에는 과세하지 않습니다. 실제로 권리를 행사해 주식을 취득할 때 행사이익이 확정되어 과세됩니다. 이후 그 주식을 처분할 때는 취득가액과 양도가액 차이에 대해 별도로 양도소득세를 따집니다.',
  },
  {
    question: '비상장 스타트업 주식을 팔면 세금은 어떻게 되나요?',
    answer:
      '스톡옵션을 행사해 취득한 주식을 나중에 양도하면 양도차익에 양도소득세가 부과됩니다. 비상장주식과 상장주식 대주주 여부 등에 따라 세율과 신고 방법이 다르므로, 행사이익 과세와 처분 시 양도소득세를 구분해 이해해야 이중으로 오해하지 않습니다.',
  },
  {
    question: '벤처기업이 아니면 특례를 전혀 못 받나요?',
    answer:
      '벤처기업 비과세·납부 특례(조세특례제한법 §16의2, §16의3)는 벤처기업 요건을 갖춘 경우에 적용됩니다. 일반 기업 스톡옵션은 이 특례 없이 행사이익 전액이 근로소득 등으로 과세되는 것이 원칙입니다. 다만 회사가 벤처기업 확인을 받았는지, 적격 요건을 충족하는지에 따라 달라지므로 인사·재무팀과 확인하세요.',
  },
];

export default function VentureStockOptionTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '스톡옵션 세금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '스톡옵션 세금 2026, 행사이익 과세와 벤처 비과세 특례',
    description:
      '스톡옵션(주식매수선택권) 행사이익 과세. 재직 중 근로소득·퇴직 후 기타소득 구분, 벤처기업 비과세 연 2억(누적 5억), 5년 분할납부, 양도소득 과세특례를 조세특례제한법으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['스톡옵션', '주식매수선택권', '행사이익', '벤처 비과세', '조세특례제한법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '스톡옵션 세금 2026',
    description:
      '스톡옵션 행사이익 과세 구조와 벤처기업 비과세·납부·양도소득 특례를 정리한 실전 가이드.',
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
                    { name: '스톡옵션 세금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">스타트업 임직원·투자자 · 8분 읽기 · 2026-08-11</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  스톡옵션 세금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">행사이익 과세와 벤처 비과세 특례</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  스타트업 스톡옵션을 행사하기 전, 세금이 얼마나 나올지 아는 것은 필수입니다. 행사이익은 언제 행사하느냐에 따라 근로소득 또는 기타소득으로 과세되고, 벤처기업이라면 연 2억원까지 비과세되는 특례도 있습니다. 이 가이드는 조세특례제한법 §16의2, §16의3, §16의4를 근거로 스톡옵션 과세 구조와 절세 선택지를 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-venture-stock-option-tax-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">스톡옵션 행사이익은 어떻게 과세되나요?</h2>
                <p>
                  행사이익은 근로 제공의 대가로 보아 소득으로 과세됩니다. 언제 행사했는지에 따라 소득 구분이 달라집니다. 재직 중 행사하면 근로소득(소득세법 §20), 퇴직 후 행사하면 기타소득(소득세법 §21)입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 스톡옵션 과세 시점과 소득 구분</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">시점</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과세 여부</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">소득 구분</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">부여 시점</td>
                        <td className="p-3">과세 안 함</td>
                        <td className="p-3">해당 없음</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">행사(재직 중)</td>
                        <td className="p-3">과세</td>
                        <td className="p-3">근로소득(소득세법 §20)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">행사(퇴직 후)</td>
                        <td className="p-3">과세</td>
                        <td className="p-3">기타소득(소득세법 §21)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">주식 처분(매도)</td>
                        <td className="p-3">과세</td>
                        <td className="p-3">양도소득</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 부여 시점에는 세금이 없다는 점을 기억하세요. 실제 권리를 행사해 주식을 취득할 때 비로소 행사이익이 확정되어 과세됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">행사이익은 어떻게 계산하나요?</h2>
                <p>
                  행사이익은 행사 시점 시가에서 행사가격을 뺀 차액에 주식 수를 곱해 구합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">계산 공식</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    행사이익 = (행사 시점 1주당 시가 − 1주당 행사가격) × 행사 주식 수
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 행사가격 5,000원, 시가 2만원, 1,000주</p>
                  <p className="text-sm text-text-secondary">
                    · 주당 차익: 2만 − 5천 = 1만 5천원
                    <br />
                    · 행사이익: 1만 5천 × 1,000주 = <strong>1,500만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">이 1,500만원이 과세 대상 행사이익입니다. 벤처기업 비과세 한도(연 2억) 이내라면 소득세가 부과되지 않을 수 있습니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">벤처기업 비과세 특례는 얼마까지인가요?</h2>
                <p>
                  벤처기업 임직원이 2027년 12월 31일 이전에 부여받은 스톡옵션을 행사한 이익 중 연간 2억원 이내(벤처기업별 누적 5억원 이내)는 소득세를 과세하지 않습니다(조세특례제한법 §16의2). 한도를 넘는 부분은 일반 과세됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 벤처기업 스톡옵션 세제 특례 (조세특례제한법)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">특례</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">비과세</td>
                        <td className="p-3">행사이익 연 2억원(누적 5억원) 이내 비과세</td>
                        <td className="p-3">§16의2</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">납부 특례</td>
                        <td className="p-3">비과세 제외분 소득세 5년 분할납부</td>
                        <td className="p-3">§16의3</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">과세 특례</td>
                        <td className="p-3">적격 요건 시 양도소득세로 과세 선택</td>
                        <td className="p-3">§16의4</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 벤처기업 재직자, 행사이익 3억원</p>
                  <p className="text-sm text-text-secondary">
                    · 비과세: 연 2억원(누적 한도 내)
                    <br />
                    · 과세 대상: 3억 − 2억 = 1억원(근로소득 합산 과세)
                    <br />
                    · 납부: 비과세 제외분 소득세는 5년 분할납부 선택 가능(§16의3)
                    <br />
                    <span className="text-xs text-text-tertiary">누적 5억원 한도가 있으므로, 여러 해에 걸쳐 행사할 때는 누적 비과세액을 관리해야 합니다.</span>
                  </p>
                </div>
                <p>
                  다만 특례는 벤처기업 요건과 적격 스톡옵션 요건을 충족해야 적용됩니다. 일반 기업 스톡옵션은 특례 없이 행사이익 전액이 과세되는 것이 원칙입니다.
                </p>
              </section>

              <AdSlot slot="guide-venture-stock-option-tax-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">근로소득과 양도소득, 어느 쪽이 유리한가요?</h2>
                <p>
                  적격 스톡옵션은 근로소득세(행사 시)와 양도소득세(처분 시) 중 유리한 방식을 선택할 수 있습니다(조세특례제한법 §16의4). 판단 기준을 비교하면 다음과 같습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>근로소득 과세:</strong> 행사 시점에 다른 근로소득과 합산되어 누진세율이 적용됩니다. 소득이 큰 해에 행사하면 높은 세율 구간에 걸릴 수 있습니다.</li>
                  <li><strong>양도소득 과세특례:</strong> 행사 시 근로소득세를 매기지 않고, 나중에 주식을 팔 때 양도소득세로 과세합니다. 처분 시점을 조절해 세 부담을 분산할 수 있습니다.</li>
                  <li><strong>선택 기준:</strong> 본인 종합소득 규모, 주식 처분 계획, 벤처·적격 요건 충족 여부에 따라 유불리가 갈립니다.</li>
                </ul>
                <p>
                  예외: 특례 적용에는 요건과 한도가 있고 개정도 잦으므로, 큰 금액을 행사하기 전에는 반드시 세무 전문가 상담과 국세청 확인을 거쳐야 합니다. 잘못 선택하면 세 부담이 크게 늘 수 있습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/unlisted-stock-capital-gains-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">비상장주식 양도세</div>
                    <p className="mt-1 text-sm text-text-secondary">행사 후 취득한 주식 처분 시 양도세 구조.</p>
                  </Link>
                  <Link
                    href="/guide/domestic-stock-major-shareholder-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국내주식 대주주 양도세</div>
                    <p className="mt-1 text-sm text-text-secondary">대주주 요건과 양도소득세율을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/other-income-necessary-expense-60-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">기타소득 필요경비</div>
                    <p className="mt-1 text-sm text-text-secondary">퇴직 후 행사 시 기타소득 과세 이해에 참고.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-income-tax-rate-brackets-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 세율표</div>
                    <p className="mt-1 text-sm text-text-secondary">근로소득 합산 시 적용되는 누진세율 구간.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">행사이익 합산 시 세 부담 흐름을 참고하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">소득·투자 세금 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">주식·배당·양도 관련 세금 가이드.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무·투자 자문이 아닙니다. 특정 종목의 매수·매도를 권유하지 않습니다. 스톡옵션 과세는 벤처기업·적격 스톡옵션 요건, 행사 시점, 개인 소득 규모에 따라 크게 달라지므로, 실제 세액과 특례 적용은 국세청 상담과 세무 전문가 자문으로 확인하세요. 인용 법령은 <strong>소득세법 §20, §21, 조세특례제한법 §16의2, §16의3, §16의4</strong>입니다. 본 콘텐츠는 2026-08-11 기준이며 법령 개정 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="스톡옵션 세금 2026 가이드"
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
