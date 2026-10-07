// NAVER API 호출량 집계 + 한 실행 안전핀.
//
// 원본: awoo `scripts/lib/api-quota.mjs`. 한도는 NAVER API HUB 공식 FAQ(2026-09-17 갱신):
// 검색 카테고리 통합 월 775,000건, 검색어 트렌드 월 50,000건, 키당 50 RPS.
// calculatorhost 는 전용 앱 키를 쓴다(운영자 결정 2026-10-07) — awoo 와 한도를 나눠 쓰지 않는다.
// 자동 실행이 없으므로 "하루 N회 스케줄" 추정 대신 이번 실행 호출 수만 보고한다.

export const QUOTA = {
  search: { label: 'NAVER 검색 (블로그·웹문서·카페·뉴스 등 통합)', monthly: 775_000 },
  datalab: { label: 'DataLab 검색어 트렌드', monthly: 50_000 },
};

// 한 번의 실행이 이 횟수를 넘으면 루프 버그로 보고 즉시 멈춘다. 한도를 태우기 전에 잡는 안전핀.
const RUN_CEILING = 500;

const counts = new Map(); // "group:name" → n

/** API 호출 1건 기록. group 은 QUOTA 의 키(search|datalab). */
export function countCall(group, name) {
  const key = `${group}:${name}`;
  counts.set(key, (counts.get(key) ?? 0) + 1);
  const total = totalCalls();
  if (total > RUN_CEILING) {
    throw new Error(`[api-quota] 한 실행에서 ${total}회 호출, 상한 ${RUN_CEILING} 초과. 호출 루프를 확인하라.`);
  }
}

export const totalCalls = () => [...counts.values()].reduce((s, v) => s + v, 0);

/** 콘솔 출력용 한 줄 요약 */
export function formatUsage() {
  const parts = [...counts.entries()].map(([k, n]) => `${k} ${n}`);
  return `[api-quota] 이번 실행 ${totalCalls()}회${parts.length ? ` (${parts.join(' · ')})` : ''}`;
}
