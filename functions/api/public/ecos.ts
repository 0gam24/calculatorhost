/**
 * Cloudflare Pages Function — ECOS API 프록시 (한국은행 경제통계).
 *
 * 목적:
 * - 브라우저 직접 호출 방지 (CORS + 키 노출)
 * - 엣지에서 ECOS_API_KEY 주입 후 중계
 *
 * 사용:
 *   /api/public/ecos?stat=722Y001&start=202401&end=202612&period=M
 *   - stat: 통계코드 (필수, 예: 722Y001 한국은행 기준금리)
 *   - period: D | M | Q | Y (기본 M)
 *   - start, end: YYYYMM 또는 YYYYMMDD
 *
 * 빌드 시점 sync-public-data 가 정적 JSON 으로도 같은 데이터를 캐시하지만,
 * 실시간 차트·실험 페이지에서 이 프록시로 보충.
 */

interface Env {
  ECOS_API_KEY?: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

interface EcosRequest {
  stat: string;
  period: 'D' | 'M' | 'Q' | 'Y';
  start: string;
  end: string;
}

const STAT_CODE_RE = /^[A-Z0-9]{3,12}$/;
const DATE_RE = /^\d{6,8}$/;

function validateRequest(url: URL): EcosRequest | null {
  const stat = url.searchParams.get('stat')?.trim() ?? '';
  if (!STAT_CODE_RE.test(stat)) return null;

  const periodRaw = (url.searchParams.get('period') ?? 'M').toUpperCase();
  if (!['D', 'M', 'Q', 'Y'].includes(periodRaw)) return null;
  const period = periodRaw as EcosRequest['period'];

  const start = (url.searchParams.get('start') ?? '').trim();
  const end = (url.searchParams.get('end') ?? '').trim();
  if (!DATE_RE.test(start) || !DATE_RE.test(end)) return null;

  return { stat, period, start, end };
}

async function callEcosApi(apiKey: string, req: EcosRequest): Promise<Response> {
  // ECOS REST: /api/StatisticSearch/{KEY}/json/kr/1/100/{stat}/{period}/{start}/{end}
  const apiUrl = `https://ecos.bok.or.kr/api/StatisticSearch/${apiKey}/json/kr/1/100/${req.stat}/${req.period}/${req.start}/${req.end}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      signal: AbortSignal.timeout(10000),
    });

    if (response.status === 401) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized', message: 'ECOS 인증키 무효' }),
        { status: 401, headers: { 'content-type': 'application/json' } },
      );
    }
    if (response.status === 429) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded' }),
        {
          status: 429,
          headers: { 'content-type': 'application/json', 'retry-after': '3600' },
        },
      );
    }
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: 'API error', status: response.status }),
        { status: response.status, headers: { 'content-type': 'application/json' } },
      );
    }

    const json = await response.json();

    return new Response(JSON.stringify(json), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        // ECOS 통계는 일/월 단위라 6시간 캐시
        'cache-control': 'public, max-age=21600',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Network error', message }),
      { status: 500, headers: { 'content-type': 'application/json' } },
    );
  }
}

const handler = async (context: PagesContext): Promise<Response> => {
  const { request, env } = context;

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

  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'content-type': 'application/json' },
    });
  }

  const url = new URL(request.url);
  const apiRequest = validateRequest(url);

  if (!apiRequest) {
    return new Response(
      JSON.stringify({
        error: 'Invalid query',
        message:
          'stat (코드 3-12자), period (D|M|Q|Y), start/end (YYYYMM 또는 YYYYMMDD) 필요',
      }),
      { status: 400, headers: { 'content-type': 'application/json' } },
    );
  }

  if (!env.ECOS_API_KEY) {
    return new Response(
      JSON.stringify({
        error: 'API key not configured',
        message: '운영자가 ECOS_API_KEY 환경변수를 등록해야 합니다.',
      }),
      {
        status: 503,
        headers: { 'content-type': 'application/json', 'retry-after': '3600' },
      },
    );
  }

  const response = await callEcosApi(env.ECOS_API_KEY, apiRequest);

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
