/**
 * check-guide-quality.mjs 단위 테스트
 *
 * 가이드 자동 발행 PR 게이트의 핵심 로직 검증.
 * RED 항목 (배포 차단) / YELLOW (경고) / GREEN (통과) 분류 정확도 보장.
 */
import { describe, expect, it } from 'vitest';
import {
  checkContentLength,
  checkAuthorityLinks,
  checkForbiddenPatterns,
  checkAiDisclosure,
  extractTaxRatePercents,
  extractStatuteSections,
  validateGuideContent,
} from '../../../scripts/check-guide-quality.mjs';

describe('checkContentLength: 본문 2000자 하한', () => {
  it('2000자 미만 → fail', () => {
    const result = checkContentLength('짧은 본문');
    expect(result.pass).toBe(false);
    expect(result.severity).toBe('red');
  });

  it('2000자 이상 → pass', () => {
    const longText = '가'.repeat(2500);
    const result = checkContentLength(longText);
    expect(result.pass).toBe(true);
  });

  it('JSX 마크업·메타 제외 후 본문만 카운트', () => {
    // 마크업이 많고 실 본문이 짧은 경우
    const jsxHeavy = '<div className="card">'.repeat(200) + '본문 짧음';
    const result = checkContentLength(jsxHeavy);
    expect(result.pass).toBe(false);
  });
});

describe('checkAuthorityLinks: 외부 권위 링크 2개 이상', () => {
  it('권위 도메인 링크 0개 → fail', () => {
    const noLinks = 'export default function Page() { return <div>본문</div>; }';
    const result = checkAuthorityLinks(noLinks);
    expect(result.pass).toBe(false);
  });

  it('권위 도메인 링크 1개만 → fail (2개 이상 의무)', () => {
    const oneLink = `<a href="https://www.hometax.go.kr">홈택스</a>`;
    const result = checkAuthorityLinks(oneLink);
    expect(result.pass).toBe(false);
  });

  it('권위 도메인 링크 2개+ → pass', () => {
    const twoLinks = `
      <a href="https://www.hometax.go.kr">홈택스</a>
      <a href="https://www.law.go.kr/법령/소득세법">법령정보센터</a>
    `;
    const result = checkAuthorityLinks(twoLinks);
    expect(result.pass).toBe(true);
    expect(result.found).toBeGreaterThanOrEqual(2);
  });

  it('권위 외 도메인 링크는 카운트 안 함', () => {
    const nonAuthority = `
      <a href="https://random-blog.com">블로그</a>
      <a href="https://example.com">예시</a>
    `;
    const result = checkAuthorityLinks(nonAuthority);
    expect(result.pass).toBe(false);
  });

  it('홈택스/국세청/기재부/위택스/한은/금감원/법령정보 등 권위 도메인 인식', () => {
    const allDomains = `
      <a href="https://www.nts.go.kr">국세청</a>
      <a href="https://www.moef.go.kr">기재부</a>
      <a href="https://www.bok.or.kr">한국은행</a>
    `;
    const result = checkAuthorityLinks(allDomains);
    expect(result.found).toBe(3);
    expect(result.pass).toBe(true);
  });
});

describe('checkForbiddenPatterns: 금기 표현 검출', () => {
  it('"투자 권유" 표현 → red', () => {
    const result = checkForbiddenPatterns('이 상품은 투자 권유입니다');
    expect(result.pass).toBe(false);
    expect(result.severity).toBe('red');
    expect(result.violations).toContain('투자 권유');
  });

  it('"수익 보장" 표현 → red', () => {
    const result = checkForbiddenPatterns('연 10% 수익 보장됩니다');
    expect(result.pass).toBe(false);
    expect(result.violations).toContain('수익 보장');
  });

  it('"100% 절세" / "확정 절세" 표현 → red', () => {
    const r1 = checkForbiddenPatterns('100% 절세 가능');
    expect(r1.pass).toBe(false);
    const r2 = checkForbiddenPatterns('확정 절세 방법');
    expect(r2.pass).toBe(false);
  });

  it('"국내 1위" / "유일" 허위 우려 표현 → red', () => {
    const r1 = checkForbiddenPatterns('국내 1위 계산기');
    expect(r1.pass).toBe(false);
    const r2 = checkForbiddenPatterns('국내 유일 정확');
    expect(r2.pass).toBe(false);
  });

  it('정상 표현은 통과', () => {
    const normal = '2026년 양도세 절세 방법은 일시적 2주택 비과세를 활용하는 것입니다.';
    const result = checkForbiddenPatterns(normal);
    expect(result.pass).toBe(true);
    expect(result.violations).toHaveLength(0);
  });
});

describe('checkAiDisclosure: AI 보조 작성 표기 검사', () => {
  it('AI 보조 표기 없음 → fail', () => {
    const noDisclosure = '본문...면책조항 있음';
    const result = checkAiDisclosure(noDisclosure);
    expect(result.pass).toBe(false);
  });

  it('"AI 보조" / "Claude" / "자동 생성" 표기 → pass', () => {
    const r1 = checkAiDisclosure('본문... AI 보조 작성·운영자 최종 검증');
    expect(r1.pass).toBe(true);
    const r2 = checkAiDisclosure('Claude API 로 초안 생성');
    expect(r2.pass).toBe(true);
    const r3 = checkAiDisclosure('자동 생성 후 운영자 검수');
    expect(r3.pass).toBe(true);
  });
});

describe('extractTaxRatePercents: 본문에서 세율 % 추출', () => {
  it('명시적 세율 추출', () => {
    const text = '근로자 부담률은 4.5%, 건강보험은 3.545%';
    const rates = extractTaxRatePercents(text);
    expect(rates).toContain(4.5);
    expect(rates).toContain(3.545);
  });

  it('누진세율 8단계 추출 (6%, 15%, 24%, 35%, 38%, 40%, 42%, 45%)', () => {
    const text = '구간 세율은 6%, 15%, 24%, 35%, 38%, 40%, 42%, 45%';
    const rates = extractTaxRatePercents(text);
    expect(rates).toEqual(expect.arrayContaining([6, 15, 24, 35, 38, 40, 42, 45]));
  });

  it('% 기호 없는 숫자는 무시', () => {
    const text = '연봉 5000만원';
    const rates = extractTaxRatePercents(text);
    expect(rates).not.toContain(5000);
  });
});

describe('extractStatuteSections: 본문에서 법조항 §번호 추출', () => {
  it('소득세법 §55 형식 추출', () => {
    const text = '근거: 소득세법 §55, 지방세법 §92';
    const sections = extractStatuteSections(text);
    expect(sections).toContain('소득세법 §55');
    expect(sections).toContain('지방세법 §92');
  });

  it('소득세법 제55조 형식도 추출', () => {
    const text = '소득세법 제55조 누진세율 적용';
    const sections = extractStatuteSections(text);
    expect(sections.some((s) => s.includes('55'))).toBe(true);
  });

  it('§의2 (예: §59의2) 추출', () => {
    const text = '자녀세액공제는 소득세법 §59의2';
    const sections = extractStatuteSections(text);
    expect(sections.some((s) => s.includes('59의2'))).toBe(true);
  });
});

describe('validateGuideContent: 통합 검증 (게이트 의사결정)', () => {
  const goodGuide = `
    export const metadata: Metadata = {
      title: '테스트 가이드',
      description: '${'설명입니다. '.repeat(20)}',
    };

    ${'본문 단락입니다. '.repeat(200)}

    <a href="https://www.hometax.go.kr">홈택스</a>
    <a href="https://www.law.go.kr/법령/소득세법">법령정보센터</a>

    AI 보조 작성·운영자 최종 검증 2026-05-08
  `;

  it('전 항목 통과 가이드 → green (배포 가능)', () => {
    const result = validateGuideContent(goodGuide);
    expect(result.overall).toBe('green');
    expect(result.failures).toHaveLength(0);
  });

  it('금기 표현 1개라도 발견 → red (즉시 차단)', () => {
    const bad = goodGuide + '\n수익 보장 합니다';
    const result = validateGuideContent(bad);
    expect(result.overall).toBe('red');
  });

  it('AI 보조 표기 누락 → red', () => {
    const noDisclosure = goodGuide.replace('AI 보조 작성·운영자 최종 검증 2026-05-08', '');
    const result = validateGuideContent(noDisclosure);
    expect(result.overall).toBe('red');
  });

  it('본문 짧음 → red', () => {
    const short = `<a href="https://www.hometax.go.kr">a</a><a href="https://www.law.go.kr">b</a> AI 보조 검증`;
    const result = validateGuideContent(short);
    expect(result.overall).toBe('red');
  });
});
