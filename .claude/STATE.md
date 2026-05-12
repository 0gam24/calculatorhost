# 운영 상태 (Single Source of Truth)

> **목적**: 모든 에이전트가 작업 시작 시 가장 먼저 읽는 운영 현황. 자동·수동 갱신 혼합.
> **자동 갱신**: `npm run state` 또는 prebuild hook에서 `<!-- AUTO:* -->` 영역만 갱신.
> **수동 갱신**: 운영자가 직접 편집. 마커 밖 영역은 절대 자동 변경되지 않음.

---

## 1. 모드 (Operating Mode)

**현재 모드**: ✅ **운영 중 (live ops)**

- BMAD 7단계 완료. "발사 전 준비" 모드 아님.
- 사이트는 라이브, AdSense 운영 중, 환경변수 등록 완료, DNS 스위치 완료.
- 작업 관점: 신규 기능 추가 / 콘텐츠 확장 / SEO·수익 모니터링 / 회귀 방지.

---

## 2. 인프라 (자동 갱신)

<!-- AUTO:infra -->
> 마지막 자동 점검: 2026. 05. 12. 14:42 (Asia/Seoul)

- 도메인: https://calculatorhost.com
- 사이트 라이브: ✅ HTTP 200
- 호스팅: cloudflare (Cloudflare Pages 추정)
- AdSense 게시자: ✅ pub-7830821732287404
<!-- /AUTO:infra -->

---

## 3. 수익화 (자동 + 수동 혼합)

### 자동 영역 — ads.txt 게시자 ID 등
<!-- AUTO:adsense -->
> 마지막 자동 점검: 2026. 05. 12. 14:42 (Asia/Seoul)

- public/ads.txt 게시자 ID: pub-7830821732287404
- AdSense 운영 상태: ✅ 라이브 (ads.txt 배포됨)
<!-- /AUTO:adsense -->

### 운영자 수동 영역
- **AdSense 슬롯 5종 등록 여부**: ✅ Cloudflare 환경변수 등록 완료 (2026-05-11 운영자 확인)
- **첫 광고 노출일**: (운영자 입력)
- **첫 수익**: (운영자 입력)
- **월별 eCPM 추이**: (운영자 입력 또는 별도 대시보드 링크)

---

## 4. 환경변수 (Cloudflare Pages, 이름만)

> 값은 절대 기록 금지. 등록 여부만 추적.

### 운영자 수동 갱신 — 마지막 확인 2026-05-11
- ✅ `ECOS_API_KEY`
- ✅ `EXIM_FX_API_KEY`
- ✅ `FSS_FINLIFE_API_KEY`
- ✅ `KOSIS_API_KEY`
- ✅ `NEXT_PUBLIC_ADSENSE_CLIENT`
- ✅ `NEXT_PUBLIC_ADSENSE_SLOT_*` (Cloudflare 대시보드 확인)
- ✅ `NEXT_PUBLIC_GA_ID`
- ✅ `NEXT_PUBLIC_KAKAO_JS_KEY`
- ✅ `SITE_URL`
- ❓ `PUBLIC_DATA_KEY` (RTMS·JUSO — 등록 여부 운영자 확인)
- ❓ `JUSO_API_KEY` (별도 — 미설정 시 `PUBLIC_DATA_KEY` 사용)
- ❓ `ANTHROPIC_API_KEY` (Auto Guide Phase 2 cron용 — GitHub Secrets)

---

## 5. GitHub Actions (자동 갱신)

<!-- AUTO:workflows -->
> 마지막 자동 점검: 2026. 05. 12. 14:42 (Asia/Seoul)

- ✅ active: auto-guide-cron (.github/workflows/auto-guide-cron.yml)
- ✅ active: Auto Guide Quality Gate (.github/workflows/auto-guide-quality.yml)
- ✅ active: .github/workflows/indexnow-ping.yml (.github/workflows/indexnow-ping.yml)
- ✅ active: Lighthouse CI (.github/workflows/lighthouse.yml)
- ✅ active: ralph-daily (.github/workflows/ralph-daily-recommendation.yml)
- ✅ active: .github/workflows/ralph-daily.yml (.github/workflows/ralph-daily.yml)
- ✅ active: Sync Public Data (.github/workflows/sync-public-data.yml)
- ✅ active: today-update (.github/workflows/today-update.yml)
<!-- /AUTO:workflows -->

### 운영자 수동 갱신
- **`AUTO_GUIDE_ENABLED` repo variable**: (운영자 확인) — 미설정 시 자동 가이드 cron 비활성

---

## 6. 가입·연동 외부 서비스 (운영자 수동)

- ✅ Google AdSense (pub-7830821732287404)
- ✅ Google Analytics 4 (env에 `NEXT_PUBLIC_GA_ID` 등록됨)
- ✅ Google Search Console (운영자 확인)
- ✅ Naver Search Advisor (운영자 확인)
- ✅ Kakao Developers (env에 JS 키 등록)
- ❓ data.go.kr 활용신청 (RTMS, JUSO 등 — 운영자 확인)
- ❓ Anthropic Console (Auto Guide Phase 2)

---

## 7. 현재 캠페인·집중 영역 (운영자 수동)

> 운영자가 매주·격주로 갱신. 에이전트 호출 시 이 섹션을 읽어 우선순위 판단.

### 진행 중 (2026-05-12 ~ 06-09, 4주 GSC 효과 모니터링)
- **오늘 11 PR 누적 효과 측정** — 색인 40 → ?, GSC CTR/노출, AdSense RPM
  · IndexNow workflow + sitemap 검증 + indexing-guard E2E + §N 12페이지 보강
  · 공공 데이터 인용 5페이지 + AVIF 4종 + dateModified manifest + jsonld helper
- **운영자 수동 액션 (병행)**:
  · GSC URL Inspection → Request Indexing 미색인 상위 10개 (월 200건 한도)
  · Bing IndexNow 키 발급 → GitHub Secrets `INDEXNOW_KEY` → workflow 활성화
  · GSC Page Index 9가지 미색인 이유 캡처 → seo-auditor 정확 진단

### 다음 후보 (4주 효과 측정 후 우선순위 재결정)
- 시즈널 가이드 7~12월 6편 발행 (content-writer 위임, 신규 색인 +6)
- AvifImage 페이지별 적용 (히어로 이미지 사용처 검토)
- Programmatic SEO 시범 5개 발행 (ADR-010, 운영자 승인 후)
- INP Field GA4 → Looker Studio (운영자 외부 도구)
- LinkedIn + Wikidata entity (Knowledge Graph)
- 백링크 Outreach (정부·언론·블로그)

### 보류 / 차단
- pre-existing tests/unit/scripts/ 3건 vitest transform fail (Windows + .mjs import) — CI 무영향
- Programmatic SEO 본격 발행 — ADR-010 운영자 승인 필요

---

## 8. 알려진 이슈·후속 항목

- pre-existing `tests/unit/scripts/` 3건 vitest transform fail (Windows + .mjs import) — CI는 `continue-on-error` 무시 중
- stuck.md 두 번째 stale 섹션 (2026-05-06 `developers.google.com`) — `replaceAll` 강화 검토
- 정부 사이트 9개 N/A timeout (한국 외 IP) — IGNORE_DOMAINS 추가 또는 timeout 조정 검토

### §N 법조항 인용 audit 추이 (2026-05-12 최종, `npm run citations:audit`)
**52개 페이지 中**: ✅ strong(3+) 45 / 🟡 minimal(1~2) 0 / 🔴 missing(0) 7

**오늘 11 PR 누적 추이**:
- 초기:    strong 33 / minimal 4 / missing 15
- Phase 1: strong 37 / minimal 4 / missing 11 (4페이지 보강)
- Phase 2: strong 41 / minimal 0 / missing 11 (minimal → strong)
- Phase 3: strong 44 / minimal 0 / missing  8 (가이드 3 추가)
- 최종:    strong 45 / minimal 0 / missing  7 (/guide/ 인덱스 추가)

**남은 missing 7 (모두 비-YMYL — 면책으로 충분)**:
- `/calculator/{averaging-down,bmi,d-day,exchange,inflation,split-buy,split-sell}/`

→ **YMYL 카테고리 페이지의 §N 인용 100% 완성**.

### FAQ 차별화 적용 현황 (2026-05-12)
- ✅ salary 7개 답변 강화 (4517985, 길이·정확도 보강)
- ✅ capital-gains-tax 양도세 기본공제 250만 원 FAQ 신규 추가 (4517985)
- ✅ acquisition-tax 4티어 2개 추가 완료 (이전 PR3a)

### 공공 데이터 본문 인용 적용 현황 (Phase 2, 5페이지)
- ✅ /calculator/loan/ — 한국은행 ECOS 기준금리
- ✅ /calculator/savings/ — 금감원 12개월 적금 평균금리
- ✅ /calculator/deposit/ — 금감원 12개월 정기예금 평균금리
- ✅ /calculator/salary/ — KOSIS 가구 월평균 소득
- ✅ /calculator/freelancer-tax/ — KOSIS 가구 소득

### Phase 3 인프라 완료 (2026-05-12)
- ✅ AvifImage `<picture>` 래퍼 컴포넌트 (사용처 적용은 향후 페이지 추가 시)
- ✅ AVIF 이미지 변환 4종 (-56~-89%)
- ✅ PWA manifest AVIF 6 entries
- ✅ Programmatic SEO 설계 ADR-010 (운영자 승인 대기)

---

## 9. 갱신 정책

- **자동 영역**: prebuild hook + `npm run state` 수동 + (선택) GitHub Actions cron 매일 03:30 KST
- **수동 영역**: 운영자가 큰 변화 시점에 즉시 갱신 (새 환경변수, AdSense 슬롯, 캠페인 시작/종료, 외부 서비스 가입)
- **에이전트 호출 시**: 반드시 이 파일을 가장 먼저 읽음 (CLAUDE.md import 강제)
