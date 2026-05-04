/**
 * 국토부 실거래가 API 응답 스키마 (zod)
 *
 * 출처: data.go.kr "아파트 매매 신고 조회 서비스"
 * 문서: https://www.data.go.kr/tcs/dss/selectApiDetailView.do?publicDataPk=15057747
 *
 * 검증 원칙:
 * - zod 파싱만 담당 (네트워크 X)
 * - 샘플 응답 5개 케이스로 단위 테스트
 * - 필드 누락 시 ZodError 발생
 */

import { z } from 'zod';

/**
 * 아파트 매매 거래 건
 *
 * 필드 설명:
 * - dealAmount: 거래금액 (만원 단위, string)
 * - dealYmd: 거래년월일 (YYYYMMDD)
 * - lawdCd: 법정동코드 (5자리)
 * - floor: 층
 * - areaExclusive: 전용면적 (㎡, string)
 */
export const RtmsApartmentTradeSchema = z.object({
  dealAmount: z.string().describe('거래금액 (만원)'),
  dealYmd: z.string().regex(/^\d{8}$/, '거래년월일은 YYYYMMDD 형식'),
  lawdCd: z.string().regex(/^\d{5}$/, '법정동코드는 5자리 숫자'),
  floor: z.coerce.number().describe('층수'),
  areaExclusive: z.string().describe('전용면적(㎡)'),
  buildingName: z.string().optional().describe('건물명'),
  dealType: z.enum(['매매', '전세']).optional().describe('거래유형'),
});

export type RtmsApartmentTrade = z.infer<typeof RtmsApartmentTradeSchema>;

/**
 * 전세/월세 거래 건
 *
 * 필드:
 * - jibun: 지번
 * - lawdCd: 법정동코드 (5자리)
 * - dealYmd: 거래년월일
 * - depositAmount: 보증금 (만원)
 * - monthlyRent: 월세 (만원)
 * - rentType: '전세' | '월세'
 */
export const RtmsRentSchema = z.object({
  jibun: z.string().describe('지번'),
  lawdCd: z.string().regex(/^\d{5}$/, '법정동코드는 5자리 숫자'),
  dealYmd: z.string().regex(/^\d{8}$/, '거래년월일은 YYYYMMDD 형식'),
  depositAmount: z.coerce.number().describe('보증금(만원)'),
  monthlyRent: z.coerce.number().describe('월세(만원)'),
  rentType: z.enum(['전세', '월세']).describe('임차유형'),
  areaExclusive: z.string().optional().describe('전용면적(㎡)'),
});

export type RtmsRent = z.infer<typeof RtmsRentSchema>;

/**
 * API 응답 래퍼 (XML 파싱 후 JSON 변환 가정)
 *
 * data.go.kr는 XML 응답이므로 실제 호출 시 xml2js 등으로 JSON 변환 필요.
 * 스키마는 변환 후 구조 기준.
 */
export const RtmsApiResponseSchema = z.object({
  items: z.array(RtmsApartmentTradeSchema),
  totalCount: z.number().describe('총 거래건 수'),
  pageNo: z.number().describe('현재 페이지'),
  pageSize: z.number().describe('페이지당 건수'),
});

export type RtmsApiResponse = z.infer<typeof RtmsApiResponseSchema>;

/**
 * ===== JUSO API (행정안전부 도로명주소) =====
 *
 * 출처: business.juso.go.kr (행정안전부 주소기반산업지원서비스)
 * 신청: https://business.juso.go.kr → 회원가입 → 오픈API → 도로명주소 검색 → 서비스 신청
 *
 * 응답 필드 (공식 문서 기준):
 * - roadAddr: 도로명주소 전체
 * - roadAddrPart1: 도로명주소 (참고항목 제외)
 * - roadAddrPart2: 도로명주소 참고항목
 * - jibunAddr: 지번주소
 * - zipNo: 우편번호 (5자리)
 * - admCd: 행정동코드
 * - rnMgtSn: 도로명코드 (road name management serial number)
 * - bdMgtSn: 건물관리번호
 */
export const JusoAddressSchema = z.object({
  roadAddr: z.string().describe('도로명주소 전체'),
  roadAddrPart1: z.string().describe('도로명주소(참고항목 제외)'),
  roadAddrPart2: z.string().optional().describe('도로명주소 참고항목'),
  jibunAddr: z.string().optional().describe('지번주소'),
  zipNo: z.string().regex(/^\d{5}$/, '우편번호는 5자리').describe('우편번호'),
  admCd: z.string().describe('행정동코드'),
  rnMgtSn: z.string().describe('도로명코드'),
  bdMgtSn: z.string().optional().describe('건물관리번호'),
  engAddr: z.string().optional().describe('영문주소'),
  bdNm: z.string().optional().describe('건물명'),
});

export type JusoAddress = z.infer<typeof JusoAddressSchema>;

/**
 * JUSO API 응답 (배열)
 *
 * JUSO API는 `results.juso[]` 배열로 최대 10개 결과 반환
 */
export const JusoApiResponseSchema = z.object({
  results: z.object({
    juso: z.array(JusoAddressSchema).describe('주소 검색 결과 배열'),
    common: z.object({
      errorMessage: z.string().optional().describe('에러 메시지'),
      errorCode: z.string().optional().describe('에러 코드'),
      countPerPage: z.number().optional().describe('페이지당 건수'),
      totalCount: z.number().optional().describe('총 검색 결과 건수'),
      currentPage: z.number().optional().describe('현재 페이지'),
      countRecords: z.number().optional().describe('현재 페이지 결과 건수'),
    }).optional().describe('공통 메타정보'),
  }),
});

export type JusoApiResponse = z.infer<typeof JusoApiResponseSchema>;
