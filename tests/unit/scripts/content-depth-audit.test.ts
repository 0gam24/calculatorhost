// Content-depth audit unit tests.
// Verifies rendered-HTML → visible-text extraction and Korean char counting,
// which back the AdSense '가치 낮은 콘텐츠' 회피 가드 (가이드라인 G5).
import { describe, expect, it } from 'vitest';
import {
  stripHtmlToText,
  countKorean,
  auditCalculators,
} from '../../../scripts/content-depth-audit.mjs';

describe('stripHtmlToText()', () => {
  it('extracts only the #main-content region and strips tags', () => {
    const html =
      '<header>머리글 무시</header>' +
      '<main id="main-content"><h1>양도소득세 계산기</h1><p>본문 내용입니다.</p></main>' +
      '<footer>바닥글 무시</footer>';
    const text = stripHtmlToText(html);
    expect(text).toContain('양도소득세 계산기');
    expect(text).toContain('본문 내용입니다.');
    expect(text).not.toContain('머리글');
    expect(text).not.toContain('바닥글');
  });

  it('drops script/style contents and decodes entities', () => {
    const html =
      '<main id="main-content">가&amp;나<script>console.log("x")</script><style>.a{}</style>다</main>';
    const text = stripHtmlToText(html);
    expect(text).toContain('가&나');
    expect(text).toContain('다');
    expect(text).not.toContain('console');
  });
});

describe('countKorean()', () => {
  it('counts only Korean syllables', () => {
    expect(countKorean('연봉 5000만 salary!')).toBe(3); // 연,봉,만
    expect(countKorean('no korean here')).toBe(0);
  });
});

describe('auditCalculators()', () => {
  it('flags missing out dir without throwing', () => {
    const r = auditCalculators('does/not/exist');
    expect(r.missing).toBe(true);
    expect(r.results).toEqual([]);
  });
});
