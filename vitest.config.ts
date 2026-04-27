import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

// 계산 공식 테스트는 순수 함수라 DOM/React 플러그인 불필요 → node 환경.
// 참고: vitest 2.1.x + Node 24 조합에서 "No test suite found" 오류가 재현돼 3.x 로 상향.
export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/unit/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
