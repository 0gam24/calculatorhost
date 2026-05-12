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
  buildHowToJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/september-property-tax-second/';
const DATE_PUBLISHED = '2026-05-12';
const DATE_MODIFIED = '2026-05-12';

export const metadata: Metadata = {
  title: '9월 재산세 2차 납부 가이드 2026 | 위택스·신용카드 할부·가산세',
  description:
    '2026년 9월 16~30일 재산세 2차 납부 완벽 가이드. 주택 1차+2차 분할 vs 토지 일괄, 위택스 5가지 납부 방법, 신용카드 무이자 할부, 미납 가산세(3%+월 0.75%), 과오납 환급까지 정리.',
  keywords: [
    '9월 재산세',
    '재산세 2차 납부',
    '재산세 납부 기한',
    '재산세 신용카드 할부',
    '재산세 위택스',
    '재산세 미납 가산세',
    '재산세 과오납 환급',
    '재산세 분할 납부',
    '재산세 자동이체',
    '2026 재산세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '9월 재산세 2차 납부 가이드 2026',
    description: '주택 분할 vs 토지 일괄·위택스 5가지 방법·할부·가산세·환급.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '9월 재산세 2차 납부 가이드 2026',
    description: '9월 16~30일 재산세 납부 방법·신용카드 할부·미납 가산세.',
  },
};

const FAQ_ITEMS = [
  {
    question: '9월 재산세 기한은 정확히 언제까지인가요?',
    answer:
      '재산세 2차 납부 기한은 9월 16일 ~ 30일입니다(지방세법 §114). 9월 30일이 일요일이라면 익영업일(10월 1일)까지 자동 연장(국세기본법 §5 준용). 위택스·편의점은 30일 자정까지, 은행 이체는 영업일 기준이므로 9월 29일(금) 오후까지 납부를 권장합니다.',
  },
  {
    question: '7월 1차 + 9월 2차 분할 납부는 어떻게 다른가요?',
    answer:
      '주택 재산세는 본세를 7월(1/2) + 9월(1/2) 분할 납부하며, 본세가 20만 원 이하면 7월에 전액 일괄(지방세법 §114②). 토지·건축물·선박·항공기는 9월 일괄 납부(분할 X). 도시지역분과 지방교육세는 본세와 함께 부과되며 1차·2차에 비례 분할됩니다.',
  },
  {
    question: '신용카드 무이자 할부로 재산세를 낼 수 있나요?',
    answer:
      '네, 위택스(wetax.go.kr)에서 신용카드 결제 시 카드사별 무이자 할부(2~6개월) 적용 가능합니다. 단 결제대행 수수료가 발생할 수 있으므로(카드사·결제수단별 0~0.8%), 신청 화면에서 최종 결제금액 확인 필수. 체크·선불카드는 할부 불가.',
  },
  {
    question: '재산세를 미납하면 가산금이 얼마나 붙나요?',
    answer:
      '기한 초과 즉시 납부불성실 가산금 3% 가산(지방세기본법 §55). 1개월 후부터는 매월 중가산금 0.75%가 추가되어 최대 60개월(=45%)까지 누적. 본세 100만 원이면 1년 후 약 12만 원, 5년 후 최대 45만 원 가산. 1개월 이내 자진 납부 시 가산금 일부 경감 가능.',
  },
  {
    question: '재산세 과오납·이중납부 환급은 어떻게 신청하나요?',
    answer:
      '위택스 로그인 → "환급/조회" → "재산세 환급 신청" 메뉴에서 신청합니다(지방세기본법 §56). 환급 계좌(본인 명의)와 사유 입력 후 5~10일 내 입금. 시·군·구청 방문은 신분증 + 통장사본 + 환급신청서, 처리 기간 10~20일. 우편은 20~30일 소요.',
  },
];

export default function SeptemberPropertyTaxGuide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '9월 재산세 2차 납부 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '9월 재산세 2차 납부 가이드 2026',
    description:
      '9월 16~30일 재산세 2차 납부. 주택 분할 vs 토지 일괄, 위택스 5가지 방법, 신용카드 무이자 할부, 가산세 구조, 과오납 환급 절차.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['9월 재산세', '2차 납부', '신용카드 할부', '위택스', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '9월 재산세 2차 납부 가이드 2026',
    description:
      '재산세 2차 납부 시즌 완벽 가이드. 일정·방법·할부·가산세·환급.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd([...FAQ_ITEMS]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const howtoLd = buildHowToJsonLd({
    name: '위택스에서 재산세 2차 납부하기',
    description: '위택스(wetax.go.kr)에서 재산세를 납부하는 5단계',
    steps: [
      {
        name: '위택스 로그인',
        text: '위택스(wetax.go.kr) 또는 모바일 앱 → 공동인증서·간편인증·PASS 로그인.',
      },
      {
        name: '재산세 메뉴 진입',
        text: '"납부" → "재산세" → "본인 부과 내역" 조회. 1차 선납분 자동 차감 표시.',
      },
      {
        name: '결제 수단 선택',
        text: '계좌이체(수수료 무료) / 신용카드(무이자 할부 2~6개월, 수수료 별도) / 간편결제(카카오페이 등).',
      },
      {
        name: '분할납부 또는 할부 선택',
        text: '본세 250만 원 초과 시 분할납부 신청 가능(지방세법 §117의2, 최대 2개월). 또는 신용카드 할부.',
      },
      {
        name: '결제 완료 + 영수증 보관',
        text: '결제 완료 화면에서 PDF 다운로드. 위택스 "납부 내역"에 자동 저장.',
      },
    ],
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoLd) }} />

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
                    { name: '9월 재산세 2차 납부' },
                  ]}
                />
                <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">
                  9월 재산세 2차 납부 가이드 2026
                </h1>
                <p className="mt-3 text-lg text-text-secondary" data-speakable>
                  매년 9월 16일~30일은 재산세 2차 납부 시즌입니다. 7월에 1차 납부한 주택분 나머지 1/2과
                  토지·건축물 일괄을 9월에 납부합니다. 위택스 5가지 방법·신용카드 무이자 할부·미납 가산세 구조·
                  과오납 환급 절차를 한 페이지에 정리했습니다(지방세법 §111·§114·§122·§150, 지방세기본법 §55·§56).
                </p>
              </header>

              <AdSlot slot="guide-sep-prop-top" format="horizontal" />

              {/* 1. 납부 일정 */}
              <section aria-label="납부 일정" className="card">
                <h2 className="mb-4 text-2xl font-semibold">9월 재산세 납부 일정</h2>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <caption className="sr-only">재산세 납부 일정</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">대상</th>
                        <th className="py-2 pr-4 font-semibold">1차 (7월 16~31일)</th>
                        <th className="py-2 font-semibold">2차 (9월 16~30일)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">주택 (본세 20만 원 초과)</td><td className="py-2 pr-4">본세 1/2</td><td className="py-2">나머지 1/2</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">주택 (본세 20만 원 이하)</td><td className="py-2 pr-4">전액 일괄</td><td className="py-2">없음</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">토지·건축물·선박·항공기</td><td className="py-2 pr-4">없음</td><td className="py-2">전액 일괄</td></tr>
                      <tr><td className="py-2 pr-4">도시지역분 + 지방교육세</td><td className="py-2 pr-4">본세 비율</td><td className="py-2">본세 비율</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  근거: 지방세법 §114 (납부 기한·분할). 9월 30일이 휴일이면 익영업일까지 자동 연장(국세기본법 §5 준용).
                </p>
              </section>

              {/* 2. 5가지 납부 방법 */}
              <section aria-label="납부 방법 5가지" className="card">
                <h2 className="mb-4 text-2xl font-semibold">5가지 납부 방법</h2>
                <ol className="list-inside list-decimal space-y-3 text-text-secondary" data-speakable>
                  <li>
                    <strong className="text-text-primary">위택스(wetax.go.kr) 온라인</strong> — PC/모바일 24시간. 계좌이체(수수료 무료),
                    신용카드, 간편결제(카카오페이·네이버페이). 가장 편리.
                  </li>
                  <li>
                    <strong className="text-text-primary">신용카드 무이자 할부</strong> — 위택스에서 카드 결제 → 카드사별 2~6개월 무이자 할부.
                    체크·선불카드 제외. 결제대행 수수료 0~0.8%(카드사·수단별 상이) 별도.
                  </li>
                  <li>
                    <strong className="text-text-primary">분할납부 신청</strong> — 본세 250만 원 초과 시 납기 다음 달 말까지 신청
                    (지방세법 §117의2). 최대 2개월 분할, 이자 없음. 위택스 또는 시·군·구청에서 신청.
                  </li>
                  <li>
                    <strong className="text-text-primary">자동이체 등록</strong> — 한 번 등록하면 매년 자동 인출. 일부 자치단체 0.5% 할인 혜택.
                  </li>
                  <li>
                    <strong className="text-text-primary">은행·편의점·가상계좌</strong> — 고지서 가상계좌로 송금, CU·GS·이마트 무인기 24시간 가능.
                    별도 회원가입 불필요.
                  </li>
                </ol>
              </section>

              <AdSlot slot="guide-sep-prop-mid" format="rectangle" />

              {/* 3. FAQ */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 4. 미납 가산세 */}
              <section aria-label="미납 가산세 구조" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-4 text-2xl font-semibold">미납 시 가산세 구조</h2>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <caption className="sr-only">재산세 미납 가산금</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">시점</th>
                        <th className="py-2 pr-4 font-semibold">가산금</th>
                        <th className="py-2 font-semibold">100만 원 미납 누적</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">기한 초과 즉시</td><td className="py-2 pr-4">3% (납부불성실)</td><td className="py-2">+3만 원</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">1개월 후</td><td className="py-2 pr-4">+0.75% (중가산금)</td><td className="py-2">+3.75만</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">12개월 후</td><td className="py-2 pr-4">3% + (0.75%×12)</td><td className="py-2">+12만</td></tr>
                      <tr><td className="py-2 pr-4">60개월 후 (최대)</td><td className="py-2 pr-4">3% + 45% = 48%</td><td className="py-2">+48만</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  근거: 지방세기본법 §55. 1개월 이내 자진 납부 시 가산금 일부 경감 가능. 3개월 이상 체납 시 독촉장 → 부동산 공매·계좌 압류 가능.
                </p>
              </section>

              {/* 5. 신용카드 할부 vs 분할납부 */}
              <section aria-label="할부 vs 분할 비교" className="card">
                <h2 className="mb-4 text-2xl font-semibold">신용카드 할부 vs 분할납부 비교</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">항목</th>
                        <th className="py-2 pr-4 font-semibold">신용카드 무이자 할부</th>
                        <th className="py-2 font-semibold">분할납부 신청</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">대상</td><td className="py-2 pr-4">신용카드 소유자</td><td className="py-2">본세 250만 원 초과</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">기간</td><td className="py-2 pr-4">2~6개월 (카드사 선택)</td><td className="py-2">최대 2개월</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">수수료</td><td className="py-2 pr-4">결제대행 0~0.8%</td><td className="py-2">없음</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">금리</td><td className="py-2 pr-4">0% (무이자)</td><td className="py-2">0%</td></tr>
                      <tr><td className="py-2 pr-4">신청 시점</td><td className="py-2 pr-4">결제 시</td><td className="py-2">납기 다음 달 말까지</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  추천: 250만 원 초과 + 수수료 절감 → 분할납부. 금액 작거나 즉시 처리 → 신용카드 할부.
                </p>
              </section>

              {/* 6. 과오납 환급 */}
              <section aria-label="과오납 환급" className="card">
                <h2 className="mb-4 text-2xl font-semibold">과오납·이중납부 환급</h2>
                <div className="space-y-3 text-text-secondary">
                  <p data-speakable>
                    실제 납부액이 부과액보다 크거나 1차·2차를 각각 전액 납부한 경우 환급 신청 가능
                    (지방세기본법 §56). 본인 명의 계좌만 환급.
                  </p>
                  <ul className="list-inside list-disc space-y-1.5 text-sm">
                    <li><strong>위택스 온라인</strong>: 5~10일 (가장 빠름) → "환급/조회" → "재산세 환급 신청"</li>
                    <li><strong>시·군·구청 방문</strong>: 신분증 + 통장사본, 10~20일</li>
                    <li><strong>우편 신청</strong>: 신청서 + 통장사본, 20~30일</li>
                  </ul>
                </div>
              </section>

              {/* 7. 주의사항 */}
              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-xl font-semibold">⚠️ 주의사항</h2>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-text-secondary">
                  <li>9월 30일이 휴일이면 익영업일까지 자동 연장. 위택스는 자정까지 가능.</li>
                  <li>1차 미납분은 2차에 합쳐 납부해야 하며, 이미 가산금이 부과되어 있을 수 있음.</li>
                  <li>신용카드 결제대행 수수료는 카드사·결제수단별 상이 → 결제 직전 화면에서 최종 금액 확인.</li>
                  <li>과세 기준일은 6월 1일. 6월 2일 이후 매도해도 그 해 재산세는 매도자 부담.</li>
                  <li>1세대1주택 특례 적용은 6월 1일 기준 세대 합산 1주택일 때만.</li>
                </ul>
              </section>

              {/* 8. 관련 계산기·가이드 */}
              <section aria-label="관련 계산기·가이드" className="card">
                <h2 className="mb-4 text-2xl font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-text-secondary">
                  <li>→ <Link href="/calculator/property-tax/" className="text-primary-600 underline dark:text-primary-500">재산세 계산기</Link> — 공시가격 입력 즉시 본세·도시지역분·교육세 계산</li>
                  <li>→ <Link href="/guide/june-property-tax/" className="text-primary-600 underline dark:text-primary-500">6월 재산세 완벽 가이드</Link> — 개념·세율·1세대1주택 특례</li>
                  <li>→ <Link href="/calculator/comprehensive-property-tax/" className="text-primary-600 underline dark:text-primary-500">종합부동산세 계산기</Link> — 공시 9억 초과 1주택, 6억 초과 다주택</li>
                  <li>→ <Link href="/calculator/acquisition-tax/" className="text-primary-600 underline dark:text-primary-500">취득세 계산기</Link> — 매수 시 비용</li>
                  <li>→ <Link href="/calculator/capital-gains-tax/" className="text-primary-600 underline dark:text-primary-500">양도소득세 계산기</Link> — 매도 시 세금</li>
                </ul>
              </section>

              <ShareButtons title="9월 재산세 2차 납부 가이드 2026" url={URL} description="납부 일정·방법 5가지·신용카드 할부·가산세·환급." />

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 지방세법 §107 (재산세 부과) · §111 (세율) · §114 (납부 기한·분할) · §117의2 (분할납부) · §122 (세부담 상한) · §150 (지방교육세) · 지방세기본법 §55 (가산금·중가산금) · §56 (환급). 참고: <a href="https://www.wetax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">위택스(wetax.go.kr)</a>, <a href="https://www.molit.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국토교통부 공시가격</a>, <a href="https://www.law.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">법령정보센터</a>.
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 일반 정보 제공 목적이며 세무·법적 조언이 아닙니다. 카드사 무이자 할부 조건·결제대행 수수료는 결제 시점에 변동될 수 있으므로 결제 직전 화면에서 최종 금액을 확인하세요. 개별 사정(상속·증여 병행, 다주택, 비주거용 부동산)은 위택스 1899-0001 또는 관할 시·군·구청 세무과 상담 권장.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (스마트데이터샵). 본 가이드는 AI 보조 작성 후 운영자 검수 발행되었습니다.
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
