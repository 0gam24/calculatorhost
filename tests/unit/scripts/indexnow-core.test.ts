// indexnow-core.mjs unit tests.
// 배포 후 바뀐 페이지를 네이버 IndexNow(searchadvisor.naver.com/indexnow)로 알리는 순수 로직.
import { describe, expect, it } from 'vitest';
import { buildPayload, isValidKey, urlsFromChangedFiles } from '../../../scripts/lib/indexnow-core.mjs';

describe('urlsFromChangedFiles', () => {
  it('page.tsx 경로를 trailing slash URL 로 바꾼다', () => {
    expect(
      urlsFromChangedFiles([
        'src/app/calculator/vat/page.tsx',
        'src/app/guide/weekly-holiday-allowance-2026/page.tsx',
        'src/app/page.tsx',
      ]),
    ).toEqual([
      'https://calculatorhost.com/calculator/vat/',
      'https://calculatorhost.com/guide/weekly-holiday-allowance-2026/',
      'https://calculatorhost.com/',
    ]);
  });
  it('page.tsx 가 아닌 파일·동적 경로·그룹 폴더는 뺀다', () => {
    expect(
      urlsFromChangedFiles([
        'src/app/calculator/vat/VatCalculator.tsx',
        'src/app/guide/[slug]/page.tsx',
        'src/lib/tax/vat.ts',
        'docs/ops/OPERATING-PLAN.md',
      ]),
    ).toEqual([]);
  });
  it('(group) 라우트 그룹은 URL 에서 빠진다', () => {
    expect(urlsFromChangedFiles(['src/app/(legal)/privacy/page.tsx'])).toEqual([
      'https://calculatorhost.com/privacy/',
    ]);
  });
  it('중복은 한 번만', () => {
    expect(
      urlsFromChangedFiles(['src/app/calculator/vat/page.tsx', 'src/app/calculator/vat/page.tsx']),
    ).toHaveLength(1);
  });
  it('윈도우 역슬래시 경로도 받는다', () => {
    expect(urlsFromChangedFiles(['src\\app\\calculator\\vat\\page.tsx'])).toEqual([
      'https://calculatorhost.com/calculator/vat/',
    ]);
  });
});

describe('isValidKey', () => {
  it('16진수·하이픈 8~128자만 (네이버 IndexNow Key 생성 규칙)', () => {
    expect(isValidKey('fddd329dae799d88bfb141b3038af856')).toBe(true);
    expect(isValidKey('abc')).toBe(false);
    expect(isValidKey('zzzz329dae799d88')).toBe(false);
  });
});

describe('buildPayload', () => {
  it('host·key·keyLocation·urlList 형식', () => {
    expect(buildPayload({ key: 'fddd329dae799d88bfb141b3038af856', urls: ['https://calculatorhost.com/'] })).toEqual({
      host: 'calculatorhost.com',
      key: 'fddd329dae799d88bfb141b3038af856',
      keyLocation: 'https://calculatorhost.com/fddd329dae799d88bfb141b3038af856.txt',
      urlList: ['https://calculatorhost.com/'],
    });
  });
  it('한 번에 최대 10,000개', () => {
    const urls = Array.from({ length: 10_005 }, (_, i) => `https://calculatorhost.com/p${i}/`);
    expect(buildPayload({ key: 'fddd329dae799d88bfb141b3038af856', urls }).urlList).toHaveLength(10_000);
  });
});
