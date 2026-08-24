// [revenue-lever: indexing+traffic] 농어촌주택 취득 시 일반주택 1세대1주택 비과세 특례 조특법 §99의4 (주택 보유자 롱테일 흡수)
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

const URL = 'https://calculatorhost.com/guide/rural-house-one-household-exemption-special-2026/';
const DATE_PUBLISHED = '2026-08-25';
const DATE_MODIFIED = '2026-08-25';

export const metadata: Metadata = {
  title: '농어촌주택 양도세 특례 2026, 시골집 있어도 1주택',
  description:
    '도시에 집 한 채가 있어도 농어촌주택을 따로 취득해 3년 이상 보유하면, 기존 일반주택을 팔 때 1세대1주택 비과세를 받을 수 있습니다. 지역·기준시가 3억(한옥 4억)·면적 요건과 취득 순서 규칙을 조세특례제한법 §99의4 기준으로 정리합니다.',
  keywords: [
    '농어촌주택 양도세',
    '농어촌주택 특례',
    '시골집 1주택',
    '일반주택 비과세',
    '농어촌주택 기준시가',
    '1세대1주택 특례',
    '조세특례제한법 99조의4',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '농어촌주택 양도세 특례 2026, 시골집 있어도 1주택' }],
    title: '농어촌주택 양도세 특례 2026, 시골집을 주택 수에서 빼는 법',
    description: '읍면 소재, 기준시가 3억(한옥 4억), 대지 660㎡, 3년 보유. 취득 순서만 맞으면 일반주택 양도 시 1세대1주택 비과세.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '농어촌주택 양도세 특례 2026, 시골집 있어도 1주택',
    description: '읍면·기준시가 3억(한옥 4억)·대지 660㎡·3년 보유. 조특법 §99의4.',
  },
};

const FAQ_ITEMS = [
  {
    question: '농어촌주택 특례가 정확히 무엇인가요?',
    answer:
      '일반주택을 가진 사람이 농어촌주택을 따로 취득해 3년 이상 보유하면, 그 농어촌주택을 주택 수에서 빼 주는 제도입니다(조세특례제한법 §99의4). 그 결과 원래 살던 일반주택을 팔 때 1세대1주택 비과세(소득세법 §89)를 적용받을 수 있습니다. 시골집 때문에 2주택자가 되어 비과세를 놓치는 일을 막아 주는 특례입니다.',
  },
  {
    question: '어떤 집이 농어촌주택으로 인정되나요?',
    answer:
      '읍·면 지역 등에 소재하고, 대지면적 660㎡ 이내, 취득 당시 주택과 부수토지 합계 기준시가 3억원 이하(한옥은 4억원 이하)여야 합니다(조세특례제한법 §99의4). 수도권, 조정대상지역, 관광단지 등은 제외됩니다. 세부 제외 지역은 개정될 수 있으니 취득 전 확인이 필요합니다.',
  },
  {
    question: '취득 순서가 중요하다던데, 어떤 순서여야 하나요?',
    answer:
      '일반주택을 먼저 보유하고 있는 상태에서 농어촌주택을 나중에 취득해야 합니다. 즉 특례 대상 일반주택은 농어촌주택 취득 전부터 보유하던 집이어야 합니다. 시골집을 먼저 산 뒤에 도시 집을 사면 순서가 어긋나 특례를 받지 못할 수 있으므로 주의해야 합니다.',
  },
  {
    question: '농어촌주택을 팔 때도 비과세인가요?',
    answer:
      '아닙니다. 이 특례는 일반주택을 양도할 때 농어촌주택을 주택 수에서 빼 주는 것이지, 농어촌주택 자체를 팔 때 비과세해 주는 것이 아닙니다. 농어촌주택을 양도하면 일반적인 양도소득세 과세 규정이 적용됩니다.',
  },
  {
    question: '3년 보유는 일반주택을 팔기 전에 채워야 하나요?',
    answer:
      '농어촌주택은 3년 이상 보유해야 특례가 유지됩니다(조세특례제한법 §99의4). 일반주택 양도 시점에 3년을 아직 채우지 못했더라도 이후 3년 보유를 충족하는 방식으로 관리되지만, 순서와 사후관리 요건이 까다로우므로 양도 계획 전에 국세청이나 세무 전문가에게 확인하는 것이 안전합니다.',
  },
  {
    question: '농어촌주택은 언제까지 취득해야 특례를 받나요?',
    answer:
      '조세특례제한법 §99의4는 일정 기간 내에 취득한 농어촌주택에 적용됩니다. 현재 적용 기한은 2028년 12월 31일까지로 정해져 있으나, 적용 시한은 세법 개정으로 연장·조정될 수 있으므로 취득 시점의 최신 규정을 반드시 확인해야 합니다.',
  },
  {
    question: '수도권에 있는 시골 같은 집도 되나요?',
    answer:
      '원칙적으로 수도권과 조정대상지역은 제외되므로 어렵습니다. 다만 수도권 안에서도 인구감소지역 등 일부 예외가 규정으로 정해질 수 있으므로, 해당 지역이 특례 대상 지역인지 취득 전에 국세청과 관할 지자체를 통해 확인해야 합니다.',
  },
  {
    question: '농어촌주택이 여러 채면 모두 특례가 되나요?',
    answer:
      '이 특례는 일반주택 1채에 대한 비과세를 위해 농어촌주택을 주택 수에서 제외해 주는 구조이므로, 농어촌주택을 여러 채 보유하면 특례 적용이 제한될 수 있습니다. 보유 주택 구성이 복잡하면 반드시 사전에 세무 상담을 받아 요건 충족 여부를 점검하세요.',
  },
];

export default function RuralHouseOneHouseholdExemptionPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '농어촌주택 양도세 특례 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '농어촌주택 양도세 특례 2026, 시골집을 주택 수에서 빼는 법',
    description:
      '일반주택 보유자가 농어촌주택을 취득해 3년 이상 보유하면 일반주택 양도 시 1세대1주택 비과세를 받는 특례. 지역·기준시가 3억(한옥 4억)·면적·취득 순서 요건을 조세특례제한법 §99의4 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['농어촌주택', '양도세 특례', '1세대1주택', '비과세', '시골집'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '농어촌주택 양도세 특례 2026',
    description:
      '농어촌주택 취득 시 일반주택 1세대1주택 비과세를 받는 특례의 요건과 순서를 조세특례제한법 §99의4 기준으로 정리한 가이드.',
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
                    { name: '농어촌주택 양도세 특례 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">주택 보유자 · 세금·부동산 · 8분 읽기 · 2026-08-25</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  농어촌주택 양도세 특례 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 시골집 있어도 1주택 비과세</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  도시에 집 한 채를 가진 상태에서 부모님 고향의 시골집이나 세컨드하우스를 하나 더 마련하면, 순간 2주택자가 되어 도시 집을 팔 때 비과세를 놓치지 않을까 걱정됩니다. 그런데 일정 요건을 갖춘 농어촌주택은 주택 수에서 빼 주는 특례가 있습니다. 이 가이드는 주택 보유자를 위해 어떤 집이 농어촌주택으로 인정되는지, 취득 순서는 왜 중요한지를 조세특례제한법 §99의4 기준으로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">농어촌주택 특례란 무엇인가요?</h2>
                <p>
                  농어촌주택 특례는 일반주택을 보유한 사람이 농어촌주택을 취득해 3년 이상 보유하면, 그 농어촌주택을 소유 주택으로 보지 않아 주택 수에서 제외해 주는 제도입니다(조세특례제한법 §99의4). 그 결과 원래 보유하던 일반주택을 팔 때 소득세법 §89의 1세대1주택 비과세를 적용받을 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">정의: 농어촌주택 특례 (조세특례제한법 §99의4)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    요건을 갖춘 농어촌주택은 주택 수에서 제외. 핵심 수치: 취득 당시 기준시가 3억원 이하(한옥 4억), 대지 660㎡ 이내, 3년 이상 보유.
                  </p>
                </div>
                <p>
                  쉽게 말해, 도시 아파트 1채와 요건을 갖춘 시골집 1채를 함께 가지고 있어도, 도시 아파트를 팔 때는 시골집이 없는 1주택자처럼 비과세를 받을 수 있다는 뜻입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떤 집이 농어촌주택으로 인정되나요?</h2>
                <p>
                  아무 시골집이나 되는 것은 아닙니다. 지역, 면적, 가액 요건을 모두 충족해야 합니다(조세특례제한법 §99의4).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 농어촌주택 요건 (조세특례제한법 §99의4, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">요건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기준</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">지역</td>
                        <td className="p-3">읍·면 등 소재. 수도권·조정대상지역·관광단지 제외</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">대지면적</td>
                        <td className="p-3">660㎡ 이내</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">기준시가(취득 당시)</td>
                        <td className="p-3">주택+부수토지 합계 3억원 이하(한옥 4억원 이하)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">보유기간</td>
                        <td className="p-3">3년 이상</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만, 기준시가 3억원은 취득 당시를 기준으로 판단하며, 제외 지역과 세부 면적·가액 요건은 세법 개정으로 바뀔 수 있습니다. 취득 전에 해당 주택이 요건을 충족하는지 국세청과 관할 지자체를 통해 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">취득 순서가 왜 중요한가요?</h2>
                <p>
                  이 특례에서 가장 많이 실수하는 부분이 순서입니다. 특례 대상 일반주택은 <strong>농어촌주택 취득 전부터 보유하던 집</strong>이어야 합니다(조세특례제한법 §99의4). 즉 일반주택이 먼저, 농어촌주택이 나중이어야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례로 보는 순서 규칙</p>
                  <p className="text-sm text-text-secondary">
                    · 올바른 순서: 2020년 서울 아파트 취득 → 2023년 강원 읍 소재 시골집 취득 → 2026년 서울 아파트 양도. 시골집을 주택 수에서 제외해 비과세 가능.
                    <br />
                    · 잘못된 순서: 2020년 시골집 먼저 취득 → 2023년 서울 아파트 취득. 이 경우 서울 아파트는 농어촌주택 취득 전부터 보유한 집이 아니므로 특례 적용이 어려움.
                  </p>
                </div>
                <p>
                  예외: 상속으로 농어촌주택을 취득하는 등 특수한 경우에는 별도의 판단 기준이 적용될 수 있습니다. 보유 이력이 복잡하면 반드시 사전 상담을 받으세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 사례로 보면 어떻게 되나요?</h2>
                <p>
                  요건을 갖춘 경우 세금이 어떻게 달라지는지 시나리오로 살펴봅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">시나리오. 서울 아파트 + 요건 충족 시골집</p>
                  <p className="text-sm text-text-secondary">
                    · 서울 아파트: 2020년 취득, 2년 이상 보유·거주, 양도가 10억원
                    <br />
                    · 시골집: 2023년 강원 읍 소재, 기준시가 1.5억원, 대지 500㎡, 3년 이상 보유
                    <br />
                    · 특례 적용: 시골집을 주택 수에서 제외 → 서울 아파트는 1세대1주택
                    <br />
                    · 결과: 양도가 10억원은 12억원 이하이므로 서울 아파트 양도차익 전액 비과세 가능
                    <br />
                    <span className="text-xs text-text-tertiary">특례가 없었다면 2주택자로 보아 비과세를 받지 못했을 수 있습니다.</span>
                  </p>
                </div>
                <p>
                  다만, 1세대1주택 비과세는 양도가 12억원 이하까지 전액, 12억원을 초과하면 초과분만 과세되는 구조입니다. 고가주택은 특례를 받아도 초과분에 대한 양도세가 발생하므로 별도 계산이 필요합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">언제까지 취득해야 하나요?</h2>
                <p>
                  조세특례제한법 §99의4는 일정 기간 내에 취득한 농어촌주택에만 적용됩니다. 현재 적용 기한은 2028년 12월 31일까지로 정해져 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>적용 기한은 세법 개정으로 연장되거나 조정될 수 있습니다.</li>
                  <li>취득 시점의 기준시가·지역 요건이 판단 기준이므로, 취득 직전에 최신 규정을 확인해야 합니다.</li>
                  <li>일반주택 양도 계획과 농어촌주택 3년 보유 요건의 시점을 함께 설계하는 것이 중요합니다.</li>
                </ul>
                <p>
                  다만, 요건과 기한은 정책 방향에 따라 바뀔 수 있으므로, 실제 거래 전 국세청과 세무 전문가를 통해 특례 적용 가능 여부를 확정하는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/calculator/capital-gains-tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">주택 양도차익과 세액을 계산해 보세요.</p>
                  </Link>
                  <Link href="/guide/one-household-12-billion-exemption/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">1세대1주택 12억 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">12억 한도와 초과분 과세 구조를 확인하세요.</p>
                  </Link>
                  <Link href="/guide/temporary-two-houses-capital-gains-exemption/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">일시적 2주택 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">이사 등으로 2주택이 된 경우의 비과세 요건.</p>
                  </Link>
                  <Link href="/guide/inherited-house-capital-gains-exemption-5-year-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">상속주택 비과세 특례</div>
                    <p className="mt-1 text-sm text-text-secondary">상속으로 2주택이 된 경우의 주택 수 판단.</p>
                  </Link>
                  <Link href="/guide/self-farming-land-100-percent-exemption/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">자경농지 양도세 감면</div>
                    <p className="mt-1 text-sm text-text-secondary">농지·농어촌 관련 또 다른 세제 혜택.</p>
                  </Link>
                  <Link href="/category/tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·부동산 세금 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 농어촌주택 요건(지역·면적·기준시가), 취득 순서, 3년 보유 사후관리, 적용 기한은 개인 상황과 세법 개정에 따라 달라지므로 거래 전 국세청·세무 전문가와 관할 지자체에서 반드시 확인하세요. 본 콘텐츠는 2026-08-25 기준이며 관련 법령 개정 시 업데이트됩니다. 근거 법조항은 <strong>조세특례제한법 §99의4(농어촌주택 등 취득자에 대한 양도소득세 과세특례), 소득세법 §89(비과세 양도소득)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="농어촌주택 양도세 특례 2026 가이드"
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
