/**
 * dateModified manifest 생성 — pure functions only.
 *
 * 각 page.tsx 의 마지막 git 커밋 시각을 ISO 날짜로 추출 → 라우트 키 매핑.
 * jsonld 의 WebPage/Article dateModified 자동 채움 + freshness 신호 강화.
 */

export function pageFileToRoute(file) {
  if (file === 'src/app/page.tsx') return '/';
  if (!file.endsWith('/page.tsx')) return null;
  if (!file.startsWith('src/app/')) return null;
  let route = file.replace(/^src\/app/, '').replace(/\/page\.tsx$/, '');
  if (route === '') route = '/';
  if (!route.endsWith('/')) route += '/';
  // 그룹 라우트, private, 동적, api 제외
  if (/\(|_|\[|^\/api\//.test(route)) return null;
  return route;
}

export function buildManifest(entries) {
  const out = {};
  for (const { file, isoDate } of entries) {
    const route = pageFileToRoute(file);
    if (!route || !isoDate) continue;
    out[route] = isoDate;
  }
  return out;
}
