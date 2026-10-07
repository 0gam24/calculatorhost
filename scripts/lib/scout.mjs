// 검색 결과 1건 측정 (naver-rank-check · keyword-pipeline 공용).
//
// 원본: awoo `scripts/naver-rank-check.mjs` measure·fetchNewsWall. 판정은 serp-classify.mjs.
// 공식 웹문서 검색 API(display 30) + 뉴스 API(최근 7일 언론 벽, 기록만). 네이버 통합검색 HTML 은 읽지 않는다.
import { eyeFor } from './eye-offset.mjs';
import { buildAbove, parseResults, stripTags, verdicts } from './serp-classify.mjs';

const WEBKR_DISPLAY = 30;
const NEWS_DISPLAY = 100;
const NEWS_DAYS = 7;

const kstYear = () => Number(new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 4));
const newsTitleKey = (t) =>
  stripTags(t)
    .replace(/\[[^\]]*\]|【[^】]*】/g, '')
    .replace(/[^가-힣A-Za-z0-9]/g, '')
    .toLowerCase();

/** 뉴스 벽(언론 점령 대리지표). 최근 7일 기사 수와 같은 제목 묶음 최대 크기. 판정엔 안 쓰고 경고만. */
export async function fetchNewsWall(get, query) {
  const json = await get('news', { query, display: NEWS_DISPLAY, sort: 'date' });
  const since = Date.now() - NEWS_DAYS * 86400_000;
  const recent = (json.items ?? []).filter((it) => {
    const t = Date.parse(it.pubDate);
    return Number.isFinite(t) && t >= since;
  });
  const groups = new Map();
  for (const it of recent) {
    const k = newsTitleKey(it.title);
    if (k.length >= 8) groups.set(k, (groups.get(k) ?? 0) + 1);
  }
  return {
    newsWall: recent.length,
    newsWallCapped: recent.length >= NEWS_DISPLAY,
    newsSameTitle: groups.size ? Math.max(...groups.values()) : 0,
  };
}

/**
 * 한 쿼리 측정. 출력 키는 awoo scout 계약과 같다(+ toolAbove·toolCount).
 * @param {(name:string, params:object)=>Promise<any>} get  API 호출기 (실제 또는 mock)
 * @param {string} query
 * @param {{sisters:Set<string>, eyeStore:object, mock?:boolean}} ctx
 */
export async function measureQuery(get, query, ctx) {
  const json = await get('webkr', { query, display: WEBKR_DISPLAY, start: 1 });
  const s = parseResults(json, { sisters: ctx.sisters, year: kstYear() });
  const news = await fetchNewsWall(get, query);
  const idx = s.webDocs.findIndex((d) => d.kind === 'us');
  const rank = idx === -1 ? null : idx + 1;
  const { above, wholeWindow } = buildAbove(s.webDocs, idx);
  const eyeOffset = eyeFor(ctx.eyeStore, query);
  const v = verdicts({ rank, above, eyeOffset, news });
  return {
    query,
    rank,
    url: idx === -1 ? null : s.webDocs[idx].url,
    webDocCount: s.webDocCount,
    webDocRaw: s.webDocRaw,
    webDocTotal: s.webDocTotal,
    aboveIsWholeBlock: wholeWindow,
    ...v,
    webDocOffset: null,
    eyeOffset,
    ...news,
    toolCount: s.toolCount,
    pressCount: s.pressCount,
    commercialCount: s.commercialCount,
    sisterCount: s.sisterCount,
    institutionalCount: s.institutionalCount,
    institutionalOpenCount: s.institutionalOpenCount,
    mainGovCount: s.mainGovCount,
    onPage: null,
    parseOk: true,
    measuredBy: ctx.mock ? 'mock' : 'webkr-api',
    measuredAt: new Date().toISOString(),
    unmeasured: ['webDocOffset', 'pressAbove', 'ugc', 'onPage'],
    above,
  };
}
