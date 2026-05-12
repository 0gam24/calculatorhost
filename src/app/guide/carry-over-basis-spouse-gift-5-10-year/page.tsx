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

const URL = 'https://calculatorhost.com/guide/carry-over-basis-spouse-gift-5-10-year/';
const DATE_PUBLISHED = '2026-05-12';
const DATE_MODIFIED = '2026-05-12';

export const metadata: Metadata = {
  title: '이월과세 5년→10년 확대 완벽 정리 2026 | 배우자·직계 증여 양도세',
  description:
    '이월과세 정의·소득세법 §97의2·2025년 5년에서 10년 확대·증여자 취득가 적용·면제 사유 5가지·시뮬 사례 2개·함정 5가지·절세 전략·신고 방법.',
  keywords: [
    '이월과세',
    '배우자 증여 양도세',
    '이월과세 5년 10년',
    '소득세법 97의2',
    '증여자 취득가',
    '직계존비속 증여',
    '배우자 선물 양도세',
    '증여 후 양도',
    '이월과세 면제',
    '2025년 개정 이월과세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '이월과세 5년→10년 확대 완벽 정리 2026',
    description: '이월과세 정의·소득세법 §97의2·배우자·직계 증여 후 양도·5년→10년 확대·시뮬·면제.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '이월과세 5년→10년 확대 완벽 정리',
    description: '배우자에게 5억 주택 증여 후 8년 양도 = 이월과세 미적용 → 약 3400만 절세. 10년 요건 2025년부터 시행.',
  },
};

const FAQ_ITEMS = [
  {
    question: '이월과세란 정확히 무엇인가요?',
    answer:
      '배우자·직계존비속에게 증여받은 자산을 일정 기간(2024년까지 5년, 2025년 양도분부터 10년) 내에 제3자에게 양도할 때, 증여자가 취득한 가액으로 양도가를 계산하는 제도입니다(소득세법 §97의2). 예를 들어 남편이 5억에 취득한 주택을 아내가 받아 8년 후 7억에 양도하면, 이월과세 미적용 시는 양도차익 2억으로, 적용 시(5년 내라면) 양도차익 5억으로 계산되어 양도세가 크게 올라갑니다.',
  },
  {
    question: '이월과세 기간이 5년에서 10년으로 확대된 이유는?',
    answer:
      '부부·가족 간 증여 후 단기 양도로 양도세를 회피하는 행위를 차단하기 위해 2024년 12월 31일 개정되어 2025년 1월 1일부터 시행되었습니다. 5년으로는 충분하지 않다고 국세청이 판단하여 10년으로 연장하였습니다. 따라서 2024년 12월 31일 이전 증여는 5년, 2025년 1월 1일 이후 증여는 10년이 적용됩니다.',
  },
  {
    question: '이월과세가 적용되면 증여세도 환급되나요?',
    answer:
      '아니오. 이미 납부한 증여세는 환급되지 않습니다. 대신 소득세법 §97의2 ②에 따라 양도세 계산 시 기납부한 증여세를 공제하는 방식으로 이중과세를 조정합니다. 예를 들어 증여세 6,000만 원을 이미 냈다면, 양도세 계산 후 이를 차감합니다.',
  },
  {
    question: '1세대1주택 비과세가 이월과세 면제 사유인가요?',
    answer:
      '네. 1세대1주택 양도소득세 비과세(보유 2년 + 12억 이하)가 적용되는 양도는 이월과세가 면제됩니다(소득세법 §97의2 ①). 남편 이름으로 9억짜리 아파트를 아내에게 증여한 후 아내가 3년 후 12억에 양도하면, 1세대1주택 비과세 조건을 만족하므로 이월과세 미적용입니다.',
  },
  {
    question: '장기보유특별공제 80%가 이월과세 후에도 적용되나요?',
    answer:
      '네. 소득세법 §95 ④에 따라 보유 기간은 증여자가 취득한 시점부터 계산됩니다. 예를 들어 남편이 10년 전 취득한 주택을 아내에게 2년 전 증여했다면, 아내가 양도할 때의 보유 기간은 10년 + 2년 = 12년이므로 장기보유특별공제 80%를 받을 수 있습니다. 단, 이월과세가 적용되어 양도차익이 커지므로 최종 세금 계산이 복잡합니다.',
  },
];

export default function CarryOverBasisSpouseGift510YearGuide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '이월과세 5년→10년 확대 완벽 정리' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '이월과세 5년→10년 확대 완벽 정리 2026',
    description:
      '이월과세 정의·소득세법 §97의2·배우자·직계존비속 증여 후 양도·5년→10년 확대·증여자 취득가 적용·면제 사유 5가지·시뮬 2개·함정 5가지·절세 전략·신고 방법.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['이월과세', '배우자 증여', '양도세', '소득세법 97의2', '절세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '이월과세 5년→10년 확대 완벽 정리 2026',
    description: '이월과세 정의·소득세법 §97의2·배우자·직계 증여 후 양도·5→10년 확대·시뮬·면제·함정 5가지.',
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
                    { name: '이월과세 5년→10년 확대 완벽 정리' },
                  ]}
                />
                <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">
                  이월과세 5년→10년 확대 완벽 정리 2026
                </h1>
                <p className="mt-3 text-lg text-text-secondary" data-speakable>
                  배우자나 자녀에게 자산을 선물(증여)한 후 일정 기간 내에 그 자산을 양도할 때,
                  세법은 <strong>증여자가 원래 취득한 가격</strong>을 기준으로 세금을 계산하게 합니다.
                  이를 <strong>이월과세</strong>라 하는데(소득세법 §97의2), 부부·가족 간 세금 회피를 막기 위해
                  2025년부터 기간이 5년에서 <strong>10년으로 확대</strong>되었습니다.
                  정의·계산·면제 사유·함정·절세 전략을 정확히 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-carry-over-top" format="horizontal" />

              {/* 1. 이월과세 정의 */}
              <section aria-label="이월과세 정의" className="card">
                <h2 className="mb-4 text-2xl font-semibold">이월과세란?</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  이월과세는 배우자나 직계존비속(부모·자녀)에게 받은 자산을 일정 기간 내에
                  <strong>타인(제3자)에게 양도</strong>할 때, 그 자산의 양도가를 계산할 때 증여받은 시점의 시가가 아닌
                  <strong>증여자가 원래 취득한 가격</strong>을 사용하는 제도입니다(소득세법 §97의2).
                  결과적으로 양도차익이 커져서 양도세가 증가합니다.
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-2">
                    <strong className="text-text-primary">이월과세 핵심 메커니즘</strong>
                  </p>
                  <p>
                    남편이 5억에 취득한 주택을 아내에게 7억에 증여합니다. 아내가 8년 후 10억에 양도하는 경우,
                    이월과세 미적용이면 양도차익 = 10억 − 7억 = 3억입니다. 하지만 증여일부터 5년(이제는 10년) 내 양도이므로
                    이월과세 적용 시 양도차익 = 10억 − 5억 = 5억으로 계산되어 양도세가 크게 올라갑니다.
                  </p>
                </div>
              </section>

              {/* 2. 2025년 5년→10년 확대 */}
              <section aria-label="5년→10년 확대" className="card border-l-4 border-l-highlight-500">
                <h2 className="mb-4 text-2xl font-semibold">2025년 개정: 5년→10년 확대 (소득세법 §97의2 본문 개정)</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  2024년 말 소득세법 §97의2 본문 개정으로 이월과세 적용 기간이 5년에서 10년으로 연장되었으며
                  <strong> 2025년 1월 1일 이후 증여분부터 시행</strong>됩니다. 부부·가족 간 단기 양도를 통한 양도세 회피
                  시도를 차단하기 위한 조치입니다. 정확한 시행일·경과조치는 양도 시점의 시행령·고시를 별도 확인하세요.
                </p>

                <div className="mb-6 space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">적용 기준 시점</p>
                  <div className="text-sm text-text-secondary space-y-2">
                    <p>
                      <strong>2024년 12월 31일 이전 증여</strong> → 5년 적용
                      <br />
                      (2029년 12월 31일까지 양도 시 이월과세 적용)
                    </p>
                    <p>
                      <strong>2025년 1월 1일 이후 증여</strong> → 10년 적용
                      <br />
                      (2035년 1월 1일까지 양도 시 이월과세 적용)
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-highlight-500/10 p-4">
                  <p className="mb-2 font-semibold text-text-primary">운영자 주의</p>
                  <p className="text-sm text-text-secondary">
                    증여일이 2024년 12월 31일과 2025년 1월 1일 사이에 있다면 어느 세율이 적용되는지 명확히 해야 합니다.
                    이월과세 기간이 5년 vs 10년인지에 따라 최종 세금 부담이 크게 달라질 수 있습니다.
                  </p>
                </div>
              </section>

              {/* 3. 이월과세 적용 메커니즘 */}
              <section aria-label="적용 메커니즘" className="card">
                <h2 className="mb-4 text-2xl font-semibold">이월과세 계산 메커니즘</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  이월과세가 적용될 때와 미적용될 때 양도세 계산이 어떻게 달라지는지 단계별로 정리합니다.
                </p>

                <div className="mb-6 space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">1단계: 증여재산가액 평가</p>
                  <div className="text-sm text-text-secondary">
                    <p className="mb-1">증여자 취득가: 5억원</p>
                    <p className="mb-1">증여 시점 시가: 7억원</p>
                    <p className="text-xs text-text-tertiary">→ 증여세는 7억에 기준하여 계산 (증여세법 §47)</p>
                  </div>
                </div>

                <div className="mb-6 space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">2단계: 양도가액 확정 (이월과세 적용 여부 판단)</p>
                  <div className="text-sm text-text-secondary space-y-2">
                    <p>
                      <strong>이월과세 미적용 (5년/10년 경과 후 양도)</strong>
                      <br />
                      양도가액 = 수증자 입장 취득가 = 증여 시점 시가 7억
                    </p>
                    <p>
                      <strong>이월과세 적용 (5년/10년 내 양도)</strong>
                      <br />
                      양도가액 = 증여자 원래 취득가 = 5억 (소득세법 §97의2)
                    </p>
                  </div>
                </div>

                <div className="mb-6 space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">3단계: 양도차익 계산 (1세대1주택 비과세 미적용 가정)</p>
                  <div className="text-sm text-text-secondary space-y-2">
                    <p>
                      <strong>시나리오: 양도가액 10억, 경비 2,000만, 8년 보유, 다주택자라 비과세·장특공제 80% 미적용</strong>
                    </p>
                    <p>
                      <strong>이월과세 미적용</strong>
                      <br />
                      양도차익 = 10억 − 7억(증여 시점 시가) − 2,000만 = 2.8억
                      <br />
                      기본공제 250만 → 과세표준 2.775억
                      <br />
                      누진세율 38% (3억 이하) − 누진공제 1,994만 = 약 2.775억 × 38% − 1,994만 ≈ 약 8,550만
                    </p>
                    <p>
                      <strong>이월과세 적용 (5년 내 양도)</strong>
                      <br />
                      양도차익 = 10억 − 5억(증여자 원래 취득가) − 2,000만 = 4.8억
                      <br />
                      기본공제 250만 → 과세표준 4.775억
                      <br />
                      누진세율 40% (5억 이하) − 누진공제 2,594만 = 약 4.775억 × 40% − 2,594만 ≈ 약 1.65억
                      <br />
                      → 기납부 증여세(상증법 §47의 정상 증여세, 시점 시가 기준)는 §97의2 ②에 따라 양도세 계산 시 필요경비
                      가산되어 효과적으로 차감
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-primary-500/10 p-4">
                  <p className="mb-2 font-semibold text-text-primary">핵심 포인트</p>
                  <p className="text-sm text-text-secondary">
                    이월과세 적용 시 양도차익이 2억 늘어나 양도세가 약 7,950만 더 증가. 기납부 증여세는 §97의2 ②에 따라
                    필요경비로 가산되므로 일정 부분 상쇄되나, 양도차익 구간이 누진세 상위로 올라가는 효과 때문에 일반적으로
                    이월과세 적용이 불리합니다. 정확한 금액은 인적공제·장기보유공제·1세대1주택 판정에 따라 크게 변동하므로
                    홈택스 모의계산 또는 세무사 검증 필수.
                  </p>
                </div>
              </section>

              {/* 4. 실제 시뮬레이션 */}
              <section aria-label="실제 시뮬레이션" className="card">
                <h2 className="mb-4 text-2xl font-semibold">실제 사례 2개 — 부부 증여와 직계비속 증여</h2>

                <div className="mb-8 rounded-lg border border-primary-500 bg-primary-500/5 p-4">
                  <p className="mb-3 font-semibold text-text-primary">사례 1: 배우자 증여 — 주택 5억(취득) → 7억(시가) 증여 → 8년 후 10억 양도</p>
                  <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary mb-4">
                    <li>증여자(남편) 취득가: 5억원 (10년 전)</li>
                    <li>증여 시점 시가(시세감정): 7억원</li>
                    <li>수증자(아내): 배우자</li>
                    <li>양도가액: 10억원 (8년 후)</li>
                    <li>경비: 2,000만원</li>
                  </ul>

                  <div className="space-y-3">
                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="mb-2 text-sm font-semibold text-text-primary">증여세 계산 (남편 → 아내)</p>
                      <p className="text-xs text-text-secondary">
                        증여재산가액 7억 − 배우자 공제 6억 = 1억
                        <br />
                        세율 10% (1억 이하) → 증여세 = 1,000만원
                      </p>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="mb-2 text-sm font-semibold text-text-primary">양도세 계산 (이월과세 적용 — 5년 내, 다주택자 가정)</p>
                      <p className="text-xs text-text-secondary">
                        양도차익 = 10억 − 5억(증여자 취득가 이월) − 2,000만 = 4.8억
                        <br />
                        기본공제 250만 → 과세표준 4.775억
                        <br />
                        누진세율 40% (5억 이하 구간) − 누진공제 2,594만
                        <br />
                        양도세(gross) ≈ 4.775억 × 40% − 2,594만 ≈ 약 1.65억
                        <br />
                        기납부 증여세 1,000만은 §97의2 ②에 따라 필요경비 가산되어 일정 부분 상쇄
                      </p>
                    </div>

                    <div className="rounded-lg border-2 border-primary-500 p-3 bg-primary-500/5">
                      <p className="text-sm font-semibold text-text-primary mb-1">총 세금 부담 (다주택자 가정)</p>
                      <p className="text-sm text-text-secondary">
                        증여세 1,000만 + 양도세 약 1.6억 ≈ <strong>약 1.7억</strong>
                      </p>
                      <p className="text-xs text-text-tertiary mt-1">
                        비교: 이월과세 미적용(5/10년 경과)이면 양도차익 2.8억 → 양도세 약 8,550만으로, 총 약 9,550만.
                        약 7,000만 추가 부담. 1세대1주택 비과세·장특공제 80% 적용 가능 시 차이 폭 더 축소 가능.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-secondary-500 bg-secondary-500/5 p-4">
                  <p className="mb-3 font-semibold text-text-primary">사례 2: 자녀 증여 — 주택 8억(취득) → 11억(시가) 증여 → 4년 후 13억 양도</p>
                  <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary mb-4">
                    <li>증여자(부모) 취득가: 8억원 (12년 전)</li>
                    <li>증여 시점 시가: 11억원</li>
                    <li>수증자: 성년 직계비속(자녀)</li>
                    <li>양도가액: 13억원 (4년 후)</li>
                    <li>경비: 3,000만원</li>
                    <li>보유 기간: 부모 12년 + 자녀 4년 = 16년</li>
                  </ul>

                  <div className="space-y-3">
                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="mb-2 text-sm font-semibold text-text-primary">증여세 계산</p>
                      <p className="text-xs text-text-secondary">
                        증여재산가액 11억 − 직계비속 공제 5,000만 = 10.5억
                        <br />
                        세율 30% (10억 이하 구간) → 누진공제 6,000만
                        <br />
                        증여세 = 10.5억 × 30% − 6,000만 = 1.95억
                      </p>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="mb-2 text-sm font-semibold text-text-primary">양도세 계산 (이월과세 적용 — 4년, 자녀가 1세대1주택 가정)</p>
                      <p className="text-xs text-text-secondary">
                        양도차익 = 13억 − 8억(증여자 취득가 이월) − 3,000만 = 4.7억
                        <br />
                        12억 비과세 한도(1세대1주택)에서 12억 초과분만 과세: 4.7억 × (13억 − 12억)/13억 ≈ 약 3,615만
                        <br />
                        보유 합산 16년 + 거주 요건 충족 시 장기보유특별공제 표2(보유 40% + 거주 40% = 80%) 적용 가능
                        (소득세법 §95 ④)
                        <br />
                        공제 후 과세표준 = 약 3,615만 × 20% = 약 723만
                        <br />
                        기본공제 250만 후 약 473만 × 6% ≈ <strong>약 28만</strong>
                      </p>
                    </div>

                    <div className="rounded-lg border-2 border-secondary-500 p-3 bg-secondary-500/5">
                      <p className="text-sm font-semibold text-text-primary mb-1">총 세금 부담 (1세대1주택·장특공제 80% 적용)</p>
                      <p className="text-sm text-text-secondary">
                        증여세 1.95억 + 양도세 약 28만 ≈ <strong>약 1.95억</strong>
                      </p>
                      <p className="text-xs text-text-tertiary mt-1">
                        1세대1주택 12억 한도 + 장특공제 80% 결합 시 양도세는 미미. 단, 자녀가 별도 주택을 보유하거나 거주
                        2년 미충족 시 12억 한도·장특공제 적용 불가 → 양도세 약 1.6억 발생 가능. 정확한 시뮬은 홈택스
                        모의계산 또는 세무사 검증 필수.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <AdSlot slot="guide-carry-over-mid" format="rectangle" />

              {/* 5. 이월과세 면제 사유 5가지 */}
              <section aria-label="면제 사유" className="card border-l-4 border-l-highlight-500">
                <h2 className="mb-4 text-2xl font-semibold">이월과세 면제 사유 5가지</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  다음 조건을 만족하면 5년/10년이 지나지 않았어도 이월과세가 적용되지 않습니다(소득세법 §97의2 ①).
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">면제 1: 1세대1주택 양도소득세 비과세</p>
                    <p className="text-sm text-text-secondary">
                      보유 기간 2년 이상, 양도가액 12억 이하인 1세대1주택이 비과세되는 경우 이월과세 미적용.
                      <br />
                      예: 남편이 아내에게 준 9억짜리 주택을 아내가 3년 후 11억에 양도하면, 1세대1주택 비과세 대상이므로 이월과세 미적용.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">면제 2: 사망으로 인한 상속 후 양도</p>
                    <p className="text-sm text-text-secondary">
                      수증자가 사망한 경우, 상속인이 그 자산을 양도할 때는 이월과세 미적용.
                      <br />
                      예: 아내가 남편으로부터 받은 주택을 소유하다가 사망하고, 자녀가 상속받아 양도 시 이월과세 미적용.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">면제 3: 수용·공익사업 대가의 양도</p>
                    <p className="text-sm text-text-secondary">
                      도시 재개발·도로 확장 등 공익사업으로 강제 수용되어 양도하는 경우.
                      <br />
                      예: 아내가 받은 토지가 도시계획도로로 수용 결정되어 보상금을 받을 때 이월과세 미적용.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">면제 4: 5년/10년 경과 후 양도</p>
                    <p className="text-sm text-text-secondary">
                      증여일로부터 5년(2024년 12월 31일 이전 증여) 또는 10년(2025년 1월 1일 이후 증여) 경과 후 양도 시 이월과세 미적용.
                      <br />
                      예: 2025년 2월 증여 → 2035년 2월 이후 양도는 이월과세 미적용.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">면제 5: 1세대1주택 비과세 외 별도 면제 사유는 시행령 확인</p>
                    <p className="text-sm text-text-secondary">
                      소득세법 §97의2 단서 및 시행령에는 위 4가지 외에도 일부 면제·예외 규정이 있을 수 있습니다(예: 사업
                      양수도 일부 자산, 토지·건물 외 자산). 정확한 면제 범위는 양도 시점의 소득세법 시행령 §163의2 등
                      별도 확인이 필요하며, 세무사 상담을 권장합니다. 본 가이드의 면제 4가지(1세대1주택·수증자 사망 상속·
                      수용·기간 경과)는 가장 일반적인 사례입니다.
                    </p>
                  </div>
                </div>
              </section>

              {/* 6. 함정 5가지 */}
              <section aria-label="함정 5가지" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-semibold">⚠️ 이월과세 함정 5가지</h2>
                <div className="space-y-3 text-text-secondary">
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 1: 기간 계산 오류 — 5년 vs 10년</strong>
                    </p>
                    <p className="text-sm">
                      증여일이 2024년 12월 말과 2025년 1월 초 사이에 있으면, 5년인지 10년인지를 정확히 판단해야 합니다.
                      예를 들어 2024년 12월 31일 증여는 5년(2029년 12월 31일까지),
                      2025년 1월 1일 증여는 10년(2035년 1월 1일까지) 적용됩니다.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 2: 1세대1주택 요건 오판</strong>
                    </p>
                    <p className="text-sm">
                      부부 중 한 명이 2주택 이상을 소유한다면 1세대1주택 판정에 실패하여 이월과세가 적용될 수 있습니다.
                      또한 배우자가 증여받은 후 다른 주택을 별도 구입하면 다주택이 되어 이월과세 면제 상실.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 3: 기납부 증여세 차감 누락</strong>
                    </p>
                    <p className="text-sm">
                      이월과세가 적용되면 양도세 계산 시 이미 납부한 증여세를 공제해야 합니다(소득세법 §97의2 ②).
                      이를 모르면 중복 납부하게 됩니다. 반드시 세무사에게 기납부 증여세 증명서를 제출해야 합니다.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 4: 장기보유특별공제 오적용</strong>
                    </p>
                    <p className="text-sm">
                      이월과세 적용 시 보유 기간은 증여자 취득일부터 계산됩니다(소득세법 §95 ④).
                      장기보유특별공제는 이월과세 적용과 함께 계산되어 복잡하므로 세무사 검증이 필수입니다.
                      예: 10년 전 취득 → 3년 전 증여 → 지금 양도 = 13년 보유로 장기공제 80% 대상이지만,
                      이월과세로 인한 양도차익 증가와의 상호작용을 정확히 계산해야 합니다.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 5: 간접 이월과세 미적용 함정</strong>
                    </p>
                    <p className="text-sm">
                      배우자에게 증여한 후 배우자가 다시 자녀에게 기증(재증여)하는 경우,
                      자녀가 양도할 때 이월과세 기간 계산이 복잡해집니다.
                      예: 남편 → 아내(증여) → 자녀(재증여) 경로에서 자녀의 기간은 어디서부터 계산되는지 불명확할 수 있습니다.
                    </p>
                  </div>
                </div>
              </section>

              {/* 7. 절세 전략 */}
              <section aria-label="절세 전략" className="card">
                <h2 className="mb-4 text-2xl font-semibold">이월과세를 고려한 절세 전략</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  이월과세가 적용되는 상황을 미리 알면, 증여 시점·수증자 선택·보유 기간을 전략적으로 관리할 수 있습니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">전략 1: 증여 시점 선택</p>
                    <p className="text-sm text-text-secondary">
                      자산이 충분히 장기 보유되었거나, 가까운 미래에 양도할 예정이 아니라면
                      2024년 12월 31일 이전에 증여하여 5년 규정을 적용받는 것이 유리할 수 있습니다.
                      반면 수년 후 양도할 예정이라면, 10년 규정 이후에 양도하도록 계획하여 이월과세 회피.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">전략 2: 1세대1주택 조건 확인</p>
                    <p className="text-sm text-text-secondary">
                      배우자에게 증여하기 전에, 배우자가 다른 주택을 소유하지 않았는지 확인하고,
                      증여 후 10년간 추가 주택 구입을 하지 않도록 계획.
                      1세대1주택 비과세가 인정되면 이월과세 전체 면제.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">전략 3: 자녀 증여 시 장기 보유</p>
                    <p className="text-sm text-text-secondary">
                      자녀에게 증여하는 경우, 부모가 이미 장기 보유한 자산을 선택하면,
                      보유 기간이 부모 + 자녀로 합산되어 장기보유특별공제 80%를 받을 가능성 높음.
                      이월과세가 적용되어도 공제로 세금을 상쇄할 수 있습니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">전략 4: 분할 증여</p>
                    <p className="text-sm text-text-secondary">
                      자산을 여러 번에 나누어 증여하면(예: 배우자에게 6억, 자녀에게 각각 3억),
                      각각의 공제 한도를 다시 적용받아 전체 증여세를 줄일 수 있습니다.
                      단, 10년 이내 재증여 시 공제가 누적되므로 이월과세 기간 계산 필수.
                    </p>
                  </div>

                  <div className="rounded-lg bg-primary-500/10 p-4">
                    <p className="mb-2 font-semibold text-text-primary">전략 5: 세무사 사전 상담</p>
                    <p className="text-sm text-text-secondary">
                      이월과세는 계산이 복잡하고, 개인별 상황(다주택 소유, 부양가족, 기타 소득)에 따라 결과가 크게 달라집니다.
                      반드시 증여 전에 세무사와 상담하여 최적 증여 계획을 수립하는 것이 장기적 절세 효과를 극대화합니다.
                    </p>
                  </div>
                </div>
              </section>

              {/* 8. 신고 절차 */}
              <section aria-label="신고 절차" className="card">
                <h2 className="mb-4 text-2xl font-semibold">이월과세 신고 절차</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  이월과세가 적용되는 경우 증여세와 양도세를 정확히 신고해야 합니다.
                  특히 기납부 증여세 차감을 빠뜨리지 않아야 합니다.
                </p>

                <ol className="list-inside list-decimal space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>증여세 신고</strong> (증여일로부터 3개월 이내)
                    <ul className="list-inside list-disc ml-4 mt-1 space-y-1">
                      <li>
                        <a
                          href="https://www.hometax.go.kr"
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="text-primary-600 underline dark:text-primary-500"
                        >
                          홈택스
                        </a>
                        에서 증여세 신고서 작성
                      </li>
                      <li>증여자 취득가, 증여 시점 시가(감정평가서 또는 공시지가), 공제액, 세율 적용</li>
                      <li>첨부: 증여계약서(선택), 감정평가서 또는 공시지가 증명</li>
                      <li>
                        <strong>중요:</strong> "이월과세 적용 예정" 메모 또는 별도 신청서 작성 (향후 양도세 신고 시 기납부 증여세 차감 근거)
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>양도소득세 신고</strong> (양도일로부터 2개월 이내)
                    <ul className="list-inside list-disc ml-4 mt-1 space-y-1">
                      <li>
                        <a
                          href="https://www.hometax.go.kr"
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="text-primary-600 underline dark:text-primary-500"
                        >
                          홈택스
                        </a>
                        에서 양도소득세 신고서 작성
                      </li>
                      <li>
                        <strong>취득가 입력 시:</strong> 증여자 원래 취득가(증여 시점 시가 아님) 입력 (소득세법 §97의2)
                      </li>
                      <li>
                        <strong>양도차익 계산:</strong> (양도가액 − 증여자 취득가 − 경비) − 공제 = 과세표준
                      </li>
                      <li>
                        <strong>기납부 증여세 차감:</strong> 양도세 계산 후 이미 납부한 증여세를 차감 (소득세법 §97의2 ②)
                      </li>
                      <li>1세대1주택 판정, 장기보유특별공제 80% 조건 확인</li>
                      <li>첨부: 증여 당시 평가 자료, 양도 당시 양도가액 증명(계약서·중개수수료 영수증), 기납부 증여세 증명서</li>
                    </ul>
                  </li>
                  <li>
                    <strong>세무사 상담 (강력 권장)</strong>
                    <ul className="list-inside list-disc ml-4 mt-1 space-y-1">
                      <li>
                        이월과세 적용 여부 판단(5년 vs 10년, 면제 요건 충족 여부) 필수
                      </li>
                      <li>
                        기납부 증여세 정확한 계산 및 차감 금액 확인
                      </li>
                      <li>
                        장기보유특별공제와 이월과세의 상호작용 계산(복잡함)
                      </li>
                      <li>
                        신고 전 세무사 검토 비용 &lt;&lt; 세무조사 리스크
                      </li>
                    </ul>
                  </li>
                </ol>

                <p className="mt-4 text-sm text-text-tertiary">
                  중요: 이월과세는 세법상 해석이 개인 상황에 따라 달라질 수 있습니다.
                  특히 부부 간 거래인 만큼 증여의 실질성 입증이 중요하며,
                  신고 전 반드시 세무사 또는 국세청 상담을 받으시기 바랍니다.
                </p>
              </section>

              {/* 9. FAQ */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 10. 관련 계산기·가이드 */}
              <section aria-label="관련 계산기·가이드" className="card">
                <h2 className="mb-4 text-2xl font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-text-secondary">
                  <li>
                    → <Link href="/calculator/capital-gains-tax/" className="text-primary-600 underline dark:text-primary-500">양도소득세 계산기</Link> — 1세대1주택·다주택·일시적2주택 시뮬
                  </li>
                  <li>
                    → <Link href="/guide/one-household-12-billion-exemption/" className="text-primary-600 underline dark:text-primary-500">1세대1주택 12억 한도 완전 정리</Link> — 비과세 조건·비례 과세
                  </li>
                  <li>
                    → <Link href="/guide/long-term-holding-special-deduction-80-percent/" className="text-primary-600 underline dark:text-primary-500">장기보유특별공제 80% 완전 정리</Link> — 보유·거주 분리 계산
                  </li>
                  <li>
                    → <Link href="/guide/temporary-two-houses-capital-gains-exemption/" className="text-primary-600 underline dark:text-primary-500">일시적 2주택 양도세 비과세 3년 완벽 정리</Link> — 1년 경과·3년 기한
                  </li>
                  <li>
                    → <Link href="/guide/burden-gift-debt-assumption-tax/" className="text-primary-600 underline dark:text-primary-500">부담부증여 양도+증여세 완벽 정리</Link> — 채무인수·증여 분리 과세
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="이월과세 5년→10년 확대 완벽 정리 2026"
                url={URL}
                description="이월과세 정의·소득세법 §97의2·배우자·직계 증여 후 양도·5→10년 확대·면제 5가지·함정 5가지·절세 전략."
              />

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §97의2 (이월과세 — 2024년 본문 개정으로 5년→10년 확대,
                  2025-01-01 이후 증여분부터 시행) · §95 (장기보유특별공제, 보유 합산) · §97 (필요경비) · §103 (양도소득
                  기본공제 250만 원) · §104 (양도세율) · §105 (예정신고) · 시행령 §163의2 (이월과세 면제 사유 별도 확인) ·
                  상속세및증여세법 §47 (증여재산가액) · §53 (증여재산공제) · §56 (증여세율). 참고:{' '}
                  <a
                    href="https://www.law.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    법령정보센터
                  </a>
                  , <a
                    href="https://www.nts.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청
                  </a>
                  , <a
                    href="https://www.hometax.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    홈택스
                  </a>
                  .
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 일반 정보 제공 목적이며 세무·법적 조언이 아닙니다. 이월과세는
                  증여 시점, 자산 종류, 수증자와의 관계, 보유 기간 등에 따라 적용 여부와 계산 방식이 달라질 수 있습니다.
                  또한 2025년 1월 1일부터 5년 → 10년으로 확대된 만큼, 기존 거래와 신규 거래의 규정이 다릅니다.
                  반드시 세무사 또는 국세청 상담을 통해 개인 상황에 맞는 정확한 계산을 받으시기 바랍니다.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (calculatorhost). 본 가이드는 AI 보조
                  작성 후 운영자 검수 발행되었습니다.
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
