#!/usr/bin/env node
/**
 * Naver DataLab 검색어 트렌드 모니터 (의존성 0).
 *
 * 네이버 DataLab '검색어 트렌드' API로 우리 계산기·가이드 토픽의 상대 검색량 추이를 받아
 * "급상승(브레이크아웃)" 키워드를 감지 → 시즌·이슈 선점 발행 후보를 리포트로 정리.
 * (네이버 Search Advisor 실적은 API가 없어 불가. DataLab은 트렌드 추이만 제공 — 절대 검색량 아님.)
 *
 * 인증(.env.local — 코드/로그/커밋 절대 금지):
 *   NAVER_CLIENT_ID     네이버 개발자센터(developers.naver.com) 앱의 Client ID
 *   NAVER_CLIENT_SECRET 동 Client Secret
 *   ※ 앱에 '데이터랩(검색어트렌드)' API 사용 등록 필요. 셋업: .claude/reports/NAVER-DATALAB-SETUP.md
 *
 * 사용:
 *   npm run naver:trend            # 최근 ~90일 주간 추이 → .claude/reports/naver-trends.md
 *   npm run naver:trend -- --mock  # 자격증명 없이 샘플로 로직 검증
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const OUT = resolve(process.cwd(), '.claude/reports/naver-trends.md');
const API = 'https://openapi.naver.com/v1/datalab/search';

// 추적 토픽 (우리 계산기·가이드와 직접 연결되는 한국 금융/세금/부동산 키워드)
const KEYWORDS = [
  '양도소득세', '증여세', '상속세', '취득세', '재산세', '종합부동산세',
  '대출한도', 'DSR', '전세자금대출', '연봉 실수령액', '퇴직금', '실업급여',
  '국민연금', '기초연금', '중개수수료', '전월세 전환율', '자동차세', '프리랜서 종합소득세',
  '건강보험료', '청약가점',
];

const args = process.argv.slice(2);
const MOCK = args.includes('--mock');

function loadEnvLocal() {
  const p = resolve(process.cwd(), '.env.local');
  if (!existsSync(p)) return;
  for (const raw of readFileSync(p, 'utf8').split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
    if (key && !(key in process.env)) process.env[key] = val;
  }
}

function isoDaysAgo(n) {
  return new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);
}

const avg = (a) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0);

/** 최근 4주 평균 vs 직전 평균 → 상승률. data: [{period, ratio}] */
function trend(data) {
  if (!data || data.length < 6) return { recent: 0, prior: 0, change: 0 };
  const recent = avg(data.slice(-4).map((d) => d.ratio));
  const prior = avg(data.slice(0, -4).map((d) => d.ratio));
  return { recent, prior, change: prior > 0 ? (recent - prior) / prior : 0 };
}

async function queryBatch(id, secret, keywords, startDate, endDate) {
  const res = await fetch(API, {
    method: 'POST',
    headers: {
      'X-Naver-Client-Id': id,
      'X-Naver-Client-Secret': secret,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      startDate,
      endDate,
      timeUnit: 'week',
      keywordGroups: keywords.map((k) => ({ groupName: k, keywords: [k] })),
    }),
  });
  if (!res.ok) throw new Error(`DataLab 조회 실패 ${res.status}: ${(await res.text()).slice(0, 160)}`);
  return (await res.json()).results || [];
}

function mockResults() {
  const weeks = 12;
  const mk = (shape) => Array.from({ length: weeks }, (_, i) => ({ period: isoDaysAgo((weeks - i) * 7), ratio: shape(i) }));
  return [
    { title: '자동차세', data: mk((i) => 20 + i * 6) }, // 급상승
    { title: '재산세', data: mk((i) => 15 + (i > 7 ? (i - 7) * 12 : 0)) }, // 최근 급등
    { title: '연봉 실수령액', data: mk(() => 60 + (Math.floor(Math.sin(0) * 0))) }, // 평탄
    { title: '실업급여', data: mk((i) => 80 - i * 3) }, // 하락
  ];
}

async function main() {
  loadEnvLocal();
  mkdirSync(resolve(process.cwd(), '.claude/reports'), { recursive: true });

  let results;
  if (MOCK) {
    results = mockResults();
    console.log('[naver-trend] --mock: 샘플 데이터 (자격증명 불필요)');
  } else {
    const id = process.env.NAVER_CLIENT_ID;
    const secret = process.env.NAVER_CLIENT_SECRET;
    if (!id || !secret) {
      console.error('[naver-trend] NAVER_CLIENT_ID / NAVER_CLIENT_SECRET 가 없습니다 (.env.local).');
      console.error('  → 셋업: .claude/reports/NAVER-DATALAB-SETUP.md · 로직만: npm run naver:trend -- --mock');
      process.exit(2);
    }
    const startDate = isoDaysAgo(90);
    const endDate = isoDaysAgo(1);
    results = [];
    // DataLab은 요청당 최대 5개 그룹 → 5개씩 배치
    for (let i = 0; i < KEYWORDS.length; i += 5) {
      const batch = KEYWORDS.slice(i, i + 5);
      results.push(...(await queryBatch(id, secret, batch, startDate, endDate)));
    }
  }

  const rows = results
    .map((r) => ({ title: r.title, ...trend(r.data), latest: r.data?.[r.data.length - 1]?.ratio ?? 0 }))
    .sort((a, b) => b.change - a.change);

  const pct = (n) => `${n >= 0 ? '+' : ''}${Math.round(n * 100)}%`;
  const lines = [];
  lines.push('# Naver 검색어 트렌드 모니터');
  lines.push('');
  lines.push(`> 생성: ${new Date().toISOString()}${MOCK ? ' · ⚠️ MOCK' : ''} · 출처: Naver DataLab(상대 검색량 추이)`);
  lines.push('> ratio는 기간 내 최고치=100 상대값(절대 검색량 아님). change = 최근4주 평균 / 직전 평균.');
  lines.push('');
  lines.push('## 🔥 급상승 (최근 4주 +30%↑) — 시즌·이슈 선점 발행 후보');
  lines.push('');
  const rising = rows.filter((r) => r.change >= 0.3);
  if (!rising.length) lines.push('_해당 없음_');
  else {
    lines.push('| 키워드 | 추이 | 최근 ratio | 관련 페이지 후보 |');
    lines.push('|---|---|---|---|');
    rising.forEach((r) => lines.push(`| **${r.title}** | ${pct(r.change)} | ${Math.round(r.latest)} | 해당 계산기/가이드 증폭·신규 |`));
  }
  lines.push('');
  lines.push('## 전체 추이 (상승순)');
  lines.push('');
  lines.push('| 키워드 | 추이 | 최근 ratio |');
  lines.push('|---|---|---|');
  rows.forEach((r) => lines.push(`| ${r.title} | ${pct(r.change)} | ${Math.round(r.latest)} |`));
  lines.push('');
  lines.push('---');
  lines.push('_급상승 키워드는 해당 계산기/가이드를 먼저 증폭하거나, 없으면 1차출처 검증 후 신규 발행. 절대 검색량이 아니므로 추이(방향)만 신뢰._');

  writeFileSync(OUT, lines.join('\n'), 'utf8');
  console.log(`[naver-trend] 저장: ${OUT}`);
  console.log(`  🔥 급상승 ${rising.length} / 전체 ${rows.length}`);
}

main().catch((e) => {
  console.error('[naver-trend] 오류:', e.message);
  process.exit(1);
});
