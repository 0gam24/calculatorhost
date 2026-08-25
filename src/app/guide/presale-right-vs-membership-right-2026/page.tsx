// [revenue-lever: indexing+traffic] 분양권 vs 입주권 차이·주택수 포함·양도세·취득세 비교(주택 거래자 롱테일 흡수)
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

const URL = 'https://calculatorhost.com/guide/presale-right-vs-membership-right-2026/';
const DATE_PUBLISHED = '2026-08-26';
const DATE_MODIFIED = '2026-08-26';

export const metadata: Metadata = {
  title: '분양권 vs 입주권 차이 2026, 주택수·양도세·취득세 비교',
  description:
    '분양권은 청약으로, 입주권은 재개발·재건축 조합원 권리로 생깁니다. 주택 수 포함 시점, 분양권 양도세 60~70%, 입주권의 주택 취급까지 소득세법 §104와 지방세법 §13의2 기준으로 한눈에 비교했습니다.',
  keywords: [
    '분양권 입주권 차이',
    '분양권 주택수 포함',
    '입주권 주택수',
    '분양권 양도세',
    '입주권 양도세',
    '분양권 취득세',
    '지방세법 13조의2',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '분양권 vs 입주권 차이 2026, 주택수·양도세·취득세 비교' }],
    title: '분양권 vs 입주권 차이 2026, 세금과 주택 수 한눈에 비교',
    description: '청약으로 생기는 분양권과 조합원 입주권의 차이, 주택 수 포함 시점, 양도세·취득세를 비교합니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '분양권 vs 입주권 차이 2026, 주택수·세금 비교',
    description: '분양권 양도세 60~70%, 입주권의 주택 취급, 주택 수 포함 시점을 비교. 소득세법 §104.',
  },
};

const FAQ_ITEMS = [
  {
    question: '분양권과 입주권은 무엇이 다른가요?',
    answer:
      '생기는 경로가 다릅니다. 분양권은 청약에 당첨되거나 전매로 산, 새 아파트에 입주할 수 있는 권리입니다. 입주권은 재개발·재건축 조합원이 관리처분계획 인가로 얻는, 헌 집을 새 집으로 바꿔 받을 권리입니다. 분양권은 분양가가 정해져 있지만, 입주권은 공사비 변동으로 추가 분담금이 생길 수 있다는 점이 큰 차이입니다.',
  },
  {
    question: '분양권은 주택 수에 포함되나요?',
    answer:
      '양도소득세에서는 2021년 1월 1일 이후 취득한 분양권부터 주택 수에 포함됩니다(소득세법 §88). 취득세에서는 2020년 8월 12일 이후 취득한 분양권부터 주택 수에 넣습니다(지방세법 §13의2). 다만 종합부동산세는 분양권 상태에서는 제외하고, 완공되어 주택이 된 뒤 포함합니다.',
  },
  {
    question: '입주권도 주택 수에 들어가나요?',
    answer:
      '네, 조합원 입주권은 양도세에서 2006년 1월 1일 이후 관리처분계획 인가를 받았거나 승계취득한 입주권부터 주택 수에 포함됩니다. 취득세에서는 2020년 8월 12일 이후 취득한 입주권부터 포함하고, 종합부동산세는 입주권 상태에서는 제외한 뒤 완공 후 반영합니다. 시점 기준이 세목마다 다르므로 취득일을 꼭 확인하세요.',
  },
  {
    question: '분양권 양도세는 얼마인가요?',
    answer:
      '보유 기간에 따라 1년 미만이면 70%, 1년 이상이면 60% 단일세율이 적용됩니다(소득세법 §104). 여기에 지방소득세 10%가 더 붙어 실제로는 약 66~77% 수준입니다. 분양권은 주택과 달리 장기보유특별공제가 없고, 단기 전매에 높은 세율이 적용된다는 점이 핵심입니다.',
  },
  {
    question: '입주권 양도세는 분양권과 어떻게 다른가요?',
    answer:
      '입주권은 주택으로 보아 세율 구조가 다릅니다. 조합원 입주권은 일정 요건을 갖추면 1세대1주택 비과세나 장기보유특별공제를 받을 수 있어, 분양권의 단일 고세율과 크게 다릅니다. 다만 관리처분 전후 기간 계산, 종전 주택 요건 등이 복잡하므로 개별 사안은 세무 전문가 확인이 필요합니다.',
  },
  {
    question: '취득세는 언제, 얼마나 내나요?',
    answer:
      '분양권은 아파트가 완공되어 소유권을 취득할 때 주택 취득세를 냅니다. 입주권은 원조합원이면 종전 주택분과 신축 건물분의 취득 구조가 달라 계산이 복잡합니다. 두 경우 모두 다주택자 중과 여부는 주택 수 포함 시점(지방세법 §13의2)에 따라 달라지므로, 보유 주택 수를 함께 따져야 합니다.',
  },
  {
    question: '분양권과 입주권 중 세금 면에서 뭐가 유리한가요?',
    answer:
      '단순 비교는 어렵지만, 장기 실거주 목적이면 입주권이 유리한 경우가 많습니다. 입주권은 주택으로 취급돼 비과세·장기보유특별공제 가능성이 있는 반면, 분양권은 단기 매도 시 60~70% 고세율에 공제도 없습니다. 다만 입주권은 추가 분담금과 사업 지연 위험이 있으므로, 세금만이 아니라 사업성까지 종합적으로 봐야 합니다.',
  },
  {
    question: '분양권을 배우자에게 증여하면 절세가 되나요?',
    answer:
      '상황에 따라 다르며 단정할 수 없습니다. 증여 후 양도 시에는 이월과세 등 별도 규정이 적용될 수 있고, 증여 자체에 증여세와 취득세가 발생합니다. 주택 수 판정에도 영향을 주므로, 절세만 보고 접근하기보다 취득세·증여세·양도세를 함께 계산해 판단해야 합니다.',
  },
];

export default function PresaleRightVsMembershipRight2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '분양권 vs 입주권 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '분양권 vs 입주권 차이 2026, 주택수·양도세·취득세 비교',
    description:
      '분양권과 입주권의 발생 경로 차이, 세목별 주택 수 포함 시점, 분양권 양도세 60~70%, 입주권의 주택 취급까지 비교한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['분양권', '입주권', '주택 수', '양도소득세', '취득세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '분양권 vs 입주권 2026',
    description: '분양권·입주권 차이, 주택 수 포함 시점, 양도세·취득세 비교.',
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
                    { name: '분양권 vs 입주권 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">주택 거래자·투자자 · 9분 읽기 · 2026-08-26</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  분양권 vs 입주권 차이 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 주택수·양도세·취득세 비교</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  분양권과 입주권은 둘 다 새 아파트에 들어갈 권리라 비슷해 보이지만, 생기는 경로도 세금도 완전히 다릅니다. 특히 내가 이미 집이 있다면 이 권리가 주택 수에 포함되는지에 따라 양도세와 취득세 중과가 갈립니다. 이 가이드는 주택 거래를 앞둔 사람을 위해 두 권리의 차이, 세목별 주택 수 포함 시점, 양도세와 취득세를 한눈에 비교합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">분양권과 입주권은 무엇이 다른가요?</h2>
                <p>
                  분양권은 청약에서, 입주권은 재개발·재건축에서 나옵니다. 분양권은 청약에 당첨되거나 전매로 산 새 아파트 입주 권리이고, 입주권은 재개발·재건축 조합원이 관리처분계획 인가로 얻는, 헌 집을 새 집으로 바꿔 받을 권리입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 분양권: 청약 당첨·전매로 취득, 분양가 확정, 장기보유특별공제 없음
                    <br />
                    · 입주권: 조합원 권리, 추가 분담금 가능, 주택으로 취급되어 비과세 여지
                    <br />
                    · 양도세 주택 수: 분양권 2021.1.1 이후, 입주권 2006.1.1 이후 관리처분분부터
                    <br />
                    · 취득세 주택 수: 분양권·입주권 모두 2020.8.12 이후 취득분부터
                  </p>
                </div>
                <p>
                  다만, 입주권은 사업 진행 중 공사비 상승으로 추가 분담금이 늘 수 있고 준공이 지연될 위험도 있습니다. 분양권은 이런 변동이 상대적으로 적습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">주택 수에 포함되나요?</h2>
                <p>
                  세목마다 포함 시점이 다릅니다. 내가 가진 권리가 언제 취득한 것인지에 따라 주택 수 판정이 달라지므로, 아래 표로 세목별 기준을 확인하세요.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 세목별 주택 수 포함 시점</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">분양권</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">입주권</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">양도소득세</td>
                        <td className="p-3">2021.1.1 이후 취득분</td>
                        <td className="p-3">2006.1.1 이후 관리처분·승계분</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">취득세</td>
                        <td className="p-3">2020.8.12 이후 취득분</td>
                        <td className="p-3">2020.8.12 이후 취득분</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">종합부동산세</td>
                        <td className="p-3">완공 후 주택으로 포함</td>
                        <td className="p-3">완공 후 주택으로 포함</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  예외: 위 시점 이전에 취득한 분양권·입주권은 각 세목에서 주택 수에 넣지 않을 수 있습니다. 취득일 기준이 결정적이므로 계약서상 취득일을 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">분양권 양도세는 얼마인가요?</h2>
                <p>
                  보유 기간에 관계없이 높은 단일세율이 붙습니다. 소득세법 §104에 따라 분양권은 1년 미만 보유 시 70%, 1년 이상이면 60%로 과세되며, 여기에 지방소득세가 10% 더해져 실제 부담은 약 66~77%입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 분양권 양도차익 1억원</p>
                  <p className="text-sm text-text-secondary">
                    · 1년 미만 보유: 1억 × 70% = 7,000만원 + 지방소득세 700만원 = 약 7,700만원
                    <br />
                    · 1년 이상 보유: 1억 × 60% = 6,000만원 + 지방소득세 600만원 = 약 6,600만원
                    <br />
                    <span className="text-xs text-text-tertiary">기본공제 250만원 등 세부 공제는 별도이며, 분양권은 장기보유특별공제가 없습니다.</span>
                  </p>
                </div>
                <p>
                  다만, 위 계산은 이해를 돕기 위한 단순 예시입니다. 실제 세액은 기본공제와 필요경비 등을 반영해 달라지므로 계산기와 세무 상담으로 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">입주권 양도세는 어떻게 다른가요?</h2>
                <p>
                  입주권은 주택으로 취급되어 비과세와 공제 여지가 있습니다. 조합원 입주권은 일정 요건을 갖추면 1세대1주택 비과세나 장기보유특별공제를 받을 수 있어, 분양권의 단일 고세율과 근본적으로 다릅니다.
                </p>
                <p>
                  다만 관리처분계획 인가일 전후로 보유·거주 기간을 나눠 계산하고, 종전 주택의 요건까지 따져야 하므로 절차가 복잡합니다. 같은 입주권이라도 원조합원인지 승계조합원인지에 따라 취득 구조가 달라지니, 개별 사안은 반드시 전문가 확인이 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어느 쪽이 유리한가요?</h2>
                <p>
                  목적에 따라 다릅니다. 장기 실거주라면 입주권이, 단기 시세차익이면 분양권이라는 단순 공식은 위험하므로, 아래 비교표로 성격을 파악한 뒤 종합 판단하세요.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 분양권 vs 입주권 핵심 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">분양권</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">입주권</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">발생 경로</td>
                        <td className="p-3">청약 당첨·전매</td>
                        <td className="p-3">재개발·재건축 조합원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">양도세 성격</td>
                        <td className="p-3">단일세율 60~70%</td>
                        <td className="p-3">주택 취급(비과세·공제 여지)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">추가 분담금</td>
                        <td className="p-3">분양가 확정</td>
                        <td className="p-3">공사비 변동 시 발생</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">주요 위험</td>
                        <td className="p-3">전매 제한·고세율</td>
                        <td className="p-3">사업 지연·분담금 증가</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  예외: 세금만 보고 결정하면 사업성 위험을 놓칠 수 있습니다. 입주권은 추가 분담금과 준공 지연까지 감안해 총투자금 관점에서 판단하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/calculator/capital-gains-tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도차익을 입력해 예상 세액을 확인하세요.</p>
                  </Link>
                  <Link href="/guide/presale-right-capital-gains-tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">분양권 양도세 상세</div>
                    <p className="mt-1 text-sm text-text-secondary">분양권 60~70% 세율과 계산을 자세히.</p>
                  </Link>
                  <Link href="/guide/redevelopment-membership-right-capital-gains-tax-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">입주권 양도세 상세</div>
                    <p className="mt-1 text-sm text-text-secondary">조합원 입주권의 주택 취급과 비과세 요건.</p>
                  </Link>
                  <Link href="/guide/presale-right-acquisition-tax-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">분양권 취득세</div>
                    <p className="mt-1 text-sm text-text-secondary">완공 시 내는 취득세와 중과 기준을 확인하세요.</p>
                  </Link>
                  <Link href="/guide/presale-right-resale-restriction-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">분양권 전매 제한</div>
                    <p className="mt-1 text-sm text-text-secondary">지역별 전매 제한 기간을 정리했습니다.</p>
                  </Link>
                  <Link href="/category/tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·재산세 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 주택 수 포함 시점과 세율, 비과세 요건은 개정으로 달라질 수 있고 개별 사안은 취득 시점·보유 구조에 따라 복잡하므로, 실제 세액은 국세청·세무 전문가와 확인하세요. 본 콘텐츠는 2026-08-26 기준이며, 인용한 법조항은 <strong>소득세법 §88(주택 수), §104(양도소득세 세율), 지방세법 §13의2(주택 취득세 중과)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스</a>.
                </p>
              </section>

              <ShareButtons title="분양권 vs 입주권 차이 2026 가이드" url={URL} />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
