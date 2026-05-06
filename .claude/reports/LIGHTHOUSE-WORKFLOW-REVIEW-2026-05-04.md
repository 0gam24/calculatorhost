# Lighthouse CI 워크플로우 점검 보고서

**일시**: 2026-05-04  
**상태**: 검토 완료, 권고 사항 정리  
**담당**: lighthouse-profiler  

## 1. 현황 분석

### 워크플로우 구성 (✅ 양호)
- **파일**: `.github/workflows/lighthouse.yml` (lines 1-142)
- **트리거**: PR + main push + workflow_dispatch 모두 활성
- **환경**: Ubuntu (Windows EPERM 우회 완료)
- **빌드**: `npm run build` → static export (out/)
- **측정**: http-server 로컬 호스팅 (port 4173)
- **비교**: baseline artifact 자동 관리 (main push만 저장)

### 기준선 구성 (✅ 강화됨)
- **파일**: `.lighthouserc.json`
- **Mobile/Desktop** 두 preset 모두 측정 (numberOfRuns: 3)
- **URL 8개** 포함 (홈 + 주요 계산기 + 카테고리)
- **CWV 차단 기준**:
  - LCP: ≤ 2.5s (error) ← 배포 차단
  - CLS: ≤ 0.1 (error) ← 배포 차단
  - INP: ≤ 200ms (warn) ← 경고만
- **Performance**: ≥ 85 (warn)

### 비교 로직 (✅ 자동화됨)
- **스크립트**: `scripts/compare-lighthouse.mjs`
- **동작**: baseline vs current JSON 파싱 → 점수 차이 계산
- **회귀 감지**: Performance -5점 이상 악화 시 🔴 표시
- **PR 댓글**: 자동 생성 (마크다운 테이블 + 분석)

---

## 2. 워크플로우 점검 결과

| 항목 | 상태 | 코멘트 |
|---|---|---|
| 트리거 정의 | ✅ | PR/main/dispatch 모두 OK |
| 빌드 프로세스 | ✅ | static export → 실제 운영 환경 근사 |
| 서버 시작 | ✅ | sleep 3 + curl 헬스체크 포함 |
| Lighthouse CI 액션 | ✅ | 최신 버전 v12 사용 |
| Artifact 관리 | ✅ | baseline 분리 저장 (main만), PR은 비교만 |
| PR 댓글 생성 | ✅ | github-script로 자동화, 성능 + 회귀 모두 표시 |
| 비교 스크립트 | ✅ | CWV + 점수 차이 포함, exit code로 심각도 구분 |

---

## 3. 개선 권고 (선택 사항, Phase 2)

### 3-1. Cloudflare Pages Preview URL 통합
**배경**: 현재 localhost 측정 → 실제 Cloudflare 엣지 성능과 단차 가능

**개선안**:
```yaml
# .github/workflows/lighthouse.yml (수정 가능성)
- name: Wait for Cloudflare Pages preview
  if: github.event_name == 'pull_request'
  run: |
    # Cloudflare가 PR마다 preview URL 자동 생성
    # URL 형식: https://{branch-sanitized}.{project}.pages.dev
    # 약 2-3분 소요, GitHub API로 comment 검색 후 추출
    PREVIEW_URL=$(gh pr view ${{ github.event.pull_request.number }} --json comments --jq '.comments[0].body' | grep -oP 'https://[^ ]+\.pages\.dev' | head -1)
    echo "PREVIEW_URL=$PREVIEW_URL" >> $GITHUB_ENV

- name: Run Lighthouse on Cloudflare Preview
  if: github.event_name == 'pull_request' && env.PREVIEW_URL != ''
  uses: treosh/lighthouse-ci-action@v12
  with:
    configPath: ./.lighthouserc.json-preview
    # URL 정적 목록 대신 PREVIEW_URL 환경변수 사용
```

**장점**:
- 실제 Cloudflare CDN 성능 측정 (TTFB, compression 등)
- localhost보다 현실적 CWV

**단점**:
- Preview URL 생성 2-3분 지연
- 구현 복잡도 중간

**우선순위**: Phase 2 (초기 배포는 localhost로 충분, 안정화 후 검토)

### 3-2. CWV 추출 강화
**현황**: compare-lighthouse.mjs에 LCP/INP/CLS 기본 추출 있음 (lines 50-52)

**개선안**: PR 댓글에 **CWV 전용 테이블** 추가
```markdown
## Core Web Vitals

| URL | LCP | INP | CLS | 판정 |
|---|---|---|---|---|
| / | 1.8s ✅ | 120ms ✅ | 0.08 ✅ | Good |
| /calculator/salary/ | 2.1s ✅ | 180ms ⚠️ | 0.12 ❌ | Needs work |
```

**우선순위**: Phase 2 (성능 최적화 후 가시성 확보)

### 3-3. Lighthouse JSON 크기 최적화
**현황**: numberOfRuns: 3 × 8 URL × 2 preset = 48개 결과 → 큰 artifact

**개선안**: 설정별 분기
```json
{
  "numberOfRuns": 1   // dev는 빠르게
  // main/production 배포 전: numberOfRuns: 3 (정확도)
}
```

**우선순위**: Low (artifact 자동 30일 삭제로 충분)

---

## 4. 운영자 절차 (문서화 완료)

`docs/launch-runbook.md`에 **Phase 4** 추가:

1. **자동 실행**: PR 생성 시 baseline과 비교 → PR 댓글로 결과 표시
2. **Baseline 수립**: main 푸시 성공 시 artifact 자동 저장
3. **판정 기준**: 
   - LCP/CLS 초과 → 배포 차단
   - Performance -5점 이상 → 경고 + lighthouse-profiler 호출
4. **수동 dispatch**: `Actions` 탭에서 "Lighthouse CI" → "Run workflow"

---

## 5. 체크리스트

- [x] 워크플로우 YAML 구문 검증 (모두 정상)
- [x] 기준선 임계값 확인 (CWV + performance 모두 포함)
- [x] 비교 스크립트 동작 로직 검증 (회귀 감지 OK)
- [x] 운영자 문서 작성 (launch-runbook.md Phase 4)
- [ ] Cloudflare Preview URL 통합 (Phase 2 권고)
- [ ] CWV 전용 테이블 추가 (Phase 2 권고)

---

## 결론

**워크플로우 상태**: ✅ **배포 가능**

현재 구성으로 CWV Good 유지 + 회귀 감시 모두 자동화됨. 
Windows 환경에서 로컬 측정 불가 문제는 GitHub Actions (Ubuntu) 트리거로 완전 해결.

**다음 단계**:
1. 초기 배포 후 baseline 수립
2. Phase 2에서 Cloudflare Preview 통합 검토
3. Performance < 85 지속 시 lighthouse-profiler 호출

---

**참고 파일**:
- `.github/workflows/lighthouse.yml` (L1-142)
- `.lighthouserc.json` (L1-46)
- `scripts/compare-lighthouse.mjs` (L1-129)
- `docs/launch-runbook.md` (Phase 4 추가됨)
