// IndexNow 순수 로직: 바뀐 page.tsx → 공개 URL, 요청 본문 만들기.
//
// 근거: docs/references/H-네이버-공식가이드/10-IndexNow/ (02 Key 생성 규칙, 03 여러 페이지 POST 형식).
// 네이버는 소유확인과 별개로 키 파일만으로 요청을 받는다(2026-10-08 실측 200).
// GitHub Actions(indexnow-ping.yml)는 꺼 둔 채로, push 한 뒤 로컬에서 scripts/indexnow-ping.mjs 로 보낸다.

export const SITE = 'https://calculatorhost.com';
export const HOST = 'calculatorhost.com';
export const MAX_URLS = 10_000; // 03-페이지 갱신 요청하기: 한 번에 최대 10,000개

/** src/app/**\/page.tsx 경로 → 공개 URL (trailing slash). 동적 세그먼트([slug])는 실제 URL 을 알 수 없어 뺀다. */
export function urlsFromChangedFiles(files) {
  const out = new Set();
  for (const raw of files ?? []) {
    const f = String(raw).replace(/\\/g, '/');
    const m = f.match(/^src\/app\/(.*)page\.tsx$/);
    if (!m) continue;
    const segs = m[1].split('/').filter(Boolean);
    if (segs.some((s) => s.startsWith('['))) continue;
    const path = segs.filter((s) => !(s.startsWith('(') && s.endsWith(')'))).join('/');
    out.add(`${SITE}/${path ? `${path}/` : ''}`);
  }
  return [...out];
}

/** 키 규칙: 16진수 문자와 - 만, 8~128자 (02-API Key 생성하기) */
export function isValidKey(key) {
  return /^[a-fA-F0-9-]{8,128}$/.test(String(key ?? ''));
}

export function buildPayload({ key, urls }) {
  return {
    host: HOST,
    key,
    keyLocation: `${SITE}/${key}.txt`,
    urlList: (urls ?? []).slice(0, MAX_URLS),
  };
}
