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
> 마지막 자동 점검: 2026. 05. 11. 13:56 (Asia/Seoul)

- 도메인: https://calculatorhost.com
- 사이트 라이브: ✅ HTTP 200
- 호스팅: cloudflare (Cloudflare Pages 추정)
- AdSense 게시자: ✅ pub-7830821732287404
<!-- /AUTO:infra -->

---

## 3. 수익화 (자동 + 수동 혼합)

### 자동 영역 — ads.txt 게시자 ID 등
<!-- AUTO:adsense -->
> 마지막 자동 점검: 2026. 05. 11. 13:56 (Asia/Seoul)

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
> 마지막 자동 점검: 2026. 05. 11. 13:56 (Asia/Seoul)

- ✅ active: auto-guide-cron (.github/workflows/auto-guide-cron.yml)
- ✅ active: Auto Guide Quality Gate (.github/workflows/auto-guide-quality.yml)
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
- ❓ Google Search Console (운영자 확인)
- ❓ Naver Search Advisor (운영자 확인)
- ✅ Kakao Developers (env에 JS 키 등록)
- ❓ data.go.kr 활용신청 (RTMS, JUSO 등 — 운영자 확인)
- ❓ Anthropic Console (Auto Guide Phase 2)

---

## 7. 현재 캠페인·집중 영역 (운영자 수동)

> 운영자가 매주·격주로 갱신. 에이전트 호출 시 이 섹션을 읽어 우선순위 판단.

### 진행 중
- (예: "GSC CTR 0.3% → 2% 개선 — TOP 5 페이지 메타 강화 #15 머지 후 4주 추적")
- (예: "시즈널 가이드 7~12월 6편 추가 발행")

### 다음 후보
- tax SSoT ↔ 본문 % 자동 대조 스크립트 (calc-logic-verifier + content-writer 합의)
- ECOS·EXIM·FSS·KOSIS 클라이언트 실제 사용 확장
- web-vitals INP/CLS Field 측정 GA4 통합
- pre-existing tests/unit/scripts/ 3건 vitest transform fail 디버깅

### 보류 / 차단
- (예: "AdSense 신규 광고 단위 추가 — 정책 검토 필요")

---

## 8. 알려진 이슈·후속 항목

- pre-existing `tests/unit/scripts/` 3건 vitest transform fail (Windows + .mjs import) — CI는 `continue-on-error` 무시 중
- stuck.md 두 번째 stale 섹션 (2026-05-06 `developers.google.com`) — `replaceAll` 강화 검토
- 정부 사이트 9개 N/A timeout (한국 외 IP) — IGNORE_DOMAINS 추가 또는 timeout 조정 검토

---

## 9. 갱신 정책

- **자동 영역**: prebuild hook + `npm run state` 수동 + (선택) GitHub Actions cron 매일 03:30 KST
- **수동 영역**: 운영자가 큰 변화 시점에 즉시 갱신 (새 환경변수, AdSense 슬롯, 캠페인 시작/종료, 외부 서비스 가입)
- **에이전트 호출 시**: 반드시 이 파일을 가장 먼저 읽음 (CLAUDE.md import 강제)
