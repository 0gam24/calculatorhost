// daily-topic-pool.mjs unit tests.
// 2026-09-30 동결: 수요 검증 없는 토픽 풀이라 자동발행이 중단됐다.
// 루틴이나 백업 워크플로가 다시 켜져도 풀에서 토픽이 나오면 안 된다.
import { describe, expect, it } from 'vitest';
import {
  DAILY_TOPIC_POOL,
  POOL_FROZEN,
  pickDailyTopic,
} from '../../../scripts/daily-topic-pool.mjs';

describe('daily-topic-pool 동결', () => {
  it('POOL_FROZEN 이 true 로 export 된다', () => {
    expect(POOL_FROZEN).toBe(true);
  });

  it('동결 상태에서는 미발행 토픽이 남아 있어도 null 을 반환한다', () => {
    expect(DAILY_TOPIC_POOL.length).toBeGreaterThan(0);
    expect(pickDailyTopic({ existingSlugs: new Set() })).toBeNull();
  });
});
