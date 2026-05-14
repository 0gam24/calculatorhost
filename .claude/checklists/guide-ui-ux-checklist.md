# 가이드 포스트 UI/UX 표준 체크리스트

> **목적**: 새 가이드 발행 시 UI·UX·접근성 일관성 검증. 재사용 가능한 프롬프트 하네스.
> **적용 대상**: `/guide/{slug}/page.tsx` 신규 발행 전 최종 검수
> **마지막 갱신**: 2026-05-14
> **운영**: frontend-builder / seo-auditor 협업

---

## A. 레이아웃 구조 (필수)

- [ ] **기본 래퍼**: `<article className="mx-auto max-w-3xl space-y-8">` 사용
  - 예외: 테이블이나 광고로 더 넓은 공간 필요 시 협의
- [ ] **메인 컨테이너**: `<main id="main-content" className="flex-1 px-4 py-8 md:px-8">` 포함
- [ ] **섹션 간격**: 모든 섹션이 `space-y-8` 내 포함 (일관된 16px×8 = 128px 간격)
- [ ] **섹션 aria-label**: 각 `<section>`마다 `aria-label="{섹션명}"` 명시
  - 예: `<section aria-label="거주 요건" className="card">`

---

## B. 헤더 영역 (필수)

- [ ] **Breadcrumb 컴포넌트**: `@/components/layout/Breadcrumb` import + 사용
  ```tsx
  <Breadcrumb
    items={[
      { name: '홈', href: '/' },
      { name: '가이드', href: '/guide/' },
      { name: '포스트명' },
    ]}
  />
  ```
- [ ] **H1 제목**: `<h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">`
- [ ] **리드 문단**: `<p className="mt-3 text-lg text-text-secondary" data-speakable>`
  - `data-speakable` 속성 필수 (음성·AI 답변 최적화)
  - 50-100자, 핵심 요점 선제 제시

---

## C. 광고 슬롯 배치 (AdSense 수익화)

### 상단 광고 (헤더 아래)
- [ ] **AD-1 리더보드**: `<AdSlot slot="guide-{name}-top" format="horizontal" />`
  - 위치: 리드 문단 직후
  - 728×90 (모바일) / 970×250 (데스크톱)

### 본문 중간 광고
- [ ] **AD-2 Medium Rectangle**: `<AdSlot slot="guide-{name}-mid" format="rectangle" />`
  - 위치: 섹션 2~3개 다음 (약 600-800자 후)
  - 300×250 (가장 높은 eCPM 구역)

### FAQ 이전 광고 (선택)
- [ ] **AD-3 또는 AD-4 인피드**: FAQ 직전 배치 가능
  - 모바일은 AD-5 앵커로 대체 가능

### 모든 AdSlot 확인
- [ ] **props 정확성**: `slot`, `format` 명시 (slotId/billboard 금지)
- [ ] **라이트 배경**: 다크 테마에서도 자동 라이트 배경 강제됨 (검수 완료)
- [ ] **min-height 고정**: CLS 방지 자동 처리됨 (컴포넌트 내부)
- [ ] **페이지당 ≤ 4개**: 광고 과다 배치 금지

---

## D. 본문 섹션 (콘텐츠 구조)

### 섹션 템플릿 (일관된 마크업)
- [ ] **H2 제목**: `<h2 className="mb-4 text-2xl font-semibold">`
- [ ] **설명 문단**: `<p className="mb-3 text-text-secondary" data-speakable>`
- [ ] **강조 박스**: 
  ```tsx
  <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
    <p className="mb-2"><strong className="text-text-primary">제목</strong></p>
    {콘텐츠}
  </div>
  ```

### 데이터 시각화 (스크린샷 금지, 테이블 필수)
- [ ] **테이블 사용**: `<table className="w-full text-sm">` + `<caption>` + `<thead>/<tbody>` 명시
  - 예: 요건 비교, 세율 수치, 3가지 시나리오
  - **이미지·스크린샷 금지** (GEO/AEO 손상)
- [ ] **리스트**: `<ul className="list-inside list-disc space-y-1">` 또는 `<ol className="list-inside list-decimal space-y-3">`

### 색상 강조
- [ ] **긍정 (OK)**: `text-primary-600` 또는 `border-l-4 border-l-primary-500` 사용
- [ ] **주의 (⚠️)**: `border-l-4 border-l-danger-500` / `text-danger-500` 사용
- [ ] **정보 (i)**: `bg-bg-card` 박스 사용

---

## E. FAQ 섹션 (필수, 중간 배치)

- [ ] **FaqSection 컴포넌트**: `@/components/calculator/FaqSection` import
  ```tsx
  const FAQ_ITEMS = [
    { question: '...', answer: '...' },
    // 5-8개 항목
  ];
  <FaqSection items={[...FAQ_ITEMS]} />
  ```
- [ ] **위치**: 본문 절반 지점 (하단 X)
  - 이유: GEO (LLM 인용)/체류시간 최적화
- [ ] **스타일**: 컴포넌트가 자동 처리함 (details/summary 접힘)
- [ ] **답변 첫 문장**: 결론 선제 제시 (음성 답변 최적화)
- [ ] **data-speakable**: 답변에 자동 추가됨 (제거 금지)

---

## F. 메타데이터 & 구조화 데이터 (SEO)

### 메타 태그
- [ ] **title**: 60자 이내, 법조항 포함
  - 예: `'자경농지 8년 100% 감면 완벽 정리 2026 | 조특법 §69'`
- [ ] **description**: 80-155자, 첫 문장 결론
- [ ] **canonical**: `https://calculatorhost.com/guide/{slug}/` (trailing slash)
- [ ] **openGraph**: `images: ['/og-default.png']` 명시
- [ ] **twitter.card**: `'summary_large_image'`

### JSON-LD (필수 4종)
- [ ] **BreadcrumbJsonLd**: `buildBreadcrumbJsonLd([...])`
- [ ] **ArticleJsonLd**: `buildArticleJsonLd({...})`
  - `datePublished`, `dateModified`, `authorName` 포함
- [ ] **WebPageJsonLd**: `buildWebPageJsonLd({...})`
- [ ] **FaqPageJsonLd**: `buildFaqPageJsonLd([...FAQ_ITEMS])`
- [ ] **모든 JSON-LD 스크립트 태그**: `<script type="application/ld+json">` 인라인 삽입

---

## G. 링크 & 권위성 (E-E-A-T)

- [ ] **외부 권위 링크**: 본문에 공식 기관 2~3개 포함
  - 국세청(nts.go.kr) / 기획재정부 / 법령정보센터(law.go.kr) 등
  - 링크 속성: `target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 hover:underline"`
  - Deep-link: 홈페이지가 아닌 구체적 법령/고시/세액표 직링크
- [ ] **내부 관련 가이드**: "관련 가이드" 섹션 추가 여부 (선택, 있으면 3~5개)

---

## H. 반응형 & 모바일 (Mobile-First)

- [ ] **기본 모바일 설계**: px-4 (16px 패딩) 기본
- [ ] **md 브레이크포인트**: px-8 (32px) + 사이드바 아이콘만
- [ ] **lg 브레이크포인트**: 우측 광고 사이드바 노출 (AD-3 skyscraper)
- [ ] **텍스트 크기 조정**: 
  - H1: `text-3xl md:text-4xl`
  - H2: `text-2xl` (일정)
  - 본문: `text-base` (일정)
- [ ] **테이블**: `<div className="overflow-x-auto">` 래핑 (모바일 수평 스크롤)

---

## I. 접근성 (WCAG 2.2 AA)

- [ ] **Heading 계층**: H1 → H2 → H3 순차, 건너뛰기 X
- [ ] **aria-label**: 모든 섹션, 테이블, 목록 명시
- [ ] **data-speakable**: 핵심 문단에 추가 (음성 답변용)
- [ ] **색 대비**: 4.5:1 이상 (모든 텍스트)
  - 다크: `text-text-primary`(#F5F6F8) on `bg-base`(#272A2F) → 14.2:1 ✅
  - 라이트: `text-text-primary`(#1A1D21) on `bg-base`(#F7F8FA) → 13.5:1 ✅
- [ ] **포커스 인디케이터**: 링크/버튼에 `focus-visible:ring-2 ring-primary`
- [ ] **alt 텍스트**: 이미지 사용 시 한국어로 설명적 대체 텍스트

---

## J. 동작 & 애니메이션

- [ ] **FAQ 접힘**: `details`/`summary` 기본 (Framer Motion X)
- [ ] **prefers-reduced-motion 존중**: 애니메이션 있으면 자동 비활성화
- [ ] **IntersectionObserver 지연 로드**: 광고 슬롯만 (본문 콘텐츠 X)

---

## K. 다크/라이트 테마

- [ ] **다크 테마 렌더링**: 모든 섹션이 `bg-bg-card`(#2F3238) 위에서 가독성 확인
- [ ] **라이트 테마 렌더링**: 모든 섹션이 `bg-bg-card`(#FFFFFF) 위에서 가독성 확인
- [ ] **광고 슬롯**: 다크 테마에서도 `bg-white` 강제 (AdSense 정책)
- [ ] **색상 토큰만 사용**: 하드코딩 색상(#595FF7, #FC354D 등) X

---

## L. 성능 & Core Web Vitals

- [ ] **이미지**: `next/image` 필수 (스크린샷·PNG X)
- [ ] **히어로 이미지**: 있으면 `priority` 속성
- [ ] **폰트**: Pretendard Variable (한글/UI) / Inter Variable (숫자)는 layout.tsx에서 로드됨 (확인만)
- [ ] **동적 import**: 복잡한 차트/모달은 `dynamic()` 사용 (가이드엔 보통 불필요)
- [ ] **CLS 방지**: 
  - 광고 슬롯: 컴포넌트에서 min-height 고정 ✅
  - 이미지: width/height 명시 (또는 next/image 자동)
  - 폰트: 웹 폰트 preload (`layout.tsx` 기본)

---

## M. 코드 품질 & 검수

- [ ] **TypeScript**: `any` 타입 X, Props 명시
- [ ] **ESLint/Prettier**: `npm run lint` 통과
- [ ] **스펠링**: 한국어 맞춤법 확인 (오타 X)
- [ ] **날짜**: `DATE_PUBLISHED`, `DATE_MODIFIED` ISO 8601 형식 (`YYYY-MM-DD`)
- [ ] **JSON-LD**: `JSON.stringify()` 후 `dangerouslySetInnerHTML` 사용

---

## N. 최종 검수 (발행 전)

- [ ] **전체 페이지 스크린샷**: 데스크톱 + 모바일 (타이트 vs 느슨한 레이아웃)
- [ ] **다크/라이트 토글**: 양쪽 다 정상 렌더링
- [ ] **SEO 메타 점검**: title/description/canonical 구글 서식 합치기
- [ ] **Lighthouse 점수**: Performance ≥90, Accessibility ≥95 (모바일 기준)
- [ ] **E2E 테스트**: `npm run test:e2e` 중 관련 라우팅 테스트 통과
- [ ] **링크 유효성**: 외부 권위 링크 3개 모두 HTTP 200 확인

---

## 재사용 프롬프트 (copy-paste ready)

### 신규 가이드 발행 체크리스트 (AI 음성)
```
새 가이드 포스트 '{title}' 발행 전 최종 UI/UX 검수:

▢ A. 레이아웃 (mx-auto max-w-3xl, space-y-8)
▢ B. 헤더 (Breadcrumb, H1, 리드 문단 + data-speakable)
▢ C. 광고 슬롯 (AD-1 top / AD-2 mid / props 정확)
▢ D. 본문 섹션 (H2 구조, bg-bg-card 박스, 테이블 사용)
▢ E. FAQ 섹션 (FaqSection 컴포넌트, 중간 배치, 5-8개)
▢ F. 메타 & JSON-LD (title/description/4종 JSON-LD)
▢ G. 링크 (외부 권위 2~3개, rel=nofollow, deep-link)
▢ H. 반응형 (모바일 px-4, md px-8, lg 사이드바)
▢ I. 접근성 (heading 계층, aria-label, 색 대비 4.5:1)
▢ J. 동작 (FAQ details/summary, reduced-motion 존중)
▢ K. 테마 (다크/라이트 둘 다, 광고 라이트 강제)
▢ L. 성능 (next/image, min-height CLS, 폰트 preload)
▢ M. 코드 (TypeScript, ESLint, ISO 8601 날짜)
▢ N. 최종 (스크린샷, Lighthouse ≥90, 외부 링크 200)

**대기: frontend-builder 최종 시각 검수**
```

---

## 관련 문서

- `.claude/rules/seo-content.md` — 메타/JSON-LD 상세
- `docs/design-system.md` — 토큰/컬러/타이포그래피
- `docs/architecture.md` — 렌더링 전략
- `.claude/skills/design-system-fintech/REFERENCE.md` — 컴포넌트 템플릿

---

## 업데이트 로그

- 2026-05-14: 초판 작성 (40편 가이드 사례 기반)
  - 레이아웃 / 광고 / 메타 / 접근성 / 테마 / 성능 / 코드 품질 섹션 추가
  - 재사용 프롬프트 하네스 추가
