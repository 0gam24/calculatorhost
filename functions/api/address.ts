/**
 * 도로명주소 자동완성 API 프록시
 * GET /api/address?q={검색어}
 *
 * 행안부 도로명주소 API를 프록시하고 캐시·레이트리밋 적용
 */

import { getCached } from '../_utils/cache';
import { checkAndIncrementCounter, getDailyKey } from '../_utils/rate-limit';
import { errorResponse, rateLimitResponse, successResponse } from '../_utils/response';

export interface AddressResult {
  roadAddr: string; // 도로명주소
  jibunAddr: string; // 지번주소
  zipNo: string; // 우편번호
  bdNm: string; // 건물명
  sigungu: string; // 시·군·구
}

export interface AddressResponse {
  query: string;
  results: AddressResult[];
  cached: boolean;
}

const API_RATE_LIMIT = 8000; // 일 8,000회 (무료 10,000회의 80%)
const CACHE_TTL = 21600; // 6시간 (주소는 자주 안 바뀜)

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const url = new URL(request.url);
  const query = url.searchParams.get('q')?.trim();

  // 유효성 검사
  if (!query || query.length < 2) {
    return errorResponse('invalid_query', '검색어는 최소 2글자 이상이어야 합니다.', 400);
  }

  // 레이트 리밋 확인
  const rateLimitKey = getDailyKey('address_api');
  const rateLimitCheck = await checkAndIncrementCounter(
    context.env.RATE_LIMIT_KV,
    rateLimitKey,
    API_RATE_LIMIT,
  );

  if (!rateLimitCheck.allowed) {
    return rateLimitResponse(86400); // 24시간 후 재시도
  }

  try {
    const cacheKey = `address:${query}`;
    const result = await getCached(
      cacheKey,
      CACHE_TTL,
      async () => {
        return await fetchFromJusoApi(query, context.env.JUSO_API_KEY);
      },
    );

    const response: AddressResponse = {
      query,
      results: result.data,
      cached: result.cached,
    };

    return successResponse(response, result.cached);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('[address] API fetch failed:', errorMsg);
    return errorResponse('api_error', '주소 검색에 실패했습니다. 다시 시도해주세요.', 500);
  }
};

/**
 * 행안부 도로명주소 API 호출
 * https://business.juso.go.kr/addrlink/addrLinkApi.do
 */
async function fetchFromJusoApi(query: string, apiKey?: string): Promise<AddressResult[]> {
  if (!apiKey) {
    console.warn('[address] JUSO_API_KEY not configured');
    return [];
  }

  try {
    // 행안부 API 호출
    const params = new URLSearchParams({
      confmKey: apiKey,
      currentPage: '1',
      countPerPage: '10',
      keyword: query,
      resultType: 'json',
    });

    const res = await fetch(
      `https://business.juso.go.kr/addrlink/addrLinkApi.do?${params}`,
    );

    if (!res.ok) {
      throw new Error(`JUSO API returned ${res.status}`);
    }

    const data = await res.json() as JusoApiResponse;

    // 응답 파싱
    if (data.results?.common?.totalCount === 0) {
      return [];
    }

    return (data.results?.juso || []).slice(0, 10).map((item: JusoItem) => ({
      roadAddr: item.roadAddr || '',
      jibunAddr: item.jibunAddr || '',
      zipNo: item.zipNo || '',
      bdNm: item.bdNm || '',
      sigungu: item.sigungu || '',
    }));
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('[address] JUSO API failed:', errorMsg);
    throw error;
  }
}

// JUSO API 응답 타입
interface JusoItem {
  roadAddr?: string;
  jibunAddr?: string;
  zipNo?: string;
  bdNm?: string;
  sigungu?: string;
}

interface JusoApiResponse {
  results?: {
    common?: {
      totalCount: number;
    };
    juso?: JusoItem[];
  };
}
