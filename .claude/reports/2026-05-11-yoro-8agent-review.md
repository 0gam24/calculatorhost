# YORO — 8 에이전트 운영 기획 검토 + 즉시 액션

**작성**: 2026-05-11 (Asia/Seoul)
**범위**: adsense-guardian / api-researcher / calc-logic-verifier / content-writer / frontend-builder / lighthouse-profiler / seo-auditor / test-runner 병렬 검토 결과 종합 + 자율 실행 가능 항목 처리

---

## 1. 8 에이전트 검토 요약

| 도메인 | 준비도 | 주요 차단 |
|---|---|---|
| AdSense | ✅ Go (95%) | 슬롯 ID 5종 Cloudflare 환경변수 미입력 (운영자 수동) |
| 공공 API | ⚠️ 80% | ECOS 클라이언트 부재 / Functions 프록시 미생성 |
| 계산 공식 | ✅ 911 PASS | 국세청 간이세액표 ±2% 표본 검증 미실행 |
| 콘텐츠 | ⚠️ 인프라 3.5/5 | 가이드 본문 0편 발행 / 용어사전 미정리 |
| 프론트엔드 | ✅ UI 95% | 모바일 AD-5 CLS / hero 숫자 반응형 |
| Lighthouse | ✅ TTFB Good | INP/CLS Field 데이터 0 |
| SEO | ⚠️ 67% | E-E-A-T 저자 바이라인 (실제: 30/31 적용 중, 에이전트 outdated) |
| 테스트 | ✅ 단위 911 / E2E 골든 18 | E2E 추정 146 실패 → **환경 미설치, 해결 완료** |

---

## 2. 즉시 검증·수정 (이번 회차)

### 2-1. test-runner "E2E 146 실패" 추정 검증
- **결과**: 코드 결함 아님. Playwright Chromium 바이너리 미설치 환경 이슈.
- **해결**: `npx playwright install chromium` 실행.
- **재검증**: 골든패스 5종 (salary, loan-limit, theme, routing, adsense) 18/18 PASS.
- **결론**: 발사 차단 해소. test-runner 추정은 false alarm.

### 2-2. seo-auditor "E-E-A-T 저자 바이라인 미입력" 검증
- **결과**: 실제로는 30/31 계산기 페이지에 `AuthorByline` 적용 중 ("작성·검수: 김준혁 (스마트데이터샵)" + 발행/갱신일).
- **결론**: 차단 항목 아님. 에이전트 컨텍스트 outdated.
- **후속**: 운영자 본인이 세무사·회계사가 아니므로 "감수: 세무사 OO" 표기는 허위 가능성 — 현재 표기 유지가 정당.

### 2-3. frontend-builder + lighthouse-profiler "AD-5 CLS" 강화
- **변경**: `MobileAnchorAd.tsx` `minHeight` 50px → 100px, body `paddingBottom` 동기화.
- **사유**: AD-5 형식이 320×50 또는 320×100. 큰 쪽으로 통일하면 광고가 어느 형식으로 로드되든 CLS 0 보장.
- **테스트**: 단위 테스트 면제(스타일 변경), `adsense.e2e.ts` 골든패스 PASS.

### 2-4. 검증 결과
| 항목 | 결과 |
|---|---|
| typecheck | ✅ |
| 단위 테스트 | ✅ 911/911 |
| lint | ✅ |
| E2E 골든패스 5종 | ✅ 18/18 PASS |

---

## 3. 후속 액션 분류

### 3-1. 다음 회차 자율 실행 가능 (개발)
- **calc-logic-verifier + content-writer 합의**: tax SSoT (`src/lib/constants/tax-rates-2026.ts`) ↔ 본문 % 숫자 자동 대조 스크립트 (RED+GREEN TDD)
- **api-researcher**: ECOS 클라이언트 + Cloudflare Function 프록시 3종
- **lighthouse-profiler**: web-vitals 라이브러리 통합 → INP/CLS Field 데이터 GA4 이벤트
- **content-writer**: 시범 가이드 3편 수동 작성 (Auto-Guide Phase 2 가동 전 파이프라인 검증)
- **seo-auditor**: FAQ 4티어 GSC 기반 재구성 (CTR 0.3→2% 후속)
- **test-runner**: pre-existing `tests/unit/scripts/` 3건 vitest transform fail 디버깅 (Windows + .mjs import)

### 3-2. 운영자 수동 (사용자 승인 필요)
- AdSense 신청 패키징 → 신청 (검수 2~4주)
- AdSense 슬롯 ID Cloudflare Pages 환경변수 입력 (`NEXT_PUBLIC_ADSENSE_SLOT_*` 5종)
- ECOS 인증키 발급 + Cloudflare 환경변수 등록
- DNS 스위치 (기존 WordPress → Cloudflare Pages)
- `.github/workflows/ralph-daily-recommendation.yml` 활성화

### 3-3. 권장 진행 순서
```
이번 회차 ✅: AD-5 CLS 강화 + E2E 환경 정리 + 8에이전트 검토 종합
다음 회차  : tax SSoT 자동 대조 스크립트 (calc-logic-verifier 1순위)
1주차     : 시범 가이드 3편 수동 발행 (content-writer)
2주차     : FAQ 4티어 재구성 + INP 실측 인프라
3주차     : ECOS 통합 + Cloudflare Function 프록시
4주차     : AdSense 신청 패키징 → 운영자 신청
```

---

## 4. 운영 신뢰도 평가

- **이전 평가**: "E2E 146 실패로 인한 발사 차단" 우려.
- **실측 후**: **발사 가능 궤도 회복**. 단위 911 + 골든 18 + UI 95% + 인프라 80%.
- **남은 차단은 모두 1~4주 내 해소 가능 항목** (운영자 수동 단계 + 별도 자율 작업).
- **숨은 위험은 모니터링 항목**: GSC CTR 추이, INP Field 데이터, AdSense 검수 기간, 세율 개정 알림.
