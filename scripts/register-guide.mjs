#!/usr/bin/env node
/**
 * register-guide.mjs
 *
 * 신규 가이드를 **사이트에서 실제로 보이게** 등록한다.
 *
 * 배경: 기존 auto-guide 워크플로는 `src/app/guide/<slug>/page.tsx` 생성과
 * sitemap 등록만 했다. 그 결과 페이지는 URL 직접 입력으로만 도달 가능한
 * 고아 페이지가 되고 `/guide/` 인덱스에는 나타나지 않았다. 북극성 룰의
 * "내부링크 0인 고립 페이지 금지"에도 어긋난다.
 *
 * 이 스크립트가 하는 일 (둘 다 멱등):
 *   1. `src/app/guide/page.tsx` 의 GUIDES 배열 맨 앞에 엔트리 삽입
 *      → /guide/ 인덱스·카테고리 허브·최신글 목록에 노출
 *   2. `src/app/sitemap.ts` 의 GUIDE_SLUGS 맨 앞에 슬러그 삽입
 *      → 색인 표면 등록
 *
 * 사용:
 *   node scripts/register-guide.mjs --slug <slug> --title <title> \
 *     --description <desc> --category <세금|세금·부동산|금융|투자|근로> \
 *     --published-at 2026-08-30 --reading-minutes 8
 *
 * 출력(JSON): { "status": "registered"|"already", "slug": "...", "index": bool, "sitemap": bool }
 *
 * [revenue-lever: indexing] — 색인 표면 + 내부링크 mesh 동시 확보.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const REPO_ROOT = process.cwd();
const GUIDE_INDEX = resolve(REPO_ROOT, 'src/app/guide/page.tsx');
const SITEMAP = resolve(REPO_ROOT, 'src/app/sitemap.ts');

const VALID_CATEGORIES = ['세금', '세금·부동산', '금융', '투자', '근로'];

/** TS/JS 작은따옴표 리터럴로 안전 변환 (역슬래시·따옴표·개행 이스케이프). */
export function tsString(value) {
  return `'${String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r?\n/g, ' ')}'`;
}

/**
 * GUIDES 배열 맨 앞에 엔트리 삽입.
 * 이미 같은 슬러그가 있으면 원본을 그대로 반환 (멱등).
 */
export function insertGuideEntry(source, entry) {
  if (new RegExp(`slug:\\s*'${entry.slug}'`).test(source)) {
    return { source, inserted: false };
  }
  const anchor = 'export const GUIDES: GuideEntry[] = [';
  const at = source.indexOf(anchor);
  if (at === -1) throw new Error('GUIDES 배열 앵커를 찾지 못함');

  const block = [
    '',
    `  // ${entry.publishedAt} 자동 발행 (AI 초안 + 자동 품질 게이트)`,
    '  {',
    `    slug: ${tsString(entry.slug)},`,
    `    title: ${tsString(entry.title)},`,
    '    description:',
    `      ${tsString(entry.description)},`,
    `    category: ${tsString(entry.category)},`,
    `    publishedAt: ${tsString(entry.publishedAt)},`,
    `    readingMinutes: ${Number(entry.readingMinutes) || 8},`,
    '  },',
  ].join('\n');

  const cut = at + anchor.length;
  return { source: source.slice(0, cut) + block + source.slice(cut), inserted: true };
}

/**
 * GUIDE_SLUGS 배열 맨 앞에 슬러그 삽입. 멱등.
 */
export function insertSitemapSlug(source, slug) {
  if (new RegExp(`'${slug}'`).test(source)) {
    return { source, inserted: false };
  }
  const anchor = 'const GUIDE_SLUGS = [';
  const at = source.indexOf(anchor);
  if (at === -1) throw new Error('GUIDE_SLUGS 배열 앵커를 찾지 못함');

  const cut = at + anchor.length;
  return { source: `${source.slice(0, cut)}\n  '${slug}',${source.slice(cut)}`, inserted: true };
}

// ─────────────────────────────────────────────────────────────
// CLI
// ─────────────────────────────────────────────────────────────
function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

const isMain = process.argv[1] && process.argv[1].endsWith('register-guide.mjs');
if (isMain) {
  const entry = {
    slug: arg('slug'),
    title: arg('title'),
    description: arg('description'),
    category: arg('category'),
    publishedAt: arg('published-at'),
    readingMinutes: arg('reading-minutes'),
  };

  const missing = ['slug', 'title', 'description', 'category', 'publishedAt'].filter(
    (k) => !entry[k],
  );
  if (missing.length) {
    console.log(JSON.stringify({ status: 'failed', error: `필수 인자 누락: ${missing.join(', ')}` }));
    process.exit(1);
  }
  if (!VALID_CATEGORIES.includes(entry.category)) {
    console.log(
      JSON.stringify({
        status: 'failed',
        error: `category 무효: ${entry.category} (허용: ${VALID_CATEGORIES.join(' / ')})`,
      }),
    );
    process.exit(1);
  }

  try {
    const indexResult = insertGuideEntry(readFileSync(GUIDE_INDEX, 'utf8'), entry);
    if (indexResult.inserted) writeFileSync(GUIDE_INDEX, indexResult.source, 'utf8');

    const sitemapResult = insertSitemapSlug(readFileSync(SITEMAP, 'utf8'), entry.slug);
    if (sitemapResult.inserted) writeFileSync(SITEMAP, sitemapResult.source, 'utf8');

    console.log(
      JSON.stringify({
        status: indexResult.inserted || sitemapResult.inserted ? 'registered' : 'already',
        slug: entry.slug,
        index: indexResult.inserted,
        sitemap: sitemapResult.inserted,
      }),
    );
    process.exit(0);
  } catch (err) {
    console.log(JSON.stringify({ status: 'failed', error: String(err?.message ?? err) }));
    process.exit(1);
  }
}
