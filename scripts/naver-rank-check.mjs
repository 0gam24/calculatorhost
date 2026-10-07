/**
 * naver-rank-check: 네이버 웹문서 검색에서 자사 순위와 빈자리를 잰다.
 *
 * 원본: awoo `scripts/naver-rank-check.mjs` (2026-09-15 공식 API 전환판).
 * 이식 지침서 `01 awoo/docs/ops/KEYWORD-SYSTEM-PORT-PROMPT.md` 2단계. 판정 로직은 scripts/lib/serp-classify.mjs.
 *
 * 수동 실행 전용. 자동 실행(GitHub Actions)은 없다 (운영자 결정 2026-10-07, STATE.md §5).
 *
 * 두 모드:
 *   --mode=track (기본) docs/ops/rank-targets.json 의 쿼리를 재서 docs/ops/naver-ranks.json 에 이력을 쌓는다.
 *   --mode=scout        발행 전 정찰. --query / --file 로 받은 쿼리를 재고 **저장하지 않고** stdout 에 JSON 만 낸다.
 *
 * 사용:
 *   node scripts/naver-rank-check.mjs                                   # track
 *   node scripts/naver-rank-check.mjs --mode=scout --query="청약가점 계산기"
 *   node scripts/naver-rank-check.mjs --mode=scout --file=queries.txt  # 한 줄에 하나, '#' 무시
 *   node scripts/naver-rank-check.mjs --mode=scout --query="청약가점 계산기" --mock   # 키 없이 가짜 응답
 *   옵션: --limit=N · --dry-run(track 저장 생략) · --help
 *
 * scout 출력 한 건의 키 이름은 awoo 계약과 같다(이후 파이프라인이 그대로 읽는다). 추가 키: toolAbove.
 *
 * 측정 방식: 공식 웹문서 검색 API(display 30) + 뉴스 API(최근 7일 언론 벽, 기록만).
 * 네이버 통합검색 HTML 은 robots.txt 가 막으므로 읽지 않는다. 웹문서 블록 위치는 운영자 눈 확인(eye-offset)으로 받는다.
 * rank null = 웹문서 30위 안 미노출. 트래픽 0 이라는 뜻은 아니다.
 *
 * 인증: NCP_API_KEY_ID·NCP_API_KEY(HUB) 또는 NAVER_CLIENT_ID·NAVER_CLIENT_SECRET(레거시). 값은 출력하지 않는다.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { formatUsage } from './lib/api-quota.mjs';
import { EYE_LABEL, eyeFor, loadEyeStore } from './lib/eye-offset.mjs';
import { apiGet, authFor, loadEnv } from './lib/naver-api.mjs';
import { SITE_HOST, buildAbove, parseResults, stripTags, verdicts } from './lib/serp-classify.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TARGETS_FILE = join(ROOT, 'docs', 'ops', 'rank-targets.json');
const SISTER_FILE = join(ROOT, 'docs', 'ops', 'sister-sites.json');
const OUT_FILE = join(ROOT, 'docs', 'ops', 'naver-ranks.json');
const MOCK_FILE = join(ROOT, 'scripts', 'fixtures', 'naver-webkr-mock.json');

const DELAY_MS = 300;
const MAX_PER_RUN = 40;
const MAX_SCOUT_PER_RUN = 35; // awoo 정찰 예산과 같다. 쿼리당 호출 2회(webkr·news)
const KEEP_DAYS = 90;
const WEBKR_DISPLAY = 30;
const NEWS_DISPLAY = 100;
const NEWS_DAYS = 7;
const MEASURED_BY = 'webkr-api';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const kstDate = () => new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
const kstYear = () => Number(kstDate().slice(0, 4));

async function loadSisterHosts() {
  try {
    const f = JSON.parse(await readFile(SISTER_FILE, 'utf8'));
    return new Set((f.hosts ?? []).map((h) => String(h).toLowerCase().replace(/^www\./, '')));
  } catch {
    return new Set();
  }
}

const newsTitleKey = (t) =>
  stripTags(t)
    .replace(/\[[^\]]*\]|【[^】]*】/g, '')
    .replace(/[^가-힣A-Za-z0-9]/g, '')
    .toLowerCase();

/** 뉴스 벽(언론 점령 대리지표). 최근 7일 기사 수와 같은 제목 묶음 최대 크기. 판정에는 쓰지 않고 경고만. */
async function fetchNewsWall(get, query) {
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

/** 한 쿼리 측정 */
async function measure(get, query, ctx) {
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
    webDocOffset: null, // API 로 잴 수 없다 → eyeOffset
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
    measuredBy: ctx.mock ? 'mock' : MEASURED_BY,
    measuredAt: new Date().toISOString(),
    unmeasured: ['webDocOffset', 'pressAbove', 'ugc', 'onPage'],
    above,
  };
}

/** --mock: 픽스처에서 webkr 응답을 꺼내고 뉴스는 빈 응답. 픽스처에 없는 쿼리는 빈 결과. */
async function mockGetter() {
  const fx = JSON.parse(await readFile(MOCK_FILE, 'utf8'));
  return async (name, params) => {
    if (name === 'news') return { items: [] };
    return fx[params.query] ?? { total: 0, items: [] };
  };
}

async function loadQueryFile(path) {
  const text = await readFile(join(ROOT, path), 'utf8');
  try {
    const j = JSON.parse(text);
    const arr = Array.isArray(j) ? j : j.queries ?? [];
    return arr.map((x) => (typeof x === 'string' ? x : x.query)).filter(Boolean);
  } catch {
    return text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#'));
  }
}

async function loadStore() {
  try {
    return JSON.parse(await readFile(OUT_FILE, 'utf8'));
  } catch {
    return { _comment: 'naver-rank-check track 이력. 로컬 전용(gitignore).', byQuery: {} };
  }
}

function record(store, date, m) {
  const list = (store.byQuery[m.query] ??= []);
  const row = {
    date,
    rank: m.rank,
    openSlots: m.openSlots,
    mainGovAbove: m.mainGovAbove,
    toolAbove: m.toolAbove,
    sisterAbove: m.sisterAbove,
    verdictT1: m.verdictT1,
    verdictT2: m.verdictT2,
    webDocTotal: m.webDocTotal,
    measuredBy: m.measuredBy,
  };
  const i = list.findIndex((r) => r.date === date);
  if (i === -1) list.push(row);
  else list[i] = row;
  const cutoff = new Date(Date.now() - KEEP_DAYS * 86400_000).toISOString().slice(0, 10);
  store.byQuery[m.query] = list.filter((r) => r.date >= cutoff).sort((a, b) => a.date.localeCompare(b.date));
}

const summary = (m) =>
  `${m.query} | 자사 ${m.rank ?? '-'}위 · 빈자리 ${m.openSlots} (도구 ${m.toolAbove}) · 관공서 ${m.mainGovAbove} · ` +
  `자매 ${m.sisterAbove} · 뉴스7일 ${m.newsWall} · 눈 ${m.eyeOffset ? EYE_LABEL[m.eyeOffset] : '-'} · ` +
  `T1 ${m.verdictT1} T2 ${m.verdictT2}`;

function usage() {
  console.log(`사용:
  node scripts/naver-rank-check.mjs                                  # track (docs/ops/rank-targets.json)
  node scripts/naver-rank-check.mjs --mode=scout --query="쿼리"
  node scripts/naver-rank-check.mjs --mode=scout --file=파일
  옵션: --limit=N  --dry-run  --mock  --help`);
}

const KNOWN_FLAGS = new Set(['--dry-run', '--mock', '--help', '-h']);
const KNOWN_PREFIXES = ['--mode=', '--query=', '--file=', '--limit='];

async function main() {
  const args = process.argv.slice(2);
  const unknown = args.filter((a) => !KNOWN_FLAGS.has(a) && !KNOWN_PREFIXES.some((p) => a.startsWith(p)));
  if (args.includes('--help') || args.includes('-h')) return usage();
  if (unknown.length) {
    console.error(`모르는 인자: ${unknown.join(' ')}`);
    usage();
    process.exit(2);
  }
  const opt = (p) => args.find((a) => a.startsWith(p))?.slice(p.length);
  const mode = opt('--mode=') ?? 'track';
  const mock = args.includes('--mock');
  const dryRun = args.includes('--dry-run');
  const limit = Number(opt('--limit=')) || null;

  let get;
  if (mock) {
    get = await mockGetter();
  } else {
    const auth = authFor(await loadEnv(ROOT));
    if (!auth.mode) {
      console.error('[naver-rank-check] 키 없음. .env.local 에 NCP_API_KEY_ID·NCP_API_KEY (또는 NAVER_CLIENT_ID·NAVER_CLIENT_SECRET) 필요. --mock 으로 동작만 확인할 수 있다.');
      process.exit(2);
    }
    console.error(`[naver-rank-check] 인증 ${auth.mode === 'hub' ? 'NAVER API HUB' : '개발자센터(레거시)'}`);
    get = (name, params) => apiGet(auth, name, params);
  }
  const ctx = { sisters: await loadSisterHosts(), eyeStore: await loadEyeStore(), mock };

  let queries;
  if (mode === 'scout') {
    const q = opt('--query=');
    const f = opt('--file=');
    queries = q ? [q] : f ? await loadQueryFile(f) : [];
    if (!queries.length) {
      console.error('scout 는 --query 또는 --file 이 필요하다');
      process.exit(2);
    }
    queries = queries.slice(0, Math.min(limit ?? MAX_SCOUT_PER_RUN, MAX_SCOUT_PER_RUN));
  } else if (mode === 'track') {
    const t = JSON.parse(await readFile(TARGETS_FILE, 'utf8'));
    queries = (t.targets ?? []).map((x) => x.query);
    queries = queries.slice(0, Math.min(limit ?? MAX_PER_RUN, MAX_PER_RUN));
  } else {
    console.error(`모르는 모드: ${mode}`);
    process.exit(2);
  }

  const results = [];
  const failed = [];
  for (const [i, q] of queries.entries()) {
    try {
      const m = await measure(get, q, ctx);
      results.push(m);
      console.error(summary(m));
    } catch (e) {
      failed.push({ query: q, error: String(e.message ?? e) });
      console.error(`${q} | 측정 실패: ${e.message ?? e}`);
    }
    if (!mock && i < queries.length - 1) await sleep(DELAY_MS);
  }

  if (mode === 'scout') {
    const out = queries.length === 1 && results.length === 1 ? results[0] : results;
    process.stdout.write(`${JSON.stringify(out, null, 2)}\n`);
  } else if (!dryRun && !mock) {
    const store = await loadStore();
    const date = kstDate();
    for (const m of results) record(store, date, m);
    store.updatedAt = new Date().toISOString();
    await writeFile(OUT_FILE, `${JSON.stringify(store, null, 2)}\n`, 'utf8');
    console.error(`[naver-rank-check] 저장 ${results.length}건 → docs/ops/naver-ranks.json`);
  }

  const t1 = results.filter((r) => r.verdictT1 === 'open').length;
  const t2 = results.filter((r) => r.verdictT2 === 'open').length;
  console.error(
    `[naver-rank-check] ${mode} ${results.length}건 · 실패 ${failed.length} · T1 열림 ${t1} · T2 열림 ${t2} · 자사 사이트 ${SITE_HOST}`,
  );
  if (!mock) console.error(formatUsage());
  if (failed.length && !results.length) process.exit(1);
}

main().catch((e) => {
  console.error(`[naver-rank-check] ${e.message ?? e}`);
  process.exit(1);
});
