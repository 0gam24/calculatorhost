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

const URL = 'https://calculatorhost.com/guide/inheritance-real-estate-appraisal-vs-official-price-2026/';
const DATE_PUBLISHED = '2026-08-17';
const DATE_MODIFIED = '2026-08-17';
// [revenue-lever: indexing+traffic]

export const metadata: Metadata = {
  title: '상속 부동산 감정평가 vs 공시가격 2026, 어느 쪽이 유리할까',
  description:
    '상속 부동산을 공시가격으로 신고하면 상속세는 줄지만 나중에 팔 때 양도세가 커집니다. 감정평가로 취득가액을 높이는 절세 전략과 국세청 감정평가 사업 위험을 상증세법 60·61·66조로 정리했습니다.',
  keywords: [
    '상속 부동산 감정평가',
    '상속세 공시가격 신고',
    '감정평가 양도세 절세',
    '상속 취득가액',
    '꼬마빌딩 감정평가',
    '시가 평가 6개월',
    '상속세및증여세법 60조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '상속 부동산 감정평가 vs 공시가격 2026' }],
    title: '상속 부동산 감정평가 vs 공시가격 2026',
    description:
      '공시가로 신고하면 상속세는 줄지만 양도세 폭탄. 감정평가로 취득가액을 높이는 절세 전략과 국세청 감정평가 위험.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '상속 부동산 감정평가 vs 공시가격',
    description: '공시가 신고는 상속세↓ 양도세↑. 감정평가는 상속세↑ 양도세↓. 상증세법 §60·§61·§66.',
  },
};

const FAQ_ITEMS = [
  {
    question: '상속 부동산은 공시가격으로 신고해도 되나요?',
    answer:
      '시가가 없으면 공시가격 등 보충적 평가로 신고할 수 있습니다(상증세법 §61). 다만 상속세 평가는 시가주의가 원칙이므로(§60), 평가기간 안에 매매·감정·경매 등 시가로 볼 가액이 있으면 그 시가로 평가해야 합니다. 공시가격은 시가가 확인되지 않을 때의 대체 수단입니다.',
  },
  {
    question: '공시가로 신고하면 무엇이 문제인가요?',
    answer:
      '상속세는 줄지만 나중에 팔 때 양도세가 커집니다. 상속받은 부동산의 취득가액은 상속 당시 평가액이 되는데(소득세법 §97), 공시가로 낮게 신고하면 취득가액이 낮아져 양도차익이 커지고 양도소득세가 늘어납니다. 상속세와 양도세를 합친 총부담으로 판단해야 합니다.',
  },
  {
    question: '감정평가를 받으면 세금이 줄어드나요?',
    answer:
      '상속세 부담이 없거나 낮은 경우에 유리합니다. 배우자공제·일괄공제 등으로 상속세가 0이거나 적으면, 감정평가로 취득가액을 높여도 상속세 증가가 거의 없고 나중에 양도세를 크게 줄일 수 있습니다. 반대로 상속세율이 높은 구간이면 감정평가가 오히려 불리할 수 있습니다.',
  },
  {
    question: '시가로 인정되는 기간이 정해져 있나요?',
    answer:
      '상속은 상속개시일 전후 6개월 이내의 매매·감정·경매가액 등이 시가로 인정됩니다(상증세법 시행령 §49). 증여는 증여일 전 6개월부터 후 3개월까지입니다. 이 기간 안의 감정평가를 받아야 상속재산 평가액으로 인정받을 수 있으므로 시점 관리가 중요합니다.',
  },
  {
    question: '국세청이 공시가 신고를 감정평가로 다시 매길 수 있나요?',
    answer:
      '가능합니다. 국세청은 꼬마빌딩·상가·다가구주택 등 기준시가와 시가 차이가 큰 부동산에 대해 감정평가를 의뢰해 시가로 과세를 강화하고 있습니다(평가심의위원회 심의). 공시가로 낮게 신고했다가 감정평가로 상속세가 추징될 수 있으므로, 고가 수익형 부동산은 사전 검토가 필요합니다.',
  },
  {
    question: '감정평가는 몇 곳에서 받아야 하나요?',
    answer:
      '기준시가 10억원 이하 부동산은 감정평가 1곳도 시가로 인정되며, 그 초과는 원칙적으로 2곳 이상의 감정가액 평균을 씁니다(상증세법 시행령). 감정평가 수수료가 들지만, 절감되는 양도세가 더 크면 충분히 남는 선택입니다. 유불리는 반드시 계산해 보세요.',
  },
  {
    question: '상속세를 안 내도 감정평가가 필요한가요?',
    answer:
      '오히려 그때가 감정평가의 핵심 활용 시점입니다. 상속공제로 상속세가 0이면 감정평가로 취득가액을 시가까지 높여도 추가 상속세가 없고, 향후 양도세만 크게 줄어듭니다. 상속세가 없다고 공시가로 대충 신고하면 나중에 양도세로 돌아오니 주의하세요.',
  },
];

export default function InheritanceRealEstateAppraisal2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '상속 부동산 감정평가 vs 공시가격 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '상속 부동산 감정평가 vs 공시가격 2026, 어느 쪽이 유리할까',
    description:
      '상속 부동산 평가 방식의 선택. 공시가격 신고의 양도세 부담, 감정평가로 취득가액을 높이는 절세, 국세청 감정평가 사업 위험을 상증세법 §60·§61·§66 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['상속 부동산', '감정평가', '공시가격', '취득가액', '양도세 절세', '시가 평가'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '상속 부동산 감정평가 vs 공시가격 2026',
    description:
      '상속 부동산을 공시가와 감정평가 중 어느 값으로 신고할지, 상속세와 양도세를 합친 총부담으로 판단하는 실전 가이드.',
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
                    { name: '상속 부동산 감정평가 vs 공시가격 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">상속인 · 9분 읽기 · 2026-08-17</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  상속 부동산 감정평가 vs 공시가격 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 어느 쪽이 유리할까</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  부모님의 집이나 상가를 상속받았을 때, 상속세 신고를 공시가격으로 할지 감정평가로 할지가 세금을 크게 가릅니다. 이 글은 부동산을 상속받았거나 곧 받을 상속인을 위해 준비했습니다. 공시가로 신고하면 당장 상속세는 줄지만 나중에 팔 때 양도세가 커지는 구조, 감정평가로 취득가액을 높이는 절세 전략, 그리고 국세청이 공시가 신고를 감정평가로 뒤집는 위험까지 상속세및증여세법 조문을 근거로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">30초 요약</h2>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심만 먼저</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary list-disc ml-5">
                    <li>상속세 평가는 시가주의가 원칙(상증세법 §60), 시가 없으면 공시가 등 보충평가(§61).</li>
                    <li>상속 취득가액 = 상속 당시 평가액(소득세법 §97). 낮게 신고하면 양도세↑.</li>
                    <li>상속세 0~낮은 구간이면 감정평가로 취득가액을 높이는 게 유리.</li>
                    <li>시가 인정기간: 상속 전후 6개월(증여 전6·후3개월, 시행령 §49).</li>
                    <li>꼬마빌딩·상가는 국세청 감정평가로 추징 위험, 사전 검토 필수.</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상속 부동산은 공시가격으로 신고해도 되나요?</h2>
                <p>
                  시가가 없을 때만 그렇습니다. 상속세및증여세법 §60은 상속재산을 상속개시일 현재의 시가로 평가하도록 정합니다. 시가란 불특정 다수 사이에 자유롭게 거래될 때 성립하는 가액으로, 평가기간 안의 매매가액·감정가액·수용·경매·공매가액과 유사재산 매매사례가액을 포함합니다.
                </p>
                <p>
                  시가가 확인되지 않을 때 비로소 §61의 보충적 평가방법이 적용됩니다. 토지는 개별공시지가, 주택은 공동주택가격·개별주택가격 등 기준시가로 평가하는 것입니다. 즉 공시가격 신고는 시가가 없을 때의 대체 수단이지, 자유롭게 고를 수 있는 선택지가 아닙니다.
                </p>
                <p>
                  다만 아파트처럼 유사 매매사례가 풍부한 부동산은 사실상 시가가 존재하므로 공시가로 낮게 신고하기 어렵습니다. 반대로 단독주택·상가·토지처럼 거래가 드문 부동산은 시가 확인이 어려워 공시가 신고 여지가 생깁니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공시가로 신고하면 무엇이 문제인가요?</h2>
                <p>
                  나중에 팔 때 양도세가 커집니다. 상속받은 부동산을 양도할 때 취득가액은 상속 당시의 평가액으로 잡힙니다(소득세법 §97). 공시가로 낮게 신고하면 취득가액이 낮아지고, 이후 양도가와의 차이인 양도차익이 커져 양도소득세가 늘어납니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">두 세금은 연결돼 있다</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    상속세를 아끼려 취득가액을 낮추면, 그만큼 미래의 양도차익이 커집니다. 결국 상속세와 양도세를 합친 총부담으로 비교해야 정확합니다. 특히 상속공제로 상속세가 0이면, 공시가 신고는 아무 이득 없이 양도세만 키우는 결과가 됩니다.
                  </p>
                </div>
                <p>
                  따라서 판단 기준은 단순합니다. 상속세율과 미래 양도세율 중 어느 쪽이 높은지, 그리고 상속세를 지금 낼지 양도세를 나중에 낼지의 시점 문제입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">감정평가를 받으면 세금이 줄어드나요?</h2>
                <p>
                  상속세가 없거나 낮을 때 크게 유리합니다. 아래 사례로 확인해 보겠습니다. 배우자공제·일괄공제 등으로 상속세가 0인 상황을 가정합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 상속세 0, 이후 양도 (공시가 6억 vs 감정 10억)</p>
                  <p className="text-sm text-text-secondary">
                    · 상속 당시 공시가 6억원, 감정평가 10억원, 상속공제로 상속세 0원 가정
                    <br />
                    · 5년 뒤 12억원에 양도(장기보유특별공제 등은 생략한 단순 비교)
                    <br />
                    · 공시가 신고(취득가 6억): 양도차익 = 12억 - 6억 = <strong>6억원</strong>
                    <br />
                    · 감정평가(취득가 10억): 양도차익 = 12억 - 10억 = <strong>2억원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">상속세가 0이므로 감정평가로 취득가액을 높이면 양도차익이 6억에서 2억으로 줄어 양도세가 크게 절감됩니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 상속세가 높은 구간이면 신중히</p>
                  <p className="text-sm text-text-secondary">
                    · 상속재산이 커서 상속세 한계세율이 40~50% 구간이라면
                    <br />
                    · 감정평가로 4억을 올리면 상속세가 즉시 크게 증가
                    <br />
                    · 반면 양도세는 미래에, 세율·장기보유공제·비과세 여지가 있어 부담이 다를 수 있음
                    <br />
                    <span className="text-xs text-text-tertiary">이 경우 감정평가가 오히려 불리할 수 있으므로, 상속세 증가분과 양도세 절감분을 반드시 비교 계산해야 합니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공시가 신고와 감정평가, 무엇이 다른가요?</h2>
                <p>
                  두 방식의 손익 방향을 표로 비교합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 상속 부동산 평가 방식 비교 (상증세법 §60·§61)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공시가격 신고</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">감정평가 신고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">평가액</td>
                        <td className="p-3">낮음(기준시가)</td>
                        <td className="p-3">시가에 근접(높음)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">상속세</td>
                        <td className="p-3">낮음</td>
                        <td className="p-3">높음</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">향후 양도세</td>
                        <td className="p-3">높음(취득가↓)</td>
                        <td className="p-3">낮음(취득가↑)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">유리한 경우</td>
                        <td className="p-3">계속 보유·상속세율 높을 때</td>
                        <td className="p-3">상속세 0~낮고 양도 계획 있을 때</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 이 표는 방향일 뿐입니다. 실제 유불리는 상속공제 규모, 예상 양도 시점, 장기보유특별공제, 1세대1주택 비과세 여부에 따라 달라지므로 개별 계산이 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">국세청이 공시가 신고를 뒤집을 수 있나요?</h2>
                <p>
                  네, 감정평가로 다시 매길 수 있습니다. 국세청은 기준시가와 실제 시가의 차이가 큰 꼬마빌딩·상가·다가구주택 등에 대해, 과세관청이 직접 감정평가를 의뢰하고 평가심의위원회 심의를 거쳐 그 감정가액을 시가로 보아 과세를 강화하고 있습니다.
                </p>
                <p>
                  실질과세 원칙(국세기본법 §14)의 연장선입니다. 겉으로 공시가로 신고했더라도 시가와 현저히 차이가 나면, 국세청은 명목이 아니라 실질 가치를 기준으로 과세합니다. 공시가로 낮게 신고했다가 나중에 상속세가 추징되고 가산세까지 붙을 수 있습니다.
                </p>
                <p>
                  다만 모든 부동산이 대상은 아닙니다. 감정평가 사업은 주로 고가 수익형 부동산에 집중되므로, 그런 부동산을 상속받았다면 처음부터 감정평가 신고를 검토하는 편이 안전합니다. 반대로 소액·저가 부동산은 공시가 신고가 실무상 무난할 수 있습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/inheritance-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">상속재산과 공제를 넣어 상속세를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">세율·공제·과세표준의 기본을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/spouse-inheritance-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배우자 상속공제</div>
                    <p className="mt-1 text-sm text-text-secondary">상속세를 0으로 만드는 핵심 공제.</p>
                  </Link>
                  <Link
                    href="/guide/inherited-house-capital-gains-exemption-5-year-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속주택 양도세 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">상속주택을 팔 때 비과세 특례 조건.</p>
                  </Link>
                  <Link
                    href="/guide/capital-gains-converted-acquisition-value-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도세 환산취득가액</div>
                    <p className="mt-1 text-sm text-text-secondary">취득가액이 불분명할 때의 계산법.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">상속세·증여세·양도세·취득세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 감정평가와 공시가 신고의 유불리는 상속공제 규모, 양도 시점, 장기보유특별공제, 비과세 여부에 따라 크게 달라지므로, 실제 신고 전 감정평가법인·세무 전문가와 상담해 총부담을 계산하세요. 본 콘텐츠는 2026-08-17 기준이며 관련 법령 개정 시 업데이트됩니다. 인용 조항: 상속세및증여세법 <strong>§60(평가의 원칙)·§61(부동산 보충적 평가)·§66(저당권 설정 재산 평가특례)</strong>, 같은 법 시행령 <strong>§49(시가의 범위·평가기간)</strong>, 소득세법 <strong>§97(양도 취득가액)</strong>, 국세기본법 <strong>§14(실질과세)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="상속 부동산 감정평가 vs 공시가격 2026 가이드"
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
