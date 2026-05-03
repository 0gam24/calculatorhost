import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
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
  buildDefinedTermSetJsonLd,
} from '@/lib/seo/jsonld';
import { AcquisitionCalculator } from './AcquisitionCalculator';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/acquisition-tax';

export const metadata: Metadata = {
  title: '취득세 계산기 2026 | 1주택·조정지역·생애최초 | calculatorhost',
  description:
    '2026년 최신 지방세율 반영 취득세 계산기. 매매·증여·상속 및 1주택·조정지역·생애최초 감면까지 모두 반영하여 농특세, 지방교육세 포함 총 납부액을 정확히 계산. 거래 직전 확인하세요. 회원가입 불필요.',
  alternates: { canonical: URL },
  openGraph: {
    title: '취득세 계산기 2026 | 1주택·조정지역·생애최초',
    description: '2026년 최신 지방세율 반영. 주택 매매·증여·상속 시 총 납부액을 거래 직전 확인.',
    url: URL,
    type: 'website',
  },
};

const FAQ_ITEMS = [
  {
    question: '1주택 85㎡ 이하 취득세는 얼마인가요?',
    answer:
      '1주택자가 85㎡ 이하 주택을 취득할 때 기본 세율은 1.0%입니다. 과세표준이 6억 원 이하면 1.0%, 6억~9억 원 사이면 선형보간(약 1.5~3.0%), 9억 원 초과면 3.0%가 적용됩니다.',
  },
  {
    question: '조정대상지역 3주택자의 취득세율은?',
    answer:
      '조정대상지역에서 3주택 이상을 취득할 때는 12% 중과세율이 적용됩니다. 기본 세율의 12배에 달합니다. 추가로 면적이 85㎡를 초과하면 농어촌특별세 1%가 부과됩니다.',
  },
  {
    question: '생애최초 주택 취득세 감면 조건은?',
    answer:
      '지특법 §36의2에 따라 생애최초 주택 구매 시 최대 200만 원의 취득세 감면을 받을 수 있습니다. 단, 부부합산 소득 7,000만 원 이하, 주택가액 12억 원 이하, 1주택 매매 조건을 만족해야 합니다.',
  },
  {
    question: '증여 취득세는 매매와 어떻게 다른가요?',
    answer:
      '증여 취득세 기본 세율은 3.5%로, 매매의 1.0~3.0%보다 높습니다. 조정지역에서 3주택 이상 증여 시에는 12% 중과세율이 적용됩니다. 증여는 실거래가가 아닌 국세청 시가표준액을 기준으로 계산합니다.',
  },
  {
    question: '취득세 납부 기한은?',
    answer:
      '취득세는 취득일로부터 60일 이내에 납부해야 합니다(지방세법 §10). 이를 초과하면 가산세와 이자가 부과되므로 거래 후 즉시 납부하는 것이 중요합니다.',
  },
] as const;

const RELATED = [
  { href: '/calculator/capital-gains-tax', title: '양도소득세', description: '주택 판매 시' },
  { href: '/calculator/property-tax', title: '재산세', description: '연간 부과' },
  { href: '/calculator/broker-fee', title: '중개수수료', description: '거래수수료' },
];

export default function AcquisitionTaxPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '취득세 계산기',
    description: '2026년 최신 지방세율 반영, 주택·증여·상속 취득세',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '취득세 계산기 2026',
    description: '2026년 최신 지방세율 반영. 주택 매매·증여·상속 시 총 납부액을 거래 직전 확인',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-04-27',
  });
  const howToLd = buildHowToJsonLd({
    name: '취득세 계산기 사용 방법',
    description: '부동산 구매금액, 거래유형, 주택수를 입력하여 취득세를 계산하는 단계별 가이드',
    steps: [
      { name: '거래금액 입력', text: '부동산 구매 금액(과세표준)을 입력합니다.' },
      { name: '거래유형 선택', text: '매매·증여·상속 중 거래 유형을 선택합니다.' },
      { name: '주택 정보 입력', text: '현재 보유 주택 수, 면적(㎡), 조정지역 여부를 입력합니다.' },
      { name: '특례 확인', text: '생애최초 감면 등 적용 가능한 특례를 확인합니다.' },
      { name: '취득세 결과 확인', text: '기본 세율, 중과세율, 감면액, 총 납부액을 확인합니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })));
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '세금', url: 'https://calculatorhost.com/category/tax' },
    { name: '취득세' },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildDefinedTermSetJsonLd({
              name: '취득세 핵심 용어',
              description: '주택·부동산 취득 시 적용되는 취득세 산정 용어집',
              url: `${URL}#glossary`,
              terms: [
                {
                  name: '취득세',
                  description: '부동산·자동차·선박·항공기 등 자산 취득 시 부과되는 지방세. 주택은 거래가 기준 1~12% (조정지역·다주택 가산). 근거: 지방세법 §10 이하.',
                  url: 'https://www.wetax.go.kr',
                },
                {
                  name: '농어촌특별세',
                  alternateName: '농특세',
                  description: '취득세에 부가되는 국세. 표준세율 0.2% (감면 대상은 다른 비율). 근거: 농어촌특별세법.',
                },
                {
                  name: '지방교육세',
                  description: '취득세에 부가되는 지방세. 표준 0.4% (취득세율의 일정 비율). 근거: 지방세법 §150.',
                },
                {
                  name: '생애최초 주택구입 감면',
                  description: '생애최초 주택 취득 시 취득세 감면 (요건: 무주택 세대주, 취득가 12억 이하 등). 산정 후 200만 원 한도 감면. 근거: 지방세특례제한법 §36의2.',
                },
                {
                  name: '조정대상지역 다주택 중과',
                  description: '조정대상지역 내 2주택 이상 보유자가 신규 주택 취득 시 취득세 8~12% 중과. 1주택 일반 1~3% 대비 큰 부담. 근거: 지방세법 §13의2.',
                },
              ],
            })
          ),
        }}
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
                    { name: '세금', href: '/category/tax/' },
                    { name: '취득세' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  취득세 계산기 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 최신 지방세율을 반영한 무료 취득세 계산기입니다. 주택 매매·증여·상속 시
                  주택 수·조정지역 여부·면적·생애최초 감면까지 모두 반영하여 농어촌특별세와
                  지방교육세를 포함한 총 납부액을 즉시 확인할 수 있습니다.
                </p>
                <AuthorByline dateModified="2026-04-24" />
              </header>

              {/* GEO/AEO Structured Summary */}
              <StructuredSummary
                definition="취득세는 부동산을 취득할 때 부과되는 지방세입니다. 매매·증여·상속 등 취득 방법과 취득 시점의 주택 수, 조정대상지역 여부, 주택 면적에 따라 세율이 달라집니다(지방세법 §10-§17)."
                table={{
                  caption: '취득가액별 1주택 기본 취득세 (비조정지역)',
                  headers: ['취득가액', '예상 취득세'],
                  rows: [
                    ['3억~6억 원', '1.0% 세율 적용'],
                    ['6억~9억 원', '선형보간(약 1.5~3.0%)'],
                    ['9억 원 초과', '3.0% 세율 적용'],
                    ['조정지역 2주택', '8% 중과 적용'],
                    ['조정지역 3주택↑', '12% 중과 적용'],
                  ],
                }}
                tldr={[
                  '취득세 = 과세표준(취득가 또는 시가표준액) × 세율',
                  '1주택 6억~9억 구간은 선형보간(약 1.5~3.0%)',
                  '조정지역 2주택은 8%, 3주택 이상은 12% 중과',
                  '85㎡ 초과 시 농어촌특별세 0.2% 또는 1% 추가',
                  '지방교육세는 취득세의 10%, 생애최초 감면은 최대 200만 원',
                ]}
              />

              <AdSlot slot="acquisition-tax-top" format="horizontal" />

              {/* 계산기 */}
              <AcquisitionCalculator />

              {/* FAQ (중간 배치 - GEO 권장) */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 취득세란 무엇인가 */}
              <section aria-label="취득세 개념" className="card">
                <h2 className="mb-4 text-2xl font-semibold">취득세란 무엇인가요?</h2>
                <p className="mb-4 text-text-secondary">
                  취득세는 토지·건물·주택 등 부동산을 취득할 때 부과되는 지방세입니다(지방세법 §10).
                  매매·증여·상속·교환 등 모든 형태의 유상·무상 취득에 적용됩니다. 취득일로부터
                  60일 이내에 시·도청에 신고하고 납부해야 합니다.
                </p>
                <p className="text-text-secondary">
                  취득세 = 과세표준(취득가 또는 시가표준액) × 세율. 매매의 경우 실제 거래가를, 증여·상속의
                  경우 국세청 시가표준액을 과세표준으로 합니다. 기본 취득세 외에 85㎡ 초과 시
                  농어촌특별세(0.2~1%)와 취득세의 10%에 해당하는 지방교육세가 추가됩니다.
                </p>
              </section>

              {/* 계산 공식 */}
              <section aria-label="계산 공식" className="card">
                <h2 className="mb-4 text-2xl font-semibold">2026년 취득세는 어떻게 계산하나요?</h2>
                <ol className="space-y-3 text-sm leading-relaxed">
                  <li>
                    <strong>1. 과세표준 결정</strong>: 매매는 실거래가, 증여·상속은 시가표준액 기준.
                  </li>
                  <li>
                    <strong>2. 기본 세율 결정</strong>: 매매 1주택은 6억 이하 1.0%, 6~9억 선형보간,
                    9억 초과 3.0%. 조정지역 2주택 8%, 3주택 이상 12%.
                  </li>
                  <li>
                    <strong>3. 취득세 계산</strong>: 과표 × 세율 (10원 단위 절사).
                  </li>
                  <li>
                    <strong>4. 농어촌특별세</strong>: 85㎡ 초과 시 과표 × 0.2%(일반) 또는 1%(중과).
                  </li>
                  <li>
                    <strong>5. 지방교육세</strong>: 취득세의 10%.
                  </li>
                  <li>
                    <strong>6. 생애최초 감면</strong>: 조건 충족 시 취득세에서 최대 200만 원 차감.
                  </li>
                  <li>
                    <strong>7. 총 납부액</strong>: 취득세 + 농특세 + 지교세 − 감면액.
                  </li>
                </ol>
              </section>

              {/* 주의사항 */}
              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">주의사항</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    본 계산기는 일반적인 취득세 계산을 기준으로 합니다. 특수한 상황(일시적 2주택, 조정지역
                    해제, 재산세 납부 상황 등)에서는 세율이 달라질 수 있으므로 관할 시청의 세무과에 확인하세요.
                  </li>
                  <li>
                    생애최초 주택 감면은 부부합산 소득 7,000만 원 이하, 주택가액 12억 원 이하, 1주택 매매
                    조건을 만족해야 적용됩니다(지특법 §36의2).
                  </li>
                  <li>
                    증여·상속의 경우 실거래가가 아닌 국세청 시가표준액을 기준으로 합니다. 공시지가보다
                    높을 수 있습니다.
                  </li>
                  <li>
                    취득세는 취득일로부터 60일 이내에 납부해야 합니다. 초과 시 가산세 20%와 이자가 부과됩니다.
                  </li>
                  <li>
                    2026년 세율을 기준으로 합니다. 세법 개정 시 변경될 수 있으므로 거래 전 최신 정보를
                    확인하세요.
                  </li>
                </ul>
              </section>

              {/* 절세·활용 팁 */}
              <section aria-label="절세 팁" className="card">
                <h2 className="mb-3 text-2xl font-semibold">절세·활용 팁</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>생애최초 감면 활용</strong>: 조건을 충족하면 반드시 신청하세요. 최대 200만 원을
                    절세할 수 있습니다.
                  </li>
                  <li>
                    <strong>면적 확인</strong>: 등기부상 면적이 85㎡를 넘는지 확인해 농특세 부담을 예측하세요.
                  </li>
                  <li>
                    <strong>거래가 협상</strong>: 취득세는 거래가에 직결되므로 계약 전 정확한 계산이 중요합니다.
                  </li>
                  <li>
                    <strong>조정지역 여부 확인</strong>: 조정지역은 중과세율(8~12%)이 적용되므로 거래 전
                    관할청에 확인하세요.
                  </li>
                </ul>
              </section>

              {/* 관련 계산기 */}
              <RelatedCalculators items={RELATED} />

              {/* 업데이트 로그 */}
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-04-24: 2026년 지방세율 반영 초판 공개</li>
                </ul>
              </section>

              {/* 참고 자료 */}
              <section aria-label="참고 자료" className="card">
                <h2 className="mb-3 text-lg font-semibold">법적 근거 및 공식 출처</h2>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    <a
                      href="https://www.law.go.kr/법령/지방세법/제11조"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국가법령정보센터 — 지방세법 §11 (취득세 세율)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.law.go.kr/법령/지방세법"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국가법령정보센터 — 지방세법 (전체)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.wetax.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      위택스 — 지방세 신고
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
                  <strong>법적 근거</strong>: 지방세법 §10-§17, 지방세법 시행령 §22, 농어촌특별세법, 지특법
                  §36의2.
                </p>
                <p>
                  본 계산기의 결과는 참고용이며 법적 효력이 없습니다. 실제 취득세 신고·납부는 관할 시청
                  세무과 또는 세무사의 안내를 받으시기 바랍니다.
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
