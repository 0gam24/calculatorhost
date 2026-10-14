import { DtiCalculator } from './DtiCalculator';
import { QuickTable } from '@/components/calculator/QuickTable';
import { dtiQuickTable } from '@/lib/quick-tables/dti';
import { CalculatorPageContent } from '@/components/calculator/CalculatorPageContent';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FaqSection } from '@/components/calculator/FaqSection';

// Dynamic import — AdSense 슬롯 로딩 지연 (First Load JS 최적화)
import { ShareButtons } from '@/components/calculator/ShareButtons';
import { MainBackrefBox } from '@/components/network/MainBackrefBox';
import { getMainCategoryUrl } from '@/lib/network/main-backref';
import { PublicDataCitation } from '@/components/seo/PublicDataCitation';
import { MathFormula } from '@/components/seo/MathFormula';
import { TermTooltip } from '@/components/ui/TermTooltip';
import { getEcosBaseRateCitation } from '@/lib/publicapi/public-citations';
import bokRates from '@/data/bok-rates.json';

const ECOS_BASE_RATE_DTI = getEcosBaseRateCitation(bokRates);
import {
  buildSoftwareApplicationJsonLd,
  buildFaqPageJsonLd,
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
  buildHowToJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/calculator/dti/';
const DATE_PUBLISHED = '2026-05-11';
const DATE_MODIFIED = '2026-10-14';

export const metadata: Metadata = {
  title: 'DTI 계산기 2026 | LTV·DSR 함께 계산',
  description:
    '연소득과 대출 원리금으로 DTI를 계산하고 LTV·DSR과 함께 주택담보대출 한도를 확인합니다.',
  keywords: [
    'DTI 계산기',
    'DTI 대출한도 계산',
    'DTI DSR 계산',
    'LTV DTI DSR 계산',
    '주택담보대출 DTI',
    '2026 DTI',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'DTI 계산기 2026, LTV·DSR 통합 대출한도 계산',
      },
    ],
    title: 'DTI 계산기 2026 | LTV·DSR 함께 계산',
    description: 'DTI 공식 + 한도 자동 계산.',
    url: URL,
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: { card: 'summary_large_image' },
};

const FAQ_ITEMS = [
  {
    question: 'DTI란 무엇인가요?',
    answer:
      'DTI(Debt to Income, 부채상환비율)는 신규 대출의 연간 원리금 상환액에 기존 대출의 연간 이자를 더한 금액을 연소득으로 나눈 비율입니다. 산식: (신규 원리금 + 기존 이자) ÷ 연소득 × 100. DSR과 달리 기존 대출은 이자만 포함합니다.',
  },
  {
    question: 'DTI 와 DSR 의 차이는?',
    answer:
      'DSR 은 모든 대출(신규 + 기존)의 원금과 이자를 모두 더해 연소득 비율을 계산하지만, DTI 는 신규 대출의 원리금만 합산하고 기존 대출은 이자만 포함합니다. 따라서 DTI 한도가 같아도 기존 대출이 많을수록 DSR이 먼저 빠듯해집니다.',
  },
  {
    question: 'DTI 한도는 몇 % 인가요?',
    answer:
      '2026년 10월 기준 주택담보대출 DTI 한도는 규제지역(서울 전역 등) 40%, 그 밖의 지역 60%입니다. 은행은 DSR(은행 40%, 2금융권 50%)도 함께 적용하고 대부분 DSR이 먼저 한도를 정하므로 DTI만 봐서는 안 됩니다. DSR·LTV·DTI와 수도권 주담대 최대한도(6억 원 등)를 모두 통과해야 실제 한도가 정해집니다.',
  },
  {
    question: 'DTI 계산기는 어디서 사용하나요?',
    answer:
      '본 사이트의 대출한도(DSR/LTV/DTI) 계산기에서 연소득·기존 대출·신규 대출 조건을 입력하면 DTI·DSR·LTV 3개 규제와 결정적 제약 요인을 한 번에 확인할 수 있습니다.',
  },
  {
    question: 'LTV·DTI·DSR 동시 계산 의미는?',
    answer:
      '한국의 주택담보대출 한도는 LTV(담보가치 대비 대출액)·DTI(부채상환비율)·DSR(부채원리금 상환비율) 3개 규제를 모두 통과해야 합니다. 셋 중 가장 빠듯한 한도가 실 한도가 되며, 본 사이트 통합 계산기에서 결정적 제약(bindingConstraint)을 자동 표시합니다.',
  },
  {
    question: 'DTI 계산 예시는?',
    answer:
      '연소득 6,000만 원, 기존 대출 연이자 200만 원, 신규 주담대 월 100만 원 원리금(연 1,200만 원) 가정 시 DTI = (1,200 + 200) ÷ 6,000 × 100 = 23.3%. 규제지역 한도 40% 안쪽이므로 DTI 측면에서는 통과합니다.',
  },
  {
    question: 'DTI가 60%면 대출을 받을 수 있나요?',
    answer:
      '규제지역이면 한도 40%를 넘어 DTI 측면에서 불합격이고, 그 밖의 지역은 한도가 60%라 DTI만 보면 경계선입니다. 다만 같은 조건이면 DSR(은행 40%)을 넘을 가능성이 높아 실제 대출은 어려울 수 있으니, 본 사이트의 통합 계산기로 DSR·LTV까지 함께 점검하기를 권합니다.',
  },
  {
    question: 'DTI에서 소득은 어떻게 산정하나요?',
    answer:
      'DTI 소득은 기본적으로 세전 연소득(근로소득·사업소득·기타소득)을 기준으로 합니다. 은행은 국세청 원천징수영수증, 사업소득자는 소득세 신고액(또는 추정소득), 프리랜서는 최근 종합소득세 신고 자료를 참고합니다. 부부 공동 신청 시에는 부부 합산 연소득을 기준으로 합니다.',
  },
  {
    question: 'DTI 규제지역(40%)과 그 밖의 지역(60%) 차이는?',
    answer:
      '서울 전역 같은 규제지역(투기과열지구·조정대상지역)은 과열을 막으려고 DTI 한도를 40%로 묶고, 그 밖의 지역은 60%입니다. 같은 소득이라도 지역에 따라 DTI 기준 한도가 달라지므로 집이 있는 곳이 규제지역인지 먼저 확인하세요. 2026년 10월 현재 규제지역은 서울 25개 구 전체와 경기 과천·광명·성남 분당 등 15곳입니다.',
  },
  {
    question: 'DTI 계산 시 부부 합산 소득은 어떻게 반영되나요?',
    answer:
      '배우자가 함께 신청하면 부부의 연소득을 합산한 금액을 DTI 분모로 사용합니다. 예를 들어 남편 5,000만 원 + 아내 4,000만 원 = 9,000만 원이 연소득이 되고, DTI 한도 계산도 이 9,000만 원 기준으로 진행됩니다. 부부 합산이 유리할 수 있으나, 배우자의 신용도·부채 현황도 함께 심사됩니다.',
  },
  {
    question: 'DTI에서 변동금리는 스트레스 가산이 있나요?',
    answer:
      '스트레스 금리는 DSR을 계산할 때만 더합니다. 2026년 10월 수도권·규제지역 주담대는 변동형 3.0%p(혼합형 2.4%p, 주기형 1.2%p), 지방은 변동형 0.75%p입니다. DTI에는 스트레스 가산이 없지만 DSR이 먼저 빠듯해지는 경우가 많으니, 변동금리를 고를 때는 통합 계산기로 DSR도 함께 점검하기를 권합니다.',
  },
];

export default function DtiPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: 'DTI 계산기',
    description: 'DTI(부채상환비율) + LTV + DSR 통합 한도 계산',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: 'DTI 계산기 2026',
    description: 'DTI 공식·한도·DSR 비교',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '금융', url: 'https://calculatorhost.com/category/finance/' },
    { name: 'DTI 계산기' },
  ]);
  const howToLd = buildHowToJsonLd({
    name: 'DTI 계산기 사용 방법',
    description: 'DTI(부채상환비율) 를 계산하고 대출한도 확인하는 단계별 가이드',
    steps: [
      { name: '연소득 입력', text: '연소득(세전) 을 만 원 단위로 입력합니다.' },
      {
        name: '기존 대출 이자 입력',
        text: '기존 대출의 연간 이자 합계를 입력합니다 (원금 제외).',
      },
      {
        name: '신규 대출 조건 입력',
        text: '신규 주택담보대출 금리·기간·상환방식을 선택합니다.',
      },
      {
        name: 'DTI/DSR/LTV 자동 계산',
        text: '본 사이트 통합 계산기에서 3개 규제와 결정적 제약 요인을 자동 확인합니다.',
      },
      {
        name: '한도 확인',
        text: '실 신청 가능한 최대 대출액과 월 상환액을 확인합니다.',
      },
    ],
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }}
      />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <main
            id="main-content"
            className="calculator-page min-w-0 flex-1 px-4 py-5 md:px-8 md:py-8"
          >
            <CalculatorPageContent guidesFor="dti"
              quickTable={<QuickTable data={dtiQuickTable()} />}
              intro={
                <header>
                  <Breadcrumb
                    items={[
                      { name: '홈', href: '/' },
                      { name: '금융', href: '/category/finance/' },
                      { name: 'DTI 계산기' },
                    ]}
                  />
                  <h1 className="mb-3 text-4xl font-bold tracking-tight">
                    DTI 계산기 2026 | LTV·DSR 함께 계산
                  </h1>
                  <p className="text-lg text-text-secondary" data-speakable>
                    연소득 대비 대출 상환 부담을 확인하세요.
                  </p>
                </header>
              }
              calculator={<DtiCalculator />}
              faq={
                <>
                  <FaqSection items={FAQ_ITEMS} />
                </>
              }
              tools={
                <>
                  <ShareButtons title="DTI 계산기 2026 | LTV·DSR 함께 계산" url={URL} />
                </>
              }
            >
              <section className="card border-l-4 border-l-primary-500 bg-primary-500/5">
                <h2 className="mb-2 text-xl font-semibold">DTI·DSR·LTV 통합 계산</h2>
                <p className="mb-3 text-sm text-text-secondary">
                  DTI 만 단독으로 보면 실 대출한도를 정확히 알기 어렵습니다. 3개 규제 모두 통과해야
                  하므로 통합 계산기에서 결정적 제약 요인까지 확인하세요. 참고로 현재 한국은행
                  기준금리는 <PublicDataCitation citation={ECOS_BASE_RATE_DTI} />
                  이며, 시중은행 주담대 약정금리는 통상 기준금리에 가산금리(1.5~3.0%p)가 더해진
                  수준입니다.
                </p>
                <Link
                  href="/calculator/loan-limit/"
                  className="inline-flex items-center gap-1 rounded-md bg-primary-600 px-4 py-2 text-sm font-bold text-white hover:bg-primary-500"
                >
                  → 통합 대출한도 계산기로 이동
                </Link>
              </section>
              <section className="card space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">DTI 공식</h2>
                <MathFormula
                  display
                  className="rounded-md bg-bg-card p-4 text-base"
                  latex={String.raw`DTI(\%) = \dfrac{\text{신규 대출 연 원리금} + \text{기존 대출 연 이자}}{\text{연소득}} \times 100`}
                />
                <pre className="overflow-x-auto rounded-md bg-bg-card p-4 text-sm">
                  <code>{`DTI(%) = (신규 대출 연 원리금 + 기존 대출 연 이자) ÷ 연소득 × 100

신규 대출 연 원리금 = 월 원리금 상환액 × 12
  ※ 원리금균등 상환식: P × r(1+r)^n / ((1+r)^n - 1)
    P = 원금, r = 월이율, n = 개월수

DTI 한도 (2026년 10월):
  - 규제지역(서울 전역 등):  40%
  - 그 밖의 지역:            60%`}</code>
                </pre>
                <p className="text-sm text-text-secondary">
                  계산 결과가 한도 안쪽이어도, 같은 차주의{' '}
                  <TermTooltip
                    term="DSR"
                    definition="총부채원리금상환비율, 연소득 대비 '모든 대출'의 연간 원리금 상환액 비율. 은행 40%, 제2금융권 50% 한도."
                    href="/glossary/#dsr"
                  />
                  ·
                  <TermTooltip
                    term="LTV"
                    definition="담보인정비율, 담보(주택) 가치 대비 대출금 비율. 지역·실수요 여부에 따라 50~80% 한도."
                    href="/glossary/#ltv"
                  />{' '}
                  가 더 빠듯하면 실 한도는 DSR·LTV 기준으로 결정됩니다. 통합 계산기를 통해 결정적
                  제약(bindingConstraint)을 확인하는 것이 안전합니다.
                </p>
              </section>
              <section className="card space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">DTI 계산 단계별 가이드</h2>
                <p className="text-sm text-text-secondary" data-speakable>
                  DTI를 직접 계산할 때는 다음 순서를 따릅니다. 연소득은 세전 기준이며, 기존 대출은
                  이자만 포함하는 점이 DSR과의 핵심 차이입니다.
                </p>
                <ol className="space-y-3 text-sm">
                  <li>
                    <strong>1단계: 연소득 확인</strong>: 근로자는 최근 연봉 또는 원천징수영수증
                    기준(세전), 사업소득자는 소득세 신고액(최근 2년 평균 또는 기하평균 적용 가능).
                  </li>
                  <li>
                    <strong>2단계: 신규 대출 월 원리금 확인</strong>: 신청할 주택담보대출의
                    금리·기간·상환방식을 토대로 월 원리금 계산. 원리금균등상환식이 표준. (본 사이트
                    대출이자 계산기 참조)
                  </li>
                  <li>
                    <strong>3단계: 신규 대출 연 원리금 계산</strong>: 월 원리금 × 12개월.
                  </li>
                  <li>
                    <strong>4단계: 기존 대출 연이자 합산</strong>: 현재 보유한 모든 대출(신용대출,
                    전세자금대출, 카드론 등)의 연간 이자 합계. 약 평균금리로 계산하거나 차주가 직접
                    은행에서 조회한 값 사용.
                  </li>
                  <li>
                    <strong>5단계: DTI 비율 계산</strong>: (신규 연 원리금 + 기존 연 이자) ÷ 연소득
                    × 100. 결과가 지역별 한도(규제지역 40%, 그 밖의 지역 60%) 이하면 DTI 통과.
                  </li>
                  <li>
                    <strong>6단계: DSR·LTV와 함께 확인</strong>: DTI 한도를 통과했어도, DSR이나
                    LTV가 더 빠듯하면 그것이 실 한도가 됨. 본 사이트 통합 계산기에서 3개 규제를 동시
                    검토 권장.
                  </li>
                </ol>
              </section>
              <section className="card space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">
                  DTI 소득 산정 방법 (실무)
                </h2>
                <p className="text-sm text-text-secondary" data-speakable>
                  은행이 인정하는 DTI 소득은 차주의 직업·소득 형태에 따라 다릅니다. 실제 신청 전에
                  본인 소득 구분을 확인하면 대출 가능 여부를 미리 예측할 수 있습니다.
                </p>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong className="text-text-primary">근로소득자 (직장인)</strong>
                    <p className="mt-1">
                      세전 연봉 또는 최근 3개월~1년 원천징수영수증 기준. 퇴직금·보너스는 별도 문의.
                      비정규직이나 계약직도 고용계약 기간 이상 재직 중이면 인정.
                    </p>
                  </div>
                  <div>
                    <strong className="text-text-primary">사업소득자</strong>
                    <p className="mt-1">
                      소득세 신고액(최근 2년 평균 또는 기하평균). 신고액이 낮으면 추정소득이나
                      카드매출액으로 상향 조정 가능. 적자 신고는 인정 불가.
                    </p>
                  </div>
                  <div>
                    <strong className="text-text-primary">프리랜서·1099 소득자</strong>
                    <p className="mt-1">
                      부가세 신고액, 사업소득 신고액, 또는 통장 입금 내역 기하평균. 소득 증명이
                      어려우면 은행마다 기준 상이.
                    </p>
                  </div>
                  <div>
                    <strong className="text-text-primary">부부 합산</strong>
                    <p className="mt-1">
                      배우자가 함께 신청할 경우 부부 연소득을 합산. 예: 남편 5,000만 + 아내 4,000만
                      = 9,000만 원 기준. 배우자의 신용도·기존 부채도 심사 대상.
                    </p>
                  </div>
                </div>
              </section>
              <section className="card space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">DTI vs DSR 비교</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base bg-primary-500/10">
                        <th className="px-3 py-2 text-left">항목</th>
                        <th className="px-3 py-2 text-left">DTI</th>
                        <th className="px-3 py-2 text-left">DSR</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2">기존 대출 산정</td>
                        <td className="px-3 py-2">이자만</td>
                        <td className="px-3 py-2">원금 + 이자</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2">신규 대출 산정</td>
                        <td className="px-3 py-2">원리금 합산</td>
                        <td className="px-3 py-2">원리금 합산</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2">한도(2026년 10월)</td>
                        <td className="px-3 py-2">규제지역 40% / 그 밖 60%</td>
                        <td className="px-3 py-2">40% (은행) / 50% (2금융)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2">스트레스 가산</td>
                        <td className="px-3 py-2">미적용</td>
                        <td className="px-3 py-2">수도권·규제지역 변동형 +3.0%p, 지방 +0.75%p</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-text-secondary">
                  은행 대출 심사 시 보통 DSR 이 먼저 빠듯해지므로, 실무에서는 DSR 한도가 곧 실
                  한도입니다. DTI 는 2018년 이후 DSR 도입과 함께 보조 지표가 되었습니다.
                </p>
              </section>
              <section className="card space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">
                  DTI와 LTV를 함께 보는 이유
                </h2>
                <p className="text-sm text-text-secondary" data-speakable>
                  DTI는 '소득 대비 부채 비율' 규제이고, LTV는 '담보가치 대비 대출액 비율'
                  규제입니다. 둘은 측정하는 것이 다르므로, 같은 집을 살 때도 DTI·LTV 중 어느
                  하나라도 걸리면 대출 불가능합니다.
                </p>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong className="text-text-primary">DTI는 '부채 상환 능력'을 본다</strong>
                    <p className="mt-1">
                      연소득 대비 얼마나 많은 대출 부채를 지을 수 있는가를 판단합니다. 소득이
                      높을수록 더 큰 대출을 받을 수 있습니다. 예: 연소득 1억 원이면 그 밖의 지역
                      기준 DTI 60% 한도로 연 6,000만 원까지 원리금·이자를 감당할 수 있다고 봅니다.
                    </p>
                  </div>
                  <div>
                    <strong className="text-text-primary">LTV는 '담보 가치'를 본다</strong>
                    <p className="mt-1">
                      집의 감정가(공시가격)에 대해 얼마까지 대출받을 수 있는가를 제한합니다. 집이
                      비싸도 소득이 높으면 DTI는 통과하지만, 집 가격의 40%(규제지역) 또는
                      70%(그 밖의 지역)를 넘게 빌리려 하면 LTV에 걸립니다. 수도권·규제지역은 시가
                      15억 원 이하 집도 최대 6억 원까지만 빌릴 수 있습니다.
                    </p>
                  </div>
                  <div>
                    <strong className="text-text-primary">DTI와 LTV 실전 시나리오</strong>
                    <p className="mt-1">
                      예: 그 밖의 수도권 집값 10억 원, 연소득 6,000만 원인 경우. LTV 70%면 7억
                      원이지만 수도권 최대한도 때문에 6억 원까지이고, DTI 60%면 연 상환액 3,600만
                      원까지입니다. 실제로는 DSR 40%(연 2,400만 원)가 가장 먼저 걸려, 약정금리 4.5%·
                      30년이면 금리 유형에 따라 약 2억 9천만~3억 9천만 원이 한도가 됩니다. 본 사이트
                      통합 계산기에서 '결정적 제약'(실 한도 결정 요인)을 표시해 드립니다.
                    </p>
                  </div>
                </div>
              </section>
              <section aria-label="공식 출처" className="card">
                <h2 className="mb-3 text-lg font-semibold">공식 출처 · 법적 근거</h2>
                <p className="mb-3 text-sm text-text-secondary">
                  금융위원회 가계부채 관리방안(2026.4.1) · 주택시장 안정화를 위한 대출수요 관리
                  방안(2025.10.15, 규제지역 LTV·DTI 40%, 수도권·규제지역 스트레스 금리 3%) ·
                  한국주택금융공사 보금자리론 업무처리기준(DTI 산식).
                </p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.fss.or.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      금융감독원, 주택담보대출 DTI/DSR 규제 안내
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.fsc.go.kr/po010101/85432"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      금융위원회, 주택시장 안정화를 위한 대출수요 관리 방안 (2025.10.15)
                    </a>
                  </li>
                </ul>
              </section>
              <MainBackrefBox mainCategoryUrl={getMainCategoryUrl('finance')} />
              <section
                aria-label="면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p>
                  본 페이지의 DTI 정보·공식은 참고용이며, 실제 대출 심사는 은행·2금융권의 내부
                  기준에 따라 결과가 다를 수 있습니다. 정확한 한도 시뮬레이션은 본 사이트의 통합
                  대출한도 계산기를 사용하시고, 실 신청 전 은행 상담을 받으시기 바랍니다.
                </p>
              </section>
            </CalculatorPageContent>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
