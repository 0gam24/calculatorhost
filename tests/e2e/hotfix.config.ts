import { defineConfig } from '@playwright/test';
import { localQaOrigin, QA_CHROME_ARGS } from '../support/network-policy';
export default defineConfig({
  testDir: '.',
  testMatch: 'inflation-gift-hotfix.e2e.ts',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  workers: 1,
  retries: 0,
  reporter: [['list'], ['json', { outputFile: '../../artifacts/hotfix-e2e.json' }]],
  use: {
    baseURL: localQaOrigin(process.env.PREVIEW_URL || 'http://localhost:3100'),
    launchOptions: { args: QA_CHROME_ARGS },
    channel: 'chrome',
    headless: true,
    serviceWorkers: 'block',
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 }, timezoneId: 'UTC' } },
    {
      name: 'mobile',
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
        timezoneId: 'Asia/Seoul',
      },
    },
  ],
});
