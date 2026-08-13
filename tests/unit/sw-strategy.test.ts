// Service Worker 캐시 전략 회귀 가드.
//
// 2026-08-13 실제 장애: HTML 을 stale-while-revalidate 로 서빙해, 첫 진입 시
// 몇 달 전 캐시된 화면(리브랜딩 이전 테마·이모지 아이콘)이 그대로 노출됐다.
// 사이트 안에서 한 번 이동했다 돌아오면 최신 화면이 나와서 "간헐적 버그"처럼 보였다.
//
// 같은 실수가 다시 들어오지 못하게 sw.js 의 전략을 고정한다.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const SW = readFileSync(resolve(process.cwd(), 'public/sw.js'), 'utf8');

describe('sw.js 캐시 전략', () => {
  it('페이지 이동(HTML)은 네트워크 우선으로 처리한다', () => {
    // isNavigation 분기가 networkFirst 로 연결돼야 한다.
    const navigationBranch = SW.match(
      /if \(isNavigation\(request\)\) \{[\s\S]*?\}/,
    )?.[0];
    expect(navigationBranch, 'isNavigation 분기가 없음').toBeTruthy();
    expect(navigationBranch).toContain('networkFirst');
    expect(navigationBranch).not.toContain('staleWhileRevalidate');
    expect(navigationBranch).not.toContain('cacheFirst');
  });

  it('networkFirst 는 fetch 를 먼저 시도하고 실패 시에만 캐시로 내려간다', () => {
    const fn = SW.match(/function networkFirst\(request\) \{[\s\S]*?\n\}/)?.[0];
    expect(fn, 'networkFirst 함수가 없음').toBeTruthy();
    // fetch 호출이 caches.match 보다 앞서야 한다
    expect(fn!.indexOf('fetch(request)')).toBeGreaterThan(-1);
    expect(fn!.indexOf('fetch(request)')).toBeLessThan(fn!.indexOf('caches.match'));
  });

  it('네비게이션 이외의 요청에만 stale-while-revalidate 를 쓴다', () => {
    // isNavigation 분기가 swr 분기보다 먼저 와야 HTML 이 swr 로 새지 않는다.
    expect(SW.indexOf('isNavigation(request)')).toBeLessThan(
      SW.indexOf('staleWhileRevalidate(request, event)'),
    );
  });

  it('해시된 불변 자산만 cache-first 로 처리한다', () => {
    const fn = SW.match(/function isImmutableAsset\(url\) \{[\s\S]*?\n\}/)?.[0];
    expect(fn).toContain('/_next/static/');
    expect(fn).toContain('/fonts/');
  });

  it('캐시 버전이 장애 당시 값(2026-05-03)에 머물러 있지 않다', () => {
    const version = SW.match(/const VERSION = '([^']+)'/)?.[1];
    expect(version).toBeTruthy();
    expect(version).not.toBe('2026-05-03');
    expect(version).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('활성화 시 이전 버전 캐시를 지운다', () => {
    expect(SW).toContain('caches.delete');
    expect(SW).toContain('self.clients.claim()');
    expect(SW).toContain('self.skipWaiting()');
  });
});

describe('_headers', () => {
  const HEADERS = readFileSync(resolve(process.cwd(), 'public/_headers'), 'utf8');

  it('sw.js 는 캐시하지 않아야 새 워커가 즉시 감지된다', () => {
    const block = HEADERS.match(/^\/sw\.js\s*\n(?:\s{2}.*\n)+/m)?.[0];
    expect(block, '/sw.js 헤더 블록이 없음').toBeTruthy();
    expect(block!.toLowerCase()).toContain('no-cache');
  });
});
