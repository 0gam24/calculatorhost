import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { buildBreadcrumbJsonLd } from '@/lib/seo/jsonld';

const CATEGORIES = [
  { href: '/category/work/', label: '근로 계산기', desc: '연봉 실수령액·퇴직금·은퇴자금·N잡러 건강보험' },
  { href: '/category/tax/', label: '세금 계산기', desc: '양도세·취득세·재산세·종부세·증여세·상속세·자동차세·자녀장려금·프리랜서 종합소득세' },
  { href: '/category/finance/', label: '금융 계산기', desc: '대출이자·DSR/LTV 한도·예금·적금·환율·인플레이션·물타기' },
  { href: '/category/real-estate/', label: '부동산 계산기', desc: '중개수수료·전월세 전환·임대수익률·청약가점' },
  { href: '/category/lifestyle/', label: '생활 계산기', desc: '평수 환산·BMI·D-day' },
];

const EXTERNAL_SOURCES = [
  { href: 'https://www.hometax.go.kr', label: '국세청 홈택스', desc: '소득세·양도세·증여세 공식 신고 채널' },
  { href: 'https://www.nts.go.kr', label: '국세청', desc: '국세 법령·해석 사례' },
  { href: 'https://www.moef.go.kr', label: '기획재정부', desc: '세법 개정안 발표' },
  { href: 'https://www.wetax.go.kr', label: '위택스', desc: '취득세·재산세·자동차세 등 지방세' },
  { href: 'https://www.bok.or.kr', label: '한국은행', desc: '기준금리·환율·통화 정책' },
  { href: 'https://www.fss.or.kr', label: '금융감독원', desc: '대출 규제·DSR 산정 기준' },
  { href: 'https://www.reb.or.kr', label: '한국부동산원', desc: '공동주택 공시가격·시세' },
];

export const metadata: Metadata = {
  title: '소개 | calculatorhost — 운영자 김준혁 / 스마트데이터샵',
  description:
    '2026년 최신 세율을 반영한 한국 금융·세금·부동산 계산기 31종 운영. 운영자 김준혁(스마트데이터샵, 사업자등록번호 406-06-34485). 모든 계산 공식·세율·법조항은 1차 출처 직접 확인 후 반영.',
  alternates: { canonical: 'https://calculatorhost.com/about/' },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: '홈', url: 'https://calculatorhost.com/' },
  { name: '소개' },
]);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <div className="flex">
        <Sidebar />
        <main id="main-content" className="flex-1 px-4 py-8 md:px-8">
          <div className="mx-auto max-w-3xl">
            <Breadcrumb
              items={[
                { name: '홈', href: '/' },
                { name: '소개' },
              ]}
            />
            <h1 className="mb-6 text-4xl font-bold">calculatorhost 소개</h1>

            <div className="prose prose-invert max-w-none space-y-6 text-text-secondary">
              <p>
                calculatorhost 는 대한민국 성인의 생활 금융·세금·부동산 의사결정을 돕는
                무료 계산기 모음 사이트입니다.
              </p>

              <h2 className="text-2xl font-semibold text-text-primary">운영자</h2>
              <div className="not-prose rounded-lg border border-border-base bg-bg-card p-5 text-sm">
                <dl className="grid gap-y-2 sm:grid-cols-[120px_1fr]">
                  <dt className="font-semibold text-text-primary">상호</dt>
                  <dd className="text-text-secondary">스마트데이터샵 (Smart Data Shop)</dd>
                  <dt className="font-semibold text-text-primary">대표</dt>
                  <dd className="text-text-secondary">김준혁</dd>
                  <dt className="font-semibold text-text-primary">사업자등록번호</dt>
                  <dd className="text-text-secondary tabular-nums">406-06-34485</dd>
                  <dt className="font-semibold text-text-primary">개업일</dt>
                  <dd className="text-text-secondary">2020년 5월</dd>
                  <dt className="font-semibold text-text-primary">이메일</dt>
                  <dd className="text-text-secondary">
                    <a href="mailto:smartdatashop@gmail.com" className="text-primary-600 underline dark:text-primary-500">
                      smartdatashop@gmail.com
                    </a>
                  </dd>
                  <dt className="font-semibold text-text-primary">문의</dt>
                  <dd className="text-text-secondary">
                    <Link href="/contact" className="text-primary-600 underline dark:text-primary-500">
                      문의 페이지
                    </Link>
                  </dd>
                </dl>
                <p className="mt-4 text-caption text-text-tertiary">
                  본 사이트의 모든 계산 공식·세율·법조항 인용은 운영자 김준혁이 국세청·기획재정부·
                  한국은행·금융감독원 등 1차 출처를 직접 확인해 작성·검수합니다. 콘텐츠 작성에
                  AI 도구를 보조적으로 활용하지만, 모든 결과물은 운영자가 최종 검토합니다.
                </p>
              </div>

              <h2 className="text-2xl font-semibold text-text-primary">미션</h2>
              <p>
                홈택스·은행·관공서의 복잡한 공식과 세율을 누구나 1 분 안에 결과를 확인할 수 있는
                인터페이스로 제공하는 것이 우리의 목표입니다. 특히 중요한 돈 의사결정을
                앞둔 순간에 필요한 정확하고 최신화된 수치를 누구나 무료로 얻을 수 있어야 한다고
                믿습니다.
              </p>

              <h2 className="text-2xl font-semibold text-text-primary">원칙</h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>정확성</strong>: 모든 세율·공제·공식은 관련 법조항(소득세법·지방세법 등)을
                  근거로 하며, 매년 개정 내용을 반영합니다.
                </li>
                <li>
                  <strong>최신성</strong>: 세법 개정 시 즉시 업데이트하며, 각 페이지에 업데이트 날짜를
                  명시합니다.
                </li>
                <li>
                  <strong>투명성</strong>: 계산 공식과 근거를 각 페이지에 공개합니다.
                </li>
                <li>
                  <strong>무료 · 회원가입 불필요</strong>: 모든 계산기는 로그인 없이 이용할 수
                  있습니다.
                </li>
                <li>
                  <strong>개인정보 불수집</strong>: 입력한 금액·조건은 서버에 전송되거나 저장되지
                  않습니다 (브라우저 내에서만 계산).
                </li>
              </ul>

              <h2 className="text-2xl font-semibold text-text-primary">제공 카테고리</h2>
              <p>
                현재 31개의 무료 계산기를 5개 카테고리로 운영하고 있으며, 각 카테고리에서 용도에 맞는
                계산기를 선택할 수 있습니다.
              </p>
              <ul className="mt-4 grid gap-3 not-prose">
                {CATEGORIES.map((cat) => (
                  <li key={cat.href}>
                    <Link
                      href={cat.href}
                      className="block rounded-2xl border border-border-base bg-bg-card px-4 py-3 transition-colors hover:border-primary-500"
                    >
                      <span className="block font-semibold text-text-primary">{cat.label}</span>
                      <span className="block text-caption text-text-tertiary">{cat.desc}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold text-text-primary">데이터 출처 및 권위</h2>
              <p>
                calculatorhost 의 모든 세율·요율·공제 기준은 다음 공식 기관의 자료를 1차 출처로 합니다.
                세법 개정·금리 변동·고시가 갱신이 있을 때마다 출처를 재확인하여 반영합니다. YMYL
                (Your Money or Your Life) 카테고리에 해당하므로, 실제 세무·금융 처리 전에 반드시
                공식 기관 자료를 추가 확인하시기 바랍니다.
              </p>
              <ul className="mt-4 grid gap-2 not-prose">
                {EXTERNAL_SOURCES.map((src) => (
                  <li key={src.href}>
                    <a
                      href={src.href}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex flex-col rounded-xl border border-border-base bg-bg-card px-4 py-2 transition-colors hover:border-primary-500"
                    >
                      <span className="font-medium text-primary-500">{src.label}</span>
                      <span className="text-caption text-text-tertiary">{src.desc}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold text-text-primary">콘텐츠 제작 방식 (AI 활용 공개)</h2>
              <p>
                Google 의{' '}
                <a
                  href="https://developers.google.com/search/blog/2023/02/google-search-and-ai-content"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-primary-500"
                >
                  AI 생성 콘텐츠 가이드
                </a>
                에 따라 본 사이트의 콘텐츠 제작 프로세스를 투명하게 공개합니다.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>계산 공식·세율 상수</strong>: 운영자가 소득세법·지방세법·국세청 공식 문서를
                  직접 확인하여 코드(<code className="text-caption">src/lib/constants/</code>)에 반영합니다.
                  AI 가 자동 생성한 세율은 <strong>없습니다</strong>.
                </li>
                <li>
                  <strong>설명·FAQ 본문</strong>: 운영자가 작성한 초안에 대해 AI 도구(Claude)를 사용하여
                  표현 다듬기·구조화·검수를 보조합니다. 모든 결과물은 운영자가 최종 검토합니다.
                </li>
                <li>
                  <strong>코드 구현</strong>: AI 코딩 도구를 활용하나, 계산 로직은 단위 테스트와
                  국세청 간이계산기 결과 대조로 검증합니다.
                </li>
                <li>
                  <strong>AI 미사용 영역</strong>: 세율 수치, 법조항 인용, 면책 문구는 AI 자동 생성을
                  사용하지 않으며 운영자가 1차 출처를 직접 확인합니다.
                </li>
              </ul>

              <h2 className="text-2xl font-semibold text-text-primary">검증 절차</h2>
              <p>
                각 계산기 출시 전 다음 절차를 거칩니다.
              </p>
              <ol className="list-decimal space-y-2 pl-5">
                <li>법조항 원문 또는 국세청·금감원 공식 문서로 세율·공제 1차 검증</li>
                <li>국세청 홈택스 간이계산기·은행 공식 계산기로 결과 대조 (대표 케이스 3개 이상)</li>
                <li>단위 테스트(<code className="text-caption">Vitest</code>) 작성 — 경계값·예외 처리 검증</li>
                <li>세법 개정 시 즉시 재검증 후 반영 (연 1회 이상 정기 점검)</li>
              </ol>

              <h2 className="text-2xl font-semibold text-text-primary">면책</h2>
              <p>
                본 사이트의 계산 결과는 참고용이며 법적 효력이 없습니다. 실제 세무·금융 처리는
                세무사·은행 등 전문가의 안내를 받으시기 바랍니다.
              </p>

              <h2 className="text-2xl font-semibold text-text-primary">문의</h2>
              <p>
                계산 오류 제보, 개선 제안, 광고 문의는 <Link href="/contact" className="text-primary-500">문의 페이지</Link>를
                통해 연락 주시기 바랍니다.
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
