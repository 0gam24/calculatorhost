---
name: core-web-vitals-reference
description: |
  Core Web Vitals(LCP/INP/CLS) 공식 지표·최적화 기법 참조. lighthouse-profiler 에이전트가
  성능 측정·분석·개선 제안 시 트리거. "성능 점검", "Lighthouse", "CWV", "LCP", "INP", "CLS",
  "PageSpeed", "페이지 속도" 등 요청 시 자동 호출.
---

# Core Web Vitals Reference Skill

## 워크플로우

### 상황 1: 성능 측정
1. Playwright + Lighthouse CLI로 대상 페이지 프로파일링
2. `REFERENCE.md` §1-§3 기준으로 LCP/INP/CLS 점수 판정
3. 임계 미달 지표 원인 진단 (§4)

### 상황 2: 개선 제안
1. 진단된 원인을 `REFERENCE.md` §5-§7의 최적화 기법에 매칭
2. Next.js 특화 조언 (§6) 우선
3. AdSense 관련 문제 시 adsense-guardian과 협업

### 상황 3: 회귀 감시
1. 기준선 JSON 저장 (.claude/checkpoints/cwv-baseline.json)
2. PR별 비교 → 악화 지표 자동 플래그

## 통과 기준
- LCP ≤ 2.5s (75th percentile)
- INP ≤ 200ms
- CLS ≤ 0.1
- Lighthouse Performance ≥ 90 (모바일)

## 측정 대상 페이지 (정기)
- 홈, 인기 계산기 Top 5, 새 배포 페이지 전부
