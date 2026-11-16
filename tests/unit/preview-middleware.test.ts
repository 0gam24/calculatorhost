import { expect, it, vi } from 'vitest';
import { onRequest } from '../../functions/_middleware';

const run = onRequest as unknown as (context: {
  request: Request;
  next: () => Promise<Response>;
}) => Promise<Response>;

it('enforces preview headers even when Functions bypass static _headers', async () => {
  const next = vi.fn(async () => new Response('calculator'));
  const response = await run({
    request: new Request('https://review.calculatorhost.pages.dev/calculator/loan/'),
    next,
  });
  expect(response.headers.get('X-Robots-Tag')).toContain('noindex');
  expect(response.headers.get('Content-Security-Policy')).toContain("connect-src 'self'");
  expect(next).toHaveBeenCalledOnce();
});

it('never reaches external API handlers on a review host', async () => {
  const next = vi.fn(async () => new Response('external'));
  const response = await run({
    request: new Request('https://review.calculatorhost.pages.dev/api/public/ecos'),
    next,
  });
  expect(response.status).toBe(503);
  expect(next).not.toHaveBeenCalled();
});

it('retains production API behavior and does not add preview directives', async () => {
  const next = vi.fn(async () => new Response('production'));
  const response = await run({
    request: new Request('https://calculatorhost.com/api/public/ecos'),
    next,
  });
  expect(await response.text()).toBe('production');
  expect(response.headers.get('X-Robots-Tag')).toBeNull();
  expect(response.headers.get('Content-Security-Policy')).toBeNull();
});

// 네이버 가이드 01-02·02-02: 같은 내용을 여러 호스트로 내지 않는다. 대표 주소로 301.
it.each([
  ['https://www.calculatorhost.com/calculator/loan/?a=1', 'https://calculatorhost.com/calculator/loan/?a=1'],
  ['http://www.calculatorhost.com/', 'https://calculatorhost.com/'],
  ['https://calculatorhost.pages.dev/guide/', 'https://calculatorhost.com/guide/'],
])('redirects duplicate host %s to the canonical host with 301', async (from, to) => {
  const next = vi.fn(async () => new Response('page'));
  const response = await run({ request: new Request(from), next });
  expect(response.status).toBe(301);
  expect(response.headers.get('Location')).toBe(to);
  expect(next).not.toHaveBeenCalled();
});

it('keeps review deployments on their own host (noindex, no redirect)', async () => {
  const next = vi.fn(async () => new Response('review'));
  const response = await run({
    request: new Request('https://abc123.calculatorhost.pages.dev/'),
    next,
  });
  expect(response.status).toBe(200);
  expect(response.headers.get('X-Robots-Tag')).toContain('noindex');
});

// 네이버 가이드 01-02·02-03: "페이지 없음" 화면은 200 이 아니라 404 로 응답한다 (소프트 404 금지).
it.each(['/404', '/404/', '/404.html'])('serves the not-found page at %s with status 404', async (path) => {
  const next = vi.fn(async () => new Response('<h1>페이지를 찾을 수 없습니다</h1>', { status: 200 }));
  const response = await run({ request: new Request(`https://calculatorhost.com${path}`), next });
  expect(response.status).toBe(404);
});

// 네이버 가이드 12-03·01-05: 지운 옛 WordPress 주소(/?p=1, /?s=검색어 등)는 홈 화면이 아니라 404 로 응답한다.
// 광고·분석용 쿼리(utm_*)나 다른 경로는 그대로 둔다.
it.each(['/?p=123', '/?page_id=2', '/?s=test', '/?feed=rss2', '/?cat=3', '/?tag=a', '/?attachment_id=9'])(
  'answers legacy WordPress query %s with 404',
  async (path) => {
    const next = vi.fn(async () => new Response('<h1>페이지를 찾을 수 없습니다</h1>'));
    const response = await run({ request: new Request(`https://calculatorhost.com${path}`), next });
    expect(response.status).toBe(404);
  },
);

it.each(['/?utm_source=naver', '/calculator/salary/?p=1'])('keeps %s as a normal page', async (path) => {
  const next = vi.fn(async () => new Response('page'));
  const response = await run({ request: new Request(`https://calculatorhost.com${path}`), next });
  expect(response.status).toBe(200);
});
