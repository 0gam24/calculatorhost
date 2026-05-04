'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { sendWebVitalToGA4 } from '@/lib/analytics/web-vitals';

/**
 * Web Vitals → GA4 송신 클라이언트 컴포넌트.
 * Next.js 15 의 useReportWebVitals 가 LCP/INP/CLS/FCP/TTFB 를 자동 수집 → GA4 로 전달.
 * root layout 에 배치하여 모든 페이지에서 Field CWV 데이터 수집.
 */
export function WebVitalsReporter(): null {
  useReportWebVitals(sendWebVitalToGA4);
  return null;
}
