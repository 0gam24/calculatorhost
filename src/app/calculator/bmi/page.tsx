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
import { BmiCalculator } from './BmiCalculator';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/bmi';

export const metadata: Metadata = {
  title: 'BMI 계산기 2026 | 대한비만학회 기준 | calculatorhost',
  description:
    '키와 몸무게로 BMI 즉시 계산. 대한비만학회 2022 기준 저체중·정상·과체중·비만 단계별 분류와 표준체중 권장 범위까지 한눈에 확인.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'BMI 계산기 2026 | 대한비만학회 기준',
    description: '키와 몸무게로 BMI를 계산하고 건강한 체중 범위를 확인하세요.',
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMI 계산기 2026',
    description: 'BMI 계산과 체중 분류를 한 번에.',
  },
};

const FAQ_ITEMS = [
  {
    question: 'BMI는 어떻게 계산하나요?',
    answer:
      'BMI(체질량지수)는 몸무게(kg)를 키(m)의 제곱으로 나눈 값입니다. 예를 들어 키 170cm, 몸무게 70kg인 경우 BMI = 70 ÷ (1.7)² = 24.22입니다. 이 계산기는 자동으로 수행하므로 키와 몸무게만 입력하면 됩니다.',
  },
  {
    question: '한국과 WHO 기준 차이는?',
    answer:
      '한국(대한비만학회)은 아시아인 체형을 기준으로 더 엄격한 기준을 사용합니다. 한국은 BMI 23 이상을 과체중, 25 이상을 비만으로 보지만, WHO 기준(서양)은 25 이상을 과체중, 30 이상을 비만으로 분류합니다. 본 계산기는 한국 기준을 적용합니다.',
  },
  {
    question: '근육량이 많으면 BMI가 높아지나요?',
    answer:
      '예, BMI는 체지방과 근육을 구분하지 않으므로 근육이 많은 사람은 실제 체지방률보다 BMI가 높을 수 있습니다. 따라서 BMI는 참고 지표일 뿐 체지방률, 근육량, 기초대사량 등 다른 지표와 함께 평가해야 합니다. 전문의와 상담하세요.',
  },
  {
    question: '정상 BMI 체중 범위는?',
    answer:
      '정상 BMI는 18.5~22.9 범위입니다. 예를 들어 키 170cm인 경우 정상 체중 범위는 약 53.5~66.2kg입니다. 계산기에서 자신의 키를 입력하면 정확한 정상 체중 범위가 표시됩니다.',
  },
  {
    question: 'BMI 외에 참고할 지표는?',
    answer:
      'BMI와 함께 체지방률, 허리둘레, 혈압, 혈당, 콜레스테롤 수치 등을 종합적으로 평가해야 합니다. 특히 근육이 많은 운동 선수나 고령자는 BMI만으로 건강도를 판단할 수 없으므로 전문가와 상담하는 것이 좋습니다.',
  },
  {
    question: '소아·노인도 같은 기준인가요?',
    answer:
      '소아(18세 미만)와 노인(65세 이상)은 성인과 다른 기준이 적용됩니다. 소아의 경우 연령과 성별에 따른 백분위수를 사용하고, 고령자는 다양한 건강 지표를 함께 고려합니다. 각 연령대에 맞는 기준으로 전문의와 상담하세요.',
  },
] as const;

const RELATED = [
  { href: '/calculator/d-day', title: 'D-day 계산', description: '날짜 계산기' },
  { href: '/calculator/area', title: '평수 환산', description: '평↔제곱미터' },
] as const;

export default function BmiPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: 'BMI 계산기',
    description: '키와 몸무게로 BMI를 계산하고 대한비만학회 기준 체중 분류와 정상 체중 범위를 확인하는 무료 도구',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: 'BMI 계산기 2026',
    description: '키와 몸무게로 BMI를 계산하여 체중 상태를 확인하는 무료 도구',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-04-27',
  });
  const howToLd = buildHowToJsonLd({
    name: 'BMI 계산기 사용 방법',
    description: 'BMI를 계산하고 건강한 체중 범위를 확인하는 단계별 가이드',
    steps: [
      { name: '키 입력', text: 'cm 단위로 자신의 키를 입력합니다.' },
      { name: '체중 입력', text: 'kg 단위로 자신의 현재 체중을 입력합니다.' },
      { name: 'BMI 계산', text: '입력한 값으로 자동으로 BMI(체중 ÷ 키²)가 계산됩니다.' },
      { name: '결과 해석', text: 'BMI에 따라 저체중, 정상, 과체중, 비만 등 상태가 판단됩니다 (대한비만학회 기준).' },
      { name: '표준체중 확인', text: '자신의 키에 맞는 표준체중 범위를 확인합니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })));
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '생활', url: 'https://calculatorhost.com/category/lifestyle' },
    { name: 'BMI 계산기' },
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
                    { name: '생활', href: '/category/lifestyle/' },
                    { name: 'BMI' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">BMI 계산기 2026</h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  키와 몸무게로 체질량지수(BMI)를 즉시 계산할 수 있는 무료 도구입니다. 대한비만학회 2022 기준에 따라 저체중, 정상, 과체중, 비만 단계를 분류하고 개인별 정상 체중 범위를 제시합니다. 간단한 입력으로 현재의 건강한 체중 상태를 파악하세요.
                </p>
                <AuthorByline datePublished="2026-04-24" dateModified="2026-04-27" />
              </header>

              {/* GEO/AEO Structured Summary */}
              <StructuredSummary
                definition="BMI(체질량지수)는 키와 몸무게로 계산한 체중의 적절성을 판단하는 지표입니다. BMI = 몸무게(kg) ÷ 키(m)²로 계산되며, 다양한 건강 상태를 분류하는 기초 자료로 사용됩니다."
                table={{
                  caption: '대한비만학회 2022 기준 BMI 분류',
                  headers: ['분류', 'BMI 범위'],
                  rows: [
                    ['저체중', '18.4 이하'],
                    ['정상', '18.5~22.9'],
                    ['과체중', '23.0~24.9'],
                    ['1단계 비만', '25.0~29.9'],
                    ['2단계 비만', '30.0~34.9'],
                    ['3단계 비만', '35.0 이상'],
                  ],
                }}
                tldr={[
                  'BMI는 체질량지수로 체중의 적절성을 판단하는 기초 지표',
                  '한국은 대한비만학회 기준을 사용하여 WHO보다 엄격한 분류 적용',
                  'BMI는 참고 지표일 뿐 의학적 진단이 아님',
                  '근육량, 체지방률, 연령 등을 함께 고려해야 함',
                  '정상 BMI 범위는 18.5~22.9',
                ]}
              />

              <AdSlot slot="bmi-top" format="horizontal" />

              {/* 계산기 */}
              <BmiCalculator />

              {/* FAQ (중간 배치 - GEO 권장) */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* BMI란? */}
              <section aria-label="BMI 개념" className="card">
                <h2 className="mb-4 text-2xl font-semibold">BMI(체질량지수)란?</h2>
                <p className="mb-4 text-text-secondary">
                  BMI(Body Mass Index, 체질량지수)는 인체의 비만도를 나타내는 지표입니다. 키와 몸무게의 관계를 수치화하여 저체중, 정상, 과체중, 비만 등의 상태를 분류합니다. 간단한 계산으로 얻을 수 있어 건강 검진과 보건 통계에 널리 사용됩니다.
                </p>
                <p className="mb-4 text-text-secondary">
                  BMI는 1830년대 벨기에 수학자 아돌프 케틀레(Adolphe Quetelet)가 개발했으며, 현재는 세계보건기구(WHO)를 비롯한 국제 기구와 각 국가의 보건 기관에서 표준 지표로 채택하고 있습니다.
                </p>
                <p className="text-text-secondary">
                  하지만 BMI는 체지방과 근육을 구분하지 못하고 개인의 신체 구성, 연령, 성별 차이를 반영하지 못하므로, 의학적 진단이나 개별 건강 평가에는 다른 지표들과 함께 종합적으로 사용되어야 합니다.
                </p>
              </section>

              {/* 계산 공식 */}
              <section aria-label="BMI 계산 공식" className="card">
                <h2 className="mb-4 text-2xl font-semibold">BMI 계산 공식</h2>
                <div className="mb-6 rounded-lg bg-bg-card p-4">
                  <p className="text-center font-mono text-lg font-semibold text-primary-500 mb-2">
                    BMI = 몸무게(kg) ÷ 키(m)²
                  </p>
                  <p className="text-center text-sm text-text-secondary">
                    (키는 cm에서 m로 변환)
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">계산 예시</h3>
                    <div className="rounded-lg bg-bg-card p-4 text-sm">
                      <p className="mb-2">
                        <strong>예: 키 170cm, 몸무게 70kg</strong>
                      </p>
                      <ul className="space-y-1 text-text-secondary">
                        <li>• 키를 m 단위로 변환: 170cm = 1.7m</li>
                        <li>• 키의 제곱: 1.7 × 1.7 = 2.89</li>
                        <li>• BMI = 70 ÷ 2.89 = <strong>24.22</strong></li>
                        <li>• 분류: <strong>과체중 (비만 전단계)</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 한국 vs WHO 기준 비교 */}
              <section aria-label="한국 vs WHO BMI 기준" className="card">
                <h2 className="mb-4 text-2xl font-semibold">한국 vs WHO 기준 비교</h2>
                <p className="mb-4 text-text-secondary">
                  대한비만학회는 아시아인의 체형과 건강 위험을 반영하여 WHO 기준보다 낮은 기준을 적용합니다. 같은 BMI 수치도 나라와 기준에 따라 분류가 달라질 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="px-3 py-2 text-left font-semibold text-text-secondary">
                          분류
                        </th>
                        <th scope="col" className="px-3 py-2 text-center font-semibold text-text-secondary">
                          한국 (대한비만학회)
                        </th>
                        <th scope="col" className="px-3 py-2 text-center font-semibold text-text-secondary">
                          WHO (서양)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2 text-text-primary">저체중</td>
                        <td className="px-3 py-2 text-center text-text-secondary">18.4 이하</td>
                        <td className="px-3 py-2 text-center text-text-secondary">18.4 이하</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2 text-text-primary">정상</td>
                        <td className="px-3 py-2 text-center text-text-secondary">18.5~22.9</td>
                        <td className="px-3 py-2 text-center text-text-secondary">18.5~24.9</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2 text-text-primary">과체중</td>
                        <td className="px-3 py-2 text-center text-text-secondary">23.0~24.9</td>
                        <td className="px-3 py-2 text-center text-text-secondary">25.0~29.9</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2 text-text-primary">비만</td>
                        <td className="px-3 py-2 text-center text-text-secondary">25.0 이상</td>
                        <td className="px-3 py-2 text-center text-text-secondary">30.0 이상</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-text-primary">고도비만</td>
                        <td className="px-3 py-2 text-center text-text-secondary">35.0 이상</td>
                        <td className="px-3 py-2 text-center text-text-secondary">40.0 이상</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-4 text-sm text-text-secondary">
                  <strong>주의:</strong> 본 계산기는 한국의 대한비만학회 2022 기준을 적용합니다. 국제 비교나 의학적 진단이 필요한 경우 해당 국가의 기준과 전문의 의견을 참고하세요.
                </p>
              </section>

              {/* 분류별 건강 가이드 */}
              <section aria-label="BMI 분류별 건강 가이드" className="card">
                <h2 className="mb-4 text-2xl font-semibold">BMI 분류별 건강 가이드</h2>
                <p className="mb-6 text-text-secondary">
                  각 BMI 분류별로 권장되는 건강 관리 방법을 제시합니다. 그러나 이는 일반 정보일 뿐, 개인의 건강 상태는 다양한 요소를 고려해야 하므로 전문의와 상담하세요.
                </p>

                <div className="space-y-4">
                  <div className="rounded-lg border border-secondary-500/30 bg-secondary-500/5 p-4">
                    <h3 className="font-semibold text-secondary-500 mb-2">저체중 (BMI 18.4 이하)</h3>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• 균형잡힌 영양식 섭취</li>
                      <li>• 근력 운동과 유산소 운동 병행</li>
                      <li>• 규칙적인 식습관 형성</li>
                      <li>• 전문의 상담으로 건강 문제 확인</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-primary-500/30 bg-primary-500/5 p-4">
                    <h3 className="font-semibold text-primary-500 mb-2">정상 (BMI 18.5~22.9)</h3>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• 현재 건강한 체중 유지</li>
                      <li>• 균형잡힌 식단 계속 유지</li>
                      <li>• 주 3회 이상 규칙적 운동</li>
                      <li>• 정기적인 건강 검진 권장</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-highlight-500/30 bg-highlight-500/5 p-4">
                    <h3 className="font-semibold text-highlight-500 mb-2">과체중 (BMI 23.0~24.9)</h3>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• 3~5kg 감량 목표 설정</li>
                      <li>• 칼로리 섭취 제한 (하루 500~700kcal 감)</li>
                      <li>• 주 5회 이상 운동 (30분 이상)</li>
                      <li>• 정기적 체중 측정으로 진행도 확인</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-danger-500/30 bg-danger-500/5 p-4">
                    <h3 className="font-semibold text-danger-500 mb-2">비만 (BMI 25.0 이상)</h3>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• 전문의 및 영양사 상담 필수</li>
                      <li>• 체계적인 식단 관리</li>
                      <li>• 규칙적 운동 (주 5회, 중강도)</li>
                      <li>• 행동 수정 프로그램 참여 검토</li>
                      <li>• 필요시 의약품 또는 치료 고려</li>
                    </ul>
                  </div>
                </div>

                <p className="mt-6 text-sm text-text-secondary border-t border-border-subtle pt-4">
                  <strong>면책:</strong> 위 내용은 일반 정보 제공 목적이며 의학적 진단이나 치료 권고가 아닙니다. 개인의 건강 상태에 따라 전문의 상담이 필수입니다.
                </p>
              </section>

              {/* BMI의 한계 */}
              <section aria-label="BMI의 한계" className="card">
                <h2 className="mb-4 text-2xl font-semibold">BMI의 한계와 주의사항</h2>
                <p className="mb-4 text-text-secondary">
                  BMI는 간단하고 유용한 지표이지만, 다음과 같은 한계가 있으므로 다른 건강 지표와 함께 평가해야 합니다.
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-text-primary mb-2 text-lg">1. 근육량 미구분</h3>
                    <p className="text-sm text-text-secondary">
                      BMI는 체지방과 근육을 구분하지 않습니다. 근육이 많은 운동선수나 보디빌더는 BMI상 비만으로 분류될 수 있지만, 실제 건강도는 우수할 수 있습니다.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-text-primary mb-2 text-lg">2. 연령별 차이 미반영</h3>
                    <p className="text-sm text-text-secondary">
                      같은 BMI라도 나이에 따라 건강 상태가 다를 수 있습니다. 고령층은 근감소로 인해 같은 BMI에서도 다른 위험도를 가집니다.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-text-primary mb-2 text-lg">3. 성별 차이 미반영</h3>
                    <p className="text-sm text-text-secondary">
                      남녀의 신체 구성과 대사 특성이 다르므로, 같은 BMI라도 건강 영향이 다를 수 있습니다.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-text-primary mb-2 text-lg">4. 체지방률 반영 부족</h3>
                    <p className="text-sm text-text-secondary">
                      체지방의 양과 분포가 건강에 미치는 영향은 BMI보다 중요할 수 있습니다. 특히 복부 비만이 더 위험합니다.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-text-primary mb-2 text-lg">5. 특수 집단 부적용</h3>
                    <p className="text-sm text-text-secondary">
                      소아, 청소년, 임산부, 운동선수 등은 BMI 기준을 달리 적용해야 합니다. 이들은 반드시 전문의와 상담하세요.
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-sm text-text-secondary border-t border-border-subtle pt-4">
                  <strong>권장사항:</strong> BMI와 함께 허리둘레, 체지방률, 혈압, 혈당, 콜레스테롤, 운동능력 등을 종합적으로 평가하여 개인의 건강 상태를 파악하고, 전문의와 상담하세요.
                </p>
              </section>

              {/* 관련 계산기 */}
              <RelatedCalculators items={[...RELATED]} />

              {/* 업데이트 로그 */}
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-04-24: BMI 계산기 초판 공개 (대한비만학회 2022 기준 적용)</li>
                </ul>
              </section>

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>공식 근거</strong>: <a href="https://www.kosso.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">대한비만학회</a> 「비만 진료지침」 2022 개정판, <a href="https://www.mohw.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">보건복지부</a> 국민건강정보.
                </p>
                <p className="mb-2">
                  <strong>계산 기준</strong>: BMI = 몸무게(kg) ÷ 키(m)², 소수점 둘째 자리까지 표시
                </p>
                <p>
                  <strong>의학적 면책</strong>: 본 계산기의 결과는 일반 정보 제공 목적이며 의학적 진단이나 치료 권고가 아닙니다. BMI는 참고 지표일 뿐이므로 건강 상태에 관한 모든 판단은 의료 전문가(의사, 영양사 등)와 상담하여 이루어져야 합니다. 임산부, 소아, 만성질환자는 반드시 전문의와 상담하세요.
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
