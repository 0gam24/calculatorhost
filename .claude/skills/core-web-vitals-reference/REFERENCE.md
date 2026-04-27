# Core Web Vitals 레퍼런스

> **출처**: https://web.dev/articles/vitals + https://developers.google.com/search/docs/appearance/core-web-vitals
> **기준**: 2026-04

---

## §1. 3대 지표 정의 & 임계값

| 지표 | 측정 대상 | Good | Needs Improvement | Poor |
|---|---|---|---|---|
| **LCP** (Largest Contentful Paint) | 가장 큰 요소 렌더링 | ≤ 2.5s | 2.5-4.0s | > 4.0s |
| **INP** (Interaction to Next Paint) | 상호작용 반응성 | ≤ 200ms | 200-500ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | 누적 레이아웃 변경 | ≤ 0.1 | 0.1-0.25 | > 0.25 |

**75번째 백분위** 기준 측정 (모바일·데스크톱 분리).

---

## §2. 측정 도구

### Field Data (실사용자)
- **CrUX** (Chrome User Experience Report) — 28일 집계 실데이터
- **PageSpeed Insights** — CrUX 결과 표시
- **Search Console Core Web Vitals 보고서** — 페이지 그룹별

### Lab Data (개발/CI)
- **Lighthouse** (CLI, DevTools, CI) — 재현 가능 측정
- **Chrome DevTools Performance** — 프로파일링
- **WebPageTest** — 다양한 환경
- **`web-vitals` JS 라이브러리** — 실제 방문자 측정

**주의**: Lighthouse는 INP 대신 **TBT (Total Blocking Time)** 측정 (lab에선 실제 상호작용 없어서).

---

## §3. 필드 vs 랩

- **Field** = 실제 사용자 데이터 (기기·네트워크 다양) → **구글 순위에 반영**
- **Lab** = 통제된 환경 → 재현성 ↑, 개발 중 사용
- 둘 다 필요. Lab 통과해도 Field에서 실패 가능

---

## §4. 지표별 악화 원인

### LCP 악화 원인
1. 느린 서버 응답 (TTFB)
2. 렌더 블로킹 리소스 (동기 CSS/JS)
3. 느린 리소스 로드 (큰 이미지/폰트)
4. 클라이언트 사이드 렌더링 지연
5. 폰트 FOUT/FOIT
6. **AdSense 스크립트 동기 로드** ← 본 프로젝트 주 원인

### INP 악화 원인
1. 긴 태스크 (>50ms)
2. 대용량 JS 번들
3. 복잡한 이벤트 핸들러
4. 동기 입력 처리
5. React re-render 폭주
6. 3rd party 스크립트 메인 스레드 블로킹

### CLS 악화 원인
1. **크기 미지정 이미지/iframe** ← 가장 흔함
2. **광고 슬롯 동적 삽입** ← AdSense 주범
3. 웹폰트 로딩 시 FOUT
4. 동적 콘텐츠 삽입 (above existing content)
5. 애니메이션으로 레이아웃 변경 (transform 대신 top/left 사용)

---

## §5. LCP 최적화 기법

### 서버/네트워크
- Cloudflare 엣지 캐시 최대 활용 (정적 자산 `immutable`)
- Next.js `output: 'export'` → 정적 HTML → TTFB 극소
- HTTP/2, HTTP/3 자동 (Cloudflare)
- Preconnect / dns-prefetch (3rd party 도메인)

### 이미지
- **`next/image`** 사용 (WebP/AVIF 자동, lazy/priority)
- 히어로 이미지 `priority` 속성
- 적절한 `sizes` 속성 (responsive)
- CDN 이미지 최적화

### 폰트
- `next/font` 사용 (self-hosted, preload 자동)
- `font-display: swap`
- 필수 폰트만 preload
- Pretendard 같은 variable font는 1개 파일로 충분

### JS/CSS
- CSS는 인라인 크리티컬 CSS + 나머지 async
- 렌더 블로킹 제거
- Tailwind는 purge로 크기 최소
- Next.js 자동 코드 분할

### 3rd party
- AdSense: `<Script strategy="lazyOnload">`
- Analytics: `afterInteractive`
- 모든 iframe: `loading="lazy"`

---

## §6. INP 최적화 기법

### JS 경량화
- 번들 분석 (`@next/bundle-analyzer`)
- 큰 라이브러리 동적 import
- React Server Components로 클라이언트 JS 최소화

### 이벤트 핸들러
- 입력 필드: debounce 적용 (300-500ms)
- 계산 트리거: requestIdleCallback 또는 useTransition
- 긴 동기 작업을 청크 분할 (`scheduler.yield()`)

### React 최적화
- `useMemo` / `useCallback` 적재적소
- `React.memo` 무거운 컴포넌트
- Re-render 원인 Profiler로 분석
- Recharts 등 차트는 dynamic import

### Web Worker
- 복잡한 계산(예: 대출 상환 스케줄 수백 row)은 Web Worker 오프로드

---

## §7. CLS 최적화 기법

### 크기 예약 (가장 중요)
- **모든 `<img>`, `<video>`, `<iframe>`에 width/height 명시**
- CSS aspect-ratio 활용
- 광고 슬롯 `min-height` 강제

### 폰트
- `next/font`로 `size-adjust` 자동 생성
- System font fallback 유사 metric

### 동적 콘텐츠
- 기존 콘텐츠 **위에 삽입 금지** (아래로만)
- Skeleton loader로 공간 예약
- 토스트/배너는 overlay로 (flow 영향 X)

### 애니메이션
- `transform` / `opacity`만 사용 (composite 레이어)
- `top`, `left`, `margin` 변경 금지

### AdSense 특수
- 광고 슬롯 부모 div에 고정 `min-height` (반응형도)
- `<ins class="adsbygoogle">` 크기 명시
- 자동 광고보다 수동 배치 (예측 가능)

---

## §8. Next.js 특화 패턴 (본 프로젝트)

```tsx
// 1. next/image 필수
import Image from 'next/image';
<Image src="/hero.webp" alt="..." width={1200} height={600} priority />

// 2. next/font 필수
import { Pretendard } from 'next/font/local';

// 3. next/script 전략
import Script from 'next/script';
<Script
  src="https://pagead2.googlesyndication.com/..."
  strategy="lazyOnload"
/>

// 4. dynamic import (차트)
const Chart = dynamic(() => import('@/components/charts/Line'), {
  ssr: false,
  loading: () => <div style={{ minHeight: 300 }} />,
});

// 5. useTransition (계산 업데이트)
const [isPending, startTransition] = useTransition();
startTransition(() => setResult(calculate(input)));
```

---

## §9. AdSense가 CWV에 주는 영향

### LCP 악화
- 스크립트 동기 로드 → 메인 스레드 블로킹
- **해결**: `strategy="lazyOnload"` 또는 `afterInteractive`

### CLS 악화
- 광고 로드 전후 크기 변화
- **해결**: 부모 요소에 고정 min-height

### INP 악화
- 광고 JS 실행 중 입력 블로킹
- **해결**: idle 시점에 로드

### 측정 시 주의
- 광고 유무에 따라 점수 크게 차이 → 반드시 **프로덕션 환경**에서 측정
- AdSense 승인 전 테스트는 의미 제한적

---

## §10. 연관 지표 (Lighthouse)

| 지표 | 설명 | 목표 |
|---|---|---|
| **FCP** (First Contentful Paint) | 첫 콘텐츠 | < 1.8s |
| **TTI** (Time to Interactive) | 상호작용 가능 | < 3.8s |
| **TBT** (Total Blocking Time) | 블로킹 시간 (INP lab 대체) | < 200ms |
| **Speed Index** | 시각적 진행도 | < 3.4s |
| **TTFB** (Time to First Byte) | 서버 응답 | < 600ms |

---

## §11. 측정 명령 예시

```bash
# Lighthouse CLI
npx lighthouse https://calculatorhost.com/계산기/연봉실수령액 \
  --output=json --output-path=./report.json \
  --chrome-flags="--headless" --preset=desktop

# PageSpeed Insights API
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=..."

# 로컬 개발 중 실시간
# app/layout.tsx에 web-vitals 통합
```

---

## §12. CI 통합 (GitHub Actions)

```yaml
- uses: treosh/lighthouse-ci-action@v10
  with:
    urls: |
      https://staging.calculatorhost.com/
      https://staging.calculatorhost.com/계산기/연봉실수령액
    budgetPath: .lighthouserc.json
```

`.lighthouserc.json`:
```json
{
  "ci": {
    "assert": {
      "assertions": {
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}],
        "interaction-to-next-paint": ["error", {"maxNumericValue": 200}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0.1}]
      }
    }
  }
}
```

---

## §13. 업데이트 로그
- 2026-04-24: 초판 작성
