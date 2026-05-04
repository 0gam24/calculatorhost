import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

// 계산 공식 테스트는 순수 함수라 DOM/React 플러그인 불필요 → node 환경.
// 참고: vitest 2.1.x + Node 24 조합에서 "No test suite found" 오류가 재현돼 3.x 로 상향.
// 커버리지 게이트는 .claude/rules/yoro-tdd.md 의 임계값을 강제.
export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/unit/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'html'],
      include: [
        'src/lib/tax/**',
        'src/lib/finance/**',
        'src/lib/utils/**',
        'src/lib/seo/**',
      ],
      exclude: [
        '**/*.d.ts',
        '**/index.ts',
      ],
      thresholds: {
        'src/lib/tax/**': { lines: 90, branches: 85, functions: 90, statements: 90 },
        'src/lib/finance/**': { lines: 92, branches: 88, functions: 92, statements: 92 },
        'src/lib/utils/**': { lines: 80, branches: 75, functions: 80, statements: 80 },
        'src/lib/seo/**': { lines: 70, branches: 60, functions: 70, statements: 70 },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
