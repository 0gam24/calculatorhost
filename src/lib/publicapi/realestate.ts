/**
 * 국토부 실거래가 API 클라이언트
 *
 * 동작:
 * - 프로덕션: `/api/public/realestate` Cloudflare Pages Function 프록시 호출
 * - 개발: 키 미설정 시 모의 데이터 반환 (무한 로드 방지)
 *
 * 특징:
 * - zod 스키마로 응답 검증
 * - 네트워크 에러 시 빈 배열 반환 (UX 우선)
 * - 타임아웃: 5초
 */

import { z } from 'zod';
import { RtmsApartmentTrade, RtmsApartmentTradeSchema } from './types';

interface RealestateClientOptions {
  lawdCd: string; // 법정동코드 (5자리)
  dealYmd?: string; // 거래년월일 (YYYYMMDD) — 미설정 시 최근 3개월
}

/**
 * 모의 데이터 (키 미설정 시 반환)
 *
 * 개발 환경에서 API 키 미설정 → 503 대신 모의 데이터로 테스트 가능
 */
function getMockData(): RtmsApartmentTrade[] {
  return [
    {
      dealAmount: '450000',
      dealYmd: '20260430',
      lawdCd: '11110',
      floor: 5,
      areaExclusive: '84.12',
      buildingName: '테스트아파트1',
      dealType: '매매',
    },
    {
      dealAmount: '520000',
      dealYmd: '20260415',
      lawdCd: '11110',
      floor: 12,
      areaExclusive: '102.34',
      buildingName: '테스트아파트2',
      dealType: '매매',
    },
    {
      dealAmount: '380000',
      dealYmd: '20260401',
      lawdCd: '11110',
      floor: 3,
      areaExclusive: '59.85',
      buildingName: '테스트아파트3',
      dealType: '매매',
    },
  ];
}

/**
 * 아파트 매매 거래 조회
 *
 * @param options.lawdCd 법정동코드 (예: "11110" = 종로구)
 * @param options.dealYmd 거래년월일 (예: "20260430") — 미설정 시 최근 거래
 * @returns 거래 목록 (파싱 실패 시 빈 배열)
 *
 * @example
 * const trades = await getRtmsApartmentTrade({ lawdCd: '11110' });
 * trades.forEach(t => console.log(`${t.dealAmount}만원, ${t.areaExclusive}㎡`));
 */
export async function getRtmsApartmentTrade(
  options: RealestateClientOptions,
): Promise<RtmsApartmentTrade[]> {
  const { lawdCd, dealYmd } = options;

  // 입력값 검증
  if (!/^\d{5}$/.test(lawdCd)) {
    console.warn(`[publicapi/realestate] 유효하지 않은 lawdCd: ${lawdCd}`);
    return [];
  }

  if (dealYmd && !/^\d{8}$/.test(dealYmd)) {
    console.warn(`[publicapi/realestate] 유효하지 않은 dealYmd: ${dealYmd}`);
    return [];
  }

  try {
    // Cloudflare Pages Function 프록시 호출
    const searchParams = new URLSearchParams({
      lawdCd,
      ...(dealYmd && { dealYmd }),
    });

    const response = await fetch(`/api/public/realestate?${searchParams}`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000), // 5초 타임아웃
    });

    // 키 미설정 상태 (503)
    if (response.status === 503) {
      console.info(
        '[publicapi/realestate] PUBLIC_DATA_KEY 미설정. 모의 데이터 반환.',
      );
      return getMockData().filter((t) => t.lawdCd === lawdCd);
    }

    if (!response.ok) {
      console.error(
        `[publicapi/realestate] API 에러 (${response.status}): ${response.statusText}`,
      );
      return [];
    }

    const data = await response.json();

    // zod 검증
    const validated = z.array(RtmsApartmentTradeSchema).parse(data);
    return validated;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('[publicapi/realestate] 응답 스키마 검증 실패:', error);
    } else if (error instanceof Error) {
      console.error(
        '[publicapi/realestate] 네트워크 에러 또는 타임아웃:',
        error.message,
      );
    }
    return [];
  }
}

/**
 * 법정동코드 → 시군구명 변환 (오프라인 매핑 테이블)
 *
 * 실제 운영: `scripts/sync-public-data.mjs`에서 JUSO API로 전체 테이블 생성.
 * 초기값: 수도권 주요 지역만 하드코딩.
 */
const LAWD_CODE_MAP: Record<string, string> = {
  '11110': '서울시 종로구',
  '11140': '서울시 중구',
  '11170': '서울시 용산구',
  '11305': '서울시 강남구',
  '41113': '경기도 수원시 장안구',
  '48110': '인천시 남구',
};

export function getLawdName(lawdCd: string): string {
  return LAWD_CODE_MAP[lawdCd] || `알 수 없음 (${lawdCd})`;
}
