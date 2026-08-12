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

const URL = 'https://calculatorhost.com/guide/resident-registration-move-in-report-2026/';
const DATE_PUBLISHED = '2026-08-13';
const DATE_MODIFIED = '2026-08-13';

export const metadata: Metadata = {
  title: '전입신고 방법·기한 2026, 14일 넘기면 과태료 얼마',
  description:
    '이사하면 14일 이내 전입신고를 해야 합니다. 정부24 온라인 신고 절차, 늦었을 때 최대 5만원 과태료, 세입자라면 확정일자를 함께 받아야 하는 이유를 주민등록법 §16·§40 기준으로 정리했습니다.',
  keywords: [
    '전입신고',
    '전입신고 방법',
    '전입신고 기한',
    '전입신고 과태료',
    '정부24 전입신고',
    '확정일자',
    '주민등록법 16조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '전입신고 방법·기한 2026, 14일 넘기면 과태료 얼마' }],
    title: '전입신고 방법·기한 2026, 온라인 절차와 과태료 완전 정리',
    description: '이사 후 14일 이내 신고. 정부24 온라인 방법, 최대 5만원 과태료, 확정일자 동시 신청 이유.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '전입신고 방법·기한 2026, 온라인 절차와 과태료',
    description: '이사 후 14일 이내 신고, 최대 5만원 과태료. 세입자는 확정일자 동시 신청. 주민등록법 §16.',
  },
};

const FAQ_ITEMS = [
  {
    question: '전입신고는 며칠 안에 해야 하나요?',
    answer:
      '이사한 날부터 14일 이내에 해야 합니다(주민등록법 §16①). 새로운 거주지에 실제로 살기 시작한 날을 기준으로 계산합니다. 기한을 넘기면 과태료가 부과될 수 있으므로 이사 직후 바로 신고하는 것이 좋습니다.',
  },
  {
    question: '전입신고를 안 하면 과태료가 얼마인가요?',
    answer:
      '정당한 사유 없이 14일 이내에 신고하지 않으면 5만원 이하의 과태료가 부과됩니다(주민등록법 §40④). 실제 부과액은 지연 기간에 따라 지자체가 차등 결정하며, 지연이 짧으면 낮게, 길면 상한인 5만원까지 부과됩니다. 자진 납부 시 감경받을 수 있습니다.',
  },
  {
    question: '전입신고는 어떻게 하나요?',
    answer:
      '정부24 웹사이트나 앱에서 온라인으로 하거나, 새 주소지 관할 주민센터를 방문해 할 수 있습니다. 온라인은 본인 인증 후 이전 주소와 새 주소를 입력하고 세대 구성을 선택하면 되며, 보통 당일이나 다음 날 처리됩니다. 방문 신고는 신분증을 지참하세요.',
  },
  {
    question: '전입신고와 확정일자는 무엇이 다른가요?',
    answer:
      '전입신고는 대항력을, 확정일자는 우선변제권을 확보하는 절차로 서로 다릅니다. 전입신고와 실제 거주가 있으면 다음 날부터 대항력이 생겨 집이 팔려도 임차권을 주장할 수 있고, 확정일자를 받으면 경매·공매 시 후순위 권리자보다 보증금을 먼저 돌려받을 수 있습니다. 세입자는 둘 다 받아야 안전합니다.',
  },
  {
    question: '온라인 전입신고가 안 되는 경우도 있나요?',
    answer:
      '있습니다. 미성년자가 세대주가 되는 경우, 기존 세대가 있는 집에 들어가면서 세대주의 확인이 필요한 세대합가 등은 온라인 신고가 제한되어 주민센터를 방문해야 할 수 있습니다. 기존 세대주 동의가 필요한 경우 온라인에서는 별도 확인 절차가 요구됩니다.',
  },
  {
    question: '전입신고를 하면 자동으로 확정일자도 받나요?',
    answer:
      '자동은 아니지만 함께 신청할 수 있습니다. 주민센터 방문 시 임대차계약서를 제시하면 전입신고와 확정일자를 한 번에 처리할 수 있고, 확정일자는 인터넷등기소에서 온라인으로도 받을 수 있습니다. 전입신고만 하고 확정일자를 빠뜨리면 우선변제권이 없으니 주의하세요.',
  },
  {
    question: '전입신고 시 어떤 서류가 필요한가요?',
    answer:
      '방문 신고라면 신고인의 신분증이 필요하고, 세입자가 확정일자를 함께 받으려면 임대차계약서 원본이 필요합니다. 대리 신고 시에는 위임장과 대리인 신분증이 추가로 필요합니다. 온라인 신고는 공동인증서나 간편인증으로 본인 확인을 합니다.',
  },
  {
    question: '전입신고를 하면 집주인에게 통보되나요?',
    answer:
      '집주인에게 별도로 통보되지는 않습니다. 전입신고는 행정기관에 거주지를 등록하는 절차일 뿐이며 임대인의 동의도 필요 없습니다. 세입자의 대항력 확보를 위한 정당한 권리 행사이므로, 임대인이 전입신고를 막을 수는 없습니다.',
  },
];

export default function ResidentRegistrationMoveInReport2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '전입신고 방법·기한 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '전입신고 방법·기한 2026, 온라인 절차와 과태료 완전 정리',
    description:
      '이사 후 14일 이내 전입신고 의무, 정부24 온라인 절차, 최대 5만원 과태료, 세입자의 확정일자 동시 신청과 대항력 확보를 주민등록법 §16·§40 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['전입신고', '과태료', '정부24', '확정일자', '대항력'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '전입신고 방법·기한 2026',
    description:
      '이사 후 14일 이내 전입신고, 온라인 절차, 과태료, 확정일자와 대항력의 관계.',
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
                    { name: '전입신고 방법·기한 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">임차인·이사자 · 8분 읽기 · 2026-08-13</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  전입신고 방법·기한 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 14일 넘기면 과태료 얼마</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이사를 하면 새 주소로 전입신고를 해야 하고, 세입자라면 이 신고가 보증금을 지키는 첫 단추가 됩니다. 이 가이드는 전입신고 기한과 과태료, 정부24 온라인 신고 방법, 그리고 확정일자와 함께 받아야 대항력과 우선변제권을 모두 확보하는 이유를 실전 절차로 정리합니다. 대상 독자는 곧 이사를 앞둔 임차인과 세대 이동자입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전입신고란 무엇이고 왜 중요한가요?</h2>
                <p>
                  전입신고는 새로운 거주지로 이사한 사실을 관할 행정기관에 등록하는 절차입니다. 주민등록법상 세대주나 세대원이 거주지를 옮기면 신고할 의무가 있습니다(주민등록법 §11·§16). 단순한 행정 절차처럼 보이지만, 세입자에게는 보증금을 지키는 법적 방패가 되기 때문에 매우 중요합니다.
                </p>
                <p>
                  전입신고와 실제 거주가 갖춰지면 그다음 날 0시부터 대항력이 생깁니다. 대항력이 있으면 집주인이 바뀌거나 집이 경매로 넘어가도 임차인이 계약 기간과 보증금 반환을 새 소유자에게 주장할 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    기한: 이사한 날부터 14일 이내(주민등록법 §16①).
                    <br />
                    과태료: 미신고 시 5만원 이하(주민등록법 §40④).
                    <br />
                    방법: 정부24 온라인 또는 주민센터 방문.
                    <br />
                    세입자 필수: 전입신고(대항력) + 확정일자(우선변제권) 둘 다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">기한은 며칠이고 넘기면 과태료가 얼마인가요?</h2>
                <p>
                  기한은 이사한 날부터 14일 이내입니다(주민등록법 §16①). 정당한 사유 없이 이 기간에 신고하지 않으면 5만원 이하의 과태료가 부과됩니다(주민등록법 §40④). 실제 금액은 지연 기간에 따라 지자체가 차등 결정합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 전입신고 지연 과태료 (주민등록법 §40, 상한 5만원 범위 내 지자체 차등)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지연 기간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과태료(예시)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신고기한 경과 후 1개월 이하</td>
                        <td className="p-3">약 2만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">1개월 초과 3개월 이하</td>
                        <td className="p-3">약 3만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3개월 초과</td>
                        <td className="p-3">최대 5만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 위 금액은 상한 5만원 범위 안에서 지자체가 정하는 부과기준 예시이며, 지역과 사안에 따라 다를 수 있습니다. 과태료 통지를 받으면 자진 납부 시 일정 비율 감경을 받을 수 있으니, 정확한 금액은 관할 주민센터에 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전입신고 방법, 온라인과 방문 중 어떤 게 편한가요?</h2>
                <p>
                  대부분은 정부24 온라인 신고가 가장 편리합니다. 다만 세대합가나 미성년자 세대주처럼 확인이 필요한 경우에는 주민센터 방문이 확실합니다. 두 방법을 순서대로 정리하면 다음과 같습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 1. 정부24 온라인 신고</p>
                  <p className="text-sm text-text-secondary">
                    정부24(gov.kr)에 로그인 후 전입신고 메뉴로 들어가, 이전 주소와 새 주소를 입력하고 이사 온 사람과 세대 구성을 선택해 신청합니다. 공동인증서나 간편인증으로 본인 확인을 하며, 보통 당일 또는 다음 날 처리됩니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 2. 주민센터 방문 신고</p>
                  <p className="text-sm text-text-secondary">
                    새 주소지 관할 주민센터에 신분증을 지참해 방문하면 즉시 처리됩니다. 세입자는 임대차계약서를 함께 제시해 확정일자까지 한 번에 받는 것이 좋습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전입신고와 확정일자는 어떻게 다른가요?</h2>
                <p>
                  전입신고는 대항력을, 확정일자는 우선변제권을 만들어 주는 서로 다른 장치입니다. 세입자가 보증금을 온전히 지키려면 이 둘을 모두 갖춰야 합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 대항력 vs 우선변제권 (주택임대차보호법 §3·§3의2)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">전입신고(대항력)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">확정일자(우선변제권)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">효과</td>
                        <td className="p-3">새 집주인에게 임차권 주장</td>
                        <td className="p-3">경매 시 보증금 우선 배당</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">요건</td>
                        <td className="p-3">전입신고 + 실제 거주(점유)</td>
                        <td className="p-3">계약서에 확정일자 부여</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">효력 발생</td>
                        <td className="p-3">신고 다음 날 0시</td>
                        <td className="p-3">확정일자 받은 날</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 보증금 2억원 세입자의 이사 첫날 체크리스트</p>
                  <p className="text-sm text-text-secondary">
                    · 잔금 치르고 열쇠 받은 날 = 실제 거주 시작
                    <br />
                    · 같은 날 주민센터에서 전입신고 + 확정일자 동시 신청
                    <br />
                    · 다음 날 0시부터 대항력 발생, 확정일자로 우선변제권 확보
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 이사 당일 두 가지를 함께 처리하면 보증금 보호가 가장 이른 시점에 시작됩니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 전입신고만 하고 확정일자를 빠뜨리면 대항력은 있어도 경매 배당에서 순위가 밀릴 수 있습니다. 반대로 확정일자만 받고 전입신고를 미루면 대항력 발생이 늦어집니다. 두 가지는 반드시 함께 챙기세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">온라인 신고가 막히는 경우와 필요한 서류</h2>
                <p>
                  대부분은 온라인으로 끝나지만, 세대 관계 확인이 필요하면 방문이 요구됩니다. 다음 경우에는 온라인 신고가 제한될 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>세대합가:</strong> 이미 세대주가 있는 집으로 들어가 그 세대의 구성원이 되는 경우, 기존 세대주의 확인이 필요할 수 있습니다.
                  </li>
                  <li>
                    <strong>미성년자 단독 세대주:</strong> 미성년자가 세대주가 되는 신고는 온라인에서 제한될 수 있습니다.
                  </li>
                  <li>
                    <strong>대리 신고:</strong> 본인이 아닌 사람이 신고하면 위임장과 대리인 신분증이 필요하며, 온라인 처리가 어려울 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  예외적으로 확인이 필요한 사안은 관할 주민센터에 전화로 먼저 문의하면 필요한 서류를 정확히 안내받을 수 있습니다. 세입자라면 임대차계약서 원본을 챙겨 확정일자까지 함께 처리하는 것이 효율적입니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/lease-priority-right-fixed-date-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">확정일자·우선변제권</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금을 먼저 돌려받는 우선변제권의 요건.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-right-vs-fixed-date-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세권 vs 확정일자</div>
                    <p className="mt-1 text-sm text-text-secondary">두 제도의 보호 범위와 비용 비교.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-guarantee-insurance-hug-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세보증금 반환보증</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금 사고를 막는 HUG 보증 가입법.</p>
                  </Link>
                  <Link
                    href="/guide/lease-report-system-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주택 임대차 신고제</div>
                    <p className="mt-1 text-sm text-text-secondary">계약 후 30일 이내 신고 의무와 방법.</p>
                  </Link>
                  <Link
                    href="/guide/small-tenant-priority-repayment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">소액임차인 최우선변제</div>
                    <p className="mt-1 text-sm text-text-secondary">일정 보증금 이하는 최우선으로 보호받습니다.</p>
                  </Link>
                  <Link
                    href="/category/real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부동산 계산기 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">전월세 전환·중개수수료·임대수익률.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 법률 조언이 아닙니다. 과태료 부과기준은 지자체별로 다를 수 있고, 대항력·우선변제권의 실제 인정 여부는 개별 임대차 관계에 따라 달라지므로, 정확한 사항은 관할 주민센터 또는 대한법률구조공단 등 전문기관에 확인하세요. 본 콘텐츠는 2026-08-13을 기준으로 작성되었으며, 관련 법령 변경 시 업데이트됩니다. 인용 법조항: 주민등록법 §11(신고의무자), §16(거주지의 이동), §40(과태료), 주택임대차보호법 §3(대항력), §3의2(우선변제권). AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.gov.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">정부24</a>,{' '}
                  <a href="https://www.easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기쉬운 생활법령정보</a>.
                </p>
              </section>

              <ShareButtons
                title="전입신고 방법·기한 2026 가이드"
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