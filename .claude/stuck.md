# Stuck Items & Ralph Signals

> **Purpose**: YORO 작업 중 차단된 항목(stuck) 및 Ralph 자동화 신호 등재
> **Last updated**: 2026-05-06

## Link Health (2026년 05월 06일 14:32)

- **developers.google.com**: 4xx/5xx 응답 감지 (ralph-link-health 실행 권장)

**해결 방법**: 구글 공식 문서 대체 링크 또는 WayBack Machine 스냅샷 활용.

---

## Sync Health (2026년 05월 04일 00:00)

모든 API 정상. 마지막 동기화 2026-05-04.

---

## RALPH Phase P (외부 권위 링크 헬스 체크 + sync 헬스 알림)

### 발행 완료 (2026-05-06 기준)
✅ ralph-link-health.mjs — 외부 링크 HEAD 요청, 도메인별 상태 보고
✅ check-sync-health.mjs 갱신 — 30일+ 미동기 API 자동 stuck.md 기록
✅ package.json 스크립트 추가 — `npm run ralph:link-health`
✅ 첫 실행 결과 보고서 — `.claude/reports/link-health-2026-05-06.md`

### GitHub Actions 권고
⚠️  `.github/workflows/ralph-daily-recommendation.yml` — 구현 전 템플릿
- cron: 매일 03:00 KST (18:00 UTC)
- meta-audit + link-health + sync:health 순차
- 실패 시 자동 issue 생성 (선택)

### 실행 결과 요약
- 외부 도메인: 12개 감지
- 정상: 11개
- 실패: developers.google.com (403 Forbidden)

---

## RALPH Phase O (시즈널 가이드 자동화) — 이전

### 예상 실행 결과 (ralph:seasonal)
2026-05-06 현재 기준:
- 현재 월: 5월
- 다음 달: 6월 (초기 신호 예정)

### 발행 완료 (2026-05-03 기준)
✅ 1월 — january-vehicle-tax-prepayment (자동차세 연납)
✅ 2월 — february-tax-refund-tracking (연말정산 환급)
✅ 3월 — march-corporate-tax (법인세)
✅ 4월-1 — april-vat-preliminary-q1 (부가세)
✅ 4월-2 — april-comprehensive-property-tax-exclusion (종부세)
✅ 5월 — may-comprehensive-income-tax (종소세)
✅ 6월 — june-property-tax (재산세 1차)

### 미발행 (ralph:seasonal이 자동 신호 추가)
❌ 7월 — july-vat-and-tax-withholding (부가세+연말정산)
❌ 8월 — august-capital-gains-tax-review (양도세 절세)
❌ 9월 — september-property-tax-second (재산세 2차)
❌ 10월 — october-vat-q3-preliminary (부가세 3차)
❌ 11월 — november-year-end-tax-prep (연말정산 준비)
❌ 12월 — december-capital-gains-tax-deadline (양도세 마감)

---

## 실행 순서
1. **ralph 자동 실행** → stuck.md 이 섹션에 신호 append
2. **content-writer/운영자 다음 회차** → stuck.md의 차단 항목 해결
3. **해결 후** → stuck.md 해당 섹션 제거

---

## 주요 스크립트 & 설정
- **ralph-link-health.mjs** — 외부 링크 상태 모니터링 (매일 권장)
- **check-sync-health.mjs** (갱신) — API 동기화 알림 (prebuild 시)
- **ralph-daily-recommendation.yml** — GitHub Actions 템플릿 (구현 전)
- **진행**: YORO Phase P (Ralph C 대기 중)

---
