---
description: 배포 전 체크리스트 + Cloudflare Pages 배포 절차
---

# /deploy — 배포 체크리스트

**주의**: 프로덕션 `calculatorhost.com` 은 현재 WordPress "Trend Money Lab" 운영 중.
새 사이트 안정화 확인 후 한번에 전환한다.

## Phase 1: 배포 전 감사 (모두 통과 시만 진행)

### 1-1. 기능 테스트
- [ ] **test-runner** 호출 → 단위·E2E 100% 통과
- [ ] 모든 계산기 수동 테스트 (샘플 케이스)

### 1-2. SEO 감사
- [ ] **seo-auditor** `/seo-check all`
- [ ] 🔴 Blocker 0건
- [ ] sitemap.xml 생성 확인
- [ ] robots.txt 배포 확인

### 1-3. AdSense 감사
- [ ] **adsense-guardian** `/audit-adsense all`
- [ ] 🚨 계정 정지 리스크 0건
- [ ] ads.txt 배포 (`public/ads.txt`)
- [ ] 개인정보처리방침 AdSense 문구 포함
- [ ] `/privacy` `/terms` `/contact` `/about` 페이지 존재

### 1-4. 성능 감사
- [ ] **lighthouse-profiler** 홈 + 인기 계산기 5개 측정
- [ ] LCP ≤ 2.5s / INP ≤ 200ms / CLS ≤ 0.1
- [ ] Lighthouse Performance ≥ 90 (모바일)

### 1-5. 계산 정확도
- [ ] **calc-logic-verifier** 모든 세율 함수 공식 출처 교차검증
- [ ] 국세청 간이계산기 샘플 대조 완료

## Phase 2: GitHub 푸시

```bash
git status
git add -A
git commit -m "feat: initial launch"
git push origin main
```

## Phase 3: Cloudflare Pages 프리뷰

- Cloudflare Dashboard → Pages → 프로젝트 연결 확인
- `calculatorhost.pages.dev` 프리뷰 URL 접속
- 실제 브라우저(모바일/데스크톱)에서 QA
- AdSense 광고 실제 로드 확인 (클릭 절대 금지)

## Phase 4: DNS 스위치 (돌이키기 어려움 — 사용자 확인 필수)

🚨 **사용자 명시 승인 없이 진행 금지** 🚨

1. 기존 WordPress 호스팅 백업 (스크립트/DB)
2. DNS 네임서버를 Cloudflare로 이전 (또는 기존 DNS에서 A/CNAME 변경)
3. TTL 최소화 (300s) 사전 설정
4. 전파 확인 (`dig calculatorhost.com`)
5. SSL 자동 발급 확인
6. Cloudflare Pages 커스텀 도메인 연결

## Phase 5: 포스트 론칭 (24시간)

- [ ] Search Console 재등록 + sitemap 재제출
- [ ] AdSense 대시보드 사이트 상태 확인
- [ ] Analytics 연동
- [ ] Core Web Vitals 필드 데이터 모니터링
- [ ] 첫 24시간 에러 로그 관찰
- [ ] 기존 Trend Money Lab 완전 삭제 (백업 보존 후)

## Phase 6: 지속 감시

- GitHub Actions 주간 lighthouse CI
- 월 1회 `/update-tax-rates` (변경 있을 때)
- 분기 1회 `/audit-adsense all`
- `docs/adr/` 업데이트 유지
