/**
 * Cloudflare Pages Functions 미들웨어
 * CORS + 공통 헤더 처리
 */

const CANONICAL_HOST = 'calculatorhost.com';
// 같은 내용을 내는 다른 호스트. 대표 주소로 301 (네이버 가이드 01-02 웹 사이트를 만들 때,
// 02-02 검색 친화적인 URL: www 유무는 한쪽으로, 호스팅 기본 도메인 대신 고유 도메인).
const DUPLICATE_HOSTS = new Set(['www.calculatorhost.com', 'calculatorhost.pages.dev']);
// 정적 export 가 만든 "페이지 없음" 화면 주소. 200 이 아니라 404 로 응답 (소프트 404 금지, 02-03).
const NOT_FOUND_PATHS = new Set(['/404', '/404/', '/404.html']);
// 옛 WordPress 시절 주소(/?p=123, /?s=검색어 …). 지금 사이트는 이 쿼리를 쓰지 않는데 홈 화면이 200 으로 나가
// 로봇이 "지워졌다"를 알 수 없었다. 홈 경로에서만 404 로 답한다 (네이버 12-03 웹 검색 제외, 01-05 사이트 이전).
const LEGACY_WP_QUERY_KEYS = ['p', 'page_id', 's', 'feed', 'cat', 'tag', 'attachment_id', 'author', 'm'];

export const onRequest: PagesFunction = async (context) => {
  const { request, next } = context;
  const url = new URL(request.url);
  if (DUPLICATE_HOSTS.has(url.hostname)) {
    url.protocol = 'https:';
    url.hostname = CANONICAL_HOST;
    url.port = '';
    return Response.redirect(url.toString(), 301);
  }
  // Pages aliases are review/non-canonical hosts. Functions may bypass _headers,
  // so enforce preview privacy and indexing policy on the response as well.
  const isPreview = url.hostname.endsWith('.calculatorhost.pages.dev');
  const previewCsp =
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: blob:; connect-src 'self'; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'";
  if (isPreview && url.pathname.startsWith('/api/')) {
    return new Response(
      JSON.stringify({ error: 'External data requests are disabled in this preview.' }),
      {
        status: 503,
        headers: {
          'Content-Type': 'application/json',
          'X-Robots-Tag': 'noindex, nofollow, noarchive',
          'Content-Security-Policy': previewCsp,
        },
      },
    );
  }

  // 로컬 개발 vs 프로덕션 CORS 설정
  const isDevelopment = url.hostname === 'localhost' || url.hostname.startsWith('127.');
  const allowedOrigin = isDevelopment ? '*' : 'https://calculatorhost.com';

  const headers = new Headers({
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Max-Age': '86400',
  });

  // OPTIONS preflight 응답
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  // 다음 핸들러 실행. 옛 WordPress 쿼리 주소는 "페이지 없음" 화면을 가져와 404 로 보낸다
  const legacyWpQuery =
    url.pathname === '/' && LEGACY_WP_QUERY_KEYS.some((key) => url.searchParams.has(key));
  const response = legacyWpQuery ? await next(`${url.origin}/404/`) : await next();

  // 응답 헤더에 CORS + 보안 헤더 병합
  const finalHeaders = new Headers(response.headers);
  headers.forEach((value, key) => {
    finalHeaders.set(key, value);
  });

  // 추가 보안 헤더
  finalHeaders.set('X-Content-Type-Options', 'nosniff');
  finalHeaders.set('X-Frame-Options', 'DENY');
  if (isPreview) {
    finalHeaders.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    finalHeaders.set('Content-Security-Policy', previewCsp);
  }

  if (legacyWpQuery || NOT_FOUND_PATHS.has(url.pathname)) {
    return new Response(response.body, { status: 404, statusText: 'Not Found', headers: finalHeaders });
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: finalHeaders,
  });
};
