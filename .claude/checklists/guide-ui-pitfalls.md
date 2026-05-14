# 가이드 포스트 UI/UX 흔한 실수 & 해결책

> **목적**: 기존 40편 가이드 분석 기반 빈출 버그·스타일 오류 카탈로그
> **사용**: 신규 가이드 작성 시 이 패턴들을 **반드시 피하기**
> **마지막 갱신**: 2026-05-14

---

## 1. 레이아웃 오류

### ❌ 피하기: `max-w-full` 또는 no max-width
```tsx
// WRONG
<article className="px-4 space-y-8">
  <h1>제목</h1>
  ...
</article>
```

### ✅ 올바른 방법
```tsx
// CORRECT
<article className="mx-auto max-w-3xl space-y-8">
  <h1>제목</h1>
  ...
</article>
```
**이유**: 데스크톱에서 본문이 화면 전체 너비로 펼쳐져 가독성 하락 (한 줄 140자 초과).

---

### ❌ 피하기: `space-y-4` 또는 `space-y-6` 섞음
```tsx
<article className="mx-auto max-w-3xl space-y-4">
  {/* 섹션들 */}
</article>
```

### ✅ 올바른 방법
```tsx
<article className="mx-auto max-w-3xl space-y-8">
  {/* 섹션들 — 일관된 128px 간격 */}
</article>
```
**이유**: 모든 가이드가 동일한 리듬감으로 인식 (브랜드 일관성).

---

## 2. 광고 슬롯 오류

### ❌ 피하기: 숫자 slot ID 또는 예전 prop 이름
```tsx
// WRONG
<AdSlot slotId="123456" billboard />
<AdSlot slot="guide-top" format="ad-unit" />
<AdSlot slot={slot_id} />
```

### ✅ 올바른 방법
```tsx
// CORRECT
<AdSlot slot="guide-farming-top" format="horizontal" />
<AdSlot slot="guide-farming-mid" format="rectangle" />
<AdSlot slot="guide-farming-bottom" format="vertical" />
```
**이유**: `format` prop은 AdSense의 광고 단위 선택 로직. `slot` 문자열은 추적용 slot ID.

---

### ❌ 피하기: 다크 배경 광고 영역
```tsx
// WRONG
<div className="bg-bg-card rounded-lg p-4">
  <AdSlot slot="guide-top" format="horizontal" />
</div>
```

### ✅ 올바른 방법
```tsx
// CORRECT
<AdSlot slot="guide-top" format="horizontal" />
{/* AdSlot 컴포넌트가 자동으로 라이트 배경 강제 */}
```
**이유**: AdSense 정책 §6: 광고 영역 배경은 흰색(#FFFFFF) 또는 투명. 다크 배경은 가독성 저하 + 정책 위반.

---

### ❌ 피하기: 광고 슬롯 5개 이상
```tsx
<AdSlot slot="guide-top" ... />
<AdSlot slot="guide-mid1" ... />
<AdSlot slot="guide-mid2" ... />
<AdSlot slot="guide-mid3" ... />
<AdSlot slot="guide-bottom" ... />
{/* WRONG: 5개 */}
```

### ✅ 올바른 방법
```tsx
<AdSlot slot="guide-top" format="horizontal" />
<AdSlot slot="guide-mid" format="rectangle" />
{/* ≤ 4개 페이지당 */}
```
**이유**: AdSense 정책 §11: 페이지당 광고 단위 수 제한 (모바일 기준 3-4개가 최적 eCPM).

---

## 3. 본문 스타일 오류

### ❌ 피하기: 하드코딩 색상
```tsx
// WRONG
<p style={{ color: '#595FF7' }}>중요 텍스트</p>
<div style={{ backgroundColor: '#FC354D' }}>경고</div>
<p className="text-[#8EC9DC]">...</p>
```

### ✅ 올바른 방법
```tsx
// CORRECT
<p className="text-primary-500">중요 텍스트</p>
<div className="border-l-4 border-l-danger-500 bg-bg-card p-4">경고</div>
<p className="text-secondary-500">...</p>
```
**이유**: 디자인 토큰은 다크/라이트 테마에서 자동 변환. 하드코딩은 테마 토글 시 깨짐.

---

### ❌ 피하기: 인라인 `<style>` 또는 CSS modules
```tsx
// WRONG
<p style={{ fontSize: '18px', lineHeight: '1.8' }}>본문</p>
<div style={{ padding: '16px 20px' }}>
```

### ✅ 올바른 방법
```tsx
// CORRECT
<p className="text-lg leading-relaxed">본문</p>
<div className="p-4">
{/* 또는 더 세밀하면 */}
<div className="px-5 py-4">
```
**이유**: Tailwind 유틸이 모든 토큰을 정의. 인라인 스타일은 검색·유지보수 불가.

---

### ❌ 피하기: 이미지/스크린샷 사용
```tsx
// WRONG
<img src="/images/tax-rate-table.png" alt="세율표" />
<img src="https://example.com/chart.jpg" />
```

### ✅ 올바른 방법
```tsx
// CORRECT: 테이블 사용
<table className="w-full text-sm">
  <caption className="sr-only">세율표 (8단계)</caption>
  <thead>
    <tr>
      <th>과세표준</th>
      <th>세율</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1,400만 이하</td>
      <td>6%</td>
    </tr>
  </tbody>
</table>

// CORRECT: 이미지 필수면 next/image
import Image from 'next/image';

<Image
  src="/images/hero.png"
  alt="소득세 계산 흐름"
  width={800}
  height={400}
  priority
/>
```
**이유**: GEO(구글 AI Overview) 인용은 텍스트 + 테이블 우선. 이미지는 합성 불가. next/image는 자동 WebP/AVIF 변환 + lazy load.

---

## 4. FAQ 섹션 오류

### ❌ 피하기: 수동 details/summary 렌더링
```tsx
// WRONG: 일관성 파괴
{FAQ_ITEMS.map((item, idx) => (
  <details key={idx}>
    <summary>{item.question}</summary>
    <p>{item.answer}</p>
  </details>
))}
```

### ✅ 올바른 방법
```tsx
// CORRECT: 컴포넌트 사용
<FaqSection items={FAQ_ITEMS} />
```
**이유**: FaqSection 컴포넌트가 스타일링(border-l-primary, 색상 호버) + 접근성(aria-label, data-speakable) 처리.

---

### ❌ 피하기: FAQ를 하단에만 배치
```tsx
<section>주요 내용</section>
<section>추가 정보</section>
<section>함정 5가지</section>
<section>신청 절차</section>

{/* WRONG: 너무 뒤 */}
<FaqSection items={FAQ_ITEMS} />
```

### ✅ 올바른 방법
```tsx
<section>주요 내용</section>
<section>추가 정보</section>

{/* CORRECT: 본문 절반 지점 */}
<FaqSection items={FAQ_ITEMS} />

<section>함정 5가지</section>
<section>신청 절차</section>
```
**이유**: GEO(AI Overview) 인용은 본문 상반부 콘텐츠 선호. 또한 평균 체류시간 증대 (FAQ 중간 배치 시 사용자가 더 읽음).

---

### ❌ 피하기: 첫 문장이 답이 아닌 FAQ 답변
```tsx
// WRONG
{
  question: '자경 요건이 뭔가요?',
  answer: '조특법 시행령 §66 ②에 따르면... (장황한 설명) ...50% 이상 노동력 투입 필수.'
}
```

### ✅ 올바른 방법
```tsx
// CORRECT
{
  question: '자경 요건이 뭔가요?',
  answer: '농지 소유자가 50% 이상의 자기 노동력을 투입하여 직접 경작해야 합니다(조특법 시행령 §66 ②). 위탁경영이나 대리경작은 인정되지 않습니다. 입증은 ...'
}
```
**이유**: 음성 QA / AI Overview 합성은 첫 1-2 문장만 추출. "결론 선제" 원칙.

---

## 5. 메타데이터 오류

### ❌ 피하기: 각 가이드마다 다른 title 템플릿
```tsx
// WRONG: 일관성 X
export const metadata = {
  title: '[가이드] 자경농지 감면 완전 해석',
  // vs
  title: '자경농지 100% 감면 — 2026년판',
  // vs
  title: '자경농지 양도세 100% 감면 | calculatorhost',
};
```

### ✅ 올바른 방법
```tsx
// CORRECT: 일관된 템플릿
export const metadata = {
  title: '자경농지 8년 100% 감면 완벽 정리 2026 | 조특법 §69',
  // '{가이드명} {연도} | {핵심 키워드} | calculatorhost'
  description: '자경농지 8년 양도세 100% 감면 조건·자경 요건(직접 종사 50% 이상)·거주 요건(30km 이내)·한도(연 1억/5년 2억)·신청 절차·함정 5가지.',
  // 80~155자, 첫 문장 결론
  alternates: { canonical: 'https://calculatorhost.com/guide/self-farming-land-100-percent-exemption/' },
  // trailing slash 필수
};
```
**이유**: Google SERP 일관성 + sitemap/canonical 동기화.

---

### ❌ 피하기: JSON-LD 누락
```tsx
// WRONG
export default function Guide() {
  return (
    <article>
      <h1>제목</h1>
      ...
    </article>
  );
}
// JSON-LD 스크립트 0개!
```

### ✅ 올바른 방법
```tsx
// CORRECT
const breadcrumbLd = buildBreadcrumbJsonLd([...]);
const articleLd = buildArticleJsonLd({...});
const webPageLd = buildWebPageJsonLd({...});
const faqLd = buildFaqPageJsonLd([...FAQ_ITEMS]);

export default function Guide() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <article>...</article>
    </>
  );
}
```
**이유**: GEO/AEO 기초. JSON-LD 없으면 AI Overview가 페이지 콘텐츠 이해 불가.

---

## 6. 반응형 오류

### ❌ 피하기: 고정 `px-8` 모바일
```tsx
// WRONG
<main className="px-8">
  <article className="mx-auto max-w-3xl">
```
모바일에서 96px 좌우 패딩 → 화면 너비 320px - 96px = 224px (너무 좁음).

### ✅ 올바른 방법
```tsx
// CORRECT
<main className="flex-1 px-4 py-8 md:px-8">
  <article className="mx-auto max-w-3xl">
```
모바일: 16px / 태블릿(md+): 32px.

---

### ❌ 피하기: 테이블 모바일 미처리
```tsx
// WRONG
<table className="w-full text-sm">
  {/* 열이 10개 → 모바일에서 찌그러짐 */}
</table>
```

### ✅ 올바른 방법
```tsx
// CORRECT
<div className="overflow-x-auto">
  <table className="w-full text-sm">
    {/* 수평 스크롤 가능 */}
  </table>
</div>
```

---

## 7. 접근성 오류

### ❌ 피하기: Heading 건너뛰기
```tsx
// WRONG
<h1>제목</h1>
<h3>소제목</h3>  ← H2 건너뛰었음!
<p>본문</p>
<h2>다음 섹션</h2>  ← 계층 혼재
```

### ✅ 올바른 방법
```tsx
// CORRECT
<h1>제목</h1>
<p>리드</p>

<section>
  <h2>섹션 1</h2>
  <p>본문</p>
  <h3>세부 항목</h3>
  <p>설명</p>
</section>

<section>
  <h2>섹션 2</h2>
  <p>본문</p>
</section>
```
**이유**: 스크린 리더 사용자가 제목으로 네비게이션 (heading 계층 없으면 혼란).

---

### ❌ 피하기: 색만으로 정보 전달
```tsx
// WRONG
<p className="text-danger-500">이것은 중요합니다</p>
<p className="text-primary-500">이것은 좋습니다</p>
```
색맹 사용자 입장: 의미 모호.

### ✅ 올바른 방법
```tsx
// CORRECT
<p className="border-l-4 border-l-danger-500 pl-4 text-text-secondary">
  <strong>⚠️ 주의:</strong> 이것은 중요합니다.
</p>
<p className="border-l-4 border-l-primary-500 pl-4 text-text-secondary">
  <strong>✓ 가능:</strong> 이것은 좋습니다.
</p>
```
색 + 기호 + 텍스트 라벨 3중 신호.

---

## 8. 성능 오류

### ❌ 피하기: 다중 이미지 직접 load
```tsx
// WRONG
<img src="/images/hero-1.png" />
<img src="/images/hero-2.jpg" />
<img src="/images/chart.png" />
{/* 세 파일 모두 LCP에 포함 → LCP 늦음 */}
```

### ✅ 올바른 방법
```tsx
// CORRECT
import Image from 'next/image';

<Image
  src="/images/hero.avif"
  alt="..."
  width={800}
  height={400}
  priority  // LCP 이미지만
/>

// 다른 이미지는 lazy load (next/image 기본)
```
**이유**: next/image는 자동 lazy load. `priority` 키워드는 1-2개만 (히어로 이미지).

---

## 9. 코드 품질 오류

### ❌ 피하기: 날짜 임의 형식
```tsx
// WRONG
const DATE = '2026년 5월 14일';  // 코드에 불필요
const DATE_MODIFIED = 'May 14, 2026';  // 영문?
const DATE_PUBLISHED = '20260514';  // ISO 아님
```

### ✅ 올바른 방법
```tsx
// CORRECT
const DATE_PUBLISHED = '2026-05-14';  // ISO 8601
const DATE_MODIFIED = '2026-05-14';

// JSON-LD는 자동 처리
buildArticleJsonLd({
  datePublished: DATE_PUBLISHED,  // '2026-05-14'
  dateModified: DATE_MODIFIED,
});
```

---

### ❌ 피하기: TypeScript `any` 사용
```tsx
// WRONG
const buildLd = (data: any) => {
  return { ...data };
};
```

### ✅ 올바른 방법
```tsx
// CORRECT
interface FaqItem {
  question: string;
  answer: string;
}

const buildLd = (items: FaqItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
};
```

---

## 체크리스트 (발행 전 5분)

```
[ ] 테이블 사용 (이미지 X)
[ ] FAQ 중간 배치 + 5-8개
[ ] AdSlot: top + mid 2개만
[ ] 색상: 토큰만 (하드코딩 X)
[ ] 메타: title 60자, description 80-155자
[ ] JSON-LD: 4종 (breadcrumb/article/webpage/faq)
[ ] Heading: H1 → H2 계층 순차
[ ] 다크/라이트: 양쪽 다 가독성 ✓
[ ] Lighthouse: Performance ≥90
[ ] npm run lint: 통과
```

---

## 관련 파일

- `.claude/checklists/guide-ui-ux-checklist.md` — 상세 체크리스트
- `.claude/checklists/guide-ui-quick-check.txt` — 1분 내 검수
- `docs/design-system.md` — 토큰 정의
- `.claude/rules/seo-content.md` — 메타/구조화 데이터

