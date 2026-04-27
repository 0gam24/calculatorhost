import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import {
  buildBreadcrumbJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/category/lifestyle';

export const metadata: Metadata = {
  title: '생활 계산기 모음 2026 | BMI·D-day·평수',
  description:
    '일상생활에 필수적인 생활 계산기 모음. BMI와 표준체중·비만도 계산, 특별한 날까지의 D-day 카운트다운, 평과 제곱미터 변환 등을 무료로 빠르고 정확하게 이용하세요.',
  alternates: { canonical: URL },
  openGraph: {
    title: '생활 계산기 모음 2026',
    description: 'BMI·D-day 생활 계산기 모음',
    url: URL,
    type: 'website',
  },
};

const CALCULATORS = [
  {
    title: 'BMI 계산기',
    description: '키와 체중을 입력하면 BMI와 표준체중, 비만도를 계산합니다. 건강한 몸 관리를 위한 기준점을 파악하세요.',
    href: '/calculator/bmi',
    tags: ['건강', '체중'],
  },
  {
    title: 'D-day 계산기',
    description: '특별한 날까지 남은 날짜를 계산합니다. 생일, 기념일, 프로젝트 마감일 등을 기준으로 D-day를 확인하세요.',
    href: '/calculator/d-day',
    tags: ['날짜', '카운트다운'],
  },
  {
    title: '평수 환산 계산기',
    description: '제곱미터를 평수로 또는 평수를 제곱미터로 환산합니다. 부동산 공시가 확인과 면적 비교에 필수입니다.',
    href: '/calculator/area',
    tags: ['단위환산', '면적'],
  },
];

const FAQ_ITEMS = [
  {
    question: 'BMI가 높으면 무엇을 의미하나요?',
    answer:
      'BMI(Body Mass Index)는 체중(kg) ÷ 키(m)²로 계산되며, 비만도를 판단하는 지표입니다. BMI 25 이상이면 과체중, 30 이상이면 비만으로 분류됩니다. 다만 근육량이 많거나 뼈 밀도가 높으면 BMI가 높아도 건강할 수 있으므로 참고만 하세요.',
  },
  {
    question: '표준체중은 어떻게 계산되나요?',
    answer:
      '표준체중은 키(m) × 키(m) × 22로 계산됩니다. 이는 세계보건기구(WHO)가 제시한 이상적인 BMI 22를 기준으로 합니다. 개인차가 크므로 표준체중을 기준으로 너무 집착하기보다는 본인의 체감과 건강 상태를 함께 고려하는 것이 좋습니다.',
  },
  {
    question: 'D-day와 D+1, D-1의 차이는?',
    answer:
      'D-day는 특별한 날(당일), D+1은 그 다음날, D-1은 하루 전을 의미합니다. 계산기는 오늘 날짜 기준으로 특정 날짜까지 남은 일수를 계산해 줍니다. 예를 들어 오늘이 4월 24일이고 대상 날짜가 5월 1일이면 D-7(7일 전)입니다.',
  },
  {
    question: '1평은 정확히 몇 제곱미터인가요?',
    answer:
      '1평은 정확히 3.3058㎡입니다. 부동산 거래에서는 이 공식을 기준으로 합니다. 역으로 제곱미터를 평수로 환산할 때는 ÷3.3058 또는 ÷3.3(근사값) 으로 계산하면 됩니다.',
  },
  {
    question: '건강한 체중 관리를 위해 BMI 몇 정도를 목표로 해야 하나요?',
    answer:
      '일반적으로 BMI 18.5~24.9를 정상 범위로 보며, 이 범위 내에서도 개인차가 큽니다. 급격한 체중 변화보다는 꾸준한 운동과 균형잡힌 식단이 중요합니다. 의료 목표는 의료 전문가와 상담하세요.',
  },
];

export default function LifestyleCategoryPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '생활' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="w-full flex-1 px-4 py-8 md:px-6 lg:px-8">
            <article className="mx-auto max-w-4xl space-y-8">
              {/* H1 */}
              <div>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '생활 계산기' },
                  ]}
                />
                <h1 className="mb-4 text-4xl font-bold text-text-primary">
                  생활 계산기 모음 2026
                </h1>
                <p className="text-lg text-text-secondary">
                  건강, 시간, 면적 관리에 도움이 되는 생활 계산기를 모았습니다. 일상 속 작은 계산부터 건강 관리까지 한 곳에서 확인하세요.
                </p>
              </div>

              {/* AD-1 리더보드 */}
              <AdSlot
                slot="category-lifestyle-top"
                format="horizontal"
                className="my-6 rounded-lg border border-border-base"
              />

              {/* Structured Summary */}
              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <h2 className="text-xl font-semibold text-text-primary">생활 계산기 라인업</h2>
                <p className="text-text-secondary">
                  아래 3가지 계산기는 건강 관리, 시간 계산, 면적 단위 변환을 도와줍니다.
                </p>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border-base">
                      <th className="py-3 text-left text-text-primary">계산기</th>
                      <th className="py-3 text-left text-text-primary">용도</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="py-3 text-text-primary">BMI</td>
                      <td className="text-text-secondary">체중 관리, 건강 기준</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-3 text-text-primary">D-day</td>
                      <td className="text-text-secondary">날짜 계산, 카운트다운</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-text-primary">평수 환산</td>
                      <td className="text-text-secondary">면적 단위 변환</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* 계산기 카드 그리드 */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-text-primary">생활 계산기</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {CALCULATORS.map((calc) => (
                    <div
                      key={calc.href}
                      className="flex flex-col rounded-lg border border-border-base bg-bg-card p-6 transition-all hover:shadow-md"
                    >
                      <h3 className="mb-2 text-xl font-semibold text-text-primary">
                        {calc.title}
                      </h3>
                      <p className="mb-4 flex-1 text-text-secondary">{calc.description}</p>
                      <div className="mb-4 flex flex-wrap gap-2">
                        {calc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-primary-500 bg-opacity-10 px-3 py-1 text-sm text-primary-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={calc.href}
                        className="inline-block w-fit rounded-lg bg-primary-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-primary-600"
                      >
                        계산기 열기 →
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              {/* AD-2 Medium Rectangle */}
              <AdSlot
                slot="category-lifestyle-mid"
                format="rectangle"
                className="my-6 flex justify-center rounded-lg border border-border-base"
              />

              {/* 사용 시점 가이드 */}
              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <h2 className="text-2xl font-bold text-text-primary">
                  생활 계산기가 필요한 순간
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-text-primary">건강 검진 결과를 받았을 때</h3>
                    <p className="text-text-secondary">
                      BMI와 표준체중을 계산해 본인의 건강 상태를 객관적으로 파악합니다. 의료 전문가의 상담을 받기 전에 기본 지표를 이해할 수 있습니다.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">특별한 날을 기억하고 싶을 때</h3>
                    <p className="text-text-secondary">
                      생일, 기념일, 프로젝트 마감일 등까지 남은 날짜를 D-day로 계산해 계획을 세웁니다. 카운트다운으로 설렘과 긴장감을 느낄 수 있습니다.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">부동산 광고에서 본 평수를 이해할 때</h3>
                    <p className="text-text-secondary">
                      제곱미터와 평수가 혼재된 광고를 볼 때 평수 환산 계산기로 통일된 기준으로 비교합니다. 실제 넓이를 정확하게 파악할 수 있습니다.
                    </p>
                  </div>
                </div>
              </section>

              {/* 생활 핵심 용어 */}
              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <h2 className="text-2xl font-bold text-text-primary">생활 계산기 핵심 용어</h2>
                <dl className="space-y-4 text-text-secondary">
                  <div>
                    <dt className="font-semibold text-text-primary">BMI (Body Mass Index)</dt>
                    <dd className="mt-1">
                      체중(kg) ÷ 키(m)²로 계산하는 비만도 지표. 국제 기준상 18.5 미만은 저체중, 18.5~24.9는 정상, 25~29.9는 과체중, 30 이상은 비만입니다. 다만 근육량과 골밀도를 반영하지 않으므로 참고용이며, 건강한 체중 관리를 위해서는 의료 전문가와 상담이 필요합니다.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-text-primary">표준체중</dt>
                    <dd className="mt-1">
                      키(m) × 키(m) × 22로 계산하는 이상적인 체중. 이상적인 BMI를 22로 설정해 도출된 값으로, 세계보건기구(WHO) 권고 기준입니다. 개인의 체질, 근력, 생활 패턴이 다르므로 표준체중을 절대적 목표로 삼기보다는 참고 기준으로 활용하는 것이 좋습니다.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-text-primary">비만도</dt>
                    <dd className="mt-1">
                      (현재체중 - 표준체중) ÷ 표준체중 × 100(%)로 표현하는 비만의 정도. 표준체중 대비 현재 체중이 얼마나 초과하는지를 백분율로 나타냅니다. 예를 들어 비만도 20%이면 표준체중보다 20% 더 많이 나간다는 뜻입니다.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-text-primary">D-day</dt>
                    <dd className="mt-1">
                      특정 날짜까지 남은 일수 또는 경과 일수를 계산하는 용어. 생일, 기념일, 프로젝트 마감, 결혼식 등 특별한 날을 기준으로 오늘 날짜를 포함해 몇 일이 남았는지를 계산합니다. 시간 계획과 감정 준비에 도움이 됩니다.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-text-primary">평(坪) 와 제곱미터(㎡)</dt>
                    <dd className="mt-1">
                      부동산 거래에서 사용하는 면적 단위. 1평 = 3.3058㎡ (정확한 환산값)로, 한국에서는 전통적으로 평을 사용했지만 국제 기준 제곱미터도 함께 표기됩니다. 부동산 광고에서 평과 제곱미터가 혼용되므로, 정확한 비교를 위해서는 통일된 단위로 환산이 필수입니다.
                    </dd>
                  </div>
                </dl>
              </section>

              {/* 공식 출처 및 법적 근거 */}
              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <h2 className="text-2xl font-bold text-text-primary">공식 출처 및 법적 근거</h2>
                <p className="text-text-secondary">
                  본 카테고리의 계산기는 대한민국 의료 기준과 국제 표준을 기반으로 합니다. BMI와 표준체중은 세계보건기구(WHO) 권고를 따르고, 평 환산은 국가측량법 기준을 적용합니다. 건강 관련 정보는 참고용이며, 의료 상담이 필요한 경우 전문가 상담을 권장합니다.
                </p>
                <ul className="grid gap-2">
                  <li>
                    <a
                      href="https://www.kosso.or.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex flex-col rounded-xl border border-border-base px-4 py-2 transition-colors hover:border-primary-500"
                    >
                      <span className="font-medium text-primary-500">대한비만학회</span>
                      <span className="text-caption text-text-secondary">BMI 진단 기준, 체중 관리 정보</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.mohw.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex flex-col rounded-xl border border-border-base px-4 py-2 transition-colors hover:border-primary-500"
                    >
                      <span className="font-medium text-primary-500">보건복지부</span>
                      <span className="text-caption text-text-secondary">건강검진 기준, 체중 관리 가이드</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.law.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex flex-col rounded-xl border border-border-base px-4 py-2 transition-colors hover:border-primary-500"
                    >
                      <span className="font-medium text-primary-500">국가법령정보센터</span>
                      <span className="text-caption text-text-secondary">측량법(평 환산), 기본 법령</span>
                    </a>
                  </li>
                </ul>
              </section>

              {/* FAQ */}
              <section className="space-y-6 rounded-lg border border-border-base bg-bg-card p-6">
                <h2 className="text-2xl font-bold text-text-primary">자주 묻는 질문</h2>
                <div className="space-y-4">
                  {FAQ_ITEMS.map((item, idx) => (
                    <details
                      key={idx}
                      className="group rounded-lg border border-border-base p-4"
                    >
                      <summary className="cursor-pointer font-semibold text-text-primary">
                        {item.question}
                      </summary>
                      <p className="mt-3 text-text-secondary">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>

              {/* AD-4 인피드 */}
              <AdSlot
                slot="category-lifestyle-feed"
                format="fluid"
                className="my-6 flex justify-center rounded-lg border border-border-base"
              />

              {/* 다른 카테고리 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">다른 카테고리 보기</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/category/tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition-all hover:shadow-md"
                  >
                    <h3 className="font-semibold text-primary-500">세금 계산기</h3>
                    <p className="text-sm text-text-secondary">양도세·취득세·재산세 계산</p>
                  </Link>
                  <Link
                    href="/category/finance"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition-all hover:shadow-md"
                  >
                    <h3 className="font-semibold text-secondary-500">금융 계산기</h3>
                    <p className="text-sm text-text-secondary">대출·예금·적금 계산</p>
                  </Link>
                  <Link
                    href="/category/work"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition-all hover:shadow-md"
                  >
                    <h3 className="font-semibold text-highlight-500">근로 계산기</h3>
                    <p className="text-sm text-text-secondary">연봉·퇴직금 계산</p>
                  </Link>
                  <Link
                    href="/category/real-estate"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition-all hover:shadow-md"
                  >
                    <h3 className="font-semibold text-danger-500">부동산 계산기</h3>
                    <p className="text-sm text-text-secondary">양도세·중개수수료 계산</p>
                  </Link>
                </div>
              </section>

              {/* 면책조항 */}
              <div className="space-y-2 border-t border-border-base pt-6 text-sm text-text-secondary">
                <p>
                  본 계산기는 일반적인 기준과 공식을 기반으로 합니다. 건강 관련 정보는 의료 전문가 상담을 받기 전의 참고용입니다. 개인 맞춤형 조언이 필요한 경우 전문가에게 문의하세요.
                </p>
                <p>최종 업데이트: 2026년 4월</p>
              </div>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
