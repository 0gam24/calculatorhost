/**
 * ops-widget: "오늘 쓸 글감" 클릭 지시 위젯(HTML 조각)을 만든다.
 *
 * 원본: awoo `scripts/ops-widget.mjs` (운영자 지시 2026-09-11 "클릭하면 포스팅하는 기능").
 * 채팅 안 위젯(show_widget)으로 띄우면 버튼 클릭이 sendPrompt()로 지시 문장을 채팅에 넣는다.
 * 버튼 문구는 슬래시로 시작하지 않는다 — 앱이 명령으로 해석하다 전송을 놓친다(awoo 2026-09-25).
 *
 * 사용:
 *   node scripts/ops-widget.mjs            # stdout 에 HTML 조각
 *   node scripts/ops-widget.mjs --limit=8
 *   node scripts/ops-widget.mjs --count    # "오늘 발행 N건 · 어제 N건" 한 줄
 *
 * 입력: docs/ops/pipeline-queue.json · docs/ops/landgrab-calendar.json · docs/ops/eye-offset.json ·
 *       docs/ops/adsense-private/rpm-groups.json(없으면 금액 칸을 뺀다)
 */
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EYE_LABEL, eyeFor, loadEyeStore } from './lib/eye-offset.mjs';
import { revenueOf, usdPerDay } from './lib/revenue-weight.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const LIMIT = Number(argv.find((a) => a.startsWith('--limit='))?.slice(8) ?? 8);
const kst = (offsetDays = 0) => new Date(Date.now() + 9 * 3600 * 1000 + offsetDays * 86400_000).toISOString().slice(0, 10);
const TODAY = kst();
const YDAY = kst(-1);

const esc = (v) => String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const jsStr = (v) => JSON.stringify(String(v ?? ''));
const norm = (s) => String(s ?? '').replace(/\s+/g, '');
const readJson = (rel) => {
  try {
    return JSON.parse(readFileSync(join(ROOT, rel), 'utf8'));
  } catch {
    return null;
  }
};
const fmtUsd = (x) => (x >= 10 ? Math.round(x).toString() : x >= 1 ? x.toFixed(1) : x.toFixed(2));

/** 그날 커밋으로 새로 생긴 페이지 수 (가이드 + 계산기, git 추적분만. 커밋 안 한 초안은 사이트에 없다) */
function publishedOn(day) {
  try {
    const out = execFileSync(
      'git',
      ['log', `--since=${day}T00:00:00+09:00`, `--until=${day}T23:59:59+09:00`, '--diff-filter=A', '--name-only', '--pretty=format:', '--', 'src/app/guide/*/page.tsx', 'src/app/calculator/*/page.tsx'],
      { cwd: ROOT, encoding: 'utf8' },
    );
    return new Set(out.split(/\r?\n/).filter(Boolean)).size;
  } catch {
    return 0;
  }
}
const countLine = () => `오늘 새 페이지 ${publishedOn(TODAY)}건 · 어제 ${publishedOn(YDAY)}건 (자동 운영 하루 1건)`;

if (argv.includes('--count')) {
  console.log(countLine());
  process.exit(0);
}

const q = readJson('docs/ops/pipeline-queue.json');
if (!q || !Array.isArray(q.items)) {
  console.log('<p style="color:var(--text-secondary)">글감 큐가 없습니다. 먼저 node scripts/keyword-pipeline.mjs 를 돌리세요.</p>');
  process.exit(0);
}
const money = readJson('docs/ops/adsense-private/rpm-groups.json');
const calendar = readJson('docs/ops/landgrab-calendar.json');
const eyeStore = await loadEyeStore();

const open = q.items.filter((i) => i.status === 'proposed');
const ready = open.filter((i) => i.exposure?.score != null && i.exposure.score > 0);
const pending = open.filter((i) => i.exposure?.score == null);
const MIN_USD = money?.minUsdPerDay ?? 1;
const usd = (i) => usdPerDay(i, money);
const tiny = money ? ready.filter((i) => usd(i) != null && usd(i) < MIN_USD) : [];
const shown = ready.filter((i) => !tiny.includes(i)).slice(0, LIMIT);

const ACTION_TEXT = {
  calculator: (a) => `계산기 보강 ${a.target}`,
  guide: (a) => `기존 글 보강 ${a.target}`,
  'new-calculator': () => '새 계산기 (운영자 결정)',
  new: () => '새 글',
};
const actionText = (i) => (ACTION_TEXT[i.action?.type] ?? ACTION_TEXT.new)(i.action ?? {});

const genIso = q.meta?.generatedAt;
const generated = genIso ? new Date(Date.parse(genIso) + 9 * 3600 * 1000).toISOString().slice(5, 16).replace('T', ' ') : '';

// ── 목표 막대 ─────────────────────────────────────────────
function goalHtml() {
  if (!money?.goalPerDay) return '';
  const list = shown.length ? shown : pending.slice(0, LIMIT);
  const vals = list.map(usd).filter((x) => x != null);
  const sum = vals.reduce((s, x) => s + x, 0);
  const unknown = list.length - vals.length;
  const now = money.recent?.usdPerDay ?? 0;
  const pct = Math.min(100, Math.round((now / money.goalPerDay) * 100));
  const scope = shown.length ? '아래 글감이 모두 1~3위에 들어도' : '아래 대기 글감이 모두 1~3위에 들어도';
  return `<div style="margin:2px 0 8px;padding:8px 10px;border-radius:8px;background:var(--surface-1)">
  <div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;flex-wrap:wrap">
    <span style="font-size:14px;font-weight:500">목표 하루 ${money.goalPerDay}달러</span>
    <span style="font-size:13px;color:var(--text-secondary)">최근 하루 평균 ${now}달러 (${esc(money.recent?.from?.slice(5) ?? '')}~${esc(money.recent?.to?.slice(5) ?? '')})</span>
  </div>
  <div style="height:6px;border-radius:3px;background:rgba(127,127,127,.2);margin:6px 0 4px"><div style="height:6px;border-radius:3px;width:${pct}%;background:var(--text-success)"></div></div>
  <div style="font-size:12px;color:var(--text-muted)">${scope} 하루 약 +${fmtUsd(sum)}달러${unknown ? ` (${unknown}건은 검색량을 몰라 뺌)` : ''}${money.assumed ? ` · <span style="color:var(--text-warning)">가정 RPM $${money.rpmUsd?.default}</span> (애드센스 실자료 없음)` : ''}</div>
</div>`;
}

// ── 눈 확인 버튼 (상위 5건) ───────────────────────────────
const EYE_ROWS = 5;
function eyeHtml(query, idx) {
  if (idx >= EYE_ROWS) return '';
  const cur = eyeFor(eyeStore, query);
  const btn = (v, label) => {
    const cmd = `눈확인: "${query}" = ${label} — eye-offset에 기록하고 목록을 다시 보여줘`;
    const on = cur === v;
    return `<button onclick="sendPrompt(${esc(jsStr(cmd))})" style="font-size:11px;padding:1px 6px;${on ? 'font-weight:500' : 'color:var(--text-secondary)'}">${on ? '✓ ' : ''}${label}</button>`;
  };
  const state = cur
    ? `<span style="font-size:11px;color:var(--text-muted)">검색 결과에서 ${esc(EYE_LABEL[cur])}</span>`
    : '<span style="font-size:11px;color:var(--text-muted)">네이버에서 직접 보고 눌러 주세요 — 웹문서 묶음이 어디쯤?</span>';
  return `<div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap;margin-top:3px">${state} ${btn(1, '첫 화면')}${btn(2, '한 번 스크롤')}${btn(3, '그 아래')}</div>`;
}

const tone = (label) => (label === '높음' ? 'var(--text-success)' : label === '중간' ? 'var(--text-warning)' : 'var(--text-secondary)');
const usdChip = (i) => {
  const u = usd(i);
  return u == null ? '' : `<span style="font-size:12px;color:var(--text-secondary);flex-shrink:0">하루 약 ${fmtUsd(u)}달러</span>`;
};
const condHtml = (i) => {
  const c = String(i.condition ?? '').replace(/계산기 보강: [^·]*·?|기존 글 보강: [^·]*·?/g, '').trim().replace(/^·\s*|\s*·$/g, '');
  return c ? `<div style="font-size:12px;color:var(--text-muted);margin-top:2px">조건: ${esc(c.length > 70 ? `${c.slice(0, 69)}…` : c)}</div>` : '';
};

// ── 자리 잡을 수 있는 글감 ─────────────────────────────────
const rows = shown
  .map((i, idx) => {
    const cmd = `발행: ${i.query} — 대시보드 지시(큐 ${i.id}). 큐 항목의 트랙·처리·노출 이유를 브리프로 쓰고, 검증 통과 시 결재 질문 없이 발행한다.`;
    const hold = `보류: "${i.query}" — 큐 status를 hold로 바꾸고 이유는 묻지 말 것`;
    const ex = i.exposure ?? {};
    const rv = revenueOf(i);
    return `<div style="display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-top:0.5px solid var(--border)">
  <div style="flex:1;min-width:0">
    <div style="display:flex;gap:8px;align-items:baseline;flex-wrap:wrap"><span style="font-size:15px;font-weight:500">${esc(i.query)}</span><span style="font-size:12px;color:${tone(ex.label)}">${esc(ex.label)} ${ex.score}</span>${rv.tag ? `<span style="font-size:12px">${esc(rv.tag)}</span>` : ''}${usdChip(i)}</div>
    <div style="font-size:13px;color:var(--text-secondary);margin-top:2px">${esc((ex.reasons ?? []).join(' · '))} · ${esc(actionText(i))} · 검색량 ${i.recent7 ?? '모름'}</div>${condHtml(i)}${eyeHtml(i.query, idx)}
  </div>
  <div style="display:flex;gap:6px;flex-shrink:0">
    <button onclick="sendPrompt(${esc(jsStr(cmd))})" style="font-size:13px">발행 지시 ↗</button>
    <button onclick="sendPrompt(${esc(jsStr(hold))})" style="font-size:13px;color:var(--text-secondary)">보류</button>
  </div>
</div>`;
  })
  .join('\n');

const tinyHtml = tiny.length
  ? `<div style="font-size:12px;color:var(--text-muted);padding:8px 0 0;border-top:0.5px solid var(--border)">하루 ${MIN_USD}달러 미만이라 접어 둔 글감 ${tiny.length}건: ${tiny
      .slice(0, 8)
      .map((i) => `${esc(i.query)}(${fmtUsd(usd(i))})`)
      .join(' · ')}${tiny.length > 8 ? ' …' : ''}</div>`
  : '';

// ── 실측 대기 ─────────────────────────────────────────────
const serpBlocked = q.meta?.serpAvailable === false || (q.meta?.serpMeasured === 0 && !ready.length);
const pendingSorted = [...pending].sort((a, b) => (usd(b) ?? b.recent7 ?? 0) - (usd(a) ?? a.recent7 ?? 0));
const pendingHtml = pending.length
  ? `<div style="margin-top:10px;padding-top:8px;border-top:0.5px solid var(--border)">
  <div style="font-size:13px;color:var(--text-secondary);margin-bottom:4px">실측 대기 ${pending.length}건 — 검색 결과를 봐야 자리가 있는지 안다${serpBlocked ? ' · <span style="color:var(--text-warning)">정찰 키 필요</span>: .env.local 에 NCP_API_KEY_ID·NCP_API_KEY (NAVER API HUB 새 앱)' : ''}</div>
${pendingSorted
  .slice(0, LIMIT)
  .map((i, idx) => {
    const cmd = `실측: "${i.query}" — 검색 결과를 재고 큐를 갱신해 목록을 다시 보여줘`;
    return `<div style="padding:6px 0">
  <div style="display:flex;gap:12px;align-items:center">
    <div style="flex:1;min-width:0"><span style="font-size:14px">${esc(i.query)}</span> <span style="font-size:12px;color:var(--text-muted)">검색량 ${i.recent7 ?? '모름'} · ${esc(actionText(i))}</span> ${usdChip(i)}</div>
    <button onclick="sendPrompt(${esc(jsStr(cmd))})" style="font-size:12px;flex-shrink:0">실측 ↗</button>
  </div>${i.widgetRisk ? '<div style="font-size:11px;color:var(--text-warning)">네이버 자체 계산기 위젯이 있을 수 있음</div>' : ''}${eyeHtml(i.query, idx)}
</div>`;
  })
  .join('\n')}
</div>`
  : '';

// ── 다음에 크게 뜰 주제 (캘린더 계절성 + 최근 추세) ─────────
const vols = q.meta?.volumes ?? {};
const monthsTo = (m) => (m - Number(TODAY.slice(5, 7)) + 12) % 12;
const waveRows = [];
for (const c of calendar?.items ?? []) {
  if (!c.writeBy) continue;
  const d = monthsTo(c.peakMonth);
  if (c.writeBy <= TODAY && d <= 1) waveRows.push({ label: '선점 적기', tone: 'var(--text-success)', topic: c.query, text: `${c.peakMonth}월 피크 ${c.peakRelative} · ${c.note ?? ''}`, btn: '선점' });
  else if (c.writeBy > TODAY && (Date.parse(c.writeBy) - Date.parse(TODAY)) / 86400_000 <= 75) waveRows.push({ label: '곧 뜸', tone: 'var(--text-warning)', topic: c.query, text: `${c.peakMonth}월 피크 ${c.peakRelative} · ${c.writeBy.slice(5)}까지 준비 · ${c.note ?? ''}`, btn: '선점' });
}
const trendItems = open.filter((i) => i.trend != null && (i.recent7 ?? 0) >= 8);
const rising = trendItems.filter((i) => i.trend >= 1.2).sort((a, b) => b.trend - a.trend).slice(0, 3);
for (const i of rising) waveRows.push({ label: '지금 뜨는 중', tone: 'var(--text-success)', topic: i.query, text: `검색량 ${i.recent7} · 직전 3주 대비 ${i.trend}배`, btn: null });
const falling = Object.entries(vols)
  .filter(([, v]) => v.trend != null && v.trend <= 0.6 && (v.recent7 ?? 0) >= 3)
  .map(([k, v]) => `${k} ${v.trend}배`);
const wavesHtml = waveRows.length
  ? `<div style="margin-top:12px;padding-top:8px;border-top:0.5px solid var(--border)">
  <div style="font-size:13px;color:var(--text-secondary);margin-bottom:4px">다음에 크게 뜰 주제 · 실업급여 = 100 · ${esc(TODAY.slice(5))} 측정</div>
${waveRows
  .slice(0, 7)
  .map((w) => {
    const cmd = `선점: "${w.topic}" — 캘린더 항목을 오늘 후보로 당기고 목록을 다시 보여줘`;
    return `<div style="display:flex;gap:12px;align-items:center;padding:6px 0">
  <div style="flex:1;min-width:0"><span style="font-size:14px;font-weight:500">${esc(w.topic)}</span> <span style="font-size:12px;color:${w.tone}">${esc(w.label)}</span><div style="font-size:12px;color:var(--text-muted)">${esc(w.text.slice(0, 90))}</div></div>
  ${w.btn ? `<button onclick="sendPrompt(${esc(jsStr(cmd))})" style="font-size:12px;flex-shrink:0">${w.btn} ↗</button>` : ''}
</div>`;
  })
  .join('\n')}
${falling.length ? `<div style="font-size:12px;color:var(--text-muted);margin-top:4px">꺾이는 중: ${esc(falling.slice(0, 5).join(' · '))} — 새 글보다 기존 글 갱신만</div>` : ''}
</div>`
  : '';

const head = `<div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;font-size:13px;color:var(--text-secondary);margin-bottom:6px">
  <span>오늘 쓸 글감 ${shown.length}건 · 자리 잡을 수 있는 것 중 돈 되는 순 · 큐 ${esc(generated)}</span>
  <span>${esc(countLine())}</span>
</div>`;

console.log(`<h2 class="sr-only">calculatorhost 오늘 쓸 글감 목록, 목표 하루 200달러 대비 진행과 다음에 뜰 주제</h2>
<div style="padding:4px 2px">
${head}
${goalHtml()}
${rows || '<div style="font-size:13px;color:var(--text-secondary);padding:6px 0">아직 자리가 확인된 글감이 없습니다. 실측 대기 항목을 재면 여기로 올라옵니다.</div>'}
${tinyHtml}
${pendingHtml}
${wavesHtml}
</div>`);
