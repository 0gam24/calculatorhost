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
  title: "...",        // 60자 이내 (template으로 suffix 자동 추가 금지 — 페이지마다 직접 작성)
  description: "...",  // 80~155자 (단문 금지, 첫 문장에 결론). 한글 80자 ≈ Google SERP 영문 160자 잘림 한계.
  alternates: { canonical: "https://calculatorhost.com/<path>/" }, // trailing slash 필수
  openGraph: { images: ['/og-default.png'], ... },                  // images 필수
  twitter: { card: 'summary_large_image', images: ['/og-default.png'] },
};
```

## 구조화 데이터 (필수 세트)
`src/lib/seo/jsonld.ts` 헬퍼로 JSON-LD 생성:
- **계산기 페이지 (필수 6종)**: SoftwareApplication + WebPage + BreadcrumbList + FAQPage + HowTo + Speakable
- 가이드: Article + BreadcrumbList + WebPage
- 용어사전: DefinedTerm + BreadcrumbList + WebPage
- 정책 페이지(privacy/terms/contact/about): BreadcrumbList + WebPage

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
