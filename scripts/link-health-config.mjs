/**
 * ralph-link-health.mjs 화이트리스트 설정.
 *
 * 4xx/5xx 응답을 반환하지만 실제로는 정상 동작하는 도메인 목록.
 * stuck.md 에 false positive 로 적재되지 않도록 알림에서 제외.
 *
 * - Google AdSense 트래커: HEAD/GET 모두 404 반환이 정상 (광고 흐름은 동적 endpoint).
 * - 국세청(www.nts.go.kr): 봇 차단으로 루트 GET 시 400 반환. 실제 페이지는 동작.
 *
 * 단위 테스트 가능하도록 의존성 0 + 부수효과 0 모듈로 분리.
 */

export const IGNORE_DOMAINS = new Set([
  'adservice.google.com',
  'pagead2.googlesyndication.com',
  'googleads.g.doubleclick.net',
  'www.nts.go.kr',
]);

export function isIgnored(domain) {
  if (!domain) return false;
  return IGNORE_DOMAINS.has(domain);
}
