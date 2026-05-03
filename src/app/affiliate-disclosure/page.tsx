import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import {
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
} from '@/lib/seo/jsonld';
import {
  REGISTERED_PARTNERS,
  getActivePartners,
} from '@/lib/constants/affiliate-partners';

const URL = 'https://calculatorhost.com/affiliate-disclosure/';
const DATE_PUBLISHED = '2026-05-03';
const DATE_MODIFIED = '2026-05-03';

export const metadata: Metadata = {
  title: '어필리에이트 공시 (Affiliate Disclosure) | calculatorhost',
  description:
    'calculatorhost는 일부 페이지에서 어필리에이트 파트너 링크를 사용합니다. 표시광고법·공정거래위원회 가이드라인에 따라 광고 여부와 수익 구조를 투명하게 공시합니다.',
  alternates: { canonical: URL },
  openGraph: {
    title: '어필리에이트 공시 — calculatorhost',
    description: '광고 여부와 수익 구조 투명 공시. 표시광고법·공정위 가이드라인 준수.',
    url: URL,
    type: 'article',
  },
  robots: { index: true, follow: true },
};

export default function AffiliateDisclosurePage() {
  const activePartners = getActivePartners();
  const inactivePartners = REGISTERED_PARTNERS.filter(
    (p) => !activePartners.some((ap) => ap.key === p.key)
  );

  const webPageLd = buildWebPageJsonLd({
    name: '어필리에이트 공시 (Affiliate Disclosure)',
    description:
      'calculatorhost 어필리에이트 파트너 링크 정책 — 표시광고법·공정거래위원회 가이드라인 준수 명시',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '어필리에이트 공시' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

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
                    { name: '어필리에이트 공시' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  어필리에이트 공시 (Affiliate Disclosure)
                </h1>
                <p className="text-lg text-text-secondary">
                  calculatorhost는 일부 페이지에서 어필리에이트 파트너 링크를 사용합니다.
                  표시광고법·공정거래위원회 가이드라인에 따라 광고 여부와 수익 구조를 투명하게 공시합니다.
                </p>
                <p className="mt-2 text-sm text-text-tertiary">
                  최종 갱신: <time dateTime={DATE_MODIFIED}>{DATE_MODIFIED}</time> ·
                  운영자: 김준혁 (스마트데이터샵)
                </p>
              </header>

              {/* 핵심 원칙 */}
              <section aria-label="핵심 원칙" className="card space-y-4">
                <h2 className="text-2xl font-semibold">📜 핵심 원칙</h2>
                <ol className="list-decimal space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    <strong>모든 어필리에이트 링크는 명확히 표시</strong> —
                    "광고", "Affiliate", "📢" 등으로 일반 정보 링크와 시각적으로 구분합니다.
                  </li>
                  <li>
                    <strong>HTML <code>rel="sponsored nofollow noopener noreferrer"</code> 적용</strong> —
                    Google 정책 + 보안 표준 준수.
                  </li>
                  <li>
                    <strong>사용자 결제액 변동 없음</strong> —
                    어필리에이트 링크를 통해 가입·결제하셔도 정상 가격으로 진행됩니다.
                    calculatorhost는 파트너로부터 일정 수수료를 받을 뿐, 사용자 부담은 0원입니다.
                  </li>
                  <li>
                    <strong>편집 독립성</strong> —
                    어필리에이트 수익이 콘텐츠·세율 정보·계산 로직의 정확성에 영향을 주지 않습니다.
                    세율·금리·법령은 정부 1차 출처(국세청·기재부·한국은행)를 직접 확인합니다.
                  </li>
                  <li>
                    <strong>회색지대·약관 위반 서비스 추천 금지</strong> —
                    OTT 계정 공유 같이 서비스 약관(TOS) 위반 가능성이 있는 어필리에이트는
                    추천하지 않습니다. 공식 가족요금제·연간 결제·실수요 매칭 서비스만 다룹니다.
                  </li>
                </ol>
              </section>

              {/* 활성 파트너 목록 */}
              <section aria-label="활성 파트너" className="card space-y-4">
                <h2 className="text-2xl font-semibold">🤝 활성 어필리에이트 파트너</h2>
                {activePartners.length === 0 ? (
                  <p className="text-sm text-text-secondary">
                    현재 활성된 어필리에이트 파트너가 없습니다. 파트너 등록은 운영자 검토 후 점진적으로 추가됩니다.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="border-b-2 border-border-base bg-primary-500/5">
                          <th scope="col" className="px-3 py-2 text-left font-semibold">파트너</th>
                          <th scope="col" className="px-3 py-2 text-left font-semibold">카테고리</th>
                          <th scope="col" className="px-3 py-2 text-left font-semibold">설명</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activePartners.map((p) => (
                          <tr key={p.key} className="border-b border-border-subtle">
                            <td className="px-3 py-2 font-medium text-text-primary">{p.name}</td>
                            <td className="px-3 py-2 text-text-secondary whitespace-nowrap">
                              <span className="rounded-full bg-primary-500/10 px-2 py-0.5 text-xs text-primary-700 dark:text-primary-300">
                                {p.category}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-text-secondary">{p.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>

              {/* 검토 중인 파트너 */}
              {inactivePartners.length > 0 && (
                <section aria-label="검토 중 파트너" className="card space-y-3">
                  <h2 className="text-xl font-semibold">🔍 검토 중인 파트너</h2>
                  <p className="text-sm text-text-secondary">
                    아래 파트너는 운영자 검토 단계로, 현재 사이트에서 어필리에이트 링크가 활성화되어 있지 않습니다.
                  </p>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-text-secondary">
                    {inactivePartners.map((p) => (
                      <li key={p.key}>
                        <strong>{p.name}</strong> — {p.description}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* 법적 근거 */}
              <section aria-label="법적 근거" className="card space-y-3">
                <h2 className="text-xl font-semibold">⚖️ 법적 근거</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    <a
                      href="https://www.law.go.kr/법령/표시·광고의공정화에관한법률"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      표시·광고의 공정화에 관한 법률
                    </a>{' '}
                    — 추천·보증 등에 관한 표시·광고 심사지침 준수
                  </li>
                  <li>
                    <a
                      href="https://www.ftc.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      공정거래위원회 — 추천·보증 등에 관한 표시·광고 심사지침
                    </a>{' '}
                    (2020.09.01 시행, 2023 개정)
                  </li>
                  <li>
                    <a
                      href="https://support.google.com/adsense/answer/1346295"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      Google AdSense 프로그램 정책
                    </a>{' '}
                    — 어필리에이트 콘텐츠 가이드라인 준수
                  </li>
                </ul>
              </section>

              {/* 사용자 권리 */}
              <section aria-label="사용자 권리" className="card space-y-3">
                <h2 className="text-xl font-semibold">🛡️ 사용자 권리</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    <strong>광고 거부권</strong>: 본 페이지 어필리에이트 링크 클릭은 전적으로 자유 의사이며,
                    클릭 없이도 모든 계산기·가이드를 무료로 사용할 수 있습니다.
                  </li>
                  <li>
                    <strong>개인정보 보호</strong>: calculatorhost는 어필리에이트 클릭에 대한 추적 데이터를
                    별도 수집하지 않습니다. 클릭 후 파트너 사이트의 개인정보 정책이 적용됩니다.
                  </li>
                  <li>
                    <strong>이의 제기</strong>: 어필리에이트 콘텐츠가 객관적이지 않다고 판단되면{' '}
                    <a href="mailto:smartdatashop@gmail.com" className="text-primary-600 underline dark:text-primary-500">
                      smartdatashop@gmail.com
                    </a>{' '}
                    으로 의견 주시면 즉시 검토합니다.
                  </li>
                </ul>
              </section>

              {/* 면책 */}
              <section
                aria-label="면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p>
                  본 정책은 사전 예고 없이 변경될 수 있으며, 변경 시 본 페이지 상단의 갱신 일자를 통해 확인 가능합니다.
                  최신 정책은 항상 본 페이지를 기준으로 합니다. 의견·문의:{' '}
                  <a href="mailto:smartdatashop@gmail.com" className="underline">smartdatashop@gmail.com</a>
                </p>
              </section>

              {/* 관련 페이지 */}
              <nav aria-label="관련 페이지" className="card">
                <h2 className="mb-3 text-base font-semibold">관련 페이지</h2>
                <ul className="space-y-1 text-sm">
                  <li>
                    →{' '}
                    <Link href="/privacy/" className="text-primary-700 underline dark:text-primary-300">
                      개인정보처리방침
                    </Link>
                  </li>
                  <li>
                    →{' '}
                    <Link href="/terms/" className="text-primary-700 underline dark:text-primary-300">
                      이용약관
                    </Link>
                  </li>
                  <li>
                    →{' '}
                    <Link href="/about/" className="text-primary-700 underline dark:text-primary-300">
                      운영자 정보
                    </Link>
                  </li>
                </ul>
              </nav>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
