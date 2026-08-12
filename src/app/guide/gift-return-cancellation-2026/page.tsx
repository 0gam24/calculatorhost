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

const URL = 'https://calculatorhost.com/guide/gift-return-cancellation-2026/';
const DATE_PUBLISHED = '2026-08-13';
const DATE_MODIFIED = '2026-08-13';

export const metadata: Metadata = {
  title: '증여 취소 반환 2026, 3개월 안에 돌려주면 세금 0원',
  description:
    '증여했다가 마음이 바뀌면 언제까지 돌려줘야 증여세를 안 낼까요. 신고기한 이내 반환은 처음부터 없던 것, 이후 3개월 내 반환은 반환분만 비과세, 현금 증여는 취소해도 과세되는 규칙을 상속세및증여세법 §4 기준으로 정리했습니다.',
  keywords: [
    '증여 취소',
    '증여재산 반환',
    '증여 반환 세금',
    '증여 취소 3개월',
    '현금 증여 취소',
    '증여세 신고기한',
    '상속세및증여세법 4조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '증여 취소 반환 2026, 3개월 안에 돌려주면 세금 0원' }],
    title: '증여 취소·반환 2026, 언제까지 돌려줘야 증여세가 없나',
    description: '신고기한 내 반환은 처음부터 없던 것, 이후 3개월 내는 반환분만 비과세, 현금은 취소해도 과세.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '증여 취소·반환 2026, 언제까지 돌려줘야 세금이 없나',
    description: '신고기한 내 반환은 무과세, 이후 3개월 내는 반환분만 비과세, 현금은 취소해도 과세. 상증법 §4.',
  },
};

const FAQ_ITEMS = [
  {
    question: '증여를 취소하고 돌려주면 증여세를 안 내나요?',
    answer:
      '시점에 따라 다릅니다. 증여세 신고기한 이내에 재산을 그대로 돌려주면 처음부터 증여가 없었던 것으로 보아 세금이 없습니다(상속세및증여세법 §4④). 다만 현금(금전)은 이 특례에서 제외되며, 신고기한이 지난 뒤 돌려주면 시점에 따라 과세가 달라지므로 기한 관리가 핵심입니다.',
  },
  {
    question: '증여세 신고기한은 언제까지인가요?',
    answer:
      '증여받은 날이 속하는 달의 말일부터 3개월 이내입니다(상속세및증여세법 §68). 예를 들어 3월 10일에 증여받았다면 6월 30일까지가 신고기한입니다. 이 기한 안에 재산을 반환하면 증여 자체가 없었던 것으로 처리됩니다.',
  },
  {
    question: '신고기한이 지난 뒤에 돌려주면 어떻게 되나요?',
    answer:
      '신고기한이 지난 후 3개월 이내(즉 증여일 기준 대략 6개월 이내)에 반환하면, 당초 증여에 대해서는 증여세가 과세되지만 반환하는 행위에 대해서는 증여세를 매기지 않습니다(상속세및증여세법 §4④). 즉 한 번은 과세되고 되돌리는 것에는 추가 과세가 없습니다.',
  },
  {
    question: '6개월이 지난 뒤에 돌려주면요?',
    answer:
      '증여받은 날부터 상당 기간(신고기한 후 3개월)이 지난 뒤 반환하면, 당초 증여와 반환(다시 증여) 양쪽 모두에 대해 증여세가 과세될 수 있습니다. 즉 재산이 오갈 때마다 각각 증여로 보아 두 번 과세될 위험이 있으므로, 되돌릴 생각이면 최대한 빨리 처리해야 합니다.',
  },
  {
    question: '현금을 증여했다가 취소하면 세금이 없나요?',
    answer:
      '아닙니다. 반환 특례에서 금전은 제외되므로, 현금을 증여했다가 돌려받아도 처음부터 없던 것으로 보지 않습니다. 현금은 오간 사실 자체를 증여로 볼 수 있어, 보낼 때와 돌려받을 때 각각 과세될 수 있습니다. 따라서 현금 증여는 실행 전에 신중히 결정해야 합니다.',
  },
  {
    question: '주식을 증여한 뒤 일부를 팔았다면 취소할 수 있나요?',
    answer:
      '받은 재산을 그대로 돌려줘야 반환으로 인정됩니다. 증여받은 주식 중 일부를 매도했다면 원래 재산 그대로가 아니므로 반환특례를 적용받기 어렵습니다. 같은 종목을 다시 사서 넘겨도 원래 받은 그 재산이 아니므로 반환으로 보지 않는 것이 원칙입니다.',
  },
  {
    question: '부동산을 증여했다가 취소하면 취득세는 어떻게 되나요?',
    answer:
      '증여세와 취득세는 별개입니다. 증여로 부동산을 취득하면 취득세가 부과되는데, 증여를 취소해 돌려주더라도 이미 낸 취득세의 환급은 제한될 수 있고 반환 과정에서 취득세가 다시 문제될 수 있습니다. 부동산은 등기까지 얽혀 복잡하므로 실행 전 세무 전문가와 반드시 상담하세요.',
  },
  {
    question: '반환하면 증여세 신고는 어떻게 하나요?',
    answer:
      '신고기한 내 반환으로 증여가 없던 것으로 처리되는 경우라도, 사실관계를 명확히 하기 위해 관련 증빙(반환 계약서, 계좌이체 내역, 등기 회복 서류 등)을 갖추어 두는 것이 안전합니다. 세무서가 사후 확인할 수 있으므로, 반환 시점과 원상회복을 입증할 자료를 보관하세요.',
  },
];

export default function GiftReturnCancellation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '증여 취소 반환 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '증여 취소·반환 2026, 언제까지 돌려줘야 증여세가 없나',
    description:
      '증여세 신고기한 내 반환은 처음부터 없던 것, 이후 3개월 내는 반환분만 비과세, 6개월 초과는 양쪽 과세, 현금은 특례 제외 규칙을 상속세및증여세법 §4·§68 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['증여 취소', '증여재산 반환', '증여세', '신고기한', '현금 증여'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '증여 취소 반환 2026',
    description:
      '증여를 취소하고 재산을 반환할 때 시점별 증여세 과세 규칙과 현금·주식·부동산의 차이.',
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
                    { name: '증여 취소 반환 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">증여 당사자 · 8분 읽기 · 2026-08-13</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  증여 취소 반환 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 3개월 안에 돌려주면 세금 0원</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  자녀에게 부동산을 넘겼는데 마음이 바뀌었거나, 증여세가 예상보다 커서 되돌리고 싶을 때가 있습니다. 증여는 취소할 수 있지만, 언제 돌려주느냐에 따라 세금이 0원일 수도, 두 번 낼 수도 있습니다. 이 가이드는 반환 시점별 과세 규칙과 현금·주식·부동산의 차이를 실제 예시로 정리합니다. 대상 독자는 증여를 되돌리려는 증여자와 수증자입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">증여 취소·반환이란 무엇인가요?</h2>
                <p>
                  증여 취소·반환은 이미 넘긴 재산을 증여자에게 다시 돌려주어 증여를 없던 일로 만드는 것을 말합니다. 세법은 이를 무제한 허용하지 않고, 반환 시점에 따라 과세 여부를 달리 정하고 있습니다(상속세및증여세법 §4④). 핵심은 얼마나 빨리 돌려주느냐입니다.
                </p>
                <p>
                  가장 유리한 것은 증여세 신고기한 안에 원래 재산 그대로 돌려주는 경우로, 이때는 처음부터 증여가 없었던 것으로 봅니다. 반대로 시간이 지날수록 과세 위험이 커지고, 현금은 아예 이 특례에서 제외됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    신고기한 내 반환: 처음부터 없던 것, 세금 0원(상증법 §4④).
                    <br />
                    기한 후 3개월 내: 당초 증여 과세, 반환은 비과세.
                    <br />
                    그 이후 반환: 당초 증여와 반환 모두 과세 위험.
                    <br />
                    현금(금전): 특례 제외, 취소해도 과세될 수 있음.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">언제까지 돌려줘야 세금이 없나요?</h2>
                <p>
                  증여세 신고기한 이내에 돌려주면 세금이 없습니다. 신고기한은 증여받은 날이 속하는 달의 말일부터 3개월입니다(상속세및증여세법 §68). 이 기간 안에 원래 재산 그대로 반환하면 증여가 처음부터 없었던 것으로 보아 증여세가 부과되지 않습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 반환 시점별 증여세 과세 (상속세및증여세법 §4④, 금전 제외)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">반환 시점</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">당초 증여</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">반환(재증여)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신고기한 이내</td>
                        <td className="p-3">과세 안 됨</td>
                        <td className="p-3">과세 안 됨</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">신고기한 후 3개월 이내</td>
                        <td className="p-3">과세</td>
                        <td className="p-3">과세 안 됨</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">그 이후</td>
                        <td className="p-3">과세</td>
                        <td className="p-3">과세 위험</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 위 특례는 금전(현금)에는 적용되지 않습니다. 또한 이미 세무서가 결정·경정한 뒤에는 반환하더라도 특례가 제한될 수 있으므로, 되돌릴 결심이 서면 최대한 빨리 실행하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">시점별로 세금이 얼마나 달라지나요?</h2>
                <p>
                  같은 부동산을 돌려줘도 언제 돌려주느냐에 따라 세금이 크게 달라집니다. 성년 자녀에게 5억원짜리 아파트를 증여한 뒤 되돌리는 상황을 예로 들어 보겠습니다(증여재산공제 5,000만원 적용 가정).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 신고기한 이내(3월 증여, 5월 반환)</p>
                  <p className="text-sm text-text-secondary">
                    · 처리: 처음부터 증여가 없던 것으로 봄
                    <br />
                    · 당초 증여세: 0원, 반환 증여세: 0원
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 신고기한(6월 말) 전에 원상회복하면 세금이 발생하지 않습니다. 단 취득세 등 별도 세목은 확인 필요.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 신고기한 후 3개월 이내(3월 증여, 8월 반환)</p>
                  <p className="text-sm text-text-secondary">
                    · 과세표준: 5억원 − 5,000만원(성년 자녀 공제) = 4억 5,000만원
                    <br />
                    · 당초 증여세: 4억 5,000만원 × 20% − 1,000만원(누진공제) = 8,000만원
                    <br />
                    · 반환 증여세: 0원(반환분은 비과세)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 되돌려도 당초 증여 1회분(약 8,000만원)은 과세됩니다. 반환 자체에는 추가 세금이 없습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 6개월 넘겨 반환(3월 증여, 11월 반환)</p>
                  <p className="text-sm text-text-secondary">
                    · 당초 증여세: 약 8,000만원 과세
                    <br />
                    · 반환(재증여): 다시 증여로 보아 추가 과세 위험
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 시점을 놓치면 오갈 때마다 과세돼 세금이 두 배로 커질 수 있습니다. 위 세액은 증여세율 표에 따른 계산 예시입니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  예외: 위 계산은 다른 사전증여 합산이 없다는 전제이며, 실제로는 10년 내 동일인 증여 합산, 취득세, 부동산 등기 문제가 얽힙니다. 정확한 세액은 개별 상황에 따라 달라집니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">현금과 주식은 왜 다르게 취급되나요?</h2>
                <p>
                  현금은 반환 특례에서 아예 제외됩니다. 계좌로 오간 돈은 흐름을 특정하기 어렵고 대체가 자유로워, 돌려받아도 처음부터 없던 것으로 보지 않기 때문입니다. 그래서 현금 증여는 취소해도 보낼 때와 돌려받을 때 각각 증여로 과세될 수 있습니다.
                </p>
                <p>
                  주식은 받은 재산 그대로 돌려줘야 반환으로 인정됩니다. 증여받은 주식 일부를 팔았다면 원래 재산 그대로가 아니므로 특례를 적용받기 어렵습니다. 같은 종목을 다시 사서 넘겨도 원래 그 재산이 아니라 반환으로 보지 않는 것이 원칙입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>현금:</strong> 특례 제외, 취소해도 과세 위험이 큼.
                  </li>
                  <li>
                    <strong>주식:</strong> 매도 없이 그대로 보유·반환해야 특례 적용 가능.
                  </li>
                  <li>
                    <strong>부동산:</strong> 특례 적용은 가능하나 취득세·등기 회복 문제가 별도로 발생.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 이런 구분은 사안에 따라 해석이 갈릴 수 있으므로, 특히 현금·주식 증여를 되돌리려면 실행 전 세무 전문가와 상담하는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/gift-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">증여재산과 공제를 입력해 세액을 계산.</p>
                  </Link>
                  <Link
                    href="/guide/gift-tax-exemption-limit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여재산공제 한도</div>
                    <p className="mt-1 text-sm text-text-secondary">배우자 6억·자녀 5천만원 등 10년 한도.</p>
                  </Link>
                  <Link
                    href="/guide/gift-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">세율·누진공제·합산 규칙의 기본.</p>
                  </Link>
                  <Link
                    href="/guide/carry-over-basis-spouse-gift-5-10-year/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배우자 증여 이월과세</div>
                    <p className="mt-1 text-sm text-text-secondary">증여 후 양도 시 이월과세 함정 주의.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-vs-gift-tax-comparison-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속 vs 증여 비교</div>
                    <p className="mt-1 text-sm text-text-secondary">어느 쪽이 세금이 적은지 판단 기준.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·증여세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 본문의 세액은 증여세율 표에 따른 계산 예시로, 10년 내 합산·취득세·등기 등 실제 변수에 따라 달라집니다. 반환 특례 적용 여부와 정확한 세액은 반드시 관할 세무서 또는 세무 전문가와 확인하세요. 본 콘텐츠는 2026-08-13을 기준으로 작성되었으며, 관련 법령 변경 시 업데이트됩니다. 인용 법조항: 상속세및증여세법 §4(증여세 과세대상 및 반환특례), §68(증여세 과세표준신고). AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="증여 취소 반환 2026 가이드"
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