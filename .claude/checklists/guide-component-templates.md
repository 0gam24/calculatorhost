# 가이드 포스트 컴포넌트 템플릿 (copy-paste ready)

> **목적**: 신규 가이드 작성 시 반복 코드를 빠르게 생성할 수 있는 재사용 가능한 스니펫 모음
> **사용**: 각 섹션별 텍스트를 교체하고 그대로 붙여넣기
> **마지막 갱신**: 2026-05-14

---

## A. 페이지 프레임 (상단 메타 + 구조화 데이터)

```tsx
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

// ══════════════════════════════════════════════════════════════
// 1. 메타데이터 (CUSTOMISE: title, description, canonical)
// ══════════════════════════════════════════════════════════════
const URL = 'https://calculatorhost.com/guide/{SLUG}/';
const DATE_PUBLISHED = '{YYYY-MM-DD}';
const DATE_MODIFIED = '{YYYY-MM-DD}';

export const metadata: Metadata = {
  title: '{가이드명} {연도} | {핵심 키워드} | calculatorhost',
  description:
    '{80~155자. 첫 문장 결론. 핵심 수치·법조항 포함.}',
  keywords: [
    '{키워드1}',
    '{키워드2}',
    '{키워드3}',
    // 5-10개
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '{가이드명} {연도}',
    description: '{최대 160자. 한 줄 요약.}',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '{가이드명} {연도}',
    description: '{최대 160자.}',
  },
};

// ══════════════════════════════════════════════════════════════
// 2. FAQ 항목 (CUSTOMISE: question + answer)
// ══════════════════════════════════════════════════════════════
const FAQ_ITEMS = [
  {
    question: '{질문1}',
    answer:
      '{답변1. 첫 문장 = 결론.}',
  },
  {
    question: '{질문2}',
    answer:
      '{답변2.}',
  },
  // 5-8개 항목
];

// ══════════════════════════════════════════════════════════════
// 3. 페이지 컴포넌트 (구조화 데이터 생성)
// ══════════════════════════════════════════════════════════════
export default function GuidePageTemplate() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '{가이드명}' },
  ]);

  const articleLd = buildArticleJsonLd({
    headline: '{제목 (H1과 동일)}',
    description:
      '{description과 동일}',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['{키워드1}', '{키워드2}'],
  });

  const webPageLd = buildWebPageJsonLd({
    name: '{제목}',
    description: '{description}',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });

  const faqLd = buildFaqPageJsonLd([...FAQ_ITEMS]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      {/* JSON-LD 스크립트 (변경 금지) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />

      {/* 레이아웃 (변경 금지) */}
      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main id="main-content" className="flex-1 px-4 py-8 md:px-8">
            <article className="mx-auto max-w-3xl space-y-8">
              {/* ──── 헤더 영역 (CUSTOMISE: 제목, 리드) ──── */}
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '가이드', href: '/guide/' },
                    { name: '{가이드명}' },
                  ]}
                />
                <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">
                  {가이드명} {연도}
                </h1>
                <p className="mt-3 text-lg text-text-secondary" data-speakable>
                  {리드 문단 50-100자. 핵심 요점 선제 제시. 법조항/결과 포함.}
                </p>
              </header>

              {/* ──── 광고 ──── */}
              <AdSlot slot="guide-{name}-top" format="horizontal" />

              {/* ──── 본문 섹션들 (아래 템플릿 참조) ──── */}

              {/* ──── FAQ ──── */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* ──── 추가 섹션 (있으면) ──── */}

              {/* ──── 광고 (중간) ──── */}
              <AdSlot slot="guide-{name}-mid" format="rectangle" />

              {/* ──── 면책 조항 ──── */}
              <section aria-label="면책 및 업데이트" className="card border-t border-border-base pt-4">
                <p className="text-xs text-text-tertiary">
                  <strong>면책:</strong> 본 가이드는 일반적 정보 제공 목적이며 개인의 세무·법무 상담을 대체하지 않습니다.
                  정확한 신고·신청은 세무사·변호사와 상담하세요.
                </p>
                <p className="mt-2 text-xs text-text-tertiary">
                  <strong>업데이트:</strong> {DATE_MODIFIED} 기준 2026년 세법 적용.
                  향후 법 개정 시 내용이 변경될 수 있습니다.
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
```

---

## B. 섹션 템플릿 (반복 사용)

### B-1. 기본 섹션 (제목 + 텍스트)

```tsx
<section aria-label="{섹션 이름}">
  <h2 className="mb-4 text-2xl font-semibold">{제목}</h2>
  <p className="mb-3 text-text-secondary" data-speakable>
    {설명 문단. 50-150자.}
  </p>
</section>
```

### B-2. 강조 박스 섹션

```tsx
<section aria-label="{섹션 이름}" className="card border-l-4 border-l-primary-500">
  <h2 className="mb-4 text-2xl font-semibold">{제목}</h2>
  <p className="mb-4 text-text-secondary" data-speakable>
    {설명 문단}
  </p>
  <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
    <p className="mb-2">
      <strong className="text-text-primary">{박스 제목}</strong>
    </p>
    <p>{상세 설명}</p>
  </div>
</section>
```

### B-3. 경고 섹션 (⚠️)

```tsx
<section aria-label="{섹션 이름}" className="card border-l-4 border-l-danger-500">
  <h2 className="mb-3 text-xl font-semibold">⚠️ {제목}</h2>
  <div className="space-y-3 text-text-secondary">
    <div>
      <p className="mb-1">
        <strong className="text-text-primary">{항목 제목}</strong>
      </p>
      <p className="text-sm">{상세 설명}</p>
    </div>
    {/* 반복: 3-5개 항목 */}
  </div>
</section>
```

---

## C. 테이블 템플릿

### C-1. 간단한 비교표

```tsx
<div className="overflow-x-auto">
  <table className="w-full text-sm">
    <caption className="sr-only">{테이블 설명}</caption>
    <thead>
      <tr className="border-b border-border-base text-left">
        <th className="py-2 pr-4 font-semibold">{열1}</th>
        <th className="py-2 pr-4 font-semibold">{열2}</th>
        <th className="py-2 font-semibold">{열3}</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border-subtle">
        <td className="py-2 pr-4">{값1}</td>
        <td className="py-2 pr-4">{값2}</td>
        <td className="py-2">{값3}</td>
      </tr>
      {/* 반복 */}
    </tbody>
  </table>
</div>
```

### C-2. 세율표 (yes/no 표시)

```tsx
<div className="overflow-x-auto">
  <table className="w-full text-sm">
    <caption className="sr-only">요건 충족 여부 판단</caption>
    <thead>
      <tr className="border-b border-border-base text-left">
        <th className="py-2 pr-4 font-semibold">요건</th>
        <th className="py-2 pr-4 font-semibold">충족 (O)</th>
        <th className="py-2 font-semibold">미충족 (X)</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border-subtle">
        <td className="py-2 pr-4 font-semibold">{요건명}</td>
        <td className="py-2 pr-4 text-primary-600">✅ {상세}</td>
        <td className="py-2 text-danger-500">❌ {상세}</td>
      </tr>
      {/* 반복 */}
    </tbody>
  </table>
</div>
```

---

## D. 리스트 템플릿

### D-1. 순서 없는 리스트 (bullet)

```tsx
<div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
  <p className="mb-2">
    <strong className="text-text-primary">{리스트 제목}</strong>
  </p>
  <ul className="list-inside list-disc space-y-1">
    <li>{항목1}</li>
    <li>{항목2}</li>
    <li>{항목3}</li>
  </ul>
</div>
```

### D-2. 순서 있는 리스트 (numbered)

```tsx
<ol className="list-inside list-decimal space-y-3 text-sm text-text-secondary">
  <li>
    <strong>{단계1 제목}</strong>
    <br />
    {상세 설명}
  </li>
  <li>
    <strong>{단계2 제목}</strong>
    <br />
    {상세 설명}
  </li>
</ol>
```

---

## E. 사례/시뮬레이션 섹션

```tsx
<section aria-label="실제 사례" className="card">
  <h2 className="mb-4 text-2xl font-semibold">실제 사례 — {제목}</h2>

  <div className="mb-6 rounded-lg bg-bg-card p-4">
    <p className="mb-2 font-semibold text-text-primary">
      사례 1: {사례 제목}
    </p>
    <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary">
      <li>{상황 설명1}</li>
      <li>{상황 설명2}</li>
      <li>{요건 충족 여부1} ✅</li>
      <li>{요건 충족 여부2} ❌</li>
      <li className="font-semibold text-primary-600">{핵심 결론}</li>
      <li className="font-semibold text-text-primary">{최종 결과}</li>
    </ul>
  </div>

  <div className="mb-6 rounded-lg bg-bg-card p-4">
    <p className="mb-2 font-semibold text-text-primary">
      사례 2: {사례 제목}
    </p>
    {/* 반복 */}
  </div>
</section>
```

---

## F. 외부 링크 (권위성 E-E-A-T)

```tsx
<p>
  ... 자세한 내용은{' '}
  <a
    href="https://nts.go.kr/..."  {/* deep-link! */}
    target="_blank"
    rel="noopener noreferrer nofollow"
    className="text-primary-500 hover:underline"
  >
    국세청 세무해석
  </a>
  에서 확인할 수 있습니다.
</p>
```

---

## G. 인용/강조 박스

```tsx
{/* 정보 강조 */}
<div className="rounded-lg border-l-4 border-l-primary-500 bg-bg-card p-4">
  <p className="text-sm text-text-secondary">
    <strong className="text-text-primary">💡 참고:</strong> {중요 정보}
  </p>
</div>

{/* 경고 강조 */}
<div className="rounded-lg border-l-4 border-l-danger-500 bg-bg-card p-4">
  <p className="text-sm text-text-secondary">
    <strong className="text-danger-500">⚠️ 주의:</strong> {경고 메시지}
  </p>
</div>
```

---

## H. 완전한 기본 가이드 구조 (최소)

```tsx
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/{slug}/';
const DATE_PUBLISHED = '2026-05-14';
const DATE_MODIFIED = '2026-05-14';

export const metadata: Metadata = {
  title: '{Title} | {keyword} | calculatorhost',
  description: '{80-155 chars}',
  alternates: { canonical: URL },
  openGraph: { title: '{Title}', description: '{Description}', url: URL, type: 'article', locale: 'ko_KR', publishedTime: DATE_PUBLISHED, modifiedTime: DATE_MODIFIED },
  twitter: { card: 'summary_large_image', title: '{Title}', description: '{Description}' },
};

const FAQ_ITEMS = [
  { question: '{Q1}', answer: '{A1}' },
  { question: '{Q2}', answer: '{A2}' },
];

export default function Guide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '{Title}' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '{Title}',
    description: '{Description}',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
  });
  const webPageLd = buildWebPageJsonLd({ name: '{Title}', description: '{Description}', url: URL, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED });
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
                <Breadcrumb items={[{ name: '홈', href: '/' }, { name: '가이드', href: '/guide/' }, { name: '{Title}' }]} />
                <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">{Title}</h1>
                <p className="mt-3 text-lg text-text-secondary" data-speakable>{Description}</p>
              </header>
              <AdSlot slot="guide-{slug}-top" format="horizontal" />
              <section aria-label="개요"><h2 className="mb-4 text-2xl font-semibold">{Section Title}</h2><p className="text-text-secondary">{Content}</p></section>
              <FaqSection items={[...FAQ_ITEMS]} />
              <section aria-label="결론"><h2 className="mb-4 text-2xl font-semibold">결론</h2><p className="text-text-secondary">{Content}</p></section>
              <AdSlot slot="guide-{slug}-mid" format="rectangle" />
              <section aria-label="면책"><p className="text-xs text-text-tertiary"><strong>면책:</strong> 본 가이드는 일반 정보 제공용. 정확한 상담은 전문가와 진행하세요.</p></section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
```

---

## 사용 방법

1. 위 템플릿 중 **A. 페이지 프레임**을 새 파일 `src/app/guide/{slug}/page.tsx`에 붙여넣기
2. `{CUSTOMISE: ...}` 부분을 가이드 내용으로 교체
3. 필요한 섹션(B~G)을 선택하여 `{본문 섹션들}` 영역에 삽입
4. FAQ_ITEMS에 5-8개 질문/답변 추가
5. `npm run lint` 및 `npm run typecheck` 통과 확인
6. `npm run test:e2e` 관련 라우팅 테스트 통과 확인

---

## 관련 파일

- `.claude/checklists/guide-ui-ux-checklist.md` — 상세 체크리스트
- `.claude/checklists/guide-ui-pitfalls.md` — 흔한 실수
- `docs/design-system.md` — 디자인 토큰
