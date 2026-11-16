---
paths:
  - content/**
  - src/app/**/page.tsx
  - src/app/**/layout.tsx
  - src/app/sitemap.ts
  - src/app/robots.ts
---

# SEO·콘텐츠 규칙

## 메타데이터 (Next.js App Router)
모든 페이지 `export const metadata` 필수:
```ts
export const metadata = {
  title: "...",        // 40자 이내, 실제 검색어(데이터랩 실측 형태)를 맨 앞에 (네이버 사이트 간단 체크, ADR-016). 브랜드명은 붙이지 않는다
  description: "...",  // 40~80자, 1~2문장, 첫 문장에 결론 (네이버 사이트 간단 체크 80자 이내, 구글 모바일 잘림도 약 80자. ADR-016)
  alternates: { canonical: "https://calculatorhost.com/<path>/" }, // trailing slash 필수
  openGraph: { url: "https://calculatorhost.com/<path>/", type: 'article', locale: 'ko_KR' }, // og:url = canonical
  twitter: { card: 'summary_large_image' },
};
```

네이버 공식 가이드 적용 규칙 (2026-10-30, ADR-019):
- `openGraph`·`twitter` 에 `title`·`description` 을 따로 적지 않는다. Next 가 위 title·description 을 그대로 이어받아
  og·twitter 제목/설명이 페이지 제목/설명과 같아진다 (네이버 04-02, 12-01).
- `images` 를 적지 않는다. 페이지 폴더의 `opengraph-image.png`(+ `.alt.txt`)를 Next 가 붙인다. 적으면 파일이 무시되고
  공통 이미지가 나가 네이버가 썸네일로 쓰지 않는다 (04-02 "문서마다 고유 이미지"). 새 가이드는 `npm run gen-og`
  (빌드 때 자동)로 이미지를 만들고 함께 커밋한다. `tests/unit/seo/og-images.test.ts` 가 빠진 이미지를 잡는다.
- 제목: 40자 이내, 브랜드 없음, 같은 단어 두 번 금지, 완벽·총정리·필독·! 금지. 메인 페이지만 브랜드명으로 시작하고 자주 바꾸지 않는다.
- 설명: 40~80자, 1~2문장, 같은 단어 두 번 금지, 마감 카운트다운·과장 금지.
- 외부 기관 링크·전화번호는 공식 누리집에서 확인한 것만 쓴다. 모르면 대표 누리집 주소만 쓰고 번호는 적지 않는다 (03-01 사용자 혼동).

## 구조화 데이터 (세트 — 템플릿 일관성 유지)
`src/lib/seo/jsonld.ts` 헬퍼로 JSON-LD 생성:
- **계산기 페이지 (6종)**: SoftwareApplication + WebPage + BreadcrumbList + FAQPage + HowTo + Speakable
- 가이드: Article + BreadcrumbList + WebPage (+ FAQPage/Speakable 템플릿 관행)
- 용어사전: DefinedTerm + BreadcrumbList + WebPage
- 정책 페이지(privacy/terms/contact/about): BreadcrumbList + WebPage

> ⚠️ 2026-07-22 공식 가이드 동기화: **FAQPage(구글 리치결과 폐지·네이버 미지원)·HowTo(구글 폐지)·Speakable(베타·뉴스 한정)은 SERP 효과 없음.** 무해하므로 유지하되 리치결과 근거 설계 금지, 마크업은 보이는 콘텐츠와 1:1 일치 필수. 상세: `.claude/rules/new-post-seo-geo-harness.md` §4-1

네이버 구조화 데이터 가이드(08) 적용 (2026-10-30, ADR-019):
- HowTo 는 네이버 지원 타입이다. 단계를 화면에도 보여야 하므로 `buildHowToJsonLd(howToData)` 와 `<HowToSteps name steps>` 에 같은 배열을 넘긴다.
- DefinedTermSet 정의문도 화면에 있어야 한다. `<GlossaryTerms name terms>` 로 같은 배열을 보여준다 (용어사전·허브 제외).
- BreadcrumbList 이름은 화면 빵부스러기와 같게 짧은 키워드형으로. 사이트 루트는 "홈" 대신 사이트 이름(헬퍼·컴포넌트가 자동 처리).
- ItemList(캐러셀)는 항목마다 고유 `image` 필수, 화면에 보이는 링크만, 항목이 적으면(3개 이하) 넣지 않는다.
- `tests/unit/seo/structured-data-source.test.ts` 가 화면=마크업 일치를 소스 단계에서 검사한다.

## 영문 슬러그
- 영문 URL (`/calculator/salary/`, `/category/tax/`)
- 케밥케이스(`-`)만 사용
- 모든 URL trailing slash 종결 (sitemap·canonical 일관)

## 콘텐츠 품질
- 본문 2000자 하한 (계산기 UI 제외)
- 법조항 인용 + **공식 외부 권위 링크 2~3개 의무** (rel="nofollow")
- 업데이트 날짜 명시 (`dateModified` JSON-LD + 페이지 상단 표기)
- 면책조항 하단 포함

## 금지
- title/description 여러 페이지 중복
- 키워드 스터핑
- "최고" "1위" "유일" 허위 우려 표현
- "투자 권유" "수익 보장"
- AI 생성 콘텐츠 미공개
- 타 사이트 복사

## 이미지
- `next/image` 필수
- `alt` 속성 한국어로 설명적
- WebP/AVIF 자동 변환
- 히어로 이미지 `priority`

## 에이전트 위임
- 본문 한국어 작성: **content-writer**
- 메타/JSON-LD/감사: **seo-auditor**
