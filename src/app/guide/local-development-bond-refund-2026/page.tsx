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

const URL = 'https://calculatorhost.com/guide/local-development-bond-refund-2026/';
const DATE_PUBLISHED = '2026-08-05';
const DATE_MODIFIED = '2026-08-05';

export const metadata: Metadata = {
  title: '자동차 채권 환급금 조회·신청 2026, 지역개발채권·도시철도채권',
  description:
    '자동차 살 때 의무로 매입한 지역개발채권·도시철도채권은 만기 후 돌려받을 수 있습니다. 잠자는 미환급금이 2,391억원. 채권 종류별 만기와 소멸시효, 금고은행 조회·신청 방법을 단계별로 정리했습니다.',
  keywords: [
    '자동차 채권 환급금',
    '지역개발채권 환급',
    '도시철도채권 환급',
    '채권 미환급금 조회',
    '자동차 공채 환급',
    '채권 소멸시효',
    '도시철도법 20조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '자동차 채권 환급금 조회·신청 2026, 지역개발채권·도시철도채권' }],
    title: '자동차 채권 환급금 조회·신청 2026',
    description: '자동차 등록 때 산 지역개발·도시철도채권 만기 환급. 만기·소멸시효·금고은행 조회 방법.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '자동차 채권 환급금 조회·신청 2026',
    description: '지역개발채권 5년·소멸시효 10년, 도시철도채권 7년·소멸시효 5년. 금고은행에서 조회.',
  },
};

const FAQ_ITEMS = [
  {
    question: '자동차 채권 환급금이 정확히 무엇인가요?',
    answer:
      '자동차를 등록할 때 의무로 매입한 지역개발채권 또는 도시철도채권을 만기 후 되돌려받는 돈입니다. 지방자치단체는 자동차 신규·이전 등록, 각종 인허가, 지자체와의 계약 시 일정액의 채권을 사도록 하는데, 이 채권이 만기가 되면 원금과 약정 이자를 상환합니다. 다만 자동으로 계좌에 들어오지 않는 경우가 많아 신청하지 않으면 그대로 잠들어 있습니다.',
  },
  {
    question: '내가 안 찾아간 환급금이 있는지 어떻게 아나요?',
    answer:
      '해당 지방자치단체의 금고은행에서 조회하면 됩니다. 대부분의 광역시·도는 농협은행이 금고이고, 서울은 신한은행 등 지역마다 다릅니다. 2022년 3월부터는 은행에 직접 가지 않아도 해당 은행 인터넷뱅킹이나 앱에서 본인 인증 후 미상환 채권을 조회하고 환급 신청까지 할 수 있습니다.',
  },
  {
    question: '지역개발채권과 도시철도채권은 무엇이 다른가요?',
    answer:
      '발행 지역과 만기, 소멸시효가 다릅니다. 지역개발채권은 서울·부산·대구를 제외한 16개 광역시·도가 발행하며 5년 만기 일시상환에 소멸시효는 10년입니다. 도시철도채권은 서울·부산·대구가 발행하며 7년 만기 일시상환에 소멸시효는 5년입니다. 즉 도시철도채권은 시효가 더 짧아 방치하면 더 빨리 권리가 사라집니다.',
  },
  {
    question: '소멸시효가 지나면 정말 못 받나요?',
    answer:
      '원칙적으로 소멸시효가 지나면 청구권이 사라집니다. 지역개발채권은 상환일부터 10년, 도시철도채권은 5년이 지나면 받기 어렵습니다. 다만 시효 기산점과 중단 사유는 사안마다 다를 수 있으므로, 오래된 채권이라도 우선 금고은행에 조회해 상환 가능 여부를 확인하는 것이 좋습니다.',
  },
  {
    question: '채권을 살 때 바로 팔면(즉시 매도) 어떻게 되나요?',
    answer:
      '즉시 매도하면 만기 환급금은 없지만 목돈 부담을 줄일 수 있습니다. 채권을 만기까지 보유하면 5~7년 뒤 원금과 이자를 받지만, 그동안 자금이 묶입니다. 반대로 매입과 동시에 은행에 되팔면 소액의 할인 비용만 부담하고 끝납니다. 이 경우에는 나중에 돌려받을 환급금이 없으므로, 본인이 즉시 매도했는지 만기 보유했는지 먼저 확인해야 합니다.',
  },
  {
    question: '환급금은 얼마나 되나요?',
    answer:
      '차량 가격과 등록 지역에 따라 다릅니다. 배기량이 크고 등록지의 매입률이 높을수록 채권 매입액이 커지고 환급액도 커집니다. 고가 차량을 서울 등에서 등록하면 수백만원, 소형차를 지방에서 등록하면 수십만원 수준인 사례가 알려져 있습니다. 정확한 금액은 본인 채권의 매입액과 이자에 따라 결정되므로 금고은행 조회로 확인해야 합니다.',
  },
  {
    question: '가족 명의나 예전에 판 차량도 조회되나요?',
    answer:
      '본인 명의로 매입한 채권이라면 차량을 이미 처분했어도 조회·환급 대상입니다. 채권 상환 청구권은 채권을 산 사람에게 있으므로, 차를 팔았더라도 매입 당시 명의자가 본인이면 청구할 수 있습니다. 가족 명의 채권은 해당 명의자 본인이 인증해 조회해야 하며, 상속 등 특수한 경우에는 은행에 별도 서류를 확인하세요.',
  },
];

export default function LocalDevelopmentBondRefund2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '자동차 채권 환급금' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '자동차 채권 환급금 조회·신청 2026, 지역개발채권·도시철도채권 완전 정리',
    description:
      '자동차 등록 때 의무 매입한 지역개발채권·도시철도채권의 만기 환급 방법. 채권 종류별 만기(5년·7년)와 소멸시효(10년·5년), 금고은행 조회·신청 절차, 실제 환급액 예시.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['자동차 채권', '지역개발채권', '도시철도채권', '미환급금', '소멸시효'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '자동차 채권 환급금 조회·신청 2026',
    description:
      '지역개발채권·도시철도채권 만기 환급 방법과 소멸시효, 금고은행 조회 절차 정리.',
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
                    { name: '자동차 채권 환급금' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">자동차 소유자 · 8분 읽기 · 2026-08-05</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  자동차 채권 환급금 조회·신청 2026
                  <br />
                  <span className="text-2xl text-text-secondary">지역개발채권·도시철도채권 돌려받기</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 글은 자동차를 등록한 적이 있는 모든 운전자를 위해 씁니다. 차를 살 때 알게 모르게 사둔 지역개발채권이나 도시철도채권이 만기가 되면 원금과 이자를 돌려받을 수 있는데, 신청하지 않아 잠자고 있는 미환급금이 전국에 2,391억원(행정안전부 집계)이나 됩니다. 채권 종류별 만기와 소멸시효, 어느 은행에서 조회하는지, 어떻게 신청하는지를 순서대로 알려드립니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 자동차 채권 환급금이란 무엇인가요?</h2>
                <p>
                  자동차를 등록할 때 의무로 산 채권을 만기 후 돌려받는 돈입니다. 지방자치단체는 지역 개발이나 도시철도 재원을 마련하기 위해, 자동차 신규·이전 등록을 하거나 인허가를 받을 때 일정액의 채권을 사도록 강제합니다. 이 채권은 만기가 되면 원금과 약정 이자를 상환하는데, 상당수가 신청 없이 방치돼 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary list-disc ml-5">
                    <li>차량 등록 때 산 채권을 만기 후 원금·이자로 환급</li>
                    <li>지역개발채권: 16개 시·도, 5년 만기, 소멸시효 10년</li>
                    <li>도시철도채권: 서울·부산·대구, 7년 만기, 소멸시효 5년</li>
                    <li>조회·신청: 해당 지자체 금고은행(대부분 농협, 서울은 신한 등)</li>
                    <li>2022년 3월부터 은행 방문 없이 온라인 조회·신청 가능</li>
                  </ul>
                </div>
                <p>
                  근거 법령은 도시철도채권의 경우 도시철도법 §20 등, 지역개발채권의 경우 지방자치단체 기금관리기본법과 지방재정법, 각 시·도 조례입니다. 채권 매입 의무와 상환 조건은 지자체 조례로 정해지므로 지역마다 세부 내용이 조금씩 다릅니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 지역개발채권과 도시철도채권은 어떻게 다른가요?</h2>
                <p>
                  발행 주체와 만기, 소멸시효가 다릅니다. 내가 어느 지역에서 차를 등록했는지에 따라 어떤 채권을 샀는지, 언제까지 청구할 수 있는지가 갈립니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 지역개발채권 vs 도시철도채권 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지역개발채권</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">도시철도채권</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">발행 지역</td>
                        <td className="p-3">서울·부산·대구 제외 16개 시·도</td>
                        <td className="p-3">서울·부산·대구</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">만기(일시상환)</td>
                        <td className="p-3">5년</td>
                        <td className="p-3">7년</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">소멸시효</td>
                        <td className="p-3">10년</td>
                        <td className="p-3">5년</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">근거</td>
                        <td className="p-3">지방자치단체 기금관리기본법·조례</td>
                        <td className="p-3">도시철도법</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 위 만기·시효는 일반적인 기준이며, 지자체 조례 개정으로 세부 조건이 달라질 수 있습니다. 본인 채권의 정확한 상환일과 시효는 금고은행 조회 화면에서 확인하는 것이 정확합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">채권 환급 신청 단계별 절차</h2>
                <p>
                  온라인 기준으로 다음 순서를 따르면 됩니다. 대부분 10분 내에 조회와 신청이 끝납니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">1단계. 금고은행 확인</p>
                  <p className="text-sm text-text-secondary">
                    차량을 등록한 시·도의 금고은행을 확인합니다. 대부분 농협은행이며, 서울은 신한은행 등 지역마다 다릅니다. 잘 모르면 등록 지자체 홈페이지의 &quot;시금고&quot; 또는 &quot;도금고&quot; 안내를 확인하세요.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">2단계. 인터넷뱅킹·앱 로그인 후 조회</p>
                  <p className="text-sm text-text-secondary">
                    해당 은행 인터넷뱅킹이나 앱에서 &quot;공채&quot; 또는 &quot;미상환 채권&quot; 메뉴를 찾아 본인 인증 후 조회합니다. 매입 이력과 상환 가능 금액이 표시됩니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">3단계. 환급 계좌 지정·신청</p>
                  <p className="text-sm text-text-secondary">
                    상환 대상 채권이 있으면 본인 명의 계좌를 입력하고 환급을 신청합니다. 신청이 접수되면 보통 수 영업일 내 지정 계좌로 입금됩니다.
                  </p>
                </div>
                <p className="mt-4">
                  예외: 오래되어 온라인에서 조회되지 않거나 상속 등 명의 문제가 얽힌 채권은 은행 창구 방문과 추가 서류가 필요할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 실제 환급액은 얼마나 되나요?</h2>
                <p>
                  차량 가격과 등록 지역의 매입률에 비례합니다. 채권 매입액은 보통 차량 가액에 지역별 매입률을 곱해 정해지고, 만기 환급액은 그 원금에 약정 이자를 더한 금액입니다. 아래는 이해를 돕기 위한 예시로, 실제 금액은 본인 채권 내역에 따라 달라집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 고가 대형차, 매입률 높은 지역</p>
                  <p className="text-sm text-text-secondary">
                    · 채권 매입 원금: 약 200만원(예시)
                    <br />
                    · 만기 보유(5~7년) 후 원금 + 약정 이자 환급
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 배기량·차량가가 클수록, 매입률 높은 지역일수록 환급액이 큼.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 소형차, 매입률 낮은 지역</p>
                  <p className="text-sm text-text-secondary">
                    · 채권 매입 원금: 약 20만~40만원(예시)
                    <br />
                    · 만기 보유 후 원금 + 소액 이자 환급
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 금액은 작아도 신청하지 않으면 그대로 소멸되므로 조회는 필수.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 매입과 동시에 즉시 매도한 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 등록 당시 채권을 바로 되팔아 소액 할인비만 부담
                    <br />
                    · 만기 환급 대상 아님(돌려받을 원금 없음)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 즉시 매도했다면 환급금이 없으니 매입·보유 여부부터 확인.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 놓치기 쉬운 함정은 무엇인가요?</h2>
                <p>
                  가장 큰 함정은 &quot;자동 입금&quot;이라는 오해입니다. 만기가 되어도 자동으로 계좌에 들어오지 않는 경우가 많아, 본인이 조회하고 신청해야 받습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>소멸시효 방치:</strong> 도시철도채권은 소멸시효가 5년으로 짧습니다. 만기 후 방치하면 청구권이 사라질 수 있으니 서둘러 조회하세요.
                  </li>
                  <li>
                    <strong>과거 차량 누락:</strong> 이미 처분한 차량의 채권도 매입 당시 본인 명의였다면 환급 대상입니다. 최근 차뿐 아니라 예전 차량 등록분도 조회해 보세요.
                  </li>
                  <li>
                    <strong>지역 혼동:</strong> 여러 지역에서 차를 등록했다면 각 지역 금고은행을 따로 조회해야 합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 시효 기산점이나 명의 이전, 상속이 얽힌 사안은 은행마다 처리 기준이 다를 수 있으므로, 오래된 채권일수록 창구에 직접 문의해 확인하는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/vehicle-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자동차세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">배기량으로 연간 자동차세를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/vehicle-acquisition-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자동차 취득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">차량 구입 시 내는 취득세율과 계산법.</p>
                  </Link>
                  <Link
                    href="/guide/national-housing-bond-purchase-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민주택채권 매입·환급</div>
                    <p className="mt-1 text-sm text-text-secondary">부동산 등기 때 사는 채권의 즉시 매도·환급 원리.</p>
                  </Link>
                  <Link
                    href="/guide/car-installment-vs-lease-vs-rent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자동차 할부·리스·렌트 비교</div>
                    <p className="mt-1 text-sm text-text-secondary">구입 방식별 총비용과 세금 차이를 비교하세요.</p>
                  </Link>
                  <Link
                    href="/guide/vehicle-tax-prepayment-refund-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자동차세 연납 환급</div>
                    <p className="mt-1 text-sm text-text-secondary">차량 처분 시 미리 낸 자동차세 돌려받기.</p>
                  </Link>
                  <Link
                    href="/category/finance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 금융 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">대출·예적금·환급 관련 가이드 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 금융·법률 조언이 아닙니다. 채권 매입 의무, 만기, 소멸시효, 매입률은 지방자치단체 조례와 발행 조건에 따라 지역마다 다르므로, 본인 채권의 정확한 상환 가능 금액과 시효는 해당 지자체 금고은행에서 반드시 확인하세요. 근거 법령은 <strong>도시철도법 §20</strong> 등과 <strong>지방자치단체 기금관리기본법</strong>, 지방재정법 및 각 시·도 조례입니다. 미환급금 규모(2,391억원)는 행정안전부 발표 기준이며, 본 콘텐츠는 2026-08-05 기준입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(도시철도법)</a>,{' '}
                  <a href="https://www.law.go.kr/LSW/main.html" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국가법령정보센터(지방자치단체 기금관리기본법)</a>, 행정안전부 보도자료.
                </p>
              </section>

              <ShareButtons
                title="자동차 채권 환급금 조회·신청 2026 가이드"
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
