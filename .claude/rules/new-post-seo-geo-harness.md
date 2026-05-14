# 신규 포스트 SEO+GEO 고급화 하네스

> **Status**: 영구 룰. 새 가이드/콘텐츠 발행 전후 자동 로드.
> **Last updated**: 2026-05-13
> **출처**: 8 에이전트 합의 (seo-auditor / content-writer / adsense-guardian / lighthouse-profiler / api-researcher / frontend-builder / calc-logic-verifier / test-runner)

## 0. 어떻게 사용하나

### 신규 포스트 작성 흐름 (3단계)

1. **content-writer 호출 시 프롬프트에 포함**: 본 파일 §2~§5의 작성·계산 체크리스트
2. **PR 생성 직전 메인 스레드 자가검수**: §6~§9의 검수 체크리스트
3. **머지 직전 운영자 최종 게이트**: §10의 운영자 수동 항목

### 자동 로드
`.claude/rules/` 경로에 위치 → 모든 세션에서 자동 로드. 별도 import 불필요.

### 참조 문서 (필요 시 cat)
- `.claude/VERIFICATION_CHECKLIST.md` — 세목별 계산 검증 상세 (calc-logic-verifier 전용)
- `.claude/checklists/guide-component-templates.md` — page.tsx copy-paste 템플릿
- `.claude/checklists/guide-ui-pitfalls.md` — 흔한 UI 실수 카탈로그
- `.claude/skills/public-data-catalog/INGEST-CHECKLIST.md` — 공공 데이터 인용 매핑

---

## 1. 핵심 원칙 (절대 양보 X)

| 원칙 | 의미 | 위반 시 |
|---|---|---|
| **AI Overview 인용 유도** | LLM이 우리 페이지를 인용하도록 의도적 설계 | 자연 트래픽 0%, 제로 클릭 시대 생존 X |
| **법조항 §N 정확화** | 가짜 항번호 금지 (§59의2 ≠ §56) | YMYL 신뢰성 붕괴, AdSense 정책 위반 위험 |
| **누진공제 정확화** | 시뮬에 누진공제 빠뜨리지 않음 | 50% 이상 오차, 사용자 손해, 법적 리스크 |
| **AI 보조 표기** | 본문 면책조항에 "AI 보조 작성" 명시 | Google AI Content Policy 위반 |
| **CLS 0** | AdSlot/이미지 min-height 예약 필수 | CWV 회귀, 검색 순위 하락 |

---

## 2. 본문 작성 체크리스트 (content-writer 프롬프트 포함)

### 2-1. 리드 직후 Structured Summary (LLM 인용 유도)
- [ ] **정의 블록** (1문장, 30~50자): "X란 Y를 의미하는 Z입니다" 형식
- [ ] **핵심 수치 테이블** (HTML `<table>`, 3~5행): 이미지 X, 텍스트만
- [ ] **TL;DR 박스** (3~5줄, 불릿): 답변형 결론 선요약

### 2-2. 답변형 H2 1개 이상 (음성 검색 + AI Overview)
- [ ] H2를 "Q. ~인가요?" 또는 "~란 무엇인가?" 형식
- [ ] 첫 문장 = 결론·답변 (6~15자, 한 호흡)
- [ ] 근거/조건/예시는 2문장 이후

### 2-3. AI Overview 미커버 엣지 케이스 1개+ (Opportunity Voids)
- [ ] 타깃 키워드 → Gemini/ChatGPT 실시간 검색 → AI 답변 확인 (5분)
- [ ] AI가 언급 안 한 예외/조건/함정 식별 → 본문에 명시
- [ ] "그런데" / "다만" / "주의" 패턴으로 대비 구조화

### 2-4. 법조항 §N 자연 배치
- [ ] H2~H3 각 섹션마다 §번호 최소 1회 (문장 흐름 속)
- [ ] 페이지 전체 공식 출처 링크 2~3개 (`rel="nofollow"`)
- [ ] 면책조항에 인용한 모든 §N 일괄 나열

### 2-5. 데이터는 HTML 테이블 (파싱 가능)
- [ ] 세율표/요율표 → `<table>` HTML (`<thead>`, `<tbody>`, `<caption>`)
- [ ] 이미지/캡처 금지 (LLM 추출 불가 → 인용 불가)

### 2-6. 시뮬레이션 사례 구체적 수치
- [ ] "예: ~" 최소 2~3개 (가상 시나리오)
- [ ] 단계별 표시 (수치 단순 결론 X)
- [ ] 단위 명확 (만 / 억 / % 혼동 금지)

### 2-7. FAQ "첫 문장 = 결론" 원칙 엄격
- [ ] 답변 첫 문장이 완전한 명제 (주술 완정, 30자 이내)
- [ ] 첫 문장 이후 = 상세/조건/주의 (2~3문장)
- [ ] 각 FAQ 100~200자 엄수
- [ ] **FAQ 5개 균질 규칙 해제** — 2~8개 자연스럽게

### 2-8. 함정 섹션에서 "실질과세 원칙" 명시
- [ ] 각 함정마다 국세청 실제 판단 기준 인용
- [ ] "국세기본법 §14" / "소득세법 §101" 등 구체적 §

### 2-9. 면책조항 + AI 보조 표기
- [ ] `dateModified` 명시
- [ ] "AI 보조 작성 후 운영자 검수" 기재 (Google Policy)

### 2-10. 내부 cross-link 5~7개
- [ ] 같은 카테고리 2개 + 다른 카테고리 3~4개 분산
- [ ] 각 링크 한 줄 설명 (CTA 문구) — 단순 링크 X
- [ ] 같은 페르소나가 "다음 알고 싶을 것" 예측

---

## 3. 계산 시뮬 검증 (calc-logic-verifier 위임)

> **상세**: `.claude/VERIFICATION_CHECKLIST.md` 참조

### 3-1. 흔한 오차 5가지 (50x 오차 빈번)
| 오차 패턴 | 예시 | 검증 |
|---|---|---|
| **누진공제 누락** | 1.975억×38% = 7,505만 (X) → 1,994만 차감 = 5,511만 (O) | docs/data-model.md §2-1 누진세율 표 |
| **기본공제 미적용** | 양도차익에 250만 차감 누락 | 소득세법 §103 |
| **12억 한도 비례 오류** | 양도가 13억 전체 비과세 (X) → 초과분 1억만 비례 과세 (O) | 소득세법 §89 ① 3호 |
| **저가양수도 차감액 누락** | 차액 5억 전체 증여세 (X) → min(시가 30%, 3억) 차감 (O) | 상증법 §35 ① 1호 |
| **비사업용 토지 중과 잘못 적용** | 자경농지에 +10%p (X) → 사업용 분류로 중과 X (O) | 소득세법 §104의3 |

### 3-2. 경계값 테스트 필수
- [ ] 세율 구간 경계 ±1만 ~ ±1억 단위 시나리오 1개씩 (예: 양도가 11.99억 / 12억 / 12.01억)
- [ ] 1세대1주택 비과세·다주택 중과·일시적 2주택 경계

### 3-3. 법조항 근거 필수
- [ ] 세율값 옆에 법조항 §번호 (예: `// 소득세법 §55`)
- [ ] §의2, §의3 가짜 번호 금지 (소득세법 §97의2 vs §97의3 ← §97의3은 존재 안 함)

---

## 4. 메타데이터 + JSON-LD (seo-auditor 검수)

### 4-1. 자동화 가능 (CI 게이트)
- [ ] **메타 description 80~155자**: Google SERP 모바일 120자 권장
- [ ] **JSON-LD 5종 유효성**: schema.org validator (FAQPage 필수, Speakable 음성 태그, ISO 8601 날짜)
- [ ] **법조항 §N ≥ 3개**: `npm run citations:audit` strong 티어
- [ ] **canonical trailing slash**: `/guide/{slug}/` 형식 통일

### 4-2. 수동 검토 (메인 스레드 게이트)
- [ ] **AI Overview 답변 확인**: 우리가 미커버 엣지 케이스 식별 후 본문 추가
- [ ] **title 60자 + 브랜드명 위치**: "키워드-패턴-브랜드" 순 (예: "분양권 양도세 2026 | calculatorhost" 28자)
- [ ] **경쟁 SERP 1~10위 메타 비교**: 우리 description의 차별 포인트 확인
- [ ] **내부 cross-link 3~5개 배치**: docs/seo-keyword-map.md 참조

---

## 5. 공공 데이터 인용 매핑 (api-researcher 검수)

> **상세**: `.claude/skills/public-data-catalog/INGEST-CHECKLIST.md` 참조

### 5-1. 토픽 → API 매핑
| 가이드 토픽 | 권장 인용 | 헬퍼 |
|---|---|---|
| 양도세·취득세 | RTMS 인근 실거래가 평균 (PUBLIC_DATA_KEY 미확인) | `realestate.ts` (구현 완료, 페이지 미연동) |
| 대출·DSR·LTV | ECOS 기준금리 | `getEcosBaseRateCitation()` ✅ 사용 중 |
| 적금·예금 | FSS 평균금리 | `getFssDepositRateCitation()`, `getFssSavingsRateCitation()` ✅ |
| 연봉·프리랜서 | KOSIS 가구 월평균 소득 | `getKosisHouseholdIncomeCitation()` ✅ |
| 환율·송금 | EXIM 환율 | `getEximUsdRateCitation()` ✅ |
| 농지·임대 | KOSIS 농가소득 (헬퍼 미작성) | TODO 별도 PR |

### 5-2. 인용 형식
- [ ] `<PublicDataCitation>` 컴포넌트 사용 (정적 fallback 자동 처리)
- [ ] 출처 기관명 + 데이터 갱신 일자 명시
- [ ] Static fallback이 stale되지 않도록 분기별 갱신

---

## 6. 광고 슬롯 배치 (adsense-guardian 검수)

### 6-1. 슬롯 배치
- [ ] **AD-1 top (horizontal)**: 리드 직후, 첫 섹션 시작 전
- [ ] **AD-2 mid (rectangle)**: FAQ 직후 또는 본문 중앙
- [ ] **본문 2,500자↑ + 모바일 60%↑**: AD-3 (인피드 fluid) 추가 검토
- [ ] **페이지당 광고 ≤ 4개**: AdSense §5 정책

### 6-2. props 정확성 (TypeScript 타입 일치)
- [ ] `slot=` (NOT `slotId=`)
- [ ] `format=` 'horizontal'|'rectangle'|'vertical'|'fluid'|'anchor' (NOT 'billboard'|'rect'|'infeed')
- [ ] 슬롯 ID 패턴: `guide-{slug}-{position}` (예: `guide-burden-gift-top`)

### 6-3. CLS 방지
- [ ] AdSlot 컴포넌트 사용 (min-height 자동 예약)
- [ ] 라이트 배경 강제 (`#FFFFFF`, 다크 모드에서도)
- [ ] aria-label="광고" 자동 적용

---

## 7. UI/레이아웃 (frontend-builder 검수)

> **상세**: `.claude/checklists/guide-ui-ux-checklist.md`, `guide-ui-pitfalls.md`, `guide-component-templates.md`

### 7-1. 레이아웃 일관성
- [ ] `mx-auto max-w-3xl space-y-8` 일관 사용 (가이드 페이지)
- [ ] `data-speakable` 속성을 핵심 답변 문단·테이블에 부여
- [ ] Header / Sidebar / Footer / Breadcrumb 공통 컴포넌트만 사용

### 7-2. 공통 컴포넌트 props
- [ ] `<FaqSection items={FAQ_ITEMS} />` (직접 list rendering 금지)
- [ ] `<ShareButtons title=... url=... description=... />`
- [ ] `<Breadcrumb items={[{name, href}, ...]} />`

### 7-3. JSON-LD helper props
- [ ] `buildWebPageJsonLd({ name: ..., ... })` (NOT `title:`)
- [ ] `buildArticleJsonLd({ headline: ..., authorName: ..., authorUrl: ... })`
- [ ] `buildBreadcrumbJsonLd([{ name, url }, ...])` (마지막 항목 url 생략)

---

## 8. 성능 (lighthouse-profiler 검수)

### 8-1. 자동화 (Lighthouse CI 게이트)
- [ ] LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms 어설션 통과
- [ ] 신규 가이드 1편 샘플 `.lighthouserc.json` 추가 (분기별)

### 8-2. 수동 검토
- [ ] 본문 800줄 초과 시 dynamic import 분리 검토
- [ ] 히어로 이미지 사용 시 AVIF + `priority` + `aspect-ratio`
- [ ] JSON-LD 5개 인라인 → 단일 통합 (선택, 측정 후 결정)

---

## 9. 회귀 테스트 (test-runner 검수)

### 9-1. 자동 (CI 게이트)
- [ ] `npm test` 단위 테스트 944+ PASS
- [ ] indexing-guard E2E (canonical / JSON-LD / sitemap 등록)
- [ ] Lighthouse CI 어설션
- [ ] `npm run typecheck` + `npm run lint`

### 9-2. 수동 (발행 전)
- [ ] `npm run build` 후 로컬 구동 확인
- [ ] 새 슬러그 직접 접속 → 페이지 렌더, OG 이미지, 메타 확인
- [ ] 다크/라이트 토글 + 광고 슬롯 배경 `#FFFFFF` 유지
- [ ] 내부 링크 dead link 없음 (`npm run links:check`)

### 9-3. 신규 계산기 추가 시만
- [ ] E2E 골든패스 추가: `tests/e2e/{slug}.e2e.ts`
- [ ] 시각 회귀 (월 사용량 높음): `tests/visual/{slug}.visual.ts`

---

## 10. 운영자 수동 (외부 시스템·승인)

### 10-1. 발행 후 30분
- [ ] GSC URL Inspection → Indexing Request (필요 시)
- [ ] AdSense 대시보드 알림 확인 (정책 위반 0)

### 10-2. 발행 후 4주 모니터링
- [ ] Search Console CRUx 데이터 (Field CWV, 3주 후 공개)
- [ ] AdSense eCPM ±10% 안정성
- [ ] GSC 색인 진행률 + 노출/CTR 추이

---

## 11. 워크플로우 통합 (실전 적용)

### 11-1. 새 가이드 작성 1회 사이클 (~3시간)
```
1. content-writer 호출 (프롬프트에 §2 포함)
   → 초안 페이지 생성
2. 메인 스레드 자가검수 (§3 시뮬 / §4 메타 / §6 AdSlot props)
   → 오류 교정
3. calc-logic-verifier 호출 (시뮬 포함 시)
   → §3 검증 PASS 확인
4. CI 자동 게이트 (§4-1, §8-1, §9-1)
   → 통과 후 PR
5. PR 머지 + git push
6. 운영자 §10 수동 액션 (30분 + 4주)
```

### 11-2. content-writer 프롬프트 템플릿
```
**작업**: src/app/guide/{slug}/page.tsx 신규 가이드 작성
**컨텍스트**: STATE.md 라이브 운영 중
**필수 준수**: .claude/rules/new-post-seo-geo-harness.md §2 (작성 체크리스트)
  + §3 (시뮬 검증) + §4 (메타) + §6 (AdSlot props) + §7 (UI props)
**§N 법조항**: docs/data-model.md SSoT 우선
**산출**: 페이지 전체 코드 (TSX). sitemap·index 등록은 메인 스레드 처리.
```

### 11-3. 메인 스레드 PR 직전 검수 명령
```bash
npm run typecheck && npm run lint && npm test -- --run \
  && node scripts/sitemap-completeness.mjs \
  && npm run citations:audit
```

---

## 12. 변경 이력
- 2026-05-13: 초판 (8 에이전트 합의 통합) — content-writer §2, calc-logic-verifier §3, seo-auditor §4, api-researcher §5, adsense-guardian §6, frontend-builder §7, lighthouse-profiler §8, test-runner §9
