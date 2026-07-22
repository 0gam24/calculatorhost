/**
 * dateModified manifest 매칭 헬퍼.
 *
 * jsonld 빌더가 페이지 URL 로 manifest 를 조회하여 git 기반 마지막 변경 시각을 자동 채움.
 * 미매칭 시 undefined → 호출자에서 하드코딩 fallback.
 *
 * Manifest 는 prebuild 단계에서 `scripts/generate-date-modified-manifest.mjs` 가 생성.
 */

import manifest from '@/data/date-modified-manifest.json';

export type DateModifiedManifest = Record<string, string>;

export function getDateModifiedFromManifest(
  url: string,
  source: DateModifiedManifest = manifest as DateModifiedManifest,
): string | undefined {
  try {
    const u = new URL(url);
    return source[u.pathname];
  } catch {
    return undefined;
  }
}

/**
 * sitemap lastmod 용: route 경로(`/calculator/salary/`)로 manifest(git 커밋 시각)를
 * 우선 조회하고, 미등록·무효 값이면 fallback (파일 mtime 등)을 사용.
 *
 * CI(Cloudflare Pages) 클론은 mtime 이 전부 빌드 시각이 되므로 git 기반 manifest 가
 * 정확한 lastmod 신호다 (Google: lastmod 는 일관·정확할 때만 신뢰).
 */
export function getLastModifiedForRoute(
  route: string,
  fallback: () => string,
  source: DateModifiedManifest = manifest as DateModifiedManifest,
): string {
  const iso = source[route];
  if (iso) {
    const d = new Date(iso);
    if (!Number.isNaN(d.getTime())) return d.toISOString();
  }
  return fallback();
}
