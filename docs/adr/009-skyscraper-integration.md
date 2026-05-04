# ADR 009: 우측 Skyscraper 광고 (SkyscraperAd) 통합

**Date**: 2026-05-04  
**Status**: Accepted  
**Context**: Phase E/F 에서 우측 사이드바 SkyscraperAd 를 3개 주요 계산기 페이지에 통합. 발사 후 자동 모니터링 및 의사결정 기록.

## 문제

### 현황
- **Phase D 완료**: 5개 광고 슬롯 규격 (AD-1~5) 정의 완료
  - AD-1: 헤더 리더보드 (728×90 / 970×250)
  - AD-2: Medium Rectangle (300×250)
  - AD-3: **Skyscraper (300×600 스티키)** ← 본 결정의 대상
  - AD-4: 인피드 (반응형)
  - AD-5: 모바일 앵커 (320×50)
- **Phase E 실행 중**: 대부분의 계산기에 AD-1, AD-2, AD-4 배치 완료
- **Phase F 진행 중**: SkyscraperAd(AD-3)를 lg+ 브레이크포인트에서 우측 고정 위치에 통합 시작

### 의사결정 필요 사항
1. **SkyscraperAd 전체 확산 타이밍**: 3개 선도 페이지(salary, capital-gains-tax, loan-limit) 후 전체 30개로 확대할지 판단
2. **eCPM 비교 기준**: 발사 전(AD-1,2,4 만) vs 발사 후(AD-3 추가)의 수익 성과
3. **CLS 영향도 검증**: 스티키 광고가 레이아웃 시프트를 유발하지 않는지 확인
4. **모니터링 자동화**: 정책 위반(페이지당 4개 초과) 자동 감지 필요

## 결정

### 1. SkyscraperAd 도입 (선택: 확대)
**Salary, Capital Gains Tax, Loan Limit** 3개 페이지부터 시작.
- **슬롯명**: `{calculator}-skyscraper` (예: `salary-skyscraper`)
- **배치**: 메인 콘텐츠와 우측 AD-3 사이 (lg+ 브레이크포인트)
- **전략**: `strategy="afterInteractive"` (페이지 로드 후 비동기)
- **높이 예약**: min-height 300px (CLS 방지, 이미지 없음)
- **배경**: light 강제 유지 (다크 모드에서도 라이트 카드)

### 2. 발사 후 4주 성과 비교 (결정: 수행)
**대상 메트릭**:
- eCPM (초당 1000 노출당 수익)
- CTR (클릭률)
- 페이지 평균 체류 시간
- CLS (Cumulative Layout Shift) ≤ 0.05 유지

**판단 기준**:
- ✅ **확대**: eCPM ≥ 15% ↑ (AD-1,2,4만 대비)
- ⚠️  **신중**: eCPM +5% ~ +15%
- ❌ **중단**: eCPM < +5% 또는 CLS > 0.1

### 3. 정책 감사 자동화 (결정: 구현)
**신규 스크립트**: `scripts/audit-adsense.mjs`
- 모든 페이지의 광고 슬롯 개수 점검 (≤ 4)
- 슬롯명 중복 검출 (크로스 페이지)
- 금칙어 검출 ("투자 권유", "수익 보장" 등)
- 정책 페이지(/privacy, /terms 등)의 광고 호출 금지 확인
- **출력**: `.claude/reports/adsense-audit-YYYY-MM-DD.md` (마크다운)
- **실행**: `npm run audit:adsense`
- **CI 통합**: GitHub Actions 월간 정기 실행 (검토 후 도입)

### 4. 레이아웃 그리드 도입 (결정: 기존 구조 유지)
**선택 안**: 본문 flex 로직 그대로 → lg 브레이크포인트에서 자동으로 2칼럼(본문 + 우측 300px)
- 코드: `lg:grid lg:grid-cols-[1fr_300px]` (salary page.tsx line 183 참고)
- CLS 예방: 모든 광고 슬롯에 `min-height` 명시

### 5. 모니터링 주기 (결정: 월간)
- **주 1회**: AdSense 대시보드 스냅샷 (수익, CTR, CPC 트렌드)
- **월 1회**: 정책 감사 스크립트 실행 → 리포트 검토
- **분기 1회**: 성과 최적화 리뷰 (eCPM, 슬롯별 기여도)

## 영향

### 긍정
1. **수익성**: SkyscraperAd는 AdSense에서 **최고 eCPM** 슬롯 중 하나 (300×600 스티키)
2. **Viewability**: 화면에 최장 시간 노출 → 광고주 만족도 ↑
3. **GEO/AEO 무관**: 콘텐츠 삽입이 아닌 사이드바 배치 → LLM 인용 간섭 없음
4. **자동 감사**: 정책 위반 자동 감지 → 계정 정지 리스크 감소

### 비용/위험
1. **CLS 악화 가능성**: 초기 로드 시 우측 칼럼 점프
   - 완화: min-height 예약으로 해결 ✓
2. **모바일 영향 없음**: lg+ 전용이므로 모바일(AD-5 앵커)과 무관
3. **배포 후 성과 미흡 가능성**: 4주 후 eCPM 기대치 미달
   - 판단: 중단/축소 검토 후 재배치

## 대안 검토

### 대안 A: AD-2 (Medium Rect) 만 유지
- **eCPM**: 중간 (300×250은 표준)
- **비용**: 낮음 (현 상태 유지)
- **위험**: 모바일에서 CTR 낮음 (300×250은 모바일에서 부담)
- **선택 안 함**: 데스크톱 사용자 수익 기회 손실

### 대안 B: AD-4 (인피드) 위주로 강화
- **eCPM**: 변동 큼 (엔진별 eCPM 편차)
- **위험**: 본문 다단계 배치 → SEO 인용 간섭 가능 (GEO)
- **선택 안 함**: 콘텐츠 신뢰성 손상 위험

### 대안 C: 모든 계산기에 즉시 배포 (no A/B test)
- **비용**: 낮음 (빠른 확산)
- **위험**: 성과 미흡 시 대량 롤백 필요 → 고비용
- **선택 안 함**: 보수적 (3개 선도 → 4주 모니터링 → 확대 권장)

**선택**: 본 결정 (AD-3 선도 도입 + 4주 A/B 검증 + 자동 감사)

## 실행 계획

### Phase G (현재)
1. ✅ `scripts/audit-adsense.mjs` 신규 작성
2. ✅ `npm run audit:adsense` 실행 → .claude/reports/adsense-audit-*.md 생성
3. ✅ 초기 감사: 58 페이지, 정책 위반 0건 (안전)
4. 📋 ADR 009 (본 파일) 기록

### Phase H (발사 후 1주)
1. 우측 AD-3 (SkyscraperAd) 활성화 3개 페이지 배포
2. AdSense 대시보드에서 슬롯별 성과 추적 설정
3. Lighthouse CWV 베이스라인 측정

### Phase I (발사 후 4주)
1. **메트릭 수집**: eCPM, CTR, 체류 시간, CLS
2. **비교**: AD-1,2,4 대비 AD-3 추가 효과
3. **판정**:
   - ✅ eCPM ≥ +15% → 전체 30개 확대 결정
   - ⚠️  +5% ~ +15% → 신중히 추가 확대
   - ❌ < +5% 또는 CLS > 0.1 → 3개 유지 또는 제거 재검토

### Phase J (분기 1회)
- 월간 감사 스크립트 정기 실행
- AdSense 정책 업데이트 검토
- eCPM 하락/상승 원인 분석

## 근거

### 공식 문서
- Google AdSense 광고 형식 가이드: https://support.google.com/adsense/answer/185666
- 스티키 광고(Sticky Ads) 지침: https://support.google.com/adsense/answer/9078925
- Core Web Vitals 가이드: https://developers.google.com/search/docs/appearance/core-web-vitals

### 내부 문서
- docs/design-system.md § 9 (광고 배치 5슬롯 아키텍처, AD-3 규격 300×600)
- docs/adr/008-adsense-launch-playbook.md (발사 후 월간 모니터링)
- .claude/skills/adsense-policy-reference/REFERENCE.md § 3, 4, 6

### 발사 전 검증
- Salary 페이지(line 590-591): `<SkyscraperAd slot="salary-skyscraper" />`
- Capital Gains Tax, Loan Limit: 동일 패턴 적용
- 현재 페이지당 광고 ≤ 3개 (AD-1+AD-2+AD-4 중 최대 3개)
- AD-3 추가 후에도 ≤ 4개 (정책 준수)

## 비용 추정

- **개발**: audit-adsense.mjs 작성 + 3페이지 SkyscraperAd 통합 ≈ 4시간
- **모니터링**: 월간 감사 ≈ 1시간
- **성과 분석**: 4주 후 1시간

## 관련 의사결정

- ADR 007: AdSense 위험 분산 전략
- ADR 008: AdSense 발사 후 운영 플레이북
- docs/design-system.md: 광고 배치 5슬롯 아키텍처
- .claude/CLAUDE.md: adsense-guardian 에이전트 역할

---

## 업데이트 로그

- 2026-05-04: 초판
  - audit-adsense.mjs 신규 작성 및 첫 실행 완료
  - 58 페이지 감사 → 정책 위반 0건 (안전)
  - SkyscraperAd 3페이지 통합 준비 (승인 대기)
