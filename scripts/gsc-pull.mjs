#!/usr/bin/env node
/**
 * GSC Search Analytics 데이터 수집 (의존성 0).
 *
 * 서비스 계정 JWT → OAuth2 액세스 토큰 → searchAnalytics.query (webmasters v3).
 * Node 내장 crypto(RS256) + fetch 만 사용 — 외부 패키지 없음.
 *
 * 환경변수 (코드/로그/커밋에 절대 노출 금지):
 *   GSC_SA_KEY  : 서비스 계정 JSON 전체(문자열). 최소 client_email + private_key 포함.
 *   GSC_SITE    : GSC 속성. 도메인 속성이면 'sc-domain:calculatorhost.com',
 *                 URL 접두 속성이면 'https://calculatorhost.com/'.
 *
 * 사용:
 *   node scripts/gsc-pull.mjs            # 라이브 수집 → .claude/reports/gsc-latest.json
 *   node scripts/gsc-pull.mjs --mock     # 자격증명 없이 샘플 데이터로 산출(분석 로직 검증용)
 *   node scripts/gsc-pull.mjs --days 7   # 기간 지정(기본 28일)
 *
 * 산출: .claude/reports/gsc-latest.json  { fetchedAt, range, byQuery[], byPage[] }
 */
import crypto from 'node:crypto';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const OUT_PATH = resolve(process.cwd(), '.claude/reports/gsc-latest.json');
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';
const TOKEN_URI = 'https://oauth2.googleapis.com/token';

const args = process.argv.slice(2);
const MOCK = args.includes('--mock');
const daysIdx = args.indexOf('--days');
const DAYS = daysIdx !== -1 && args[daysIdx + 1] ? Number(args[daysIdx + 1]) : 28;

function b64url(input) {
  return Buffer.from(input).toString('base64url');
}

/** 서비스 계정 키로 JWT 서명 → 액세스 토큰 교환 */
async function getAccessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: SCOPE,
      aud: sa.token_uri || TOKEN_URI,
      iat: now,
      exp: now + 3600,
    }),
  );
  const signingInput = `${header}.${claim}`;
  const signature = crypto
    .createSign('RSA-SHA256')
    .update(signingInput)
    .sign(sa.private_key)
    .toString('base64url');
  const assertion = `${signingInput}.${signature}`;

  const res = await fetch(sa.token_uri || TOKEN_URI, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });
  if (!res.ok) {
    throw new Error(`토큰 교환 실패 ${res.status}: ${(await res.text()).slice(0, 200)}`);
  }
  return (await res.json()).access_token;
}

async function queryGsc(token, site, dimension, startDate, endDate) {
  const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ startDate, endDate, dimensions: [dimension], rowLimit: 1000, type: 'web' }),
  });
  if (!res.ok) {
    throw new Error(`GSC 조회 실패(${dimension}) ${res.status}: ${(await res.text()).slice(0, 200)}`);
  }
  const json = await res.json();
  return (json.rows || []).map((r) => ({
    key: r.keys[0],
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: r.ctr,
    position: r.position,
  }));
}

function isoDaysAgo(n) {
  const d = new Date(Date.now() - n * 86400000);
  return d.toISOString().slice(0, 10);
}

function mockData() {
  return {
    fetchedAt: new Date().toISOString(),
    range: { startDate: isoDaysAgo(DAYS + 2), endDate: isoDaysAgo(2), days: DAYS, mock: true },
    byQuery: [
      { key: '증여세 계산기', clicks: 0, impressions: 9, ctr: 0, position: 18.2 },
      { key: 'dsr 계산기', clicks: 0, impressions: 8, ctr: 0, position: 15.1 },
      { key: '스트레스 dsr 계산기', clicks: 1, impressions: 2, ctr: 0.5, position: 7.5 },
      { key: '퇴직소득세 계산기', clicks: 1, impressions: 1, ctr: 1, position: 6.0 },
      { key: '주택임대차보호법 월차임 전환율 기준금리 2% 2026', clicks: 0, impressions: 50, ctr: 0, position: 11.6 },
    ],
    byPage: [
      { key: 'https://calculatorhost.com/calculator/gift-tax/', clicks: 0, impressions: 9, ctr: 0, position: 18.2 },
      { key: 'https://calculatorhost.com/calculator/loan-limit/', clicks: 1, impressions: 17, ctr: 0.06, position: 12.0 },
      { key: 'https://calculatorhost.com/guide/rent-conversion-rate-2026-housing-lease-act/', clicks: 0, impressions: 73, ctr: 0, position: 11.6 },
      { key: 'https://calculatorhost.com/calculator/salary/', clicks: 2, impressions: 40, ctr: 0.05, position: 9.4 },
      { key: 'https://calculatorhost.com/calculator/severance/', clicks: 1, impressions: 1, ctr: 1, position: 4.0 },
    ],
  };
}

async function main() {
  mkdirSync(resolve(process.cwd(), '.claude/reports'), { recursive: true });

  let out;
  if (MOCK) {
    out = mockData();
    console.log('[gsc-pull] --mock: 샘플 데이터 사용 (자격증명 불필요)');
  } else {
    const rawKey = process.env.GSC_SA_KEY;
    const site = process.env.GSC_SITE;
    if (!rawKey || !site) {
      console.error('[gsc-pull] 환경변수 GSC_SA_KEY / GSC_SITE 가 없습니다.');
      console.error('  → .claude/reports/GSC-SETUP.md 의 셋업 가이드를 따라 등록 후 재실행.');
      console.error('  → 자격증명 없이 분석 로직만 확인하려면: node scripts/gsc-pull.mjs --mock');
      process.exit(2);
    }
    let sa;
    try {
      sa = JSON.parse(rawKey);
    } catch {
      console.error('[gsc-pull] GSC_SA_KEY 가 유효한 JSON 이 아닙니다.');
      process.exit(2);
    }
    const token = await getAccessToken(sa);
    const startDate = isoDaysAgo(DAYS + 2); // GSC 데이터는 ~2일 지연
    const endDate = isoDaysAgo(2);
    const [byQuery, byPage] = await Promise.all([
      queryGsc(token, site, 'query', startDate, endDate),
      queryGsc(token, site, 'page', startDate, endDate),
    ]);
    out = { fetchedAt: new Date().toISOString(), range: { startDate, endDate, days: DAYS }, byQuery, byPage };
  }

  writeFileSync(OUT_PATH, JSON.stringify(out, null, 2), 'utf8');
  console.log(`[gsc-pull] 저장: ${OUT_PATH}`);
  console.log(`  쿼리 ${out.byQuery.length}행 / 페이지 ${out.byPage.length}행 (${out.range.startDate}~${out.range.endDate})`);
}

main().catch((e) => {
  console.error('[gsc-pull] 오류:', e.message);
  process.exit(1);
});
