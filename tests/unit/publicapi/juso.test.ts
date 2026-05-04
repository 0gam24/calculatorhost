/**
 * JUSO API zod 스키마 단위 테스트
 *
 * 테스트 범위: zod parse만 (네트워크 호출 X)
 * 케이스: 유효값 5개 + 무효값 3개
 */

import { describe, it, expect } from 'vitest';
import { JusoAddressSchema, JusoApiResponseSchema } from '../../../src/lib/publicapi/types';
import { z } from 'zod';

describe('JusoAddressSchema', () => {
  it('유효한 주소 정보 파싱 성공', () => {
    const input = {
      roadAddr: '서울시 종로구 종로 1',
      roadAddrPart1: '서울시 종로구 종로 1',
      roadAddrPart2: '(청와대)',
      jibunAddr: '서울시 종로구 청운동 1-1',
      zipNo: '03048',
      admCd: '11110',
      rnMgtSn: '1111010100000001',
      bdMgtSn: '11110101001000001',
      bdNm: '청와대',
    };

    const result = JusoAddressSchema.parse(input);
    expect(result.roadAddr).toBe('서울시 종로구 종로 1');
    expect(result.zipNo).toBe('03048');
    expect(result.admCd).toBe('11110');
    expect(result.bdNm).toBe('청와대');
  });

  it('선택 필드(jibunAddr, bdMgtSn, bdNm) 제외 파싱 성공', () => {
    const input = {
      roadAddr: '서울시 중구 종로 10',
      roadAddrPart1: '서울시 중구 종로 10',
      zipNo: '04532',
      admCd: '11140',
      rnMgtSn: '1114010100000010',
    };

    const result = JusoAddressSchema.parse(input);
    expect(result.roadAddr).toBe('서울시 중구 종로 10');
    expect(result.jibunAddr).toBeUndefined();
    expect(result.bdMgtSn).toBeUndefined();
  });

  it('zipNo 5자리 숫자 검증', () => {
    const invalidInputs = [
      { ...baseValid(), zipNo: '0304' }, // 4자리
      { ...baseValid(), zipNo: '030480' }, // 6자리
      { ...baseValid(), zipNo: '0304A' }, // 문자
    ];

    invalidInputs.forEach((input) => {
      expect(() => JusoAddressSchema.parse(input)).toThrow(z.ZodError);
    });
  });

  it('admCd 행정동코드 필수 필드', () => {
    const invalidInput = {
      roadAddr: '서울시 강남구 테헤란로 123',
      roadAddrPart1: '서울시 강남구 테헤란로 123',
      zipNo: '06234',
      // admCd 누락
      rnMgtSn: '1130510100000123',
    };

    expect(() => JusoAddressSchema.parse(invalidInput)).toThrow(z.ZodError);
  });

  it('다양한 주소 형식 파싱', () => {
    const inputs = [
      {
        roadAddr: '경기도 수원시 장안구 팔달로 123',
        roadAddrPart1: '경기도 수원시 장안구 팔달로 123',
        zipNo: '16234',
        admCd: '41113',
        rnMgtSn: '4111310100000123',
      },
      {
        roadAddr: '인천시 남구 송도대로 456',
        roadAddrPart1: '인천시 남구 송도대로 456',
        roadAddrPart2: '(센트럴파크)',
        zipNo: '21971',
        admCd: '48110',
        rnMgtSn: '4811010100000456',
        bdNm: '센트럴파크',
      },
      {
        roadAddr: '부산시 해운대구 센텀남로 789',
        roadAddrPart1: '부산시 해운대구 센텀남로 789',
        zipNo: '48058',
        admCd: '26110',
        rnMgtSn: '2611010100000789',
        engAddr: 'Centum South-ro 789, Haeundae-gu, Busan',
      },
    ];

    inputs.forEach((input) => {
      const result = JusoAddressSchema.parse(input);
      expect(result.roadAddr).toBe(input.roadAddr);
      expect(result.zipNo).toBe(input.zipNo);
    });
  });

  function baseValid() {
    return {
      roadAddr: '서울시 종로구 종로 1',
      roadAddrPart1: '서울시 종로구 종로 1',
      zipNo: '03048',
      admCd: '11110',
      rnMgtSn: '1111010100000001',
    };
  }
});

describe('JusoApiResponseSchema', () => {
  it('정상 API 응답 파싱 성공 (배열 래퍼)', () => {
    const input = {
      results: {
        juso: [
          {
            roadAddr: '서울시 종로구 종로 1',
            roadAddrPart1: '서울시 종로구 종로 1',
            zipNo: '03048',
            admCd: '11110',
            rnMgtSn: '1111010100000001',
          },
          {
            roadAddr: '서울시 중구 종로 10',
            roadAddrPart1: '서울시 중구 종로 10',
            zipNo: '04532',
            admCd: '11140',
            rnMgtSn: '1114010100000010',
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

    const result = JusoApiResponseSchema.parse(input);
    expect(result.results.juso).toHaveLength(2);
    expect(result.results.common?.totalCount).toBe(2);
  });

  it('빈 juso 배열 허용', () => {
    const input = {
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

    const result = JusoApiResponseSchema.parse(input);
    expect(result.results.juso).toHaveLength(0);
    expect(result.results.common?.totalCount).toBe(0);
  });

  it('선택 필드(common) 제외 파싱 성공', () => {
    const input = {
      results: {
        juso: [
          {
            roadAddr: '서울시 강남구 테헤란로 123',
            roadAddrPart1: '서울시 강남구 테헤란로 123',
            zipNo: '06234',
            admCd: '11305',
            rnMgtSn: '1130510100000123',
          },
        ],
      },
    };

    const result = JusoApiResponseSchema.parse(input);
    expect(result.results.juso).toHaveLength(1);
    expect(result.results.common).toBeUndefined();
  });
});
