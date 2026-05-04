# Day 0 배포 런북 (launch-runbook)

> **Status**: 활성 문서
> **Last updated**: 2026-05-04
> **관계 문서**: CLAUDE.md "배포 체크리스트", .claude/reports/launch-checklist-YYYY-MM-DD.md

## 개요

calculatorhost.com Day 0 배포를 위한 단계별 실행 가이드. `npm run launch:checklist` 로 자동화된 8개 항목과 운영자 5개 수동 항목을 순차 진행.

---

## Phase 1: 자동 점검 (npm run launch:checklist)

**실행**: 로컬 개발 환경
**소요 시간**: 4~8분

```bash
cd calculatorhost_repo
npm run launch:checklist
```

### 자동 점검 8개 항목

| # | 항목 | 실패 시 조치 | 예상 소요 |
|---|---|---|---|
| 1 | **ads.txt 확인** | public/ads.txt에 실제 pub-ID 입력 (placeholder 제거) | 1분 |
| 2 | **.env.production** | Cloudflare Pages 대시보드에서 생성 (로컬 push 금지) | 0.5분 |
| 3 | **sitemap.xml** | `npm run prebuild` 실행 → public/sitemap.xml 생성 | 2분 |
| 4 | **OG 이미지 (5개+)** | `npm run gen-og` 실행 → 모든 계산기 페이지 OG 이미지 생성 | 3분 |
| 5 | **정책 페이지** | src/app/{privacy,terms,contact}/page.tsx 존재 확인 | 0 (이미 PASS) |
| 6 | **JSON-LD 커버리지** | 계산기 페이지 헤더에 구조화 데이터 추가 | Phase 2 |
| 7 | **Canonical URLs** | sitemap 생성 후 자동 검증 | 자동 |
| 8 | **npm run audit:adsense** | AdSense 정책 위반 항목 수정 | 1~5분 |

### 체크리스트 FAIL 발생 시

1. `.claude/reports/launch-checklist-YYYY-MM-DD.md` 열기
2. 실패 항목 확인 및 조치
3. `npm run launch:checklist` 재실행

---

## Phase 2: 운영자 수동 확인 (15~20분)

자동 점검 통과 후 진행. 5개 항목:

1. **Cloudflare Pages 환경변수**: NEXT_PUBLIC_ADSENSE_CLIENT (3분)
2. **Google Search Console**: sitemap.xml 제출 (5분)
3. **Google Analytics 4**: Web Vitals 연결 (5분)
4. **DNS 스위치**: calculatorhost.com → Cloudflare Pages (5분)
5. **기존 사이트 삭제**: Trend Money Lab 호스팅 정리 (2분)

---

## Phase 3: 최종 검증 (3~5분)

- 신규 calculatorhost.com 페이지 로드 확인
- 광고 슬롯 표시 확인
- Google Analytics 트래픽 표시
- Search Console 사이트맵 수집 상태
- 계산기 정상 작동
- Lighthouse 90+

---

## 배포 예상 소요 시간

| 항목 | 소요 |
|---|---|
| 자동 점검 | 4~8분 |
| 운영자 수동 | 15~20분 |
| 최종 검증 | 3~5분 |
| **합계** | **22~33분** |

---

## 참고 문서

- docs/architecture.md §11
- CLAUDE.md "배포 체크리스트"
- .claude/reports/launch-checklist-YYYY-MM-DD.md
