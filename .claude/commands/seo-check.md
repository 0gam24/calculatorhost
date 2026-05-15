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

## 💰 수익화 영향 평가 (북극성 룰 — 출력 마지막 섹션 의무)

리포트 末尾에 다음 평가 자동 출력:

```
### 수익화 영향 평가
- 영향 페이지: <대상 URL 또는 all>
- 수익 항: traffic (SEO = 페이지당 트래픽 ↑)
- GSC 사정권 키워드 비교 권고:
    · 이 페이지의 GSC 8~20위 쿼리가 메타 title·description·답 블록에 포착되는가?
    · 포착 못 하면 의도 흡수 부족 — vehicle-tax / rent-conversion 케이스 패턴 적용 검토
- 부작용:
    · 메타 변경이 기존 1~7위 쿼리 CTR 떨어뜨릴 위험: <검토>
    · canonical 변경이 색인 표면 떨어뜨릴 위험: <검토>
- revenue-lever 권장 태그: traffic (개선) 또는 indexing (구조 수정)
```

근거: `.claude/skills/google-seo-reference/REFERENCE.md` + 루트 `CLAUDE.md` "💰 북극성"
