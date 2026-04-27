---
description: 지정한 페이지 또는 전체 사이트의 SEO 감사 실행
argument-hint: <페이지경로 또는 all> 예) /seo-check 계산기/연봉실수령액
---

# /seo-check {{args}}

**seo-auditor** 에이전트를 호출하여 감사 수행.

대상: `{{args}}` (또는 `all`)

감사 항목:
1. title·description·canonical·hreflang 메타
2. JSON-LD 구조화 데이터 (SoftwareApplication·FAQPage·BreadcrumbList)
3. 헤딩 위계
4. 이미지 alt 속성
5. 내부·외부 링크 품질
6. Core Web Vitals 영향 예측
7. 콘텐츠 길이·E-E-A-T 신호
8. robots·sitemap 인덱싱 가능성
9. 모바일 친화성

산출물: `🔴🟡🟢` 우선순위별 이슈 리스트 + 수정 diff.

근거: `.claude/skills/google-seo-reference/REFERENCE.md`
