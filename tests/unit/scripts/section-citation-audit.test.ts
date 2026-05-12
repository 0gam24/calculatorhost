// Section-citation audit unit tests.
// Verifies §N law citation count extraction and threshold-based pass/fail.
// E-E-A-T (YMYL) signal: every calculator/guide page should cite at least one
// statute section so LLM/Google can recognize trust signals.
import { describe, expect, it } from 'vitest';
import {
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
