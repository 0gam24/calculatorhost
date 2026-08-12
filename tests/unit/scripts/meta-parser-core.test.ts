// 메타데이터 파서 공용 코어 단위 테스트.
//
// 배경 (2026-08-12 SEO 감사): ralph-meta-audit.mjs / validate-guide-metadata.mjs 가
// 각자 순진한 정규식으로 메타를 파싱해 대량 오탐을 냈다.
//  - `canonical: URL` (변수 참조) 를 "canonical 없음" 으로 오판
//  - description 안의 큰따옴표에서 문자열이 잘려 113자를 6자로 오판
//  - `export const metadata = buildX()` (빌더형) 을 "metadata 누락" 으로 오판
// 본 코어가 세 케이스를 모두 정확히 처리하는지 고정한다.
import { describe, expect, it } from 'vitest';
import {
  extractMetadataBody,
  extractQuotedField,
  extractKeywordsCount,
  resolveCanonical,
  collectStringConsts,
} from '../../../scripts/meta-parser-core.mjs';

describe('extractMetadataBody()', () => {
  it('객체 리터럴 metadata 본문을 추출한다', () => {
    const src = `export const metadata: Metadata = {\n  title: '취득세',\n};\n\nexport default function Page() {}`;
    const r = extractMetadataBody(src);
    expect(r.computed).toBe(false);
    expect(r.body).toContain("title: '취득세'");
  });

  it('빌더 함수형 metadata 를 computed 로 인식한다 (누락 아님)', () => {
    const src = `export const metadata = buildGuideCategoryMetadata('tax');`;
    const r = extractMetadataBody(src);
    expect(r.computed).toBe(true);
    expect(r.present).toBe(true);
  });

  it('metadata export 가 정말 없으면 present=false', () => {
    const src = `export default function Page() { return null; }`;
    expect(extractMetadataBody(src).present).toBe(false);
  });
});

describe('extractQuotedField()', () => {
  it('작은따옴표 문자열 안의 큰따옴표에서 잘리지 않는다', () => {
    const body = `description:\n    '환전할 때 "우대 90%"가 실제로 얼마를 절약하는지 설명합니다.',`;
    expect(extractQuotedField(body, 'description')).toBe(
      '환전할 때 "우대 90%"가 실제로 얼마를 절약하는지 설명합니다.',
    );
  });

  it('큰따옴표 문자열 안의 작은따옴표에서 잘리지 않는다', () => {
    const body = `title: "김'철수 가이드",`;
    expect(extractQuotedField(body, 'title')).toBe("김'철수 가이드");
  });

  it('이스케이프된 따옴표를 문자열 종료로 보지 않는다', () => {
    const body = `title: '오늘\\'s 세금',`;
    expect(extractQuotedField(body, 'title')).toBe("오늘\\'s 세금");
  });

  it('템플릿 리터럴의 ${} 자리를 자리표시자로 치환한다', () => {
    const body = 'title: `2026 ${YEAR} 취득세`,';
    expect(extractQuotedField(body, 'title')).toBe('2026 0000 취득세');
  });

  it('필드가 없으면 null', () => {
    expect(extractQuotedField(`title: 'x',`, 'description')).toBeNull();
  });

  it('부분 일치 키를 오인하지 않는다 (ogTitle 이 title 로 잡히면 안 됨)', () => {
    const body = `ogTitle: '광고문구',\n  title: '진짜제목',`;
    expect(extractQuotedField(body, 'title')).toBe('진짜제목');
  });
});

describe('collectStringConsts() / resolveCanonical()', () => {
  const src = `const URL = 'https://calculatorhost.com/calculator/acquisition-tax/';\n\nexport const metadata: Metadata = {\n  alternates: { canonical: URL },\n};`;

  it('파일 상단 const 문자열을 수집한다', () => {
    expect(collectStringConsts(src).get('URL')).toBe(
      'https://calculatorhost.com/calculator/acquisition-tax/',
    );
  });

  it('변수 참조 canonical 을 실제 URL 로 해석한다', () => {
    const { body } = extractMetadataBody(src);
    expect(resolveCanonical(src, body)).toBe(
      'https://calculatorhost.com/calculator/acquisition-tax/',
    );
  });

  it('문자열 리터럴 canonical 도 그대로 해석한다', () => {
    const s = `export const metadata = {\n  alternates: { canonical: 'https://calculatorhost.com/guide/x/' },\n};`;
    const { body } = extractMetadataBody(s);
    expect(resolveCanonical(s, body)).toBe('https://calculatorhost.com/guide/x/');
  });

  it('canonical 자체가 없으면 null', () => {
    const s = `export const metadata = {\n  title: 'x',\n};`;
    const { body } = extractMetadataBody(s);
    expect(resolveCanonical(s, body)).toBeNull();
  });
});

describe('extractKeywordsCount()', () => {
  it('배열 항목 수를 센다', () => {
    const body = `keywords: [\n  '취득세 계산기',\n  '아파트 취득세',\n  '1주택 10억',\n],`;
    expect(extractKeywordsCount(body)).toBe(3);
  });

  it('keywords 가 없으면 0', () => {
    expect(extractKeywordsCount(`title: 'x',`)).toBe(0);
  });
});
