/**
 * Cloudflare Pages Functions 미들웨어
 * CORS + 공통 헤더 처리
 */

export const onRequest: PagesFunction = async (context) => {
  const { request, next } = context;
  const url = new URL(request.url);
  // Pages aliases are review/non-canonical hosts. Functions may bypass _headers,
  // so enforce preview privacy and indexing policy on the response as well.
  const isPreview =
    url.hostname === 'calculatorhost.pages.dev' ||
    url.hostname.endsWith('.calculatorhost.pages.dev');
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

  // 다음 핸들러 실행
  const response = await next();

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

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: finalHeaders,
  });
};
