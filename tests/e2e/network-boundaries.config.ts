import { defineConfig } from '@playwright/test';
import { localQaOrigin, QA_CHROME_ARGS } from '../support/network-policy';

export default defineConfig({
  testDir: '.',
  testMatch: ['qa-network.e2e.ts', 'adsense.e2e.ts', 'indexing-guard.e2e.ts'],
  workers: 1,
  retries: 0,
  timeout: 60_000,
  reporter: [['list'], ['json', { outputFile: '../../artifacts/network-boundaries.json' }]],
  use: {
    baseURL: localQaOrigin(process.env.PREVIEW_URL || 'http://localhost:3100'),
    channel: 'chrome',
    headless: true,
    serviceWorkers: 'block',
    launchOptions: { args: QA_CHROME_ARGS },
  },
});
