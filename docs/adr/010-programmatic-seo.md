# ADR 010: Programmatic SEO 70+ 페이지 설계

**Status**: Draft (Phase 3 후보, 운영자 승인 대기)
**Date**: 2026-05-12
**Authors**: 메인 + Phase 3 합의 (8 에이전트)

## 1. 배경

- 현재 색인 40 / 미색인 57 (GSC 기준)
- 4티어 롱테일 키워드 (`연봉 5000 실수령액`, `취득세 8.4% 3주택 85제곱` 등) GSC 노출 흔적
- 단일 계산기 페이지로는 4티어 롱테일 캡처 효율 낮음 — 사용자가 입력해야 결과 보임 → 검색 미리보기에 수치 노출 X
- 정적 빌드(`output: 'export'`)이므로 빌드 시점 자동 생성 가능

## 2. 설계 원칙

1. **Thin content 금지** — 페이지당 본문 1500자 + 고유 데이터 + 결과 표 + FAQ 3개 + 관련 링크
2. **고유 헤딩·메타** — 각 페이지 H1·title·description 모두 다름 (자동 템플릿 + 입력 데이터)
3. **상위 계산기로 deep-link** — 모든 자동 페이지에서 본 계산기 페이지로 "더 정확히 계산하기" CTA
4. **AdSense 정책** — Above-the-fold 광고 ≤ 1, 페이지당 ≤ 3
5. **AI 보조 작성 명시** — 자동 생성 페이지는 "본 페이지는 자동 생성된 참고 자료입니다" 디스클로저
6. **기존 §N audit 통과** — 모든 페이지에 법조항 1개 이상

## 3. Phase 3 후보 시리즈

### A. 연봉 실수령액 (`/calculator/salary/연봉-{N}만원/`)
- 범위: 2,000만 ~ 1억 5,000만 (500만 단위 = 27개)
- 입력값 고정 (부양가족 1인, 비과세 0)
- 본문: 월 실수령액·4대보험·소득세 표 + "왜 이 금액인가" 단계별 + FAQ 3개

### B. 취득세 (`/calculator/acquisition-tax/{면적}-{가격}/`)
- 범위: 60㎡·85㎡·100㎡ × 5억·8억·9억·10억·12억 = 15개
- 입력값 고정 (1주택, 비조정지역)

### C. 양도소득세 (`/calculator/capital-gains-tax/{보유연수}년-{양도차익}억/`)
- 범위: 2~10년 × 1·2·3·5·10억 = 25+개
- 1세대1주택·12억 비과세 케이스 별도

### D. DSR 대출한도 (`/calculator/loan-limit/연소득-{N}만원/`)
- 범위: 3,000만~1억 5,000만 = 13개

**총 80+개 자동 페이지** (Phase 3 첫 batch)

## 4. 기술 구현 (제안)

### 4-1. 데이터 소스
- `src/data/programmatic-pages/{series}.json` — 각 시리즈별 입력값 배열
- 빌드 시점 generateStaticParams 로 페이지 생성

### 4-2. 페이지 템플릿
```
src/app/calculator/salary/연봉-[amount]만원/page.tsx
  → generateStaticParams: ['연봉-2000만원', '연봉-2500만원', ...]
  → 각 페이지: 동일 템플릿 + 다른 데이터
```

### 4-3. SEO 메타 자동 생성
```ts
export async function generateMetadata({ params }): Promise<Metadata> {
  const data = getProgrammaticData('salary', params.amount);
  return {
    title: `${data.label} 실수령액 ${data.netMonth}만원 | calculatorhost`,
    description: `${data.label} 세후 월 ${data.netMonth}만원 ... ${data.tax4ins}만원 공제 후 ...`,
    alternates: { canonical: `https://calculatorhost.com/.../${params.amount}/` },
  };
}
```

### 4-4. 신호 차별화 (중복 콘텐츠 방지)
- title: 4티어 키워드 + 수치 (예: "연봉 5000 실수령액 350만원")
- description: 첫 문장에 결론 (LLM 인용 친화)
- H1: 동일 패턴, 데이터만 다름
- 본문 도입: 데이터별 고유 해설 (자동 템플릿 + 보간)
- FAQ: 시리즈 공통 3개 + 데이터별 1개

## 5. 위험 + 완화

| 위험 | 완화 |
|---|---|
| Thin content 판정 | 1500자 하한 + CI 게이트 (check-guide-quality 확장) |
| 중복 콘텐츠 | 메타 자동 검증 스크립트 + Lighthouse `duplicate-id` |
| Google Manual Action | AI 생성 명시 + 가치 제공 ("입력 없이 즉시 결과") |
| 색인 폭주 → 크롤 예산 소진 | sitemap priority 조정 + 점진 발행 (월 20개) |
| AdSense 정책 위반 | Above-the-fold 광고 0~1 + content_ratio 60%+ 자동 검증 |

## 6. 측정 지표

- **6주 내**: 색인 +50개 (`/calculator/salary/연봉-*` 시리즈)
- **3개월**: 4티어 롱테일 진입 30+ 키워드
- **6개월**: 자연 트래픽 +50% (현재 추정 < 100/일 → 150+/일)

## 7. 단계적 실행 (운영자 승인 시)

1. **Week 1**: 시리즈 A (연봉 실수령액) 5개 시범 발행 → GSC 추이 관찰
2. **Week 2~3**: A 효과 OK 확인 시 27개 전체 발행
3. **Week 4**: B (취득세 면적/가격 매트릭스) 15개
4. **Week 5~6**: C (양도소득세) 25개 + D (대출한도) 13개

각 batch 발행 전: §N audit · sitemap 검증 · seo-regression E2E 통과 필수.

## 8. 운영자 결정 필요 사항

- [ ] AI 자동 콘텐츠 디스클로저 문구 확정
- [ ] 시리즈 A부터 시범 5개 발행 승인
- [ ] AdSense 정책 위반 사전 검토 (adsense-guardian 재호출)
- [ ] 색인 폭주 시 sitemap priority 정책

## 9. 관련 문서
- `.claude/STATE.md` (운영 상태)
- `docs/seo-keyword-map.md` (4티어 롱테일 패턴)
- `.claude/skills/google-seo-reference/REFERENCE.md` (SEO 가이드)
- `.claude/rules/yoro-tdd.md` (TDD 룰 — 자동 페이지도 동일 적용)
