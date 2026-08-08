// [revenue-lever: indexing+traffic]
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

const URL = 'https://calculatorhost.com/guide/inheritance-legal-reserve-claim-2026/';
const DATE_PUBLISHED = '2026-08-09';
const DATE_MODIFIED = '2026-08-09';

export const metadata: Metadata = {
  title: '유류분 2026, 반환청구 계산과 형제자매 위헌 정리',
  description:
    '유류분은 직계비속·배우자가 법정상속분의 1/2, 직계존속이 1/3을 보장받는 최소한의 상속 몫입니다. 2024년 형제자매 유류분 위헌, 계산법, 반환청구 소멸시효 1년·10년을 민법 조문으로 정리했습니다.',
  keywords: [
    '유류분',
    '유류분 계산',
    '유류분 형제자매 위헌',
    '유류분 반환청구',
    '유류분 소멸시효',
    '법정상속분 2분의 1',
    '민법 1112조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '유류분 2026 반환청구 계산' }],
    title: '유류분 2026, 반환청구 계산과 형제자매 위헌 정리',
    description: '직계비속·배우자 1/2, 직계존속 1/3. 2024년 형제자매 유류분 위헌, 계산 공식, 소멸시효 1년·10년을 민법 조문으로 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '유류분 2026 반환청구 계산과 형제자매 위헌',
    description: '유류분 비율·계산 공식·소멸시효를 민법 §1112~§1117로 정리. 2024년 형제자매 유류분 위헌 반영.',
  },
};

const FAQ_ITEMS = [
  {
    question: '유류분이 정확히 무엇인가요?',
    answer:
      '유류분은 일정한 상속인에게 법이 보장하는 최소한의 상속 몫입니다. 피상속인이 특정인에게 재산을 몰아주는 유언이나 생전 증여를 했더라도, 민법 §1112가 정한 비율만큼은 다른 상속인이 되찾을 수 있습니다. 상속에서 완전히 배제되는 것을 막기 위한 장치입니다.',
  },
  {
    question: '유류분은 상속인마다 얼마씩 인정되나요?',
    answer:
      '직계비속과 배우자는 법정상속분의 1/2, 직계존속은 1/3입니다. 민법 §1112에 따라 자녀와 배우자는 원래 받을 상속분의 절반을, 부모 등 직계존속은 3분의 1을 유류분으로 보장받습니다. 예를 들어 법정상속분이 4억 원인 자녀의 유류분은 2억 원입니다.',
  },
  {
    question: '형제자매도 유류분을 받을 수 있나요?',
    answer:
      '없습니다. 2024년 4월 25일 헌법재판소가 형제자매의 유류분을 정한 민법 §1112 제4호를 위헌으로 결정해 즉시 효력을 잃었습니다. 따라서 현재는 피상속인의 형제자매는 유류분을 청구할 수 없습니다. 유류분 권리자는 직계비속, 배우자, 직계존속으로 좁혀졌습니다.',
  },
  {
    question: '유류분은 어떤 재산을 기준으로 계산하나요?',
    answer:
      '상속 당시 남은 재산에 생전 증여를 더하고 채무를 뺀 금액이 기준입니다. 민법 §1113은 유류분 산정의 기초재산을 상속개시 시의 재산에 증여재산을 가산하고 채무를 공제해 정합니다. 상속인에게 미리 준 재산은 특별수익으로 보아 대체로 기간 제한 없이 포함됩니다.',
  },
  {
    question: '유류분 반환청구는 언제까지 해야 하나요?',
    answer:
      '안 날부터 1년, 상속개시부터 10년 안에 해야 합니다. 민법 §1117은 유류분권리자가 상속개시와 반환할 증여·유증을 안 때부터 1년, 상속이 시작된 때부터 10년이 지나면 청구권이 소멸한다고 정합니다. 증여 사실을 늦게 알아도 10년이 지나면 청구할 수 없습니다.',
  },
  {
    question: '유증과 증여 중 무엇부터 반환받나요?',
    answer:
      '유증을 먼저 반환받고, 부족하면 증여에서 채웁니다. 민법 §1116은 유증을 반환받은 뒤에도 유류분에 미치지 못할 때 비로소 증여받은 재산에서 반환받도록 순서를 정합니다. 증여가 여럿이면 원칙적으로 나중의 증여부터 반환 대상이 됩니다.',
  },
  {
    question: '유류분으로 재산을 돌려받으면 세금 문제도 생기나요?',
    answer:
      '상속·증여세 관계가 달라질 수 있어 별도 확인이 필요합니다. 유류분 반환은 민법상 권리이지만, 반환 결과에 따라 각 상속인의 상속재산 크기가 바뀌어 상속세 부담 배분이 달라질 수 있습니다. 구체적 세액은 세무 전문가나 관할 세무서에서 확인하세요.',
  },
];

export default function InheritanceLegalReserveClaim2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '유류분 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '유류분 2026, 반환청구 계산과 형제자매 위헌 정리',
    description:
      '유류분의 개념과 상속인별 비율(민법 §1112), 2024년 형제자매 유류분 위헌, 기초재산 산정(§1113), 반환 순서(§1116), 소멸시효(§1117)와 계산 사례까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['유류분', '유류분 반환청구', '형제자매 위헌', '민법 1112조', '소멸시효'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '유류분 2026',
    description:
      '유류분 비율과 계산 공식, 2024년 형제자매 위헌, 반환청구 소멸시효를 민법 조문으로 정리한 상속 실전 가이드.',
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
                    { name: '유류분 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">상속·은퇴 준비 · 8분 읽기 · 2026-08-09</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  유류분 2026
                  <br />
                  <span className="text-2xl text-text-secondary">반환청구 계산과 형제자매 위헌</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  부모가 한 자녀에게만 재산을 몰아줬을 때 나머지 자녀나 배우자가 최소한의 몫을 되찾을 수 있는지 궁금한 분을 위한 가이드입니다. 유류분이 무엇인지, 상속인마다 얼마씩 인정되는지, 2024년 형제자매 유류분 위헌 결정으로 무엇이 바뀌었는지, 계산은 어떻게 하는지, 그리고 반환청구 기한은 언제까지인지를 민법 조문과 계산 사례로 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-inheritance-legal-reserve-claim-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">유류분이란 무엇인가요?</h2>
                <p>
                  유류분은 일정한 상속인에게 법이 보장하는 최소한의 상속 몫입니다. 원칙적으로 사람은 자기 재산을 유언이나 생전 증여로 자유롭게 처분할 수 있지만, 그 결과 남은 가족이 생계 기반을 완전히 잃는 것을 막기 위해 민법은 일부 상속인에게 되찾을 수 있는 최소 비율을 정해 두었습니다. 이것이 유류분입니다.
                </p>
                <p>
                  예를 들어 아버지가 유언으로 전 재산을 한 자녀에게만 남겼더라도, 다른 자녀와 배우자는 자신의 유류분에 해당하는 금액을 반환받을 수 있습니다. 유류분은 상속을 아예 없던 일로 만드는 제도가 아니라, 침해된 최소한의 몫을 금전이나 재산으로 되돌려 받는 제도입니다.
                </p>
                <p>
                  다만 유류분은 민법상의 권리이므로, 자동으로 지급되지 않고 권리자가 스스로 반환을 청구해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">유류분은 상속인마다 얼마인가요?</h2>
                <p>
                  유류분 비율은 상속인의 지위에 따라 다릅니다. 민법 §1112는 다음과 같이 정합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 상속인별 유류분 비율 (민법 §1112, 2024년 위헌 반영)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상속인</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">유류분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">직계비속 (자녀·손자녀)</td>
                        <td className="p-3"><strong>법정상속분의 1/2</strong></td>
                        <td className="p-3">가장 흔한 유형</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">배우자</td>
                        <td className="p-3"><strong>법정상속분의 1/2</strong></td>
                        <td className="p-3">자녀와 공동상속 시</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">직계존속 (부모·조부모)</td>
                        <td className="p-3">법정상속분의 1/3</td>
                        <td className="p-3">직계비속이 없을 때</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">형제자매</td>
                        <td className="p-3">인정되지 않음</td>
                        <td className="p-3">2024년 헌재 위헌으로 폐지</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  유류분을 구하려면 먼저 법정상속분을 알아야 합니다. 배우자와 자녀가 함께 상속하면 배우자는 자녀의 1.5배를 받습니다. 배우자와 자녀 2명이면 배우자 1.5, 자녀 각 1의 비율이 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">형제자매도 유류분을 받나요?</h2>
                <p>
                  받을 수 없습니다. 2024년 4월 25일 헌법재판소는 피상속인의 형제자매에게 유류분을 인정한 민법 §1112 제4호를 위헌으로 결정했고, 단순위헌 결정이어서 선고와 동시에 효력을 잃었습니다. 그 결과 현재 유류분 권리자는 직계비속, 배우자, 직계존속으로 좁혀졌습니다.
                </p>
                <p>
                  같은 날 헌재는 유류분을 잃게 하는 사유(예: 피상속인을 학대한 상속인)가 전혀 없는 점과, 기여분을 유류분에 반영하지 않는 점에 대해서는 헌법불합치를 선고하며 2025년 말을 시한으로 개정하도록 했습니다.
                </p>
                <p>
                  다만 이 개정 부분의 구체적 내용과 시행 시점은 변동될 수 있으므로, 실제 사건에서는 국가법령정보센터에서 민법 최신 조문을 확인하고 전문가와 상담하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">유류분은 어떻게 계산하나요?</h2>
                <p>
                  유류분 산정의 기초재산은 상속 당시 재산에 생전 증여를 더하고 채무를 뺀 값입니다(민법 §1113). 여기에 유류분 비율을 곱해 각자의 유류분을 구하고, 실제로 받은 것이 그에 못 미치면 부족분을 반환청구합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">계산 흐름</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    1단계: 기초재산 = 상속개시 시 재산 + 산입 증여재산 − 채무
                    <br />
                    2단계: 개인 유류분 = 기초재산 × 법정상속분 비율 × 유류분 비율(1/2 또는 1/3)
                    <br />
                    3단계: 반환청구액 = 개인 유류분 − 이미 받은 상속·증여액
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 배우자와 자녀 2명, 기초재산 14억 원</p>
                  <p className="text-sm text-text-secondary">
                    · 상황: 아버지가 장남에게 전 재산 14억 원을 몰아줌
                    <br />
                    · 법정상속분(비율 1.5 : 1 : 1): 배우자 6억, 차남 4억
                    <br />
                    · 배우자 유류분: 6억 × 1/2 = <strong>3억 원</strong>
                    <br />
                    · 차남 유류분: 4억 × 1/2 = <strong>2억 원</strong>
                    <br />
                    · 배우자와 차남이 받은 것은 0원이므로 각각 3억, 2억을 장남에게 반환청구
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 전 재산을 물려받은 장남이라도 배우자와 차남의 유류분 합계 5억 원은 되돌려 줘야 합니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 실제 사건에서는 산입되는 증여의 범위, 부동산 등 재산의 평가 시점, 특별수익과 기여분 등 다툼이 많아 정확한 금액은 개별 판단이 필요합니다.
                </p>
              </section>

              <AdSlot slot="guide-inheritance-legal-reserve-claim-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">유류분 반환청구는 언제까지 하나요?</h2>
                <p>
                  안 날부터 1년, 상속개시부터 10년이 지나면 청구권이 사라집니다. 민법 §1117은 유류분권리자가 상속의 개시와 반환해야 할 증여 또는 유증을 안 때부터 1년, 상속이 개시된 때부터 10년의 두 기간을 모두 정해 둡니다. 둘 중 하나라도 지나면 청구할 수 없습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 유류분 반환청구 소멸시효 (민법 §1117)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기산점</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">상속개시와 반환할 증여·유증을 안 날</td>
                        <td className="p-3"><strong>1년</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">상속이 개시된 날</td>
                        <td className="p-3"><strong>10년</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  주의: 증여 사실을 뒤늦게 알게 되었더라도 상속개시부터 10년이 지나면 청구가 막힙니다. 침해 사실을 알았다면 1년 안에 내용증명 등으로 반환 의사를 명확히 남기는 것이 중요합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">무엇부터 반환받나요?</h2>
                <p>
                  유증을 먼저 반환받고, 그래도 부족하면 증여에서 채웁니다. 민법 §1116은 반환 순서를 정해, 유언으로 남긴 유증을 먼저 반환 대상으로 삼고 그것으로도 유류분에 미치지 못할 때 생전 증여를 반환받도록 합니다. 증여가 여러 건이면 원칙적으로 상속개시에 가까운 나중의 증여부터 반환합니다.
                </p>
                <p>
                  예외: 반환은 유류분 부족분의 한도에서만 이뤄지므로, 증여나 유증을 받은 사람이 그 전부를 무조건 내놓는 것은 아닙니다. 부족분만큼만 돌려주면 됩니다. 반환의 방법도 원물 반환이 원칙이나 사정에 따라 가액으로 정산되기도 합니다.
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
                    <p className="mt-1 text-sm text-text-secondary">상속재산 규모별 예상 상속세를 계산해 보세요.</p>
                  </Link>
                  <Link
                    href="/guide/legal-inheritance-order-share-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">법정상속 순위와 상속분</div>
                    <p className="mt-1 text-sm text-text-secondary">유류분 계산의 출발점인 법정상속분을 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">과세표준·세율·공제의 기본 구조를 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-limited-acceptance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속 한정승인과 포기</div>
                    <p className="mt-1 text-sm text-text-secondary">빚이 많은 상속에서 선택할 수 있는 절차를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-vs-gift-tax-comparison-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 vs 증여세 비교</div>
                    <p className="mt-1 text-sm text-text-secondary">생전 증여와 상속의 세금 차이를 비교하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">상속·증여·양도 관련 가이드 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 법률·세무 조언이 아닙니다. 유류분은 산입 증여의 범위, 재산 평가, 특별수익·기여분 등에 따라 결과가 크게 달라지므로, 구체적 사안은 변호사 등 전문가와 상담하시기 바랍니다. 본 콘텐츠는 2026-08-09를 기준으로 작성되었으며 법령·판례 변경 시 업데이트됩니다. 인용 조문은 <strong>민법 §1112(유류분의 권리자와 유류분), §1113(유류분의 산정), §1116(반환의 순서), §1117(소멸시효)</strong>이며, 형제자매 유류분은 2024년 헌법재판소 위헌 결정을 반영했습니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="유류분 2026 반환청구 가이드"
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