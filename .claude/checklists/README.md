# UI/UX 검수 체크리스트 모음

> **마지막 갱신**: 2026-05-14
> **4편 가이드 + 40편 기존 사례 기반 정리**

---

## 📋 문서 구성

### 1. **guide-ui-ux-checklist.md** (메인 체크리스트)
**목적**: 새 가이드 발행 시 완벽한 UI/UX 검수 명단
**분량**: ~500줄, 14섹션 (A~N)
**사용**: 신규 가이드 작성 후 **발행 전 최종 검수**

**섹션 구성**:
- A. 레이아웃 (mx-auto max-w-3xl, space-y-8)
- B. 헤더 (Breadcrumb, H1, 리드)
- C. 광고 (AD-1, AD-2, props)
- D. 본문 (H2, bg-bg-card 박스)
- E. FAQ (FaqSection 컴포넌트, 중간 배치)
- F. 메타 & JSON-LD (4종)
- G. 링크 (외부 권위 2~3개)
- H. 반응형 (모바일/md/lg)
- I. 접근성 (WCAG 2.2 AA)
- J. 동작 (FAQ 접힘)
- K. 테마 (다크/라이트)
- L. 성능 (next/image, CLS)
- M. 코드 (TypeScript, ESLint)
- N. 최종 (스크린샷, Lighthouse)
- 재사용 프롬프트 하네스 (copy-paste ready)

---

### 2. **guide-ui-quick-check.txt** (1분 내 검수용)
**목적**: 바쁜 상황에서 핵심 항목만 빠르게 검증
**분량**: ~100줄, 체크박스 형식
**사용**: 빠른 발행 전 "OK" 레벨 검수

**섹션**:
- 구조 (REQUIRED)
- 광고 (REQUIRED)
- 본문 (REQUIRED)
- FAQ (REQUIRED)
- 메타 & SEO (REQUIRED)
- 반응형 (REQUIRED)
- 접근성 (REQUIRED)
- 성능 (REQUIRED)
- 코드 (REQUIRED)
- 최종 (PRE-PUBLISH)

---

### 3. **guide-ui-pitfalls.md** (흔한 실수 카탈로그)
**목적**: 이미 일어난 버그 패턴을 사전에 방지
**분량**: ~400줄, 9개 섹션 (분석 + 해결책)
**사용**: 작성 중간에 "이렇게 하면 안 되는 이유"를 확인

**섹션**:
1. 레이아웃 오류 (max-w, space-y)
2. 광고 슬롯 오류 (slot, format, props, 다크 배경, 과다 배치)
3. 본문 스타일 오류 (하드코딩, 인라인 스타일, 이미지)
4. FAQ 섹션 오류 (수동 렌더링, 하단 배치, 첫 문장)
5. 메타데이터 오류 (title 템플릿, JSON-LD 누락)
6. 반응형 오류 (고정 px-8, 테이블 미처리)
7. 접근성 오류 (heading 계층, 색만으로 전달)
8. 성능 오류 (다중 이미지, 우선순위)
9. 코드 품질 오류 (날짜 형식, any 타입)

각 항목: ❌ WRONG + ✅ CORRECT + **이유** 설명

---

### 4. **guide-component-templates.md** (코드 스니펫 모음)
**목적**: 반복되는 코드를 복사하기만 해서 사용
**분량**: ~300줄, 8개 섹션 (copy-paste ready)
**사용**: 신규 가이드 작성 시 각 섹션별로 붙여넣기

**섹션**:
- A. 페이지 프레임 (메타 + JSON-LD + 전체 구조) ← 가장 중요
- B. 섹션 템플릿 (기본/강조/경고)
- C. 테이블 템플릿 (비교표, 세율표)
- D. 리스트 템플릿 (bullet, numbered)
- E. 사례/시뮬레이션 섹션
- F. 외부 링크 (E-E-A-T)
- G. 인용/강조 박스
- H. 완전한 최소 가이드 구조

**특징**:
- `{CUSTOMISE: ...}` 표시로 교체 필요 부분 명확
- 실제 동작하는 코드 (copy-paste 후 텍스트만 교체)
- TypeScript strict, ESLint 통과

---

## 🎯 사용 흐름

### 신규 가이드 발행 프로세스

```
1️⃣ 컨텐츠 작성
   └─ guide-component-templates.md 에서 A. 페이지 프레임 복사
   └─ {CUSTOMISE} 부분 교체
   └─ 필요한 섹션(B~G) 삽입

2️⃣ 코딩 검수
   └─ npm run lint 통과
   └─ npm run typecheck 통과
   └─ npm test 통과

3️⃣ UI 검수 (작성 중간 & 완료 시)
   └─ guide-ui-pitfalls.md 에서 해당 섹션 확인 (실수 방지)
   └─ guide-ui-quick-check.txt 로 1분 내 검증

4️⃣ 최종 검수 (발행 직전)
   └─ guide-ui-ux-checklist.md 전체 14섹션(A~N) 완주
   └─ 스크린샷 (데스크톱 + 모바일)
   └─ 다크/라이트 토글 확인
   └─ Lighthouse 점수 ≥90 (Performance)
   └─ 외부 링크 3개 HTTP 200 확인

5️⃣ 발행
   └─ git commit + PR 생성
   └─ 운영자 최종 승인
   └─ publish
```

---

## 📊 체크리스트 맵 (어떤 상황에 어느 문서?)

| 상황 | 문서 | 섹션 |
|---|---|---|
| **신규 가이드 작성** | templates.md | A. 페이지 프레임 복사 |
| **코딩 중 "이거 맞나?"** | pitfalls.md | 해당 카테고리 (1~9) |
| **빠른 발행 전 체크** | quick-check.txt | 전체 체크박스 (1분) |
| **완벽한 최종 검수** | ux-checklist.md | 전체 14섹션 (15분) |
| **특정 섹션 코드 필요** | templates.md | B~H (복사) |
| **왜 이렇게 하는가?** | ux-checklist.md | 각 섹션 설명 |

---

## 🔑 핵심 규칙 (모든 가이드 필수)

### 🚫 금지 (이 패턴은 절대 X)
```
❌ <img> 직접 사용
❌ <table> 없이 이미지로 표 표현
❌ 하드코딩 색상 (#595FF7, #FC354D 등)
❌ 인라인 스타일 style={{...}}
❌ max-w-full 또는 max-w 미설정
❌ space-y-4 또는 space-y-6 섞음
❌ FAQ를 하단(마지막)에만 배치
❌ AdSlot props: slotId / billboard / format="ad-unit"
❌ JSON-LD 구체화 데이터 4종 누락
❌ 광고 영역 다크 배경
❌ FAQ 첫 문장이 답이 아님
❌ 날짜 형식 "2026년 5월 14일"
```

### ✅ 필수 (이것은 모든 가이드에 있어야)
```
✅ <article className="mx-auto max-w-3xl space-y-8">
✅ Breadcrumb 컴포넌트
✅ <h1> + 리드 문단 (data-speakable)
✅ <AdSlot slot="guide-{name}-top" format="horizontal" />
✅ <AdSlot slot="guide-{name}-mid" format="rectangle" />
✅ 모든 섹션에 <section aria-label="...">
✅ 모든 H2에 <h2 className="mb-4 text-2xl font-semibold">
✅ 강조 박스는 <div className="rounded-lg bg-bg-card p-4">
✅ <FaqSection items={[...FAQ_ITEMS]} /> (컴포넌트)
✅ 테이블은 <table>, 이미지는 next/image
✅ 외부 권위 링크 2~3개 (rel=nofollow)
✅ 4종 JSON-LD (breadcrumb/article/webpage/faq)
✅ 다크/라이트 양쪽 가독성 확인
✅ Heading 계층: H1 → H2 순차 (건너뛰기 X)
```

---

## 📈 품질 지표 (PASS 기준)

| 지표 | 기준 | 확인 방법 |
|---|---|---|
| **타이포** | 0개 | npm run lint |
| **TypeScript** | strict | npm run typecheck |
| **성능** | Performance ≥90 | Lighthouse (모바일) |
| **접근성** | Accessibility ≥95 | Lighthouse |
| **색 대비** | 4.5:1 | 다크/라이트 시각 확인 |
| **반응형** | 모바일+데스크톱 | 스크린샷 |
| **JSON-LD** | 4종 | 페이지 소스 ctrl+f |
| **FAQ** | 5-8개, 중간 배치 | 스크롤 확인 |
| **광고** | ≤4개 | 슬롯 수 카운트 |
| **SEO** | title 60자, description 80-155자 | Google 서식 확인 |

---

## 🚀 빠른 시작 (지금 바로)

### 신규 가이드 작성할 때
```bash
# 1. guide-component-templates.md A 섹션 복사
# 2. src/app/guide/{slug}/page.tsx 생성
# 3. 메타 + 본문 + FAQ 채우기
# 4. npm run lint && npm run typecheck
# 5. guide-ui-quick-check.txt 로 1분 검수
# 6. 발행
```

### 기존 가이드 개선할 때
```bash
# 1. guide-ui-pitfalls.md 에서 해당 오류 찾기
# 2. ✅ CORRECT 예시 복사
# 3. 수정 + npm run lint
# 4. 재배포
```

---

## 📞 에이전트 역할

- **frontend-builder** — templates.md 기반 신규 컴포넌트 개발, pitfalls 패턴 방지
- **seo-auditor** — ux-checklist.md F. 메타 & SEO, 외부 링크 검수
- **content-writer** — templates.md B~E 섹션 콘텐츠 작성
- **test-runner** — 최종 Lighthouse, E2E 라우팅 테스트

---

## 📝 갱신 정책

- **빈출 새로운 버그 발견** → pitfalls.md에 즉시 추가
- **컴포넌트 스타일 변경** → templates.md A 업데이트
- **규칙 변경** → ux-checklist.md + quick-check.txt 동기화
- **분기 1회** → 40편 가이드 무작위 샘플 감사 (규칙 위반 여부)

---

## 관련 문서 링크

- `.claude/rules/seo-content.md` — SEO 규칙 (메타, JSON-LD)
- `.claude/rules/calculators.md` — 계산기 페이지 규칙 (유사 구조)
- `docs/design-system.md` — 토큰 정의 (색, 간격, 타이포)
- `docs/seo-keyword-map.md` — 키워드 × 페이지 전략
- `.claude/skills/design-system-fintech/REFERENCE.md` — 컴포넌트 디테일

