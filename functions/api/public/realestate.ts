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
 * 4. 키 있음 → 국토부 실거래가 API 호출 (XML 응답 → JSON 변환)
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
  pageNo?: number;
  numOfRows?: number;
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

  const pageNo = url.searchParams.get('pageNo');
  const numOfRows = url.searchParams.get('numOfRows');

  return {
    lawdCd,
    dealYmd: dealYmd ?? undefined,
    pageNo: pageNo ? parseInt(pageNo, 10) : 1,
    numOfRows: numOfRows ? parseInt(numOfRows, 10) : 10,
  };
}

/**
 * XML 응답을 단순 JSON으로 변환
 *
 * 국토부 API 응답 형식:
 * ```xml
 * <?xml version="1.0" encoding="UTF-8"?>
 * <OpenAPI_ServiceResponse>
 *   <cmmMsgHeader>
 *     <successYN>Y</successYN>
 *     <returnAuthMsg>OK</returnAuthMsg>
 *   </cmmMsgHeader>
 *   <cmmSearchConditon>
 *     <pageNo>1</pageNo>
 *     <pageSize>10</pageSize>
 *     <totalCount>127</totalCount>
 *   </cmmSearchConditon>
 *   <item>
 *     <거래금액>450000</거래금액>
 *     <건축년도>2010</건축년도>
 *     <법정동코드>11110</법정동코드>
 *     <전용면적>84.12</전용면적>
 *     <계약년월일>20260430</계약년월일>
 *     <아파트명>테스트아파트</아파트명>
 *     <지번>123-45</지번>
 *     <층>5</층>
 *   </item>
 *   ...
 * </OpenAPI_ServiceResponse>
 * ```
 */
function xmlToJson(xml: string): unknown {
  // 간단한 정규식 기반 파싱 (의존성 최소화 + Edge Runtime 호환)
  const items: Record<string, string | number>[] = [];
  const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g);

  for (const match of itemMatches) {
    const itemXml = match[1];
    if (!itemXml) continue;

    const item: Record<string, string | number> = {};

    // 각 필드 추출 (한글 태그명)
    const fields = [
      ['거래금액', 'dealAmount'],
      ['건축년도', 'buildYear'],
      ['법정동코드', 'lawdCd'],
      ['전용면적', 'areaExclusive'],
      ['계약년월일', 'dealYmd'],
      ['아파트명', 'buildingName'],
      ['지번', 'jibun'],
      ['층', 'floor'],
      ['계약기간', 'contractPeriod'],
      ['거래유형', 'dealType'],
    ] as const;

    for (const [korName, engName] of fields) {
      const regex = new RegExp(`<${korName}>(.*?)</${korName}>`);
      const fieldMatch = itemXml.match(regex);
      if (fieldMatch && fieldMatch[1]) {
        const value = fieldMatch[1].trim();
        // 숫자 필드 변환
        if (engName === 'floor' || engName === 'buildYear') {
          item[engName] = parseInt(value, 10);
        } else {
          item[engName] = value;
        }
      }
    }

    if (Object.keys(item).length > 0) {
      items.push(item);
    }
  }

  // 메타정보 추출
  const pageNoMatch = xml.match(/<pageNo>(\d+)<\/pageNo>/);
  const totalCountMatch = xml.match(/<totalCount>(\d+)<\/totalCount>/);
  const pageSizeMatch = xml.match(/<pageSize>(\d+)<\/pageSize>/);

  return {
    items,
    pageNo: pageNoMatch ? parseInt(pageNoMatch[1]!, 10) : 1,
    totalCount: totalCountMatch ? parseInt(totalCountMatch[1]!, 10) : 0,
    pageSize: pageSizeMatch ? parseInt(pageSizeMatch[1]!, 10) : 10,
  };
}

/**
 * 국토부 실거래가 조회 (API 호출 로직)
 *
 * - 국토부 RTMS Open API 호출
 * - XML 응답을 JSON으로 변환
 * - 에러 처리: 401(키 무효), 429(레이트 리밋), 5xx(서버 오류)
 * - Edge 캐시: 24시간
 */
async function callRtmsApi(
  apiKey: string,
  req: ApiRequest,
): Promise<Response> {
  const apiUrl = new URL(
    'http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev',
  );

  // 파라미터 설정
  apiUrl.searchParams.set('serviceKey', apiKey);
  apiUrl.searchParams.set('LAWD_CD', req.lawdCd);

  if (req.dealYmd) {
    // 거래년월 형식 (YYYYMM)으로 변환
    const ymd = req.dealYmd.slice(0, 6);
    apiUrl.searchParams.set('DEAL_YMD', ymd);
  }

  apiUrl.searchParams.set('pageNo', String(req.pageNo || 1));
  apiUrl.searchParams.set('numOfRows', String(req.numOfRows || 10));

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
          message: '국토부 API 인증키가 유효하지 않습니다.',
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
        `[realestate Function] API 오류 (${response.status}): ${response.statusText}`,
      );
      return new Response(
        JSON.stringify({
          error: 'API error',
          message: '국토부 API 호출 중 오류가 발생했습니다.',
        }),
        {
          status: response.status,
          headers: { 'content-type': 'application/json' },
        },
      );
    }

    // XML 응답 수신
    const xml = await response.text();

    // XML → JSON 변환
    const json = xmlToJson(xml);

    // 응답 반환 (24시간 캐시)
    return new Response(JSON.stringify(json), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=86400', // 24시간
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown error occurred';
    console.error(`[realestate Function] 호출 실패: ${message}`);

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
