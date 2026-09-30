/**
 * 취득세: 확인된 일반 취득의 독립 금액 검산 및 미확인 조건 차단 회귀.
 * 2026-09-30 지방세법11/13의2/151, 시행령28의6, 농특세법5 원문 확인.
 * 일반7억·8억 세율/취득세: 대덕구 공식2020 안내 PDF 인쇄11쪽의 도입 예시와 현재§11①8나 대조.
 * https://www.daedeok.go.kr/ebook/site/src/viewer/download.php?host=main&no=2&site=20200103_154912
 * 10원 미만 절사는 지방세기본법59 및 준용되는 국고금 관리법47.
 * 기대금액은 아래 주석의 과표×법정세율을 수작업 계산한 값이며 구현 상수를 재사용하지 않는다.
 */
import { describe, expect, it } from 'vitest';
import { calculateAcquisitionTax, type AcquisitionTaxInput } from '@/lib/tax/acquisition';

function createInput(overrides: Partial<AcquisitionTaxInput> = {}): AcquisitionTaxInput {
  return {
    method: 'purchase',
    target: 'residential',
    houseCount: 1,
    areaOver85: false,
    adjustedArea: false,
    acquisitionPrice: 600_000_000,
    firstHomeBuyerDiscount: false,
    ...overrides,
  };
}

const giftInput = (overrides: Partial<AcquisitionTaxInput> = {}) =>
  createInput({
    method: 'gift',
    giftBurdened: false,
    ...overrides,
  });
const inheritanceInput = (overrides: Partial<AcquisitionTaxInput> = {}) =>
  createInput({
    method: 'inheritance',
    inheritanceSpecial: 'notApplicable',
    ...overrides,
  });

describe('일반 매매 — 기본 세율과 정확한 보간값', () => {
  it.each([
    // §11①8:6억 이하1%,9억 이상3%. 수작업 합계:취득세+교육세(취득세율10%).
    [599_999_999, 0.01, 5_999_990, 599_990, 6_599_980],
    [600_000_000, 0.01, 6_000_000, 600_000, 6_600_000],
    [600_000_001, 0.01, 6_000_000, 600_000, 6_600_000],
    [899_999_999, 0.03, 26_999_990, 2_699_990, 29_699_980],
    [900_000_000, 0.03, 27_000_000, 2_700_000, 29_700_000],
    [900_000_001, 0.03, 27_000_000, 2_700_000, 29_700_000],
    [1_000_000_000, 0.03, 30_000_000, 3_000_000, 33_000_000],
    // 반올림 전 유리수7억=1/60→.0167、8억=7/300→.0233(표시1.67/2.33%).
    [700_000_000, 0.0167, 11_690_000, 1_169_000, 12_859_000],
    [800_000_000, 0.0233, 18_640_000, 1_864_000, 20_504_000],
    // 정확한 보간값:6.6억→1.4%,7.5억→2%,6.615억→1.41%.
    [660_000_000, 0.014, 9_240_000, 924_000, 10_164_000],
    [750_000_000, 0.02, 15_000_000, 1_500_000, 16_500_000],
    [661_500_000, 0.0141, 9_327_150, 932_710, 10_259_860],
  ])('%i원 일반 매매 세액', (price, rate, acquisition, education, total) => {
    const result = calculateAcquisitionTax(createInput({ acquisitionPrice: price }));
    expect(result.appliedRate).toBe(rate);
    expect(result.acquisitionTax).toBe(acquisition);
    expect(result.localEducationTax).toBe(education);
    expect(result.specialRuralTax).toBe(0);
    expect(result.totalPayment).toBe(total);
    expect(result.discountAmount).toBe(0);
  });

  it('비조정 2주택도 기본 가격 구간을 적용한다:10억3%,1%고정 회귀', () => {
    const result = calculateAcquisitionTax(
      createInput({ houseCount: 2, acquisitionPrice: 1_000_000_000 }),
    );
    expect(result.appliedRate).toBe(0.03);
    expect(result.acquisitionTax).toBe(30_000_000);
    expect(result.localEducationTax).toBe(3_000_000);
  });

  it('비조정 2주택 7.5억은 보간2%를 적용한다', () => {
    expect(
      calculateAcquisitionTax(createInput({ houseCount: 2, acquisitionPrice: 750_000_000 }))
        .acquisitionTax,
    ).toBe(15_000_000);
  });

  it.each([
    // 계수 .01005 경계:600750000원→1.005%를1.01%로, -1원은1.00%.
    [600_749_999, 0.01, 6_007_490, 600_740, 6_608_230],
    [600_750_000, 0.0101, 6_067_570, 606_750, 6_674_320],
    [600_750_001, 0.0101, 6_067_570, 606_750, 6_674_320],
    // 계수 .02995 경계의 -1원과 정확한 half-up.
    [899_249_999, 0.0299, 26_887_570, 2_688_750, 29_576_320],
    [899_250_000, 0.03, 26_977_500, 2_697_750, 29_675_250],
    [899_250_001, 0.03, 26_977_500, 2_697_750, 29_675_250],
  ])('법정 계수 반올림 경계%i원', (price, rate, acquisition, education, total) => {
    const result = calculateAcquisitionTax(createInput({ acquisitionPrice: price }));
    expect(result.appliedRate).toBe(rate);
    expect(result.acquisitionTax).toBe(acquisition);
    expect(result.localEducationTax).toBe(education);
    expect(result.totalPayment).toBe(total);
  });

  it.each([
    [700_000_000, 0.0167, 11_690_000, 1_169_000, 1_400_000, 14_259_000],
    [800_000_000, 0.0233, 18_640_000, 1_864_000, 1_600_000, 22_104_000],
  ])(
    '비조정2주택·국민주택규모 초과%i원 일반 매매',
    (price, rate, acquisition, education, rural, total) => {
      const result = calculateAcquisitionTax(
        createInput({ houseCount: 2, areaOver85: true, acquisitionPrice: price }),
      );
      expect(result.appliedRate).toBe(rate);
      expect(result.acquisitionTax).toBe(acquisition);
      expect(result.localEducationTax).toBe(education);
      expect(result.specialRuralTax).toBe(rural);
      expect(result.totalPayment).toBe(total);
    },
  );
});

describe('매매 중과 — 주택 수·지역 및 부가세', () => {
  it.each([
    // §13의2①2:조정2/비조정3=8%;①3:조정3+/비조정4+=12%.
    // 과표8억:8%64백만+교육0.4%3.2백만+농특0.6%4.8백만=72백만.
    // 과표8억:12%96백만+교육0.4%3.2백만+농특1%8백만=107.2백만.
    [true, 2, 0.08, 64_000_000, 4_800_000, 72_000_000],
    [false, 3, 0.08, 64_000_000, 4_800_000, 72_000_000],
    [true, 3, 0.12, 96_000_000, 8_000_000, 107_200_000],
    [true, 4, 0.12, 96_000_000, 8_000_000, 107_200_000],
    [false, 4, 0.12, 96_000_000, 8_000_000, 107_200_000],
  ] as const)('지역조정%s·취득후%i주택', (adjusted, count, rate, acquisition, rural, total) => {
    const result = calculateAcquisitionTax(
      createInput({
        adjustedArea: adjusted,
        houseCount: count as AcquisitionTaxInput['houseCount'],
        areaOver85: true,
        acquisitionPrice: 800_000_000,
      }),
    );
    expect(result.appliedRate).toBe(rate);
    expect(result.acquisitionTax).toBe(acquisition);
    expect(result.localEducationTax).toBe(3_200_000);
    expect(result.specialRuralTax).toBe(rural);
    expect(result.totalPayment).toBe(total);
  });

  it('국민주택규모 이하는 중과에서도 농특세를 부과하지 않는다', () => {
    const result = calculateAcquisitionTax(
      createInput({ adjustedArea: true, houseCount: 2, acquisitionPrice: 800_000_000 }),
    );
    expect(result.specialRuralTax).toBe(0);
    expect(result.totalPayment).toBe(67_200_000);
  });

  it('일반10억 초과규모:취득3천만+농특2백만+교육3백만=3천5백만', () => {
    const result = calculateAcquisitionTax(
      createInput({ areaOver85: true, acquisitionPrice: 1_000_000_000 }),
    );
    expect(result.specialRuralTax).toBe(2_000_000);
    expect(result.totalPayment).toBe(35_000_000);
  });
});

describe('일반 증여 — 과표와 중과 기준가액 분리', () => {
  it('비조정 증여6억,수증자4주택:3.5%+농특0.2%+교육0.3%=2천4백만', () => {
    const result = calculateAcquisitionTax(giftInput({ houseCount: 4, areaOver85: true }));
    expect(result.appliedRate).toBe(0.035);
    expect(result.acquisitionTax).toBe(21_000_000);
    expect(result.specialRuralTax).toBe(1_200_000);
    expect(result.localEducationTax).toBe(1_800_000);
    expect(result.totalPayment).toBe(24_000_000);
  });

  it('전체주택 시가표준3억 미만은 조정지역에서도 기본 세율', () => {
    const result = calculateAcquisitionTax(
      giftInput({ adjustedArea: true, giftWholeHouseStandardPrice: 299_999_999, houseCount: 4 }),
    );
    expect(result.appliedRate).toBe(0.035);
    expect(result.totalPayment).toBe(22_800_000);
  });

  it('전체주택 기준3억 경계부터 예외없음 확인시12%,지분과표1억이어도 중과', () => {
    const result = calculateAcquisitionTax(
      giftInput({
        adjustedArea: true,
        giftWholeHouseStandardPrice: 300_000_000,
        giftOneHouseFamilyExemption: 'notApplicable',
        acquisitionPrice: 100_000_000,
        houseCount: 1,
        areaOver85: true,
      }),
    );
    expect(result.appliedRate).toBe(0.12);
    expect(result.acquisitionTax).toBe(12_000_000);
    expect(result.localEducationTax).toBe(400_000);
    expect(result.specialRuralTax).toBe(1_000_000);
    expect(result.totalPayment).toBe(13_400_000);
  });

  it('증여자1세대1주택 가족 중과예외 확인시 기본3.5% 적용', () => {
    const result = calculateAcquisitionTax(
      giftInput({
        adjustedArea: true,
        giftWholeHouseStandardPrice: 600_000_000,
        giftOneHouseFamilyExemption: 'applicable',
        houseCount: 4,
        areaOver85: true,
      }),
    );
    expect(result.acquisitionTax).toBe(21_000_000);
    expect(result.localEducationTax).toBe(1_800_000);
    expect(result.specialRuralTax).toBe(1_200_000);
  });

  it.each([undefined, null, true])('부담부증여 조건%s는 자동 계산하지 않는다', (burdened) => {
    expect(() => calculateAcquisitionTax(giftInput({ giftBurdened: burdened }))).toThrow(
      '부담부증여',
    );
  });

  it.each([undefined, 0, -1, NaN, Infinity, 300_000_000.5])(
    '조정지역 전체주택 기준가액%s는 확인 필요',
    (wholePrice) => {
      expect(() =>
        calculateAcquisitionTax(
          giftInput({ adjustedArea: true, giftWholeHouseStandardPrice: wholePrice }),
        ),
      ).toThrow('전체 주택의 시가표준액');
    },
  );

  it.each([undefined, 'unknown'] as const)(
    '중과 기준 이상에서 가족 예외%s면 금액을 단정하지 않는다',
    (exemption) => {
      expect(() =>
        calculateAcquisitionTax(
          giftInput({
            adjustedArea: true,
            giftWholeHouseStandardPrice: 300_000_000,
            giftOneHouseFamilyExemption: exemption,
          }),
        ),
      ).toThrow('중과 예외');
    },
  );
});

describe('일반 상속 — 특례 미적용 확인', () => {
  it('6억상속:2.8%취득+0.16%교육+0.2%농특=1천896만원', () => {
    const result = calculateAcquisitionTax(
      inheritanceInput({ adjustedArea: true, houseCount: 4, areaOver85: true }),
    );
    expect(result.acquisitionTax).toBe(16_800_000);
    expect(result.localEducationTax).toBe(960_000);
    expect(result.specialRuralTax).toBe(1_200_000);
    expect(result.totalPayment).toBe(18_960_000);
    expect(result.note).not.toContain('중과');
  });

  it.each([undefined, 'unknown', 'applicable'] as const)(
    '상속 특례%s는 일반2.8%로 임의 계산하지 않는다',
    (special) => {
      expect(() =>
        calculateAcquisitionTax(inheritanceInput({ inheritanceSpecial: special })),
      ).toThrow('상속 특례');
    },
  );
});

describe('미지원·미확인 거래와 금액 검증', () => {
  it.each(['farmland', 'land', 'other'] as const)(
    '대상%s는0원세금 결과 대신 안내 오류',
    (target) => {
      expect(() => calculateAcquisitionTax(createInput({ target }))).toThrow('현재 계산 범위');
    },
  );
  it('원시취득도0원세금 결과를 생성하지 않는다', () => {
    expect(() => calculateAcquisitionTax(createInput({ method: 'primitive' }))).toThrow('원시취득');
  });
  it.each(['unknown', 'special'] as const)('매매 조건%s는 확인 필요', (special) => {
    expect(() => calculateAcquisitionTax(createInput({ purchaseSpecial: special }))).toThrow(
      '매매 특례',
    );
  });
  it('생애최초 감면의 자동200만원 적용을 차단한다', () => {
    expect(() => calculateAcquisitionTax(createInput({ firstHomeBuyerDiscount: true }))).toThrow(
      '자동 감면 계산',
    );
  });
  it.each([-1, NaN, Infinity, -Infinity, 10.5, Number.MAX_SAFE_INTEGER + 1])(
    '잘못된 과표%s는 거부',
    (price) => {
      expect(() => calculateAcquisitionTax(createInput({ acquisitionPrice: price }))).toThrow(
        '원 단위 금액',
      );
    },
  );
  it('지원되는 일반 입력의 명시적0원은 잘못된 숫자와 구별한다', () => {
    const result = calculateAcquisitionTax(createInput({ acquisitionPrice: 0 }));
    expect(result.taxBase).toBe(0);
    expect(result.totalPayment).toBe(0);
  });
  it('잘못된 런타임 주택 수는 기본율로 간주하지 않는다', () => {
    expect(() =>
      calculateAcquisitionTax(createInput({ houseCount: 0 as AcquisitionTaxInput['houseCount'] })),
    ).toThrow('세대 주택 수');
  });
  it('잘못된 런타임 취득방법은 상속으로 간주하지 않는다', () => {
    expect(() =>
      calculateAcquisitionTax(createInput({ method: 'invalid' as AcquisitionTaxInput['method'] })),
    ).toThrow('취득 방법');
  });
});

describe('10원 절사와 합계 독립 검산', () => {
  it('123456789원 일반매매:1%1234560+교육123450+농특246910=1604920', () => {
    const result = calculateAcquisitionTax(
      createInput({ acquisitionPrice: 123_456_789, areaOver85: true }),
    );
    expect(result.acquisitionTax).toBe(1_234_560);
    expect(result.localEducationTax).toBe(123_450);
    expect(result.specialRuralTax).toBe(246_910);
    expect(result.totalPayment).toBe(1_604_920);
  });
  it('8%중과10원 경계600000125원:취득48000010,교육2400000,농특3600000', () => {
    const result = calculateAcquisitionTax(
      createInput({
        acquisitionPrice: 600_000_125,
        adjustedArea: true,
        houseCount: 2,
        areaOver85: true,
      }),
    );
    expect(result.acquisitionTax).toBe(48_000_010);
    expect(result.localEducationTax).toBe(2_400_000);
    expect(result.specialRuralTax).toBe(3_600_000);
    expect(result.totalPayment).toBe(54_000_010);
  });
});
