/**
 * STATE.md 마커 기반 섹션 갱신 유틸.
 *
 * 자동 갱신 영역은 HTML 주석 마커로 감싸고, 운영자 수동 영역은 그대로 보존.
 * 의존성 0 모듈 — 단위 테스트 가능.
 */

export const AUTO_MARKER_START = '<!-- AUTO:NAME -->';
export const AUTO_MARKER_END = '<!-- /AUTO:NAME -->';

function markerStart(name) {
  return `<!-- AUTO:${name} -->`;
}
function markerEnd(name) {
  return `<!-- /AUTO:${name} -->`;
}

export function buildAutoSection(name, content) {
  const body = content.endsWith('\n') ? content : `${content}\n`;
  return `${markerStart(name)}\n${body}${markerEnd(name)}`;
}

export function replaceAutoSection(original, name, content) {
  const start = markerStart(name);
  const end = markerEnd(name);
  // 마커 사이 (포함) 전체를 매치 — 마커 자체는 정규식에서 안전한 형태.
  const escapedStart = start.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedEnd = end.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const sectionRegex = new RegExp(`${escapedStart}[\\s\\S]*?${escapedEnd}`);
  const newSection = buildAutoSection(name, content);

  if (sectionRegex.test(original)) {
    return original.replace(sectionRegex, newSection);
  }
  // 마커 없음 → 파일 끝에 새 섹션 append (앞뒤 줄바꿈 보장)
  const sep = original.endsWith('\n\n') ? '' : original.endsWith('\n') ? '\n' : '\n\n';
  return `${original}${sep}${newSection}\n`;
}
