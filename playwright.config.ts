import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      testMatch: /.*\.e2e\.ts$/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile',
      testMatch: /.*\.e2e\.ts$/,
      use: { ...devices['Pixel 7'] },
    },
    {
      // 시각 회귀: 계산기 + 핵심 가이드 8종에 한정.
      // 자동 발행 가이드(/guide/{slug}/)는 시각 회귀 미적용 — 본문 변동성 ↑·CSS
      // 변경 없음·1편당 4 스냅샷 폭증(1년 1500+) 방지. 정책 근거: NETWORK
      // test-runner / lighthouse-profiler 분석 (2026-05-10).
      name: 'visual',
      testMatch:
        /tests[/\\]visual[/\\](salary|loan-limit|capital-gains-tax|acquisition-tax|home|jeonse-deposit-safety|capital-gains-tax-5steps|updates)\.visual\.ts$/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
