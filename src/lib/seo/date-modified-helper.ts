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
