// [revenue-lever: indexing+traffic] 헬스장·수영장 문화비 소득공제 (연말정산 시즌 롱테일 흡수)
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

const URL = 'https://calculatorhost.com/guide/gym-pool-tax-deduction-2026/';
const DATE_PUBLISHED = '2026-08-24';
const DATE_MODIFIED = '2026-08-24';

export const metadata: Metadata = {
  title: '헬스장 수영장 소득공제 2026, 연말정산 30% 받는 법',
  description:
    '2025년 7월부터 헬스장·수영장 시설이용료도 문화비 소득공제 대상입니다. 총급여 7천만원 이하 근로자 30% 공제, 시설이용료와 PT 구분, 통합 한도까지 정리(조세특례제한법 §126의2).',
  keywords: [
    '헬스장 소득공제',
    '수영장 소득공제',
    '문화비 소득공제',
    '체육시설 이용료 소득공제',
    '헬스장 연말정산',
    '헬스장 소득공제 조건',
    '조세특례제한법 126조의2',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '헬스장 수영장 소득공제 2026, 연말정산 30% 받는 법' }],
    title: '헬스장 수영장 소득공제 2026, 연말정산 30% 문화비 공제 요건',
    description: '2025년 7월 시행. 총급여 7천만원 이하 근로자가 헬스장·수영장 시설이용료의 30%를 소득공제. 시설이용료와 PT 강습료 구분, 통합 한도 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '헬스장 수영장 소득공제 2026, 연말정산 30% 받는 법',
    description: '2025년 7월부터 헬스장·수영장 이용료 30% 문화비 소득공제. 총급여 7천만원 이하 근로자 대상. 조특법 §126의2.',
  },
};

const FAQ_ITEMS = [
  {
    question: '헬스장 이용료도 정말 소득공제가 되나요?',
    answer:
      '됩니다. 2025년 7월 1일 지출분부터 헬스장(체력단련장)·수영장 시설이용료가 문화비 소득공제 대상에 포함됐습니다(조세특례제한법 §126의2). 총급여 7천만원 이하 근로소득자가 신용카드·체크카드·현금영수증으로 결제하면 사용액의 30%를 소득공제받습니다. 다만 시설이 문화비 소득공제 제공 사업자로 등록돼 있어야 합니다.',
  },
  {
    question: '누가 헬스장 소득공제를 받을 수 있나요?',
    answer:
      '총급여 7천만원 이하 근로소득자만 대상입니다. 프리랜서·개인사업자 등 사업소득자는 문화비 소득공제 대상이 아닙니다. 또한 신용카드·체크카드·현금영수증 총 사용액이 총급여의 25%를 넘어야 그 초과분부터 공제가 시작됩니다.',
  },
  {
    question: 'PT(퍼스널트레이닝) 비용도 공제되나요?',
    answer:
      '원칙적으로 PT·강습료는 공제 대상이 아닙니다. 문화비 소득공제는 순수 시설이용료(헬스장 이용권, 수영장 자유수영 이용권 등)에 적용됩니다. 다만 시설이용료와 강습료가 영수증에서 구분되지 않으면 총결제액의 50%를 시설이용료로 보아 공제하는 것으로 알려져 있으니, 정확한 적용은 국세청에 확인하세요.',
  },
  {
    question: '공제 한도는 얼마인가요?',
    answer:
      '문화비는 전통시장·대중교통 사용분과 합산해 추가공제 한도(총급여 7천만원 이하 기준 연 300만원) 안에서 공제됩니다. 기본공제 한도와 별도로 운영되며, 항목별 세부 한도와 개편 사항은 매년 달라질 수 있으므로 홈택스 연말정산 간소화 자료로 확인하는 것이 정확합니다.',
  },
  {
    question: '현금으로 내면 공제가 안 되나요?',
    answer:
      '현금으로 내도 현금영수증을 발급받으면 공제됩니다. 핵심은 결제 수단이 신용카드·체크카드·현금영수증 중 하나여야 한다는 점입니다. 계좌이체·무통장입금 후 현금영수증을 발급받지 않으면 소득공제 자료에 잡히지 않습니다.',
  },
  {
    question: '연 60만원짜리 헬스장 이용권을 끊으면 얼마나 절세되나요?',
    answer:
      '소득공제액은 60만원 × 30% = 18만원입니다. 실제 환급액은 본인 한계세율에 따라 달라져, 세율 15% 구간이면 약 2만7천원(지방소득세 포함 약 2만9700원)입니다. 소득공제는 세액을 직접 깎아주는 세액공제와 달리 과세표준을 줄여주는 방식이라는 점을 이해하는 것이 중요합니다.',
  },
  {
    question: '내가 다니는 헬스장이 소득공제 대상인지 어떻게 아나요?',
    answer:
      '문화비 소득공제 제공 사업자로 등록된 시설만 공제됩니다. 한국문화정보원 문화비 소득공제 누리집에서 등록 여부를 조회하거나, 결제 후 홈택스 연말정산 간소화 자료에 문화비로 집계되는지 확인하면 됩니다. 잡히지 않으면 시설에 등록 여부를 문의하세요.',
  },
  {
    question: '2026년 세제개편안으로 달라지는 점이 있나요?',
    answer:
      '2026년 8월 3일 발표된 세제개편안(정부안)은 신용카드 소득공제 중 대중교통 추가공제를 기본공제로 일원화하고, 도서·공연 등 문화비를 포함한 추가공제 한도를 조정하는 방향을 담고 있습니다. 아직 국회 통과 전 정부안이므로 최종 한도와 시행 시기는 확정되지 않았습니다. 확정 내용은 기획재정부·국세청 발표로 확인하세요.',
  },
];

export default function GymPoolTaxDeduction2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '헬스장 수영장 소득공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '헬스장 수영장 소득공제 2026, 연말정산 30% 문화비 공제 요건',
    description:
      '2025년 7월부터 헬스장·수영장 시설이용료가 문화비 소득공제 대상. 총급여 7천만원 이하 근로자 30% 공제, 시설이용료와 PT 구분, 통합 한도와 신청 방법까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['헬스장 소득공제', '수영장 소득공제', '문화비 소득공제', '체육시설', '연말정산'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '헬스장 수영장 소득공제 2026',
    description:
      '헬스장·수영장 시설이용료 문화비 소득공제의 대상·공제율·한도·신청 방법 정리(조특법 §126의2).',
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
                    { name: '헬스장 수영장 소득공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인 · 8분 읽기 · 2026-08-24</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  헬스장 수영장 소득공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 연말정산 30% 문화비 공제 받는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  운동에 쓴 돈도 연말정산에서 돌려받을 수 있습니다. 2025년 7월부터 헬스장과 수영장 이용료가 문화비 소득공제 대상이 됐기 때문입니다. 이 글은 총급여 7천만원 이하 근로자라면 누가, 무엇을, 얼마나 공제받는지, 헷갈리는 PT 비용과 통합 한도, 그리고 실제 절세액까지 계산 사례로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">헬스장 이용료도 소득공제 되나요?</h2>
                <p>
                  됩니다. 2025년 7월 1일 지출분부터 헬스장(체력단련장)과 수영장 시설이용료가 문화비 소득공제 대상에 포함됐습니다. 근거는 조세특례제한법 §126의2(신용카드 등 사용금액에 대한 소득공제)로, 기존 도서·공연·박물관·미술관에 이어 체육시설 이용료가 추가된 것입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 대상: 총급여 7천만원 이하 근로소득자
                    <br />
                    · 공제율: 시설이용료의 30%
                    <br />
                    · 시행: 2025년 7월 1일 지출분부터
                    <br />
                    · 결제: 신용카드·체크카드·현금영수증만 인정
                    <br />
                    · 조건: 문화비 소득공제 제공 사업자로 등록된 시설
                  </p>
                </div>
                <p>
                  다만 이 공제는 근로소득자만의 혜택입니다. 프리랜서나 개인사업자는 문화비 소득공제 대상이 아니라는 점을 먼저 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">누가 얼마나 공제받나요?</h2>
                <p>
                  총급여 7천만원 이하 근로소득자가 사용액의 30%를 공제받습니다. 다만 무조건 첫 원부터 공제되는 것은 아니고, 신용카드·체크카드·현금영수증 총 사용액이 총급여의 25%를 넘어선 뒤 그 초과분에 대해서만 공제가 적용됩니다(조특법 §126의2).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 신용카드 등 사용분 소득공제율 비교 (조특법 §126의2, 2026 연말정산 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">결제·항목 유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신용카드</td>
                        <td className="p-3"><strong>15%</strong></td>
                        <td className="p-3">일반 사용분</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">체크카드·현금영수증</td>
                        <td className="p-3"><strong>30%</strong></td>
                        <td className="p-3">일반 사용분</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">문화비(도서·공연·헬스장·수영장 등)</td>
                        <td className="p-3"><strong>30%</strong></td>
                        <td className="p-3">총급여 7천만원 이하만</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">전통시장·대중교통</td>
                        <td className="p-3"><strong>40%</strong></td>
                        <td className="p-3">개편안에서 일원화 논의</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  즉 헬스장·수영장 이용료는 결제 수단과 상관없이 문화비로 분류되면 30% 공제율이 적용됩니다. 다만 총급여 7천만원을 넘는 근로자는 문화비 소득공제 자체가 적용되지 않습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떤 결제가 공제되고 PT는 왜 빠지나요?</h2>
                <p>
                  공제 대상은 순수한 시설이용료입니다. 헬스장 3개월 이용권, 수영장 1년 자유수영 이용권처럼 시설을 쓰는 대가로 낸 돈이 여기에 해당합니다.
                </p>
                <p>
                  반면 PT(퍼스널트레이닝) 비용이나 수영 강습료는 원칙적으로 공제 대상이 아닙니다. 이는 문화비 소득공제가 &lsquo;시설 이용&rsquo;에 초점을 둔 제도이기 때문입니다.
                </p>
                <p>
                  다만 시설이용료와 강습료가 영수증에서 구분되지 않고 한 항목으로 결제된 경우, 총결제액의 50%를 시설이용료로 간주해 공제하는 것으로 알려져 있습니다. 예외 처리이므로 정확한 적용 여부는 결제 시설과 국세청에 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공제 한도는 얼마인가요?</h2>
                <p>
                  문화비는 단독 한도가 아니라 전통시장·대중교통 사용분과 합산되는 추가공제 한도 안에서 적용됩니다. 총급여 7천만원 이하 근로자의 경우 이 추가공제 통합 한도는 연 300만원 수준입니다(조특법 §126의2).
                </p>
                <p>
                  이 추가공제 한도는 카드 사용분 기본공제 한도와는 별개로 운영됩니다. 다만 항목별 세부 한도와 통합 방식은 세법 개정으로 바뀔 수 있으므로, 실제 적용 한도는 매년 홈택스 연말정산 간소화 자료의 집계 결과로 확인하는 것이 가장 정확합니다.
                </p>
                <p>
                  다만 헬스장 이용료가 아무리 커도 이미 다른 문화비·전통시장·대중교통 사용으로 추가공제 한도를 채웠다면 추가 공제 효과는 없습니다. 한도 소진 여부를 함께 보는 것이 중요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 얼마나 절세되나요? (계산 사례)</h2>
                <p>
                  소득공제는 세액을 직접 깎는 것이 아니라 과세표준을 줄이는 방식이라, 실제 환급액은 본인 세율 구간에 따라 달라집니다. 아래 3가지 사례로 살펴봅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 총급여 4천만원, 헬스장 연 60만원</p>
                  <p className="text-sm text-text-secondary">
                    · 이미 카드 사용액이 총급여의 25%를 초과한 상태 가정
                    <br />
                    · 헬스장 시설이용료: 연 60만원 (문화비 30%)
                    <br />
                    · 소득공제액: 60만원 × 30% = <strong>18만원</strong>
                    <br />
                    · 한계세율 15% 구간 → 절감세액: 18만원 × 15% = 2만7천원
                    <br />
                    · 지방소득세 10% 포함 시: 약 <strong>2만9700원</strong> 절세
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 총급여 6천만원, 헬스장+수영장 연 120만원</p>
                  <p className="text-sm text-text-secondary">
                    · 시설이용료 합계: 연 120만원 (문화비 30%)
                    <br />
                    · 소득공제액: 120만원 × 30% = <strong>36만원</strong> (추가공제 한도 내 가정)
                    <br />
                    · 한계세율 24% 구간 → 절감세액: 36만원 × 24% = 8만6400원
                    <br />
                    · 지방소득세 포함 시: 약 <strong>9만5040원</strong> 절세
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 총급여 7,500만원 (경계값 초과)</p>
                  <p className="text-sm text-text-secondary">
                    · 총급여 7천만원 초과 → 문화비 소득공제 대상 아님
                    <br />
                    · 헬스장 이용료를 아무리 써도 문화비 공제: <strong>0원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 총급여 7천만원 이하 여부가 공제 가능 여부를 가르는 핵심 경계값입니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신청·확인은 어떻게 하나요?</h2>
                <p>
                  별도 신청 절차 없이 연말정산 때 자동으로 반영되는 것이 원칙입니다. 다만 몇 가지를 미리 확인하면 누락을 막을 수 있습니다.
                </p>
                <ol className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>
                    <strong>등록 시설 확인:</strong> 다니는 헬스장·수영장이 문화비 소득공제 제공 사업자로 등록됐는지 한국문화정보원 문화비 소득공제 누리집에서 조회합니다.
                  </li>
                  <li>
                    <strong>카드·현금영수증으로 결제:</strong> 시설이용료를 신용카드·체크카드로 결제하거나 현금 결제 시 현금영수증을 발급받습니다.
                  </li>
                  <li>
                    <strong>간소화 자료 확인:</strong> 이듬해 1월 홈택스 연말정산 간소화 서비스에서 해당 결제가 &lsquo;문화비&rsquo;로 집계됐는지 확인합니다.
                  </li>
                  <li>
                    <strong>누락 시 영수증 제출:</strong> 간소화에 잡히지 않으면 시설에서 발급한 결제 내역을 회사에 제출해 수동 반영합니다.
                  </li>
                </ol>
                <p>
                  다만 시설이 소득공제 제공 사업자로 등록돼 있지 않으면 결제해도 문화비로 집계되지 않습니다. 등록 여부를 반드시 사전에 확인하세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">2026년 세제개편안, 카드 소득공제는 어떻게 바뀌나</h2>
                <p>
                  2026년 8월 3일 발표된 세제개편안(정부안)은 신용카드 소득공제 구조를 손보는 내용을 담고 있습니다. 대중교통 사용분 추가공제를 기본공제로 일원화하고, 문화비를 포함한 추가공제 한도를 조정하는 방향입니다.
                </p>
                <p>
                  다만 이는 아직 국회 통과 전 정부안이므로, 최종 한도와 시행 시기는 확정되지 않았습니다. 헬스장·수영장 문화비 30% 공제 자체는 2025년 7월부터 이미 시행 중인 별개의 제도이니 혼동하지 마세요. 개정안의 확정 여부는 기획재정부·국세청 발표로 확인하는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">내 총급여와 세후 월급을 먼저 확인해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/culture-expense-income-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">문화비 소득공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">도서·공연·영화 30% 공제 요건과 한도를 함께 보세요.</p>
                  </Link>
                  <Link
                    href="/guide/credit-card-income-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">신용카드 소득공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">공제율 15~40%, 기본+추가한도 활용법.</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 완벽 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">소득공제와 세액공제의 차이부터 준비물까지.</p>
                  </Link>
                  <Link
                    href="/guide/medical-expense-tax-credit-3-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">의료비 세액공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">총급여 3% 초과분 세액공제, 함께 챙기세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">연말정산·소득공제·세액공제 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 실제 공제 대상 여부, 공제율, 통합 한도, 시설 등록 여부는 홈택스 연말정산 간소화 자료와 국세청에서 반드시 확인하세요. 헬스장·수영장 문화비 소득공제는 2025년 7월 1일 지출분부터 시행 중이며, 근거 법조항은 <strong>조세특례제한법 §126의2(신용카드 등 사용금액에 대한 소득공제)</strong>입니다. 2026년 세제개편안 관련 내용은 2026년 8월 3일 발표된 정부안 기준으로, 국회 논의 과정에서 달라질 수 있습니다. 본 콘텐츠는 2026-08-24를 기준으로 작성됐으며, 세법 개정 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.moef.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">기획재정부</a>.
                </p>
              </section>

              <ShareButtons
                title="헬스장 수영장 소득공제 2026 가이드"
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
