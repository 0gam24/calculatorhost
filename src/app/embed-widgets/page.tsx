import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { StructuredSummary } from '@/components/calculator/StructuredSummary';
import { FaqSection } from '@/components/calculator/FaqSection';
import { EmbedCodeBox } from '@/components/calculator/EmbedCodeBox';
import {
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildBreadcrumbJsonLd,
  buildHowToJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/embed-widgets/';

export const metadata: Metadata = {
  title: '무료 계산기 위젯 삽입 | 블로그·홈페이지 임베드 | calculatorhost',
  description:
    '양도세·연봉·취득세·대출·DSR·재산세 계산기를 내 블로그·홈페이지에 무료로 삽입하세요. 코드 한 줄 복사·붙여넣기, 회원가입 불필요, 2026 최신 세율 자동 반영.',
  keywords: [
    '계산기 위젯',
    '계산기 임베드',
    '무료 계산기 삽입',
    '블로그 계산기 넣기',
    '홈페이지 계산기',
    'iframe 계산기',
    '티스토리 계산기',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '무료 계산기 위젯 — 내 블로그에 삽입',
    description: '양도세·연봉·대출 등 6종 계산기를 코드 한 줄로 내 사이트에 삽입하세요.',
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '무료 계산기 위젯 — 내 블로그에 삽입',
    description: '6종 계산기를 코드 한 줄로 내 사이트에 삽입하세요.',
  },
};

interface WidgetDef {
  slug: string;
  title: string;
  keyword: string;
  description: string;
}

const WIDGETS: WidgetDef[] = [
  {
    slug: 'capital-gains-tax',
    title: '양도소득세 계산기',
    keyword: '양도세',
    description: '1세대1주택 비과세·일시적2주택·장기보유공제까지 반영한 주택 양도세 계산.',
  },
  {
    slug: 'salary',
    title: '연봉 실수령액 계산기',
    keyword: '연봉 실수령액',
    description: '4대보험·소득세를 반영한 세후 월급 실수령액을 즉시 계산.',
  },
  {
    slug: 'acquisition-tax',
    title: '취득세 계산기',
    keyword: '취득세',
    description: '주택 가격·주택 수·조정지역 중과까지 반영한 취득세 계산.',
  },
  {
    slug: 'loan',
    title: '대출이자 계산기',
    keyword: '대출이자',
    description: '원리금균등·만기일시 상환 방식별 월 상환액과 총이자 계산.',
  },
  {
    slug: 'loan-limit',
    title: 'DSR 대출한도 계산기',
    keyword: 'DSR 대출한도',
    description: 'DSR·LTV 규제 기준으로 가능한 최대 대출한도와 월 상환액 시뮬.',
  },
  {
    slug: 'property-tax',
    title: '재산세 계산기',
    keyword: '재산세',
    description: '공시가격·공정시장가액비율·1세대1주택 특례를 반영한 재산세 계산.',
  },
];

const FAQ_ITEMS = [
  {
    question: '계산기 위젯을 삽입하면 비용이 드나요?',
    answer:
      '무료입니다. 회원가입도 필요 없습니다. 아래 코드를 복사해 블로그·홈페이지에 붙여넣기만 하면 됩니다. 출처 링크(calculatorhost)만 유지해 주시면 자유롭게 사용할 수 있습니다.',
  },
  {
    question: '티스토리·워드프레스·네이버 블로그에도 넣을 수 있나요?',
    answer:
      '네. HTML 편집(소스코드) 모드를 지원하는 대부분의 플랫폼에서 작동합니다. 티스토리·워드프레스는 HTML 블록에, 네이버 블로그는 글쓰기 화면의 HTML 모드에 코드를 붙여넣으면 됩니다. iframe 삽입을 제한하는 일부 무료 호스팅에서는 표시되지 않을 수 있습니다.',
  },
  {
    question: '위젯의 세율은 자동으로 최신 상태가 유지되나요?',
    answer:
      '네. 위젯은 calculatorhost 서버에서 실시간으로 불러오므로, 세율·공제가 개정되면 삽입한 위젯도 자동으로 최신 기준을 반영합니다. 별도로 코드를 다시 붙여넣을 필요가 없습니다.',
  },
  {
    question: '위젯 크기(높이·너비)를 조절할 수 있나요?',
    answer:
      '가능합니다. 복사한 코드의 iframe 태그에서 width(너비)와 height(높이) 값을 원하는 픽셀로 수정하면 됩니다. 기본값은 너비 100%(최대 680px), 높이 760px입니다. 모바일에서도 자동으로 반응형으로 표시됩니다.',
  },
  {
    question: '위젯 안에 광고가 표시되나요?',
    answer:
      '아니요. 삽입되는 위젯에는 광고가 포함되지 않습니다. 계산 기능과 출처 링크만 표시되므로, 여러분의 블로그 방문자에게 깔끔한 계산 도구를 제공할 수 있습니다.',
  },
];

export default function EmbedWidgetsPage() {
  const webPageLd = buildWebPageJsonLd({
    name: '무료 계산기 위젯 삽입',
    description: '양도세·연봉·취득세·대출·DSR·재산세 계산기를 블로그·홈페이지에 무료로 삽입',
    url: URL,
    datePublished: '2026-07-04',
    dateModified: '2026-07-04',
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })));
  const howToLd = buildHowToJsonLd({
    name: '계산기 위젯 삽입 방법',
    description: '계산기 위젯 코드를 복사해 내 블로그·홈페이지에 삽입하는 단계별 방법',
    steps: [
      { name: '위젯 선택', text: '삽입할 계산기를 아래 목록에서 고릅니다.' },
      { name: '코드 복사', text: '해당 위젯의 "임베드 코드 복사" 버튼을 눌러 코드를 복사합니다.' },
      { name: 'HTML 편집 모드 열기', text: '블로그·홈페이지 글쓰기 화면에서 HTML(소스코드) 편집 모드를 엽니다.' },
      { name: '붙여넣기', text: '복사한 코드를 원하는 위치에 붙여넣고 저장합니다.' },
      { name: '확인', text: '발행 후 계산기가 정상 표시되는지 확인합니다.' },
    ],
  });
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '계산기 위젯' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main id="main-content" className="flex-1 px-4 py-8 md:px-8">
            <div className="mx-auto flex max-w-3xl flex-col gap-8">
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '계산기 위젯' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">무료 계산기 위젯</h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  calculatorhost의 계산기를 내 블로그·홈페이지에 무료로 삽입할 수 있습니다. 코드 한 줄을
                  복사해 붙여넣기만 하면 되고, 회원가입도 필요 없습니다. 세율이 개정되면 삽입한 위젯도
                  자동으로 최신 기준을 반영합니다.
                </p>
              </header>

              <StructuredSummary
                definition="계산기 위젯은 calculatorhost의 계산기를 iframe 코드 한 줄로 외부 사이트에 삽입하는 무료 도구입니다."
                table={{
                  caption: '계산기 위젯 핵심 요약',
                  headers: ['항목', '내용'],
                  rows: [
                    ['비용', '무료 (회원가입 불필요)'],
                    ['삽입 방법', 'HTML 편집 모드에 코드 복사·붙여넣기'],
                    ['세율 갱신', '자동 (서버 실시간 반영)'],
                    ['광고', '위젯 내 광고 없음'],
                    ['조건', '출처 링크 유지'],
                  ],
                }}
                tldr={[
                  '6종 계산기(양도세·연봉·취득세·대출·DSR·재산세) 위젯 무료 제공',
                  '코드 한 줄 복사 → 블로그 HTML 모드에 붙여넣기',
                  '티스토리·워드프레스·네이버 블로그 HTML 모드 지원',
                  '세율 개정 시 위젯 자동 갱신 (재삽입 불필요)',
                ]}
              />

              <section aria-label="위젯 목록" className="flex flex-col gap-6">
                <h2 className="text-2xl font-semibold">삽입할 계산기 선택</h2>
                {WIDGETS.map((w) => (
                  <div key={w.slug} className="flex flex-col gap-3 rounded-lg border border-border-base bg-bg-card p-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        <a href={`/calculator/${w.slug}/`} className="text-primary-700 underline dark:text-primary-300">
                          {w.title}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-text-secondary">{w.description}</p>
                    </div>
                    <EmbedCodeBox
                      embedPath={`/embed/${w.slug}/`}
                      canonicalPath={`/calculator/${w.slug}/`}
                      title={w.title}
                    />
                  </div>
                ))}
              </section>

              <section aria-label="삽입 방법" className="card">
                <h2 className="mb-4 text-2xl font-semibold">위젯 삽입 방법 — 4단계</h2>
                <ol className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>1. 코드 복사:</strong> 위 목록에서 원하는 계산기의 &ldquo;임베드 코드 복사&rdquo;
                    버튼을 누릅니다.
                  </li>
                  <li>
                    <strong>2. HTML 편집 모드 열기:</strong> 블로그·홈페이지 글쓰기 화면에서 HTML(소스코드)
                    편집 모드로 전환합니다. 티스토리·워드프레스는 HTML 블록, 네이버 블로그는 글쓰기 화면의
                    HTML 버튼을 사용합니다.
                  </li>
                  <li>
                    <strong>3. 붙여넣기:</strong> 복사한 코드를 원하는 위치에 붙여넣습니다. 코드에는 계산기
                    iframe과 출처 링크가 함께 들어 있습니다.
                  </li>
                  <li>
                    <strong>4. 발행·확인:</strong> 글을 저장·발행한 뒤 계산기가 정상 표시되는지 확인합니다.
                    표시되지 않으면 해당 플랫폼이 iframe 삽입을 허용하는지 확인하세요.
                  </li>
                </ol>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              <section aria-label="이용 안내" className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary">
                <p>
                  위젯은 개인·상업 블로그에서 무료로 사용할 수 있으며, 출처 링크(calculatorhost)를 유지하는
                  조건입니다. 위젯의 계산 결과는 참고용이며 법적 효력이 없습니다. 실제 세금·대출 신고 및
                  납부는 국세청 홈택스 또는 해당 금융기관의 안내를 따르시기 바랍니다.
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
