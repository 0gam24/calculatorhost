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

const URL = 'https://calculatorhost.com/guide/borrowed-name-account-taxation-2026/';
const DATE_PUBLISHED = '2026-09-21';
const DATE_MODIFIED = '2026-09-21';

export const metadata: Metadata = {
  title: '차명계좌 적발 시 증여세·가산세 2026, 얼마나 나올까',
  description:
    '가족 명의를 빌려 만든 차명계좌는 금융정보분석원 정보와 국세청 전산 분석으로 드러납니다. 적발되면 원금에 증여세, 무신고가산세 최대 40%, 납부지연가산세가 함께 붙고 금융실명법 위반 형사처벌까지 받을 수 있습니다. 국세기본법 §14, 상속세및증여세법 §45 기준으로 정리했습니다.',
  keywords: [
    '차명계좌',
    '차명계좌 증여세',
    '차명계좌 적발',
    '차명계좌 세무조사',
    '금융실명법 처벌',
    '증여추정',
    '실질과세원칙',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '차명계좌 적발 시 증여세·가산세 2026, 얼마나 나올까' }],
    title: '차명계좌 적발 시 증여세·가산세 2026',
    description:
      '차명계좌 적발 시 증여세·무신고가산세 최대 40%·납부지연가산세·금융실명법 형사처벌까지. 국세기본법 §14, 상증법 §45 기준.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '차명계좌 적발 시 증여세·가산세 2026',
    description: '적발되면 증여세, 무신고가산세 최대 40%, 납부지연가산세, 금융실명법 형사처벌까지. 상증법 §45 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '차명계좌에 가족 생활비만 넣어놔도 증여세가 나오나요?',
    answer:
      '실제로 생활비로 소비되는 돈이라면 증여세 대상이 아닙니다(상속세및증여세법 §46). 다만 생활비 명목으로 받은 돈을 쓰지 않고 예금이나 투자로 쌓아 두면 실질과세원칙(국세기본법 §14)에 따라 증여로 볼 수 있습니다. 통장 잔액이 커질수록 소명 부담도 커집니다.',
  },
  {
    question: '차명계좌인지 국세청이 어떻게 알아내나요?',
    answer:
      '국세청은 금융정보분석원(KoFIU)의 의심거래·고액현금거래 정보와 자체 전산 분석망을 함께 활용해 계좌 명의자와 실제 자금 흐름의 불일치를 찾아냅니다. 상속·증여세 조사나 부동산 취득자금 출처조사 과정에서 관련 차명계좌가 함께 드러나는 경우도 많습니다.',
  },
  {
    question: '배우자 명의 계좌에 돈을 옮기면 무조건 증여세인가요?',
    answer:
      '아닙니다. 부부 공동생활비나 배우자가 실제로 자유롭게 쓰고 관리하는 자금은 증여로 보지 않는 경우가 많습니다. 다만 원래 소유자가 계속 관리·인출하면서 명의만 배우자로 해둔 것이라면 차명계좌로 판단되어 증여세가 부과될 수 있습니다. 배우자 증여재산공제는 10년간 6억 원입니다.',
  },
  {
    question: '차명계좌가 적발되면 형사처벌도 함께 받나요?',
    answer:
      '불법 목적의 차명거래라면 세금과 별개로 형사처벌 대상입니다. 금융실명거래 및 비밀보장에 관한 법률 §3③·§6①에 따라 실소유자와 명의를 빌려준 사람 모두 5년 이하 징역 또는 5천만원 이하 벌금에 처해질 수 있고, 징역과 벌금이 함께 부과(병과)될 수 있습니다.',
  },
  {
    question: '뒤늦게라도 자진 신고하면 가산세가 줄어드나요?',
    answer:
      '그렇습니다. 세무조사 통지를 받기 전에 스스로 기한후신고나 수정신고를 하면 국세기본법 §48에 따라 무신고·과소신고 가산세를 감면받을 수 있습니다. 법정신고기한이 지난 뒤 경과 기간이 짧을수록 감면율이 높으며, 1개월 이내 수정신고는 90%까지 감면됩니다.',
  },
  {
    question: '차명주식도 이 글의 가산세 기준과 같은가요?',
    answer:
      '가산세율 구조는 같지만 과세 근거 조문이 다릅니다. 차명계좌 같은 예금채권은 등기·등록이 필요 없는 재산이라 재산취득자금의 증여추정(상속세및증여세법 §45①)이 적용되고, 주식처럼 등기·등록이 필요한 재산은 명의신탁재산의 증여의제(§45의2)가 적용됩니다.',
  },
  {
    question: '차명계좌 자금출처는 어떻게 소명하나요?',
    answer:
      '급여명세서, 사업소득 신고서, 예금 인출 내역, 차용증, 부동산 매도대금 영수증 등 실제 자금 출처를 증빙하는 자료를 제시하면 됩니다. 국세청 내부 기준인 증여추정 배제기준 금액 미만이면 별도 소명 없이도 증여추정 규정이 적용되지 않습니다.',
  },
];

export default function BorrowedNameAccountTaxation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '차명계좌 적발 시 증여세·가산세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '차명계좌 적발 시 증여세·가산세 2026, 얼마나 나올까',
    description:
      '차명계좌가 적발되면 증여세 본세, 무신고·과소신고가산세, 납부지연가산세가 함께 부과되고 금융실명법 위반 형사처벌까지 받을 수 있습니다. 국세기본법 §14, 상속세및증여세법 §45·§48 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['차명계좌', '증여세', '가산세', '실질과세원칙', '금융실명법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '차명계좌 적발 시 증여세·가산세 2026',
    description:
      '차명계좌 증여세 과세 근거, 적발 경로, 무신고·과소신고·납부지연가산세, 부과제척기간, 금융실명법 형사처벌까지 정리.',
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
                    { name: '차명계좌 적발 시 증여세·가산세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금 · 8분 읽기 · 2026-09-21</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  차명계좌 적발 시 증여세·가산세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 얼마나 나올까</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  가족이나 지인 명의로 만든 차명계좌는 언젠가 국세청 전산 분석과 금융정보분석원 정보로 드러날 가능성이 있습니다. 이 가이드는 차명계좌에 증여세가 부과되는 법적 근거, 실제 적발 경로, 무신고·과소신고·납부지연가산세 규모, 부과제척기간, 금융실명법 위반 시 형사처벌까지 실제 사례와 함께 정리합니다. 대상 독자는 가족 명의 계좌를 자금 관리에 쓰고 있거나 쓸 계획인 사람입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">차명계좌란 무엇이고 왜 문제가 되나요?</h2>
                <p>
                  차명계좌란 실제 자금의 소유자가 아닌 다른 사람의 이름으로 개설해 운용하는 예금계좌를 말합니다. 절세나 재산 은닉, 금융소득 종합과세 회피, 채권자의 강제집행 회피 등을 목적으로 배우자·자녀·부모·지인 명의를 빌려 쓰는 경우가 흔합니다. 문제는 명의만 빌린 것이라도 세법과 금융 관련 법률은 실제 자금의 흐름과 지배관계를 기준으로 판단한다는 점입니다.
                </p>
                <p>
                  단순히 가족 계좌에 생활비를 이체하거나 용돈을 주는 것과, 실질 소유자가 인출·운용 권한을 계속 쥔 채 명의만 옮겨 둔 차명계좌는 전혀 다르게 취급됩니다. 후자는 국세기본법 §14의 실질과세원칙에 따라 명의가 아니라 실제 자금 관리자를 기준으로 세금이 다시 계산될 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 실제 소유자가 아닌 타인 명의로 개설·운용하는 예금계좌.
                    <br />
                    과세 근거: 국세기본법 §14 실질과세원칙, 상속세및증여세법 §45① 증여추정.
                    <br />
                    적발 시 부담: 증여세 본세 + 무신고·과소신고가산세(최대 40%) + 납부지연가산세.
                    <br />
                    주의: 불법 목적이면 금융실명법 위반으로 형사처벌 대상.
                  </p>
                </div>
                <p className="mt-4">
                  다만 부모가 미성년 자녀 명의로 소액 저축을 들어주는 것처럼 사회통념상 자연스러운 범위의 자금 이동까지 전부 차명계좌로 문제 삼는 것은 아닙니다. 판단 기준은 항상 실제 지배·관리 주체가 누구인가입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">차명계좌에 넣은 돈에 왜 증여세가 나오나요?</h2>
                <p>
                  차명계좌에 자금이 입금되면 원칙적으로 그 명의자가 재산을 취득한 것으로 봅니다. 명의자의 직업·나이·소득·재산 상태로 볼 때 스스로 그 자금을 마련했다고 보기 어렵고 출처를 소명하지 못하면, 상속세및증여세법 §45①에 따라 그 자금은 증여받은 것으로 추정되어 증여세 과세 대상에 포함됩니다.
                </p>
                <p>
                  이때 핵심은 소명 책임이 명의자에게 있다는 점입니다. 급여·사업소득 신고 내역, 기존 예금 인출 기록, 차용증 등으로 자금의 실제 출처를 밝히지 못하면 전액 증여로 추정되어 과세됩니다. 반대로 출처가 명확히 소명되면 증여세가 부과되지 않습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 증여추정 배제기준 (국세청 훈령, 취득일·상환일 전 10년 이내 합계액)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세대주 연령</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">주택 취득</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">그 외 재산·채무상환 총액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">30세 미만</td>
                        <td className="p-3">5천만 원</td>
                        <td className="p-3">1억 원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">30세 이상</td>
                        <td className="p-3">1억 5천만 원</td>
                        <td className="p-3">2억 원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">40세 이상</td>
                        <td className="p-3">3억 원</td>
                        <td className="p-3">4억 원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 이 배제기준은 법률이 아니라 국세청 내부 사무처리 훈령으로, 이 금액 미만이면 통상 소명을 요구하지 않는다는 행정 편의 기준일 뿐입니다. 기준 금액 아래라도 조세회피 정황이 뚜렷하면 여전히 조사 대상이 될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">차명계좌는 명의신탁 증여의제와 다른가요?</h2>
                <p>
                  다릅니다. 예금청구권 같은 금전채권은 등기·등록·명의개서가 필요 없는 재산이므로, 등기·등록이 필요한 자산에 적용되는 명의신탁재산 증여의제(상속세및증여세법 §45의2)의 적용 대상이 아닙니다. 차명계좌는 대신 앞서 본 재산취득자금의 증여추정(§45①)과 국세기본법 §14 실질과세원칙으로 과세됩니다.
                </p>
                <p>
                  반면 주식처럼 명의개서가 필요한 자산을 조세회피 목적으로 타인 명의로 해두면 §45의2가 적용되어, 실제 증여 여부와 무관하게 명의자에게 증여세가 부과되는 구조입니다. 두 규정은 과세 요건과 입증 책임 방향이 달라 혼동하지 않아야 합니다.
                </p>
                <p className="mt-4">
                  예외: 차명 부동산은 증여의제가 아니라 부동산 실권리자명의 등기에 관한 법률상 과징금·형사처벌 대상으로 다뤄집니다. 차명주식·차명부동산의 구체적 처리는{' '}
                  <Link href="/guide/title-trust-deemed-gift-2026/" className="text-primary-500 underline">
                    명의신탁 증여의제 2026 가이드
                  </Link>
                  에서 별도로 정리했습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">차명계좌는 국세청에 어떻게 적발되나요?</h2>
                <p>
                  국세청은 금융정보분석원(KoFIU)이 관리하는 고액현금거래·의심거래 정보를 법령이 정한 요건에 따라 활용하고, 자체 전산 분석망으로 계좌 명의자의 소득·재산 규모와 실제 입출금 흐름 사이의 불일치를 찾아냅니다. 특정 계좌에서 반복적으로 동일인이 인출·이체를 처리하는 패턴도 주요 단서가 됩니다.
                </p>
                <p>
                  실제로는 상속세 조사, 부동산 취득자금 출처조사, 사업체 세무조사 과정에서 관련자의 예금계좌를 함께 들여다보다가 차명계좌가 함께 드러나는 경우가 많습니다. 특히 상속 개시 전 일정 기간 자금이 여러 계좌로 분산 이체된 정황은 세무조사의 주요 확인 항목입니다.
                </p>
                <p className="mt-4">
                  다만 모든 가족 간 계좌이체가 조사 대상이 되는 것은 아닙니다. 생활비·용돈처럼 통상적인 자금 이동과 실질적 은닉 목적의 차명거래를 구분하는 기준은{' '}
                  <Link href="/guide/parent-child-account-transfer-gift-tax-2026/" className="text-primary-500 underline">
                    부모 자식 계좌이체 증여세 2026 가이드
                  </Link>
                  에서 확인할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">차명계좌 적발 시 가산세는 얼마나 나오나요?</h2>
                <p>
                  차명계좌가 증여로 과세되면 증여세 본세 외에 신고 불이행에 대한 가산세가 추가로 붙습니다. 법정신고기한까지 신고 자체를 하지 않았다면 무신고가산세, 신고는 했지만 금액을 적게 신고했다면 과소신고가산세가 부과되고, 여기에 납부가 늦어진 기간만큼 납부지연가산세가 더해집니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 증여세 가산세 종류와 세율 (국세기본법 §47의2·§47의3·§47의4)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">가산세</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">일반 무신고·과소신고</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">부정행위인 경우</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">무신고가산세(§47의2)</td>
                        <td className="p-3">납부세액의 20%</td>
                        <td className="p-3">납부세액의 40%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">과소신고가산세(§47의3)</td>
                        <td className="p-3">과소신고 세액의 10%</td>
                        <td className="p-3">과소신고 세액의 40%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">납부지연가산세(§47의4)</td>
                        <td className="p-3" colSpan={2}>미납 기간 1일당 10만분의 22 (2026년 7월 1일 이후 지정납부기한이 지난 기간은 시행령 개정으로 월 1만분의 67 적용)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 세금을 고의로 축소하거나 은닉하려는 부정행위가 인정되면 가산세율이 두 배 수준으로 뛰어오릅니다. 차명계좌를 여러 단계로 옮기거나 거짓 자료를 제출한 정황이 있으면 부정행위로 판단될 가능성이 높습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">부과제척기간은 얼마나 되나요?</h2>
                <p>
                  증여세는 원칙적으로 신고기한 다음 날부터 10년이 지나면 더 이상 부과할 수 없습니다. 다만 법정신고기한까지 신고서를 제출하지 않았거나 사기 기타 부정한 행위로 세금을 포탈한 경우에는 국세기본법 §26의2에 따라 부과제척기간이 15년으로 늘어납니다.
                </p>
                <p>
                  차명계좌는 애초에 증여세 신고 자체가 이뤄지지 않는 경우가 대부분이라 15년 제척기간이 적용되는 사례가 많습니다. 즉 자금을 옮긴 지 10년이 지났다고 안심할 수 없고, 상속 발생 시점에 뒤늦게 드러나 15년 전 거래까지 과세되는 사례도 실제로 있습니다.
                </p>
                <p className="mt-4">
                  예외: 다른 사람 명의의 재산을 실소유자가 계속 보유하다가 나중에 실명으로 전환한 경우처럼 적극적인 은닉 의도가 인정되면, 조세심판원 결정례에서 이를 부정행위로 보아 장기 제척기간을 적용한 사례도 확인됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">금융실명법 위반이면 형사처벌도 받나요?</h2>
                <p>
                  불법재산 은닉, 자금세탁, 강제집행 면탈 등 탈법 목적으로 타인 명의 금융거래를 한 경우는 세금 문제와 별개로 형사처벌 대상입니다. 금융실명거래 및 비밀보장에 관한 법률 §3③은 이런 목적의 차명거래를 금지하고, §6①은 위반자를 5년 이하의 징역 또는 5천만원 이하의 벌금에 처하도록 정하고 있습니다.
                </p>
                <p>
                  이 처벌은 실제 자금의 소유자와 명의를 빌려준 사람 모두에게 적용될 수 있으며, 징역형과 벌금형을 함께 선고(병과)하는 것도 가능합니다. 단순히 가족 간 편의로 개설한 계좌라도 그 목적이 재산 은닉이나 강제집행 회피였다면 처벌 대상에서 벗어나기 어렵습니다.
                </p>
                <p className="mt-4">
                  다만 상속·증여 재산 관리처럼 세금 관계에서 문제되는 차명계좌라고 해서 전부 이 형사처벌 요건을 충족하는 것은 아닙니다. 탈법 목적 여부는 계좌 개설 경위와 실제 사용 목적을 종합적으로 살펴 판단합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">차명계좌, 증여세를 피할 방법이 있나요?</h2>
                <p>
                  가장 확실한 방법은 애초에 차명계좌를 쓰지 않고 본인 명의로 자금을 관리하는 것입니다. 가족 간 자금 이동이 꼭 필요하다면 생활비·교육비처럼 사회통념상 인정되는 비과세 범위를 활용하거나, 대여 형태라면 적정 이자율의 차용증을 작성해 증여가 아니라 대여임을 소명할 수 있는 자료를 남겨야 합니다.
                </p>
                <p>
                  이미 존재하는 차명계좌를 정리해야 한다면, 세무조사 통지를 받기 전에 스스로 수정신고·기한후신고를 하는 것이 유리합니다. 국세기본법 §48에 따라 법정신고기한 이후 1개월 이내 수정신고 시 가산세의 90%, 이후 경과 기간에 따라 단계적으로 낮아지는 비율로 감면받을 수 있습니다.
                </p>
                <p className="mt-4">
                  다만 감면은 가산세에 대한 것으로, 증여세 본세와 이미 발생한 납부지연가산세 일부까지 없애주지는 않습니다. 세무조사가 이미 시작된 이후에는 이러한 감면 혜택을 받을 수 없으므로 시점 판단이 중요하며, 구체적인 사안은 세무 전문가와 상담하는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/title-trust-deemed-gift-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">명의신탁 증여의제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">차명 주식·부동산은 이 규정으로 별도 과세됩니다.</p>
                  </Link>
                  <Link
                    href="/guide/parent-child-account-transfer-gift-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부모 자식 계좌이체 증여세</div>
                    <p className="mt-1 text-sm text-text-secondary">정상적 가족 송금과 차명계좌의 경계를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/family-loan-agreement-gift-tax-avoidance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">가족 간 차용증 작성법</div>
                    <p className="mt-1 text-sm text-text-secondary">대여로 인정받아 증여세를 피하는 요건을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/gift-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">증여재산공제와 누진세율 구조를 자세히 다룹니다.</p>
                  </Link>
                  <Link
                    href="/calculator/gift-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">증여 금액을 입력해 예상 세액을 바로 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/inheritance-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">차명계좌가 상속재산에 합산될 때의 세액을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·증여세 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 실제 차명계좌의 과세 여부와 세액, 형사처벌 가능성은 자금의 출처·목적·관리 실태 등 구체적 사실관계에 따라 크게 달라지므로, 개별 사안은 반드시 세무사·변호사 등 전문가와 상담하세요. 본 콘텐츠는 2026-09-21 기준으로 작성되었으며 관련 법령 개정 시 업데이트됩니다. 인용 법조항: 국세기본법 §14(실질과세), §26의2(부과제척기간), §47의2(무신고가산세), §47의3(과소신고가산세), §47의4(납부지연가산세), §48(가산세 감면), 상속세및증여세법 §45(재산취득자금 등의 증여추정), §45의2(명의신탁재산의 증여의제), §46(비과세되는 증여재산), 금융실명거래 및 비밀보장에 관한 법률 §3·§6.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.kofiu.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">금융정보분석원</a>.
                </p>
              </section>

              <ShareButtons
                title="차명계좌 적발 시 증여세·가산세 2026 가이드"
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
