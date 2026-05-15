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

## 💰 수익화 영향 평가 (북극성 룰 — 출력 마지막 섹션 의무)

리포트 末尾에 다음 평가 자동 출력:

```
### 수익화 영향 평가
- 영향 페이지: <대상 URL 또는 all>
- 수익 항: rpm (광고 슬롯 = RPM 직격)
- 부작용:
    · CLS 회귀 위험: <있음/없음>
    · 광고 밀도 ≤ 4 위반: <있음/없음>
    · 정책 위반 시 계정 정지 → 모든 수익 표면 0% (최악 시나리오)
- revenue-lever 권장 태그: rpm (개선) 또는 guard (정책 보호)
```

근거: `.claude/skills/adsense-policy-reference/REFERENCE.md` + 루트 `CLAUDE.md` "💰 북극성"
