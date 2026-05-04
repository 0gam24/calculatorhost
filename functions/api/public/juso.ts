/**
 * Cloudflare Pages Function — JUSO API 프록시 (행정안전부 도로명주소)
 *
 * 목적:
 * - 브라우저에서 직접 JUSO API 호출 방지 (CORS 문제 + 키 노출)
 * - 엣지에서 API 키 주입 후 중계
 *
 * 동작:
 * 1. 클라이언트: /api/public/juso?keyword=종로&currentPage=1 호출
 * 2. Functions: JUSO_API_KEY 환경변수에서 키 읽기
 * 3. 키 미설정 → 503 "API key not configured"
 * 4. 키 있음 → JUSO API 호출 (JSON 응답 바로 반환)
 * 5. 응답: JSON 배열로 검증 후 반환
 *
 * TypeScript strict 호환 필수.
 *
 * 참고: RTMS와 달리 JUSO는 JSON 응답이므로 XML 변환 불필요.
 */

// Cloudflare Pages Function 형 — workers-types 의 Response 와 lib.dom Response 가
// 충돌하여 PagesFunction<Env> 사용 시 webSocket 필드 누락 에러 발생.
// 따라서 이 파일에서는 표준 lib.dom Response 만 사용하고 함수 시그니처는 직접 정의.
interface Env {
  JUSO_API_KEY?: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

interface JusoApiRequest {
  keyword: string;
  currentPage: number;
}

/**
 * 쿼리 파라미터 검증
 */
function validateRequest(url: URL): JusoApiRequest | null {
  const keyword = url.searchParams.get('keyword');

  if (!keyword || keyword.length < 2) {
    return null;
  }

  const currentPageStr = url.searchParams.get('currentPage');
  const currentPage = currentPageStr ? parseInt(currentPageStr, 10) : 1;

  if (isNaN(currentPage) || currentPage < 1) {
    return null;
  }

  return {
    keyword,
    currentPage,
  };
}

/**
 * JUSO API 호출
 *
 * 엔드포인트: https://business.juso.go.kr/addrlink/addrLinkApi.do
 * 파라미터:
 *   - confmKey: API 인증키 (필수)
 *   - keyword: 검색어 (필수)
 *   - currentPage: 페이지번호 (기본값: 1)
 *   - countPerPage: 페이지당 건수 (기본값: 10)
 *   - resultType: 응답 형식 (기본값: json)
 *
 * 응답 형식:
 * {
 *   "results": {
 *     "juso": [
 *       { "roadAddr": "...", "zipNo": "...", ... },
 *       ...
 *     ],
 *     "common": {
 *       "totalCount": 1234,
 *       "currentPage": 1,
 *       "countPerPage": 10,
 *       "countRecords": 10,
 *       "errorCode": "0",
 *       "errorMessage": "정상"
 *     }
 *   }
 * }
 */
async function callJusoApi(
  apiKey: string,
  req: JusoApiRequest,
): Promise<Response> {
  const apiUrl = new URL('https://business.juso.go.kr/addrlink/addrLinkApi.do');

  // 파라미터 설정
  apiUrl.searchParams.set('confmKey', apiKey);
  apiUrl.searchParams.set('keyword', req.keyword);
  apiUrl.searchParams.set('currentPage', String(req.currentPage));
  apiUrl.searchParams.set('countPerPage', '10');
  apiUrl.searchParams.set('resultType', 'json');

  try {
    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      signal: AbortSignal.timeout(10000), // 10초 타임아웃
    });

    // 인증키 오류
    if (response.status === 401) {
      return new Response(
        JSON.stringify({
          error: 'Unauthorized',
          message: 'JUSO API 인증키가 유효하지 않습니다.',
        }),
        {
          status: 401,
          headers: { 'content-type': 'application/json' },
        },
      );
    }

    // 레이트 리밋
    if (response.status === 429) {
      return new Response(
        JSON.stringify({
          error: 'Rate limit exceeded',
          message: '호출 횟수 제한을 초과했습니다. 나중에 다시 시도하세요.',
        }),
        {
          status: 429,
          headers: {
            'content-type': 'application/json',
            'retry-after': '3600',
          },
        },
      );
    }

    // 서버 오류
    if (!response.ok) {
      console.error(
        `[juso Function] API 오류 (${response.status}): ${response.statusText}`,
      );
      return new Response(
        JSON.stringify({
          error: 'API error',
          message: 'JUSO API 호출 중 오류가 발생했습니다.',
        }),
        {
          status: response.status,
          headers: { 'content-type': 'application/json' },
        },
      );
    }

    // JSON 응답 수신
    const json = await response.json();

    // 응답 반환 (1시간 캐시)
    return new Response(JSON.stringify(json), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=3600', // 1시간 (키워드 검색은 자주 변경)
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown error occurred';
    console.error(`[juso Function] 호출 실패: ${message}`);

    return new Response(
      JSON.stringify({
        error: 'Network error',
        message: '네트워크 오류가 발생했습니다. 나중에 다시 시도하세요.',
      }),
      {
        status: 500,
        headers: { 'content-type': 'application/json' },
      },
    );
  }
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
        error: 'Invalid query: keyword (≥2 chars) and currentPage (≥1) required',
      }),
      {
        status: 400,
        headers: { 'content-type': 'application/json' },
      },
    );
  }

  // API 키 미설정
  if (!env.JUSO_API_KEY) {
    return new Response(
      JSON.stringify({
        error: 'API key not configured',
        message: '운영자가 JUSO_API_KEY를 등록해야 합니다.',
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
  const response = await callJusoApi(env.JUSO_API_KEY, apiRequest);

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
