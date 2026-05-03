import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { AdSlot } from '@/components/ads/AdSlot';
import { StructuredSummary } from '@/components/calculator/StructuredSummary';
import { FaqSection } from '@/components/calculator/FaqSection';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import {
  buildSoftwareApplicationJsonLd,
  buildFaqPageJsonLd,
  buildBreadcrumbJsonLd,
  buildSpeakableJsonLd,
  buildWebPageJsonLd,
  buildHowToJsonLd,
} from '@/lib/seo/jsonld';
import { LoanCalculator } from './LoanCalculator';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/loan';

export const metadata: Metadata = {
  title: '대출이자 계산기 2026 | 상환방식별 월상환액 비교 | calculatorhost',
  description:
    '2026년 무료 대출이자 계산기. 원리금균등·원금균등·만기일시 상환방식별 월 납입액과 총이자를 즉시 비교. 거치기간·주담대 반영. 회원가입 불필요.',
  alternates: { canonical: URL },
  openGraph: {
    title: '대출이자 계산기 2026 — 상환방식별 월 납입액 비교',
    description: '원리금균등·원금균등·만기일시 상환방식별 월 상환액 및 총이자를 즉시 비교.',
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '대출이자 계산기 2026',
    description: '상환방식별 월상환액·총이자·상환 스케줄을 즉시 비교 계산.',
  },
};

const FAQ_ITEMS = [
  {
    question: '원리금균등과 원금균등 중 뭐가 유리한가요?',
    answer:
      '원리금균등은 매월 동일한 금액을 상환하므로 예산 계획이 수월합니다. 반면 원금균등은 초기 상환 부담이 크지만 총 이자가 더 적습니다. 현금흐름이 안정적이면 원리금균등, 초기 여유가 있으면 원금균등이 유리합니다.',
  },
  {
    question: '거치 기간은 총 이자에 어떤 영향을 주나요?',
    answer:
      '거치 기간 동안 이자만 납부하기 때문에 거치 기간이 길수록 총 이자가 증가합니다. 예를 들어 1년 거치는 12개월간 추가 이자를 내게 되어 거치 없이 바로 원리금균등으로 상환하는 것보다 총이자가 많아집니다.',
  },
  {
    question: '만기일시상환은 어떻게 계산되나요?',
    answer:
      '만기일시상환은 매월 이자만 납부하고 대출원금 전액을 만기(대출 종료)에 일시 상환합니다. 월 상환액이 가장 적지만, 만기에 큰 금액을 준비해야 합니다. 월 이자 = 원금 × 연이자율 ÷ 12 공식으로 계산합니다.',
  },
  {
    question: '중도상환 수수료는 계산에 포함되나요?',
    answer:
      '아니요, 본 계산기는 표준 상환 공식만 적용하며 중도상환 수수료는 포함하지 않습니다. 중도상환 시 수수료는 금융기관과 상품별로 다르므로 대출 받은 은행에 직접 확인하시기 바랍니다.',
  },
  {
    question: '대출 금리가 변동되면 어떻게 계산하나요?',
    answer:
      '본 계산기는 고정 금리를 기준으로 합니다. 변동 금리인 경우 금리 인상 시 월 상환액이 달라질 수 있으므로, 최악의 상황(금리 상한선)을 대비해 계산하신 후 은행에 확인하세요.',
  },
  {
    question: 'DSR·LTV 한도와는 어떻게 다른가요?',
    answer:
      '본 계산기는 상환액·이자를 계산하는 도구입니다. DSR(부채상환비율)·LTV(대출가치비율)는 대출 가능 한도를 판단하는 금융 규제로, 다른 계산기(대출한도 DSR/LTV)에서 확인할 수 있습니다.',
  },
] as const;

const RELATED = [
  { href: '/calculator/loan-limit', title: '대출한도 DSR', description: '최대 대출액 계산' },
  { href: '/calculator/savings', title: '적금 이자', description: '저축 수익률' },
  { href: '/calculator/deposit', title: '예금 이자', description: '정기예금 이자' },
  { href: '/calculator/capital-gains-tax', title: '양도소득세', description: '주택 판매 시' },
];

export default function LoanInterestPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '대출이자 계산기',
    description: '2026년 무료 대출이자 계산기. 원리금균등·원금균등·만기일시 상환방식별 월 납입액과 총이자를 즉시 비교.',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '대출이자 계산기 2026',
    description: '상환방식별 월상환액과 총이자를 즉시 비교 계산',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-04-27',
  });
  const howToLd = buildHowToJsonLd({
    name: '대출이자 계산기 사용 방법',
    description: '대출원금, 금리, 기간을 입력하여 상환방식별 월상환액과 총이자를 계산하는 단계별 가이드',
    steps: [
      { name: '대출금액 입력', text: '대출받을 원금(원)을 입력합니다.' },
      { name: '금리·기간 설정', text: '연 이자율(%)과 대출 기간(개월)을 입력합니다.' },
      { name: '거치기간 선택', text: '거치 기간이 있으면 입력합니다(선택사항).' },
      { name: '상환방식 선택', text: '원리금균등·원금균등·만기일시 중 상환방식을 선택합니다.' },
      { name: '결과 확인', text: '월상환액, 총이자, 상환 스케줄을 확인합니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })));
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '금융', url: 'https://calculatorhost.com/category/finance' },
    { name: '대출이자' },
  ]);
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
          <Sidebar />
          <main id="main-content" className="flex-1 px-4 py-8 md:px-8">
            <div className="mx-auto flex max-w-4xl flex-col gap-8">
              {/* H1 + 리드 */}
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '금융', href: '/category/finance/' },
                    { name: '대출이자' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  대출이자 계산기 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  대출 실행 전 상환방식별 월 부담액·총 이자·원리금 내역을 비교하여 상환 계획을 세우세요.
                  원리금균등·원금균등·만기일시 세 가지 상환 방식과 거치 기간을 반영하여 정확한 스케줄을 즉시 계산합니다.
                </p>
                <AuthorByline datePublished="2026-04-24" dateModified="2026-04-27" />
              </header>

              {/* GEO/AEO Structured Summary */}
              <StructuredSummary
                definition="대출이자는 대출원금에 대해 발생하는 비용으로, 상환 방식에 따라 월 상환액과 총이자가 달라집니다. 상환 방식은 원리금균등(월 일정액)·원금균등(월 원금 일정액)·만기일시(월 이자, 만기에 원금)로 나뉩니다(금융감독원 대출상환 표준공식)."
                table={{
                  caption: '상환방식별 월 상환액 비교',
                  headers: ['상환 방식', '특징'],
                  rows: [
                    ['원리금균등', '매월 동일액 상환, 예산 계획 수월'],
                    ['원금균등', '첫달 높음→점감, 총 이자 적음'],
                    ['만기일시', '월 이자만, 만기에 원금'],
                    ['거치 기간', '거치 동안 이자만, 이후 상환'],
                  ],
                }}
                tldr={[
                  '원리금균등: 월상환액 = P × r × (1+r)^n / ((1+r)^n - 1)',
                  '원금균등: 월 원금 고정, 이자는 점감',
                  '만기일시: 월 이자 = P × r, 만기에 원금 전액',
                  '거치 기간: 거치 동안 이자만 납부, 거치 이후 본 상환 시작',
                ]}
              />

              <AdSlot slot="loan-top" format="horizontal" />

              {/* 계산기 */}
              <LoanCalculator />

              {/* FAQ (중간 배치 - GEO 권장) */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 대출이란 무엇인가 */}
              <section aria-label="대출 개념" className="card">
                <h2 className="mb-4 text-2xl font-semibold">대출이자란 무엇인가요?</h2>
                <p className="mb-4 text-text-secondary">
                  대출이자는 금융기관에서 돈을 빌렸을 때 발생하는 비용입니다. 연 이자율(%)을 기준으로 하며,
                  대출원금·대출기간·상환 방식에 따라 월 상환액과 총이자가 달라집니다(금융감독원 대출상환 공식).
                </p>
                <p className="mb-4 text-text-secondary">
                  상환 방식은 세 가지로 나뉩니다. 원리금균등은 매월 일정 금액을 상환하는 방식으로 예산 계획이 쉽습니다.
                  원금균등은 매월 원금을 일정하게 상환하고 이자는 점점 줄어들어 총 이자가 적지만 초기 부담이 큽니다.
                  만기일시상환은 만기까지 이자만 납부하고 만기에 원금 전액을 상환하는 방식입니다.
                </p>
                <p className="text-text-secondary">
                  거치 기간이 있으면 그 기간 동안 이자만 납부하고 원금은 상환하지 않습니다. 거치 기간이 길수록
                  총 이자가 증가하므로 유의해야 합니다.
                </p>
              </section>

              {/* 상환 방식 비교 */}
              <section aria-label="상환 방식 비교" className="card">
                <h2 className="mb-4 text-2xl font-semibold">상환 방식 비교</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <caption className="sr-only">상환방식별 특징 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="px-4 py-3 text-left font-semibold text-text-secondary">상환방식</th>
                        <th scope="col" className="px-4 py-3 text-left font-semibold text-text-secondary">월 상환액</th>
                        <th scope="col" className="px-4 py-3 text-left font-semibold text-text-secondary">특징</th>
                        <th scope="col" className="px-4 py-3 text-left font-semibold text-text-secondary">적합한 경우</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="px-4 py-3 font-medium">원리금균등</td>
                        <td className="px-4 py-3">고정액</td>
                        <td className="px-4 py-3 text-text-secondary">초기 이자 높음→점감</td>
                        <td className="px-4 py-3 text-text-secondary">월 예산 안정적</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-4 py-3 font-medium">원금균등</td>
                        <td className="px-4 py-3">점감액</td>
                        <td className="px-4 py-3 text-text-secondary">초기 부담 높음, 총 이자 적음</td>
                        <td className="px-4 py-3 text-text-secondary">초기 현금 충분</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-4 py-3 font-medium">만기일시</td>
                        <td className="px-4 py-3">이자만</td>
                        <td className="px-4 py-3 text-text-secondary">월 부담 최소, 만기에 원금</td>
                        <td className="px-4 py-3 text-text-secondary">단기 운영자금</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 계산 공식 */}
              <section aria-label="계산 공식" className="card">
                <h2 className="mb-4 text-2xl font-semibold">계산 공식</h2>
                <ol className="space-y-4 text-sm leading-relaxed">
                  <li>
                    <strong>원리금균등상환</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      월상환액 = P × r × (1+r)^n / ((1+r)^n - 1)<br />
                      P = 대출원금, r = 월이자율(연이자율÷12÷100), n = 총개월수
                    </p>
                    <p className="mt-2 text-text-secondary">
                      매월 동일한 금액을 상환합니다. 초기에는 이자 비중이 높고, 시간이 지나면서 원금 비중이 높아집니다.
                    </p>
                  </li>
                  <li>
                    <strong>원금균등상환</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      매월 원금 = P / n (고정)<br />
                      매월 이자 = 남은원금 × r<br />
                      매월 상환액 = 매월 원금 + 매월 이자
                    </p>
                    <p className="mt-2 text-text-secondary">
                      원금은 매월 일정하게 상환하고, 이자는 잔금에 따라 매월 감소합니다. 총 이자가 원리금균등보다 적습니다.
                    </p>
                  </li>
                  <li>
                    <strong>만기일시상환</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      매월 이자 = P × r<br />
                      원금은 만기에 일시상환<br />
                      총이자 = P × r × n
                    </p>
                    <p className="mt-2 text-text-secondary">
                      만기까지 매월 이자만 납부하고, 만기가 되면 원금 전액을 상환합니다. 월 부담이 가장 적습니다.
                    </p>
                  </li>
                  <li>
                    <strong>거치 기간 처리</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      거치 기간(월) = 거치 동안 이자만 납부<br />
                      거치 후 = 나머지 기간에 위 공식 적용
                    </p>
                    <p className="mt-2 text-text-secondary">
                      예: 3년(36개월) 대출 중 6개월 거치면, 6개월은 이자만, 남은 30개월에서 원리금균등 계산.
                    </p>
                  </li>
                </ol>
              </section>

              {/* 주의사항 */}
              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">주의사항</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    본 계산기는 표준 상환 공식을 기반으로 하며, 실제 대출 상품은 은행별로 우대금리·수수료·선약정료 등이
                    다를 수 있습니다. 정확한 상환액은 대출 받은 금융기관에 확인하세요.
                  </li>
                  <li>
                    중도상환 수수료는 포함되지 않습니다. 금융기관과 상품별로 상이하므로 사전에 확인이 필요합니다.
                  </li>
                  <li>
                    변동 금리 대출의 경우 금리 인상 시 월 상환액이 재계산될 수 있습니다. 본 계산기는 고정 금리를 기준으로 합니다.
                  </li>
                  <li>
                    DSR·LTV 등 대출 한도는 별도 계산기에서 확인하세요. 본 계산기는 이자 계산 도구일 뿐 대출 승인을 보장하지 않습니다.
                  </li>
                  <li>
                    2026년 금융감독원 표준 공식을 기준으로 합니다. 세법·금융 규제 변경 시 달라질 수 있으므로 거래 전 최신 정보를 확인하세요.
                  </li>
                </ul>
              </section>

              {/* 활용 팁 */}
              <section aria-label="활용 팁" className="card">
                <h2 className="mb-3 text-2xl font-semibold">활용 팁</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>상환 방식 비교</strong>: 같은 대출액으로 세 가지 상환 방식을 비교하여 월 예산·총 이자를
                    고려해 선택하세요.
                  </li>
                  <li>
                    <strong>기간별 계산</strong>: 5년, 10년, 20년, 30년 등 다양한 기간으로 계산해 선택지를 확보하세요.
                  </li>
                  <li>
                    <strong>금리 시뮬레이션</strong>: 현재 금리뿐 아니라 금리 인상 시나리오(+0.5%, +1%)로 미리 대비하세요.
                  </li>
                  <li>
                    <strong>거치 기간 고려</strong>: 사업 초기 현금흐름이 필요하면 거치 기간을 설정하되, 거치 동안 이자가
                    증가함을 유의하세요.
                  </li>
                  <li>
                    <strong>스케줄 확인</strong>: 상환 스케줄 표를 통해 초기·중기·말기의 원금·이자 비중 변화를 확인하세요.
                  </li>
                </ul>
              </section>

              {/* 관련 계산기 */}
              <RelatedCalculators items={RELATED} />

              {/* 업데이트 로그 */}
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-04-24: 초판 공개 (원리금균등·원금균등·만기일시 상환방식 지원)</li>
                </ul>
              </section>

              {/* 참고 자료 */}
              <section aria-label="참고 자료" className="card">
                <h2 className="mb-3 text-lg font-semibold">참고 자료 및 출처</h2>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    <a
                      href="https://www.fss.or.kr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      금융감독원 — 대출 상품 비교 및 금리 정보
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.bok.or.kr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      한국은행 — 기준금리 및 금리 인상·인하 정보
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.kftc.or.kr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      금융결제원 — 금융 표준 및 정보
                    </a>
                  </li>
                </ul>
              </section>

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 금융감독원 대출상환 표준공식, 상법 §54.
                </p>
                <p>
                  본 계산기의 결과는 교육·참고용이며 법적 효력이 없습니다. 실제 대출 상품은 금융기관별로 우대금리·수수료·약정료
                  등이 상이하므로 대출 전 금융기관에 정확한 상환액을 확인하시기 바랍니다.
                </p>
              </section>

            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
