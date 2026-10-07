/**
 * keyword-pipeline: 오늘 쓸 글감 큐를 만든다.
 *
 * 원본: awoo `scripts/keyword-pipeline.mjs`. 이식 지침서 3단계. 순수 로직은 scripts/lib/pipeline-core.mjs,
 * 점수는 lib/exposure.mjs, 수익 배수·하루 달러는 lib/revenue-weight.mjs.
 * 수동 실행 전용 — 운영자가 "목록"을 열 때 돈다. 자동 실행 없음 (운영자 결정 2026-10-07).
 *
 * 흐름: 후보(T2 큰 키워드·별칭 + T3 캘린더) → 검색량(데이터랩, 실업급여=100) → T2 는 최근 7일 1.5 미만 탈락
 *       → 기존 글 겹침(가이드 제목에 검색어가 통째로 있으면 보강으로) → 검색 결과 정찰(--serp)
 *       → 노출 가능성 점수 × 수익 배수 정렬 → docs/ops/pipeline-queue.json + docs/ops/DAILY-KEYWORDS.md
 *
 * 사용:
 *   node scripts/keyword-pipeline.mjs                 # 검색량만 새로 재고, 정찰은 7일 안 결과 재사용
 *   node scripts/keyword-pipeline.mjs --serp          # 검색량 상위부터 정찰(예산 35건, API HUB 키 필요)
 *   node scripts/keyword-pipeline.mjs --serp-replay   # API 호출 없이 큐를 다시 만든다(눈 확인 반영용)
 *   node scripts/keyword-pipeline.mjs --scout="쿼리"   # 그 쿼리만 정찰하고 큐 갱신
 *   옵션: --mock-serp (정찰을 픽스처로) · --budget=N
 */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { measureVolumes } from './keyword-volume.mjs';
import { formatUsage } from './lib/api-quota.mjs';
import { EYE_LABEL, eyeFor, loadEyeStore } from './lib/eye-offset.mjs';
import { exposureOf } from './lib/exposure.mjs';
import { apiGet, authFor, loadEnv } from './lib/naver-api.mjs';
import { buildCandidates, carryManual, coverageOf, manualItem, mergeQueue, parseGuideIndex } from './lib/pipeline-core.mjs';
import { revenueOf, usdPerDay, valueOrder } from './lib/revenue-weight.mjs';
import { measureQuery } from './lib/scout.mjs';
import { verdicts } from './lib/serp-classify.mjs';
import { NOISE_FLOOR } from './lib/volume-core.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const P = (...s) => join(ROOT, ...s);
const QUEUE_FILE = P('docs', 'ops', 'pipeline-queue.json');
const REPORT_FILE = P('docs', 'ops', 'DAILY-KEYWORDS.md');
const SERP_REUSE_DAYS = 7;
const DEFAULT_BUDGET = 35; // awoo 정찰 예산과 같다
const DELAY_MS = 300;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const kstNow = () => new Date(Date.now() + 9 * 3600 * 1000);
const kstDate = () => kstNow().toISOString().slice(0, 10);
const norm = (s) => String(s ?? '').replace(/\s+/g, '');
const daysAgo = (iso) => (Date.now() - Date.parse(iso)) / 86400_000;

async function readJson(file, fallback = null) {
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch {
    return fallback;
  }
}

/** 이전 정찰 결과에 오늘 눈 확인을 다시 입혀 판정을 새로 계산한다(API 호출 없음). */
function reapplyEye(serp, eyeStore) {
  if (!serp) return null;
  const eyeOffset = eyeFor(eyeStore, serp.query);
  return { ...serp, eyeOffset, ...verdicts({ rank: serp.rank, above: serp.above ?? [], eyeOffset }) };
}

function conditionOf(item) {
  const c = [];
  if (item.widgetRisk) c.push('네이버 자체 계산기 위젯 가능성, 눈 확인 필요');
  if (item.action?.type === 'guide') c.push(`기존 글 보강: ${item.action.target}`);
  if (item.action?.type === 'calculator') c.push(`계산기 보강: ${item.action.target}`);
  if (item.action?.type === 'new-calculator') c.push('새 계산기 필요 (운영자 결정)');
  if (item.note) c.push(item.note);
  return c.join(' · ');
}

async function main() {
  const argv = process.argv.slice(2);
  const opt = (p) => argv.find((a) => a.startsWith(p))?.slice(p.length);
  const doSerp = argv.includes('--serp');
  const replay = argv.includes('--serp-replay');
  const mockSerp = argv.includes('--mock-serp');
  const scoutOne = opt('--scout=');
  const budget = Number(opt('--budget=')) || DEFAULT_BUDGET;
  const today = kstDate();

  const [bigKeywords, calendar, prevQueue, sisterFile, guideSrc, eyeStore] = await Promise.all([
    readJson(P('docs', 'ops', 'big-keywords.json'), { keywords: [] }),
    readJson(P('docs', 'ops', 'landgrab-calendar.json'), { items: [] }),
    readJson(QUEUE_FILE, { items: [] }),
    readJson(P('docs', 'ops', 'sister-sites.json'), { hosts: [] }),
    readFile(P('src', 'app', 'guide', 'page.tsx'), 'utf8'),
    loadEyeStore(),
  ]);
  const money = await readJson(P('docs', 'ops', 'adsense-private', 'rpm-groups.json'));
  const guides = parseGuideIndex(guideSrc);
  const sisters = new Set((sisterFile.hosts ?? []).map((h) => String(h).toLowerCase().replace(/^www\./, '')));
  const prevByQuery = new Map((prevQueue.items ?? []).map((i) => [norm(i.query), i]));

  // 1) 후보
  let items = buildCandidates({ bigKeywords, calendar, today });
  // 손으로 넣은 '빈틈:' 항목(21일 안)도 매번 다시 잰다 — 안 그러면 처음 점수에 얼어붙는다
  items.push(...carryManual(prevQueue.items, items, today));

  // 2) 검색량. --serp-replay 는 API 를 부르지 않고 이전 값을 쓴다.
  const auth = authFor(await loadEnv(ROOT));
  let volumeMeasured = false;
  if (!replay && auth.mode) {
    const { rows } = await measureVolumes(auth, items.map((i) => i.query));
    const byTerm = new Map(rows.map((r) => [r.term, r]));
    items = items.map((i) => {
      const r = byTerm.get(i.query);
      return r?.measured
        ? { ...i, recent7: r.recentRelative, relative: r.relative, trend: r.trend, born: r.born }
        : { ...i, recent7: r ? 0 : null, volumeNote: r?.note };
    });
    volumeMeasured = true;
  } else {
    // 이전 실행이 잰 값 전체(탈락분 포함)를 쓴다. 큐 items 에는 통과분만 있어서 그것만 보면 탈락분이 되살아난다.
    const prevVol = prevQueue.meta?.volumes ?? {};
    items = items.map((i) => {
      const v = prevVol[norm(i.query)];
      return v ? { ...i, ...v } : i;
    });
  }
  // 이번에 알게 된 검색량 전체를 메타에 남긴다 (다음 --serp-replay 용)
  const volumes = Object.fromEntries(
    items
      .filter((i) => i.recent7 != null)
      .map((i) => [norm(i.query), { recent7: i.recent7, relative: i.relative, trend: i.trend, born: i.born }]),
  );

  // 3) T2 검색량 게이트(정렬용 최소선). T3 는 계절 피크로 뽑았으니 면제. 운영자가 손으로 넣은 '빈틈:' 도 면제.
  const dropped = [];
  items = items.filter((i) => {
    if (i.track === 'T2' && !String(i.id).startsWith('빈틈:') && i.recent7 != null && i.recent7 < NOISE_FLOOR) {
      dropped.push({ query: i.query, reason: `검색량 ${i.recent7} < ${NOISE_FLOOR}` });
      return false;
    }
    return true;
  });

  // 4) 기존 글 겹침 → 새 글 대신 그 글 보강
  items = items.map((i) => {
    if (i.action?.type !== 'new') return i;
    const slug = coverageOf(i.query, guides);
    return slug ? { ...i, action: { type: 'guide', target: `/guide/${slug}/` } } : i;
  });

  // 5) 정찰. 기본은 7일 안 결과 재사용(+오늘 눈 확인 재적용). --serp 면 새로 잰다.
  let serpMeasured = 0;
  let serpAvailable = true;
  let serpNote = '';
  items = items.map((i) => {
    const p = prevByQuery.get(norm(i.query));
    // 가짜 응답(--mock-serp)으로 잰 값은 재사용하지 않는다 — 실측처럼 큐에 남으면 판정이 오염된다
    const fresh =
      p?.serp?.measuredAt && p.serp.measuredBy !== 'mock' && daysAgo(p.serp.measuredAt) <= SERP_REUSE_DAYS;
    return fresh ? { ...i, serp: reapplyEye(p.serp, eyeStore) } : { ...i, serp: null };
  });
  if ((doSerp || scoutOne) && !replay) {
    let get;
    if (mockSerp) {
      const fx = await readJson(P('scripts', 'fixtures', 'naver-webkr-mock.json'), {});
      get = async (name, params) => (name === 'news' ? { items: [] } : fx[params.query] ?? { total: 0, items: [] });
    } else if (auth.mode) {
      get = (name, params) => apiGet(auth, name, params);
    }
    const ctx = { sisters, eyeStore, mock: mockSerp };
    const targets = scoutOne
      ? items.filter((i) => norm(i.query) === norm(scoutOne))
      : [...items].sort((a, b) => (b.recent7 ?? 0) - (a.recent7 ?? 0)).slice(0, budget);
    if (scoutOne && !targets.length) {
      // 후보에 없으면 손 항목으로 넣는다. 캘린더 주제([선점])면 그 처리 방식을 따른다.
      items.push({ ...manualItem(scoutOne, calendar, today), serp: null });
      targets.push(items[items.length - 1]);
    }
    for (const t of targets) {
      if (!get) break;
      try {
        t.serp = await measureQuery(get, t.query, ctx);
        serpMeasured++;
      } catch (e) {
        serpAvailable = false;
        serpNote = String(e.message ?? e);
        break; // 401 등 인증 문제면 나머지도 실패한다 — 한도를 태우지 않는다
      }
      if (!mockSerp) await sleep(DELAY_MS);
    }
  }

  // 6) 점수 · 수익
  items = items.map((i) => {
    const exposure = exposureOf(i);
    const usd = usdPerDay(i, money);
    return {
      ...i,
      status: 'proposed',
      exposure,
      revenue: revenueOf(i),
      ...(usd != null ? { usdPerDay: Math.round(usd * 100) / 100 } : {}),
      condition: conditionOf(i),
    };
  });

  // 7) 이전 큐의 운영자 상태 보존 + 정렬
  const merged = mergeQueue(prevQueue.items ?? [], items, today);
  const scored = merged.filter((i) => i.exposure?.score != null).sort(valueOrder);
  const pending = merged.filter((i) => i.exposure?.score == null).sort((a, b) => (b.recent7 ?? 0) - (a.recent7 ?? 0));
  const out = {
    _comment: 'scripts/keyword-pipeline.mjs 산출. 로컬 전용(gitignore). status: proposed/approved/published/hold/rejected.',
    meta: {
      today,
      generatedAt: new Date().toISOString(),
      benchmark: '실업급여',
      volumeMeasured,
      serpMeasured,
      serpAvailable,
      ...(serpNote ? { serpNote } : {}),
      authMode: auth.mode,
      candidates: merged.length,
      dropped,
      money: money ? { goalPerDay: money.goalPerDay, assumed: !!money.assumed } : null,
      volumes,
    },
    items: [...scored, ...pending],
  };
  await writeFile(QUEUE_FILE, `${JSON.stringify(out, null, 2)}\n`, 'utf8');

  // 8) 사람이 읽는 보고서
  const line = (i) =>
    `| ${i.query} | ${i.track} | ${i.recent7 ?? '-'} | ${i.exposure?.score ?? '미측정'} | ${(i.exposure?.reasons ?? []).join(' · ')} | ${i.usdPerDay ?? '-'} | ${i.condition || ''} |`;
  const md = [
    `# 오늘 쓸 글감 (${today})`,
    '',
    `> 생성 ${out.meta.generatedAt} · 검색량 ${volumeMeasured ? '새로 잼' : '이전 값'} · 정찰 ${serpMeasured}건${serpAvailable ? '' : ` (중단: ${serpNote})`} · 기준 실업급여=100`,
    money?.assumed ? `> 하루 달러는 **가정 RPM** 으로 계산 (docs/ops/adsense-private/rpm-groups.json). 실제 애드센스 자료가 생기면 바꾼다.` : '',
    '',
    '## 읽는 법',
    '- 검색량: 데이터랩 최근 7일, 실업급여=100. 게이트가 아니라 정렬용.',
    '- 노출 가능성(0~100): 자리 열림 40 + 경쟁 계산기 5 + 빈자리 5~15 + 관공서 없음 10 + 눈 확인 첫 화면 10 + … (scripts/lib/exposure.mjs). 70↑ 높음 · 45~69 중간.',
    '- 하루 달러: 1~3위일 때 추정. 검색량 x 주 50명/점(awoo 실측 계수) x PV x RPM.',
    '',
    `## 자리 잡을 수 있는 글감 (${scored.length})`,
    '',
    '| 검색어 | 트랙 | 검색량 | 노출 | 이유 | 하루$ | 조건 |',
    '|---|---|---|---|---|---|---|',
    ...scored.map(line),
    '',
    `## 실측 대기 (${pending.length})`,
    '',
    '| 검색어 | 트랙 | 검색량 | 노출 | 이유 | 하루$ | 조건 |',
    '|---|---|---|---|---|---|---|',
    ...pending.map(line),
    '',
    `## 탈락 (${dropped.length})`,
    ...dropped.map((d) => `- ${d.query}: ${d.reason}`),
    '',
  ].join('\n');
  await writeFile(REPORT_FILE, md, 'utf8');

  console.error(
    `[pipeline] 후보 ${merged.length} (점수 ${scored.length} · 실측 대기 ${pending.length} · 탈락 ${dropped.length}) · 정찰 ${serpMeasured}건${serpAvailable ? '' : ` 중단(${serpNote})`} · 인증 ${auth.mode ?? '없음'}`,
  );
  console.error(formatUsage());
  void EYE_LABEL;
}

main().catch((e) => {
  console.error(`[pipeline] ${e.message ?? e}`);
  process.exit(1);
});
