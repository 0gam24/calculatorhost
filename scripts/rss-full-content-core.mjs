// RSS 본문 전체 포함 — 순수 함수 (scripts/rss-full-content.mjs 가 빌드 뒤 out/feed.xml 에 적용).
// 네이버 RSS 제출 가이드(05-02): item 본문은 일부가 아닌 전체를 담고, 피드 안 주소는 사이트와 같은 도메인.
// 근거: docs/references/H-네이버-공식가이드/05-웹사이트 검색연동/02-RSS 및 사이트맵 제출.md

export const SITE_URL = 'https://calculatorhost.com';

// 본문에서 통째로 지우는 요소 (화면 장식·동작용이라 글 내용이 아님)
const DROP_ELEMENTS = ['script', 'style', 'noscript', 'svg', 'button', 'form', 'nav', 'template'];
// 남기는 속성 (링크·이미지·표 구조만)
const KEEP_ATTRIBUTES = new Set(['href', 'src', 'alt', 'scope', 'colspan', 'rowspan']);

/** 가이드 페이지 HTML 에서 첫 <article> 의 안쪽 HTML. 없으면 null. */
export function extractArticleHtml(pageHtml) {
  const open = pageHtml.search(/<article\b/i);
  if (open < 0) return null;
  const start = pageHtml.indexOf('>', open) + 1;
  let depth = 1;
  const re = /<(\/?)article\b[^>]*>/gi;
  re.lastIndex = start;
  let m;
  while ((m = re.exec(pageHtml))) {
    depth += m[1] ? -1 : 1;
    if (depth === 0) return pageHtml.slice(start, m.index);
  }
  return null;
}

function absolute(url) {
  if (url.startsWith('//')) return `https:${url}`;
  if (url.startsWith('/')) return `${SITE_URL}${url}`;
  return url;
}

/** 장식 요소·속성을 걷어내고 사이트 안 상대 주소를 절대 주소로 바꾼다. */
export function cleanArticleHtml(html) {
  let out = html;
  for (const tag of DROP_ELEMENTS) {
    out = out.replace(new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}>`, 'gi'), '');
    out = out.replace(new RegExp(`<${tag}\\b[^>]*\\/?>`, 'gi'), '');
  }
  out = out.replace(/<!--[\s\S]*?-->/g, '');
  out = out.replace(/<([a-z][a-z0-9]*)\b([^>]*)>/gi, (_, tag, attrs) => {
    const kept = [];
    for (const a of attrs.matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s"'>]+))?/g)) {
      const name = a[1].toLowerCase();
      if (!KEEP_ATTRIBUTES.has(name) || a[2] === undefined) continue;
      let value = a[2].replace(/^["']|["']$/g, '');
      if (name === 'href' && value.startsWith('#')) continue;
      if (name === 'href' || name === 'src') value = absolute(value);
      kept.push(`${name}="${value}"`);
    }
    return `<${tag}${kept.length ? ` ${kept.join(' ')}` : ''}>`;
  });
  return out.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
}

function cdata(html) {
  return `<![CDATA[${html.replaceAll(']]>', ']]]]><![CDATA[>')}]]>`;
}

/**
 * RSS 의 각 item description 을 본문 전체로 바꾼다.
 * contentForUrl(url) 이 null 이면 그 item 은 요약을 유지한다.
 */
export function injectFullContent(rssXml, contentForUrl) {
  let replaced = 0;
  const result = rssXml.replace(/<item>([\s\S]*?)<\/item>/g, (item, inner) => {
    const link = inner.match(/<link>([^<]+)<\/link>/)?.[1]?.trim();
    const html = link ? contentForUrl(link) : null;
    if (!html) return item;
    replaced++;
    return `<item>${inner.replace(/<description>[\s\S]*?<\/description>/, `<description>${cdata(html)}</description>`)}</item>`;
  });
  return { result, replaced };
}
