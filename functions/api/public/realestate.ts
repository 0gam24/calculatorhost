/**
 * Cloudflare Pages Function — 국토부 실거래가 API 프록시
 *
 * 목적:
 * - 브라우저에서 직접 국토부 API 호출 방지 (CORS 문제 + 키 노출)
 * - 엣지에서 API 키 주입 후 중계
 *
 * 동작:
 * 1. 클라이언트: /api/public/realestate?lawdCd=11110&dealYmd=20260430 호출
 * 2. Functions: PUBLIC_DATA_KEY 환경변수에서 키 읽기
 * 3. 키 미설정 → 503 "API key not configured"
 * 4. 키 있음 → 국토부 실거래가 API 호출 (구현 예정)
 * 5. 응답: JSON으로 변환 후 반환
 *
 * TypeScript strict 호환 필수.
 */

// Cloudflare Pages Function 형 — workers-types 의 Response 와 lib.dom Response 가
// 충돌하여 PagesFunction<Env> 사용 시 webSocket 필드 누락 에러 발생.
// 따라서 이 파일에서는 표준 lib.dom Response 만 사용하고 함수 시그니처는 직접 정의.
interface Env {
  PUBLIC_DATA_KEY?: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

interface ApiRequest {
  lawdCd: string;
  dealYmd?: string;
}

/**
 * 쿼리 파라미터 검증
 */
function validateRequest(url: URL): ApiRequest | null {
  const lawdCd = url.searchParams.get('lawdCd');

  if (!lawdCd || !/^\d{5}$/.test(lawdCd)) {
    return null;
  }

  const dealYmd = url.searchParams.get('dealYmd');
  if (dealYmd && !/^\d{8}$/.test(dealYmd)) {
    return null;
  }

  return {
    lawdCd,
    dealYmd: dealYmd ?? undefined,
  };
}

/**
 * 국토부 실거래가 조회 (API 호출 로직)
 *
 * TODO: PUBLIC_DATA_KEY 발급 후 구현
 * - 국토부 RTMS Open API 호출
 * - XML 응답을 JSON으로 변환
 * - 에러 처리
 */
async function callRtmsApi(
  apiKey: string,
  req: ApiRequest,
): Promise<Response> {
  const apiUrl = new URL('http://api.example.com/v1/rtms');
  apiUrl.searchParams.set('serviceKey', apiKey);
  apiUrl.searchParams.set('LAWD_CD', req.lawdCd);

  if (req.dealYmd) {
    apiUrl.searchParams.set('DEAL_YMD', req.dealYmd);
  }

  // TODO: 실제 호출 구현
  // const response = await fetch(apiUrl.toString());
  // const xml = await response.text();
  // const json = xmlToJson(xml);

  console.log(`[realestate Function] 준비 중: ${apiUrl.toString()}`);
  return new Response(JSON.stringify({ error: 'Not yet implemented' }), {
    status: 501,
    headers: { 'content-type': 'application/json' },
  });
}

/**
 * 메인 핸들러
 */
const handler = async (context: PagesContext): Promise<Response> => {
  const { request, env } = context;

  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'access-control-allow-origin': 'https://calculatorhost.com',
        'access-control-allow-methods': 'GET, OPTIONS',
        'access-control-allow-headers': 'content-type',
      },
    });
  }

  // GET만 허용
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'content-type': 'application/json' },
    });
  }

  const url = new URL(request.url);
  const apiRequest = validateRequest(url);

  // 쿼리 검증 실패
  if (!apiRequest) {
    return new Response(
      JSON.stringify({
        error: 'Invalid query: lawdCd (5 digits) required',
      }),
      {
        status: 400,
        headers: { 'content-type': 'application/json' },
      },
    );
  }

  // API 키 미설정
  if (!env.PUBLIC_DATA_KEY) {
    return new Response(
      JSON.stringify({
        error: 'API key not configured',
        message: '운영자가 PUBLIC_DATA_KEY를 등록해야 합니다.',
      }),
      {
        status: 503,
        headers: {
          'content-type': 'application/json',
          'retry-after': '3600',
        },
      },
    );
  }

  // API 호출
  const response = await callRtmsApi(env.PUBLIC_DATA_KEY, apiRequest);

  // CORS 헤더 추가
  const corsHeaders = new Headers(response.headers);
  corsHeaders.set('access-control-allow-origin', 'https://calculatorhost.com');
  corsHeaders.set('access-control-allow-credentials', 'true');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: corsHeaders,
  });
};

export default handler;
