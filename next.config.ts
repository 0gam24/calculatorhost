import type { NextConfig } from 'next';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import bundleAnalyzer from '@next/bundle-analyzer';

/**
 * .my 파일이 있으면 자동으로 process.env 에 주입 (Next.js 빌드 타임).
 * - .env.local 작성 불필요 — 사용자는 .my 한 곳만 관리
 * - 이미 process.env 에 있는 키는 덮어쓰지 X (CI/CD·Cloudflare Pages 환경변수 우선)
 * - .my 가 없으면 조용히 무시 (배포 환경 fallback)
 * - 키 값은 콘솔에 절대 출력 X
 */
(() => {
  try {
    const myPath = resolve(process.cwd(), '.my');
    if (!existsSync(myPath)) return;
    const content = readFileSync(myPath, 'utf8');
    let loaded = 0;
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const eq = line.indexOf('=');
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      const value = line.slice(eq + 1).trim();
      if (!key || !value) continue;
      if (process.env[key]) continue; // 시스템 환경변수 우선
      process.env[key] = value;
      loaded++;
    }
    if (loaded > 0) console.log(`[next.config] .my 에서 ${loaded}개 키 자동 로드`);
  } catch {
    /* 조용히 무시 */
  }
})();

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
  experimental: {
    // Critical CSS 자동 인라이닝 — render-blocking CSS 9.6KB / 150ms 절감 목표.
    // 빌드 타임에 above-the-fold CSS 만 추출해 <head> 인라인. 나머지는 lazy load.
    optimizeCss: true,
    // 트리쉐이킹 강화 — recharts·next/link 등 거대 패키지에서 사용 외 코드 제거.
    optimizePackageImports: ['recharts'],
  },
};

// 번들 분석기 — `ANALYZE=true npm run build` 로만 활성화. 일반 빌드에는 영향 X.
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

export default withBundleAnalyzer(nextConfig);
