// [revenue-lever: traffic+indexing] 2026 세제개편안 신설 계좌 조기 선점, 롱테일 트래픽 + 색인 표면 확대.
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

const URL = 'https://calculatorhost.com/guide/productive-finance-isa-2026-tax-reform/';
const DATE_PUBLISHED = '2026-08-21';
const DATE_MODIFIED = '2026-08-21';

export const metadata: Metadata = {
  title: '생산적금융 ISA 신설 2026, 국내주식 전액 비과세 신규 계좌',
  description:
    '2026-08-03 발표 세제개편안에 따라 신설 예정인 국내주식 전용 비과세 계좌 생산적금융 ISA의 요건을 담았습니다. 연 2천만·총 2억 한도, 청년 납입금 10% 소득공제, 3년 의무·10년 운용 조건까지.',
  keywords: [
    '생산적금융 ISA',
    '생산적금융 계좌 2026',
    '국내주식 비과세 계좌',
    '2026 세제개편 ISA',
    '청년 ISA 소득공제',
    '조세특례제한법 91조의18',
    'ISA 개편',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '생산적금융 ISA 신설 2026, 국내주식 전액 비과세 신규 계좌' }],
    title: '생산적금융 ISA 신설 2026, 국내주식 전액 비과세 신규 계좌',
    description: '2026-08-03 세제개편안 신설 계좌. 연 2천만·총 2억, 이자·배당 전액 비과세, 청년 납입금 10% 소득공제, 3년 의무·10년 운용.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '생산적금융 ISA 신설 2026, 국내주식 전액 비과세',
    description: '2026-08-03 세제개편안 신설 예정. 이자·배당 전액 비과세, 청년 10% 소득공제, 3년 의무·10년 운용. 조세특례제한법 §91의18.',
  },
};

const FAQ_ITEMS = [
  {
    question: '생산적금융 ISA는 언제부터 개설할 수 있나요?',
    answer:
      '2026-08-03 발표된 세제개편안이 국회를 통과하면 2027-01-01 이후 개설분부터 적용될 예정입니다. 국회 심의 과정에서 요건이 조정될 수 있으므로 시행 전까지는 잠정 조건으로 보시는 편이 안전합니다. 정확한 시행일과 세부 규정은 조세특례제한법 개정안과 시행령·시행규칙을 통해 확정됩니다.',
  },
  {
    question: '왜 국내주식만 담을 수 있나요?',
    answer:
      '국내 자본시장으로의 자금 유입 확대라는 정책 목표를 담기 위해서입니다. 국내 상장주식, 국내 주식형펀드, 국민성장펀드, 기업성장집합투자기구(BDC) 네 가지 자산군만 편입할 수 있고, 해외주식·해외ETF·예금·리츠는 대상에서 제외됩니다. 다양한 자산 배분이 필요하다면 일반 ISA를 병행하는 편이 현실적입니다.',
  },
  {
    question: '청년 소득공제는 매년 받을 수 있나요?',
    answer:
      '네, 매년 납입금의 10%가 그해 종합소득 계산 시 공제됩니다. 만 15세부터 34세까지의 나이 요건은 매년 12월 31일 기준으로 판단하는 방식이 유력하며, 만 34세 생일이 지난 해에는 소득공제가 사라지는 대신 비과세 혜택은 계좌 만기까지 유지됩니다. 정확한 나이 산정 방식은 시행령에서 최종 확정됩니다.',
  },
  {
    question: '이자·배당 전액 비과세인데 원천징수도 아예 없나요?',
    answer:
      '원칙적으로 계좌 내에서 발생하는 이자·배당소득에는 원천징수가 적용되지 않는 구조가 예상됩니다. 다만 의무 가입기간 3년을 채우지 못하고 중도해지하면 그동안 받은 비과세·소득공제 혜택이 이자상당액과 함께 추징되므로, 조기 인출 계획이 있다면 원금 손실 위험뿐 아니라 세금 추징 위험까지 함께 고려해야 합니다.',
  },
  {
    question: '연 2,000만원 한도를 못 채운 해가 있으면 다음해로 이월되나요?',
    answer:
      '아닙니다. 이번 개편안에는 일반 ISA와 마찬가지로 한도 이월 폐지 방침이 담겨 있어, 그해 채우지 못한 한도는 소멸합니다. 총한도 2억원을 다 채우려면 연 2,000만원 한도를 10년 동안 꾸준히 채워야 합니다. 자금 여력이 부족한 해라면 소액이라도 꾸준히 넣어 계좌를 유지하는 편이 총한도 활용에 유리합니다.',
  },
  {
    question: '일반 ISA와 생산적금융 ISA를 동시에 보유할 수 있나요?',
    answer:
      '개편안 발표 자료에는 두 계좌의 병행 보유를 원칙적으로 허용하는 방향이 담겨 있지만, 세부 요건은 시행령·시행규칙에서 확정됩니다. 국세청과 금융감독원이 개설 단계에서 검증 절차를 마련할 것으로 예상되므로, 실제 개설 시점에는 두 계좌의 중복 보유 가능 여부와 총 납입 한도 합산 방식을 반드시 확인해야 합니다.',
  },
  {
    question: '계좌 안에서 국내주식을 매매해 얻은 매매차익도 비과세인가요?',
    answer:
      '국내 상장주식의 매매차익은 계좌 유무와 관계없이 원칙적으로 비과세이므로 생산적금융 ISA의 별도 혜택은 아닙니다. 다만 대주주 요건에 해당하면 소득세법 §94에 따라 양도소득세 대상이 되며, 이 경우 계좌 내부라 하더라도 과세 여부가 달라질 수 있으므로 대주주 판정 여부를 개별적으로 확인해야 합니다.',
  },
  {
    question: '만기 자금을 연금계좌로 이전할 때 유의점은 무엇인가요?',
    answer:
      '이전 한도는 2억원이고, 이전 이후에는 원칙적으로 55세 이전 인출이 제한됩니다. 이전을 하면 자금이 사실상 은퇴 시점까지 묶이는 대신 연금소득 저율 과세(3.3~5.5%)와 세액공제 확대 혜택을 받을 수 있습니다. 은퇴 시점이 멀지 않다면 세제 이점이 크지만, 20~30대 청년이라면 유동성 손실을 감안한 뒤 결정하는 편이 안전합니다.',
  },
];

export default function ProductiveFinanceIsa2026TaxReformPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '생산적금융 ISA 신설 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '생산적금융 ISA 신설 2026, 국내주식 전액 비과세 신규 계좌',
    description:
      '2026-08-03 발표 세제개편안에 따라 신설 예정인 국내주식 전용 비과세 계좌 생산적금융 ISA. 연 2천만·총 2억 한도, 청년 10% 소득공제, 3년 의무·10년 운용 조건과 실제 절감액 계산 사례.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: [
      '생산적금융 ISA',
      '2026 세제개편',
      '국내주식 비과세 계좌',
      '청년 소득공제',
      '조세특례제한법 91조의18',
      'ISA 개편',
      'BDC 투자',
    ],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '생산적금융 ISA 신설 2026',
    description:
      '2026 세제개편안 신설 예정 국내주식 전용 비과세 계좌 요건, 청년 소득공제, 3년 의무·10년 운용 규정 완비.',
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
                    { name: '생산적금융 ISA 신설 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">국내주식 투자자 · 청년 세제 관심층 · 9분 읽기 · 2026-08-21</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  생산적금융 ISA 신설 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 국내주식 전액 비과세 신규 계좌</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  기획재정부가 2026-08-03 발표한 세제개편안에는 국내 상장주식과 국내 주식형 펀드에만 투자할 수 있는 새 비과세 계좌 하나가 담겨 있습니다. 이름은 생산적금융 ISA로, 개편안이 국회를 통과하면 2027-01-01 이후 개설분부터 적용될 예정입니다. 기존 일반형 ISA와의 차이, 청년 소득공제 실제 절감액, 3년 의무·10년 상한 조건, 그리고 이미 일반 ISA를 갖고 있는 사람이 어떻게 대응해야 하는지까지 이 글 하나로 확인할 수 있게 정리했습니다. 국회 통과 전 잠정 조건임을 감안해 참고하시기 바랍니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">생산적금융 ISA란 무엇인가</h2>
                <p>
                  생산적금융 ISA는 국내 자본시장으로 자금이 흘러들도록 유도하기 위해 2026 세제개편안에서 신설된 별도 트랙의 비과세 계좌입니다. 기존 일반형·서민형·농어민형 ISA와는 별개로 운영되며, 조세특례제한법 §91의18에 규정된 기존 ISA 체계에 세부 신설 조항이 얹히는 구조입니다. 개편안이 국회를 통과하면 2027-01-01 이후 개설분부터 적용될 것으로 예정돼 있습니다.
                </p>
                <p>
                  기존 ISA가 예금·펀드·상장주식·리츠·해외ETF 등 여러 자산을 담을 수 있는 종합계좌라면, 생산적금융 ISA는 이름 그대로 &lsquo;생산적&rsquo; 자산으로 투자 대상이 좁혀져 있습니다. 국내 상장주식, 국내 주식형 펀드, 국민성장펀드, 기업성장집합투자기구(BDC) 네 가지가 대표 편입 대상이고, 그 대신 계좌 안에서 발생한 이자·배당소득은 한도 없이 전액 비과세가 됩니다. 청년에게는 별도의 소득공제까지 얹어 자본시장 참여 유인을 강하게 걸어 둔 셈입니다.
                </p>
                <p>
                  다만 이번 개편안은 국회 통과 전 상태입니다. 예산결산·조세소위 심의 과정에서 투자 대상 범위, 한도, 청년 나이 요건 등 세부 조건이 조정될 수 있으므로, 최종 규정은 국회 본회의 의결과 시행령·시행규칙 고시를 확인한 뒤 판단해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">일반 ISA와 무엇이 다른가</h2>
                <p>
                  같은 ISA라는 이름을 쓰지만, 세부 조건은 상당히 다릅니다. 일반형 ISA는 이자·배당소득 200만원(서민형 400만원)까지 비과세, 초과분은 9.9% 저율 분리과세라는 구조를 유지해 왔지만, 생산적금융 ISA는 한도 자체가 없습니다. 그 대가로 투자 자산이 국내 주식류로 제한되고 의무 가입기간이 3년으로 길어지며, 총 계약기간 상한도 최대 10년까지 늘어납니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 일반 ISA와 생산적금융 ISA 주요 조건 비교 (2026 세제개편안 기준, 잠정)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">일반 ISA</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">생산적금융 ISA</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">투자 대상</td>
                        <td className="p-3">예금·펀드·주식·리츠·ETF 등</td>
                        <td className="p-3">국내 상장주식·국내 주식형펀드·국민성장펀드·BDC</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">비과세 한도</td>
                        <td className="p-3">이자·배당 200만(서민형 400만)</td>
                        <td className="p-3"><strong>전액 비과세</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">초과분 세율</td>
                        <td className="p-3">9.9% 분리과세</td>
                        <td className="p-3">해당 없음</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">청년 소득공제</td>
                        <td className="p-3">없음</td>
                        <td className="p-3">납입금 10% (만 15~34세)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">납입 한도</td>
                        <td className="p-3">연 2,000만·총 1억</td>
                        <td className="p-3"><strong>연 2,000만·총 2억</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">의무 가입기간</td>
                        <td className="p-3">3년</td>
                        <td className="p-3">3년, 3년 단위 연장</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">총 계약기간</td>
                        <td className="p-3">최대 5년 (개편안 반영)</td>
                        <td className="p-3"><strong>최대 10년</strong></td>
                      </tr>
                      <tr className="bg-bg-card/50">
                        <td className="p-3">한도 이월</td>
                        <td className="p-3">폐지 (개편안 반영)</td>
                        <td className="p-3">폐지</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  개편안은 일반 ISA에도 총 계약기간을 최대 5년으로 제한하고 연간 한도 이월을 폐지하는 변경을 함께 담고 있습니다. 두 계좌의 유불리는 결국 &lsquo;국내주식 편중 vs 종합 자산배분&rsquo; 중 어느 쪽에 가까운 투자자인지에 따라 갈립니다.
                </p>
                <p className="mt-4">
                  다만 두 계좌를 동시에 보유할 수 있는지, 두 계좌의 납입 한도가 합산되는지 여부는 시행령에서 최종 확정됩니다. 국세청 검증 절차가 확정되기 전에는 무리하게 두 계좌를 병행 개설하기보다 발표 자료의 방향성만 확인해 두시는 편이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 누가 가입할 수 있고 얼마나 넣을 수 있나</h2>
                <p>
                  만 19세 이상 거주자면 원칙적으로 가입할 수 있고, 만 15~34세 청년은 별도 우대 트랙에 자동 편입돼 소득공제 혜택까지 받을 수 있는 구조가 유력합니다. 납입 한도는 연간 2,000만원, 계좌 전체 누적 2억원까지입니다. 일반형 ISA의 총한도 1억원보다 두 배 크고, 총 5년 최대 1억(연 2,000만원 × 5년)까지 넣을 수 있던 구조가 10년 최대 2억까지 확장된 셈입니다.
                </p>
                <p>
                  한도 이월 폐지가 함께 담겨 있어 올해 못 넣은 금액을 다음 해로 미룰 수 없습니다. 매년 2,000만원 한도를 꾸준히 채워야 총한도 2억을 채울 수 있다는 뜻입니다. 소득 여력이 부족한 해라면 소액이라도 꾸준히 납입해 계좌를 유지하는 편이 총한도 활용도를 높입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">가입 요건 요약 (잠정)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 가입 대상: 만 19세 이상 거주자
                    <br />
                    · 청년 트랙 자동 편입: 만 15세부터 34세
                    <br />
                    · 연 납입 한도: 2,000만원 (한도 이월 불가)
                    <br />
                    · 총 납입 한도: 2억원
                    <br />
                    · 총 계약기간: 최대 10년 (3년 의무 + 3년 단위 연장)
                  </p>
                </div>
                <p className="mt-4">
                  다만 세부 개설 요건, 일반 ISA와의 중복 보유 가능 여부, 청년 나이 산정 기준일은 국회 통과 이후 시행령·시행규칙에서 최종 확정됩니다. 실제 개설 시점에는 반드시 판매사(은행·증권사) 안내와 금융감독원 공지 사항을 함께 확인하시기 바랍니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">청년 납입금 10% 소득공제, 얼마나 돌려받나</h2>
                <p>
                  만 15~34세 청년이 생산적금융 ISA에 납입한 금액의 10%가 그해 종합소득 계산 시 공제됩니다. 예컨대 연 2,000만원 한도를 꽉 채우면 200만원의 소득공제가 발생합니다. 실제 환급액은 본인의 종합소득세 한계세율에 따라 달라지는데, 소득세법 §55 누진세율을 그대로 적용해 계산할 수 있습니다. 아래 세 가지 시나리오로 실제 절감액을 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 연봉 3,500만원 신입 직장인 (한계세율 15%)</p>
                  <p className="text-sm text-text-secondary">
                    · 연 납입금: 1,200만원 (월 100만원 적립 가정)
                    <br />
                    · 소득공제: 1,200만원 × 10% = <strong>120만원</strong>
                    <br />
                    · 국세 절감: 120만원 × 15% = 18만원
                    <br />
                    · 지방소득세 절감: 18만원 × 10% = 1.8만원
                    <br />
                    · 총 절감액: 약 <strong>19.8만원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 연봉 6,000만원 대리급 (한계세율 24%)</p>
                  <p className="text-sm text-text-secondary">
                    · 연 납입금: 2,000만원 (한도 최대)
                    <br />
                    · 소득공제: 2,000만원 × 10% = <strong>200만원</strong>
                    <br />
                    · 국세 절감: 200만원 × 24% = 48만원
                    <br />
                    · 지방소득세 절감: 48만원 × 10% = 4.8만원
                    <br />
                    · 총 절감액: 약 <strong>52.8만원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 연봉 1억원 과장급 (한계세율 35%)</p>
                  <p className="text-sm text-text-secondary">
                    · 연 납입금: 2,000만원 (한도 최대)
                    <br />
                    · 소득공제: 200만원
                    <br />
                    · 국세 절감: 200만원 × 35% = 70만원
                    <br />
                    · 지방소득세 절감: 70만원 × 10% = 7만원
                    <br />
                    · 총 절감액: 약 <strong>77만원</strong>
                  </p>
                </div>
                <p className="mt-4">
                  같은 200만원 소득공제라도 한계세율 15% 구간에서는 22만원, 35% 구간에서는 77만원으로 절감액이 3배 이상 벌어집니다. 연봉이 높을수록 청년 소득공제의 절세 효과가 커지는 구조라는 뜻입니다.
                </p>
                <p className="mt-4">
                  다만 소득공제는 연말정산이나 종합소득세 신고 단계에서 반영되며, 실제 환급 금액은 다른 소득공제·세액공제 유무, 근로소득공제 이후의 과세표준에 따라 달라질 수 있습니다. 위 계산은 한계세율 절감분만 단순 산정한 이론값으로 참고용입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 3년 의무기간·10년 상한, 중도해지하면 어떻게 되나</h2>
                <p>
                  의무 가입기간 3년을 채우지 못하고 해지하면 그동안 받았던 비과세·소득공제 혜택이 추징됩니다. 계좌 안에서 발생한 이자·배당소득에는 15.4%(소득세 14% + 지방소득세 1.4%) 원천세가 부과되고, 청년 소득공제로 돌려받은 금액도 이자상당액과 함께 반환합니다. 조기 인출이 예상된다면 원금 손실 위험뿐 아니라 이 추징 위험까지 함께 계산해야 합니다.
                </p>
                <p>
                  3년을 채운 뒤에는 3년 단위로 계약을 연장할 수 있고, 총 계약기간 최대 10년까지 운용할 수 있습니다. 즉 3년, 6년, 9년으로 두 번 연장한 뒤 마지막 1년을 붙여 만기 10년을 맞추는 구조가 표준 시나리오입니다. 10년이 지나면 다른 생산적금융 ISA 계좌로 이전하거나 연금계좌로 옮겨야 합니다.
                </p>
                <p>
                  다만 사망, 해외이주, 천재지변, 6개월 이상 요양이 필요한 질병 등 부득이한 사유가 인정되면 예외적으로 추징이 면제될 수 있습니다. 이 예외 목록은 조세특례제한법 시행령에서 확정되며, 기존 일반 ISA의 부득이한 사유 규정과 유사하게 운영될 가능성이 높습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">만기자금 연금계좌 이전 시 절세 시너지</h2>
                <p>
                  생산적금융 ISA 만기가 도래하면 자금을 다른 생산적금융 ISA 계좌로 옮기거나, 연금저축·IRP 같은 연금계좌로 이전할 수 있고, 이전 한도는 2억원까지 인정됩니다. 세부 방식은 국회 통과 이후 시행령에서 확정되겠지만, 일반 ISA에 이미 적용 중인 &lsquo;만기 자금 연금계좌 이전 시 세액공제 한도 확대&rsquo; 방식이 준용될 가능성이 높습니다.
                </p>
                <p>
                  연금계좌로 이전하면 이전금액이 55세 이후 연금 수령 시까지 과세이연되고, 수령 시에는 저율의 연금소득세(3.3~5.5%)만 부담합니다. 소득세법 §59의3에 따른 연금계좌 세액공제 한도가 이전금액의 일정 비율만큼 확대돼, 이전 당해 연도에 세액공제를 더 받을 수 있는 이중 혜택 구조가 됩니다.
                </p>
                <p>
                  다만 이전 이후 55세 이전에 인출하면 기타소득세 16.5%가 적용되고 세액공제 받은 금액이 추징됩니다. 자금이 사실상 은퇴 시점까지 묶인다는 뜻이므로, 연금계좌 이전은 은퇴까지 최소 5~10년 이상 남은 경우, 그리고 당장의 유동성이 여유로운 경우에 실익이 큽니다. 20~30대 청년은 유동성 손실을 감안한 뒤 결정해야 합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">Q. 지금 일반 ISA 갖고 있으면 어떻게 대응해야 하나</h2>
                <p>
                  기존 일반 ISA를 이미 운용 중이라면 세 가지 시나리오를 검토할 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>시나리오 A. 기존 계좌 유지:</strong> 예금, 국내 리츠, 해외 ETF 등 다양한 자산을 계속 담고 싶은 종합 자산배분형 투자자에게 유리합니다. 이자·배당 200만(서민형 400만) 비과세 한도와 초과분 9.9% 분리과세 혜택이 유지됩니다.
                  </li>
                  <li>
                    <strong>시나리오 B. 신규 계좌 병행 개설:</strong> 국내 상장주식·주식형펀드·BDC 비중이 큰 투자자라면 생산적금융 ISA에 그 부분을 옮겨 담아 이자·배당 전액 비과세와 청년 소득공제를 확보하는 편이 유리합니다. 병행 보유 허용 여부가 시행령에서 확정된 뒤 결정하는 것이 안전합니다.
                  </li>
                  <li>
                    <strong>시나리오 C. 기존 계좌 만기 시 연금계좌로 이전, 신규는 생산적금융 ISA:</strong> 기존 일반 ISA의 만기 자금을 연금계좌로 이전해 세액공제 한도를 확보하고, 신규 개설은 생산적금융 ISA로 시작해 국내주식 비중을 확대하는 조합입니다. 은퇴까지 여유가 있고 국내주식 편중이 부담스럽지 않은 경우에 적합합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  일반 ISA는 여전히 예금·리츠·해외ETF까지 담을 수 있는 종합 자산관리 계좌라는 장점이 있고, 생산적금융 ISA는 국내주식 비중이 큰 투자자에게 이자·배당 전액 비과세와 청년 소득공제라는 강한 유인을 제공합니다. 어느 쪽이 절대 우위라기보다 본인의 자산 배분 성향에 따라 선택이 갈립니다.
                </p>
                <p className="mt-4">
                  다만 두 계좌의 병행 보유 가능 여부, 총 납입 한도의 합산 처리 방식은 시행령·시행규칙에서 최종 확정됩니다. 국회 통과 이후 금융감독원·금융투자협회의 안내 자료가 나오면 그 시점에 판매사 창구에서 재확인하시기 바랍니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/isa-account-tax-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">일반 ISA 절세 혜택 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">일반형·서민형 ISA 200만/400만 비과세, 9.9% 분리과세 구조를 먼저 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/isa-maturity-pension-account-transfer-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">ISA 만기 연금계좌 이전 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">만기 자금을 연금저축·IRP로 옮길 때 세액공제 한도 확대 방법.</p>
                  </Link>
                  <Link
                    href="/guide/dividend-separate-taxation-value-up-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배당소득 분리과세 밸류업 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">국내주식 배당 세제 개편의 큰 그림을 함께 살펴보세요.</p>
                  </Link>
                  <Link
                    href="/guide/pension-savings-irp-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연금저축·IRP 세액공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">소득세법 §59의3 연금계좌 세액공제 한도와 계산법.</p>
                  </Link>
                  <Link
                    href="/calculator/savings/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">적금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">연 2,000만원 한도를 채우기 위한 월 적립액과 이자를 미리 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/category/finance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 금융 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">대출·예금·적금·연금 관련 가이드를 한눈에 확인하세요.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무·투자 조언이 아닙니다. 생산적금융 ISA는 2026-08-03 발표된 세제개편안 신설 내용으로, 국회 통과 이전 잠정 조건입니다. 국회 심의 과정에서 투자 대상·한도·청년 소득공제 요건이 조정될 수 있으며, 최종 시행 조건은 조세특례제한법 개정안과 시행령·시행규칙 고시로 확정됩니다. 관련 법조항은 <strong>조세특례제한법 §91의18</strong>(개인종합자산관리계좌), <strong>소득세법 §55</strong>(종합소득세율), <strong>소득세법 §59의3</strong>(연금계좌 세액공제), <strong>소득세법 §94</strong>(양도소득)를 참조하시기 바랍니다. 본 콘텐츠는 2026-08-21을 기준으로 작성되었으며, 관련 법령 개정 및 시행령 확정 시 즉시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.moef.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">기획재정부(2026 세제개편안)</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(조세특례제한법)</a>,{' '}
                  <a href="https://www.fss.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">금융감독원</a>.
                </p>
              </section>

              <ShareButtons
                title="생산적금융 ISA 신설 2026 가이드"
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
