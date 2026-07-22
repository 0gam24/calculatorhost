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

## 0. 북극성 — 모든 작업은 AdSense 수익 인과 사슬에 도달

> **상위 룰**: `.claude/rules/north-star-revenue.md` (모든 세션 자동 로드)

신규 포스트 작성 전 자기검수: **이 포스트가 어느 단계에 도달하는가?**
- 1단계 (색인 표면): sitemap 등록 + 내부 링크 mesh
- 2단계 (검색 노출): §N + 메타 + 구조화 데이터
- 3단계 (CTR): 의도 흡수 + 즉답 후크 + SERP 차별화
- 4단계 (RPM): 페이지뷰·체류·광고 슬롯

도달 못하면 작성 자체 보류. 가드레일은 수익 추구의 **제약**이지 우선순위 위가 아님.

## 1. 핵심 원칙 (절대 양보 X)

| 원칙 | 의미 | 위반 시 |
|---|---|---|
| **AI Overview 인용 유도** | LLM이 우리 페이지를 인용하도록 의도적 설계 | 자연 트래픽 0%, 제로 클릭 시대 생존 X |
| **법조항 §N 정확화** | 가짜 항번호 금지 (§59의2 ≠ §56) | YMYL 신뢰성 붕괴, AdSense 정책 위반 위험 |
| **누진공제 정확화** | 시뮬에 누진공제 빠뜨리지 않음 | 50% 이상 오차, 사용자 손해, 법적 리스크 |
| **AI 보조 표기** | 본문 면책조항에 "AI 보조 작성" 명시 | Google AI Content Policy 위반 |
| **CLS 0** | AdSlot/이미지 min-height 예약 필수 | CWV 회귀, 검색 순위 하락 |

---

## 1.5 주제·제목·본문 발굴 파이프라인 (2026-07-19 운영자 영구 지정)

> **목표**: 트래픽 상승. 로봇의 추론이 아니라 **실제 검색 수요**에서 주제·제목·소제목을 역산한다.
> **적용 범위**: 신규 포스트 전부 (클라우드 데일리 루틴 + 수동 발행 + content-writer 위임). §2 작성 체크리스트보다 **먼저** 실행.

### 1.5-1. STEP 1 — 최신 이슈·급상승 키워드 확인 (WebSearch 필수)
- [ ] WebSearch로 **지금** 뜨는 세금·금융·부동산·근로 이슈 확인 (정책 개정, 시행일, 이번 달 세무 일정, 뉴스성 이슈)
- [ ] 급상승·시즌 키워드 후보 **10~20개** 수집 (검색어 형태 그대로 기록)
- [ ] 추론·기억에만 의존 금지. 반드시 실제 검색 결과 기반.
- 산출: 후보 키워드 목록 + 각각의 근거(어떤 이슈/일정에서 나왔는지)

### 1.5-2. STEP 2 — 지식iN 질문에서 "의도 + 실제 키워드" 추출 (인용 금지, 추출 필수)
- [ ] STEP 1 키워드로 실제 질문 탐색: `site:kin.naver.com {키워드}` / `{키워드} 지식인` 등 WebSearch
- [ ] **반드시 추출할 2가지**:
  1. **독자 니즈** — 질문자가 진짜 막힌 지점 1문장 (예: "중도퇴사하면 연말정산을 회사가 해주는지, 내가 5월에 따로 하는지 모름")
  2. **실제 사용 표현 키워드 3~5개** — 질문자가 쓴 구어체·롱테일 그대로 (예: "퇴사하고 연말정산 안했어요", "중도퇴사 연말정산 5월")
- [ ] **금지**: 질문 원문·답변 복붙(저작권·중복 콘텐츠), 존재하지 않는 질문 창작(가짜 인용)
- [ ] 본문은 100% 자체 문장으로 작성. 지식iN은 **니즈·키워드 소스로만** 사용.
- [ ] **접근 차단 시 폴백**: 검색 결과 스니펫의 "함께 찾는 질문"·연관검색어로 대체하고, **차단 사실을 발행 보고에 명시**. 질문을 지어내지 말 것.
- 산출: 주제별 `독자 니즈 1문장` + `실제 표현 키워드 3~5개`

### 1.5-3. STEP 3 — 구글 연관 키워드를 H2 소제목으로 1:1 매칭
- [ ] 대상 키워드를 검색해 **연관검색어 + "함께 찾는 질문"(PAA)** 수집
- [ ] 수집한 질문·연관어를 **H2 소제목으로 그대로 매칭 배치** (5~8개) → 검색 의도를 페이지 하나로 통째 흡수
- [ ] §2-2 답변형 H2 규칙과 결합: PAA를 "Q. ~인가요?" 형태로 다듬고 **첫 문장 = 결론**
- [ ] STEP 2의 구어체 키워드는 H2·FAQ·본문에 자연 배치 (롱테일 포획)
- [ ] 제목(title)은 STEP 2의 **독자 니즈**에서 역산 (검색어 + 해결 약속)
- 산출: H2 뼈대 5~8개 = 글의 목차

### 1.5-4. STEP 4 — 구글·네이버 정책 적용 (트래픽 최우선)
- [ ] **구글**: `.claude/skills/google-seo-reference/REFERENCE.md` + 본 룰 §2-1~2-12 (Structured Summary, 답변형 H2, 시맨틱 테이블, data-speakable, E-E-A-T)
- [ ] **네이버**: 본 룰 §2-13 AI 브리핑 5축 (독자·목적 / 절차 / 대안·비교 / 사례·수치 / 이미지) — 한국 유입 62.9%
- [ ] **한국어 카피**: `.claude/skills/ko-seo-copywriting/REFERENCE.md`
- [ ] **키워드 맵**: `docs/seo-keyword-map.md` §9 GEO/AEO·§10 velocity
- [ ] **스타일**: §2-14 (긴 줄표 금지, 상투구 반복 금지)
- [ ] **전문성·디테일**: §N 법조항 1차출처 검증(§3), 계산 사례 단계별, 경계값 포함

### 1.5-5. 발행 보고에 선정 근거 1줄 의무
각 글마다: `급상승 키워드 → 추출한 독자 니즈 → H2로 쓴 PAA/연관어` 를 1줄로 남긴다. (다음 사이클 학습용 + 검색 데이터 없이 추론했는지 감사 가능)

---

## 2. 본문 작성 체크리스트 (content-writer 프롬프트 포함)

### 2-1. 리드 직후 Structured Summary (LLM 인용 유도)
- [ ] **정의 블록** (1문장, 30~50자): "X란 Y를 의미하는 Z입니다" 형식
- [ ] **핵심 수치 테이블** (HTML `<table>`, 3~5행): 이미지 X, 텍스트만
- [ ] **TL;DR 박스** (3~5줄, 불릿): 답변형 결론 선요약

### 2-2. 답변형 H2 의무화 (음성 검색 + AI Overview, 2026-05-26 강화)
- [ ] **본문 H2 중 답변형 ≥ 50%** ("Q. ~인가요?", "~란?", "왜 ~인가?" 형식)
- [ ] 첫 문장 = 결론·답변 (6~15자, 한 호흡)
- [ ] 근거/조건/예시는 2문장 이후
- [ ] **선언형 H2 ("절세 5가지", "원칙") → 답변형 또는 혼합** ("절세 — 어떻게? 5가지")
- 효과: AI Overview/PAA 답변 블록 인용률 +15~20%

### 2-3. AI Overview 미커버 엣지 케이스 의무 (Opportunity Voids, 2026-05-26 강화)
- [ ] 타깃 키워드 → Gemini/ChatGPT 실시간 검색 → AI 답변 확인 (5분)
- [ ] AI가 언급 안 한 예외/조건/함정 식별 → 본문에 명시
- [ ] **각 H2 섹션마다 "⚠️ 다만" 또는 "예외:" 문단 1개+** (각 섹션 말미)
- [ ] "그런데" / "다만" / "주의" 패턴으로 대비 구조화
- 효과: AI Overview 포괄성 +20%, 경쟁사 차별화

### 2-3-1. 섹션별 정의+핵심수치 TL;DR 박스 (2026-05-26 추가, AEO 스니펫)
- [ ] **각 H2 직후 정의 1문장 + 핵심 수치 1행** TL;DR 박스 (선택, 본문 2,500자+ 시 권장)
- [ ] 형식: `<div className="bg-bg-card p-3 rounded text-sm">정의: ... 핵심: ... (§N)</div>`
- 효과: 섹션별 독립적 추출 가능 → AEO 스니펫 노출 +12%

### 2-4. 법조항 §N 자연 배치
- [ ] H2~H3 각 섹션마다 §번호 최소 1회 (문장 흐름 속)
- [ ] 페이지 전체 공식 출처 링크 2~3개 (`rel="nofollow"`)
- [ ] 면책조항에 인용한 모든 §N 일괄 나열

### 2-5. 데이터는 HTML 테이블 (파싱 가능, 2026-05-26 시맨틱 강화)
- [ ] 세율표/요율표 → `<table>` HTML
- [ ] **`<caption>` 필수** — 테이블 제목 (스크린리더 + LLM 컨텍스트)
- [ ] **`<thead><tr><th scope="col">` 필수** — 헤더 셀 명시
- [ ] `<tbody>` 행별 구조화
- [ ] 이미지/캡처 금지 (LLM 추출 불가 → 인용 불가)
- 효과: LLM 테이블 구조화 추출 +30~40%, WCAG AA 접근성

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

### 2-11. data-speakable 첫 문장 원칙 (2026-05-26 추가, GEO 정확 인용)
- [ ] **각 단락 첫 문장(결론)만** `data-speakable` 부여 — 전체 단락 X
- [ ] 테이블·TL;DR 박스는 전체에 부여 (구조화 데이터)
- [ ] FAQ 답변 첫 문장에 부여 (이미 적용 중)
- 효과: LLM·음성검색 추출 정확도 +10%, 우리 결론만 인용

### 2-12. AdSlot이 speakable 영역 침입 금지 (2026-05-26 추가, GEO 보호)
- [ ] AD-1 top: 리드 문단(`data-speakable`) **종료 후** 배치 (사이에 빈 줄 1개+)
- [ ] AD-2 mid: H2 답변 첫 문장과 광고 사이 **최소 100px gap**
- [ ] AdSlot에 `aria-label="광고"` (LLM이 콘텐츠로 오인 차단)
- 효과: LLM이 광고를 답변으로 인용 0%, AdSense 정책 보호

### 2-13. 네이버 AI 브리핑 5축 (2026-06-10 추가, deep-research 검증)
> 근거: 네이버 공식 "콘텐츠 셀프체크 가이드" — AI 브리핑 인용 기준. ⚠️ "FAQ 구조가 인용에 유리"는 적대검증 기각(0-3) — FAQ는 구글 AEO용이지 네이버 인용 기준 아님. 상세: `.claude/reports/deep-research-2026-06-10-traffic-adsense.md`

- [ ] **독자와 목적** 명시 — 누구를 위한 글인지 리드에서 분명히
- [ ] **절차·구체적 해결 과정** — 단계별 how-to (신고 절차, 신청 방법)
- [ ] **대안·비교 분석** — A vs B 표/섹션 1개+ (예: 분리과세 vs 종합과세)
- [ ] **실제 적용 사례 + 구체적 수치** — 시뮬레이션 예시 (기존 §2-6와 동일, 네이버에도 유효)
- [ ] **맥락에 맞는 이미지·동영상** — 정보 도식 1개+ 권장 (현재 사이트 약점 — 텍스트 only 페이지 다수)
- 효과: 네이버 AI 브리핑(질의 20%+, 2026말 40% 목표) 인용 후보 진입. 한국 유입의 62.9%가 네이버 (InternetTrend 2025)

### 2-14. AI 말버릇 금지 (2026-07-10 운영자 영구 지시, AdSense 재승인 보호)
> 배경: 긴 줄표(em-dash)·반복 상투구는 "AI로 찍어낸 사이트" 인상을 주는 대표 신호. Google/AdSense 심사 관점 치명적. **기존 발행글은 불변**(제목 변경 = 재색인 혼란·순위 손실). 신규 글부터 적용.

- [ ] **긴 줄표("—" U+2014, "–" U+2013) 전면 금지** — 제목·본문·표·메타·GUIDES 인덱스 엔트리 모두. 대체: 쉼표(,) · 중점(·) · 콜론(:) · 물결(~) · 파이프(|, title 한정)
  - ❌ `교육비 세액공제 2026 — 자녀 300만`
  - ✅ `교육비 세액공제 2026, 자녀 300만 대학 900만`
  - 자동 게이트: `scripts/check-guide-quality.mjs` FORBIDDEN_PATTERNS 가 red 처리
- [ ] **반복 상투구 금지**: "핵심은 N가지입니다" / "정리하면" / "완벽 정리" 같은 도입·요약 말버릇을 여러 글에서 동일하게 반복하지 않음. 글마다 표현을 바꿔 자연스럽게.
- [ ] content-writer 위임 프롬프트에 본 §2-14 명시 (§2 일괄 인용 시 자동 포함)

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
- [ ] **메타 description 80~155자**: Google SERP 모바일 120자 권장. 네이버 사이트 간단 체크는 제목 40자·설명 80자 이내 권장 (H/06-01)
- [ ] **JSON-LD 유효성**: schema.org validator + 구글 리치결과 테스트 (ISO 8601 날짜)
  - **리치결과 유효 (계속 필수)**: Article(가이드) · BreadcrumbList · WebPage · SoftwareApplication(계산기) — 구글 search-gallery 지원 목록 + 네이버 08 지원 목록 기준
  - 🔴 **FAQPage — 구글 2026-06 리치결과 전면 폐지(공식 문서 삭제) + 네이버 구조화 데이터 미지원(H/08 전 문서에 부재)**. 기존·신규 모두 패널티는 없음(보이는 FaqSection과 1:1 일치 유지 조건). 리치결과를 근거로 한 설계 금지, 타 AI 엔진(비구글) 추출용 잔존 가치만
  - **HowTo — 구글 폐지** (Recipe 하위 요소로만 잔존). **Speakable — 구글 베타·뉴스 콘텐츠 한정**. 둘 다 넣어도 무해하나 SERP 효과 없음
  - 근거(2026-07-22 공식 가이드 동기화): `docs/references/G-구글-공식가이드/05-structured-data-구조화데이터/search-gallery.md` · `sd-policies.md`, `docs/references/H-네이버-공식가이드/08-구조화된 데이터 마크업/`
- [ ] **법조항 §N ≥ 3개**: `npm run citations:audit` strong 티어
- [ ] **canonical trailing slash**: `/guide/{slug}/` 형식 통일 (절대경로 — 네이버 H/04-01 요구)
- [ ] **`metadata.keywords` 5~10개** (2026-05-21 추가, 글로벌 layout keywords 상속 차단됨):
  - 토픽 핵심 키워드 + §N 법조항 번호 1개 + 페르소나·시즌 키워드 포함
  - 예: `['N잡러 종합소득세', '부업 종합소득세', '직장인 부수입 신고', '5월 종소세 신고', '소득세법 14조']`
  - articleLd.keywords와 동일 또는 더 풍부하게. ⚠️ 2026-07-22 확인: meta keywords는 **구글 미사용 명시(seo-starter-guide) + 네이버도 공식 권고 없음**(과거 "네이버 meta keywords 활용"은 목차 오기). SERP 신호 아님 — articleLd.keywords 동기화·LLM 추출용 관행으로만 유지

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
- [ ] Header / Sidebar / Footer 공통 컴포넌트만 사용

### 7-2. GuideHeader 컴포넌트 (신규 가이드 필수)
**신규 가이드는 반드시 `<GuideHeader>` 사용** (src/components/guide/GuideHeader.tsx)
- [ ] `breadcrumbItems`: 경로 배열
- [ ] `category`: "세금" / "금융" / "부동산" 등 (단일 문자열)
- [ ] `readingMinutes`: 읽기 소요 시간 (숫자)
- [ ] `publishedDate`: YYYY-MM-DD 형식
- [ ] `title`: H1 제목
- [ ] `subtitle`: 부제목 (선택, "— " 포함 호출자 책임)
- [ ] `lead`: 리드 문단 (`<p data-speakable>` 포함해서 전달)

**목적**: 시각 위계 강화 (breadcrumb 작음 → meta xs → title 4xl → subtitle xl → lead 보더)

### 7-3. 공통 컴포넌트 props
- [ ] `<FaqSection items={FAQ_ITEMS} />` (직접 list rendering 금지)
- [ ] `<ShareButtons title=... url=... description=... />`

### 7-4. JSON-LD helper props
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
