/**
 * Web Vitals → GA4 송신 헬퍼
 *
 * Core Web Vitals(LCP, INP, CLS, FCP, TTFB)을 Google Analytics 4 커스텀 이벤트로 전송.
 * - Field data 수집으로 Search Console CWV 리포트와 대응
 * - 부작용 가드: GA 미설정 시 no-op
 * - 의존성: Next.js 15 의 `useReportWebVitals` 가 내부적으로 `web-vitals` 를 번들 — 별도 패키지 불필요.
 */

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

export interface WebVitalMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  rating?: 'good' | 'needs-improvement' | 'poor';
  navigationType?: string;
}

/**
 * Web Vitals 지표를 GA4 event 로 송신.
 * useReportWebVitals 콜백에서 호출.
 */
export function sendWebVitalToGA4(metric: WebVitalMetric): void {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  try {
    window.gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.value),
      metric_id: metric.name,
      metric_value: Math.round(metric.value * 100) / 100,
      metric_delta: Math.round(metric.delta * 100) / 100,
      metric_rating: metric.rating ?? 'unknown',
      navigate_type: metric.navigationType ?? 'unknown',
      non_interaction: true,
    });
  } catch {
    // 송신 실패는 콘솔 오염 방지를 위해 조용히 무시
  }
}
