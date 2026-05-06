# GA4 Web Vitals 측정 가이드

> **Status**: 자동화된 필드 데이터 수집 설정서
> **Last updated**: 2026-05-06
> **관련**: `.env.example` (NEXT_PUBLIC_GA_ID), `src/components/analytics/WebVitalsReporter.tsx`

## 1. 개요

calculatorhost 는 다음 과정으로 **Google Analytics 4** 에 실사용자의 **Core Web Vitals(CWV)** 를 자동 송신합니다.

```
[사용자 브라우저]
    ↓ Next.js useReportWebVitals 자동 수집
[LCP, INP, CLS, FCP, TTFB]
    ↓ WebVitalsReporter 컴포넌트
[gtag('event', 'web_vitals', {...})]
    ↓
[Google Analytics 4]
    ↓ 28일 데이터 누적
[Search Console CWV 리포트와 대응]
```

**주의**: Lab 점수(Lighthouse)와 달리 **Field Data** (실사용자) 는 28일간의 충분한 트래픽 후 안정화됩니다.

## 2. 사전 준비

### 2-1. GA4 속성 생성 (운영자 단계)
1. [Google Analytics 홈](https://analytics.google.com) 접속
2. **좌측 하단** "관리" → **[계정]** 섹션 → **새 속성 만들기**
3. 속성명: `calculatorhost` (또는 `calculatorhost — 운영`)
4. 데이터 스트림 설정:
   - 플랫폼: **웹**
   - 웹사이트 URL: `https://calculatorhost.com`
   - 스트림명: `calculatorhost-prod` (또는 본인 규칙)
5. **측정 ID** 생성됨 (형식: `G-XXXXXXXXXX`)

### 2-2. 측정 ID를 환경변수에 등록
`.env.local` 또는 Cloudflare Pages 대시보드:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```
> **주의**: 실제 값은 `.env.local` 에만 (커밋 금지). 프로덕션은 Cloudflare Pages 대시보드 → 설정 → 환경변수에서 설정.

### 2-3. 데이터 수집 확인
배포 후 **실시간 리포트** (GA4 대시보드):
- 이벤트 섹션 → `web_vitals` 이벤트가 도착하는지 확인
- 초기 1-2시간은 데이터 지연 정상

## 3. GA4 보고서 설정

### 3-1. Web Vitals 커스텀 리포트 만들기
**경로**: GA4 대시보드 → 좌측 "보고" → **맞춤 보고서**

1. **새 보고서** 클릭
2. 제목: `Web Vitals — Core Metrics`
3. **데이터 선택**:
   - 차원 (Dimension): `event_label` (metric_id), `metric_rating`
   - 지표 (Metrics): `event_count`
4. **필터 추가**:
   - `Event name` = `web_vitals`
5. **저장**

→ 결과: 각 지표별(LCP, INP, CLS) 이벤트 발생 수 + 품질 등급(good/needs-improvement/poor) 시각화

### 3-2. 시계열 성능 추이 대시보드
**경로**: GA4 → 맞춤 보고서 → **새 차트** 추가

```
차트 유형: 선 차트 (시계열)
X축: 날짜
Y축: 이벤트 수 (또는 평균값)
분리: metric_id (LCP/INP/CLS/FCP/TTFB)
필터: event_name = 'web_vitals'
```

→ 28일 추이로 Core Web Vitals 안정도 추적

### 3-3. 세그먼트별 분석 (선택)
**경로**: GA4 → 맞춤 보고서 → **비교 추가**

```
비교 항목: 
  - metric_rating (good vs needs-improvement vs poor)
    → "얼마나 많은 사용자가 'good' 을 경험했는가"
  - 기기 (mobile vs desktop)
    → 모바일 CWV 진단
  - 국가 (한국 vs 해외)
    → 지역별 성능 차이
```

## 4. Looker Studio 대시보드 (고급, 선택)

**목적**: GA4 데이터를 더 아름답게 시각화 + 자동화된 주간 리포트

1. [Looker Studio](https://lookerstudio.google.com) 접속
2. **새 보고서** → GA4 연결 → `calculatorhost` 속성 선택
3. 템플릿 추가:
   ```
   ┌─────────────────────────┐
   │ [Web Vitals 주간 요약]    │
   │ ✓ LCP Δ (전주 대비)     │
   │ ✓ INP Δ                │
   │ ✓ CLS Δ                │
   │ ✓ Good/Poor ratio       │
   └─────────────────────────┘
   ```
4. **확인 → 공유** (운영 팀·개발 팀에 읽기 권한)

## 5. Search Console CWV 리포트와 대응

**GA4 Field Data** vs **Search Console CWV** 의 관계:

| 출처 | 샘플링 | 지표 | 용도 |
|---|---|---|---|
| GA4 web-vitals | 100% (모든 사용자) | LCP, INP, CLS, FCP, TTFB | 자체 성능 모니터링 |
| Search Console | Google 공식 필드데이터 | LCP, INP, CLS | 검색 순위 영향 판정 |
| Lighthouse Lab | 시뮬레이션 (로컬/CI) | 모든 지표 | 배포 전 검증 |

**행동**:
1. Search Console CWV 보고서 → "개선 필요" 지표 확인
2. GA4 커스텀 리포트 → 같은 지표 **상세 분석** (device/region 별)
3. `.claude/skills/core-web-vitals-reference/REFERENCE.md` 참조 → 최적화 작업 수행

## 6. 트러블슈팅

### Q: GA4 에 web_vitals 이벤트가 안 보입니다
**A**: 
1. `.env.local` 에 `NEXT_PUBLIC_GA_ID=G-...` 설정 확인
2. 브라우저 개발자 도구 → 콘솔 → `window.gtag` 존재 확인
3. 페이지 방문 후 GA4 **실시간** 리포트 확인 (최대 1-2분 지연)
4. 유저 필터 확인: GA4 → 관리 → 데이터 필터 → "내 IP 제외" 적용 여부

### Q: Field Data 와 Lab 점수가 다릅니다
**A**: 정상입니다. 이유:
- **Lab** = Lighthouse (로컬 환경·고사양 PC·캐시 없음)
- **Field** = 실제 사용자 (다양한 기기·네트워크·캐시 있음)
- **권장**: Field Data 우선, Lab 은 배포 전 회귀 검증용

### Q: CLS 가 0.15 인데 페이지는 끄떡없어 보입니다
**A**:
- 실제 사용자 중 일부가 높은 CLS 경험 → 평균이 기준값 초과
- 특정 기기/네트워크 조건에서 광고 로딩 지연 → CLS 발생 가능
- GA4 리포트 → device/network 세그먼트로 범인 식별

## 7. 체크리스트

- [ ] GA4 속성 생성 (`G-...`)
- [ ] `.env.local` 에 `NEXT_PUBLIC_GA_ID` 입력
- [ ] 로컬 빌드 후 브라우저 방문
- [ ] GA4 실시간 보고서에서 `web_vitals` 이벤트 도착 확인
- [ ] Cloudflare Pages 배포
- [ ] Search Console 속성 → GA4 연결 (선택)
- [ ] 28일 후 CWV 데이터 안정화 대기

## 참고
- [Google Web Vitals 공식 가이드](https://web.dev/vitals/)
- [GA4 커스텀 이벤트](https://support.google.com/analytics/answer/12039721)
- [Search Console CWV 리포트](https://support.google.com/webmasters/answer/12143439)
