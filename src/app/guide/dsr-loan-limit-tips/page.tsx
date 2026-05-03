import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/dsr-loan-limit-tips/';
const DATE_PUBLISHED = '2026-05-03';
const DATE_MODIFIED = '2026-05-03';

export const metadata: Metadata = {
  title: 'DSR 대출한도를 늘리는 5가지 방법 2026 (스트레스 DSR 풀 적용) | calculatorhost',
  description:
    '2026년 스트레스 DSR 1.5%p 풀 적용으로 같은 소득의 대출한도가 줄었습니다. 신용대출 상환·소득 합산·고정금리 활용·대환·금융기관 변경 등 5가지 실전 방법을 시뮬레이션과 함께 정리.',
  keywords: ['DSR', '대출한도', '주담대', '스트레스 DSR', '대출 늘리는 법', '2026 DSR'],
  alternates: { canonical: URL },
  openGraph: {
    title: 'DSR 대출한도를 늘리는 5가지 방법 2026',
    description: '스트레스 DSR 1.5%p 풀 적용 환경에서 대출한도 확보 실전 가이드.',
    url: URL,
    type: 'article',
    images: ['/og-default.png'],
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DSR 대출한도 늘리는 5가지 방법',
    description: '스트레스 DSR 풀 적용 환경에서 한도 확보 실전 가이드.',
    images: ['/og-default.png'],
  },
};

const FAQ_ITEMS = [
  {
    question: '신용대출 1천만 원을 상환하면 주담대 한도가 얼마나 늘어나나요?',
    answer:
      '신용대출은 일반적으로 5년 만기 원리금균등으로 가정해 DSR에 산입됩니다. 4.5% 금리 5년이면 월 약 18.6만 원, 연 223만 원이 DSR에서 빠집니다. 연소득 1억 원, 은행 DSR 40% 기준이면 신규 주담대 한도가 약 4,500~5,000만 원 늘어날 수 있습니다(30년 원리금균등, 4% 금리 가정).',
  },
  {
    question: '맞벌이 부부의 소득 합산은 자동인가요?',
    answer:
      '아닙니다. 동일 차주(공동 명의·공동 채무자)일 때만 두 사람 소득을 합산해 DSR을 산정합니다. 한 사람이 단독 차주면 본인 소득만 인정됩니다. 공동 명의로 신청하면 한도는 늘지만, 한 명이 신용 문제 발생 시 다른 사람도 영향을 받는 점에 유의하세요.',
  },
  {
    question: '고정금리 대출이 변동금리보다 한도가 더 많이 나오나요?',
    answer:
      '네, 2026년 스트레스 DSR이 풀 적용되면서 변동·혼합·주기형 대출은 현재 금리에 1.5%p를 더해 DSR을 계산합니다. 고정금리(전 기간 고정)는 가산 없음. 같은 4.0% 금리라면 고정 4.0% vs 변동 5.5%로 DSR이 산정되어 한도 차이가 약 15~20% 발생할 수 있습니다.',
  },
  {
    question: '대환 시 한도가 더 나오나요?',
    answer:
      '기존 대출을 새 대출로 갈아타는 대환은 잔액 기준으로 DSR이 재산정됩니다. 만약 기존 대출의 만기가 짧아 월 상환액이 컸다면, 더 긴 만기로 대환하면 월 상환액이 줄어 추가 대출 여력이 생깁니다. 단, 대환 자체로 신용도·중도상환수수료·취급 가능 여부 검토 필수.',
  },
  {
    question: '2금융권으로 옮기면 DSR 한도가 늘어나나요?',
    answer:
      '저축은행·캐피탈·카드사 등 2금융권은 DSR 50% 적용(은행 40% 대비 +10%p). 단, 금리는 5~9% 수준으로 1금융권보다 높고, 신용평점 영향이 있을 수 있어 단기적 한도 확보 vs 장기적 비용을 비교해야 합니다.',
  },
  {
    question: 'DSR 계산기로 시뮬레이션 가능한가요?',
    answer:
      '네, calculatorhost의 DSR·대출한도 계산기에서 연소득, 기존 대출, 신규 대출 조건을 입력하면 DSR/LTV/DTI 3대 규제 모두 적용된 최대 한도와 결정적 제약 요인을 실시간으로 보여줍니다. 스트레스 DSR 적용 옵션도 토글 가능.',
  },
];

export default function DsrLoanLimitTipsPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: 'DSR 대출한도 늘리는 5가지 방법' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: 'DSR 대출한도를 늘리는 5가지 방법 (2026)',
    description:
      '스트레스 DSR 1.5%p 풀 적용 환경에서 같은 소득으로 대출한도를 더 받는 5가지 실전 방법.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: 'calculatorhost 편집팀',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['DSR', '대출한도', '스트레스 DSR', '주담대', '2026'],
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }}
      />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 px-4 py-8 md:px-8">
            <article className="mx-auto max-w-3xl space-y-8">
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '가이드', href: '/guide/' },
                    { name: 'DSR 대출한도 늘리는 5가지 방법' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">
                  금융 · 7분 읽기 · 2026-05-03
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  DSR 대출한도를 늘리는 5가지 방법 (2026)
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 스트레스 DSR이 변동·혼합·주기형 대출에 1.5%p 풀 적용되면서,
                  같은 소득의 대출한도가 평균 15~25% 줄었습니다. 같은 조건에서 한도를
                  최대화하는 5가지 실전 방법을 시뮬레이션과 함께 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-dsr-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">
                  핵심 요약
                </h2>
                <ul className="space-y-1.5 text-sm" data-speakable>
                  <li>① <strong>신용대출 먼저 상환</strong> — DSR에 가장 무겁게 잡힘</li>
                  <li>② <strong>맞벌이 공동명의로 소득 합산</strong> — 한도 50~80% 증가</li>
                  <li>③ <strong>고정금리 대출 선택</strong> — 스트레스 DSR 가산 없음</li>
                  <li>④ <strong>대환으로 만기 연장</strong> — 월 상환액 축소 = DSR 여유</li>
                  <li>⑤ <strong>금융기관 변경</strong> — 2금융권 DSR 50% (단, 금리 ↑)</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">방법 1. 신용대출·기존 대출 먼저 상환</h2>
                <p className="text-text-secondary leading-relaxed">
                  DSR은 모든 금융권 대출의 연 원리금을 합산해 연소득으로 나눈 비율입니다.
                  신용대출은 만기가 짧아(대개 1~5년) 연 원리금이 큰 비중을 차지합니다.
                  같은 1,000만 원이라도 5년 신용대출은 연 222만 원, 30년 주담대는
                  연 70만 원 수준 — DSR 영향이 3배 차이입니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  <strong>실행 우선순위</strong>: ① 카드론·현금서비스(고금리·짧은 만기) →
                  ② 마이너스 통장 → ③ 신용대출 → ④ 자동차 할부 → ⑤ 학자금 (저금리·긴 만기는 후순위).
                </p>
                <div className="rounded-lg bg-bg-raised p-4 text-sm">
                  <strong className="text-text-primary">시뮬레이션</strong>
                  <p className="mt-2 text-text-secondary">
                    연소득 1억, 신용대출 1,000만 원(5년 4.5%) 보유 시 → 신규 주담대 가능액
                    약 5억 원. 신용대출 상환 후 → 약 5억 4,500만 원 (+9%).{' '}
                    <Link href="/calculator/loan-limit/" className="text-primary-600 underline dark:text-primary-500">
                      직접 계산해보기
                    </Link>
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">방법 2. 맞벌이 공동명의 소득 합산</h2>
                <p className="text-text-secondary leading-relaxed">
                  부부가 모두 소득이 있으면 공동 차주(공동 명의·공동 채무자)로 신청해 두
                  사람 소득을 합산합니다. 단독 명의면 본인 소득만 인정.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  <strong>주의</strong>: 공동 차주는 한 명의 신용 문제가 다른 한 명에게도
                  영향(연체, 신용도 하락). 또한 이혼·사별 시 채무 분할 협의 필요. 단, 한도
                  확보 효과는 강력 — 부부 합산 1.5억 원이면 단독 1억 대비 한도 50~80% 증가.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">방법 3. 고정금리 대출 선택 (스트레스 DSR 우회)</h2>
                <p className="text-text-secondary leading-relaxed">
                  2026년 스트레스 DSR이 변동·혼합·주기형 대출에 풀 적용(+1.5%p 가산).
                  반면 <strong>전 기간 고정금리</strong>는 가산 없이 현재 금리로만 DSR 산정.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  같은 4.0% 금리에서 고정 vs 변동을 비교하면, 고정은 DSR 산정 금리 4.0%,
                  변동은 5.5% — 같은 한도를 받으려면 변동이 약 15~20% 더 작은 대출로
                  잡힙니다. 단, 고정금리는 통상 변동보다 0.3~0.5%p 더 비싸 장기 총
                  이자비용 비교는 별도 필요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">방법 4. 기존 대출 만기 연장 대환</h2>
                <p className="text-text-secondary leading-relaxed">
                  기존 대출의 만기가 짧아 월 상환액이 크면, 더 긴 만기로 대환해 월
                  상환액을 줄이는 방식. 30년 만기 → 40년 만기로 대환하면 월 상환액이
                  약 12% 감소 → DSR 여유 확보 → 신규 대출 가능액 증가.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  <strong>주의</strong>: 대환 시 중도상환수수료 (1~3년 차 1~1.5%) 발생,
                  새 대출 취급수수료, 신용평점 일시 하락 가능성. 또한 만기 연장은 총
                  이자 부담 증가 (40년 만기는 30년 대비 총이자 약 35% 더 부담).
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">방법 5. 금융기관 변경 (1금융 → 2금융)</h2>
                <p className="text-text-secondary leading-relaxed">
                  은행 DSR 40% 대비 2금융권(저축은행·캐피탈·카드사) 50% — +10%p 여유.
                  같은 연소득 1억 원이면 은행 4,000만 원 vs 2금융권 5,000만 원 (연 원리금 기준).
                </p>
                <p className="text-text-secondary leading-relaxed">
                  <strong>비용 트레이드오프</strong>: 2금융권 금리는 통상 5~9% (은행 4~5% 대비
                  높음). 또한 신용도·신용평점에 영향(2금융권 거래 시 평점 하락 가능).
                  단기 한도 확보 vs 장기 이자 부담을 신중히 비교해야 합니다.
                </p>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-4 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">
                  ⚠️ 주의사항
                </h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>• 본 가이드는 일반론이며 실제 대출 한도는 금융기관 내부 기준·신용평점·거래 이력 등에 따라 달라집니다.</li>
                  <li>• 본 사이트는 투자·금융상품 권유를 하지 않으며, 모든 대출 결정은 본인 책임입니다.</li>
                  <li>• 정확한 한도는 반드시 금융기관 상담을 통해 확인하세요.</li>
                </ul>
              </section>

              <section
                aria-label="관련 도구"
                className="card"
              >
                <h2 className="mb-3 text-lg font-semibold">관련 계산기</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/calculator/loan-limit/" className="text-primary-600 underline dark:text-primary-500">
                      대출한도 계산기 (DSR/LTV/DTI)
                    </Link>{' '}
                    — 본 가이드의 모든 시나리오를 직접 시뮬레이션
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/loan/" className="text-primary-600 underline dark:text-primary-500">
                      대출이자 계산기
                    </Link>{' '}
                    — 원리금균등·만기일시별 월 상환액 계산
                  </li>
                  <li>
                    →{' '}
                    <Link href="/glossary/" className="text-primary-600 underline dark:text-primary-500">
                      금융 용어사전
                    </Link>{' '}
                    — DSR·LTV·DTI·스트레스 DSR 정의
                  </li>
                </ul>
              </section>

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>:{' '}
                  <a href="https://www.fss.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">
                    금융감독원
                  </a>{' '}
                  주택담보대출 규제 고시,{' '}
                  <a href="https://www.fsc.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">
                    금융위원회
                  </a>{' '}
                  여신심사 가이드라인, 은행법 시행령 §24의4.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED}. 정책·금리 변경 시 즉시 반영합니다.
                </p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
