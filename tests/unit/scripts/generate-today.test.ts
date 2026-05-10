// generate-today.mjs unit tests.
// Verifies metadata extraction, summarize, path-to-entry, and merge logic.
import { describe, expect, it } from 'vitest';
import {
  extractPageMeta,
  summarize,
  pathToEntry,
  mergeIntoTodayMd,
  todayKst,
  type PageEntry,
} from '../../../scripts/generate-today.mjs';

describe('todayKst', () => {
  it('YYYY-MM-DD 형식 반환', () => {
    expect(todayKst(new Date('2026-05-11T15:00:00Z'))).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('extractPageMeta', () => {
  it('title + description 정상 추출', () => {
    const src = `
      export const metadata = {
        title: '연봉 실수령액 계산기 2026',
        description: '2026년 최신 세율 반영',
      };
    `;
    const meta = extractPageMeta(src);
    expect(meta.title).toBe('연봉 실수령액 계산기 2026');
    expect(meta.description).toBe('2026년 최신 세율 반영');
  });

  it('description 멀티라인 시작 지원', () => {
    const src = `
      export const metadata = {
        title: 'X',
        description:
          'multiline content',
      };
    `;
    const meta = extractPageMeta(src);
    expect(meta.description).toBe('multiline content');
  });

  it('title 없으면 null', () => {
    const meta = extractPageMeta('no metadata here');
    expect(meta.title).toBeNull();
  });
});

describe('summarize', () => {
  it('짧은 문장 그대로', () => {
    expect(summarize('짧음')).toBe('짧음');
  });

  it('limit 초과 시 절단 + ellipsis', () => {
    const long = '가'.repeat(150);
    const out = summarize(long, 100);
    expect(out.length).toBeLessThanOrEqual(100);
    expect(out.endsWith('…')).toBe(true);
  });

  it('null/빈 입력 처리', () => {
    expect(summarize(null)).toBe('');
    expect(summarize('')).toBe('');
  });
});

describe('pathToEntry', () => {
  const src = `
    export const metadata = {
      title: '7월 부가세 가이드',
      description: '본문 설명입니다',
    };
  `;

  it('guide page 경로 → entry', () => {
    const e = pathToEntry('src/app/guide/july-vat/page.tsx', src);
    expect(e).not.toBeNull();
    expect(e?.kind).toBe('guide');
    expect(e?.slug).toBe('july-vat');
    expect(e?.url).toBe('https://calculatorhost.com/guide/july-vat/');
    expect(e?.title).toBe('7월 부가세 가이드');
    expect(e?.summary).toBe('본문 설명입니다');
  });

  it('calculator page 경로 → entry', () => {
    const e = pathToEntry('src/app/calculator/salary/page.tsx', src);
    expect(e?.kind).toBe('calculator');
    expect(e?.url).toBe('https://calculatorhost.com/calculator/salary/');
  });

  it('형식 불일치 → null', () => {
    const e = pathToEntry('src/app/about/page.tsx', src);
    expect(e).toBeNull();
  });
});

describe('mergeIntoTodayMd', () => {
  const entries: PageEntry[] = [
    {
      kind: 'guide',
      slug: 'a',
      url: 'https://calculatorhost.com/guide/a/',
      title: '가이드 A',
      summary: '요약 A',
    },
  ];

  it('빈 파일 → 헤더 + 새 섹션 생성', () => {
    const out = mergeIntoTodayMd('', '2026-05-11', entries);
    expect(out).toContain('# Today');
    expect(out).toContain('## 2026-05-11');
    expect(out).toContain('가이드 A');
    expect(out).toContain('요약 A');
    expect(out).toContain('https://calculatorhost.com/guide/a/');
  });

  it('기존 다른 날짜 섹션 → 오늘 섹션 prepend', () => {
    const existing = '# Today\n\n어쩌고\n\n## 2026-05-10\n\n- 어제분\n';
    const out = mergeIntoTodayMd(existing, '2026-05-11', entries);
    const todayIdx = out.indexOf('## 2026-05-11');
    const yesterdayIdx = out.indexOf('## 2026-05-10');
    expect(todayIdx).toBeGreaterThanOrEqual(0);
    expect(yesterdayIdx).toBeGreaterThan(todayIdx); // today 가 앞에
  });

  it('같은 날짜 섹션 존재 + 신규 entry → append', () => {
    const existing = `# Today\n\n## 2026-05-11\n\n- [가이드] [기존](https://calculatorhost.com/guide/old/)\n`;
    const out = mergeIntoTodayMd(existing, '2026-05-11', entries);
    expect(out).toContain('https://calculatorhost.com/guide/old/');
    expect(out).toContain('https://calculatorhost.com/guide/a/');
  });

  it('중복 URL → 변경 없음 (idempotent)', () => {
    const existing = `# Today\n\n## 2026-05-11\n\n- [가이드] [A](https://calculatorhost.com/guide/a/)\n`;
    const out = mergeIntoTodayMd(existing, '2026-05-11', entries);
    expect(out).toBe(existing);
  });

  it('entries 비어있음 → "신규 발행분 없음" 표시', () => {
    const out = mergeIntoTodayMd('', '2026-05-11', []);
    expect(out).toContain('신규 발행분 없음');
  });
});
