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

const URL = 'https://calculatorhost.com/guide/virtual-asset-tax-2027/';
const DATE_PUBLISHED = '2026-07-10';
const DATE_MODIFIED = '2026-07-10';

export const metadata: Metadata = {
  title: '가상자산(코인) 과세 2027 | 250만 공제·22% 과세·현재 비과세',
  description:
    '2027년 1월부터 시행 예정인 가상자산 소득세. 250만원 기본공제, 22% 분리과세, 의제취득가액. 현재(2026)는 비과세 상태. 소득세법 §21 기타소득.',
  keywords: [
    '가상자산 과세 2027',
    '코인 세금',
    '암호화폐 과세',
    '기타소득 22%',
    '소득세법 21조',
    '250만 공제',
    '가상자산 양도소득',
    '2027년 시행',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '가상자산(코인) 과세 2027 | 250만 공제·22% 과세·현재 비과세' }],
    title: '가상자산(코인) 과세 2027 — 250만 공제 후 22% 분리과세 시행 예정',
    description: '2027년 1월부터 개인 가상자산 양도·대여 소득을 기타소득으로 과세. 250만원 기본공제, 22% 분리과세. 현재는 비과세 상태.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '가상자산 과세 2027 — 250만 공제 후 22% 분리과세',
    description: '2027.1.1 시행 예정. 현재(2026)는 비과세. 250만 공제, 20% 소득세 + 2% 지방소득세.',
  },
};

const FAQ_ITEMS = [
  {
    question: '지금 코인을 팔면 세금을 내야 하나요?',
    answer:
      '아니요, 현재(2026)는 개인의 가상자산 양도차익에 대한 세금이 없습니다. 2027년 1월 1일부터 과세가 시행될 예정이므로, 그 전에는 코인 매매 차익이 비과세입니다.',
  },
  {
    question: '2027년부터 코인 차익에 몇 %의 세금이 붙나요?',
    answer:
      '2027년 1월 1일부터 기타소득으로 분류되어 22% 분리과세됩니다(소득세 20% + 지방소득세 2%). 250만원까지는 공제되므로, 차익이 250만원 이하면 세금이 없습니다.',
  },
  {
    question: '250만 공제는 매년 적용되나요?',
    answer:
      '네, 250만원 기본공제는 매년 적용됩니다. 2027년에 코인 차익 600만원이 발생하면 (600−250)×22% = 약 77만원의 세금을 냅니다. 다음해 2028년에도 새로 250만원이 공제됩니다.',
  },
  {
    question: '2027년 이전에 산 코인은 어떻게 되나요?',
    answer:
      '2027년 1월 1일 이전에 취득한 코인에는 의제취득가액(當日 시가 vs 실제 취득가 중 큰 금액)이 적용됩니다. 즉, 2027년 이후 매도 시 2026년 12월 31일의 시가를 취득가로 인정해 과세표준을 계산합니다.',
  },
  {
    question: '다음해에 5월에 신고를 해야 하는 건가요?',
    answer:
      '네, 가상자산 소득은 기타소득이므로 분리과세되지만, 다른 소득이 있으면 다음해 5월 종합소득세 신고 시 함께 신고해야 합니다. 가상자산 소득만 있으면 별도 신고 대상이 될 수 있으므로 국세청에 확인하세요.',
  },
  {
    question: '2027년 시행이 다시 연기될 가능성이 있나요?',
    answer:
      '현재(2026.7)까지는 2027년 1월 1일 시행이 정책 방향입니다만, 과거 2회 유예된 이력이 있으므로 정책 변화가 있을 수 있습니다. 국세청 공식 발표나 법령 개정 소식을 주기적으로 확인하는 것을 추천합니다.',
  },
  {
    question: '국내 거래소와 해외 거래소의 과세 대상이 다르나요?',
    answer:
      '현재 정책 방향은 개인의 모든 가상자산 양도·대여 소득을 과세 대상으로 하고 있습니다. 다만 과세 범위, 국내 거래소 자료제출, 해외 거래소 세무 처리 등 세부 사항은 시행 전에 국세청이 추가 지침을 낼 수 있으므로, 공식 공지를 기다려야 합니다.',
  },
  {
    question: 'NFT도 가상자산 과세 대상인가요?',
    answer:
      '현재 발표된 정책상 가상자산의 범위에 NFT가 포함될 가능성이 높습니다만, 아직 구체적인 시행령이 확정되지 않았습니다. NFT 거래 수익이 있다면 국세청 공식 발표를 주기적으로 확인하는 것이 필요합니다.',
  },
];

export default function VirtualAssetTax2027Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '가상자산(코인) 과세 2027' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '가상자산(코인) 과세 2027 — 250만 공제 후 22% 분리과세 시행 예정',
    description:
      '2027년 1월부터 시행 예정인 가상자산 소득세. 250만원 기본공제, 22% 분리과세, 의제취득가액. 현재(2026)는 비과세 상태. 소득세법 §21 기타소득 기준.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['가상자산 과세', '코인 세금', '기타소득', '250만 공제', '22% 분리과세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '가상자산(코인) 과세 2027',
    description:
      '2027년 시행 예정 가상자산 소득세의 정확한 과세 방식, 공제, 계산법, 현재 비과세 상태 정리.',
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
                    { name: '가상자산(코인) 과세 2027' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">코인 투자자 · 9분 읽기 · 2026-07-10</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  가상자산(코인) 과세 2027
                  <br />
                  <span className="text-2xl text-text-secondary">— 250만 공제·22% 분리과세·현재 비과세</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  한국의 가상자산(암호화폐) 과세 제도는 2027년 1월 1일부터 본격 시행될 예정입니다. 현재(2026) 개인의 코인 양도차익은 비과세이지만, 내년부터는 기타소득으로 분류되어 250만원 공제 후 22% 분리과세가 됩니다. 이 가이드는 현재 상황, 2027년 과세 체계, 실제 계산 방법, 그리고 준비사항까지 완전히 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-virtual-asset-tax-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">현재(2026): 가상자산 양도차익은 비과세</h2>
                <p>
                  지금(2026년 7월 현재) 개인이 코인이나 가상자산을 사고팔 때 발생하는 이익(양도차익)에 대한 세금은 **없습니다**. 소득세 과세 대상이 아니므로, 매매로 얻은 차익에 대해 세금을 보고할 필요가 없는 상태입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">2026년 현황 — 비과세 상태</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    개인이 가상자산(코인, 암호화폐)을 거래하여 얻은 차익: <strong>세금 없음</strong>
                    <br />
                    신고할 의무 없음 · 세금 납부 불필요 · 이는 정책 결정에 따른 한시적 상태
                  </p>
                </div>
                <p className="mt-4">
                  이런 비과세 상태가 지속되어 온 이유는 가상자산 시장 성숙도, 국제적 과세 기준, 기술적 관리 체계 등을 고려한 정부의 정책 결정입니다. 하지만 2027년부터는 이 상황이 바뀝니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 국내 거래소의 대면거래 확인, 자금세탁방지(AML) 규제, 금융감시 강화 등은 이미 진행 중입니다. 비과세라고 해서 완전한 무규제는 아니라는 점을 기억하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2027년 1월 1일부터: 기타소득 22% 과세</h2>
                <p>
                  2027년 1월 1일부터 개인의 가상자산 양도소득과 대여소득이 소득세법 §21에 따른 **기타소득**으로 분류되어 분리과세됩니다. 구체적인 세율과 공제는 다음과 같습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 2027년 가상자산 과세 체계 (소득세법 §21 기타소득, 현재 정책 방향)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">과세 대상</td>
                        <td className="p-3">개인의 가상자산 양도소득, 대여소득</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">과세 분류</td>
                        <td className="p-3">기타소득 (분리과세)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">기본공제</td>
                        <td className="p-3"><strong>250만원</strong> (매년 적용)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">세율</td>
                        <td className="p-3"><strong>22%</strong> (소득세 20% + 지방소득세 2%)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신고</td>
                        <td className="p-3">다음해 5월 종합소득세 신고 (다른 소득과 함께)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">구체적 시행일</td>
                        <td className="p-3"><strong>2027년 1월 1일 시행 예정</strong> (정책 변화 가능)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  기타소득 22%는 분리과세이므로, 다른 소득(근로소득, 사업소득 등)과는 별도로 계산됩니다. 즉, 회사 월급의 세율과는 무관하게 가상자산 소득은 고정 22% 세율이 적용됩니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 현재(2026.7)의 정책 방향이며, 시행 전까지 국세청의 추가 지침, 시행령 개정, 또는 재유예 가능성이 있습니다. 국세청 공식 발표를 주기적으로 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">250만원 기본공제의 의미</h2>
                <p>
                  기타소득의 기본공제는 연간 소득액에서 공제되는 금액입니다. 가상자산 소득에도 250만원 기본공제가 적용되므로, 차익이 250만원 이하면 세금이 없습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">공제 계산식</p>
                  <p className="text-sm text-text-secondary">
                    과세표준 = 가상자산 양도차익 − 250만원
                    <br />
                    과세표준이 0 이하면 세금은 0
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 차익 200만원 (비과세)</p>
                  <p className="text-sm text-text-secondary">
                    양도차익: 200만원
                    <br />
                    과세표준: 200만 − 250만 = <strong>−50만원</strong>
                    <br />
                    세액: <strong>0원</strong> (0 이하이므로 세금 없음)
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 차익 600만원</p>
                  <p className="text-sm text-text-secondary">
                    양도차익: 600만원
                    <br />
                    과세표준: 600만 − 250만 = <strong>350만원</strong>
                    <br />
                    세액: 350만 × 22% = <strong>77만원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 차익 1,000만원</p>
                  <p className="text-sm text-text-secondary">
                    양도차익: 1,000만원
                    <br />
                    과세표준: 1,000만 − 250만 = <strong>750만원</strong>
                    <br />
                    세액: 750만 × 22% = <strong>165만원</strong>
                  </p>
                </div>
                <p className="mt-4">
                  이 250만원 공제는 **매년 새로 적용됩니다**. 2027년에 600만원 이익을 얻으면 77만원 세금을 내지만, 2028년에 다시 200만원의 공제를 받을 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2027년 이전 취득분: 의제취득가액</h2>
                <p>
                  2027년 1월 1일 이전에 구입한 가상자산을 2027년 이후에 판매할 때는 특별한 규칙이 적용됩니다. 바로 **의제취득가액**입니다.
                </p>
                <p className="mt-4">
                  의제취득가액은 실제 취득가액과 2026년 12월 31일의 시장 시가(公正市場價格) 중 **더 큰 금액**을 취득가로 인정하는 제도입니다. 즉, 코인 가격이 오를 경우 12월 31일 시가를 기준으로 취득가를 재계산합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">의제취득가액 예시</p>
                  <p className="text-sm text-text-secondary">
                    · 코인 A를 2025년 1월에 100만원에 구입
                    <br />
                    · 2026년 12월 31일 시가: 300만원
                    <br />
                    · 2027년 6월에 500만원에 판매
                    <br />
                    <br />
                    양도차익 계산:
                    <br />
                    실제 취득가: 100만원 vs 12/31 시가: 300만원
                    <br />
                    → <strong>의제취득가액 = max(100만, 300만) = 300만원</strong>
                    <br />
                    → 과세표준 = 500만 − 300만 − 250만(공제) = <strong>−50만원</strong>
                    <br />
                    → 세금: 0원
                  </p>
                </div>
                <p className="mt-4">
                  이 규칙의 의도는 2027년 이전의 이익에 대해서는 소급 과세하지 않겠다는 정책입니다. 12월 31일 시가를 기준으로 "여기까지는 비과세로 인정한다"는 뜻입니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 12월 31일 시가를 정확히 어떻게 산정할지(국내 거래소 기준인지, 국제 거래소 기준인지, 가중평균인지)는 시행령에서 구체화될 예정입니다. 국세청 공식 발표를 기다려야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2027년 시행 시간표와 준비사항</h2>
                <p>
                  가상자산 소득세는 2027년 1월 1일부터 시행되며, 이에 따른 신고 시간표는 다음과 같습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">시간표</p>
                  <ul className="ml-6 list-disc space-y-2 text-sm text-text-secondary">
                    <li><strong>2027년 1월 1일:</strong> 가상자산 소득세 시행 시작. 이 날부터 발생하는 모든 가상자산 소득이 과세 대상</li>
                    <li><strong>2027년 연중:</strong> 코인 매매 기록 정리. 수익/손실 계산</li>
                    <li><strong>2028년 5월 31일:</strong> 2027년 소득에 대한 종합소득세 신고 기한</li>
                    <li><strong>2028년 6월:</strong> 소득세 납부</li>
                  </ul>
                </div>
                <p className="mt-4">
                  지금부터 할 수 있는 준비:
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>거래 기록 보관:</strong> 국내·해외 거래소의 모든 매매 기록(구입가, 판매가, 구입일, 판매일)을 스크린샷이나 다운로드로 보관하세요. 2027년 신고 시 필요합니다.
                  </li>
                  <li>
                    <strong>수익 계산 엑셀 준비:</strong> 매년 수익을 계산하는 엑셀이나 간단한 장부를 준비하면 신고할 때 수월합니다.
                  </li>
                  <li>
                    <strong>국세청 공식 발표 확인:</strong> 시행 전까지 국세청(nts.go.kr)은 세부 지침, 신고 서식, FAQ를 발표할 예정입니다. 주기적으로 확인하세요.
                  </li>
                  <li>
                    <strong>세무사 상담:</strong> 규모가 크거나 복잡한 거래가 있다면 이 시점에 전문가 상담을 받는 것도 좋은 준비입니다.
                  </li>
                </ul>
              </section>

              <AdSlot slot="guide-virtual-asset-tax-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">과거 2회 유예와 현 상황</h2>
                <p>
                  가상자산 과세 제도는 처음 **2022년 시행 예정**이었습니다. 하지만 시장 성숙도, 기술 준비, 국제 기준 등을 이유로 2회 연기되었습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>1차 유예 (2022 → 2023):</strong> 첫 시행일을 2023년으로 연기</li>
                  <li><strong>2차 유예 (2023 → 2025 → 2027):</strong> 다시 2025년으로 예정했다가 최종 2027년 1월 1일로 확정</li>
                </ul>
                <p className="mt-4">
                  현재(2026년 7월)는 2027년 1월 1일 시행이 공식 방침이지만, 과거 2회 유재 이력 때문에 **3차 유예 가능성이 있다는 점**을 인식해야 합니다. 금융 시장 상황, 정부 정책 변화, 기술 준비 상황에 따라 일정이 다시 변경될 수 있습니다.
                </p>
                <p className="mt-4">
                  따라서 2027년 시행을 기준으로 준비하되, 2026년 말(12월)까지 국세청 최종 공식 발표가 있는지 반드시 확인하세요.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 이 가이드는 현재(2026.7) 정책 방향을 기반으로 작성되었습니다. 실제 시행 전에 국세청이 발표하는 시행령, 법령 개정안, 종합소득세 신고 서식 등을 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세부 정책 미확정 사항</h2>
                <p>
                  2027년 시행을 위해 아직 국세청이 명확히 하지 않은 부분들이 있습니다. 이들은 시행 전까지 추가 지침으로 발표될 예정입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>국내 거래소 vs 해외 거래소:</strong> 국내 거래소는 자료 제출 의무가 있을 예정이지만, 해외 거래소는 어떻게 처리할지 명확하지 않습니다.
                  </li>
                  <li>
                    <strong>손실 공제:</strong> 올해 손실이 나면 내년 이익과 상계할 수 있을지, 아니면 올해만 인정할지 미정입니다.
                  </li>
                  <li>
                    <strong>NFT의 범위:</strong> NFT(대체불가능토큰)가 과세 대상 가상자산에 포함되는지 명확하지 않습니다.
                  </li>
                  <li>
                    <strong>스테이킹 수익:</strong> 가상자산 스테이킹(보유 기간 보상)이 "대여소득"에 포함되는지, "기타소득"인지 분류가 미정입니다.
                  </li>
                  <li>
                    <strong>거래소 폐지 시:</strong> 국내 거래소가 폐지되거나 해외 거래소가 서비스를 중단했을 때 12월 31일 시가 산정 방법이 어떻게 될지 미정입니다.
                  </li>
                </ul>
                <p className="mt-4">
                  이런 미확정 사항들은 **시행령**(국세청)과 **시행 규칙**(기획재정부)에서 구체화될 예정입니다. 2026년 10~11월경에 발표될 가능성이 높습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/capital-gains-tax-5-steps/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 완벽 정리</div>
                    <p className="mt-1 text-sm text-text-secondary">소득세법 기타소득 과세 개념을 다른 자산 양도와 비교하세요.</p>
                  </Link>
                  <Link
                    href="/guide/financial-income-comprehensive-vs-separate-taxation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">분리과세 vs 종합과세</div>
                    <p className="mt-1 text-sm text-text-secondary">기타소득 분리과세의 의미를 다른 소득과 비교 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/dividend-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배당소득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">분리과세 기타소득과 유사한 배당소득의 세율을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세 등 다양한 세금을 한 곳에서 확인하세요.</p>
                  </Link>
                  <Link
                    href="/calculator/capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">2027년 가상자산 세율이 도입되면 업데이트될 예정입니다.</p>
                  </Link>
                  <Link
                    href="/guide/overseas-stock-capital-gains-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">해외주식 양도세</div>
                    <p className="mt-1 text-sm text-text-secondary">해외 자산 거래의 과세 체계를 참고하세요.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 현재(2026년 7월) 정책 방향을 정리한 것입니다. 2027년 가상자산 소득세는 아직 시행되지 않았으며, 최종 시행일, 세부 규칙, 신고 방법 등은 국세청이 시행 전에 발표하는 시행령, 시행 규칙, 공식 FAQ에 따라 변경될 수 있습니다. 개인 맞춤형 세무 조언이 아니므로, 실제 신고 시에는 반드시 국세청(nts.go.kr) 공식 발표나 세무사 상담을 통해 확인하세요. 특히 해외 거래소 거래, 스테이킹, NFT 등 세부 범위는 아직 미정이므로, 2026년 중 국세청 최종 지침을 기다려야 합니다. 본 콘텐츠는 2026-07-10 기준으로 작성되었으며, 정책 변화 시 즉시 업데이트됩니다. 가상자산 과세의 법적 근거는 <strong>소득세법 §21(기타소득)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터 (law.go.kr)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 (nts.go.kr)</a>,{' '}
                  <a href="https://www.moef.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">기획재정부 (moef.go.kr)</a>.
                </p>
              </section>

              <ShareButtons
                title="가상자산(코인) 과세 2027 가이드"
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
