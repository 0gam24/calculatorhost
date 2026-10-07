// NAVER 공식 API 클라이언트 (API HUB ↔ 개발자센터 레거시 이중 지원).
//
// 원본: awoo `scripts/naver-rank-check.mjs`·`keyword-radar.mjs` 의 loadEnv·authHeaders·apiGet.
// - API HUB(2026-06-25 출시): 도메인 naverapihub.apigw.ntruss.com, 헤더 X-NCP-APIGW-API-KEY-ID/KEY.
//   calculatorhost 전용 앱 키 env 이름은 awoo 와 같은 NCP_API_KEY_ID · NCP_API_KEY.
// - 레거시(developers.naver.com): openapi.naver.com, 헤더 X-Naver-Client-Id/Secret.
//   NAVER_CLIENT_ID · NAVER_CLIENT_SECRET. 2차 출처 기준 2027-06-30 까지 사용 가능.
// HUB 키가 있으면 HUB, 없으면 레거시. 둘 다 없으면 호출하지 않는다.
//
// 보안: 키 값은 어디에도 출력하지 않는다. .env·.env.local 은 이 모듈만 읽고 값을 돌려주지 않는다
// (CLAUDE.md 시크릿 규칙). 네이버 통합검색 HTML 은 robots.txt 가 막으므로 수집하지 않는다
// (awoo 2026-09-15 결정과 같음) — 공식 API 만 쓴다.
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { countCall } from './api-quota.mjs';

const ENDPOINTS = {
  hub: {
    webkr: 'https://naverapihub.apigw.ntruss.com/search/v1/webkr',
    blog: 'https://naverapihub.apigw.ntruss.com/search/v1/blog',
    cafearticle: 'https://naverapihub.apigw.ntruss.com/search/v1/cafearticle',
    kin: 'https://naverapihub.apigw.ntruss.com/search/v1/kin',
    news: 'https://naverapihub.apigw.ntruss.com/search/v1/news',
    trend: 'https://naverapihub.apigw.ntruss.com/search-trend/v1/search',
  },
  legacy: {
    webkr: 'https://openapi.naver.com/v1/search/webkr.json',
    blog: 'https://openapi.naver.com/v1/search/blog.json',
    cafearticle: 'https://openapi.naver.com/v1/search/cafearticle.json',
    kin: 'https://openapi.naver.com/v1/search/kin.json',
    news: 'https://openapi.naver.com/v1/search/news.json',
    trend: 'https://openapi.naver.com/v1/datalab/search',
  },
};

/** 엔드포인트 URL. 모르는 이름은 오류. */
export function endpointFor(mode, name) {
  const url = ENDPOINTS[mode]?.[name];
  if (!url) throw new Error(`[naver-api] 알 수 없는 엔드포인트 ${mode}/${name}`);
  return url;
}

/**
 * 인증 방식 선택 (순수). 반쪽 키는 없는 것으로 본다.
 * @returns {{mode: 'hub'|'legacy'|null, headers: Record<string,string>}}
 */
export function authFor(env) {
  if (env.NCP_API_KEY_ID && env.NCP_API_KEY) {
    return {
      mode: 'hub',
      headers: { 'X-NCP-APIGW-API-KEY-ID': env.NCP_API_KEY_ID, 'X-NCP-APIGW-API-KEY': env.NCP_API_KEY },
    };
  }
  if (env.NAVER_CLIENT_ID && env.NAVER_CLIENT_SECRET) {
    return {
      mode: 'legacy',
      headers: { 'X-Naver-Client-Id': env.NAVER_CLIENT_ID, 'X-Naver-Client-Secret': env.NAVER_CLIENT_SECRET },
    };
  }
  return { mode: null, headers: {} };
}

/** .env → .env.local 순으로 읽어 process.env 위에 얹는다 (이미 있는 값 우선). 값은 반환 객체 안에만. */
export async function loadEnv(root) {
  const env = { ...process.env };
  for (const file of ['.env', '.env.local']) {
    try {
      const text = await readFile(join(root, file), 'utf8');
      for (const line of text.split(/\r?\n/)) {
        const m = line.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
        if (m && !env[m[1]]) env[m[1]] = m[2].replace(/^['"]|['"]$/g, '').trim();
      }
    } catch {
      /* 파일이 없으면 process.env 만 */
    }
  }
  return env;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * 검색 API GET. 429(초당 한도)만 한 번 쉬고 다시 시도한다.
 * @param {{mode:string, headers:object}} auth  authFor() 결과
 */
export async function apiGet(auth, name, params) {
  if (!auth.mode) throw new Error('[naver-api] 키 없음: NCP_API_KEY_ID·NCP_API_KEY 또는 NAVER_CLIENT_ID·NAVER_CLIENT_SECRET');
  const url = `${endpointFor(auth.mode, name)}?${new URLSearchParams(params)}`;
  for (let attempt = 1; attempt <= 2; attempt++) {
    countCall('search', name);
    const res = await fetch(url, { headers: auth.headers });
    if (res.ok) return res.json();
    if (res.status === 429 && attempt === 1) {
      await sleep(1500);
      continue;
    }
    throw new Error(`[naver-api] ${name} ${res.status} (${auth.mode})`);
  }
}

/** 데이터랩 검색어 트렌드 POST. 요청 1회 최대 5개 그룹. */
export async function apiTrend(auth, body) {
  if (!auth.mode) throw new Error('[naver-api] 키 없음');
  countCall('datalab', 'trend');
  const res = await fetch(endpointFor(auth.mode, 'trend'), {
    method: 'POST',
    headers: { ...auth.headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`[naver-api] trend ${res.status} (${auth.mode})`);
  return res.json();
}
