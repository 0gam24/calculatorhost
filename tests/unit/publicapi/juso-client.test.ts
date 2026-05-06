/**
 * JUSO API 클라이언트 + 모의 데이터 동작 검증 테스트
 *
 * 테스트 범위:
 * 1. 입력값 검증 (keyword 최소 2자, currentPage)
 * 2. 503 응답 → 모의 데이터 반환 (keyword 필터링)
 * 3. 200 정상 응답 → zod parse + results.juso 추출
 * 4. 네트워크 에러/타임아웃 → 빈 배열
 * 5. 스키마 검증 실패 → 빈 배열
 * 6. 에러 응답 (결과.common.errorCode) → 빈 배열
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { searchAddress } from '../../../src/lib/publicapi/juso';

// 전역 fetch mock 설정
global.fetch = vi.fn();

describe('searchAddress 클라이언트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('입력값 검증', () => {
    it('keyword 1자 → 빈 배열 반환', async () => {
      const result = await searchAddress({ keyword: '서' });
      expect(result).toEqual([]);
    });

    it('keyword 빈 문자열 → 빈 배열 반환', async () => {
      const result = await searchAddress({ keyword: '' });
      expect(result).toEqual([]);
    });

    it('currentPage < 1 → 빈 배열 반환', async () => {
      const result = await searchAddress({
        keyword: '종로',
        currentPage: 0,
      });
      expect(result).toEqual([]);
    });

    it('유효한 keyword (2자 이상)', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        status: 503,
      });

      const result = await searchAddress({ keyword: '종로' });
      // 503 → 모의 데이터에서 '종로' 포함된 항목 반환
      expect(result.length).toBeGreaterThan(0);
      expect(
        result.some(
          (addr) =>
            addr.roadAddr.includes('종로') || addr.jibunAddr?.includes('종로'),
        ),
      ).toBe(true);
    });
  });

  describe('503 응답 → 모의 데이터 폴백', () => {
    it('키 미설정 (503) → 모의 데이터에서 keyword 필터링', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        status: 503,
      });

      const result = await searchAddress({ keyword: '종로' });

      // 모의 데이터: '종로' 포함된 2개 항목
      expect(result.length).toBe(2);
      expect(result[0]).toMatchObject({
        roadAddr: '서울시 종로구 종로 1',
        admCd: '11110',
        zipNo: '03048',
      });
      expect(result[1]).toMatchObject({
        roadAddr: '서울시 중구 종로 10',
        admCd: '11140',
        zipNo: '04532',
      });
    });

    it('503 + keyword "강남" → 모의 데이터 필터링 반환', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        status: 503,
      });

      const result = await searchAddress({ keyword: '강남' });

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        roadAddr: '서울시 강남구 테헤란로 123',
        admCd: '11305',
        bdNm: '테헤란빌딩',
      });
    });

    it('503 + jibunAddr 검색도 동작 (지번주소 포함 필터링)', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        status: 503,
      });

      const result = await searchAddress({ keyword: '청운동' });

      // 모의 데이터: jibunAddr='청운동' 포함
      expect(result.length).toBe(1);
      expect(result[0]?.jibunAddr).toContain('청운동');
    });

    it('503 + 매칭 없는 keyword → 빈 배열', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        status: 503,
      });

      const result = await searchAddress({ keyword: '대구' });
      expect(result).toEqual([]);
    });

    it('503 + currentPage 파라미터는 모의 데이터 필터링 시 무시', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        status: 503,
      });

      const result = await searchAddress({
        keyword: '종로',
        currentPage: 5,
      });

      // 모의 데이터는 페이징을 무시하고 전체 반환
      expect(result.length).toBe(2);
    });
  });

  describe('200 정상 응답 → zod 검증 + results.juso 추출', () => {
    it('정상 API 응답 형식 → parse 성공', async () => {
      const mockResponse = {
        results: {
          juso: [
            {
              roadAddr: '서울시 송파구 올림픽로 300',
              roadAddrPart1: '서울시 송파구 올림픽로 300',
              zipNo: '05505',
              admCd: '11250',
              rnMgtSn: '1125010100000300',
              bdNm: '올림픽공원',
            },
            {
              roadAddr: '서울시 용산구 이태원로 123',
              roadAddrPart1: '서울시 용산구 이태원로 123',
              zipNo: '04349',
              admCd: '11170',
              rnMgtSn: '1117010100000123',
            },
          ],
          common: {
            totalCount: 2,
            currentPage: 1,
            countPerPage: 10,
            countRecords: 2,
          },
        },
      };

      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => mockResponse,
      });

      const result = await searchAddress({ keyword: '서울' });

      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        roadAddr: '서울시 송파구 올림픽로 300',
        admCd: '11250',
      });
      expect(result[1]?.zipNo).toBe('04349');
    });

    it('빈 결과 (totalCount=0) → 빈 배열 반환', async () => {
      const mockResponse = {
        results: {
          juso: [],
          common: {
            totalCount: 0,
            currentPage: 1,
            countPerPage: 10,
            countRecords: 0,
          },
        },
      };

      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => mockResponse,
      });

      const result = await searchAddress({ keyword: '없는지역' });
      expect(result).toEqual([]);
    });

    it('선택 필드(common) 누락 → parse 여전히 성공', async () => {
      const mockResponse = {
        results: {
          juso: [
            {
              roadAddr: '경기도 수원시 팔달로 100',
              roadAddrPart1: '경기도 수원시 팔달로 100',
              zipNo: '16200',
              admCd: '41113',
              rnMgtSn: '4111310100000100',
            },
          ],
        },
      };

      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => mockResponse,
      });

      const result = await searchAddress({ keyword: '수원' });
      expect(result).toHaveLength(1);
      expect(result[0]?.admCd).toBe('41113');
    });

    it('페이징 응답 (page 2) → juso 추출', async () => {
      const mockResponse = {
        results: {
          juso: Array.from({ length: 10 }, (_, i) => ({
            roadAddr: `서울시 강남구 테헤란로 ${200 + i}`,
            roadAddrPart1: `서울시 강남구 테헤란로 ${200 + i}`,
            zipNo: `062${String(34 + i).padStart(2, '0')}`,
            admCd: '11305',
            rnMgtSn: `113051010000${String(200 + i).padStart(3, '0')}`,
          })),
          common: {
            totalCount: 100,
            currentPage: 2,
            countPerPage: 10,
            countRecords: 10,
          },
        },
      };

      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => mockResponse,
      });

      const result = await searchAddress({
        keyword: '테헤란',
        currentPage: 2,
      });

      expect(result).toHaveLength(10);
      expect(result[0]?.roadAddr).toContain('테헤란로 200');
    });
  });

  describe('에러 처리', () => {
    it('응답 OK 아님 (4xx/5xx) → 빈 배열', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        status: 400,
        ok: false,
        statusText: 'Bad Request',
      });

      const result = await searchAddress({ keyword: '종로' });
      expect(result).toEqual([]);
    });

    it('타임아웃 (AbortError) → 빈 배열', async () => {
      (global.fetch as any).mockRejectedValueOnce(
        new Error('The operation was aborted'),
      );

      const result = await searchAddress({ keyword: '종로' });
      expect(result).toEqual([]);
    });

    it('JSON parse 실패 → 빈 배열', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => {
          throw new Error('JSON.parse error');
        },
      });

      const result = await searchAddress({ keyword: '종로' });
      expect(result).toEqual([]);
    });

    it('응답 스키마 검증 실패 (results 누락) → 빈 배열', async () => {
      const invalidResponse = {
        // results 누락
        juso: [{ roadAddr: '서울시' }],
      };

      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => invalidResponse,
      });

      const result = await searchAddress({ keyword: '서울' });
      expect(result).toEqual([]);
    });

    it('응답이 배열 대신 객체 → zod 검증 실패 → 빈 배열', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => [{ roadAddr: '서울시' }], // 배열 (잘못된 형식)
      });

      const result = await searchAddress({ keyword: '서울' });
      expect(result).toEqual([]);
    });

    it('401 인증 실패 (errorCode="01") → 빈 배열 반환', async () => {
      const mockResponse = {
        results: {
          juso: [],
          common: {
            errorCode: '01',
            errorMessage: 'Unauthorized',
            totalCount: 0,
            currentPage: 1,
            countPerPage: 10,
            countRecords: 0,
          },
        },
      };

      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => mockResponse,
      });

      const result = await searchAddress({ keyword: '종로' });
      expect(result).toEqual([]);
    });

    it('429 호출 한도 초과 (errorCode="13") → 빈 배열 반환', async () => {
      const mockResponse = {
        results: {
          juso: [],
          common: {
            errorCode: '13',
            errorMessage: 'Over API daily limit',
            totalCount: 0,
            currentPage: 1,
            countPerPage: 10,
            countRecords: 0,
          },
        },
      };

      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => mockResponse,
      });

      const result = await searchAddress({ keyword: '강남' });
      expect(result).toEqual([]);
    });

    it('500 서버 오류 (errorCode="99") → 빈 배열 반환', async () => {
      const mockResponse = {
        results: {
          juso: [],
          common: {
            errorCode: '99',
            errorMessage: 'System error',
            totalCount: 0,
            currentPage: 1,
            countPerPage: 10,
            countRecords: 0,
          },
        },
      };

      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => mockResponse,
      });

      const result = await searchAddress({ keyword: '서울' });
      expect(result).toEqual([]);
    });
  });

  describe('통합 시나리오', () => {
    it('양도세 페이지: 주소 검색 → admCd → lawdCd 매핑 흐름', async () => {
      // 시나리오: 사용자가 "종로" 검색
      // → 503 (키 미설정) → 모의 데이터 2개 반환
      // → UI: "종로구 종로 1" admCd=11110, "중구 종로 10" admCd=11140
      // → admCd → lawdCd 변환 (사용자 선택 후)
      // → getRtmsApartmentTrade(lawdCd) 호출

      (global.fetch as any).mockResolvedValueOnce({
        status: 503,
      });

      const results = await searchAddress({ keyword: '종로' });

      // 검증
      expect(results).toHaveLength(2);

      // 첫 번째 주소: 종로구
      const addr1 = results[0];
      expect(addr1?.roadAddr).toBe('서울시 종로구 종로 1');
      expect(addr1?.admCd).toBe('11110'); // RTMS lawdCd와 동일

      // 두 번째 주소: 중구
      const addr2 = results[1];
      expect(addr2?.roadAddr).toBe('서울시 중구 종로 10');
      expect(addr2?.admCd).toBe('11140');

      // 다음 단계: 사용자 선택 후 getRtmsApartmentTrade(lawdCd)
      // lawdCd = addr1.admCd = '11110'
    });

    it('프로덕션 키 설정: 대량 페이징 결과 처리', async () => {
      const realResponse = {
        results: {
          juso: Array.from({ length: 10 }, (_, i) => ({
            roadAddr: `서울시 관악구 신림로 ${i + 1}`,
            roadAddrPart1: `서울시 관악구 신림로 ${i + 1}`,
            jibunAddr: `서울시 관악구 신림동 ${i + 1}`,
            zipNo: `08787`,
            admCd: '11290',
            rnMgtSn: `112901010000000${i + 1}`,
            bdNm: `신림빌딩${i + 1}`,
          })),
          common: {
            totalCount: 237,
            currentPage: 1,
            countPerPage: 10,
            countRecords: 10,
          },
        },
      };

      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => realResponse,
      });

      const result = await searchAddress({ keyword: '신림', currentPage: 1 });

      // UI: 검색 결과 10개 표시
      expect(result).toHaveLength(10);
      expect(result[0]?.admCd).toBe('11290'); // 모두 동일 지역
      expect(result.every((addr) => addr.zipNo === '08787')).toBe(true);

      // 페이지네이션 지원: next page 요청 가능
      // → searchAddress({ keyword: '신림', currentPage: 2 })
    });

    it('주소 검색 → 개발(503) vs 프로덕션(200) 호환성', async () => {
      // 개발 환경: 503 → 모의 데이터
      (global.fetch as any).mockResolvedValueOnce({
        status: 503,
      });

      const devResult = await searchAddress({ keyword: '강남' });
      expect(devResult.length).toBeGreaterThan(0);
      expect(devResult[0]?.admCd).toBe('11305');

      // 프로덕션: 200 → 실제 API
      const prodResponse = {
        results: {
          juso: [
            {
              roadAddr: '서울시 강남구 테헤란로 440',
              roadAddrPart1: '서울시 강남구 테헤란로 440',
              zipNo: '06234',
              admCd: '11305',
              rnMgtSn: '1130510100000440',
              bdNm: '한국빌딩',
            },
          ],
          common: {
            totalCount: 1,
            currentPage: 1,
            countPerPage: 10,
            countRecords: 1,
          },
        },
      };

      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => prodResponse,
      });

      const prodResult = await searchAddress({ keyword: '강남' });

      // 모의 & 실제 모두 같은 admCd
      expect(prodResult[0]?.admCd).toBe('11305');

      // 클라이언트 코드는 개발/프로덕션 동작 차이 감지 불가
      // → 완전한 호환성
    });

    it('API 에러 응답 (401) vs 정상 응답: 클라이언트 견고성', async () => {
      // 첫 번째: 에러 응답 (인증 실패)
      const errorResponse = {
        results: {
          juso: [],
          common: {
            errorCode: '01',
            errorMessage: 'Unauthorized',
            totalCount: 0,
          },
        },
      };

      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => errorResponse,
      });

      const errorResult = await searchAddress({ keyword: '종로' });
      expect(errorResult).toEqual([]);

      // 두 번째: 재시도 성공
      const successResponse = {
        results: {
          juso: [
            {
              roadAddr: '서울시 종로구 율곡로 100',
              roadAddrPart1: '서울시 종로구 율곡로 100',
              zipNo: '03165',
              admCd: '11110',
              rnMgtSn: '1111010100000100',
              bdNm: '종로빌딩',
            },
          ],
          common: {
            totalCount: 1,
            currentPage: 1,
            countPerPage: 10,
            countRecords: 1,
          },
        },
      };

      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => successResponse,
      });

      const retryResult = await searchAddress({ keyword: '종로' });
      expect(retryResult).toHaveLength(1);
      expect(retryResult[0]?.admCd).toBe('11110');
    });
  });
});
