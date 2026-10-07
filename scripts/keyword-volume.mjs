/**
 * keyword-volume: 후보 키워드의 검색량을 기준어(실업급여=100) 눈금으로 잰다.
 *
 * 원본: awoo `scripts/keyword-volume.mjs`. 이식 지침서 2단계. 환산 로직은 scripts/lib/volume-core.mjs.
 * 지역 묶음 모드(--region)는 지원금 전용이라 이식하지 않았다.
 * 수동 실행 전용 (자동화 없음, 운영자 결정 2026-10-07).
 *
 * 사용:
 *   node scripts/keyword-volume.mjs "양도소득세 계산기" "퇴직금 계산기"
 *   node scripts/keyword-volume.mjs --file=후보.txt         # 한 줄에 하나, '#' 무시
 *   node scripts/keyword-volume.mjs --season "..."           # 13개월 월별: 계절성·선점 판정
 *   node scripts/keyword-volume.mjs --json "..."             # JSON 만 출력
 *   node scripts/keyword-volume.mjs --save "..."             # docs/ops/volume-YYYY-MM-DD.json 저장 (gitignore)
 *
 * 출력(recent): recentRelative(최근 7일, 정렬 기준) · relative(30일) · trend · born
 * 출력(season): peakMonth · peakRelative · monthsToPeak · lastYearSameMonth · flat · 판정
 * measured:false = 데이터랩 무응답(노출 하한 미만). 0 이 아니라 "못 쟀다"다.
 *
 * 인증: 데이터랩은 개발자센터 키(NAVER_CLIENT_ID·SECRET)로도 된다(2026-10-07 확인). API HUB 키가 있으면 그것을 쓴다.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { formatUsage } from './lib/api-quota.mjs';
import { apiTrend, authFor, loadEnv } from './lib/naver-api.mjs';
import {
  BENCHMARK,
  WAVE_RATIO,
  alignToAxis,
  analyseSeason,
  avg,
  chunkTerms,
  recentRow,
  seasonVerdict,
} from './lib/volume-core.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DAYS = 29;
const DELAY_MS = 200;
const RETRIES = 3;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const fmt = (d) => d.toISOString().slice(0, 10);
const kstDate = () => new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);

/**
 * season 은 완결된 13개월(지난달 말까지)만 쓴다. 진행 중인 이번 달을 넣으면 마지막 점이 며칠치뿐이라
 * "작년 같은 달 대비"가 0.1 대로 잘못 나온다(2026-10-07 실측: 10월 7일치 vs 작년 10월 전체).
 * awoo 원본은 이번 달을 포함한다 — 여기서만 고쳤다.
 */
function seasonWindow(now = new Date()) {
  const kst = new Date(now.getTime() + 9 * 3600 * 1000);
  const end = new Date(Date.UTC(kst.getUTCFullYear(), kst.getUTCMonth(), 0)); // 지난달 말일
  const start = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth() - 12, 1)); // 13개월 전 1일
  return { start, end };
}

async function queryGroup(auth, terms, { season = false } = {}) {
  const { start, end } = season
    ? seasonWindow()
    : { end: new Date(), start: new Date(Date.now() - DAYS * 86400_000) };
  const body = {
    startDate: fmt(start),
    endDate: fmt(end),
    timeUnit: season ? 'month' : 'date',
    keywordGroups: terms.map((t) => ({ groupName: t, keywords: [t] })),
  };
  for (let i = 0; i < RETRIES; i++) {
    try {
      return await apiTrend(auth, body);
    } catch (e) {
      if (i === RETRIES - 1) throw e;
      await sleep(DELAY_MS * 4 * (i + 1));
    }
  }
  return null;
}

const indexByTitle = (data) =>
  new Map((data?.results ?? []).map((r) => [r.title, (r.data ?? []).map((p) => ({ period: p.period, ratio: p.ratio }))]));

/** 측정 본체. 다른 스크립트(파이프라인)가 import 해서 쓸 수 있게 분리했다. */
export async function measureVolumes(auth, terms, { season = false, benchmark = BENCHMARK } = {}) {
  const rows = [];
  let failed = 0;
  for (const chunk of chunkTerms(terms)) {
    let byTitle;
    try {
      byTitle = indexByTitle(await queryGroup(auth, [benchmark, ...chunk], { season }));
    } catch (e) {
      failed += chunk.length;
      for (const t of chunk) rows.push({ term: t, measured: false, failed: true, relative: 0, note: `묶음 실패: ${e.message}` });
      continue;
    }
    const basePts = byTitle.get(benchmark) ?? [];
    const base = avg(basePts.map((p) => p.ratio));
    const axis = basePts.map((p) => p.period);
    if (!base) {
      failed += chunk.length;
      for (const t of chunk) rows.push({ term: t, measured: false, failed: true, relative: 0, note: '기준어 응답 없음' });
      continue;
    }
    let dailyByTitle = null;
    if (season) {
      await sleep(DELAY_MS);
      try {
        dailyByTitle = indexByTitle(await queryGroup(auth, [benchmark, ...chunk]));
      } catch {
        /* 물결 판정만 못 한다 */
      }
    }
    const nowMonth = Number(kstDate().slice(5, 7));
    for (const t of chunk) {
      const pts = byTitle.get(t);
      if (!pts || pts.length === 0) {
        rows.push({ term: t, measured: false, relative: 0, recentRelative: 0, note: '데이터랩 무응답, 검색량이 노출 하한 미만' });
        continue;
      }
      if (season) {
        const row = { term: t, measured: true, relative: Math.round((avg(pts.map((p) => p.ratio)) / base) * 10000) / 100 };
        Object.assign(row, analyseSeason(pts, base, nowMonth));
        const daily = (dailyByTitle?.get(t) ?? []).map((p) => p.ratio);
        if (daily.length >= 7) {
          const mean30 = avg(daily);
          row.waveRatio = mean30 > 0 ? Math.round((avg(daily.slice(-7)) / mean30) * 100) / 100 : null;
          row.inProgressWave = row.waveRatio != null && row.waveRatio >= WAVE_RATIO;
        } else {
          row.waveRatio = null;
          row.inProgressWave = null;
        }
        row.verdict = seasonVerdict(row);
        rows.push(row);
      } else {
        rows.push({ term: t, measured: true, ...recentRow(alignToAxis(pts, axis), base) });
      }
    }
    await sleep(DELAY_MS);
  }
  rows.sort((a, b) =>
    season ? b.relative - a.relative : (b.recentRelative ?? 0) - (a.recentRelative ?? 0) || b.relative - a.relative,
  );
  return { rows, failed };
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes('--help') || argv.includes('-h')) {
    console.log('사용: node scripts/keyword-volume.mjs [--season] [--json] [--save] [--file=파일] "키워드" ...');
    return;
  }
  const season = argv.includes('--season');
  const jsonOnly = argv.includes('--json');
  const save = argv.includes('--save');
  const benchmark = argv.find((a) => a.startsWith('--benchmark='))?.slice(12) ?? BENCHMARK;
  const fileArg = argv.find((a) => a.startsWith('--file='))?.slice(7);
  let terms = argv.filter((a) => !a.startsWith('--'));
  if (fileArg) {
    const text = await readFile(join(ROOT, fileArg), 'utf8');
    terms = text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
  }
  terms = [...new Set(terms)].filter((t) => t !== benchmark);
  if (!terms.length) {
    console.error('사용: node scripts/keyword-volume.mjs "키워드1" "키워드2" ...');
    process.exit(2);
  }
  const auth = authFor(await loadEnv(ROOT));
  if (!auth.mode) {
    console.error('[volume] 키 없음: NCP_API_KEY_ID·NCP_API_KEY 또는 NAVER_CLIENT_ID·NAVER_CLIENT_SECRET');
    process.exit(2);
  }
  const { rows, failed } = await measureVolumes(auth, terms, { season, benchmark });
  const out = { benchmark, mode: season ? 'season' : 'recent', measuredAt: new Date().toISOString(), rows, failed };

  if (save) {
    const file = join(ROOT, 'docs', 'ops', `volume-${kstDate()}${season ? '-season' : ''}.json`);
    await writeFile(file, `${JSON.stringify(out, null, 2)}\n`, 'utf8');
    console.error(`[volume] 저장 → ${file.replace(ROOT, '.')}`);
  }
  if (jsonOnly) {
    console.log(JSON.stringify(out, null, 2));
  } else if (season) {
    console.log(`기준: ${benchmark} = 100 · 13개월 월별`);
    console.log('  평균   피크  피크월  D-개월  작년比  키워드  판정');
    for (const r of rows) {
      if (!r.measured) {
        console.log(`  ${'-'.padStart(5)}     -      -      -       -  ${r.term}  (${r.note})`);
        continue;
      }
      console.log(
        `  ${String(r.relative).padStart(5)}  ${String(r.peakRelative).padStart(5)}  ${String(r.peakMonth).padStart(4)}월  ${String(r.monthsToPeak).padStart(5)}  ${String(r.lastYearSameMonth ?? '-').padStart(6)}  ${r.term}  ${r.verdict.label}`,
      );
    }
  } else {
    console.log(`기준: ${benchmark} = 100 · 최근 ${DAYS + 1}일`);
    console.log('  최근7일   30일   추세   키워드');
    for (const r of rows) {
      if (!r.measured) {
        console.log(`  ${'-'.padStart(6)}  ${'-'.padStart(5)}      -   ${r.term}  (${r.note})`);
        continue;
      }
      const trend = r.trend == null ? '   -' : `x${r.trend}`.padStart(5);
      console.log(`  ${String(r.recentRelative).padStart(6)}  ${String(r.relative).padStart(5)}  ${trend}   ${r.term}${r.born ? '  (신생)' : ''}`);
    }
  }
  console.error(formatUsage() + (failed ? ` · 실패 ${failed}` : ''));
}

// 직접 실행할 때만 main. 파이프라인이 measureVolumes 를 import 할 때는 실행하지 않는다.
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((e) => {
    console.error(`[volume] ${e.message ?? e}`);
    process.exit(1);
  });
}
