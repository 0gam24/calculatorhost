// 빌드 뒤(postbuild) out/feed.xml 의 각 item description 을 가이드 본문 전체로 바꾼다.
// 네이버 RSS 제출 가이드(05-02) "item 본문은 일부가 아닌 전체", 01-01 "최신글은 본문 전체를 RSS 에".
// 순수 로직은 rss-full-content-core.mjs (단위 테스트: tests/unit/scripts/rss-full-content.test.ts).
import fs from 'node:fs';
import path from 'node:path';
import {
  SITE_URL,
  cleanArticleHtml,
  extractArticleHtml,
  injectFullContent,
} from './rss-full-content-core.mjs';

// 네이버 RSS 제출 한도 10MB. 넉넉히 아래에서 멈춘다.
const MAX_BYTES = 9 * 1024 * 1024;

const outDir = path.resolve('out');
const feedPath = path.join(outDir, 'feed.xml');
if (!fs.existsSync(feedPath)) throw Error('[rss-full-content] out/feed.xml 이 없습니다. next build 뒤에 실행하세요.');

const rss = fs.readFileSync(feedPath, 'utf8');
const { result, replaced } = injectFullContent(rss, (url) => {
  if (!url.startsWith(`${SITE_URL}/`)) return null;
  const file = path.join(outDir, url.slice(SITE_URL.length), 'index.html');
  if (!fs.existsSync(file)) return null;
  const article = extractArticleHtml(fs.readFileSync(file, 'utf8'));
  return article ? cleanArticleHtml(article) : null;
});

const items = (rss.match(/<item>/g) ?? []).length;
if (items > 0 && replaced === 0) throw Error('[rss-full-content] 본문을 넣은 item 이 하나도 없습니다.');
const bytes = Buffer.byteLength(result);
if (bytes > MAX_BYTES) throw Error(`[rss-full-content] feed.xml ${bytes} bytes 가 한도를 넘습니다.`);
fs.writeFileSync(feedPath, result);
console.log(`[rss-full-content] ${replaced}/${items} items full content, ${(bytes / 1024).toFixed(0)}KB`);
