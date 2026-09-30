import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

// Build uses reviewed repository data and the environment supplied by the host.
// Private .my files are never read implicitly during a build. Data synchronization
// remains a separate, explicitly invoked maintenance command.

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 정적 수출 + 한글 경로 + 임의 정적 서버 조합에서 index.html 매핑 안정성을 위해 true.
  // Cloudflare Pages도 동일하게 동작.
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // 빌드 산출물 최적화 (PageSpeed 점수 영향)
  // ⚠ optimizeCss(critters)는 output: 'export' 환경에서 회귀 발생(Style & Layout +526ms,
  //   TBT +270ms 측정됨, 2026-05-03). CSS 인라이닝이 일어나지 않는 채 critters 후처리만
  //   추가되어 부작용 → 비활성화. 추후 next-on-pages 어댑터 도입 시 재검토.
  experimental: {
    // 트리쉐이킹 강화 — recharts 등 거대 패키지에서 사용 외 코드 제거.
    optimizePackageImports: ['recharts'],
  },
};

// 번들 분석기 — `ANALYZE=true npm run build` 로만 활성화. 일반 빌드에는 영향 X.
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

export default withBundleAnalyzer(nextConfig);
