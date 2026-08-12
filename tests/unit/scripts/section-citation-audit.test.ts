// Section-citation audit unit tests.
// Verifies §N law citation count extraction and threshold-based pass/fail.
// E-E-A-T (YMYL) signal: every calculator/guide page should cite at least one
// statute section so LLM/Google can recognize trust signals.
import { describe, expect, it } from 'vitest';
import {
  CITATION_EXEMPT,
  partitionMissing,
  countCitations,
  classifyCitations,
} from '../../../scripts/section-citation-audit.mjs';

describe('countCitations()', () => {
  it('counts §N section markers in source text', () => {
    const src = `소득세법 §55 누진세 / 지방세법 §111(과세표준) / §148의4`;
    expect(countCitations(src)).toBe(3);
  });

  it('returns 0 for source with no citations', () => {
    expect(countCitations('plain text without sections')).toBe(0);
  });

  it('handles unicode "조", "조의" patterns optionally', () => {
    const src = `소득세법 §55 + 지방세법 제111조 + 시행령 제125조의2`;
    // §N + 제N조 + 제N조의M 모두 인정
    expect(countCitations(src)).toBeGreaterThanOrEqual(3);
  });
});

describe('classifyCitations()', () => {
  it('classifies pages by citation count threshold', () => {
    const result = classifyCitations([
      { path: '/calculator/a', count: 0 },
      { path: '/calculator/b', count: 1 },
      { path: '/calculator/c', count: 5 },
    ]);
    expect(result.missing).toEqual(['/calculator/a']);
    expect(result.minimal).toEqual(['/calculator/b']);
    expect(result.strong).toEqual(['/calculator/c']);
  });
});

// ── 게이트 정교화 (2026-08-12 SEO 감사) ───────────────────────────
// 배경: missing 이 1건이라도 있으면 무조건 exit 1 이라, 법조항 개념이 없는
// 계산 유틸·카테고리 허브 때문에 SEO 게이트가 상시 실패 → 사실상 무시되고 있었다.
// 면제는 "명시적으로 등재된 경로"에만 적용한다 (default-deny).
describe('partitionMissing()', () => {
  it('면제 목록에 있는 경로는 차단하지 않는다', () => {
    const { blocking, exempted } = partitionMissing(
      ['/calculator/bmi/', '/guide/gift-tax-calculation-2026/'],
      { '/calculator/bmi/': '비-YMYL 생활 유틸' },
    );
    expect(exempted).toEqual(['/calculator/bmi/']);
    expect(blocking).toEqual(['/guide/gift-tax-calculation-2026/']);
  });

  it('면제 목록에 없는 신규 페이지는 반드시 차단한다 (default-deny)', () => {
    const { blocking } = partitionMissing(['/guide/new-tax-guide-2026/'], {});
    expect(blocking).toEqual(['/guide/new-tax-guide-2026/']);
  });

  it('전부 면제면 blocking 이 비어 게이트가 통과한다', () => {
    const { blocking } = partitionMissing(['/calculator/bmi/'], {
      '/calculator/bmi/': '사유',
    });
    expect(blocking).toHaveLength(0);
  });
});

describe('CITATION_EXEMPT', () => {
  it('모든 면제 항목에 사유 문자열이 붙어 있다 (무단 면제 방지)', () => {
    for (const [route, reason] of Object.entries(CITATION_EXEMPT)) {
      expect(route.startsWith('/'), `${route} 는 절대 경로여야 함`).toBe(true);
      expect(typeof reason === 'string' && reason.length > 0, `${route} 사유 누락`).toBe(true);
    }
  });

  it('세금 본문 페이지를 면제하지 않는다 (YMYL 보호)', () => {
    // 카테고리 허브(/guide/category/*)는 본문이 없는 목록 페이지라 대상 외.
    const taxish = Object.keys(CITATION_EXEMPT)
      .filter((r) => !r.startsWith('/guide/category/'))
      .filter((r) => /(-tax|tax-|taxation|\/vat\/|gift|inheritance|acquisition|capital-gains)/.test(r));
    expect(taxish).toEqual([]);
  });
});
