# Lighthouse CI 운영 가이드 (YORO Phase M)

> **대상**: 발사 전 성능 검증 담당자
> **작성일**: 2026-05-06
> **자동화 범위**: GitHub Actions Ubuntu 환경 (로컬 EPERM 한계 극복)

---

## 1단계: Baseline 첫 등록 (초회 1회)

### 1-1. main 브랜치 정상 상태 확인
```bash
git status  # 모든 변경사항 커밋됨
npm run build  # 빌드 성공
npm test  # 테스트 통과
```

### 1-2. GitHub Actions 트리거
1. GitHub 웹 → 프로젝트 → **Actions** 탭
2. **Lighthouse CI** 워크플로우 선택
3. **Run workflow** → Branch: `main` → **Run workflow** 클릭
4. 대기: 5-8분 (빌드 + Lighthouse 3회 실행 + 결과 저장)
5. 워크플로우 완료 후 **Artifacts** 탭에서 `lighthouse-baseline` 확인

### 1-3. 확인 항목
- 아티팩트가 30일 보관됨 (자동)
- 초기 baseline 저장 완료 → 이후 PR마다 비교 시작

---

## 2단계: PR 생성 시 자동 측정 (매 PR)

### 2-1. 일반 워크플로우
```
로컬 커밋 → git push
    ↓
GitHub PR 생성 (main 으로)
    ↓
Actions 자동 실행:
  - 빌드
  - Lighthouse 8개 URL × 2 프리셋(모바일/데스크톱) × 3회 = 48회 측정
  - Baseline과 비교
  - PR 댓글에 결과 게시
    ↓
운영자 검토 → Merge 또는 수정 요청
```

### 2-2. PR 댓글 읽기

**예시:**
```
## Lighthouse CI 결과

### 점수
| URL | Performance | LCP | INP | CLS |
|---|---|---|---|---|
| / | 92 | 1.85s | 95ms | 0.08 |
| /calculator/salary/ | 88 | 2.15s | 120ms | 0.12 |

### Core Web Vitals 판정
| 지표 | Good | 기준 |
|---|---|---|
| LCP | ≤ 2.5s | 2.5-4.0s |
| INP | ≤ 200ms | 200-500ms |
| CLS | ≤ 0.1 | 0.1-0.25 |

## Baseline 비교
| URL | Performance | ... |
🟢 Baseline 유지 또는 개선
```

**해석 규칙:**
| 점수 | 판정 | 조치 |
|---|---|---|
| Performance ≥ 85 + LCP ≤ 2.5s + INP ≤ 200ms + CLS ≤ 0.1 | ✅ PASS | Merge 가능 |
| Performance 75-84 또는 LCP 2.5-4.0s | ⚠️ WARN | 개선 권고, Merge 가능 |
| Performance < 75 또는 LCP > 4.0s | ❌ HOLD | lighthouse-profiler 호출 |
| Baseline -5점 이상 악화 | ⚠️ REGRESS | Merge 전 원인 분석 |

---

## 3단계: 수동 트리거 (선택 사항)

main 또는 다른 URL 측정이 필요할 때:

### 3-1. GitHub UI
1. **Actions** → **Lighthouse CI** → **Run workflow**
2. 옵션 입력:
   - **Test URLs**: (비움 = 기본값) 또는 `http://localhost:4173/calculator/loan-limit/,http://localhost:4173/category/finance/`
   - **Device preset**: `mobile` / `desktop` / `both` 선택
3. **Run workflow**

### 3-2. 결과 확인
- 워크플로우 완료 후 **Artifacts** 탭에서 `lighthouse-results-{run-number}` 다운로드
- JSON 파일 내용:
  ```json
  [
    {
      "url": "http://localhost:4173/calculator/salary/",
      "categories": {
        "performance": { "score": 0.88 },
        ...
      },
      "audits": {
        "largest-contentful-paint": { "numericValue": 2150 }
      }
    }
  ]
  ```

---

## 4단계: Baseline 갱신 (권고: 2주마다)

성능 개선이 안정화되었을 때:

### 4-1. 갱신 시점 판단
- 지난 3개 PR 모두 Performance +2점 이상 개선
- 또는 구조적 최적화 완료 후

### 4-2. 갱신 방법
1. main 최신 상태 확인
2. **Actions** → **Lighthouse CI** → **Run workflow** (Branch: main)
3. 완료 후 새로운 baseline이 자동으로 덮어씀 (아티팩트 동일 이름)

---

## 5단계: 실패 대응

### LCP > 4.0s 감지 시
```
→ lighthouse-profiler 에이전트 호출
→ REFERENCE.md §4 원인 진단
→ 일반적 원인:
  1. AdSense 스크립트 동기 로드 (§9 확인)
  2. 폰트 FOUT (§5 font-display)
  3. 대용량 이미지 (§5 next/image 사용)
  4. 렌더 블로킹 CSS (§5 critical CSS 인라인)
```

### INP > 200ms 감지 시
```
→ 메인 스레드 블로킹 JS 탐지
→ Chrome DevTools Performance 탭 녹화
→ 컴포넌트 리렌더 또는 3rd party 스크립트 확인
```

### CLS > 0.1 감지 시
```
→ 동적 콘텐츠 삽입 확인
→ 일반적 원인: AdSense 슬롯 min-height 미지정
→ 솔루션: design-system.md §6 "AdSense 슬롯 특수 규칙" 참조
```

### Performance -5점 이상 악화 시
```
→ 비교 테이블에서 악화한 항목 식별
→ 최근 변경사항(커밋)과 연관성 확인
→ 의도하지 않은 악화면 롤백 권고
→ 필요시 번들 크기 분석:
   npm run build && npm run build:analyze (예정)
```

---

## 6단계: 결과 해석 매트릭스

| 상황 | Performance | LCP | INP | CLS | 판정 | 조치 |
|---|---|---|---|---|---|---|
| 신규 페이지 첫 측정 | 85+ | ≤2.5 | ≤200 | ≤0.1 | ✅ | Merge |
| 기존 페이지, -1점 | 84 | 2.3s | 190ms | 0.08 | ✅ | Merge |
| 기존 페이지, -6점 | 79 | 2.8s | 220ms | 0.12 | ⚠️ | 원인 분석 후 Merge |
| AdSense 추가, LCP↑ | 82 | 3.2s | 150ms | 0.15 | ⚠️ | design-system 재확인 |
| 성능 회귀 (예: JS 번들 2배) | 65 | 4.5s | 350ms | 0.25 | ❌ | lighthouse-profiler |

---

## 7단계: CI/CD 통합 (장기)

### 배포 체크리스트 항목
- [ ] `npm run build` 통과
- [ ] Lighthouse Performance ≥ 85 (모바일)
- [ ] CWV all Good (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1)
- [ ] Baseline 대비 -5점 미만 악화
- [ ] E2E 5종 골든패스 PASS (theme, routing, adsense, salary, loan-limit)
- [ ] seo-auditor, adsense-guardian 최종 감사

---

## 참고 자료

- **REFERENCE.md**: `.claude/skills/core-web-vitals-reference/REFERENCE.md` (CWV 전체 이론)
- **Design System**: `docs/design-system.md` (광고 배치, CLS 방지)
- **아키텍처**: `docs/architecture.md` §8 (성능 예산)
- **Workflow**: `.github/workflows/lighthouse.yml`
- **비교 스크립트**: `scripts/compare-lighthouse.mjs`

---

## FAQ

**Q. 로컬에서 Lighthouse 못 돌리는 이유?**
A. Windows EPERM 권한 문제. GitHub Actions Ubuntu는 이 문제 없음. 필요시 WSL/Docker 사용.

**Q. Baseline 없이 PR 생성하면?**
A. 첫 측정은 비교 없이 절대값만 표시. 두 번째 PR부터 baseline과 비교.

**Q. 3회 평균을 쓰는 이유?**
A. 네트워크 변동성 흡수. Lighthouse는 기본 3회 측정 후 75번째 백분위 기준.

**Q. AdSense 광고로 인한 CLS 상승은 정상인가?**
A. 네. AdSense 슬롯에 `min-height` + 라이트 배경 강제 → CLS 최소화. 0.1 이상이면 검토 필요.

**Q. Performance 점수는 무시해도 되나?**
A. 아니오. Performance는 LCP, INP, CLS + 기타 요소들의 종합 지수. ≥85 유지 권고.

---

**갱신 로그**
- 2026-05-06: 초판 (Phase M, GitHub Actions workflow_dispatch 가이드)
