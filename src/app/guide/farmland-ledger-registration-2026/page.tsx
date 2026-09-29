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

const URL = 'https://calculatorhost.com/guide/farmland-ledger-registration-2026/';
const DATE_PUBLISHED = '2026-09-30';
const DATE_MODIFIED = '2026-09-30';

export const metadata: Metadata = {
  title: '농지대장 등록 의무 2026, 미신고 과태료 총정리',
  description:
    '농지를 소유·임차한 사람은 임대차 계약 체결·변경·해제 등이 있으면 60일 이내 농지대장 변경신청을 해야 합니다. 미신고 시 최대 300만원, 거짓신고 시 최대 500만원의 과태료가 부과될 수 있습니다. 농지법 §49의2·§64 기준 신청 대상과 절차 정리.',
  keywords: [
    '농지대장',
    '농지대장 등록',
    '농지대장 변경신청',
    '농지원부',
    '농지대장 과태료',
    '농지법 49조의2',
    '농지 임대차 신고',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '농지대장 등록 의무 2026, 미신고 과태료 총정리' }],
    title: '농지대장 등록 의무 2026, 신고 안 하면 과태료 최대 300만원',
    description: '임대차 계약 체결·변경·해제 시 60일 이내 변경신청 의무. 미신고·거짓신고 과태료 기준과 발급 방법 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '농지대장 등록 의무 2026, 미신고 과태료 총정리',
    description: '60일 이내 변경신청 의무, 미신고 최대 300만원·거짓신고 최대 500만원. 농지법 §49의2.',
  },
};

const FAQ_ITEMS = [
  {
    question: '농지대장은 예전 농지원부와 같은 건가요?',
    answer:
      '사실상 같은 제도가 이름과 관리 방식만 바뀐 것입니다. 2022년 8월 17일부터 농지원부가 농지대장으로 명칭이 바뀌면서, 농업인(농가) 단위로 작성하던 방식이 농지 필지 단위로 개편되었습니다. 과거에는 1,000㎡ 이상 농지만 작성 대상이었지만, 지금은 면적과 관계없이 모든 농지가 작성 대상입니다.',
  },
  {
    question: '농지대장 변경신청은 언제까지 해야 하나요?',
    answer:
      '변경 사유가 발생한 날부터 60일 이내입니다(농지법 §49의2). 예를 들어 임대차 계약을 새로 맺거나 해지한 날부터 60일 안에 관할 시·구·읍·면의 장에게 변경신청을 해야 합니다. 기한을 넘기면 정당한 사유가 없는 한 미신고로 분류될 수 있습니다.',
  },
  {
    question: '농지를 빌려서 경작할 때도 임차인이 신고해야 하나요?',
    answer:
      '그렇습니다. 농지법 §49의2는 농지소유자뿐 아니라 임차인도 변경신청 의무자로 규정하고 있습니다. 임대차·사용대차 계약을 체결·변경·해제한 경우 임차인 본인이 직접 신고할 수 있으며, 소유자가 신고를 미루더라도 임차인이 신고해 두는 것이 안전합니다.',
  },
  {
    question: '신고를 안 하면 과태료가 얼마나 나오나요?',
    answer:
      '정당한 사유 없이 신고하지 않으면 위반 횟수에 따라 1차 100만원, 2차 200만원, 3차 300만원까지 과태료가 부과됩니다(농지법 §64, 시행령 별표5). 사실과 다르게 거짓으로 신고한 경우에는 1차 250만원, 2차 350만원, 3차 500만원으로 더 무겁게 부과됩니다.',
  },
  {
    question: '농지대장은 어디서 발급받나요?',
    answer:
      '정부24 홈페이지에서 온라인으로 열람·발급하거나, 농지 소재지 관할 읍·면·동 주민센터를 직접 방문해 신청할 수 있습니다. 소유자·임차인 본인 확인 절차를 거치며, 변경신청도 정부24 온라인 신청 또는 방문 접수 중 선택할 수 있습니다.',
  },
  {
    question: '농지대장에 등록만 하면 자경농지 감면을 받을 수 있나요?',
    answer:
      '농지대장 등록만으로 자경농지 감면이 자동으로 인정되는 것은 아닙니다. 자경농지 양도소득세 감면은 실제 거주(재촌)와 직접 경작(자경) 사실을 종합적으로 입증해야 하며, 농지대장은 그 입증 자료 중 하나로 활용될 뿐입니다. 구체적인 감면 요건은 관련 가이드를 함께 확인하세요.',
  },
  {
    question: '농지가 여러 필지면 하나씩 다 따로 신고해야 하나요?',
    answer:
      '원칙적으로 필지별로 관리되므로 변경 사유가 발생한 필지마다 신고 대상 여부를 확인해야 합니다. 다만 같은 임대차 계약으로 여러 필지를 함께 빌리고 반납하는 경우 등은 접수 창구(정부24 또는 읍·면·동)에서 일괄 처리가 가능한지 문의해 진행 방식을 확인하는 것이 효율적입니다.',
  },
];

export default function FarmlandLedgerRegistration2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '농지대장 등록 의무 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '농지대장 등록 의무 2026, 신고 안 하면 과태료 최대 300만원',
    description:
      '농지대장 변경신청 60일 기한, 신청 대상 사유, 미신고·거짓신고 과태료 기준, 발급 방법을 농지법 §49의2·§64 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['농지대장', '농지원부', '농지법 49조의2', '농지대장 과태료', '농지 임대차 신고'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '농지대장 등록 의무 2026',
    description: '농지대장 변경신청 60일 기한과 미신고 과태료 기준, 발급 방법 정리.',
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
                    { name: '농지대장 등록 의무 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">농지 소유자·임차인 · 7분 읽기 · 2026-09-30</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  농지대장 등록 의무 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 미신고 과태료 총정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  농지를 소유하거나 빌려서 경작하는 사람은 임대차 계약을 새로 맺거나 끝낼 때 정해진 기한 안에 농지대장 변경신청을 해야 합니다. 이 가이드는 농지대장의 신고 대상 사유, 60일 신청 기한, 미신고·거짓신고 시 과태료 기준, 발급·신청 방법을 실제 사례와 함께 정리합니다. 대상 독자는 농지 소유자와 임차인입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 농지대장이란 무엇인가요?</h2>
                <p>
                  농지대장은 개별 농지(필지)마다 소유자·임차인·이용 현황을 국가가 관리하는 공적 장부입니다. 2022년 8월 17일부터 기존 농지원부가 농지대장으로 이름이 바뀌면서, 농업인 단위로 작성하던 방식이 필지 단위로 개편되었고 면적과 관계없이 모든 농지가 작성 대상이 되었습니다.
                </p>
                <p>
                  과거 농지원부는 1,000㎡ 이상 농지를 경작하는 농가만 작성했기 때문에, 소규모 텃밭이나 주말농장 수준의 농지는 관리 대상에서 빠져 있었습니다. 다만, 농지대장으로 개편된 뒤에도 모든 필지가 자동으로 등록되는 것은 아니며, 소유자·임차인이 변경신청을 해야 최신 정보로 유지됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 필지별로 소유·이용 현황을 관리하는 공적 장부(구 농지원부).
                    <br />
                    신청 기한: 사유 발생일부터 60일 이내(농지법 §49의2).
                    <br />
                    미신고 과태료: 최대 300만원, 거짓신고 최대 500만원(농지법 §64).
                    <br />
                    신청처: 정부24 온라인 또는 관할 읍·면·동 주민센터.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">농지대장 변경신청, 언제까지 해야 하나요?</h2>
                <p>
                  변경 사유가 발생한 날부터 60일 이내에 관할 시·구·읍·면의 장에게 신청해야 합니다(농지법 §49의2). 사유 발생일은 계약서상 계약 체결일·해지일 등 실제 변경이 일어난 날짜를 기준으로 계산합니다.
                </p>
                <p>
                  다만, 재해나 질병 등 정당한 사유로 기한 안에 신청하지 못한 경우에는 과태료 부과 단계에서 감경 사유로 고려될 수 있습니다. 정당한 사유를 인정받으려면 진단서나 재해 확인서 등 객관적 증빙을 함께 제출하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 어떤 경우에 변경신청 대상인가요?</h2>
                <p>
                  가장 흔한 대상은 농지의 임대차·사용대차 계약이 새로 체결되거나 변경·해제되는 경우입니다(농지법 §49의2제1항제1호). 임대인이든 임차인이든 계약 당사자 어느 쪽이나 신고할 수 있습니다.
                </p>
                <p>
                  그 밖에 농작물 경작지나 다년생식물 재배지에 농축산물 생산시설을 새로 설치하는 경우도 신고 대상입니다(같은 항 제2호). 이 두 가지 외에 농림축산식품부령으로 정하는 사유도 포함되므로, 소유·이용 현황에 변화가 생겼다면 관할 읍·면·동에 신고 대상 여부를 먼저 확인하는 것이 안전합니다.
                </p>
                <p className="mt-4">
                  다만, 단순히 작물 품종을 바꾸거나 일시적으로 휴경하는 정도는 통상 변경신청 대상으로 보지 않습니다. 신고 대상인지 애매한 경우 관할 행정청에 문의 후 처리하는 편이 과태료 위험을 줄이는 방법입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 신고하지 않으면 과태료가 얼마인가요?</h2>
                <p>
                  정당한 사유 없이 변경신청을 하지 않으면 위반 횟수에 따라 최대 300만원까지 과태료가 부과됩니다. 사실과 다르게 거짓으로 신고한 경우에는 더 무거운 기준이 적용되어 최대 500만원까지 부과될 수 있습니다(농지법 §64, 시행령 별표5).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 농지대장 변경신청 위반 시 과태료 부과기준 (농지법 시행령 별표5)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">위반 유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">1차 위반</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">2차 위반</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">3차 이상 위반</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">미신고(정당한 사유 없이 미신청)</td>
                        <td className="p-3">100만원</td>
                        <td className="p-3">200만원</td>
                        <td className="p-3">300만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">거짓신고</td>
                        <td className="p-3">250만원</td>
                        <td className="p-3">350만원</td>
                        <td className="p-3">500만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 실제 부과 금액은 위반 경위와 정황에 따라 시행령상 기준 내에서 감경될 수 있습니다. 법정 상한이 항상 그대로 부과되는 것은 아니므로, 신고가 늦었더라도 사유를 소명할 자료를 준비해 두는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">농지대장은 어떻게 발급·신청하나요?</h2>
                <p>
                  정부24 홈페이지에서 온라인으로 열람·발급하거나 농지 소재지 관할 읍·면·동 주민센터를 방문해 신청할 수 있습니다. 변경신청 역시 같은 창구에서 온라인 또는 방문 접수 중 선택할 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>
                    <strong>변경 사유 확인:</strong> 임대차 계약 체결·변경·해제, 생산시설 설치 등 신고 대상 사유가 발생했는지 확인합니다.
                  </li>
                  <li>
                    <strong>서류 준비:</strong> 임대차계약서 등 변경 사실을 증빙할 서류를 준비합니다.
                  </li>
                  <li>
                    <strong>신청:</strong> 정부24 온라인 신청 또는 농지 소재지 관할 읍·면·동 주민센터 방문 접수 중 하나를 선택합니다.
                  </li>
                  <li>
                    <strong>처리 확인:</strong> 접수 후 반영된 농지대장을 다시 열람·발급해 변경 사항이 정확히 기재됐는지 확인합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만, 온라인 신청 시 본인인증 수단(공동인증서 등)이 필요하므로 준비되지 않았다면 방문 접수가 더 빠를 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 농지대장이 세금 문제와도 연결되나요?</h2>
                <p>
                  그렇습니다. 농지대장은 자경농지 양도소득세 감면이나 비사업용 토지 판정 시 재촌·자경 사실을 뒷받침하는 참고 자료로 활용될 수 있습니다. 다만 농지대장 등록 자체가 감면 요건을 자동으로 충족시켜 주는 것은 아니며, 실제 거주·경작 사실이 함께 입증돼야 합니다.
                </p>
                <p>
                  다만, 농지대장 정보가 실제 이용 현황과 다르면 오히려 세무조사나 감면 배제 과정에서 불리하게 작용할 수 있습니다. 임대차 계약을 변경했는데도 신고하지 않고 방치하면 과태료뿐 아니라 세제 혜택 입증 단계에서도 불이익으로 이어질 수 있으므로, 변경 즉시 신고해 두는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/self-farming-land-100-percent-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자경농지 8년 100% 감면</div>
                    <p className="mt-1 text-sm text-text-secondary">농지대장이 입증 자료로 쓰이는 자경 감면 요건 정리.</p>
                  </Link>
                  <Link
                    href="/guide/non-business-land-heavy-taxation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">비사업용 토지 중과 판정</div>
                    <p className="mt-1 text-sm text-text-secondary">재촌·자경 입증 자료로 농지대장이 어떻게 쓰이는지 확인.</p>
                  </Link>
                  <Link
                    href="/guide/farmland-pension-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">농지연금 가입조건</div>
                    <p className="mt-1 text-sm text-text-secondary">농지 소유·이용 현황이 연금 가입심사에 미치는 영향.</p>
                  </Link>
                  <Link
                    href="/calculator/capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">농지 양도 시 예상 세액을 직접 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/property-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">보유 중인 농지·부동산의 재산세를 확인해보세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·재산세·종합부동산세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 실제 신고 대상 여부와 과태료 부과 수준은 개별 사안의 위반 경위·정황에 따라 달라질 수 있으므로, 정확한 확인은 농지 소재지 관할 읍·면·동 또는 정부24를 통해 하시기 바랍니다. 본 콘텐츠는 2026-09-30을 기준으로 작성되었으며, 관련 법령 개정 시 업데이트됩니다. 인용 법조항: 농지법 §49(농지대장의 작성과 비치), §49의2(농지이용 정보 등 변경신청), §64(과태료), 농지법 시행령 별표5(과태료의 부과기준).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기쉬운 생활법령정보</a>,{' '}
                  <a href="https://www.gov.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">정부24</a>.
                </p>
              </section>

              <ShareButtons
                title="농지대장 등록 의무 2026 가이드"
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
