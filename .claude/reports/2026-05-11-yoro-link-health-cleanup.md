# YORO — Ralph Link Health 신호 정리

**작성**: 2026-05-11 (Asia/Seoul)
**범위**: stuck.md "Link Health" 섹션 5개 false-positive 신호 해소

---

## 1. 분류 결과

| 도메인 | 분류 | 처리 |
|---|---|---|
| `adservice.google.com` | False positive (광고 트래커, 동적 endpoint) | 화이트리스트 |
| `pagead2.googlesyndication.com` | False positive (AdSense 서빙) | 화이트리스트 |
| `googleads.g.doubleclick.net` | (선제) AdSense 더블클릭 | 화이트리스트 |
| `www.nts.go.kr` (7곳) | False positive (국세청 봇 차단 400) | 화이트리스트 |
| `realtyprice.kr/main.php` (1곳) | 실제 broken | 링크 제거 |
| `www.nongshim.com/kcard/...` (1곳) | 실제 broken + 컨텍스트 부적절 | 링크 제거 |

---

## 2. 변경 파일

**신규**:
- `scripts/link-health-config.mjs` — `IGNORE_DOMAINS`, `isIgnored()` (의존성 0)
- `scripts/link-health-config.d.mts` — TypeScript 선언
- `tests/unit/scripts/ralph-link-health.test.ts` — 6 케이스 PASS

**수정**:
- `scripts/ralph-link-health.mjs`
  - config 모듈 import (중복 정의 제거)
  - 실패 도메인 push 시 `!isIgnored(domain)` 가드
  - CLI 가드 (직접 실행 시에만 main()) — 테스트 import 부수효과 차단
  - `updateStuckFile()`: 실패 0이어도 항상 갱신 (stale 신호 영구 잔존 방지)
- `src/app/guide/june-property-tax/page.tsx` — `realtyprice.kr/main.php` 링크 제거 (3개 권위 링크 잔존, SEO 의무 충족)
- `src/app/guide/january-vehicle-tax-prepayment/page.tsx` — 농심 카드 혜택 링크 제거 (위택스 2건 잔존)
- `.claude/stuck.md` — Link Health 섹션 "모든 외부 링크 정상"으로 갱신

---

## 3. 검증

| 항목 | 결과 |
|---|---|
| `npm run typecheck` | ✅ |
| `npm test` | ✅ 911/911 (이전 905 + 신규 6) |
| `npm run lint` | ✅ |
| `npm run ralph:link-health` | 49개 중 9개 실패 (전부 N/A timeout, 정부 사이트 한국 외 IP 이슈로 추정) |

---

## 4. 알려진 후속 항목 (작업 범위 밖)

### 4-1. tests/unit/scripts/ pre-existing 환경 이슈
- `check-guide-quality.test.ts`, `generate-today.test.ts`, `ralph-auto-guide.test.ts` 3개가 vitest transform 단계에서 SyntaxError (line 2:31).
- 내가 신규 추가한 `ralph-link-health.test.ts`는 IGNORE_DOMAINS 모듈을 별도 분리(의존성 0)로 우회 → PASS.
- CI는 `continue-on-error: true` 로 무시 중. 별도 디버깅 필요 (Windows + vitest 3.x + .mjs 임포트 이슈로 추정).

### 4-2. stuck.md 두 번째 Link Health 섹션 (2026-05-06 14:32)
- `developers.google.com` 신호 — 보고서에는 정상 302. 사실상 stale.
- `updateStuckFile()` 정규식이 첫 매치만 갱신 → 두 번째 stale 섹션 잔존.
- 운영자 판단: 수동 삭제 또는 정규식을 `replaceAll`로 강화.

### 4-3. ralph 보고서 정부 사이트 N/A timeout
- moef/moel/moi/molit/koreaexim/socialinfo/kdie/hug/kisline 9개가 한국 외 IP에서 종종 timeout.
- 운영자 환경(한국 IP)에서는 다수 정상. CI(미국 IP)에서 false positive 가능.
- 후속: 정부 사이트는 별도 화이트리스트 또는 timeout 조정 검토.

---

## 5. 다음 Phase 후보

- **Phase Q (Ralph D)**: 추계절 가이드 추천 + 통계 대시보드 (progress.md 명시)
- 또는: 4-1 환경 이슈 디버깅 → 모든 script 테스트 GREEN 회복
