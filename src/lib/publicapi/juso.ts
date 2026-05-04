/**
 * JUSO API 클라이언트 (행정안전부 도로명주소)
 *
 * 동작:
 * - 프로덕션: `/api/public/juso` Cloudflare Pages Function 프록시 호출
 * - 개발: 키 미설정 시 모의 데이터 반환 (무한 로드 방지)
 *
 * 특징:
 * - zod 스키마로 응답 검증
 * - 네트워크 에러 시 빈 배열 반환 (UX 우선)
 * - 타임아웃: 5초
 * - 검색어 최소 2자 검증
 */

import { z } from 'zod';
import { JusoAddress, JusoAddressSchema } from './types';

interface JusoClientOptions {
  keyword: string; // 검색어 (주소 또는 도로명)
  currentPage?: number; // 페이지 번호 (1부터)
}

/**
 * 모의 데이터 (키 미설정 시 반환)
 *
 * 개발 환경에서 API 키 미설정 → 503 대신 모의 데이터로 테스트 가능
 */
function getMockData(): JusoAddress[] {
  return [
    {
      roadAddr: '서울시 종로구 종로 1',
      roadAddrPart1: '서울시 종로구 종로 1',
      roadAddrPart2: '(청와대)',
      jibunAddr: '서울시 종로구 청운동 1-1',
      zipNo: '03048',
      admCd: '11110',
      rnMgtSn: '1111010100000001',
      bdMgtSn: '11110101001000001',
      bdNm: '청와대',
    },
    {
      roadAddr: '서울시 중구 종로 10',
      roadAddrPart1: '서울시 중구 종로 10',
      roadAddrPart2: '',
      jibunAddr: '서울시 중구 회현동 10-1',
      zipNo: '04532',
      admCd: '11140',
      rnMgtSn: '1114010100000010',
      bdMgtSn: '11140101001000010',
      bdNm: '롯데마트',
    },
    {
      roadAddr: '서울시 강남구 테헤란로 123',
      roadAddrPart1: '서울시 강남구 테헤란로 123',
      roadAddrPart2: '',
      jibunAddr: '서울시 강남구 역삼동 123-1',
      zipNo: '06234',
      admCd: '11305',
      rnMgtSn: '1130510100000123',
      bdMgtSn: '11305101001000123',
      bdNm: '테헤란빌딩',
    },
  ];
}

/**
 * 주소 검색
 *
 * @param options.keyword 검색어 (주소 또는 도로명, 최소 2자)
 * @param options.currentPage 페이지 번호 (기본값: 1)
 * @returns 주소 검색 결과 배열 (파싱 실패 시 빈 배열)
 *
 * @example
 * const results = await searchAddress({ keyword: '종로' });
 * results.forEach(addr => console.log(addr.roadAddr));
 */
export async function searchAddress(
  options: JusoClientOptions,
): Promise<JusoAddress[]> {
  const { keyword, currentPage = 1 } = options;

  // 입력값 검증
  if (!keyword || keyword.length < 2) {
    console.warn(
      `[publicapi/juso] 유효하지 않은 keyword: 최소 2자 필요 (${keyword?.length ?? 0})`,
    );
    return [];
  }

  if (currentPage < 1) {
    console.warn(`[publicapi/juso] 유효하지 않은 currentPage: ${currentPage}`);
    return [];
  }

  try {
    // Cloudflare Pages Function 프록시 호출
    const searchParams = new URLSearchParams({
      keyword,
      currentPage: String(currentPage),
    });

    const response = await fetch(`/api/public/juso?${searchParams}`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000), // 5초 타임아웃
    });

    // 키 미설정 상태 (503)
    if (response.status === 503) {
      console.info(
        '[publicapi/juso] JUSO_API_KEY 미설정. 모의 데이터 반환.',
      );
      // 모의 데이터에서 keyword 필터링
      return getMockData().filter(
        (addr) =>
          addr.roadAddr.includes(keyword) || addr.jibunAddr?.includes(keyword),
      );
    }

    if (!response.ok) {
      console.error(
        `[publicapi/juso] API 에러 (${response.status}): ${response.statusText}`,
      );
      return [];
    }

    const data = await response.json();

    // zod 검증: 배열로 반환된 주소 리스트
    const validated = z.array(JusoAddressSchema).parse(data);
    return validated;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('[publicapi/juso] 응답 스키마 검증 실패:', error);
    } else if (error instanceof Error) {
      console.error(
        '[publicapi/juso] 네트워크 에러 또는 타임아웃:',
        error.message,
      );
    }
    return [];
  }
}

/**
 * 행정동코드(admCd) → 도로명 매핑 (오프라인 캐시)
 *
 * 실제 운영: scripts/sync-public-data.mjs 에서 JUSO API로 전체 테이블 생성.
 * 초기값: 수도권 주요 지역만 하드코딩.
 */
const ADMCD_TO_ROADNAME_MAP: Record<string, string> = {
  '11110': '서울 종로구',
  '11140': '서울 중구',
  '11170': '서울 용산구',
  '11305': '서울 강남구',
  '41113': '경기 수원시 장안구',
  '48110': '인천 남구',
};

export function getRoadNameByAdmCd(admCd: string): string {
  return ADMCD_TO_ROADNAME_MAP[admCd] || `알 수 없음 (${admCd})`;
}
