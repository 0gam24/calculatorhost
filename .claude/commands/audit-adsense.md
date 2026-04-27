---
description: AdSense 정책·배치 감사. 계정 정지 리스크 사전 탐지.
argument-hint: <페이지경로 또는 all> 예) /audit-adsense all
---

# /audit-adsense {{args}}

**adsense-guardian** 에이전트를 호출하여 감사 수행.

대상: `{{args}}` (또는 `all`)

점검 항목:
1. 페이지당 광고 수 (≤ 4)
2. 광고 슬롯 min-height 예약 (CLS 방지)
3. `<Script strategy="lazyOnload">` 적용
4. 광고 라벨 ("광고" 또는 "Sponsored")
5. 콘텐츠와 광고 시각적 구분
6. 자기 클릭 방지 (dev 환경 광고 ID 분리)
7. ads.txt 배포 상태
8. 개인정보처리방침 AdSense 공개 문구
9. 금지된 배치 위치 (404, 로그인, 팝업 등)
10. 금지 콘텐츠 (투자권유·수익보장 문구)

산출물: `🚨 계정 정지 리스크 / 🔴 정책 위반 / 🟡 CWV 영향 / 🟢 권장` 분류 리포트.

근거: `.claude/skills/adsense-policy-reference/REFERENCE.md`
